import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { makeSearchParams } from "@infra/helpers/utils";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { MANAGEMENT_ALL_DETAIL_PAGE_ROUTE } from "@infra/router/routes/management";
import { ContractsDetailFinancialRulesDetailsBeneficiaryDataTypes } from "@pages/Contract/ContractsList/ContractsDetail/helper/components/ContractsDetailFinancialRules/helpers/components/ContractsDetailFinancialRulesDetails/helper/components/ContractsDetailFinancialRulesDetailsBeneficiary/@types/@contractsDetailFinancialRulesDetailsBeneficiary";

const ContractsDetailFinancialRulesDetailsBeneficiaryModelTable =
  (): CustomColumnType<ContractsDetailFinancialRulesDetailsBeneficiaryDataTypes>[] => {
    return [
      {
        title: "کاربران ذینفع گروه",
        dataIndex: "userName",
        key: "userName",
        width: 200,
        searchable: true,
      },
      {
        title: "کدملی/فراگیر",
        dataIndex: "nationalCode",
        key: "nationalCode",
        width: 150,
        searchable: true,
      },
      {
        title: "وضعیت",
        dataIndex: "status",
        key: "status",
        width: 120,
        sorter: (a: any, b: any) => {
          return a.status.localeCompare(b.status);
        },
        render: (value: string) => {
          return (
            <CustomTag className="w-fit" color="green">
              {value}
            </CustomTag>
          );
        },
      },
      {
        title: "تاریخ شروع",
        dataIndex: "startDate",
        key: "startDate",
        width: 150,
        sorter: (a: any, b: any) => {
          if (!a.startDate || !b.startDate) return 0;
          const aDate = new Date(a.startDate).getTime();
          const bDate = new Date(b.startDate).getTime();
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
          if (!a.endDate || !b.endDate) return 0;
          const aDate = new Date(a.endDate).getTime();
          const bDate = new Date(b.endDate).getTime();
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
        title: "سهم",
        dataIndex: "share",
        key: "share",
        width: 100,
        sorter: (a: any, b: any) => {
          const aValue = parseInt(a.share.replace("%", "")) || 0;
          const bValue = parseInt(b.share.replace("%", "")) || 0;
          return aValue - bValue;
        },
      },
      {
        title: "",
        dataIndex: "id",
        key: "view",
        fixed: "right" as FixedType,
        width: 150,
        className: "tables-sticky-column-left",
        render: (_: any, record: any) => {
          return (
            <CustomButton type="link">
              <Link
                to={{
                  pathname: MANAGEMENT_ALL_DETAIL_PAGE_ROUTE,
                  search: makeSearchParams({
                    id: record.id,
                  }),
                }}
                className="text-primary-6 cursor-pointer"
              >
                مشاهده پروفایل
              </Link>
            </CustomButton>
          );
        },
      },
    ];
  };

export default ContractsDetailFinancialRulesDetailsBeneficiaryModelTable;
