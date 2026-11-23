import { useMemo, useState } from "react";

import { Tabs } from "antd";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import {
  FinanceBusinessOwnerDetailsMockDataType,
  FinanceBusinessOwnerDetailsTabKey,
} from "@pages/Reports/myReport/StaticReports/Finance/FinanceBusinessOwner/helper/components/FinanceBusinessOwnerDetails/@types/@financeBusinessOwnerDetails";
import FinanceBusinessOwnerDetailsTableModel from "@pages/Reports/myReport/StaticReports/Finance/FinanceBusinessOwner/helper/components/FinanceBusinessOwnerDetails/helper/models/FinanceBusinessOwnerDetailsTableModel";

const tabConfig: {
  key: FinanceBusinessOwnerDetailsTabKey;
  label: string;
}[] = [
  { key: "province", label: "استان" },
  { key: "city", label: "شهر" },
  { key: "business", label: "کسب و کار" },
  { key: "branch", label: "شعبه / واحد (ذینفع)" },
];

const detailsDataSource: Record<
  FinanceBusinessOwnerDetailsTabKey,
  FinanceBusinessOwnerDetailsMockDataType[]
> = {
  province: [
    {
      id: 1,
      province: "تهران",
      grossInCome: 100000000,
      sharePartnersAmount: 30000000,
      turnOverAmount: 10000000,
      netIncome: 60000000,
    },
    {
      id: 2,
      province: "مشهد",
      grossInCome: 85000000,
      sharePartnersAmount: 25000000,
      turnOverAmount: 8000000,
      netIncome: 52000000,
    },
    {
      id: 3,
      province: "اصفهان",
      grossInCome: 75000000,
      sharePartnersAmount: 22000000,
      turnOverAmount: 6000000,
      netIncome: 47000000,
    },
  ],
  city: [
    {
      id: 1,
      city: "تهران",
      grossInCome: 100000000,
      sharePartnersAmount: 30000000,
      turnOverAmount: 10000000,
      netIncome: 60000000,
    },
    {
      id: 2,
      city: "مشهد",
      grossInCome: 85000000,
      sharePartnersAmount: 25000000,
      turnOverAmount: 8000000,
      netIncome: 52000000,
    },
    {
      id: 3,
      city: "اصفهان",
      grossInCome: 75000000,
      sharePartnersAmount: 22000000,
      turnOverAmount: 6000000,
      netIncome: 47000000,
    },
  ],
  business: [
    {
      id: 1,
      business: "رستوران",
      grossInCome: 130000000,
      sharePartnersAmount: 35000000,
      turnOverAmount: 12000000,
      netIncome: 82000000,
    },
    {
      id: 2,
      business: "مشاوره",
      grossInCome: 90000000,
      sharePartnersAmount: 25000000,
      turnOverAmount: 7000000,
      netIncome: 58000000,
    },
    {
      id: 3,
      business: "خدمات رفاهی",
      grossInCome: 76000000,
      sharePartnersAmount: 21000000,
      turnOverAmount: 5000000,
      netIncome: 50000000,
    },
  ],
  branch: [
    {
      id: 1,
      branch: "تهران جنوب",
      grossInCome: 98000000,
      sharePartnersAmount: 29000000,
      turnOverAmount: 9000000,
      netIncome: 60000000,
    },
    {
      id: 2,
      branch: "مشهد مرکزی",
      grossInCome: 82000000,
      sharePartnersAmount: 23000000,
      turnOverAmount: 7000000,
      netIncome: 52000000,
    },
    {
      id: 3,
      branch: "اصفهان غرب",
      grossInCome: 70000000,
      sharePartnersAmount: 20000000,
      turnOverAmount: 6000000,
      netIncome: 44000000,
    },
  ],
};
const FinanceBusinessOwnerDetails = () => {
  const [activeTab, setActiveTab] =
    useState<FinanceBusinessOwnerDetailsTabKey>("province");

  const dataSource = useMemo(() => detailsDataSource[activeTab], [activeTab]);

  const columns = useMemo(
    () => FinanceBusinessOwnerDetailsTableModel(activeTab),
    [activeTab]
  );

  const items = useMemo(
    () =>
      tabConfig.map((item) => ({
        label: item.label,
        key: item.key,
      })),
    []
  );

  const handleTabChange = (key: string) => {
    setActiveTab(key as FinanceBusinessOwnerDetailsTabKey);
  };

  return (
    <>
      <Tabs
        activeKey={activeTab}
        onChange={handleTabChange}
        items={items}
        destroyOnHidden={true}
        className="mt-10!"
      />
      <CustomTable<FinanceBusinessOwnerDetailsMockDataType>
        dataSource={dataSource}
        rowKey="id"
        loading={false}
        columns={columns}
        pagination={false}
      />
    </>
  );
};

export default FinanceBusinessOwnerDetails;
