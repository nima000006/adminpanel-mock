import { Key } from "react";

import CustomRate from "@components/Renderers/CustomRate/CustomRate";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { VendorAllType } from "@pages/Food/Vendors/AllVendors/AllVendorList/@types/@allVendorList";

export const NationalLegalNumber = {
  title: "شماره ملی حقوقی",
  dataIndex: "nationalNom",
  key: "nationalNom",
  width: 150,
};
export const EconomicCode = {
  title: "کد اقتصادی",
  dataIndex: "economicNom",
  key: "economicNom",
  width: 150,
};
export const InterfaceName = {
  title: "نام رابط",
  dataIndex: "managerFirstName",
  key: "managerFirstName",
  width: 150,
};
export const InterfaceLastName = {
  title: "نام خانوادگی رابط",
  dataIndex: "managerLastName",
  key: "managerLastName",
  width: 150,
};
export const PhoneNumber = {
  title: "شماره تلفن",
  dataIndex: "phone1",
  key: "phone1",
  width: 150,
};
export const Score = {
  title: "امتیاز",
  dataIndex: "score",
  key: "score",
  width: 150,
  render: (value: number) => {
    return <CustomRate allowHalf disabled defaultValue={value} />;
  },
};
export const Status = {
  title: "وضعیت",
  dataIndex: "active",
  key: "active",
  width: 120,
  render: (value: boolean) => {
    return (
      <CustomTag color={value ? "success" : "error"}>
        {value ? "فعال" : "غیر فعال"}
      </CustomTag>
    );
  },
  filters: [
    {
      text: "فعال",
      value: true,
    },
    {
      text: "غیر فعال",
      value: false,
    },
  ],
  onFilter: (value: boolean | Key, record: VendorAllType) => {
    return record?.active === value;
  },
  filterSearch: true,
};

export const TableModelId = {
  title: "",
  dataIndex: "id",
  key: "id",
  fixed: "right" as FixedType,
  width: 100,
  className: "tables-sticky-column-left",
};
