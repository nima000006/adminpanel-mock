import generatePicker from "antd/es/date-picker/generatePicker";
import { Dayjs } from "dayjs";

import { generateJalaliConfigFix } from "./utils/jalali";

const DatePickerFix = generatePicker<Dayjs>(generateJalaliConfigFix);
export default DatePickerFix;
