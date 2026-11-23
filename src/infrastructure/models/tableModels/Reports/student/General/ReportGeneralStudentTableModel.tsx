import {
  FixedType,
  GeneralTableModelTypeWithSearch,
} from "../../../../modules/GeneralTypes/GeneralTypes";

const ReportGeneralStudentTableModel = ({
  onStatusHistoryClickHandler,
}: GeneralTableModelTypeWithSearch & {
  onStatusHistoryClickHandler?: (key: number) => void;
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

  {
    title: "",
    dataIndex: "key",
    key: "key",
    className: "tables-sticky-column-left",
    fixed: "right" as FixedType | undefined,
    width: 100,
    render: (key: number) => {
      return (
        <div className="checkout-container">
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

export default ReportGeneralStudentTableModel;
