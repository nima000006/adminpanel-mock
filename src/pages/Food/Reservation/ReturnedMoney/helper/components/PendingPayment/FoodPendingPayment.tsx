import { memo, useEffect, useState } from "react";

import { AiOutlineFilter } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetPendingPaymentAndPersonReturnedMoneyListQuery,
  useLazyGetPendingPaymentDetailQuery,
} from "@infra/states/redux/Apis/food/reservation/foodReservationApi";

import {
  GetPendingPaymentAndReturnedMoneyListResponse,
  PendingPaymentAndReturnedMoneyType,
} from "./@types/@pendingPayment";
import {
  GetPendingPaymentDetailResponse,
  requestDtos,
} from "./helper/drawers/FoodPendingPaymentDetail/@types/@foodPendingPaymentDetail";
import FoodPendingPaymentDetailDrawerContent from "./helper/drawers/FoodPendingPaymentDetail/FoodPendingPaymentDetailDrawerContent";
import FoodPendingPaymentSettlementDrawerContent from "./helper/drawers/FoodPendingPaymentSettlement/FoodPendingPaymentSettlementDrawerContent";
import FoodPendingPaymentListTableModel from "./helper/models/FoodPendingPaymentList/FoodPendingPaymentListTableModel";
import "./_foodPendingPayment.scss";

const statusTab = 2; // backend said

const FoodPendingPayment = ({ isActive }: { isActive: boolean }) => {
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState({
    isOpen: false,
    id: -1,
  });
  const [isSettlementDrawerOpen, setIsSettlementDrawerOpen] = useState({
    isOpen: false,
    id: -1,
    totalAmount: 0,
  });
  const [dataSource, setDataSource] = useState<PendingPaymentAndReturnedMoneyType[]>([]);
  const [dataSourceDetail, setDataSourceDetail] = useState<requestDtos[]>([]);
  const [paymentDate, setPaymentDate] = useState<string>("");
  const [total, setTotal] = useState<number>();
  const [totalPages, setTotalPages] = useState(0);
  const {
    params: { pageNo = 0, pageSize = 8 },
    setSearchParams,
  } = useQueryParams();

  //? ================================  Api Calls ================================
  //get list
  const [
    getPendingPaymentAndReturnedMoney,
    { isFetching: isGetPendingPaymentAndReturnedMoneyLoading },
  ] = useLazyGetPendingPaymentAndPersonReturnedMoneyListQuery();

  //get detail
  const [getPendingPaymentDetail, { isFetching: isGetPendingPaymentDetailLoading }] =
    useLazyGetPendingPaymentDetailQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (isActive) {
      getData();
    }
  }, [isActive, pageNo, pageSize]);

  //* ================================ Util Functions ================================
  const getData = () => {
    getPendingPaymentAndReturnedMoney({
      status: statusTab,
      pageNo: pageNo ? pageNo : "0",
      pageSize: pageSize ? pageSize?.toString() : "8",
    })
      .unwrap()
      .then(getPendingReturnedMoneySuccess);
  };

  const getPendingReturnedMoneySuccess = async (
    values: GetPendingPaymentAndReturnedMoneyListResponse
  ) => {
    if (values?.status === 200) {
      setDataSource(values?.data?.documents);
      setTotalPages(values?.data?.totalElements);
    } else {
      return toast.error((values?.data || values?.msg) as any, {
        toastId: (values?.data || values?.msg) as any,
      });
    }
  };

  const getDetailData = (id: number) => {
    getPendingPaymentDetail({ documentId: id })
      .unwrap()
      .then(PendingPaymentDetailIsSuccess);
  };

  //success
  const PendingPaymentDetailIsSuccess = (values: GetPendingPaymentDetailResponse) => {
    if (values?.status === 200) {
      setDataSourceDetail(values?.data?.requestDtos);
      setPaymentDate(values?.data?.paymentDate);
      setTotal(values?.data?.totalAmount);
    } else {
      return toast.error((values?.data || values?.msg) as any, {
        toastId: (values?.data || values?.msg) as any,
      });
    }
  };

  // drawer handler
  const openDetailDrawerHandler = (id: number) => {
    setIsDetailDrawerOpen({ isOpen: true, id });
    getDetailData(id);
  };

  const closeDetailDrawerHandler = () => {
    setIsDetailDrawerOpen({ isOpen: false, id: -1 });
  };

  const openSettlementDrawerHandler = (id: number, totalAmount: number) => {
    setIsSettlementDrawerOpen({ isOpen: true, id, totalAmount });
    // getPendingPaymentDetail(id).unwrap().then(PendingPaymentDetailIsSuccess);
  };

  const closeSettlementDrawerHandler = () => {
    setIsSettlementDrawerOpen({ isOpen: false, id: -1, totalAmount: 0 });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <>
      {isDetailDrawerOpen.isOpen && (
        <CustomDrawer
          onClose={closeDetailDrawerHandler}
          open={isDetailDrawerOpen.isOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <FoodPendingPaymentDetailDrawerContent
              closeDrawerHandler={closeDetailDrawerHandler}
              loading={isGetPendingPaymentDetailLoading}
              total={total}
              dataSourceDetail={dataSourceDetail}
              id={isDetailDrawerOpen?.id}
              detailData={getDetailData}
              paymentDate={paymentDate}
            />
          }
        />
      )}
      {isSettlementDrawerOpen.isOpen && (
        <CustomDrawer
          onClose={closeSettlementDrawerHandler}
          open={isSettlementDrawerOpen.isOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <FoodPendingPaymentSettlementDrawerContent
              closeDrawerHandler={closeSettlementDrawerHandler}
              total={isSettlementDrawerOpen?.totalAmount}
              id={isSettlementDrawerOpen?.id}
            />
          }
        />
      )}
      <div className="food-pending-payment-tab-container">
        <div>
          <CustomButton type="primary" icon={<AiOutlineFilter />} disabled>
            فیلتر پیشرفته
          </CustomButton>
        </div>

        <CustomTable<PendingPaymentAndReturnedMoneyType>
          dataSource={dataSource}
          columns={FoodPendingPaymentListTableModel({
            viewClickHandler: openDetailDrawerHandler,
            settlementHandler: openSettlementDrawerHandler,
          })}
          pagination={manualPaginationConfig({
            total: totalPages,
            onChange: (page, pageSize) => {
              setSearchParams({
                pageNo: (page - 1)?.toString(),
                pageSize: pageSize?.toString(),
              });
            },
            pageNumber: +pageNo === 0 ? 1 : Number(pageNo) + 1,
            defaultPageSize: +pageSize,
          })}
          loading={isGetPendingPaymentAndReturnedMoneyLoading}
          {...TABLE_PROPS(dataSource?.length)}
          rowKey="id"
          className="food-pending-payment-table-model-container"
        />
      </div>
    </>
  );
};

export default memo(FoodPendingPayment);
