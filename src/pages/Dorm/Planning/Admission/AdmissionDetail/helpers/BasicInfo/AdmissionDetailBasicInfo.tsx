import { useState } from "react";

import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Form, Row } from "antd";
import { toast } from "react-toastify";

import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetAbilityDisableDeliveryPlanQuery,
  useSendCancellationDeliveryPlanMutation,
} from "@infra/states/redux/Apis/dorm/planning/admission/admissionApi";

import {
  AdmissionDetailBasicInfoProps,
  InactiveModalFormFields,
} from "./@types/@admissionDetailBasicInfo";
import {
  ADMISSION_DETAIL_ACTIVE_TOAST,
  ADMISSION_DETAIL_CANCELLATION_FALLBACK_ERROR_MESSAGE,
  ADMISSION_DETAIL_DISABLE_PLAN_BLOCKED_MESSAGE,
  ADMISSION_DETAIL_FETCH_ADMISSION_PLAN_ERROR_MESSAGE,
} from "./utils/admissionDetailBasicInfoUtil";
import {
  sendCancellationDeliveryPlanRequest,
  sendCancellationDeliveryPlanResponse,
} from "../../../AdmissionModify/helpers/AdmissionModifyTariffInfoStep/@types/@admissionModifyTariffInfoStep";
import { ADMISSION_CAN_DEBT } from "../../../utils/AdmissionUtils";
import InactiveAdmissionModalContent from "./helper/modals/InactiveAdmissionModalContent/InactiveAdmissionModalContent";
import "./_admissionDetailBasicInfo.scss";

// روش پرداختی
const PAYMENT_TYPE = {
  installment: 2, // اقساطی
};

