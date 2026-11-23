import { Link } from "react-router";

import CustomTagWithDiffDays from "@components/Renderers/CustomTagWithDiffDays/CustomTagWithDiffDays";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { makeSearchParams } from "@infra/helpers/utils";
import { DORM_WORK_SPACES_DETAIL_REQUEST_RECEIVED_TARIFF_PAGE_ROUTE } from "@infra/router/routes/dorm";
import { dateTimeCombiner } from "@pages/Dorm/_shared/utils/DormUtils";
import {
  organ,
  position,
  requestNumber,
  requestReasonTariff,
  requestType,
  status,
  TableModelId,
} from "@pages/Dorm/Requests/WorkSpaces/WorkSpacesList/utils/WorkSpaceTableModel";

import { WorkSpaceAdmissionListType } from "../../../WorkSpacesAdmissionList/helper/@types/@workSpacesAdmissionListType";
import { WorkSpaceDormListType } from "../../../WorkSpacesDormList/helper/@types/@workSpaceDormListType";
import { WorkSpaceTariffListType } from "../@types/@workSpaceTariffListType";

const WorkSpaceTariffTableModel = () => {
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
        pageName: "tariffPage",
        pageSizeName: "tariffPageSize",
      }),
      render: (value: string) => {
        if (value == null) return null;
        return <CustomTagWithDiffDays value={value} />;
      },
    },
    status,
    requestType,
    requestNumber,
    requestReasonTariff,
    {
      title: "نام",
      dataIndex: "AssociationUserStaffNew_AssociationCustomerUser_firstName",
      key: "AssociationUserStaffNew_AssociationCustomerUser_firstName",
      width: 130,
      ...GetServerColumnSearchProps({
        dataIndex: "name",
        label: "نام",
        type: "text",
        pageName: "tariffPage",
        pageSizeName: "tariffPageSize",
      }),
    },
    {
      title: "نام خانوادگی",
      dataIndex: "AssociationUserStaffNew_AssociationCustomerUser_lastName",
      key: "AssociationUserStaffNew_AssociationCustomerUser_lastName",
      width: 130,
      ...GetServerColumnSearchProps({
        dataIndex: "lastName",
        label: "نام خانوادگی",
        type: "text",
        pageName: "tariffPage",
        pageSizeName: "tariffPageSize",
      }),
    },
    position,
    organ,
    {
      title: "نام اقامتگاه",
      dataIndex: "AssociationDormitory_title",
      key: "AssociationDormitory_title",
      width: 200,
      ...GetServerColumnSearchProps({
        dataIndex: "dormitory",
        label: "نام اقامتگاه",
        type: "text",
        pageName: "tariffPage",
        pageSizeName: "tariffPageSize",
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
      title: "شعبه / واحد ",
      dataIndex: "AssociationBranchid_title",
      key: "AssociationBranchid_title",
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
        pageName: "tariffPage",
        pageSizeName: "tariffPageSize",
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
        pageName: "tariffPage",
        pageSizeName: "tariffPageSize",
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
    {
      title: "آخرین ویرایش کننده",
      dataIndex: "lastModifiedUserr",
      key: "lastModifiedUserr",
      width: 130,
    },
    {
      ...TableModelId,
      render: (value: string, records: WorkSpaceTariffListType) => {
        return (
          <Link
            to={{
              pathname: DORM_WORK_SPACES_DETAIL_REQUEST_RECEIVED_TARIFF_PAGE_ROUTE,
              search: makeSearchParams({
                id: value,
                type: records?.requestTypeId,
              }),
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
export default WorkSpaceTariffTableModel;
