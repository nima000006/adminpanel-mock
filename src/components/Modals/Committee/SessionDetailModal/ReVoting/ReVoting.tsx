import { useEffect } from "react";

import { Button, Form, Modal } from "antd";
import { useNavigate } from "react-router";

import { ReVotingModalType, SessionReVotingResponse } from "./@types/@reVoting";
import { makeSearchParams } from "../../../../../infrastructure/helpers/utils";
import { COMMITTEE_ACCUSATION_CASE_PAGE_ROUTE } from "../../../../../infrastructure/router/routes/committee";
import {
  useLazyGetReVotingReasonQuery,
  useSessionReVotingMutation,
} from "../../../../../infrastructure/states/redux/Apis/committee/committees/committees";
import CustomCard from "../../../../CustomCard/CustomCard";
import CustomSelect from "../../../../CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "../../../../CustomInputs/CustomTextArea/CustomTextArea";
import "./_reVoting.scss";

const ReVotingModal = ({
  isReVotingModalOpen,
  setIsReVotingModalOpen,
}: ReVotingModalType) => {
  const [reVotingForm] = Form.useForm();
  const navigate = useNavigate();

  //? ================================  Api Calls ================================
  const [
    getReVotingReason,
    { data: reVotingReasonData, isLoading: isReVotingReasonLoading },
  ] = useLazyGetReVotingReasonQuery();

  const [sessionReVoting, { isLoading: isSessionReVotingLoading }] =
    useSessionReVotingMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (isReVotingModalOpen?.isOpen) {
      getReVotingReason();
    }
  }, [isReVotingModalOpen?.isOpen]);

  //* ================================ Util Functions ================================
  const sessionReVotingOnSuccess = async (value: SessionReVotingResponse) => {
    if (value?.status === 200) {
      closeModalHandler();
      navigate({
        pathname: COMMITTEE_ACCUSATION_CASE_PAGE_ROUTE,
        search: makeSearchParams({ id: isReVotingModalOpen?.id }),
      });
    }
  };

  const confirmationHandler = (event: {
    reVoteReason: { children: string };
    reVoteDescription: string;
  }) => {
    sessionReVoting({
      form: "Revoting",
      id: "5e77d123766b45c9bab8a2153f2dcc11",
      _data_: {
        AssociationSessionProblems: {
          reasonRevoting: event?.reVoteReason?.children,
          revoting: true,
          descRevoting: event?.reVoteDescription,
        },
        id: isReVotingModalOpen?.id,
      },
    })
      .unwrap()
      .then(sessionReVotingOnSuccess);
  };

  const closeModalHandler = () => {
    setIsReVotingModalOpen({
      isOpen: false,
      id: -1,
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isReVotingModalOpen?.isOpen && (
        <Modal
          title="رای گیری مجدد"
          open={isReVotingModalOpen?.isOpen}
          onCancel={closeModalHandler}
          footer={null}
          width={800}
          className="session-re-voting-modal"
        >
          <Form onFinish={confirmationHandler} form={reVotingForm}>
            <CustomCard className="box-wrapper">
              <CustomSelect
                label="دلیل"
                name="reVoteReason"
                options={reVotingReasonData?.data}
                placeholder="انتخاب کنید"
                form={reVotingForm}
                isLoading={isReVotingReasonLoading}
              />
              <CustomTextArea
                label="توضیحات"
                name="reVoteDescription"
                placeholder="توضیحات"
              />
            </CustomCard>
            <div className="btn-wrapper">
              <Button
                type="primary"
                danger
                htmlType="submit"
                className="btn-modal"
                loading={isSessionReVotingLoading}
              >
                رای گیری مجدد
              </Button>
              <Button
                type="primary"
                ghost
                onClick={closeModalHandler}
                className="btn-modal"
              >
                بازگشت
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default ReVotingModal;
