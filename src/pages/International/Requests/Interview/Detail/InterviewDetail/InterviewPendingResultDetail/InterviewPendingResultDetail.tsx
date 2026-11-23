import { useEffect, useState } from "react";

import { Form } from "antd";
import { PiTestTube } from "react-icons/pi";
import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import Div from "@components/Renderers/Div/Div";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useResponsive } from "@infra/hooks/useResponsive";
import { INTERNATIONAL_REQUESTS_INTERVIEW_ROUTE } from "@infra/router/routes/international";
import {
  useInterviewSubmitRejectOrAcceptModalMutation,
  useLazyGetInterviewDetailQuery,
} from "@infra/states/redux/Apis/international/request/requestApi";
import { NUMBER_RANGE_RULE, REQUIRED_RULE } from "@infra/validation/validationSchema";
import { INTERNATIONAL_REASONS_ID } from "@pages/International/utils/internationalUtils";

import { GetInterviewDetailResponse } from "../../@types/@interviewDetail";
import InterviewDetailConfirmModalContent from "./helper/modals/InterviewDetailConfirmModalContent/InterviewDetailConfirmModalContent";
import InterviewDetailRejectModalContent from "./helper/modals/InterviewDetailRejectModalContent/InterviewDetailRejectModalContent";
import IntervieweeIdentityInfo from "../../helper/components/IntervieweeIdentityInfo/IntervieweeIdentityInfo";
import IntervieweePreviousEducationalInfo from "../../helper/components/IntervieweePreviousEducationalInfo/IntervieweePreviousEducationalInfo";
import IntervieweeRequest from "../../helper/components/IntervieweeRequest/IntervieweeRequest";
import InterviewInfo from "../../helper/components/InterviewInfo/InterviewInfo";
import { InternationalInterviewReasonsItemsType } from "./helper/modals/InterviewDetailRejectModalContent/@types/@interviewDetailRejectModalContent";

