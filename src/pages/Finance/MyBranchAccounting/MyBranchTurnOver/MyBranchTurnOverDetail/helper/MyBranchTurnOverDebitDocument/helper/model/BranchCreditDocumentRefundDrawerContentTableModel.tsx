import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { dataSourceType } from "@pages/Finance/MyBranchAccounting/MyBranchTurnOver/MyBranchTurnOverDetail/helper/MyBranchTurnOverDebitDocument/helper/drawer/BranchCreditDocumentRefundDrawerContent/@types/@branchCreditDocumentRefundDrawerContent";

const BranchCreditDocumentRefundDrawerContentTableModel =
  (): CustomColumnType<dataSourceType>[] => {
    return [
      {
        title: "کسب و کار",
        dataIndex: "business",
        key: "business",
        width: 160,
        ...GetServerColumnSearchProps({
          dataIndex: "business",
          label: "کسب و کار",
          type: "text",
          pageName: "page",
          pageSizeName: "pageSize",
        }),
      },
      {
        title: "شعبه / واحد",
        dataIndex: "branch",
        key: "branch",
        width: 125,
        ...GetServerColumnSearchProps({
          dataIndex: "branch",
          label: "شعبه / واحد",
          type: "text",
          pageName: "page",
          pageSizeName: "pageSize",
        }),
      },
      {
        title: "ذینفع",
        dataIndex: "beneficial",
        key: "beneficial",
        width: 100,
        ...GetServerColumnSearchProps({
          dataIndex: "beneficial",
          label: "ذینفع",
          type: "text",
          pageName: "page",
          pageSizeName: "pageSize",
        }),
      },
      {
        title: "سهم از عودت (تومان)",
        dataIndex: "shareOfReturn",
        key: "shareOfReturn",
        width: 170,
        ...GetServerColumnSearchProps({
          dataIndex: "shareOfReturn",
          label: "سهم از عودت (تومان)",
          type: "sort",
        }),
        render: (value: number) =>
          dataPlaceHolder({ data: value.toString(), isPrice: true, isRial: true }),
      },
      {
        title: "درصد سهم",
        dataIndex: "sharePercentage",
        key: "sharePercentage",
        width: 105,
        ...GetServerColumnSearchProps({
          dataIndex: "sharePercentage",
          label: "درصد سهم",
          type: "sort",
        }),
      },
    ];
  };
export default BranchCreditDocumentRefundDrawerContentTableModel;
