import { Checkbox } from "antd";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import { AllAdmissionCreationContractServiceCardProps } from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionCreation/@types/@allAdmissionCreation";
import AllAdmissionCreationContractBeneficiaryTableModel from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionCreation/helper/components/AllAdmissionCreationContractAllocationDrawer/helper/models/AllAdmissionCreationContractBeneficiaryTableModel";

const AllAdmissionCreationContractServiceCard = ({
  service,
  selected,
  onToggle,
  onDefineBeneficiary,
  onEditBeneficiary,
}: AllAdmissionCreationContractServiceCardProps) => {
  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div
      className={`flex w-full flex-col gap-4 rounded-2xl border border-solid p-4 ${
        selected ? "border-primary-6" : "border-neutral-5"
      }`}
    >
      <div className="flex items-center gap-3">
        <Checkbox checked={selected} onChange={onToggle} />
        <span className="text-neutral-13 text-base">{service.title}</span>
      </div>

      <CustomTable
        dataSource={service.beneficiaries}
        rowKey="id"
        columns={AllAdmissionCreationContractBeneficiaryTableModel({
          onDefineBeneficiary,
          onEditBeneficiary,
        })}
        pagination={false}
      />
    </div>
  );
};

export default AllAdmissionCreationContractServiceCard;
