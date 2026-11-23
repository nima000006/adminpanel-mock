import { dataPlaceHolder } from "@infra/helpers/utils";

import { ContractsTemplateFinanceConditionCardProps } from "./@types/@contractsTemplateFinanceConditionCardProps";

const ContractsTemplateFinanceConditionCard = ({
  title,
  count,
  total,
  status,
}: ContractsTemplateFinanceConditionCardProps) => {
  const getStatusClasses = (status: string) => {
    switch (status) {
      case "ASSIGNED":
        return {
          bg: "bg-green-1",
          border: "border-green-4",
        };
      case "ASSIGNING":
        return {
          bg: "bg-yellow-1",
          border: "border-yellow-4",
        };
      case "UNASSIGNED":
        return {
          bg: "bg-dustred-1",
          border: "border-dustred-4",
        };
      default:
        return {
          bg: "bg-green-1",
          border: "border-green-4",
        };
    }
  };

  const { bg, border } = getStatusClasses(status);

  return (
    <div className={`body-regular ${bg} ${border} rounded-xl border border-dashed p-3!`}>
      <h3 className="text-neutral-11 font-semibold">{title}</h3>
      <p>
        {dataPlaceHolder({ data: count })} از {dataPlaceHolder({ data: total })}
      </p>
    </div>
  );
};

export default ContractsTemplateFinanceConditionCard;
