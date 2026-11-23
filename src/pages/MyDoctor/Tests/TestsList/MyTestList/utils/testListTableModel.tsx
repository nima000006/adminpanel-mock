import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";

export const firstName = {
  title: "نام",
  dataIndex: "firstName",
  key: "firstName",
  width: 150,
};
export const lastName = {
  title: "نام خانوادگی ",
  dataIndex: "lastName",
  key: "lastName",
  width: 175,
};
export const username = {
  title: "کدملی",
  dataIndex: "username",
  key: "username",
  width: 150,
};
export const studentNumber = {
  title: "شماره دانشجویی",
  dataIndex: "studentNumber",
  key: "studentNumber",
  width: 150,
};
export const totalScore = {
  title: "نمره کل",
  dataIndex: "totalScore",
  key: "totalScore",
  width: 100,
};
export const fieldName = {
  title: "رشته",
  dataIndex: "fieldName",
  key: "fieldName",
  width: 175,
  render: (value: string) => {
    return <CustomTag>{value ? value : "-"}</CustomTag>;
  },
};
export const branchName = {
  title: "واحد",
  dataIndex: "branchName",
  key: "branchName",
  width: 175,
  render: (value: string) => {
    return <CustomTag>{value ? value : "-"}</CustomTag>;
  },
};
export const timerTime = {
  title: "مدت پر کردن پرسشنامه",
  dataIndex: "timerTime",
  key: "timerTime",
  width: 150,
  render: (value: string) => {
    return (
      <>
        {dataPlaceHolder({
          data: value,
          isTime: true,
          customDateFormat: "HH:mm",
        })}
      </>
    );
  },
};
export const startDate = {
  title: "تاریخ ثبت پرسشنامه",
  dataIndex: "startDate",
  key: "startDate",
  width: 150,
  render: (value: string) => {
    return (
      <>
        {dataPlaceHolder({
          data: value,
          isDate: true,
          customDateFormat: "YYYY/MM/DD",
        })}
      </>
    );
  },
};
// todo[shirin]: این سه تا کلید پایین رو خودم گذاشتم بک اند هنوز کلید صحیح رو به من نداده
export const statusLastAction = {
  title: "وضعیت آخرین اقدام",
  dataIndex: "statusLastAction",
  key: "statusLastAction",
  width: 150,
  render: (value: number) => {
    return (
      <CustomTag
        color={
          value === 1 ? "red" : value === 2 ? "green" : value === 3 ? "gold" : "default"
        }
      >
        {value === 1
          ? "اقدامی صورت نگرفته"
          : value === 2
            ? "تماس گرفته شده"
            : value === 3
              ? "نیازمند مشاوره مجدد"
              : "-"}
      </CustomTag>
    );
  },
};
export const statusLastActionDate = {
  title: "تاریخ آخرین اقدام",
  dataIndex: "statusLastActionDate",
  key: "statusLastActionDate",
  width: 150,
  render: (value: string) => {
    return (
      <>
        {dataPlaceHolder({
          data: value,
          isDate: true,
          customDateFormat: "YYYY/MM/DD",
        })}
      </>
    );
  },
};
export const lastReviewer = {
  title: "آخرین بررسی کننده",
  dataIndex: "lastReviewer",
  key: "lastReviewer",
  width: 150,
};
export const TableModelId = {
  title: "",
  dataIndex: "id",
  key: "id",
  fixed: "right" as FixedType,
  width: 70,
  className: "tables-sticky-column-left",
};
