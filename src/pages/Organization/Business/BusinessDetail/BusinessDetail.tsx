import { Tabs } from "antd";

import CustomCard from "@components/CustomCard/CustomCard";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";

import BranchTab from "./helper/components/BranchTab/BranchTab";
import BusinessBaseInfoTab from "./helper/components/BusinessBaseInfoTab/BusinessBaseInfoTab";
import BusinessTab from "./helper/components/BusinessTab/BusinessTab";
import OrganizationalUnitsTab from "./helper/components/OrganizationalUnitsTab/OrganizationalUnitsTab";
import PersonnelTab from "./helper/components/PersonnelTab/PersonnelTab";
import PositionsTab from "./helper/components/PositionsTab/PositionsTab";
import "./_businessDetail.scss";

const BusinessDetail = () => {
  const {
    params: { title },
  } = useQueryParams();

  useTitle({
    breadcrumbItems: [
      {
        title: "کسب و کار",
      },
      ...(title
        ? [
            {
              title: title,
            },
          ]
        : []),
    ],
  });

  const tabsItems = [
    {
      label: "کسب و کار",
      children: <BusinessTab />,
      key: "1",
    },
    {
      label: "شعب",
      children: <BranchTab />,
      key: "2",
    },
    {
      label: "اطلاعات پایه کسب و کار",
      children: <BusinessBaseInfoTab />,
      key: "3",
    },
    {
      label: "واحدهای سازمانی",
      children: <OrganizationalUnitsTab />,
      key: "4",
    },
    {
      label: "سمت‌ها",
      children: <PositionsTab />,
      key: "5",
    },
    {
      label: "پرسنل",
      children: <PersonnelTab />,
      key: "6",
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomCard>
      <Tabs items={tabsItems} type="card" className="modify-business-detail-container" />
    </CustomCard>
  );
};
export default BusinessDetail;
