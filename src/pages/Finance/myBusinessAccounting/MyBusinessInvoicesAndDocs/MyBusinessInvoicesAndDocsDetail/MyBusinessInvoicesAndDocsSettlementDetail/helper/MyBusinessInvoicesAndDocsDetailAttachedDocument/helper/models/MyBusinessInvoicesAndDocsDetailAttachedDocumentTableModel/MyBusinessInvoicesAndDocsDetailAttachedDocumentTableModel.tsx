import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { GetMyBusinessAccountingDetailSystemDocContent } from "@pages/Finance/myBusinessAccounting/MyBusinessTurnOver/MyBusinessTurnOverDetail/helper/MyBusinessTurnOverSystemDocuments/@types/@getMyBusinessAccountingDetailSystemDoc";

import { MyBusinessInvoicesAndDocsDetailAttachedDocumentTablePropsType } from "./@types/@myBusinessInvoicesAndDocsDetailAttachedDocumentTablePropsType";

const MyBusinessInvoicesAndDocsDetailAttachedDocumentTableModel = ({
  openDetailDrawerHandler,
}: MyBusinessInvoicesAndDocsDetailAttachedDocumentTablePropsType): CustomColumnType<GetMyBusinessAccountingDetailSystemDocContent>[] => {
  return [
    {
      title: "شماره سند دانشجویار",
      dataIndex: "id",
      key: "id",
      width: 740,
      //TODO[Nima] uncomment when api will be ready
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
      title: "تاریخ و زمان ایجاد سند",
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
      render: (_: unknown, record: GetMyBusinessAccountingDetailSystemDocContent) => {
        return (
          <CustomButton type="link" onClick={() => openDetailDrawerHandler(+record?.id)}>
            مشاهده
          </CustomButton>
        );
      },
    },
  ];
};
export default MyBusinessInvoicesAndDocsDetailAttachedDocumentTableModel;
