import { useEffect, useState } from "react";

import { Button } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import {
  AccusationAppealList,
  GetAccusationAppealListResponse,
} from "./@types/@accusationsAppealListTable";
import manualPaginationConfig from "../../../../../infrastructure/helpers/TableHelpers/config/manualPagination";
import { makeSearchParams } from "../../../../../infrastructure/helpers/utils";
import AccusationAppealTableModel from "../../../../../infrastructure/models/tableModels/CommitteeTableModel/accusationAppeal/AccusationAppealTableModel";
import { COMMITTEE_APPEAL_ACCUSATION_AND_VIOLATIONS_DETAIL_PAGE_ROUTE } from "../../../../../infrastructure/router/routes/committee";
import {
  useLazyGetAccusationAppealListCountQuery,
  useLazyGetAccusationAppealListQuery,
  useSendAppealCancelMoveToReadyMeetingMutation,
} from "../../../../../infrastructure/states/redux/Apis/committee/handleProcessing/handleProcessing";
import { GENERAL_REJECTION_SUCCESS } from "../../../../../infrastructure/VARS/globalToasts/globalToasts";
import { SendAppealCancelMoveToReadyMeetingResponse } from "../../../../../pages/Committee/HandleProcessing/AccusationAppeal/AccusationAppealDetail/@types/@typesAccusationAppealDetail";
import ConfirmationModalWithContent from "../../../../Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import SessionAllocationModal from "../AppealAccusationUtils/AllocationModal";
import { RejectSessionModalContent } from "../AppealAccusationUtils/RejectSessionModalContent";
import "./_accusationsAppealListTable.scss";

const AccusationsAppealListTable = ({
  accusationType,
}: {
  accusationType: "1,2,3,4,5,6,7,8,9" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
}) => {
  const [isRejectModalOpen, setIsRejectModalOpen] = useState({ isOpen: false, id: -1 });
  const [isAllocationModalOpen, setIsAllocationModalOpen] = useState<{
    isOpen: boolean;
    id: number;
  }>({ isOpen: false, id: -1 });
  const [currentPageMode] = useState<"normal" | "filter">("normal");
  const [dataSource, setDataSource] = useState<AccusationAppealList[]>([]);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const url = Object.fromEntries([...searchParams]);

  //? ================================  Api Calls ================================
  const [getAccusationList, { isFetching: isAccusationListLoading }] =
    useLazyGetAccusationAppealListQuery();

  // get the count of table rows
  const [
    getAccusationListCount,
    { data: accusationListCountData, isLoading: isAccusationListCountLoading },
  ] = useLazyGetAccusationAppealListCountQuery();

  // send the reject session modal data
  const [sendRejectSession, { isLoading: isSendRejectSessionLoading }] =
    useSendAppealCancelMoveToReadyMeetingMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getList();
  }, [accusationType, url?.page, url?.pageSize]);

  //* ================================ Util Functions ================================
  const onGetAccusationListSuccess = async (
    accusationList: GetAccusationAppealListResponse
  ) => {
    if (accusationList?.status === 200) {
      setDataSource(accusationList?.data);
    }
  };

  const getList = () => {
    getAccusationList({
      firstResult: url?.page ? Number((+url.page - 1) * +url.pageSize) : 0,
      maxResults: url?.pageSize ? Number(url?.pageSize) : 8,
      type: accusationType,
    })
      .unwrap()
      .then(onGetAccusationListSuccess);
    getAccusationListCount({ type: accusationType });
  };

  const sendRejectSessionOnSuccess = async (
    value: SendAppealCancelMoveToReadyMeetingResponse
  ) => {
    if (value?.status === 200) {
      setIsRejectModalOpen({ isOpen: false, id: -1 });
      toast.success(GENERAL_REJECTION_SUCCESS, { toastId: GENERAL_REJECTION_SUCCESS });
      getList();
    }
  };

  const rejectSessionHandler = () => {
    if (isRejectModalOpen?.id > 1) {
      sendRejectSession({
        form: "AppealCancelMoveToReadyMeeting",
        id: "65384266af3d4670b43187b78eb4bef2",
        _data_: {
          appealMeeting: null,
          id: isRejectModalOpen?.id,
          statusAppealsCommittee: "5",
        },
      })
        .unwrap()
        .then(sendRejectSessionOnSuccess);
    }
  };

  const advanceFilterHandler = () => {};

  const checkClickHandler = (id: number) => {
    navigate({
      pathname: COMMITTEE_APPEAL_ACCUSATION_AND_VIOLATIONS_DETAIL_PAGE_ROUTE,
      search: makeSearchParams({ id: id }),
    });
  };

  // allocationMeeting btn
  const allocationMeetingHandler = (id: number) => {
    setIsAllocationModalOpen({ isOpen: true, id: id });
  };
  const isAllocationModalOpenHandler = () => {
    setIsAllocationModalOpen({ isOpen: false, id: -1 });
  };

  // reject modal
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
          content={<RejectSessionModalContent />}
          showIcon={false}
        />
      )}

      {isAllocationModalOpen?.isOpen && (
        <SessionAllocationModal
          setIsModalOpen={isAllocationModalOpenHandler}
          isModalOpen={isAllocationModalOpen}
          accusationType={accusationType}
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
          columns={AccusationAppealTableModel({
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
export default AccusationsAppealListTable;
