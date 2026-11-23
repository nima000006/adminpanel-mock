import { useContext } from "react";

import { ServiceManagerContext } from "./ServiceMangerContext";

export const useServiceManagerContext = () => {
  return useContext(ServiceManagerContext);
};
