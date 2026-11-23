import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";

export const foodTitle = {
  title: "غذا",
  dataIndex: "title",
  key: "title",
  width: 150,
};

export const restaurantTitle = {
  title: "سلف",
  dataIndex: "contractRestaurantTitle",
  key: "contractRestaurantTitle",
  width: 150,
};

export const contractTitle = {
  title: "قرارداد",
  dataIndex: "contractTitle",
  key: "contractTitle",
  width: 150,
};

export const vendorTitle = {
  title: "تامین کننده",
  dataIndex: "contractVendorTitle",
  key: "contractVendorTitle",
  width: 150,
};

export const studentPrice = {
  title: "قیمت دانشجویی (ریال)",
  dataIndex: "studentalPrice",
  key: "studentalPrice",
  width: 150,
  render: (value?: string) => {
    if (value) {
      return <>{dataPlaceHolder({ data: value, isPrice: true })}</>;
    }
    return value;
  },
};

export const minPrice = {
  title: "قیمت حداقل (ریال)",
  dataIndex: "minPrice",
  key: "minPrice",
  width: 150,
  render: (value?: string) => {
    if (value) {
      return <>{dataPlaceHolder({ data: value, isPrice: true })}</>;
    }
    return value;
  },
};

export const maxPrice = {
  title: "قیمت حداکثر (ریال)",
  dataIndex: "maxPrice",
  key: "maxPrice",
  width: 130,
  render: (value?: string) => {
    if (value) {
      return <>{dataPlaceHolder({ data: value, isPrice: true })}</>;
    }
    return value;
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
  dataIndex: "actions",
  key: "actions",
  fixed: "right" as FixedType,
  width: 150,
  className: "tables-sticky-column-left",
};
export const TableModelIdDelete = {
  title: "",
  dataIndex: "id",
  key: "id",
  fixed: "right" as FixedType,
  width: 150,
  className: "tables-sticky-column-left",
};
