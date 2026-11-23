import { useState } from "react";

import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa6";
import { PiArrowLeft } from "react-icons/pi";
import { useNavigate } from "react-router";

import BedIcon from "@assets/icons/Dorm/BedIcon";
import BuildingIcon from "@assets/icons/Dorm/BuildingIcon";
import FloorIcon from "@assets/icons/Dorm/FloorIcon";
import RoomIcon from "@assets/icons/Dorm/RoomIcon";
import { CustomButton } from "@components/CustomInputs";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import { makeSearchParams } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORMITORY_ACTIVE_RESIDENCE_DETAIL_PAGE_ROUTE } from "@infra/router/routes/dormitory";
import { ReservationOpeningRequestsStatus } from "@pages/Dormitory/_shared/utils";
import ReservationFactorCard from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/_shared/components/ReservationFactorCard/ReservationFactorCard";
import ReservationRequestersInfo from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/_shared/components/ReservationRequestersInfo/ReservationRequestersInfo";
import ReservationRequestInfoCard from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/_shared/components/ReservationRequestInfoCard/ReservationRequestInfoCard";
import ReservationRequestResidenceInfo from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/_shared/components/ReservationRequestResidenceInfo/ReservationRequestResidenceInfo";
import {
  paymentTypeMap,
  reservationAcceptanceProgramMap,
} from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/_shared/util";
import ReservationOpeningRequestActionsHeader from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/ReservationOpeningRequestsDetail/helper/components/ReservationOpeningRequestActionsHeader/ReservationOpeningRequestActionsHeader";
import AddFactorDrawerContent from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/ReservationOpeningRequestsDetail/helper/drawer/AddFactorDrawerContent/AddFactorDrawerContent";

const mockData = {
  invoiceStatus: true, // وضعیت فاکتور اگر فالس باشد یعنی پرداخت نشده
  pendingReview: {
    base: "bed", //مبنا تخت,واحد اقامتی یا ساختمان باشد
  },
  pendingDelivery: {
    base: "residence", //مبنا تخت,واحد اقامتی یا ساختمان باشد
    residentEvacuationStatus: true, // وضعیت تخلیه ساکن اگر فالس باشد یعنی تخلیه نشده
    depositStatus: true, // وضعیت واریز ودیعه اگر فالس باشد یعنی ودیعه پرداخت نشده
  },
  pendingExtension: {
    base: "residence", //مبنا تخت,واحد اقامتی یا ساختمان باشد
  },
  pendingResidenceStart: {
    base: "residence", //مبنا تخت,واحد اقامتی یا ساختمان باشد
  },
};

