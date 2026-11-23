import CustomRate from "@components/Renderers/CustomRate/CustomRate";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { dormVisibilityStatusColor } from "@pages/Dorm/_shared/utils/DormUtils";

import { dormRequestStatusColor, RequestTypeMode, StatusModeTag } from "./dormMainList";
import { getDormType } from "../@types/@dormsMainList";

export const requestNum = {
  title: "شماره درخواست",
  dataIndex: "id",
  key: "id",
  width: 120,
};
export const requestType = {
  title: "نوع درخواست",
  dataIndex: "requestTypeId",
  key: "requestTypeId",
  width: 150,
  render: (value: number) => {
    return (
      <CustomTag color={`${value === 1 ? "green" : value === 2 ? "red" : "default"}`}>
        {RequestTypeMode(value)}
      </CustomTag>
    );
  },
};
export const requestStatus = {
  title: "وضعیت درخواست",
  dataIndex: "statusId",
  key: "statusId",
  width: 150,
  render: (value: number, records: getDormType) => {
    return (
      <CustomTag color={dormRequestStatusColor[records?.statusId]}>
        {StatusModeTag(value)}
      </CustomTag>
    );
  },
};
export const residenceName = {
  title: "نام اقامتگاه",
  dataIndex: "title",
  key: "title",
  width: 270,
};
export const residenceType = {
  title: "نوع اقامتگاه",
  dataIndex: "AssociationAccommodationType_title",
  key: "AssociationAccommodationType_title",
  width: 120,
};
export const province = {
  title: "استان",
  dataIndex: "AssociationRegion_AssociationRegionType_title",
  key: "AssociationRegion_AssociationRegionType_title",
  width: 150,
};
export const city = {
  title: "شهر",
  dataIndex: "AssociationRegion_title",
  key: "AssociationRegion_title",
  width: 150,
};
export const capacity = {
  title: "ظرفیت اسمی",
  dataIndex: "nominalCapacity",
  key: "nominalCapacity",
  width: 100,
};
export const reserveCapacity = {
  title: "ظرفیت قابل رزرو",
  dataIndex: "OpenBed",
  key: "OpenBed",
  width: 150,
};
export const unit = {
  title: "شعبه (واحد)",
  dataIndex: "AssociationBranch_title",
  key: "AssociationBranch_title",
  width: 150,
};
export const OccupancyFactor = {
  title: "ضریب اشغال",
  dataIndex: "percentFull",
  key: "percentFull",
  width: 150,
  render: (value: number) => {
    return value != null ? (
      <CustomTag
        color={`${value < 20 ? "#389E0D" : value >= 20 ? "#FA8C16" : "#CF1322"}`}
      >
        {value} %
      </CustomTag>
    ) : (
      <CustomTag>-</CustomTag>
    );
  },
};
export const residenceId = {
  title: "شناسه اقامتگاه",
  dataIndex: "id",
  key: "id",
  width: 150,
};
export const quality = {
  title: "درجه کیفی",
  dataIndex: "qualityId",
  key: "qualityId",
  width: 150,
  render: (value: number) => {
    return <CustomRate disabled allowHalf defaultValue={5} value={6 - value} />;
  },
};
export const gender = {
  title: "جنسیت خوابگاه",
  dataIndex: "genderId",
  key: "genderId",
  width: 150,
  render: (value: number, records: getDormType) => {
    return (
      <CustomTag color={`${value === 1 ? "blue" : "magenta"}`}>
        {records?.AssociationGender_title}
      </CustomTag>
    );
  },
};
export const presentStatus = {
  title: "وضعیت نمایش",
  dataIndex: "AssociationRecordStatus_title",
  key: "AssociationRecordStatus_title",
  width: 150,
  render: (value: number, records: getDormType) => {
    return (
      <CustomTag color={dormVisibilityStatusColor[records?.recordStatus]}>
        {value}
      </CustomTag>
    );
  },
};
export const lastEditDate = {
  title: "تاریخ آخرین ویرایش",
  dataIndex: "updateDate",
  key: "updateDate",
  width: 150,
  render: (value: string, records: getDormType) => {
    return (
      <>
        {dataPlaceHolder({
          data: records?.updateTime,
          isTime: true,
        })}{" "}
        ,
        {dataPlaceHolder({
          data: value,
          isDate: true,
        })}
      </>
    );
  },
};
export const editor = {
  title: "ویرایش کننده",
  dataIndex: "AssociationEditUserStaffNew_AssociationCustomerUser_firstName",
  key: "AssociationEditUserStaffNew_AssociationCustomerUser_firstName",
  width: 150,
  render: (value: string, records: getDormType) => {
    return (
      <>
        {value} {records?.AssociationEditUserStaffNew_AssociationCustomerUser_lastName}
      </>
    );
  },
};
export const createDate = {
  title: "تاریخ ایجاد",
  dataIndex: "createDate",
  key: "createDate",
  width: 150,
  render: (value: string, records: getDormType) => {
    return (
      <>
        {dataPlaceHolder({
          data: records?.createTime,
          isTime: true,
        })}{" "}
        ,
        {dataPlaceHolder({
          data: value,
          isDate: true,
        })}
      </>
    );
  },
};
export const creator = {
  title: "ایجاد کننده",
  dataIndex: "AssociationUserStaffNew_AssociationCustomerUser_firstName",
  key: "AssociationUserStaffNew_AssociationCustomerUser_firstName",
  width: 150,
  render: (value: string, records: getDormType) => {
    return (
      <>
        {value} , {records.AssociationUserStaffNew_AssociationCustomerUser_lastName}
      </>
    );
  },
};
export const TableModelId = {
  title: "",
  dataIndex: "id",
  key: "id",
  fixed: "right" as FixedType,
  width: 100,
  className: "tables-sticky-column-left",
};
