import { Button } from "antd";
import moment from "jalali-moment";

import { insuredInsuranceInformationForAdminResponseDtoList } from "@pages/Insurance/InsuranceRequests/InsuranceRequestsList/@types/@InsuranceRequestsList";

import CustomTag from "../../../../../components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "../../../../helpers/utils";
import { FixedType } from "../../../modules/GeneralTypes/GeneralTypes";

const InsuranceRequestListTable = ({
  onInsuranceRequestDetailClickHandler,
  type,
}: {
  onInsuranceRequestDetailClickHandler: (id: string, insuranceStatus: number) => void;
  type: number;
}) => [
  {
    title: "نام",
    dataIndex: "firstName",
    key: "firstName",
    width: 180,
  },
  {
    title: "نام خانوادگی",
    dataIndex: "lastName",
    key: "lastName",
    width: 180,
  },
  {
    title: "جنسیت",
    dataIndex: "gender",
    key: "gender",
    width: 140,
  },
  {
    title: "کد ملی / اتباع",
    dataIndex: "nationalCode",
    key: "nationalCode",
    width: 140,
  },
  {
    title: "شماره دانشجویی",
    dataIndex: "studentNumber",
    key: "studentNumber",
    width: 180,
  },
  {
    title: "واحد دانشگاهی",
    dataIndex: "unitName",
    key: "unitName",
    width: 180,
  },
  {
    title: "شماره درخواست",
    dataIndex: "requestNumber",
    key: "requestNumber",
    width: 180,
  },
  {
    title: "بیمه‌گر",
    dataIndex: "insuranceName",
    key: "insuranceName",
    width: 100,
  },
  {
    title: "نوع بیمه",
    dataIndex: "insuranceType",
    key: "insuranceType",
    width: 100,
  },
  ...(type === 5 || type === 8
    ? [
        {
          title: "تاریخ صدور بیمه‌نامه",
          dataIndex: "issuanceDate",
          key: "issuanceDate",
          width: 150,
        },
      ]
    : []),
  {
    title: "بیمه‌شده‌ها",
    dataIndex: "insuranceCount",
    key: "insuranceCount",
    width: 100,
  },
  {
    title: "مبلغ کل (ت)",
    dataIndex: "price",
    key: "price",
    width: 100,
    render: (value: string) => {
      return dataPlaceHolder({ data: value, isPriceWithExtraNumbers: true });
    },
  },
  ...(type === 9 || type === 4
    ? [
        {
          title: "تاریخ ثبت درخواست",
          dataIndex: "requestDate",
          key: "requestDate",
          width: 150,
          render: (requestDate: string) => {
            return dataPlaceHolder({ data: requestDate, isDate: true });
          },
        },
      ]
    : []),
  ...(type === 9
    ? [
        {
          title: "وضعیت بیمه‌شده",
          dataIndex: "insuranceStatus",
          key: "insuranceStatus",
          width: 150,
          render: (value: number) => {
            if (value === 3) {
              return <CustomTag color="volcano">در انتظار پرداخت</CustomTag>;
            }
            if (value === 4) {
              return <CustomTag color="geekblue">در حال صدور</CustomTag>;
            }
            if (value === 5) {
              return <CustomTag color="green">صادر شده</CustomTag>;
            }
            if (value === 6) {
              return <CustomTag>منقضی شده</CustomTag>;
            }
            if (value === 7) {
              return <CustomTag color="red">کنسل شده</CustomTag>;
            }
            if (value === 8) {
              return <CustomTag color="gold">تعلیق شده</CustomTag>;
            }

            return value;
          },
        },
      ]
    : []),
  ...(type === 4
    ? [
        {
          title: "انتظار",
          dataIndex: "requestDate",
          key: "requestDate",
          width: 150,
          render: (value: string) => {
            const diffTime = moment(new Date(), "YYYY/M/D").diff(
              moment(value ?? new Date()),
              "days"
            );

            return (
              <div className="waiting-time-container">
                <CustomTag
                  color={
                    +diffTime < 3
                      ? "green-inverse"
                      : +diffTime > 2 && +diffTime < 5
                        ? "gold-inverse"
                        : "red-inverse"
                  }
                  staticWidth={30}
                >
                  {diffTime}
                </CustomTag>
                <span>روز</span>
              </div>
            );
          },
        },
      ]
    : []),
  ...(type === 9 || type === 4
    ? [
        {
          title: "نوع پرداخت",
          dataIndex: "paymentType",
          key: "paymentType",
          width: 150,
          render: (value: number) => {
            if (value === 1) {
              return <CustomTag color="green">اقساطی</CustomTag>;
            }
            return <CustomTag color="blue">نقدی</CustomTag>;
          },
        },
      ]
    : []),
  ...(type === 3
    ? [
        {
          title: "تاریخ ثبت فاکتور",
          dataIndex: "invoicePaymentDate",
          key: "invoicePaymentDate",
          width: 150,
          render: (value: string) => {
            return dataPlaceHolder({ data: value, isDate: true });
          },
        },
      ]
    : []),
  ...(type === 3
    ? [
        {
          title: "شماره فاکتور",
          dataIndex: "factorNumber",
          key: "factorNumber",
          width: 150,
        },
      ]
    : []),
  ...(type === 4
    ? [
        {
          title: "تاریخ پرداخت",
          dataIndex: "paymentDate",
          key: "paymentDate",
          width: 150,
          render: (value: string) => {
            return dataPlaceHolder({ data: value, isDate: true });
          },
        },
      ]
    : []),
  ...(type === 4
    ? [
        {
          title: "شماره پیگیری پرداخت",
          dataIndex: "paymentReferenceNumber",
          key: "paymentReferenceNumber",
          width: 150,
        },
      ]
    : []),
  ...(type === 5
    ? [
        {
          title: "تعداد اقساط",
          dataIndex: "installmentCount",
          key: "installmentCount",
          width: 150,
        },
      ]
    : []),

  ...(type === 5
    ? [
        {
          title: "اقساط سر رسید شده",
          dataIndex: "overInstallment",
          key: "overInstallment",
          width: 150,
        },
      ]
    : []),

  ...(type === 5
    ? [
        {
          title: "بدهی (ت)",
          dataIndex: "totalDebt",
          key: "totalDebt",
          width: 150,
        },
      ]
    : []),

  ...(type === 5
    ? [
        {
          title: "وضعیت قسط فعال",
          dataIndex: "activeInstallmentStatus",
          key: "activeInstallmentStatus",
          width: 150,
        },
      ]
    : []),

  {
    title: "",
    dataIndex: "id",
    key: "id",
    className: "tables-sticky-column-left",
    fixed: "right" as FixedType | undefined,
    width: 100,
    render: (
      value: string,
      records: insuredInsuranceInformationForAdminResponseDtoList
    ) => {
      return (
        <div className="checkout-container">
          <Button
            onClick={() =>
              onInsuranceRequestDetailClickHandler(value, records?.insuranceStatus)
            }
            type="link"
          >
            جزئیات
          </Button>
        </div>
      );
    },
  },
];

export default InsuranceRequestListTable;
