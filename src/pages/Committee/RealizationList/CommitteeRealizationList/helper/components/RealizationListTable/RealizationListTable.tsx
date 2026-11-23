import { useEffect, useState } from "react";

import { Button, Form } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";

import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { makeSearchParams } from "@infra/helpers/utils";
import { RealizationListModel } from "@infra/models/tableModels/CommitteeTableModel/RealizationList/RealizationListModel";
import { COMMITTEE_ACCUSATION_CASE_PAGE_ROUTE } from "@infra/router/routes/committee";
import {
  useLazyGetCommitteeRealizationListCountQuery,
  useLazyGetCommitteeRealizationListQuery,
  useSendCommitteeRealizationRejectSessionMutation,
  useSendCommitteeRealizationSessionModalMutation,
} from "@infra/states/redux/Apis/committee/committees/committees";
import {
  GENERAL_ERROR_MESSAGE,
  GENERAL_REJECTION_SUCCESS,
  GENERAL_SUBMIT_SUCCESS,
} from "@infra/VARS/globalToasts/globalToasts";
import { CommitteeRealizationOtherFile } from "@pages/Committee/RealizationList/ModalContents/SessionAllocation/@types/@sessionAllocationModalContent";
import SessionAllocationModalContent from "@pages/Committee/RealizationList/ModalContents/SessionAllocation/SessionAllocationModalContent";
import SessionCancelModalContent from "@pages/Committee/RealizationList/ModalContents/SessionCancel/SessionCancelModalContent";

import {
  GetCommitteeRealizationListResponse,
  RealizationListAllocationFormData,
  SendCommitteeRealizationRejectSessionResponse,
  SendCommitteeRealizationSessionModalResponse,
  committeeRealizationList,
} from "./@types/@realizationListTable";
import {
  NORMAL_SESSION,
  SESSION_CHANGE,
} from "./RealizationListTableHelpers/RealizationListTableHelpers";
import "./_realizationListTable.scss";

