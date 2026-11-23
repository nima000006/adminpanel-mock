import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { makeSearchParams, dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { MANAGEMENT_ALL_DETAIL_PAGE_ROUTE } from "@infra/router/routes/management";
import { UserListByAdvanceFilterContentType } from "@pages/management/_shared/@types/@advanceFilterEmployeesTypes";
import "./_managementAllCustomersListTableModel.scss";

const ManagementAllCustomersListTableModel =
  (): CustomColumnType<UserListByAdvanceFilterContentType>[] => [
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
      title: "کد ملی / فراگیر",
      dataIndex: "username",
      key: "username",
      width: 171,
      ...GetServerColumnSearchProps({
        dataIndex: "username",
        label: "کد ملی / فراگیر",
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
      title: "ملیت",
      dataIndex: "regionId",
      key: "regionId",
      width: 100,
      render: (value: number) => {
        return (
          <CustomTag className="management-custom-tag">
            {value === 103 ? "ایرانی" : "غیر ایرانی"}
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
        return dataPlaceHolder({
          data: value,
          isDate: true,
          customDateFormat: "HH:mm, YYYY/MM/DD ",
        });
      },
    },
    // Todo[Atefeh]: uncomment when not needed in the future
    // {
    //   title: "آخرین ورود",
    //   dataIndex: "lastLoginAt",
    //   key: "lastLoginAt",
    //   width: 138,
    //   render: renderDefault,
    // },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      width: 78,
      className: "tables-sticky-column-left",
      render: (value: string) => (
        <div className="management-all-customer-list-buttons-container">
          <CustomButton type="link">
            <Link
              to={{
                pathname: MANAGEMENT_ALL_DETAIL_PAGE_ROUTE,
                search: makeSearchParams({
                  id: value,
                  from: "allCustomers",
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

export default ManagementAllCustomersListTableModel;
