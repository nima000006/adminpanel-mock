import { Button } from "antd";

import { BusinessUsersListModelProps } from "./@types/@businessUsersListModel";
import { SingleUserInUserList } from "../../../../../pages/Notification/NotificationUniversitySelector/helper/components/NotificationSingle/@types/@notificationSingle";
import { FixedType } from "../../../modules/GeneralTypes/GeneralTypes";
import "./_businessUsersListModel.scss";

export const BusinessUsersListModel = ({
  onRemoveMobileClickHandler,
  onChangeStatusClickHandler,
  onInquiryClickHandler,
}: BusinessUsersListModelProps) => [
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
    title: "کدملی/کداتباع",
    dataIndex: "nationalCode",
    key: "nationalCode",
    width: 130,
    searchable: true,
  },
  {
    title: "شماره دانشجویی",
    dataIndex: "studentNumber",
    key: "studentNumber",
    width: 145,
    searchable: true,
  },
  {
    title: "شماره موبایل",
    dataIndex: "mobile",
    key: "mobile",
    width: 150,
    searchable: true,
  },
  // {
  //   title: "وضعیت ویژه",
  //   dataIndex: "",
  //   key: "",
  //   width: 100,
  // },
  // {
  //   title: "تاریخ ثبت نام",
  //   dataIndex: "",
  //   key: "",
  //   width: 100,
  // },
  // {
  //   title: "آخرین ورود",
  //   dataIndex: "",
  //   key: "",
  //   width: 100,
  // },
  {
    title: "مقطع",
    dataIndex: "levelName",
    key: "levelName",
    width: 125,
  },
  {
    title: "رشته",
    dataIndex: "fieldName",
    key: "fieldName",
    width: 125,
  },
  {
    title: "سال ورود",
    dataIndex: "enTerm",
    key: "enTerm",
    width: 100,
  },
  {
    title: "",
    dataIndex: "id",
    key: "id",
    fixed: "right" as FixedType | undefined,
    className: "tables-sticky-column-left",
    width: 360,
    render: (_: number, record: SingleUserInUserList) => {
      return (
        <div className="business-main-table-btns-container">
          <Button
            type="default"
            size="small"
            onClick={() => onChangeStatusClickHandler(record)}
            className="dorm-edit-btn"
          >
            تغییر مشخصات
          </Button>
          <Button
            type="primary"
            size="small"
            onClick={() => onInquiryClickHandler(record)}
            className="inquiry-action-btn"
          >
            استعلام مجدد
          </Button>
          <Button
            type="primary"
            size="small"
            onClick={() => onRemoveMobileClickHandler(record?.userName)}
            className="dorm-action-btn"
            danger
            disabled={!record?.mobile}
          >
            حذف شماره موبایل
          </Button>
        </div>
      );
    },
  },
];
