export const DailyDiscountModel = ({
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
    title: "از",
    dataIndex: "from",
    key: "from",
    width: 75,
  },
  {
    title: "تا",
    dataIndex: "until",
    key: "until",
    width: 75,
  },
  {
    title: "درصد تخفیف",
    dataIndex: "discountPercent",
    key: "discountPercent",
    width: 100,
  },
  {
    title: "",
    dataIndex: "id",
    key: "id",
    fixed: "right",
    className: "tables-sticky-column-left",
    width: 100,
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
