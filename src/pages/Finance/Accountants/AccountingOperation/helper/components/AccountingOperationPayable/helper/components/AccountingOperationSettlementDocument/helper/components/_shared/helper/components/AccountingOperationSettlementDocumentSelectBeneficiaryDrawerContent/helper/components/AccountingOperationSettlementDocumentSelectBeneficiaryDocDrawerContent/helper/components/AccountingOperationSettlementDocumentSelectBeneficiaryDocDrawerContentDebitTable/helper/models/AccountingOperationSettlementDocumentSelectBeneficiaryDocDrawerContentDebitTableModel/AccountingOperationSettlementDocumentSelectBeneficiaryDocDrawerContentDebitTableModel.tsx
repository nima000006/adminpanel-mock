import { PiArrowLineUpRight, PiReceipt } from "react-icons/pi";

import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { DocumentTypeEnum } from "@pages/Finance/Accountants/_shared/enums/@enumDocumentReason";
import { getSettlementBeneficiariesDetailDocumentsContent } from "@pages/Finance/Accountants/AccountingOperation/helper/components/AccountingOperationPayable/helper/components/AccountingOperationSettlementDocument/helper/components/_shared/helper/components/AccountingOperationSettlementDocumentSelectBeneficiaryDrawerContent/helper/components/AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContent/@types/@accountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContent";

const AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContentDebitTableModel =
  (): CustomColumnType<getSettlementBeneficiariesDetailDocumentsContent>[] => {
    return [
      {
        title: "شماره سند سیستمی",
        dataIndex: "uuid",
        key: "uuid",
        width: 300,
        //todo[nima] uncomment when api get ready
        // ...GetServerColumnSearchProps({
        //   dataIndex: "uuid",
        //   label: "شماره سند سیستمی",
        //   type: "text",
        // }),
        render: (value: string) =>
          dataPlaceHolder({
            data: value,
          }),
      },
      {
        title: "علت بدهکاری",
        dataIndex: "documentReason",
        key: "documentReason",
        width: 130,
        render: (
          _: unknown,
          record: getSettlementBeneficiariesDetailDocumentsContent
        ) => {
          if (record.documentReason?.name === DocumentTypeEnum.REFUND) {
            return (
              <CustomTag className="w-fit" icon={<PiArrowLineUpRight />} color="volcano">
                عودت وجه
              </CustomTag>
            );
          } else if (
            record.documentReason?.name === DocumentTypeEnum.PARTNERSHIP_COMMISSION
          ) {
            return (
              <CustomTag className="w-fit" icon={<PiReceipt />} color="blue">
                کارمزد شراکت
              </CustomTag>
            );
          } else {
            return (
              <CustomTag className="w-fit" color="default">
                نامشخص
              </CustomTag>
            );
          }
        },
      },
      {
        title: "مبلغ",
        dataIndex: "amount",
        key: "amount",
        width: 170,
        ...GetServerColumnSearchProps({
          dataIndex: "money",
          label: "شماره سند سیستمی",
          type: "sort",
        }),
        render: (value: string) =>
          dataPlaceHolder({
            data: value,
            isPrice: true,
            isRial: true,
            currency: { isAvailable: true, type: "تومان" },
          }),
      },

      {
        title: "تاریخ و زمان ایجاد سند",
        dataIndex: "createdDate",
        key: "createdDate",
        width: 170,
        ...GetServerColumnSearchProps({
          dataIndex: "createdDate",
          label: "تاریخ و زمان ایجاد سند",
          type: "sort",
        }),
        render: (value: string) =>
          dataPlaceHolder({
            data: value,
            isDate: true,
            customDateFormat: "HH:mm, YYYY/MM/DD",
          }),
      },
    ];
  };
export default AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContentDebitTableModel;
