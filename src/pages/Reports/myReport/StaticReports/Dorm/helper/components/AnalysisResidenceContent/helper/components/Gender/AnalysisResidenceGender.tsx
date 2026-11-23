import { useEffect, useState } from "react";

import { PiGenderFemale, PiGenderMale, PiInfoThin } from "react-icons/pi";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useMyReportDetailsMutation } from "@infra/states/redux/Apis/report/myReport";
import { DORM_STATIC_REPORT_CARD_IDS } from "@pages/Reports/myReport/StaticReports/Dorm/_utils/dormStaticReportUtil";
import { MyReportDetailsResponse } from "@pages/Reports/myReport/StaticReports/MyDoctor/@types/@myDoctorStaticReport";

import {
  AnalysisResidenceGenderProps,
  GenderDataItem,
} from "./@types/@analysisResidenceGender";

const AnalysisResidenceGender = ({
  createBodyParams,
  triggerItems,
  isFormValid,
}: AnalysisResidenceGenderProps) => {
  const [genderData, setGenderData] = useState<{
    male: {
      total: number;
      gender: string;
      percentage: number;
    } | null;
    female: { total: number; gender: string; percentage: number } | null;
  }>({ male: null, female: null });

  const {
    params: { card },
  } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getReportDetail, { isLoading: isReportDetailLoading }] =
    useMyReportDetailsMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (+card === DORM_STATIC_REPORT_CARD_IDS.residenceAnalysis) {
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
        id: 47,
        params: params,
      })
        .unwrap()
        .then((value: MyReportDetailsResponse) => {
          const dataArray = Array.isArray(value?.data) ? (value.data as unknown) : [];
          (dataArray as GenderDataItem[]).forEach((item) => {
            const genderItem = item;
            if (genderItem.gender === "برادران") {
              setGenderData((prev) => ({ ...prev, male: genderItem }));
            } else {
              setGenderData((prev) => ({ ...prev, female: genderItem }));
            }
          });
        });
    }
  }, [card, triggerItems, isFormValid]);

  return (
    <Div
      loading={isReportDetailLoading}
      className="border-neutral-4 rounded-lg border px-6! pt-4!"
    >
      <CustomDivider
        text="آمار ساکنین به تفکیک جنسیت"
        extraContent={<PiInfoThin size={16} color="#BFBFBF" />}
      />

      <div className="border-t-neutral-4 border-t py-8!">
        <div className="bg-neutral-2 flex justify-between rounded-2xl p-4!">
          <div className="flex items-center gap-2">
            <div className="bg-primary-1 flex h-10 w-10 items-center justify-center rounded-[10px]">
              {<PiGenderMale size={32} color="#1890FF" />}
            </div>
            <span className="body-regular">برادران</span>
          </div>
          <div className="flex gap-2">
            <div className="h4-medium flex gap-1">
              <span>
                {dataPlaceHolder({
                  data: genderData?.male?.total?.toString(),
                  isPrice: true,
                })}
              </span>
              <span>نفر</span>
            </div>

            <div className="border-neutral-5 body-regular h-6 items-center justify-center rounded-lg border px-2!">
              {genderData?.male?.percentage?.toString()}%
            </div>
          </div>
        </div>

        <div className="bg-neutral-2 my-8! flex justify-between rounded-2xl p-4!">
          <div className="flex items-center gap-2">
            <div className="bg-magenta-1 flex h-10 w-10 items-center justify-center rounded-[10px]">
              {<PiGenderFemale size={32} color="#EB2F96" />}
            </div>
            <span className="body-regular">خواهران</span>
          </div>
          <div className="flex gap-2">
            <div className="h4-medium flex gap-1">
              <span>
                {dataPlaceHolder({
                  data: genderData?.female?.total?.toString(),
                  isPrice: true,
                })}
              </span>
              <span>نفر</span>
            </div>

            <div className="border-neutral-5 body-regular h-6 items-center justify-center rounded-lg border px-2!">
              {genderData?.female?.percentage?.toString()}%
            </div>
          </div>
        </div>
      </div>
    </Div>
  );
};

export default AnalysisResidenceGender;
