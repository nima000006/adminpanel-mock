import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { GetMyBranchAccountingDetailSystemDocContent } from "@pages/Finance/MyBranchAccounting/MyBranchTurnOver/MyBranchTurnOverDetail/helper/MyBranchTurnOverSystemDocuments/@types/@getMyBranchAccountingDetailSystemDoc";

import { MyBranchInvoicesAndDocsDetailAttachedDocumentTablePropsType } from "./@types/@myBranchInvoicesAndDocsDetailAttachedDocumentTablePropsType";

const MyBranchInvoicesAndDocsDetailAttachedDocumentTableModel = ({
  openDetailDrawerHandler,
}: MyBranchInvoicesAndDocsDetailAttachedDocumentTablePropsType): CustomColumnType<GetMyBranchAccountingDetailSystemDocContent>[] => {
  return [
    {
      title: "شماره سند دانشجویار",
      dataIndex: "id",
      key: "id",
      width: 740,
      //TODO[NIMA] uncomment when api will be ready
      // ...GetServerColumnSearchProps({
      //   dataIndex: "id",
      //   label: "شماره سند تسویه دانشجویار",
      //   type: "text",
      // }),
    },
    {
      title: "مبلغ (تومان)",
      dataIndex: "amount",
      key: "amount",
      width: 117,
      render: (value: number) =>
        dataPlaceHolder({ data: value.toString(), isPrice: true, isRial: true }),
    },
    {
      title: "تاریخ",
      dataIndex: "createdTime",
      key: "createdTime",
      width: 175,
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
      fixed: "right" as FixedType,
      className: "tables-sticky-column-left",
      width: 75,
      render: (_: unknown, record: GetMyBranchAccountingDetailSystemDocContent) => {
        return (
          <CustomButton type="link" onClick={() => openDetailDrawerHandler(+record?.id)}>
            مشاهده
          </CustomButton>
        );
      },
    },
  ];
};
export default MyBranchInvoicesAndDocsDetailAttachedDocumentTableModel;
