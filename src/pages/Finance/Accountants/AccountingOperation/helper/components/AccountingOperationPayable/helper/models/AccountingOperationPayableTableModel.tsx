import { CustomButton } from "@components/CustomInputs";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { GetAccountingOperationPayableListItems } from "@pages/Finance/Accountants/AccountingOperation/helper/components/AccountingOperationPayable/@types/@accountingOperationPayable";

const AccountingOperationPayableTableModel = (
  openDrawer: (value: GetAccountingOperationPayableListItems) => void
): CustomColumnType<GetAccountingOperationPayableListItems>[] => {
  return [
    {
      title: "کسب و کار",
      dataIndex: "businessName",
      key: "businessName",
      width: 100,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "شعبه / واحد (ذینفع)",
      dataIndex: "branchName",
      key: "branchName",
      width: 140,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "سرویس",
      dataIndex: "samimService",
      key: "samimService",
      width: 140,
      render: (_: unknown, records: GetAccountingOperationPayableListItems) => (
        <SamimServiceTag service={records?.samimService?.name} />
      ),
    },
    {
      title: "مطالبات ذینفع (بستانکاری)",
      dataIndex: "creditAmount",
      key: "creditAmount",
      width: 190,
      //todo[nima] uncomment when api get ready
      // ...GetServerColumnSearchProps({
      //   dataIndex: "creditAmount",
      //   label: "مطالبات ذینفع (بستانکاری)",
      //   type: "sort",
      // }),
      render: (value: string) =>
        dataPlaceHolder({ data: value, isPrice: true, isRial: true }) + "تومان",
    },
    {
      title: "تعهدات ذینفع (بدهکاری)",
      dataIndex: "debitAmount",
      key: "debitAmount",
      width: 190,
      //todo[nima] uncomment when api get ready
      // ...GetServerColumnSearchProps({
      //   dataIndex: "debitAmount",
      //   label: "تعهدات ذینفع (بدهکاری)",
      //   type: "sort",
      // }),
      render: (value: string) =>
        dataPlaceHolder({ data: value, isPrice: true, isRial: true }) + "تومان",
    },
    {
      title: "قابل پرداخت",
      dataIndex: "payableAmount",
      key: "payableAmount",
      width: 130,
      //todo[nima] uncomment when api get ready
      // ...GetServerColumnSearchProps({
      //   dataIndex: "payableAmount",
      //   label: "قابل پرداخت",
      //   type: "sort",
      // }),
      render: (value: string) =>
        dataPlaceHolder({ data: value, isPrice: true, isRial: true }) + "تومان",
    },
    {
      title: "اسناد قابل پرداخت",
      dataIndex: "documentCount",
      key: "documentCount",
      width: 150,
      //todo[nima] uncomment when api get ready
      // ...GetServerColumnSearchProps({
      //   dataIndex: "documentCount",
      //   label: "اسناد قابل پرداخت",
      //   type: "sort",
      // }),
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "تاریخ و زمان آخرین تسویه",
      dataIndex: "lastSettleDate",
      key: "lastSettleDate",
      width: 190,
      //todo[nima] uncomment when api get ready
      // ...GetServerColumnSearchProps({
      //   dataIndex: "modifiedDate",
      //   label: "تاریخ و زمان آخرین تسویه",
      //   type: "sort",
      // }),
      render: (value: string) =>
        dataPlaceHolder({
          data: value,
          isDate: true,
          customDateFormat: "HH:mm, YYYY/MM/DD ",
        }),
    },
    {
      title: "فاصله با آخرین تسویه",
      dataIndex: "lastSettleDays",
      key: "lastSettleDays",
      width: 150,
      //todo[nima] uncomment when api get ready
      // ...GetServerColumnSearchProps({
      //   dataIndex: "lastSettleDays",
      //   label: "فاصله با آخرین تسویه",
      //   type: "sort",
      // }),
      render: (value: string) => dataPlaceHolder({ data: value }) + " روز",
    },
    {
      title: "",
      dataIndex: "number",
      key: "number",
      fixed: "right" as FixedType,
      render: (_: unknown, records: GetAccountingOperationPayableListItems) => (
        <CustomButton type="link" onClick={() => openDrawer(records)}>
          مشاهده
        </CustomButton>
      ),
    },
  ];
};
export default AccountingOperationPayableTableModel;
