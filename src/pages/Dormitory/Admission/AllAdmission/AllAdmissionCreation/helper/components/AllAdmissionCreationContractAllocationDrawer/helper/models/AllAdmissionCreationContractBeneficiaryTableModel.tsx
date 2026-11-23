import { IoCheckbox } from "react-icons/io5";

import { CustomButton } from "@components/CustomInputs";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { GREEN_07 } from "@infra/VARS/globalColors/globalColors";
import { AllAdmissionCreationContractBeneficiary } from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionCreation/@types/@allAdmissionCreation";
import {
  CONTRACT_PERSON_TYPE_COLOR,
  CONTRACT_PERSON_TYPE_LABEL,
  UNSPECIFIED_BENEFICIARY_LABEL,
} from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionCreation/helper/util";

const AllAdmissionCreationContractBeneficiaryTableModel = ({
  onDefineBeneficiary,
  onEditBeneficiary,
}: {
  onDefineBeneficiary: (beneficiaryId: string) => void;
  onEditBeneficiary: (beneficiaryId: string) => void;
}): CustomColumnType<AllAdmissionCreationContractBeneficiary>[] => [
  {
    title: "کسب و کار ذینفع",
    dataIndex: "business",
    key: "business",
    render: (value: string | null) => {
      if (!value) {
        return <span className="text-dustred-5">{UNSPECIFIED_BENEFICIARY_LABEL}</span>;
      }

      return dataPlaceHolder({ data: value });
    },
  },
  {
    title: "شعبه / واحد ذینفع",
    dataIndex: "branch",
    key: "branch",
    render: (value: string | null) => {
      if (!value) {
        return <span className="text-dustred-5">{UNSPECIFIED_BENEFICIARY_LABEL}</span>;
      }

      return dataPlaceHolder({ data: value });
    },
  },
  {
    title: "فروشنده",
    dataIndex: "isSeller",
    key: "isSeller",
    width: 100,
    render: (value: boolean) =>
      value ? <IoCheckbox size={22} color={GREEN_07} /> : dataPlaceHolder({ data: null }),
  },
  {
    title: "سهم",
    dataIndex: "sharePercent",
    key: "sharePercent",
    width: 90,
    render: (value: number) => dataPlaceHolder({ data: `${value}%` }),
  },
  {
    title: "نوع شخصیت",
    dataIndex: "personType",
    key: "personType",
    width: 110,
    render: (value: AllAdmissionCreationContractBeneficiary["personType"]) => (
      <CustomTag className="w-fit" color={CONTRACT_PERSON_TYPE_COLOR[value]}>
        {CONTRACT_PERSON_TYPE_LABEL[value]}
      </CustomTag>
    ),
  },
  {
    title: "",
    key: "actions",
    width: 130,
    className: "tables-sticky-column-left",
    fixed: "right",
    render: (_: unknown, record: AllAdmissionCreationContractBeneficiary) => {
      const isDefined = Boolean(record.business && record.branch);

      return (
        <CustomButton
          type="link"
          className="px-0!"
          onClick={() =>
            isDefined ? onEditBeneficiary(record.id) : onDefineBeneficiary(record.id)
          }
        >
          {isDefined ? "ویرایش ذینفع" : "تعیین ذینفع"}
        </CustomButton>
      );
    },
  },
];

export default AllAdmissionCreationContractBeneficiaryTableModel;
