import { useEffect, useState } from "react";

import { Button, Col, Form, FormInstance, Modal, Row, Switch, Upload } from "antd";
import { AiOutlineUpload } from "react-icons/ai";
import { toast } from "react-toastify";

import {
  AppealAccusationCaseVoteRecords,
  AppealAccusationCaseVoteRegistrationModalProps,
  AppealMeetingInfoToVote,
  SendAppealRegistrationVoteResponse,
} from "./@types/@accusationCaseVoteRegistrationModal";
import {
  dataPlaceHolder,
  selectDefaultValueGenerator,
} from "../../../../../infrastructure/helpers/utils";
import {
  useGetCertaintyListQuery,
  useGetExecutionListQuery,
  useGetLegalArticleListQuery,
  useGetPunishmentsListQuery,
  useGetReasonEscalationListQuery,
} from "../../../../../infrastructure/states/redux/Apis/committee/committees/committees";
import {
  useLazyGetAppealMeetingInfoToVoteQuery,
  useSendAppealRegistrationVoteMutation,
} from "../../../../../infrastructure/states/redux/Apis/committee/handleProcessing/handleProcessing";
import { CUSTOM_REQUIRED_RULE } from "../../../../../infrastructure/validation/validationSchema";
import { PADDING_24 } from "../../../../../infrastructure/VARS/globalStyles/globalStyles";
import { VOTE_SUBMIT_MSG } from "../../../../../infrastructure/VARS/globalToasts/globalToasts";
import CustomCard from "../../../../CustomCard/CustomCard";
import CustomDatePicker from "../../../../CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomSelect from "../../../../CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "../../../../CustomInputs/CustomTextArea/CustomTextArea";
import CustomDivider from "../../../../Renderers/CustomDivider/CustomDivider";
import "./_accusationCaseVoteRegistrationModal.scss";

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

const voteRecordsGenerator = (
  vote: AppealAccusationCaseVoteRecords,
  sessionData?: AppealMeetingInfoToVote
) => {
  return Array.from({ length: +vote?.numberAppealPunishments?.value }, (_, index) => {
    return {
      AssociationAappealPunish: vote?.[`primitiveSentence_${index + 1}`]?.item,
      AssociationAappealRulings:
        vote?.[`disciplinaryPunishmentIssued_${index + 1}`]?.item,
      certainty: vote?.[`certainty_${index + 1}`]?.label,
      descAggravation: vote?.[`sentenceIntensificationDescription_${index + 1}`] as any,
      executionDate: vote?.[`sentenceExecutionDate_${index + 1}`] as any,
      executionStatus: vote?.[`sentenceExecutionStatus_${index + 1}`]?.label,
      legalArticle: vote?.[`articleRelativeLaw_${index + 1}`]?.label,
      reasonAggravation: vote?.[`sentenceIntensificationReason_${index + 1}`]?.label,
      dateVote: sessionData?.[0]
        ?.AssociationMeetingAppealsCommittee_meetingDate as string,
      numberVote: sessionData?.[0]
        ?.AssociationMeetingAppealsCommittee_meetingNumber as string,
    };
  });
};

