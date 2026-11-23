import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { emptyString } from "@infra/config/global.vars";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { GetContractsBeneficiary } from "@pages/Contract/ContractsList/ContractsDetail/helper/components/ContractsDetailInfo/@types/@getContractsDetailBaseInfo";

const ContractsDetailInfoModelTable = (): CustomColumnType<GetContractsBeneficiary>[] => {
  return [
    {
      title: "خدمت",
      dataIndex: "categoryTitle",
      key: "categoryTitle",
      width: 690,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "فروشنده",
      dataIndex: "sellers",
      key: "sellers",
      width: 100,
      render: () => emptyString,
    },
    {
      title: "تامین کننده",
      dataIndex: "supplierName",
      key: "supplierName",
      width: 110,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "ذینفعان",
      dataIndex: "ruleBeneficiaries",
      key: "ruleBeneficiaries",
      width: 100,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "ارزش افزوده",
      dataIndex: "hasTax",
      key: "hasTax",
      width: 120,
      render: (hasTax: boolean) => <span>{hasTax ? "دارد" : "ندارد"}</span>,
    },
  ];
};
export default ContractsDetailInfoModelTable;
