import { useState } from "react";

import { MenuProps } from "antd";
import { LuCircleMinus, LuCirclePlus, LuPercent } from "react-icons/lu";
import { PiPencilLine, PiReceiptLight } from "react-icons/pi";

import { CustomButton, CustomDropdown, CustomRadioGroup } from "@components/CustomInputs";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { dataPlaceHolder } from "@infra/helpers/utils";
import ProformaInvoiceResidenceCard from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/ReservationOpeningRequestsDetail/ConfirmRequestReservation/helper/components/ConfirmRequestSecondStepReservation/helper/components/ProformaInvoiceResidenceCard/ProformaInvoiceResidenceCard";
import ProformaInvoiceUserCard from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/ReservationOpeningRequestsDetail/ConfirmRequestReservation/helper/components/ConfirmRequestSecondStepReservation/helper/components/ProformaInvoiceUserCard/ProformaInvoiceUserCard";
import { ProformaPayableFactorCardProps } from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/ReservationOpeningRequestsDetail/ConfirmRequestReservation/helper/components/ConfirmRequestSecondStepReservation/helper/components/ProformaPayableFactorCard/@types/@proformaPayableFactorCardTypes";
import ProformaPayableFactorCard from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/ReservationOpeningRequestsDetail/ConfirmRequestReservation/helper/components/ConfirmRequestSecondStepReservation/helper/components/ProformaPayableFactorCard/ProformaPayableFactorCard";

const PAYMENT_METHOD = {
  lumpSum: "lumpSum",
  installment: "installment",
} as const;

const PAYMENT_METHOD_OPTIONS = [
  { value: PAYMENT_METHOD.lumpSum, label: "یکجا" },
  { value: PAYMENT_METHOD.installment, label: "اقساط" },
];

const mockData = {
  id: "1",
  fullName: "سینا سوجه",
  phoneNumber: "09123387968",
  birthDate: "1378/01/12",
  nationalCode: "0021116090",
  userGroup: "کارمند",
  position: "استاد",
  degree: "کارشناسی ارشد",
  major: "حسابداری",
};

const mockPayableAmounts = {
  accommodationPayableAmount: 1500000,
  depositAmount: 15000000,
};

// اگر ودیعه نداشته باشیم فقط مبلغ قابل پرداخت را نشان می دهیم در غیر این صورت ودیعه و سررسید اقساط را نشان می دهیم
const HAS_DEPOSIT = true;

const mockDepositCard: Omit<ProformaPayableFactorCardProps, "onEditDueDate"> = {
  variant: "deposit",
  title: "ودیعه",
  dueDate: "2024-04-21",
  amount: 15000000,
};

const mockInstallmentCards: Omit<ProformaPayableFactorCardProps, "onEditDueDate">[] = [
  {
    variant: "installment",
    title: "پیش پرداخت",
    dueDate: "2024-04-21",
    amount: 10050000,
  },
  {
    variant: "installment",
    title: "قسط اول",
    dueDate: "2024-04-21",
    amount: 10050000,
  },
  {
    variant: "installment",
    title: "قسط دوم",
    dueDate: "2024-04-21",
    amount: 10050000,
  },
  {
    variant: "installment",
    title: "قسط سوم",
    dueDate: "2024-04-21",
    amount: 10050000,
  },
];

const mockLumpSumCard: Omit<ProformaPayableFactorCardProps, "onEditDueDate"> = {
  variant: "lumpSum",
  title: "مبلغ قابل پرداخت",
  dueDate: "2024-04-21",
  amount: 10050000,
};

const exportMenu: MenuProps = {
  items: [
    {
      label: "اضافات",
      icon: <LuCirclePlus />,
      key: "excel",
    },
    {
      label: "کسورات",
      icon: <LuCircleMinus />,
      key: "pdf",
    },
    {
      label: "تخفیف",
      icon: <LuPercent />,
      key: "pdf",
    },
  ],
};

