import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { vendorContractTableModelType } from "@pages/Food/Vendors/_shared/@types/@vendorTypes";
import {
  ContractNumber,
  ContractTitle,
  EndContract,
  StartContract,
  Status,
  TableModelId,
} from "@pages/Food/Vendors/_shared/utils/vendorContractTableModel";
import { ContractDtoList } from "@pages/Food/Vendors/MyVendors/MyVendorsDetail/helper/components/MyVendorContractTab/@types/@myVendorContract";

export const MyVendorContractTableModel = ({
  viewClickHandler,
}: vendorContractTableModelType): CustomColumnType<ContractDtoList>[] => {
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
