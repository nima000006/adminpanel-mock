import { Form } from "antd";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { PiBuildings, PiListDashes, PiMoney, PiReceipt, PiUser } from "react-icons/pi";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomRadioGroup from "@components/CustomInputs/CustomRadioGroup/CustomRadioGroup";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORMITORY_USER_REQUESTS_RESERVATION_REQUESTS_PAGE_ROUTE } from "@infra/router/routes/dormitory";
import { CUSTOM_REQUIRED_RULE } from "@infra/validation/validationSchema";

import {
  ProformaInvoiceFormType,
  ProformaPaymentMethod,
} from "./@types/@proformaInvoiceStep";
import {
  MANUAL_RESERVATION_MOCK_PROFORMA,
  MANUAL_RESERVATION_PAYMENT_METHOD,
} from "../../mock/manualReservationProforma";
import ProformaAmountSummary from "./helper/components/ProformaAmountSummary/ProformaAmountSummary";
import ProformaInfoCard from "./helper/components/ProformaInfoCard/ProformaInfoCard";
import ProformaInstallmentCard from "./helper/components/ProformaInstallmentCard/ProformaInstallmentCard";
import "./_proformaInvoiceStep.scss";

const SELECT_PAYMENT_METHOD_REQUIRED_MSG = "لطفا روش پرداخت را انتخاب کنید.";
const ZERO_DEPOSIT_AMOUNT = 0;
const PREVIOUS_STEP = "3";

const PAYMENT_METHOD_OPTIONS: {
  value: ProformaPaymentMethod;
  label: string;
  Icon: typeof PiMoney;
}[] = [
  {
    value: MANUAL_RESERVATION_PAYMENT_METHOD.installments,
    label: "اقساط",
    Icon: PiReceipt,
  },
  {
    value: MANUAL_RESERVATION_PAYMENT_METHOD.full,
    label: "یکجا",
    Icon: PiMoney,
  },
];

