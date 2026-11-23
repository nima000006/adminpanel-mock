import { useEffect, useState } from "react";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetPricingStepCountQuery,
  useLazyGetPricingStepQuery,
} from "@infra/states/redux/Apis/dorm/planning/tariff/dormTariffApi";

import DormCreateTariffPricingStepTableModel from "../../../../model/DormCreateTariffPricingStepTableModel";
import DormTariffPricingStepTableModel from "../../../../model/DormTariffPricingStepTableModel";
import {
  GetCreatePricingStepResponse,
  GetPricingStepData,
  GetPricingStepResponse,
  TablePricingViewAndCreateProps,
} from "../@types/@pricingStep";

const TablePricingView = ({
  type,
  form,
  onGetCreatePricingStep,
  loading,
  createDataSource,
  setCreateDataSource,
  lastDormId,
}: TablePricingViewAndCreateProps) => {
  const [dataSource, setDataSource] = useState<GetPricingStepData[]>([]);
  const [pricingMode, setIsPricingMode] = useState(false);
  const { params: url, setSearchParams } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getPricingStep, { isFetching: getPricingStepLoading }] =
    useLazyGetPricingStepQuery();

  const [
    getPricingStepCount,
    { data: getPricingStepCountData, isFetching: getPricingStepCountLoading },
  ] = useLazyGetPricingStepCountQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    // اگر اقامتگاه در استپ اول تغییر نکند قسمت اول اجرا می شود در غیر این صورت ایجاد تعرفه اجرا می شود. دلیل این امر این است که اگر اقامتگاه در استپ اول تغییر کرد در استپ دوم نیز تخت های مربوط به آن به روز گردد.
    if (Number(lastDormId) === Number(url?.dormitoryId)) {
      getPricingStep({
        firstResult: url?.page ? Number((+url.page - 1) * +url.pageSize) : 0,
        maxResults: url?.pageSize ? Number(url?.pageSize) : 8,
        priceListId_EQ: +url?.id,
      })
        .unwrap()
        .then(getPricingStepIsSuccess);
      getPricingStepCount({ priceListId_EQ: +url?.id });
    } else {
      setIsPricingMode(true);
      onGetCreatePricingStep({
        dormId: url?.dormitoryId,
      })
        .unwrap()
        .then(getCreatePricingStepIsSuccess);
    }
  }, [url?.id, url?.pageSize, url?.page]);

  //* ================================ Util Functions ================================
  // view success
  const getPricingStepIsSuccess = (value: GetPricingStepResponse) => {
    if (value?.status === 200) {
      setDataSource(value?.data);
      value?.data?.forEach((item) => {
        form?.setFieldsValue({
          [`price-${item?.id}`]: item?.price,
        });
      });
    }
  };

  //create success
  const getCreatePricingStepIsSuccess = (values: GetCreatePricingStepResponse) => {
    if (values?.status === 200) {
      setCreateDataSource(values?.data);
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  {
    return !pricingMode ? (
      <CustomTable
        dataSource={dataSource}
        rowKey="id"
        loading={
          !pricingMode ? getPricingStepLoading || getPricingStepCountLoading : loading
        }
        columns={DormTariffPricingStepTableModel(type)}
        pagination={manualPaginationConfig({
          total: getPricingStepCountData?.data,
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
      />
    ) : (
      <CustomTable
        dataSource={createDataSource}
        rowKey="id"
        loading={loading}
        columns={DormCreateTariffPricingStepTableModel()}
        pagination={{
          ...paginationConfig,
          defaultPageSize: 200,
          pageSizeOptions: ["200"],
        }}
        {...TABLE_PROPS(dataSource?.length)}
      />
    );
  }
};
export default TablePricingView;
