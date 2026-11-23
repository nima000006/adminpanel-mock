import { useEffect, useRef, useState } from "react";

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
  useLazyManagementMyRoleRequestQuery,
  useLazyGetMyManagementRoleRequestAdvancedSearchQuery,
} from "@infra/states/redux/Apis/management/requests/requestApi";
import { ROLE_REQUEST_CONFIRMED } from "@pages/management/Requests/RoleRequest/_shared/utils/roleRequestUtil";

import {
  MyManagementRoleRequestDataSourceType,
  MyManagementRoleRequestResponse,
  MyManagementRoleRequestAdvancedSearchRequest,
  MyManagementRoleRequestAdvancedSearchResponse,
} from "../../../@types/@myRoleRequestList";
import ManagementRoleMyRequestTableModel from "../../models/ManagementRoleMyRequest/ManagementRoleMyRequestTableModel";
import useManagementRoleRequestAdvanceFilter from "../_shared/hooks/useManagementRoleRequestAdvanceFilter";
import "./_myRoleRequestConfirmedListTab.scss";

const TABLE_DEPENDENCIES = [
  "firstName",
  "lastName",
  "username",
  "mobileNumber",
  "employeeCode",
];

const MyRoleRequestConfirmedListTab = () => {
  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);
  const { params: url, setSearchParams } = useQueryParams();
  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState<
    MyManagementRoleRequestDataSourceType[] | []
  >([]);
  const [totalElements, setTotalElements] = useState(0);
  const isFirstMountRef = useRef(true);

  const { filterItemsList, fetchInitialData } = useManagementRoleRequestAdvanceFilter();

  //? ================================  Api Calls ================================
  const [getList, { data: dataList, isFetching: isGetListDataLoading }] =
    useLazyManagementMyRoleRequestQuery();

  const [getAdvancedSearch, { isFetching: isGetAdvancedSearchDataLoading }] =
    useLazyGetMyManagementRoleRequestAdvancedSearchQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    const requestParams = {
      pageNo: url?.page ? Number(url?.page) - 1 : 0,
      pageSize: url?.pageSize ? Number(url?.pageSize) : 8,
    };

    // Check if any filter from TABLE_DEPENDENCIES is present
    const hasFilters = TABLE_DEPENDENCIES.some((key) => url?.[key]);

    // On first mount, if filters exist, wait a bit for parent to reset them
    if (isFirstMountRef.current && hasFilters) {
      isFirstMountRef.current = false;

      // Wait for parent to reset filters, then make request without filters
      const timeoutId = setTimeout(() => {
        // Check if filters were reset
        const stillHasFilters = TABLE_DEPENDENCIES.some((key) => url?.[key]);
        if (!stillHasFilters) {
          // Filters were reset, use regular list
          getList({
            statusId: ROLE_REQUEST_CONFIRMED,
            params: requestParams,
          })
            .unwrap()
            .then((value: MyManagementRoleRequestResponse) => {
              const tempData: MyManagementRoleRequestDataSourceType[] = value.content.map(
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
      }, 250);

      return () => clearTimeout(timeoutId);
    }

    isFirstMountRef.current = false;

    if (hasFilters) {
      // Use advanced search when filters are present
      const searchParams: MyManagementRoleRequestAdvancedSearchRequest = {
        pageNo: requestParams.pageNo,
        pageSize: requestParams.pageSize,
        statusId: ROLE_REQUEST_CONFIRMED,
      };

      if (url?.firstName) searchParams.firstName = url.firstName?.trim();
      if (url?.lastName) searchParams.lastName = url.lastName?.trim();
      if (url?.username) searchParams.nationalCode = url.username?.trim();
      if (url?.mobileNumber) searchParams.mobileNumber = url.mobileNumber?.trim();
      if (url?.employeeCode) searchParams.employeeCode = url.employeeCode?.trim();

      getAdvancedSearch(searchParams)
        .unwrap()
        .then((value: MyManagementRoleRequestAdvancedSearchResponse) => {
          const tempData: MyManagementRoleRequestDataSourceType[] = value.content.map(
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
                userStaffId: emp.userStaffId,
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
        statusId: ROLE_REQUEST_CONFIRMED,
        params: requestParams,
      })
        .unwrap()
        .then((value: MyManagementRoleRequestResponse) => {
          const tempData: MyManagementRoleRequestDataSourceType[] = value.content.map(
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
  }, [url?.page, url?.pageSize, ...TABLE_DEPENDENCIES.map((item) => url?.[item])]);

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

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
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
      <div className="management-requests-my-role-confirmed-list-tab">
        <CustomDivider text="لیست درخواست‌های نقش" />
        <div className="table-container">
          <ToolBox
            rightSide={
              <CustomBadge count={badgeCount}>
                <CustomButton
                  onClick={openAdvanceFilterHandler}
                  icon={<AiOutlineFilter />}
                  disabled
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
          <CustomTable<MyManagementRoleRequestDataSourceType>
            dataSource={dataSource}
            rowKey="contentId"
            columns={ManagementRoleMyRequestTableModel({
              type: ROLE_REQUEST_CONFIRMED,
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
            className="confirmed-list-table-container"
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

export default MyRoleRequestConfirmedListTab;
