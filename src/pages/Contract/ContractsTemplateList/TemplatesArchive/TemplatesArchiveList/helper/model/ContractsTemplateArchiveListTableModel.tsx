import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { dataPlaceHolder, makeSearchParams } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import {
  CONTRACTS_CONNECT_CONTRACTS_LIST_PAGE_ROUTE,
  CONTRACTS_TEMPLATE_ARCHIVE_DETAIL_PAGE_ROUTE,
} from "@infra/router/routes/contracts";
import { ContractTemplateListItem } from "@pages/Contract/ContractsTemplateList/ContractsTemplateList/@types/ContractsTemplateListTypes";

const ContractsTemplateArchiveListTableModel =
  (): CustomColumnType<ContractTemplateListItem>[] => {
    return [
      {
        title: "شناسه قالب",
        dataIndex: "id",
        key: "id",
        width: 100,
        render: (value: number) => dataPlaceHolder({ data: value.toString() }),
      },
      {
        title: "عنوان",
        dataIndex: "title",
        key: "title",
        width: 200,
        render: (value: string) => dataPlaceHolder({ data: value }),
      },
      {
        title: "قرارداد های متصل",
        dataIndex: "countConnectedContract",
        key: "countConnectedContract",
        width: 150,
        render: (value: number, records: ContractTemplateListItem) => {
          return value === 0 ? (
            value
          ) : (
            <Link
              to={{
                pathname: CONTRACTS_CONNECT_CONTRACTS_LIST_PAGE_ROUTE,
                search: makeSearchParams({
                  templateId: records?.id,
                }),
              }}
              className="text-primary-6! cursor-pointer"
            >
              {dataPlaceHolder({ data: value.toString() })}
            </Link>
          );
        },
      },
      {
        title: "اکوسیستم",
        dataIndex: "ecosystemTitle",
        key: "ecosystemTitle",
        width: 150,
        render: (value: string) => dataPlaceHolder({ data: value }),
      },
      {
        title: "طرفین",
        dataIndex: "partiesTitle",
        key: "partiesTitle",
        width: 150,
        render: (value: number, records: ContractTemplateListItem) => {
          return (
            <div className="flex gap-1">
              <CustomTag className="w-fit" color={"default"}>
                {dataPlaceHolder({ data: value.toString() })}
              </CustomTag>
              {records?.partiesTitle?.length > 1 && (
                <CustomTag className="w-fit" color={"default"}>
                  {records?.partiesTitle?.length - 1}+
                </CustomTag>
              )}
            </div>
          );
        },
      },
      {
        title: "سرویس",
        dataIndex: "samimService",
        key: "samimService",
        width: 100,
        render: (_: string, records: ContractTemplateListItem) => {
          return <SamimServiceTag service={records?.samimService?.name} />;
        },
      },
      {
        title: "خدمت",
        dataIndex: "categoriesTitle",
        key: "categoriesTitle",
        width: 120,
        render: (value: string, records: ContractTemplateListItem) => {
          return (
            <div className="flex gap-1">
              <CustomTag className="w-fit" color={"default"}>
                {dataPlaceHolder({ data: value.toString() })}
              </CustomTag>
              {records?.categoriesTitle?.length > 1 && (
                <CustomTag className="w-fit" color={"default"}>
                  {records?.categoriesTitle?.length - 1}+
                </CustomTag>
              )}
            </div>
          );
        },
      },
      {
        title: "قالب ذینفع متغیر",
        dataIndex: "countBeneficiaryDynamicBeneficiary",
        key: "countBeneficiaryDynamicBeneficiary",
        width: 150,
        render: (value: number) => dataPlaceHolder({ data: value.toString() }),
      },
      {
        title: "ذینفعان",
        dataIndex: "countBeneficiary",
        key: "countBeneficiary",
        width: 70,
        render: (value: number) => dataPlaceHolder({ data: value.toString() }),
      },
      {
        title: "آخرین ویرایش کننده",
        dataIndex: "modifiedBy",
        key: "modifiedBy",
        width: 150,
      },
      {
        title: "آخرین تغییر وضعیت",
        dataIndex: "modifiedDate",
        key: "modifiedDate",
        width: 150,
        render: (value: string) => {
          return dataPlaceHolder({ data: value, isDate: true });
        },
      },
      {
        title: "ایجاد کننده",
        dataIndex: "creator",
        key: "creator",
        width: 120,
        render: (value: string) => {
          return dataPlaceHolder({ data: value });
        },
      },
      {
        title: "تاریخ ایجاد",
        dataIndex: "createdDate",
        key: "createdDate",
        width: 120,
        render: (value: string) => {
          return dataPlaceHolder({ data: value, isDate: true });
        },
      },

      {
        title: "",
        dataIndex: "id",
        key: "id",
        fixed: "right" as FixedType,
        width: 100,
        className: "tables-sticky-column-left",
        render: (value: number, records: ContractTemplateListItem) => {
          return (
            <div className="flex items-center justify-center gap-2.5">
              <CustomButton type="link">
                <Link
                  to={{
                    pathname: CONTRACTS_TEMPLATE_ARCHIVE_DETAIL_PAGE_ROUTE,
                    search: makeSearchParams({
                      id: value,
                    }),
                  }}
                  className="text-primary-6 cursor-pointer"
                >
                  جزییات
                </Link>
              </CustomButton>
              {records?.countConnectedContract > 0 && (
                <Link
                  to={{
                    pathname: CONTRACTS_CONNECT_CONTRACTS_LIST_PAGE_ROUTE,
                    search: makeSearchParams({
                      templateId: value,
                    }),
                  }}
                  className="text-primary-6! cursor-pointer"
                >
                  قراردادها
                </Link>
              )}
            </div>
          );
        },
      },
    ];
  };
export default ContractsTemplateArchiveListTableModel;
