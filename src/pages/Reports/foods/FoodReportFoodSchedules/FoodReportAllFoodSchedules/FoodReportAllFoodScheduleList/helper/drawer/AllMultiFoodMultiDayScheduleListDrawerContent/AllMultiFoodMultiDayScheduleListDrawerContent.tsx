import { useEffect, useState } from "react";

import { Form, Steps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import moment from "jalali-moment";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import { stepStatusCreator } from "@infra/helpers/utils";
import { useCreateAllFoodScheduleBulkDaysMutation } from "@infra/states/redux/Apis/food/foodSchedule/foodScheduleApis";
import { MULTI_FOOD_MULTI_DAY_PLANS_DRAWER_ALERT_MSG } from "@pages/Food/FoodSchedules/_shared/utils/foodScheduleUtils";

import {
  AllMultiFoodMultiDayScheduleListDrawerContentProps,
  CreateAllFoodScheduleBulkDaysResponse,
  StepOneForm,
} from "./@types/@allMultiFoodMultiDayScheduleListDrawerContent";
import { foodInfoType } from "./sections/MultiFoodMultiDayAllFoodScheduleLists/@types/@multiFoodMultiDayAllFoodScheduleLists";
import MultiFoodMultiDayAllFoodScheduleLists from "./sections/MultiFoodMultiDayAllFoodScheduleLists/MultiFoodMultiDayAllFoodScheduleLists";
import MultiFoodMultiDayScheduleListBasicInfo from "./sections/MultiFoodMultiDayScheduleListBasicInfo/MultiFoodMultiDayScheduleListBasicInfo";

const AllMultiFoodMultiDayScheduleListDrawerContent = ({
  closeDrawerHandler,
  getListData,
}: AllMultiFoodMultiDayScheduleListDrawerContentProps) => {
  const [isActive, setIsActive] = useState(true);

  const [current, setCurrent] = useState(0);
  const [stepOneForm] = Form.useForm<StepOneForm>();

  const [foodInfo, setFoodInfo] = useState<foodInfoType[]>([]);

  //? ================================  Api Calls ================================
  const [createAllBulkDays, { isLoading: isCreateAllBulkDaysLoading }] =
    useCreateAllFoodScheduleBulkDaysMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    const tempFoodList: foodInfoType[] = [];
    const dateList: Dayjs[] = stepOneForm?.getFieldValue("reserveDate");

    foodInfo?.forEach((food) => {
      dateList?.forEach((date) => {
        if (food?.date === date?.toJSON()) {
          tempFoodList.push(food);
        }
      });
    });

    setFoodInfo(tempFoodList);
  }, [stepOneForm?.getFieldValue("reserveDate")?.toString()]);

  //* ================================ Steps ================================
  const stepsItem = [
    {
      id: "1",
      children: <MultiFoodMultiDayScheduleListBasicInfo form={stepOneForm} />,
    },
    {
      id: "2",
      children: (
        <MultiFoodMultiDayAllFoodScheduleLists
          foodInfo={foodInfo}
          setFoodInfo={setFoodInfo}
          contractId={stepOneForm.getFieldValue("contract")?.code}
          dates={stepOneForm.getFieldValue("reserveDate")}
        />
      ),
    },
  ];

  //* ================================ Util Functions ================================
  const nextBtnHandler = () => {
    stepOneForm.submit();
    stepOneForm.validateFields().then(() => {
      setCurrent(1);
    });
  };

  const backBtnHandler = () => {
    setCurrent(0);
  };

  const createAllBulkDaysOnSuccess = (value: CreateAllFoodScheduleBulkDaysResponse) => {
    if (value?.status === 200) {
      closeDrawerHandler();
      getListData();
    } else {
      toast.error(value?.msg, { toastId: value?.msg });
    }
  };

  const createNewFoodScheduleHandler = () => {
    stepOneForm?.submit();
    stepOneForm?.validateFields().then(() => {
      const basicProductBulkPlanDatRequestList = foodInfo?.map((food) => {
        return {
          basePrice: food?.basePrice,
          discount: 0,
          limitedCount: food?.hasLimit?.id === 1 ? true : false,
          maxCount: food?.maxCount ? +food?.maxCount : null,
          maxTotalPerPerson: food?.maxTotalPerPerson ? +food?.maxTotalPerPerson : 1,
          mealId: food?.meal?.id,
          productId: food?.product?.id,
          requestType: food?.requestType?.id,
          reserveDates: moment(food?.date).format("YYYY-MM-DD"),
        };
      });

      const value: StepOneForm = stepOneForm?.getFieldsValue(true);

      createAllBulkDays({
        active: isActive,
        basicProductBulkPlanDatRequestList,
        branches: value?.universityUnit?.map((item) => item?.code),
        endReservationDate: value?.reservationEnd?.code,
        startReservationDate: value?.reservationStart?.code,
        fromDeliveryTimeHour: dayjs(value?.deliverStartTime).get("hours"),
        fromDeliveryTimeMinute: dayjs(value?.deliverStartTime).get("minutes"),
        toDeliveryTimeHour: dayjs(value?.deliverEndTime).get("hours"),
        toDeliveryTimeMinute: dayjs(value?.deliverEndTime).get("minutes"),
        startReservationHour: dayjs(value?.startReservation).get("hours"),
        endReservationHour: dayjs(value?.endReservation).get("hours"),
        startReservationMinute: dayjs(value?.startReservation).get("minutes"),
        endReservationMinute: dayjs(value?.endReservation).get("minutes"),
      })
        .unwrap()
        .then(createAllBulkDaysOnSuccess);
    });
  };

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={stepOneForm}>
      <CustomDrawerHeader
        title="تعریف گروهی چند غذا، چند روز"
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <div className="drawer-action-btns-container">
            <CustomSwitch
              defaultChecked={isActive}
              checkedChildren="فعال"
              unCheckedChildren="غیرفعال"
              valuePropName="activeMode"
              onChange={() => setIsActive((prev) => !prev)}
            />
            {current === 0 ? (
              <>
                <CustomButton onClick={closeDrawerHandler} className="drawer-action-btn">
                  انصراف
                </CustomButton>
                <CustomButton
                  type="primary"
                  onClick={nextBtnHandler}
                  className="drawer-action-btn"
                  htmlType="submit"
                >
                  بعدی
                </CustomButton>
              </>
            ) : (
              <>
                <CustomButton onClick={backBtnHandler} className="drawer-action-btn">
                  برگشت
                </CustomButton>
                <CustomButton
                  type="primary"
                  onClick={createNewFoodScheduleHandler}
                  className="drawer-action-btn"
                  htmlType="submit"
                  loading={isCreateAllBulkDaysLoading}
                >
                  ثبت
                </CustomButton>
              </>
            )}
          </div>
        }
      />
      <div className="drawer-body">
        <CustomAlert
          message={MULTI_FOOD_MULTI_DAY_PLANS_DRAWER_ALERT_MSG}
          type="info"
          closable
          showIcon
        />
        <Form className="" form={stepOneForm}>
          <Steps
            type="navigation"
            current={current}
            className="site-navigation-steps"
            items={[
              {
                status: stepStatusCreator(current, 0),
                title: "مرحله اول",
              },
              {
                status: stepStatusCreator(current, 1),
                title: "مرحله دوم",
              },
            ]}
          />
          {stepsItem[current].children}
        </Form>
      </div>
    </Form>
  );
};

export default AllMultiFoodMultiDayScheduleListDrawerContent;
