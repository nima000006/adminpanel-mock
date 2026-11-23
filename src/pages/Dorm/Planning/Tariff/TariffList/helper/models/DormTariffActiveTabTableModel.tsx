import { Link } from "react-router";

import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { makeSearchParams, dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { DORM_TARIFFS_DETAIL_ACTIVE_PAGE_ROUTE } from "@infra/router/routes/dorm";

import { GetTariffListData } from "../components/ActiveTab/@types/@activeTab";

const DormTariffActiveTabTableModel = () => {
  return [
    {
      title: "عنوان تعرفه",
      dataIndex: "title",
      key: "title",
      width: 130,
      ...GetServerColumnSearchProps({
        dataIndex: "title",
        label: "عنوان تعرفه",
        type: "text",
        pageName: "activePage",
        pageSizeName: "activePageSize",
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
        pageName: "activePage",
        pageSizeName: "activePageSize",
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
      title: "تاریخ شروع اعمال موثر",
      dataIndex: "appliedStartDate",
      key: "appliedStartDate",
      width: 175,
      ...GetServerColumnSearchProps({
        dataIndex: "appliedStartDate",
        label: "تاریخ شروع اعمال موثر",
        type: "sort",
        pageName: "activePage",
        pageSizeName: "activePageSize",
      }),
      render: (value: string, record: GetTariffListData) => {
        return (
          <>
            {dataPlaceHolder({
              data: record?.appliedStartTime,
              isTime: true,
            })}
            {" , "}
            {dataPlaceHolder({ data: value, isDate: true })}
          </>
        );
      },
    },
    {
      title: "تاریخ پایان اعمال موثر",
      dataIndex: "appliedEndDate",
      key: "appliedEndDate",
      width: 175,
      ...GetServerColumnSearchProps({
        dataIndex: "appliedEndDate",
        label: "تاریخ پایان اعمال موثر",
        type: "sort",
        pageName: "activePage",
        pageSizeName: "activePageSize",
      }),
      render: (value: string, record: GetTariffListData) => {
        return (
          <>
            {dataPlaceHolder({
              data: record?.appliedEndTime,
              isTime: true,
            })}
            {" , "} {dataPlaceHolder({ data: value, isDate: true })}
          </>
        );
      },
    },
    {
      title: "تاریخ ثبت",
      dataIndex: "createDate",
      key: "createDate",
      width: 150,
      ...GetServerColumnSearchProps({
        dataIndex: "createDate",
        label: "تاریخ ثبت",
        type: "sort",
        pageName: "activePage",
        pageSizeName: "activePageSize",
      }),
      render: (value: string, record: GetTariffListData) => {
        return (
          <>
            {dataPlaceHolder({
              data: record?.createTime,
              isTime: true,
            })}
            {" , "} {dataPlaceHolder({ data: value, isDate: true })}
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
      render: (value: number, record: GetTariffListData) => {
        return (
          <Link
            to={{
              pathname: DORM_TARIFFS_DETAIL_ACTIVE_PAGE_ROUTE,
              search: makeSearchParams({ id: value, title: record?.title }),
            }}
            className="text-link"
          >
            مشاهده
          </Link>
        );
      },
    },
  ];
};

export default DormTariffActiveTabTableModel;
