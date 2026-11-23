import { useEffect, useMemo, useState } from "react";

import { Checkbox, CheckboxChangeEvent, Col, Form, Row } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { toast } from "react-toastify";

import { CustomButton } from "@components/CustomInputs";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomCard from "@components/Renderers/CustomCard/CustomCard";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import Div from "@components/Renderers/Div/Div";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetAccountingOperationQueueBannerQuery,
  useLazyGetAccountingSettledQuery,
} from "@infra/states/redux/Apis/finance/financeApi";
import {
  getAccountingOperationQueueBannerRequest,
  getAccountingOperationQueueBannerResponse,
} from "@pages/Finance/Accountants/AccountingOperation/helper/components/AccountingOperationPaymentQueue/@types/@accountingOperationPaymentQueue";
import AccountingOperationQueuePaidToBeneficiaryDrawerContent from "@pages/Finance/Accountants/AccountingOperation/helper/components/AccountingOperationPaymentQueue/helper/components/AccountingOperationQueuePaidToBeneficiaryDrawerContent/AccountingOperationQueuePaidToBeneficiaryDrawerContent";
import useAccountingOperationPaymentQueueAdvanceFilter from "@pages/Finance/Accountants/AccountingOperation/helper/components/AccountingOperationPaymentQueue/helper/hooks/useAccountingOperationPaymentQueueAdvanceFilter";
import AccountingOperationQueueListTableModel from "@pages/Finance/Accountants/AccountingOperation/helper/components/AccountingOperationPaymentQueue/helper/models/AccountingOperationQueuePaidListTableModel";
import { AccountingOperationPaymentQueueAdvanceFilterFormType } from "@pages/Finance/Accountants/AccountingOperation/shared/@types/@accountingOperation";
import {
  AccountingSettledContent,
  AccountingSettledRequest,
  AccountingSettledResponse,
} from "@pages/Finance/Accountants/FactorsAndDocs/helper/components/FactorsAndDocsSettledDocuments/@types/@factorsAndDocsSettledDocumentsTypes";

