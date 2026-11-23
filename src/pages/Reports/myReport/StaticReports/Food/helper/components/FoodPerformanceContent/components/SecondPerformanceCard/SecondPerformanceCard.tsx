import { useEffect, useState } from "react";

import { PiInfoLight } from "react-icons/pi";

import Div from "@components/Renderers/Div/Div";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useMyReportDetailsMutation } from "@infra/states/redux/Apis/report/myReport";

import { SecondPerformanceCardProps } from "./@types/@secondPerformanceCardProps";
import { FOOD_CARD_IDS } from "../../../../utils/FoodStaticReportsUtils";

const SecondPerformanceCard = ({
  title,
  icon,
  unit,
  createBodyParams,
  triggerItems,
  reportId,
  isFormValid,
  validateData,
}: SecondPerformanceCardProps) => {
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
      className="border-neutral-4 flex w-full flex-col gap-4 rounded-2xl border p-4!"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-neutral-3 flex h-10 w-10 items-center justify-center rounded-[10px]">
            {icon}
          </div>
          <div className="flex w-full flex-col">
            <div className="h5-medium body-regular">{title}</div>
            <div className="text-orange-6 body-regular">عدم وابستگی به بازه زمانی</div>
          </div>
        </div>
        <PiInfoLight size={16} color="#BFBFBF" />
      </div>

      <div className="h3-medium flex items-baseline gap-1 whitespace-nowrap">
        <span>
          {dataPlaceHolder({
            data: data,
            isPrice: true,
          })}
        </span>
        <span>{unit}</span>
      </div>
    </Div>
  );
};
export default SecondPerformanceCard;
