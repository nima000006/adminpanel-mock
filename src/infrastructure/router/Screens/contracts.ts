import { lazy } from "react";

import {
  CONTRACTS_CONTRACTS_LIST_PAGE_ROUTE,
  CONTRACTS_CONNECT_CONTRACTS_LIST_PAGE_ROUTE,
  CONTRACTS_DETAIL_PAGE_ROUTE,
  CONTRACTS_ADD_NEW_TEMPLATE_PAGE_ROUTE,
  CONTRACTS_TEMPLATES_LIST_PAGE_ROUTE,
  CONTRACTS_TEMPLATE_DETAIL_PAGE_ROUTE,
  CONTRACTS_TEMPLATE_LEGAL_VARIABLES_LIST_PAGE_ROUTE,
  CONTRACTS_STAKEHOLDERS_LIST_PAGE_ROUTE,
  CONTRACTS_TEMPLATES_SETTINGS_PAGE_ROUTE,
  CONTRACTS_CONTRACT_DETAIL_FINANCIAL_RULES_PAGE_ROUTE,
  CONTRACTS_DETAIL_FINANCIAL_RULES_BENEFICIARY_PAGE_ROUTE,
  CONTRACTS_TEMPLATE_NEW_SERVICE_LIST_PAGE_ROUTE,
  CONTRACTS_TEMPLATE_GROUPS_LIST_PAGE_ROUTE,
  CONTRACTS_TEMPLATE_CREATORS_LEGAL_LIST_PAGE_ROUTE,
  CONTRACTS_TEMPLATE_USERS_LIST_PAGE_ROUTE,
  CONTRACTS_TEMPLATES_ARCHIVE_LIST_PAGE_ROUTE,
  CONTRACTS_TEMPLATE_ARCHIVE_DETAIL_PAGE_ROUTE,
  CONTRACTS_CONTRACTS_ARCHIVE_LIST_PAGE_ROUTE,
  CONTRACTS_CONNECT_CONTRACTS_ARCHIVE_LIST_PAGE_ROUTE,
  CONTRACTS_ARCHIVE_DETAIL_PAGE_ROUTE,
} from "../routes/contracts";

