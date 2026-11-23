import { Button } from "antd";

import { dataPlaceHolder } from "../../../../../helpers/utils";
import { FixedType } from "../../../../modules/GeneralTypes/GeneralTypes";

type BusinessUsersListModelProps = {
  onCheckClickHandler: (id: string) => void;
};
export const InquiryUserInformationListModel = ({
  onCheckClickHandler,
}: BusinessUsersListModelProps) => [
  {
    title: "اتهام",
    dataIndex: "AssociationInfractions_title",
    key: "AssociationInfractions_title",
    width: 100,
  },
  {
    title: "نوع شاکی",
    dataIndex: "AssociationPlaintiffType_title",
    key: "AssociationPlaintiffType_title",
    width: 150,
  },
  {
    title: "وضعیت",
    dataIndex: "AssociationViolationStatus_AssociationStatusCategory_title",
    key: "AssociationViolationStatus_AssociationStatusCategory_title",
    width: 150,
  },
  {
    title: "مرجع تصمیم",
    dataIndex: "AssociationCommitteeType_title",
    key: "AssociationCommitteeType_title",
    width: 150,
  },
  {
    title: "دانشگاه",
    dataIndex: "uniStudent",
    key: "uniStudent",
    width: 150,
  },
  {
    title: "رشته",
    dataIndex: "fieldStudent",
    key: "fieldStudent",
    width: 150,
  },
  {
    title: "مقطع",
    dataIndex: "gradeStudent",
    key: "gradeStudent",
    width: 150,
  },
  {
    title: "اعتبار",
    dataIndex: "validity",
    key: "validity",
    width: 150,
  },
  {
    title: "تاریخ ثبت پرونده",
    dataIndex: "dateFilingCharge",
    key: "dateFilingCharge",
    width: 150,
    render: (date: string) => {
      return dataPlaceHolder({ data: date, isDate: true });
    },
  },
  {
    title: "تاریخ صدور رای",
    dataIndex: "dateVote",
    key: "dateVote",
    width: 150,
  },
  {
    title: "آخرین تغییر وضعیت",
    dataIndex: "dateLastStatusChange",
    key: "dateLastStatusChange",
    width: 150,
    render: (date: string) => {
      return dataPlaceHolder({ data: date, isDate: true });
    },
  },
  {
    title: "",
    dataIndex: "id",
    key: "id",
    fixed: "right" as FixedType,
    className: "tables-sticky-column-left",
    width: 75,
    render: (id: string) => {
      return (
        <div className="table-btns-container">
          <Button
            type="text"
            size="small"
            onClick={() => onCheckClickHandler(id)}
            className="action-btn"
          >
            بررسی
          </Button>
        </div>
      );
    },
  },
];
