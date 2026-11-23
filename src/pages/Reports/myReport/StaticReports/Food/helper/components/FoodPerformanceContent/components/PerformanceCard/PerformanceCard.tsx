import { useEffect, useState } from "react";

import { PiInfoLight } from "react-icons/pi";

import Div from "@components/Renderers/Div/Div";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useMyReportDetailsMutation } from "@infra/states/redux/Apis/report/myReport";

import { PerformanceCardProps } from "./@types/@performanceCardProps";
import { FOOD_CARD_IDS } from "../../../../utils/FoodStaticReportsUtils";
import "./_performanceCard.scss";

const PerformanceCard = ({
  title,
  icon,
  unit,
  createBodyParams,
  triggerItems,
  reportId,
  isFormValid,
  validateData,
}: PerformanceCardProps) => {
  const [data, setData] = useState<string | null>(null);

  const {
    params: { card },
  } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getReportDetail, { isLoading: isReportDetailLoading }] =
    useMyReportDetailsMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (+card === FOOD_CARD_IDS.performance) {
      // اگر فیلدهای required پر نشده‌اند، درخواست ارسال نکن
      if (!isFormValid) {
        setData(null);
        return;
      }

      getReportDetail({
        id: reportId,
        params: createBodyParams() || {},
      })
        .unwrap()
        .then((value: any) => {
          const dataArray = Array.isArray(value?.data) ? value?.data : [];
          const isValid = validateData(dataArray, "NUMBER");

          if (isValid === null || isValid === false) {
            setData(null);
            return;
          }

          const tempData = value?.data?.[0];
          if (!tempData) {
            setData(null);
            return;
          }

          const dataKeys = Object.keys(tempData);
          if (dataKeys && dataKeys.length > 0) {
            const firstKey = dataKeys[0];
            const dataValue = tempData[firstKey];
            setData(dataValue != null ? String(dataValue) : null);
          } else {
            setData(null);
          }
        })
        .catch(() => {
          setData(null);
        });
    }
  }, [card, triggerItems, reportId, isFormValid]);

  return (
    <Div
      loading={isReportDetailLoading}
      className="border-neutral-4 flex flex-col gap-4 rounded-2xl border p-4!"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-neutral-3 flex h-10 w-10 items-center justify-center rounded-[10px]">
            {icon}
          </div>
          <span className="h5-medium">{title}</span>
        </div>
        <PiInfoLight size={16} color="#BFBFBF" />
      </div>

      <div className="h3-medium flex items-baseline gap-1">
        <span>
          {dataPlaceHolder({
            data: data,
            isPrice: true,
          })}
        </span>
        <span>{unit}</span>
      </div>
      {/* //Todo[Atefeh]: uncomment when api got ready */}
      {/* <div>
        <CustomTag
          icon={percentage <= 15 ? <PiTrendDown /> : <PiTrendUp />}
          color={percentage <= 15 ? "red" : "green"}
          className="wrap-tag"
        >
          {`${percentage}% ${percentage <= 15 ? "کاهش نسبت به دوره مشابه" : "افزایش نسبت به دوره مشابه"} `}
        </CustomTag>
      </div> */}
    </Div>
  );
};
export default PerformanceCard;
