import { useContext } from "react";

import { FaqManagerContext } from "./FaqManagementContext";

export const useFaqManagerContext = () => {
  return useContext(FaqManagerContext);
};
