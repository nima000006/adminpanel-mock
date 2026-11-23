import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";

export const foodTitle = {
  title: "غذا",
  dataIndex: "title",
  key: "title",
  width: 130,
};

export const studentPrice = {
  title: "قیمت دانشجویی (ت)",
  dataIndex: "studentalPrice",
  key: "studentalPrice",
  width: 150,
  render: (value: number) => {
    return <>{dataPlaceHolder({ data: `${value}`, isPrice: true })}</>;
  },
};

export const minPrice = {
  title: "قیمت حداقل (ت)",
  dataIndex: "minPrice",
  key: "minPrice",
  width: 120,
  render: (value: number) => {
    return <>{dataPlaceHolder({ data: `${value}`, isPrice: true })}</>;
  },
};

export const maxPrice = {
  title: "قیمت حداکثر (ت)",
  dataIndex: "maxPrice",
  key: "maxPrice",
  width: 120,
  render: (value: number) => {
    return <>{dataPlaceHolder({ data: `${value}`, isPrice: true })}</>;
  },
};

export const status = {
  title: "وضعیت",
  dataIndex: "active",
  key: "active",
  width: 120,
  render: (value: boolean) => {
    return (
      <CustomTag className="status" color={value ? "green" : "red"}>
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
