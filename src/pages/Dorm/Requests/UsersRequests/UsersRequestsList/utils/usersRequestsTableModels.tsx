import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import CustomTagWithDiffDays from "@components/Renderers/CustomTagWithDiffDays/CustomTagWithDiffDays";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { dormGenderStatusColor } from "@pages/Dorm/_shared/utils/DormUtils";

import {
  usersListRequestType,
  usersListReservationType,
  usersListSchedulingType,
  usersListStatus,
  usersListUserGroup,
} from "./usersRequestsUtils";
import { DormUsersListRequestsType } from "../@types/@usersRequestsList";

export const requestNumber = {
  title: "شماره درخواست",
  dataIndex: "id",
  key: "id",
  width: 130,
};

export const requestType = {
  title: "نوع درخواست",
  dataIndex: "AssociationCategoryRequestType_title",
  key: "AssociationCategoryRequestType_title",
  width: 200,
  render: (value: string, records: DormUsersListRequestsType) => {
    if (!value) return <>-</>;
    return (
      <CustomTag
        color={
          records?.AssociationCategoryRequestType_id === usersListRequestType?.reservation
            ? "blue"
            : records?.AssociationCategoryRequestType_id ===
                usersListRequestType?.extension
              ? "green"
              : "gold"
        }
      >
        {value}
      </CustomTag>
    );
  },
};

export const userName = {
  title: "نام",
  dataIndex: "AssociationCustomer_AssociationCustomerUser_firstName",
  key: "AssociationCustomer_AssociationCustomerUser_firstName",
  width: 130,
  render: (value: number, records: DormUsersListRequestsType) => {
    if (!value) return <>-</>;
    return records.AssociationCustomer_AssociationCustomerUser_firstName;
  },
};

export const userFamily = {
  title: "نام خانوادگی",
  dataIndex: "AssociationCustomer_AssociationCustomerUser_lastName",
  key: "AssociationCustomer_AssociationCustomerUser_lastName",
  width: 130,
  render: (value: number, records: DormUsersListRequestsType) => {
    if (!value) return <>-</>;
    return records.AssociationCustomer_AssociationCustomerUser_lastName;
  },
};

export const gender = {
  title: "جنسیت",
  dataIndex: "AssociationCustomer_AssociationCustomerUser_AssociationGender_title",
  key: "AssociationCustomer_AssociationCustomerUser_AssociationGender_title",
  width: 100,
  render: (value: number, records: DormUsersListRequestsType) => {
    if (!value) return <>-</>;
    return (
      <CustomTag
        color={
          dormGenderStatusColor[
            records?.AssociationCustomer_AssociationCustomerUser_genderId
          ]
        }
      >
        {value}
      </CustomTag>
    );
  },
};

export const userGroups = {
  title: "گروه کاربری",
  dataIndex: "AssociationCustomer_AssociationUserGroup_title",
  key: "AssociationCustomer_AssociationUserGroup_title",
  width: 150,
  render: (value: string, records: DormUsersListRequestsType) => {
    if (!value) return <>-</>;
    return (
      <CustomTag
        color={
          records?.AssociationCustomer_userGroupID === usersListUserGroup?.student
            ? "geekblue"
            : records?.AssociationCustomer_userGroupID === usersListUserGroup?.teacher
              ? "cyan"
              : "red"
        }
      >
        {value}
      </CustomTag>
    );
  },
};

export const studentNumber = {
  title: "شماره دانشجویی / شماره پرسنلی",
  dataIndex: "AssociationCustomer_AssociationStudent_studentNumber",
  key: "AssociationCustomer_AssociationStudent_studentNumber",
  width: 200,
  render: (value: number, records: DormUsersListRequestsType) => {
    if (!value) return <>-</>;
    return records.AssociationCustomer_AssociationStudent_studentNumber;
  },
};

export const universityName = {
  title: "شعبه / واحد",
  dataIndex: "AssociationCustomer_AssociationStudent_AssociationCategoryBranchid_title",
  key: "AssociationCustomer_AssociationStudent_AssociationCategoryBranchid_title",
  width: 130,
  render: (value: number, records: DormUsersListRequestsType) => {
    if (!value) return <>-</>;
    return records.AssociationCustomer_AssociationStudent_AssociationCategoryBranchid_title;
  },
};

export const nationalNumber = {
  title: "کدملی / اتباع",
  dataIndex: "AssociationCustomer_AssociationCustomerUser_nationalCode",
  key: "AssociationCustomer_AssociationCustomerUser_nationalCode",
  width: 130,
  render: (value: number, records: DormUsersListRequestsType) => {
    if (!value) return <>-</>;
    return records.AssociationCustomer_AssociationCustomerUser_nationalCode;
  },
};

