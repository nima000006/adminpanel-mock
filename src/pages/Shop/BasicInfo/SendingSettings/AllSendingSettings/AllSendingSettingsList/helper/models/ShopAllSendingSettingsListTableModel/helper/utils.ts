import { ShopAllSendingSettingsListRecordType } from "@pages/Shop/BasicInfo/SendingSettings/AllSendingSettings/AllSendingSettingsList/@types/@shopAllSendingSettingsList";

export const formatDeliveryDays = (
  min?: ShopAllSendingSettingsListRecordType["tehranMinDeliveryDays"],
  max?: ShopAllSendingSettingsListRecordType["tehranMaxDeliveryDays"]
): string | undefined => {
  if (min == null && max == null) return undefined;
  if (min != null && max != null) return `${min} تا ${max} روز`;
  if (min != null) return `${min} روز`;
  return `${max} روز`;
};
