import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";

import { GetMyBranchAccountingDetailSystemDocContent } from "../../@types/@getMyBranchAccountingDetailSystemDoc";

const BranchSystemDocumentsTableModel = ({
  viewInfoHandler,
}: {
  viewInfoHandler: (records: GetMyBranchAccountingDetailSystemDocContent) => void;
}): CustomColumnType<GetMyBranchAccountingDetailSystemDocContent>[] => {
  return [
    {
      title: "شماره سند دانشجویار",
      dataIndex: "id",
      key: "id",
      width: 475,
      //TODO[Nima] uncomment when api will be ready
      // ...GetServerColumnSearchProps({
      //   dataIndex: "id",
      //   label: "شماره سند دانشجویار",
      //   type: "text",
      // }),
    },
    {
      title: "شماره سند صف کیف پول",
      dataIndex: "walletTransactionUuid",
      key: "walletTransactionUuid",
      width: 200,
      //TODO[Nima] uncomment when api will be ready
      // ...GetServerColumnSearchProps({
      //   dataIndex: "walletTransactionUuid",
      //   label: "شماره سند صف کیف پول",
      //   type: "text",
      // }),
    },
    {
      title: "مبلغ (تومان)",
      dataIndex: "amount",
      key: "amount",
      width: 110,
      //TODO[Nima] uncomment when api will be ready
      // ...GetServerColumnSearchProps({
      //   dataIndex: "amount",
      //   label: "مبلغ (تومان)",
      //   type: "sort",
      // }),
      render: (value: number) =>
        dataPlaceHolder({ data: value.toString(), isPrice: true, isRial: true }),
    },
    {
      title: "تاریخ و زمان ایجاد سند",
      dataIndex: "createdTime",
      key: "createdTime",
      width: 175,
      //TODO[Nima] uncomment when api will be ready
      // ...GetServerColumnSearchProps({
      //   dataIndex: "creator",
      //   label: "ایجاد کننده",
      //   type: "sort",
      // }),
      render: (value: string) =>
        dataPlaceHolder({
          data: value,
          isDate: true,
          customDateFormat: "HH:mm, YYYY/MM/DD",
        }),
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      className: "tables-sticky-column-left",
      fixed: "right" as FixedType | undefined,
      width: 100,
      render: (_: unknown, records: GetMyBranchAccountingDetailSystemDocContent) => {
        return (
          <div className="checkout-container">
            <CustomButton type="link" onClick={() => viewInfoHandler(records)}>
              مشاهده
            </CustomButton>
          </div>
        );
      },
    },
  ];
};
export default BranchSystemDocumentsTableModel;
