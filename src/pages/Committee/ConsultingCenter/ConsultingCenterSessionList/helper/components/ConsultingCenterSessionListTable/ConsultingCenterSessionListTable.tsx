import { memo, useEffect, useState } from "react";

import { Form } from "antd";
import { useSearchParams } from "react-router";
import { toast } from "react-toastify";

import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { ConsultingCenterSessionListModel } from "@infra/models/tableModels/CommitteeTableModel/ConsultingCenter/ConsultingCenterSessionListModel/ConsultingCenterSessionListModel";
import {
  useLazyGetConsultingCenterSessionListCountQuery,
  useLazyGetConsultingCenterSessionListQuery,
  useSendConsultingRejectSessionMutation,
} from "@infra/states/redux/Apis/committee/consultingCenter/consultingCenterApi";
import { CONFIRMATION_MODAL_WIDTH_700 } from "@infra/VARS/globalStyles/globalStyles";
import { GENERAL_SUBMIT_SUCCESS } from "@infra/VARS/globalToasts/globalToasts";
import RejectSessionModalContent from "@pages/Committee/ConsultingCenter/ConsultingCenterDetail/RejectSessionModalContent/RejectSessionModalContent";

import {
  ConsultingCenterSessionList,
  GetConsultingCenterSessionListResponse,
  SendConsultingRejectSessionResponse,
} from "./@types/@ConsultingCenterSessionListTable";
import "./_consultingCenterSessionListTable.scss";

const ConsultingCenterSessionListTable = memo(({ type }: { type: number }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const url = Object.fromEntries([...searchParams]);
  const [rejectForm] = Form.useForm();
  const [dataSource, setDataSource] = useState<ConsultingCenterSessionList[]>([]);
  const [currentPageMode] = useState<"normal" | "filter">("normal");
  const [isRejectSessionModalOpen, setIsRejectSessionModalOpen] = useState({
    isOpen: false,
    id: -1,
  });
  const [isRefreshed, setIsRefreshed] = useState(false);

  //? ================================  Api Calls ================================
  // get table content
  const [
    getConsultingCenterSessionList,
    { isFetching: isConsultingCenterSessionListLoading },
  ] = useLazyGetConsultingCenterSessionListQuery();

  // get the count of table rows
  const [
    getConsultingCenterSessionListCount,
    {
      data: ConsultingCenterSessionListCountData,
      isFetching: isConsultingCenterSessionListCount,
    },
  ] = useLazyGetConsultingCenterSessionListCountQuery();

  // send the reject session modals data
  const [sendConsultingRejectSession, { isLoading: isConsultingRejectSessionLoading }] =
    useSendConsultingRejectSessionMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getListData();
  }, [type, url?.page, url?.pageSize, isRefreshed]);

  //* ================================ Util Functions ================================
  // this function runs if request is success.
  const onGetConsultingCenterSessionListSuccess = (
    consult: GetConsultingCenterSessionListResponse
  ) => {
    if (consult?.status === 200) {
      setDataSource(consult?.data);
    }
  };

  const getListData = () => {
    // get main list data
    getConsultingCenterSessionList({
      firstResult: url?.page ? Number((+url.page - 1) * +url.pageSize) : 0,
      maxResults: url?.pageSize ? Number(url?.pageSize) : 8,
      type: type,
    })
      .unwrap()
      .then(onGetConsultingCenterSessionListSuccess);

    // get list count
    getConsultingCenterSessionListCount({ type: type });
  };

  // when (reject session) request is success
  const onRejectSessionConfirmSuccess = async (
    value: SendConsultingRejectSessionResponse
  ) => {
    if (value?.status === 200) {
      setIsRefreshed((prev) => !prev);
      toast.success(GENERAL_SUBMIT_SUCCESS, { toastId: GENERAL_SUBMIT_SUCCESS });
      rejectForm.resetFields();
      setIsRejectSessionModalOpen({ isOpen: false, id: -1 });
    }
  };

  const rejectSessionConfirmHandler = () => {
    rejectForm?.submit();
    if (isRejectSessionModalOpen?.id > 1) {
      rejectForm
        .validateFields()
        .then((values: { description: string; reason: { children: string } }) => {
          sendConsultingRejectSession({
            form: "CancelCounselingSession",
            id: "72c23f36c7084c5d978e93f549736533",
            _data_: {
              descCancellation: values?.description,
              meetingStatus: 4,
              reasonCanceling: values?.reason?.children,
              id: isRejectSessionModalOpen?.id,
            },
          })
            .unwrap()
            .then((value) => setTimeout(() => onRejectSessionConfirmSuccess(value), 600));
        });
    }
  };

  // reject session modal
  const closeRejectSessionHandler = () => {
    setIsRejectSessionModalOpen({ isOpen: false, id: -1 });
  };
  const cancelSessionHandler = (id: number) => {
    setIsRejectSessionModalOpen({ isOpen: true, id: id });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="committee-consulting-center-session-list-table-container">
      {/* ---------------------------------- reject session modal ---------------------------------- */}
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

      <CustomTable
        dataSource={dataSource}
        rowKey="id"
        // key={isRefreshed as any}
        loading={
          isConsultingCenterSessionListLoading ||
          isConsultingCenterSessionListCount ||
          isConsultingRejectSessionLoading
        }
        columns={ConsultingCenterSessionListModel({
          cancelSessionHandler: cancelSessionHandler,
          type,
        })}
        pagination={manualPaginationConfig({
          total:
            currentPageMode === "normal"
              ? ConsultingCenterSessionListCountData?.data
              : ConsultingCenterSessionListCountData?.data,

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
        className="consulting-center-session-list-table"
        {...TABLE_PROPS(dataSource?.length)}
      />
    </div>
  );
});
ConsultingCenterSessionListTable.displayName = "ConsultingCenterSessionListTable";
export default ConsultingCenterSessionListTable;
