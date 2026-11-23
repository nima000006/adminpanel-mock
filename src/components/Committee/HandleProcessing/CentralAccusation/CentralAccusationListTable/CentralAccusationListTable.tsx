import { useEffect, useState } from "react";

import { Button, Form } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import {
  CentralAccusationListTableProps,
  SendSessionAllocationFormDataType,
} from "./@types/@centralAccusationListTable";
import {
  NORMAL_SESSION,
  SESSION_CHANGE,
} from "./CentralAccusationListTableHelper/CentralAccusationListTableHelper";
import manualPaginationConfig from "../../../../../infrastructure/helpers/TableHelpers/config/manualPagination";
import {
  AccusationCentralList,
  GetAccusationCentralListResponse,
  SendCentralAccusationSessionAllocationModalResponse,
} from "../../../../../infrastructure/models/modules/committee/handleProcessing/accusationCenteral/accusationCenteral";
import AccusationCentralTableModel from "../../../../../infrastructure/models/tableModels/CommitteeTableModel/AccusationCentral/AccusationCentralTableModel";
import { COMMITTEE_CENTRAL_ACCUSATION_DETAIL_PAGE_ROUTE } from "../../../../../infrastructure/router/routes/committee";
import {
  useCentralAccusationSendCancelMoveToReadyMeetingMutation,
  useLazyGetAccusationCentralListCountQuery,
  useLazyGetAccusationCentralListQuery,
  useSendCentralAccusationSessionAllocationModalMutation,
} from "../../../../../infrastructure/states/redux/Apis/committee/handleProcessing/handleProcessing";
import {
  CONFIRMATION_MODAL_WIDTH_700,
  PADDING_20,
} from "../../../../../infrastructure/VARS/globalStyles/globalStyles";
import {
  GENERAL_ERROR_MESSAGE,
  GENERAL_REJECTION_SUCCESS,
  GENERAL_SUBMIT_SUCCESS,
} from "../../../../../infrastructure/VARS/globalToasts/globalToasts";
import { CentralAccusationSendCancelMoveToReadyMeetingResponse } from "../../../../../pages/Committee/HandleProcessing/AccusationCentral/AccusationCentralDetail/@types/@centralAccusationDetail";
import CustomCard from "../../../../CustomCard/CustomCard";
import CentralAccusationSessionAllocationModal from "../../../../Modals/Committee/CentralAccusation/CentralAccusationSessionAllocationModal";
import ConfirmationModalWithContent from "../../../../Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import "./_centralAccusationListTable.scss";

const RejectSessionModalContent = () => {
  return (
    <CustomCard
      padding={PADDING_20}
      className="handle-processing-central-accusation-reject-meeting-modal-container"
    >
      <p>از عودت به آماده جلسه مطمئن هستید؟</p>
    </CustomCard>
  );
};

