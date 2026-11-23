import moment from "jalali-moment";

import { FixedType } from "../../../modules/GeneralTypes/GeneralTypes";

export const GeneralPunishmentModel = ({
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
      title: "کمیته بدوی",
      dataIndex: "selectablePrimitive",
      key: "selectablePrimitive",
      width: 100,
      render: (value: string) => {
        return (
          <>
            {value ? (
              <div className="status-container">
                <span className="active-status"></span>
                <span className="status-label">فعال</span>
              </div>
            ) : (
              <div className="status-container">
                <span className="inactive-status"></span>
                <span className="status-label">غیر فعال</span>
              </div>
            )}
          </>
        );
      },
    },
    {
      title: "کمیته تجدید نظر",
      dataIndex: "selectableAppeal",
      key: "selectableAppeal",
      width: 120,
      render: (value: boolean) => {
        return (
          <>
            {value ? (
              <div className="status-container">
                <span className="active-status"></span>
                <span className="status-label">فعال</span>
              </div>
            ) : (
              <div className="status-container">
                <span className="inactive-status"></span>
                <span className="status-label">غیر فعال</span>
              </div>
            )}
          </>
        );
      },
    },
    {
      title: "کمیته مرکزی",
      dataIndex: "selectableCentral",
      key: "selectableCentral",
      width: 100,
      render: (value: boolean) => {
        return (
          <>
            {value ? (
              <div className="status-container">
                <span className="active-status"></span>
                <span className="status-label">فعال</span>
              </div>
            ) : (
              <div className="status-container">
                <span className="inactive-status"></span>
                <span className="status-label">غیر فعال</span>
              </div>
            )}
          </>
        );
      },
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
          <span onClick={() => viewClickHandler(value)} className="view-btn">
            مشاهده
          </span>
        );
      },
    },
  ];
};
