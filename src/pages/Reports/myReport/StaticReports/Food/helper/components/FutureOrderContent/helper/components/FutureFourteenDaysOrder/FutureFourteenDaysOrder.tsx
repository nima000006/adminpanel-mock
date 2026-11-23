import { useEffect, useState } from "react";

import moment from "jalali-moment";
import { PiInfoThin } from "react-icons/pi";

import CustomCard from "@components/CustomCard/CustomCard";
import { CustomChart } from "@components/Renderers/CustomChart";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import Div from "@components/Renderers/Div/Div";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useMyReportDetailsMutation } from "@infra/states/redux/Apis/report/myReport";
import {
  ParticipantsStatisticsChartDataItem,
  ParticipantsStatisticsSeriesItem,
  MyReportDetailsResponse,
} from "@pages/Reports/myReport/StaticReports/MyDoctor/@types/@myDoctorStaticReport";

import { FutureFourteenDaysOrderProps } from "./@types/@futureFourteenDaysOrder";
import { FOOD_CARD_IDS } from "../../../../../utils/FoodStaticReportsUtils";

const FutureFourteenDaysOrder = ({
  isFormValid,
  createBodyParams,
  triggerItems,
  validateData,
}: FutureFourteenDaysOrderProps) => {
  const [orderData, setOrderData] = useState<{
    data: ParticipantsStatisticsChartDataItem[];
    series: ParticipantsStatisticsSeriesItem[];
  }>({
    data: [],
    series: [],
  });

  const [isDataValid, setIsDataValid] = useState<boolean | null>(null);

  const {
    params: { card },
  } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getReportDetail, { isLoading: isReportDetailLoading }] =
    useMyReportDetailsMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (+card === FOOD_CARD_IDS.futureOrder) {
      // اگر فیلدهای required پر نشده‌اند، درخواست ارسال نکن
      if (!isFormValid) {
        return;
      }
      getReportDetail({
        id: 86,
        params: createBodyParams() || {},
      })
        .unwrap()
        .then((value: MyReportDetailsResponse) => {
          const dataArray = Array.isArray(value?.data) ? value.data : [];
          const isValid = validateData(dataArray, "LINE_CHART");
          setIsDataValid(isValid);

          if (isValid === null || isValid === false) {
            setOrderData({ data: [], series: [] });
            return;
          }

          const tempData: ParticipantsStatisticsChartDataItem[] = dataArray.map(
            (item) => {
              const itemRecord = item as Record<string, unknown>;
              return {
                ...itemRecord,
                date: moment(itemRecord?.date as string, "YYYY-MM-DD").format(
                  "jYYYY/jMM/jDD"
                ),
              } as ParticipantsStatisticsChartDataItem;
            }
          );

          const oneItem = tempData[0];
          if (!oneItem) {
            setOrderData({ data: [], series: [] });
            return;
          }

          const keys = Object.keys(oneItem);
          // Filter p1, p2, p3 ...
          const pKeys = keys.filter((k) => /^p\d+$/.test(k));
          const series: ParticipantsStatisticsSeriesItem[] = pKeys.map((key) => ({
            dataKey: key,
            label: (oneItem[`${key}_title`] as string) || key,
          }));
          setOrderData({ data: tempData, series: series });
        })
        .catch(() => {
          setIsDataValid(false);
          setOrderData({ data: [], series: [] });
        });
    }
  }, [card, triggerItems, isFormValid]);

  return (
    <div className="border-neutral-4 rounded-lg border px-6! pt-4! pb-10!">
      <CustomDivider
        text="سفارشات ثبت شده 14 روز آتی"
        extraContent={<PiInfoThin size={16} color="#BFBFBF" />}
      />
      <div className="text-orange-6 body-regular">عدم وابستگی به بازه زمانی</div>
      <Div loading={isReportDetailLoading}>
        {isDataValid === false ? (
          <CustomCard>
            <div className="report-info-not-found">دیتا پشتیبانی نمیشود</div>
          </CustomCard>
        ) : isDataValid === null || !orderData.data.length ? (
          <CustomEmpty />
        ) : (
          <CustomChart
            type="line"
            data={{
              dataset: orderData.data,
              series: orderData.series.map((s) => ({
                data: orderData.data.map((item) => (item[s.dataKey] as number) || 0),
                label: s.label,
                showMark: false,
              })),
              yAxis: [
                {
                  tickLabelStyle: {
                    textAnchor: "end",
                    direction: "ltr",
                  },
                },
              ],
              xAxis: [
                {
                  scaleType: "point",
                  dataKey: "date",
                },
              ],
            }}
            config={{
              height: 300,
              grid: { horizontal: true },
              loading: isReportDetailLoading,
            }}
          />
        )}
      </Div>
    </div>
  );
};

export default FutureFourteenDaysOrder;
