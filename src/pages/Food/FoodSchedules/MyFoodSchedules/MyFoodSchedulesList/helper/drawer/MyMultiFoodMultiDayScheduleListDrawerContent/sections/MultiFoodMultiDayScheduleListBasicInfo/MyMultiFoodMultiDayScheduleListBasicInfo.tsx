import { useCallback, useEffect, useState } from "react";

import { Col, Row } from "antd";
import dayjs from "dayjs";
import { toast } from "react-toastify";

import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTimePicker from "@components/CustomInputs/CustomTimePicker/CustomTimePicker";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import { useLazyGetAllBranchesQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import { useLazyGetMyRestaurantsQuery } from "@infra/states/redux/Apis/food/reservation/foodReservationApi";
import { useLazyGetMyContractsBySelfIdQuery } from "@infra/states/redux/Apis/food/self/selfApis";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import {
  foodNotFoundContent,
  PLEASE_SELECT_A_SELF_FIRST,
} from "@pages/Food/_shared/utils/sharedFoodUtils";
import { MyContractsListItem } from "@pages/Food/Contracts/MyContracts/MyContractsList/@types/@myContractsList";
import { reservationDaysList } from "@pages/Food/FoodSchedules/_shared/utils/foodScheduleUtils";
import {
  GetMyRestaurantsResponse,
  MyRestaurantType,
} from "@pages/Food/Reservation/MyReservation/MyReservationOrderSearch/@types/@myReservationOrderSearch";

import { MyMultiFoodMultiDayScheduleListBasicInfoProps } from "./@types/@myMultiFoodMultiDayScheduleListBasicInfo";
import { GetMyContractsBySelfIdResponse } from "../../../MySingleFoodScheduleListDrawerContent/@types/@mySingleFoodScheduleListDrawerContent";

import "./_myMultiFoodMultiDayScheduleListBasicInfo.scss";

const MyMultiFoodMultiDayScheduleListBasicInfo = ({
  form,
}: MyMultiFoodMultiDayScheduleListBasicInfoProps) => {
  const [restaurantData, setRestaurantData] = useState<MyRestaurantType[] | []>([]);
  const [restaurantId, setRestaurantId] = useState<string | null>(null);
  const [contractData, setContractData] = useState<MyContractsListItem[] | []>([]);

  //? ================================  Api Calls ================================
  const [getAllUniversity, { data: universityData, isLoading: isUniversityDataLoading }] =
    useLazyGetAllBranchesQuery();

  const [
    getMyRestaurants,
    { isFetching: isMyRestaurantDataLoading, isSuccess: isMySelfsFetched },
  ] = useLazyGetMyRestaurantsQuery();

  const [getMyContractsBySelfId, { isFetching: isMyContractsBySelfIdLoading }] =
    useLazyGetMyContractsBySelfIdQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getMyRestaurants().unwrap().then(getMyRestaurantsOnSuccess);
    getAllUniversity();
  }, []);

  useEffect(() => {
    if (restaurantId) {
      getMyContractsBySelfId({ restaurantId })
        .unwrap()
        .then(getMyContractsBySelfIdOnSuccess);
    }
  }, [restaurantId]);

  //* ================================ Util Functions ================================
  const getMyRestaurantsOnSuccess = useCallback(
    async (value: GetMyRestaurantsResponse) => {
      if (value?.status === 200) {
        setRestaurantData(value?.data);
      } else {
        return toast.error((value?.data || value?.msg) as any, {
          toastId: (value?.data || value?.msg) as any,
        });
      }
    },
    []
  );

  const getMyContractsBySelfIdOnSuccess = useCallback(
    async (value: GetMyContractsBySelfIdResponse) => {
      if (value?.status === 200) {
        setContractData(value?.data?.contractDtoList);
      } else {
        return toast.error((value?.data || value?.msg) as any, {
          toastId: (value?.data || value?.msg) as any,
        });
      }
    },
    []
  );

  // onOpenContractsSelect
  const onOpenContractsSelectClickHandler = () => {
    if (!restaurantId) {
      return toast.warning(PLEASE_SELECT_A_SELF_FIRST, {
        toastId: PLEASE_SELECT_A_SELF_FIRST,
      });
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <Row gutter={[16, 16]} className="food-schedules-drawer-info-container">
      <Col span={24}>
        <CustomDivider text="اطلاعات اولیه" />
      </Col>
      <Col span={24}>
        <CustomDatePicker
          label="تاریخ های برنامه غذایی"
          placeholder="انتخاب کنید"
          name="reserveDate"
          rules={[REQUIRED_RULE]}
          form={form}
          disabledDate={(current) => {
            return current && current < dayjs().endOf("day");
          }}
          onChange={(date) => {
            // حالت clear
            if (!date || (Array.isArray(date) && date.length === 0)) {
              form.setFieldsValue({ reserveDate: undefined });
              return;
            }
            form.setFieldsValue({
              reserveDate: date as string[] | undefined,
            });
          }}
          multiple
        />
      </Col>
      <Col span={24}>
        <CustomSelect
          label="واحدهای دانشگاهی"
          name="universityUnit"
          placeholder="انتخاب کنید"
          options={universityData ? universityData : []}
          loading={isUniversityDataLoading}
          form={form}
          rules={[REQUIRED_RULE]}
          mode="multiple"
        />
      </Col>
      <Col lg={8} md={12} sm={24} xs={24}>
        <CustomSelect
          label="سلف"
          name="self"
          placeholder="انتخاب کنید"
          options={restaurantData}
          loading={isMyRestaurantDataLoading}
          form={form}
          notFoundContent={!isMySelfsFetched ? foodNotFoundContent : undefined}
          onChange={(value) => setRestaurantId(value as string)}
          rules={[REQUIRED_RULE]}
        />
      </Col>
      <Col lg={8} md={12} sm={24} xs={24}>
        <CustomSelect
          label="قرارداد"
          name="contract"
          placeholder="انتخاب کنید"
          options={contractData}
          loading={isMyContractsBySelfIdLoading}
          form={form}
          rules={[REQUIRED_RULE]}
          onClick={onOpenContractsSelectClickHandler}
        />
      </Col>
      <Col span={24}>
        <CustomDivider text="اطلاعات زمان رزرو" />
      </Col>
      <Col lg={8} md={12} sm={24} xs={24}>
        <CustomSelect
          label="شروع رزرو"
          name="reservationStart"
          placeholder="انتخاب کنید"
          options={reservationDaysList}
          form={form}
        />
      </Col>
      <Col lg={8} md={12} sm={24} xs={24}>
        <CustomSelect
          label="پایان رزرو"
          name="reservationEnd"
          placeholder="انتخاب کنید"
          options={reservationDaysList}
          form={form}
        />
      </Col>
      <Row gutter={[16, 16]} className="food-schedules-reservation-time-container">
        <Col lg={8} md={12} sm={24} xs={24}>
          <CustomTimePicker
            label="شروع رزرو(ساعت)"
            name="startReservation"
            placeholder="انتخاب کنید"
          />
        </Col>
        <Col lg={8} md={12} sm={24} xs={24}>
          <CustomTimePicker
            label="پایان رزرو(ساعت)"
            name="endReservation"
            placeholder="انتخاب کنید"
          />
        </Col>
      </Row>
      <Col span={24}>
        <CustomDivider text="اطلاعات زمان تحویل" />
      </Col>
      <Col lg={8} md={12} sm={24} xs={24}>
        <CustomTimePicker
          label="شروع تحویل (ساعت)"
          name="deliverStartTime"
          placeholder="انتخاب کنید"
        />
      </Col>
      <Col lg={8} md={12} sm={24} xs={24}>
        <CustomTimePicker
          label="پایان تحویل (ساعت)"
          name="deliverEndTime"
          placeholder="انتخاب کنید"
        />
      </Col>
    </Row>
  );
};

export default MyMultiFoodMultiDayScheduleListBasicInfo;
