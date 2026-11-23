import { useEffect } from "react";

import { Button, Form, Modal } from "antd";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import {
  CancelingAccusationOfSessionResponse,
  CancelingSessionResponse,
  ReVotingModalType,
} from "./@types/@sessionCancel";
import { SessionCancelModel } from "../../../../../infrastructure/models/tableModels/CommitteeTableModel/SessionDetails/SessionCancelModel/SessionCancelModel";
import { COMMITTEE_SESSION_LIST_PAGE_ROUTE } from "../../../../../infrastructure/router/routes/committee";
import {
  useCancelingAccusationOfSessionMutation,
  useCancelingSessionMutation,
  useLazyGetListOfSessionCreationAccusationsQuery,
} from "../../../../../infrastructure/states/redux/Apis/committee/committees/committees";
import { useLazyGetReasonRejectSessionQuery } from "../../../../../infrastructure/states/redux/Apis/committee/consultingCenter/consultingCenterApi";
import CustomCard from "../../../../CustomCard/CustomCard";
import CustomSelect from "../../../../CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "../../../../CustomInputs/CustomTextArea/CustomTextArea";

import "./_sessionCancel.scss";

const CANCELING_SESSION_SUCCESS_MSG = "جلسه با موفقیت حذف شد.";

const SessionCancelModal = ({
  isSessionCancelModalOpen,
  setIsSessionCancelModalOpen,
}: ReVotingModalType) => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const { session } = Object.fromEntries([...searchParams]);
  const [cancelSessionForm] = Form.useForm();

  //? ================================  Api Calls ================================
  const [
    getListOfSessionCreationAccusations,
    {
      data: listOfSessionCreationAccusations,
      isLoading: isListOfSessionCreationAccusationsLoading,
    },
  ] = useLazyGetListOfSessionCreationAccusationsQuery();

  // دلیل لغو جلسه
  const [
    getReasonRejectSession,
    { data: reasonRejectSessionData, isLoading: isReasonRejectSessionLoading },
  ] = useLazyGetReasonRejectSessionQuery();

  //لغو اتهامات
  const [
    cancelingAccusationOfSession,
    { isLoading: isCancelingAccusationOfSessionLoading },
  ] = useCancelingAccusationOfSessionMutation();

  // لغو جلسه
  const [cancelingSession, { isLoading: isCancelingSessionLoading }] =
    useCancelingSessionMutation();

  useEffect(() => {
    if (session && isSessionCancelModalOpen) {
      getListOfSessionCreationAccusations({
        firstResult: 0,
        maxResults: 50,
        meetingId: +session,
      });
      getReasonRejectSession({ firstResult: 0, maxResults: 8 });
    }
  }, [session, isSessionCancelModalOpen]);

  //* ================================ Util Functions ================================
  const cancelingSessionOnSuccess = async (value: CancelingSessionResponse) => {
    if (value?.status === 200) {
      toast.success(CANCELING_SESSION_SUCCESS_MSG, {
        toastId: CANCELING_SESSION_SUCCESS_MSG,
      });
      closeModalHandler();
      navigate({
        pathname: COMMITTEE_SESSION_LIST_PAGE_ROUTE,
      });
    }
  };

  const cancelSessionHandler = (data: any) => {
    let idsList = "";
    listOfSessionCreationAccusations?.data.map(
      (item) => (idsList = idsList + `${item?.id},`)
    );

    cancelingAccusationOfSession({
      form: "CancelingSession",
      _data_: {
        meeting: null,
      },
      id_IN: idsList.slice(0, idsList.length - 1),
    })
      .unwrap()
      .then((value: CancelingAccusationOfSessionResponse) => {
        if (value?.status === 204) {
          cancelingSession({
            form: "ReasonAndExplanationCancelingSession",
            id: "7e142dbbb603472482113fe618b6ae4b",
            _data_: {
              reasonCancellation: data?.rejectReportReason?.children,
              descCancellation: data?.rejectReportDescription,
              lastModifiedDate: new Date(),
              SessionStatus: "4",
              id: +session,
            },
          })
            .unwrap()
            .then(cancelingSessionOnSuccess);
        }
      });
  };

  const closeModalHandler = () => {
    setIsSessionCancelModalOpen(false);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isSessionCancelModalOpen && (
        <Modal
          title="لغو جلسه"
          open={isSessionCancelModalOpen}
          onCancel={closeModalHandler}
          footer={null}
          width={800}
          className="committee-session-cancel-modal"
        >
          <Form form={cancelSessionForm} onFinish={cancelSessionHandler}>
            <CustomCard className="box-wrapper">
              <CustomSelect
                label="دلیل"
                name="rejectReportReason"
                options={reasonRejectSessionData?.data}
                placeholder="انتخاب کنید"
                isLoading={isReasonRejectSessionLoading}
                form={cancelSessionForm}
              />
              <CustomTextArea
                label="توضیحات"
                name="rejectReportDescription"
                placeholder="توضیحات"
              />
            </CustomCard>
            <CustomCard>
              <p className="desc">
                با حذف این جلسه، اتهامات زیر به حالت آماده جلسه برگشت خواهند خورد.
              </p>
              <CustomTable
                dataSource={listOfSessionCreationAccusations?.data}
                columns={SessionCancelModel}
                {...TABLE_PROPS(listOfSessionCreationAccusations?.data?.length || 0)}
                rowKey="id"
                loading={isListOfSessionCreationAccusationsLoading}
                className="committee-session-cancel-table"
              />
            </CustomCard>
            <div className="btn-wrapper">
              <Button
                type="primary"
                danger
                className="btn-modal"
                htmlType="submit"
                loading={
                  isCancelingAccusationOfSessionLoading || isCancelingSessionLoading
                }
              >
                لغو جلسه
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

export default SessionCancelModal;
