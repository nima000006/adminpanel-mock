import { dataPlaceHolder } from "@infra/helpers/utils";

export const Food = {
  title: "غذا",
  dataIndex: "title",
  id: "title",
  width: 150,
};
export const Price = {
  title: "قیمت دانشجویی (ت)",
  dataIndex: "studentalPrice",
  id: "studentalPrice",
  width: 150,
  render: (value: string) => {
    return <>{dataPlaceHolder({ data: value, isPrice: true, isRial: true })}</>;
  },
};
