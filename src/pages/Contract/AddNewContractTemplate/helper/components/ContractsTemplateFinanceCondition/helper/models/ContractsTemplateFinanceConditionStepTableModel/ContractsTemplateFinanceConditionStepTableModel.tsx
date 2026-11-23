import { PiCheck } from "react-icons/pi";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { GetContractsDetailRulesBeneficiariesContentItem } from "@pages/Contract/ContractsList/ContractsDetail/helper/components/ContractsDetailFinancialRules/@types/@getContractsDetailRulesBeneficiaries";

import { ContractsTemplateFinanceConditionStepTableModelProps } from "./@types/@contractsTemplateFinanceConditionStepTableModelProps";
import { BENEFICIARY_RULE_TO_TYPE, BENEFICIARY_TYPE_CONFIG } from "./helper/utils";
import {
  addNewContractBeneficiaryOptionTypes,
  newContractLookupItem,
} from "../../../@types/@contractTemplateFinanceCondition";

const ContractsTemplateFinanceConditionStepTableModel = ({
  onEdit,
  onDelete,
}: ContractsTemplateFinanceConditionStepTableModelProps): CustomColumnType<GetContractsDetailRulesBeneficiariesContentItem>[] => {
  return [
    {
      title: "ذینفع",
      dataIndex: "beneficiary",
      key: "beneficiary",
      width: 170,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "نوع ذینفع",
      dataIndex: "beneficiaryRuleType",
      key: "beneficiaryRuleType",
      width: 130,
      render: (value: {
        id: number;
        name: addNewContractBeneficiaryOptionTypes;
        title: string;
      }) => {
        if (!value?.name) return "-";

        const beneficiaryType = BENEFICIARY_RULE_TO_TYPE[value.name];
        if (!beneficiaryType) return "-";

        const config = BENEFICIARY_TYPE_CONFIG[beneficiaryType];

        return (
          <CustomTag className="w-fit" color={config.color}>
            {config.label}
          </CustomTag>
        );
      },
    },

    {
      title: "فروشنده",
      dataIndex: "supplier",
      key: "supplier",
      width: 130,
      render: (value: boolean | null) => {
        if (value === false || value == null) {
          return "-";
        }
        return (
          <CustomTag color="green" className="w-fit">
            <PiCheck />
          </CustomTag>
        );
      },
    },
    {
      title: "نوع شعبه",
      dataIndex: "branchType",
      key: "branchType",
      width: 130,
      render: (value: newContractLookupItem) => dataPlaceHolder({ data: value?.title }),
    },
    {
      title: "شعبه",
      dataIndex: "branchName",
      key: "branchName",
      width: 170,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "درصد سهم",
      dataIndex: "partitionCoefficient",
      key: "partitionCoefficient",
      width: 174,
      render: (value: string) => dataPlaceHolder({ data: `${value}%` }),
    },
    {
      title: "خدمت سهامدار",
      dataIndex: "supportTitle",
      key: "supportTitle",
      width: 130,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      className: "tables-sticky-column-left",
      width: 75,
      render: (_: unknown, record: GetContractsDetailRulesBeneficiariesContentItem) => {
        return (
          <div className="flex items-center justify-center">
            <CustomButton type="link" onClick={() => onEdit(record)}>
              ویرایش
            </CustomButton>
            <CustomButton type="link" danger onClick={() => onDelete(record)}>
              حذف
            </CustomButton>
          </div>
        );
      },
    },
  ];
};
export default ContractsTemplateFinanceConditionStepTableModel;
