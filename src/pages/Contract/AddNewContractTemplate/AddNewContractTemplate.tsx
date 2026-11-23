import { useEffect } from "react";

import { Grid, Steps } from "antd";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { stepStatusCreator } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";

import ContractsTemplateFinanceConditionStep from "./helper/components/ContractsTemplateFinanceCondition/ContractsTemplateFinanceConditionStep";
import ContractsTemplateInfoStep from "./helper/components/ContractsTemplateInfo/ContractsTemplateInfoStep";
import ContractsTemplateRulesDescAttachment from "./helper/components/ContractsTemplateRulesDescAttachment/ContractsTemplateRulesDescAttachment";
import ContractsTemplateRulesDescMandatory from "./helper/components/ContractsTemplateRulesDescMandatory/ContractsTemplateRulesDescMandatory";
import ContractsTemplateRulesDescOther from "./helper/components/ContractsTemplateRulesDescOther/ContractsTemplateRulesDescOther";
import "./_addNewContractTemplate.scss";

const AddNewContractTemplate = () => {
  const { params, setSearchParams } = useQueryParams();

  const { useBreakpoint } = Grid;

  useTitle({ text: "ایجاد قالب جدید" });

  const stepFromUrl = parseInt(params?.step, 10);
  const step =
    !isNaN(stepFromUrl) && stepFromUrl >= 1 && stepFromUrl <= 5 ? stepFromUrl : 1;

  //? ================================ Effects  ================================

  useEffect(() => {
    if (!params?.step) {
      setSearchParams({ ...params, step: "1" });
    }
  }, []);

  //* ================================ Util Functions ================================

  const screens = useBreakpoint();

  const stepsItem = [
    {
      key: "1",
      children: <ContractsTemplateInfoStep />,
    },
    {
      key: "2",
      children: <ContractsTemplateRulesDescMandatory />,
    },
    {
      key: "3",
      children: <ContractsTemplateRulesDescOther />,
    },
    {
      key: "4",
      children: <ContractsTemplateRulesDescAttachment />,
    },
    {
      key: "5",
      children: <ContractsTemplateFinanceConditionStep />,
    },
  ];

  return (
    <div className="add-new-contract-template-page-container flex flex-col gap-10">
      <Steps
        orientation={screens.xl ? "horizontal" : "vertical"}
        current={step - 1}
        items={[
          {
            status: stepStatusCreator(step, 1),
            title: "اطلاعات قالب قرارداد",
            description: "اطلاعات پایه(اجباری)",
          },
          {
            status: stepStatusCreator(step, 2),
            title: "شرح قوانین وبند ها",
            description: "بند های ثابت قرارداد(اجباری)",
          },
          {
            status: stepStatusCreator(step, 3),
            title: "توضیحات و افزودن بند",
            description: "توضیخات و بند های تکمیلی(اختیاری) ",
          },
          {
            status: stepStatusCreator(step, 4),
            title: "فایل پیوست",
            description: "آپلود فایل های پیوست(اختیاری) ",
          },
          {
            status: stepStatusCreator(step, 5),
            title: "شرایط مالی قالب قرارداد",
            description: "قوانین مالی و ذینفعان(اجباری)",
          },
        ]}
        className="body-regular"
      />
      {stepsItem[step - 1].children}
    </div>
  );
};

export default AddNewContractTemplate;
