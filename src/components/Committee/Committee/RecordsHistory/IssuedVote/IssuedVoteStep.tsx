import { useEffect, useState } from "react";

import { Button, Form } from "antd";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";

import { GetIssuedVotesInfoResponse } from "@pages/Committee/History/_shared/components/IssuedVoteStep/@types/@readOnlyIssuedVoteStep";

import { IssuedVoteStepProps, punishmentCountType } from "./@types/@issuedVoteStep";
import { CreateAndEditIssuedVotesResponse } from "./IssuedVote/@types/@issuedVoteStep";
import IssuedVotePunishment from "./IssuedVotePunishment/IssuedVotePunishment";
import { selectDefaultValueGenerator } from "../../../../../infrastructure/helpers/utils";
import { COMMITTEE_RECORDS_SUBMIT_PAGE_ROUTE } from "../../../../../infrastructure/router/routes/committee";
import {
  useCreateAndEditIssuedVotesMutation,
  useGetCertaintyListQuery,
  useGetExecutionListQuery,
  useGetIssuedVotesInfoMutation,
  // Todo[saman]: delete this if not needed
  // useGetLegalArticleListQuery,
  useGetPunishmentsListQuery,
  useGetReasonEscalationListQuery,
} from "../../../../../infrastructure/states/redux/Apis/committee/committees/committees";
import { REQUIRED_RULE } from "../../../../../infrastructure/validation/validationSchema";
import { CUSTOM_STEP_SUCCESS_MSG } from "../../../../../infrastructure/VARS/globalToasts/globalToasts";
import CustomDatePicker from "../../../../CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomInput from "../../../../CustomInputs/CustomInput/CustomInput";
import CustomSelect from "../../../../CustomInputs/CustomSelect/CustomSelect";
import CustomSwitch from "../../../../CustomInputs/CustomSwitch/CustomSwitch";
import CustomTextArea from "../../../../CustomInputs/CustomTextArea/CustomTextArea";
import CustomDivider from "../../../../Renderers/CustomDivider/CustomDivider";
import Div from "../../../../Renderers/Div/Div";
import { punishmentCountList } from "../recordsHistoryConsts";

import "./_issuedVoteStep.scss";

const CREATE_EDIT_VIOLATION_INFO_WARN_MSG = "مشکلی پیش آمده است، لطفا مجدد تلاش فرمایید.";
const ISSUED_VOTE_COUNT_ERROR_MSG = "ثبت حداقل یک رای الزامیست.";

const committeesName = {
  preliminary: "P",
  appeal: "A",
  central: "C",
};

