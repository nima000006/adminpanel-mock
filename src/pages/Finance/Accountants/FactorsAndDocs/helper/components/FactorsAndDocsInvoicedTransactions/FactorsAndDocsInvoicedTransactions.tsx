import { useCallback, useEffect, useMemo, useState } from "react";

import { Col, MenuProps, Row } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { AiOutlineFilter } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { PiFilePlus } from "react-icons/pi";
import { PiSealWarningFill } from "react-icons/pi";
import { useNavigate } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDropdown from "@components/CustomInputs/CustomDropdown/CustomDropdown";
import CustomRangePicker from "@components/CustomInputs/CustomRangePicker/CustomRangePicker";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { jalaliToGregorianWithoutZ } from "@infra/helpers/DatePickerFix/utils/jalaliToGregorianWithoutZ";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { makeSearchParams } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyAccountingGetAllBusinessQuery,
  useLazyAccountingGetBranchesQuery,
} from "@infra/states/redux/Apis/business/business/businessApi";
import {
  useGetAllInvoicedTransactionsMutation,
  useLazyGetAllInvoicedTransactionsDetailsQuery,
} from "@infra/states/redux/Apis/finance/financeApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { GOLD_6 } from "@infra/VARS/globalColors/globalColors";
import { rangePresets } from "@pages/Finance/_shared/utils";
import { BusinessItem } from "@pages/Finance/Accountants/_shared/@types/@accountantsType";
import { serviceOptions, statusOptions } from "@pages/Finance/Accountants/_shared/utils";

import {
  AccountingInvoicedTransactionRequest,
  TransactionItem,
} from "./@types/@accountingInvoicedTransactionsTypes";
import FactorsAndDocsInvoicedTransactionDrawerContent from "./helper/components/FactorsAndDocsInvoicedTransactionDrawerContent";
import FactorsAndDocsInvoicedTransactionsTableModel from "./helper/models/FactorsAndDocsInvoicedTransactionsTableModel";
import "./_factorsAndDocsInvoicedTransactions.scss";

