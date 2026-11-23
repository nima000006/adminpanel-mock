import {
  dataPlaceHolder,
  PriceSeparatorWithExtraNumbers,
} from "../../../../helpers/utils";

const InsuranceDetailThirdTabTableModel = [
  {
    title: "نام ",
    dataIndex: "name",
    id: "name",
    width: 120,
  },
  {
    title: "نام خانوادگی ",
    dataIndex: "family",
    id: "family",
    width: 130,
  },
  {
    title: "جنسیت",
    dataIndex: "gender",
    id: "gender",
    width: 100,
  },
  {
    title: "رده سنی",
    dataIndex: "age",
    id: "age",
    width: 100,
  },
  {
    title: "طرح بیمه انتخابی",
    dataIndex: "selectInsurancePlan",
    id: "selectInsurancePlan",
    width: 150,
  },
  {
    title: "مبلغ(تومان)",
    dataIndex: "price",
    id: "price",
    width: 100,
    render: (value: string) => {
      return dataPlaceHolder({
        data: PriceSeparatorWithExtraNumbers(value),
        isPrice: true,
      });
    },
  },
];
export default InsuranceDetailThirdTabTableModel;
