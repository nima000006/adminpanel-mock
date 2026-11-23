import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";

const MyInvoicesAndDocsDetailDebtDocumentDrawerContentTableModel = () => {
  return [
    {
      title: "کسب و کار",
      dataIndex: "businessName",
      key: "businessName",
      width: 212,
      ...GetServerColumnSearchProps({
        dataIndex: "businessName",
        label: "کسب و کار",
        type: "text",
      }),
    },
    {
      title: "شعبه / واحد (ذینفع)",
      dataIndex: "branch",
      key: "branch",
      width: 170,
      ...GetServerColumnSearchProps({
        dataIndex: "branch",
        label: "شعبه / واحد (ذینفع)",
        type: "text",
      }),
    },
    {
      title: "سهم از عودت (تومان)",
      dataIndex: "shareAmount",
      key: "shareAmount",
      width: 170,
      return: (value: number) =>
        dataPlaceHolder({ data: value.toString(), isPrice: true, isRial: true }),
    },
    {
      title: "درصد سهم",
      dataIndex: "sharePercent",
      key: "sharePercent",
      width: 105,
    },
  ];
};
export default MyInvoicesAndDocsDetailDebtDocumentDrawerContentTableModel;
