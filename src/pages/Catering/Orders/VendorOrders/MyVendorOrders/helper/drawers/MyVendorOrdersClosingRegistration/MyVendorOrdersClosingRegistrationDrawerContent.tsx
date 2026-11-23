import { useState } from "react";

import { Col, Form, Row } from "antd";
import moment from "jalali-moment";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { useCreateMyCancelledOrdersHolidayMutation } from "@infra/states/redux/Apis/catering/orders/ordersApi";
import {
  useGetCateringMySelfsListMutation,
  useGetDetailMySelfsFoodScheduleMutation,
} from "@infra/states/redux/Apis/catering/selfs/selfsApi";
import { useLazyGetCancelReasonsAllQuery } from "@infra/states/redux/Apis/food/general/GeneralFoodApis";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { IdTitle } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { selectNotFoundContent } from "@pages/_shared/utils";
import { CATERING_STATUS_TYPES_MAIN_LIST } from "@pages/Catering/_shared/utils";
import { CreateMyCancelledOrdersHolidayRequest } from "@pages/Catering/Orders/CancelledOrders/MyCancelledOrders/MyCancelledOrdersList/@types/@myCancelledOrdersList";
import { GetCateringMySelfsListResponse } from "@pages/Catering/Selfs/_shared/@types/@cateringSelfList";
import {
  CATERING_FOOD_SCHEDULE_MEALS,
  CATERING_FOOD_SCHEDULE_MEALS_LABELS,
} from "@pages/Catering/Selfs/_shared/utils";
import { GetDetailMySelfsFoodScheduleResponse } from "@pages/Catering/Selfs/MySelfs/MySelfDetail/helper/components/CateringMySelfsFoodSchedule/@types/@cateringMySelfsFoodSchedule";

import {
  MyVendorOrdersClosingRegistrationDrawerContentProps,
  MyVendorOrdersClosingRegistrationFormType,
} from "./@types/@myVendorOrdersClosingRegistrationDrawerContent";

const CREATE_HOLIDAY_SUCCESS_MSG = "تعطیلی با موفقیت ثبت شد.";

const MEAL_OPTIONS: IdTitle[] = Object.values(CATERING_FOOD_SCHEDULE_MEALS).map((id) => ({
  id,
  title: CATERING_FOOD_SCHEDULE_MEALS_LABELS[id],
}));

