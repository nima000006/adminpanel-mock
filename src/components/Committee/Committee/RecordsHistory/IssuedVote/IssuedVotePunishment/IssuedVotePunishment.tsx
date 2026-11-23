import { useState } from "react";

import { PunishmentType } from "./@types/@issuedVotePunishment";
import { REQUIRED_RULE } from "../../../../../../infrastructure/validation/validationSchema";
import { PADDING_24 } from "../../../../../../infrastructure/VARS/globalStyles/globalStyles";
import CustomCard from "../../../../../CustomCard/CustomCard";
import CustomDatePicker from "../../../../../CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomSelect from "../../../../../CustomInputs/CustomSelect/CustomSelect";
import CustomSwitch from "../../../../../CustomInputs/CustomSwitch/CustomSwitch";
import CustomTextArea from "../../../../../CustomInputs/CustomTextArea/CustomTextArea";
import CustomDivider from "../../../../../Renderers/CustomDivider/CustomDivider";
import "./_issuedVotePunishment.scss";

export const IssuedVotePunishment = ({
  count,
  submitForm,
  isPunishmentListLoading,
  punishmentListData,
  certaintyListData,
  executionListData,
  isCertaintyListLoading,
  isExecutionListLoading,
  reasonEscalationListData,
  isReasonEscalationListLoading,
  committeeName,
}: PunishmentType) => {
  const [_, setSentenceIntensification] = useState(
    submitForm.getFieldValue(`${committeeName}_sentenceIntensificationReason_${count}`)
  );

  //* ================================ Util Functions ================================
  const intensificationSwitchHandler = (e: boolean) => {
    setSentenceIntensification(e);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomCard
      padding={PADDING_24}
      className="committee-records-submit-issued-vote-punishment-container"
      key={count}
    >
      <CustomDivider text={`تنبیه ${count}`} />
      <div className="punishments-container">
        <CustomSelect
          label="تنبیه انضباطی صادره"
          name={`${committeeName}_disciplinaryPunishmentIssued_${count}`}
          placeholder="انتخاب کنید"
          form={submitForm}
          isLoading={isPunishmentListLoading}
          options={punishmentListData ? punishmentListData : []}
          rules={[REQUIRED_RULE]}
        />
        <CustomSelect
          label="قطعیت"
          name={`${committeeName}_certainty_${count}`}
          placeholder="انتخاب کنید"
          form={submitForm}
          isLoading={isCertaintyListLoading}
          options={certaintyListData ? certaintyListData : []}
          rules={[REQUIRED_RULE]}
        />
        <CustomSelect
          label="وضعیت اجرای حکم"
          name={`${committeeName}_sentenceExecutionStatus_${count}`}
          placeholder="انتخاب کنید"
          form={submitForm}
          isLoading={isExecutionListLoading}
          options={executionListData ? executionListData : []}
          rules={[REQUIRED_RULE]}
        />
        <CustomDatePicker
          label="تاریخ اجرای حکم"
          placeholder="انتخاب کنید"
          name={`${committeeName}_sentenceExecutionDate_${count}`}
          form={submitForm}
          defaultValue={
            submitForm.getFieldsValue()[`${committeeName}_sentenceExecutionDate_${count}`]
          }
          key={submitForm.getFieldValue(
            `${committeeName}_sentenceExecutionDate_${count}`
          )}
        />
      </div>
      <CustomCard padding={PADDING_24} className="flex-col-g32 margin-top">
        <CustomDivider
          text="تشدید حکم"
          extraContent={
            <CustomSwitch
              valuePropName={`${committeeName}_sentenceIntensificationSwitch_${count}`}
              onChange={intensificationSwitchHandler}
              defaultChecked={submitForm.getFieldValue(
                `${committeeName}_sentenceIntensificationSwitch_${count}`
              )}
              key={submitForm.getFieldValue(
                `${committeeName}_sentenceIntensificationSwitch_${count}`
              )}
            />
          }
        />

        {submitForm.getFieldValue(
          `${committeeName}_sentenceIntensificationSwitch_${count}`
        ) && (
          <div className="grid-cols-2">
            <CustomSelect
              label="دلیل تشدید حکم"
              name={`${committeeName}_sentenceIntensificationReason_${count}`}
              options={reasonEscalationListData ? reasonEscalationListData : []}
              isLoading={isReasonEscalationListLoading}
              form={submitForm}
              placeholder="انتخاب کنید"
            />
            <CustomSelect
              label="حکم تشدیدی"
              name={`${committeeName}_primitiveSentence_${count}`}
              isLoading={isPunishmentListLoading}
              options={punishmentListData ? punishmentListData : []}
              form={submitForm}
              placeholder="انتخاب کنید"
            />
            <div className="intensification-sentence-desc">
              <CustomTextArea
                label="توضیح"
                name={`${committeeName}_sentenceIntensificationDescription_${count}`}
                placeholder="توضیحات"
              />
            </div>
          </div>
        )}
      </CustomCard>
    </CustomCard>
  );
};

export default IssuedVotePunishment;
