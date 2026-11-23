import { Col, Row } from "antd";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router";

import BedIcon from "@assets/icons/Dorm/BedIcon";
import BuildingIcon from "@assets/icons/Dorm/BuildingIcon";
import FloorIcon from "@assets/icons/Dorm/FloorIcon";
import RoomIcon from "@assets/icons/Dorm/RoomIcon";
import { CustomButton } from "@components/CustomInputs";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import { makeSearchParams } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORMITORY_ACTIVE_RESIDENCE_DETAIL_PAGE_ROUTE } from "@infra/router/routes/dormitory";
import { ReservationCompletedRequestsStatus } from "@pages/Dormitory/_shared/utils";
import ReservationFactorCard from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/_shared/components/ReservationFactorCard/ReservationFactorCard";
import ReservationRequestersInfo from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/_shared/components/ReservationRequestersInfo/ReservationRequestersInfo";
import ReservationRequestInfoCard from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/_shared/components/ReservationRequestInfoCard/ReservationRequestInfoCard";
import ReservationRequestResidenceInfo from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/_shared/components/ReservationRequestResidenceInfo/ReservationRequestResidenceInfo";
import {
  paymentTypeMap,
  reservationAcceptanceProgramMap,
} from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/_shared/util";
import ReservationCompletedRequestsActionHeader from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/ReservationCompletedRequestsDetail/helper/components/ReservationCompletedRequestsActionHeader/ReservationCompletedRequestsActionHeader";
import ReservationCompleteRequestDateResidence from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/ReservationCompletedRequestsDetail/helper/components/ReservationCompleteRequestDateResidence/ReservationCompleteRequestDateResidence";
import ReservationCompleteRequestDeposit from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/ReservationCompletedRequestsDetail/helper/components/ReservationCompleteRequestDeposit/ReservationCompleteRequestDeposit";

const mockData = {
  completedResidence: {
    base: "building", //مبنا تخت,واحد اقامتی یا ساختمان باشد
    deposit: true, // ودیعه
    /** pendingRefund | paid | refunded */
    depositStatus: "pendingRefund",
  },
  cancelled: {
    base: "bed", //مبنا تخت,واحد اقامتی یا ساختمان باشد
  },
  expired: {
    base: "bed", //مبنا تخت,واحد اقامتی یا ساختمان باشد
  },
  rejected: {
    base: "bed", //مبنا تخت,واحد اقامتی یا ساختمان باشد
  },
};

