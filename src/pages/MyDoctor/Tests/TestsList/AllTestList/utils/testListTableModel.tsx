import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import CustomTagWithDiffDays from "@components/Renderers/CustomTagWithDiffDays/CustomTagWithDiffDays";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";

import {
  SUICIDE_STATUS_COLOR,
  SUICIDE_STATUS_TITLE,
  SURVEY_STATUS_COLOR,
} from "./testConstant";
import { MyDoctorActionTestList } from "../helper/components/AllTestActionStatusListTab/@types/@allTestActionStatusListTab";

export const dayCount = {
  title: "روز شمار",
  dataIndex: "lastFollowUpDate",
  key: "lastFollowUpDate",
  width: 100,
  render: (value: string) => <CustomTagWithDiffDays value={value} />,
};

export const firstName = {
  title: "نام",
  dataIndex: "firstName",
  key: "firstName",
  width: 150,
};
export const actionStatus = {
  title: "وضعیت اقدام",
  dataIndex: "followUpStatusTitle",
  key: "followUpStatusTitle",
  width: 150,
  //Todo[Atefeh]: as i don't have data i could not test it
  render: (value: number, record: MyDoctorActionTestList) => {
    return (
      <CustomTag
        color={
          record?.followUpStatusId === 1
            ? "red"
            : record?.followUpStatusId === 2
              ? "green"
              : record?.followUpStatusId === 3
                ? "gold"
                : "default"
        }
      >
        {value ?? "-"}
        {/* {value === 1
          ? "اقدامی صورت نگرفته"
          : value === 2
            ? "تماس گرفته شده"
            : value === 3
              ? "نیازمند مشاوره مجدد"
              : "-"} */}
      </CustomTag>
    );
  },
};
export const lastName = {
  title: "نام خانوادگی ",
  dataIndex: "lastName",
  key: "lastName",
  width: 175,
};
export const statusType = {
  title: "وضعیت",
  dataIndex: "surveyStatusTitle",
  key: "surveyStatusTitle",
  width: 100,
  render: (value: number, records: MyDoctorActionTestList) => {
    return (
      <CustomTag color={SURVEY_STATUS_COLOR[records?.surveyStatusId]}>{value}</CustomTag>
    );
  },
};

export const suicideStatus = {
  title: "وضعیت خودکشی ",
  dataIndex: "suicideStatus",
  key: "suicideStatus",
  width: 150,
  render: (value: number) => {
    return (
      <CustomTag color={SUICIDE_STATUS_COLOR[value]}>
        {SUICIDE_STATUS_TITLE[value]}
      </CustomTag>
    );
  },
};
export const username = {
  title: "کدملی",
  dataIndex: "username",
  key: "username",
  width: 150,
};

export const studentMobileNumber = {
  title: "شماره موبایل",
  dataIndex: "mobileNumber",
  key: "mobileNumber",
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
  dataIndex: "score",
  key: "score",
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
export const timerTimeMinute = {
  title: "مدت پر کردن  پرسشنامه(دقیقه)",
  dataIndex: "minutesResponseTime",
  key: "minutesResponseTime",
  width: 200,
};
export const timerTimeSecond = {
  title: "مدت پر کردن  پرسشنامه(ثانیه)",
  dataIndex: "secondsResponseTime",
  key: "secondsResponseTime",
  width: 200,
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
  dataIndex: "followUpStatusTitle",
  key: "followUpStatusTitle",
  width: 150,
  render: (value: number, record: MyDoctorActionTestList) => {
    return (
      <CustomTag
        color={
          record?.followUpStatusId === 1
            ? "red"
            : record?.followUpStatusId === 2
              ? "green"
              : record?.followUpStatusId === 3
                ? "gold"
                : "default"
        }
      >
        {value ?? "-"}
        {/* {value === 1
          ? "اقدامی صورت نگرفته"
          : value === 2
            ? "تماس گرفته شده"
            : value === 3
              ? "نیازمند مشاوره مجدد"
              : "-"} */}
      </CustomTag>
    );
  },
};
export const statusLastActionDate = {
  title: "تاریخ آخرین اقدام",
  dataIndex: "lastFollowUpDate",
  key: "lastFollowUpDate",
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
  render: (_: unknown, records: MyDoctorActionTestList) => {
    return records?.modifiedByFirstName && records?.modifiedByLastName
      ? `${records?.modifiedByFirstName} ${records?.modifiedByLastName}`
      : "-";
  },
};
export const TableModelId = {
  title: "",
  dataIndex: "id",
  key: "id",
  fixed: "right" as FixedType,
  width: 70,
  className: "tables-sticky-column-left",
};
