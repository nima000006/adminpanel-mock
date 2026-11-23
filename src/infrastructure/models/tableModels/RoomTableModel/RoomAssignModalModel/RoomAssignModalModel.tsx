import { PriceSeparatorWithExtraNumbers } from "../../../../helpers/utils";
export const RoomAssignModalModelColumn = () => [
  {
    title: "شماره اتاق",
    dataIndex: "id",
    key: "id",
    width: 100,
    searchable: true,
  },
  {
    title: "نام",
    dataIndex: "name",
    key: "name",
    width: 150,
    searchable: true,
  },
  // {
  //   title: "نوع",
  //   dataIndex: "type",
  //   key: "type",
  //   width: 70,
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
  {
    title: "ظرفیت اسمی",
    dataIndex: "allcapacity",
    key: "allcapacity",
    width: 120,
    searchable: true,
  },
  {
    title: "ظرفیت مانده فعلی",
    dataIndex: "freecapacity",
    key: "freecapacity",
    width: 140,
    searchable: true,
  },
  {
    title: "قیمت پایه (ریال)",
    dataIndex: "price",
    key: "price",
    width: 140,
    render: (value: string) => {
      return PriceSeparatorWithExtraNumbers(value);
    },
  },
  // {
  //   title: "زمانبندی",
  //   dataIndex: "timeType",
  //   key: "timeType",
  //   width: 120,
  //   ...GetColumnSearchProps({
  //     dataIndex: "timeType",
  //     searchInput,
  //     searchedColumn,
  //     setSearchedColumn,
  //     searchText,
  //     setSearchText,
  //   }),
  // },
];
