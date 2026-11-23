import moment from "jalali-moment";

import { FixedType } from "../../../../modules/GeneralTypes/GeneralTypes";

export const SessionAccusationModel = ({
  checkClickHandler,
  rejectClickHandler,
}: {
  checkClickHandler: (value: string) => void;
  rejectClickHandler: (value: string) => void;
}) => {
  const arr = [
    {
      title: "نوع",
      dataIndex: "AssociationInfractionType_title",
      key: "AssociationInfractionType_title",
      width: 100,
    },
    {
      title: "اتهام",
      dataIndex: "AssociationInfractions_title",
      key: "AssociationInfractions_title",
      width: 300,
    },
    {
      title: "اولویت",
      dataIndex: "AssociationTblPriiority_title",
      key: "AssociationTblPriiority_title",
      width: 200,
      render: (value: string) => {
        return (
          <div className="count-report-container">
            {value === "پایین" ? (
              <div className="count-report-wrapper">
                <div className="count-report-box box-count-report-green">{value}</div>
              </div>
            ) : value === "متوسط" ? (
              <div className="count-report-wrapper">
                <div className="count-report-box box-count-report-orange">{value}</div>
              </div>
            ) : (
              <div className="count-report-wrapper">
                <div className="count-report-box box-count-report-red">{value}</div>
              </div>
            )}
          </div>
        );
      },
    },
    {
      title: "نام متهم",
      dataIndex: "studentName",
      key: "studentName",
      width: 100,
    },
    {
      title: "نام خانوادگی متهم",
      dataIndex: "studentFamily",
      key: "studentFamily",
      width: 180,
    },
    {
      title: "شماره دانشجویی متهم",
      dataIndex: "studentNumber",
      key: "studentNumber",
      width: 150,
    },
    // todo:[Atefeh]: uncomment when property got ready
    // {
    //   title: "سمت متهم",
    //   dataIndex: "degree",
    //   key: "degree",
    //   width: 130,
    // },
    {
      title: "انتظار",
      dataIndex: "waitingTime",
      key: "waitingTime",
      width: 100,
      render: (value: string) => {
        const diffTime = moment(new Date(), "YYYY/M/D").diff(
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
    },
    {
      title: "تخمین زمان",
      dataIndex: "reviewPeriod",
      key: "reviewPeriod",
      width: 150,
    },
    {
      title: "ارائه دهنده",
      dataIndex: "primaryProvider",
      key: "primaryProvider",
      width: 100,
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      width: 200,
      className: "tables-sticky-column-left",
      render: (value: string) => {
        return (
          <div className="btn-wrapper">
            <span onClick={() => checkClickHandler(value)} className="check-btn">
              رسیدگی
            </span>
            <span onClick={() => rejectClickHandler(value)} className="reject-btn">
              عودت به آماده جلسه
            </span>
          </div>
        );
      },
    },
  ];

  return arr;
};
