import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { AdmissionListData } from "@pages/Dorm/Planning/Admission/AdmissionList/_shared/@types/@admissionListTab";

export const titleColumn = {
  title: "عنوان برنامه پذیرش",
  dataIndex: "title",
  key: "title",
  width: 170,
};

export const idColumn = {
  title: "شناسه",
  dataIndex: "id",
  key: "id",
  width: 150,
};

export const schedulingTypeColumn = {
  title: "نوع زمان‌بندی",
  dataIndex: "schedulingId",
  key: "schedulingId",
  width: 100,
  render: (value: number) => (
    <div>
      {value === 1 ? (
        <CustomTag color="blue">ترمیک</CustomTag>
      ) : value === 2 ? (
        <CustomTag color="green">ماهانه</CustomTag>
      ) : (
        <CustomTag color="gold">روزانه</CustomTag>
      )}
    </div>
  ),
};

export const reservationTypeColumn = {
  title: "نوع رزرو",
  dataIndex: "reservationTypeId",
  key: "reservationTypeId",
  width: 150,
  render: (value: number) => (
    <div>
      {value === 1 ? (
        <CustomTag color="red">رزرو خوابگاه</CustomTag>
      ) : value === 2 ? (
        <CustomTag color="green">رزرو قطعی اتاق</CustomTag>
      ) : (
        <CustomTag color="orange">رزرو غیر قطعی اتاق</CustomTag>
      )}
    </div>
  ),
};

export const appliedStartDateColumn = {
  title: "تاریخ شروع اعمال موثر",
  dataIndex: "appliedStartDate",
  key: "appliedStartDate",
  width: 150,
  render: (value: string, records: AdmissionListData) => (
    <>
      {dataPlaceHolder({
        data: records?.appliedStartTime,
        isTime: true,
      })}
      {" , "}
      {dataPlaceHolder({ data: value, isDate: true })}
    </>
  ),
};

export const appliedEndDateColumn = {
  title: "تاریخ پایان اعمال موثر",
  dataIndex: "appliedEndDate",
  key: "appliedEndDate",
  width: 150,
  render: (value: string, records: AdmissionListData) => (
    <>
      {dataPlaceHolder({
        data: records?.appliedEndTime,
        isTime: true,
      })}
      {" , "}
      {dataPlaceHolder({ data: value, isDate: true })}
    </>
  ),
};

export const createDateColumn = {
  title: "تاریخ ثبت",
  dataIndex: "createDate",
  key: "createDate",
  width: 150,
  render: (value: string, records: AdmissionListData) => (
    <>
      {dataPlaceHolder({
        data: records?.createTime,
        isTime: true,
      })}
      {" , "}
      {dataPlaceHolder({ data: value, isDate: true })}
    </>
  ),
};
