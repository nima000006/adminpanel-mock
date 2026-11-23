import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import CustomTagWithDiffDays from "@components/Renderers/CustomTagWithDiffDays/CustomTagWithDiffDays";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";

// {
//   "id": 1,
//   "semesterEndDate": "2025-01-19T12:14:24",
//   "saorgCode": null,

// }

export const waiting = {
  title: "انتظار",
  dataIndex: "requestDate",
  key: "requestDate",
  width: 100,
  render: (value: string) => {
    return (
      <div className="table-column-center-content">
        <CustomTagWithDiffDays value={value} />
      </div>
    );
  },
};
export const requestNumber = {
  title: "شماره درخواست",
  dataIndex: "id",
  key: "id",
  width: 150,
  render: (value: number) => {
    return <div className="table-column-center-content">{value}</div>;
  },
};
export const type = {
  title: "نوع",
  dataIndex: "id", // todo[Atefeh]: now just have pending type
  key: "id",
  width: 250,
  render: () => {
    return <CustomTag>در انتظار بررسی</CustomTag>;
  },
};
export const requestField = {
  title: "رشته درخواستی",
  dataIndex: "requestField",
  key: "requestField",
  width: 250,
};
export const requestDegree = {
  title: "مقطع درخواستی",
  dataIndex: "requestDegree",
  key: "requestDegree",
  width: 250,
  render: (value: string) => {
    return <CustomTag>{value}</CustomTag>;
  },
};
export const requestUnit = {
  title: "واحد درخواستی",
  dataIndex: "requestUnit",
  key: "requestUnit",
  width: 250,
};
export const requestSemester = {
  title: "ترم تحصیلی درخواستی",
  dataIndex: "requestSemester",
  key: "requestSemester",
  width: 250,
};
export const requestDate = {
  title: "تاریخ ارسال درخواست",
  dataIndex: "requestDate",
  key: "requestDate",
  width: 150,
  render: (value: string) => {
    return (
      <div className="table-column-center-content">
        {dataPlaceHolder({
          data: value,
          isDate: true,
          customDateFormat: "HH:mm , YYYY/MM/DD",
        })}
      </div>
    );
  },
};
export const requestEditDate = {
  title: "تاریخ اصلاح درخواست",
  dataIndex: "lastModifiedDate",
  key: "lastModifiedDate",
  width: 250,
  render: (value: string) => {
    return (
      <div className="table-column-center-content">
        {dataPlaceHolder({
          data: value,
          isDate: true,
          customDateFormat: "HH:mm , YYYY/MM/DD",
        })}
      </div>
    );
  },
};
export const lastModifiedDate = {
  title: "تاریخ آخرین ویرایش",
  dataIndex: "lastModifiedDate",
  key: "lastModifiedDate",
  width: 250,
  render: (value: string) => {
    return (
      <>
        {dataPlaceHolder({
          data: value,
          isDate: true,
          customDateFormat: "HH:mm , YYYY/MM/DD",
        })}
      </>
    );
  },
};
export const enFirstName = {
  title: "نام متقاضی (انگلیسی)",
  dataIndex: "enFirstName",
  key: "enFirstName",
  width: 175,
};
export const enLastName = {
  title: "نام خانوادگی (انگلیسی)",
  dataIndex: "enLastName",
  key: "enLastName",
  width: 175,
};
export const genderType = {
  title: "جنسیت",
  dataIndex: "genderType",
  key: "genderType",
  width: 100,
  render: (value: number) => {
    return (
      <CustomTag color={value === 1 ? "blue" : "magenta"}>
        {value === 1 ? "آقا" : "بانو"}
      </CustomTag>
    );
  },
};
export const birthDate = {
  title: "تاریخ تولد",
  dataIndex: "birthDate",
  key: "birthDate",
  width: 150,
  render: (value: string) => {
    return (
      <div className="table-column-center-content">
        {dataPlaceHolder({
          data: value,
          isDate: true,
        })}
      </div>
    );
  },
};
export const nationality = {
  title: "ملیت",
  dataIndex: "nationality",
  key: "nationality",
  width: 150,
};
export const citizenship = {
  title: "تابعیت",
  dataIndex: "citizenship",
  key: "citizenship",
  width: 150,
};
export const resident = {
  title: "اقامت",
  dataIndex: "resident",
  key: "resident",
  width: 150,
};
export const passportNo = {
  title: "شماره پاسپورت",
  dataIndex: "passportNo",
  key: "passportNo",
  width: 200,
  render: (value: number) => {
    return <div className="table-column-center-content">{value}</div>;
  },
};
export const identificationNumber = {
  title: "شناسه هویتی",
  dataIndex: "identificationNumber",
  key: "identificationNumber",
  width: 200,
};
export const lastDegree = {
  title: "مقطع تحصیلی",
  dataIndex: "lastDegree",
  key: "lastDegree",
  width: 200,
  render: (value: string) => {
    return <>{value ? <CustomTag>{value}</CustomTag> : "-"}</>;
  },
};
export const lastField = {
  title: "رشته تحصیلی",
  dataIndex: "lastField",
  key: "lastField",
  width: 250,
};
export const residenceRegion = {
  title: "کشور محل تحصیل",
  dataIndex: "residenceRegion",
  key: "residenceRegion",
  width: 250,
};
export const issuingUnit = {
  title: "موسسه صادر کننده",
  dataIndex: "issuingUnit",
  key: "issuingUnit",
  width: 250,
};
export const diplomaAverage = {
  title: "معدل کتبی دیپلم",
  dataIndex: "diplomaAverage",
  key: "diplomaAverage",
  width: 150,
};
export const overallGPA = {
  title: "معدل کل",
  dataIndex: "overallGPA",
  key: "overallGPA",
  width: 100,
};
export const TableModelId = {
  title: "",
  dataIndex: "id",
  key: "id",
  fixed: "right" as FixedType,
  width: 150,
  className: "tables-sticky-column-left",
};
