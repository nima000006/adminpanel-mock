import { Button, Switch } from "antd";

import { ListOfDormsData } from "../../../../../pages/Reports/dorms/DormsReportList/@types/@dormsReportList";
import {
  FixedType,
  GeneralTableModelTypeWithSearch,
} from "../../../modules/GeneralTypes/GeneralTypes";
import "./_roomListModel.scss";

export const ReportRoomListModel = ({
  roomClickHandler,
}: GeneralTableModelTypeWithSearch & { roomClickHandler: (id: number) => void }) => [
  {
    title: "نام",
    dataIndex: "name",
    key: "name",
    width: 200,
    searchable: true,
  },
  {
    title: "نوع مدیریت",
    dataIndex: "managertype",
    key: "managertype",
    width: 120,
    searchable: true,
  },
  {
    title: "ظرفیت اسمی",
    dataIndex: "capacity",
    key: "capacity",
    width: 100,
  },
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
    fixed: "right" as FixedType | undefined,
    className: "tables-sticky-column-left",
    width: 100,
    render: (_: string, records: ListOfDormsData) => {
      return (
        <div className="dorm-main-table-btns-container">
          <Button
            type="primary"
            size="small"
            onClick={() => roomClickHandler(records?.id)}
            className="dorm-action-btn"
          >
            مشاهده
          </Button>
        </div>
      );
    },
  },
];
