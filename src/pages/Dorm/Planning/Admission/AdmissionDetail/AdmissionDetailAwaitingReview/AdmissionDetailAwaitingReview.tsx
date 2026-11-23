import { Tabs } from "antd";
import { Link } from "react-router";

import CustomCard from "@components/CustomCard/CustomCard";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORM_ADMISSIONS_LIST_PAGE_ROUTE } from "@infra/router/routes/dorm";

import AdmissionDetailRequestInfo from "../helpers/RequestInfo/AdmissionDetailRequestInfo";
import AdmissionDetailAwaitingReviewBaseInfoTab from "./helpers/AdmissionDetailAwaitingReviewBaseInfoTab/AdmissionDetailAwaitingReviewBaseInfoTab";
import AdmissionDetailAwaitingReviewLevelsOfAction from "./helpers/AdmissionDetailAwaitingReviewLevelsOfAction/AdmissionDetailAwaitingReviewLevelsOfAction";
import AdmissionDetailAwaitingReviewTariff from "./helpers/AdmissionDetailAwaitingReviewTariff/AdmissionDetailAwaitingReviewTariff";
import "./_admissionDetailAwaitingReview.scss";

const AdmissionDetailTabs = [
  {
    label: "اطلاعات اولیه",
    children: <AdmissionDetailAwaitingReviewBaseInfoTab />,
    key: "1",
  },
  {
    label: "سطوح اعمال",
    children: <AdmissionDetailAwaitingReviewLevelsOfAction />,
    key: "2",
  },
  {
    label: "تعرفه",
    children: <AdmissionDetailAwaitingReviewTariff />,
    key: "3",
  },
  // todo[shirin]: api is not ready
  // {
  //   label: "تاریخچه تغییرات",
  //   children: <AdmissionDetailAwaitingReviewChangeHistory />,
  //   key: "4",
  // },
];

const AdmissionDetailAwaitingReview = () => {
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
    <div className="admission-detail-awaiting-review-page-container">
      <CustomCard>
        <AdmissionDetailRequestInfo admissionFlag={true} />
      </CustomCard>
      <CustomCard>
        <Tabs
          items={AdmissionDetailTabs}
          className="admission-detail-awaiting-review-tab-container"
          type="card"
        />
      </CustomCard>
    </div>
  );
};

export default AdmissionDetailAwaitingReview;
