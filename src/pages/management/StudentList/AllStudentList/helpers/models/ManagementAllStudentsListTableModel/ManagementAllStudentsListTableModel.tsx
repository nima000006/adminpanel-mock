import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { makeSearchParams, dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { MANAGEMENT_ALL_DETAIL_PAGE_ROUTE } from "@infra/router/routes/management";

import { ManagementUserWithStudentInfo } from "../../../@types/@managementAllStudentsListTypes";

const ManagementAllStudentsListTableModel =
  (): CustomColumnType<ManagementUserWithStudentInfo>[] => [
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
      title: "شماره دانشجویی",
      dataIndex: "studentNumber",
      key: "studentNumber",
      width: 144,
      ...GetServerColumnSearchProps({
        dataIndex: "studentNumber",
        label: "شماره دانشجویی",
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
      title: "نوع استعلام",
      dataIndex: "manuallyCreated",
      key: "manuallyCreated",
      width: 144,
      render: (value: boolean) => {
        const isActive = value === true;
        return (
          <CustomTag
            className="management-custom-tag"
            color={isActive ? "error" : "blue"}
          >
            {isActive ? "دستی" : "سیستمی"}
          </CustomTag>
        );
      },
    },
    {
      title: "مقطع تحصیلی",
      dataIndex: "degreeId",
      key: "degreeName",
      width: 150,
      render: (_: number, record: { degreeId: number; degreeName: string }) => {
        let color: "processing" | "geekblue" | "volcano" | "purple" | "default" =
          "default";

        switch (record.degreeId) {
          case 1:
            color = "processing";
            break;
          case 2:
            color = "geekblue";
            break;
          case 3:
            color = "processing";
            break;
          case 4:
          case 5:
            color = "volcano";
            break;
          case 6:
            color = "purple";
            break;
          default:
            color = "default";
        }

        return (
          <CustomTag className="management-custom-tag" color={color}>
            {dataPlaceHolder({ data: record.degreeName })}
          </CustomTag>
        );
      },
    },
    {
      title: "رشته تحصیلی",
      dataIndex: "studyFieldName",
      key: "studyFieldName",
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
      title: "واحد دانشگاهی",
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
      title: "نام دانشکده",
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
      dataIndex: "createdDate",
      key: "createdDate",
      width: 176,
      render: (value: string) => {
        return (
          <>
            {dataPlaceHolder({
              data: value,
              isDate: true,
              customDateFormat: "HH:mm, YYYY/MM/DD ",
            })}
          </>
        );
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
      render: (_: unknown, record: ManagementUserWithStudentInfo) => (
        <div className="management-student-list-buttons-container">
          <CustomButton className="management-student-custom-button" type="link">
            <Link
              to={{
                pathname: MANAGEMENT_ALL_DETAIL_PAGE_ROUTE,
                search: makeSearchParams({
                  id: record?.userResponseDto?.id,
                  from: "allStudents",
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

export default ManagementAllStudentsListTableModel;
