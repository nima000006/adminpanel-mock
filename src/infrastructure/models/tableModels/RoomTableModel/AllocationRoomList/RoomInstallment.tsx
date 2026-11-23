import { Radio } from "antd";
export const RoomInstallment = () => [
  {
    title: "#",
    dataIndex: "rowNumber",
    key: "rowNumber",
    width: 50,
  },
  {
    title: "درصد",
    dataIndex: "percent",
    key: "percent",
    width: 75,
  },
  {
    title: "نسبت به",
    dataIndex: "relatedTo",
    key: "relatedTo",
    width: 250,
    searchable: true,
    render: () => {
      return (
        <Radio.Group
          options={[
            {
              label: "شروع دوره",
              value: "startTerm",
            },
            {
              label: "زمان رزرو",
              value: "ReservationTime",
            },
          ]}
          defaultValue={"ReservationTime"}
          className="radio-group"
        ></Radio.Group>
      );
    },
  },
  {
    title: "نسبت زمانی",
    dataIndex: "relatedToTime",
    key: "relatedToTime",
    width: 300,
    searchable: true,
    render: () => {
      return (
        <Radio.Group
          options={[
            {
              label: "زودتر",
              value: "sooner",
            },
            {
              label: "دیرتر",
              value: "later",
            },
            {
              label: "همزمان",
              value: "withReserve",
            },
          ]}
          defaultValue={"sooner"}
          className="radio-group"
        ></Radio.Group>
      );
    },
  },
  {
    title: "چند روز",
    dataIndex: "howManyDays",
    key: "howManyDays",
    width: 100,
  },
];
