import { AiOutlinePlus } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa6";
import { PiArrowLeft } from "react-icons/pi";
import { useNavigate } from "react-router";

import BedIcon from "@assets/icons/Dorm/BedIcon";
import BuildingIcon from "@assets/icons/Dorm/BuildingIcon";
import FloorIcon from "@assets/icons/Dorm/FloorIcon";
import RoomIcon from "@assets/icons/Dorm/RoomIcon";
import { CustomButton } from "@components/CustomInputs";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import { makeSearchParams } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORMITORY_ACTIVE_RESIDENCE_DETAIL_PAGE_ROUTE } from "@infra/router/routes/dormitory";
import { RESERVATION_ALL_REQUESTS_STATUS } from "@pages/Dormitory/_shared/utils";
import ReservationFactorCard from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/_shared/components/ReservationFactorCard/ReservationFactorCard";
import ReservationRequestersInfo from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/_shared/components/ReservationRequestersInfo/ReservationRequestersInfo";
import ReservationRequestInfoCard from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/_shared/components/ReservationRequestInfoCard/ReservationRequestInfoCard";
import ReservationRequestResidenceInfo from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/_shared/components/ReservationRequestResidenceInfo/ReservationRequestResidenceInfo";
import {
  paymentTypeMap,
  reservationAcceptanceProgramMap,
} from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/_shared/util";
import ReservationInResidenceRequestActionHeader from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/ReservationInResidenceRequestsDetail/helper/components/ReservationInResidenceRequestActionHeader/ReservationInResidenceRequestActionHeader";
import ReservationInResidenceRequestProgressBar from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/ReservationInResidenceRequestsDetail/helper/components/ReservationInResidenceRequestProgressBar/ReservationInResidenceRequestProgressBar";

const mockData = {
  inResidence: {
    base: "residence", //مبنا تخت,واحد اقامتی یا ساختمان باشد
  },
};

const ReservationInResidenceRequestsDetail = () => {
  const { params: url } = useQueryParams();

  const navigate = useNavigate();

  //* ================================ Util Functions ================================
  // این لاجیک برای هندل کردن نمایش کارد های مربوط به اقامتگاه بر اساس مبنا که ممکن است ساختمان یا واحد اقامتی یا تخت باشد
  const baseByStatus = {
    [RESERVATION_ALL_REQUESTS_STATUS.inResidence]: mockData.inResidence?.base,
  };

  const base = baseByStatus[url?.status];

  const showBuilding = ["building", "residence", "bed"].includes(base);
  const showFloor = ["residence", "bed"].includes(base);
  const showResidence = ["residence", "bed"].includes(base);
  const showBed = base === "bed";

  // handler
  const clickResidenceDetailHandler = () => {
    navigate({
      pathname: DORMITORY_ACTIVE_RESIDENCE_DETAIL_PAGE_ROUTE,
      search: makeSearchParams({ type: "myResidence" }),
    });
  };

  const clickResidenceHandler = () => {};

  // const viewDocumentsClickHandler = () => {};

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex flex-col gap-10">
      {/* ******************************************************************************* */}
      {/* RESERVATION IN RESIDENCE REQUEST ACTION HEADER */}
      <ReservationInResidenceRequestActionHeader />
      {/* ******************************************************************************* */}
      {/* RESIDENCE INFO */}
      <CustomDivider
        text="خوابگاه دانشجویی بین‌المللی شهید دکتر مصطفی چمران"
        extraContent={
          <CustomButton
            type="link"
            iconPlacement="end"
            loading={false}
            icon={<FaArrowLeft />}
            onClick={clickResidenceDetailHandler}
          >
            جزییات اقامتگاه
          </CustomButton>
        }
      />

      {/* ******************************************************************************* */}
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
            clickHandler={() => clickResidenceHandler()}
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

      {/* ******************************************************************************* */}
      {/* پیشرفت درخواست */}
      <ReservationInResidenceRequestProgressBar />

      {/* ******************************************************************************* */}
      {/* اطلاعات کاربر درخواست دهنده */}
      <ReservationRequestersInfo
        hasBtn={true}
        firstBtnText="نمایش مدارک تحویل"
        // clickHandler={viewDocumentsClickHandler}
      />

      {/* ******************************************************************************* */}
      {/* اطلاعات درخواست */}
      <ReservationRequestInfoCard
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
        showAdmissionDate={false}
      />
      {/* ******************************************************************************* */}
      {/*  فاکتورهای فعال */}
      <div>
        <CustomDivider
          text="فاکتور های فعال(1)"
          extraContent={
            <>
              <CustomButton
                type="text"
                ghost
                iconPlacement="end"
                loading={false}
                icon={<PiArrowLeft color={"#BFBFBF"} />}
                className="text-neutral-6!"
              >
                مشاهده همه
              </CustomButton>
              <CustomButton
                iconPlacement="start"
                loading={false}
                icon={<AiOutlinePlus />}
              >
                افزودن فاکتور
              </CustomButton>
            </>
          }
        />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* در انتظار پرداخت */}
          <ReservationFactorCard status="pendingPayment" />
        </div>
      </div>
    </div>
  );
};
export default ReservationInResidenceRequestsDetail;
