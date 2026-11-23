import { useCallback, useEffect, useState } from "react";

import { Col, Row } from "antd";
import dayjs from "dayjs";
import { toast } from "react-toastify";

import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTimePicker from "@components/CustomInputs/CustomTimePicker/CustomTimePicker";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import { useLazyGetAllBranchesQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import { useLazyGetAllRestaurantsQuery } from "@infra/states/redux/Apis/food/reservation/foodReservationApi";
import { useLazyGetAllContractsBySelfIdQuery } from "@infra/states/redux/Apis/food/self/selfApis";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import {
  foodNotFoundContent,
  PLEASE_SELECT_A_SELF_FIRST,
} from "@pages/Food/_shared/utils/sharedFoodUtils";
import { AllContractsListItem } from "@pages/Food/Contracts/AllContracts/AllContractList/@types/@allContractList";
import { reservationDaysList } from "@pages/Food/FoodSchedules/_shared/utils/foodScheduleUtils";
import {
  GetAllRestaurantsResponse,
  RestaurantType,
} from "@pages/Food/Reservation/AllReservation/AllReservationOrderSearch/@types/@reservationOrderSearch";

import { MultiFoodMultiDayScheduleListBasicInfoProps } from "./@types/@multiFoodMultiDayScheduleListBasicInfo";
import { GetAllContractsBySelfIdResponse } from "../../../AllSingleFoodScheduleListDrawerContent/@types/@allSingleFoodScheduleListDrawerContent";

import "./_multiFoodMultiDayScheduleListBasicInfo.scss";

const MultiFoodMultiDayScheduleListBasicInfo = ({
  form,
}: MultiFoodMultiDayScheduleListBasicInfoProps) => {
  const [restaurantData, setRestaurantData] = useState<RestaurantType[] | []>([]);
  const [restaurantId, setRestaurantId] = useState<string | null>(null);
  const [contractData, setContractData] = useState<AllContractsListItem[] | []>([]);

  //? ================================  Api Calls ================================
  const [getAllUniversity, { data: universityData, isLoading: isUniversityDataLoading }] =
    useLazyGetAllBranchesQuery();

  const [
    getAllRestaurants,
    { isFetching: isAllRestaurantDataLoading, isSuccess: isAllSelfsFetched },
  ] = useLazyGetAllRestaurantsQuery();

  const [getAllContractsBySelfId, { isFetching: isAllContractsBySelfIdLoading }] =
    useLazyGetAllContractsBySelfIdQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getAllRestaurants({ isDeleted: false }).unwrap().then(getAllRestaurantsOnSuccess);
    getAllUniversity();
  }, []);

  useEffect(() => {
    if (restaurantId) {
      getAllContractsBySelfId({ restaurantId })
        .unwrap()
        .then(getAllContractsBySelfIdOnSuccess);
    }
  }, [restaurantId]);

  //* ================================ Util Functions ================================
  const getAllRestaurantsOnSuccess = useCallback(
    async (value: GetAllRestaurantsResponse) => {
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

  const getAllContractsBySelfIdOnSuccess = useCallback(
    async (value: GetAllContractsBySelfIdResponse) => {
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
          loading={isAllRestaurantDataLoading}
          form={form}
          notFoundContent={!isAllSelfsFetched ? foodNotFoundContent : undefined}
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
          loading={isAllContractsBySelfIdLoading}
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

export default MultiFoodMultiDayScheduleListBasicInfo;
