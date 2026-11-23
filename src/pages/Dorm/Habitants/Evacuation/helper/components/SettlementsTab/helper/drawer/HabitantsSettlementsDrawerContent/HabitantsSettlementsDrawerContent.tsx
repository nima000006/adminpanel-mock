import { useEffect, useState } from "react";

import { Form } from "antd";
import dayjs from "dayjs";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import { IconMathOperations } from "@components/icons/icons";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import {
  useDormAdditionalInvoiceMutation,
  useHabitantsEmptyBedMutation,
} from "@infra/states/redux/Apis/dorm/habitants/dormHabitantsApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import {
  DrawerFormType,
  ModalFormType,
} from "@pages/Dorm/Habitants/Evacuation/@types/@evacuationType";
import {
  DORM_REJECT_BED_ERROR_MSG,
  DORM_REJECT_BED_SUCCESS_MSG,
} from "@pages/Dorm/Habitants/HabitantsList/helpers/utils/HabitantListUtils";

import HabitantEvacuationDrawerResidenceInfo from "../../../../HabitantEvacuationDrawerResidenceInfo/HabitantEvacuationDrawerResidenceInfo";
import HabitantEvacuationDrawerUserInfoSection from "../../../../HabitantEvacuationDrawerUserInfoSection/HabitantEvacuationDrawerUserInfoSection";
import LinkToFactorTab from "../../../../LinkToFactorTab/LinkToFactorTab";
import { HabitantsSettlementsDrawerContentProps } from "../../../@types/@settlementsTab";
import HabitantsSettlementsModalContent from "../../modal/HabitantsSettlementsModalContent/HabitantsSettlementsModalContent";
import "./_habitantsSettlementsDrawerContent.scss";

