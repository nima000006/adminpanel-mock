import { useState } from "react";

import { Radio, Divider, RadioChangeEvent } from "antd";

import { dataPlaceHolder } from "@infra/helpers/utils";

import { AddFinancialRuleModalContentProps } from "./@types/@addFinancialRuleModalContentProps";
import { beneficiaryOptions } from "./_shared/utils";
import { addNewContractBeneficiaryOptionTypes } from "../../../@types/@contractTemplateFinanceCondition";

const AddFinancialRuleModalContent = ({
  selectedType,
  onTypeChange,
}: AddFinancialRuleModalContentProps) => {
  const [internalSelected, setInternalSelected] =
    useState<addNewContractBeneficiaryOptionTypes>(
      selectedType || ("LEGAL_DETERMINED" as addNewContractBeneficiaryOptionTypes)
    );
  // ================================ Utils function ================================
  const handleChange = (e: RadioChangeEvent) => {
    const newValue = e.target.value as addNewContractBeneficiaryOptionTypes;

    setInternalSelected(newValue);
    onTypeChange?.(newValue);
  };

  const currentSelected = selectedType !== undefined ? selectedType : internalSelected;

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <div className="body-regular">
      <p className="text-neutral-11 mb-5! text-xl">
        نوع ذینفع قانون مالی خود را انتخاب کنید.
      </p>
      <Radio.Group
        value={currentSelected}
        onChange={handleChange}
        className="flex w-full flex-col [&_.ant-radio]:top-0 [&_.ant-radio]:mr-3 [&_.ant-radio-wrapper]:m-0 [&_.ant-radio-wrapper]:w-full [&_.ant-radio-wrapper]:cursor-pointer [&_.ant-radio-wrapper]:p-4 [&_.ant-radio-wrapper>span:last-child]:mr-2.5 [&_.ant-radio-wrapper>span:last-child]:flex-1"
      >
        {beneficiaryOptions.map((option, index) => (
          <div key={option.value}>
            <div className="flex flex-col">
              <div className="flex items-center">
                <Radio value={option.value}>
                  <div className="text-neutral-13 body-regular text-lg">
                    {dataPlaceHolder({ data: option.title })}
                  </div>
                </Radio>
              </div>
              <div className="mt-1 mr-7">
                <div className="text-neutral-8 body-regular text-sm leading-relaxed">
                  {dataPlaceHolder({ data: option.description })}
                </div>
              </div>
            </div>
            {index < beneficiaryOptions.length - 1 && (
              <Divider className="border-neutral-4 my-0" />
            )}
          </div>
        ))}
      </Radio.Group>
    </div>
  );
};

export default AddFinancialRuleModalContent;
