import { FixedType } from "../../../modules/GeneralTypes/GeneralTypes";

export const BusinessListModel = ({
  viewClickHandler,
}: {
  viewClickHandler: (value: string) => void;
}) => {
  return [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      width: 30,
    },
    {
      title: "عنوان",
      dataIndex: "title",
      key: "title",
      width: 100,
    },
    {
      title: "ایمیل",
      dataIndex: "email",
      key: "email",
      width: 100,
    },
    {
      title: "نوع",
      dataIndex: "type",
      key: "type",
      width: 100,
    },
    {
      title: "شماره موبایل",
      dataIndex: "mobile",
      key: "mobile",
      width: 120,
    },
    {
      title: "کد ملی مالک",
      dataIndex: "nationalCode",
      key: "nationalCode",
      width: 120,
    },
    {
      title: "نام کاربری",
      dataIndex: "userName",
      key: "userName",
      width: 120,
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      width: 100,
      className: "tables-sticky-column-left",
      fixed: "right" as FixedType | undefined,
      render: (value: string) => {
        return (
          <span onClick={() => viewClickHandler(value)} className="view-business-list">
            مشاهده
          </span>
        );
      },
    },
  ];
};
