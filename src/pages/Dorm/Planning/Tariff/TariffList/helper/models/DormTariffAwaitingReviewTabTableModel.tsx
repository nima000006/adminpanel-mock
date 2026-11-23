import { Link } from "react-router";

import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import CustomTagWithDiffDays from "@components/Renderers/CustomTagWithDiffDays/CustomTagWithDiffDays";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { makeSearchParams, dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import {
  DORM_TARIFFS_DETAIL_AWAITING_REVIEW_PAGE_ROUTE,
  DORM_TARIFFS_DETAIL_RETURNED_PAGE_ROUTE,
} from "@infra/router/routes/dorm";

import { GetTariffListData } from "../components/ActiveTab/@types/@activeTab";

const DormTariffAwaitingReviewTabTableModel = ({
  returnTableModel,
  status,
}: {
  returnTableModel: true;
  status: "AWAIT" | "RETURN";
}) => {
  const STATUS_PAGE_MAP: Record<"AWAIT" | "RETURN", { page: string; pageSize: string }> =
    {
      AWAIT: { page: "awaitingPage", pageSize: "awaitingPageSize" },
      RETURN: { page: "returnedPage", pageSize: "returnedPageSize" },
    };
  const { page, pageSize } = STATUS_PAGE_MAP[status];
  return [
    {
      title: "انتظار",
      dataIndex: "createDate",
      key: "createDate",
      width: 100,
      ...GetServerColumnSearchProps({
        dataIndex: "createDate",
        label: "انتظار",
        type: "sort",
        pageName: page,
        pageSizeName: pageSize,
      }),
      render: (value: string) => <CustomTagWithDiffDays value={value} />,
    },
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
      render: (value: boolean, records: GetTariffListData) => {
        return (
          <CustomTag color={records?.requestTypeId === 3 ? "success" : "error"}>
            {value}
          </CustomTag>
        );
      },
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
        pageName: page,
        pageSizeName: pageSize,
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
        pageName: page,
        pageSizeName: pageSize,
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
        pageName: page,
        pageSizeName: pageSize,
      }),
      render: (value: string, record: GetTariffListData) => {
        return (
          <>
            {" "}
            {dataPlaceHolder({
              data: record?.createTime,
              isTime: true,
              hasSpecialTime: true,
            })}
            {" , "} {dataPlaceHolder({ data: value, isDate: true })}
          </>
        );
      },
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
      render: (value: number, record: GetTariffListData) => {
        return (
          <Link
            to={
              returnTableModel
                ? {
                    pathname: DORM_TARIFFS_DETAIL_RETURNED_PAGE_ROUTE,
                    search: makeSearchParams({ id: value, title: record?.title }),
                  }
                : {
                    pathname: DORM_TARIFFS_DETAIL_AWAITING_REVIEW_PAGE_ROUTE,
                    search: makeSearchParams({ id: value, title: record?.title }),
                  }
            }
            className="text-link"
          >
            مشاهده
          </Link>
        );
      },
    },
  ];
};

export default DormTariffAwaitingReviewTabTableModel;
