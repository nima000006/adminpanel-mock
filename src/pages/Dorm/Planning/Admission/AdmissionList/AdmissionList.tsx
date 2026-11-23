import { Tabs } from "antd";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";

import AdmissionActiveListTab from "./helpers/components/AdmissionActiveListTab/AdmissionActiveListTab";
import AdmissionAwaitingReviewListTab from "./helpers/components/AdmissionAwaitingReviewListTab/AdmissionAwaitingReviewListTab";
import AdmissionInActiveListTab from "./helpers/components/AdmissionInActiveListTab/AdmissionInActiveListTab";
import AdmissionRejectListTab from "./helpers/components/AdmissionRejectListTab/AdmissionRejectListTab";
import AdmissionReturnedListTab from "./helpers/components/AdmissionReturnedListTab/AdmissionReturnedListTab";
import "./_admissionList.scss";

const AdmissionTabs = [
  {
    label: "فعال",
    children: <AdmissionActiveListTab />,
    key: "1",
  },
  {
    label: "غیر فعال",
    children: <AdmissionInActiveListTab />,
    key: "2",
  },
  {
    label: "در انتظار بررسی",
    children: <AdmissionAwaitingReviewListTab />,
    key: "3",
  },
  {
    label: "عودت داده شده",
    children: <AdmissionReturnedListTab />,
    key: "4",
  },
  {
    label: "رد شده",
    children: <AdmissionRejectListTab />,
    key: "5",
  },
];

const AdmissionList = () => {
  const { params, setSearchParams } = useQueryParams();

  const activeTab = params?.tab || "1";

  useTitle({ text: "برنامه پذیرش‌ها" });

  return (
    <Tabs
      activeKey={activeTab}
      items={AdmissionTabs}
      className="admission-list-tab-container"
      type="card"
      onChange={() => setSearchParams({})}
      // destroyInactiveTabPane={false}
      // destroyOnHidden
    />
  );
};

export default AdmissionList;
