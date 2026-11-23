import { Switch } from "antd";
import moment from "jalali-moment";

export const PaymentRuleModel = ({ viewClickHandler }: any) => [
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
    width: 120,
    render: (_: any, records: any) => {
      return (
        <div className="product-wrapper">
          {records?.managementType === "آزاد" ? (
            <span>آزاد</span>
          ) : records?.managementType === "دانشگاهی" ? (
            <span>دانشگاهی</span>
          ) : null}
        </div>
      );
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
    onFilter: (value: number, record: any) => {
      return record.managementType === value;
    },
    filterSearch: true,
  },
  {
    title: "ظرفیت اسمی",
    dataIndex: "nominalCapacity",
    key: "nominalCapacity",
    width: 120,
    searchable: true,
  },
  {
    title: "درجه کیفی",
    dataIndex: "qualityGrade",
    key: "qualityGrade",
    width: 100,
    searchable: true,
  },
  {
    title: "جنسیت",
    dataIndex: "gender",
    key: "gender",
    width: 100,
    render: (_: any, records: any) => {
      return (
        <div className="product-wrapper">
          {records?.gender === "پسران" ? (
            <span>پسران</span>
          ) : records?.gender === "دختران" ? (
            <span>دختران</span>
          ) : records?.gender === "متاهلی" ? (
            <span>متاهلی</span>
          ) : null}
        </div>
      );
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
    render: () => {
      return <Switch defaultChecked />;
    },
  },
  {
    title: "ظرفیت مانده فعلی ",
    dataIndex: "remainingCapacity",
    key: "remainingCapacity",
    width: 150,
    render: (_: any, records: any) => {
      return (
        <div className="remaining-capacity-container">
          {records?.remainingCapacity <= 2 ? (
            <div className="remaining-capacity-wrapper">
              <div className="box-remaining-capacity box-remaining-capacity-green">1</div>
              <span>روز</span>
            </div>
          ) : records?.remainingCapacity <= 5 ? (
            <div className="remaining-capacity-wrapper">
              <div className="box-remaining-capacity box-remaining-capacity-orange">
                3
              </div>
              <span>روز</span>
            </div>
          ) : records?.remainingCapacity >= 6 ? (
            <div className="remaining-capacity-wrapper">
              <div className="box-remaining-capacity box-remaining-capacity-red">6</div>
              <span>روز</span>
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
    render: (value: string) => {
      return (
        <div onClick={() => viewClickHandler(value)} className="view-text-pricing-basic">
          مشاهده
        </div>
      );
    },
  },
];
