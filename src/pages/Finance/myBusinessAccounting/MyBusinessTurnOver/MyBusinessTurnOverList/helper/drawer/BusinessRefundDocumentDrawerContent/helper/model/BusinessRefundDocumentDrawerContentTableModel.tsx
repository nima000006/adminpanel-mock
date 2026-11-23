import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";

const BusinessRefundDocumentDrawerContentTableModel = () => {
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
      //need to api to get data and search, now it sa mock data
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
      //need to api to get data and search, now it sa mock data
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
      render: (value: number) =>
        dataPlaceHolder({ data: value.toString(), isPrice: true, isRial: true }),
    },
    {
      title: "درصد سهم",
      dataIndex: "sharePercentage",
      key: "sharePercentage",
      width: 105,
    },
  ];
};
export default BusinessRefundDocumentDrawerContentTableModel;
