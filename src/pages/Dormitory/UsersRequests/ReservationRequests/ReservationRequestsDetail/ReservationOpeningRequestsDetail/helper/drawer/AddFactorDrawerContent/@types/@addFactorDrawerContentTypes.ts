import {
  SelectType,
  IdTitleName,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type AddFactorDrawerContentProps = {
  closeDrawerHandler: () => void;
};

export type AddFactorFirstStepDrawerContentForm = {
  service: SelectType<IdTitleName>;
  quantity: SelectType<IdTitleName>;
  price: number;
  reason: SelectType<IdTitleName>;
  description: string;
  fileName: string;
  imageUploader: string[];
  paymentMethod: string;
  appealSessionDate: string;
  dailyFine: number;
  installmentCount: number;
  interestRate: number;
  hasPrepayment: boolean;
  percentageOfTotalAmount: number;
};
