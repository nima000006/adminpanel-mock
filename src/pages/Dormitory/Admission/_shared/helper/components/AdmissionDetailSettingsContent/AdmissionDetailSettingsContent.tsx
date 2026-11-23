import { useState } from "react";

import { PiPencilLine } from "react-icons/pi";
import { useNavigate } from "react-router";

import { CustomButton } from "@components/CustomInputs";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import { AdmissionRenewalSourceItem } from "@pages/Dormitory/Admission/_shared/@types/@admissionDetail";
import ReadonlySwitchAlert from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionDetailFinancialContent/helpers/components/ReadonlySwitchAlert/ReadonlySwitchAlert";
import { AdmissionDetailSettingsContentProps } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionDetailSettingsContent/@types/@admissionDetailSettingsContent";
import AdmissionDetailSettingsFinancialModal from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionDetailSettingsContent/helper/components/AdmissionDetailSettingsFinancialModal/AdmissionDetailSettingsFinancialModal";
import AdmissionRenewalSourceTableModel from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionDetailSettingsContent/helper/models/AdmissionRenewalSource/AdmissionRenewalSourceTableModel";
import {
  MY_ADMISSION_STATUS,
  SCHEDULE_TYPE,
} from "@pages/Dormitory/Admission/_shared/util";

const AdmissionDetailSettingsContent = ({
  variant,
  data,
  editTo,
  status,
}: AdmissionDetailSettingsContentProps) => {
  const navigate = useNavigate();
  const [financialModalRecord, setFinancialModalRecord] =
    useState<AdmissionRenewalSourceItem | null>(null);

  const isAllVariant = variant === "all";
  const showEdit = status === MY_ADMISSION_STATUS.waiting;
  const isTermic = data.scheduleType === SCHEDULE_TYPE.termic;
  const showRenewalSources = isTermic && data.hasRenewal;

  //* ================================ Util Functions ================================
  const viewSourceProgramHandler = (_record: AdmissionRenewalSourceItem) => {
    // TODO: navigate to source admission program detail when route is ready
  };

  const viewRenewalSourceHandler = (_record: AdmissionRenewalSourceItem) => {
    // TODO: navigate to renewal source detail when route is ready
  };

  const openFinancialSettingsHandler = (record: AdmissionRenewalSourceItem) => {
    setFinancialModalRecord(record);
  };

  const closeFinancialSettingsHandler = () => {
    setFinancialModalRecord(null);
  };

  const renewalQuestion = isTermic
    ? "آیا ساکنین قبلیِ برنامه‌های پذیرش‌ “ترمیک / دوره‌ای” امکان ثبت درخواست تمدید دارند؟"
    : "آیا می‌خواهید ساکنین این برنامه پذیرش امکان ثبت درخواست تمدید داشته باشند؟";

  const renewalDescription = isTermic
    ? "در صورت فعال بودن، در زیر لیست برنامه‌های پذیرشی که ساکنینشان می‌توانند برای ظرفیت‌های این برنامه درخواست تمدید ثبت کنند آورده شده است."
    : `در صورت فعال بودن، ساکنین این برنامه پذیرش امکان ثبت درخواست تمدید برای اقامت خود را در بازه مجاز اسکان این برنامه از “${data.renewalAllowedFrom}” تا “${data.renewalAllowedTo}” را دارند.`;

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      <div className="flex flex-col gap-10">
        {isAllVariant && showEdit && editTo && (
          <CustomDivider
            text=""
            extraContent={
              <CustomButton
                type="dashed"
                icon={<PiPencilLine />}
                onClick={() => navigate(editTo)}
              >
                ویرایش
              </CustomButton>
            }
          />
        )}

        <div className="flex flex-col gap-6">
          <CustomDivider text="تنظیمات تمدید" />

          <ReadonlySwitchAlert
            valuePropName="hasRenewal"
            checked={data.hasRenewal}
            question={renewalQuestion}
            description={renewalDescription}
          />

          {showRenewalSources && (
            <CustomTable
              dataSource={data.renewalSources}
              rowKey="id"
              columns={AdmissionRenewalSourceTableModel({
                onViewSourceProgram: viewSourceProgramHandler,
                onView: viewRenewalSourceHandler,
                onViewFinancialSettings: openFinancialSettingsHandler,
              })}
              pagination={false}
            />
          )}
        </div>
      </div>

      {financialModalRecord && (
        <AdmissionDetailSettingsFinancialModal
          open={!!financialModalRecord}
          record={financialModalRecord}
          currentProgramTitle={data.programTitle}
          onCancel={closeFinancialSettingsHandler}
        />
      )}
    </>
  );
};

export default AdmissionDetailSettingsContent;
