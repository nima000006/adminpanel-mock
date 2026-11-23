import { dataPlaceHolder } from "@infra/helpers/utils";

const SelfContractDrawerTableModel = () => {
  return [
    {
      title: "غذا",
      dataIndex: "title",
      id: "title",
      width: 150,
    },
    {
      title: "قیمت دانشجویی (ت)",
      dataIndex: "studentalPrice",
      id: "studentalPrice",
      width: 150,
      render: (value: number) =>
        dataPlaceHolder({ data: value.toString(), isPrice: true, isRial: true }),
    },
  ];
};

export default SelfContractDrawerTableModel;
