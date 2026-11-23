import { useEffect, useState } from "react";

import { PiGauge, PiInfoThin } from "react-icons/pi";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useMyReportDetailsMutation } from "@infra/states/redux/Apis/report/myReport";
import { DORM_STATIC_REPORT_CARD_IDS } from "@pages/Reports/myReport/StaticReports/Dorm/_utils/dormStaticReportUtil";
import { MyReportDetailsResponse } from "@pages/Reports/myReport/StaticReports/MyDoctor/@types/@myDoctorStaticReport";

import { RequestHandlingTimeProps } from "./@types/@requestHandlingTime";

const RequestHandlingTime = ({
  createBodyParams,
  triggerItems,
  isFormValid,
}: RequestHandlingTimeProps) => {
  const [handlingTime, setHandlingTime] = useState<{
    min: number | null;
    max: number | null;
    average: number | null;
  }>({
    min: null,
    max: null,
    average: null,
  });

  const {
    params: { card },
  } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getReportDetail, { isLoading: isReportDetailLoading }] =
    useMyReportDetailsMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (+card === DORM_STATIC_REPORT_CARD_IDS.requestHandling) {
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
        id: 52,
        params: params,
      })
        .unwrap()
        .then((value: MyReportDetailsResponse) => {
          const dataArray = Array.isArray(value?.data) ? value.data : [];
          const timeData = dataArray[0] as Record<string, unknown> | undefined;
          if (timeData) {
            setHandlingTime({
              min: (timeData["مینیمم روز بررسی درخواست"] as number) ?? null,
              max: (timeData["ماکزمیم روز  بررسی درخواست "] as number) ?? null,
              average: (timeData[" میانگین روز  بررسی درخواست"] as number) ?? null,
            });
          } else {
            setHandlingTime({
              min: null,
              max: null,
              average: null,
            });
          }
        })
        .catch(() => {
          setHandlingTime({
            min: null,
            max: null,
            average: null,
          });
        });
    }
  }, [card, triggerItems, isFormValid, createBodyParams, getReportDetail]);

  return (
    <div className="border-neutral-4 rounded-lg border px-6! pt-4!">
      <CustomDivider
        text="زمان رسیدگی به درخواست‌ها"
        extraContent={<PiInfoThin size={16} color="#BFBFBF" />}
      />

      <Div
        loading={isReportDetailLoading}
        className="border-t-neutral-4 flex flex-col gap-4 border-t py-8!"
      >
        <div className="bg-neutral-2 flex justify-between rounded-2xl p-4!">
          <div className="flex items-center gap-2">
            <div className="bg-primary-1 flex h-10 w-10 items-center justify-center rounded-[10px]">
              {<PiGauge size={32} color="#1890FF" />}
            </div>
            <span className="body-regular">میانگین</span>
          </div>
          <span className="h4-medium">
            {handlingTime.average !== null ? `${handlingTime.average} روز` : "-"}
          </span>
        </div>

        <div className="bg-neutral-2 flex justify-between rounded-2xl p-4!">
          <div className="flex items-center gap-2">
            <div className="bg-green-1 flex h-10 w-10 items-center justify-center rounded-[10px]">
              {<PiGauge size={32} color="#52C41A" />}
            </div>
            <span className="body-regular">کمترین</span>
          </div>
          <span className="h4-medium">
            {handlingTime.min !== null ? `${handlingTime.min} روز` : "-"}
          </span>
        </div>

        <div className="bg-neutral-2 flex justify-between rounded-2xl p-4!">
          <div className="flex items-center gap-2">
            <div className="bg-dustred-1 flex h-10 w-10 items-center justify-center rounded-[10px]">
              {<PiGauge size={32} color="#F5222D" />}
            </div>
            <span className="body-regular">بیشترین</span>
          </div>
          <span className="h4-medium">
            {handlingTime.max !== null ? `${handlingTime.max} روز` : "-"}
          </span>
        </div>
      </Div>
    </div>
  );
};

export default RequestHandlingTime;
