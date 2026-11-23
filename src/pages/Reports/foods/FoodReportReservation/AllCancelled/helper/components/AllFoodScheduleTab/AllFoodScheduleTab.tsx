import { useEffect, useState } from "react";

import { Col, Form } from "antd";
import { toast } from "react-toastify";

import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTotalTableItems from "@components/Renderers/CustomTotalTableItems/CustomTotalTableItems";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { selectDefaultValueGenerator } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetAllCancelledFoodListQuery } from "@infra/states/redux/Apis/food/reservation/foodReservationApi";

import {
  AllCancelledFoodListDataType,
  AllFoodScheduleTabFormType,
  AllFoodScheduleTabProps,
  GetAllCancelledFoodListResponse,
  SelectType,
} from "./@types/@allFoodScheduleTab";
import AllCanceledFoodScheduleListTableModels from "./helper/models/AllCanceledFoodScheduleList/AllCanceledFoodScheduleListTableModels";
import "./_allFoodScheduleTab.scss";

const AllFoodScheduleTab = ({
  branchData,
  branchDataLoading,
}: AllFoodScheduleTabProps) => {
  const [dataSource, setDataSource] = useState<AllCancelledFoodListDataType[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  const { params: url, setSearchParams } = useQueryParams();

  const [form] = Form.useForm<AllFoodScheduleTabFormType>();

  //? ================================  Api Calls ================================
  const [getCanceledListData, { isFetching: isCanceledListDataLoading }] =
    useLazyGetAllCancelledFoodListQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if ((url?.branchId, url?.branchTitle)) {
      form.setFieldsValue({
        branch: selectDefaultValueGenerator({
          id: +url?.branchId,
          title: url?.branchTitle,
        }),
      });
    }
  }, []);

  useEffect(() => {
    getData();
  }, [url?.branchId, url?.planPage, url?.planPageSize]);

  //* ================================ Util Functions ================================
  const getData = () => {
    if (url?.branchId) {
      getCanceledListData({
        branchCode: url?.branchId,
        pageNo: url?.planPage ? Number(url?.planPage) - 1 : 0,
        pageSize: url?.planPageSize ? Number(url?.planPageSize) : 8,
      })
        .unwrap()
        .then(getCanceledListDataSuccess);
    }
  };

  const branchChangeHandler = (id: string, data: SelectType) => {
    setSearchParams({
      branchId: id,
      branchTitle: data?.label,
    });
  };

  const getCanceledListDataSuccess = async (values: GetAllCancelledFoodListResponse) => {
    if (values?.status === 200) {
      setDataSource(values?.data?.planDtos);
      setTotalCount(values?.data?.totalElements);
    } else {
      return toast.error((values?.data || values?.msg) as any, {
        toastId: (values?.data || values?.msg) as any,
      });
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <div className="all-cancelled-food-schedule-list-container">
      <CustomDivider text="لیست برنامه غذایی‌های لغو شده" />
      <Col lg={8} md={12} sm={12} xs={24}>
        <Form form={form}>
          <CustomSelect
            label="واحد دانشگاهی"
            placeholder="انتخاب کنید"
            name="branch"
            options={branchData}
            form={form}
            loading={branchDataLoading}
            onChange={(e, d) => branchChangeHandler(e as string, d as SelectType)}
          />
        </Form>
      </Col>
      <CustomTable
        dataSource={dataSource}
        columns={AllCanceledFoodScheduleListTableModels}
        pagination={manualPaginationConfig({
          total: totalCount,
          onChange: (page, pageSize) => {
            setSearchParams({
              ...url,
              planPage: page?.toString(),
              planPageSize: pageSize?.toString(),
            });
          },
          pageNumber: url?.planPage ? Number(url?.planPage) : 1,
          defaultPageSize: url?.planPageSize ? Number(url?.planPageSize) : 8,
        })}
        key={`table-${url?.pageSize || "8"} `}
        {...TABLE_PROPS(dataSource.length)}
        loading={isCanceledListDataLoading}
        rowKey="id"
        className="all-cancelled-food-schedule-table-model-container"
      />
      <CustomTotalTableItems
        totalCount={totalCount}
        label="تعداد کل برنامه غذایی‌های لغو شده"
      />
    </div>
  );
};
export default AllFoodScheduleTab;