export const residenceName = {
  title: "نام اقامتگاه",
  dataIndex: "AssociationCategoryDeliverPlan_AssociationDormitory_title",
  key: "AssociationCategoryDeliverPlan_AssociationDormitory_title",
  width: 130,
  render: (value: number, records: DormUsersListRequestsType) => {
    if (!value) return <>-</>;
    return records.AssociationCategoryDeliverPlan_AssociationDormitory_title;
  },
};

export const schedulingType = {
  title: "نوع زمان‌بندی",
  dataIndex: "AssociationCategoryDeliverPlan_AssociationCategorySchedulingType_title",
  key: "AssociationCategoryDeliverPlan_AssociationCategorySchedulingType_title",
  width: 100,
  render: (value: string, records: DormUsersListRequestsType) => {
    if (!value) return <>-</>;
    return (
      <CustomTag
        color={
          records?.AssociationCategoryDeliverPlan_schedulingId ===
          usersListSchedulingType?.termly
            ? "blue"
            : records?.AssociationCategoryDeliverPlan_schedulingId ===
                usersListSchedulingType?.monthly
              ? "green"
              : "gold"
        }
      >
        {value}
      </CustomTag>
    );
  },
};

export const reservationType = {
  title: "نوع رزرو",
  dataIndex: "AssociationCategoryDeliverPlan_AssociationCategoryReservationType_title",
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
};

export const amountPaidUntilNow = {
  title: "مبلغ پرداخت شده تاکنون (تومان)",
  dataIndex: "amountPaid",
  key: "amountPaid",
  width: 250,
  render: (value: string) => {
    if (!value) return <>-</>;
    return (
      <>
        {dataPlaceHolder({
          data: value,
          isPrice: true,
        })}
      </>
    );
  },
};

export const amountPaid = {
  title: "مبلغ پرداخت شده (ریال)",
  dataIndex: "amountPayable",
  key: "amountPayable",
  width: 200,
  render: (value: string) => {
    if (!value) return <>-</>;
    return (
      <>
        {dataPlaceHolder({
          data: value,
          isPrice: true,
        })}
      </>
    );
  },
};

export const paymentModel = {
  title: "شیوه پرداخت",
  dataIndex: "paymentModel",
  key: "paymentModel",
  width: 150,
  render: (value: number, records: DormUsersListRequestsType) => {
    if (!value) return <>-</>;
    return records.paymentModel;
  },
};

export const amountPayable = {
  title: "مبلغ قابل پرداخت (تومان)",
  dataIndex: "amountPayable",
  key: "amountPayable",
  width: 200,
  render: (value: string) => {
    if (!value) return <>-</>;
    return (
      <>
        {dataPlaceHolder({
          data: value,
          isPrice: true,
        })}
      </>
    );
  },
};

export const paymentDate = {
  title: "تاریخ پرداخت",
  dataIndex: "paymentDate",
  key: "paymentDate",
  width: 200,
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
};

export const cancellationDate = {
  title: "تاریخ ثبت درخواست کنسلی",
  dataIndex: "cancellationDate",
  key: "cancellationDate",
  width: 200,
  render: (value: string) => {
    if (!value) return <>-</>;
    return (
      <>
        {dataPlaceHolder({
          data: value,
          isDate: true,
        })}
      </>
    );
  },
};

export const createDate = {
  title: "تاریخ ثبت درخواست",
  dataIndex: "createDate",
  key: "createDate",
  width: 150,
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
};

export const updateDate = {
  title: "تاریخ آخرین تغییر",
  dataIndex: "updateDate",
  key: "updateDate",
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
};

export const deliveryDate = {
  title: "تاریخ تحویل",
  dataIndex: "deliveryDate",
  key: "deliveryDate",
  width: 150,
  render: (value: string) => {
    return (
      <>
        {dataPlaceHolder({
          data: value,
          isDate: true,
        })}
      </>
    );
  },
};

export const status = {
  title: "وضعیت درخواست",
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
};

export const waiting = {
  title: "انتظار",
  dataIndex: "createDate",
  key: "createDate",
  width: 100,
  render: (value: string) => <CustomTagWithDiffDays value={value} />,
};

export const TableModelId = {
  title: "",
  dataIndex: "id",
  key: "id",
  fixed: "right" as FixedType,
  width: 100,
  className: "tables-sticky-column-left",
};
