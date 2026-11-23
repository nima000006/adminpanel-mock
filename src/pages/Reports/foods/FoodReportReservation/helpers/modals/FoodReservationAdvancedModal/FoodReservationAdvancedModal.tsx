import { useEffect, useState } from "react";

import { Col, Form, Modal, Row } from "antd";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomRangePicker from "@components/CustomInputs/CustomRangePicker/CustomRangePicker";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import { selectDefaultValueGenerator } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetAllBranchesQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import { useGetMealAllQuery } from "@infra/states/redux/Apis/food/general/GeneralFoodApis";
import {
  useLazyGetAllRestaurantsQuery,
  useLazyGetMyRestaurantsQuery,
} from "@infra/states/redux/Apis/food/reservation/foodReservationApi";
import { foodNotFoundContent } from "@pages/Food/_shared/utils/sharedFoodUtils";
import { RestaurantType } from "@pages/Food/Reservation/AllReservation/AllReservationOrderSearch/@types/@reservationOrderSearch";
import { MyRestaurantType } from "@pages/Food/Reservation/MyReservation/MyReservationOrderSearch/@types/@myReservationOrderSearch";
import { foodDeliveryOptions } from "@pages/Reports/foods/FoodReportReservation/utils/ReservationUtils";

import { FoodReservationAdvancedModalProps } from "./@types/@foodReservationAdvancedModal";

import "./_foodReservationAdvancedModal.scss";

const requestTypeOptions = [
  { id: 0, title: "یارانه‌ای" },
  { id: 1, title: "اضافی" },
  { id: 2, title: "روز فروش" },
];

