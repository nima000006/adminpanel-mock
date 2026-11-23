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

import { BestSellingFoodProps } from "./@types/@bestSellingFood";
import { FOOD_CARD_IDS } from "../../../../../utils/FoodStaticReportsUtils";

type BestSellingFoodDataItem = {
  food: string;
  value: number;
};

const BestSellingFood = ({
  isFormValid,
  createBodyParams,
  triggerItems,
  validateData,
}: BestSellingFoodProps) => {
  const [chartData, setChartData] = useState<BestSellingFoodDataItem[]>([]);
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
        id: 85,
        params: createBodyParams() || {},
      })
        .unwrap()
        .then((value: MyReportDetailsResponse) => {
          const dataArray =
            (value?.data as unknown as ScoresOfTestDimensionsChartDataItem[]) || [];

          // Validate using BAR_CHART structure (key/value)
          const tempDataForValidation = dataArray.map((item) => ({
            key: item?.p1_title,
            value: item?.p1_amount,
          }));

          const isValid = validateData(tempDataForValidation, "BAR_CHART");
          setIsDataValid(isValid);

          if (isValid === null || isValid === false) {
            setChartData([]);
            return;
          }

          const tempData: BestSellingFoodDataItem[] = dataArray
            .filter((item) => item && item.p1_title && item.p1_amount != null)
            .map((item) => ({
              food: item.p1_title || "",
              value: item.p1_amount ?? 0,
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
    <div className="direction-rtl border-neutral-4 flex flex-col gap-8 rounded-lg border p-6!">
      <CustomDivider
        text="۵ غذای پرفروش"
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
                  dataKey: "food",
                  position: "right",
                  tickLabelStyle: {
                    textAnchor: "end",
                    direction: "rtl",
                  },
                },
              ],
              series: [
                {
                  dataKey: "value",
                  color: "#BAE7FF",
                  layout: "horizontal",
                },
              ],
              xAxis: [
                {
                  scaleType: "linear",
                  dataKey: "value",
                  reverse: true,
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

export default BestSellingFood;
