import { useEffect, useMemo, useState } from "react";

import { Form } from "antd";
import moment from "moment";
import { toast } from "react-toastify";

import {
  CustomRadioGroup,
  CustomRangePicker,
  CustomSelect,
} from "@components/CustomInputs";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import { selectDefaultValueGenerator } from "@infra/helpers/utils";
import {
  useLazyGetContractTemplateQuery,
  useLazyGetServiceAndBeneficiaryTemplateQuery,
} from "@infra/states/redux/Apis/business/business/businessApi";
import { useCreateAndChangeVendorContractMutation } from "@infra/states/redux/Apis/shop/vendors/vendorsApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { GENERAL_SUBMIT_SUCCESS } from "@infra/VARS/globalToasts/globalToasts";
import { ShopVendorBeneficiaryFormType } from "@pages/Shop/Vendors/_shared/helper/components/ShopVendorBeneficiaryFormContent/@types/@shopVendorBeneficiaryFormContent";
import ShopVendorBeneficiaryFormContent from "@pages/Shop/Vendors/_shared/helper/components/ShopVendorBeneficiaryFormContent/ShopVendorBeneficiaryFormContent";
import {
  GetServiceAndBeneficiaryTemplateBeneficiaryType,
  GetServiceAndBeneficiaryTemplateResponse,
} from "@pages/Shop/Vendors/AllVendors/ShopAllVendorsDetail/helper/components/ShopAllVendorsDetailContract/@types/@shopAllVendorsDetailContract";
import ShopAllVendorsDetailContractBeneficiariesTableModel from "@pages/Shop/Vendors/AllVendors/ShopAllVendorsDetail/helper/components/ShopAllVendorsDetailContract/helper/drawer/ShopAllVendorsDetailContractDrawerContent/helper/model/ShopAllVendorsDetailContractBeneficiariesTableModel";
import { ShopAllVendorsListAddDrawerContractStepProps } from "@pages/Shop/Vendors/AllVendors/ShopAllVendorsList/helper/drawer/ShopAllVendorsListAddDrawerContent/helper/components/ShopAllVendorsListAddDrawerContractStep/@types/@shopAllVendorsListAddDrawerContractStep";

const CONTRACT_TEMPLATE_PAGE_SIZE = 8;
const CONTRACT_TEMPLATE_PAGE_NUMBER = 0;

