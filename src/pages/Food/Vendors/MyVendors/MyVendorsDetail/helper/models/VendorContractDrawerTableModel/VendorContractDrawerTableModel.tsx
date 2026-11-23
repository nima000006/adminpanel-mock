import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { ContractsFoodDataType } from "@pages/Food/Contracts/MyContracts/MyContractDetail/helpers/components/Foods/@types/@foodsTab";
import {
  Food,
  Price,
} from "@pages/Food/Vendors/_shared/utils/vendorContractDrawerTravelTableModel";

export const VendorContractDrawerTableModel =
  (): CustomColumnType<ContractsFoodDataType>[] => {
    return [Food, Price];
  };
