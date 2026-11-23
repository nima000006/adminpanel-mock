import { Navigate } from "react-router";

const RedirectRoute = ({
  condition,
  to,
}: {
  condition: boolean;
  to: {
    pathname: string;
    state: { purpose: string; originalPathName: string };
  };
}) => {
  return condition ? (
    <Navigate to={to} state={{ originalPathName: to?.state?.originalPathName }} />
  ) : null;
};

export default RedirectRoute;