const ContractsList = lazy(
  () => import("../../../pages/Contract/ContractsList/ContractsList/ContractsList")
);
const ContractsDetail = lazy(
  () => import("../../../pages/Contract/ContractsList/ContractsDetail/ContractsDetail")
);
const ContractsDetailFinancialRules = lazy(
  () =>
    import("../../../pages/Contract/ContractsList/ContractsDetail/helper/components/ContractsDetailFinancialRules/helpers/components/ContractsDetailFinancialRulesDetails/ContractsDetailFinancialRulesDetails")
);
const ContractsDetailFinancialRulesBeneficiary = lazy(
  () =>
    import("../../../pages/Contract/ContractsList/ContractsDetail/helper/components/ContractsDetailFinancialRules/helpers/components/ContractsDetailFinancialRulesDetails/helper/components/ContractsDetailFinancialRulesDetailsBeneficiary/ContractsDetailFinancialRulesDetailsBeneficiary")
);
const ContractsConnectList = lazy(
  () =>
    import("../../../pages/Contract/ContractsList/ContractsConnectList/ContractsConnectList")
);
const ContractsConnectArchiveList = lazy(
  () =>
    import("../../../pages/Contract/ContractsList/ContractsConnectArchive/ContractsConnectArchiveList")
);
const ContractsArchiveList = lazy(
  () =>
    import("../../../pages/Contract/ContractsList/ContractsArchive/ContractsArchiveList/ContractsArchive")
);
const ContractsArchiveDetail = lazy(
  () =>
    import("../../../pages/Contract/ContractsList/ContractsArchive/ContractArchiveDetails/ContractArchiveDetails")
);
const AddNewContractTemplate = lazy(
  () => import("../../../pages/Contract/AddNewContractTemplate/AddNewContractTemplate")
);
const ContractTemplatesList = lazy(
  () =>
    import("../../../pages/Contract/ContractsTemplateList/ContractsTemplateList/ContractsTemplateList")
);
const ContractsTemplateDetail = lazy(
  () =>
    import("../../../pages/Contract/ContractsTemplateList/ContractsTemplateDetail/ContractsTemplateDetail")
);
const LegalVariablesList = lazy(
  () =>
    import("../../../pages/Contract/ContractsTemplateList/LegalVariablesList/LegalVariablesList")
);
const ListOfStakeholders = lazy(
  () =>
    import("../../../pages/Contract/ListOfStakeholders/ListOfStakeholders/ListOfStakeholders")
);
const ContractTemplatesSettings = lazy(
  () =>
    import("../../../pages/Contract/TemplateSettings/TemplateSettingsList/TemplateSettingsList")
);
const ContractsDetailNewServiceList = lazy(
  () =>
    import("../../../pages/Contract/ContractsTemplateList/NewServiceList/NewServiceList")
);
const ContractsTemplateGroupgList = lazy(
  () => import("../../../pages/Contract/ContractsTemplateList/GroupsList/GroupsList")
);
const ContractsTemplateCreatorsLegalList = lazy(
  () =>
    import("../../../pages/Contract/ContractsTemplateList/CreatorsLegalList/CreatorsLegalList")
);
const ContractsTemplateUsersList = lazy(
  () => import("../../../pages/Contract/ContractsTemplateList/UsersList/UsersList")
);
const ContractsTemplateArchiveList = lazy(
  () =>
    import("../../../pages/Contract/ContractsTemplateList/TemplatesArchive/TemplatesArchiveList/TemplatesArchiveList")
);
const ContractsTemplateArchiveDetail = lazy(
  () =>
    import("../../../pages/Contract/ContractsTemplateList/TemplatesArchive/TemplatesArchiveDetail/TemplatesArchiveDetail")
);

export const ContractsScreens = [
  {
    component: ContractsList,
    path: CONTRACTS_CONTRACTS_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ContractsDetail,
    path: CONTRACTS_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ContractsConnectList,
    path: CONTRACTS_CONNECT_CONTRACTS_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ContractsConnectArchiveList,
    path: CONTRACTS_CONNECT_CONTRACTS_ARCHIVE_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ContractsArchiveList,
    path: CONTRACTS_CONTRACTS_ARCHIVE_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ContractsArchiveDetail,
    path: CONTRACTS_ARCHIVE_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: AddNewContractTemplate,
    path: CONTRACTS_ADD_NEW_TEMPLATE_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ContractTemplatesList,
    path: CONTRACTS_TEMPLATES_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ContractsTemplateDetail,
    path: CONTRACTS_TEMPLATE_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: LegalVariablesList,
    path: CONTRACTS_TEMPLATE_LEGAL_VARIABLES_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ListOfStakeholders,
    path: CONTRACTS_STAKEHOLDERS_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ContractTemplatesSettings,
    path: CONTRACTS_TEMPLATES_SETTINGS_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ContractsDetailFinancialRules,
    path: CONTRACTS_CONTRACT_DETAIL_FINANCIAL_RULES_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ContractsDetailFinancialRulesBeneficiary,
    path: CONTRACTS_DETAIL_FINANCIAL_RULES_BENEFICIARY_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ContractsDetailNewServiceList,
    path: CONTRACTS_TEMPLATE_NEW_SERVICE_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ContractsTemplateGroupgList,
    path: CONTRACTS_TEMPLATE_GROUPS_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ContractsTemplateCreatorsLegalList,
    path: CONTRACTS_TEMPLATE_CREATORS_LEGAL_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ContractsTemplateUsersList,
    path: CONTRACTS_TEMPLATE_USERS_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ContractsTemplateArchiveList,
    path: CONTRACTS_TEMPLATES_ARCHIVE_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ContractsTemplateArchiveDetail,
    path: CONTRACTS_TEMPLATE_ARCHIVE_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
];
