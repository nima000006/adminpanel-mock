import { PiArrowLineUpRight, PiCoins } from "react-icons/pi";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { documentTypeConfig } from "@pages/Finance/Accountants/_shared/utils";

import { BusinessAccountingDetailDebit } from "../../@types/@getMyBusinessAccountingDetailDebit";

const MyTurnOverCreditDocumentTableModel = ({
  onDetailClickHandler,
}: {
  onDetailClickHandler: (record: BusinessAccountingDetailDebit) => void;
}): CustomColumnType<BusinessAccountingDetailDebit>[] => {
  return [
    {
      title: "شماره سند بستانکاری",
      dataIndex: "accountingInvoiceId",
      key: "accountingInvoiceId",
      width: 400,
      ...GetServerColumnSearchProps({
        dataIndex: "documentNumber",
        label: "شماره سند بستانکاری",
        type: "text",
        pageName: "page",
        pageSizeName: "pageSize",
      }),
    },
    {
      title: "علت بستانکاری",
      dataIndex: "reasonOfCredit",
      key: "reasonOfCredit",
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
              خدمات
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
      width: 120,
      ...GetServerColumnSearchProps({
        dataIndex: "amountCredit",
        label: "مبلغ (تومان)",
        type: "sort",
      }),
      render: (value: string) => {
        return dataPlaceHolder({ data: value, isPrice: true, isRial: true });
      },
    },
    {
      title: "سرویس",
      dataIndex: "samimService",
      key: "samimService",
      width: 175,
      //todo[nima]: remove this comment when check this with real data
      // render: (value: string) => {
      //   const validValue = serviceOptions.find((s) => s.value === value);
      //   const config = validValue
      //     ? (serviceConfig[value] ?? { color: "default", icon: null })
      //     : { color: "default", icon: null };

      //   return (
      //     <CustomTag className="custom-tag" color={config.color} icon={config.icon}>
      //       {validValue ? validValue.title : value}
      //     </CustomTag>
      //   );
      // },
      render: (value: string) => <SamimServiceTag service={value} />,
    },
    {
      title: "تاریخ و زمان ایجاد سند",
      dataIndex: "createdDateTime",
      key: "createdDateTime",
      width: 175,
      //TODO[Nima] uncomment when api will be ready
      // ...GetServerColumnSearchProps({
      //   dataIndex: "createdDateTime",
      //   label: "تاریخ و ساعت ثبت سند",
      //   type: "sort",
      // }),
      render: (value: string) => {
        return dataPlaceHolder({
          data: value,
          isDate: true,
          customDateFormat: "HH:mm، YYYY/M/D",
        });
      },
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      className: "tables-sticky-column-left",
      width: 80,
      render: (_: unknown, record: any) => {
        return (
          <CustomButton onClick={() => onDetailClickHandler(record)} type="link">
            مشاهده
          </CustomButton>
        );
      },
    },
  ];
};
export default MyTurnOverCreditDocumentTableModel;
