import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { NatureAccounting } from "@pages/Finance/_shared/utils";
import { myAccountingDocumentReasonConfig } from "@pages/Finance/Accountants/_shared/utils";
import { GetMyBusinessAccountingListTurnOver } from "@pages/Finance/myBusinessAccounting/MyBusinessTurnOver/MyBusinessTurnOverList/@types/@myBusinessTurnOverList";

const MyBusinessTurnOverTableModel = ({
  viewClickHandler,
}: {
  viewClickHandler: (record: GetMyBusinessAccountingListTurnOver) => void;
}): CustomColumnType<GetMyBusinessAccountingListTurnOver>[] => {
  return [
    {
      title: "عنوان گردش مالی",
      dataIndex: "documentReason",
      key: "documentReason",
      width: 155,
      render: (_: unknown, record: GetMyBusinessAccountingListTurnOver) => {
        const reason = myAccountingDocumentReasonConfig[record?.documentReason.name];

        const Icon = reason?.icon;

        return (
          <CustomTag className="custom-tag w-fit gap-1" color="default" icon={<Icon />}>
            {reason?.title}
          </CustomTag>
        );
      },
    },
    {
      title: "ماهیت حسابداری",
      dataIndex: "documentType",
      key: "documentType",
      width: 120,
      render: (value: IdTitleName) => {
        const status =
          NatureAccounting[value?.name as keyof typeof NatureAccounting] ??
          NatureAccounting.DEFAULT;

        return (
          <CustomTag className="custom-tag w-fit" color={status?.color}>
            {status?.title}
          </CustomTag>
        );
      },
    },
    {
      title: "مطالبات (بستانکاری)",
      dataIndex: "amount",
      key: "credit",
      width: 150,
      render: (value: number, record: GetMyBusinessAccountingListTurnOver) =>
        dataPlaceHolder({
          data: record.documentType?.name === "CREDIT" ? value : 0,
          isPrice: true,
          isRial: true,
          currency: { isAvailable: true, type: "تومان" },
        }),
    },
    {
      title: "تعهدات (بدهکاری)",
      dataIndex: "amount",
      key: "debit",
      width: 180,
      render: (value: number, record: GetMyBusinessAccountingListTurnOver) =>
        dataPlaceHolder({
          data: record.documentType?.name === "DEBIT" ? value : 0,
          isPrice: true,
          isRial: true,
          currency: { isAvailable: true, type: "تومان" },
        }),
    },
    {
      title: "تاریخ و زمان ثبت سند",
      dataIndex: "createdDate",
      key: "createdDate",
      width: 180,
      ...GetServerColumnSearchProps({
        dataIndex: "createdDate",
        label: "تاریخ و ساعت ثبت سند",
        type: "sort",
      }),
      render: (value: string) => {
        return dataPlaceHolder({
          data: value,
          customDateFormat: "HH:mm، YYYY/M/D",
          isDate: true,
        });
      },
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      className: "tables-sticky-column-left",
      fixed: "right" as FixedType | undefined,
      width: 100,
      render: (_: unknown, record: GetMyBusinessAccountingListTurnOver) => {
        return (
          <div>
            <CustomButton type="link" onClick={() => viewClickHandler(record)}>
              مشاهده
            </CustomButton>
          </div>
        );
      },
    },
  ];
};
export default MyBusinessTurnOverTableModel;
