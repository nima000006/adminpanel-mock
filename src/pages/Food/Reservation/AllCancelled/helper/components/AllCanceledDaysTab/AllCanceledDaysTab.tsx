import { useEffect, useState } from "react";

import { Col } from "antd";

import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useGetAllHolidaysListMutation } from "@infra/states/redux/Apis/food/reservation/foodReservationApi";

import {
  AllCanceledDaysTabProps,
  AllHolidaysListTypes,
  GetAllHolidaysListResponse,
} from "./@types/@allCanceledDaysTab";
import AllCanceledDaysDetailDrawerContent from "./helper/drawers/CanceledDaysDetail/AllCanceledDaysDetailDrawerContent";
import AllCanceledDaysListTableModels from "./helper/models/AllCanceledDaysList/AllCanceledDaysListTableModels";
import "./_allCanceledDaysTab.scss";

const AllCanceledDaysTab = ({
  branchData,
  branchDataLoading,
}: AllCanceledDaysTabProps) => {
  const [dataSource, setDataSource] = useState<AllHolidaysListTypes[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  const [isDrawerOpen, setIsDrawerOpen] = useState({
    isOpen: false,
    id: -1,
    date: "",
  });

  const { params: url, setSearchParams } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getHolidaysListData, { isLoading: isHolidaysListDataLoading }] =
    useGetAllHolidaysListMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getData();
  }, [url?.branchCode, url?.page, url?.pageSize]);

  //* ================================ Util Functions ================================
  const getData = () => {
    if (url?.branchCode) {
      getHolidaysListData({
        branch: url?.branchCode,
        pageNo: url?.page ? Number(url?.page) - 1 : 0,
        pageSize: url?.pageSize ? Number(url?.pageSize) : 8,
      })
        .unwrap()
        .then(getCanceledListDataSuccess);
    }
  };

  const branchChangeHandler = (id: string) => {
    setSearchParams({
      branchCode: id,
    });
  };

  const getCanceledListDataSuccess = async (values: GetAllHolidaysListResponse) => {
    if (values?.status === 200) {
      setDataSource(values?.data?.holidays);
      setTotalCount(values?.data?.totalElements);
    }
  };

  const viewClickHandler = (id: number, date: string) => {
    setIsDrawerOpen({
      id,
      isOpen: true,
      date,
    });
  };

  const closeDrawerHandler = () => {
    setIsDrawerOpen({
      id: -1,
      isOpen: false,
      date: "",
    });
  };

  return (
    <>
      {isDrawerOpen?.isOpen && (
        <CustomDrawer
          open={isDrawerOpen?.isOpen}
          onClose={closeDrawerHandler}
          content={
            <AllCanceledDaysDetailDrawerContent
              isDrawerOpen={isDrawerOpen}
              closeDrawerHandler={closeDrawerHandler}
            />
          }
          className="all-canceled-days-list-drawer"
        />
      )}

      <div className="all-canceled-days-list-container">
        <CustomDivider text="لیست روز‌های لغو شده" />
        <Col lg={8} md={12} sm={12} xs={24}>
          <CustomSelect
            label="واحد دانشگاهی"
            placeholder="انتخاب کنید"
            name="branch"
            options={branchData}
            loading={branchDataLoading}
            onChange={(e) => branchChangeHandler(e as string)}
          />
        </Col>
        <CustomTable<AllHolidaysListTypes>
          dataSource={dataSource}
          columns={AllCanceledDaysListTableModels({ viewClickHandler })}
          pagination={manualPaginationConfig({
            total: totalCount,
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
          {...TABLE_PROPS(dataSource.length)}
          loading={isHolidaysListDataLoading}
          rowKey="id"
          className="all-canceled-days-table-model-container"
        />
      </div>
    </>
  );
};
export default AllCanceledDaysTab;
