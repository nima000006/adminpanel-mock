import { useEffect, useMemo, useState } from "react";

import { Col, Dropdown, MenuProps, Row } from "antd";
import { PiCopy, PiPlusCircle } from "react-icons/pi";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import Div from "@components/Renderers/Div/Div";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import { CONTRACTS_TEMPLATES_LIST_PAGE_ROUTE } from "@infra/router/routes/contracts";
import {
  useAddContractConfirmMutation,
  useDeleteBeneficiaryConfirmMutation,
  useLazyNewContractCategoryListQuery,
} from "@infra/states/redux/Apis/contracts/addNewContractTemplate/addNewContractTemplate";
import { useLazyGetContractsDetailRulesBeneficiariesQuery } from "@infra/states/redux/Apis/contracts/contractsDetail/contractsDetail";
import {
  GetContractsDetailRulesBeneficiariesContentItem,
  GetContractsDetailRulesBeneficiariesResponse,
} from "@pages/Contract/ContractsList/ContractsDetail/helper/components/ContractsDetailFinancialRules/@types/@getContractsDetailRulesBeneficiaries";

import {
  addNewContractBeneficiaryOptionTypes,
  NewContractCategoryListResponse,
} from "./@types/@contractTemplateFinanceCondition";
import AddFinancialRuleDrawerContent from "./helper/components/AddFinancialRuleDrawerContent/AddFinancialRuleDrawerContent";
import AddFinancialRuleModalContent from "./helper/components/AddFinancialRuleModalContent/AddFinancialRuleModalContent";
import ContractsTemplateFinanceConditionCard from "./helper/components/ContractsTemplateFinanceConditionCard/ContractsTemplateFinanceConditionCard";
import ContractsTemplateStakeholderCard from "./helper/components/ContractsTemplateStakeholderCard/ContractsTemplateStakeholderCard";
import ContractsTemplateFinanceConditionStepTableModel from "./helper/models/ContractsTemplateFinanceConditionStepTableModel/ContractsTemplateFinanceConditionStepTableModel";

const items: MenuProps["items"] = [
  {
    label: "خدمت ارائه غذا",
    key: "1",
    icon: <PiCopy />,
  },
  {
    type: "divider",
  },
  {
    label: "خدمت ارائه غذا آزاد",
    key: "2",
    icon: <PiCopy />,
  },
  {
    type: "divider",
  },
  {
    label: "خدمت ارائه غذا دولتی",
    key: "3",
    icon: <PiCopy />,
  },
];

