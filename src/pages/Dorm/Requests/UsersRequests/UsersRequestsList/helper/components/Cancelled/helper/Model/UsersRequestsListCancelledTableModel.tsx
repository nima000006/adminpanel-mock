import { Link } from "react-router";

import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { makeSearchParams, dataPlaceHolder } from "@infra/helpers/utils";
import { DORM_USERS_REQUESTS_DETAIL_CANCELLED_PAGE_ROUTE } from "@infra/router/routes/dorm";
import { DormUsersListRequestsType } from "@pages/Dorm/Requests/UsersRequests/UsersRequestsList/@types/@usersRequestsList";
import {
  gender,
  requestNumber,
  requestType,
  reservationType,
  schedulingType,
  TableModelId,
  userGroups,
} from "@pages/Dorm/Requests/UsersRequests/UsersRequestsList/utils/usersRequestsTableModels";
import { usersListStatus } from "@pages/Dorm/Requests/UsersRequests/UsersRequestsList/utils/usersRequestsUtils";

const UsersRequestsListCancelledTableModel = () => {
  return [
    requestNumber,
    requestType,
    {
      title: "وضعیت",
      dataIndex: "AssociationCategoryStatus_title",
      key: "AssociationCategoryStatus_title",
      width: 150,
      render: (value: number, records: DormUsersListRequestsType) => {
        return (
          <CustomTag
            color={
              records?.statusId === usersListStatus.cancelledGroup
                ? "red"
                : records?.statusId === usersListStatus.pendingPayment
                  ? "green"
                  : "gold"
            }
          >
            {value}
          </CustomTag>
        );
      },
    },
    {
      title: "نام",
      dataIndex: "AssociationCustomer_AssociationCustomerUser_firstName",
      key: "AssociationCustomer_AssociationCustomerUser_firstName",
      width: 130,
      ...GetServerColumnSearchProps({
        dataIndex: "name",
        label: "نام",
        type: "text",
        pageName: "cancelledPage",
        pageSizeName: "cancelledPageSize",
      }),
      render: (value: number, records: DormUsersListRequestsType) => {
        if (!value) return <>-</>;
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
        label: "نام خانوادگی",
        type: "text",
        pageName: "cancelledPage",
        pageSizeName: "cancelledPageSize",
      }),
      render: (value: number, records: DormUsersListRequestsType) => {
        if (!value) return <>-</>;
        return records.AssociationCustomer_AssociationCustomerUser_lastName;
      },
    },
    gender,
    userGroups,
    {
      title: "عنوان برنامه پذیرش",
      dataIndex: "AssociationCategoryDeliverPlan_title",
      key: "AssociationCategoryDeliverPlan_title",
      width: 130,
      ...GetServerColumnSearchProps({
        dataIndex: "deliverPlanTitle",
        label: "عنوان برنامه پذیرش",
        type: "text",
        pageName: "cancelledPage",
        pageSizeName: "cancelledPageSize",
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
        pageName: "cancelledPage",
        pageSizeName: "cancelledPageSize",
      }),
      render: (value: number, records: DormUsersListRequestsType) => {
        if (!value) return <>-</>;
        return records.AssociationCustomer_AssociationStudent_studentNumber;
      },
    },
    {
      title: "کدملی / اتباع",
      dataIndex: "AssociationCustomer_AssociationCustomerUser_nationalCode",
      key: "AssociationCustomer_AssociationCustomerUser_nationalCode",
      width: 130,
      ...GetServerColumnSearchProps({
        dataIndex: "nationalCode",
        label: "کدملی / اتباع",
        type: "text",
        pageName: "cancelledPage",
        pageSizeName: "cancelledPageSize",
      }),
      render: (value: number, records: DormUsersListRequestsType) => {
        if (!value) return <>-</>;
        return records.AssociationCustomer_AssociationCustomerUser_nationalCode;
      },
    },
    {
      title: "نام اقامتگاه",
      dataIndex: "AssociationCategoryDeliverPlan_dormitoryId_IN",
      key: "AssociationCategoryDeliverPlan_dormitoryId_IN",
      width: 130,
      ...GetServerColumnSearchProps({
        dataIndex: "dormitory",
        label: "نام اقامتگاه",
        type: "text",
        pageName: "cancelledPage",
        pageSizeName: "cancelledPageSize",
      }),
      render: (value: number, records: DormUsersListRequestsType) => {
        if (!value) return <>-</>;
        return records.AssociationCategoryDeliverPlan_AssociationDormitory_title;
      },
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
      dataIndex:
        "AssociationCustomer_AssociationStudent_AssociationCategoryBranchid_title",
      key: "AssociationCustomer_AssociationStudent_AssociationCategoryBranchid_title",
      width: 130,
      render: (value: number, records: DormUsersListRequestsType) => {
        if (!value) return <>-</>;
        return records.AssociationCustomer_AssociationStudent_AssociationCategoryBranchid_title;
      },
    },
    schedulingType,
    reservationType,
    {
      title: "تاریخ آخرین تغییر",
      dataIndex: "updateDate",
      key: "updateDate",
      ...GetServerColumnSearchProps({
        dataIndex: "updateDate",
        label: "تاریخ آخرین تغییر",
        type: "sort",
        pageName: "cancelledPage",
        pageSizeName: "cancelledPageSize",
      }),
      width: 150,
      render: (value: string, records: DormUsersListRequestsType) => {
        return (
          <>
            {dataPlaceHolder({
              data: value,
              isDate: true,
            })}
            ,{" "}
            {dataPlaceHolder({
              data: records?.updateTime,
              isTime: true,
            })}
          </>
        );
      },
    },
    {
      ...TableModelId,
      render: (value: string, records: DormUsersListRequestsType) => {
        return (
          <Link
            to={{
              pathname: DORM_USERS_REQUESTS_DETAIL_CANCELLED_PAGE_ROUTE,
              search: makeSearchParams({
                id: value,
                dormId: records?.AssociationCategoryDeliverPlan_dormitoryId,
                userNationalCode:
                  records?.AssociationCustomer_AssociationCustomerUser_nationalCode,
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

export default UsersRequestsListCancelledTableModel;
