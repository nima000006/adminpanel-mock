import { memo, useEffect, useState } from "react";

import { AiOutlineFilter } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetPendingPaymentAndPersonReturnedMoneyListQuery } from "@infra/states/redux/Apis/food/reservation/foodReservationApi";

import {
  GetPendingPaymentAndReturnedMoneyListResponse,
  PendingPaymentAndReturnedMoneyType,
} from "../PendingPayment/@types/@pendingPayment";
import FoodDocumentsReturnedMoneyDetail from "./helper/drawer/FoodDocumentsReturnedMoneyDetail/FoodDocumentsReturnedMoneyDetail";
import FoodDocumentsReturnedMoneyListTableModel from "./helper/models/FoodDocumentsReturnedMoneyList/FoodDocumentsReturnedMoneyListTableModel";
import "./_documentsReturnedMoney.scss";

const statusTab = 3; // backend said

const FoodDocumentsReturnedMoney = () => {
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState({
    isOpen: false,
    id: -1,
  });
  const [dataSource, setDataSource] = useState<PendingPaymentAndReturnedMoneyType[]>([]);
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

  //? ================================ Effects ================================
  useEffect(() => {
    getData();
  }, [pageNo, pageSize]);

  //* ================================ Util Functions ================================
  const getData = () => {
    getPendingPaymentAndReturnedMoney({
      status: statusTab,
      pageNo: pageNo === 0 ? "0" : pageNo,
      pageSize: pageSize ? pageSize?.toString() : "8",
    })
      .unwrap()
      .then(getPendingReturnedMoneySuccess);
  };

  // success
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

  // drawer handler
  const openDetailDrawerHandler = (id: number) => {
    setIsDetailDrawerOpen({ isOpen: true, id });
  };
  const closeDetailDrawerHandler = () => {
    setIsDetailDrawerOpen({ isOpen: false, id: -1 });
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
            <FoodDocumentsReturnedMoneyDetail
              id={isDetailDrawerOpen?.id}
              closeDrawer={closeDetailDrawerHandler}
            />
          }
        />
      )}
      <div className="food-documents-return-money-container">
        <div className="food-documents-return-money-btn-wrapper">
          <ToolBox
            rightSide={
              <CustomButton type="primary" icon={<AiOutlineFilter />} disabled>
                فیلتر پیشرفته
              </CustomButton>
            }
            leftSide={
              <CustomButton disabled={true} className="action-btn">
                خروجی اکسل
              </CustomButton>
            }
          />
        </div>

        <CustomTable<PendingPaymentAndReturnedMoneyType>
          dataSource={dataSource}
          columns={FoodDocumentsReturnedMoneyListTableModel({
            viewClickHandler: openDetailDrawerHandler,
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
          className="food-returned-document-table-model-container"
        />
      </div>
    </>
  );
};

export default memo(FoodDocumentsReturnedMoney);
