import { useEffect, useState } from "react";

import { PiInfoThin } from "react-icons/pi";

import CustomCard from "@components/CustomCard/CustomCard";
import { CustomChart } from "@components/Renderers/CustomChart";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import Div from "@components/Renderers/Div/Div";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useMyReportDetailsMutation } from "@infra/states/redux/Apis/report/myReport";
import {
  MyReportDetailsResponse,
  ScoresOfTestDimensionsChartDataItem,
} from "@pages/Reports/myReport/StaticReports/MyDoctor/@types/@myDoctorStaticReport";

import { OrderBasedMealProps } from "./@types/@orderBasedMeal";
import { FOOD_CARD_IDS } from "../../../../../utils/FoodStaticReportsUtils";

type OrderBasedMealDataItem = {
  p1_title: string;
  p1_amount: number;
};

const OrderBasedMeal = ({
  isFormValid,
  createBodyParams,
  triggerItems,
  validateData,
}: OrderBasedMealProps) => {
  const [chartData, setChartData] = useState<OrderBasedMealDataItem[]>([]);
  const [isDataValid, setIsDataValid] = useState<boolean | null>(null);

  const {
    params: { card },
  } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getReportDetail, { isLoading: isReportLoading }] = useMyReportDetailsMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (+card === FOOD_CARD_IDS.typePresentation) {
      // اگر فیلدهای required پر نشده‌اند، درخواست ارسال نکن
      if (!isFormValid) {
        return;
      }
      getReportDetail({
        id: 83,
        params: createBodyParams() || {},
      })
        .unwrap()
        .then((value: MyReportDetailsResponse) => {
          const dataArray =
            (value?.data as unknown as ScoresOfTestDimensionsChartDataItem[]) || [];

          const isValid = validateData(dataArray, "REC_CHART");
          setIsDataValid(isValid);

          if (isValid === null || isValid === false) {
            setChartData([]);
            return;
          }

          const tempData: OrderBasedMealDataItem[] = dataArray
            .filter((item) => item && item.p1_title && item.p1_amount != null)
            .map((item) => ({
              p1_title: item.p1_title || "",
              p1_amount: item.p1_amount ?? 0,
            }));

          setChartData(tempData);
        })
        .catch(() => {
          setIsDataValid(false);
          setChartData([]);
        });
    }
  }, [card, triggerItems, isFormValid, createBodyParams, getReportDetail, validateData]);

  return (
    <div className="border-neutral-4 rounded-lg border px-6! pt-4!">
      <CustomDivider
        text="سفارش بر اساس وعده"
        extraContent={<PiInfoThin size={16} color="#BFBFBF" />}
      />
      <Div loading={isReportLoading}>
        {isDataValid === false ? (
          <CustomCard>
            <div className="report-info-not-found">دیتا پشتیبانی نمیشود</div>
          </CustomCard>
        ) : isDataValid === null || !chartData.length ? (
          <CustomEmpty />
        ) : (
          <CustomChart
            type="bar"
            data={{
              dataset: chartData,
              yAxis: [
                {
                  width: 100,
                  scaleType: "band",
                  dataKey: "p1_title",
                  position: "right",
                  tickLabelStyle: {
                    textAnchor: "end",
                    direction: "rtl",
                  },
                },
              ],
              xAxis: [
                {
                  scaleType: "linear",
                  dataKey: "p1_amount",
                  reverse: true,
                  tickLabelStyle: { direction: "ltr" },
                },
              ],
              series: [
                {
                  dataKey: "p1_amount",
                  color: "#BAE7FF",
                  layout: "horizontal",
                },
              ],
            }}
            config={{
              height: 300,
              grid: { vertical: true, horizontal: true },
              loading: isReportLoading,
            }}
          />
        )}
      </Div>
    </div>
  );
};

export default OrderBasedMeal;
