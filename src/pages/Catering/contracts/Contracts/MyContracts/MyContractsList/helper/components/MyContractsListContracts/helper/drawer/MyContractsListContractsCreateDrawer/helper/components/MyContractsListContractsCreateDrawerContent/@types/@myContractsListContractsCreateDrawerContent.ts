import { SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { IdTitle } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { GetDetailMySelfsProductsContent } from "@pages/Catering/Selfs/MySelfs/MySelfDetail/helper/components/CateringMySelfsFoodSchedule/@types/@cateringMySelfsFoodSchedule";

export type MyContractsListContractsCreateDrawerContentFormType = {
  contractTitle: string;
  vendor: SelectType<IdTitle>;
  self: SelectType<IdTitle>;
  contractNo: string;
  contractDateRange: [string, string];
  contractDescription: string;
  firstImage?: string;
  secondImage?: string;
  thirdImage?: string;
  fourthImage?: string;
};

export type MyContractsListContractsCreateDrawerStep = 0 | 1;

export type MyContractsListContractsCreateDrawerContentProps = {
  onCloseDrawer: () => void;
  onSuccess: () => void;
  foodsRefreshKey: number;
  onOpenAddFood: (contractId: number) => void;
  onOpenAddSideDish: (contractId: number) => void;
  onOpenEditFood: (product: GetDetailMySelfsProductsContent) => void;
  onContractCreated: (contractId: number) => void;
  resumeContractId?: number | null;
};

export type CreateMyContractRequest = {
  title: string;
  description?: string;
  restaurantId: number;
  vendorId: number;
  startedDate: string;
  endDate: string;
  contractUUID: string;
  file1: string | null;
  file2: string | null;
  file3?: string | null;
  file4?: string | null;
};

export type CreateMyContractResponse = number;

export type SubmitMyContractRequest = {
  id: number;
};

export type SubmitMyContractResponse = number;
