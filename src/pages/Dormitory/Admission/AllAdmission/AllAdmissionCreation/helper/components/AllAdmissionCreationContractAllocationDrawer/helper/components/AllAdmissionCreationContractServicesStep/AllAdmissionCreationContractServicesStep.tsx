import { AllAdmissionCreationContractServicesStepProps } from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionCreation/@types/@allAdmissionCreation";
import AllAdmissionCreationContractServiceCard from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionCreation/helper/components/AllAdmissionCreationContractAllocationDrawer/helper/components/AllAdmissionCreationContractServiceCard/AllAdmissionCreationContractServiceCard";

const AllAdmissionCreationContractServicesStep = ({
  services,
  selectedServiceIds,
  onToggleService,
  onDefineBeneficiary,
  onEditBeneficiary,
}: AllAdmissionCreationContractServicesStepProps) => {
  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex w-full flex-col gap-1">
      <div className="flex items-center justify-start gap-1">
        <span className="text-dustred-5 text-xs">*</span>
        <span className="text-neutral-12 text-sm">
          انتخاب خدمات (انتخاب حداقل ۱ مورد الزامی می‌باشد)
        </span>
      </div>

      <div className="flex w-full flex-col gap-4">
        {services.map((service) => (
          <AllAdmissionCreationContractServiceCard
            key={service.id}
            service={service}
            selected={selectedServiceIds.includes(service.id)}
            onToggle={() => onToggleService(service.id)}
            onDefineBeneficiary={(beneficiaryId) =>
              onDefineBeneficiary(service.id, beneficiaryId)
            }
            onEditBeneficiary={(beneficiaryId) =>
              onEditBeneficiary(service.id, beneficiaryId)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default AllAdmissionCreationContractServicesStep;
