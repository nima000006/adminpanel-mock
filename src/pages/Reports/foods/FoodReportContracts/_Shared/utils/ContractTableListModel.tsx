import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";

export const contractTitle = {
  title: "عنوان",
  dataIndex: "title",
  key: "title",
  width: 130,
};

export const contractNumber = {
  title: "شماره قرارداد",
  dataIndex: "contractUUID",
  key: "contractUUID",
  width: 150,
};

export const restaurantTitle = {
  title: "نام سلف",
  dataIndex: "restaurantTitle",
  key: "restaurantTitle",
  width: 150,
};

export const vendorTitle = {
  title: "نام تأمین کننده",
  dataIndex: "vendorTitle",
  key: "vendorTitle",
  width: 150,
};

export const startDate = {
  title: "شروع قرارداد",
  dataIndex: "startedDate",
  key: "startedDate",
  width: 150,
  render: (value: string) => {
    return <>{dataPlaceHolder({ data: value, isDate: true })}</>;
  },
};

export const endDate = {
  title: "پایان قرارداد",
  dataIndex: "endDate",
  key: "endDate",
  width: 150,
  render: (value: string) => {
    return <>{dataPlaceHolder({ data: value, isDate: true })}</>;
  },
};

export const status = {
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
};

export const TableModelId = {
  title: "",
  dataIndex: "id",
  key: "id",
  fixed: "right" as FixedType,
  width: 100,
  className: "tables-sticky-column-left",
};
