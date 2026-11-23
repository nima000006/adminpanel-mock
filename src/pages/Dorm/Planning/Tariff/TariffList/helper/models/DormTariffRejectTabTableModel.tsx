import { Link } from "react-router";

import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { makeSearchParams, dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { DORM_TARIFFS_DETAIL_REJECTED_PAGE_ROUTE } from "@infra/router/routes/dorm";

import { GetTariffListData } from "../components/ActiveTab/@types/@activeTab";

const DormTariffRejectTabTableModel = () => {
  return [
    {
      title: "شماره درخواست",
      dataIndex: "id",
      key: "id",
      width: 150,
    },
    {
      title: "نوع درخواست",
      dataIndex: "AssociationRequestType_title",
      key: "AssociationRequestType_title",
      width: 120,
      render: (_: boolean, record: GetTariffListData) => (
        <CustomTag color={record?.requestTypeId === 3 ? "success" : "error"}>
          {record?.AssociationRequestType_title}
        </CustomTag>
      ),
    },
    {
      title: "عنوان تعرفه",
      dataIndex: "title",
      key: "title",
      width: 130,
      ...GetServerColumnSearchProps({
        dataIndex: "title",
        label: "عنوان تعرفه",
        type: "text",
        pageName: "rejectedPage",
        pageSizeName: "rejectedPageSize",
      }),
    },
    {
      title: "شناسه",
      dataIndex: "id",
      key: "id",
      width: 150,
    },
    {
      title: "اقامتگاه",
      dataIndex: "AssociationDormitory_title",
      key: "AssociationDormitory_title",
      width: 150,
      ...GetServerColumnSearchProps({
        dataIndex: "dormitory",
        label: "اقامتگاه",
        type: "text",
        pageName: "rejectedPage",
        pageSizeName: "rejectedPageSize",
      }),
    },
    {
      title: "استان",
      dataIndex:
        "AssociationBranchid_AssociationCategoryRegion_AssociationRegionType_title",
      key: "AssociationBranchid_AssociationCategoryRegion_AssociationRegionType_title",
      width: 150,
    },
    {
      title: "شهر",
      dataIndex: "AssociationBranchid_AssociationCategoryRegion_title",
      key: "AssociationBranchid_AssociationCategoryRegion_title",
      width: 150,
    },
    {
      title: "شعبه / واحد",
      dataIndex: "AssociationBranchid_title",
      key: "AssociationBranchid_title",
      width: 150,
    },
    {
      title: "تاریخ ثبت درخواست",
      dataIndex: "createDate",
      key: "createDate",
      width: 175,
      ...GetServerColumnSearchProps({
        dataIndex: "createDate",
        label: "تاریخ ثبت درخواست",
        type: "sort",
        pageName: "rejectedPage",
        pageSizeName: "rejectedPageSize",
      }),
      render: (value: string, record: GetTariffListData) => (
        <>
          {dataPlaceHolder({
            data: record?.createTime,
            isTime: true,
            hasSpecialTime: true,
          })}
          {" , "}
          {dataPlaceHolder({ data: value, isDate: true })}
        </>
      ),
    },
    {
      title: "ایجاد کننده",
      dataIndex: "AssociationUserStaffNew_AssociationCustomerUser_firstName",
      key: "AssociationUserStaffNew_AssociationCustomerUser_firstName",
      width: 130,
      render: (value: string, records: GetTariffListData) => {
        return (
          <>
            {value} {records?.AssociationUserStaffNew_AssociationCustomerUser_lastName}
          </>
        );
      },
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      width: 100,
      className: "tables-sticky-column-left",
      render: (value: number, record: GetTariffListData) => (
        <Link
          to={{
            pathname: DORM_TARIFFS_DETAIL_REJECTED_PAGE_ROUTE,
            search: makeSearchParams({
              id: value,
              title: record?.title,
              priceListId: record?.priceListId,
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

export default DormTariffRejectTabTableModel;
