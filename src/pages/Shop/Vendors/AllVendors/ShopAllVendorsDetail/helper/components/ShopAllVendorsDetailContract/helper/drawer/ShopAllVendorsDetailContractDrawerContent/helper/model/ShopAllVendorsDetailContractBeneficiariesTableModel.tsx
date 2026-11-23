import { IoCheckbox } from "react-icons/io5";

import { CustomButton } from "@components/CustomInputs";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { GREEN_07 } from "@infra/VARS/globalColors/globalColors";
import { GetServiceAndBeneficiaryTemplateBeneficiaryType } from "@pages/Shop/Vendors/AllVendors/ShopAllVendorsDetail/helper/components/ShopAllVendorsDetailContract/@types/@shopAllVendorsDetailContract";

const UNSPECIFIED_BENEFICIARY_LABEL = "مشخص نشده";

const ShopAllVendorsDetailContractBeneficiariesTableModel = ({
  onDefineBeneficiary,
  onEditBeneficiary,
}: {
  onDefineBeneficiary: (beneficiaryId: number) => void;
  onEditBeneficiary: (beneficiaryId: number) => void;
}): CustomColumnType<GetServiceAndBeneficiaryTemplateBeneficiaryType>[] => [
  {
    title: "کسب و کار ذینفع",
    dataIndex: "businessName",
    key: "businessName",
    render: (value: string) => {
      if (!value) {
        return <span className="text-dustred-5">{UNSPECIFIED_BENEFICIARY_LABEL}</span>;
      }

      return dataPlaceHolder({ data: value });
    },
  },
  {
    title: "شعبه / واحد ذینفع",
    dataIndex: "branchName",
    key: "branchName",
    render: (value: string) => {
      if (!value) {
        return <span className="text-dustred-5">{UNSPECIFIED_BENEFICIARY_LABEL}</span>;
      }

      return dataPlaceHolder({ data: value });
    },
  },
  {
    title: "فروشنده",
    dataIndex: "supplier",
    key: "supplier",
    width: 100,
    render: (value: boolean) =>
      value ? <IoCheckbox size={22} color={GREEN_07} /> : dataPlaceHolder({ data: null }),
  },
  {
    title: "سهم",
    dataIndex: "partitionCoefficient",
    key: "partitionCoefficient",
    width: 90,
    render: (value: number) => dataPlaceHolder({ data: `${value}%` }),
  },
  {
    title: "",
    key: "actions",
    width: 130,
    className: "tables-sticky-column-left",
    fixed: "right",
    render: (_: unknown, record: GetServiceAndBeneficiaryTemplateBeneficiaryType) => {
      const ruleTypeName = record.beneficiaryRuleType?.name;
      if (ruleTypeName === "LEGAL_DETERMINED" || ruleTypeName === "PERSONAL_DETERMINED") {
        return null;
      }

      const isDefined = Boolean(record.businessName && record.branchName);

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

export default ShopAllVendorsDetailContractBeneficiariesTableModel;
