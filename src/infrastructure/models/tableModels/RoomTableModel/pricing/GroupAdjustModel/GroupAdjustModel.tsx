export const GroupAdjustModel = ({
  changeHandler,
  deleteHandler,
}: {
  changeHandler: React.MouseEventHandler<HTMLSpanElement>;
  deleteHandler: React.MouseEventHandler<HTMLSpanElement>;
}) => [
  {
    title: "#",
    dataIndex: "id",
    key: "id",
    width: 20,
  },
  {
    title: "مقطع",
    dataIndex: "section",
    key: "section",
    width: 100,
  },
  {
    title: "ملیت",
    dataIndex: "Nationality",
    key: "Nationality",
    width: 100,
  },
  {
    title: "دین",
    dataIndex: "religion",
    key: "religion",
    width: 100,
  },
  {
    title: "درصد کاهش",
    dataIndex: "PercentageReduction",
    key: "PercentageReduction",
    width: 100,
  },
  {
    title: "",
    dataIndex: "id",
    key: "id",
    width: 100,
    fixed: "right",
    className: "tables-sticky-column-left",
    render: () => {
      return (
        <div className="operation-business-structure-wrapper">
          <span className="change-btn" onClick={changeHandler}>
            تغییر
          </span>
          <span className="delete-btn" onClick={deleteHandler}>
            حذف
          </span>
        </div>
      );
    },
  },
];
