import { useState } from "react";

import { PiBriefcase, PiBuildings, PiMapPin } from "react-icons/pi";

import { CustomSwitch } from "@components/CustomInputs";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import AdmissionDetailInfoCard from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionDetailInfoCard/AdmissionDetailInfoCard";
import { ActiveAdmissionDetailSummaryProps } from "@pages/Dormitory/Admission/_shared/pages/ActiveAdmissionDetail/helper/components/ActiveAdmissionDetailSummary/@types/@activeAdmissionDetailSummary";
import {
  ADMISSION_GENDER_CONFIG,
  RESERVABLE_CAPACITY_CONFIG,
  SCHEDULE_TYPE_TAG_COLOR,
  SCHEDULE_TYPE_TAG_LABEL,
} from "@pages/Dormitory/Admission/_shared/util";
import {
  PAYMENT_OPTION,
  RESERVE_TYPE,
} from "@pages/Dormitory/Residence/ActiveResidence/_shared/util";

const ActiveAdmissionDetailSummary = ({ data }: ActiveAdmissionDetailSummaryProps) => {
  const [isVisibleToUsers, setIsVisibleToUsers] = useState(data.isVisibleToUsers);
  const [isVisibilityConfirmModalOpen, setIsVisibilityConfirmModalOpen] = useState(false);
  const [pendingVisibility, setPendingVisibility] = useState<boolean | null>(null);

  const scheduleLabel = SCHEDULE_TYPE_TAG_LABEL[data.scheduleType];
  const scheduleColor = SCHEDULE_TYPE_TAG_COLOR[data.scheduleType];
  const reserveConfig = RESERVE_TYPE[data.reserveType];
  const ReserveIcon = reserveConfig?.icon;
  const paymentConfig = PAYMENT_OPTION[data.paymentOption];
  const capacityConfig = RESERVABLE_CAPACITY_CONFIG[data.reservableCapacity];
  const CapacityIcon = capacityConfig?.icon;
  const genderConfig = Object.values(ADMISSION_GENDER_CONFIG).find(
    (item) => item.label === data.admissionGender
  );

  //* ================================ Util Functions ================================
  // Confirm modal copy depends on the *intended* visibility after confirm, not the current switch value.
  const visibilityConfirmContent =
    pendingVisibility === true
      ? "با تغییر وضعیت نمایش از «غیرقابل نمایش» به «قابل نمایش»، این برنامه پذیرش در اپلیکیشن به کاربران نمایش داده خواهد شد."
      : "با تغییر وضعیت نمایش از «قابل نمایش» به «غیرقابل نمایش»، این برنامه پذیرش در اپلیکیشن به کاربران نمایش داده نخواهد شد.";

  const openVisibilityConfirmModal = (checked: boolean) => {
    setPendingVisibility(checked);
    setIsVisibilityConfirmModalOpen(true);
  };

  const closeVisibilityConfirmModal = () => {
    setIsVisibilityConfirmModalOpen(false);
    setPendingVisibility(null);
  };

  const confirmVisibilityChangeHandler = () => {
    if (pendingVisibility === null) return;

    setIsVisibleToUsers(pendingVisibility);
    closeVisibilityConfirmModal();
  };

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isVisibilityConfirmModalOpen && (
        <ConfirmationModalWithContent
          title="تغییر وضعیت نمایش برنامه پذیرش"
          isModalOpen={isVisibilityConfirmModalOpen}
          closeModalHandler={closeVisibilityConfirmModal}
          onConfirmClickHandler={confirmVisibilityChangeHandler}
          confirmBtnText="تایید و تغییر وضعیت"
          backBtnText="انصراف"
          content={<p className="text-neutral-11 text-sm">{visibilityConfirmContent}</p>}
        />
      )}

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <CustomDivider
            text={dataPlaceHolder({ data: data.programTitle })}
            // titleClassName="text-xl! font-bold!"
            extraContent={
              <CustomSwitch
                valuePropName="isVisibleToUsers"
                checked={isVisibleToUsers}
                checkedChildren="قابل نمایش"
                unCheckedChildren="غیر قابل نمایش"
                noStyle
                onChange={openVisibilityConfirmModal}
              />
            }
          />

          <div className="flex flex-wrap items-center gap-4">
            <div className="text-primary-6 flex items-center gap-1">
              <PiBuildings size={16} />
              <span>{dataPlaceHolder({ data: data.residence })}</span>
            </div>
            <div className="text-neutral-10 flex items-center gap-1">
              <PiBriefcase size={16} />
              <span>{dataPlaceHolder({ data: data.business })}</span>
            </div>
            <div className="text-neutral-10 flex items-center gap-1">
              <PiMapPin size={16} />
              <span>{dataPlaceHolder({ data: data.branch })}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <AdmissionDetailInfoCard
            title="نوع زمان‌بندی"
            value={
              scheduleLabel ? (
                <CustomTag className="w-fit" color={scheduleColor}>
                  {scheduleLabel}
                </CustomTag>
              ) : (
                dataPlaceHolder({ data: data.scheduleType })
              )
            }
          />
          <AdmissionDetailInfoCard
            title="نوع رزرو"
            value={
              reserveConfig && ReserveIcon ? (
                <CustomTag className="w-fit gap-1" color={reserveConfig.color}>
                  <ReserveIcon size={14} />
                  {reserveConfig.label}
                </CustomTag>
              ) : (
                dataPlaceHolder({ data: data.reserveType })
              )
            }
          />
          <AdmissionDetailInfoCard
            title="امکان پرداخت"
            value={
              paymentConfig ? (
                <CustomTag className="w-fit" color={paymentConfig.color}>
                  {paymentConfig.label}
                </CustomTag>
              ) : (
                dataPlaceHolder({ data: data.paymentOption })
              )
            }
          />
          <AdmissionDetailInfoCard
            title="جنسیت پذیرش"
            value={
              genderConfig ? (
                <CustomTag className="w-fit" color={genderConfig.color}>
                  {genderConfig.label}
                </CustomTag>
              ) : (
                dataPlaceHolder({ data: data.admissionGender })
              )
            }
          />
          <AdmissionDetailInfoCard
            title="ظرفیت قابل رزرو"
            value={
              capacityConfig && CapacityIcon ? (
                <CustomTag className="w-fit gap-1" color={capacityConfig.color}>
                  <CapacityIcon size={14} />
                  {capacityConfig.label}
                </CustomTag>
              ) : (
                dataPlaceHolder({ data: data.reservableCapacity })
              )
            }
          />
          <AdmissionDetailInfoCard
            title="نوع مدیریت"
            value={
              <span className="text-neutral-13 text-base font-medium">
                {dataPlaceHolder({ data: data.managementType })}
              </span>
            }
          />
        </div>
      </div>
    </>
  );
};

export default ActiveAdmissionDetailSummary;
