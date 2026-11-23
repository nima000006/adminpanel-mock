import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { vendorContractTableModelType } from "@pages/Food/Vendors/_shared/@types/@vendorTypes";
import {
  ContractNumber,
  ContractTitle,
  EndContract,
  StartContract,
  Status,
  TableModelId,
} from "@pages/Food/Vendors/_shared/utils/vendorContractTableModel";

export const AllVendorContractTableModel = ({
  viewClickHandler,
}: vendorContractTableModelType) => {
  return [
    ContractTitle,
    ContractNumber,
    StartContract,
    EndContract,
    Status,
    {
      ...TableModelId,
      render: (value: number) => {
        return (
          <CustomButton
            type="link"
            onClick={() => viewClickHandler(value)}
            className="view-btn"
          >
            مشاهده
          </CustomButton>
        );
      },
    },
  ];
};
