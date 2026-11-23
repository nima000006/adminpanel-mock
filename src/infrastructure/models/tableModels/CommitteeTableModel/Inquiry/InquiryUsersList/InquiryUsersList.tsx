import { Button } from "antd";

import { CommitteeInquiryUsersListModelType } from "../../../../modules/committee/history/individualInquiry/individualInquiry";
import { FixedType } from "../../../../modules/GeneralTypes/GeneralTypes";

type BusinessUsersListModelProps = {
  onWatchClickHandler: (id: string) => void;
};
export const CommitteeInquiryUsersListModel = ({
  onWatchClickHandler,
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
    fixed: "right" as FixedType,
    className: "tables-sticky-column-left",
    width: 75,
    render: (_: number, records: CommitteeInquiryUsersListModelType) => {
      return (
        <div className="table-btns-container">
          <Button
            type="text"
            size="small"
            onClick={() => onWatchClickHandler(records?.nationalCode)}
            className="action-btn"
          >
            مشاهده
          </Button>
        </div>
      );
    },
  },
];
