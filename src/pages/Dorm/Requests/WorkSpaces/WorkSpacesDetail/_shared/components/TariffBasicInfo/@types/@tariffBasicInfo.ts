import { GetTariffBasicInfoCopyDetailResponse } from "@pages/Dorm/Planning/Tariff/TariffDetail/TariffDetailActiveTab/helpers/TariffBasicInfoTab/@types/@tariffBasicInfoTab";

export type TariffBasicInfoProps = {
  data: GetTariffBasicInfoCopyDetailResponse | undefined;
  loading: boolean;
};