const HabitantsSettlementsDrawerContent = ({
  closeDrawerHandler,
  data,
  setRefreshList,
}: HabitantsSettlementsDrawerContentProps) => {
  const [form] = Form.useForm<DrawerFormType>();
  const [modalForm] = Form.useForm<ModalFormType>();

  const [CreditorsPaymentModal, setCreditorsPaymentModal] = useState<{
    isOpen: boolean;
    id: number;
  }>({ isOpen: false, id: -1 });

  //? ================================  Api Calls ================================

  // ثبت دراور
  const [habitantsEmptyBed, { isLoading: isHabitantsEmptyBedLoading }] =
    useHabitantsEmptyBedMutation();

  // ثبت نهایی مودال
  const [additionalInvoice, { isLoading: isAdditionalInvoiceLoading }] =
    useDormAdditionalInvoiceMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (data) {
      form.setFieldsValue({ date: dayjs() });
    }
  }, [data, form]);

  //* ================================ Util Functions ================================

  // drawer handler
  const confirmEvacuationHandler = () => {
    const mainFormData = form.getFieldsValue();
    if (data?.id) {
      const reqBody = {
        form: "EmptyBed",
        data: {
          id: data?.id?.toString(),
          emptyDesc: mainFormData?.description,
          emptyDate: dayjs(mainFormData?.date).format("YYYY-MM-DD"),
        },
      };

      habitantsEmptyBed(reqBody)
        .unwrap()
        .then((value) => {
          if (value?.status === 200) {
            successRequestHandler();
          } else {
            toast.error(DORM_REJECT_BED_ERROR_MSG, {
              toastId: DORM_REJECT_BED_ERROR_MSG,
            });
            setRefreshList((prev) => !prev);
          }
        });
    }
  };

  const successRequestHandler = () => {
    setCreditorsPaymentModal({ isOpen: true, id: data?.id ? data.id : -1 });
  };

  // modal handler
  const creditorsPaymentHandler = () => {
    const formData = modalForm?.getFieldsValue();

    if (data?.id) {
      const modalReqBody = {
        form: "AdditionalInvoice",
        data: {
          additionalAmount: formData?.additions,
          additionalAmountDesc: formData?.additionsDesc,
          requestId: data?.id?.toString(),
          deductedAmount: formData?.deductions,
          deductedAmountDesc: formData?.deductionsDesc,
          additionalReason: formData?.reasonAdditions?.code,
          deductedReason: formData?.reasonDeductions?.code,
        },
      };

      additionalInvoice(modalReqBody)
        .unwrap()
        .then((value) => {
          if (value?.status === 200) {
            closeCreditorsPaymentModalHandler();
            closeDrawerHandler();
            toast.success(DORM_REJECT_BED_SUCCESS_MSG, {
              toastId: DORM_REJECT_BED_SUCCESS_MSG,
            });
          }
        });
    }
  };

  // close modal
  const closeCreditorsPaymentModalHandler = () => {
    modalForm.resetFields();
    setCreditorsPaymentModal({ isOpen: false, id: -1 });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <>
      {CreditorsPaymentModal?.isOpen && (
        <ConfirmationModalWithContent
          title="پرداخت بستانکاری"
          iconType=""
          isModalOpen={CreditorsPaymentModal?.isOpen}
          confirmBtnText="ثبت نهایی"
          backBtnText="انصراف"
          closeModalHandler={closeCreditorsPaymentModalHandler}
          isConfirmButtonLoading={isAdditionalInvoiceLoading}
          onConfirmClickHandler={creditorsPaymentHandler}
          content={<HabitantsSettlementsModalContent form={modalForm} />}
          width={800}
        />
      )}
      <div>
        <CustomDrawerHeader
          title="تخلیه"
          closeDrawerHandler={closeDrawerHandler}
          leftSideContent={
            <div className="flex gap-2">
              <CustomButton onClick={closeDrawerHandler} className="drawer-action-btn">
                انصراف
              </CustomButton>
              <CustomButton
                type="primary"
                onClick={confirmEvacuationHandler}
                className="drawer-action-btn"
                htmlType="submit"
                loading={isHabitantsEmptyBedLoading}
              >
                تایید و تخلیه
              </CustomButton>
            </div>
          }
        />
        <div className="habitant-settlement-drawer-content-container fle flex-col gap-10 p-6">
          {/* ALERT */}
          <CustomAlert
            message="راهنما!"
            description={
              <div>
                <p>تاریخ تخلیه به طور پیش‌فرض، تاریخ روز جاری تعیین شده است.</p>
                <p>
                  در صورت تمایل، می‌توانید تاریخ تخلیه را بر اساس صلاحدید خود تغییر دهید.
                </p>
              </div>
            }
            showIcon
            closable
          />

          <Div className="flex flex-col gap-4">
            <Form className="form-data" form={form}>
              <CustomDatePicker
                label="تاریخ تخلیه"
                name="date"
                rules={[REQUIRED_RULE]}
                form={form}
              />
            </Form>
            <CustomAlert
              description={
                <div className="status-alert-body">
                  <div className="flex items-center gap-5">
                    <IconMathOperations viewBox="0 0 30 30" fill="#95DE64" />
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <h5 className="text-neutral-11 h4-medium">وضعیت مالی</h5>
                        <CustomTag color="green">تسویه شده</CustomTag>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <LinkToFactorTab value={data} />
                  </div>
                </div>
              }
              type="success"
            />
            <Form className="form-data" form={form}>
              <CustomTextArea
                label="توضیحات (اختیاری)"
                name="description"
                placeholder="توضیحات لازم را وارد نمایید."
              />
            </Form>
          </Div>
          <div>
            <CustomDivider text="مشخصات کاربر" />
            <HabitantEvacuationDrawerUserInfoSection data={data} />
          </div>
          <div>
            <CustomDivider text="مشخصات سکونت" />
            <HabitantEvacuationDrawerResidenceInfo data={data} />
          </div>
        </div>
      </div>
    </>
  );
};
export default HabitantsSettlementsDrawerContent;
