import moment from "jalali-moment";

export const LeaveRequestModel = ({
  confirmClickHandler,
  rejectClickHandler,
  viewClickHandler,
}: {
  confirmClickHandler: (value: string) => void;
  rejectClickHandler: (value: string) => void;
  viewClickHandler: (value: string) => void;
}) => {
  return [
    {
      title: "نام",
      dataIndex: "firstName",
      key: "firstName",
      width: 100,
      searchable: true,
    },
    {
      title: "نام خانوادگی",
      dataIndex: "lastName",
      key: "lastName",
      width: 200,
      searchable: true,
    },
    {
      title: "شماره ملی",
      dataIndex: "nationalCode",
      key: "nationalCode",
      width: 100,
      searchable: true,
    },
    {
      title: "شماره دانشجویی",
      dataIndex: "studentNumber",
      key: "studentNumber",
      width: 180,
      searchable: true,
    },
    {
      title: "شماره موبایل",
      dataIndex: "mobile",
      key: "mobile",
      width: 120,
      searchable: true,
    },
    {
      title: "تاریخ ثبت",
      dataIndex: "registerDate",
      key: "registerDate",
      width: 100,
      render: (registerDate: string) => {
        return moment(registerDate ?? new Date())
          .locale("fa")
          .format("YYYY/M/D");
      },
    },
    {
      title: "انتظار",
      dataIndex: "registerDate",
      key: "registerDate",
      width: 100,
      render: (value: string) => {
        const diffTime = moment(new Date(), "YYYY/M/D HH:mm:ss").diff(
          moment(value ?? new Date()),
          "days"
        );

        const colorGenerator =
          +diffTime < 3 ? "green" : +diffTime > 2 && +diffTime < 5 ? "yellow" : "red";
        return (
          <div className="waiting-time-container">
            <span className={`waiting-time ${colorGenerator}`}>{diffTime}</span>
            <span>روز</span>
          </div>
        );
      },
      sorter: (a: any, b: any) => {
        return (
          moment(new Date(), "YYYY/M/D HH:mm:ss").diff(
            moment(a.registerDate ?? new Date()),
            "seconds"
          ) -
          moment(new Date(), "YYYY/M/D HH:mm:ss").diff(
            moment(b.registerDate ?? new Date()),
            "seconds"
          )
        );
      },
    },
    {
      title: "محل اسکان",
      dataIndex: "residence",
      key: "residence",
      width: 140,
    },
    {
      title: "تاریخ شروع",
      dataIndex: "startDate",
      key: "startDate",
      width: 100,
      render: (startDate: string) => {
        return moment(startDate ?? new Date())
          .locale("fa")
          .format("YYYY/M/D");
      },
    },
    {
      title: "تاریخ پایان",
      dataIndex: "endDate",
      key: "endDate",
      width: 100,
      render: (endDate: string) => {
        return moment(endDate ?? new Date())
          .locale("fa")
          .format("YYYY/M/D");
      },
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right",
      width: 120,
      className: "tables-sticky-column-left",
      render: (value: string) => {
        return (
          <div className="leave-request-btn-wrapper">
            <span onClick={() => confirmClickHandler(value)} className="confirm-btn">
              تایید
            </span>
            <span onClick={() => rejectClickHandler(value)} className="reject-btn">
              رد
            </span>
            <span onClick={() => viewClickHandler(value)} className="view-btn">
              مشاهده
            </span>
          </div>
        );
      },
    },
  ];
};
