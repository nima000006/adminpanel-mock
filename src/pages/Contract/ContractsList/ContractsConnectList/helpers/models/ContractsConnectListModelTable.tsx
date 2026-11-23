import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { emptyString } from "@infra/config/global.vars";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder, makeSearchParams } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { CONTRACTS_DETAIL_PAGE_ROUTE } from "@infra/router/routes/contracts";
import {
  calculateContractDiffDays,
  isContractNearExpiry,
  renderContractDiffDaysTag,
} from "@pages/Contract/ContractsList/_shared/utils";
import { GetContractsListContent } from "@pages/Contract/ContractsList/ContractsList/@types/@contractListTypes";
import "@components/Renderers/CustomTagWithDiffDays/_customTagWithDiffDays.scss";

const ContractsConnectListModelTable =
  (): CustomColumnType<GetContractsListContent>[] => {
    return [
      {
        title: "شناسه",
        dataIndex: "contractId",
        key: "contractId",
        width: 100,
        render: (value: number) => dataPlaceHolder({ data: value }),
      },
      {
        title: "تا پایان",
        dataIndex: "endDate",
        key: "endDate",
        width: 100,
        render: (_: string, record: GetContractsListContent) => {
          return renderContractDiffDaysTag(record?.startDate, record?.endDate);
        },
      },
      {
        title: "ذینفعان",
        dataIndex: "ruleBeneficiariesTitles",
        key: "ruleBeneficiariesTitles",
        width: 270,
        //todo[nima] api
        // ...GetServerColumnSearchProps({
        //   dataIndex: "ruleBeneficiariesTitles",
        //   label: "ذینفعان",
        //   type: "text",
        // }),
        render: (value: string[] | undefined) => {
          if (!value || !Array.isArray(value) || value.length === 0) {
            return "-";
          }

          const displayItems = value.slice(0, 2);
          const remainingCount = value.length - 2;

          return (
            <div className="flex gap-1">
              {displayItems.map((item) => (
                <CustomTag key={item}>
                  {dataPlaceHolder({ data: item.toString() })}
                </CustomTag>
              ))}
              {remainingCount > 0 && <CustomTag>+{remainingCount}</CustomTag>}
            </div>
          );
        },
      },
      {
        title: "فروشنده",
        dataIndex: "partiesTitles",
        key: "partiesTitles",
        width: 270,
        //todo[nima] api
        // ...GetServerColumnSearchProps({
        //   dataIndex: "partiesTitles",
        //   label: "فروشنده",
        //   type: "text",
        // }),
        render: () => emptyString,
      },
      {
        title: "خدمت",
        dataIndex: "categoryTitle",
        key: "categoryTitle",
        width: 120,
        //todo[nima] api
        // ...GetServerColumnSearchProps({
        //   dataIndex: "categoryTitle",
        //   label: "خدمت",
        //   type: "text",
        // }),
        render: (value: string) => (
          <CustomTag className="w-fit">
            {dataPlaceHolder({ data: value.toString() })}
          </CustomTag>
        ),
      },
      {
        title: "تاریخ شروع",
        dataIndex: "startDate",
        key: "startDate",
        width: 110,
        render: (value: string) =>
          dataPlaceHolder({ data: value, isDate: true, customDateFormat: "YYYY/MM/DD" }),
      },
      {
        title: "تاریخ پایان",
        dataIndex: "endDate",
        key: "endDate",
        width: 110,
        render: (value: string) =>
          dataPlaceHolder({ data: value, isDate: true, customDateFormat: "YYYY/MM/DD" }),
      },
      {
        title: "ایجاد کننده",
        dataIndex: "createdBy",
        key: "createdBy",
        width: 160,
        ...GetServerColumnSearchProps({
          dataIndex: "creator",
          label: "ایجاد کننده",
          type: "text",
        }),
        render: (value: string) => dataPlaceHolder({ data: value.toString() }),
      },
      {
        title: "تاریخ ایجاد",
        dataIndex: "createdDate",
        key: "createdDate",
        width: 110,
        render: (value: string) =>
          dataPlaceHolder({ data: value, isDate: true, customDateFormat: "YYYY/MM/DD" }),
      },
      {
        title: " آخرین ویرایش کننده",
        dataIndex: "modifiedBy",
        key: "modifiedBy",
        width: 160,
        ...GetServerColumnSearchProps({
          dataIndex: "modifiedBy",
          label: "آخرین ویرایش کننده",
          type: "text",
        }),
        render: (value: string) => dataPlaceHolder({ data: value }),
      },
      {
        title: "آخرین تغییر وضعیت",
        dataIndex: "modifiedDate",
        key: "modifiedDate",
        width: 140,
        render: (value: string | undefined) =>
          dataPlaceHolder({
            data: value,
            isDate: true,
            customDateFormat: "HH:mm, YYYY/MM/DD",
          }),
      },
      {
        title: "",
        dataIndex: "id",
        key: "id",
        fixed: "right" as FixedType,
        width: 150,
        className: "tables-sticky-column-left",
        render: (_: unknown, record: GetContractsListContent) => {
          const shouldShowReminder = isContractNearExpiry(
            record?.startDate,
            record?.endDate
          );

          const diffDaysResult = calculateContractDiffDays(
            record?.startDate,
            record?.endDate
          );
          const diffDays = diffDaysResult?.diffDays;

          return (
            <>
              <Link
                to={{
                  pathname: CONTRACTS_DETAIL_PAGE_ROUTE,
                  search: makeSearchParams({
                    id: record?.contractId,
                    ...(diffDays !== undefined && { diffDays: diffDays.toString() }),
                  }),
                }}
                className="text-link"
              >
                جزییات
              </Link>
              {shouldShowReminder && (
                <CustomButton type="link" danger disabled>
                  یادآوری
                </CustomButton>
              )}
            </>
          );
        },
      },
    ];
  };

export default ContractsConnectListModelTable;
