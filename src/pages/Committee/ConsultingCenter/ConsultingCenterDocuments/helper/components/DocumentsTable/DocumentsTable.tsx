import { useEffect, useState } from "react";

import { Button, Form } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";

import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { DocumentsModel } from "@infra/models/tableModels/CommitteeTableModel/ConsultingCenter/DocumentsModel/DocumentsModel";
import { COMMITTEE_CONSULTING_CENTER_DETAIL_PAGE_ROUTE } from "@infra/router/routes/committee";
import {
  useLazyGetConsultingCenterListCountQuery,
  useLazyGetConsultingCenterListQuery,
  useSendConsultingRejectSessionMutation,
  useSendConsultingSessionAllocationModalMutation,
} from "@infra/states/redux/Apis/committee/consultingCenter/consultingCenterApi";
import { CONFIRMATION_MODAL_WIDTH_700 } from "@infra/VARS/globalStyles/globalStyles";
import {
  GENERAL_ERROR_MESSAGE,
  GENERAL_SUBMIT_SUCCESS,
} from "@infra/VARS/globalToasts/globalToasts";
import RejectSessionModalContent from "@pages/Committee/ConsultingCenter/ConsultingCenterDetail/RejectSessionModalContent/RejectSessionModalContent";
import SessionAllocationModalContent from "@pages/Committee/ConsultingCenter/ConsultingCenterDetail/SessionAllocationModalContent/SessionAllocationModalContent";
import { SendConsultingRejectSessionResponse } from "@pages/Committee/ConsultingCenter/ConsultingCenterSessionList/helper/components/ConsultingCenterSessionListTable/@types/@ConsultingCenterSessionListTable";

import {
  ConsultingCenterList,
  ConsultingCenterSessionAllocationType,
  GetConsultingCenterResponse,
  SendConsultingSessionAllocationModalResponse,
} from "./@types/@documentsTable";
import {
  NORMAL_SESSION,
  SESSION_CHANGE,
} from "./DocumentsTableHelpers/DocumentsTableHelpers";
import "./_documentsTable.scss";