const IssuedVoteStep = ({ setCurrentStep }: IssuedVoteStepProps) => {
  const [isVoteShow, setIsVoteShow] = useState({
    preliminaryVote: false,
    appealVote: false,
    centralVote: false,
  });

  const [punishmentCount, setPunishmentCount] = useState<punishmentCountType>({
    preliminaryPunishmentQty: [],
    appealPunishmentQty: [],
    centralPunishmentQty: [],
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = Object.fromEntries([...searchParams]);
  const navigate = useNavigate();

  const [submitForm] = Form.useForm();

  //? ================================  Api Calls ================================
  const { data: punishmentListData, isLoading: isPunishmentListLoading } =
    useGetPunishmentsListQuery();

  const { data: certaintyListData, isLoading: isCertaintyListLoading } =
    useGetCertaintyListQuery();

  const { data: executionListData, isLoading: isExecutionListLoading } =
    useGetExecutionListQuery();

  // const {} = useGetLegalArticleListQuery();

  const { data: reasonEscalationListData, isLoading: isReasonEscalationListLoading } =
    useGetReasonEscalationListQuery();

  const [createAndEditIssuedVotes, { isLoading: isCreateAndEditIssuedVotesDataLoading }] =
    useCreateAndEditIssuedVotesMutation();

  const [getIssuedVotesInfo, { isLoading: isIssuedVotesInfoLoading }] =
    useGetIssuedVotesInfoMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getIssuedVotesInfo({
        _data_: {
          id: id,
        },
      })
        .unwrap()
        .then(getIssuedVotesInfoOnSuccess);
    }
  }, [id]);

  //* ================================ Util Functions ================================
  const createAndEditIssuedVotesOnSuccess = async (
    value: CreateAndEditIssuedVotesResponse
  ) => {
    if (value?.status == 200 && value?.data?.id) {
      setSearchParams({
        id: value?.data?.id?.toString(),
        step: "4",
      });
      setCurrentStep(3);
      toast.success(CUSTOM_STEP_SUCCESS_MSG("3"), {
        toastId: CUSTOM_STEP_SUCCESS_MSG("3"),
      });
    }
  };

  const getIssuedVotesInfoOnSuccess = async (value: GetIssuedVotesInfoResponse) => {
    if (value?.status === 200) {
      if (
        value?.data?.numberPreliminaryPunishments &&
        +value?.data?.numberPreliminaryPunishments > 0
      ) {
        setIsVoteShow((prev) => ({
          preliminaryVote: true,
          appealVote: prev?.appealVote,
          centralVote: prev?.centralVote,
        }));

        punishmentCountHandler(
          `${value?.data?.numberPreliminaryPunishments}`,
          committeesName.preliminary
        );

        const punishmentCountList = Array.from(
          { length: +value?.data?.numberPreliminaryPunishments || 0 },
          (_, index) => index + 1
        );

        const punishList = punishmentCountList.map((item, index) => {
          return {
            [`P_disciplinaryPunishmentIssued_${item}`]: selectDefaultValueGenerator(
              value?.data?.AssociationPreliminaryCommitteeRecords?.[index]
                ?.AssociationRulings
            ),
            [`P_certainty_${item}`]: selectDefaultValueGenerator(
              value?.data?.AssociationPreliminaryCommitteeRecords?.[index]
                ?.AssociationCertainty
            ),
            [`P_sentenceExecutionStatus_${item}`]: selectDefaultValueGenerator(
              value?.data?.AssociationPreliminaryCommitteeRecords?.[index]
                ?.AssociationExecutionStatus
            ),
            [`P_sentenceExecutionDate_${item}`]:
              value?.data?.AssociationPreliminaryCommitteeRecords?.[index]?.executionDate,

            [`P_sentenceIntensificationReason_${item}`]: selectDefaultValueGenerator(
              value?.data?.AssociationPreliminaryCommitteeRecords?.[index]
                ?.AssociationReasonEscalation
            ),

            [`P_primitiveSentence_${item}`]: selectDefaultValueGenerator(
              value?.data?.AssociationPreliminaryCommitteeRecords?.[index]
                ?.AssociationPunish
            ),
            [`P_sentenceIntensificationDescription_${item}`]:
              value?.data?.AssociationPreliminaryCommitteeRecords?.[index]
                ?.descAggravation,
            [`P_sentenceIntensificationSwitch_${item}`]:
              !!value?.data?.AssociationPreliminaryCommitteeRecords?.[index]
                ?.descAggravation ||
              !!value?.data?.AssociationPreliminaryCommitteeRecords?.[index]
                ?.AssociationPunish?.title ||
              !!value?.data?.AssociationPreliminaryCommitteeRecords?.[index]
                ?.AssociationReasonEscalation?.title,
          };
        });

        const punish = punishList.reduce((acc, obj) => ({ ...acc, ...obj }), {});

        submitForm.setFieldsValue({
          preliminaryPunishmentsNumber: selectDefaultValueGenerator({
            id: value.data.numberPreliminaryPunishments,
            title: `${value.data.numberPreliminaryPunishments}`,
          }),
          preliminarySwitch: true,
          preliminarySessionDate: value?.data?.AssociationMeeting?.meetingDate,
          preliminarySessionNumber: value?.data?.AssociationMeeting?.meetingNumber,
          preliminaryDescription: value?.data?.descEscalation,
          ...punish,
        });
      }
      if (
        value?.data?.numberAppealPunishments &&
        +value?.data?.numberAppealPunishments > 0
      ) {
        setIsVoteShow((prev) => ({
          preliminaryVote: prev.preliminaryVote,
          appealVote: true,
          centralVote: prev?.centralVote,
        }));

        punishmentCountHandler(
          `${value?.data?.numberAppealPunishments}`,
          committeesName.appeal
        );

        const punishmentCountList = Array.from(
          { length: +value?.data?.numberAppealPunishments || 0 },
          (_, index) => index + 1
        );

        const punishList = punishmentCountList.map((item, index) => {
          return {
            [`A_disciplinaryPunishmentIssued_${item}`]: selectDefaultValueGenerator(
              value?.data?.AssociationAppealCommitteeRecords?.[index]
                ?.AssociationAappealRulings
            ),
            [`A_certainty_${item}`]: selectDefaultValueGenerator(
              value?.data?.AssociationAppealCommitteeRecords?.[index]
                ?.AssociationAappealCertainty
            ),
            [`A_sentenceExecutionStatus_${item}`]: selectDefaultValueGenerator(
              value?.data?.AssociationAppealCommitteeRecords?.[index]
                ?.AssociationAappealExecutionStatus
            ),
            [`A_sentenceExecutionDate_${item}`]:
              value?.data?.AssociationAppealCommitteeRecords?.[index]?.executionDate,

            [`A_sentenceIntensificationReason_${item}`]: selectDefaultValueGenerator(
              value?.data?.AssociationAppealCommitteeRecords?.[index]
                ?.AssociationAappealReasonAggravation
            ),
            [`A_primitiveSentence_${item}`]: selectDefaultValueGenerator(
              value?.data?.AssociationAppealCommitteeRecords?.[index]
                ?.AssociationAappealPunish
            ),
            [`A_sentenceIntensificationDescription_${item}`]:
              value?.data?.AssociationAppealCommitteeRecords?.[index]?.descAggravation,
            [`A_sentenceIntensificationSwitch_${item}`]:
              !!value?.data?.AssociationAppealCommitteeRecords?.[index]
                ?.descAggravation ||
              !!value?.data?.AssociationAppealCommitteeRecords?.[index]
                ?.AssociationAappealPunish?.title ||
              !!value?.data?.AssociationAppealCommitteeRecords?.[index]
                ?.AssociationAappealReasonAggravation?.title,
          };
        });

        const punish = punishList.reduce((acc, obj) => ({ ...acc, ...obj }), {});

        submitForm.setFieldsValue({
          appealPunishmentsNumber: selectDefaultValueGenerator({
            id: value.data.numberAppealPunishments,
            title: `${value.data.numberAppealPunishments}`,
          }),
          appealSwitch: true,
          appealSessionDate: value?.data?.AssociationMeetingAppealsCommittee?.meetingDate,
          appealSessionNumber:
            value?.data?.AssociationMeetingAppealsCommittee?.meetingNumber,
          appealDescription: value?.data?.appealVoteDesc,
          ...punish,
        });
      }
      if (
        value?.data?.numberCentralPunishments &&
        +value?.data?.numberCentralPunishments > 0
      ) {
        setIsVoteShow((prev) => ({
          preliminaryVote: prev.preliminaryVote,
          appealVote: prev.appealVote,
          centralVote: true,
        }));

        punishmentCountHandler(
          `${value?.data?.numberCentralPunishments}`,
          committeesName.central
        );

        const punishmentCountList = Array.from(
          { length: +value?.data?.numberCentralPunishments || 0 },
          (_, index) => index + 1
        );

        const punishList = punishmentCountList.map((item, index) => {
          return {
            [`C_disciplinaryPunishmentIssued_${item}`]: selectDefaultValueGenerator(
              value?.data?.AssociationCentralCommitteeRecords?.[index]
                ?.AssociationCentralRulings
            ),
            [`C_certainty_${item}`]: selectDefaultValueGenerator(
              value?.data?.AssociationCentralCommitteeRecords?.[index]
                ?.AssociationCentralCertainty
            ),
            [`C_sentenceExecutionStatus_${item}`]: selectDefaultValueGenerator(
              value?.data?.AssociationCentralCommitteeRecords?.[index]
                ?.AssociationCentralExecutionStatus
            ),
            [`C_sentenceExecutionDate_${item}`]:
              value?.data?.AssociationCentralCommitteeRecords?.[index]?.executionDate,
            [`C_sentenceIntensificationReason_${item}`]: selectDefaultValueGenerator(
              value?.data?.AssociationCentralCommitteeRecords?.[index]
                ?.AssociationCentralReasonAggravation
            ),
            [`C_primitiveSentence_${item}`]: selectDefaultValueGenerator(
              value?.data?.AssociationCentralCommitteeRecords?.[index]
                ?.AssociationCentralPunish
            ),
            [`C_sentenceIntensificationDescription_${item}`]:
              value?.data?.AssociationCentralCommitteeRecords?.[index]?.descAggravation,
            [`C_sentenceIntensificationSwitch_${item}`]:
              !!value?.data?.AssociationCentralCommitteeRecords?.[index]
                ?.descAggravation ||
              !!value?.data?.AssociationCentralCommitteeRecords?.[index]
                ?.AssociationCentralPunish?.title ||
              !!value?.data?.AssociationCentralCommitteeRecords?.[index]
                ?.AssociationCentralReasonAggravation?.title,
          };
        });

        const punish = punishList.reduce((acc, obj) => ({ ...acc, ...obj }), {});

        submitForm.setFieldsValue({
          centralPunishmentsNumber: selectDefaultValueGenerator({
            id: value.data.numberCentralPunishments,
            title: `${value.data.numberCentralPunishments}`,
          }),
          centralSwitch: true,
          centralSessionDate: value?.data?.AssociationCentrulMeeting?.meetingDate,
          centralSessionNumber: value?.data?.AssociationCentrulMeeting?.meetingNumber,
          centralDescription: value?.data?.centralVoteDesc,
          ...punish,
        });
      }
    }
  };

  const switchHandler = (e: boolean, committee: string) => {
    setIsVoteShow((prev) => ({
      preliminaryVote:
        committee === committeesName.preliminary ? e : prev.preliminaryVote,
      appealVote: committee === committeesName.appeal ? e : prev.appealVote,
      centralVote: committee === committeesName.central ? e : prev.centralVote,
    }));

    setPunishmentCount((prev) => ({
      preliminaryPunishmentQty:
        committee === committeesName.preliminary && e
          ? [1]
          : committee === committeesName.preliminary && !e
            ? []
            : prev.preliminaryPunishmentQty,
      appealPunishmentQty:
        committee === committeesName.appeal ? [1] : prev.appealPunishmentQty,
      centralPunishmentQty:
        committee === committeesName.central ? [1] : prev.centralPunishmentQty,
    }));

    if (committee === committeesName.preliminary) {
      submitForm.setFieldsValue({
        preliminaryPunishmentsNumber: selectDefaultValueGenerator({ id: 1, title: "1" }),
      });
    }
    if (committee === committeesName.appeal) {
      submitForm.setFieldsValue({
        appealPunishmentsNumber: selectDefaultValueGenerator({ id: 1, title: "1" }),
      });
    }
    if (committee === committeesName.central) {
      submitForm.setFieldsValue({
        centralPunishmentsNumber: selectDefaultValueGenerator({ id: 1, title: "1" }),
      });
    }
  };

  const punishmentCountHandler = (count: string, committee: string) => {
    const punishmentCountList = Array.from(
      { length: +count || 0 },
      (_, index) => index + 1
    );

    setPunishmentCount((prev) => ({
      preliminaryPunishmentQty:
        committee === committeesName.preliminary
          ? punishmentCountList
          : prev.preliminaryPunishmentQty,
      appealPunishmentQty:
        committee === committeesName.appeal
          ? punishmentCountList
          : prev.appealPunishmentQty,
      centralPunishmentQty:
        committee === committeesName.central
          ? punishmentCountList
          : prev.centralPunishmentQty,
    }));
  };

  const backBtnHandler = () => {
    if (id) {
      setSearchParams({ id, step: "2" });
    } else {
      navigate({
        pathname: COMMITTEE_RECORDS_SUBMIT_PAGE_ROUTE,
      });
    }
    setCurrentStep(1);
  };

  const issuedVoteHandler = async () => {
    if (id) {
      if (
        punishmentCount.preliminaryPunishmentQty.length === 0 &&
        punishmentCount.appealPunishmentQty.length === 0 &&
        punishmentCount.centralPunishmentQty.length === 0
      )
        return toast.error(ISSUED_VOTE_COUNT_ERROR_MSG, {
          toastId: ISSUED_VOTE_COUNT_ERROR_MSG,
        });
      submitForm.submit();
      submitForm.validateFields().then((value) => {
        if (id) {
          const preliminaryRecord = [];
          const appealRecord = [];
          const centralRecord = [];
          if (punishmentCount.preliminaryPunishmentQty.length > 0) {
            for (let i = 1; i <= punishmentCount.preliminaryPunishmentQty.length; i++) {
              preliminaryRecord.push({
                AssociationRulings: value[`P_disciplinaryPunishmentIssued_${i}`]?.item,
                AssociationCertainty: value[`P_certainty_${i}`]?.item,
                AssociationExecutionStatus: value[`P_sentenceExecutionStatus_${i}`]?.item,
                executionDate: value[`P_sentenceExecutionDate_${i}`],
                legalArticle: value[`P_articleRelativeLaw_${i}`]?.title,
                AssociationReasonEscalation:
                  value[`P_sentenceIntensificationReason_${i}`]?.item,
                AssociationPunish: value[`P_primitiveSentence_${i}`]?.item,
                descAggravation: value[`P_sentenceIntensificationDescription_${i}`],
              });
            }
          }
          if (punishmentCount.appealPunishmentQty.length > 0) {
            for (let i = 1; i <= punishmentCount.appealPunishmentQty.length; i++) {
              appealRecord.push({
                AssociationAappealRulings:
                  value[`A_disciplinaryPunishmentIssued_${i}`]?.item,
                AssociationAappealCertainty: value[`A_certainty_${i}`]?.item,
                AssociationAappealExecutionStatus:
                  value[`A_sentenceExecutionStatus_${i}`]?.item,
                executionDate: value[`A_sentenceExecutionDate_${i}`],
                legalArticle: value[`A_articleRelativeLaw_${i}`]?.title,
                AssociationAappealReasonAggravation:
                  value[`A_sentenceIntensificationReason_${i}`]?.item,
                AssociationAappealPunish: value[`A_primitiveSentence_${i}`]?.item,
                descAggravation: value[`A_sentenceIntensificationDescription_${i}`],
              });
            }
          }
          if (punishmentCount.centralPunishmentQty.length > 0) {
            for (let i = 1; i <= punishmentCount.centralPunishmentQty.length; i++) {
              centralRecord.push({
                AssociationCentralRulings:
                  value[`C_disciplinaryPunishmentIssued_${i}`]?.item,
                AssociationCentralCertainty: value[`C_certainty_${i}`]?.item,
                AssociationCentralExecutionStatus:
                  value[`C_sentenceExecutionStatus_${i}`]?.item,
                executionDate: value[`C_sentenceExecutionDate_${i}`],
                legalArticle: value[`C_articleRelativeLaw_${i}`]?.title,
                AssociationCentralReasonAggravation:
                  value[`C_sentenceIntensificationReason_${i}`]?.item,
                AssociationCentralPunish: value[`C_primitiveSentence_${i}`]?.item,
                descAggravation: value[`C_sentenceIntensificationDescription_${i}`],
              });
            }
          }

          const voteInfo = {
            descEscalation: value?.preliminaryDescription, // توضیحات کمیته بدوی
            appealVoteDesc: value?.appealDescription, // توضیحات کمیته تجدیدنظر
            centralVoteDesc: value?.centralDescription, // توضیحات کمیته مرکزی
            numberPreliminaryPunishments: value?.preliminaryPunishmentsNumber?.code
              ? value?.preliminaryPunishmentsNumber?.code
              : 0, //تعداد تنبیهات بدوی
            numberAppealPunishments: value?.appealPunishmentsNumber?.code
              ? value?.appealPunishmentsNumber?.code
              : 0, // تعداد تنبیهات تجدیدنظر
            numberCentralPunishments: value?.centralPunishmentsNumber?.code
              ? value?.centralPunishmentsNumber?.code
              : 0,
            AssociationMeeting: {
              meetingDate: value?.preliminarySessionDate,
              meetingNumber: value?.preliminarySessionNumber,
            },
            AssociationPreliminaryCommitteeRecords: preliminaryRecord,
            AssociationMeetingAppealsCommittee: {
              meetingDate: value?.appealSessionDate,
              meetingNumber: value?.appealSessionNumber,
            },
            AssociationAppealCommitteeRecords: appealRecord,
            AssociationCentrulMeeting: {
              meetingDate: value?.centralSessionDate,
              meetingNumber: value?.centralSessionNumber,
            },
            AssociationCentralCommitteeRecords: centralRecord,
            violationStatus: 20,
            recordsStage: 3,
            dateLastStatusChange: new Date()?.toISOString(),
            id: +id,
          };

          createAndEditIssuedVotes({
            form: "IssuedVotes",
            id: "3723017f08654f79adcbe6d27af04075",
            _data_: voteInfo,
          })
            .unwrap()
            .then(createAndEditIssuedVotesOnSuccess);
        }
      });
    } else {
      toast.warning(CREATE_EDIT_VIOLATION_INFO_WARN_MSG, {
        toastId: CREATE_EDIT_VIOLATION_INFO_WARN_MSG,
      });
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div
      className="committee-records-submit-issued-vote-step-container"
      loading={isIssuedVotesInfoLoading}
    >
      <Form form={submitForm}>
        <Div className="border-round-box flex-col-g32 margin-top">
          <CustomDivider
            text="رای کمیته بدوی"
            extraContent={
              <CustomSwitch
                valuePropName="preliminarySwitch"
                onChange={(e: boolean) => switchHandler(e, committeesName.preliminary)}
                defaultChecked={submitForm.getFieldsValue().preliminarySwitch}
                key={submitForm.getFieldsValue().preliminarySwitch}
              />
            }
          />
          {isVoteShow.preliminaryVote && (
            <div className="flex-col-g24">
              <div className="grid-cols-3">
                <CustomDatePicker
                  label="تاریخ جلسه"
                  placeholder="انتخاب کنید"
                  name="preliminarySessionDate"
                  form={submitForm}
                  defaultValue={submitForm.getFieldsValue().preliminarySessionDate}
                  key={submitForm.getFieldsValue().preliminarySessionDate}
                  rules={[REQUIRED_RULE]}
                />
                <CustomInput
                  type="text"
                  label="شماره جلسه"
                  name="preliminarySessionNumber"
                  placeholder="شماره جلسه"
                  rules={[REQUIRED_RULE]}
                />
                <CustomSelect
                  name="preliminaryPunishmentsNumber"
                  label="تعداد تنبیهات"
                  options={punishmentCountList}
                  placeholder="انتخاب کنید"
                  onChange={(e: any) =>
                    punishmentCountHandler(e as string, committeesName.preliminary)
                  }
                  form={submitForm}
                />
              </div>
              {/* //! create punishment section for user selected number */}
              {punishmentCount.preliminaryPunishmentQty.map((count) => (
                <IssuedVotePunishment
                  key={count}
                  committeeName={committeesName.preliminary}
                  count={count}
                  submitForm={submitForm}
                  isPunishmentListLoading={isPunishmentListLoading}
                  punishmentListData={punishmentListData?.data}
                  certaintyListData={certaintyListData?.data}
                  executionListData={executionListData?.data}
                  isCertaintyListLoading={isCertaintyListLoading}
                  isExecutionListLoading={isExecutionListLoading}
                  reasonEscalationListData={reasonEscalationListData?.data}
                  isReasonEscalationListLoading={isReasonEscalationListLoading}
                />
              ))}
              <CustomTextArea
                label="توضیح"
                name="preliminaryDescription"
                placeholder="توضیحات"
              />
            </div>
          )}
        </Div>
        <Div className="border-round-box flex-col-g32 margin-top">
          <CustomDivider
            text="رای کمیته تجدید نظر"
            extraContent={
              <CustomSwitch
                valuePropName="appealSwitch"
                onChange={(e: boolean) => switchHandler(e, committeesName.appeal)}
                defaultChecked={submitForm.getFieldsValue().appealSwitch}
                key={submitForm.getFieldsValue().appealSwitch}
              />
            }
          />
          {isVoteShow.appealVote && (
            <div className="flex-col-g24">
              <div className="grid-cols-3">
                <CustomDatePicker
                  label="تاریخ جلسه"
                  placeholder="انتخاب کنید"
                  name="appealSessionDate"
                  form={submitForm}
                  defaultValue={submitForm.getFieldsValue().appealSessionDate}
                  key={submitForm.getFieldsValue().appealSessionDate}
                  rules={[REQUIRED_RULE]}
                />
                <CustomInput
                  type="text"
                  label="شماره جلسه"
                  name="appealSessionNumber"
                  placeholder="شماره جلسه"
                  rules={[REQUIRED_RULE]}
                />
                <CustomSelect
                  name="appealPunishmentsNumber"
                  label="تعداد تنبیهات"
                  options={punishmentCountList}
                  placeholder="انتخاب کنید"
                  onChange={(e: any) =>
                    punishmentCountHandler(e as string, committeesName.appeal)
                  }
                  form={submitForm}
                />
              </div>
              {/* ------------------ create punishment section for user selected number --------------- */}
              {punishmentCount?.appealPunishmentQty.map((count) => (
                <IssuedVotePunishment
                  key={count}
                  committeeName={committeesName.appeal}
                  count={count}
                  submitForm={submitForm}
                  isPunishmentListLoading={isPunishmentListLoading}
                  punishmentListData={punishmentListData?.data}
                  certaintyListData={certaintyListData?.data}
                  executionListData={executionListData?.data}
                  isCertaintyListLoading={isCertaintyListLoading}
                  isExecutionListLoading={isExecutionListLoading}
                  reasonEscalationListData={reasonEscalationListData?.data}
                  isReasonEscalationListLoading={isReasonEscalationListLoading}
                />
              ))}
              <CustomTextArea
                label="توضیح"
                name="appealDescription"
                placeholder="توضیحات"
              />
            </div>
          )}
        </Div>
        <Div className="border-round-box flex-col-g32 margin-top">
          <CustomDivider
            text="رای کمیته مرکزی"
            extraContent={
              <CustomSwitch
                valuePropName="centralSwitch"
                onChange={(e: boolean) => switchHandler(e, committeesName.central)}
                defaultChecked={submitForm.getFieldsValue().centralSwitch}
                key={submitForm.getFieldsValue().centralSwitch}
              />
            }
          />
          {isVoteShow.centralVote && (
            <div className="flex-col-g24">
              <div className="grid-cols-3">
                <CustomDatePicker
                  label="تاریخ جلسه"
                  placeholder="انتخاب کنید"
                  name="centralSessionDate"
                  form={submitForm}
                  defaultValue={submitForm.getFieldsValue().centralSessionDate}
                  key={submitForm.getFieldsValue().centralSessionDate}
                  rules={[REQUIRED_RULE]}
                />
                <CustomInput
                  type="text"
                  label="شماره جلسه"
                  name="centralSessionNumber"
                  placeholder="شماره جلسه"
                  rules={[REQUIRED_RULE]}
                />
                <CustomSelect
                  name="centralPunishmentsNumber"
                  label="تعداد تنبیهات"
                  options={punishmentCountList}
                  placeholder="انتخاب کنید"
                  onChange={(e: any) =>
                    punishmentCountHandler(e as string, committeesName.central)
                  }
                  form={submitForm}
                />
              </div>
              {/* create punishment section for user selected number  */}
              {punishmentCount?.centralPunishmentQty.map((count) => (
                <IssuedVotePunishment
                  key={count}
                  committeeName={committeesName.central}
                  count={count}
                  submitForm={submitForm}
                  isPunishmentListLoading={isPunishmentListLoading}
                  punishmentListData={punishmentListData?.data}
                  certaintyListData={certaintyListData?.data}
                  executionListData={executionListData?.data}
                  isCertaintyListLoading={isCertaintyListLoading}
                  isExecutionListLoading={isExecutionListLoading}
                  reasonEscalationListData={reasonEscalationListData?.data}
                  isReasonEscalationListLoading={isReasonEscalationListLoading}
                />
              ))}
              <CustomTextArea
                label="توضیح"
                name="centralDescription"
                placeholder="توضیحات"
              />
            </div>
          )}
        </Div>
      </Form>
      <div className="buttons-container">
        <Button className="back-btn" onClick={backBtnHandler}>
          برگشت
        </Button>
        <Button
          type="primary"
          onClick={issuedVoteHandler}
          loading={isCreateAndEditIssuedVotesDataLoading}
        >
          بعدی
        </Button>
      </div>
    </Div>
  );
};

export default IssuedVoteStep;
