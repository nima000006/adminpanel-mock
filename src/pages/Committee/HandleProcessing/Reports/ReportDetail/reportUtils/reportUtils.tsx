import { Button, Form, FormInstance, Upload } from "antd";
import { AiOutlineUpload } from "react-icons/ai";

import CustomCard from "../../../../../../components/CustomCard/CustomCard";
import CustomCheckboxGroup from "../../../../../../components/CustomInputs/CustomCheckboxGroup/CustomCheckboxGroup";
import CustomSelect from "../../../../../../components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "../../../../../../components/CustomInputs/CustomTextArea/CustomTextArea";
import SingleVerticalItem from "../../../../../../components/Renderers/SingleVerticalItem/SingleVerticalItem";
import { dataPlaceHolder } from "../../../../../../infrastructure/helpers/utils";
import { CUSTOM_REQUIRED_RULE } from "../../../../../../infrastructure/validation/validationSchema";
import { PADDING_20 } from "../../../../../../infrastructure/VARS/globalStyles/globalStyles";
import { ReporterInfoProps } from "../@types/@typesCommitteeReportDetail";

const ReporterInfo = ({
  reporterName,
  reporterFamily,
  reporterNationalcode,
  reporterNumber,
  reporterPhoneNumber,
}: ReporterInfoProps) => {
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return [
    {
      label: (
        <div className="reporter-info-items-container">
          <SingleVerticalItem
            label="نام"
            value={dataPlaceHolder({ data: reporterName })}
          />
          <SingleVerticalItem
            label="نام خانوادگی"
            value={dataPlaceHolder({ data: reporterFamily })}
          />
          <SingleVerticalItem
            label="شماره ملی"
            value={dataPlaceHolder({ data: reporterNationalcode })}
          />
          <SingleVerticalItem
            label="شماره دانشجویی"
            value={dataPlaceHolder({ data: reporterNumber })}
          />
        </div>
      ),
      children: (
        <div className="reporter-info-items-container">
          {/* <SingleVerticalItem label="دپارتمان" value={dataPlaceHolder({ data: "_" })} />
          <SingleVerticalItem label="سمت" value={dataPlaceHolder({ data: "_" })} />
          <SingleVerticalItem label="سن" value={dataPlaceHolder({ data: "_" })} />
          <SingleVerticalItem label="سال ورود" value={dataPlaceHolder({ data: "_" })} />
          <SingleVerticalItem label="رشته" value={dataPlaceHolder({ data: "-" })} />
          <SingleVerticalItem label="مقطع" value={dataPlaceHolder({ data: "-" })} />
          <SingleVerticalItem label="معدل" value={dataPlaceHolder({ data: "_" })} />
          <SingleVerticalItem
            label="تعداد واحدهای گذرانده"
            value={dataPlaceHolder({ data: "_" })}
          />
          <SingleVerticalItem
            label="تعداد گزارشات دوره"
            value={dataPlaceHolder({ data: "_" })}
          />
          <SingleVerticalItem
            label="تعداد اتهامات دوره"
            value={dataPlaceHolder({ data: "_" })}
          />
          <SingleVerticalItem
            label="بومی/ غیربومی"
            value={dataPlaceHolder({ data: "_" })}
          /> */}
          <SingleVerticalItem
            label="شماره موبایل"
            value={dataPlaceHolder({ data: reporterPhoneNumber })}
          />
        </div>
      ),
    },
  ];
};

// رفع ارجاع
export const ReferralRemovalModalContent = ({
  form,
  loading,
}: {
  form: FormInstance<any>;
  loading: boolean;
}) => {
  const options = [
    { label: "گزارشگر", value: "sendToReporter" },
    { label: "حراست", value: "sendToProtection" },
    { label: "معاونت پژوهشی", value: "sendToResearchAssistant" },
    { label: "معاونت آموزشی", value: "sendToEducAssistant" },
    { label: "معاونت دانشجویی", value: "sendToStudentPresident" },
    { label: "مشاور", value: "sendToConsultant" },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomCard
      padding={PADDING_20}
      className="committee-report-detail-referral-removal-modal-container"
      loading={loading}
    >
      <Form form={form}>
        <CustomCheckboxGroup
          containerClassName="checkbox-btn-container"
          checkboxClassName="checkbox-btns"
          label="از کدام مراحل رد شود؟"
          options={options}
          name="referralRemovalItems"
        />
      </Form>
    </CustomCard>
  );
};

//! رد کردن
export const RejectReportModalContent = ({
  options = [],
  form,
  isLoading,
}: {
  options?: {
    id: number;
    title: string;
  }[];
  form: FormInstance<any>;
  isLoading: boolean;
}) => {
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomCard
      padding={PADDING_20}
      className="committee-report-detail-reject-report-modal-container"
    >
      <Form className="inputs-container" form={form}>
        <CustomSelect
          isLoading={isLoading}
          label="دلیل"
          name="rejectReason"
          options={options}
          form={form}
          rules={[CUSTOM_REQUIRED_RULE("لطفا دلیل را وارد کنید")]}
          placeholder="انتخاب کنید"
        />
        <CustomTextArea
          label="توضیحات"
          rules={[CUSTOM_REQUIRED_RULE("لطفا توضیحات رد را وارد کنید")]}
          name="rejectDescription"
          placeholder="توضیحات"
        />
      </Form>
    </CustomCard>
  );
};

//! ثبت نظر
export const RegisterCommentModalContent = ({
  commentList = [],
  form,
}: {
  commentList?: {
    id: number;
    title: string;
  }[];
  form: FormInstance<any>;
}) => {
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomCard
      padding={PADDING_20}
      className="committee-report-detail-register-comment-modal-container"
    >
      <Form className="form" form={form}>
        <div className="inputs-container">
          <CustomSelect
            label="نظر"
            name="registerComment"
            options={commentList}
            placeholder="انتخاب کنید"
            form={form}
          />
          <CustomTextArea
            label="توضیحات"
            name="registerDescription"
            placeholder="توضیحات"
          />
        </div>
        <div className="attachment-container">
          <h3 className="step-title">پیوست ها</h3>
          <Upload className="upload-container" listType="picture" multiple disabled>
            <Button icon={<AiOutlineUpload />} className="custom-btn" disabled>
              بارگذاری تصاویر
            </Button>
          </Upload>
        </div>
      </Form>
    </CustomCard>
  );
};

export default ReporterInfo;