const DocumentsTable = ({ type }: { type: number }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const url = Object.fromEntries([...searchParams]);
  const [dataSource, setDataSource] = useState<ConsultingCenterList[]>([]);
  const [currentPageMode] = useState<"normal" | "filter">("normal");
  const [assignForm] = Form.useForm();
  const [rejectForm] = Form.useForm();
  const navigate = useNavigate();
  const [isSessionAllocationModalOpen, setIsSessionAllocationModalOpen] = useState({
    isOpen: false,
    id: -1,
  });
  const [isRejectSessionModalOpen, setIsRejectSessionModalOpen] = useState({
    isOpen: false,
    id: -1,
  });
  const [isChangeSessionModalOpen, setIsChangeSessionModalOpen] = useState({
    isOpen: false,
    id: -1,
  });

  //? ================================  Api Calls ================================
  // get table content
  const [getConsultingCenterList, { isFetching: isConsultingCenterListLoading }] =
    useLazyGetConsultingCenterListQuery();

  // get the count of table rows
  const [
    getConsultingCenterListCount,
    { data: ConsultingCenterListCountData, isFetching: isConsultingCenterListCount },
  ] = useLazyGetConsultingCenterListCountQuery();

  // send the session allocation modals data
  const [sendSessionAllocation, { isLoading: isSessionAllocationLoading }] =
    useSendConsultingSessionAllocationModalMutation();

  // send the reject session modals data
  const [sendConsultingRejectSession, { isLoading: isConsultingRejectSessionLoading }] =
    useSendConsultingRejectSessionMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getListData();
  }, [type, url?.page, url?.pageSize]);

  //* ================================ Util Functions ================================
  // navigate
  const checkClickHandler = (id: number) => {
    navigate(`${COMMITTEE_CONSULTING_CENTER_DETAIL_PAGE_ROUTE}?id=${id}`);
  };

  // change session modal
  const closeChangeSessionHandler = () => {
    setIsChangeSessionModalOpen({ isOpen: false, id: -1 });
  };
  const changeSessionHandler = (id: number) => {
    setIsChangeSessionModalOpen({ isOpen: true, id });
  };

  // this function runs if request is success.
  const onGetConsultingCenterListSuccess = (values: GetConsultingCenterResponse) => {
    if (values?.status === 200 && values?.data) {
      setDataSource(values?.data);
    }
  };

  const getListData = () => {
    // get main list data
    getConsultingCenterList({
      firstResult: url?.page ? Number((+url.page - 1) * +url.pageSize) : 0,
      maxResults: url?.pageSize ? Number(url?.pageSize) : 8,
      type: type,
    })
      .unwrap()
      .then(onGetConsultingCenterListSuccess);

    // get list count
    getConsultingCenterListCount({ type: type });
  };

  // session allocation handler
  const allocationMeetingHandler = (id: number) => {
    setIsSessionAllocationModalOpen({ isOpen: true, id });
  };
  const closeSessionAllocationHandler = () => {
    setIsSessionAllocationModalOpen({ isOpen: false, id: -1 });
  };

  // this function runs if (sendSessionAllocation) request is success.
  const onSendSessionAllocationSuccess = async (
    value: SendConsultingSessionAllocationModalResponse
  ) => {
    if (value?.status === 200) {
      toast.success(GENERAL_SUBMIT_SUCCESS, { toastId: GENERAL_SUBMIT_SUCCESS });
      assignForm.resetFields();
      setIsSessionAllocationModalOpen({ isOpen: false, id: -1 });
      setIsChangeSessionModalOpen({ isOpen: false, id: -1 });
      getListData();
    }
  };
  // final register btn
  const sessionAllocationHandler = () => {
    assignForm.submit();
    assignForm
      ?.validateFields()
      .then((values: ConsultingCenterSessionAllocationType) => {
        sendSessionAllocation({
          form: "AllocationCounselingSessions",
          id: "2e85823f54b34b809e13997d1dd63a4d",
          _data_: {
            meetingType: values?.sessionType?.code,
            meetingStartTime: values?.startTime,
            placeMeeting: values?.sessionLocation?.code,
            meetingDate: values?.datePicker,
            meetingEndTime: values?.endTime,
            Consultant: values?.consultant?.code,
            desc: values?.description,
            notificationType: values?.notification?.code,
            fatherName: values?.fatherName,
            motherName: values?.motherName,
            fatherPhoneNumber: values?.fatherPhone,
            motherPhoneNumber: values?.motherPhone,
            sentMessage: values?.sendMessage,
            meetingStatus: 2,
            id: isChangeSessionModalOpen?.id > 1 ? isChangeSessionModalOpen?.id : null,
          },
        })
          .unwrap()
          .then(onSendSessionAllocationSuccess);
      })
      .catch(() =>
        toast.error(GENERAL_ERROR_MESSAGE, { toastId: GENERAL_ERROR_MESSAGE })
      );
  };

  // when (reject session) request is success
  const onRejectSessionConfirmSuccess = async (
    value: SendConsultingRejectSessionResponse
  ) => {
    if (value?.status === 200) {
      toast.success(GENERAL_SUBMIT_SUCCESS, { toastId: GENERAL_SUBMIT_SUCCESS });
      rejectForm.resetFields();
      setIsRejectSessionModalOpen({ isOpen: false, id: -1 });
      getListData();
    }
  };
  // reject session handler
  const cancelSessionHandler = (id: number) => {
    setIsRejectSessionModalOpen({ isOpen: true, id: id });
  };
  const closeRejectSessionHandler = () => {
    setIsRejectSessionModalOpen({ isOpen: false, id: -1 });
  };

  const rejectSessionConfirmHandler = () => {
    rejectForm?.submit();
    if (isRejectSessionModalOpen?.id > 1) {
      sendConsultingRejectSession({
        form: "CancelCounselingSession",
        id: "72c23f36c7084c5d978e93f549736533",
        _data_: {
          descCancellation: rejectForm.getFieldsValue()?.description,
          meetingStatus: 4,
          reasonCanceling: rejectForm.getFieldsValue()?.reason,
          id: isRejectSessionModalOpen?.id,
        },
      })
        .unwrap()
        .then(onRejectSessionConfirmSuccess);
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* ---------------------------------- مودال تخصیص جلسه  ---------------------------------- */}
      {isSessionAllocationModalOpen?.isOpen && (
        <ConfirmationModalWithContent
          title="تخصیص جلسه"
          isModalOpen={isSessionAllocationModalOpen?.isOpen}
          confirmBtnText="ثبت نهایی"
          closeModalHandler={closeSessionAllocationHandler}
          onConfirmClickHandler={sessionAllocationHandler}
          htmlType="submit"
          content={
            <SessionAllocationModalContent
              id={isSessionAllocationModalOpen?.id}
              assignForm={assignForm}
              from={NORMAL_SESSION}
            />
          }
          width={CONFIRMATION_MODAL_WIDTH_700}
          isConfirmButtonLoading={isSessionAllocationLoading}
          showIcon={false}
        />
      )}

      {/* ---------------------------------- مودال لغو جلسه  ---------------------------------- */}
      {isRejectSessionModalOpen?.isOpen && (
        <ConfirmationModalWithContent
          title="لغو جلسه"
          isModalOpen={isRejectSessionModalOpen?.isOpen}
          confirmBtnText="لغو جلسه"
          isDangerous={true}
          closeModalHandler={closeRejectSessionHandler}
          onConfirmClickHandler={rejectSessionConfirmHandler}
          content={
            <RejectSessionModalContent
              id={isRejectSessionModalOpen?.id}
              rejectForm={rejectForm}
            />
          }
          width={CONFIRMATION_MODAL_WIDTH_700}
          isConfirmButtonLoading={isConsultingRejectSessionLoading}
          showIcon={false}
        />
      )}

      {/* ---------------------------------- مودال تغییر جلسه  ---------------------------------- */}
      {isChangeSessionModalOpen?.isOpen && (
        <ConfirmationModalWithContent
          title="تغییر جلسه"
          isModalOpen={isChangeSessionModalOpen?.isOpen}
          confirmBtnText="ثبت نهایی"
          closeModalHandler={closeChangeSessionHandler}
          onConfirmClickHandler={sessionAllocationHandler}
          htmlType="submit"
          content={
            <SessionAllocationModalContent
              id={isChangeSessionModalOpen?.id}
              assignForm={assignForm}
              from={SESSION_CHANGE}
            />
          }
          width={CONFIRMATION_MODAL_WIDTH_700}
          showIcon={false}
        />
      )}

      <div className="committee-consulting-center-documents-table-container">
        <Button
          type="primary"
          icon={<AiOutlineFilter />}
          // onClick={advanceFilterHandler}
          className="advance-filter-btn"
        >
          فیلتر پیشرفته
        </Button>

        <CustomTable
          dataSource={dataSource}
          loading={isConsultingCenterListLoading || isConsultingCenterListCount}
          rowKey="id"
          columns={DocumentsModel({
            checkClickHandler: checkClickHandler,
            allocationMeetingHandler: allocationMeetingHandler,
            cancelSessionHandler: cancelSessionHandler,
            changeSessionHandler: changeSessionHandler,
            type,
          })}
          pagination={manualPaginationConfig({
            total:
              currentPageMode === "normal"
                ? ConsultingCenterListCountData?.data
                : ConsultingCenterListCountData?.data,

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
          className="committee-consulting-center-documents-table"
        />
      </div>
    </>
  );
};
export default DocumentsTable;
