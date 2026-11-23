// import { Link } from "react-router";
// import { dataPlaceHolder, makeSearchParams } from "@infra/helpers/utils";
// import { CONTRACTS_CONTRACT_DETAIL_FINANCIAL_RULES_PAGE_ROUTE } from "@infra/router/routes/contracts";
import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";

import { ContractsDetailFinancialRulesModelTableProps } from "./@types/@contractsDetailFinancialRulesModelTableProps";
import {
  GetContractsDetailRulesBeneficiariesBranchType,
  GetContractsDetailRulesBeneficiariesContentItem,
} from "../../@types/@getContractsDetailRulesBeneficiaries";

const ContractsDetailFinancialRulesModelTable = ({
  drawerClickHandler,
}: ContractsDetailFinancialRulesModelTableProps): CustomColumnType<GetContractsDetailRulesBeneficiariesContentItem>[] => {
  return [
    {
      title: "ذينفع (شعبه/کاربر)",
      dataIndex: "beneficiary",
      key: "beneficiary",
      width: 350,
      //todo[nima] api
      // ...GetServerColumnSearchProps({
      //   label: "ذينفع (شعبه/کاربر)",
      //   dataIndex: "beneficiary",
      //   type: "text"
      // }),
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "کسب و کار",
      dataIndex: "business",
      key: "business",
      width: 350,
      //todo[nima] api
      // ...GetServerColumnSearchProps({
      //   label: "کسب و کار",
      //   dataIndex: "business",
      //   type: "text"
      // }),
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "نوع",
      dataIndex: "businessType",
      key: "businessType",
      width: 160,
      //todo[nima] api
      // ...GetServerColumnSearchProps({
      //   label: "نوع",
      //   dataIndex: "businessType",
      //   type: "text"
      // }),
      render: (_: unknown, record: GetContractsDetailRulesBeneficiariesContentItem) => {
        const isPersonal = record.businessType?.name === "PERSONAL";

        const tagColor = isPersonal ? "warning" : "blue";

        return (
          <div className="flex gap-1">
            <CustomTag color={tagColor}>{record?.businessType?.title}</CustomTag>

            {record?.supplier && <CustomTag color="default">تامین کننده</CustomTag>}
          </div>
        );
      },
    },
    {
      title: "نوع شعبه",
      dataIndex: "branchType",
      key: "branchType",
      width: 120,
      //todo[nima] api
      // ...GetServerColumnSearchProps({
      //   label:"نوع شعبه",
      //   dataIndex: "branchType",
      //   type: "text"
      // }),
      render: (value: GetContractsDetailRulesBeneficiariesBranchType) =>
        dataPlaceHolder({ data: value?.title }),
    },

    {
      title: "سهم",
      dataIndex: "partitionCoefficient",
      key: "partitionCoefficient",
      width: 70,
      render: (value: number) => dataPlaceHolder({ data: value.toString() }),
    },
    {
      title: "مشاهده",
      dataIndex: "id",
      key: "view",
      fixed: "right" as FixedType,
      width: 120,
      className: "tables-sticky-column-left",
      render: (_: unknown, record: GetContractsDetailRulesBeneficiariesContentItem) => {
        // if (record.isGroup === true) {
        //   return (
        //     <CustomButton type="link">
        //       <Link
        //         to={{
        //           pathname: CONTRACTS_CONTRACT_DETAIL_FINANCIAL_RULES_PAGE_ROUTE,
        //           search: makeSearchParams({
        //             id: record.id,
        //           }),
        //         }}
        //         className="text-primary-6 cursor-pointer"
        //       >
        //         مشاهده
        //       </Link>
        //     </CustomButton>
        //   );
        // }
        return (
          <CustomButton type="link" onClick={() => drawerClickHandler(record)}>
            مشاهده
          </CustomButton>
        );
      },
    },
  ];
};

export default ContractsDetailFinancialRulesModelTable;
