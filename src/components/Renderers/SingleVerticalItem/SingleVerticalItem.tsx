import { Statistic } from "antd";

import AnimatedCountUp from "@components/Renderers/AnimatedCountUp/AnimatedCountUp";
import { dataPlaceHolder } from "@infra/helpers/utils";

import { SingleVerticalItemProps } from "./@types/@singleVerticalItem";

import "./_singleVerticalItem.scss";

// const SingleVerticalItem = ({
//   label,
//   value,
//   hasCountUpEffect = false,
//   groupSeparator,
//   loading,
//   precision,
//   prefix,
//   suffix,
//   icon, // اضافه کردم
//   valueStyle,
//   isDate,
//   hasSpecialTime,
//   isPrice,
//   isPriceWithExtraNumbers,
//   isTime,
//   customDateFormat,
//   callBack,
//   className,
//   extraContent,
//   valueClassName,
//   symbol,
//   ...props
// }: SingleVerticalItemProps) => {
//   const isNumeric = (val: any) => {
//     return !isNaN(parseFloat(val)) && isFinite(val) && hasCountUpEffect;
//   };

//   return (
//     <Statistic
//       title={label}
//       value={value}
//       className={`user-item ${className}`}
//       groupSeparator={groupSeparator}
//       loading={loading}
//       precision={precision}
//       prefix={prefix}
//       suffix={suffix}
//       valueStyle={valueStyle}

//       formatter={(value) => {
//         if (isNumeric(value)) {
//           return <CountUp end={parseFloat(value as string)} separator="" />;
//         }
//         if (typeof value === "string" || value === null || value === undefined) {
//           return (
//             <div className={`value-container ${extraContent ? "space-between" : ""}`}>
//               {/* MAIN CONTENT */}
//               <span className={valueClassName ? valueClassName : undefined}>
//                 {dataPlaceHolder({
//                   data: value ?.toString(),
//                   isDate,
//                   hasSpecialTime,
//                   isPrice,
//                   isPriceWithExtraNumbers,
//                   isTime,
//                   customDateFormat,
//                   callBack,
//                 })}
//                 {symbol && value && <span className="symbol">{symbol}</span>}
//               </span>

//               {/* EXTRA CONTENT */}
//               {extraContent && <span>{extraContent}</span>}
//             </div>
//           );
//         }

//         return <span>_</span>;
//         // return <span>{value}</span>;
//       }}
//       {...props}
//     />
//   );
// };

// تغییر داده شد به دلیل اینکه ایکن رو باید اضافه میکردم
const SingleVerticalItem = ({
  label,
  value,
  hasCountUpEffect = false,
  groupSeparator,
  loading,
  precision,
  prefix,
  suffix,
  icon,
  valueStyle,
  isDate,
  hasSpecialTime,
  isPrice,
  isPriceWithExtraNumbers,
  isTime,
  customDateFormat,
  callBack,
  className,
  extraContent,
  hint,
  valueClassName,
  symbol,
  isRial,
  currency,
  ...props
}: SingleVerticalItemProps) => {
  const isNumeric = (val: string | number) => {
    return !isNaN(parseFloat(String(val))) && isFinite(Number(val)) && hasCountUpEffect;
  };

  const statistic = (
    <Statistic
      title={label}
      value={value}
      className={`user-item ${className}`}
      groupSeparator={groupSeparator}
      loading={loading}
      precision={precision}
      prefix={prefix}
      suffix={suffix}
      valueStyle={valueStyle}
      formatter={(value) => {
        let content;

        if (isNumeric(value)) {
          content = <AnimatedCountUp end={Number(value)} separator="" />;
        } else if (typeof value === "string" || value === null || value === undefined) {
          content = dataPlaceHolder({
            data: value,
            isDate,
            hasSpecialTime,
            isPrice,
            isPriceWithExtraNumbers,
            isTime,
            customDateFormat,
            callBack,
            currency,
            isRial,
          });
        } else {
          content = <span>_</span>;
        }

        return (
          <div
            className={`value-container w-full ${extraContent ? "space-between" : ""}`}
          >
            {icon && <span>{icon}</span>}

            <span className={valueClassName}>
              {content}
              {symbol && value && <span className="symbol">{symbol}</span>}
            </span>

            {extraContent && <span>{extraContent}</span>}
          </div>
        );
      }}
      {...props}
    />
  );

  if (!hint) {
    return statistic;
  }

  return (
    <div className="single-vertical-item-wrapper">
      {statistic}
      <div className="user-item-hint">{hint}</div>
    </div>
  );
};

export default SingleVerticalItem;
