import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomTagWithDiffDays from "@components/Renderers/CustomTagWithDiffDays/CustomTagWithDiffDays";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { makeSearchParams, dataPlaceHolder } from "@infra/helpers/utils";
import { DORM_USERS_REQUESTS_DETAIL_CONFIRMED_PAGE_ROUTE } from "@infra/router/routes/dorm";
import { DormUsersListRequestsType } from "@pages/Dorm/Requests/UsersRequests/UsersRequestsList/@types/@usersRequestsList";
import {
  amountPaid,
  gender,
  paymentModel,
  requestNumber,
  requestType,
  reservationType,
  schedulingType,
  TableModelId,
  userGroups,
} from "@pages/Dorm/Requests/UsersRequests/UsersRequestsList/utils/usersRequestsTableModels";

import { UsersRequestsListConfirmedTableModelTypes } from "./@types/@usersRequestsListConfirmedTableModel";

const UsersRequestsListConfirmedTableModel = ({
  openConfirmedModalHandler,
}: UsersRequestsListConfirmedTableModelTypes) => {
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
        pageName: "confirmedPage",
        pageSizeName: "confirmedPageSize",
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
        pageName: "confirmedPage",
        pageSizeName: "confirmedPageSize",
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
        pageName: "confirmedPage",
        pageSizeName: "confirmedPageSize",
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
        pageName: "confirmedPage",
        pageSizeName: "confirmedPageSize",
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
        pageName: "confirmedPage",
        pageSizeName: "confirmedPageSize",
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
        pageName: "confirmedPage",
        pageSizeName: "confirmedPageSize",
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
        pageName: "confirmedPage",
        pageSizeName: "confirmedPageSize",
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
    amountPaid,
    paymentModel,
    {
      title: "تاریخ پرداخت",
      dataIndex: "paymentDate",
      key: "paymentDate",
      width: 200,
      ...GetServerColumnSearchProps({
        dataIndex: "paymentDate",
        label: "تاریخ پرداخت",
        type: "sort",
        pageName: "confirmedPage",
        pageSizeName: "confirmedPageSize",
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
              data: records?.paymentTime,
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
        pageName: "confirmedPage",
        pageSizeName: "confirmedPageSize",
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
      width: 175,
      render: (value: number, records: DormUsersListRequestsType) => {
        return (
          <div className="btn-container">
            <Link
              to={{
                pathname: DORM_USERS_REQUESTS_DETAIL_CONFIRMED_PAGE_ROUTE,
                search: makeSearchParams({
                  id: value,
                  dormId: records?.AssociationCategoryDeliverPlan_dormitoryId,
                  reservationTypeId:
                    records?.AssociationCategoryDeliverPlan_reservationTypeId,
                  userNationalCode:
                    records?.AssociationCustomer_AssociationCustomerUser_nationalCode,
                  roomId: records?.AssociationBed_roomId,
                  admissionId: records?.deliverPlanId,
                }),
              }}
              className="text-link"
            >
              مشاهده
            </Link>
            <CustomButton
              type="text"
              className="text-link"
              onClick={() => openConfirmedModalHandler(value)}
            >
              تحویل اتاق
            </CustomButton>
          </div>
        );
      },
    },
  ];
};

export default UsersRequestsListConfirmedTableModel;
