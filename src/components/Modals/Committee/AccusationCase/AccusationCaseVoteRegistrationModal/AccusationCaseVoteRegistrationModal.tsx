import { useEffect, useState } from "react";

import { Button, Form, Modal, Switch, Upload } from "antd";
import { AiOutlineUpload } from "react-icons/ai";
import { toast } from "react-toastify";

import {
  AccusationCaseVoteRegistrationModalProps,
  PunishmentProps,
  RegisterPrimaryVoteResponse,
} from "./@type/@accusationCaseVoteRegistrationModal";
import { selectDefaultValueGenerator } from "../../../../../infrastructure/helpers/utils";
import {
  useGetCertaintyListQuery,
  useGetExecutionListQuery,
  useGetLegalArticleListQuery,
  useGetPunishmentsListQuery,
  useGetReasonEscalationListQuery,
} from "../../../../../infrastructure/states/redux/Apis/committee/committees/committees";
import { useRegisterPrimaryVoteMutation } from "../../../../../infrastructure/states/redux/Apis/committee/handleProcessing/handleProcessing";
import { CUSTOM_REQUIRED_RULE } from "../../../../../infrastructure/validation/validationSchema";
import { PADDING_24 } from "../../../../../infrastructure/VARS/globalStyles/globalStyles";
import CustomCard from "../../../../CustomCard/CustomCard";
import CustomDatePicker from "../../../../CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomSelect from "../../../../CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "../../../../CustomInputs/CustomTextArea/CustomTextArea";
import CustomDivider from "../../../../Renderers/CustomDivider/CustomDivider";
import "./_accusationCaseVoteRegistrationModal.scss";

const VOTE_SUBMIT_MSG = " ثبت رای با موفقیت انجام شد.";

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

const voteRecordsGenerator = (vote: any) => {
  return Array.from({ length: vote?.numberPreliminaryPunishments?.value }, (_, index) => {
    return {
      AssociationRulings: vote?.[`disciplinaryPunishmentIssued_${index + 1}`]?.item,
      certainty: vote?.[`certainty_${index + 1}`]?.children,
      executionStatus: vote?.[`sentenceExecutionStatus_${index + 1}`]?.children,
      executionDate: vote?.[`sentenceExecutionDate_${index + 1}`],
      legalArticle: vote?.[`articleRelativeLaw_${index + 1}`]?.children,
      reasonAggravation: vote?.[`sentenceIntensificationReason_${index + 1}`]?.children,
      AssociationPunish: vote?.[`primitiveSentence_${index + 1}`]?.item,
      descAggravation: vote?.[`sentenceIntensificationDescription_${index + 1}`],
    };
  });
};

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
          defaultValue={
            form.getFieldValue([`sentenceExecutionDate_${count}`] as any) as any
          }
          key={form.getFieldValue([`sentenceExecutionDate_${count}`] as any) as any}
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
            <CustomDivider text="تشدید حکم" />
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

const AccusationCaseVoteRegistrationModal = ({
  isModalOpen,
  closeModalHandler,
  setIsIssuedVoteEdited,
}: AccusationCaseVoteRegistrationModalProps) => {
  const [punishmentCount, setPunishmentCount] = useState([1]);
  const [form] = Form.useForm();

  //? ================================  Api Calls ================================
  const [registerPrimaryVote, { isLoading: isRegisterPrimaryVoteLoading }] =
    useRegisterPrimaryVoteMutation();

  //? ================================ Effects ================================
  // define default value for punishment count for preventing undefined value to send to request body
  useEffect(() => {
    form.setFieldsValue({
      numberPreliminaryPunishments: selectDefaultValueGenerator({ id: 1, title: "1" }),
    });
    setPunishmentCount([1]);
  }, [isModalOpen.isOpen]);

  //* ================================ Util Functions ================================
  const registerPrimaryVoteOnSuccess = async (value: RegisterPrimaryVoteResponse) => {
    if (value.status === 200) {
      toast.success(VOTE_SUBMIT_MSG, {
        toastId: VOTE_SUBMIT_MSG,
      });
      closeModalHandler();
      //for re-rendering IssuedVoteTab component when new comment registered
      setIsIssuedVoteEdited((prev) => !prev);
      form?.resetFields();
    }
  };

  const onConfirmClickHandler = () => {
    const formData = form.getFieldsValue();

    const data = {
      numberPreliminaryPunishments: formData?.numberPreliminaryPunishments?.value,
      numberVotesFavorpPrimitive: formData?.numberVotesFavorpPrimitive?.value,
      descEscalation: formData?.sentenceIntensificationDescription
        ? formData?.sentenceIntensificationDescription
        : "-",
      AssociationPreliminaryCommitteeRecords: voteRecordsGenerator(formData),
      id: +isModalOpen?.id,
    };
    form.validateFields({ validateOnly: true }).then(() => {
      registerPrimaryVote({
        form: "RegistrationPrimaryVote",
        id: "190d06e5b15d42eb8de0fd995131a31a",
        _data_: data,
      })
        .unwrap()
        .then(registerPrimaryVoteOnSuccess);
    });
  };

  const punishmentCountHandler = (value: number) => {
    const countList = Array.from({ length: value }, (_, index) => index + 1);
    setPunishmentCount(countList);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isModalOpen.isOpen && (
        <Modal
          title="ثبت رای"
          open={isModalOpen.isOpen}
          onCancel={closeModalHandler}
          footer={null}
          width={800}
          className="accusation-case-detail-vote-registration-modal-container"
        >
          <Form form={form}>
            <div className="modal-body-container">
              <CustomCard
                padding={PADDING_24}
                className="modal-body"
                // loading={isReasonEscalationListLoading}
              >
                {/* <div className="vote-info-container">
              <div className="vote-info-item-container">
                <span className="vote-info-item gray-text">ارجاع:</span>
                <span className="vote-info-item black-text">
                  {moment(new Date()).locale("fa").format("HH:mm - YYYY/M/D")}
                </span>
              </div>
              <div className="vote-info-item-container">
                <span className="vote-info-item gray-text">جلسه:</span>
                <span className="vote-info-item black-text">
                  {moment(new Date()).locale("fa").format("HH:mm - YYYY/M/D")}
                </span>
              </div>
              <div className="vote-info-item-container">
                <span className="vote-info-item gray-text">شماره جلسه:</span>
                <span className="vote-info-item black-text">1651813518</span>
              </div>
            </div> */}
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
                {/* //! create punishment section for user selected number */}
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
                loading={isRegisterPrimaryVoteLoading}
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

export default AccusationCaseVoteRegistrationModal;
