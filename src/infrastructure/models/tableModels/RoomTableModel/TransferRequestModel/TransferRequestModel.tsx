import moment from "jalali-moment";

export const RoomTransferRequestColumns = () => [
  {
    title: "تخت",
    dataIndex: "key",
    key: "key",
    width: 100,
    searchable: true,
  },
  {
    title: "نام",
    dataIndex: "fName",
    key: "fName",
    width: 100,
    searchable: true,
  },
  {
    title: "نام خانوادگی",
    dataIndex: "lName",
    key: "lName",
    width: 200,
    searchable: true,
  },
  {
    title: "کد ملی / اتباع",
    dataIndex: "userName",
    key: "userName",
    width: 120,
    searchable: true,
  },
  {
    title: "شماره موبایل",
    dataIndex: "mobile",
    key: "mobile",
    width: 140,
    searchable: true,
  },
  {
    title: "شماره دانشجویی",
    dataIndex: "studentNumber",
    key: "studentNumber",
    width: 100,
    searchable: true,
  },
  {
    title: "مقطع",
    dataIndex: "level",
    key: "level",
    width: 100,
  },
  {
    title: "شروع اسکان",
    dataIndex: "startdate",
    key: "startdate",
    width: 170,
    render: (startdate: string) => {
      return startdate
        ? moment(startdate ?? new Date())
            .locale("fa")
            .format("(HH:mm) YYYY/M/D")
        : "";
    },
    sorter: (a: any, b: any) => {
      return (
        moment(new Date(), "YYYY/M/D HH:mm:ss").diff(
          moment(a.startdate ?? new Date()),
          "seconds"
        ) -
        moment(new Date(), "YYYY/M/D HH:mm:ss").diff(
          moment(b.startdate ?? new Date()),
          "seconds"
        )
      );
    },
  },
  {
    title: "پایان اسکان",
    dataIndex: "enddate",
    key: "enddate",
    width: 170,
    render: (enddate: string) => {
      return enddate
        ? moment(enddate ?? new Date())
            .locale("fa")
            .format("(HH:mm) YYYY/M/D")
        : "";
    },
    sorter: (a: any, b: any) => {
      return (
        moment(new Date(), "YYYY/M/D HH:mm:ss").diff(
          moment(a.enddate ?? new Date()),
          "seconds"
        ) -
        moment(new Date(), "YYYY/M/D HH:mm:ss").diff(
          moment(b.enddate ?? new Date()),
          "seconds"
        )
      );
    },
  },
  {
    title: "ورودی",
    dataIndex: "studentYear",
    key: "studentYear",
    width: 100,
  },
  // {
  //   title: "مذهب",
  //   dataIndex: "religion",
  //   key: "religion",
  //   width: 100,
  // },
  {
    title: "رشته",
    dataIndex: "field",
    key: "field",
    width: 100,
  },
];
