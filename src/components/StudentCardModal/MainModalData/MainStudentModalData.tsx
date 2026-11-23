import { useRef, useState } from "react";

import moment from "jalali-moment";
import { useReactToPrint } from "react-to-print";

import { MainStudentModalDataProps } from "./@types/@mainStudentModalData";
import DeleteIcon from "../../../assets/icons/DeleteIcon";
import DeliveryHandIcon from "../../../assets/icons/DeliveryHandIcon";
import NextButtonIcon from "../../../assets/icons/NextButtonIcon";
import PostMotorIcon from "../../../assets/icons/PostMotorIcon";
import PrevButtonIcon from "../../../assets/icons/PrevButtonIcon";
import PrevIcon from "../../../assets/icons/PrevIcon";
import {
  CLOSED_CODE,
  DELIVERED_FINAL_CODE,
  DELIVERED_TO_POST_CODE,
  DELIVERED_TO_STUDENT_CODE,
  LOST_CODE,
  PACKET_GETTING_READY_CODE,
  PRINT_SUCCESS_CODE,
  READY_TO_DELIVER_CODE,
  READY_TO_POST_CODE,
  READY_TO_PRINT_CODE,
  REJECTED_CODE,
  RETURNED_CODE,
} from "../../../infrastructure/models/studentStatus";
import StudentResponseModal from "../../Modals/StudentModule/MassiveResponseModal/MassiveResponseModal";
import StudentSinglePacketToPrint from "../../PrintingHelpers/studentSinglePacketToPrint/studentSinglePacketToPrint";
import CustomDivider from "../../Renderers/CustomDivider/CustomDivider";
import SingleVerticalItem from "../../Renderers/SingleVerticalItem/SingleVerticalItem";
import StudentCard from "../../StudentCard/StudentCard";
import "./_mainStudentModalData.scss";

