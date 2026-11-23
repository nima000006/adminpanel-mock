import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";

import { ResidenceInfoStepFloorInfoTableModelProps } from "./@types/@residenceInfoStepFloorInfoTableModel";

const ResidenceInfoStepFloorInfoTableModel = ({
  bedAllocationHandler,
  viewRoomHandler,
}: ResidenceInfoStepFloorInfoTableModelProps) => {
  return [
    {
      title: "نام اتاق",
      dataIndex: "title",
      key: "title",
      width: 100,
    },
    {
      title: "تخت‌های فعال",
      dataIndex: "activebed",
      key: "activebed",
      width: 100,
    },
    {
      title: "ظرفیت قابل رزرو",
      dataIndex: "freebed",
      key: "freebed",
      width: 150,
    },
    {
      title: "مبلغ قابل پرداخت (تومان)",
      dataIndex: "price",
      key: "price",
      width: 200,
      render: (value: string) => <>{dataPlaceHolder({ data: value, isPrice: true })}</>,
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      width: 200,
      className: "tables-sticky-column-left",
      render: (value: number) => {
        return (
          <div className="rooms-list-btn-container">
            <CustomButton
              type="text"
              className="text-link"
              onClick={() => bedAllocationHandler(value)}
            >
              تخصیص تخت
            </CustomButton>
            <CustomButton
              type="text"
              className="text-link"
              onClick={() => viewRoomHandler(value)}
            >
              مشاهده
            </CustomButton>
          </div>
        );
      },
    },
  ];
};

export default ResidenceInfoStepFloorInfoTableModel;
