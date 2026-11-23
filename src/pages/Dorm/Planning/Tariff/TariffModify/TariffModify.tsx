import { useState } from "react";

import { Form } from "antd";
import { Link } from "react-router";

import CustomSteps from "@components/Renderers/CustomSteps/CustomSteps";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { stepStatusCreator } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORM_TARIFFS_LIST_PAGE_ROUTE } from "@infra/router/routes/dorm";

import { DormTariffModifyFormType } from "./@types/@tariffModifyType";
import { DORM_PRICING_MODIFY } from "../_shared/utils/TariffUtils";
import BasicInfoStep from "../TariffDetail/helper/components/TariffSteps/BasicInfoStep/BasicInfoStep";
import PricingStep from "../TariffDetail/helper/components/TariffSteps/PricingStep/PricingStep";
import "./_tariffModify.scss";

const TariffModify = () => {
  const [current, setCurrent] = useState(0);
  const [lastDormId, setIsLastDormId] = useState<number | undefined>(0);

  const {
    params: { title, id },
  } = useQueryParams();

  const isReject = false;

  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={DORM_TARIFFS_LIST_PAGE_ROUTE}> تعرفه ها</Link>,
      },
      ...(title && id
        ? [
            {
              title: title,
            },
            {
              title: "کپی کردن از تعرفه",
            },
          ]
        : !id
          ? [
              {
                title: "ایجاد تعرفه",
              },
            ]
          : []),
    ],
  });
  const [form] = Form.useForm<DormTariffModifyFormType>();

  const stepsItem = [
    {
      id: "1",
      children: (
        <BasicInfoStep
          form={form}
          setCurrentStep={setCurrent}
          setIsLastDormId={setIsLastDormId}
        />
      ),
    },
    {
      id: "2",
      children: (
        <PricingStep
          form={form}
          setCurrentStep={setCurrent}
          type={DORM_PRICING_MODIFY}
          isReject={isReject}
          lastDormId={lastDormId}
        />
      ),
    },
  ];
  return (
    <div className="dorm-tariff-steps-page-container">
      <CustomSteps
        type="navigation"
        current={current}
        className="site-navigation-steps"
        items={[
          {
            status: stepStatusCreator(current, 0),
            title: "اطلاعات اولیه",
          },
          {
            status: stepStatusCreator(current, 1),
            title: "قیمت گذاری",
          },
        ]}
      />
      {stepsItem[current].children}
    </div>
  );
};
export default TariffModify;
