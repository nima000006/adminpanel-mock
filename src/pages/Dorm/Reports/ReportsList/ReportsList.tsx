import { Tabs } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";

import CustomCard from "@components/CustomCard/CustomCard";
import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { PADDING_40 } from "@infra/VARS/globalStyles/globalStyles";

import FirstTabReportsListDebtors from "./helpers/components/FirstTabReportsListDebtors/FirstTabReportsListDebtors";
import SecondTabReportsListCreditors from "./helpers/components/SecondTabReportsListCreditors/SecondTabReportsListCreditors";
import ThirdTabReportsListSettled from "./helpers/components/ThirdTabReportsListSettled/ThirdTabReportsListSettled";
import "./_reportsList.scss";

const items = [
  {
    key: "1",
    label: "بدهکاران",
    children: <FirstTabReportsListDebtors />,
  },
  {
    key: "2",
    label: "بستانکاران",
    children: <SecondTabReportsListCreditors />,
  },
  {
    key: "3",
    label: "تسویه کرده",
    children: <ThirdTabReportsListSettled />,
  },
];

const ReportsList = () => {
  useTitle({ text: "گزارشات مالی" });
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="dorm-reports-list-page-container">
      <CustomCard padding={PADDING_40} className="reports-list-page-wrapper">
        <ToolBox
          className="dorm-reports-list-toolbox"
          leftSide={
            <div className="left-side">
              <CustomSelect
                name="admissionSchedule"
                options={[]}
                placeholder="انتخاب کنید"
              />
              <CustomButton type="primary" ghost>
                خروجی اکسل
              </CustomButton>
            </div>
          }
          rightSide={
            <div className="right-side">
              <CustomInput
                suffix={<AiOutlineSearch />}
                placeholder="جستجو"
                hasVerticalLabel={false}
              />
              <CustomButton type="primary" icon={<AiOutlineFilter />} size="middle">
                فیلتر پیشرفته
              </CustomButton>
            </div>
          }
        />
        <Tabs
          defaultActiveKey="1"
          items={items}
          type="card"
          className="dorm-reports-tab-container"
        />
      </CustomCard>
    </div>
  );
};
export default ReportsList;