const InterviewPendingResultDetail = () => {
  useTitle({ text: "درخواست ها/مصاحبه/بررسی مصاحبه" });
  useTitle({
    breadcrumbItems: [
      {
        title: "درخواست ها",
      },
      {
        title: <Link to={INTERNATIONAL_REQUESTS_INTERVIEW_ROUTE}>مصاحبه</Link>,
      },
      {
        title: "مشاهده",
      },
    ],
  });

  const [score, setScore] = useState<number>();
  const [isDisabled, setIsDisabled] = useState(true);
  const [data, setData] = useState<GetInterviewDetailResponse | null>(null);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState({
    isOpen: false,
    id: -1,
  });
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState({
    isOpen: false,
    id: -1,
  });

  const { isMobile } = useResponsive();

  const {
    params: { id },
  } = useQueryParams();

  const [rejectForm] = Form.useForm<{
    reason: InternationalInterviewReasonsItemsType[];
  }>();
  const [confirmForm] = Form.useForm<{
    reason: InternationalInterviewReasonsItemsType;
  }>();
  const [form] = Form.useForm();

  //? ================================  Api Calls ================================
  const [getDetailData, { isFetching: isDetailDataLoading }] =
    useLazyGetInterviewDetailQuery();

  // submit modal
  const [submitRejectOrAcceptModal, { isLoading: isSubmitRejectOrAcceptModalLoading }] =
    useInterviewSubmitRejectOrAcceptModalMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getDetailData(id).unwrap().then(getDetailDataSuccess);
    }
  }, [id]);

  //* ================================ Util Functions ================================
  //success
  const getDetailDataSuccess = (value: GetInterviewDetailResponse) => {
    setData(value);
  };

  const scoreInputHandler = (e: any) => {
    const value = Number(e.target.value);

    setScore(value);
    if (value >= 0 && value <= 20) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  // reject modal handler
  const openRejectModalBtnHandler = () => {
    setIsRejectModalOpen({ isOpen: true, id: -1 });
  };

  const closeRejectModalHandler = () => {
    setIsRejectModalOpen({ isOpen: false, id: -1 });
    rejectForm.resetFields();
  };

  const rejectModalHandler = () => {
    rejectForm.submit();
    rejectForm.validateFields().then((values) => {
      const reasonIds = values?.reason?.map((item) => item?.code);
      const { score } = form.getFieldsValue();

      if (data?.requestOfInterviewee?.requestId) {
        submitRejectOrAcceptModal({
          reasonIdList: reasonIds,
          reasonTypeId: INTERNATIONAL_REASONS_ID?.rejectRequest,
          requestId: data?.requestOfInterviewee?.requestId,
          score: score,
        })
          .unwrap()
          .then(submitRejectModalSuccess);
      }
    });
  };

  const submitRejectModalSuccess = () => {
    closeRejectModalHandler();
  };

  // confirm modal handler
  const openConfirmModalBtnHandler = () => {
    setIsConfirmModalOpen({ isOpen: true, id: -1 });
  };

  const closeConfirmModalHandler = () => {
    setIsConfirmModalOpen({ isOpen: false, id: -1 });
    confirmForm.resetFields();
  };

  const confirmModalHandler = () => {
    confirmForm.submit();
    confirmForm.validateFields().then((values) => {
      const { score } = form.getFieldsValue();

      if (data?.requestOfInterviewee?.requestId) {
        submitRejectOrAcceptModal({
          reasonIdList: values?.reason?.code ? [values?.reason?.code] : null,
          reasonTypeId: INTERNATIONAL_REASONS_ID?.confirmRequest,
          requestId: data?.requestOfInterviewee?.requestId,
          score: score,
        })
          .unwrap()
          .then(submitAcceptModalSuccess);
      }
    });
  };

  const submitAcceptModalSuccess = () => {
    closeRejectModalHandler();
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* REJECT MODAL */}
      {isRejectModalOpen && (
        <ConfirmationModalWithContent
          title="رد مصاحبه شونده"
          backBtnText="انصراف"
          confirmBtnText="رد در مصاحبه"
          isDangerous
          showIcon={false}
          isModalOpen={isRejectModalOpen?.isOpen}
          onConfirmClickHandler={rejectModalHandler}
          closeModalHandler={closeRejectModalHandler}
          isConfirmButtonLoading={isSubmitRejectOrAcceptModalLoading}
          content={<InterviewDetailRejectModalContent form={rejectForm} />}
        />
      )}

      {/* CONFIRM MODAL */}
      {isConfirmModalOpen && (
        <ConfirmationModalWithContent
          title="تایید مصاحبه شونده"
          backBtnText="انصراف"
          confirmBtnText="تایید در مصاحبه"
          showIcon={false}
          isModalOpen={isConfirmModalOpen?.isOpen}
          onConfirmClickHandler={confirmModalHandler}
          closeModalHandler={closeConfirmModalHandler}
          isConfirmButtonLoading={isSubmitRejectOrAcceptModalLoading}
          content={<InterviewDetailConfirmModalContent form={confirmForm} />}
        />
      )}

      <Div loading={isDetailDataLoading} className="flex flex-col gap-20">
        <div className="flex flex-col gap-6">
          <CustomAlert
            type="warning"
            showIcon
            message="توجه!"
            description={
              <>
                <p>لطفاً نمره متقاضی را از 20 وارد نمایید.</p>
                <p>
                  در صورتی که متقاضی در جلسه مصاحبه حاضر نشده است نمره 0 را لحاظ نمایید و
                  از گزینه رد مصاحبه استفاده کنید و از میان دلایل رد، گزینه عدم حضور در
                  مصاحبه را انتخاب نمایید.
                </p>
              </>
            }
            closable
          />

          <section className="bg-neutral-3 flex justify-between rounded-lg p-4! font-[DanaFaNum] text-base max-[920px]:flex-col max-[920px]:gap-2.5">
            <div className="flex items-center gap-1 max-[580px]:items-start">
              <PiTestTube size={24} className="text-primary-6" />
              <Form form={form}>
                <CustomInput
                  type="text"
                  label="نمره در مصاحبه:"
                  name="score"
                  placeholder="نمره را اینجا وارد نمایید."
                  hasVerticalLabel={isMobile}
                  rules={[REQUIRED_RULE, NUMBER_RANGE_RULE(0, 20)]}
                  onChange={scoreInputHandler}
                  value={score}
                  form="form"
                />
              </Form>
            </div>
            <div className="flex gap-4 max-[460px]:flex-col">
              <CustomButton
                type="primary"
                danger
                onClick={openRejectModalBtnHandler}
                disabled={isDisabled}
              >
                رد در مصاحبه
              </CustomButton>
              <CustomButton
                type="primary"
                onClick={openConfirmModalBtnHandler}
                disabled={isDisabled}
              >
                تایید در مصاحبه
              </CustomButton>
            </div>
          </section>
        </div>

        {/* interview info */}
        <InterviewInfo info={data} />
        <div className="flex flex-col gap-10">
          <IntervieweeIdentityInfo info={data} />
          <IntervieweeRequest info={data} />
          <IntervieweePreviousEducationalInfo info={data} />
        </div>
      </Div>
    </>
  );
};
export default InterviewPendingResultDetail;
