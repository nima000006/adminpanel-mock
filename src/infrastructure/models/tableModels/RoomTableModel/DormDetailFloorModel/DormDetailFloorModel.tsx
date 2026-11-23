import { Button } from "antd";

import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { GetColumnSearchProps } from "@infra/helpers/TableHelpers/TableHelpers";

import { PriceSeparatorWithExtraNumbers } from "../../../../helpers/utils";
import {
  FixedType,
  GeneralTableModelTypeWithSearch,
} from "../../../modules/GeneralTypes/GeneralTypes";
export const DormDetailFloorModel = ({
  floorId,
  dormId,
  onClickRoomDetailHandler: onClickRoomDetailHandler,
  onClickRoomAssignHandler: onClickRoomAssignHandler,
  searchInput,
  searchedColumn,
  setSearchedColumn,
  searchText,
  setSearchText,
}: GeneralTableModelTypeWithSearch & {
  floorId: number;
  dormId: string;
  onClickRoomDetailHandler: (roomId: number, floorId: number, dormId: string) => void;
  onClickRoomAssignHandler: (id: number) => void;
  searchInput: any;
  searchedColumn: any;
  setSearchedColumn: any;
  searchText: any;
  setSearchText: any;
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
    width: 160,
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
    width: 110,
    searchable: true,
  },
  {
    title: "قیمت پایه",
    dataIndex: "price",
    key: "price",
    width: 100,
    ...GetColumnSearchProps({
      dataIndex: "price",
      searchInput,
      searchedColumn,
      setSearchedColumn,
      searchText,
      setSearchText,
    }),
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
    width: 130,
  },
  {
    title: "وضعیت اتاق",
    dataIndex: "isActive",
    key: "isActive",
    width: 100,
    render: (value: boolean) => {
      if (value) {
        return <CustomTag color={"green"}>فعال</CustomTag>;
      } else {
        return <CustomTag color={"red"}>غیر فعال</CustomTag>;
      }
    },
  },

  {
    title: "",
    dataIndex: "actions",
    key: "actions",
    fixed: "right" as FixedType,
    className: "tables-sticky-column-left",
    width: 170,
    render: (_: number, records: any) => {
      return (
        <div className="table-btns-container">
          <Button type="primary" onClick={() => onClickRoomAssignHandler(records.id)}>
            مشاهده
          </Button>
          <Button
            type="link"
            onClick={() => onClickRoomDetailHandler(records.id, floorId, dormId)}
          >
            ویرایش
          </Button>
        </div>
      );
    },
  },
];
