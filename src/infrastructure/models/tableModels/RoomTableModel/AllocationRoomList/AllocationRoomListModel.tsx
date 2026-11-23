import "./_allocationRoomListModel.scss";

export const AllocationRoomListModel = () => [
  // {
  //   title: "شماره تخت",
  //   dataIndex: "bedNumber",
  //   key: "bedNumber",
  //   width: 100,
  // },
  {
    title: "نام",
    dataIndex: "fName",
    key: "fName",
    width: 100,
  },
  {
    title: "نام خانوادگی",
    dataIndex: "lName",
    key: "lName",
    width: 100,
  },
  {
    title: "کد ملی / کد اتباع",
    dataIndex: "userName",
    key: "userName",
    width: 100,
  },
  // {
  //   title: "مقطع",
  //   dataIndex: "degree",
  //   key: "degree",
  //   width: 100,
  // },
  // {
  //   title: "شروع اسکان",
  //   dataIndex: "startDate",
  //   key: "startDate",
  //   width: 100,
  // },
  // {
  //   title: "پایان اسکان",
  //   dataIndex: "endDate",
  //   key: "endDate",
  //   width: 100,
  // },
  // {
  //   title: "مجاز",
  //   dataIndex: "access",
  //   key: "access",
  //   width: 100,
  //   render: (_: any, records: any) => {
  //     return <Switch defaultChecked={records?.access} />;
  //   },
  // },
  // {
  //   title: "ورودی",
  //   dataIndex: "entryYear",
  //   key: "entryYear",
  //   width: 100,
  // },
  // {
  //   title: "وضعیت ویژه",
  //   dataIndex: "specialSituation",
  //   key: "specialSituation",
  //   width: 100,
  // },
  // {
  //   title: "مذهب",
  //   dataIndex: "religion",
  //   key: "religion",
  //   width: 100,
  // },
  // {
  //   title: "رشته",
  //   dataIndex: "filed",
  //   key: "filed",
  //   width: 100,
  // },
  // {
  //   title: "",
  //   dataIndex: "action",
  //   key: "action",
  //   width: 175,
  //   fixed: "right",
  //   className: "tables-sticky-column-left",
  //   render: (_: string, records: any) => {
  //     return (
  //       <div className="allocation-room-action-btns-container">
  //         <Button
  //           type="text"
  //           size="small"
  //           onClick={() => roomClickHandler(records?.key)}
  //           className="text-primary"
  //         >
  //           تمدید
  //         </Button>
  //         <Button
  //           type="text"
  //           size="small"
  //           onClick={() => roomClickHandler(records?.key)}
  //           className="text-dangerous"
  //         >
  //           لغو
  //         </Button>
  //         <Button
  //           type="text"
  //           size="small"
  //           onClick={() => roomClickHandler(records?.key)}
  //           className="text-primary"
  //         >
  //           مشاهده
  //         </Button>
  //       </div>
  //     );
  //   },
  // },
];
