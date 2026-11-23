import { Tabs } from "antd";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { DormitoryContractDetailMockData } from "@pages/Dormitory/Admission/_shared/pages/Contract/helper/@types/@dormitoryContractDetail";
import ContractBasicInfo from "@pages/Dormitory/Admission/_shared/pages/Contract/helper/components/ContractBasicInfo/ContractBasicInfo";
import ContractDescription from "@pages/Dormitory/Admission/_shared/pages/Contract/helper/components/ContractDescription/ContractDescription";
import { ContractSalesShareMockData } from "@pages/Dormitory/Admission/_shared/pages/Contract/helper/components/ContractSalesShare/@types/@contractSalesShare";
import ContractSalesShare from "@pages/Dormitory/Admission/_shared/pages/Contract/helper/components/ContractSalesShare/ContractSalesShare";
import { DORMITORY_CONTRACT_DETAIL_TABS } from "@pages/Dormitory/Admission/_shared/pages/Contract/helper/utils/dormitoryContractTabs";

const DORMITORY_CONTRACT_DETAIL_MOCK_DATA: DormitoryContractDetailMockData = {
  remainingDays: "X",
  createdAt: "2026-09-26T13:01:17.058854",
  startDate: "2026-09-26T13:01:17.058854",
  endDate: "2026-09-26T13:01:17.058854",
  statusTitle: "فعال",
  contractId: "2134532",
};

const DORMITORY_CONTRACT_SALES_SHARE_MOCK_DATA: ContractSalesShareMockData = {
  business: "دانشگاه آزاد اسلامی",
  branch: "تهران جنوب",
  services: [
    {
      id: "1",
      serviceTitle: "عنوان خدمت 1",
      sharePercent: 50,
    },
    {
      id: "2",
      serviceTitle: "عنوان خدمت 2",
      sharePercent: 40,
    },
    {
      id: "3",
      serviceTitle: "عنوان خدمت 3",
      sharePercent: 80,
    },
  ],
};

const DormitoryContractDetail = () => {
  useTitle({
    breadcrumbItems: [
      {
        title: "برنامه‌های پذیرش",
      },
      {
        title: "برنامه‌های پذیرش من",
      },
      {
        title: "مشاهده",
      },
      {
        title: "قرارداد",
      },
    ],
  });

  const data = DORMITORY_CONTRACT_DETAIL_MOCK_DATA;

  const tabItems = [
    {
      key: DORMITORY_CONTRACT_DETAIL_TABS.basicInfo,
      label: "اطلاعات پایه قرارداد",
      children: <ContractBasicInfo data={data} />,
    },
    {
      key: DORMITORY_CONTRACT_DETAIL_TABS.description,
      label: "شرح قرارداد",
      children: <ContractDescription />,
    },
    {
      key: DORMITORY_CONTRACT_DETAIL_TABS.salesShare,
      label: "سهم از فروش",
      children: <ContractSalesShare data={DORMITORY_CONTRACT_SALES_SHARE_MOCK_DATA} />,
    },
  ];

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return <Tabs type="card" items={tabItems} />;
};

export default DormitoryContractDetail;
