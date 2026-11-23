import { Tabs, TabsProps } from "antd";
import { Link } from "react-router";

import {
  IconBallFootball,
  IconBandage,
  IconBook,
  IconFireExtinguisher,
  IconGrass,
  IconReligion,
  IconSofa,
  IconWc,
} from "@components/icons/icons";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { DORM_BASIC_INFO_LIST_PAGE_ROUTE } from "@infra/router/routes/dorm";

import { facilityTypes } from "./_shared/utils/facilitiesUtils";
import EducationTab from "./helper/components/EducationTab/EducationTab";
import HealthTab from "./helper/components/HealthTab/HealthTab";
import OpenSpaceTab from "./helper/components/OpenSpaceTab/OpenSpaceTab";
import ReligiousTab from "./helper/components/ReligiousTab/ReligiousTab";
import SafetyTab from "./helper/components/SafetyTab/SafetyTab";
import SanitaryTab from "./helper/components/SanitaryTab/SanitaryTab";
import SportsTab from "./helper/components/SportsTab/SportsTab";
import WelfareTab from "./helper/components/WelfareTab/WelfareTab";
import "./_dormFacilitiesTypes.scss";

export const FACILITY_EXIST_IN_FLOOR = 2;
export const FACILITY_DOES_NOT_EXIST_IN_FLOOR = 1;

const DormFacilitiesTypes = () => {
  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={DORM_BASIC_INFO_LIST_PAGE_ROUTE}>اطلاعات پایه اقامتگاه</Link>,
      },
      {
        title: "انواع امکانات",
      },
    ],
  });

  const tabsItems: TabsProps["items"] = [
    {
      label: (
        <div className="dorm-facilities-type-wrapper">
          <IconBook
            width={14}
            height={14}
            viewBox="0 0 24 24"
            fill="#000"
            className="icon-active"
          />
          <span>آموزشی</span>
        </div>
      ),
      children: <EducationTab type={facilityTypes["education"]} />,
      key: "1",
    },
    {
      label: (
        <div className="dorm-facilities-type-wrapper">
          <IconReligion
            width={14}
            height={14}
            viewBox="0 0 24 24"
            fill="#000"
            strokeWidth={0.8}
            stroke="#fff"
            className="icon-active"
          />
          <span>مذهبی و فرهنگی</span>
        </div>
      ),
      children: <ReligiousTab type={facilityTypes["religious"]} />,
      key: "2",
    },
    {
      label: (
        <div className="dorm-facilities-type-wrapper">
          <IconBandage
            width={14}
            height={14}
            viewBox="0 0 24 24"
            fill="#000"
            className="icon-active"
          />
          <span>سلامت</span>
        </div>
      ),
      children: <HealthTab type={facilityTypes["health"]} />,
      key: "3",
    },
    {
      label: (
        <div className="dorm-facilities-type-wrapper">
          <IconWc
            width={14}
            height={14}
            viewBox="0 0 24 24"
            fill="#000"
            className="icon-active"
          />
          <span>بهداشتی</span>
        </div>
      ),
      children: <SanitaryTab type={facilityTypes["sanitary"]} />,
      key: "4",
    },
    {
      label: (
        <div className="dorm-facilities-type-wrapper">
          <IconFireExtinguisher
            width={14}
            height={14}
            viewBox="0 0 24 24"
            fill="#000"
            className="icon-active"
          />
          <span>ایمنی</span>
        </div>
      ),
      children: <SafetyTab type={facilityTypes["safety"]} />,
      key: "5",
    },
    {
      label: (
        <div className="dorm-facilities-type-wrapper">
          <IconSofa
            width={14}
            height={14}
            viewBox="0 0 24 24"
            fill="#000"
            className="icon-active"
          />
          <span>رفاهی</span>
        </div>
      ),
      children: <WelfareTab type={facilityTypes["welfare"]} />,
      key: "6",
    },
    {
      label: (
        <div className="dorm-facilities-type-wrapper">
          <IconGrass
            width={14}
            height={14}
            viewBox="0 0 24 24"
            fill="#000"
            className="icon-active"
          />

          <span>فضای باز</span>
        </div>
      ),
      children: <OpenSpaceTab type={facilityTypes["openSpace"]} />,
      key: "7",
    },
    {
      label: (
        <div className="dorm-facilities-type-wrapper">
          <IconBallFootball
            width={14}
            height={14}
            viewBox="0 0 24 24"
            fill="#000"
            className="icon-active"
          />
          <span>ورزشی</span>
        </div>
      ),
      children: <SportsTab type={facilityTypes["sports"]} />,
      key: "8",
    },
  ];

  return (
    <div>
      <Tabs
        type="card"
        items={tabsItems}
        className="dorm-facilities-type-tabs-container"
      />
    </div>
  );
};
export default DormFacilitiesTypes;
