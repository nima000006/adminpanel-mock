import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { emptyString } from "@infra/config/global.vars";
import {
  CustomerGroup,
  GetFinanceBuyersDetailResponse,
} from "@pages/Finance/Buyers/BuyersDetails/@types/@buyersDetails";

import profilePicture from "../../../../../../../assets/images/Avatar.webp";

const BuyerProfile = ({
  detailData,
}: {
  detailData: GetFinanceBuyersDetailResponse | undefined;
}) => {
  return (
    <div className="mt-10 flex flex-col items-center gap-5">
      <div className="h-31 w-31 overflow-hidden rounded-lg">
        <img src={profilePicture} loading="lazy" className="h-full w-full object-cover" />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
        <span className="text-neutral-500">نوع کاربر:</span>
        {detailData?.staffTypes?.includes(CustomerGroup.STUDENT) && (
          <CustomTag color="blue">دانشجو</CustomTag>
        )}

        {detailData?.staffTypes?.includes(CustomerGroup.EMPLOYEE) && (
          <CustomTag color="volcano">کارمند</CustomTag>
        )}

        {!detailData?.staffTypes?.length && "-"}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
        <span className="text-neutral-500">سرویس های استفاده شده:</span>

        <div className="flex flex-wrap items-center gap-2">
          {detailData?.services?.map((item) => {
            return <SamimServiceTag key={item.id} service={item.name || emptyString} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default BuyerProfile;
