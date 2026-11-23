import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { emptyString } from "@infra/config/global.vars";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder, makeSearchParams } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { CONTRACTS_DETAIL_PAGE_ROUTE } from "@infra/router/routes/contracts";
import {
  renderContractDiffDaysTag,
  isContractNearExpiry,
  calculateContractDiffDays,
} from "@pages/Contract/ContractsList/_shared/utils";

import { GetContractsListContent } from "../../@types/@contractListTypes";

import "@components/Renderers/CustomTagWithDiffDays/_customTagWithDiffDays.scss";

const ContractsListModelTable = (): CustomColumnType<GetContractsListContent>[] => {
  return [
    {
      title: "شناسه",
      dataIndex: "contractId",
      key: "contractId",
      width: 100,
      render: (value: string) => dataPlaceHolder({ data: value }),
      //todo[nima] api
      // ...GetServerColumnSearchProps({
      //   dataIndex: "contractId",
      //   label: "شناسه",
      //   type: "text",
      // }),
    },
    {
      title: "مانده به پایان",
      dataIndex: "endDate",
      key: "endDate",
      width: 100,
      render: (_: string, record: GetContractsListContent) => {
        return renderContractDiffDaysTag(record?.startDate, record?.endDate);
      },
    },
    {
      title: "قالب قرارداد",
      dataIndex: "templateId",
      key: "templateId",
      width: 120,
      //todo[nima] api
      // ...GetServerColumnSearchProps({
      //   dataIndex: "templateId",
      //   label: "قالب قرارداد",
      //   type: "text",
      // }),
      render: (value: number) => (
        <span className="text-primary">
          {dataPlaceHolder({ data: value?.toString() })}
        </span>
      ),
    },
    // Todo[Atefeh]: delete if not needed in the future
    // {
    //   title: "وضعیت",
    //   dataIndex: "status",
    //   key: "status",
    //   width: 90,
    //   render: (value: ContractsRuleStatus | undefined) => {
    //     const statusMap: Record<
    //       string,
    //       { color: string; label: string; enum: ContractStatus }
    //     > = {
    //       ACTIVE: { color: "green", label: "فعال", enum: ContractStatus.ACTIVE },
    //       INACTIVE: { color: "red", label: "غیر فعال", enum: ContractStatus.INACTIVE },
    //     };
    //     const statusName = value?.name;
    //     const statusInfo = statusMap[statusName as keyof typeof statusMap];
    //     if (!statusInfo) {
    //       return (
    //         <CustomTag className="w-fit">
    //           {value?.title || value?.name || emptyString}
    //         </CustomTag>
    //       );
    //     }
    //     return (
    //       <CustomTag color={statusInfo.color} className="w-fit">
    //         {statusInfo.label}
    //       </CustomTag>
    //     );
    //   },
    // },
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
              <CustomTag key={item}>{dataPlaceHolder({ data: item })}</CustomTag>
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
      title: "سرویس",
      dataIndex: "samimService",
      key: "samimService",
      render: (value: string) => (value ? <SamimServiceTag service={value} /> : "-"),
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
        <CustomTag className="w-fit">{dataPlaceHolder({ data: value })}</CustomTag>
      ),
    },
    {
      title: "اکوسیستم",
      dataIndex: "ecosystemTitle",
      key: "ecosystemTitle",
      width: 240,
      //todo[nima] api
      // ...GetServerColumnSearchProps({
      //   dataIndex: "ecosystemTitle",
      //   label: "اکوسیستم",
      //   type: "text",
      // }),
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "طرفین",
      dataIndex: "partiesTitles",
      key: "partiesTitles",
      width: 210,
      //todo[nima] api
      // ...GetServerColumnSearchProps({
      //   dataIndex: "partiesTitles",
      //   label: "طرفین",
      //   type: "text",
      // }),
      render: (value: (string | null | undefined)[] | undefined) => {
        if (!value || !Array.isArray(value) || value.length === 0) {
          return <CustomTag className="w-fit">-</CustomTag>;
        }
        // فقط مقادیر معتبر رو نگه می‌داره
        const validItems = value.filter((item): item is string => item != null);
        if (validItems.length === 0) {
          return <CustomTag className="w-fit">-</CustomTag>;
        }
        const displayItems = validItems.slice(0, 1);
        const remainingCount = validItems.length - 1;

        return (
          <div className="flex gap-1">
            {displayItems.map((item) => (
              <CustomTag key={item}>{dataPlaceHolder({ data: item })}</CustomTag>
            ))}
            {remainingCount > 0 && <CustomTag>+{remainingCount}</CustomTag>}
          </div>
        );
      },
    },
    {
      title: "قالب ذینفع متغیر",
      dataIndex: "countBeneficiaryDynamicBeneficiary",
      key: "countBeneficiaryDynamicBeneficiary",
      width: 140,
      render: (value: number) => dataPlaceHolder({ data: value?.toString() }),
    },
    {
      title: "ذینفعان",
      dataIndex: "countBeneficiary",
      key: "countBeneficiary",
      width: 100,
      render: (value: number) => dataPlaceHolder({ data: value?.toString() }),
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
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "تاریخ ایجاد",
      dataIndex: "createdDate",
      key: "createdDate",
      width: 110,
      render: (value: string) =>
        dataPlaceHolder({ data: value, isDate: true, customDateFormat: "YYYY/MM/DD" }),
    },
    // Todo[Atefeh]: delete if not needed in the future
    // {
    //   title: " آخرین ویرایش کننده",
    //   dataIndex: "modifiedBy",
    //   key: "modifiedBy",
    //   width: 160,
    //   ...GetServerColumnSearchProps({
    //     dataIndex: "modifiedBy",
    //     label: "آخرین ویرایش کننده",
    //     type: "text",
    //   }),
    //   render: (value: string) => dataPlaceHolder({ data: value }),
    // },
    // {
    //   title: "آخرین تغییر وضعیت",
    //   dataIndex: "modifiedDate",
    //   key: "modifiedDate",
    //   width: 140,
    //   render: (value: string | undefined) =>
    //     dataPlaceHolder({
    //       data: value,
    //       isDate: true,
    //       customDateFormat: "HH:mm, YYYY/MM/DD",
    //     }),
    // },
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
          <div className="flex items-center justify-center gap-2.5">
            <Link
              to={{
                pathname: CONTRACTS_DETAIL_PAGE_ROUTE,
                search: makeSearchParams({
                  id: record?.contractId,
                  ...(diffDays !== undefined && { diffDays: diffDays.toString() }),
                }),
              }}
              className="text-link flex items-center justify-center"
            >
              جزییات
            </Link>
            {shouldShowReminder && (
              <CustomButton type="link" danger disabled>
                یادآوری
              </CustomButton>
            )}
          </div>
        );
      },
    },
  ];
};

export default ContractsListModelTable;
