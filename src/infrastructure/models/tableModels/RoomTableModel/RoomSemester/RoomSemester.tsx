import { Switch } from "antd";
import moment from "jalali-moment";

export const RoomSemesterModal = ({ editClickHandler, deleteClickHandler }: any) => [
  {
    title: "عنوان",
    dataIndex: "title",
    key: "title",
    width: 100,
  },
  {
    title: "شروع",
    dataIndex: "startDate",
    key: "startDate",
    width: 150,
    render: (startDate: string) => {
      return moment(startDate ?? new Date())
        .locale("fa")
        .format("(HH:mm) YYYY/M/D");
    },
    sorter: (a: any, b: any) => {
      return (
        moment(new Date(), "YYYY/M/D HH:mm:ss").diff(
          moment(a.startDate ?? new Date()),
          "seconds"
        ) -
        moment(new Date(), "YYYY/M/D HH:mm:ss").diff(
          moment(b.startDate ?? new Date()),
          "seconds"
        )
      );
    },
  },
  {
    title: "پایان",
    dataIndex: "endDate",
    key: "endDate",
    width: 150,
    render: (endDate: string) => {
      return moment(endDate ?? new Date())
        .locale("fa")
        .format("(HH:mm) YYYY/M/D");
    },
    sorter: (a: any, b: any) => {
      return (
        moment(new Date(), "YYYY/M/D HH:mm:ss").diff(
          moment(a.endDate ?? new Date()),
          "seconds"
        ) -
        moment(new Date(), "YYYY/M/D HH:mm:ss").diff(
          moment(b.endDate ?? new Date()),
          "seconds"
        )
      );
    },
  },
  {
    title: "فعال",
    dataIndex: "active",
    key: "active",
    width: 100,
    render: (value: boolean) => {
      return <Switch defaultChecked={value} />;
    },
  },
  {
    title: "",
    dataIndex: "id",
    key: "id",
    width: 120,
    fixed: "right",
    className: "tables-sticky-column-left",
    render: (value: string) => {
      return (
        <div className="action-container">
          <div
            onClick={() => editClickHandler(value)}
            className="action-text action-text-primary"
          >
            تغییر
          </div>
          <div
            onClick={() => deleteClickHandler(value)}
            className="action-text action-text-danger"
          >
            حذف
          </div>
        </div>
      );
    },
  },
];