const MainStudentModalData = ({
  infoData,
  onCloseRequestHandler,
  onClickNextStudent,
  onClickPrevStudent,
  nextStudentData,
  userInfoData,
  onStudentCardPrintHandler,
  onAdminStateChangeHandler,
  mainModalCloseHandler,
}: MainStudentModalDataProps) => {
  const studentSinglePacketRef = useRef<HTMLDivElement>(null);
  const isRequestHistoryButtonDisabled = true;
  const [studentResponseModal, setStudentResponseModal] = useState({
    isOpen: false,
    studentId: -1,
  });
  //? ================================  Api Calls ================================
  // const [
  //   getAllRequestStatusByStudentCardId,
  //   {
  //     data: getAllRequestStatusByStudentCardIdData,
  //     isLoading: isGetAllRequestStatusByStudentCardIdLoading,
  //   },
  // ] = useGetAllRequestStatusByStudentCardIdMutation();

  //? ================================ Effects ================================
  // useEffect(() => {
  //   getAllRequestStatusByStudentCardId(infoData?.id);
  // }, []);
  // console.log({ getAllRequestStatusByStudentCardIdData });

  //* ================================ Util Functions ================================
  const actionButtonNameGenerator = (id: number) => {
    switch (id) {
      case 2:
        return "تایید";
      case 3:
        return "پیگیری کارشناس";
      case 4:
        return "پیگیری دانشجو";
      case READY_TO_PRINT_CODE:
        return "آماده چاپ";
      case PRINT_SUCCESS_CODE:
        return "چاپ موفق";
      case READY_TO_DELIVER_CODE:
        return "آماده تحویل"; // userInfoData?.data?.type === 0 ?"آماده تحویل" : "";
      case PACKET_GETTING_READY_CODE:
        return "آماده سازی پاکت";
      case READY_TO_POST_CODE:
        return "آماده سازی ارسال به پست";
      case DELIVERED_TO_POST_CODE:
        return "ارسال شده به پست";
      case DELIVERED_TO_STUDENT_CODE:
        return "تحویل به دانشجو";
      case DELIVERED_FINAL_CODE:
        return "تحویل شده";
      case RETURNED_CODE:
        return "عودت";
      case LOST_CODE:
        return "مفقود شده";
      case CLOSED_CODE:
        return "بستن درخواست";
      case REJECTED_CODE:
        return "رد درخواست";
      case 17:
        return "چاپ";
      case 18:
        return "چاپ پاکت";
      default:
        return "طرح مشکل";
    }
  };
  const actionBtnStyleGenerator = (id: number) => {
    switch (id) {
      case 2:
        return "action-btn-success";
      case 3:
        return "action-btn-warning";
      case 4:
        return "action-btn-danger";
      case READY_TO_PRINT_CODE:
        return "action-btn-primary";
      case PRINT_SUCCESS_CODE:
        return "action-btn-primary";
      case READY_TO_DELIVER_CODE:
        return "action-btn-success";
      case CLOSED_CODE:
        return "action-btn-danger";
      case LOST_CODE:
        return "action-btn-danger";
      default:
        return "";
    }
  };
  const onStudentSinglePacketPrintHandler = useReactToPrint({
    contentRef: studentSinglePacketRef,
  });
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      <StudentResponseModal
        studentResponseModal={studentResponseModal}
        setStudentResponseModal={setStudentResponseModal}
        title="تحویل"
        mainModalCloseHandler={mainModalCloseHandler}
      />
      <div style={{ display: "none" }}>
        <StudentSinglePacketToPrint
          ref={studentSinglePacketRef}
          firstName={infoData?.firstName}
          lastName={infoData?.lastName}
          levelName={infoData?.levelName}
          fieldName={infoData?.fieldName}
          studentNumber={infoData?.studentNumber}
          nationalCode={infoData?.nationalCode}
        />
      </div>
      <div className="modal-data-container">
        <div className="data-container">
          <div>
            <StudentCard
              unitName={infoData?.unitName}
              firstName={infoData?.firstName}
              lastName={infoData?.lastName}
              field={infoData?.fieldName}
              studentNumber={infoData?.studentNumber}
              nationalNumber={infoData?.nationalCode}
              level={infoData?.levelName}
              serialNumber={infoData?.digitalCardSerialNumber}
              nationality={infoData?.nationality}
            />
          </div>
          {/* //! LEFT SIDE MODAL DATA */}
          <div className="student-data-container">
            <div className="date-top-section">
              <div className="request-status-container">
                <div className="request-status-label-main">وضعیت</div>
                <div className="request-status">
                  <span className="request-name">
                    {infoData?.requestStatus?.name ? (
                      <span className="d-flex request-status-label">
                        {infoData?.requestStatus?.name}
                      </span>
                    ) : (
                      <span className="d-flex">ثبت نشده</span>
                    )}
                  </span>
                </div>
              </div>
              <div className="request-date-container">
                <div className="request-date-label">
                  <span className="request-date-main">تاریخ درخواست</span>
                  <span className="green">
                    {infoData?.createDate
                      ? moment(new Date(), "YYYY/M/D").diff(
                          moment(infoData.createDate ?? new Date()),
                          "days"
                        )
                      : "?"}
                  </span>
                </div>
                <div className="request-date" dir="ltr">
                  {infoData?.createDate
                    ? moment(infoData?.createDate ?? new Date())
                        .locale("fa")
                        .format("YYYY / M / D ")
                    : "ثبت نشده"}
                </div>
              </div>
              <div className="type-of-request-container">
                <div className="type-of-request-label">نوع تحویل</div>
                <div className="type-of-request">
                  <span className="request-name">
                    {infoData?.type === 0 ? (
                      <div className="request-type-container">
                        <span className="d-flex">
                          <DeliveryHandIcon />
                        </span>
                        <span className="d-flex">حضوری</span>
                      </div>
                    ) : (
                      <div className="request-type-container">
                        <span className="d-flex">
                          <PostMotorIcon />
                        </span>
                        <span className="d-flex">ارسال پستی</span>
                      </div>
                    )}
                  </span>
                </div>
              </div>
              <div className="next-prev-btns-container">
                <button
                  className={
                    infoData?.state?.toLowerCase() === "lastrecord" ||
                    (nextStudentData?.data?.id === infoData?.id &&
                      nextStudentData?.msg?.toLowerCase() === "lastrecord")
                      ? "modal-nav-btns-disabled"
                      : "modal-nav-btns"
                  }
                  onClick={onClickNextStudent}
                  disabled={
                    infoData?.state?.toLowerCase() === "lastrecord" ||
                    (nextStudentData?.data?.id === infoData?.id &&
                      nextStudentData?.msg?.toLowerCase() === "lastrecord")
                  }
                >
                  <span className="modal-nav-btns-label">بعدی</span>
                  <span className="d-flex">
                    <NextButtonIcon
                      isDisabled={
                        infoData?.state?.toLowerCase() === "lastrecord" ||
                        (nextStudentData?.data?.id === infoData?.id &&
                          nextStudentData?.msg?.toLowerCase() === "lastrecord")
                      }
                    />
                  </span>
                </button>
                <button
                  className={
                    infoData?.state?.toLowerCase() === "firstrecord" ||
                    (nextStudentData?.data?.id === infoData?.id &&
                      nextStudentData?.msg?.toLowerCase() === "firstrecord")
                      ? "modal-nav-btns-disabled"
                      : "modal-nav-btns"
                  }
                  onClick={onClickPrevStudent}
                  disabled={
                    infoData?.state?.toLowerCase() === "firstrecord" ||
                    (nextStudentData?.data?.id === infoData?.id &&
                      nextStudentData?.msg?.toLowerCase() === "firstrecord")
                  }
                >
                  <span className="modal-nav-btns-label">قبلی</span>
                  <span className="d-flex">
                    <PrevButtonIcon
                      isDisabled={
                        infoData?.state?.toLowerCase() === "firstrecord" ||
                        (nextStudentData?.data?.id === infoData?.id &&
                          nextStudentData?.msg?.toLowerCase() === "firstrecord")
                      }
                    />
                  </span>
                </button>
              </div>
            </div>
            <div
              className="date-bottom-section"
              // style={{
              //   display: "grid",
              //   gridTemplateColumns: infoData?.type === 1 ? "1fr 1fr 1fr" : "1fr 1fr",
              //   justifyContent: "start",
              //   alignItems: "center",
              //   gap: "1.4rem",
              // }}
            >
              <div className="number-of-cards-container">
                <div className="number-of-cards-label">کارت‌های چاپ شده</div>
                <div className="number-of-cards">
                  {userInfoData?.data?.countPrintCard ?? 0}
                </div>
              </div>
              <div className="number-of-cards-container">
                <div className="number-of-cards-label">کارت‌های دریافتی</div>
                <div className="number-of-cards">
                  {userInfoData?.data?.countConfirmDelivery ?? 0}
                </div>
              </div>
            </div>
            <div className="modal-top-end-section">
              <p className="request-history-container">
                <span
                  className={`request-history-label ${
                    isRequestHistoryButtonDisabled && "request-history-label-disabled"
                  }`}
                >
                  تاریخچه درخواست‌ها
                </span>
                <span className="d-flex">
                  <PrevIcon
                    fillColor={isRequestHistoryButtonDisabled ? "#c5c4c4" : "#1890ff"}
                  />
                </span>
              </p>
              {infoData?.requestStatus?.id !== CLOSED_CODE &&
                infoData?.requestStatus?.id !== DELIVERED_FINAL_CODE && (
                  <button
                    className="close-request-btn"
                    onClick={() => onCloseRequestHandler()}
                  >
                    <span className="close-request-btn-label">بستن درخواست</span>
                    <span>
                      <DeleteIcon />
                    </span>
                  </button>
                )}
            </div>
            <div className="address-and-btns-container">
              {infoData?.type ? (
                <div>
                  <CustomDivider text=" اطلاعات ارسال" />
                  <div className="address-main-container">
                    <div className="top-section">
                      <SingleVerticalItem
                        label="استان"
                        value={
                          infoData?.provinceName ? infoData.provinceName : "ثبت نشده"
                        }
                      />
                      <SingleVerticalItem
                        label="شهر"
                        value={infoData?.cityName ? infoData.cityName : "ثبت نشده"}
                      />
                      <SingleVerticalItem
                        label="کدپستی"
                        value={infoData?.postalCode ? infoData?.postalCode : "ثبت نشده"}
                      />
                    </div>
                    <div className="bottom-section">
                      <SingleVerticalItem
                        label="آدرس"
                        value={infoData?.address ? infoData.address : "ثبت نشده"}
                      />
                    </div>
                  </div>
                </div>
              ) : null}
              {infoData?.actionsDtos && infoData?.actionsDtos?.length > 0 ? (
                <div className="admin-description-status-actions-container">
                  <CustomDivider text=" تغییر وضعیت" />
                  <div className="action-btn-container">
                    {infoData?.actionsDtos.map((item: any) => (
                      <button
                        className={`action-btn ${actionBtnStyleGenerator(item?.id)}`}
                        key={item.id}
                        onClick={() => {
                          if (item?.id === 17) {
                            return onStudentCardPrintHandler();
                          } else if (item?.id === 18) {
                            return onStudentSinglePacketPrintHandler();
                          } else if (item?.id === READY_TO_DELIVER_CODE) {
                            if (infoData?.id) {
                              setStudentResponseModal({
                                isOpen: true,
                                studentId: infoData?.id,
                              });
                            }
                          } else {
                            onAdminStateChangeHandler(item);
                          }
                        }}
                      >
                        {actionButtonNameGenerator(item?.id)}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>

        {/* //!  BOTTOM SECTION DATA */}

        {/* STEPPER SECTION */}
        {/* <div className="admin-bottom-section">
        <div className="steps-container" dir="rtl">
          <Steps
            orientation="horizontal"
            size="small"
            current={3}
            items={[
              { title: "ثبت درخواست", description: "1402 / 02 / 02  -  14:30" },
              { title: "اولین بررسی", description: "1402 / 02 / 03  -  14:30" },
              { title: "اقدام", description: "1402 / 02 / 04  -  14:30" },
              { title: "چاپ", description: "1402 / 02 / 05  -  14:30" },
              { title: "تحویل", description: "" },
            ]}
          />
        </div>
      </div> */}
      </div>
    </>
  );
};

export default MainStudentModalData;
