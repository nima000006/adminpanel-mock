import "./_businessStructureModel.scss";
export const BusinessStructureModel = ({
  onCheckoutModalClick,
}: {
  onCheckoutModalClick: React.MouseEventHandler<HTMLSpanElement>;
}) => [
  {
    title: "عنوان",
    dataIndex: "title",
    key: "title",
    width: 100,
  },
  {
    title: "واحد ارشد",
    dataIndex: "unitAbove",
    key: "unitAbove",
    width: 100,
  },
  {
    title: "توضیحات",
    dataIndex: "description",
    key: "description",
    width: 100,
  },
  {
    title: "",
    dataIndex: "grade",
    key: "grade",
    width: 100,
    render: () => {
      return (
        <div className="operation-business-structure-wrapper">
          <span className="change-btn">تغییر</span>
          <span className="delete-btn">حذف</span>
        </div>
      );
    },
  },
  {
    title: "",
    dataIndex: "grade",
    key: "grade",
    width: 100,
    className: "tables-sticky-column-left",
    fixed: "right",
    render: (_: string, records: any) => {
      return (
        <span
          onClick={() => onCheckoutModalClick(records.key)}
          className="view-graph-business-structure"
        >
          مشاهده نمودار
        </span>
      );
    },
  },
];
