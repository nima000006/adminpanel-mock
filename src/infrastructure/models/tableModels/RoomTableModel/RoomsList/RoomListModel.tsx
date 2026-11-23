import { Button, Switch } from "antd";

import { RoomListModelProps, RoomListRecords } from "./@types/@roomListModel";
import { FixedType } from "../../../modules/GeneralTypes/GeneralTypes";

import "./_roomListModel.scss";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";

export const RoomListModel = ({
  roomClickHandler,
  roomEditClickHandler,
  listFactorClickHandler,
}: RoomListModelProps): CustomColumnType<RoomListRecords>[] => [
  {
    title: "نام",
    dataIndex: "name",
    key: "name",
    width: 270,
    searchable: true,
    // ...GetColumnSearchProps({
    //   dataIndex: "name",
    //   searchInput,
    //   searchedColumn,
    //   setSearchedColumn,
    //   searchText,
    //   setSearchText,
    // }),
  },
  {
    title: "نوع مدیریت",
    dataIndex: "managertype",
    key: "managertype",
    searchable: true,
    width: 120,
  },
  {
    title: "ظرفیت اسمی",
    dataIndex: "capacity",
    key: "capacity",
    width: 100,
  },
  {
    title: "کد واحد دانشگاهی",
    dataIndex: "b_Id",
    key: "b_Id",
    width: 150,
    searchable: true,
  },
  //todo [saman]: below code is commented out as there is no api for it
  // {
  //   title: "درجه کیفی",
  //   dataIndex: "level",
  //   key: "level",
  //   width: 130,
  //   ...GetColumnSearchProps({
  //     dataIndex: "level",
  //     searchInput,
  //     searchedColumn,
  //     setSearchedColumn,
  //     searchText,
  //     setSearchText,
  //   }),
  // },
  // {
  //   title: "جنسیت",
  //   dataIndex: "typeDormitory",
  //   key: "typeDormitory",
  //   width: 100,
  //   ...GetColumnSearchProps({
  //     dataIndex: "typeDormitory",
  //     searchInput,
  //     searchedColumn,
  //     setSearchedColumn,
  //     searchText,
  //     setSearchText,
  //   }),
  //   render: (value: any[]) => {
  //     if (value && value.length > 0) {
  //       return (
  //         <div className="gender-container">
  //           {value.map((item: any, index) => (
  //             <span key={index} className="gender-item">
  //               {item.name}
  //             </span>
  //           ))}
  //         </div>
  //       );
  //     }
  //     return <></>;
  //   },
  // },
  {
    title: "فعال",
    dataIndex: "active",
    key: "active",
    width: 75,
    render: (value: boolean) => {
      return <Switch defaultChecked={value} className="dorm-switch" disabled={true} />;
    },
  },
  //todo [saman]: below code is commented out as there is no api for it
  // {
  //   title: "ظرفیت مانده فعلی",
  //   dataIndex: "freecapacity",
  //   key: "freecapacity",
  //   width: 150,
  //   ...GetColumnSearchProps({
  //     dataIndex: "freecapacity",
  //     searchInput,
  //     searchedColumn,
  //     setSearchedColumn,
  //     searchText,
  //     setSearchText,
  //   }),
  // },
  {
    title: "",
    dataIndex: "action",
    key: "action",
    fixed: "right" as FixedType,
    className: "tables-sticky-column-left",
    width: 260,
    render: (_: string, records: RoomListRecords) => {
      return (
        <div className="dorm-main-table-btns-container">
          <Button
            type="default"
            size="small"
            onClick={() => roomEditClickHandler(records?.id)}
            className="dorm-edit-btn"
          >
            ویرایش
          </Button>
          <Button
            type="primary"
            size="small"
            onClick={() => roomClickHandler(records?.id)}
            className="dorm-action-btn"
          >
            مشاهده
          </Button>
          <Button
            type="primary"
            size="small"
            onClick={() => listFactorClickHandler(records?.id, records?.name)}
          >
            لیست فاکتور ها
          </Button>
        </div>
      );
    },
  },
];
