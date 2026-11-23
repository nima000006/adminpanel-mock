import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import { CustomButton } from "@components/CustomInputs";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomSteps from "@components/Renderers/CustomSteps/CustomSteps";
import { stepStatusCreator } from "@infra/helpers/utils";
import { SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import {
  AllAdmissionCreationBeneficiaryFormType,
  AllAdmissionCreationBeneficiaryModalMode,
  AllAdmissionCreationBeneficiaryOptionItem,
  AllAdmissionCreationContractAllocationDrawerProps,
  AllAdmissionCreationContractService,
  AllAdmissionCreationContractTemplate,
} from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionCreation/@types/@allAdmissionCreation";
import AllAdmissionCreationBeneficiaryModal from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionCreation/helper/components/AllAdmissionCreationBeneficiaryModal/AllAdmissionCreationBeneficiaryModal";
import AllAdmissionCreationContractServicesStep from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionCreation/helper/components/AllAdmissionCreationContractAllocationDrawer/helper/components/AllAdmissionCreationContractServicesStep/AllAdmissionCreationContractServicesStep";
import AllAdmissionCreationContractTemplateStep from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionCreation/helper/components/AllAdmissionCreationContractAllocationDrawer/helper/components/AllAdmissionCreationContractTemplateStep/AllAdmissionCreationContractTemplateStep";
import { CONTRACT_TEMPLATE_OPTIONS } from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionCreation/helper/util";

// Drawer step indices: 0 = pick contract template; 1 = pick services / beneficiaries
const TEMPLATE_STEP = 0;
const SERVICES_STEP = 1;

const toSelectOption = (
  id: string,
  title: string
): SelectType<AllAdmissionCreationBeneficiaryOptionItem> => ({
  label: title,
  value: id,
  title,
  // SelectType requires key/code; unused here — local options identify by `id`/`value`
  key: 0,
  code: 0,
  item: { id, title },
});

const AllAdmissionCreationContractAllocationDrawer = ({
  open,
  scheduling,
  onClose,
  onConfirm,
}: AllAdmissionCreationContractAllocationDrawerProps) => {
  const [currentStep, setCurrentStep] = useState(TEMPLATE_STEP);
  const [templates] = useState<AllAdmissionCreationContractTemplate[]>(
    CONTRACT_TEMPLATE_OPTIONS
  );
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | undefined>();
  const [services, setServices] = useState<AllAdmissionCreationContractService[]>([]);
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
  const [beneficiaryModal, setBeneficiaryModal] = useState<{
    open: boolean;
    mode: AllAdmissionCreationBeneficiaryModalMode;
    serviceId: string | null;
    beneficiaryId: string | null;
  }>({
    open: false,
    mode: "define",
    serviceId: null,
    beneficiaryId: null,
  });

  const stayDateRange = scheduling?.stayDateRange;
  // ذی‌نفع در حال تعریف/ویرایش: ابتدا خدمت و سپس ذی‌نفع داخل همان خدمت پیدا می‌شود
  const selectedBeneficiary =
    beneficiaryModal.serviceId != null && beneficiaryModal.beneficiaryId != null
      ? services
          .find((service) => service.id === beneficiaryModal.serviceId)
          ?.beneficiaries.find(
            (beneficiary) => beneficiary.id === beneficiaryModal.beneficiaryId
          )
      : null;

  //? ================================ Effects ================================
  useEffect(() => {
    if (!open) {
      return;
    }

    setCurrentStep(TEMPLATE_STEP);
    setSelectedTemplateId(undefined);
    setServices([]);
    setSelectedServiceIds([]);
    setBeneficiaryModal({
      open: false,
      mode: "define",
      serviceId: null,
      beneficiaryId: null,
    });
  }, [open]);

  //* ================================ Util Functions ================================
  const closeHandler = () => {
    onClose();
  };

  const selectTemplateHandler = (templateId: string) => {
    const template = templates.find((item) => item.id === templateId);

    setSelectedTemplateId(templateId);
    setServices(template?.services ?? []);
    setSelectedServiceIds([]);
  };

  const toggleServiceHandler = (serviceId: string) => {
    setSelectedServiceIds((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const openDefineBeneficiaryHandler = (serviceId: string, beneficiaryId: string) => {
    setBeneficiaryModal({
      open: true,
      mode: "define",
      serviceId,
      beneficiaryId,
    });
  };

  const openEditBeneficiaryHandler = (serviceId: string, beneficiaryId: string) => {
    setBeneficiaryModal({
      open: true,
      mode: "edit",
      serviceId,
      beneficiaryId,
    });
  };

  const closeBeneficiaryModalHandler = () => {
    setBeneficiaryModal((prev) => ({
      ...prev,
      open: false,
      serviceId: null,
      beneficiaryId: null,
    }));
  };

  const confirmBeneficiaryHandler = (values: AllAdmissionCreationBeneficiaryFormType) => {
    if (beneficiaryModal.serviceId == null || beneficiaryModal.beneficiaryId == null) {
      return;
    }

    const businessTitle = String(
      values.business?.item?.title ?? values.business?.label ?? ""
    );
    const businessId =
      values.business?.item?.id != null ? String(values.business.item.id) : "";
    const branchTitle = String(values.branch?.item?.title ?? values.branch?.label ?? "");
    const branchId = values.branch?.item?.id != null ? String(values.branch.item.id) : "";

    setServices((prev) =>
      prev.map((service) => {
        if (service.id !== beneficiaryModal.serviceId) {
          return service;
        }

        return {
          ...service,
          beneficiaries: service.beneficiaries.map((beneficiary) => {
            if (beneficiary.id !== beneficiaryModal.beneficiaryId) {
              return beneficiary;
            }

            return {
              ...beneficiary,
              business: businessTitle || null,
              businessId: businessId || null,
              branch: branchTitle || null,
              branchId: branchId || null,
            };
          }),
        };
      })
    );

    closeBeneficiaryModalHandler();
  };

  const continueHandler = () => {
    if (currentStep === TEMPLATE_STEP) {
      if (!selectedTemplateId) {
        toast.error("انتخاب قالب قرارداد الزامی است");
        return;
      }

      setCurrentStep(SERVICES_STEP);
      return;
    }

    if (selectedServiceIds.length < 1) {
      toast.error("انتخاب حداقل ۱ خدمت الزامی است");
      return;
    }

    onConfirm();
  };

  const backHandler = () => {
    if (currentStep === SERVICES_STEP) {
      setCurrentStep(TEMPLATE_STEP);
      return;
    }

    closeHandler();
  };

  // فقط برای ذی‌نفعی که قبلاً کسب‌وکار دارد مقدار اولیه ساخته می‌شود؛ شعبه اختیاری است
  const beneficiaryInitialValues: AllAdmissionCreationBeneficiaryFormType | null =
    selectedBeneficiary?.businessId != null
      ? {
          business: toSelectOption(
            selectedBeneficiary.businessId,
            selectedBeneficiary.business ?? ""
          ),
          branch:
            selectedBeneficiary.branchId != null
              ? toSelectOption(
                  selectedBeneficiary.branchId,
                  selectedBeneficiary.branch ?? ""
                )
              : undefined,
        }
      : null;

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      <CustomDrawer
        open={open}
        onClose={closeHandler}
        closable={false}
        destroyOnHidden
        content={
          <div className="flex h-full flex-col">
            <CustomDrawerHeader
              title="تخصیص قرارداد"
              closeDrawerHandler={closeHandler}
              leftSideContent={
                <>
                  <CustomButton onClick={backHandler}>
                    {currentStep === TEMPLATE_STEP ? "انصراف" : "بازگشت"}
                  </CustomButton>
                  <CustomButton type="primary" onClick={continueHandler}>
                    {currentStep === TEMPLATE_STEP
                      ? "تایید و ادامه"
                      : "تایید و تخصیص قرارداد"}
                  </CustomButton>
                </>
              }
            />

            <div className="flex flex-1 flex-col gap-10 overflow-auto p-10">
              <CustomSteps
                current={currentStep}
                className="[&>div]:p-0!"
                items={[
                  {
                    status: stepStatusCreator(currentStep, TEMPLATE_STEP),
                    title: "قالب قرارداد",
                  },
                  {
                    status: stepStatusCreator(currentStep, SERVICES_STEP),
                    title: "خدمات قرارداد",
                  },
                ]}
              />

              {currentStep === TEMPLATE_STEP ? (
                <AllAdmissionCreationContractTemplateStep
                  templates={templates}
                  selectedTemplateId={selectedTemplateId}
                  stayDateRange={stayDateRange}
                  onSelectTemplate={selectTemplateHandler}
                />
              ) : null}

              {currentStep === SERVICES_STEP ? (
                <AllAdmissionCreationContractServicesStep
                  services={services}
                  selectedServiceIds={selectedServiceIds}
                  onToggleService={toggleServiceHandler}
                  onDefineBeneficiary={openDefineBeneficiaryHandler}
                  onEditBeneficiary={openEditBeneficiaryHandler}
                />
              ) : null}
            </div>
          </div>
        }
      />

      {beneficiaryModal.open && (
        <AllAdmissionCreationBeneficiaryModal
          open={beneficiaryModal.open}
          mode={beneficiaryModal.mode}
          initialValues={beneficiaryInitialValues}
          onCancel={closeBeneficiaryModalHandler}
          onConfirm={confirmBeneficiaryHandler}
        />
      )}
    </>
  );
};

export default AllAdmissionCreationContractAllocationDrawer;
