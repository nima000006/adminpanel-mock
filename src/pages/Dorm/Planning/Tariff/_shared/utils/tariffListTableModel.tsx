import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import CustomTagWithDiffDays from "@components/Renderers/CustomTagWithDiffDays/CustomTagWithDiffDays";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";

import { GetTariffListData } from "../../TariffList/helper/components/ActiveTab/@types/@activeTab";

export const tariffTitle = {
  title: "عنوان تعرفه",
  dataIndex: "title",
  key: "title",
  width: 130,
};
export const tariffId = {
  title: "شناسه",
  dataIndex: "id",
  key: "id",
  width: 150,
};
export const tariffDormitory = {
  title: "اقامتگاه",
  dataIndex: "AssociationDormitory_title",
  key: "AssociationDormitory_title",
  width: 150,
};
export const tariffRequestNum = {
  title: "شماره درخواست",
  dataIndex: "id",
  key: "id",
  width: 150,
};
export const tariffRequestType = {
  title: "نوع درخواست",
  dataIndex: "AssociationRequestType_title",
  key: "AssociationRequestType_title",
  width: 120,
  render: (value: boolean, records: GetTariffListData) => {
    return (
      <CustomTag color={records?.requestTypeId === 3 ? "success" : "error"}>
        {value}
      </CustomTag>
    );
  },
};
export const tariffRequestCreateDate = {
  title: "تاریخ ثبت درخواست",
  dataIndex: "createDate",
  key: "createDate",
  width: 150,
  render: (value: string, record: GetTariffListData) => {
    return (
      <>
        {" "}
        {dataPlaceHolder({
          data: record?.createTime,
          isTime: true,
          hasSpecialTime: true,
        })}
        {" , "} {dataPlaceHolder({ data: value, isDate: true })}
      </>
    );
  },
};
export const tariffCreator = {
  title: "ایجاد کننده",
  dataIndex: "lastModifiUser",
  key: "lastModifiUser",
  width: 130,
};
export const tariffAwaiting = {
  title: "انتظار",
  dataIndex: "createDate",
  key: "createDate",
  width: 100,
  render: (value: string) => <CustomTagWithDiffDays value={value} />,
};
export const appliedStartDate = {
  title: "تاریخ شروع اعمال موثر",
  dataIndex: "appliedStartDate",
  key: "appliedStartDate",
  width: 150,
  render: (value: string, record: GetTariffListData) => {
    return (
      <>
        {dataPlaceHolder({
          data: record?.appliedStartTime,
          isTime: true,
        })}
        {" , "}
        {dataPlaceHolder({ data: value, isDate: true })}
      </>
    );
  },
};
export const appliedEndDate = {
  title: "تاریخ پایان اعمال موثر",
  dataIndex: "appliedEndDate",
  key: "appliedEndDate",
  width: 150,
  render: (value: string, record: GetTariffListData) => {
    return (
      <>
        {dataPlaceHolder({
          data: record?.appliedEndTime,
          isTime: true,
        })}
        {" , "} {dataPlaceHolder({ data: value, isDate: true })}
      </>
    );
  },
};
export const tariffCreateDate = {
  title: "تاریخ ثبت",
  dataIndex: "createDate",
  key: "createDate",
  width: 150,
  render: (value: string, record: GetTariffListData) => {
    return (
      <>
        {dataPlaceHolder({
          data: record?.createTime,
          isTime: true,
        })}
        {" , "} {dataPlaceHolder({ data: value, isDate: true })}
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
