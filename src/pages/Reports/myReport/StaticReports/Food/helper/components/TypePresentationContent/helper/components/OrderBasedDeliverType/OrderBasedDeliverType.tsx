import { useEffect, useState } from "react";

import { PiInfoThin } from "react-icons/pi";

import CustomCard from "@components/CustomCard/CustomCard";
import { CustomChart } from "@components/Renderers/CustomChart";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import Div from "@components/Renderers/Div/Div";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useMyReportDetailsMutation } from "@infra/states/redux/Apis/report/myReport";

import { OrderBasedDeliverTypeProps } from "./@types/@orderBasedDeliverType";
import { FOOD_CARD_IDS } from "../../../../../utils/FoodStaticReportsUtils";

const buildSeriesFromApi = (data: any[], stack = "food") => {
  if (!data?.length) return [];

  const sample = data[0];

  return Object.keys(sample)
    .filter((key) => key.endsWith("_amount") && !key.startsWith("p1_"))
    .map((amountKey) => {
      const prefix = amountKey.replace("_amount", "");

      return {
        dataKey: amountKey,
        stack,
        label: sample[`${prefix}_title`] as string,
      };
    });
};

const OrderBasedDeliverType = ({
  isFormValid,
  createBodyParams,
  triggerItems,
  validateData,
}: OrderBasedDeliverTypeProps) => {
  const [chartData, setChartData] = useState<{
    data: any;
    series: { dataKey: string; stack: string; label: string }[];
  }>({ data: [], series: [] });
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
        id: 84,
        params: createBodyParams() || {},
      })
        .unwrap()
        .then((value: any) => {
          const dataArray = value?.data || [];

          // Validate using REC_CHART structure (p1_title and p1_amount)
          const isValid = validateData(dataArray, "REC_CHART");
          setIsDataValid(isValid);

          if (isValid === null || isValid === false) {
            setChartData({ data: [], series: [] });
            return;
          }

          const series = buildSeriesFromApi(dataArray);
          setChartData({ data: dataArray, series });
        })
        .catch(() => {
          setIsDataValid(false);
          setChartData({ data: [], series: [] });
        });
    }
  }, [card, triggerItems, isFormValid, createBodyParams, getReportDetail, validateData]);

  return (
    <div className="border-neutral-4 rounded-lg border px-6! pt-4!">
      <CustomDivider
        text="سفارش بر اساس نوع ارائه غذا"
        extraContent={<PiInfoThin size={16} color="#BFBFBF" />}
      />
      <Div loading={isReportLoading}>
        {isDataValid === false ? (
          <CustomCard>
            <div className="report-info-not-found">دیتا پشتیبانی نمیشود</div>
          </CustomCard>
        ) : isDataValid === null || !chartData?.data?.length ? (
          <CustomEmpty />
        ) : (
          <CustomChart
            type="bar"
            data={{
              dataset: chartData?.data,
              xAxis: [
                {
                  scaleType: "band",
                  dataKey: "p1_title",
                  tickLabelStyle: {
                    textAnchor: "end",
                    direction: "rtl",
                  },
                },
              ],
              series: chartData?.series,
              yAxis: [
                {
                  scaleType: "linear",
                  position: "right",
                  dataKey: "value",
                  tickLabelStyle: { direction: "ltr" },
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

export default OrderBasedDeliverType;
