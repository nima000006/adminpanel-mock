import { emptyString } from "@infra/config/global.vars";
import { serviceOptions } from "@pages/Finance/Accountants/_shared/utils";

const ContractService = ({ service }: { service?: string | null }) => {
  const matched = serviceOptions.find((opt) => opt.value === service);

  if (!matched) return <>{emptyString}</>;

  const ServiceIcon = matched.icon;

  return (
    <>
      <div
        className={`flex h-[84px] w-[84px] items-center justify-center rounded-lg ${matched.bgGradient}`}
      >
        {ServiceIcon ? <ServiceIcon color="var(--app-text-inverse)" size={40} /> : null}
      </div>
      <p className="body-regular mt-5! w-21 text-center text-2xl! font-bold!">قرارداد</p>
      <p className="body-regular w-[84px] text-center text-2xl! font-bold!">
        {`سرویس ${matched.title}`}
      </p>
    </>
  );
};
export default ContractService;
