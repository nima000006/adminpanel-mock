import { Button, Form, FormInstance, Row, Upload } from "antd";
import { AiOutlineUpload } from "react-icons/ai";

import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

import AdditionalResearchTab from "../../../../../../components/Committee/HandleProcessing/Accusations/AdditionalResearch/AdditionalResearchTab";
import AccusationCaseAccusedAndReporterInformationTab from "../../../../../../components/Committee/HandleProcessing/Accusations/Information/AccusedAndReporterInformationTab";
import AccusationCaseInfringementInfoTab from "../../../../../../components/Committee/HandleProcessing/Accusations/InfringementInfo/InfringementInfoTab";
import IssuedVoteTab from "../../../../../../components/Committee/HandleProcessing/Accusations/IssuedVote/IssuedVoteTab";
import ProcessFlowTab from "../../../../../../components/Committee/HandleProcessing/Accusations/ProcessFlow/ProcessFlowTab";
import AccusationCaseReportTab from "../../../../../../components/Committee/HandleProcessing/Accusations/Report/AccusationCaseReportTab";
import StudentDefenseTab from "../../../../../../components/Committee/HandleProcessing/Accusations/StudentDefense/StudentDefenseTab";
import CustomCard from "../../../../../../components/CustomCard/CustomCard";
import CustomCheckboxGroup from "../../../../../../components/CustomInputs/CustomCheckboxGroup/CustomCheckboxGroup";
import CustomRadioGroup from "../../../../../../components/CustomInputs/CustomRadioGroup/CustomRadioGroup";
import CustomSelect from "../../../../../../components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "../../../../../../components/CustomInputs/CustomTextArea/CustomTextArea";
import { dataPlaceHolder } from "../../../../../../infrastructure/helpers/utils";
import { REQUIRED_RULE } from "../../../../../../infrastructure/validation/validationSchema";
import { PADDING_20 } from "../../../../../../infrastructure/VARS/globalStyles/globalStyles";
import { RegisterCommentModalFormData } from "../@types/@typesAccusationAppealDetail";

export const AccusedInfo = (
  data:
    | {
        nationalCode: string;
        studentNumber: string;
        studentName: string;
        studentPhoneNumber: string;
        id: number;
        studentFamily: string;
      }
    | undefined
) => {
  return [
    {
      label: (
        <Row gutter={[12, 12]}>
          <SingleVerticalWithCol md={12} sm={24} label="نام" value={data?.studentName} />

          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="نام خانوادگی"
            value={data?.studentFamily}
          />

          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="شماره ملی"
            value={data?.nationalCode}
          />

          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="شماره دانشجویی"
            value={data?.studentNumber}
          />
        </Row>
      ),
      children: (
        <>
          {/* <SingleVerticalItem label="دپارتمان" value="-" /> */}
          {/* <SingleVerticalItem label="سمت" value="-" /> */}
          {/* <SingleVerticalItem label="سن" value="-" /> */}
          {/* <SingleVerticalItem label="سال ورود" value="-" /> */}
          {/* <SingleVerticalItem label="رشته" value="-" /> */}
          {/* <SingleVerticalItem label="مقطع" value="-" /> */}
          {/* <SingleVerticalItem label="معدل" value="-" /> */}
          {/* <SingleVerticalItem label="تعداد واحدهای گذرانده" value="-" /> */}
          {/* <SingleVerticalItem label="تعداد گزارشات دوره" value="-" /> */}
          {/* <SingleVerticalItem label="تعداد اتهامات دوره" value="-" /> */}
          {/* <SingleVerticalItem label="بومی/ غیربومی" value="-" /> */}

          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="شماره موبایل"
            value={dataPlaceHolder({ data: data?.studentPhoneNumber })}
          />
        </>
      ),
    },
  ];
};

export const Items = (id: string, isIssuedVoteEdited: boolean) => {
  return [
    {
      label: "گزارش",
      children: <AccusationCaseReportTab id={id} />,
      key: "1",
    },
    {
      label: "اطلاعات هویتی طرفین",
      children: <AccusationCaseAccusedAndReporterInformationTab id={id} />,
      key: "2",
    },
    {
      label: "اطلاعات اتهام",
      children: <AccusationCaseInfringementInfoTab id={id} />,
      key: "3",
    },
    {
      label: "نظرات",
      children: <AdditionalResearchTab id={id} />,
      key: "4",
    },

    {
      label: "دفاعیات دانشجو",
      children: <StudentDefenseTab id={id} />,
      key: "5",
    },
    {
      label: "آرا صادره",
      children: <IssuedVoteTab id={id} isEdited={isIssuedVoteEdited} />,
      key: "6",
    },
    {
      label: "مسیر فرآیند",
      children: <ProcessFlowTab />,
      key: "7",
    },
  ];
};

// رفع ارجاع
export const ReferralRemovalModalContent = ({
  form,
  loading,
}: {
  form: FormInstance<{ referralRemovalItems: string[] }>;
  loading: boolean;
}) => {
  const options = [
    { label: "حراست", value: "sentToSecurity" },
    {
      label: "معاونت پژوهشی",
      value: "sentToResearchAssistant",
    },
    {
      label: "معاونت آموزشی",
      value: "sentToEducationalAssistant",
    },
    {
      label: "معاونت دانشجویی",
      value: "sentToStudentVice",
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomCard
      padding={PADDING_20}
      className="committee-accusation-case-referral-removal-modal-container"
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

// انتقال به کمیته تفهیم
export const ClarificationCommitteeTransferModalContent = ({
  form,
}: {
  form: FormInstance<{ referralRemovalItems: string }>;
}) => {
  const options = [
    { label: "دریافت سیستمی دفاعیه", value: "5" },
    { label: "دعوت به دبیرخانه", value: "4" },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomCard
      padding={PADDING_20}
      className="committee-accusation-case-clarification-committee-transfer-modal-container"
    >
      <p className="title">یکی از روشهای زیر را انتخاب فرمائید:</p>
      <Form form={form}>
        <CustomRadioGroup
          options={options}
          name="referralRemovalItems"
          rules={[REQUIRED_RULE]}
        />
      </Form>
    </CustomCard>
  );
};

//  انتقال به آماده جلسه
export const ReadySessionTransferModalContent = () => {
  return (
    <CustomCard
      padding={PADDING_20}
      className="committee-accusation-case-ready-session-transfer-modal-container"
    >
      <p>از انتقال به آماده جلسه مطمئن هستید؟</p>
    </CustomCard>
  );
};

// عودت به آماده جلسه
export const ReturnToSessionModalContent = () => {
  return (
    <CustomCard
      padding={PADDING_20}
      className="committee-accusation-case-return-to-session-modal-container"
    >
      <p>از عودت به آماده جلسه مطمئن هستید؟</p>
    </CustomCard>
  );
};

// ثبت نظر
export const RegisterCommentModalContent = ({
  commentList = [],
  form,
}: {
  commentList?: {
    id: number;
    title: string;
  }[];
  form: FormInstance<RegisterCommentModalFormData>;
}) => {
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomCard
      padding={PADDING_20}
      className="committee-accusation-case-register-comment-modal-container"
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
            label="دلیل برگزاری جلسه"
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
