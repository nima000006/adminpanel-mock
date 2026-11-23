import moment from "jalali-moment";

import UniFood from "../../../../../assets/icons/UniFood";
import UniRoom from "../../../../../assets/icons/UniRoomIcon";

export const TicketsModel = ({ viewClickHandler }: any) => [
  {
    title: "شماره تیکت",
    dataIndex: "ticketNumber",
    key: "ticketNumber",
    width: 120,
    searchable: true,
  },
  {
    title: "عنوان",
    dataIndex: "title",
    key: "title",
    width: 100,
  },
  {
    title: "وضعیت",
    dataIndex: "status",
    key: "status",
    width: 120,
  },
  {
    title: "محصول",
    dataIndex: "serviceName",
    key: "serviceName",
    width: 100,

    render: (_: any, records: any) => {
      return (
        <div className="product-wrapper">
          {records?.serviceName === "یونی فود" ? (
            <span>
              <UniFood /> یونی فود
            </span>
          ) : records?.serviceName === "یونی روم" ? (
            <span>
              <UniRoom /> خوابگاه
            </span>
          ) : null}
        </div>
      );
    },
    filters: [
      {
        text: "یونی فود",
        value: "یونی فود",
      },
      {
        text: "خوابگاه",
        value: "یونی روم",
      },
    ],
    onFilter: (value: number, record: any) => {
      return record.serviceName === value;
    },
    filterSearch: true,
  },
  {
    title: "نوع",
    dataIndex: "type",
    key: "type",
    width: 100,
  },
  {
    title: "زمان ثبت",
    dataIndex: "registerDate",
    key: "registerDate",
    width: 150,
    render: (value: any) => {
      return moment(value ?? new Date())
        .locale("fa")
        .format("(HH:mm) YYYY/M/D");
    },
  },
  {
    title: "",
    dataIndex: "id",
    key: "id",
    width: 100,
    fixed: "right",
    className: "tables-sticky-column-left",
    render: (value: number) => {
      return (
        <div className="view-text-ticket" onClick={() => viewClickHandler(value)}>
          مشاهده
        </div>
      );
    },
  },
];
