import { useEffect, useState } from "react";

import { Form } from "antd";
import { AiOutlineFilter } from "react-icons/ai";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetManagementRoleRequestAdvancedSearchQuery,
  useLazyManagementRoleRequestQuery,
} from "@infra/states/redux/Apis/management/requests/requestApi";
import { hasActiveKey } from "@pages/management/_shared/hasActiveKey";
import { ROLE_REQUEST_REJECTED } from "@pages/management/Requests/RoleRequest/_shared/utils/roleRequestUtil";

import {
  ManagementRoleRequestDataSourceType,
  ManagementRoleRequestResponse,
  ManagementRoleRequestAdvancedSearchResponse,
  ManagementRoleRequestAdvancedSearchRequest,
} from "../../../@types/@allRoleRequestList";
import ManagementRoleAllRequestTableModel from "../../models/ManagementRoleAllRequest/ManagementRoleAllRequestTableModel";
import useManagementRoleRequestAdvanceFilter from "../_shared/hooks/useManagementRoleRequestAdvanceFilter";

import "./_allRoleRequestRejectedListTab.scss";

const TABLE_DEPENDENCIES = [
  "firstName",
  "lastName",
  "username",
  "mobileNumber",
  "branchCodeId",
  "employeeCode",
];

const AllRoleRequestRejectedListTab = () => {
  const { params: url, setSearchParams } = useQueryParams();

  const [dataSource, setDataSource] = useState<
    ManagementRoleRequestDataSourceType[] | []
  >([]);
  const [totalElements, setTotalElements] = useState(0);

  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);

  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });

  const [form] = Form.useForm();

  const { filterItemsList, fetchInitialData } = useManagementRoleRequestAdvanceFilter();

  //? ================================  Api Calls ================================
  const [getList, { data: dataList, isFetching: isGetListDataLoading }] =
    useLazyManagementRoleRequestQuery();

  const [getAdvancedSearch, { isFetching: isGetAdvancedSearchDataLoading }] =
    useLazyGetManagementRoleRequestAdvancedSearchQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    const requestParams = {
      pageNo: url?.page ? Number(url?.page) - 1 : 0,
      pageSize: url?.pageSize ? Number(url?.pageSize) : 8,
    };
    if (url?.status === ROLE_REQUEST_REJECTED.toString()) {
      if (hasActiveKey(url, TABLE_DEPENDENCIES)) {
        // Use advanced search when filters are present
        const searchParams: ManagementRoleRequestAdvancedSearchRequest = {
          pageNo: requestParams.pageNo,
          pageSize: requestParams.pageSize,
          statusId: ROLE_REQUEST_REJECTED,
        };

        if (url?.firstName) searchParams.firstName = url.firstName?.trim();
        if (url?.lastName) searchParams.lastName = url.lastName?.trim();
        if (url?.username) searchParams.nationalCode = url.username?.trim();
        if (url?.mobileNumber) searchParams.mobileNumber = url.mobileNumber?.trim();
        if (url?.branchCodeId) searchParams.branchCode = url.branchCodeId;
        if (url?.employeeCode) searchParams.employeeCode = url.employeeCode?.trim();

        getAdvancedSearch(searchParams)
          .unwrap()
          .then((value: ManagementRoleRequestAdvancedSearchResponse) => {
            const tempData: ManagementRoleRequestDataSourceType[] = value.content.map(
              (item) => {
                const emp = item.employeeResponseDto[0];
                const {
                  id: userId,
                  createdDateTime: userCreatedDateTime,
                  ...userData
                } = emp.userResponseDto;
                return {
                  contentId: item.id,
                  message: item.message,
                  status: item.status,
                  adminStaffId: item.adminStaffId,
                  createdDate: item?.createdDate,
                  modifiedDate: item?.modifiedDate,
                  modifiedByName: item?.modifiedByName,
                  ...userData,
                  id: emp.id,
                  employeeCode: emp.employeeCode,
                  branchId: emp.branchId,
                  branchName: emp.branchName,
                  recordStatus: emp.recordStatus,
                  createdDateTime: emp.createdDateTime,
                  userResponseDto: emp.userResponseDto,
                };
              }
            );
            setDataSource(tempData);
            setTotalElements(value.totalElements);
          })
          .catch((error) => {
            console.error("Advanced search error:", error);
            setDataSource([]);
            setTotalElements(0);
          });
      } else {
        // Use regular list when no filters
        getList({
          statusId: ROLE_REQUEST_REJECTED,
          params: requestParams,
        })
          .unwrap()
          .then((value: ManagementRoleRequestResponse) => {
            const tempData: ManagementRoleRequestDataSourceType[] = value.content.map(
              (item) => {
                const emp = item.employeeResponseDto[0];
                return {
                  contentId: item.id,
                  message: item.message,
                  status: item.status,
                  adminStaffId: item.adminStaffId,
                  createdDate: item?.createdDate,
                  modifiedDate: item?.modifiedDate,
                  modifiedByName: item?.modifiedByName,
                  ...emp,
                  ...emp.userResponseDto,
                };
              }
            );
            setDataSource(tempData);
            setTotalElements(value.totalElements);
          });
      }
    }
  }, [
    url?.page,
    url?.pageSize,
    url?.status,
    ...TABLE_DEPENDENCIES.map((item) => url?.[item]),
  ]);

  useEffect(() => {
    if (advanceModalOpen) {
      fetchInitialData();
    }
  }, [advanceModalOpen]);

  // ================================ Util Functions ================================

  const openAdvanceFilterHandler = () => {
    setAdvanceModalOpen(true);
  };

  const closeAdvanceFilterHandler = () => {
    setAdvanceModalOpen(false);
    form.resetFields();
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <>
      {advanceModalOpen && (
        <AdvanceFilterModal
          isModalOpen={advanceModalOpen}
          closeModalHandler={closeAdvanceFilterHandler}
          filterItemsList={filterItemsList}
          form={form}
          badgeCounter={(amount) => setBadgeCount(amount.toString())}
          defaultParams={{ ...url }}
        />
      )}
      <div className="management-requests-all-role-rejected-list-tab">
        <CustomDivider text="لیست درخواست‌های نقش" />
        <div className="table-container">
          <ToolBox
            rightSide={
              <CustomBadge count={badgeCount}>
                <CustomButton
                  onClick={openAdvanceFilterHandler}
                  icon={<AiOutlineFilter />}
                >
                  فیلتر پیشرفته
                </CustomButton>
              </CustomBadge>
            }
            leftSide={
              <CustomButton ghost disabled>
                خروجی
              </CustomButton>
            }
          />
          <CustomTable<ManagementRoleRequestDataSourceType>
            dataSource={dataSource}
            rowKey="contentId"
            columns={ManagementRoleAllRequestTableModel({
              type: ROLE_REQUEST_REJECTED,
            })}
            pagination={manualPaginationConfig({
              total: TABLE_DEPENDENCIES.some((key) => url?.[key])
                ? totalElements
                : dataList?.totalElements || 0,
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
            className="rejected-list-table-container"
            key={`table-${url?.pageSize || "8"} `}
            {...TABLE_PROPS(
              TABLE_DEPENDENCIES.some((key) => url?.[key])
                ? totalElements
                : dataList?.totalElements || 0
            )}
            loading={isGetListDataLoading || isGetAdvancedSearchDataLoading}
          />
        </div>
      </div>
    </>
  );
};

export default AllRoleRequestRejectedListTab;
