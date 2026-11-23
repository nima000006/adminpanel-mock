import { Link } from "react-router";

import CustomTagWithDiffDays from "@components/Renderers/CustomTagWithDiffDays/CustomTagWithDiffDays";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { makeSearchParams } from "@infra/helpers/utils";
import { DORM_WORK_SPACES_DETAIL_REQUEST_RECEIVED_ADMISSION_PROGRAM_PAGE_ROUTE } from "@infra/router/routes/dorm";
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

import { WorkSpaceDormListType } from "../../../WorkSpacesDormList/helper/@types/@workSpaceDormListType";
import { WorkSpaceTariffListType } from "../../../WorkSpacesTariffList/helper/@types/@workSpaceTariffListType";
import { WorkSpaceAdmissionListType } from "../@types/@workSpacesAdmissionListType";

const WorkSpaceAdmissionTableModel = () => {
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
        pageName: "admissionPage",
        pageSizeName: "admissionPageSize",
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
        pageName: "admissionPage",
        pageSizeName: "admissionPageSize",
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
        pageName: "admissionPage",
        pageSizeName: "admissionPageSize",
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
        pageName: "admissionPage",
        pageSizeName: "admissionPageSize",
      }),
    },
    {
      title: "استان",
      dataIndex:
        "AssociationCategoryBranch_AssociationCategoryRegion_AssociationRegionType_title",
      key: "AssociationCategoryBranch_AssociationCategoryRegion_AssociationRegionType_title",
      width: 150,
    },
    {
      title: "شهر",
      dataIndex: "AssociationCategoryBranch_AssociationCategoryRegion_title",
      key: "AssociationCategoryBranch_AssociationCategoryRegion_title",
      width: 150,
    },
    {
      title: "شعبه / واحد ",
      dataIndex: "AssociationCategoryBranch_title",
      key: "AssociationCategoryBranch_title",
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
        pageName: "admissionPage",
        pageSizeName: "admissionPageSize",
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
        pageName: "admissionPage",
        pageSizeName: "admissionPageSize",
      }),
      render: (value: string, records: WorkSpaceAdmissionListType) => {
        return <>{dateTimeCombiner(value, records?.updateTime)}</>;
      },
    },
    {
      title: "آخرین ویرایش کننده",
      dataIndex: "AssociationUserStaffNew_AssociationCustomerUser_firstName",
      key: "AssociationUserStaffNew_AssociationCustomerUser_firstName",
      width: 130,
      render: (value: string, records: WorkSpaceAdmissionListType) => {
        return (
          <>
            {value} {records?.AssociationUserStaffNew_AssociationCustomerUser_lastName}
          </>
        );
      },
    },
    {
      ...TableModelId,
      render: (value: string, records: WorkSpaceAdmissionListType) => {
        return (
          <Link
            to={{
              pathname:
                DORM_WORK_SPACES_DETAIL_REQUEST_RECEIVED_ADMISSION_PROGRAM_PAGE_ROUTE,
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

export default WorkSpaceAdmissionTableModel;
