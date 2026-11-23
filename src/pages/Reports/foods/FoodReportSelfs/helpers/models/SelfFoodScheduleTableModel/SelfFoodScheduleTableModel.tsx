import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import CustomMealTags from "@pages/Food/_shared/utils/CustomMealTags/CustomMealTags";

import { SelfFoodScheduleTableModelType } from "./@types/@selfFoodScheduleTableModel";

export const SelfFoodScheduleTableModel = ({
  viewClickHandler,
}: SelfFoodScheduleTableModelType) => {
  return [
    {
      title: "تاریخ برنامه غذایی",
      dataIndex: "reserveDate",
      id: "reserveDate",
      width: 120,
      render: (value: string) => {
        return (
          <>
            {dataPlaceHolder({
              data: value,
              isDate: true,
            })}
          </>
        );
      },
    },
    {
      title: "نوع",
      dataIndex: "requestType",
      key: "requestType",
      width: 120,
      render: (value: number) => {
        return (
          <CustomTag
            className="status"
            color={value === 0 ? "green" : value === 1 ? "geekblue" : "purple"}
          >
            {value === 0 ? "دانشجویی" : value === 1 ? "آزاد" : "روزفروش"}
          </CustomTag>
        );
      },
    },
    {
      title: "غذا",
      dataIndex: "productTitle",
      id: "productTitle",
      width: 120,
    },
    {
      title: "وعده",
      dataIndex: "mealName",
      key: "mealName",
      width: 120,
      render: (value: string) => {
        return <CustomMealTags value={value} />;
      },
    },
    {
      title: "تعداد کل غذا",
      dataIndex: "maxCount",
      id: "maxCount",
      width: 120,
    },
    {
      title: "حداکثر سفارش",
      dataIndex: "maxTotalPerPerson",
      id: "maxTotalPerPerson",
      width: 120,
    },
    {
      title: "قیمت (ت)",
      dataIndex: "basePrice",
      id: "basePrice",
      width: 120,
    },
    {
      title: "تخفیف",
      dataIndex: "discount",
      id: "discount",
      width: 120,
    },
    {
      title: "شروع رزرو",
      dataIndex: "startReservationDate",
      key: "startReservationDate",
      width: 150,
      render: (value: string) => {
        return (
          <>{dataPlaceHolder({ data: value, isDate: true, hasSpecialTime: true })}</>
        );
      },
    },
    {
      title: "پایان رزرو",
      dataIndex: "endReservationDate",
      key: "endReservationDate",
      width: 150,
      render: (value: string) => {
        return (
          <>{dataPlaceHolder({ data: value, isDate: true, hasSpecialTime: true })}</>
        );
      },
    },
    {
      title: "وضعیت",
      dataIndex: "active",
      key: "active",
      width: 120,
      render: (value: boolean) => {
        return (
          <CustomTag className="status" color={value ? "green" : "red"}>
            {value ? "فعال" : "غیر فعال"}
          </CustomTag>
        );
      },
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      className: "tables-sticky-column-left",
      fixed: "right" as FixedType,
      width: 75,
      render: (value: number) => {
        return (
          <CustomButton
            type="text"
            onClick={() => viewClickHandler(value)}
            className="view-btn"
          >
            مشاهده
          </CustomButton>
        );
      },
    },
  ];
};