const SUCCESS_PAYMENT_MESSAGE = "پرداخت با موفقیت انجام شد.";
const AccountingOperationPaymentQueue = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isAllPagesSelected, setIsAllPagesSelected] = useState(false);

  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);

  const [data, setData] = useState<AccountingSettledResponse>();

  const [bannerData, setBannerData] =
    useState<getAccountingOperationQueueBannerResponse>();

  const [drawerState, setDrawerState] = useState<{
    isOpen: boolean;
    isAllSelected?: boolean;
    uuids?: string[];
    selectedRows?: AccountingSettledContent[];
  }>({
    isOpen: false,
  });

  const { params: url, setSearchParams } = useQueryParams();

  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });

  const [form] = Form.useForm<AccountingOperationPaymentQueueAdvanceFilterFormType>();

  const { filterItemsList } = useAccountingOperationPaymentQueueAdvanceFilter({
    isAdvanceModalOpen,
    form,
  });

  //? ================================  Api Calls ================================

  const [
    getAccountingOperationQueuePaid,
    { isFetching: getAccountingOperationQueuePaidLoading },
  ] = useLazyGetAccountingSettledQuery();

  const [
    getAccountingOperationQueueBanner,
    { isFetching: GetAccountingOperationQueueBannerLoading },
  ] = useLazyGetAccountingOperationQueueBannerQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    fetchBanner();
  }, [url?.branchId, url?.businessId, url?.servicesName]);

  useEffect(() => {
    if (url?.tab !== "2") return;
    if (drawerState.isOpen) return;

    fetchTable();

    setSelectedRowKeys([]);
    setIsAllPagesSelected(false);
  }, [
    url?.branchId,
    url?.businessId,
    url.page,
    url.pageSize,
    url?.servicesName,
    url?.sortings,
  ]);

  useEffect(() => {
    setBadgeCount(url?.badger ?? 0);
  }, [url?.badger]);

  //* ================================ Util Functions ================================

  const fetchBanner = () => {
    const request: getAccountingOperationQueueBannerRequest = {
      ...(url?.servicesName && { service: url?.servicesName }),
      ...(url?.businessId && { businessIds: url?.businessId }),
      ...(url?.branchId && { branchIds: url?.branchId }),
    };

    return getAccountingOperationQueueBanner(request).unwrap().then(setBannerData);
  };

  const fetchTable = () => {
    const request: AccountingSettledRequest = {
      pageNumber: url?.page ? Number(url.page) - 1 : 0,
      pageSize: url?.pageSize ? Number(url.pageSize) : 8,
      settlementStatus: "PENDING_FOR_PAYMENT",
      ...(url?.servicesName && { service: url?.servicesName }),
      ...(url?.businessId && { businessIds: url?.businessId }),
      ...(url?.branchId && { branchIds: url?.branchId }),
    };

    if (url?.sortings) {
      const sorting = JSON.parse(url.sortings)?.[0];

      if (sorting?.sortBy) request.sortBy = sorting.sortBy;
      if (sorting?.sortOrder) request.sortDirection = sorting.sortOrder.toUpperCase();
    }

    return getAccountingOperationQueuePaid(request).unwrap().then(setData);
  };
  const onSelectedRowKeysChange = (newSelectedKeys: React.Key[]) => {
    if (isAllPagesSelected) return;

    setSelectedRowKeys(newSelectedKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectedRowKeysChange,
    hideSelectAll: true,
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      setIsAllPagesSelected(true);

      setSelectedRowKeys(data?.content?.map((item) => item.uuid) ?? []);
    } else {
      setIsAllPagesSelected(false);
      setSelectedRowKeys([]);
    }
  };

  // CHECK ALL
  const allSelected = isAllPagesSelected;

  const isIndeterminate = !isAllPagesSelected && selectedRowKeys.length > 0;

  const selectedPendingForPaymentBalance = useMemo(() => {
    if (!data?.content?.length) return 0;

    // اگر همه انتخاب شده باشند، همان مبلغ بنر را نمایش بده
    if (allSelected) {
      return bannerData?.pendingForPaymentBalance ?? 0;
    }

    return data.content
      .filter((item) => selectedRowKeys.includes(item.uuid))
      .reduce((sum, item) => sum + (item.payableAmount || 0), 0);
  }, [allSelected, selectedRowKeys, data?.content, bannerData?.pendingForPaymentBalance]);

  const closeAdvanceFilterHandler = () => {
    form?.resetFields();
    setIsAdvanceModalOpen(false);
  };

  const openPaidToBeneficiaryDrawer = () => {
    const isAll = allSelected;

    setDrawerState({
      isOpen: true,
      isAllSelected: isAll,
      uuids: isAll ? undefined : (selectedRowKeys as string[]),
      selectedRows: isAll
        ? undefined
        : data?.content.filter((item) => selectedRowKeys.includes(item.uuid)),
    });
  };
  const closePaidToBeneficiaryDrawer = () => {
    setDrawerState({ isOpen: false });
    setSearchParams({ tab: "2" });
  };

  const handlePaymentSuccess = async () => {
    setDrawerState({ isOpen: false });
    setSelectedRowKeys([]);

    toast.success(SUCCESS_PAYMENT_MESSAGE, { toastId: SUCCESS_PAYMENT_MESSAGE });
    await Promise.all([fetchTable(), fetchBanner()]);
  };

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {drawerState?.isOpen && (
        <CustomDrawer
          size="large"
          onClose={closePaidToBeneficiaryDrawer}
          open={drawerState?.isOpen}
          content={
            <AccountingOperationQueuePaidToBeneficiaryDrawerContent
              onClose={closePaidToBeneficiaryDrawer}
              isAllSelected={drawerState.isAllSelected}
              uuids={drawerState.uuids}
              selectedRows={drawerState.selectedRows}
              filters={url}
              onSuccess={handlePaymentSuccess}
            />
          }
        />
      )}
      {isAdvanceModalOpen && (
        <AdvanceFilterModal
          isModalOpen={isAdvanceModalOpen}
          closeModalHandler={closeAdvanceFilterHandler}
          filterItemsList={filterItemsList}
          badgeCounter={(amount) => setBadgeCount(amount.toString())}
          form={form}
          defaultParams={url}
        />
      )}
      <div className="flex flex-col gap-10">
        <Div loading={GetAccountingOperationQueueBannerLoading} className="mt-10">
          <Row gutter={[16, 16]}>
            <Col lg={8} md={12} xs={24}>
              <CustomCard>
                <p className="text-neutral-9">موجودی کیف پول سیستم</p>
                <p className="mt-2! font-bold">
                  {dataPlaceHolder({
                    data: bannerData?.mainSystemWalletBalance,
                    isPrice: true,
                    isRial: true,
                  })}
                </p>
              </CustomCard>
            </Col>
            <Col lg={8} md={12} xs={24}>
              <CustomCard>
                <p className="text-neutral-9">مجموع مبلغ در صف پرداخت</p>
                <p className="mt-2! font-bold">
                  {dataPlaceHolder({
                    data: bannerData?.pendingForPaymentBalance,
                    isPrice: true,
                    isRial: true,
                  })}
                </p>
              </CustomCard>
            </Col>
            <Col lg={8} md={12} xs={24}>
              <CustomCard>
                <p className="text-neutral-9">مجموع مبلغ در صف پرداخت انتخاب‌شده</p>
                <p className="mt-2! font-bold">
                  {dataPlaceHolder({
                    data: selectedPendingForPaymentBalance,
                    isPrice: true,
                    isRial: true,
                  })}
                </p>
              </CustomCard>
            </Col>
          </Row>
        </Div>
        <div className="flex flex-col gap-4">
          <ToolBox
            rightSide={
              <CustomBadge count={badgeCount}>
                <CustomButton
                  icon={<AiOutlineFilter />}
                  onClick={() => setIsAdvanceModalOpen(true)}
                >
                  فیلتر پیشرفته
                </CustomButton>
              </CustomBadge>
            }
            leftSide={
              <div className="mt-10 flex items-center gap-3 max-[860px]:flex-col max-[860px]:items-start">
                <Checkbox
                  indeterminate={isIndeterminate}
                  onChange={onCheckAllChange}
                  checked={allSelected}
                  disabled={!data?.content || !data?.content?.length}
                >
                  انتخاب همه
                </Checkbox>
                <CustomButton
                  onClick={openPaidToBeneficiaryDrawer}
                  disabled={selectedRowKeys.length === 0 || !data?.content.length}
                  type="primary"
                >
                  پرداخت به کیف پول ذینفعان
                </CustomButton>
                <CustomButton disabled>
                  خروجی <IoIosArrowDown />
                </CustomButton>
              </div>
            }
          />
          <CustomTable<AccountingSettledContent>
            className="mt-4"
            dataSource={data?.content}
            columns={AccountingOperationQueueListTableModel()}
            rowKey="uuid"
            loading={getAccountingOperationQueuePaidLoading}
            draggableColumns
            draggableId={ExcelCodes.FINANCE_ACCOUNTANT_OPERATING_QUEUE}
            pagination={manualPaginationConfig({
              total: data?.totalElements,
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
            rowSelection={
              !isAllPagesSelected
                ? {
                    type: "checkbox",
                    ...rowSelection,
                  }
                : undefined
            }
          />
        </div>
      </div>
    </>
  );
};
export default AccountingOperationPaymentQueue;
