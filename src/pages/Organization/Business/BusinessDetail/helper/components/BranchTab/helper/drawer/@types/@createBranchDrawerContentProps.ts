export type CreateBranchDrawerContentProps = {
  closeDrawerHandler: () => void;
  isModifyDrawerOpen: {
    isOpen: boolean;
    id: number;
  };
};

export type ViewBranchDrawerContentProps = {
  closeDrawerHandler: () => void;
  branchTitle: string;
};
