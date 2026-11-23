import { dateParseToPersianDate } from "./dateUtils";
import {
  PriceCurrency,
  PriceSeparator,
  PriceSeparatorWithExtraNumbers,
} from "./formatters";
import { timeConvertor } from "../timeUtil";

type DataPlaceHolderType = {
  data: string | number | undefined | null | any[];
  isDate?: boolean;
  isTime?: boolean;
  isRial?: boolean;
  callBack?: (data: any) => any;
  isPrice?: boolean;
  isPriceWithExtraNumbers?: boolean;
  customDateFormat?: string;
  hasSpecialTime?: boolean;
  // isObject?: boolean;
  // pickKey?: string;
  currency?: PriceCurrency;
};

export const dataPlaceHolder = ({
  data,
  isDate = false,
  isPrice = false,
  isTime = false,
  isRial,
  isPriceWithExtraNumbers = false,
  customDateFormat,
  //  if user select time with CustomTimePicker we'de use this flag
  hasSpecialTime = false,
  currency,
  callBack, // isObject,
}: DataPlaceHolderType) => {
  if (data === null || data === undefined || data === "") {
    return "-";
  } else {
    if (Array.isArray(data)) {
      return callBack?.(data);
    }
    // if (isObject && pickKey && typeof pickKey === "string") {
    //   return data[pickKey];
    // }
    if (isDate) {
      return dateParseToPersianDate(data, customDateFormat, hasSpecialTime);
    }
    if (isPrice) {
      return PriceSeparator(data, isRial, currency);
    }
    if (isPriceWithExtraNumbers) {
      return PriceSeparatorWithExtraNumbers(data);
    }
    if (isTime) {
      return timeConvertor(data);
    }
    return data;
  }
  // return data ? (isDate ? moment(data).locale("fa").format("YYYY/M/D") : data) : "-";
};
