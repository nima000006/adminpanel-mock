import { useEffect, useState } from "react";

import { PiInfoLight } from "react-icons/pi";

import Div from "@components/Renderers/Div/Div";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useMyReportDetailsMutation } from "@infra/states/redux/Apis/report/myReport";
import { DORM_STATIC_REPORT_CARD_IDS } from "@pages/Reports/myReport/StaticReports/Dorm/_utils/dormStaticReportUtil";
import { MyReportDetailsResponse } from "@pages/Reports/myReport/StaticReports/MyDoctor/@types/@myDoctorStaticReport";

import { PerformanceCardProps } from "./@types/@performanceCardProps";

const PerformanceCard = ({
  title,
  icon,
  unit,
  createBodyParams,
  triggerItems,
  reportId,
  isPrice,
  isFormValid,
  validateData: _validateData,
}: PerformanceCardProps) => {
  const [data, setData] = useState<number | string | null>(null);

  const {
    params: { card },
  } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getReportDetail, { isLoading: isReportDetailLoading }] =
    useMyReportDetailsMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (+card === DORM_STATIC_REPORT_CARD_IDS.performance || !card) {
      // اگر فیلدهای required پر نشده‌اند، درخواست ارسال نکن
      if (!isFormValid) {
        return;
      }

      const params = createBodyParams();
      // اگر createBodyParams null برگرداند، درخواست ارسال نکن
      if (params === null) {
        return;
      }

      getReportDetail({
        id: reportId,
        params: params,
      })
        .unwrap()
        .then((value: MyReportDetailsResponse) => {
          const dataArray = Array.isArray(value?.data) ? value.data : [];
          const tempData = dataArray[0] as Record<string, unknown> | undefined;
          if (tempData) {
            const dataKeys = Object.keys(tempData);
            if (dataKeys && dataKeys[0]) {
              setData(tempData[dataKeys[0]] as number | string);
            }
          }
        });
    }
  }, [card, triggerItems, reportId, isFormValid]);

  return (
    <Div
      loading={isReportDetailLoading}
      className="border-neutral-4 flex flex-col gap-4 rounded-2xl border p-4!"
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-neutral-3 flex h-10 w-10 items-center justify-center rounded-[10px]">
            {icon}
          </div>
          <span className="h5-medium">{title}</span>
        </div>
        <PiInfoLight size={16} color="#BFBFBF" />
      </div>

      {data ? (
        <div className="h4-medium xl:h3-medium flex items-baseline gap-1">
          <span>
            {dataPlaceHolder({
              data: typeof data === "number" ? data.toString() : (data as string),
              isPrice: isPrice,
            })}
          </span>
          <span>{unit}</span>
        </div>
      ) : (
        <span className="h3-medium">-</span>
      )}

      {/* //Todo[Atefeh]:uncomment when api got ready */}
      {/* <div>
        <CustomTag
          icon={percentage <= 15 ? <PiTrendDown /> : <PiTrendUp />}
          color={percentage <= 15 ? "red" : "green"}
          // className="business-list-custom-tag"
        >
          {`${percentage}% ${percentage <= 15 ? "کاهش نسبت به دوره مشابه" : "افزایش نسبت به دوره مشابه"} `}
        </CustomTag>
      </div> */}
    </Div>
  );
};
export default PerformanceCard;
