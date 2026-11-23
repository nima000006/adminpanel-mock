import { Link } from "react-router";

import CustomTagWithDiffDays from "@components/Renderers/CustomTagWithDiffDays/CustomTagWithDiffDays";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { makeSearchParams } from "@infra/helpers/utils";
import { DORM_WORK_SPACES_DETAIL_REQUEST_RECEIVED_DORMITORY_PAGE_ROUTE } from "@infra/router/routes/dorm";
import { dateTimeCombiner } from "@pages/Dorm/_shared/utils/DormUtils";
import {
  organ,
  position,
  requestNumber,
  requestReason,
  requestType,
  status,
  TableModelId,
  lastEdit,
} from "@pages/Dorm/Requests/WorkSpaces/WorkSpacesList/utils/WorkSpaceTableModel";

import { WorkSpaceAdmissionListType } from "../../../WorkSpacesAdmissionList/helper/@types/@workSpacesAdmissionListType";
import { WorkSpaceTariffListType } from "../../../WorkSpacesTariffList/helper/@types/@workSpaceTariffListType";
import { WorkSpaceDormListType } from "../@types/@workSpaceDormListType";

const WorkSpaceDormTableModel = (url: Record<string, string>) => [
  {
    title: "انتظار",
    dataIndex: "createDate",
    key: "createDate",
    width: 100,
    ...GetServerColumnSearchProps({
      dataIndex: "createDate",
      label: "تاریخ ثبت درخواست",
      type: "sort",
      pageName: "dormPage",
      pageSizeName: "dormPageSize",
    }),
    render: (value: string) => {
      if (value == null) return null;
      return <CustomTagWithDiffDays value={value} />;
    },
  },
  status,
  requestType,
  requestNumber,
  requestReason,
  {
    title: "نام",
    dataIndex: "AssociationUser_AssociationCustomerUser_firstName",
    key: "AssociationUser_AssociationCustomerUser_firstName",
    width: 130,
    ...GetServerColumnSearchProps({
      dataIndex: "name",
      label: "نام",
      type: "text",
      pageName: "dormPage",
      pageSizeName: "dormPageSize",
    }),
  },
  {
    title: "نام خانوادگی",
    dataIndex: "AssociationUser_AssociationCustomerUser_lastName",
    key: "AssociationUser_AssociationCustomerUser_lastName",
    width: 130,
    ...GetServerColumnSearchProps({
      dataIndex: "lastName",
      label: "نام خانوادگی",
      type: "text",
      pageName: "dormPage",
      pageSizeName: "dormPageSize",
    }),
  },
  position,
  organ,
  {
    title: "نام اقامتگاه",
    dataIndex: "title",
    key: "title",
    width: 200,
    ...GetServerColumnSearchProps({
      dataIndex: "dormitory",
      label: "نام اقامتگاه",
      type: "text",
      pageName: "dormPage",
      pageSizeName: "dormPageSize",
    }),
  },
  {
    title: "استان",
    dataIndex: "AssociationBranch_AssociationCategoryRegion_AssociationRegionType_title",
    key: "AssociationBranch_AssociationCategoryRegion_AssociationRegionType_title",
    width: 150,
  },
  {
    title: "شهر",
    dataIndex: "AssociationBranch_AssociationCategoryRegion_title",
    key: "AssociationBranch_AssociationCategoryRegion_title",
    width: 150,
  },
  {
    title: "شعبه / واحد ",
    dataIndex: "AssociationBranch_title",
    key: "AssociationBranch_title",
    width: 130,
  },
  {
    title: "تاریخ ثبت درخواست",
    dataIndex: "createDate",
    key: "createDate",
    width: 150,
    ...GetServerColumnSearchProps({
      dataIndex: "createDate",
      label: "تاریخ ثبت درخواست",
      type: "sort",
      pageName: "dormPage",
      pageSizeName: "dormPageSize",
    }),
    render: (
      value: string,
      records:
        | WorkSpaceDormListType
        | WorkSpaceTariffListType
        | WorkSpaceAdmissionListType
    ) => {
      return <>{dateTimeCombiner(value, records?.createTime)}</>;
    },
  },
  {
    title: "تاریخ آخرین ویرایش",
    dataIndex: "updateDate",
    key: "updateDate",
    width: 150,
    ...GetServerColumnSearchProps({
      dataIndex: "updateDate",
      label: "تاریخ آخرین ویرایش",
      type: "sort",
      pageName: "dormPage",
      pageSizeName: "dormPageSize",
    }),
    render: (
      value: string,
      records:
        | WorkSpaceDormListType
        | WorkSpaceTariffListType
        | WorkSpaceAdmissionListType
    ) => {
      return <>{dateTimeCombiner(value, records?.updateTime)}</>;
    },
  },
  lastEdit,
  {
    ...TableModelId,
    render: (value: string, records: WorkSpaceDormListType) => {
      return (
        <Link
          to={{
            pathname: DORM_WORK_SPACES_DETAIL_REQUEST_RECEIVED_DORMITORY_PAGE_ROUTE,
            search: makeSearchParams({ ...url, id: value, type: records?.requestTypeId }),
          }}
          className="text-link"
        >
          مشاهده
        </Link>
      );
    },
  },
];

export default WorkSpaceDormTableModel;
