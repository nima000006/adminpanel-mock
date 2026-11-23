import { useState } from "react";

import { Col, Form, Row } from "antd";
import moment from "jalali-moment";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import { useLazyGetBranchByBusinessQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import { useCreateAllCancelledOrdersHolidayMutation } from "@infra/states/redux/Apis/catering/orders/ordersApi";
import {
  useGetCateringSelfsListMutation,
  useGetDetailAllSelfsFoodScheduleMutation,
} from "@infra/states/redux/Apis/catering/selfs/selfsApi";
import { useLazyGetCancelReasonsAllQuery } from "@infra/states/redux/Apis/food/general/GeneralFoodApis";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { IdTitle } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { selectNotFoundContent } from "@pages/_shared/utils";
import { CATERING_STATUS_TYPES_MAIN_LIST } from "@pages/Catering/_shared/utils";
import { CreateAllCancelledOrdersHolidayRequest } from "@pages/Catering/Orders/CancelledOrders/AllCancelledOrders/AllCancelledOrdersList/@types/@allCancelledOrdersList";
import { GetCateringSelfsListResponse } from "@pages/Catering/Selfs/_shared/@types/@cateringSelfList";
import {
  CATERING_FOOD_SCHEDULE_MEALS,
  CATERING_FOOD_SCHEDULE_MEALS_LABELS,
} from "@pages/Catering/Selfs/_shared/utils";
import { GetDetailAllSelfsFoodScheduleResponse } from "@pages/Catering/Selfs/AllSelfs/AllSelfDetail/helper/components/CateringAllSelfsFoodSchedule/@types/@cateringAllSelfsFoodSchedule";

import {
  AllVendorOrdersClosingRegistrationDrawerContentProps,
  AllVendorOrdersClosingRegistrationFormType,
} from "./@types/@allVendorOrdersClosingRegistrationDrawerContent";

const CREATE_HOLIDAY_SUCCESS_MSG = "تعطیلی با موفقیت ثبت شد.";

const MEAL_OPTIONS: IdTitle[] = Object.values(CATERING_FOOD_SCHEDULE_MEALS).map((id) => ({
  id,
  title: CATERING_FOOD_SCHEDULE_MEALS_LABELS[id],
}));

const AllVendorOrdersClosingRegistrationDrawerContent = ({
  onCloseDrawer,
  onSuccess,
}: AllVendorOrdersClosingRegistrationDrawerContentProps) => {
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
  const [form] = Form.useForm<AllVendorOrdersClosingRegistrationFormType>();

  //? ================================  Api Calls ================================
  const [
    getBranchByBusiness,
    {
      data: branchOptions,
      isLoading: isGetBranchByBusinessLoading,
      isSuccess: isGetBranchByBusinessSuccess,
    },
  ] = useLazyGetBranchByBusinessQuery();

  const [
    getCancelReasons,
    { data: cancelReasonsData, isFetching: isCancelReasonsDataLoading },
  ] = useLazyGetCancelReasonsAllQuery();

  const [getCateringSelfsList, { isLoading: isGetCateringSelfsListLoading }] =
    useGetCateringSelfsListMutation();

  const [getFoodsData, { isLoading: isFoodDataLoading }] =
    useGetDetailAllSelfsFoodScheduleMutation();

  const [
    createAllCancelledOrdersHoliday,
    { isLoading: isCreateAllCancelledOrdersHolidayLoading },
  ] = useCreateAllCancelledOrdersHolidayMutation();

  //* ================================ Util Functions ================================
  const handleReasonChange = () => {
    getCancelReasons();
  };

  const getBranchesHandler = () => {
    if (!isGetBranchByBusinessSuccess) {
      getBranchByBusiness({ businessIds: [4] }); // cto told
    }
  };

  const getSelfsByBranch = (branchCode?: number) => {
    const fetchKey = branchCode == null ? "" : String(branchCode);
    setIsSelfsSuccess(false);

    getCateringSelfsList({
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
      .then((value: GetCateringSelfsListResponse) => {
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
      .then((value: GetDetailAllSelfsFoodScheduleResponse) => {
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

  const clearSelfAndFoods = () => {
    form.setFieldsValue({
      self: null,
      foods: null,
    });
    setSelfData([]);
    setSelfFetchKey("");
    setIsSelfsSuccess(false);
    setSelectedItems((prev) => ({ ...prev, selfId: "" }));
    clearFoods();
  };

  const changeBranchHandler = (e?: number) => {
    const branchId = e != null && !Number.isNaN(Number(e)) ? e.toString() : "";

    setSelectedItems((prev) => ({
      ...prev,
      branchId,
      selfId: "",
    }));
    clearSelfAndFoods();

    if (!branchId) {
      return;
    }

    getSelfsByBranch(Number(branchId));
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

  const registerHolidayHandler = (values: AllVendorOrdersClosingRegistrationFormType) => {
    const cancelReasonId = Number(values?.reason?.code);
    const branchCode = Number(values?.unit?.code ?? selectedItems.branchId);
    const restaurantId = values?.self?.code ? Number(values.self.code) : undefined;

    const reqBody: CreateAllCancelledOrdersHolidayRequest =
      Array.isArray(values?.foods) && values.foods.length > 0
        ? values.foods.map((item) => ({
            branchCode,
            cancelReasonId,
            planId: Number(item?.code),
            reserveDate: selectedItems?.date,
            ...(restaurantId && { restaurantId }),
          }))
        : [
            {
              branchCode,
              cancelReasonId,
              reserveDate: selectedItems?.date,
              ...(restaurantId && { restaurantId }),
            },
          ];

    createAllCancelledOrdersHoliday(reqBody).unwrap().then(onCreateHolidaySuccess);
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
              loading={isCreateAllCancelledOrdersHolidayLoading}
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
            <Col span={24}>
              <CustomSelect
                name="unit"
                label="واحد دانشگاهی"
                allowClear
                options={branchOptions ?? []}
                placeholder="انتخاب کنید"
                isLoading={isGetBranchByBusinessLoading}
                form={form}
                onClick={getBranchesHandler}
                onChange={(e) => changeBranchHandler(e as number)}
                rules={[REQUIRED_RULE]}
                notFoundContent={
                  !isGetBranchByBusinessSuccess ? selectNotFoundContent : undefined
                }
              />
            </Col>
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
                onFocus={handleReasonChange}
                notFoundContent={
                  isCancelReasonsDataLoading
                    ? "در حال بارگذاری..."
                    : cancelReasonsData?.data?.length === 0
                      ? "هیچ موردی یافت نشد"
                      : null
                }
              />
            </Col>
            <Col span={24}>
              <CustomSelect
                name="self"
                label="سلف"
                allowClear
                options={selfData}
                placeholder="انتخاب کنید"
                isLoading={isGetCateringSelfsListLoading}
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

export default AllVendorOrdersClosingRegistrationDrawerContent;
