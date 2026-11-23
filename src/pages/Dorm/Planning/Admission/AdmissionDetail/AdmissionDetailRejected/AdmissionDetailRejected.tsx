import { Tabs } from "antd";
import { Link } from "react-router";

import CustomCard from "@components/CustomCard/CustomCard";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORM_ADMISSIONS_LIST_PAGE_ROUTE } from "@infra/router/routes/dorm";

import AdmissionDetailRequestInfo from "../helpers/RequestInfo/AdmissionDetailRequestInfo";
import AdmissionDetailRejectedBaseInfoTab from "./helper/AdmissionDetailRejectedBaseInfoTab/AdmissionDetailRejectedBaseInfoTab";
import AdmissionDetailRejectedLevelsOfAction from "./helper/AdmissionDetailRejectedLevelsOfAction/AdmissionDetailRejectedLevelsOfAction";
import AdmissionDetailRejectedTariff from "./helper/AdmissionDetailRejectedTariff/AdmissionDetailRejectedTariff";
import "./_admissionDetailRejected.scss";

const AdmissionDetailTabs = [
  {
    label: "اطلاعات اولیه",
    children: <AdmissionDetailRejectedBaseInfoTab />,
    key: "1",
  },
  {
    label: "سطوح اعمال",
    children: <AdmissionDetailRejectedLevelsOfAction />,
    key: "2",
  },
  {
    label: "تعرفه",
    children: <AdmissionDetailRejectedTariff />,
    key: "3",
  },
  //TODO[Atefeh]: uncomment when api got ready
  // {
  //   label: "تاریخچه تغییرات",
  //   children: <AdmissionDetailRejectedChangeHistory />,
  //   key: "4",
  // },
];

const AdmissionDetailRejected = () => {
  const {
    params: { title },
  } = useQueryParams();

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

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="admission-detail-rejected-page-container">
      <CustomCard>
        <AdmissionDetailRequestInfo admissionFlag={true} isRejected={true} />
      </CustomCard>
      <CustomCard>
        <Tabs
          items={AdmissionDetailTabs}
          className="admission-detail-rejected-tab-container"
          type="card"
        />
      </CustomCard>
    </div>
  );
};

export default AdmissionDetailRejected;
