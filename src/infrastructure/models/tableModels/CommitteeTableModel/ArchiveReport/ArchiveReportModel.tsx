import moment from "jalali-moment";

import { FixedType } from "../../../modules/GeneralTypes/GeneralTypes";

export const ArchiveReportModel = ({
  viewArchiveHandler,
}: {
  viewArchiveHandler: (value: string, year: string) => void;
}) => {
  return [
    {
      title: "",
      dataIndex: "key",
      key: "key",
      width: 50,
    },
    {
      title: "سال آرشیو",
      dataIndex: "yearArchive",
      key: "yearArchive",
      width: 130,
      searchable: true,
    },
    {
      title: "تعداد کل گزارشات",
      dataIndex: "countAllReport",
      key: "countAllReport",
      width: 200,
    },
    {
      title: "تعداد اتهام",
      dataIndex: "countCharge",
      key: "countCharge",
      width: 100,
    },
    {
      title: "تعداد بسته شده",
      dataIndex: "countClosed",
      key: "countClosed",
      width: 180,
    },
    {
      title: "از تاریخ",
      dataIndex: "from",
      key: "from",
      width: 120,
      render: (from: string) => {
        return moment(from ?? new Date())
          .locale("fa")
          .format("YYYY/M/D");
      },
    },
    {
      title: "تا تاریخ",
      dataIndex: "upToDate",
      key: "upToDate",
      width: 130,
      render: (upToDate: string) => {
        return moment(upToDate ?? new Date())
          .locale("fa")
          .format("YYYY/M/D");
      },
    },
    {
      title: "",
      dataIndex: "key",
      key: "key",
      fixed: "right" as FixedType | undefined,
      width: 100,
      className: "tables-sticky-column-left",
      render: (value: string, records: any) => {
        return (
          <span
            onClick={() => viewArchiveHandler(value, records.yearArchive)}
            className="view-btn"
          >
            مشاهده آرشیو
          </span>
        );
      },
    },
  ];
};
