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
import { dataPlaceHolder } from "@infra/helpers/utils";
import {
  useDormAdditionalInvoiceMutation,
  useHabitantsEmptyBedMutation,
  useLazyGetDormFinancialSituationQuery,
} from "@infra/states/redux/Apis/dorm/habitants/dormHabitantsApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import {
  DormFinancialSituationType,
  DrawerFormType,
  GetDormFinancialSituationResponse,
  ModalFormType,
} from "@pages/Dorm/Habitants/Evacuation/@types/@evacuationType";
import {
  DORM_REJECT_BED_ERROR_MSG,
  DORM_REJECT_BED_SUCCESS_MSG,
} from "@pages/Dorm/Habitants/HabitantsList/helpers/utils/HabitantListUtils";

import HabitantEvacuationDrawerResidenceInfo from "../../../../HabitantEvacuationDrawerResidenceInfo/HabitantEvacuationDrawerResidenceInfo";
import HabitantEvacuationDrawerUserInfoSection from "../../../../HabitantEvacuationDrawerUserInfoSection/HabitantEvacuationDrawerUserInfoSection";
import LinkToFactorTab from "../../../../LinkToFactorTab/LinkToFactorTab";
import { HabitantsSettlementsDrawerContentProps } from "../../../../SettlementsTab/@types/@settlementsTab";
import HabitantsCreditorsModalContent from "../../modal/HabitantsCreditorsModalContent/HabitantsCreditorsModalContent";

const HabitantsCreditorsDrawerContent = ({
  closeDrawerHandler,
  data,
  setRefreshList,
}: HabitantsSettlementsDrawerContentProps) => {
  const [form] = Form.useForm<DrawerFormType>();
  const [modalForm] = Form.useForm<ModalFormType>();

  const [CreditorsPaymentModal, setCreditorsPaymentModal] = useState<{
    isOpen: boolean;
    data: number | null;
  }>({ isOpen: false, data: null });

  const [financialStatus, setFinancialStatus] =
    useState<DormFinancialSituationType | null>(null);

  //? ================================  Api Calls ================================
  // ثبت دراور
  const [habitantsEmptyBed, { isLoading: isHabitantsEmptyBedLoading }] =
    useHabitantsEmptyBedMutation();

  // ثبت نهایی مودال
  const [additionalInvoice, { isLoading: isAdditionalInvoiceLoading }] =
    useDormAdditionalInvoiceMutation();

  // گرفتن وضعیت مالی
  const [getDormFinancialSituation] = useLazyGetDormFinancialSituationQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (data) {
      form.setFieldsValue({ date: dayjs() });
    }
  }, [data, form]);

  useEffect(() => {
    if (data?.id) {
      getDormFinancialSituation({ maxResults: 1, firstResult: 0, id_EQ: data?.id })
        .unwrap()
        .then(getDormFinancialSituationSuccess);
      //   checkingExcessHandler();
    }
  }, [data?.id]);

  //* ================================ Util Functions ================================
  // success
  const getDormFinancialSituationSuccess = async (
    value: GetDormFinancialSituationResponse
  ) => {
    if (value?.status === 200) {
      setFinancialStatus(value?.data?.[0]);
      form.setFieldsValue({ date: value?.data?.[0]?.currenttDate });
    }
  };

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
    setCreditorsPaymentModal({
      isOpen: true,
      data: (financialStatus?.indebtedness ?? 0) * -1,
    });
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
            setRefreshList((prev) => !prev);
          }
        });
    }
  };

  // close modal
  const closeCreditorsPaymentModalHandler = () => {
    modalForm.resetFields();
    setCreditorsPaymentModal({ isOpen: false, data: null });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <>
      {CreditorsPaymentModal?.isOpen && (
        <ConfirmationModalWithContent
          title="پرداخت بستانکاری"
          iconType=""
          isModalOpen={CreditorsPaymentModal?.isOpen}
          confirmBtnText="پرداخت بستانکاری و تخلیه"
          backBtnText="انصراف"
          closeModalHandler={closeCreditorsPaymentModalHandler}
          isConfirmButtonLoading={isAdditionalInvoiceLoading}
          onConfirmClickHandler={creditorsPaymentHandler}
          content={
            <HabitantsCreditorsModalContent
              form={modalForm}
              data={CreditorsPaymentModal?.data}
            />
          }
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
        <div className="habitant-settlement-drawer-content-container">
          {/* ALERT */}
          <CustomAlert
            message="راهنما!"
            description={
              <div>
                <p>تاریخ تخلیه به طور پیش‌فرض، تاریخ روز جاری تعیین شده است.</p>
                <p>
                  در صورت تمایل، می‌توانید تاریخ تخلیه را بر اساس صلاحدید خود تغییر دهید.
                </p>
                <p>
                  مبلغ بستانکاری ساکنین خوابگاه در صورت کافی بودن موجودی شما در کیف پول،
                  به کیف پول ساکنین پرداخت خواهد شد.
                </p>
              </div>
            }
            showIcon
            closable
          />

          <Div className="date-wrapper">
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
                  <div className="right-side">
                    <IconMathOperations viewBox="0 0 30 30" fill="#FAAD14" />
                    <div className="desc-container">
                      <div className="title-container">
                        <h5 className="title">وضعیت مالی</h5>
                        <CustomTag color="orange">بستانکار</CustomTag>
                      </div>
                      <div className="info-container">
                        <span className="title">بستانکاری:</span>
                        <span className="value">
                          {financialStatus?.indebtedness != null &&
                            dataPlaceHolder({
                              data: (financialStatus.indebtedness * -1).toString(),
                              isPrice: true,
                              isRial: true,
                            })}{" "}
                          تومان
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="left-side">
                    <LinkToFactorTab value={data} />
                  </div>
                </div>
              }
              type="warning"
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
export default HabitantsCreditorsDrawerContent;
