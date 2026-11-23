import { Link } from "react-router";

import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import CustomTagWithDiffDays from "@components/Renderers/CustomTagWithDiffDays/CustomTagWithDiffDays";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { makeSearchParams, dataPlaceHolder } from "@infra/helpers/utils";
import { DORM_USERS_REQUESTS_DETAIL_PENDING_LIST_PAGE_ROUTE } from "@infra/router/routes/dorm";
import { DormUsersListRequestsType } from "@pages/Dorm/Requests/UsersRequests/UsersRequestsList/@types/@usersRequestsList";
import {
  gender,
  requestNumber,
  requestType,
  schedulingType,
  TableModelId,
  userGroups,
} from "@pages/Dorm/Requests/UsersRequests/UsersRequestsList/utils/usersRequestsTableModels";
import { usersListReservationType } from "@pages/Dorm/Requests/UsersRequests/UsersRequestsList/utils/usersRequestsUtils";

const UsersRequestsListPendingListTableModel = () => {
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
        pageName: "listPendingPage",
        pageSizeName: "listPendingPageSize",
      }),
      render: (value: string) => <CustomTagWithDiffDays value={value} />,
    },
    requestNumber,
    requestType,
    {
      title: "نام",
      dataIndex: "AssociationCustomer_AssociationCustomerUser_firstName",
      key: "AssociationCustomer_AssociationCustomerUser_firstName",
      width: 130,
      ...GetServerColumnSearchProps({
        dataIndex: "name",
        label: "نام",
        type: "text",
        pageName: "listPendingPage",
        pageSizeName: "listPendingPageSize",
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
        pageName: "listPendingPage",
        pageSizeName: "listPendingPageSize",
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
        pageName: "listPendingPage",
        pageSizeName: "listPendingPageSize",
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
        pageName: "listPendingPage",
        pageSizeName: "listPendingPageSize",
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
        pageName: "listPendingPage",
        pageSizeName: "listPendingPageSize",
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
        pageName: "listPendingPage",
        pageSizeName: "listPendingPageSize",
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
    {
      title: "نوع رزرو",
      dataIndex:
        "AssociationCategoryDeliverPlan_AssociationCategoryReservationType_title",
      key: "AssociationCategoryDeliverPlan_AssociationCategoryReservationType_title",
      width: 150,
      render: (value: string, records: DormUsersListRequestsType) => {
        if (!value) return <>-</>;
        return (
          <CustomTag
            color={
              records?.AssociationCategoryDeliverPlan_reservationTypeId ===
              usersListReservationType.uncertaintyDormitory
                ? "red"
                : records?.AssociationCategoryDeliverPlan_reservationTypeId ===
                    usersListReservationType.uncertaintyWithBed
                  ? "orange"
                  : "green"
            }
          >
            {value}
          </CustomTag>
        );
      },
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
        pageName: "listPendingPage",
        pageSizeName: "listPendingPageSize",
      }),
      render: (value: string, records: DormUsersListRequestsType) => {
        if (!value) return <>-</>;
        return (
          <>
            {dataPlaceHolder({
              data: value,
              isDate: true,
            })}{" "}
            ,{" "}
            {dataPlaceHolder({
              data: records?.createTime,
              isTime: true,
            })}
          </>
        );
      },
    },
    {
      title: "تاریخ آخرین تغییر",
      dataIndex: "updateDate",
      key: "updateDate",
      ...GetServerColumnSearchProps({
        dataIndex: "updateDate",
        label: "تاریخ آخرین تغییر",
        type: "sort",
        pageName: "listPendingPage",
        pageSizeName: "listPendingPageSize",
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
              pathname: DORM_USERS_REQUESTS_DETAIL_PENDING_LIST_PAGE_ROUTE,
              search: makeSearchParams({
                id: value,
                dormId: records?.AssociationCategoryDeliverPlan_dormitoryId,
                tariffId: records?.AssociationCategoryDeliverPlan_priceListId,
                admissionId: records?.deliverPlanId,
                residenceTitle:
                  records?.AssociationCategoryDeliverPlan_AssociationDormitory_title,
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

export default UsersRequestsListPendingListTableModel;
