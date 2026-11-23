import moment from "jalali-moment";

import { FixedType } from "../../../modules/GeneralTypes/GeneralTypes";

export const RulesAndLawsModel = ({
  viewClickHandler,
}: {
  viewClickHandler: (value: string) => void;
}) => {
  return [
    {
      title: "عنوان",
      dataIndex: "title",
      key: "title",
      width: 200,
    },
    {
      title: "شماره آیین نامه",
      dataIndex: "number",
      key: "number",
      width: 120,
    },
    {
      title: "تاریخ ایجاد",
      dataIndex: "date",
      key: "date",
      width: 100,
      render: (upToDate: string) => {
        return moment(upToDate ?? new Date())
          .locale("fa")
          .format("YYYY/M/D");
      },
    },
    {
      title: "تاریخ آخرین تغییر",
      dataIndex: "lastModifiedDate",
      key: "lastModifiedDate",
      width: 120,
      render: (upToDate: string) => {
        return moment(upToDate ?? new Date())
          .locale("fa")
          .format("YYYY/M/D");
      },
    },
    {
      title: "پیوست",
      dataIndex: "attach",
      key: "attach",
      width: 70,
      render: () => {
        return (
          <>
            {/* {attach ? (
              <a
                href="attach"
                // onClick={() => attachmentHandler(records.key)}
                className="download-btn"
              >
                دانلود
              </a>
            ) : ( */}
            ندارد
            {/* )} */}
          </>
        );
      },
    },

    {
      title: "",
      dataIndex: "id",
      key: "id",
      width: 75,
      className: "tables-sticky-column-left",
      fixed: "right" as FixedType | undefined,
      render: (value: string) => {
        return (
          <span onClick={() => viewClickHandler(value)} className="view-rules-and-laws">
            مشاهده
          </span>
        );
      },
    },
  ];
};
