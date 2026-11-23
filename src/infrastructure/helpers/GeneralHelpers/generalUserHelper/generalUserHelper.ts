import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  META_KEY,
  MI_KEY,
} from "@infra/services/AuthProvider/constants";
import { removeFromStorage } from "@infra/services/UserTokenStorageManager/UserTokenStorageManager";

export const resetUserStatus = () => {
  removeFromStorage(ACCESS_TOKEN_KEY);
  removeFromStorage(REFRESH_TOKEN_KEY);
  removeFromStorage(META_KEY);
  removeFromStorage(MI_KEY);
};
