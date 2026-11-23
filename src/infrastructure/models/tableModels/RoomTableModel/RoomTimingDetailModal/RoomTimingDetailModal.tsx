export const RoomTimingDetailModal = ({ editClickHandler, deleteClickHandler }: any) => [
  {
    title: "#",
    dataIndex: "key",
    rowScope: "row",
    width: 50,
  },
  {
    title: "شروع",
    dataIndex: "startDate",
    key: "startDate",
    width: 100,
  },
  {
    title: "پایان",
    dataIndex: "endDate",
    key: "endDate",
    width: 100,
  },
  {
    title: "توضیحات",
    dataIndex: "description",
    key: "description",
    width: 100,
    searchable: true,
  },
  {
    title: "",
    dataIndex: "id",
    key: "id",
    width: 120,
    fixed: "right",
    className: "tables-sticky-column-left",
    render: (value: string) => {
      return (
        <div className="action-container">
          <div
            onClick={() => editClickHandler(value)}
            className="action-text action-text-primary"
          >
            تغییر
          </div>
          <div
            onClick={() => deleteClickHandler(value)}
            className="action-text action-text-danger"
          >
            حذف
          </div>
        </div>
      );
    },
  },
];
