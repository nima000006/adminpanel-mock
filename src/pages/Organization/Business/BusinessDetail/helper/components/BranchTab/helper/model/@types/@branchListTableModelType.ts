export type BranchListTableModelProps = {
  deleteBranchHandler: (id: number) => void;
  viewBranchHandler: (branch: { id: number; title: string }) => void;
  editBranchHandler: (id: number) => void;
};
