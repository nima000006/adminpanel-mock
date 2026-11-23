import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { GetVendorContractListBeneficiaryType } from "@pages/Shop/Vendors/AllVendors/ShopAllVendorsDetail/helper/components/ShopAllVendorsDetailContract/@types/@shopAllVendorsDetailContract";

const ShopAllVendorsDetailContractBeneficiariesListTableModel =
  (): CustomColumnType<GetVendorContractListBeneficiaryType>[] => [
    {
      title: "کسب و کار ذینفع",
      dataIndex: "businessName",
      key: "businessName",
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "شعبه / واحد ذینفع",
      dataIndex: "branchTitle",
      key: "branchTitle",
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "سهم",
      dataIndex: "partitionCoefficient",
      key: "partitionCoefficient",
      width: 120,
      render: (value: number) => dataPlaceHolder({ data: `${value}%` }),
    },
  ];

export default ShopAllVendorsDetailContractBeneficiariesListTableModel;
