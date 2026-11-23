import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { ContractsFoodDataType } from "@pages/Food/Contracts/AllContracts/AllContractDetail/helpers/components/Foods/@types/@foodsTab";

const SelfContractDrawerTableModel = (): CustomColumnType<ContractsFoodDataType>[] => {
  return [
    {
      title: "غذا",
      dataIndex: "title",
      width: 150,
    },
    {
      title: "قیمت دانشجویی (ت)",
      dataIndex: "studentalPrice",
      width: 150,
      render: (value: number) =>
        dataPlaceHolder({ data: value.toString(), isPrice: true, isRial: true }),
    },
  ];
};

export default SelfContractDrawerTableModel;
