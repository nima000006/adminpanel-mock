import moment from "jalali-moment";

import { BasicInfoAccusationCategoriesInfoRecordsType } from "../../../modules/committee/basicInfo/accusationCategories/accusationCategories";
import { FixedType } from "../../../modules/GeneralTypes/GeneralTypes";

export const AccusationCategoriesModel = ({
  viewClickHandler,
}: {
  viewClickHandler: (value: number, type: string) => void;
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
      dataIndex: "sourceId",
      key: "sourceId",
      width: 150,
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
      render: (value: number, records: BasicInfoAccusationCategoriesInfoRecordsType) => {
        return (
          <span
            onClick={() => viewClickHandler(value, records?.title)}
            className="view-accusation-categories-btn"
          >
            مشاهده
          </span>
        );
      },
    },
  ];
};
