import { Col, Collapse, CollapseProps, Form, Row } from "antd";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";

import CustomRangePicker from "@components/CustomInputs/CustomRangePicker/CustomRangePicker";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTooltip from "@components/Renderers/CustomTooltip/CustomTooltip";
import Div from "@components/Renderers/Div/Div";
import { GREEN, RED } from "@infra/VARS/globalColors/globalColors";

import { StatBoardProps } from "./@types/@InsuranceStatistics";
import "./_insuranceStatistics.scss";

const CustomBoard = ({ items }: { items: StatBoardProps[] }) => {
  const valueColorGenerator = (value: string) => {
    switch (value) {
      case "درخواست‌ها":
        return "primary";
      case "بیمه‌شده‌ها":
        return "geek-blue-6";
      case "اقساط سر رسید شده":
        return "magenta-6";
      case "اقساط در انتظار پرداخت":
        return "sunrise-yellow-7";
      case "اقساط پرداخت شده":
        return "polar-green-7";
      case "بیمه‌نامه‌های تعلیق شده":
        return "calendula-gold-6";
      case "بیمه‌نامه‌های ابطال شده":
        return "dust-red-6";
      case "بیمه‌نامه‌های منقضی شده":
        return "neutral-9";
      default:
        return "";
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Row gutter={[10, 10]} className="card-row-container">
      {items?.map((item) => (
        <Col lg={6} md={12} sm={24} xs={24} key={item?.id}>
          <div className="card-container">
            <div className="top-section">
              <div className="label">{item?.label}</div>
              <div className="toolTip">
                <CustomTooltip placement="top" title={item?.label}>
                  <AiOutlineInfoCircle />
                </CustomTooltip>
              </div>
            </div>
            <div className="bottom-section">
              <div className={`value ${valueColorGenerator(item?.label)}`}>
                {item?.value}
              </div>
              <div className="change">
                {item?.status === "positive" ? (
                  <RiArrowUpSFill style={{ color: GREEN }} />
                ) : item?.status === "negative" ? (
                  <RiArrowDownSFill style={{ color: RED }} />
                ) : (
                  ""
                )}
                {""}
                {item?.change}
              </div>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
};
const statBoard: StatBoardProps[] = [
  {
    id: 1,
    label: "درخواست‌ها",
    toolTipText: "درخواست‌ها",
    value: "86",
    change: "12%",
    status: "positive",
  },
  {
    id: 2,
    label: "بیمه‌شده‌ها",
    toolTipText: "بیمه‌شده‌ها",
    value: "1224",
    change: "22%",
    status: "negative",
  },
  {
    id: 3,
    label: "اقساط سر رسید شده",
    toolTipText: "اقساط سر رسید شده",
    value: "29",
    change: "123%",
    status: "positive",
  },
  {
    id: 4,
    label: "اقساط در انتظار پرداخت",
    toolTipText: "اقساط در انتظار پرداخت",
    value: "29",
    change: "8%",
    status: "positive",
  },
  {
    id: 5,
    label: "اقساط پرداخت شده",
    toolTipText: "اقساط پرداخت شده",
    value: "760",
    change: "6%",
    status: "positive",
  },

  {
    id: 6,
    label: "بیمه‌نامه‌های تعلیق شده",
    toolTipText: "بیمه‌نامه‌های تعلیق شده",
    value: "4",
    change: "3%",
    status: "negative",
  },
  {
    id: 7,
    label: "بیمه‌نامه‌های ابطال شده",
    toolTipText: "بیمه‌نامه‌های ابطال شده",
    value: "6",
    change: "12%",
    status: "positive",
  },
  {
    id: 8,
    label: "بیمه‌نامه‌های منقضی شده",
    toolTipText: "بیمه‌نامه‌های منقضی شده",
    value: "12",
    change: "12%",
    status: "negative",
  },
];

const StatisticDataContainer = () => {
  return (
    <Form className="static-data-container">
      <CustomRangePicker name="statDateRange" hasVerticalLabel={false} />
      <CustomBoard items={statBoard} />
    </Form>
  );
};

const InsuranceRequestsStatistics = () => {
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: <CustomDivider text="آمار" />,
      children: <StatisticDataContainer />,
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div className="insurance-static-collapse-container">
      <Collapse
        expandIcon={({ isActive }) => (
          <IoIosArrowDown
            rotate={isActive ? 0 : 180}
            className="insurance-static-collapse"
          />
        )}
        ghost
        items={items}
        defaultActiveKey={1}
      />
    </Div>
  );
};

export default InsuranceRequestsStatistics;
