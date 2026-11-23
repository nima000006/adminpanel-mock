import { FinanceBusinessOwnerServiceBoxProps } from "@pages/Reports/myReport/StaticReports/Finance/FinanceBusinessOwner/helper/components/FinanceBusinessOwnerService/helper/components/FinanceBusinessOwnerServiceBox/@types/@financeBusinessOwnerServiceBox";

const FinanceBusinessOwnerServiceBox = ({
  rightTitle,
  leftTitle,
  icon,
  iconBgClass,
  className,
}: FinanceBusinessOwnerServiceBoxProps) => {
  return (
    <div className={`bg-neutral-2 flex justify-between rounded-sm p-5 ${className}`}>
      <div className="flex items-center gap-2">
        <span
          className={`flex h-7 w-7 items-center justify-center rounded-sm ${iconBgClass}`}
        >
          {icon}
        </span>

        <p className="dark:text-neutral-7">{rightTitle}</p>
      </div>
      <p className="dark:text-neutral-7 text-xl">{leftTitle}</p>
    </div>
  );
};

export default FinanceBusinessOwnerServiceBox;
