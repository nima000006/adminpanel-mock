import moment from "jalali-moment";

export const ReceiptModel = () => [
  {
    title: "نام",
    dataIndex: "name",
    key: "name",
    width: 100,
    searchable: true,
  },
  {
    title: "نام خانوادگی",
    dataIndex: "lastName",
    key: "lastName",
    width: 125,
    searchable: true,
  },
  {
    title: "کد ملی",
    dataIndex: "nationalNumber",
    key: "nationalNumber",
    width: 125,
    searchable: true,
  },
  {
    title: "شماره دانشجویی",
    dataIndex: "studentNumber",
    key: "studentNumber",
    width: 150,
    searchable: true,
  },
  {
    title: "شماره موبایل",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
    width: 150,
    searchable: true,
  },
  {
    title: "شماره فاکتور",
    dataIndex: "receiptNumber",
    key: "receiptNumber",
    width: 150,
    searchable: true,
  },
  {
    title: "وعده پرداخت",
    dataIndex: "installmentNumber",
    key: "installmentNumber",
    width: 125,
    searchable: true,
  },
  {
    title: "مبلغ",
    dataIndex: "price",
    key: "price",
    width: 75,
    searchable: true,
  },
  {
    title: "تاریخ سر رسید ",
    dataIndex: "endDate",
    key: "endDate",
    width: 150,
    render: (endDate: string) => {
      return moment(endDate ?? new Date())
        .locale("fa")
        .format("YYYY/M/D");
    },
    sorter: (a: any, b: any) => {
      return (
        moment(new Date(), "YYYY/M/D").diff(moment(a.endDate ?? new Date()), "days") -
        moment(new Date(), "YYYY/M/D").diff(moment(b.endDate ?? new Date()), "days")
      );
    },
  },
  {
    title: "تاریخ پرداخت",
    dataIndex: "paymentDate",
    key: "paymentDate",
    width: 150,
    render: (paymentDate: string) => {
      return moment(paymentDate ?? new Date())
        .locale("fa")
        .format("YYYY/M/D");
    },
    sorter: (a: any, b: any) => {
      return (
        moment(new Date(), "YYYY/M/D").diff(moment(a.paymentDate ?? new Date()), "days") -
        moment(new Date(), "YYYY/M/D").diff(moment(b.paymentDate ?? new Date()), "days")
      );
    },
  },
  {
    title: "وضعیت",
    dataIndex: "status",
    key: "status",
    width: 150,
    filters: [
      {
        text: "پرداخت شده",
        value: "پرداخت شده",
      },
      {
        text: "انتظار پرداخت",
        value: "انتظار پرداخت",
      },
    ],
    onFilter: (value: string, record: any) => {
      return record.status === value;
    },
    filterSearch: true,
  },
  {
    title: "خوابگاه",
    dataIndex: "dormName",
    key: "dormName",
    width: 150,
    searchable: true,
  },
];