const CentralAccusationListTable = ({
  accusationType,
}: CentralAccusationListTableProps) => {
  const [isRejectModalOpen, setIsRejectModalOpen] = useState({ isOpen: false, id: -1 });
  const [isSessionAllocationModalOpen, setIsSessionAllocationModalOpen] = useState({
    isOpen: false,
    id: -1,
  });
  const [isChangeSessionModalOpen, setIsChangeSessionModalOpen] = useState({
    isOpen: false,
    id: -1,
  });
  const [currentPageMode] = useState<"normal" | "filter">("normal");
  const [dataSource, setDataSource] = useState<AccusationCentralList[]>([]);
  const [assignForm] = Form.useForm();
  const [searchParams, setSearchParams] = useSearchParams();
  const url = Object.fromEntries([...searchParams]);
  const navigate = useNavigate();

  //? ================================  Api Calls ================================
  const [getAccusationList, { isFetching: isAccusationListLoading }] =
    useLazyGetAccusationCentralListQuery();

  // get the count of table
  const [
    getAccusationListCount,
    { data: accusationListCountData, isLoading: isAccusationListCountLoading },
  ] = useLazyGetAccusationCentralListCountQuery();

  // send the session allocation modals data
  const [sendSessionAllocation, { isLoading: isSessionAllocationLoading }] =
    useSendCentralAccusationSessionAllocationModalMutation();

  // send the reject session modal data
  const [sendRejectSession, { isLoading: isSendRejectSessionLoading }] =
    useCentralAccusationSendCancelMoveToReadyMeetingMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getListData();
  }, [accusationType, url?.page, url?.pageSize]);

  //* ================================ Util Functions ================================
  const onGetAccusationListSuccess = (
    accusationList: GetAccusationCentralListResponse
  ) => {
    if (accusationList?.status === 200) {
      setDataSource(accusationList?.data);
    }
  };

  const getListData = () => {
    getAccusationList({
      firstResult: url?.page ? Number((+url.page - 1) * +url.pageSize) : 0,
      maxResults: url?.pageSize ? Number(url?.pageSize) : 8,
      type: accusationType,
    })
      .unwrap()
      .then(onGetAccusationListSuccess);

    // get count
    getAccusationListCount({ type: accusationType });
  };

  // when request is success
  const onSendRejectSessionSuccess = (
    value: CentralAccusationSendCancelMoveToReadyMeetingResponse
  ) => {
    if (value?.status === 200) {
      setIsRejectModalOpen({ isOpen: false, id: -1 });
      getListData();
      toast.success(GENERAL_REJECTION_SUCCESS, { toastId: GENERAL_REJECTION_SUCCESS });
    }
  };

  const rejectSessionHandler = () => {
    if (isRejectModalOpen?.id > 1) {
      sendRejectSession({
        form: "CentrulCancelMoveToReadyMeeting",
        id: "31dcf2640a1343d89e3cf73b9169a70a",
        _data_: {
          statusCentralCommittee: "5",
          id: +isRejectModalOpen?.id,
          centrulMeeting: null,
        },
      })
        .unwrap()
        .then(onSendRejectSessionSuccess);
    } else {
      toast.error(GENERAL_ERROR_MESSAGE, { toastId: GENERAL_ERROR_MESSAGE });
    }
  };

  // this function runs if (sendSessionAllocation) request is success.
  const onSendSessionAllocationSuccess = (
    value: SendCentralAccusationSessionAllocationModalResponse,
    from: string
  ) => {
    if (value?.status === 200) {
      toast.success(GENERAL_SUBMIT_SUCCESS, { toastId: GENERAL_SUBMIT_SUCCESS });
      setIsSessionAllocationModalOpen({ isOpen: false, id: -1 });
      setIsChangeSessionModalOpen({ isOpen: false, id: -1 });
      if (from === NORMAL_SESSION) {
        assignForm.resetFields();
      }
    }
  };

  // final register btn
  const sessionAllocationHandler = ({ from }: { from: string }) => {
    assignForm.submit();
    assignForm
      ?.validateFields()
      .then((values: SendSessionAllocationFormDataType) => {
        sendSessionAllocation({
          form: "AllocationCentrulMeeting",
          id: "e726b299999e47d3835ff6fcc1c15486",
          _data_: {
            centrulNeedToBePresent: values?.needToBePresentUnderstanding
              ? values?.needToBePresentUnderstanding
              : false,
            centrulMeeting: values?.understandingMeetingId?.code,
            centrulReviewPeriod: values?.understandingReviewPeriod,
            centrulProvider: values?.UnderstandingProvider,
            primaryNotificationType: values?.understandingNotificationType,
            primaryNotificationMessage: values?.understandingNotificationMessage,
            id: isChangeSessionModalOpen?.id > 1 ? isChangeSessionModalOpen?.id : null,
          },
        })
          .unwrap()
          .then((value) => onSendSessionAllocationSuccess(value, from));
      })
      .catch(() =>
        toast.error(GENERAL_ERROR_MESSAGE, { toastId: GENERAL_ERROR_MESSAGE })
      );
  };

  // advanceFilter btn
  const advanceFilterHandler = () => {};

  // check btn
  const checkClickHandler = (id: number) => {
    navigate(`${COMMITTEE_CENTRAL_ACCUSATION_DETAIL_PAGE_ROUTE}?id=${id}`);
  };

  // reject session
  const rejectMeetingHandler = (id: number) => {
    setIsRejectModalOpen({ isOpen: true, id });
  };
  const closeRejectSessionModalHandler = () => {
    setIsRejectModalOpen({ isOpen: false, id: -1 });
  };

  // allocation meeting modal
  const allocationMeetingHandler = (id: number) => {
    setIsSessionAllocationModalOpen({ isOpen: true, id: id });
  };
  const closeSessionAllocationHandler = () => {
    setIsSessionAllocationModalOpen({ isOpen: false, id: -1 });
  };

  // change session modal
  const closeChangeSessionHandler = () => {
    setIsChangeSessionModalOpen({ isOpen: false, id: -1 });
  };
  const changeSessionHandler = (id: number) => {
    setIsChangeSessionModalOpen({ isOpen: true, id });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isRejectModalOpen?.isOpen && (
        <ConfirmationModalWithContent
          title="عودت جلسه"
          isModalOpen={isRejectModalOpen?.isOpen}
          closeModalHandler={closeRejectSessionModalHandler}
          onConfirmClickHandler={rejectSessionHandler}
          isConfirmButtonLoading={isSendRejectSessionLoading}
          confirmBtnText="عودت"
          content={<RejectSessionModalContent />}
          showIcon={false}
        />
      )}

      {/* مودال تخصیص جلسه  */}
      {isSessionAllocationModalOpen?.isOpen && (
        <ConfirmationModalWithContent
          title="تخصیص جلسه"
          isModalOpen={isSessionAllocationModalOpen?.isOpen}
          confirmBtnText="ثبت نهایی"
          closeModalHandler={closeSessionAllocationHandler}
          onConfirmClickHandler={() => sessionAllocationHandler({ from: NORMAL_SESSION })}
          htmlType="submit"
          content={
            <CentralAccusationSessionAllocationModal
              id={isSessionAllocationModalOpen?.id}
              sessionForm={assignForm}
              from={NORMAL_SESSION}
              // setData={setDataSource}
            />
          }
          width={CONFIRMATION_MODAL_WIDTH_700}
          isConfirmButtonLoading={isSessionAllocationLoading}
          showIcon={false}
        />
      )}

      {/* مودال تغییر جلسه */}
      {isChangeSessionModalOpen?.isOpen && (
        <ConfirmationModalWithContent
          title="تغییر جلسه"
          isModalOpen={isChangeSessionModalOpen?.isOpen}
          confirmBtnText="ثبت نهایی"
          closeModalHandler={closeChangeSessionHandler}
          onConfirmClickHandler={() => sessionAllocationHandler({ from: SESSION_CHANGE })}
          htmlType="submit"
          content={
            <CentralAccusationSessionAllocationModal
              id={isChangeSessionModalOpen?.id}
              sessionForm={assignForm}
              from={SESSION_CHANGE}
            />
          }
          width={CONFIRMATION_MODAL_WIDTH_700}
          isConfirmButtonLoading={isSessionAllocationLoading}
          showIcon={false}
        />
      )}

      <div className="handle-processing-central-accusation-list-container">
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
          loading={isAccusationListLoading || isAccusationListCountLoading}
          columns={AccusationCentralTableModel({
            checkClickHandler: checkClickHandler,
            rejectMeetingHandler: rejectMeetingHandler,
            allocationMeetingHandler: allocationMeetingHandler,
            changeSessionHandler: changeSessionHandler,
            type: accusationType,
          })}
          pagination={manualPaginationConfig({
            total:
              currentPageMode === "normal"
                ? accusationListCountData?.data
                : accusationListCountData?.data,

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
          rowKey="id"
          className="committee-report-table"
        />
      </div>
    </>
  );
};
export default CentralAccusationListTable;
