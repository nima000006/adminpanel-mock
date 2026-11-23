import { useEffect, useState } from "react";

import { Col, Form, Modal, Row } from "antd";
import { useSearchParams } from "react-router";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import { selectDefaultValueGenerator } from "@infra/helpers/utils";
import { useLazyGetAllBranchesQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import {
  useLazyGetContractFoodsQuery,
  useLazyGetMyContractFoodsQuery,
} from "@infra/states/redux/Apis/food/contract/contractApi";
import { useGetMealAllQuery } from "@infra/states/redux/Apis/food/general/GeneralFoodApis";
import {
  useLazyGetAllRestaurantsQuery,
  useLazyGetMyRestaurantsQuery,
} from "@infra/states/redux/Apis/food/reservation/foodReservationApi";
import {
  useLazyGetAllContractsBySelfIdQuery,
  useLazyGetMyContractsBySelfIdQuery,
} from "@infra/states/redux/Apis/food/self/selfApis";
import {
  foodNotFoundContent,
  foodRequestType,
  foodStatusType,
  PLEASE_SELECT_A_CONTRACT_FIRST,
  PLEASE_SELECT_A_SELF_FIRST,
} from "@pages/Food/_shared/utils/sharedFoodUtils";
import { ContractsFoodDataType } from "@pages/Food/Contracts/AllContracts/AllContractDetail/helpers/components/Foods/@types/@foodsTab";
import { AllContractsListItem } from "@pages/Food/Contracts/AllContracts/AllContractList/@types/@allContractList";
import { GetAllContractsBySelfIdResponse } from "@pages/Food/FoodSchedules/AllFoodSchedules/AllFoodScheduleList/helper/drawer/AllSingleFoodScheduleListDrawerContent/@types/@allSingleFoodScheduleListDrawerContent";
import { RestaurantType } from "@pages/Food/Reservation/AllReservation/AllReservationOrderSearch/@types/@reservationOrderSearch";
import { MyRestaurantType } from "@pages/Food/Reservation/MyReservation/MyReservationOrderSearch/@types/@myReservationOrderSearch";

import { FoodScheduleAdvanceFilterModalProps } from "./@types/@foodSchedulefilterModal";
import { GetMyContractsBySelfIdResponse } from "../../MyFoodSchedules/MyFoodSchedulesList/helper/drawer/MySingleFoodScheduleListDrawerContent/@types/@mySingleFoodScheduleListDrawerContent";

import "./_foodScheduleFilterModal.scss";

const FoodScheduleAdvanceFilterModal = ({
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
}: FoodScheduleAdvanceFilterModalProps) => {
  const [isSubmitBtnDisabled, setIsSubmitBtnDisabled] = useState(true);
  const [searchParams] = useSearchParams();
  const [restaurantId, setRestaurantId] = useState<string | null>(null);
  const [contractData, setContractData] = useState<AllContractsListItem[] | []>([]);
  const [contractStateId, setContractStateId] = useState<string | null>(null);
  const [productData, setProductData] = useState<ContractsFoodDataType[] | []>([]);
  const [selfs, setSelfs] = useState<RestaurantType[] | MyRestaurantType[]>([]);

  const {
    date,
    foodId,
    foodName,
    contractId,
    contractName,
    mealId,
    mealName,
    selfId,
    selfName,
    requestTypeId,
    requestTypeName,
    statusId,
    statusName,
    branchCodeId,
    branchCodeName,
  } = Object.fromEntries([...searchParams]);

  //? ================================  Api Calls ================================
  const [
    getBranches,
    {
      data: branchesData,
      isLoading: isBranchesDataLoading,
      isSuccess: isBranchesDataFetched,
    },
  ] = useLazyGetAllBranchesQuery();

  const [
    getAllRestaurants,
    { isFetching: isAllRestaurantDataLoading, isSuccess: isAllSelfsFetched },
  ] = useLazyGetAllRestaurantsQuery();

  const [
    getMyRestaurants,
    { isFetching: isMyRestaurantDataLoading, isSuccess: isMySelfsFetched },
  ] = useLazyGetMyRestaurantsQuery();

  const [
    getMyContractsBySelfId,
    { isFetching: isMyContractsBySelfIdLoading, isSuccess: isMyContractsFetched },
  ] = useLazyGetMyContractsBySelfIdQuery();

  const [
    getMyContractFoods,
    { isFetching: isMyContractFoodsLoading, isSuccess: isMyContractFoodDataFetched },
  ] = useLazyGetMyContractFoodsQuery();

  const [
    getAllContractsBySelfId,
    { isFetching: isAllContractsBySelfIdLoading, isSuccess: isContractsFetched },
  ] = useLazyGetAllContractsBySelfIdQuery();

  const [
    getContractFoods,
    { isFetching: isContractFoodsLoading, isSuccess: isContractFoodDataFetched },
  ] = useLazyGetContractFoodsQuery();

  const { data: mealData, isLoading: isMealDataLoading } = useGetMealAllQuery();

  // effects

  //!
  // useEffect(() => {
  //   if (restaurantId && !contractId) {
  //     //&& !selfId
  //     form.setFieldsValue({
  //       contract: "",
  //       food: "",
  //     });
  //   }
  // }, [restaurantId]);

  //!
  // useEffect(() => {
  //   // When change the contract, the related food should changes
  //   if (contractId) {
  //     //&& !contractStateId
  //     form.setFieldsValue({
  //       food: "",
  //     });
  //   }
  // }, [contractId]);

  //? ================================ Effects ================================
  useEffect(() => {
    if (selfId) {
      setRestaurantId(selfId);
    }
    if (contractId) {
      setContractStateId(contractId);
    }

    form.setFieldsValue({
      date,
      ...(foodId
        ? {
            food: selectDefaultValueGenerator({
              id: +foodId,
              title: foodName,
            }),
          }
        : { food: undefined }),
      ...(mealId
        ? {
            meal: selectDefaultValueGenerator({
              id: +mealId,
              title: mealName,
            }),
          }
        : { meal: undefined }),
      ...(selfId
        ? {
            restaurantId: selectDefaultValueGenerator({
              id: +selfId,
              title: selfName,
            }),
          }
        : { self: undefined }),
      ...(requestTypeId
        ? {
            requestType: selectDefaultValueGenerator({
              id: +requestTypeId,
              title: requestTypeName,
            }),
          }
        : { requestType: undefined }),
      ...(contractId
        ? {
            contract: selectDefaultValueGenerator({
              id: +contractId,
              title: contractName,
            }),
          }
        : { contract: undefined }),
      ...(statusId
        ? {
            status: selectDefaultValueGenerator({
              id: +statusId,
              title: statusName,
            }),
          }
        : { status: undefined }),
      ...(branchCodeId
        ? {
            branchCode: selectDefaultValueGenerator({
              id: +branchCodeId,
              title: branchCodeName,
            }),
          }
        : { branchCode: undefined }),
    });
  }, [
    date,

    foodId,
    foodName,
    contractId,
    contractName,
    mealId,
    mealName,
    selfId,
    selfName,
    requestTypeId,
    requestTypeName,
    statusId,
    statusName,
    branchCodeId,
    branchCodeName,
  ]);

  // watch if nothing in the form then disable the submit btn
  Form.useWatch(
    ({ date, meal, requestType, contract, food, self, status, branchCode }) => {
      if (
        date ||
        meal?.title ||
        self?.title ||
        contract?.title ||
        food?.title ||
        status?.title ||
        branchCode?.title ||
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
  // onOpenContractsSelect
  const onOpenContractsSelectClickHandler = () => {
    if (!restaurantId) {
      return toast.warning(PLEASE_SELECT_A_SELF_FIRST, {
        toastId: PLEASE_SELECT_A_SELF_FIRST,
      });
    }
    if (pageType === "admin") {
      return getAllContractsBySelfId({ restaurantId })
        .unwrap()
        .then((res: GetAllContractsBySelfIdResponse) => {
          if (res?.status === 200) {
            setContractData(res?.data?.contractDtoList);
          } else {
            return toast.error((res?.data || res?.msg) as any, {
              toastId: (res?.data || res?.msg) as any,
            });
          }
        });
    }
    if (pageType === "manager") {
      return getMyContractsBySelfId({ restaurantId })
        .unwrap()
        .then((res: GetMyContractsBySelfIdResponse) => {
          if (res?.status === 200) {
            setContractData(res?.data?.contractDtoList);
          } else {
            return toast.error((res?.data || res?.msg) as any, {
              toastId: (res?.data || res?.msg) as any,
            });
          }
        });
    }
  };

  // onClickFoodDataClickHandler
  const onClickFoodDataClickHandler = () => {
    if (!contractStateId) {
      return toast.warning(PLEASE_SELECT_A_CONTRACT_FIRST, {
        toastId: PLEASE_SELECT_A_CONTRACT_FIRST,
      });
    }
    if (pageType === "admin") {
      return getContractFoods({ contractId: contractStateId })
        .unwrap()
        .then((res) => {
          if (res?.status === 200) {
            setProductData(res?.data);
          } else {
            return toast.error((res?.data || res?.msg) as any, {
              toastId: (res?.data || res?.msg) as any,
            });
          }
        });
    }
    if (pageType === "manager") {
      return getMyContractFoods({ contractId: contractStateId })
        .unwrap()
        .then((res) => {
          if (res?.status === 200) {
            setProductData(res?.data);
          } else {
            return toast.error((res?.data || res?.msg) as any, {
              toastId: (res?.data || res?.msg) as any,
            });
          }
        });
    }
  };

  //
  const onBranchSelectHandler = () => {
    if (!isBranchesDataFetched) {
      getBranches();
    }
  };

  //
  const onClickSelfsSelect = () => {
    if (pageType === "admin" && !isAllSelfsFetched) {
      return getAllRestaurants({ isDeleted: false })
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
      return getMyRestaurants()
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

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isModalOpen && (
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
                <Col md={6} xs={24}>
                  <CustomDatePicker
                    name="date"
                    form={form}
                    label="تاریخ برنامه غذایی"
                    // forceRerender={true}
                  />
                </Col>
              </Row>
              <CustomDivider text="اطلاعات مرتبط با غذا" />
              <Row gutter={[16, 16]}>
                <Col md={6} xs={12}>
                  <CustomSelect
                    placeholder="انتخاب کنید"
                    label="سلف"
                    name="self"
                    options={selfs}
                    form={form}
                    allowClear
                    loading={isAllRestaurantDataLoading || isMyRestaurantDataLoading}
                    onClick={onClickSelfsSelect}
                    notFoundContent={
                      !isAllSelfsFetched && !isMySelfsFetched
                        ? foodNotFoundContent
                        : undefined
                    }
                    onChange={(value) => {
                      setRestaurantId(value as string);
                      form.setFieldsValue({
                        contract: undefined,
                        food: undefined,
                      });
                    }}
                  />
                </Col>
                <Col md={6} xs={12}>
                  <CustomSelect
                    placeholder="انتخاب کنید"
                    label="قرارداد"
                    name="contract"
                    options={contractData}
                    form={form}
                    allowClear
                    loading={
                      isAllContractsBySelfIdLoading || isMyContractsBySelfIdLoading
                    }
                    notFoundContent={
                      !isContractsFetched && !isMyContractsFetched && restaurantId
                        ? foodNotFoundContent
                        : undefined
                    }
                    onChange={(value) => {
                      setContractStateId(value as string);
                      form.setFieldsValue({
                        food: undefined,
                      });
                    }}
                    onClick={onOpenContractsSelectClickHandler}
                  />
                </Col>
                <Col md={6} xs={12}>
                  <CustomSelect
                    placeholder="انتخاب کنید"
                    label="غذا"
                    name="food"
                    options={productData}
                    form={form}
                    allowClear
                    loading={isContractFoodsLoading || isMyContractFoodsLoading}
                    notFoundContent={
                      !isContractFoodDataFetched &&
                      !isMyContractFoodDataFetched &&
                      contractStateId
                        ? foodNotFoundContent
                        : undefined
                    }
                    onClick={onClickFoodDataClickHandler}
                  />
                </Col>
                <Col md={6} xs={12}>
                  <CustomSelect
                    placeholder="انتخاب کنید"
                    label="نوع"
                    name="requestType"
                    options={foodRequestType}
                    form={form}
                    allowClear
                    // onClick={onBranchSelectHandler}
                    // loading={isBranchesDataLoading}
                  />
                </Col>
                <Col md={6} xs={12}>
                  <CustomSelect
                    placeholder="انتخاب کنید"
                    label="وعده"
                    name="meal"
                    options={mealData?.data?.map((item) => {
                      return {
                        id: item.id,
                        title: item.name,
                      };
                    })}
                    isLoading={isMealDataLoading}
                    form={form}
                    allowClear
                  />
                </Col>
              </Row>

              <CustomDivider text="اطلاعات تکمیلی برنامه غذایی" />
              <Row gutter={[16, 16]}>
                <Col md={6} xs={12}>
                  <CustomSelect
                    placeholder="وضعیت"
                    label="وضعیت"
                    name="status"
                    options={foodStatusType}
                    form={form}
                    allowClear
                  />
                </Col>
              </Row>
              {pageType === "admin" && (
                <>
                  <CustomDivider text="اطلاعات واحد" />
                  <Row gutter={[16, 16]}>
                    <Col md={6} xs={12}>
                      <CustomSelect
                        placeholder="انتخاب کنید"
                        label="واحد دانشگاهی"
                        name="branchCode"
                        loading={isBranchesDataLoading}
                        options={branchesData ? branchesData : []}
                        form={form}
                        onClick={onBranchSelectHandler}
                        notFoundContent={
                          !isBranchesDataFetched ? foodNotFoundContent : undefined
                        }
                        allowClear
                      />
                    </Col>
                  </Row>
                </>
              )}

              <Row>
                <Col span={24}>
                  <CustomButton
                    danger={isDangerous}
                    htmlType={htmlType}
                    loading={isConfirmButtonLoading || isConfirmButtonDisable}
                    disabled={isSubmitBtnDisabled}
                    //   onClick={onConfirmClickHandler}
                    type="primary"
                    className="food-schedule-filter-submit-btn"
                  >
                    {confirmBtnText}
                  </CustomButton>
                </Col>
              </Row>
            </Form>
          </>
        </Modal>
      )}
    </>
  );
};

export default FoodScheduleAdvanceFilterModal;
