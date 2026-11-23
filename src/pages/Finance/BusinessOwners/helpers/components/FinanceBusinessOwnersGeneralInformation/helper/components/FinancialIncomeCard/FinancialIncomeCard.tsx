import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import "./_financialIncomeCard.scss";
const FinancialIncomeCard = ({
  title,
  amount,
  percentage,
  color,
}: {
  title: string;
  amount: number;
  percentage?: number;
  color?: string;
}) => {
  return (
    <div className="financial-income-card">
      <div className="title-wrapper">
        <p className="title">{title}</p>
        {percentage !== undefined && (
          <CustomTag className="custom-tag" color={color}>
            {percentage} %
          </CustomTag>
        )}
      </div>
      <p className="amount text-xl font-bold">
        {dataPlaceHolder({ data: amount?.toString(), isPrice: true })}
      </p>
    </div>
  );
};
export default FinancialIncomeCard;
