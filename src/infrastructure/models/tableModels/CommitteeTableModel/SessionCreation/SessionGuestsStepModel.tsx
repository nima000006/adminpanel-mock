import { Button } from "antd";

type GuestDataType = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  StudentNumber: string;
  preliminaryMeeting: number;
  id: number;
  presence: boolean;
  agenda: number;
};

export const SessionGuestsStepModel = ({
  cancellationHandler,
  from,
}: {
  cancellationHandler?: (value: GuestDataType) => void;
  from?: string;
}) => {
  return [
    {
      title: "نام",
      dataIndex: "firstName",
      key: "firstName",
      width: 100,
    },
    {
      title: "نام خانوادگی",
      dataIndex: "lastName",
      key: "lastName",
      width: 100,
    },
    //todo:[Atefeh]: uncomment when the field got ready in the API
    // {
    //   title: "گروه کاربری",
    //   dataIndex: "userGroup",
    //   key: "userGroup",
    //   width: 100,
    // },
    {
      title: "شماره دانشجویی",
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
    ...(from !== "addNewSessionGuest" && cancellationHandler
      ? [
          {
            title: "",
            dataIndex: "key",
            key: "key",
            width: 100,
            render: (_: number, value: GuestDataType) => {
              return (
                <Button
                  danger
                  type="text"
                  className="session-guest-btn"
                  onClick={() => cancellationHandler?.(value)}
                  disabled={from === "finalCheck" ? true : false}
                >
                  لغو حضور
                </Button>
              );
            },
          },
        ]
      : []),
  ];
};
