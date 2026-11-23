import { memo, useEffect, useState } from "react";

import { Col, Row } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";

import {
  CancelRequestsType,
  GetPendingReturnedMoneyListResponse,
} from "../PendingReturnedMoney/@types/@foodPendingReturnedMoney";

import "./_personReturnedMoney.scss";
import { useLazyGetAllBranchesQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import { useLazyGetPendingReturnedMoneyListQuery } from "@infra/states/redux/Apis/food/reservation/foodReservationApi";

import FoodReturnedMoneyDrawerContent from "./helper/drawers/FoodReturnedMoney/FoodReturnedMoneyDrawerContent";
import FoodPersonReturnedMoneyListTableModel from "./helper/models/FoodPersonReturnedMoneyList/FoodPersonReturnedMoneyListTableModel";

const tabStatus = 3; // backend said

const PersonsReturnedMoney = () => {
  const [selectedBranch, setSelectedBranch] = useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState({ id: -1, isOpen: false });
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

  //* ================================ Util Functions ================================
  const getData = () => {
    getPendingReturnedMoney({
      status: tabStatus,
      branchCode: selectedBranch,
      pageNo: pageNo === 0 ? "0" : pageNo,
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

  const viewClickHandler = (id: number) => {
    setIsDrawerOpen({ isOpen: true, id });
  };

  const closeDrawerHandler = () => {
    setIsDrawerOpen({ isOpen: false, id: -1 });
  };

  return (
    <>
      {isDrawerOpen.isOpen && (
        <CustomDrawer
          onClose={closeDrawerHandler}
          open={isDrawerOpen.isOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <FoodReturnedMoneyDrawerContent
              closeDrawerHandler={closeDrawerHandler}
              id={isDrawerOpen?.id}
            />
          }
        />
      )}
      <div className="food-returned-money-tab-container">
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
          <ToolBox
            rightSide={
              <CustomButton type="primary" icon={<AiOutlineFilter />} disabled>
                فیلتر پیشرفته
              </CustomButton>
            }
            leftSide={<CustomButton disabled={true}>خروجی اکسل</CustomButton>}
          />
        </div>
        <CustomTable<CancelRequestsType>
          dataSource={dataSource}
          columns={FoodPersonReturnedMoneyListTableModel({ viewClickHandler })}
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
          {...TABLE_PROPS(dataSource?.length)}
          rowKey="id"
          className="food-return-money-table-model-container"
        />
      </div>
    </>
  );
};

export default memo(PersonsReturnedMoney);
