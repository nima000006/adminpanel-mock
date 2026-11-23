import { useEffect, useState } from "react";

import { AdminRoles, useRoles } from "@infra/hooks/useRoles";

const useAdminBranchCode = () => {
  const [isAdminBranchCode, setIsAdminBranchCode] = useState(false);
  const { hasRole } = useRoles([AdminRoles.ADMIN, AdminRoles.DORM_ADMIN]);

  useEffect(() => {
    try {
      if (
        // Todo[Atefeh]: remove if not necessary
        // meta?.staff?.admin?.branchId === 1111 ||
        // meta?.staff?.admin?.branchId === 1234
        hasRole
      ) {
        setIsAdminBranchCode(true);
      }
    } catch (_) {
      setIsAdminBranchCode(false);
    }
  }, []);
  return [isAdminBranchCode, setIsAdminBranchCode];
};

export default useAdminBranchCode;
