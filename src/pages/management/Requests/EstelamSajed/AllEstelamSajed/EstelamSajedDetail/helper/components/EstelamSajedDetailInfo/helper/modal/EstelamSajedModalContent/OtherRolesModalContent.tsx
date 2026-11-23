import { useEffect, useState } from "react";

import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import { ExcelCodes } from "@infra/config/excel-codes";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useAllEmployeeListByAdvanceFilterMutation } from "@infra/states/redux/Apis/management/usersList/usersListApi";
import {
  AllEmployeeListByAdvanceFilterResponse,
  ManagementUserData,
} from "@pages/management/EmployeesList/AllEmployeesList/@types/@managementUsersAllEmployeesListTypes";
import OtherRolesTableModel from "@pages/management/Requests/EstelamSajed/AllEstelamSajed/EstelamSajedDetail/helper/components/EstelamSajedDetailInfo/helper/modal/EstelamSajedModalContent/helper/model/OtherRolesTableModel";

const OtherRolesModalContent = ({
  nationalCode,
}: {
  nationalCode: string | undefined;
}) => {
  const { params, setSearchParams } = useQueryParams();
  const [dataSource, setDataSource] = useState<AllEmployeeListByAdvanceFilterResponse>();

  const currentPage = params?.page ? Number(params.page) : 1;
  const currentPageSize = params?.pageSize ? Number(params.pageSize) : 8;

  //? ================================  Api Calls ================================
  const [getData, { isLoading: isDataLoading }] =
    useAllEmployeeListByAdvanceFilterMutation();

  //? ================================ Effects  ================================
  useEffect(() => {
    getListHandler();
  }, [currentPage, currentPageSize]);

  //* ================================ Util Functions ================================

  const getListHandler = () => {
    getData({
      nationalCode: nationalCode,
      pageNumber: currentPage - 1,
      pageSize: currentPageSize,
    })
      .unwrap()
      .then((res) => setDataSource(res));
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      {dataSource?.content?.length === 0 ? (
        <CustomEmpty description="سمتی برای کاربر مورد نظر یافت نشد." />
      ) : (
        <CustomTable<ManagementUserData>
          className="mt-4"
          dataSource={dataSource?.content}
          columns={OtherRolesTableModel()}
          loading={isDataLoading}
          rowKey="id"
          draggableColumns
          draggableId={ExcelCodes.MANAGEMENT_REQUESTS_OTHER_ROLES_TABLE}
          pagination={manualPaginationConfig({
            total: dataSource?.totalElements,
            onChange: (page, pageSize) => {
              setSearchParams({
                ...params,
                page: page?.toString(),
                pageSize: pageSize?.toString(),
              });
            },
            pageNumber: params?.page ? Number(params?.page) : 1,
            defaultPageSize: params?.pageSize ? Number(params?.pageSize) : 8,
          })}
        />
      )}
    </div>
  );
};
export default OtherRolesModalContent;
