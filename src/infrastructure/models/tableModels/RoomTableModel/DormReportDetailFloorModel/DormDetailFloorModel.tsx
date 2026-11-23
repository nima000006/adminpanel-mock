import { Button } from "antd";

import { PriceSeparatorWithExtraNumbers } from "../../../../helpers/utils";
import {
  FixedType,
  GeneralTableModelTypeWithSearch,
} from "../../../modules/GeneralTypes/GeneralTypes";
export const DormReportDetailFloorModel = ({
  onClickRoomAssignHandler: onClickRoomAssignHandler,
}: GeneralTableModelTypeWithSearch & {
  onClickRoomAssignHandler: (value: string) => void;
}) => [
  {
    title: "شماره اتاق",
    dataIndex: "id",
    key: "id",
    width: 100,
    searchable: true,
  },
  {
    title: "نام اتاق",
    dataIndex: "name",
    key: "name",
    width: 100,
    searchable: true,
  },
  // {
  //   title: "نوع",
  //   dataIndex: "type",
  //   key: "type",
  //   width: 100,
  //   ...GetColumnSearchProps({
  //     dataIndex: "type",
  //     searchInput,
  //     searchedColumn,
  //     setSearchedColumn,
  //     searchText,
  //     setSearchText,
  //   }),
  // },
  {
    title: "ظرفیت اسمی",
    dataIndex: "allcapacity",
    key: "allcapacity",
    width: 150,
    searchable: true,
  },
  {
    title: "قیمت پایه",
    dataIndex: "price",
    key: "price",
    width: 100,
    searchable: true,
    render: (value: string) => {
      return PriceSeparatorWithExtraNumbers(value);
    },
  },
  // {
  //   title: "نوع زمان‌بندی اتاق",
  //   dataIndex: "timeType",
  //   key: "timeType",
  //   width: 200,
  //   ...GetColumnSearchProps({
  //     dataIndex: "timeType",
  //     searchInput,
  //     searchedColumn,
  //     setSearchedColumn,
  //     searchText,
  //     setSearchText,
  //   }),
  // },
  // {
  //   title: "درجه کیفی",
  //   dataIndex: "grade",
  //   key: "grade",
  //   width: 100,
  //   ...GetColumnSearchProps({
  //     dataIndex: "grade",
  //     searchInput,
  //     searchedColumn,
  //     setSearchedColumn,
  //     searchText,
  //     setSearchText,
  //   }),
  // },
  // {
  //   title: "امکان دربست",
  //   dataIndex: "rental",
  //   key: "rental",
  //   width: 100,
  //   render: () => {
  //     return <Switch />;
  //   },
  // },
  // {
  //   title: "فعال",
  //   dataIndex: "isActive",
  //   key: "isActive",
  //   width: 100,
  //   render: () => {
  //     return <Switch />;
  //   },
  // },
  // {
  //   title: "نمایش",
  //   dataIndex: "isVisible",
  //   key: "isVisible",
  //   width: 100,
  //   render: () => {
  //     return <Switch />;
  //   },
  // },
  {
    title: "ظرفیت مانده فعلی",
    dataIndex: "freecapacity",
    key: "freecapacity",
    width: 160,
  },

  {
    title: "",
    dataIndex: "id",
    key: "id",
    fixed: "right" as FixedType | undefined,
    className: "tables-sticky-column-left",
    width: 100,
    render: (value: string) => {
      return (
        <div className="table-btns-container">
          <Button type="primary" onClick={() => onClickRoomAssignHandler(value)}>
            مشاهده
          </Button>
        </div>
      );
    },
  },
];
