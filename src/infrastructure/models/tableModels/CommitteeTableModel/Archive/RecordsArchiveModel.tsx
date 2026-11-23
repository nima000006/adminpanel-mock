import { Progress } from "antd";

import { dataPlaceHolder } from "../../../../helpers/utils";
import { FixedType } from "../../../modules/GeneralTypes/GeneralTypes";

export const RecordsArchiveModel = ({
  continueClickHandler,
  viewClickHandler,
}: {
  continueClickHandler: (value: string, status: string) => void;
  viewClickHandler: (value: string) => void;
}) => {
  return [
    {
      title: "شماره پرونده",
      dataIndex: "id",
      key: "id",
      width: 130,
    },
    {
      title: "نوع شاکی",
      dataIndex: "AssociationPlaintiffType_title",
      key: "AssociationPlaintiffType_title",
      width: 130,
    },
    {
      title: "نام شاکی",
      dataIndex: "reporterName",
      key: "reporterName",
      width: 130,
    },
    {
      title: "نام خانوادگی شاکی",
      dataIndex: "reporterFamily",
      key: "reporterFamily",
      width: 150,
    },
    {
      title: "نام متهم",
      dataIndex: "studentName",
      key: "studentName",
      width: 180,
    },
    {
      title: "نام خانوادگی متهم",
      dataIndex: "studentFamily",
      key: "studentFamily",
      width: 150,
    },
    {
      title: "مرحله آخر",
      dataIndex: "recordsStage",
      key: "recordsStage",
      width: 150,
      render: (value: string) => {
        return (
          <Progress
            percent={Number(value) * 25}
            steps={4}
            format={() => `${value ? value : 0}`}
            className="progress-bar-percent-text"
          />
        );
      },
    },
    {
      title: "آخرین تغییر وضعیت",
      dataIndex: "dateLastStatusChange",
      key: "dateLastStatusChange",
      width: 150,
      render: (registerDate: string) => {
        return dataPlaceHolder({
          data: registerDate,
          isDate: true,
          customDateFormat: "HH:mm - YYYY/M/D",
        });
      },
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      className: "tables-sticky-column-left",
      width: 120,
      render: (value: string, records: any) => {
        return records?.recordsStage !== "4" ? (
          <span
            onClick={() => continueClickHandler(value, records?.recordsStage)}
            className="action-btn"
          >
            ادامه
          </span>
        ) : (
          <span className="action-btn" onClick={() => viewClickHandler(value)}>
            مشاهده
          </span>
        );
      },
    },
  ];
};
