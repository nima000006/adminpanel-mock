export const TicketsPriorityModel = ({
  correctionClickHandler,
}: {
  correctionClickHandler: React.MouseEventHandler<HTMLSpanElement>;
}) => {
  return [
    {
      title: "نوع",
      dataIndex: "type",
      key: "type",
      width: "30%",
    },
    {
      title: "امتیاز",
      dataIndex: "score",
      key: "score",
      width: "30%",
    },
    {
      title: "",
      dataIndex: "grade",
      key: "grade",
      width: "40%",
      render: (_: string, records: any) => {
        return (
          <span
            onClick={() => correctionClickHandler(records.key)}
            className="correction-link"
          >
            اصلاح
          </span>
        );
      },
    },
  ];
};
