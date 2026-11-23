import { FinanceBusinessOwnerCardTitleProps } from "@pages/Reports/myReport/StaticReports/Finance/FinanceBusinessOwner/helper/components/_shared/helper/components/FinanceBusinessOwnerCardTitle/@types/@financeBusinessOwnerCardTitle";

const FinanceBusinessOwnerCardTitle = ({
  title,
  icon,
  className,
}: FinanceBusinessOwnerCardTitleProps) => {
  return (
    <div className={`mb-10! flex items-center justify-between pt-5 ${className}`}>
      <h3 className="text-xl! font-medium!">{title}</h3>

      {icon && icon}
    </div>
  );
};

export default FinanceBusinessOwnerCardTitle;
