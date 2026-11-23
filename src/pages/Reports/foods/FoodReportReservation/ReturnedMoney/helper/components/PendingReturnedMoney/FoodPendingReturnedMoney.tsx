import { memo, useEffect, useState } from "react";

import { Col, Row } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetAllBranchesQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import { useLazyGetPendingReturnedMoneyListQuery } from "@infra/states/redux/Apis/food/reservation/foodReservationApi";

import {
  CancelRequestsType,
  GetPendingReturnedMoneyListResponse,
} from "./@types/@foodPendingReturnedMoney";
import FoodPendingReturnedMoneyListTableModel from "./helper/models/FoodPendingReturnedMoneyList/FoodPendingReturnedMoneyListTableModel";
import "./_foodPendingReturnedMoney.scss";

const tabStatus = 1; // backend said

const FoodPendingReturnedMoney = () => {
  const [selectedBranch, setSelectedBranch] = useState<number | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRequests, setSelectedRequests] = useState<CancelRequestsType[]>([]);
  const [dataSource, setDataSource] = useState<CancelRequestsType[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const {
    params: { pageNo = 0, pageSize = 8 },
    setSearchParams,
  } = useQueryParams();

  //? ================================  Api Calls ================================
  // get all branch
  const [getAllUniversity, { data: universityData, isLoading: isUniversityDataLoading }] =
    useLazyGetAllBranchesQuery();

  //get list
  const [getPendingReturnedMoney, { isFetching: isGetPendingReturnedMoneyLoading }] =
    useLazyGetPendingReturnedMoneyListQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getAllUniversity();
  }, []);

  useEffect(() => {
    if (selectedBranch !== null) {
      getData();
    }
  }, [selectedBranch, pageNo, pageSize]);

  useEffect(() => {
    setSelectedRowKeys(selectedRequests?.map((item) => item.id));
  }, [selectedRequests]);

  //* ================================ Util Functions ================================
  const getData = () => {
    if (!selectedBranch) return;
    getPendingReturnedMoney({
      status: tabStatus,
      branchCode: selectedBranch,
      pageNo: pageNo ? pageNo : "0",

      pageSize: pageSize ? pageSize?.toString() : "8",
    })
      .unwrap()
      .then(getPendingReturnedMoneySuccess);
  };

  // success
  const getPendingReturnedMoneySuccess = async (
    values: GetPendingReturnedMoneyListResponse
  ) => {
    if (values?.status === 200) {
      setDataSource(values?.data?.cancelRequests);
      setTotalPages(values?.data?.totalElements);
    } else {
      return toast.error((values?.data || values?.msg) as any, {
        toastId: (values?.data || values?.msg) as any,
      });
    }
  };

  const setSelectedBranchHandler = (e: number) => {
    setSelectedBranch(e);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[], selectedRows: CancelRequestsType[]) => {
      setSelectedRowKeys(selectedRowKeys);
      setSelectedRequests(selectedRows);
    },
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <div className="food-pending-returned-money-tab-container">
      <Row>
        <Col span={8}>
          <CustomSelect
            name="unit"
            label="واحد دانشگاهی"
            options={universityData ? universityData : []}
            placeholder="انتخاب کنید"
            isLoading={isUniversityDataLoading}
            onChange={(e) => setSelectedBranchHandler(e as number)}
          />
        </Col>
      </Row>
      <div className="btn-container">
        <CustomButton type="primary" icon={<AiOutlineFilter />} className="action-btn">
          فیلتر پیشرفته
        </CustomButton>
        <div className="left-btns-container">
          <CustomButton disabled={true} className="action-btn">
            خروجی اکسل
          </CustomButton>
        </div>
      </div>
      <CustomTable
        dataSource={dataSource}
        columns={FoodPendingReturnedMoneyListTableModel()}
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
        loading={isGetPendingReturnedMoneyLoading}
        key={`table-${pageSize || "8"}`}
        {...TABLE_PROPS(dataSource?.length)}
        rowSelection={{
          type: "checkbox",
          getCheckboxProps: () => ({
            disabled: selectedBranch === null, // Disable all rows if selectedBranch is null
          }),
          ...rowSelection,
        }}
        rowKey="id"
        className="food-pending-return-money-table-model-container"
      />
    </div>
  );
};

export default memo(FoodPendingReturnedMoney);
