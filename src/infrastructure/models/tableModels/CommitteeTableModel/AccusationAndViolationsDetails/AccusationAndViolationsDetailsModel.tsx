import moment from "jalali-moment";

import { FixedType } from "../../../modules/GeneralTypes/GeneralTypes";

export const AccusationAndViolationsDetailsModel = ({
  viewClickHandler,
}: {
  viewClickHandler: (value: number) => void;
}) => {
  return [
    {
      title: "عنوان",
      dataIndex: "title",
      key: "title",
      width: 130,
    },
    {
      title: "اتهام مربوطه",
      dataIndex: "AssociationViiolation_title",
      key: "AssociationViiolation_title",
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
      render: (value: number) => {
        return (
          <span
            onClick={() => viewClickHandler(value)}
            className="view-accusation-violations-btn"
          >
            مشاهده
          </span>
        );
      },
    },
  ];
};
