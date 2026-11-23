import { useState } from "react";

import { Link } from "react-router";

import CustomSteps from "@components/Renderers/CustomSteps/CustomSteps";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { stepStatusCreator } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useResponsive } from "@infra/hooks/useResponsive";
import {
  INTERNATIONAL_BASIC_INFO_ADMISSION_PROGRAM_ROUTE,
  INTERNATIONAL_BASIC_INFO_ROUTE,
} from "@infra/router/routes/international";

import AdmissionProgramModifyBasicInfo from "./helper/components/ModifyBasicInfo/AdmissionProgramModifyBasicInfo";
import AdmissionProgramModifyConditions from "./helper/components/ModifyConditions/AdmissionProgramModifyConditions";
import AdmissionProgramModifyCosts from "./helper/components/ModifyCosts/AdmissionProgramModifyCosts";
import AdmissionProgramModifyFields from "./helper/components/ModifyFields/AdmissionProgramModifyFields";
import AdmissionProgramModifyTiming from "./helper/components/ModifyTiming/AdmissionProgramModifyTiming";

import "./_admissionProgramModify.scss";

const AdmissionProgramModify = () => {
  const [current, setCurrent] = useState(0);
  const { params } = useQueryParams();
  const { isTablet } = useResponsive();
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
        title:
          params && Object.keys(params).length > 0
            ? "کپی برنامه پذیرش"
            : "ایجاد برنامه پذیرش",
      },
    ],
  });

  //* ================================ Steps ================================
  const stepsItem = [
    {
      id: "1",
      children: <AdmissionProgramModifyBasicInfo setCurrent={setCurrent} />,
    },
    {
      id: "2",
      children: <AdmissionProgramModifyFields setCurrent={setCurrent} />,
    },
    {
      id: "3",
      children: <AdmissionProgramModifyTiming setCurrent={setCurrent} />,
    },
    {
      id: "4",
      children: <AdmissionProgramModifyConditions setCurrent={setCurrent} />,
    },
    {
      id: "5",
      children: <AdmissionProgramModifyCosts setCurrent={setCurrent} />,
    },
  ];

  return (
    <div className="international-admission-program-modify-page-container">
      <CustomSteps
        type="default"
        orientation={isTablet ? "vertical" : "horizontal"}
        current={current}
        className="site-navigation-steps"
        items={[
          {
            status: stepStatusCreator(current, 0),
            title: "اطلاعات اولیه",
          },
          {
            status: stepStatusCreator(current, 1),
            title: "رشته مقطع واحد",
          },
          {
            status: stepStatusCreator(current, 2),
            title: "زمان بندی",
          },
          {
            status: stepStatusCreator(current, 3),
            title: "شرایط",
          },
          {
            status: stepStatusCreator(current, 4),
            title: "هزینه‌ها",
          },
        ]}
      />
      {stepsItem[current].children}
    </div>
  );
};

export default AdmissionProgramModify;
