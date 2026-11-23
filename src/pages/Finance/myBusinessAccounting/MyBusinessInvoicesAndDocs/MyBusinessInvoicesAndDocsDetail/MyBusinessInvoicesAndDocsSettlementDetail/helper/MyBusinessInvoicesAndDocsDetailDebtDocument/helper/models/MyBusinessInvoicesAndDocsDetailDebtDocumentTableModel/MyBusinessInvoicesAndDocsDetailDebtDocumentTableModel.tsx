import { PiArrowLineUpRight, PiCoins } from "react-icons/pi";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { emptyString } from "@infra/config/global.vars";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { documentTypeConfig } from "@pages/Finance/Accountants/_shared/utils";
import { BusinessAccountingDetailDebit } from "@pages/Finance/myBusinessAccounting/MyBusinessTurnOver/MyBusinessTurnOverDetail/helper/MyBusinessTurnOverCreditDocument/@types/@getMyBusinessAccountingDetailDebit";

import { MyBusinessInvoicesAndDocsDetailDebtDocumentTableModelPropsType } from "./@types/@myBusinessInvoicesAndDocsDetailDebtDocumentTableModelPropsType";

const MyBusinessInvoicesAndDocsDetailDebtDocumentTableModel = ({
  openDetailDrawerHandler,
}: MyBusinessInvoicesAndDocsDetailDebtDocumentTableModelPropsType) => {
  return [
    {
      title: "شماره سند بدهکاری",
      dataIndex: "accountingInvoiceId",
      key: "accountingInvoiceId",
      width: 180,
    },
    {
      title: "علت بدهکاری",
      dataIndex: "reasonDebt",
      key: "reasonDebt",
      width: 170,
      render: (_: unknown, record: BusinessAccountingDetailDebit) => {
        if (record.documentType === documentTypeConfig.debit) {
          return (
            <CustomTag
              className="custom-tag"
              icon={<PiArrowLineUpRight />}
              color="volcano"
            >
              عودت وجه
            </CustomTag>
          );
        } else if (record.documentType === documentTypeConfig.credit) {
          return (
            <CustomTag className="custom-tag" icon={<PiCoins />} color="gold">
              سند خدمات
            </CustomTag>
          );
        } else {
          return (
            <CustomTag className="custom-tag" color="default">
              نامشخص
            </CustomTag>
          );
        }
      },
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
      title: "سرویس",
      dataIndex: "samimService",
      key: "samimService",
      width: 110,
      render: (value: string) => <SamimServiceTag service={value} />,
    },
    {
      title: "شهر",
      dataIndex: "city",
      key: "city",
      width: 85,
      render: () => emptyString,
    },
    {
      title: "استان",
      dataIndex: "province",
      key: "id",
      width: 85,
      render: () => emptyString,
    },
    {
      title: "تاریخ و زمان ایجاد سند",
      dataIndex: "createdDateTime",
      key: "createdDateTime",
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
      render: (_: unknown, record: BusinessAccountingDetailDebit) => {
        return (
          <CustomButton type="link" onClick={() => openDetailDrawerHandler(record)}>
            مشاهده
          </CustomButton>
        );
      },
    },
  ];
};
export default MyBusinessInvoicesAndDocsDetailDebtDocumentTableModel;
