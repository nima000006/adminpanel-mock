import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { ContractSalesShareServiceItem } from "@pages/Dormitory/Admission/_shared/pages/Contract/helper/components/ContractSalesShare/@types/@contractSalesShare";

const ContractSalesShareTableModel =
  (): CustomColumnType<ContractSalesShareServiceItem>[] => [
    {
      title: "عنوان خدمت",
      dataIndex: "serviceTitle",
      key: "serviceTitle",
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "سهم",
      dataIndex: "sharePercent",
      key: "sharePercent",
      render: (value: number) => dataPlaceHolder({ data: `${value}%` }),
    },
  ];

export default ContractSalesShareTableModel;
