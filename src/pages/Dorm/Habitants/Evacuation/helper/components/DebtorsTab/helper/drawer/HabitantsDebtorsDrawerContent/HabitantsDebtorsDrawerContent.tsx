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
  useLazyDormCheckingExcessDebtQuery,
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
  DORM_ISSUED_FACTOR_ERROR_MSG,
  DORM_REJECT_BED_ERROR_MSG,
  DORM_REJECT_BED_SUCCESS_MSG,
} from "@pages/Dorm/Habitants/HabitantsList/helpers/utils/HabitantListUtils";

import HabitantEvacuationDrawerResidenceInfo from "../../../../HabitantEvacuationDrawerResidenceInfo/HabitantEvacuationDrawerResidenceInfo";
import HabitantEvacuationDrawerUserInfoSection from "../../../../HabitantEvacuationDrawerUserInfoSection/HabitantEvacuationDrawerUserInfoSection";
import LinkToFactorTab from "../../../../LinkToFactorTab/LinkToFactorTab";
import { HabitantsSettlementsDrawerContentProps } from "../../../../SettlementsTab/@types/@settlementsTab";
import { GetDormCheckingExcessDebtResponse } from "../../../@types/@debtorsTab";
import HabitantExcessDebtModalContent from "../../modal/HabitantExcessDebtModalContent/HabitantExcessDebtModalContent";

