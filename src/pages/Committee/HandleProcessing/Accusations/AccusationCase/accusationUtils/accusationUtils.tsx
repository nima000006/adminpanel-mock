import { useEffect, useMemo, useState } from "react";

import { Button, Form, FormInstance, Row, Switch, Upload } from "antd";
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
import CustomDatePicker from "../../../../../../components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomRadioGroup from "../../../../../../components/CustomInputs/CustomRadioGroup/CustomRadioGroup";
import CustomSelect from "../../../../../../components/CustomInputs/CustomSelect/CustomSelect";
import CustomSwitch from "../../../../../../components/CustomInputs/CustomSwitch/CustomSwitch";
import CustomTextArea from "../../../../../../components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomDivider from "../../../../../../components/Renderers/CustomDivider/CustomDivider";
import Div from "../../../../../../components/Renderers/Div/Div";
import {
  dataPlaceHolder,
  selectDefaultValueGenerator,
} from "../../../../../../infrastructure/helpers/utils";
import {
  ConfirmRegisterVoteValuesType,
  OtherFilesItemType,
  RegisterCommentValuesType,
  clarificationCommitteeTransferValuesType,
} from "../../../../../../infrastructure/models/modules/committee/handleProcessing/accusationCenteral/accusationCenteral";
import {
  useGetCertaintyListQuery,
  useGetExecutionListQuery,
  useGetLegalArticleListQuery,
  useGetPunishmentsListQuery,
  useGetReasonEscalationListQuery,
  useLazyCentralAccusationGetMeetingDateQuery,
} from "../../../../../../infrastructure/states/redux/Apis/committee/committees/committees";
import {
  CUSTOM_REQUIRED_RULE,
  REQUIRED_RULE,
} from "../../../../../../infrastructure/validation/validationSchema";
import {
  PADDING_20,
  PADDING_24,
} from "../../../../../../infrastructure/VARS/globalStyles/globalStyles";
import {
  AccusationCaseSessionAllocationModalProps,
  AccusedInfoPropsType,
  PunishmentProps,
  ReferralHandlerValuesType,
  ReferralItemProps,
} from "../@types/@typesCommitteeAccusationCase";
import "../_committeeAccusationCase.scss";

export const AccusedInfo = (data: AccusedInfoPropsType | undefined) => {
  return [
    {
      label: (
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            md={12}
            label="نام"
            value={dataPlaceHolder({ data: data?.studentName })}
          />

          <SingleVerticalWithCol
            md={12}
            label="نام خانوادگی"
            value={dataPlaceHolder({ data: data?.studentFamily })}
          />

          <SingleVerticalWithCol
            md={12}
            label="شماره ملی"
            value={dataPlaceHolder({ data: data?.nationalCode })}
          />

          <SingleVerticalWithCol
            md={12}
            label="شماره دانشجویی"
            value={dataPlaceHolder({ data: data?.studentNumber })}
          />
        </Row>
      ),
      children: (
        <>
          {/* <SingleVerticalItem label="دپارتمان" value="-" />
          <SingleVerticalItem label="سمت" value="-" />
          <SingleVerticalItem label="سن" value="-" />
          <SingleVerticalItem label="سال ورود" value="-" /> */}
          {/* <SingleVerticalItem label="رشته" value="-" /> */}
          {/* <SingleVerticalItem label="مقطع" value="-" /> */}
          {/* <SingleVerticalItem label="معدل" value="-" /> */}
          {/* <SingleVerticalItem label="تعداد واحدهای گذرانده" value="-" />
          <SingleVerticalItem label="تعداد گزارشات دوره" value="-" />
          <SingleVerticalItem label="تعداد اتهامات دوره" value="-" />
          <SingleVerticalItem label="بومی/ غیربومی" value="-" /> */}

          <SingleVerticalWithCol
            md={12}
            label="شماره موبایل"
            value={data?.studentPhoneNumber}
          />
        </>
      ),
    },
  ];
};

