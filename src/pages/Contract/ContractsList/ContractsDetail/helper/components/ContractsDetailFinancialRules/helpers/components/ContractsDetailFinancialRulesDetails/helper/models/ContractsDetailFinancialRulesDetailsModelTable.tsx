import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder, makeSearchParams } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { CONTRACTS_DETAIL_FINANCIAL_RULES_BENEFICIARY_PAGE_ROUTE } from "@infra/router/routes/contracts";
import { contractsDetailFinancialRulesDetailsDataTypes } from "@pages/Contract/ContractsList/ContractsDetail/helper/components/ContractsDetailFinancialRules/helpers/components/ContractsDetailFinancialRulesDetails/@types/@contractsDetailFinancialRulesDetails";

const ContractsDetailFinancialRulesDetailsModelTable =
  (): CustomColumnType<contractsDetailFinancialRulesDetailsDataTypes>[] => {
    return [
      {
        title: "عنوان",
        dataIndex: "title",
        key: "title",
        width: 200,
        searchable: true,
      },
      {
        title: "کاربران عضو گروه",
        dataIndex: "groupMembers",
        key: "groupMembers",
        width: 150,
        searchable: true,
      },
      {
        title: "وضعیت",
        dataIndex: "status",
        key: "status",
        width: 120,
        render: (value: string) => {
          return <CustomTag color="green">{value}</CustomTag>;
        },
        searchable: true,
      },
      {
        title: "تاریخ ایجاد",
        dataIndex: "creationDate",
        key: "creationDate",
        width: 150,
        sorter: (a: any, b: any) => {
          if (!a.creationDate || !b.creationDate) return 0;
          const aDate = new Date(a.creationDate).getTime();
          const bDate = new Date(b.creationDate).getTime();
          if (isNaN(aDate) || isNaN(bDate)) return 0;
          return aDate - bDate;
        },
        render: (value: string) => {
          return dataPlaceHolder({
            data: value,
            isDate: true,
            customDateFormat: "YYYY/MM/DD",
          });
        },
      },
      {
        title: "تاریخ پایان",
        dataIndex: "endDate",
        key: "endDate",
        width: 150,
        sorter: (a: any, b: any) => {
          if (!a.endDate || a.endDate === "-" || !b.endDate || b.endDate === "-") {
            if (!a.endDate || a.endDate === "-") return 1;
            if (!b.endDate || b.endDate === "-") return -1;
            return 0;
          }
          const aDate = new Date(a.endDate).getTime();
          const bDate = new Date(b.endDate).getTime();
          if (isNaN(aDate) || isNaN(bDate)) return 0;
          return aDate - bDate;
        },
        render: (value: string) => {
          if (!value || value === "-") return "-";
          return dataPlaceHolder({
            data: value,
            isDate: true,
            customDateFormat: "YYYY/MM/DD",
          });
        },
      },
      {
        title: "",
        dataIndex: "id",
        key: "view",
        fixed: "right" as FixedType,
        width: 150,
        className: "tables-sticky-column-left",
        render: (_: unknown, record: any) => {
          return (
            <CustomButton type="link">
              <Link
                to={{
                  pathname: CONTRACTS_DETAIL_FINANCIAL_RULES_BENEFICIARY_PAGE_ROUTE,
                  search: makeSearchParams({ id: record.id }),
                }}
                className="text-primary-6 cursor-pointer"
              >
                مشاهده کاربران
              </Link>
            </CustomButton>
          );
        },
      },
    ];
  };

export default ContractsDetailFinancialRulesDetailsModelTable;