const HabitantsDebtorsDrawerContent = ({
  closeDrawerHandler,
  data,
  setRefreshList,
}: HabitantsSettlementsDrawerContentProps) => {
  const [form] = Form.useForm<DrawerFormType>();
  const [modalForm] = Form.useForm<ModalFormType>();

  const [hasFactor, setHasFactor] = useState(false);

  const [isFactorDisabled, setIsFactorDisabled] = useState(false);

  //هشدار جدی
  const [seriousWarnModal, setSeriousWarnModal] = useState<{
    isOpen: boolean;
  }>({ isOpen: false });

  //صدور فاکتور بدهکاری مازاد
  const [excessDebtModal, setExcessDebtModal] = useState<{
    isOpen: boolean;
    data: DormFinancialSituationType | null;
  }>({ isOpen: false, data: null });

  const [financialStatus, setFinancialStatus] = useState<DormFinancialSituationType>({
    tenant_id: null,
    currenttDate: "",
    id: 0,
    indebtedness: 0,
    paymentStatus: null,
    aAdditionalDebt: 0,
  });

  //? ================================  Api Calls ================================
  // ثبت دراور
  const [habitantsEmptyBed, { isLoading: isHabitantsEmptyBedLoading }] =
    useHabitantsEmptyBedMutation();

  // ثبت نهایی مودال
  const [additionalInvoice] = useDormAdditionalInvoiceMutation();

  // گرفتن وضعیت مالی
  const [getDormFinancialSituation] = useLazyGetDormFinancialSituationQuery();

  const [getCheckingExcessDebt] = useLazyDormCheckingExcessDebtQuery();

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
      checkingExcessHandler();
    }
  }, [data?.id]);

  //* ================================ Util Functions ================================
  const checkingExcessHandler = () => {
    if (data?.id) {
      getCheckingExcessDebt({
        maxResults: 200,
        firstResult: 0,
        dormitoryRequestId_EQ: data?.id,
      })
        .unwrap()
        .then(getDormCheckingExcessDebtSuccess);
    }
  };

  // success
  const getDormFinancialSituationSuccess = async (
    value: GetDormFinancialSituationResponse
  ) => {
    if (value?.status === 200) {
      setFinancialStatus(value?.data?.[0]);
      form.setFieldsValue({ date: value?.data?.[0]?.currenttDate });
    }
  };

  const getDormCheckingExcessDebtSuccess = async (
    value: GetDormCheckingExcessDebtResponse
  ) => {
    if (value?.status === 200) {
      if (value?.data?.length === 1) {
        setHasFactor(true);
      } else {
        setHasFactor(false);
      }
    }
  };

  // drawer handler
  const confirmEvacuationHandler = () => {
    if (financialStatus?.aAdditionalDebt > 0) {
      if (hasFactor) {
        // دارای فاکتور
        setSeriousWarnModal({ isOpen: true });
      } else {
        // بدون فاکتور
        toast.error(DORM_ISSUED_FACTOR_ERROR_MSG, {
          toastId: DORM_ISSUED_FACTOR_ERROR_MSG,
        });
      }
    } else if (
      financialStatus?.aAdditionalDebt === 0 &&
      financialStatus?.indebtedness > 0
    ) {
      // بدهی نوع اول : بدون بدهی پیشین یا بدهی مازاد
      setSeriousWarnModal({ isOpen: true });
    }
    if (
      (financialStatus?.aAdditionalDebt > 0 && financialStatus?.indebtedness > 0) ||
      financialStatus?.aAdditionalDebt > 0
    ) {
      // بدهی نوع دوم: دارای بدهی پیشین و بدهی مازاد
      // بدهی نوع سوم: دارای بدهی مازاد
      if (hasFactor) {
        // دارای فاکتور
        setSeriousWarnModal({ isOpen: true });
      } else {
        // بدون فاکتور
        toast.error(DORM_ISSUED_FACTOR_ERROR_MSG, {
          toastId: DORM_ISSUED_FACTOR_ERROR_MSG,
        });
      }
    }
  };

  const successRequestHandler = () => {
    closeDrawerHandler();
    toast.success(DORM_REJECT_BED_SUCCESS_MSG, {
      toastId: DORM_REJECT_BED_SUCCESS_MSG,
    });
  };

  // modal handler
  //هشدار جدی
  const closeSeriousModalHandler = () => {
    setSeriousWarnModal({ isOpen: false });
  };

  const seriousHandler = () => {
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
          }
        });
    }

    closeSeriousModalHandler();
    setRefreshList((prev) => !prev);
  };

  // مودال صدور فاکتور بدهکاری مازاد
  const closeExcessDebtModalHandler = () => {
    setExcessDebtModal({ isOpen: false, data: null });
  };

  const openExcessDebtModalHandler = () => {
    setExcessDebtModal({ isOpen: true, data: financialStatus });
  };

  const confirmExcessDebtModalHandler = () => {
    closeExcessDebtModalHandler();
    checkingExcessHandler();
    debtPaymentHandler();
  };

  const debtPaymentHandler = () => {
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
            setIsFactorDisabled(true);
            closeExcessDebtModalHandler();
          }
        });
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <>
      {seriousWarnModal?.isOpen && (
        <ConfirmationModalWithContent
          title="هشدار جدی!"
          isModalOpen={seriousWarnModal?.isOpen}
          confirmBtnText="تایید و قبول مسئولیت"
          backBtnText="انصراف"
          closeModalHandler={closeSeriousModalHandler}
          isConfirmButtonLoading={isHabitantsEmptyBedLoading}
          onConfirmClickHandler={seriousHandler}
          content={
            <p className="body-regular">
              ساکن مورد نظر بدهکار است و لازم است پیش از تخلیه تخت، بدهی خود را تسویه
              نماید. در صورت تخلیه تخت، مسئولیت هرگونه عواقب ناشی از عدم تسویه بدهی بر
              عهده شخص شما خواهد بود.
            </p>
          }
        />
      )}

      {excessDebtModal?.isOpen && (
        <ConfirmationModalWithContent
          title="صدور فاکتور بدهکاری مازاد"
          isModalOpen={excessDebtModal?.isOpen}
          confirmBtnText="صدور فاکتور بدهکاری مازاد"
          backBtnText="انصراف"
          closeModalHandler={closeExcessDebtModalHandler}
          onConfirmClickHandler={confirmExcessDebtModalHandler}
          content={
            <HabitantExcessDebtModalContent
              form={modalForm}
              data={excessDebtModal?.data}
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
        <div className="flex flex-col gap-2.5 p-6!">
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <IconMathOperations viewBox="0 0 30 30" fill="#F5222D" />
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <h5 className="text-neutral-11 h4-medium">وضعیت مالی</h5>
                        <CustomTag color="red">بدهکار</CustomTag>
                      </div>
                      {financialStatus?.aAdditionalDebt === 0 &&
                        financialStatus?.indebtedness > 0 && (
                          <div className="flex gap-1">
                            <span className="text-neutral-11 h5-medium">بدهکاری:</span>
                            <span className="text-neutral-11 h5-bold">
                              {dataPlaceHolder({
                                data: financialStatus?.indebtedness?.toString(),
                                isPrice: true,
                                isRial: true,
                              })}{" "}
                              تومان
                            </span>
                          </div>
                        )}
                      {financialStatus?.aAdditionalDebt > 0 &&
                        financialStatus?.indebtedness > 0 && (
                          <div className="flex flex-col gap-2">
                            <div className="flex gap-1">
                              <span className="text-neutral-11 h4-medium">
                                بدهکاری پیشین:
                              </span>
                              <span className="value">
                                {dataPlaceHolder({
                                  data: financialStatus?.indebtedness?.toString(),
                                  isPrice: true,
                                  isRial: true,
                                })}{" "}
                                تومان
                              </span>
                            </div>
                            <div className="flex gap-1">
                              <span className="text-neutral-11 h4-medium">
                                بدهکاری مازاد:
                              </span>
                              <span className="value">
                                {dataPlaceHolder({
                                  data: financialStatus?.aAdditionalDebt?.toString(),
                                  isPrice: true,
                                  isRial: true,
                                })}{" "}
                                تومان
                              </span>
                            </div>
                          </div>
                        )}
                      {financialStatus?.aAdditionalDebt > 0 &&
                        financialStatus?.indebtedness === 0 && (
                          <div className="flex gap-1">
                            <span className="text-neutral-11 h4-medium">
                              بدهکاری مازاد:
                            </span>
                            <span className="value">
                              {dataPlaceHolder({
                                data: financialStatus?.aAdditionalDebt?.toString(),
                                isPrice: true,
                                isRial: true,
                              })}{" "}
                              تومان
                            </span>
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <LinkToFactorTab value={data} />
                    {((financialStatus?.aAdditionalDebt > 0 &&
                      financialStatus?.indebtedness > 0) ||
                      financialStatus?.aAdditionalDebt > 0) && (
                      <span
                        className={`body-regular text-primary-6 cursor-pointer ${isFactorDisabled ? "text-neutral-6 cursor-auto" : ""}`}
                        onClick={
                          !isFactorDisabled ? openExcessDebtModalHandler : undefined
                        }
                      >
                        صدور فاکتور بدهکاری مازاد
                      </span>
                    )}
                  </div>
                </div>
              }
              type="error"
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
export default HabitantsDebtorsDrawerContent;
