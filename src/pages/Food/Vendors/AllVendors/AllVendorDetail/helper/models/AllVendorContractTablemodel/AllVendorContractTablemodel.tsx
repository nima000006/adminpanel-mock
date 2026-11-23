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
import { ContractDtoList } from "@pages/Food/Vendors/AllVendors/AllVendorDetail/helper/components/AllVendorContractTabContent/@types/@allVendorContracts";

export const AllVendorContractTableModel = ({
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
