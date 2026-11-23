import { Tabs } from "antd";
import { useSearchParams } from "react-router";

import {
  COMMITTEE_ADDITIONAL_EDUCATION_CHANCELLOR_LIST_ALL,
  COMMITTEE_ADDITIONAL_EDUCATION_CHANCELLOR_LIST_CLOSED,
  COMMITTEE_ADDITIONAL_EDUCATION_CHANCELLOR_LIST_DRAFT,
  COMMITTEE_ADDITIONAL_EDUCATION_CHANCELLOR_LIST_RECEIPT,
  COMMITTEE_ADDITIONAL_EDUCATION_CHANCELLOR_LIST_REFERRED,
  COMMITTEE_ADDITIONAL_EDUCATION_CHANCELLOR_LIST_REGISTERED,
  COMMITTEE_ADDITIONAL_EDUCATION_CHANCELLOR_LIST_WAITING_CONFIRMATION,
} from "./@types/@educationChancellorListTabs";
import EducationChancellorListTableAccused from "./helper/components/EducationChancellorListTableAccused/EducationChancellorListTableAccused";
import EducationChancellorListTableReporter from "./helper/components/EducationChancellorListTableReporter/EducationChancellorListTableReporter";
import CustomCard from "../../../../../components/CustomCard/CustomCard";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import "./_educationChancellorListTabs.scss";

const EducationChancellorListTabs = () => {
  const [_, setSearchParams] = useSearchParams();

  useTitle({ text: "لیست پرونده ها" });
  const tabsItems = [
    {
      label: "همه",
      children: (
        <EducationChancellorListTableAccused
          type={COMMITTEE_ADDITIONAL_EDUCATION_CHANCELLOR_LIST_ALL}
        />
      ),
      key: "1",
    },
    {
      label: "پیش نویس",
      children: (
        <EducationChancellorListTableAccused
          type={COMMITTEE_ADDITIONAL_EDUCATION_CHANCELLOR_LIST_DRAFT}
        />
      ),
      key: "2",
    },
    {
      label: "انتظار تایید",
      children: (
        <EducationChancellorListTableReporter
          type={COMMITTEE_ADDITIONAL_EDUCATION_CHANCELLOR_LIST_WAITING_CONFIRMATION}
        />
      ),
      key: "3",
    },
    {
      label: "ثبت شده",
      children: (
        <EducationChancellorListTableReporter
          type={COMMITTEE_ADDITIONAL_EDUCATION_CHANCELLOR_LIST_REGISTERED}
        />
      ),
      key: "4",
    },
    {
      label: "دریافتی",
      children: (
        <EducationChancellorListTableAccused
          type={COMMITTEE_ADDITIONAL_EDUCATION_CHANCELLOR_LIST_RECEIPT}
        />
      ),
      key: "5",
    },
    {
      label: "ارجاع شده",
      children: (
        <EducationChancellorListTableAccused
          type={COMMITTEE_ADDITIONAL_EDUCATION_CHANCELLOR_LIST_REFERRED}
        />
      ),
      key: "6",
    },
    {
      label: "بسته شده",
      children: (
        <EducationChancellorListTableAccused
          type={COMMITTEE_ADDITIONAL_EDUCATION_CHANCELLOR_LIST_CLOSED}
        />
      ),
      key: "7",
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomCard>
      <Tabs
        type="line"
        items={tabsItems}
        className="committee-additional-research-education-chancellor-list-tabs-container"
        onChange={() => setSearchParams({})}
      />
    </CustomCard>
  );
};
export default EducationChancellorListTabs;