const Punishment = ({
  count,
  form,
}: {
  count: number;
  form: FormInstance<AppealAccusationCaseVoteRecords>;
}) => {
  const [isSentenceIntensificationShow, setIsSentenceIntensificationShow] =
    useState(false);

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

  return (
    <div className="border-round-box flex-col-24" key={count}>
      <CustomDivider text={`تنبیه ${count}`} />
      <Row gutter={[12, 12]}>
        <Col lg={8} md={12} sm={24} xs={24}>
          <CustomSelect
            label="تنبیه انضباطی صادره"
            name={`disciplinaryPunishmentIssued_${count}`}
            placeholder="انتخاب کنید"
            form={form}
            isLoading={isPunishmentListLoading}
            options={punishmentListData?.data}
            rules={[CUSTOM_REQUIRED_RULE("ورود تنبیه انضباطی ضروری می باشد.")]}
          />
        </Col>
        <Col lg={8} md={12} sm={24} xs={24}>
          <CustomSelect
            label="قطعیت"
            name={`certainty_${count}`}
            placeholder="انتخاب کنید"
            form={form}
            isLoading={isCertaintyListLoading}
            options={certaintyListData?.data}
          />
        </Col>
        <Col lg={8} md={12} sm={24} xs={24}>
          <CustomSelect
            label="وضعیت اجرای حکم"
            name={`sentenceExecutionStatus_${count}`}
            placeholder="انتخاب کنید"
            form={form}
            isLoading={isExecutionListLoading}
            options={executionListData?.data}
          />
        </Col>
        <Col lg={8} md={12} sm={24} xs={24}>
          <CustomDatePicker
            label="تاریخ اجرای حکم"
            // className="date-picker"
            placeholder="انتخاب کنید"
            name={`sentenceExecutionDate_${count}`}
            // isLoading={isLoading || isCreateTimingLoading}
            form={form}
            defaultValue={form.getFieldsValue()[`sentenceExecutionDate_${count}`]}
            key={form.getFieldsValue()[`sentenceExecutionDate_${count}`] as any}
          />
        </Col>
        <Col lg={8} md={12} sm={24} xs={24}>
          <CustomSelect
            label="ماده قانونی مرتبط"
            name={`articleRelativeLaw_${count}`}
            options={legalArticleListData?.data}
            isLoading={isGetLegalArticleListLoading}
            form={form}
            placeholder="انتخاب کنید"
          />
        </Col>
      </Row>
      <div className="border-round-box flex-col-g32">
        <div className="divider-switch-container">
          <div>
            <CustomDivider text="تشدید حکم" />
          </div>
          <Switch
            className="switch-container"
            onChange={(checked: boolean) => setIsSentenceIntensificationShow(checked)}
          />
        </div>
        {isSentenceIntensificationShow && (
          <Row gutter={[12, 12]}>
            <Col lg={12} md={12} sm={24} xs={24}>
              <CustomSelect
                label="دلیل تشدید حکم"
                name={`sentenceIntensificationReason_${count}`}
                options={reasonEscalationListData?.data}
                isLoading={isReasonEscalationListLoading}
                form={form}
                placeholder="انتخاب کنید"
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <CustomSelect
                label="حکم اولیه"
                name={`primitiveSentence_${count}`}
                isLoading={isPunishmentListLoading}
                options={punishmentListData?.data}
                form={form}
                placeholder="انتخاب کنید"
              />
            </Col>
            <Col span={24}>
              <CustomTextArea
                label="توضیح"
                name={`sentenceIntensificationDescription_${count}`}
                placeholder="توضیحات"
              />
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
};

const AppealAccusationCaseVoteRegistrationModal = ({
  isModalOpen,
  closeModalHandler,
  setIsIssuedVoteEdited,
}: AppealAccusationCaseVoteRegistrationModalProps) => {
  const [punishmentCount, setPunishmentCount] = useState([1]);
  const [form] = Form.useForm();

  //? ================================  Api Calls ================================
  const [
    getAppealMeetingInfoToVote,
    { data: appealMeetingInfoToVoteData, isFetching: isAppealMeetingInfoToVoteLoading },
  ] = useLazyGetAppealMeetingInfoToVoteQuery();

  // send Request
  const [registerAppealVote, { isLoading: isRegisterAppealVoteLoading }] =
    useSendAppealRegistrationVoteMutation();

  //? ================================ Effects ================================
  // define default value for punishment count for preventing undefined value to send to request body
  useEffect(() => {
    if (isModalOpen.isOpen) {
      if (isModalOpen?.id) {
        getAppealMeetingInfoToVote(+isModalOpen?.id);
      }
      form.setFieldsValue({
        numberAppealPunishments: selectDefaultValueGenerator({ id: 1, title: "1" }),
      });
      setPunishmentCount([1]);
    }
  }, [isModalOpen.isOpen]);

  //* ================================ Util Functions ================================
  const registerAppealVoteOnSuccess = async (
    value: SendAppealRegistrationVoteResponse
  ) => {
    if (value.status === 200) {
      toast.success(VOTE_SUBMIT_MSG, {
        toastId: VOTE_SUBMIT_MSG,
      });
      closeModalHandler();
      //for re-rendering IssuedVoteTab component when new comment registered
      setIsIssuedVoteEdited((prev) => !prev);
    }
  };

  const onConfirmClickHandler = () => {
    form.submit();
    form.validateFields({ validateOnly: true }).then((value) => {
      const data = {
        numberAppealPunishments: value?.numberAppealPunishments?.value,
        numberVotesFavorAppeal: value?.numberVotesFavorpPrimitive?.value,
        appealVoteDesc: value?.sentenceIntensificationDescription
          ? value?.sentenceIntensificationDescription
          : "-",
        AssociationAppealCommitteeRecords: voteRecordsGenerator(
          value,
          appealMeetingInfoToVoteData?.data
        ),
        id: +isModalOpen?.id,
      };

      registerAppealVote({
        form: "RegistrationAppealVote",
        id: "d11b190351d94a1b90683f2506ce56e8",
        _data_: data,
      })
        .unwrap()
        .then(registerAppealVoteOnSuccess);
    });
  };

  const punishmentCountHandler = (value: number) => {
    const countList = Array.from({ length: value }, (_, index) => index + 1);
    setPunishmentCount(countList);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isModalOpen?.isOpen && (
        <Modal
          title="ثبت رای"
          open={isModalOpen?.isOpen}
          onCancel={closeModalHandler}
          footer={null}
          width={800}
          className="appeal-accusation-case-vote-registration-modal-container"
        >
          <Form form={form}>
            <div className="modal-body-container">
              <CustomCard
                padding={PADDING_24}
                className="modal-body"
                loading={isAppealMeetingInfoToVoteLoading}
              >
                <div className="vote-info-container">
                  <div className="vote-info-item-container">
                    <span className="vote-info-item gray-text">ارجاع:</span>
                    <span className="vote-info-item black-text">
                      {dataPlaceHolder({
                        data: appealMeetingInfoToVoteData?.data?.[0]
                          ?.dateLastStatusChange,
                        isDate: true,
                      })}
                    </span>
                  </div>
                  <div className="vote-info-item-container">
                    <span className="vote-info-item gray-text">جلسه:</span>
                    <span className="vote-info-item black-text">
                      {dataPlaceHolder({
                        data: appealMeetingInfoToVoteData?.data?.[0]
                          ?.AssociationMeetingAppealsCommittee_meetingDate,
                        isDate: true,
                      })}
                    </span>
                  </div>
                  <div className="vote-info-item-container">
                    <span className="vote-info-item gray-text">شماره جلسه:</span>
                    <span className="vote-info-item black-text">
                      {dataPlaceHolder({
                        data: appealMeetingInfoToVoteData?.data?.[0]
                          ?.AssociationMeetingAppealsCommittee_meetingNumber,
                      })}
                    </span>
                  </div>
                </div>
                {/* //Todo[Atefeh]: uncomment when API got ready */}
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
                    name="numberAppealPunishments"
                    options={punishmentCounts}
                    form={form}
                    // @ts-expect-error:next-line
                    onChange={punishmentCountHandler}
                    placeholder="انتخاب کنید"
                  />
                </div>
                {/* // create punishment section for user selected number */}
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
                  <Upload
                    className="upload-container"
                    listType="picture"
                    multiple
                    disabled
                  >
                    <Button icon={<AiOutlineUpload />} className="upload-btn" disabled>
                      بارگذاری تصاویر
                    </Button>
                  </Upload>
                </div>
              </CustomCard>
            </div>
            <div className="submit-buttons-container">
              <Button
                type="primary"
                htmlType="submit"
                className="custom-btn"
                onClick={onConfirmClickHandler}
                loading={isRegisterAppealVoteLoading}
              >
                ثبت نهایی
              </Button>
              <Button className="custom-btn" onClick={closeModalHandler}>
                بازگشت
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default AppealAccusationCaseVoteRegistrationModal;