const ConfirmRequestSecondStepReservation = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>(PAYMENT_METHOD.installment);
  const [committedPaymentMethod, setCommittedPaymentMethod] = useState<string>(
    PAYMENT_METHOD.installment
  );
  const [isPaymentMethodEditable, setIsPaymentMethodEditable] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  useTitle({
    breadcrumbItems: [
      {
        title: "درخواست اقامت",
      },
      {
        title: "رزرو دستی",
      },
    ],
  });

  const payableFactorCards = (() => {
    if (!HAS_DEPOSIT) {
      return [mockLumpSumCard];
    }

    if (committedPaymentMethod === PAYMENT_METHOD.installment) {
      return [mockDepositCard, ...mockInstallmentCards];
    }

    return [mockDepositCard, mockLumpSumCard];
  })();

  //* ================================ Util Functions ================================
  const editPaymentMethodHandler = () => {
    setIsPaymentMethodEditable(true);
  };

  const submitPaymentMethodHandler = () => {
    setIsConfirmModalOpen(true);
  };

  const closeEditModalHandler = () => {
    setIsConfirmModalOpen(false);
    setPaymentMethod(committedPaymentMethod);
    setIsPaymentMethodEditable(false);
  };

  const confirmEditModalHandler = () => {
    setCommittedPaymentMethod(paymentMethod);
    setIsConfirmModalOpen(false);
    setIsPaymentMethodEditable(false);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <>
      {/* EDIT MODAL */}
      {isConfirmModalOpen && (
        <ConfirmationModalWithContent
          title="ویرایش روش پرداخت"
          isModalOpen={isConfirmModalOpen}
          confirmBtnText="بله مطمعنم"
          backBtnText="انصراف"
          closeModalHandler={closeEditModalHandler}
          onConfirmClickHandler={confirmEditModalHandler}
          isConfirmButtonLoading={false}
          content={
            <p>
              {paymentMethod === PAYMENT_METHOD.lumpSum
                ? "کاربر روش پرداخت «پرداخت یکجا» را انتخاب کرده است. آیا از تغییر آن به «پرداخت اقساطی» اطمینان دارید؟"
                : "کاربر روش پرداخت «پرداخت اقساطی» را انتخاب کرده است. آیا از تغییر آن به «پرداخت یکجا» اطمینان دارید؟"}
            </p>
          }
        />
      )}

      {/* ****************************************************************************** */}
      <div className="flex flex-col gap-6">
        <p className="h5-medium text-neutral-11 m-0 text-right">پیش فاکتور</p>
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
          <ProformaInvoiceUserCard data={mockData} />
          <ProformaInvoiceResidenceCard data={mockData} />
        </div>

        {/* ************************************************************************ */}
        <div className="flex flex-col gap-4">
          <p className="h5-medium text-neutral-11 m-0 text-right">
            روش پرداخت هزینه اقامتی
          </p>

          <div className="flex w-full items-center gap-4">
            <CustomRadioGroup
              noStyle
              disabled={!isPaymentMethodEditable}
              value={paymentMethod}
              onChange={(event) => setPaymentMethod(event.target.value)}
              options={PAYMENT_METHOD_OPTIONS}
              radioClassName="flex gap-4"
            />

            {isPaymentMethodEditable ? (
              <CustomButton type="primary" onClick={submitPaymentMethodHandler}>
                ثبت
              </CustomButton>
            ) : (
              <CustomButton
                type="link"
                className="p-0!"
                icon={<PiPencilLine size={16} />}
                iconPlacement="start"
                onClick={editPaymentMethodHandler}
              >
                ویرایش
              </CustomButton>
            )}
          </div>
        </div>
        <CustomDivider
          text={
            <span className="flex items-center gap-2">
              <PiReceiptLight />
              مبلغ قابل پرداخت
            </span>
          }
          extraContent={
            <CustomDropdown items={exportMenu} trigger={["click"]}>
              <CustomButton>
                <PiPencilLine /> عملیات پیش‌فاکتور
              </CustomButton>
            </CustomDropdown>
          }
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {payableFactorCards.map((item) => (
            <ProformaPayableFactorCard key={item.title} {...item} />
          ))}
        </div>

        {/* ************************************************************************* */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="bg-green-1 flex flex-col items-center justify-center gap-1 rounded-lg p-3 text-center">
            <p className="body-regular text-neutral-8 m-0 w-full">
              هزینه اقامتی قابل پرداخت
            </p>
            <p className="h5-bold text-neutral-11 m-0 w-full">
              {dataPlaceHolder({
                data: HAS_DEPOSIT
                  ? mockPayableAmounts.accommodationPayableAmount.toString()
                  : mockLumpSumCard.amount.toString(),
                isPrice: true,
                isRial: true,
                currency: { isAvailable: true, type: "تومان" },
              })}
            </p>
          </div>

          {HAS_DEPOSIT && (
            <div className="bg-green-1 flex flex-col items-center justify-center gap-1 rounded-lg p-3 text-center">
              <p className="body-regular text-neutral-8 m-0 w-full">
                مبلغ ودیعه(روش تسویه یکجا)
              </p>
              <p className="h5-bold text-neutral-11 m-0 w-full">
                {dataPlaceHolder({
                  data: mockPayableAmounts.depositAmount.toString(),
                  isPrice: true,
                  isRial: true,
                  currency: { isAvailable: true, type: "تومان" },
                })}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ConfirmRequestSecondStepReservation;
