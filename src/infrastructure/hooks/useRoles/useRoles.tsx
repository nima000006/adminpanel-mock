import { useAuth } from "@infra/services/AuthProvider/helper/useAuth";

export const useRoles = (roles: string[]) => {
  const { user } = useAuth();

  const hasRole =
    user?.staff?.admin?.employeeDtos?.some((employee) =>
      employee.roles?.some((role) =>
        roles.some((requiredRole) => role.name === requiredRole)
      )
    ) ?? false;
  return { hasRole };
};
