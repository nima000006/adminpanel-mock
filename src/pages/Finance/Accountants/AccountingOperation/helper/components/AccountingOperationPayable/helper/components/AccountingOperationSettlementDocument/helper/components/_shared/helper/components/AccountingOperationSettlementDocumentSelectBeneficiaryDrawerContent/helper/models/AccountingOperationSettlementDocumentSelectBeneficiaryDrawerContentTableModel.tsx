import { CustomButton } from "@components/CustomInputs";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { getSettlementBeneficiariesDetailContent } from "@pages/Finance/Accountants/AccountingOperation/helper/components/AccountingOperationPayable/helper/components/AccountingOperationSettlementDocument/helper/components/_shared/helper/components/AccountingOperationSettlementDocumentSelectBeneficiaryDrawerContent/@types/@accountingOperationSettlementDocumentSelectBeneficiaryDrawerContent";

const AccountingOperationSettlementDocumentSelectBeneficiaryDrawerContentTableModel = (
  openDrawer: (uuid: string) => void
): CustomColumnType<getSettlementBeneficiariesDetailContent>[] => {
  return [
    {
      title: "تاریخ ایجاد",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 200,
      ...GetServerColumnSearchProps({
        dataIndex: "createdDate",
        label: "تاریخ ایجاد",
        type: "sort",
      }),
      render: (value: string) => dataPlaceHolder({ data: value, isDate: true }),
    },
    {
      title: "اسناد قابل پرداخت",
      dataIndex: "documentCount",
      key: "documentCount",
      width: 200,
      ...GetServerColumnSearchProps({
        dataIndex: "documentCount",
        label: "مجموع قابل پرداخت (تومان)",
        type: "sort",
      }),
      render: (value: string) => dataPlaceHolder({ data: value, isPrice: true }),
    },
    {
      title: "مجموع قابل پرداخت (تومان)",
      dataIndex: "payableAmount",
      key: "payableAmount",
      width: 200,
      ...GetServerColumnSearchProps({
        dataIndex: "payableAmount",
        label: "اسناد قابل پرداخت",
        type: "sort",
      }),
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "",
      dataIndex: "uuid",
      key: "uuid",
      fixed: "right" as FixedType,
      render: (value: string) => (
        <CustomButton onClick={() => openDrawer(value)} type="link">
          مشاهده
        </CustomButton>
      ),
    },
  ];
};

export default AccountingOperationSettlementDocumentSelectBeneficiaryDrawerContentTableModel;
