import { Tabs } from "antd";
import { Link, useSearchParams } from "react-router";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { DORM_ADMISSIONS_LIST_PAGE_ROUTE } from "@infra/router/routes/dorm";

import AdmissionDetailActiveBaseInfoTab from "./helpers/AdmissionDetailActiveBaseInfoTab/AdmissionDetailActiveBaseInfoTab";
import AdmissionDetailActiveLevelsOfAction from "./helpers/AdmissionDetailActiveLevelsOfAction/AdmissionDetailActiveLevelsOfAction";
import AdmissionDetailActiveTariff from "./helpers/AdmissionDetailActiveTariff/AdmissionDetailActiveTariff";
import "./_admissionDetailActive.scss";

const AdmissionDetailTabs = [
  {
    label: "اطلاعات اولیه",
    children: <AdmissionDetailActiveBaseInfoTab />,
    key: "1",
  },
  {
    label: "سطوح اعمال",
    children: <AdmissionDetailActiveLevelsOfAction />,
    key: "2",
  },
  {
    label: "تعرفه",
    children: <AdmissionDetailActiveTariff />,
    key: "3",
  },
  // todo [shirin]: api not ready
  // {
  //   label: "تاریخچه تغییرات",
  //   children: <AdmissionDetailActiveChangeHistory />,
  //   key: "4",
  // },
];

const AdmissionDetailActive = () => {
  const [searchParams] = useSearchParams();
  const { title } = Object.fromEntries([...searchParams]);

  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={DORM_ADMISSIONS_LIST_PAGE_ROUTE}>برنامه پذیرش‌ها</Link>,
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

  return (
    <div>
      <Tabs
        items={AdmissionDetailTabs}
        className="admission-detail-active-page-tab-container"
        type="card"
      />
    </div>
  );
};

export default AdmissionDetailActive;