const MyVendorOrdersClosingRegistrationDrawerContent = ({
  onCloseDrawer,
  onSuccess,
}: MyVendorOrdersClosingRegistrationDrawerContentProps) => {
  const [selectedItems, setSelectedItems] = useState({
    branchId: "",
    selfId: "",
    date: "",
    mealId: "",
  });
  const [selfData, setSelfData] = useState<IdTitle[]>([]);
  const [foodData, setFoodData] = useState<IdTitle[]>([]);
  const [isSelfsSuccess, setIsSelfsSuccess] = useState(false);
  const [isFoodsSuccess, setIsFoodsSuccess] = useState(false);
  const [selfFetchKey, setSelfFetchKey] = useState("");
  const [form] = Form.useForm<MyVendorOrdersClosingRegistrationFormType>();

  //? ================================  Api Calls ================================

  const [
    getCancelReasons,
    { data: cancelReasonsData, isFetching: isCancelReasonsDataLoading },
  ] = useLazyGetCancelReasonsAllQuery();

  const [getCateringMySelfsList, { isLoading: isGetCateringMySelfsListLoading }] =
    useGetCateringMySelfsListMutation();

  const [getFoodsData, { isLoading: isFoodDataLoading }] =
    useGetDetailMySelfsFoodScheduleMutation();

  const [
    createMyCancelledOrdersHoliday,
    { isLoading: isCreateMyCancelledOrdersHolidayLoading },
  ] = useCreateMyCancelledOrdersHolidayMutation();

  //* ================================ Util Functions ================================
  const handleReasonChange = () => {
    getCancelReasons();
  };

  const getSelfsByBranch = (branchCode?: number) => {
    const fetchKey = branchCode == null ? "" : String(branchCode);
    setIsSelfsSuccess(false);

    getCateringMySelfsList({
      params: {
        pageNumber: 0,
        pageSize: 100,
      },
      body: {
        statusType: CATERING_STATUS_TYPES_MAIN_LIST,
        ...(branchCode != null && { ownerBranchCode: branchCode }),
      },
    })
      .unwrap()
      .then((value: GetCateringMySelfsListResponse) => {
        setSelfData(
          value?.content?.map((item) => ({
            id: item.id,
            title: item.title,
          })) ?? []
        );
        setSelfFetchKey(fetchKey);
        setIsSelfsSuccess(true);
      });
  };

  const getSelfsHandler = () => {
    const branchCode = selectedItems.branchId
      ? Number(selectedItems.branchId)
      : undefined;
    const fetchKey = branchCode == null ? "" : String(branchCode);

    if (isSelfsSuccess && selfFetchKey === fetchKey) {
      return;
    }

    getSelfsByBranch(branchCode);
  };

  const getFoodsHandler = () => {
    if (
      isFoodsSuccess ||
      !selectedItems?.selfId ||
      !selectedItems?.mealId ||
      !selectedItems?.date
    ) {
      return;
    }

    getFoodsData({
      params: {
        pageNumber: 0,
        pageSize: 100,
      },
      body: {
        restaurantId: [Number(selectedItems.selfId)],
        mealId: [Number(selectedItems.mealId)],
        fromReserveDate: selectedItems.date,
        toReserveDate: selectedItems.date,
        statusType: CATERING_STATUS_TYPES_MAIN_LIST,
      },
    })
      .unwrap()
      .then((value: GetDetailMySelfsFoodScheduleResponse) => {
        setFoodData(
          value?.content?.map((item) => ({
            id: item.id,
            title: item.productTitle,
          })) ?? []
        );
        setIsFoodsSuccess(true);
      });
  };

  const clearFoods = () => {
    form.setFieldsValue({
      foods: null,
    });
    setFoodData([]);
    setIsFoodsSuccess(false);
  };

  const changeSelfHandler = (e: number) => {
    setSelectedItems((prev) => ({ ...prev, selfId: e?.toString() }));
    clearFoods();
  };

  const changeMealHandler = (e: number) => {
    setSelectedItems((prev) => ({ ...prev, mealId: e?.toString() }));
    clearFoods();
  };

  const onCreateHolidaySuccess = async () => {
    toast.success(CREATE_HOLIDAY_SUCCESS_MSG, {
      toastId: CREATE_HOLIDAY_SUCCESS_MSG,
    });
    onSuccess();
    onCloseDrawer();
  };

  const registerHolidayHandler = (values: MyVendorOrdersClosingRegistrationFormType) => {
    const cancelReasonId = Number(values?.reason?.code);
    const restaurantId = values?.self?.code ? Number(values.self.code) : undefined;

    const reqBody: CreateMyCancelledOrdersHolidayRequest =
      Array.isArray(values?.foods) && values.foods.length > 0
        ? values.foods.map((item) => ({
            cancelReasonId,
            planId: Number(item?.code),
            reserveDate: selectedItems?.date,
            ...(restaurantId && { restaurantId }),
          }))
        : [
            {
              cancelReasonId,
              reserveDate: selectedItems?.date,
              ...(restaurantId && { restaurantId }),
            },
          ];

    createMyCancelledOrdersHoliday(reqBody).unwrap().then(onCreateHolidaySuccess);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={form} onFinish={registerHolidayHandler}>
      <CustomDrawerHeader
        closeDrawerHandler={onCloseDrawer}
        title="ثبت تعطیلی"
        hasLeftSide
        leftSideContent={
          <div className="flex gap-3">
            <CustomButton className="drawer-action-btn" onClick={onCloseDrawer}>
              انصراف
            </CustomButton>
            <CustomButton
              type="primary"
              className="drawer-action-btn"
              loading={isCreateMyCancelledOrdersHolidayLoading}
              htmlType="submit"
            >
              ثبت تعطیلی
            </CustomButton>
          </div>
        }
      />
      <Row gutter={[40, 40]}>
        <Col span={24}>
          <CustomAlert
            title="راهنما!"
            showIcon
            description="در صورت تعطیل بودن سلف یا دانشگاه شما می‌توانید از طریق فرم زیر روزهای تعطیل را ثبت نمایید تا دانشجو بتواند درخواست عودت وجه خود را در اپلیکیشن ثبت نماید."
          />
        </Col>
        <Col span={24}>
          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol span={24} value="-" label="واحد دانشگاهی" />
            <Col span={24}>
              <CustomDatePicker
                label="تاریخ تعطیلی"
                placeholder="انتخاب کنید"
                name="closingDate"
                onChange={(date, dateString) => {
                  if (!date || !dateString) {
                    setSelectedItems((prev) => ({ ...prev, date: "" }));
                    form.setFieldsValue({
                      closingDate: undefined,
                    });
                    clearFoods();
                    return;
                  }
                  const gregorianDate = moment(dateString, "jYYYY-jMM-jDD").format(
                    "YYYY-MM-DD"
                  );
                  setSelectedItems((prev) => ({ ...prev, date: gregorianDate }));
                  form.setFieldsValue({
                    closingDate: date as string | undefined,
                  });
                  clearFoods();
                }}
                form={form}
                rules={[REQUIRED_RULE]}
              />
            </Col>
            <Col span={24}>
              <CustomSelect
                name="reason"
                label="علت لغو"
                allowClear
                options={cancelReasonsData?.data?.map((item) => {
                  return {
                    id: item.id,
                    title: item.title,
                    description: item.description,
                  };
                })}
                placeholder="انتخاب کنید"
                isLoading={isCancelReasonsDataLoading}
                form={form}
                rules={[REQUIRED_RULE]}
                notFoundContent={
                  isCancelReasonsDataLoading
                    ? "در حال بارگذاری..."
                    : cancelReasonsData?.data?.length === 0
                      ? "هیچ موردی یافت نشد"
                      : null
                }
                onFocus={handleReasonChange}
              />
            </Col>
            <Col span={24}>
              <CustomSelect
                name="self"
                label="سلف"
                allowClear
                options={selfData}
                placeholder="انتخاب کنید"
                isLoading={isGetCateringMySelfsListLoading}
                onClick={getSelfsHandler}
                onChange={(e) => changeSelfHandler(e as number)}
                form={form}
                notFoundContent={!isSelfsSuccess ? selectNotFoundContent : undefined}
              />
            </Col>

            <Col span={24}>
              <CustomSelect
                name="meal"
                label="وعده"
                allowClear
                options={MEAL_OPTIONS}
                placeholder="انتخاب کنید"
                form={form}
                onChange={(e) => changeMealHandler(e as number)}
              />
            </Col>
            <Col span={24}>
              <CustomSelect
                name="foods"
                label="غذا"
                allowClear
                options={foodData}
                placeholder="انتخاب کنید"
                isLoading={isFoodDataLoading}
                form={form}
                mode="multiple"
                onClick={getFoodsHandler}
                notFoundContent={!isFoodsSuccess ? selectNotFoundContent : undefined}
                disabled={
                  !selectedItems.selfId || !selectedItems.mealId || !selectedItems.date
                }
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

export default MyVendorOrdersClosingRegistrationDrawerContent;
