import { useContext } from "react";

import { BannerManagerContext } from "./BannerManagementContext";

export const useBannerManagerContext = () => {
  return useContext(BannerManagerContext);
};
