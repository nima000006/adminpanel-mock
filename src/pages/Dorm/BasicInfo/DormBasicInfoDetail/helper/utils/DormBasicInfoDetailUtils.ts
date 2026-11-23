export const SwitchMode = (SwitchModeType: boolean) => {
  switch (SwitchModeType) {
    case true:
      return "فعال";
    case false:
      return "غیرفعال";
  }
};
export const ACTIVE_SWITCH_MODAL_MESSAGE =
  "ایا از  فعال کردن آیتم مورد نظر اطمینان دارید؟";

export const INACTIVE_SWITCH_MODAL_MESSAGE =
  "ایا از غیر فعال کردن آیتم مورد نظر اطمینان دارید؟";
