import { Key } from "react";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomRate from "@components/Renderers/CustomRate/CustomRate";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import {
  FixedType,
  GeneralTableModelTypeWithSearch,
} from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { RestaurantType } from "@pages/Food/Reservation/AllReservation/AllReservationOrderSearch/@types/@reservationOrderSearch";

const AllSelfListTableModel = ({
  onCheckoutClickHandler,
  onRemoveSelfClickHandler,
  isDeletedEnabled,
}: GeneralTableModelTypeWithSearch & {
  onCheckoutClickHandler: (value: number, record: string) => void;
  onRemoveSelfClickHandler: (value: number, record: string) => void;
  isDeletedEnabled: boolean;
}): CustomColumnType<RestaurantType>[] => {
  return [
    {
      title: "عنوان",
      dataIndex: "title",
      key: "title",
      width: 130,
      searchable: true,
    },
    {
      title: "واحد دانشگاهی",
      dataIndex: "ownerBranchCodeBranchName",
      key: "ownerBranchCodeBranchName",
      width: 150,
      searchable: true,
    },
    {
      title: "جنسیت",
      dataIndex: "genderType",
      key: "genderType",
      width: 100,
      render: (value: number) => {
        return (
          <CustomTag
            className="gender"
            color={value === 0 ? "purple" : value === 1 ? "volcano" : "success"}
          >
            {value === 0 ? "آقایان" : value === 1 ? "بانوان" : "آقایان و بانوان"}
          </CustomTag>
        );
      },
      filters: [
        {
          text: "آقایان",
          value: 0,
        },
        {
          text: "بانوان",
          value: 1,
        },
        {
          text: "آقایان و بانوان",
          value: 2,
        },
      ],
      onFilter: (value: boolean | Key, record: RestaurantType) => {
        return record?.genderType === value;
      },
      filterSearch: true,
    },
    {
      title: "نام مسئول",
      dataIndex: "managerFirstName",
      key: "managerFirstName",
      width: 150,
    },
    {
      title: "نام خانوادگی مسئول",
      dataIndex: "managerLastName",
      key: "managerLastName",
      width: 150,
    },
    {
      title: "شماره تلفن",
      dataIndex: "phone",
      key: "phone",
      width: 150,
    },
    {
      title: "استان",
      dataIndex: "provinceStateName",
      key: "provinceStateName",
      width: 130,
    },
    {
      title: "شهر",
      dataIndex: "provinceName",
      key: "provinceName",
      width: 130,
    },
    {
      title: "امتیاز",
      dataIndex: "score",
      key: "score",
      width: 150,
      render: (value: number) => {
        return <CustomRate allowHalf disabled defaultValue={value} />;
      },
    },
    {
      title: "وضعیت",
      dataIndex: "active",
      key: "active",
      width: 120,
      render: (value: boolean) => {
        return (
          <CustomTag color={value ? "success" : "error"}>
            {value ? "فعال" : "غیر فعال"}
          </CustomTag>
        );
      },
      filters: [
        {
          text: "فعال",
          value: true,
        },
        {
          text: "غیر فعال",
          value: false,
        },
      ],
      onFilter: (value: boolean | Key, record: RestaurantType) => {
        return record?.active === value;
      },
      filterSearch: true,
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      width: 150,
      className: "tables-sticky-column-left",
      render: (value: number, record: RestaurantType) => {
        return (
          <div className="all-self-table-list-action-container">
            {!isDeletedEnabled && (
              <CustomButton
                type="link"
                onClick={() => onRemoveSelfClickHandler(value, record?.title)}
                danger
              >
                حذف
              </CustomButton>
            )}
            <CustomButton
              type="link"
              onClick={() => onCheckoutClickHandler(value, record?.title)}
            >
              مشاهده
            </CustomButton>
          </div>
        );
      },
    },
  ];
};

export default AllSelfListTableModel;