export const Items = (
  id: string,
  isIssuedVoteEdited: boolean,
  isFromWarding: boolean
) => {
  return [
    {
      label: "گزارش",
      children: useMemo(() => <AccusationCaseReportTab id={id} />, []),
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
    ...(!isFromWarding
      ? [
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
        ]
      : []),

    {
      label: "مسیر فرآیند",
      children: <ProcessFlowTab />,
      key: "7",
    },
  ];
};

//  ارجاع
export const ReferralModalContent = ({
  defaultChecked,
  reasonList,
  form,
}: ReferralItemProps) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  //* ================================ Util Functions ================================
  const checkedHandler = () => setIsChecked(!isChecked);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomCard
      padding={PADDING_20}
      className="central-accusation-referral-modal-container"
    >
      <Form form={form}>
        <div className="divider-switch-btn-container">
          <CustomDivider text="حراست" />
          <div className="switch-btn">
            <CustomSwitch
              valuePropName="CentralReferralToCustody"
              onChange={checkedHandler}
            />
          </div>
        </div>
        {isChecked && (
          <div className="central-accusation-referral-modal-inputs-container">
            <CustomSelect
              label="دلیل"
              name="reason"
              options={reasonList}
              form={form}
              placeholder="انتخاب کنید"
            />
            <CustomTextArea label="توضیحات" name="description" placeholder="توضیحات" />
          </div>
        )}
      </Form>
    </CustomCard>
  );
};

