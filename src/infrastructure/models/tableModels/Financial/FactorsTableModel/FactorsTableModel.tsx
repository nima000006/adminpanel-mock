import moment from "jalali-moment";

import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import CustomTooltip from "@components/Renderers/CustomTooltip/CustomTooltip";

import { LimitText, PriceSeparator } from "../../../../helpers/utils";

export const FactorsTableModel = () => [
  {
    title: "نام",
    dataIndex: "firstName",
    key: "firstName",
    width: 100,
  },
  {
    title: "نام خانوادگی",
    dataIndex: "lastName",
    key: "lastName",
    width: 150,
  },
  {
    title: "کد ملی / اتباع",
    dataIndex: "nationalCode",
    key: "nationalCode",
    width: 140,
  },
  {
    title: "شماره موبایل",
    dataIndex: "mobileNo",
    key: "mobileNo",
    width: 120,
  },
  {
    title: "کد واحد ذینفع",
    dataIndex: "beneficiaryBranchCode",
    key: "beneficiaryBranchCode",
    width: 140,
  },
  {
    title: "نام واحد ذینفع",
    dataIndex: "beneficiaryBranchName",
    key: "beneficiaryBranchName",
    width: 140,
  },
  {
    title: "واحد درخواست دهنده",
    dataIndex: "unitName",
    key: "unitName",
    width: 250,
  },
  {
    title: "سرویس",
    dataIndex: "serviceName",
    key: "serviceName",
    width: 150,
    render: (serviceName: string) => {
      if (serviceName === "خوابگاه") {
        return <CustomTag color="purple">{serviceName}</CustomTag>;
      }
      if (serviceName === "تغذيه") {
        return <CustomTag color="lime">{serviceName}</CustomTag>;
      }
      return <CustomTag color="default">{serviceName}</CustomTag>;
    },
  },
  {
    title: "شماره فاکتور",
    dataIndex: "factorNo",
    key: "factorNo",
    width: 140,
    render: (factorNo: string) => {
      return <CustomTooltip title={factorNo}>{LimitText(factorNo, 10)}</CustomTooltip>;
    },
  },
  {
    title: "تاریخ پرداخت",
    dataIndex: "factorCreateDate",
    key: "factorCreateDate",
    width: 120,
    render: (factorCreateDate: string) => {
      return moment(factorCreateDate ?? new Date())
        .locale("fa")
        .format("YYYY/M/D");
    },
    sorter: (a: any, b: any) => {
      return (
        moment(new Date(), "YYYY/M/D HH:mm:ss").diff(
          moment(a.factorCreateDate ?? new Date()),
          "seconds"
        ) -
        moment(new Date(), "YYYY/M/D HH:mm:ss").diff(
          moment(b.factorCreateDate ?? new Date()),
          "seconds"
        )
      );
    },
  },
  {
    title: "مبلغ کل (ریال)",
    dataIndex: "amount",
    key: "amount",
    width: 100,
    render: (value: number) => {
      return PriceSeparator(value?.toString());
    },
  },
  {
    title: "درصد سهم دانشگاه",
    dataIndex: "universityPercentage",
    key: "universityPercentage",
    width: 140,
  },
  {
    title: "سهم دانشگاه",
    dataIndex: "universityReceive",
    key: "universityReceive",
    width: 140,
    render: (value: number) => {
      return PriceSeparator(value?.toString());
    },
  },
  {
    title: "درصد ارائه دهنده خدمت ",
    dataIndex: "providerPercent",
    key: "providerPercent",
    width: 200,
  },
  {
    title: "سهم ارائه دهنده خدمت",
    dataIndex: "providerReceive",
    key: "providerReceive",
    width: 150,
    render: (value: number) => {
      return PriceSeparator(value?.toString());
    },
  },
  {
    title: " درصد تامین کننده ",
    dataIndex: "vendorPercent",
    key: "vendorPercent",
    width: 140,
  },
  {
    title: "سهم تامین کننده ",
    dataIndex: "vendorAmount",
    key: "vendorAmount",
    width: 140,
    render: (value: number) => {
      return PriceSeparator(value?.toString());
    },
  },
  {
    title: "وضعیت",
    dataIndex: "paymentStatus",
    key: "paymentStatus",
    width: 120,
    render: (value: number) => {
      return value?.toString() === "1" ? "پرداخت شده" : "تسویه شده";
    },
  },
  {
    title: "شماره رهگیری",
    dataIndex: "trackingNo",
    key: "trackingNo",
    width: 120,
  },

  {
    title: "Ref",
    dataIndex: "referenceNo",
    key: "referenceNo",
    width: 120,
  },
  {
    title: "سند تسویه",
    dataIndex: "documentNumber",
    key: "documentNumber",
    width: 100,
  },

  {
    title: "شماره شبای تامین کننده",
    dataIndex: "vendorIBAN",
    key: "vendorIBAN",
    width: 260,
  },
  {
    title: "نام تامین  کننده",
    dataIndex: "vendorTitle",
    key: "vendorTitle",
    width: 250,
  },
  {
    title: "شناسه تامین کننده",
    dataIndex: "vendorId",
    key: "vendorId",
    width: 140,
  },

  {
    title: "درصد دانشگاه ",
    dataIndex: "universityPercent",
    key: "universityPercent",
    width: 140,
  },
  {
    title: "شناسه قرارداد",
    dataIndex: "contractId",
    key: "contractId",
    width: 140,
  },
  {
    title: "وضعیت پرداخت",
    dataIndex: "paymentStatus",
    key: "paymentStatus",
    width: 160,
    render: (value: number) => {
      if (value === 1) {
        return <CustomTag color="green">پرداخت شده</CustomTag>;
      }
      if (value === 2) {
        return <CustomTag color="orange">تسویه شده</CustomTag>;
      } else {
        return <CustomTag color="default">نامشخص</CustomTag>;
      }
    },
  },
];
