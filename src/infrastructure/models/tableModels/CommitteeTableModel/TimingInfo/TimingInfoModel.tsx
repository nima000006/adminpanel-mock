import { FixedType } from "../../../modules/GeneralTypes/GeneralTypes";

export const TimingInfoModel = ({
  viewClickHandler,
}: {
  viewClickHandler: (value: number) => void;
}) => {
  return [
    {
      title: "عنوان",
      dataIndex: "title",
      key: "title",
      width: 100,
    },
    {
      title: "میزان مدت به دقیقه",
      dataIndex: "time",
      key: "time",
      width: 150,
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