// رفع ارجاع
export const ReferralRemovalModalContent = ({
  form,
  loading,
}: {
  form: FormInstance<ReferralHandlerValuesType>;
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
  form: FormInstance<clarificationCommitteeTransferValuesType>;
}) => {
  const options = [
    { label: "دریافت سیستمی دفاعیه", value: "5" },
    { label: "دعوت به دبیرخانه", value: "4" },
    { label: "انتقال به کمیته تفهیم", value: "3" },
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

// تخصیص جلسه
export const AccusationCaseSessionAllocationModal = ({
  selectSessionReason,
  durationReason,
  presentationReason,
  radioType,
  form,
  otherFiles,
  selectionSetter,
  loading,
}: AccusationCaseSessionAllocationModalProps) => {
  return (
    <CustomCard
      padding={PADDING_20}
      className="accusation-case-session-allocation-modal-container"
    >
      <Form form={form}>
        <div className="modal-body-container">
          <CustomCard padding={PADDING_20} className="custom-card-body">
            <CustomSwitch valuePropName="needToBePresent" label="دعوت متهم در جلسه" />
            <div className="around-box">
              <CustomDivider text={"اطلاعات جلسه"} />
              <div className="grid-cols-3">
                <CustomSelect
                  label="جلسه انتخابی"
                  name="selectSession"
                  onChange={(_: any, selectionMeetingData: any) =>
                    selectionSetter(selectionMeetingData?.item?.id)
                  }
                  options={selectSessionReason?.map(
                    (item: { topicMeeting: string; id: number }) => {
                      return {
                        title: item?.topicMeeting,
                        id: item?.id,
                      };
                    }
                  )}
                  form={form}
                  placeholder="انتخاب کنید"
                />
              </div>
            </div>
            <div className="around-box">
              <CustomDivider text={"پیوست ها"} />

              <Upload className="upload-container" listType="picture" multiple disabled>
                <Button icon={<AiOutlineUpload />} className="custom-btn" disabled>
                  بارگذاری تصاویر
                </Button>
              </Upload>
            </div>
          </CustomCard>
          <div className="other-files-session">
            <CustomDivider text={"پرونده های دیگر این جلسه"} />
            <Div className="others-file-wrapper" loading={loading}>
              {otherFiles &&
                otherFiles?.map((item: OtherFilesItemType) => (
                  <div className="others-file-row" key={item?.id}>
                    <div className="box-wrapper">
                      <p className="box-label">اتهام</p>
                      <p className="others-file-data">
                        {dataPlaceHolder({
                          data: item?.AssociationInfractions_title,
                        })}
                      </p>
                    </div>
                    <div className="box-wrapper">
                      <p className="box-label">شماره دانشجویی/پرسنلی متشاکی</p>
                      <p className="others-file-data">
                        {dataPlaceHolder({
                          data: item?.studentNumber,
                        })}
                      </p>
                    </div>
                    <div className="box-wrapper">
                      <p className="box-label">مدت</p>
                      <p className="others-file-data">
                        {dataPlaceHolder({
                          data: item?.reviewPeriod,
                        })}
                      </p>
                    </div>
                  </div>
                ))}
            </Div>
          </div>
          <CustomCard padding={PADDING_20}>
            <CustomDivider text={"اطلاعات تکمیلی"} />
            <div className="grid-cols-2">
              <CustomSelect
                label="زمان لازم(دقیقه)"
                name="reviewPeriod"
                options={durationReason?.map((item: { time: string; id: number }) => {
                  return {
                    title: item?.time,
                    id: item?.id,
                  };
                })}
                form={form}
                placeholder="انتخاب کنید"
              />
              <CustomSelect
                label="ارائه دهنده"
                name="provider"
                options={presentationReason}
                form={form}
                placeholder="انتخاب کنید"
              />
            </div>
          </CustomCard>
          <CustomCard padding={PADDING_20}>
            <CustomDivider text={"اطلاع رسانی"} />
            <div className="grid-cols-2">
              <CustomRadioGroup
                name="notificationType"
                label="نوع"
                options={radioType?.map((item) => {
                  return {
                    label: item?.title,
                    value: item?.id,
                  };
                })}
                hasVerticalLabel={true}
              />
              <CustomTextArea
                label="پیام ارسالی"
                placeholder="توضیحات"
                name="notificationMessage"
                rules={[REQUIRED_RULE]}
              />
            </div>
          </CustomCard>
        </div>
      </Form>
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
  form: FormInstance<RegisterCommentValuesType>;
}) => {
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

// رد کردن
export const RejectReportModalContent = ({
  commentList = [],
  form,
  isLoading,
}: {
  commentList?: {
    id: number;
    title: string;
  }[];
  form: FormInstance<any>;
  isLoading?: boolean;
}) => {
  return (
    <CustomCard
      padding={PADDING_20}
      className="committee-accusation-case-reject-report-modal-container"
    >
      <Form className="inputs-container" form={form}>
        <CustomSelect
          isLoading={isLoading}
          label="دلیل"
          name="rejectReportReason"
          options={commentList}
          placeholder="انتخاب کنید"
          form={form}
        />
        <CustomTextArea
          label="توضیحات"
          name="rejectReportDescription"
          placeholder="توضیحات"
        />
      </Form>
    </CustomCard>
  );
};

// ثبت رای
const voteCounts = [
  { id: 1, title: "1" },
  { id: 2, title: "2" },
  { id: 3, title: "3" },
  { id: 4, title: "4" },
  { id: 5, title: "5" },
  { id: 6, title: "6" },
  { id: 7, title: "7" },
  { id: 8, title: "8" },
  { id: 9, title: "9" },
  { id: 10, title: "10" },
];

const punishmentCounts = [
  { id: 1, title: "1" },
  { id: 2, title: "2" },
  { id: 3, title: "3" },
  { id: 4, title: "4" },
  { id: 5, title: "5" },
];

const Punishment = ({ count, form }: PunishmentProps) => {
  const [isSentenceIntensificationShow, setIsSentenceIntensificationShow] =
    useState(false);

  //? ================================  Api Calls ================================
  const { data: punishmentListData, isLoading: isPunishmentListLoading } =
    useGetPunishmentsListQuery();

  const { data: certaintyListData, isLoading: isCertaintyListLoading } =
    useGetCertaintyListQuery();

  const { data: executionListData, isLoading: isExecutionListLoading } =
    useGetExecutionListQuery();

  const { data: legalArticleListData, isLoading: isGetLegalArticleListLoading } =
    useGetLegalArticleListQuery();

  const { data: reasonEscalationListData, isLoading: isReasonEscalationListLoading } =
    useGetReasonEscalationListQuery();

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="border-round-box flex-col-24" key={count}>
      <CustomDivider text={`تنبیه ${count}`} />

      <div className="grid-cols-3">
        <CustomSelect
          label="تنبیه انضباطی صادره"
          name={`disciplinaryPunishmentIssued_${count}`}
          placeholder="انتخاب کنید"
          form={form}
          isLoading={isPunishmentListLoading}
          options={punishmentListData?.data}
          rules={[CUSTOM_REQUIRED_RULE("ورود تنبیه انضباطی ضروری می باشد.")]}
        />
        <CustomSelect
          label="قطعیت"
          name={`certainty_${count}`}
          placeholder="انتخاب کنید"
          form={form}
          isLoading={isCertaintyListLoading}
          options={certaintyListData?.data}
        />
        <CustomSelect
          label="وضعیت اجرای حکم"
          name={`sentenceExecutionStatus_${count}`}
          placeholder="انتخاب کنید"
          form={form}
          isLoading={isExecutionListLoading}
          options={executionListData?.data}
        />
        <CustomDatePicker
          label="تاریخ اجرای حکم"
          // className="date-picker"
          placeholder="انتخاب کنید"
          name={`sentenceExecutionDate_${count}`}
          // isLoading={isLoading || isCreateTimingLoading}
          form={form}
          defaultValue={form.getFieldsValue()[`sentenceExecutionDate_${count}`]}
          key={form.getFieldsValue()[`sentenceExecutionDate_${count}`]}
        />
        <CustomSelect
          label="ماده قانونی مرتبط"
          name={`articleRelativeLaw_${count}`}
          options={legalArticleListData?.data}
          isLoading={isGetLegalArticleListLoading}
          form={form}
          placeholder="انتخاب کنید"
        />
      </div>
      <div className="border-round-box flex-col-g32">
        <div className="divider-switch-container">
          <div>
            <CustomDivider text={"تشدید حکم"} />
          </div>
          <Switch
            className="switch-container"
            onChange={(checked: boolean) => setIsSentenceIntensificationShow(checked)}
          />
        </div>
        {isSentenceIntensificationShow && (
          <div className="grid-cols-2">
            <CustomSelect
              label="دلیل تشدید حکم"
              name={`sentenceIntensificationReason_${count}`}
              options={reasonEscalationListData?.data}
              isLoading={isReasonEscalationListLoading}
              form={form}
              placeholder="انتخاب کنید"
            />
            <CustomSelect
              label="حکم اولیه"
              name={`primitiveSentence_${count}`}
              isLoading={isPunishmentListLoading}
              options={punishmentListData?.data}
              form={form}
              placeholder="انتخاب کنید"
            />
            <div className="intensification-sentence-desc">
              <CustomTextArea
                label="توضیح"
                name={`sentenceIntensificationDescription_${count}`}
                placeholder="توضیحات"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const CentralAccusationVoteRegistrationModal = ({
  // setIsIssuedVoteEdited,
  form,
  isModalOpen,
}: {
  form: FormInstance<ConfirmRegisterVoteValuesType>;
  isModalOpen: {
    isOpen: boolean;
    id: number;
  };
}) => {
  const [punishmentCount, setPunishmentCount] = useState([1]);

  //? ================================  Api Calls ================================
  const [
    getMeetingDate,
    { data: meetingDateData, isFetching: isMeetingDateDataFetching },
  ] = useLazyCentralAccusationGetMeetingDateQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getMeetingDate(isModalOpen?.id);

    //* ================================ Util Functions ================================
    form.setFieldsValue({
      numberPreliminaryPunishments: selectDefaultValueGenerator({
        id: 1,
        title: "1",
      }),
    });
    setPunishmentCount([1]);
  }, [isModalOpen?.isOpen]);

  const punishmentCountHandler = (value: number) => {
    const countList = Array.from({ length: value }, (_, index) => index + 1);
    setPunishmentCount(countList);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomCard
      padding={PADDING_20}
      className="accusation-case-vote-registration-modal-container"
    >
      <Form form={form}>
        <div className="modal-body-container">
          <CustomCard padding={PADDING_24} className="modal-body">
            <Div loading={isMeetingDateDataFetching} className="vote-info-container">
              <div className="vote-info-item-container">
                <span className="vote-info-item gray-text">ارجاع:</span>
                <span className="vote-info-item black-text">
                  {dataPlaceHolder({
                    data: meetingDateData?.data?.[0]?.dateLastStatusChange,
                    isDate: true,
                  })}
                </span>
              </div>
              <div className="vote-info-item-container">
                <span className="vote-info-item gray-text">جلسه:</span>
                <span className="vote-info-item black-text">
                  {dataPlaceHolder({
                    data: meetingDateData?.data?.[0]
                      ?.AssociationCentrulMeeting_meetingDate,
                    isDate: true,
                  })}
                </span>
              </div>
              <div className="vote-info-item-container">
                <span className="vote-info-item gray-text">شماره جلسه:</span>
                <span className="vote-info-item black-text">
                  {dataPlaceHolder({
                    data: meetingDateData?.data?.[0]
                      ?.AssociationCentrulMeeting_meetingNumber,
                  })}
                </span>
              </div>
            </Div>
            {/* <div className="vote-info-container">
              <div className="vote-info-item-container">
                <span className="vote-info-item gray-text">حاضرین در جلسه:</span>
                <span className="vote-info-item black-text">4</span>
                <CustomTooltip
                  title={
                    <div className="tooltip-body">
                      <p>سمت اول : نام کامل شخص</p>
                      <p>سمت دوم : نام کامل شخص</p>
                      <p>سمت سوم : نام کامل شخص</p>
                    </div>
                  }
                  color="#000000bf"
                >
                  <AiOutlineQuestionCircle className="question-mark" />
                </CustomTooltip>
              </div>
              <div className="vote-info-item-container">
                <span className="vote-info-item gray-text">غایبین:</span>
                <span className="vote-info-item black-text">1</span>
                <CustomTooltip
                  title={
                    <div className="tooltip-body">
                      <p>سمت اول : نام کامل شخص</p>
                    </div>
                  }
                  color="#000000bf"
                >
                  <AiOutlineQuestionCircle className="question-mark" />
                </CustomTooltip>
              </div>
              <div className="vote-info-item-container">
                <span className="vote-info-item green-text">آرا موافق:</span>
                <span className="vote-info-item green-text">2</span>
              </div>
              <div className="vote-info-item-container">
                <span className="vote-info-item red-text">آرا مخالف:</span>
                <span className="vote-info-item red-text">2</span>
              </div>
              <div className="vote-info-item-container">
                <span className="vote-info-item gray-text">تعداد تنبیهات:</span>
                <span className="vote-info-item black-text">2</span>
              </div>
            </div> */}
            <div className="grid-cols-2">
              <CustomSelect
                label="آرا موافق"
                name="numberVotesFavorpPrimitive"
                options={voteCounts}
                form={form}
                placeholder="انتخاب کنید"
              />
              <CustomSelect
                label="تعداد تنبیهات"
                name="numberPreliminaryPunishments"
                options={punishmentCounts}
                form={form}
                // @ts-expect-error:next-line
                onChange={punishmentCountHandler}
                placeholder="انتخاب کنید"
              />
            </div>
            {/* ----------------- create punishment section for user selected number ------------------- */}
            {punishmentCount.map((count) => (
              <Punishment key={count} count={count} form={form} />
            ))}
            <CustomTextArea
              label="توضیح"
              name="sentenceIntensificationDescription"
              placeholder="توضیحات"
            />
            <div className="upload-container">
              <h3 className="title">پیوست ها</h3>
              <Upload className="upload-container" listType="picture" multiple disabled>
                <Button icon={<AiOutlineUpload />} className="upload-btn" disabled>
                  بارگذاری تصاویر
                </Button>
              </Upload>
            </div>
          </CustomCard>
        </div>
      </Form>
    </CustomCard>
  );
};
