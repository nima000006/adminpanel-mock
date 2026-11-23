import { useEffect, useState } from "react";

import { Button, Form, FormInstance } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";

import {
  AccusationList,
  GetAccusationsResponse,
  RejectSessionModalContentType,
  SendRejectSessionResponse,
} from "./@types/@accusationsListTable";
import manualPaginationConfig from "../../../../../infrastructure/helpers/TableHelpers/config/manualPagination";
import { AccusationsListModel } from "../../../../../infrastructure/models/tableModels/CommitteeTableModel/AccusationsList/AccusationsListModel";
import { COMMITTEE_ACCUSATION_CASE_PAGE_ROUTE } from "../../../../../infrastructure/router/routes/committee";
import {
  useLazyGetAccusationsListCountQuery,
  useLazyGetAccusationsListQuery,
  useLazyGetRejectSessionQuery,
  useSendRejectSessionMutation,
} from "../../../../../infrastructure/states/redux/Apis/committee/handleProcessing/handleProcessing";
import {
  GENERAL_REJECTION_SUCCESS,
  YOU_DONT_HAVE_ENOUGH_PERMISSION,
} from "../../../../../infrastructure/VARS/globalToasts/globalToasts";
import CustomSelect from "../../../../CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "../../../../CustomInputs/CustomTextArea/CustomTextArea";
import SessionAllocationModal from "../../../../Modals/Committee/SessionAllocation/SessionAllocationModal";
import ConfirmationModalWithContent from "../../../../Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";

import "./_accusationsListTable.scss";

// reject modal
const RejectSessionModalContent = ({
  form,
}: {
  id: number;
  form: FormInstance<RejectSessionModalContentType>;
}) => {
  //? ================================  Api Calls ================================
  const [
    getRejectSession,
    { data: rejectSessionData, isFetching: isRejectSessionLoading },
  ] = useLazyGetRejectSessionQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getRejectSession({ firstResult: 0, maxResults: 8 });
  }, []);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form className="committee-report-modal-reject-meeting-container" form={form}>
      <CustomSelect
        label="دلیل"
        isLoading={isRejectSessionLoading}
        name="ReasonsReturningPreliminaryMeeting"
        // placeholder="انتخاب کنید"
        options={rejectSessionData?.data}
        hasVerticalLabel={false}
      />
      <CustomTextArea
        label="توضیحات"
        placeholder="توضیحات"
        name="DescReturningPreliminaryMeeting"
      />
    </Form>
  );
};

//accusation list
const AccusationsListTable = ({ accusationType }: { accusationType: string }) => {
  const navigate = useNavigate();
  const [isRejectModalOpen, setIsRejectModalOpen] = useState({ isOpen: false, id: -1 });
  const [isAllocationModalOpen, setIsAllocationModalOpen] = useState<{
    isOpen: boolean;
    id: number;
  }>({ isOpen: false, id: -1 });
  const [currentPageMode] = useState<"normal" | "filter">("normal");
  const { params: url, setSearchParams } = useQueryParams();
  const [dataSource, setDataSource] = useState<AccusationList[]>([]);
  const [rejectForm] = Form.useForm();

  //? ================================  Api Calls ================================
  // get table
  const [getAccusationList, { isFetching: isAccusationListLoading }] =
    useLazyGetAccusationsListQuery();

  // get the count of table rows
  const [
    getAccusationListCount,
    { data: accusationListCountData, isFetching: isAccusationListCountLoading },
  ] = useLazyGetAccusationsListCountQuery();

  // posted the reject session modal data
  const [sendRejectSession, { isLoading: isSendRejectSessionLoading }] =
    useSendRejectSessionMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getListData();
  }, [accusationType, url?.page, url?.pageSize]);

  //* ================================ Util Functions ================================
  const onGetAccusationSuccess = async (info: GetAccusationsResponse) => {
    if (info?.status === 200) {
      if (info?.data) {
        setDataSource(info?.data);
      } else {
        toast.error(YOU_DONT_HAVE_ENOUGH_PERMISSION, {
          toastId: YOU_DONT_HAVE_ENOUGH_PERMISSION,
        });
      }
    }
  };

  const getListData = () => {
    // get main list data
    getAccusationList({
      firstResult: url?.page ? Number((+url.page - 1) * +url.pageSize) : 0,
      maxResults: url?.pageSize ? Number(url?.pageSize) : 8,
      type: accusationType,
    })
      .unwrap()
      .then(onGetAccusationSuccess);

    // get count
    getAccusationListCount({ type: accusationType });
  };

  const onSendRejectSessionSuccess = async (rejectInfo: SendRejectSessionResponse) => {
    if (rejectInfo?.status === 200) {
      setIsRejectModalOpen({ isOpen: false, id: -1 });
      rejectForm.resetFields();
      getListData();
      toast.success(GENERAL_REJECTION_SUCCESS, { toastId: GENERAL_REJECTION_SUCCESS });
    }
  };

  const rejectSessionHandler = () => {
    rejectForm?.submit();

    if (isRejectModalOpen?.id > 1) {
      sendRejectSession({
        _data_: {
          DescReturningPreliminaryMeeting:
            rejectForm.getFieldsValue()?.DescReturningPreliminaryMeeting,
          id: isRejectModalOpen?.id,
          ReasonsReturningPreliminaryMeeting:
            rejectForm.getFieldsValue()?.ReasonsReturningPreliminaryMeeting,
        },
      })
        .unwrap()
        .then(onSendRejectSessionSuccess);
    }
  };

  // advanceFilter btn
  const advanceFilterHandler = () => {};

  // check btn
  const checkClickHandler = (id: number) => {
    navigate(`${COMMITTEE_ACCUSATION_CASE_PAGE_ROUTE}?id=${id}`);
  };

  // allocationMeeting btn
  const allocationMeetingHandler = (id: number) => {
    setIsAllocationModalOpen({ isOpen: true, id: id });
  };

  const isAllocationModalOpenHandler = () => {
    setIsAllocationModalOpen({ isOpen: false, id: -1 });
  };

  const rejectMeetingHandler = (id: number) => {
    setIsRejectModalOpen({ isOpen: true, id });
  };
  const closeRejectSessionModalHandler = () => {
    setIsRejectModalOpen({ isOpen: false, id: -1 });
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
          content={
            <RejectSessionModalContent id={isRejectModalOpen?.id} form={rejectForm} />
          }
          showIcon={false}
        />
      )}

      {isAllocationModalOpen?.isOpen && (
        <SessionAllocationModal
          setIsModalOpen={isAllocationModalOpenHandler}
          isModalOpen={isAllocationModalOpen}
        />
      )}

      <div className="committee-report-container">
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
          columns={AccusationsListModel({
            checkClickHandler: checkClickHandler,
            rejectMeetingHandler: rejectMeetingHandler,
            allocationMeetingHandler: allocationMeetingHandler,
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
export default AccusationsListTable;
