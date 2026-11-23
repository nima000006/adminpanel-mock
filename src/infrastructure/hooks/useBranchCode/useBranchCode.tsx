import { useAuth } from "@infra/services/AuthProvider/helper/useAuth";

const useBranchCode = () => {
  const { user } = useAuth();
  // const branchCode = JSON.parse(getFromLocalStorage("meta") || "")?.branchCode;
  const branchCode = user?.staff?.admin?.branchId;

  return { branchCode };
};

export default useBranchCode;
