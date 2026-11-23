import moment from "jalali-moment";

import { BasicInfoAccusationAndViolationRecord } from "../../../modules/committee/basicInfo/accusation/accusation";
import { FixedType } from "../../../modules/GeneralTypes/GeneralTypes";

export const AccusationAndViolationsModel = ({
  viewClickHandler,
}: {
  viewClickHandler: (id: number, record?: string) => void;
}) => {
  return [
    {
      title: "عنوان",
      dataIndex: "title",
      key: "title",
      width: 130,
    },
    {
      title: "شماره آیین نامه مربوطه",
      dataIndex: "regulationsId",
      key: "regulationsId",
      width: 150,
    },
    {
      title: "دسته بندی",
      dataIndex: "AssociationInfractionType_title",
      key: "AssociationInfractionType_title",
      width: 100,
    },
    {
      title: "تاریخ ایجاد",
      dataIndex: "createDate",
      key: "createDate",
      width: 100,
      render: (upToDate: string) => {
        return moment(upToDate ?? new Date())
          .locale("fa")
          .format("YYYY/M/D");
      },
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      width: 75,
      className: "tables-sticky-column-left",
      fixed: "right" as FixedType | undefined,
      render: (value: number, record: BasicInfoAccusationAndViolationRecord) => {
        return (
          <span
            onClick={() => viewClickHandler(value, record?.title)}
            className="view-accusation-violations-btn"
          >
            مشاهده
          </span>
        );
      },
    },
  ];
};
