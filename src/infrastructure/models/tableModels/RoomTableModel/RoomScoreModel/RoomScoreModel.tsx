export const RoomScoreModel = () => [
  {
    title: "عنوان",
    dataIndex: "title",
    key: "title",
    width: 100,
    searchable: true,
  },
  {
    title: "امتیاز",
    dataIndex: "score",
    key: "score",
    width: 75,
    searchable: true,
  },
  {
    title: "",
    dataIndex: "action",
    key: "action",
    width: 75,
    render: () => {
      return <>مشاهده</>;
    },
  },
];
