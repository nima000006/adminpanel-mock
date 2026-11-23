import moment from "jalali-moment";

import CustomTooltip from "@components/Renderers/CustomTooltip/CustomTooltip";

import { LimitText } from "../../../../helpers/utils";

export const ArchiveAnnualModel = ({
  checkClickHandler,
}: {
  checkClickHandler: (value: string) => void;
}) => {
  return [
    {
      title: "",
      dataIndex: "key",
      key: "key",
      width: 50,
    },
    {
      title: "شماره گزارشگر",
      dataIndex: "reporterNum",
      key: "reporterNum",
      width: 130,
    },
    {
      title: "تعداد گزارشات دوره جاری",
      dataIndex: "countReport",
      key: "countReport",
      width: 200,
      render: (_: string, records: any) => {
        return (
          <div className="count-report-container">
            {records?.countReport <= 2 ? (
              <div className="count-report-wrapper">
                <div className="count-report-box box-count-report-green">1</div>
              </div>
            ) : records?.countReport > 2 && records?.countReport <= 5 ? (
              <div className="count-report-wrapper">
                <div className="count-report-box box-count-report-orange">3</div>
              </div>
            ) : records?.countReport > 5 && records?.countReport >= 6 ? (
              <div className="count-report-wrapper">
                <div className="count-report-box box-count-report-red">6</div>
              </div>
            ) : null}
          </div>
        );
      },
    },
    {
      title: "نام گزارشگر",
      dataIndex: "reporterFirstName",
      key: "reporterFirstName",
      width: 100,
    },
    {
      title: "نام خانوادگی گزارشگر",
      dataIndex: "reporterLastName",
      key: "reporterLastName",
      width: 180,
    },
    {
      title: "سمت گزارشگر",
      dataIndex: "reporterPosition",
      key: "reporterPosition",
      width: 120,
    },
    {
      title: "دانشگاه گزارشگر",
      dataIndex: "reporterUni",
      key: "reporterUni",
      width: 130,
    },
    {
      title: "موضوع",
      dataIndex: "subject",
      key: "subject",
      width: 100,
      render: (subject: string) => {
        return (
          <CustomTooltip title={subject}>
            <p>{LimitText(subject, 10)}</p>
          </CustomTooltip>
        );
      },
    },
    {
      title: "شماره گزارش",
      dataIndex: "reportPhone",
      key: "reportPhone",
      width: 100,
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
      dataIndex: "waiting",
      key: "waiting",
      width: 100,
      render: (_: string, record: any) => {
        const diffTime = moment(new Date(), "YYYY/M/D").diff(
          moment(record?.registerDate ?? new Date()),
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
    },
    {
      title: "نوع",
      dataIndex: "type",
      key: "type",
      width: 140,
    },
    {
      title: "وضعیت",
      dataIndex: "status",
      key: "status",
      width: 100,
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right",
      width: 100,
      className: "tables-sticky-column-left",
      render: (value: string) => {
        return (
          <span onClick={() => checkClickHandler(value)} className="check-btn">
            بررسی
          </span>
        );
      },
    },
  ];
};
