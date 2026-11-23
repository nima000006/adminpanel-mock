import moment from "jalali-moment";

export const AggravationCauseModel = ({
  viewClickHandler,
}: {
  viewClickHandler: (value: number) => void;
}) => {
  return [
    {
      title: "عنوان",
      dataIndex: "type",
      key: "type",
      width: 100,
    },
    {
      title: "تاریخ ایجاد",
      dataIndex: "createDate",
      key: "createDate",
      width: 100,
      render: (upToDate: string) => {
        return moment(upToDate ?? new Date())
          .locale("fa")
          .format("YYYY/M/D");
      },
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      width: 75,
      className: "tables-sticky-column-left",
      fixed: "right",
      render: (value: number) => {
        return (
          <span onClick={() => viewClickHandler(value)} className="view-btn">
            مشاهده
          </span>
        );
      },
    },
  ];
};
