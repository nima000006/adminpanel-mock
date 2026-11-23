import { useState } from "react";

import { Steps } from "antd";
import { Link } from "react-router";

import CustomCard from "@components/CustomCard/CustomCard";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { MODIFY_BUSINESS_LIST_PAGE_ROUTE } from "@infra/router/routes/organization";

import { CreateStepMode } from "../utils/createBusinessUtils";
import RequestStatusStep from "./helper/component/RequestStatusStep/RequestStatusStep";
import "./_createBusinessWithFifthStep.scss";

const TrackAndEdit = () => {
  const [currentStep] = useState(4);

  const {
    params: { requestStatus },
  } = useQueryParams();

  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={MODIFY_BUSINESS_LIST_PAGE_ROUTE}>کسب و کار</Link>,
      },
      {
        title: "ایجاد کسب و کار",
      },
    ],
  });

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomCard className="create-business-with-fifth-step-container">
      <Steps
        className="ant-steps-horizontal"
        current={currentStep}
        items={[
          {
            title: "ایجاد کسب و کار",
            description: "پر کردن فرم کسب و کار",
          },
          {
            title: "ایجاد شعبه",
            description: "پر کردن فرم اطلاعات شعبه مرکزی",
          },
          {
            title: "بارگذاری اسناد",
            description: "بارگذاری اسناد مورد نیاز",
          },
          {
            title: "هویت‌ها",
            description: "معرفی مدیر ارشد و ادمین کسب و کار",
          },
          {
            title: "وضعیت درخواست ها",
            description:
              requestStatus === CreateStepMode?.process ? (
                <span className="step-pending">درحال بررسی</span>
              ) : requestStatus === CreateStepMode?.reject ? (
                <span className="step-rejected">رد شده</span>
              ) : requestStatus === CreateStepMode?.returned ? (
                <span className="step-returned">عودت شده</span>
              ) : (
                ""
              ),

            status: requestStatus === CreateStepMode?.reject ? "error" : undefined,
          },
        ]}
        size="small"
      />
      <div className="step-content">{<RequestStatusStep />}</div>
    </CustomCard>
  );
};
export default TrackAndEdit;