const AdmissionDetailBasicInfo = ({ data, from }: AdmissionDetailBasicInfoProps) => {
  const [switchValue, setSwitchValue] = useState(true);

  const [openInactiveModal, setIsOpenInactiveModal] = useState({
    isOpen: false,
    id: -1,
  });

  const {
    params: { id },
  } = useQueryParams<{ id: string }>();

  const [form] = Form.useForm<InactiveModalFormFields>();

  const schedulingType = data?.AssociationCategorySchedulingType?.id;

  //? ================================  Api Calls ================================
  const [getAbilityDisableDeliveryPlanInfo] = useLazyGetAbilityDisableDeliveryPlanQuery();

  const [sendCancellationDeliveryPlan, { isLoading: isCancellationDeliveryPlanLoading }] =
    useSendCancellationDeliveryPlanMutation();

  //* ================================ Util Functions ================================
  // modal handler
  const closeModalHandler = () => {
    setIsOpenInactiveModal({
      isOpen: false,
      id: -1,
    });
  };

  //submission
  const submitInactiveModalHandler = () => {
    form
      .validateFields()
      .then((values) => {
        const payload: sendCancellationDeliveryPlanRequest = {
          form: "DisableDeliverPlan",
          data: {
            id: id,
            descDeactivateRequest: values.description,
          },
        };

        sendCancellationDeliveryPlan(payload)
          .unwrap()
          .then(sendCancellationSuccess)
          .catch(sendCancellationCatch);
      })
      .catch((errorInfo) => {
        console.warn("Validation failed:", errorInfo);
      });
  };

  //success
  const sendCancellationSuccess = (response: sendCancellationDeliveryPlanResponse) => {
    if (response?.status === 200) {
      closeModalHandler();

      toast.success(ADMISSION_DETAIL_ACTIVE_TOAST, {
        toastId: "active-toast-id",
      });

      setSwitchValue(false);
    }
  };

  //error
  const sendCancellationCatch = (error: FetchBaseQueryError & { data?: any }) => {
    toast.error(
      error?.data?.message || ADMISSION_DETAIL_CANCELLATION_FALLBACK_ERROR_MESSAGE,
      {
        toastId: "cancellation-error",
      }
    );
  };

  //get and check data for cancelling
  const switchOnChangeHandler = async (checked: boolean) => {
    if (!checked) {
      const result = await getAbilityDisableDeliveryPlanInfo(Number(id));
      if ("error" in result) {
        toast.error(ADMISSION_DETAIL_FETCH_ADMISSION_PLAN_ERROR_MESSAGE, {
          toastId: "fetch-admission-plan-error",
        });

        setSwitchValue(true);

        return;
      }

      const data = result.data?.data ?? [];

      const hasNotCancellationStatus = data.length >= 1;

      if (hasNotCancellationStatus) {
        toast.error(ADMISSION_DETAIL_DISABLE_PLAN_BLOCKED_MESSAGE, {
          toastId: "disable-plan-blocked",
        });

        setSwitchValue(true);

        return;
      }

      const firstItemId = data[0]?.id ?? -1;

      setIsOpenInactiveModal({
        isOpen: true,
        id: firstItemId,
      });
    } else {
      setSwitchValue(true);
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  if (!data) return;
  return (
    <>
      {openInactiveModal?.isOpen && (
        <ConfirmationModalWithContent
          title="غیر فعال کردن برنامه پذیرش"
          isModalOpen={openInactiveModal?.isOpen}
          isConfirmButtonLoading={isCancellationDeliveryPlanLoading}
          confirmBtnText="ثبت درخواست"
          customClass="dorm-basic-info-admission-section-modal-title"
          backBtnText="انصراف"
          isDangerous={true}
          closeModalHandler={closeModalHandler}
          onConfirmClickHandler={submitInactiveModalHandler}
          content={<InactiveAdmissionModalContent form={form} />}
        />
      )}

      <div className="admission-detail-basic-info-container">
        <CustomDivider
          text="اطلاعات اولیه"
          extraContent={
            from === "active" ? (
              <CustomSwitch
                valuePropName="basicInfo"
                checkedChildren="فعال"
                unCheckedChildren="غیرفعال"
                checked={switchValue}
                defaultChecked={switchValue}
                onChange={switchOnChangeHandler}
                className="custom-switch"
              />
            ) : null
          }
        />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            lg={6}
            md={6}
            sm={24}
            label="عنوان"
            value={data?.title}
          />
          <SingleVerticalWithCol
            lg={6}
            md={6}
            sm={24}
            label="عنوان نمایشی در اپلیکیشن"
            value={data?.showTitle}
          />
          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="شناسه برنامه پذیرش"
            value={data?.id?.toString()}
          />
          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="واحد دانشگاهی"
            value={data?.AssociationCategoryBranch?.title}
          />
          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="نوع مدیریت"
            value={data?.AssociationCategoryManagementType?.title}
          />
          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="نوع زمان‌بندی"
            value={data?.AssociationCategorySchedulingType?.title}
          />
          {schedulingType === 1 ? (
            <SingleVerticalWithCol
              xl={12}
              lg={12}
              md={12}
              sm={24}
              label="ماه ها"
              value={`${dataPlaceHolder({ data: data?.appliedStartDate, isDate: true })} , ${dataPlaceHolder({ data: data?.appliedEndDate, isDate: true })}`}
            />
          ) : null}

          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="نوع رزرو"
            value={data?.AssociationCategoryReservationType?.title}
          />
          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="نوع پرداخت"
            value={data?.AssociationPaymentType?.map((item) => item?.title)?.toString()}
          />
          <SingleVerticalWithCol
            xl={12}
            lg={12}
            md={12}
            sm={24}
            label="شیوه پرداخت"
            value={data?.AssociationPaymetMethod?.map((item) => item?.title)?.toString()}
          />
          <SingleVerticalWithCol
            xl={12}
            lg={12}
            md={12}
            sm={24}
            label="گروه کاربری"
            value={data?.AssociationUserGroup?.map((item) => item?.title)?.toString()}
          />
          <SingleVerticalWithCol
            xl={12}
            lg={12}
            md={12}
            sm={24}
            label="مقطع تحصیلی"
            value={data?.AssociationGrade?.map((item) => item?.title)?.toString()}
          />
          <SingleVerticalWithCol
            xl={12}
            lg={12}
            md={12}
            sm={24}
            label="ملیت"
            value={data?.AssociationNationality?.map((item) => item?.title)?.toString()}
          />
          <SingleVerticalWithCol
            xl={12}
            lg={12}
            md={12}
            sm={24}
            label="شرایط خاص"
            value={data?.AssociationSpecialStatus?.map((item) => item?.title)?.toString()}
          />
          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="امکان درخواست برای دیگری"
            value={data?.AssociationIsRequestForAnother?.title === "1" ? "بله" : "خیر"}
          />
          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="امکان بدهی"
            value={
              ADMISSION_CAN_DEBT[
                data?.AssociationCanDebt?.title ? data?.AssociationCanDebt?.title : ""
              ]
            }
          />
          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="سقف بدهی (ریال)"
            value={data?.maxDebt?.toString()}
            isPrice
          />
          {Boolean(
            data?.AssociationPaymentType?.find(
              (item) => item?.id === PAYMENT_TYPE?.installment
            )
          ) && (
            <SingleVerticalWithCol
              md={12}
              sm={24}
              label="حداکثر تعداد اقساط جهت بدهی"
              value={data?.maxNumberInstallmentForDebt?.toString()}
            />
          )}

          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="مهلت بررسی درخواست"
            value={data?.reviewDeadline?.toString()}
          />
          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="مهلت پرداخت"
            value={data?.paymentDeadline?.toString()}
          />
          <SingleVerticalWithCol span={24} label="توضیحات" value={data?.description} />
        </Row>
      </div>
    </>
  );
};

export default AdmissionDetailBasicInfo;
