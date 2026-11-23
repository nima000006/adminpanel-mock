import { SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { IdTitle } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { GetDetailAllSelfsProductsContent } from "@pages/Catering/Selfs/AllSelfs/AllSelfDetail/helper/components/CateringAllSelfsFoodSchedule/@types/@cateringAllSelfsFoodSchedule";

export type AllContractsListContractsCreateDrawerContentFormType = {
  contractTitle: string;
  vendor: SelectType<IdTitle>;
  self: SelectType<IdTitle>;
  contractNo: string;
  contractDateRange: [string, string];
  restaurantPercentage: number | string;
  providerPercentage: number | string;
  contractDescription: string;
  firstImage?: string;
  secondImage?: string;
  thirdImage?: string;
  fourthImage?: string;
};

export type AllContractsListContractsCreateDrawerContentProps = {
  onCloseDrawer: () => void;
  onSuccess: () => void;
  foodsRefreshKey: number;
  onOpenAddFood: (contractId: number) => void;
  onOpenAddSideDish: (contractId: number) => void;
  onOpenEditFood: (product: GetDetailAllSelfsProductsContent) => void;
  onContractCreated: (contractId: number) => void;
  resumeContractId?: number | null;
};

export type AllContractsListContractsCreateDrawerStep = 0 | 1;

export type CreateAllContractRequest = {
  title: string;
  description?: string;
  restaurantId: number;
  vendorId: number;
  startedDate: string;
  endDate: string;
  providerPercentage: number;
  restaurantPercentage: number;
  contractUUID: string;
  file1: string | null;
  file2: string | null;
  file3?: string | null;
  file4?: string | null;
};

export type CreateAllContractResponse = number;

export type SubmitAllContractRequest = {
  id: number;
};

export type SubmitAllContractResponse = number;
