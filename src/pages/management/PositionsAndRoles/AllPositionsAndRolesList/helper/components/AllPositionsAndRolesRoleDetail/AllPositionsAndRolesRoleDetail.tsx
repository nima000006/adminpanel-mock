import { useEffect, useState } from "react";

import { Checkbox, CheckboxChangeEvent, Dropdown, MenuProps, Row } from "antd";
import { AiOutlineClose, AiOutlineFilter } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import { MANAGEMENT_ALL_POSITIONS_AND_ROLES_ROLES_LIST_PAGE_ROUTE } from "@infra/router/routes/management";
import { useAllManagementListOfUserWithRolesMutation } from "@infra/states/redux/Apis/management/positionsAndRoles/positionsAndRolesApi";
import { serviceOptions } from "@pages/Finance/Accountants/_shared/utils";

import { AllUserWithRoles } from "./@types/@allPositionsAndRolesRoleDetail";
import RemoveUsersFromAllRoleContentDrawer from "./helper/components/RemoveUsersFromAllRoleContentDrawer/RemoveUsersFromAllRoleContentDrawer";
import AllPositionsAndRolesRoleDetailTableModel from "./helper/models/AllPositionsAndRolesRoleDetailTableModel";
import "./_allPositionsAndRolesRoleDetail.scss";

const AllPositionsAndRolesRoleDetail = () => {
  useTitle({
    breadcrumbItems: [
      {
        title: <span className="management-breadcrumb-title">سمت و نقش</span>,
      },
      {
        title: (
          <Link
            className="management-breadcrumb-title"
            to={MANAGEMENT_ALL_POSITIONS_AND_ROLES_ROLES_LIST_PAGE_ROUTE}
          >
            نقش‌ها
          </Link>
        ),
      },
      {
        title: "مشاهده کاربران نقش",
      },
    ],
  });
  const { params, setSearchParams } = useQueryParams();
  const [isRemoveDrawerOpen, setIsRemoveDrawerOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const currentPage = params?.page ? Number(params.page) : 1;
  const currentPageSize = params?.pageSize ? Number(params.pageSize) : 8;
  const exportMenu: MenuProps = {
    items: [
      {
        label: "خروجی Excel",
        key: "excel",
      },
      {
        label: "خروجی PDF",
        key: "pdf",
      },
    ],
  };

  const items: MenuProps["items"] = [
    {
      label: "حذف از لیست انتخاب شده‌ها",
      key: "1",
      onClick: () => setIsRemoveDrawerOpen(true),
      disabled: selectedRowKeys.length === 0,
    },
  ];
  //? ================================ Api ================================
  const [getUsersByRole, { data, isLoading: isGetUsersByRole }] =
    useAllManagementListOfUserWithRolesMutation();

  //? ================================ Effects ================================
  const fetchUsers = () => {
    getUsersByRole({
      pageNo: currentPage - 1,
      pageSize: currentPageSize,
      roleName: params.name,
    });
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, currentPageSize]);

  //* ================================ Util Functions ================================
  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  const dataListRoles: AllUserWithRoles[] = data?.content ?? [];

  const allSelected =
    dataListRoles.length > 0 && selectedRowKeys.length === dataListRoles.length;

  const isIndeterminate =
    selectedRowKeys.length > 0 && selectedRowKeys.length < dataListRoles.length;

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      const allKeys = dataListRoles.map((item) => item.userId).filter(Boolean);
      setSelectedRowKeys(allKeys);
    } else {
      setSelectedRowKeys([]);
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <>
      {/* DELETE DRAWER */}
      <CustomDrawer
        title="حذف از لیست انتخاب شده‌ها"
        content={
          <RemoveUsersFromAllRoleContentDrawer
            onClose={() => setIsRemoveDrawerOpen(false)}
            selectedUsers={dataListRoles.filter((item) =>
              selectedRowKeys.includes(item.userId)
            )}
            fetchUsers={fetchUsers}
          />
        }
        closeIcon={<AiOutlineClose />}
        onClose={() => setIsRemoveDrawerOpen(false)}
        open={isRemoveDrawerOpen}
      />

      <div className="all-management-roles-details-container">
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol label="نام نقش" value={params?.title} />
          <SingleVerticalWithCol
            xs={12}
            label="سرویس"
            value={
              serviceOptions.find((item) => item.value === params?.serviceName)?.title
            }
          />
        </Row>
        <CustomDivider
          text={"لیست کاربران دارای این نقش"}
          extraContent={
            <Checkbox
              indeterminate={isIndeterminate}
              onChange={onCheckAllChange}
              checked={allSelected}
            >
              انتخاب همه
            </Checkbox>
          }
        />
        <ToolBox
          rightSide={
            <CustomButton type="primary" icon={<AiOutlineFilter />} disabled>
              فیلتر پیشرفته
            </CustomButton>
          }
          leftSide={
            <>
              <Dropdown.Button type="default" menu={{ items }}>
                اقدامات
              </Dropdown.Button>
              <Dropdown menu={exportMenu} trigger={["click"]}>
                <CustomButton icon={<IoIosArrowDown />} iconPlacement="end" disabled>
                  خروجی
                </CustomButton>
              </Dropdown>
            </>
          }
        />
        <CustomTable<AllUserWithRoles>
          className="all-management-role-detail-table-container"
          dataSource={dataListRoles}
          columns={AllPositionsAndRolesRoleDetailTableModel()}
          loading={isGetUsersByRole}
          pagination={manualPaginationConfig({
            total: data?.totalElements ?? 0,
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
          key={`table-${params?.pageSize || "8"}`}
          {...TABLE_PROPS(dataListRoles.length)}
          rowKey={(record) => record.userId ?? record.userId ?? ""}
          rowSelection={rowSelection}
        />
      </div>
    </>
  );
};
export default AllPositionsAndRolesRoleDetail;