const RealizationListTable = ({ type }: { type: number }) => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const url = Object.fromEntries([...searchParams]);

  const [dataSource, setDataSource] = useState<committeeRealizationList[]>([]);
  const [data, setData] = useState<CommitteeRealizationOtherFile[]>([]);
  const [currentPageMode] = useState<"normal" | "filter">("normal");
  const [isSessionCancelModalOpen, setIsSessionCancelModalOpen] = useState({
    isOpen: false,
    id: -1,
  });
  const [isSessionAllocationModalOpen, setIsSessionAllocationModalOpen] = useState({
    isOpen: false,
    id: -1,
  });
  const [isChangeSessionModalOpen, setIsChangeSessionModalOpen] = useState({
    isOpen: false,
    id: -1,
  });
  const [rejectForm] = Form.useForm();
  const [sessionForm] = Form.useForm();

  //? ================================  Api Calls ================================
  // get table content
  const [getCommitteeRealizationList, { isFetching: isCommitteeRealizationListLoading }] =
    useLazyGetCommitteeRealizationListQuery();

  // get the count of table rows
  const [
    getCommitteeRealizationListCount,
    {
      data: committeeRealizationListCountData,
      isFetching: isCommitteeRealizationListCountLoading,
    },
  ] = useLazyGetCommitteeRealizationListCountQuery();

  // posted the reject session modal data
  const [
    sendCommitteeRealizationRejectSession,
    { isLoading: isCommitteeRealizationRejectSessionLoading },
  ] = useSendCommitteeRealizationRejectSessionMutation();

  // send the session allocation and session change modals data
  const [sendSessionModal, { isLoading: isSessionModalLoading }] =
    useSendCommitteeRealizationSessionModalMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getListData();
  }, [type, url?.page, url?.pageSize]);

  //* ================================ Util Functions ================================
  const onGetCommitteeRealizationListSuccess = async (
    info: GetCommitteeRealizationListResponse
  ) => {
    if (info?.status === 200) {
      setDataSource(info?.data);
    }
  };

  // onSendSessionModalSuccess
  const onSendSessionModalSuccess = async (
    response: SendCommitteeRealizationSessionModalResponse
  ) => {
    if (response?.status === 200) {
      toast.success(GENERAL_REJECTION_SUCCESS, { toastId: GENERAL_REJECTION_SUCCESS });

      setIsSessionAllocationModalOpen({ isOpen: false, id: -1 });
      setIsChangeSessionModalOpen({
        isOpen: false,
        id: -1,
      });

      sessionForm.resetFields();
      getListData();
    }
  };

  // onSendCommitteeRealizationRejectSessionSuccess
  const onSendCommitteeRealizationRejectSessionSuccess = async (
    resp: SendCommitteeRealizationRejectSessionResponse
  ) => {
    if (resp?.status === 200) {
      setIsSessionCancelModalOpen({ isOpen: false, id: -1 });
      rejectForm.resetFields();
      toast.success(GENERAL_SUBMIT_SUCCESS, { toastId: GENERAL_SUBMIT_SUCCESS });
      getListData();
    }
  };

  const getListData = () => {
    // get main list data
    getCommitteeRealizationList({
      firstResult: url?.page ? Number((+url.page - 1) * +url.pageSize) : 0,
      maxResults: url?.pageSize ? Number(url?.pageSize) : 8,
      type: type,
    })
      .unwrap()
      .then(onGetCommitteeRealizationListSuccess);

    // get list count
    getCommitteeRealizationListCount({ type: type });
  };

  const advanceFilterHandler = () => {};

  const checkClickHandler = (id: number) => {
    navigate({
      pathname: COMMITTEE_ACCUSATION_CASE_PAGE_ROUTE,
      search: makeSearchParams({ id }),
    });
  };

  // Allocation Modal تخصیص جلسه
  const closeSessionAllocationModalHandler = () => {
    setIsSessionAllocationModalOpen({ isOpen: false, id: -1 });
  };
  const openSessionAllocationModalHandler = (id: number) => {
    setIsSessionAllocationModalOpen({ isOpen: true, id });
  };
  const registerSessionAllocationHandler = () => {
    sessionForm?.submit();
    sessionForm
      ?.validateFields()
      .then((values: RealizationListAllocationFormData) =>
        sendSessionModal({
          form: "AllocationUnderstandingMeeting",
          id: "77bde469539e446cac4e21fe918c6e99",
          _data_: {
            needToBePresentUnderstanding: values?.needToBePresentUnderstanding
              ? values?.needToBePresentUnderstanding
              : false,
            understandingMeetingId: values?.understandingMeetingId?.code,
            understandingReviewPeriod: values?.understandingReviewPeriod?.item?.title,
            UnderstandingProvider: values?.UnderstandingProvider?.children,
            understandingNotificationType: values?.understandingNotificationType?.id,
            understandingNotificationMessage: values?.understandingNotificationMessage,
            id: isChangeSessionModalOpen?.id > 1 ? isChangeSessionModalOpen?.id : null,
          },
        })
          .unwrap()
          .then(onSendSessionModalSuccess)
      )
      .catch(() => toast.error(GENERAL_ERROR_MESSAGE));
  };

  // Session Cancel Modal  لغو جلسه
  const closeSessionCancelModalHandler = () => {
    setIsSessionCancelModalOpen({ isOpen: false, id: -1 });
  };
  const openSessionCancelModalHandler = (id: number) => {
    setIsSessionCancelModalOpen({ isOpen: true, id });
  };
  const sessionCancelHandler = () => {
    rejectForm?.submit();

    if (isSessionCancelModalOpen?.id > 1) {
      sendCommitteeRealizationRejectSession({
        form: "CancelSession",
        id: "6c74f72166994fc7b84fdaa77ee2f26b",
        _data_: {
          understandingCommitteCancellingReason:
            rejectForm.getFieldsValue()?.understandingCommitteCancellingReason,
          id: isSessionCancelModalOpen?.id,
          understandingCommitteCancellingDescription:
            rejectForm.getFieldsValue()?.understandingCommitteCancellingDescription,
        },
      })
        .unwrap()
        .then(onSendCommitteeRealizationRejectSessionSuccess);
    }
  };

  // Change Session Modal  تغییر جلسه
  const closeChangeSessionModalHandler = () => {
    setIsChangeSessionModalOpen({
      isOpen: false,
      id: -1,
    });
  };
  const openChangeSessionModalHandler = (id: number) => {
    setIsChangeSessionModalOpen({
      isOpen: true,
      id,
    });
  };
  return (
    <>
      {/*تخصیص جلسه */}
      {isSessionAllocationModalOpen?.isOpen && (
        <ConfirmationModalWithContent
          title="تخصیص جلسه"
          isModalOpen={isSessionAllocationModalOpen?.isOpen}
          confirmBtnText="ثبت نهایی"
          closeModalHandler={closeSessionAllocationModalHandler}
          onConfirmClickHandler={registerSessionAllocationHandler}
          htmlType="submit"
          content={
            <SessionAllocationModalContent
              id={isSessionAllocationModalOpen?.id}
              sessionForm={sessionForm}
              data={data}
              setData={setData}
              from={NORMAL_SESSION}
            />
          }
          isConfirmButtonLoading={isSessionModalLoading}
          width={800}
          showIcon={false}
        />
      )}

      {/* لغو جلسه */}
      {isSessionCancelModalOpen?.isOpen && (
        <ConfirmationModalWithContent
          title="لغو جلسه"
          isModalOpen={isSessionCancelModalOpen?.isOpen}
          confirmBtnText="لغو جلسه"
          closeModalHandler={closeSessionCancelModalHandler}
          onConfirmClickHandler={sessionCancelHandler}
          content={
            <SessionCancelModalContent
              id={isSessionCancelModalOpen?.id}
              form={rejectForm}
            />
          }
          isConfirmButtonLoading={isCommitteeRealizationRejectSessionLoading}
          isDangerous={true}
          showIcon={false}
        />
      )}

      {/* تغییر جلسه */}
      {isChangeSessionModalOpen?.isOpen && (
        <ConfirmationModalWithContent
          title="تغییر جلسه"
          isModalOpen={isChangeSessionModalOpen?.isOpen}
          confirmBtnText="ثبت نهایی"
          closeModalHandler={closeChangeSessionModalHandler}
          onConfirmClickHandler={registerSessionAllocationHandler}
          htmlType="submit"
          content={
            <SessionAllocationModalContent
              id={isChangeSessionModalOpen?.id}
              sessionForm={sessionForm}
              data={data}
              setData={setData}
              from={SESSION_CHANGE}
            />
          }
          width={800}
          showIcon={false}
        />
      )}

      <div className="committee-realization-list-table-container">
        <Button
          type="primary"
          icon={<AiOutlineFilter />}
          onClick={advanceFilterHandler}
          className="advance-filter-btn"
        >
          فیلتر پیشرفته
        </Button>
        <CustomTable
          dataSource={dataSource}
          columns={RealizationListModel({
            checkClickHandler: checkClickHandler,
            cancelSessionHandler: openSessionCancelModalHandler,
            allocationSessionHandler: openSessionAllocationModalHandler,
            changeSessionHandler: openChangeSessionModalHandler,
            type,
          })}
          pagination={manualPaginationConfig({
            total:
              currentPageMode === "normal"
                ? committeeRealizationListCountData?.data
                : committeeRealizationListCountData?.data,
            onChange: (page, pageSize) => {
              setSearchParams({
                ...url,
                page: page?.toString(),
                pageSize: pageSize?.toString(),
              });
            },
            pageNumber: url?.page ? Number(url?.page) : 1,
            defaultPageSize: url?.pageSize ? Number(url?.pageSize) : 8,
          })}
          key={`table-${url?.pageSize || "8"} `}
          {...TABLE_PROPS(dataSource?.length)}
          loading={
            isCommitteeRealizationListLoading || isCommitteeRealizationListCountLoading
          }
          className="committee-report-table"
        />
      </div>
    </>
  );
};

export default RealizationListTable;
