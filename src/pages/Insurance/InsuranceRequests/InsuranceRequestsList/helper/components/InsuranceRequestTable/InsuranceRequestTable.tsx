import { useEffect, useState } from "react";

import { useNavigate, useSearchParams } from "react-router";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import Div from "@components/Renderers/Div/Div";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { makeSearchParams } from "@infra/helpers/utils";
import InsuranceRequestListTable from "@infra/models/tableModels/InsuranceTableModels/InsuranceRequestList/InsuranceRequestListTable";
import { INSURANCE_REQUESTS_DETAIL_PAGE_ROUTE } from "@infra/router/routes/insurance";
import {
  useGetAllInsuranceRequestsListMutation,
  useGetInsuranceRequestsListWithStatusMutation,
} from "@infra/states/redux/Apis/insuranceService/InsuranceRequests/InsuranceRequests";

import {
  getInsuranceRequestsListWithStatusResponse,
  InsuranceRequestTableProps,
  insuredInsuranceInformationForAdminResponseDtoList,
} from "../../../@types/@InsuranceRequestsList";

import "./_insuranceRequestTable.scss";

const InsuranceRequestTable = ({ type }: InsuranceRequestTableProps) => {
  const [paginationTotalElement, setPaginationTotalElements] = useState(0);
  const [dataSource, setDataSource] = useState<
    insuredInsuranceInformationForAdminResponseDtoList[]
  >([]);

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const url = Object.fromEntries([...searchParams]);

  //? ================================  Api Calls ================================
  const [getInsuranceRequestWithStatus, { isLoading: isInsuranceDataLoading }] =
    useGetInsuranceRequestsListWithStatusMutation();

  const [getAllInsuranceRequest, { isLoading: isGetAllInsuranceLoading }] =
    useGetAllInsuranceRequestsListMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getInsuranceListWithId();
  }, [type, url?.page, url?.pageSize]);

  //* ================================ Util Functions ================================
  const onGetInsuranceRequestWithStatusSuccess = async (
    response: getInsuranceRequestsListWithStatusResponse
  ) => {
    if (response?.status === 200) {
      setPaginationTotalElements(response?.data?.totalElement);
      setDataSource(response?.data?.insuredInsuranceInformationForAdminResponseDtoList);
    }
  };

  const onGetAllInsuranceRequestSuccess = async (
    response: getInsuranceRequestsListWithStatusResponse
  ) => {
    if (response?.status === 200) {
      setPaginationTotalElements(response?.data?.totalElement);
      setDataSource(response?.data?.insuredInsuranceInformationForAdminResponseDtoList);
    }
  };

  const getInsuranceListWithId = () => {
    if (type === 9) {
      getAllInsuranceRequest({
        pageNumber: url?.page ? Number(url?.page) - 1 : 0,
        pageSize: url?.pageSize ? Number(url?.pageSize) : 8,
      })
        .unwrap()
        .then(onGetAllInsuranceRequestSuccess);
    } else {
      // types other that 9 meaning not get all
      getInsuranceRequestWithStatus({
        pageNumber: url?.page ? Number(url?.page) - 1 : 0,
        pageSize: url?.pageSize ? Number(url?.pageSize) : 8,
        insuranceRequestStatus: +type,
      })
        .unwrap()
        .then(onGetInsuranceRequestWithStatusSuccess);
    }
  };

  const onInsuranceRequestDetailClickHandler = (id: string, insuranceStatus: number) => {
    navigate({
      pathname: INSURANCE_REQUESTS_DETAIL_PAGE_ROUTE,
      search: makeSearchParams({ id, insuranceStatus }),
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div className="insurance-request-table-container">
      <div className="table-container">
        <CustomTable
          loading={isInsuranceDataLoading || isGetAllInsuranceLoading}
          dataSource={dataSource}
          columns={InsuranceRequestListTable({
            onInsuranceRequestDetailClickHandler: onInsuranceRequestDetailClickHandler,
            type,
          })}
          pagination={manualPaginationConfig({
            total: paginationTotalElement,
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
      </div>
    </Div>
  );
};

export default InsuranceRequestTable;
