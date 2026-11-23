export const PricingBasicDetailModel = ({
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
    width: 50,
  },
  {
    title: "درجه کیفی اتاق",
    dataIndex: "qualityDegreeRoom",
    key: "qualityDegreeRoom",
    width: 120,
  },
  {
    title: "ظرفیت اتاق",
    dataIndex: "roomCapacity",
    key: "roomCapacity",
    width: 100,
  },
  {
    title: "قیمت پایه روزانه",
    dataIndex: "dailyBasicPrice",
    key: "dailyBasicPrice",
    width: 120,
  },
  {
    title: "درصد کاهش ماهانه (قیمت نهایی)",
    dataIndex: "MonthlyPercentage",
    key: "MonthlyPercentage",
    width: 215,
  },
  {
    title: "  درصد کاهش ترمیک (قیمت نهایی)",
    dataIndex: "thermalPercentage",
    key: "thermalPercentage",
    width: 215,
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
