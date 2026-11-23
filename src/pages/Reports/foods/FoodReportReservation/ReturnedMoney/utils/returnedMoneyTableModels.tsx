import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";

import { PendingPaymentAndReturnedMoneyType } from "../helper/components/PendingPayment/@types/@pendingPayment";

export const returnedMoneyName = {
  title: "نام",
  dataIndex: "basketFirstName",
  key: "basketFirstName",
  width: 100,
};
export const returnedMoneyFamily = {
  title: "نام خانوادگی",
  dataIndex: "basketLastName",
  key: "basketLastName",
  width: 150,
};
export const returnedMoneyStudentNumber = {
  title: "شماره دانشجویی",
  dataIndex: "basketStudentNumber",
  key: "basketStudentNumber",
  width: 125,
};
export const returnedMoneyNationalCode = {
  title: "کد ملی",
  dataIndex: "basketUserName",
  key: "basketUserName",
  width: 100,
};
export const returnedMoneyShabaNumber = {
  title: "شماره شبا",
  dataIndex: "iban",
  key: "iban",
  width: 100,
};
export const returnedMoneyCartNumber = {
  title: "شماره کارت",
  dataIndex: "cardNumber",
  key: "cardNumber",
  width: 100,
};
export const returnedMoneyBank = {
  title: "بانک",
  dataIndex: "bankName",
  key: "bankName",
  width: 100,
};
export const returnedMoneyAccountOwner = {
  title: "صاحب حساب",
  dataIndex: "bankAccountOwner",
  key: "bankAccountOwner",
  width: 100,
};
export const returnedMoneyScheduleDate = {
  title: "تاریخ برنامه غذایی",
  dataIndex: "basketPlansPlanReserveDate",
  key: "basketPlansPlanReserveDate",
  width: 150,
  render: (value: string) => {
    return <>{dataPlaceHolder({ data: value, isDate: true })}</>;
  },
};
export const returnedMoneyBranch = {
  title: "واحد دانشگاهی",
  dataIndex: "basketPlansPlanProductContractRestaurantOwnerBranchCodeBranchName",
  key: "basketPlansPlanProductContractRestaurantOwnerBranchCodeBranchName",
  width: 125,
};
export const returnedMoneySelf = {
  title: "سلف",
  dataIndex: "basketPlansPlanProductContractRestaurantTitle",
  key: "basketPlansPlanProductContractRestaurantTitle",
  width: 150,
};
export const returnedMoneyFood = {
  title: "غذا",
  dataIndex: "basketPlansPlanProductTitle",
  key: "basketPlansPlanProductTitle",
  width: 150,
};
export const returnedMoneyType = {
  title: "نوع",
  dataIndex: "basketPlansPlanRequestTitle",
  key: "basketPlansPlanRequestTitle",
  width: 100,
  render: (value: string) => {
    return (
      <CustomTag
        color={
          value === "یارانه ای"
            ? "green"
            : value === "اضافی"
              ? "geekblue"
              : value === "روز فروش"
                ? "purple"
                : ""
        }
      >
        {value}
      </CustomTag>
    );
  },
};
export const returnedMoneyMeal = {
  title: "وعده",
  dataIndex: "basketPlansPlanMealName",
  key: "basketPlansPlanMealName",
  width: 100,
  render: (value: string) => {
    return (
      <CustomTag
        color={value === "صبحانه" ? "geekblue" : value === "ناهار" ? "green" : "red"}
      >
        {value}
      </CustomTag>
    );
  },
};
export const returnedMoneyOrderCount = {
  title: "تعداد سفارشات شخص",
  dataIndex: "basketPlansQuantity",
  key: "basketPlansQuantity",
  width: 175,
};
export const returnedMoneyPrice = {
  title: "قیمت (ت)",
  dataIndex: "basketPlansPlanBasePrice",
  key: "basketPlansPlanBasePrice",
  width: 100,
  render: (value: string) => {
    return <>{dataPlaceHolder({ data: value, isPrice: true, isRial: true })}</>;
  },
};
export const returnedMoneyOrderNumber = {
  title: "شماره سفارش",
  dataIndex: "basketPlansId",
  key: "basketPlansId",
  width: 100,
};

export const returnedMoneyPendingPaymentName = {
  title: "نام لیست در انتظار پرداخت",
  dataIndex: "title",
  key: "title",
  width: 175,
};
export const returnedMoneySettlementStatus = {
  title: "وضعیت تسویه",
  dataIndex: "documentStatus",
  key: "documentStatus",
  width: 125,
  render: (value: string) => {
    const isSettled = value === "SETTLED";
    return (
      <CustomTag color={isSettled ? "success" : "warning"}>
        {isSettled ? "تسویه شده" : "در انتظار تسویه"}
      </CustomTag>
    );
  },
};
export const returnedMoneyCreateDate = {
  title: "تاریخ ایجاد",
  dataIndex: "createdDate",
  key: "createdDate",
  width: 100,
  render: (value: string) => {
    return <>{dataPlaceHolder({ data: value, isDate: true })}</>;
  },
};
export const returnedMoneyCreator = {
  title: "ایجاد کننده",
  dataIndex: "createdByFirstName",
  key: "createdByFirstName",
  width: 150,
  render: (value: string, records: PendingPaymentAndReturnedMoneyType) => {
    return (
      <span>{`${value ? value : "-"} ${records?.createdByLastName ? records?.createdByLastName : ""}`}</span>
    );
  },
};
export const returnedMoneyTransactionCount = {
  title: "تعداد تراکنش‌‌ها",
  dataIndex: "requestsCount",
  key: "requestsCount",
  width: 150,
};
export const returnedMoneyReturnedTotalPrice = {
  title: "مجموع مبالغ قابل عودت (ت)",
  dataIndex: "totalAmount",
  key: "totalAmount",
  width: 200,
  render: (value: string) => {
    return <>{dataPlaceHolder({ data: value, isPrice: true, isRial: true })}</>;
  },
};

export const returnedMoneyTrackingNumber = {
  title: "شماره پیگیری تراکنش",
  dataIndex: "basketPlansId",
  key: "basketPlansId",
  width: 150,
};
export const returnedMoneyDeliverStartDate = {
  title: "شروع تحویل",
  dataIndex: "deliverStartDate",
  key: "deliverStartDate",
  width: 150,
  render: (value: string) => {
    return <>{dataPlaceHolder({ data: value, isDate: true })}</>;
  },
};
export const returnedMoneyDeliverEndDate = {
  title: "پایان تحویل",
  dataIndex: "deliverEndDate",
  key: "deliverEndDate",
  width: 150,
  render: (value: string) => {
    return <>{dataPlaceHolder({ data: value, isDate: true })}</>;
  },
};
export const returnedMoneyDate = {
  title: "تاریخ عودت وجه",
  dataIndex: "returnedDate",
  key: "returnedDate",
  width: 150,
  render: (value: string) => {
    return <>{dataPlaceHolder({ data: value, isDate: true })}</>;
  },
};
