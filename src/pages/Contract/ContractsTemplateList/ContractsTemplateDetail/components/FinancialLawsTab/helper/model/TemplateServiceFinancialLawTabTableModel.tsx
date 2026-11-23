import { IoCheckbox } from "react-icons/io5";
import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder, makeSearchParams } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { CONTRACTS_TEMPLATE_LEGAL_VARIABLES_LIST_PAGE_ROUTE } from "@infra/router/routes/contracts";
import { GREEN_07 } from "@infra/VARS/globalColors/globalColors";
import { IdTitle } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { BeneficiaryType } from "@pages/Contract/AddNewContractTemplate/helper/components/ContractsTemplateFinanceCondition/helper/components/AddFinancialRuleDrawerContent/utils/enums";

import { getContractBeneficiaryAndFinancialRulesItems } from "../../@types/@financialLawsTabProps";
import {
  kindOffBeneficiary,
  kindOffBeneficiaryColor,
} from "../utils/financialLawTabUtils";

const TemplateServiceFinancialLawTabTableModel = ({
  drawerClickHandler,
  tempId,
}: {
  drawerClickHandler: (id: number) => void;
  tempId?: string;
}): CustomColumnType<getContractBeneficiaryAndFinancialRulesItems>[] => {
  return [
    {
      title: "ذينفع (شعبه/کاربر)",
      dataIndex: "beneficiaryName",
      key: "beneficiaryName",
      width: 250,
      render: (value: string) => {
        return dataPlaceHolder({ data: value });
      },
    },
    {
      title: "کسب و کار",
      dataIndex: "businessName",
      key: "businessName",
      width: 150,
      render: (value: string) => {
        return dataPlaceHolder({ data: value });
      },
    },
    {
      title: "نوع شعبه ",
      dataIndex: "branchType",
      key: "branchType",
      width: 150,
      render: (value: IdTitle) => {
        return dataPlaceHolder({ data: value?.title });
      },
    },
    {
      title: "نوع",
      dataIndex: "beneficiaryRuleType",
      key: "beneficiaryRuleType",
      width: 160,
      render: (value: string) => {
        const name = value as keyof typeof kindOffBeneficiary;

        const label = kindOffBeneficiary[name];
        const color = kindOffBeneficiaryColor[name];

        if (!label) return "-";

        return (
          <div className="flex gap-1">
            <CustomTag color={color}>{label}</CustomTag>
          </div>
        );
      },
    },
    {
      title: "فروشنده",
      dataIndex: "isSupplier",
      key: "isSupplier",
      width: 100,
      render: (value: boolean) => {
        return (
          <div className="flex gap-1">
            {value ? <IoCheckbox size={22} color={GREEN_07} /> : "-"}
          </div>
        );
      },
    },
    {
      title: "سهم",
      dataIndex: "percentage",
      key: "percentage",
      width: 70,
      render: (value: number) => {
        return dataPlaceHolder({ data: value }) + "%";
      },
    },
    {
      title: "خدمت سهامدار",
      dataIndex: "beneficiarySupport",
      key: "beneficiarySupport",
      width: 150,
      render: (_: unknown, record: getContractBeneficiaryAndFinancialRulesItems) => {
        return dataPlaceHolder({ data: record?.beneficiarySupport?.title });
      },
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      width: 120,
      className: "tables-sticky-column-left",
      render: (value: number, record: getContractBeneficiaryAndFinancialRulesItems) => {
        // متغیرها
        if (
          record.beneficiaryRuleType === BeneficiaryType.PERSONAL_UNDETERMINED ||
          record.beneficiaryRuleType === BeneficiaryType.LEGAL_UNDETERMINED
        ) {
          return (
            <CustomButton type="link">
              <Link
                to={{
                  pathname: CONTRACTS_TEMPLATE_LEGAL_VARIABLES_LIST_PAGE_ROUTE,
                  search: makeSearchParams({
                    id: value,
                    templateId: tempId,
                    businessName: record?.businessName,
                  }),
                }}
                className="text-primary-6 cursor-pointer"
              >
                مشاهده
              </Link>
            </CustomButton>
          );
        }
        // ثابت ها
        if (
          record?.beneficiaryRuleType === "LEGAL_DETERMINED" ||
          record?.beneficiaryRuleType === "PERSONAL_DETERMINED"
        ) {
          return (
            <CustomButton type="link" onClick={() => drawerClickHandler(value)}>
              مشاهده
            </CustomButton>
          );
        }
        // todo[shirin]: به درخواست اقای جماعتی کامنت شد
        // گروهی تک ایجاد کننده
        // if (record.beneficiaryRuleType?.name === "GROUPING" && record.groupsType === 1) {
        //   return (
        //     <CustomButton type="link">
        //       <Link
        //         to={{
        //           pathname: CONTRACTS_TEMPLATE_GROUPS_LIST_PAGE_ROUTE,
        //           search: makeSearchParams({
        //             id: value,
        //           }),
        //         }}
        //         className="text-primary-6 cursor-pointer"
        //       >
        //         مشاهده
        //       </Link>
        //     </CustomButton>
        //   );
        // }
        //  گروهی چند ایجاد کننده
        // if (record.beneficiaryRuleType === "GROUPING" && record.groupsType === 2) {
        //   return (
        //     <CustomButton type="link">
        //       <Link
        //         to={{
        //           pathname: CONTRACTS_TEMPLATE_CREATORS_LEGAL_LIST_PAGE_ROUTE,
        //           search: makeSearchParams({
        //             id: value,
        //           }),
        //         }}
        //         className="text-primary-6 cursor-pointer"
        //       >
        //         مشاهده
        //       </Link>
        //     </CustomButton>
        //   );
        // }
      },
    },
  ];
};

export default TemplateServiceFinancialLawTabTableModel;
