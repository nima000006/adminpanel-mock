import { FixTypeLater } from "react-redux";

type Records = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  StudentNumber: string;
  preliminaryMeeting: number;
  id: number;
  presence: boolean;
  agenda: number;
};

export const GuestsModel = ({
  absentClickHandler,
}: {
  absentClickHandler: (value: string) => void;
}) => {
  const arr = [
    {
      title: "نام ",
      dataIndex: "firstName",
      key: "firstName",
      width: 100,
    },
    {
      title: "نام خانوادگی ",
      dataIndex: "lastName",
      key: "lastName",
      width: 100,
    },
    //todo:[Atefeh]: uncomment when the field got ready in the API
    // {
    //   title: "سمت ",
    //   dataIndex: "degree",
    //   key: "degree",
    //   width: 130,
    // },
    {
      title: "شماره دانشجویی ",
      dataIndex: "StudentNumber",
      key: "StudentNumber",
      width: 100,
    },
    {
      title: "شماره موبایل",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: 100,
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixTypeLater,
      width: 100,
      className: "tables-sticky-column-left",
      render: (value: string, records: Records) => {
        return (
          <div className="btn-wrapper">
            {records?.presence ? (
              <span onClick={() => absentClickHandler(value)} className="absent-btn">
                غایب
              </span>
            ) : (
              ""
            )}
          </div>
        );
      },
    },
  ];

  return arr;
};
