import { FixedType } from "../../../modules/GeneralTypes/GeneralTypes";

export const CommitteeCheckInquiryTableModel = ({
  checkClickHandler,
}: {
  checkClickHandler: (nationalNo: string) => void;
}) => {
  return [
    {
      title: "نام",
      dataIndex: "firstName",
      key: "firstName",
      width: 100,
    },
    {
      title: "نام خانوادگی",
      dataIndex: "lastName",
      key: "lastName",
      width: 120,
    },
    {
      title: "کدملی/اتباع",
      dataIndex: "nationalCode",
      key: "nationalCode",
      width: 120,
    },
    {
      title: "شماره دانشجویی/ پرسنلی",
      dataIndex: "studentNumber",
      key: "studentNumber",
      width: 200,
    },
    {
      title: "شماره موبایل",
      dataIndex: "mobile",
      key: "mobile",
      width: 120,
    },
    {
      title: "",
      dataIndex: "nationalCode",
      key: "nationalCode",
      fixed: "right" as FixedType,
      width: 100,
      className: "tables-sticky-column-left",
      render: (value: string) => {
        return (
          <span onClick={() => checkClickHandler(value)} className="check-btn">
            بررسی
          </span>
        );
      },
    },
  ];
};