const FactorsAndDocsInvoicedTransactions = () => {
  const [filters, setFilters] = useState<{
    range?: [Dayjs, Dayjs];
    businessId?: number;
    branchId?: number;
    service?: string;
    status?: string;
  }>({});

  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const { params: url, setSearchParams } = useQueryParams();

  const allFilled = useMemo(() => {
    return (
      filters.range &&
      filters.range[0] &&
      filters.range[1] &&
      filters.businessId &&
      filters.branchId &&
      filters.service &&
      filters.status
    );
  }, [filters]);

  const exportMenu: MenuProps = {
    items: [
      {
        label: "خروجی Excel",
        key: "excel",
      },
      {
        label: "خروجی PDF",
        key: "pdf",
      },
    ],
  };

  //? ================================ API ================================
  const [
    getTransactions,
    { data: transactionsData, isLoading: isGetTransactionsLoading },
  ] = useGetAllInvoicedTransactionsMutation();
  const [
    getTransactionDetails,
    { data: TransactionDetailsData, isLoading: isGetTransactionDetailsLoading },
  ] = useLazyGetAllInvoicedTransactionsDetailsQuery();

  const [triggerBusinessQuery, { data: businessApiData, isLoading: businessLoading }] =
    useLazyAccountingGetAllBusinessQuery();

  const [triggerBranchQuery, { data: branchApiData, isLoading: branchLoading }] =
    useLazyAccountingGetBranchesQuery();
  //? ================================ Effects ================================
  useEffect(() => {
    const id = Number(url?.id);
    if (!id) return;
    getTransactionDetails({ transactionId: id });
  }, [url?.id, getTransactionDetails]);

  useEffect(() => {
    const id = url.transactionId ? Number(url.transactionId) : undefined;
    if (id) {
      setIsOpen(true);
      getTransactionDetails({ transactionId: id });
    }
  }, [url.transactionId, getTransactionDetails]);

  useEffect(() => {
    if (allFilled) {
      const body: AccountingInvoicedTransactionRequest = {
        pageable: {
          paged: true,
          pageNumber: 0,
          pageSize: 10,
          offset: 0,
          sort: [],
          unpaged: false,
        },
        from: filters?.range?.[0]
          ? jalaliToGregorianWithoutZ(filters?.range?.[0])
          : undefined,
        to: filters?.range?.[1]
          ? jalaliToGregorianWithoutZ(filters?.range?.[1])
          : undefined,
        branchId: filters?.branchId,
        status: filters.status,
        serviceName: filters.service,
      };
      getTransactions(body);
    }
  }, [allFilled, filters, getTransactions]);

  useEffect(() => {
    triggerBusinessQuery();
  }, [triggerBusinessQuery]);

  useEffect(() => {
    if (filters.businessId) {
      setFilters((prev) => ({
        ...prev,
        branchId: undefined,
      }));
      triggerBranchQuery({ businessId: filters.businessId });
    }
  }, [filters.businessId, triggerBranchQuery]);

  // ================================ Utils functions ================================

  const dynamicBranchOptions = useMemo(() => {
    if (!branchApiData?.content) return [];
    return branchApiData.content.map((branch) => ({
      id: branch.id,
      label: branch.title,
      title: branch.title,
      value: branch.id.toString(),
    }));
  }, [branchApiData]);

  const businessOptions = useMemo(() => {
    if (!businessApiData?.content) return [];
    return businessApiData.content.map((businessItem: BusinessItem) => ({
      id: businessItem.id,
      label: businessItem.title,
      title: businessItem.title,
      value: businessItem.id.toString(),
    }));
  }, [businessApiData]);

  const onCloseDrawerHandler = useCallback(() => {
    setIsOpen(false);
    setSearchParams({});
  }, [setSearchParams]);

  const onDetailClickHandler = (record: TransactionItem) => {
    navigate({
      search: makeSearchParams({ id: record.id }),
    });
    setIsOpen(true);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isOpen ? (
        <CustomDrawer
          open={isOpen}
          onClose={onCloseDrawerHandler}
          className="finance-accounting-invoiced-transaction-drawer-container"
          closeIcon={<AiOutlineClose />}
          title=""
          content={
            <FactorsAndDocsInvoicedTransactionDrawerContent
              closeDrawerHandler={onCloseDrawerHandler}
              TransactionDetailsData={TransactionDetailsData}
              isGetTransactionDetailsLoading={isGetTransactionDetailsLoading}
            />
          }
        />
      ) : null}
      <div className="accounting-invoiced-transaction-container">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={12} lg={8} xl={6}>
            <CustomRangePicker
              disabledDate={(current) => {
                return !!current && current.isAfter(dayjs(), "day");
              }}
              name="range-picker"
              label="سال مالی (بازه تاریخ)"
              onChange={(val: [Dayjs, Dayjs]) =>
                setFilters((prev) => ({ ...prev, range: val }))
              }
              rules={[REQUIRED_RULE]}
              presets={rangePresets}
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={8} xl={6}>
            <CustomSelect
              options={businessOptions}
              loading={businessLoading}
              name="businessId"
              label="کسب و کار"
              placeholder="انتخاب کسب و کار"
              value={filters.businessId?.toString() ?? undefined}
              onChange={(val: unknown) => {
                const businessId = Number(val);
                setFilters((prev) => ({
                  ...prev,
                  businessId: businessId,
                  branchId: undefined,
                }));
                triggerBranchQuery({ businessId });
              }}
              rules={[REQUIRED_RULE]}
            />
          </Col>

          <Col xs={24} sm={12} md={12} lg={8} xl={6}>
            <CustomSelect
              key={`branch-select-${filters.businessId || "no-business"}`}
              options={dynamicBranchOptions}
              name="branchId"
              label="شعبه"
              placeholder="انتخاب شعبه"
              loading={branchLoading}
              disabled={!filters.businessId}
              value={filters.branchId?.toString() ?? undefined}
              onChange={(val: unknown) =>
                setFilters((prev) => ({ ...prev, branchId: Number(val) }))
              }
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={8} xl={6}>
            <CustomSelect
              options={serviceOptions}
              name="serviceName"
              label="سرویس"
              placeholder="انتخاب سرویس"
              onChange={(val: unknown) => {
                const selected = serviceOptions.find((opt) => opt.id === Number(val));
                setFilters((prev) => ({ ...prev, service: selected?.value }));
              }}
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={8} xl={6}>
            <CustomSelect
              options={statusOptions}
              name="status"
              label="وضعیت"
              placeholder="انتخاب وضعیت"
              onChange={(val: unknown) => {
                const selected = statusOptions.find((opt) => opt.id === Number(val));
                setFilters((prev) => ({ ...prev, status: selected?.value }));
              }}
              rules={[REQUIRED_RULE]}
            />
          </Col>
        </Row>
        {!allFilled ? (
          <CustomAlert
            title="امکان مشاهده تراکنش وجود ندارد!"
            type="warning"
            banner
            description={
              <>
                <p>
                  در صورتی که قصد مشاهده تراکنش را دارید ابتدا از قسمت بالا موارد زیر را
                  انتخاب بفرمایید.
                </p>
                <ul className="accounting-alert-custom-list">
                  <li>کسب و کار</li>
                  <li>شعبه : یک شعبه را انتخاب بفرمایید.</li>
                  <li>سرویس : یک سرویس را انتخاب بفرمایید.</li>
                  <li>سال مالی : سال مالی خود را مشخص بفرمایید.</li>
                </ul>
              </>
            }
          />
        ) : (
          <div className="accounting-custom-information-transaction-container">
            <PiSealWarningFill color={GOLD_6} />
            <p>همه تراکنش ها</p>
            <p>{transactionsData?.totalElements}</p>
          </div>
        )}

        <ToolBox
          className="accounting-toolBox-container"
          rightSide={
            <CustomButton disabled icon={<AiOutlineFilter />}>
              فیلتر پیشرفته
            </CustomButton>
          }
          leftSide={
            <div className="accounting-custom-button">
              <CustomDropdown items={exportMenu} trigger={["click"]}>
                <CustomButton disabled>
                  خروجی <IoIosArrowDown />
                </CustomButton>
              </CustomDropdown>
              <CustomButton disabled>
                ایجاد فاکتور <PiFilePlus />
              </CustomButton>
            </div>
          }
        />

        <CustomTable<TransactionItem>
          rowKey="trackNumber"
          dataSource={allFilled ? (transactionsData?.content ?? []) : []}
          columns={FactorsAndDocsInvoicedTransactionsTableModel({
            onDetailClickHandler: onDetailClickHandler,
          })}
          loading={isGetTransactionsLoading}
          pagination={manualPaginationConfig({
            total: transactionsData?.totalElements,
            onChange: (page, pageSize) => {
              setSearchParams({
                ...url,
                page: page?.toString(),
                pageSize: pageSize?.toString(),
              });
            },
            pageNumber: url?.page ? Number(url?.page) : 1,
            defaultPageSize: url?.pageSize ? Number(url?.pageSize) : 8,
          })}
          key={`table-${url?.pageSize || "8"} `}
          {...TABLE_PROPS(transactionsData?.content.length || 0)}
        />
      </div>
    </>
  );
};
export default FactorsAndDocsInvoicedTransactions;
