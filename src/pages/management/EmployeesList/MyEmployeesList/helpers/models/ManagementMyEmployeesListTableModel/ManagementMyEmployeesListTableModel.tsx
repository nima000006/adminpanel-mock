import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { emptyString } from "@infra/config/global.vars";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { makeSearchParams, dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { MANAGEMENT_MY_DETAIL_PAGE_ROUTE } from "@infra/router/routes/management";

import { ManagementUserData } from "../../../@types/@managementUsersMyEmployeesListTypes";
import "./_managementMyEmployeesListTableModel.scss";

const ManagementMyEmployeesListTableModel =
  (): CustomColumnType<ManagementUserData>[] => [
    {
      title: "نام",
      dataIndex: "firstName",
      key: "firstName",
      width: 88,
      ...GetServerColumnSearchProps({
        dataIndex: "firstName",
        label: "نام",
        type: "text",
      }),
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "نام خانوادگی",
      dataIndex: "lastName",
      key: "lastName",
      width: 140,
      ...GetServerColumnSearchProps({
        dataIndex: "lastName",
        label: "نام خانوادگی",
        type: "text",
      }),
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "عنوان سمت",
      dataIndex: "positionTitle",
      key: "positionTitle",
      width: 216,
      render: (value: string) => {
        return (
          <CustomTag className="management-custom-tag">
            {dataPlaceHolder({ data: value })}
          </CustomTag>
        );
      },
    },
    {
      title: "نوع استعلام",
      dataIndex: "manuallyCreated",
      key: "manuallyCreated",
      width: 144,
      render: (value: boolean) => {
        const type = value === true;
        return (
          <CustomTag className="management-custom-tag" color={type ? "error" : "blue"}>
            {type ? "دستی" : "سیستمی"}
          </CustomTag>
        );
      },
    },
    {
      title: "وضعیت سمت",
      dataIndex: "recordStatus",
      key: "recordStatus",
      width: 144,
      render: (value: number) => {
        const isActive = value === 1;
        return (
          <CustomTag
            className="management-custom-tag"
            color={isActive ? "success" : "error"}
          >
            {isActive ? "فعال" : "غیرفعال"}
          </CustomTag>
        );
      },
    },
    {
      title: "کد ملی",
      dataIndex: "username",
      key: "username",
      width: 171,
      ...GetServerColumnSearchProps({
        dataIndex: "nationalCode",
        label: "کد ملی / فراگیر",
        type: "text",
      }),
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "شماره پرسنلی",
      dataIndex: "employeeCode",
      key: "employeeCode",
      width: 144,
      ...GetServerColumnSearchProps({
        dataIndex: "employeeCode",
        label: "شماره پرسنلی",
        type: "text",
      }),
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "شماره همراه",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
      width: 136,
      ...GetServerColumnSearchProps({
        dataIndex: "mobileNumber",
        label: "شماره همراه",
        type: "text",
      }),
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "واحد سازمانی",
      dataIndex: "branchName",
      key: "branchName",
      width: 145,
      render: (value: string) => {
        return (
          <CustomTag className="management-custom-tag">
            {dataPlaceHolder({ data: value })}
          </CustomTag>
        );
      },
    },
    {
      title: "ایمیل",
      dataIndex: "email",
      key: "email",
      width: 204,
      ...GetServerColumnSearchProps({
        dataIndex: "email",
        label: "ایمیل",
        type: "text",
      }),
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "ایجاد حساب کاربری",
      dataIndex: "createdDateTime",
      key: "createdDateTime",
      width: 176,
      render: (value: string) => {
        return (
          <>
            {dataPlaceHolder({
              data: value,
              isDate: true,
              customDateFormat: "HH:mm,YYYY/MM/DD ",
            })}
          </>
        );
      },
    },
    {
      title: "آخرین ورود",
      dataIndex: "lastLoginAt",
      key: "lastLoginAt",
      width: 138,
      render: () => {
        return <>{emptyString}</>;
      },
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      width: 78,
      className: "tables-sticky-column-left",
      render: (_: unknown, record: ManagementUserData) => (
        <div className="management-my-employee-list-buttons-container">
          <CustomButton className="management-my-employee-custom-button" type="link">
            <Link
              to={{
                pathname: MANAGEMENT_MY_DETAIL_PAGE_ROUTE,
                search: makeSearchParams({
                  id: record?.userResponseDto?.id,
                  from: "myEmployees",
                }),
              }}
            >
              مشاهده
            </Link>
          </CustomButton>
        </div>
      ),
    },
  ];

export default ManagementMyEmployeesListTableModel;