const ReservationCompletedRequestsDetail = () => {
  const { params: url } = useQueryParams();
  const navigate = useNavigate();

  //* ================================ Util Functions ================================
  // این لاجیک برای هندل کردن نمایش کارد های مربوط به اقامتگاه بر اساس مبنا که ممکن است ساختمان یا واحد اقامتی یا تخت باشد
  const baseByStatus = {
    [ReservationCompletedRequestsStatus?.accommodationCompleted]:
      mockData.completedResidence?.base,

    [ReservationCompletedRequestsStatus?.cancelled]: mockData.cancelled?.base,

    [ReservationCompletedRequestsStatus?.expired]: mockData.expired?.base,

    [ReservationCompletedRequestsStatus?.rejected]: mockData.rejected?.base,
  };

  const base = baseByStatus[url?.status];

  const showBuilding = ["building", "residence", "bed"].includes(base);
  const showFloor = ["residence", "bed"].includes(base);
  const showResidence = ["residence", "bed"].includes(base);
  const showBed = base === "bed";

  // handler
  const residenceDetailsClickHandler = () => {
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
      {/* RESERVATION COMPLETE REQUEST ACTIONS HEADER */}
      {url?.status === ReservationCompletedRequestsStatus?.accommodationCompleted ? (
        <ReservationCompletedRequestsActionHeader
          status={ReservationCompletedRequestsStatus?.accommodationCompleted}
          tagTitle="اتمام اسکان"
        />
      ) : url?.status === ReservationCompletedRequestsStatus?.rejected ? (
        <ReservationCompletedRequestsActionHeader
          status={ReservationCompletedRequestsStatus?.rejected}
          tagTitle="رد شده"
        />
      ) : url?.status === ReservationCompletedRequestsStatus?.expired ? (
        <ReservationCompletedRequestsActionHeader
          status={ReservationCompletedRequestsStatus?.expired}
          tagTitle="منقضی شده"
        />
      ) : url?.status === ReservationCompletedRequestsStatus?.cancelled ? (
        <ReservationCompletedRequestsActionHeader
          status={ReservationCompletedRequestsStatus?.cancelled}
          tagTitle="لغو شده"
        />
      ) : null}
      {/* ******************************************************************************* */}
      {/* اگر درخواست رد شده بود */}
      {url.status === ReservationCompletedRequestsStatus?.rejected ? (
        <div className="flex flex-col gap-4">
          <CustomAlert
            type="error"
            title=""
            showIcon={true}
            description={`این درخواست در تاریخ ${"1403/02/01"} رد شده است`}
          />
          <CustomAlert
            type="error"
            title="دلیل رد انتخاب شده توسط ادمین!"
            showIcon={true}
            description="توضیحات"
          />
        </div>
      ) : null}
      {/* ******************************************************************************* */}
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
      {/* ******************************************************************************* */}
      {/* RESERVATION OPENING REQUEST RESIDENCE INFO */}
      {url?.status === ReservationCompletedRequestsStatus?.accommodationCompleted ||
      url?.status === ReservationCompletedRequestsStatus?.expired ? (
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

          {url?.status === ReservationCompletedRequestsStatus?.expired ||
            (showBed && (
              <ReservationRequestResidenceInfo
                Icon={BedIcon}
                title={`تخت|${3}`}
                desc="003،کویین"
              />
            ))}
        </div>
      ) : null}

      {/* ******************************************************************************* */}
      {/* فقط در حالت اتمام اسکان نمایش داده می شود. */}
      {/* نمایش تاریخ اسکان */}
      {url?.status === ReservationCompletedRequestsStatus?.accommodationCompleted ? (
        <ReservationCompleteRequestDateResidence />
      ) : null}

      {/* ******************************************************************************* */}
      {/* اطلاعات کاربر درخواست دهنده */}
      <ReservationRequestersInfo
        hasBtn={
          url?.status === ReservationCompletedRequestsStatus?.accommodationCompleted
        }
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
        showLastActionInfo={
          url?.status === ReservationCompletedRequestsStatus?.accommodationCompleted ||
          url?.status === ReservationCompletedRequestsStatus?.rejected
        }
      />

      {/* ******************************************************************************* */}
      {/* ودیعه */}
      {url?.status === ReservationCompletedRequestsStatus?.accommodationCompleted &&
      mockData.completedResidence?.deposit ? (
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={12} lg={8} xl={8}>
            <ReservationCompleteRequestDeposit
              status={mockData.completedResidence.depositStatus}
              repaymentDate={
                mockData.completedResidence.depositStatus === "pendingRefund"
                  ? null
                  : "2026-03-03"
              }
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={8} xl={8}>
            <ReservationCompleteRequestDeposit
              status={mockData.completedResidence.depositStatus}
              repaymentDate={
                mockData.completedResidence.depositStatus === "pendingRefund"
                  ? null
                  : "2026-03-03"
              }
            />
          </Col>
        </Row>
      ) : null}

      {/* ******************************************************************************* */}
      {/*  فاکتورها  */}
      {url?.status === ReservationCompletedRequestsStatus?.accommodationCompleted ? (
        <div>
          <CustomDivider text="فاکتورها" />

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* در انتظار پرداخت */}
            <ReservationFactorCard status="pendingPayment" Installment={true} />
            {/* پرداخت‌شده */}
            <ReservationFactorCard status="paid" Installment={true} />
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default ReservationCompletedRequestsDetail;