const SEND_ADD_CONTRACT_SUCCESS_MSG = "قرارداد با موفقیت ثبت شد.";
const ContractsTemplateFinanceConditionStep = () => {
  const [isDraftLoading, setIsDraftLoading] = useState(false);
  const [isNextLoading, setIsNextLoading] = useState(false);
  const [activeStakeholderId, setActiveStakeholderId] = useState<number>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [_selectedFinancialRule, setSelectedFinancialRule] =
    useState<addNewContractBeneficiaryOptionTypes | null>(null);
  const [selectedBeneficiaryType, setSelectedBeneficiaryType] =
    useState<addNewContractBeneficiaryOptionTypes>("LEGAL_DETERMINED");
  const [editingRecord, setEditingRecord] =
    useState<GetContractsDetailRulesBeneficiariesContentItem | null>(null);
  const [showTable, setShowTable] = useState(false);
  const [deleteRecord, setDeleteRecord] =
    useState<GetContractsDetailRulesBeneficiariesContentItem | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [categoryData, setCategoryData] = useState<NewContractCategoryListResponse>();
  const [beneficiaryData, setBeneficiaryData] =
    useState<GetContractsDetailRulesBeneficiariesResponse>();
  const navigate = useNavigate();

  const { params, setSearchParams } = useQueryParams();

  const hasTableContent = !!beneficiaryData?.content?.length;

  const totalServices = categoryData?.summaryDtoList?.[0]?.totalSize ?? 0;

  // بررسی اینکه آیا سهم تعیین شده برای دسته‌بندی فعال 100% است یا نه
  const isPercentageComplete = useMemo(() => {
    if (!activeStakeholderId || !categoryData) return false;

    const activeCategory = categoryData?.summaryDtoList
      .flatMap((group) => group?.contractCategories ?? [])
      .find((category) => category?.categoryId === activeStakeholderId);

    return activeCategory?.percentage === 100;
  }, [activeStakeholderId, categoryData]);

  // پیدا کردن دسته‌بندی فعال و بررسی hasTax
  const activeCategory = useMemo(() => {
    if (!activeStakeholderId || !categoryData) return null;

    return categoryData?.summaryDtoList
      .flatMap((group) => group?.contractCategories ?? [])
      .find((category) => category?.categoryId === activeStakeholderId);
  }, [activeStakeholderId, categoryData]);

  const hasTax = activeCategory?.hasTax ?? false;

  // ================================ API calls ================================

  const [categoryList, { isFetching: isCategoryListLoading }] =
    useLazyNewContractCategoryListQuery();

  const [beneficiaryList, { isFetching: isBeneficiaryListLoading }] =
    useLazyGetContractsDetailRulesBeneficiariesQuery();

  const [addContract] = useAddContractConfirmMutation();

  const [deleteBeneficiary, { isLoading: isDeleteBeneficiaryLoading }] =
    useDeleteBeneficiaryConfirmMutation();
  //? ================================  Effects ================================

  useEffect(() => {
    if (!params?.contractId) return;
    categoryList({ contractId: +params.contractId })
      .unwrap()
      .then((res: NewContractCategoryListResponse) => {
        setCategoryData(res);
      });
  }, [params?.contractId]);

  // Effect برای انتخاب دسته‌بندی اولیه
  useEffect(() => {
    if (!categoryData || !categoryData?.summaryDtoList?.length) return;
    if (activeStakeholderId) return; // اگر قبلاً انتخاب شده، نیازی به انتخاب مجدد نیست

    // بررسی اینکه آیا categoryId در URL وجود دارد
    const urlCategoryId = params?.categoryId ? Number(params.categoryId) : undefined;

    let selectedCategoryId: number | undefined;

    if (urlCategoryId) {
      // بررسی اینکه آیا categoryId موجود در URL در لیست دسته‌بندی‌ها وجود دارد
      const categoryExists = categoryData?.summaryDtoList
        .flatMap((group) => group?.contractCategories ?? [])
        .some((category) => category?.categoryId === urlCategoryId);

      if (categoryExists) {
        selectedCategoryId = urlCategoryId;
      }
    }

    // اگر categoryId در URL وجود نداشت یا معتبر نبود، اولین دسته‌بندی را انتخاب کن
    if (!selectedCategoryId) {
      // پیدا کردن اولین گروهی که دارای دسته‌بندی است
      const firstGroupWithCategories = categoryData?.summaryDtoList?.find(
        (group) => group?.contractCategories && group.contractCategories.length > 0
      );

      if (!firstGroupWithCategories) return;

      // انتخاب اولین دسته‌بندی از آن گروه
      selectedCategoryId = firstGroupWithCategories.contractCategories[0]?.categoryId;

      if (!selectedCategoryId) return;
    }

    // این خط ضروری است تا استایل فعال (Border) اعمال شود
    setActiveStakeholderId(selectedCategoryId);

    // اضافه کردن categoryId به URL (فقط در اولین بار)
    if (!params?.categoryId || Number(params.categoryId) !== selectedCategoryId) {
      setSearchParams({
        ...params,
        categoryId: selectedCategoryId.toString(),
        step: "5",
      });
    }
  }, [categoryData]);

  // Effect برای دریافت داده‌های beneficiary هنگام تغییر pagination یا categoryId
  useEffect(() => {
    if (!activeStakeholderId || !params?.contractId) return;

    beneficiaryList({
      contractId: +params.contractId,
      categoryId: activeStakeholderId,
      queries: {
        pageNumber: params?.page ? Number(params.page) - 1 : 0, // تبدیل از 1-indexed به 0-indexed
        pageSize: params?.pageSize ? Number(params.pageSize) : 8,
      },
    })
      .unwrap()
      .then((res: GetContractsDetailRulesBeneficiariesResponse) => {
        setBeneficiaryData(res);
      });
  }, [activeStakeholderId, params?.page, params?.pageSize]);

  useEffect(() => {
    setShowTable(hasTableContent);
  }, [hasTableContent]);

  // ================================ Utils function ================================

  const cancelBtnHandler = () => {
    setSearchParams({
      ...params,
      step: "4",
    });
  };

  const refreshCategoryData = () => {
    categoryList({ contractId: +params?.contractId })
      .unwrap()
      .then((res: NewContractCategoryListResponse) => {
        setCategoryData(res);
      });
  };

  const refreshBeneficiaryData = () => {
    if (activeStakeholderId) {
      beneficiaryList({
        contractId: +params?.contractId,
        categoryId: activeStakeholderId,
        queries: {
          pageNumber: params?.page ? Number(params.page) - 1 : 0, // تبدیل از 1-indexed به 0-indexed
          pageSize: params?.pageSize ? Number(params.pageSize) : 8,
        },
      })
        .unwrap()
        .then((res: GetContractsDetailRulesBeneficiariesResponse) => {
          setBeneficiaryData(res);
        });
    }
  };

  const refreshAllData = () => {
    refreshCategoryData();
    refreshBeneficiaryData();
  };

  const onClickTemplateStakeholderHandler = (categoryId: number) => {
    setActiveStakeholderId(categoryId);

    // اضافه کردن categoryId به URL و ریست کردن صفحه به 1
    setSearchParams({
      ...params,
      categoryId: categoryId.toString(),
      page: "1", // ریست کردن به صفحه اول هنگام تغییر دسته‌بندی
    });

    beneficiaryList({
      contractId: +params?.contractId,
      categoryId,
      queries: {
        pageNumber: 0, // همیشه از صفحه اول شروع می‌کنیم
        pageSize: params?.pageSize ? Number(params.pageSize) : 8,
      },
    })
      .unwrap()
      .then((res: GetContractsDetailRulesBeneficiariesResponse) => {
        setBeneficiaryData(res);
      });
  };
  const openDeleteModal = (record: GetContractsDetailRulesBeneficiariesContentItem) => {
    setDeleteRecord(record);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteRecord(null);
    setIsDeleteModalOpen(false);
  };

  const confirmDeleteHandler = () => {
    if (!deleteRecord?.id) return;

    deleteBeneficiary({ id: deleteRecord.id })
      .unwrap()
      .then(() => {
        // به‌روزرسانی داده‌های category و beneficiary برای نمایش درصدهای به‌روز شده
        refreshAllData();
        closeDeleteModal();
      })
      .catch((error) => {
        console.error("error:", error);
        closeDeleteModal();
      });
  };
  const closeModalHandler = () => {
    setIsModalOpen(false);
  };
  const openCreateFlow = () => {
    setEditingRecord(null);
    setIsModalOpen(true);
  };
  const confirmModalHandler = () => {
    setSelectedFinancialRule(selectedBeneficiaryType);
    setIsDrawerOpen(true);
    closeModalHandler();
  };

  const handleSubmitContract = (shouldNavigate?: boolean) => {
    const setLoading = shouldNavigate ? setIsNextLoading : setIsDraftLoading;
    setLoading(true);
    addContract({ contractId: +params?.contractId })
      .unwrap()
      .then(() => {
        toast.success(SEND_ADD_CONTRACT_SUCCESS_MSG, {
          toastId: SEND_ADD_CONTRACT_SUCCESS_MSG,
        });
        if (shouldNavigate) {
          navigate(CONTRACTS_TEMPLATES_LIST_PAGE_ROUTE);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const addContractHandler = () => handleSubmitContract(true); //do navigate
  const updateContractHandler = () => handleSubmitContract(false); //don't navigate

  const tableEditHandler = (record: GetContractsDetailRulesBeneficiariesContentItem) => {
    // تنظیم نوع ذینفع از رکورد
    if (record?.beneficiaryRuleType?.name) {
      setSelectedBeneficiaryType(
        record.beneficiaryRuleType.name as addNewContractBeneficiaryOptionTypes
      );
    }
    setEditingRecord(record);
    setIsDrawerOpen(true);
  };
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isDeleteModalOpen && (
        <ConfirmationModalWithContent
          title="حذف قانون مالی"
          isModalOpen={isDeleteModalOpen}
          isDangerous
          closeModalHandler={closeDeleteModal}
          onConfirmClickHandler={confirmDeleteHandler}
          confirmBtnText="تایید و حذف"
          backBtnText="انصراف"
          showIcon
          isConfirmButtonLoading={isDeleteBeneficiaryLoading}
          content={
            <p className="body-regular">آیا از حذف این قانون مالی اطمینان دارید ؟</p>
          }
        />
      )}
      {isModalOpen && (
        <ConfirmationModalWithContent
          title="افزودن قانون مالی"
          isModalOpen={isModalOpen}
          closeModalHandler={closeModalHandler}
          onConfirmClickHandler={confirmModalHandler}
          confirmBtnText="تایید و ثبت"
          backBtnText="انصراف"
          showIcon={false}
          width={600}
          content={
            <AddFinancialRuleModalContent
              selectedType={selectedBeneficiaryType}
              onTypeChange={setSelectedBeneficiaryType}
            />
          }
        />
      )}
      {isDrawerOpen && (
        <CustomDrawer
          title="افزودن قانون مالی"
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          content={
            <AddFinancialRuleDrawerContent
              closeDrawerHandler={() => setIsDrawerOpen(false)}
              selectedType={selectedBeneficiaryType}
              onTypeChange={setSelectedBeneficiaryType}
              onSuccess={() => {
                // به‌روزرسانی داده‌های category و beneficiary برای نمایش درصدهای به‌روز شده
                refreshAllData();
              }}
              editingRecord={editingRecord}
            />
          }
        />
      )}
      <div className="body-regular">
        <h2 className="mb-2! text-lg">خدمات قرارداد ({totalServices})</h2>
        <Div loading={isCategoryListLoading}>
          <Row gutter={[16, 16]}>
            {categoryData?.summaryDtoList?.map((item) => (
              <Col lg={8} md={12} sm={24} xs={24} key={item?.title}>
                <ContractsTemplateFinanceConditionCard
                  title={item?.title}
                  count={item?.size}
                  total={item?.totalSize}
                  status={item?.categoryAssignmentStatus}
                />
              </Col>
            ))}
          </Row>
          <Row gutter={[16, 16]} className="mt-4!">
            {categoryData?.summaryDtoList?.map((group) =>
              group?.contractCategories?.map((category) => (
                <Col
                  xl={6}
                  lg={8}
                  md={12}
                  sm={12}
                  xs={24}
                  key={`${group?.categoryAssignmentStatus}-${category?.categoryId}`}
                >
                  <ContractsTemplateStakeholderCard
                    id={category?.categoryId}
                    title={category?.name}
                    tagText={
                      category?.percentage === 0
                        ? "سهمی تعیین نشده"
                        : `${category?.percentage}% سهم تعیین شده`
                    }
                    tagColor={
                      category?.percentage === 100
                        ? "green"
                        : category?.percentage === 0
                          ? "red"
                          : "orange"
                    }
                    beneficiaryCount={category?.beneficiaryCounts}
                    isActive={activeStakeholderId === category?.categoryId}
                    onClick={() =>
                      onClickTemplateStakeholderHandler(category?.categoryId)
                    }
                  />
                </Col>
              ))
            )}
          </Row>
        </Div>
        <CustomDivider
          text="قوانین مالی و ذینفعان/ارائه غذا دانشجویی"
          extraContent={
            !showTable ? (
              // todo[nima] enabled when api got ready
              <Dropdown.Button disabled type="default" menu={{ items }}>
                کپی قوانین مالی از
              </Dropdown.Button>
            ) : (
              <CustomButton
                type="primary"
                onClick={openCreateFlow}
                icon={<PiPlusCircle width={24} />}
              >
                افزودن قانون مالی
              </CustomButton>
            )
          }
        />

        {!showTable ? (
          <Div
            loading={isBeneficiaryListLoading}
            className="flex min-h-100 flex-col items-center justify-center gap-4!"
          >
            <CustomEmpty description="هنوز هیچ ذینفعی برای این خدمت ثبت نکرده اید." />
            <CustomButton type="primary" onClick={openCreateFlow}>
              افزودن ذینفع
            </CustomButton>
          </Div>
        ) : (
          <>
            <Row gutter={[16, 16]} className="mb-4!">
              {hasTax && (
                <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                  <CustomAlert
                    title="این خدمت شامل ارزش افزوده میشود."
                    type="info"
                    showIcon
                    action={
                      <Link className="text-primary-5! body-regular" to="#">
                        جزییات
                      </Link>
                    }
                  />
                </Col>
              )}
              <Col
                xl={hasTax ? 12 : 24}
                lg={hasTax ? 12 : 24}
                md={hasTax ? 12 : 24}
                sm={hasTax ? 12 : 24}
                xs={24}
              >
                <CustomAlert
                  title={
                    isPercentageComplete
                      ? "کل سهم های این خدمت تخصیص داده شده"
                      : `سهم تخصیص داده نشده: ${
                          activeCategory
                            ? `${100 - (activeCategory?.percentage ?? 0)}%`
                            : "—"
                        }`
                  }
                  type={isPercentageComplete ? "success" : "warning"}
                  showIcon
                />
              </Col>
            </Row>
            <CustomTable<GetContractsDetailRulesBeneficiariesContentItem>
              dataSource={beneficiaryData?.content}
              rowKey="id"
              columns={ContractsTemplateFinanceConditionStepTableModel({
                onEdit: tableEditHandler,
                onDelete: openDeleteModal,
              })}
              pagination={manualPaginationConfig({
                total: beneficiaryData?.totalElements ?? 0,
                onChange: (page, pageSize) => {
                  setSearchParams({
                    ...params,
                    page: page?.toString(),
                    pageSize: pageSize?.toString(),
                  });
                },
                pageNumber: params?.page ? Number(params?.page) : 1,
                defaultPageSize: params?.pageSize ? Number(params?.pageSize) : 8,
              })}
              key={`table-${params?.pageSize || "8"}`}
              loading={isBeneficiaryListLoading}
              {...TABLE_PROPS(beneficiaryData?.totalElements ?? 0)}
            />
          </>
        )}

        <div className="mt-10! mb-5! flex justify-end gap-2!">
          <CustomButton onClick={cancelBtnHandler}>بازگشت</CustomButton>
          <CustomButton
            disabled={!categoryData?.completed}
            loading={isDraftLoading}
            onClick={updateContractHandler}
          >
            ذخیره پیش نویس
          </CustomButton>
          <CustomButton
            onClick={addContractHandler}
            type="primary"
            disabled={!categoryData?.completed}
            loading={isNextLoading}
          >
            ثبت قرارداد
          </CustomButton>
        </div>
      </div>
    </>
  );
};

export default ContractsTemplateFinanceConditionStep;
