import { Switch } from "antd";
import moment from "jalali-moment";

export const RoomTimingBasicModel = ({ viewClickHandler }: any) => [
  {
    title: "نام",
    dataIndex: "name",
    key: "name",
    width: 100,
    searchable: true,
  },
  {
    title: "نوع مدیریت",
    dataIndex: "managementType",
    key: "managementType",
    width: 115,
    render: (value: any) => {
      return <div className="product-wrapper">{value ? <span>{value}</span> : null}</div>;
    },
    filters: [
      {
        text: "آزاد",
        value: "آزاد",
      },
      {
        text: "دانشگاهی",
        value: "دانشگاهی",
      },
    ],
    onFilter: (value: string, record: any) => {
      return record.managementType === value;
    },
    filterSearch: true,
  },
  {
    title: "ظرفیت اسمی",
    dataIndex: "nominalCapacity",
    key: "nominalCapacity",
    width: 115,
    searchable: true,
  },
  {
    title: "درجه کیفی",
    dataIndex: "qualityGrade",
    key: "qualityGrade",
    width: 115,
    searchable: true,
  },
  {
    title: "جنسیت",
    dataIndex: "gender",
    key: "gender",
    width: 100,

    render: (value: any) => {
      return <div className="product-wrapper">{value ? <span>{value}</span> : null}</div>;
    },
    filters: [
      {
        text: "پسران",
        value: "پسران",
      },
      {
        text: "دختران",
        value: "دختران",
      },
      {
        text: "متاهلی",
        value: "متاهلی",
      },
    ],
    onFilter: (value: number, record: any) => {
      return record.gender === value;
    },
    filterSearch: true,
  },
  {
    title: "فعال",
    dataIndex: "active",
    key: "active",
    width: 100,
    render: (value: boolean) => {
      return <Switch defaultChecked={value} />;
    },
  },
  {
    title: "ظرفیت مانده فعلی ",
    dataIndex: "remainingCapacity",
    key: "remainingCapacity",
    width: 150,
    render: (value: any) => {
      return (
        <div className="remaining-capacity-container">
          {value <= 2 ? (
            <div className="remaining-capacity-wrapper">
              <div className="box-remaining-capacity box-remaining-capacity-green">
                {value}
              </div>
              <span>تخت</span>
            </div>
          ) : value <= 5 ? (
            <div className="remaining-capacity-wrapper">
              <div className="box-remaining-capacity box-remaining-capacity-orange">
                {value}
              </div>
              <span>تخت</span>
            </div>
          ) : value >= 6 ? (
            <div className="remaining-capacity-wrapper">
              <div className="box-remaining-capacity box-remaining-capacity-red">
                {value}
              </div>
              <span>تخت</span>
            </div>
          ) : null}
        </div>
      );
    },
    sorter: (a: any, b: any) => {
      return (
        moment(new Date(), "YYYY/M/D").diff(
          moment(a.remainingCapacity ?? new Date()),
          "days"
        ) -
        moment(new Date(), "YYYY/M/D").diff(
          moment(b.remainingCapacity ?? new Date()),
          "days"
        )
      );
    },
  },
  {
    title: "",
    dataIndex: "id",
    key: "id",
    width: 75,
    fixed: "right",
    className: "tables-sticky-column-left",
    render: (value: number) => {
      return (
        <div
          className="view-text-remaining-capacity"
          onClick={() => viewClickHandler(value)}
        >
          مشاهده
        </div>
      );
    },
  },
];