const FoodReservationAdvancedModal = ({
  isModalOpen,
  onSubmit,
  closeModalHandler,
  title = "فیلتر پیشرفته",
  confirmBtnText = "اعمال فیلترها",
  isDangerous = false,
  isConfirmButtonDisable = false,
  customClass,
  width = 900,
  htmlType = "submit",
  form,
  isConfirmButtonLoading,
  centered = true,
  titleIcon,
  pageType,
}: FoodReservationAdvancedModalProps) => {
  const [isSubmitBtnDisabled, setIsSubmitBtnDisabled] = useState(true);
  const [selfs, setSelfs] = useState<RestaurantType[] | MyRestaurantType[]>([]);

  const {
    params: {
      lastName,
      firstName,
      username,
      studentNumber,
      branchCode,
      branchName,
      mealId,
      mealName,
      restaurantId,
      restaurantName,
      requestType,
      requestTypeName,
      fromDate,
      toDate,
      deliveryType,
      deliveryName,
    },
  } = useQueryParams();

  const [
    getAllSelfs,
    { isFetching: isGetAllSelfsDataLoading, isSuccess: isGetAllSelfsFetched },
  ] = useLazyGetAllRestaurantsQuery();

  const [
    getMyRestaurants,
    { isFetching: isMyRestaurantDataLoading, isSuccess: isMySelfsFetched },
  ] = useLazyGetMyRestaurantsQuery();

  const { data: mealData, isLoading: isMealDataLoading } = useGetMealAllQuery();

  const [
    getBranches,
    {
      data: universityData,
      isLoading: isBranchesDataLoading,
      isSuccess: isBranchesDataFetched,
    },
  ] = useLazyGetAllBranchesQuery();

  useEffect(() => {
    form.setFieldsValue({
      lastName,
      firstName,
      username,
      date: fromDate && toDate ? [fromDate, toDate] : undefined,
      studentNumber,
      ...(branchCode
        ? {
            branchCode: selectDefaultValueGenerator({
              id: +branchCode,
              title: branchName,
            }),
          }
        : { branchCode: undefined }),
      ...(mealId
        ? {
            mealId: selectDefaultValueGenerator({
              id: +mealId,
              title: mealName,
            }),
          }
        : { mealId: undefined }),
      ...(restaurantId
        ? {
            restaurantId: selectDefaultValueGenerator({
              id: +restaurantId,
              title: restaurantName,
            }),
          }
        : { restaurantId: undefined }),
      ...(requestType
        ? {
            requestType: selectDefaultValueGenerator({
              id: +requestType,
              title: requestTypeName,
            }),
          }
        : { requestType: undefined }),
      ...(deliveryType
        ? {
            delivery: selectDefaultValueGenerator({
              id: +deliveryType,
              title: deliveryName,
            }),
          }
        : { delivery: undefined }),
    });
  }, [
    lastName,
    firstName,
    username,
    studentNumber,
    branchCode,
    branchName,
    mealId,
    mealName,
    restaurantId,
    restaurantName,
    requestType,
    requestTypeName,
    fromDate,
    toDate,
  ]);

  Form.useWatch(
    ({
      branchCode,
      date,
      lastName,
      mealId,
      firstName,
      username,
      restaurantId,
      studentNumber,
      requestType,
      delivery,
    }) => {
      if (
        date ||
        lastName ||
        firstName ||
        username ||
        studentNumber ||
        mealId?.title ||
        restaurantId?.title ||
        branchCode?.title ||
        delivery?.title ||
        requestType?.title
      ) {
        setIsSubmitBtnDisabled(false);
      } else {
        setIsSubmitBtnDisabled(true);
      }
    },
    form
  );

  //* ================================ Util Functions ================================
  const onSelfSelectHandler = () => {
    if (pageType === "admin" && !isGetAllSelfsFetched) {
      return getAllSelfs({
        isDeleted: false,
      })
        .unwrap()
        .then((res) => {
          if (res?.status === 200) {
            setSelfs(res?.data);
          } else {
            return toast.error((res?.data || res?.msg) as any, {
              toastId: (res?.data || res?.msg) as any,
            });
          }
        });
    }
    if (pageType === "manager" && !isMySelfsFetched) {
      getMyRestaurants()
        .unwrap()
        .then((res) => {
          if (res?.status === 200) {
            setSelfs(res?.data);
          } else {
            return toast.error((res?.data || res?.msg) as any, {
              toastId: (res?.data || res?.msg) as any,
            });
          }
        });
    }
  };

  const onBranchSelectHandler = () => {
    if (!isBranchesDataFetched) {
      getBranches();
    }
  };
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    isModalOpen && (
      <Modal
        title={
          titleIcon ? (
            <div className="title-with-icon">
              {titleIcon}
              <span>{title}</span>
            </div>
          ) : (
            title
          )
        }
        open={isModalOpen}
        onCancel={() => closeModalHandler()}
        footer={null}
        width={width}
        className={`food-reserve-advanced-modal-container ${customClass}`}
        centered={centered}
      >
        <>
          <CustomAlert
            showIcon
            description="فیلتر کردن اطلاعات بر اساس فیلدهای زیر، نتایج جستجوی شما را شخصی‌سازی می‌کند."
            closable
          />
          <Form className="main-content" form={form} onFinish={onSubmit}>
            <CustomDivider text="تاریخ" />
            <Row gutter={[16, 16]}>
              <Col md={12} xs={24}>
                <CustomRangePicker name="date" form={form} />
              </Col>
            </Row>
            <CustomDivider text="اطلاعات شخصی" />
            <Row gutter={[16, 16]}>
              <Col md={6} xs={12}>
                <CustomInput
                  label="نام"
                  name="firstName"
                  placeholder="بر اساس نام"
                  allowClear
                />
              </Col>
              <Col md={6} xs={12}>
                <CustomInput
                  label="نام خانوادگی"
                  name="lastName"
                  placeholder="بر اساس نام خانوادگی"
                  allowClear
                />
              </Col>
              <Col md={6} xs={12}>
                <CustomInput
                  label="کد ملی / اتباع"
                  name="username"
                  placeholder="بر اساس کد ملی یا کد اتباع"
                  allowClear
                />
              </Col>
              <Col md={6} xs={12}>
                <CustomInput
                  label="شماره دانشجویی"
                  name="studentNumber"
                  placeholder="بر اساس شماره دانشجویی"
                  allowClear
                />
              </Col>
            </Row>
            <CustomDivider text="اطلاعات واحد" />
            <Row gutter={[16, 16]}>
              {pageType === "admin" && (
                <Col md={6} xs={12}>
                  <CustomSelect
                    placeholder="انتخاب کنید"
                    label="واحد دانشگاهی"
                    name="branchCode"
                    loading={isBranchesDataLoading}
                    options={universityData ? universityData : []}
                    form={form}
                    onClick={onBranchSelectHandler}
                    allowClear
                  />
                </Col>
              )}
              <Col md={6} xs={12}>
                <CustomSelect
                  placeholder="انتخاب کنید"
                  label="سلف"
                  name="restaurantId"
                  options={selfs}
                  form={form}
                  loading={isGetAllSelfsDataLoading || isMyRestaurantDataLoading}
                  onClick={onSelfSelectHandler}
                  allowClear
                  notFoundContent={
                    !isGetAllSelfsFetched && !isMySelfsFetched
                      ? foodNotFoundContent
                      : undefined
                  }
                />
              </Col>
            </Row>
            <CustomDivider text="اطلاعات مرتبط به غذا" />
            <Row gutter={[16, 16]}>
              <Col md={6} xs={12}>
                <CustomSelect
                  placeholder="انتخاب کنید"
                  label="نوع"
                  name="requestType"
                  options={requestTypeOptions}
                  form={form}
                  allowClear
                />
              </Col>
              <Col md={6} xs={12}>
                <CustomSelect
                  placeholder="انتخاب کنید"
                  label="وعده"
                  name="mealId"
                  options={mealData?.data?.map((item) => {
                    return {
                      id: item.id,
                      title: item.name,
                    };
                  })}
                  loading={isMealDataLoading}
                  form={form}
                  allowClear
                />
              </Col>
              <Col md={6} xs={12}>
                <CustomSelect
                  placeholder="انتخاب کنید"
                  label="وضعیت تحویل"
                  name="delivery"
                  options={foodDeliveryOptions}
                  form={form}
                  allowClear
                />
              </Col>
              <Col span={24}>
                <CustomButton
                  danger={isDangerous}
                  htmlType={htmlType}
                  loading={isConfirmButtonLoading || isConfirmButtonDisable}
                  disabled={isSubmitBtnDisabled}
                  //   onClick={onConfirmClickHandler}
                  type="primary"
                  className="food-filter-submit-btn"
                >
                  {confirmBtnText}
                </CustomButton>
              </Col>
            </Row>
          </Form>
        </>
      </Modal>
    )
  );
};

export default FoodReservationAdvancedModal;
