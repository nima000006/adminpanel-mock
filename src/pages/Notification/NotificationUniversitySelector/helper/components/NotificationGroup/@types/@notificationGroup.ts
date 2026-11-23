//! GENERAL
//! LAYOUT
export type ItemsProps = {
  setIsTableShow: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveKey: React.Dispatch<React.SetStateAction<string>>;
};
//! API
export type GetAllBranchResponse = {
  data: {
    branchCode: number;
    branchName: string;
    lat: number;
    lon: number;
  }[];
  msg: string;
  status: number;
};