const ReservationOpeningRequestsDetail = () => {
  const { params: url } = useQueryParams();

  const [isAddFactorDrawerOpen, setIsAddFactorDrawerOpen] = useState(false);

  const navigate = useNavigate();

  const hasCompanionResidents = false; //   در زمان اتصال به بک این قسمت پاک شود و از دیتای واقعی بک استفاده شود. اگر ترو باشد یعنی ساکنین همراه وجود دارد و دکمه مشاهده ساکنین همراه را میبینیم در غیر این صورت دمه افزودن ساکنین همراه

  //* ================================ Util Functions ================================
  // این لاجیک برای هندل کردن نمایش کارد های مربوط به اقامتگاه بر اساس مبنا که ممکن است ساختمان یا واحد اقامتی یا تخت باشد
  const baseByStatus = {
    [ReservationOpeningRequestsStatus?.pendingDelivery]: mockData.pendingDelivery?.base,

    [ReservationOpeningRequestsStatus?.pendingExtension]: mockData.pendingExtension?.base,

    [ReservationOpeningRequestsStatus?.pendingResidenceStart]:
      mockData.pendingResidenceStart?.base,

    [ReservationOpeningRequestsStatus?.pendingReview]: mockData.pendingReview?.base,
  };

  const base = baseByStatus[url?.status];

  const showBuilding = ["building", "residence", "bed"].includes(base);
  const showFloor = ["residence", "bed"].includes(base);
  const showResidence = ["residence", "bed"].includes(base);
  const showBed = base === "bed";

  const VIEW_COMPANION_RESIDENTS_BTN_TEXT = "مشاهده ساکنین همراه";
  const ADD_COMPANION_RESIDENTS_BTN_TEXT = "افزودن ساکنین همراه";
  const SHOW_DELIVERY_DOCS_BTN_TEXT = "نمایش مدارک تحویل";
  const VIEW_DELIVERY_DOCS_BTN_TEXT = "مشاهده مدارک تحویل";

  const getDeliveryDocsBtnConfig = (firstBtnText: string) => {
    if (!hasCompanionResidents) {
      return {
        hasBtn: true,
        hasSecondBtn: true,
        firstBtnText,
        secondBtnText: ADD_COMPANION_RESIDENTS_BTN_TEXT,
      };
    }
    if (showBed) {
      return {
        hasBtn: true,
        hasSecondBtn: false,
        firstBtnText,
      };
    }

    return {
      hasBtn: true,
      hasSecondBtn: true,
      firstBtnText,
      secondBtnText: VIEW_COMPANION_RESIDENTS_BTN_TEXT,
    };
  };

  // این لاجیک برای نمایش دکمه های مختلف در دیوایدر بخش اطلاعات کاربر درخواست دهنده میباشد
  const getRequestersInfoBtnConfig = () => {
    const status = url?.status;

    if (status === ReservationOpeningRequestsStatus?.pendingReview) {
      if (showBed) {
        return { hasBtn: false, hasSecondBtn: false };
      }

      return {
        hasBtn: true,
        hasSecondBtn: false,
        firstBtnText: VIEW_COMPANION_RESIDENTS_BTN_TEXT,
      };
    }

    if (
      status === ReservationOpeningRequestsStatus?.pendingDelivery ||
      status === ReservationOpeningRequestsStatus?.pendingResidenceStart
    ) {
      return getDeliveryDocsBtnConfig(SHOW_DELIVERY_DOCS_BTN_TEXT);
    }

    if (status === ReservationOpeningRequestsStatus?.pendingExtension) {
      return getDeliveryDocsBtnConfig(VIEW_DELIVERY_DOCS_BTN_TEXT);
    }

    return { hasBtn: false, hasSecondBtn: false };
  };

  const requestersInfoBtnConfig = getRequestersInfoBtnConfig();

  // handler
  const addFactorHandler = () => {
    setIsAddFactorDrawerOpen(true);
  };
  const closeAddFactorDrawerHandler = () => {
    setIsAddFactorDrawerOpen(false);
  };

  const residenceDetailsClickHandler = () => {
    navigate({
      pathname: DORMITORY_ACTIVE_RESIDENCE_DETAIL_PAGE_ROUTE,
      search: makeSearchParams({ type: "myResidence" }),
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* دراور افزودن فاکتور */}
      {isAddFactorDrawerOpen && (
        <CustomDrawer
          title=""
          onClose={closeAddFactorDrawerHandler}
          open={isAddFactorDrawerOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <AddFactorDrawerContent closeDrawerHandler={closeAddFactorDrawerHandler} />
          }
        />
      )}

      <div className="flex flex-col gap-10">
        {/* ******************************************************************************* */}
        {/* RESERVATION OPENING REQUEST ACTIONS HEADER */}
        {url?.status === ReservationOpeningRequestsStatus?.pendingExtension ? (
          <ReservationOpeningRequestActionsHeader
            tagTitle="درانتظار تمدید"
            confirmText="تایید تمدید"
            status={ReservationOpeningRequestsStatus?.pendingExtension}
          />
        ) : url?.status === ReservationOpeningRequestsStatus?.pendingReview ? (
          <ReservationOpeningRequestActionsHeader
            tagTitle="درانتظار بررسی"
            confirmText="تایید درخواست"
            status={ReservationOpeningRequestsStatus?.pendingReview}
            invoiceStatus={mockData?.invoiceStatus}
            base={base}
          />
        ) : url?.status === ReservationOpeningRequestsStatus?.pendingDelivery ? (
          <ReservationOpeningRequestActionsHeader
            tagTitle="درانتظار تحویل"
            confirmText={
              mockData?.invoiceStatus === false // اگر فاکتور پرداخت نشده باشه
                ? "تحویل اقامتگاه(تمدید مهلت پرداخت)"
                : mockData?.invoiceStatus === true // اگر فاکتور پرداخت شده باشه
                  ? "تحویل اقامتگاه"
                  : mockData?.pendingDelivery?.residentEvacuationStatus === false // اگر تخلیه ساکن نشده باشه
                    ? "تحویل اقامتگاه"
                    : "تحویل اقامتگاه(تمدید مهلت پرداخت)"
            }
            status={ReservationOpeningRequestsStatus?.pendingDelivery}
            invoiceStatus={mockData?.invoiceStatus}
          />
        ) : url?.status === ReservationOpeningRequestsStatus?.pendingResidenceStart ? (
          <ReservationOpeningRequestActionsHeader
            tagTitle="درانتظار شروع اسکان تمدیدی"
            status={ReservationOpeningRequestsStatus?.pendingResidenceStart}
          />
        ) : null}

        <CustomDivider
          text="خوابگاه دانشجویی بین‌المللی شهید دکتر مصطفی چمران"
          extraContent={
            <CustomButton
              type="link"
              iconPlacement="end"
              loading={false}
              icon={<FaArrowLeft />}
              onClick={residenceDetailsClickHandler}
            >
              جزییات اقامتگاه
            </CustomButton>
          }
        />

        {/* اگر ساکن تخلیه نکرده باشه */}
        {mockData?.pendingDelivery?.residentEvacuationStatus === false ? (
          <CustomAlert
            type="error"
            title="تخلیه اسکان ثبت نشده است"
            description="ساکن پیشین اقامت تخصیص یافته، همچنان درحالت سکونت میباشد"
            action={
              <CustomButton type="text" danger loading={false}>
                نمایش جزییات ساکن
              </CustomButton>
            }
            closable={true}
          />
        ) : null}

        {/* ******************************************************************************* */}
        {/* RESERVATION OPENING REQUEST RESIDENCE INFO */}
        {url?.status !== ReservationOpeningRequestsStatus?.pendingReview ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {showBuilding && (
              <ReservationRequestResidenceInfo
                Icon={BuildingIcon}
                title="ساختمان"
                desc="ساختمان 1"
              />
            )}

            {showFloor && (
              <ReservationRequestResidenceInfo
                Icon={FloorIcon}
                title="طبقه"
                desc="طبقه همکف،لابی"
              />
            )}
            {showResidence && (
              <ReservationRequestResidenceInfo
                Icon={RoomIcon}
                title="واحد اقامتی"
                desc="002،مستر روم"
                residenceBtb={true}
              />
            )}
            {showBed && (
              <ReservationRequestResidenceInfo
                Icon={BedIcon}
                title={`تخت|${3}`}
                desc="003،کویین"
              />
            )}
          </div>
        ) : null}

        {/* ******************************************************************************* */}
        {/* اطلاعات کاربر درخواست دهنده */}
        <ReservationRequestersInfo {...requestersInfoBtnConfig} />

        {/* ******************************************************************************* */}
        {/* اطلاعات درخواست */}
        <ReservationRequestInfoCard
          showLastActionInfo={
            url?.status !== ReservationOpeningRequestsStatus?.pendingReview &&
            url?.status !== ReservationOpeningRequestsStatus?.pendingExtension // اگر در حالت بررسی یا تمدید باشد تاریخ اخرین اقدام و اخرین اقدام کننده نشان داده نمیشود
          }
          Icon={showBed ? BedIcon : showResidence ? RoomIcon : BuildingIcon}
          title={showBed ? "تخت" : showResidence ? "واحد اقامتی" : "ساختمان"}
          paymentTypeText={paymentTypeMap?.["completePayment"]?.label} // مقادیر باید از بک گرفته شود
          paymentTypeColor={paymentTypeMap?.["completePayment"]?.color} // مقادیر باید از بک گرفته شود
          reservationAcceptanceProgramText={
            reservationAcceptanceProgramMap?.["term"]?.label
          } // مقادیر باید از بک گرفته شود
          reservationAcceptanceProgramColor={
            reservationAcceptanceProgramMap?.["term"]?.color
          } // مقادیر باید از بک گرفته شود
          showAdmissionDate={
            url?.status !== ReservationOpeningRequestsStatus?.pendingDelivery &&
            url?.status !== ReservationOpeningRequestsStatus?.pendingResidenceStart
          }
        />
        {/* ******************************************************************************* */}
        {/*  فاکتورهای فعال */}
        {url?.status === ReservationOpeningRequestsStatus?.pendingDelivery ||
        url?.status === ReservationOpeningRequestsStatus?.pendingResidenceStart ? (
          <>
            <CustomDivider
              text="فاکتور های فعال(1)"
              extraContent={
                <>
                  <CustomButton
                    type="text"
                    ghost
                    iconPlacement="end"
                    loading={false}
                    icon={<PiArrowLeft />}
                  >
                    مشاهده همه
                  </CustomButton>
                  <CustomButton
                    iconPlacement="start"
                    loading={false}
                    icon={<AiOutlinePlus />}
                    onClick={addFactorHandler}
                  >
                    افزودن فاکتور
                  </CustomButton>
                </>
              }
            />

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {/* پرداخت‌شده */}
              <ReservationFactorCard status="paid" />
              {/* در انتظار پرداخت */}
              <ReservationFactorCard status="pendingPayment" />
              {/* پرداخت‌شده + جریمه دیرکرد */}
              <ReservationFactorCard status="paid" lateFeeAmount={50000} />
              {/* سر رسید شده */}
              <ReservationFactorCard status="overdue" />
            </div>
          </>
        ) : null}
        {/* ******************************************************************************* */}
      </div>
    </>
  );
};

export default ReservationOpeningRequestsDetail;
