import { useEffect, useState } from "react";

import { Col, Row } from "antd";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyAllManagementRolesGroupsListsQuery } from "@infra/states/redux/Apis/management/positionsAndRoles/positionsAndRolesApi";
import { useLazyGetAllManagementSamimServicesQuery } from "@infra/states/redux/Apis/management/requests/requestApi";
import { useLazyManagementUsersAllStaffInfoQuery } from "@infra/states/redux/Apis/management/usersList/usersListApi";

import AllManagementDetailsViewRoleDrawerContentTableModel from "./helper/models/AllManagementDetailsViewRoleDrawerContentTableModel";
import { ManagementAllServiceItem } from "../AllManagementDetailsEditRoleDrawerContent/@types/@managementAllEditRoleOfStaff";
import { RoleType } from "../AllManagementDetailsEditRoleDrawerContent/@types/@managementUsersAllStaffInfo";

const AllManagementDetailsViewRoleDrawerContent = ({
  closeDrawerHandler,
}: {
  closeDrawerHandler: () => void;
}) => {
  const { params } = useQueryParams();
  const [, setSelectedServices] = useState<ManagementAllServiceItem[]>([]);
  const [tableData, setTableData] = useState<RoleType[]>([]);

  //? ================================ Api ================================
  const [getServicesList, { data: servicesData, isFetching: isServicesLoading }] =
    useLazyGetAllManagementSamimServicesQuery();

  const [getGroupsList, { data: groupsData, isFetching: isGroupsLoading }] =
    useLazyAllManagementRolesGroupsListsQuery();

  const [getStaffInfo, { data: staffInfoData, isFetching: isGetSelectedRolesLoading }] =
    useLazyManagementUsersAllStaffInfoQuery();
  //? ================================ Effects ================================
  useEffect(() => {
    getServicesList();
    getGroupsList();
  }, []);

  useEffect(() => {
    if (!params?.staffId) return;
    getStaffInfo({ staffId: +params.staffId });
  }, [params?.staffId]);

  useEffect(() => {
    if (staffInfoData?.roles) {
      setTableData(staffInfoData.roles);
    }
  }, [staffInfoData]);
  // ================================ Utils function ================================
  const serviceDataChangeHandler = (services: ManagementAllServiceItem[]) => {
    setSelectedServices(services);

    if (!services?.length) {
      setTableData(staffInfoData?.roles ?? []);
      return;
    }

    const rolesList = services.map((s) => s.item?.name);

    const filteredData =
      staffInfoData?.roles.filter((role) => rolesList.includes(role?.serviceName)) || [];

    const tempData = filteredData.map((role) => ({
      ...role,
      key: role.name,
      title: role.title ?? role.name,
      description: role.description ?? undefined,
    }));

    setTableData(tempData);
  };
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <CustomDrawerHeader
        title="مشاهده نقش‌ها"
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <CustomButton onClick={closeDrawerHandler}>بستن پنجره</CustomButton>
        }
      />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          md={12}
          value={params?.staffType}
          label="گروه کاربری"
        />
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          md={12}
          value={params?.position}
          label="سمت"
        />

        <Col lg={12} md={12} sm={12} xs={24}>
          <CustomSelect
            name="service"
            mode="multiple"
            label="سرویس ها"
            options={servicesData}
            loading={isServicesLoading}
            onChange={(_, service) => {
              serviceDataChangeHandler(service as ManagementAllServiceItem[]);
            }}
          />
        </Col>
        <Col lg={12} md={12} sm={12} xs={24}>
          <CustomSelect
            name="group"
            mode="multiple"
            label="گروه ها"
            disabled
            options={
              groupsData?.map((item) => ({
                id: item?.groupId,
                ...item,
              })) || []
            }
            loading={isGroupsLoading}
          />
        </Col>
      </Row>
      <CustomTable<RoleType>
        dataSource={tableData}
        columns={AllManagementDetailsViewRoleDrawerContentTableModel()}
        pagination={paginationConfig}
        {...TABLE_PROPS(tableData.length ?? 0)}
        rowKey="name"
        loading={isGetSelectedRolesLoading}
      />
    </div>
  );
};
export default AllManagementDetailsViewRoleDrawerContent;