const ProformaInvoiceStep = () => {
  const [form] = Form.useForm<ProformaInvoiceFormType>();
  const navigate = useNavigate();
  const { params, setSearchParams } = useQueryParams();
  const invoice = MANUAL_RESERVATION_MOCK_PROFORMA;
  const { user, stay } = invoice;

  const paymentMethod = Form.useWatch("paymentMethod", form);
  const isInstallments = paymentMethod === MANUAL_RESERVATION_PAYMENT_METHOD.installments;
  const hasSecurityDeposit = invoice.depositAmount > ZERO_DEPOSIT_AMOUNT;

  //* ================================ Util Functions ================================

  const cancelClickHandler = () => {
    navigate(DORMITORY_USER_REQUESTS_RESERVATION_REQUESTS_PAGE_ROUTE);
  };

  const backClickHandler = () => {
    setSearchParams({ ...params, step: PREVIOUS_STEP });
  };

  const submitClickHandler = async () => {
    await form.validateFields(["paymentMethod"]);
    toast.success("رزرو دستی با موفقیت ثبت شد.", {
      toastId: "manual-reservation-proforma-success",
    });
    navigate(DORMITORY_USER_REQUESTS_RESERVATION_REQUESTS_PAGE_ROUTE);
  };

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        paymentMethod: MANUAL_RESERVATION_PAYMENT_METHOD.full,
      }}
      onFinish={submitClickHandler}
      className="flex flex-col gap-6"
    >
      <Div className="flex flex-col gap-6">
        <p className="h5-medium text-neutral-11 m-0 text-right">پیش فاکتور</p>

        <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-2">
          <ProformaInfoCard
            icon={PiUser}
            label="مشخصات کاربر"
            up={{
              firstName: {
                label: "نام",
                value: dataPlaceHolder({ data: user.firstName }),
              },
              lastName: {
                label: "نام خانوادگی",
                value: dataPlaceHolder({ data: user.lastName }),
              },
              userGroup: {
                label: "گروه کاربری",
                value: dataPlaceHolder({ data: user.userGroup }),
              },
              nationalCode: {
                label: "کدملی/فراگیر",
                value: (
                  <span dir="ltr">{dataPlaceHolder({ data: user.nationalCode })}</span>
                ),
              },
            }}
            down={{
              unit: {
                label: "شعبه/واحد",
                value: dataPlaceHolder({ data: user.unit }),
              },
              phoneNumber: {
                label: "شماره تماس",
                value: (
                  <span dir="ltr">{dataPlaceHolder({ data: user.phoneNumber })}</span>
                ),
              },
              education: {
                label: "اطلاعات تحصیلی",
                value: (
                  <div className="flex flex-wrap items-center justify-end gap-2">
                    <span className="text-neutral-12">
                      {dataPlaceHolder({ data: user.degree })}
                    </span>
                    <span className="border-neutral-4 self-stretch border-l" />
                    <span className="text-neutral-12">
                      {dataPlaceHolder({ data: user.major })}
                    </span>
                  </div>
                ),
              },
            }}
          />
          <ProformaInfoCard
            icon={PiBuildings}
            label="مشخصات اسکان"
            up={{
              residence: {
                label: "اقامتگاه",
                value: dataPlaceHolder({ data: stay.residence }),
              },
              building: {
                label: "ساختمان",
                value: dataPlaceHolder({ data: stay.building }),
              },
              floor: {
                label: "طبقه",
                value: dataPlaceHolder({ data: stay.floor }),
              },
              unit: {
                label: "واحد اقامتی",
                value: dataPlaceHolder({ data: stay.unit }),
              },
              bed: {
                label: "تخت",
                span: 2,
                value: (
                  <span className="inline-flex flex-wrap items-center gap-1">
                    <span>{dataPlaceHolder({ data: stay.bed })}</span>
                    <span className="footnote text-neutral-7">
                      {dataPlaceHolder({ data: stay.bedDetails })}
                    </span>
                  </span>
                ),
              },
            }}
            down={{
              admissionProgram: {
                label: "برنامه پذیرش",
                value: (
                  <div className="flex flex-wrap items-center justify-end gap-2">
                    <CustomTag color="blue" className="m-0!">
                      {dataPlaceHolder({ data: stay.admissionProgramTag })}
                    </CustomTag>
                    <span className="border-neutral-4 self-stretch border-l" />
                    <span className="footnote text-primary-6">
                      {dataPlaceHolder({ data: stay.admissionProgramTitle })}
                    </span>
                  </div>
                ),
              },
              stayRange: {
                label: "بازه اسکان",
                value: dataPlaceHolder({ data: stay.stayRangeLabel }),
              },
            }}
          />
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="body-regular text-neutral-11 m-0 text-right font-medium">
              روش پرداخت هزینه اقامتی
            </p>

            <CustomInput
              name="paymentMethod"
              rules={[CUSTOM_REQUIRED_RULE(SELECT_PAYMENT_METHOD_REQUIRED_MSG)]}
              className="mb-0!"
              hidden
            />

            <CustomRadioGroup
              value={paymentMethod}
              onChange={(e) => form.setFieldValue("paymentMethod", e.target.value)}
              options={PAYMENT_METHOD_OPTIONS.map(({ value, label, Icon }) => ({
                value,
                label: (
                  <div className="flex items-center gap-2">
                    <Icon size={20} className="text-neutral-8 shrink-0" />
                    <p className="body-regular text-neutral-11 m-0">{label}</p>
                  </div>
                ),
              }))}
              containerClassName="proforma-payment-method-radio w-full [&_.ant-form-item]:mb-0"
              radioClassName="w-auto"
              className="mb-0!"
            />
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            {/* Payable first so RTL places it on the right per Figma. */}
            <ProformaAmountSummary
              label="هزینه اقامتی قابل پرداخت"
              amount={invoice.payableAmount}
              variant="payable"
            />
            {hasSecurityDeposit ? (
              <ProformaAmountSummary
                label="مبلغ ودیعه(روش تسویه یکجا)"
                amount={invoice.depositAmount}
                variant="deposit"
              />
            ) : null}
          </div>

          {isInstallments ? (
            <div className="flex flex-col gap-6">
              <CustomDivider
                text={
                  <span className="body-regular text-neutral-11 inline-flex items-center gap-2">
                    پیش فاکتور های اقساط
                    <PiListDashes size={16} />
                  </span>
                }
                className="body-regular mb-0!"
              />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {invoice.installments.map((item) => (
                  <ProformaInstallmentCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="flex items-center justify-end gap-4">
          <CustomButton onClick={cancelClickHandler}>انصراف</CustomButton>
          <CustomButton onClick={backClickHandler}>بازگشت</CustomButton>
          <CustomButton
            type="primary"
            htmlType="submit"
            icon={<AiOutlineArrowLeft />}
            iconPlacement="end"
          >
            ثبت رزرو
          </CustomButton>
        </div>
      </Div>
    </Form>
  );
};

export default ProformaInvoiceStep;
