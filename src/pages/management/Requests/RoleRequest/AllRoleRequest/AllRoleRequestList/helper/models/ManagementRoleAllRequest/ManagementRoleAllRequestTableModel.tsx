import { Link } from "react-router";

import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import CustomTagWithDiffDays from "@components/Renderers/CustomTagWithDiffDays/CustomTagWithDiffDays";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { makeSearchParams, dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { MANAGEMENT_REQUESTS_ROLE_REQUEST_DETAIL_PAGE_ROUTE } from "@infra/router/routes/management";
import { ROLE_REQUEST_WAITING_REVIEW } from "@pages/management/Requests/RoleRequest/_shared/utils/roleRequestUtil";

import {
  ManagementRoleRequestAdvancedSearchUserResponseDto,
  ManagementRoleRequestDataSourceType,
} from "../../../@types/@allRoleRequestList";

const ManagementRoleAllRequestTableModel = ({
  type,
}: {
  type: number;
}): CustomColumnType<ManagementRoleRequestDataSourceType>[] => {
  return [
    ...(type === ROLE_REQUEST_WAITING_REVIEW
      ? [
          {
            title: "روز شمار",
            dataIndex: "createdDate",
            key: "createdDate",
            width: 130,
            render: (value: string) => {
              return <CustomTagWithDiffDays value={value} />;
            },
          },
        ]
      : []),
    {
      title: "نام ",
      dataIndex: "userResponseDto",
      key: "firstName",
      width: 130,
      ...GetServerColumnSearchProps({
        dataIndex: "firstName",
        label: "نام",
        type: "text",
      }),
      render: (value?: ManagementRoleRequestAdvancedSearchUserResponseDto) =>
        dataPlaceHolder({ data: value?.firstName }),
    },
    {
      title: "نام خانوادگی",
      dataIndex: "userResponseDto",
      key: "lastName",
      width: 130,
      ...GetServerColumnSearchProps({
        dataIndex: "lastName",
        label: "نام خانوادگی",
        type: "text",
      }),
      render: (value?: ManagementRoleRequestAdvancedSearchUserResponseDto) =>
        dataPlaceHolder({ data: value?.lastName }),
    },
    {
      title: "کد ملی",
      dataIndex: "userResponseDto",
      key: "username",
      width: 130,
      ...GetServerColumnSearchProps({
        dataIndex: "username",
        label: "کد ملی",
        type: "text",
      }),
      render: (value?: ManagementRoleRequestAdvancedSearchUserResponseDto) =>
        dataPlaceHolder({ data: value?.username }),
    },
    // {
    //   title: "عنوان سمت",
    //   dataIndex: "employeeTile",
    //   key: "employeeTile",
    //   width: 130,
    //   render: (value?: string) => <CustomTag>{value ?? "-"}</CustomTag>,
    // },
    {
      title: "شماره همراه",
      dataIndex: "userResponseDto",
      key: "mobileNumber",
      width: 130,
      ...GetServerColumnSearchProps({
        dataIndex: "mobileNumber",
        label: "شماره همراه",
        type: "text",
      }),
      render: (value?: ManagementRoleRequestAdvancedSearchUserResponseDto) =>
        dataPlaceHolder({ data: value?.mobileNumber }),
    },
    {
      title: "شماره پرسنلی",
      dataIndex: "employeeCode",
      key: "employeeCode2",
      width: 130,
      ...GetServerColumnSearchProps({
        dataIndex: "employeeCode",
        label: "شماره پرسنلی",
        type: "text",
      }),
      render: (value?: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "واحد سازمانی",
      dataIndex: "branchName",
      key: "branchName",
      width: 130,
      render: (value?: string) => (
        <CustomTag> {dataPlaceHolder({ data: value })}</CustomTag>
      ),
    },
    {
      title: "ثبت درخواست",
      dataIndex: "createdDate",
      key: "createdDate",
      width: 130,
      render: (value?: string) =>
        dataPlaceHolder({
          data: value,
          isDate: true,
          customDateFormat: "HH:mm, YYYY/MM/DD",
        }),
    },
    {
      title: "آخرین اقدام",
      dataIndex: "modifiedDate",
      key: "modifiedDate",
      width: 130,
      render: (value?: string) =>
        dataPlaceHolder({
          data: value,
          isDate: true,
          customDateFormat: "HH:mm, YYYY/MM/DD",
        }),
    },
    {
      title: "آخرین بررسی کننده",
      dataIndex: "modifiedByName",
      key: "modifiedByName",
      width: 175,
      render: (value?: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "",
      dataIndex: "contentId",
      key: "action",
      fixed: "right" as FixedType,
      className: "tables-sticky-column-left",
      width: 75,
      render: (_: unknown, record: ManagementRoleRequestDataSourceType) => (
        <Link
          to={{
            pathname: MANAGEMENT_REQUESTS_ROLE_REQUEST_DETAIL_PAGE_ROUTE,
            search: makeSearchParams({
              status: type,
              id: record?.contentId,
            }),
          }}
          className="text-link"
        >
          مشاهده
        </Link>
      ),
    },
  ];
};

export default ManagementRoleAllRequestTableModel;
