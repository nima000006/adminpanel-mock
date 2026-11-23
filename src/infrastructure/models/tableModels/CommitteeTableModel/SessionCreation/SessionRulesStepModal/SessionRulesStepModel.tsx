import { Button } from "antd";
import moment from "jalali-moment";

import { dataPlaceHolder } from "../../../../../helpers/utils";
import "./_sessionRulesStepModel.scss";
import { FixedType } from "../../../../modules/GeneralTypes/GeneralTypes";

export const SessionRulesStepModel = ({
  deleteHandler,
  from,
}: {
  deleteHandler?: (id: number) => void;
  from?: string;
}) => {
  return [
    {
      title: "نوع",
      dataIndex: "AssociationInfractionType_title",
      key: "AssociationInfractionType_title",
      width: 150,
    },
    {
      title: "اتهام",
      dataIndex: "AssociationInfractions_title",
      key: "AssociationInfractions_title",
      width: 250,
    },
    {
      title: "اولویت",
      dataIndex: "AssociationTblPriiority_title",
      key: "AssociationTblPriiority_title",
      width: 100,
      render: (value: string) => {
        return (
          <span
            className={`priority-text ${
              value === "پایین"
                ? "priority-green"
                : value === "متوسط"
                  ? "priority-orange"
                  : "priority-red"
            }`}
          >
            {value}
          </span>
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
      width: 150,
    },
    {
      title: "شماره دانشجویی متهم",
      dataIndex: "studentNumber",
      key: "studentNumber",
      width: 150,
    },
    {
      title: "شماره ملی متهم",
      dataIndex: "nationalCode",
      key: "nationalCode",
      width: 150,
    },
    // todo:[Atefeh]: uncomment when property got ready
    // {
    //   title: "سمت متهم",
    //   dataIndex: "accusedLevel",
    //   key: "accusedLevel",
    //   width: 100,
    // },
    {
      title: "تاریخ ثبت",
      dataIndex: "createDate",
      key: "createDate",
      width: 100,
      render: (value: string) => {
        return (
          <span>
            {dataPlaceHolder({
              data: value,
              isDate: true,
              customDateFormat: "YYYY/M/D",
            })}
          </span>
        );
      },
    },
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
        return (
          <span
            className={`waiting-text ${
              diffTime < 3
                ? "waiting-green"
                : diffTime >= 3 && diffTime < 6
                  ? "waiting-orange"
                  : "waiting-red"
            }`}
          >
            {diffTime}
          </span>
        );
      },
    },
    {
      title: "نوع شاکی",
      dataIndex: "AssociationPlaintiffType_title",
      key: "AssociationPlaintiffType_title",
      width: 100,
    },
    ...(from !== "addNewSessionRule" && deleteHandler
      ? [
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
            width: 150,
          },
          {
            title: "",
            dataIndex: "id",
            key: "id",
            width: 100,
            fixed: "right" as FixedType,
            className: "tables-sticky-column-left",
            render: (value: number) => {
              return (
                <Button
                  danger
                  type="text"
                  className="session-rule-btn"
                  onClick={() => deleteHandler?.(value)}
                  disabled={from === "finalCheck" ? true : false}
                >
                  حذف
                </Button>
              );
            },
          },
        ]
      : []),
  ];
};
