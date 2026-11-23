import { NamePath } from "antd/es/form/interface";

export const installmentsInfo = [
  { id: 1, title: "یک قسط" },
  { id: 2, title: "دو قسط" },
  { id: 3, title: "سه قسط" },
];

//
export const dormValidateTotalPercentage =
  (getFieldValue: NamePath, status: number) => () => {
    if (status === 1) {
      return Promise.resolve();
    }

    if (status === 2) {
      const firstInstallment = Number(getFieldValue("firstInstallment"));
      const secondInstallment = Number(getFieldValue("secondInstallment"));

      if (firstInstallment + secondInstallment !== 100) {
        return Promise.reject(new Error("مجموع درصد های اقساط باید برابر با 100 باشد."));
      }
      return Promise.resolve();
    }
    if (status === 3) {
      const firstInstallment = Number(getFieldValue("firstInstallment"));
      const secondInstallment = Number(getFieldValue("secondInstallment"));
      const thirdInstallment = Number(getFieldValue("thirdInstallment"));

      if (firstInstallment + secondInstallment + thirdInstallment !== 100) {
        return Promise.reject(new Error("مجموع درصد اقساط باید برابر با 100 باشد."));
      }
      return Promise.resolve();
    }
  };

// dueDateErrorMsg
export const dueDateErrorMsg = (state: number) => {
  return `لطفا تاریخ سررسید قسط ${state === 1 ? "اول" : state === 2 ? "دوم" : "سوم"} را وارد کنید`;
};

// installmentErrorMsg
export const installmentErrorMsg = (state: number) => {
  return `لطفا مقدار قسط ${state === 1 ? "اول" : state === 2 ? "دوم" : "سوم"} را وارد کنید`;
};
