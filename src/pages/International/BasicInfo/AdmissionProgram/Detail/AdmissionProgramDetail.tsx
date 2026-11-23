import { Link } from "react-router";

import {
  IconBooks,
  IconCalculator,
  IconClock,
  IconIntersect,
  IconTextAlignRight,
} from "@components/icons/icons";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  INTERNATIONAL_BASIC_INFO_ADMISSION_PROGRAM_ROUTE,
  INTERNATIONAL_BASIC_INFO_ROUTE,
} from "@infra/router/routes/international";

import AdmissionProgramDetailBasicInfo from "./helper/components/DetailBasicInfo/AdmissionProgramDetailBasicInfo";
import AdmissionProgramDetailCard from "./helper/components/DetailCard/AdmissionProgramDetailCard";
import AdmissionProgramDetailConditions from "./helper/components/DetailConditions/AdmissionProgramDetailConditions";
import AdmissionProgramDetailCosts from "./helper/components/DetailCosts/AdmissionProgramDetailCosts";
import AdmissionProgramDetailFields from "./helper/components/DetailFields/AdmissionProgramDetailFields";
import AdmissionProgramDetailTiming from "./helper/components/DetailTiming/AdmissionProgramDetailTiming";
import { INTERNATIONAL_ADMISSIONS_TABS } from "./helper/utils";
import "./_admissionProgramDetail.scss";

const AdmissionProgramDetail = () => {
  const {
    params: { status = INTERNATIONAL_ADMISSIONS_TABS.basicInfo, id },
    setSearchParams,
  } = useQueryParams();

  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={INTERNATIONAL_BASIC_INFO_ROUTE}>اطلاعات پایه</Link>,
      },
      {
        title: (
          <Link to={INTERNATIONAL_BASIC_INFO_ADMISSION_PROGRAM_ROUTE}>برنامه پذیرش</Link>
        ),
      },
      {
        title: "مشاهده برنامه پذیرش",
      },
    ],
  });
  //* ================================ Util Functions ================================
  const changeCardHandler = (status: string) => {
    setSearchParams({ status: status, id });
  };

  const TabsItems: Record<string, React.ReactNode> = {
    [INTERNATIONAL_ADMISSIONS_TABS.basicInfo]: <AdmissionProgramDetailBasicInfo />,
    [INTERNATIONAL_ADMISSIONS_TABS.fields]: <AdmissionProgramDetailFields />,
    [INTERNATIONAL_ADMISSIONS_TABS.timing]: <AdmissionProgramDetailTiming />,
    [INTERNATIONAL_ADMISSIONS_TABS.conditions]: <AdmissionProgramDetailConditions />,
    [INTERNATIONAL_ADMISSIONS_TABS.costs]: <AdmissionProgramDetailCosts />,
  };

  return (
    <div className="admission-program-detail-page-container">
      <div className="tabs-container scrollbar-hide flex flex-wrap justify-center gap-2 overflow-x-auto px-2 sm:flex-nowrap sm:justify-start sm:gap-3 sm:overflow-visible sm:px-4 md:gap-4 lg:gap-6 lg:px-0">
        <AdmissionProgramDetailCard
          title="اطلاعات اولیه"
          Icon={IconTextAlignRight}
          active={status === INTERNATIONAL_ADMISSIONS_TABS.basicInfo}
          clickHandler={() => changeCardHandler(INTERNATIONAL_ADMISSIONS_TABS.basicInfo)}
        />
        <AdmissionProgramDetailCard
          title="رشته‌ها"
          Icon={IconBooks}
          active={status === INTERNATIONAL_ADMISSIONS_TABS.fields}
          clickHandler={() => changeCardHandler(INTERNATIONAL_ADMISSIONS_TABS.fields)}
        />
        <AdmissionProgramDetailCard
          title="زمان بندی"
          Icon={IconClock}
          active={status === INTERNATIONAL_ADMISSIONS_TABS.timing}
          clickHandler={() => changeCardHandler(INTERNATIONAL_ADMISSIONS_TABS.timing)}
        />
        <AdmissionProgramDetailCard
          title="شرایط"
          Icon={IconIntersect}
          active={status === INTERNATIONAL_ADMISSIONS_TABS.conditions}
          clickHandler={() => changeCardHandler(INTERNATIONAL_ADMISSIONS_TABS.conditions)}
        />
        <AdmissionProgramDetailCard
          title="هزینه‌‌ها"
          Icon={IconCalculator}
          active={status === INTERNATIONAL_ADMISSIONS_TABS.costs}
          clickHandler={() => changeCardHandler(INTERNATIONAL_ADMISSIONS_TABS.costs)}
        />
      </div>
      {TabsItems[status]}
    </div>
  );
};

export default AdmissionProgramDetail;