const ShopAllVendorsListAddDrawerContractStep = ({
  form,
  supplierUuid,
  isConfirmModalOpen,
  onCloseConfirmModal,
  onCloseDrawer,
  getAllVendorsListHandler,
}: ShopAllVendorsListAddDrawerContractStepProps) => {
  const [defineBeneficiaryForm] = Form.useForm<ShopVendorBeneficiaryFormType>();
  const [editBeneficiaryForm] = Form.useForm<ShopVendorBeneficiaryFormType>();

  const [isDefineBeneficiaryModalOpen, setIsDefineBeneficiaryModalOpen] = useState(false);
  const [isEditBeneficiaryModalOpen, setIsEditBeneficiaryModalOpen] = useState(false);
  const [selectedBeneficiaryId, setSelectedBeneficiaryId] = useState<number | null>(null);
  const [beneficiaries, setBeneficiaries] = useState<
    GetServiceAndBeneficiaryTemplateBeneficiaryType[]
  >([]);

  const selectedTemplateId = Form.useWatch("templateId", form);
  const selectedCategory = Form.useWatch("category", form);
  const selectedCategoryId =
    selectedCategory?.item?.id != null
      ? Number(selectedCategory.item.id)
      : selectedCategory?.value != null
        ? Number(selectedCategory.value)
        : null;

  //? ================================ Api Calls ================================
  // contract template
  const [
    getContractTemplate,
    { data: getContractTemplateData, isFetching: isGetContractTemplateLoading },
  ] = useLazyGetContractTemplateQuery();

  // services & beneficiaries list
  const [
    getServiceAndBeneficiaryTemplate,
    {
      data: getServiceAndBeneficiaryTemplateData,
      isFetching: isGetServiceAndBeneficiaryTemplateLoading,
    },
  ] = useLazyGetServiceAndBeneficiaryTemplateQuery();

  // create vendor
  const [createVendor, { isLoading: isCreateVendorLoading }] =
    useCreateAndChangeVendorContractMutation();

  const contractTemplates = getContractTemplateData?.content ?? [];
  const serviceCategories = getServiceAndBeneficiaryTemplateData ?? [];

  const selectedTemplate = useMemo(
    () =>
      contractTemplates.find((template) => String(template.id) === selectedTemplateId),
    [contractTemplates, selectedTemplateId]
  );

  const tableBeneficiaries = useMemo(() => {
    if (selectedCategoryId == null || Number.isNaN(selectedCategoryId)) return [];

    const selectedCategoryBeneficiaries =
      serviceCategories.find((category) => category.categoryId === selectedCategoryId)
        ?.beneficiaries ?? [];
    const selectedCategoryBeneficiaryIds = new Set(
      selectedCategoryBeneficiaries.map((item) => item.id)
    );

    return beneficiaries.filter((item) => selectedCategoryBeneficiaryIds.has(item.id));
  }, [beneficiaries, selectedCategoryId, serviceCategories]);

  //? ================================ Effects ================================
  // get contract template
  useEffect(() => {
    getContractTemplateHandler();
  }, []);

  // get service and beneficiary template
  useEffect(() => {
    getServiceAndBeneficiaryTemplateHandler();
  }, [selectedTemplateId]);

  // set service ids
  useEffect(() => {
    if (!selectedTemplateId || !serviceCategories.length) return;

    form.setFieldsValue({
      serviceIds: serviceCategories.map((category) => String(category.categoryId)),
    });
  }, [form, selectedTemplateId, serviceCategories]);

  //* ================================ Util Functions ================================
  // on get service and beneficiary template success
  const onGetServiceAndBeneficiaryTemplateSuccess = async (
    response: GetServiceAndBeneficiaryTemplateResponse
  ) => {
    setBeneficiaries(response.flatMap((category) => category.beneficiaries ?? []));
  };

  // get contract template
  const getContractTemplateHandler = () => {
    getContractTemplate({
      service: "BOOK_MARKET_PLACE",
      pageNumber: CONTRACT_TEMPLATE_PAGE_NUMBER,
      pageSize: CONTRACT_TEMPLATE_PAGE_SIZE,
    });
  };

  // get service and beneficiary template
  const getServiceAndBeneficiaryTemplateHandler = () => {
    if (!selectedTemplateId) {
      setBeneficiaries([]);
      return;
    }

    setBeneficiaries([]);
    getServiceAndBeneficiaryTemplate({
      contractId: Number(selectedTemplateId),
    })
      .unwrap()
      .then(onGetServiceAndBeneficiaryTemplateSuccess);
  };

  // select template
  const onSelectTemplateHandler = (templateId: string) => {
    setSelectedBeneficiaryId(null);
    setBeneficiaries([]);
    form.setFieldsValue({
      templateId,
      serviceIds: [],
      category: undefined,
    });
  };

  // update beneficiary
  const updateBeneficiaryHandler = (values: ShopVendorBeneficiaryFormType) => {
    if (selectedBeneficiaryId == null) return;

    const businessId = Number(values.business?.item?.id ?? values.business?.value);
    const branchId = Number(values.branch?.item?.id ?? values.branch?.value);
    const businessName = String(
      values.business?.item?.title ?? values.business?.label ?? ""
    );
    const branchName = String(values.branch?.item?.title ?? values.branch?.label ?? "");

    setBeneficiaries((prev) =>
      prev.map((item) =>
        item.id === selectedBeneficiaryId
          ? {
              ...item,
              businessId: Number.isNaN(businessId) ? item.businessId : businessId,
              branchId: Number.isNaN(branchId) ? item.branchId : branchId,
              businessName,
              branchName,
            }
          : item
      )
    );
  };

  // define beneficiary
  const onDefineBeneficiaryHandler = (beneficiaryId: number) => {
    setSelectedBeneficiaryId(beneficiaryId);
    defineBeneficiaryForm.resetFields();
    setIsDefineBeneficiaryModalOpen(true);
  };

  // edit beneficiary
  const onEditBeneficiaryHandler = (beneficiaryId: number) => {
    const selectedBeneficiary = beneficiaries.find((item) => item.id === beneficiaryId);

    editBeneficiaryForm.setFieldsValue({
      business: selectedBeneficiary?.businessName
        ? selectDefaultValueGenerator({
            id: selectedBeneficiary.businessId,
            title: selectedBeneficiary.businessName,
          })
        : undefined,
      branch: selectedBeneficiary?.branchName
        ? selectDefaultValueGenerator({
            id: selectedBeneficiary.branchId,
            title: selectedBeneficiary.branchName,
          })
        : undefined,
    });

    setSelectedBeneficiaryId(beneficiaryId);
    setIsEditBeneficiaryModalOpen(true);
  };

  // close define beneficiary modal
  const closeDefineBeneficiaryModalHandler = () => {
    defineBeneficiaryForm.resetFields();
    setIsDefineBeneficiaryModalOpen(false);
    setSelectedBeneficiaryId(null);
  };

  // close edit beneficiary modal
  const closeEditBeneficiaryModalHandler = () => {
    editBeneficiaryForm.resetFields();
    setIsEditBeneficiaryModalOpen(false);
    setSelectedBeneficiaryId(null);
  };

  // confirm define beneficiary
  const confirmDefineBeneficiaryHandler = async () => {
    const values = await defineBeneficiaryForm.validateFields();
    updateBeneficiaryHandler(values);
    closeDefineBeneficiaryModalHandler();
  };

  // confirm edit beneficiary
  const confirmEditBeneficiaryHandler = async () => {
    const values = await editBeneficiaryForm.validateFields();
    updateBeneficiaryHandler(values);
    closeEditBeneficiaryModalHandler();
  };

  const toApiDate = (date: string) => moment(date).format("YYYY-MM-DD");

  // create vendor success
  const onCreateVendorSuccess = () => {
    onCloseConfirmModal();
    toast.success(GENERAL_SUBMIT_SUCCESS, {
      toastId: GENERAL_SUBMIT_SUCCESS,
    });
    onCloseDrawer();
    getAllVendorsListHandler();
  };

  // confirm contract
  const confirmContractHandler = () => {
    if (!supplierUuid) return;

    const values = form.getFieldsValue(true);
    const [startDateValue, endDateValue] = values.contractDateRange ?? [];
    const supplierBeneficiaryId = beneficiaries.find((item) => item.supplier)?.id;

    if (supplierBeneficiaryId == null) return;

    createVendor({
      uuid: supplierUuid,
      startDate: toApiDate(startDateValue),
      endDate: endDateValue ? toApiDate(endDateValue) : null,
      supplierTemplateId: supplierBeneficiaryId,
      beneficiaries: tableBeneficiaries
        .filter((item) => {
          const ruleTypeName = item.beneficiaryRuleType?.name;
          return (
            ruleTypeName !== "LEGAL_DETERMINED" && ruleTypeName !== "PERSONAL_DETERMINED"
          );
        })
        .map((item) => ({
          ruleBeneficiaryId: item.id,
          branchId: item.branchId ?? null,
        })),
    })
      .unwrap()
      .then(onCreateVendorSuccess);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isConfirmModalOpen && (
        <ConfirmationModalWithContent
          title="افزودن قرارداد"
          isModalOpen={isConfirmModalOpen}
          confirmBtnText="تایید"
          backBtnText="انصراف"
          closeModalHandler={onCloseConfirmModal}
          onConfirmClickHandler={confirmContractHandler}
          isConfirmButtonLoading={isCreateVendorLoading}
          content={<p>با تایید، قرارداد برای این تامین‌کننده ثبت می‌شود.</p>}
        />
      )}

      {isDefineBeneficiaryModalOpen && (
        <ConfirmationModalWithContent
          title="تعیین ذینفع"
          isModalOpen={isDefineBeneficiaryModalOpen}
          confirmBtnText="ثبت و تایید"
          backBtnText="انصراف"
          showIcon={false}
          closeModalHandler={closeDefineBeneficiaryModalHandler}
          onConfirmClickHandler={confirmDefineBeneficiaryHandler}
          content={
            <ShopVendorBeneficiaryFormContent form={defineBeneficiaryForm} showAlert />
          }
        />
      )}

      {isEditBeneficiaryModalOpen && (
        <ConfirmationModalWithContent
          title="ویرایش ذینفع"
          isModalOpen={isEditBeneficiaryModalOpen}
          confirmBtnText="ثبت و اعمال تغییرات"
          backBtnText="انصراف"
          showIcon={false}
          closeModalHandler={closeEditBeneficiaryModalHandler}
          onConfirmClickHandler={confirmEditBeneficiaryHandler}
          content={<ShopVendorBeneficiaryFormContent form={editBeneficiaryForm} />}
        />
      )}

      <Form
        form={form}
        className="flex flex-1 flex-col gap-6 overflow-auto p-10"
        layout="vertical"
      >
        <CustomAlert
          type="success"
          showIcon
          className="border border-dashed! font-medium"
          title="تامین‌کننده ایجاد شد. اگر الان قرارداد را ثبت نکنید، بعداً از تب «قرارداد» در جزئیات تامین‌کننده می‌توانید آن را اضافه کنید."
        />

        <CustomDivider text="تخصیص قرارداد" />

        <CustomRangePicker
          name="contractDateRange"
          label="تاریخ شروع و پایان قرارداد"
          form={form}
          rules={[REQUIRED_RULE]}
          placeholder={["از تاریخ", "تا تاریخ"]}
        />

        <div className="flex flex-col gap-1">
          <CustomRadioGroup
            name="templateId"
            label="انتخاب قالب قرارداد"
            rules={[REQUIRED_RULE]}
            hasVerticalLabel
            className="mb-0! w-full [&_.ant-form-item-control-input]:m-0! [&_.ant-form-item-control-input]:h-0! [&_.ant-form-item-control-input]:min-h-0! [&_.ant-form-item-row]:gap-0! [&_.ant-radio-group]:hidden!"
            options={contractTemplates.map((template) => ({
              value: String(template.id),
              label: template.title,
            }))}
          />

          <div className="mt-3 flex w-full flex-col gap-3">
            {isGetContractTemplateLoading ? (
              <CustomEmpty description="در حال دریافت قالب‌های قرارداد..." />
            ) : contractTemplates.length > 0 ? (
              contractTemplates.map((template) => {
                const selected = selectedTemplateId === String(template.id);

                return (
                  <div
                    key={template.id}
                    onClick={() => onSelectTemplateHandler(String(template.id))}
                    className={`flex w-full cursor-pointer items-center rounded-xl px-5 py-4 ${
                      selected
                        ? "border-primary-6 bg-primary-1 border border-solid"
                        : "bg-neutral-2"
                    }`}
                  >
                    <div className="flex w-full items-center gap-3">
                      <CustomRadioGroup
                        noStyle
                        value={selected ? String(template.id) : undefined}
                        onChange={() => onSelectTemplateHandler(String(template.id))}
                        options={[{ value: String(template.id), label: null }]}
                      />
                      <span className="text-neutral-11 flex-1 text-right text-sm font-medium">
                        {template.title}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <CustomEmpty description="قالب قراردادی برای نمایش وجود ندارد" />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {!selectedTemplate ? (
            <CustomEmpty description="هنوز قالب قراردادی انتخاب نکرده‌اید. خدمات از قالب انتخاب‌شده می‌آیند." />
          ) : isGetServiceAndBeneficiaryTemplateLoading ? (
            <CustomEmpty description="در حال دریافت خدمات..." />
          ) : serviceCategories.length > 0 ? (
            <CustomSelect
              name="category"
              label=" انتخاب خدمات "
              options={serviceCategories.map((category) => ({
                id: category.categoryId,
                title: category.categoryName,
              }))}
              placeholder="انتخاب کنید"
              form={form}
              rules={[REQUIRED_RULE]}
            />
          ) : (
            <CustomEmpty description="خدمتی برای این قالب ثبت نشده است" />
          )}
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-neutral-12 text-sm">
            ذینفعان <span className="text-dustred-5">*</span>
          </span>
          <CustomTable
            dataSource={tableBeneficiaries}
            loading={isGetServiceAndBeneficiaryTemplateLoading}
            rowKey="id"
            columns={ShopAllVendorsDetailContractBeneficiariesTableModel({
              onDefineBeneficiary: onDefineBeneficiaryHandler,
              onEditBeneficiary: onEditBeneficiaryHandler,
            })}
            pagination={false}
          />
        </div>
      </Form>
    </>
  );
};

export default ShopAllVendorsListAddDrawerContractStep;
