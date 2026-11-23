import { Withdrawal } from "../../../../../../@types/@walletRequestUsersList";

// ! LAYOUTs
export type WalletRequestRejectedDrawerCheckRequestStepProps = {
  selectedUsers?: Withdrawal[] | undefined;
  setSelectedUsers: React.Dispatch<React.SetStateAction<Withdrawal[]>>;
};

export type WalletRequestRejectedFlattenedDataType = Withdrawal & {
  firstname: string;
  LastName: string;
};
