import {
  FixedType,
  GeneralTableModelTypeWithSearch,
} from "../../../modules/GeneralTypes/GeneralTypes";

const GeneralStudentTable = ({
  onStatusHistoryClickHandler,
  onCheckoutModalClick,
}: GeneralTableModelTypeWithSearch & {
  onStatusHistoryClickHandler?: (key: number) => void;
  onCheckoutModalClick?: (key: number) => void;
}) => [
  {
    title: "نام",
    dataIndex: "firstName",
    key: "firstName",
    width: 100,
    searchable: true,
  },
  {
    title: "نام خانوادگی",
    dataIndex: "lastName",
    key: "lastName",
    width: 150,
    searchable: true,
  },
  {
    title: "کد ملی / اتباع",
    dataIndex: "nationalNumber",
    key: "nationalNumber",
    width: 140,
    searchable: true,
  },
  {
    title: "شماره دانشجویی",
    dataIndex: "studentNumber",
    key: "studentNumber",
    width: 150,
    searchable: true,
  },
  // {
  //   title: "تعداد چاپ",
  //   dataIndex: "printCount",
  //   key: "printCount",
  //   width: 100,
  //   ...GetColumnSearchProps({
  //     dataIndex: "printCount",
  //     searchInput,
  //     searchedColumn,
  //     setSearchedColumn,
  //     searchText,
  //     setSearchText,
  //   }),
  // },
  {
    title: "",
    dataIndex: "key",
    key: "key",
    className: "tables-sticky-column-left",
    fixed: "right" as FixedType | undefined,
    width: 150,
    render: (key: number) => {
      return (
        <div className="checkout-container">
          <div
            onClick={() => onCheckoutModalClick?.(key)}
            className="checkout-modal-container"
          >
            مشاهده
          </div>
          <div
            onClick={() => onStatusHistoryClickHandler?.(key)}
            className="checkout-modal-container"
          >
            تاریخچه
          </div>
        </div>
      );
    },
  },
];

export default GeneralStudentTable;
