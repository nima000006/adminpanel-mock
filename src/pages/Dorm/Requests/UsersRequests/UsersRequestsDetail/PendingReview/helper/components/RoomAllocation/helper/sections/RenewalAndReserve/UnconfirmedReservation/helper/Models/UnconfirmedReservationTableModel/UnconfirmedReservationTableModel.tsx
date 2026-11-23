import CustomTagWithDiffDays from "@components/Renderers/CustomTagWithDiffDays/CustomTagWithDiffDays";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dateTimeCombiner } from "@pages/Dorm/_shared/utils/DormUtils";
import { RoomOtherRequestListType } from "@pages/Dorm/Requests/UsersRequests/UsersRequestsDetail/@types/@usersRequestsDetail";

import {
  id,
  requestType,
  gender,
  userGroup,
  nationalCode,
  schedulingType,
  reservationType,
} from "./utils/unconfirmedTableReservationModel";

const UnconfirmedReservationTableModel = () => {
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
      }),
      render: (value: string) => {
        if (!value) return "-";
        return <CustomTagWithDiffDays value={value} />;
      },
    },
    id,
    requestType,
    {
      title: "نام",
      dataIndex: "AssociationCustomer_AssociationCustomerUser_firstName",
      key: "AssociationCustomer_AssociationCustomerUser_firstName",
      width: 130,
      ...GetServerColumnSearchProps({
        dataIndex: "name",
        label: "انتظار",
        type: "text",
      }),
      render: (value: number, records: RoomOtherRequestListType) => {
        if (!value) return "-";
        return records.AssociationCustomer_AssociationCustomerUser_firstName;
      },
    },
    {
      title: "نام خانوادگی",
      dataIndex: "AssociationCustomer_AssociationCustomerUser_lastName",
      key: "AssociationCustomer_AssociationCustomerUser_lastName",
      width: 130,
      ...GetServerColumnSearchProps({
        dataIndex: "lastName",
        label: "انتظار",
        type: "text",
      }),
      render: (value: number, records: RoomOtherRequestListType) => {
        if (!value) return "-";
        return records.AssociationCustomer_AssociationCustomerUser_lastName;
      },
    },
    gender,
    userGroup,
    {
      title: "عنوان برنامه پذیرش",
      dataIndex: "AssociationCategoryDeliverPlan_title",
      key: "AssociationCategoryDeliverPlan_title",
      width: 130,
      ...GetServerColumnSearchProps({
        dataIndex: "deliverPlanTitle",
        label: "عنوان برنامه پذیرش",
        type: "text",
      }),
    },
    {
      title: "شماره دانشجویی / شماره پرسنلی",
      dataIndex: "AssociationCustomer_AssociationStudent_studentNumber",
      key: "AssociationCustomer_AssociationStudent_studentNumber",
      width: 200,
      ...GetServerColumnSearchProps({
        dataIndex: "studentNumber",
        label: "شماره دانشجویی / شماره پرسنلی",
        type: "text",
      }),
      render: (value: number, records: RoomOtherRequestListType) => {
        if (!value) return "-";
        return records.AssociationCustomer_AssociationStudent_studentNumber;
      },
    },
    nationalCode,
    {
      title: "نام اقامتگاه",
      dataIndex: "AssociationCategoryDeliverPlan_dormitoryId_IN",
      key: "AssociationCategoryDeliverPlan_dormitoryId_IN",
      width: 130,
      ...GetServerColumnSearchProps({
        dataIndex: "dormitory",
        label: "نام اقامتگاه",
        type: "text",
      }),
    },
    {
      title: "استان",
      dataIndex:
        "AssociationCategoryDeliverPlan_AssociationCategoryBranch_AssociationCategoryRegion_title",
      key: "AssociationCategoryDeliverPlan_AssociationCategoryBranch_AssociationCategoryRegion_title",
      width: 130,
    },
    {
      title: "شهر",
      dataIndex:
        "AssociationCategoryDeliverPlan_AssociationCategoryBranch_AssociationCategoryRegion_AssociationRegionType_title",
      key: "AssociationCategoryDeliverPlan_AssociationCategoryBranch_AssociationCategoryRegion_AssociationRegionType_title",
      width: 130,
    },
    {
      title: "شعبه / واحد",
      dataIndex: "AssociationCategoryDeliverPlan_AssociationCategoryBranch_title",
      key: "AssociationCategoryDeliverPlan_AssociationCategoryBranch_title",
      width: 130,
    },
    schedulingType,
    reservationType,
    {
      title: "تاریخ ثبت درخواست",
      dataIndex: "createDate",
      key: "createDate",
      width: 150,
      ...GetServerColumnSearchProps({
        dataIndex: "createDate",
        label: "انتظار",
        type: "sort",
      }),
      render: (value: string, records: RoomOtherRequestListType) => {
        if (!value) return "-";
        return <>{dateTimeCombiner(value, records?.createTime)}</>;
      },
    },
    {
      title: "تاریخ آخرین تغییر",
      dataIndex: "updateDate",
      key: "updateDate",
      width: 150,
      ...GetServerColumnSearchProps({
        dataIndex: "updateDate",
        label: "انتظار",
        type: "sort",
      }),
      render: (value: string, records: RoomOtherRequestListType) => {
        if (!value) return "-";
        return <>{dateTimeCombiner(value, records?.updateTime)}</>;
      },
    },
  ];
};

export default UnconfirmedReservationTableModel;
