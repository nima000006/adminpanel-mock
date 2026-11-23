import { useEffect, useState } from "react";

import { Col, Form, Row } from "antd";
import dayjs from "dayjs";
import { AiOutlineClose, AiOutlineFileSearch, AiOutlineSearch } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { makeSearchParams } from "@infra/helpers/utils";
import {
  useDeliverUserPlanByIdMutation,
  useLazyGetBasketPlanByUsernameQuery,
} from "@infra/states/redux/Apis/food/reservation/foodReservationApi";
import { foodDeliveryStatus } from "@pages/Food/Reservation/utils/ReservationUtils";

import {
  DeliverBasketPlanDTO,
  DeliverUserPlanByIdResponse,
  GetBasketPlanByUsernameResponse,
  OrderDeliverySearchFOrmType,
} from "./@types/@orderDelivery";
import MainFoodOrderDeliveryTableModel from "./helper/model/MainFoodOrderDelivery/MainFoodOrderDeliveryTableModel";

import "./_orderDelivery.scss";

const PLEASE_ENTER_NATIONAL_CODE_OR_STUDENT_NUMBER_MSG =
  "لطفا کد ملی یا شماره دانشجویی را به صورت صحیح وارد کنید";
const SUCCESS_FOOD_DELIVERY_MSG = "غذا با موفقیت تحویل شد";

const OrderDelivery = () => {
  const [searchForm] = Form.useForm<OrderDeliverySearchFOrmType>();
  const [orderData, setOrderData] = useState<DeliverBasketPlanDTO[]>();
  const [isUserNameDisabled, setIsUserNameDisabled] = useState(false);
  const [isStudentNumberDisabled, setIsStudentNumberDisabled] = useState(false);
  const [isConfirmationDeliveryModalOpen, setIsConfirmationDeliveryModalOpen] = useState({
    id: -1,
    isOpen: false,
    status: -1,
  });
  const [isFilteredMode, setIsFilteredMode] = useState(false);
  useTitle({
    breadcrumbItems: [
      {
        title: "سفارشات",
      },
      {
        title: "تحویل دهندگان غذا",
      },
    ],
  });

  //? ================================  Api Calls ================================
  const [getPlanByUserName, { isFetching: isUserPlanDataLoading }] =
    useLazyGetBasketPlanByUsernameQuery();

  const [deliverFoodById, { isLoading: isDeliveringFoodDataLoading }] =
    useDeliverUserPlanByIdMutation();

  //? ================================ Effects ================================

  useEffect(() => {
    searchForm.setFieldsValue({
      currentDate: dayjs(),
    });
  }, []);

  // inputs disable logic
  Form.useWatch(
    ({ username, studentNumber }: { username?: string; studentNumber?: string }) => {
      if (username) {
        setIsStudentNumberDisabled(true);
      } else {
        setIsStudentNumberDisabled(false);
      }

      if (studentNumber) {
        setIsUserNameDisabled(true);
      } else {
        setIsUserNameDisabled(false);
      }
    },
    searchForm
  );

  // useEffect(() => {
  //   if (userNameChange) {
  //     setIsStudentNumberDisabled(true);
  //   }
  //   if (studentNumberChange) {
  //     setIsUserNameDisabled(true);
  //   }
  // }, [studentNumberChange, userNameChange]);

  //* ================================ Util Functions ================================

  // get filtered List Data
  const getFilteredList = () => {
    searchForm?.submit();
    searchForm
      ?.validateFields()
      .then(
        ({ username, studentNumber }: { username?: string; studentNumber?: string }) => {
          if (username || studentNumber) {
            const query = makeSearchParams({
              ...(username && { username }),
              ...(studentNumber && { studentNumber }),
            });

            setIsFilteredMode(true);
            getPlanByUserName({ query }).unwrap().then(onGetPlanByUserNameSuccess);
          } else {
            toast.warning(PLEASE_ENTER_NATIONAL_CODE_OR_STUDENT_NUMBER_MSG, {
              toastId: PLEASE_ENTER_NATIONAL_CODE_OR_STUDENT_NUMBER_MSG,
            });
          }
        }
      )
      .catch(() => {
        toast.warning(PLEASE_ENTER_NATIONAL_CODE_OR_STUDENT_NUMBER_MSG, {
          toastId: PLEASE_ENTER_NATIONAL_CODE_OR_STUDENT_NUMBER_MSG,
        });
      });
  };

  //onClickDelivered
  const onClickDelivered = (id: number, status: number) => {
    setIsConfirmationDeliveryModalOpen({ id, isOpen: true, status });
  };

  //
  const onConfirmDeliveryModalHandler = () => {
    deliverFoodById({
      basketPlanId: isConfirmationDeliveryModalOpen?.id?.toString(),
      deliveryStatus: isConfirmationDeliveryModalOpen?.status,
    })
      .unwrap()
      .then(onDeliverFoodByIdSuccess);
  };

  //  onDeliverFoodByIdSuccess
  const onDeliverFoodByIdSuccess = (res: DeliverUserPlanByIdResponse) => {
    if (res?.status === 200) {
      toast.success(SUCCESS_FOOD_DELIVERY_MSG, { toastId: SUCCESS_FOOD_DELIVERY_MSG });
      setIsConfirmationDeliveryModalOpen({ id: -1, isOpen: false, status: -1 });
      getFilteredList();
    }
  };

  const getUnFilteredList = () => {
    setIsFilteredMode(false);
    setOrderData([]);
    // getPlanByUserName({ username: "" });};
  };

  // onGetPlanByUserNameSuccess
  const onGetPlanByUserNameSuccess = (res: GetBasketPlanByUsernameResponse) => {
    if (res?.status === 200) {
      setOrderData(res?.data?.basketPlansDtos);
    } else {
      return toast.error((res?.data || res?.msg) as any, {
        toastId: (res?.data || res?.msg) as any,
      });
    }
  };

  {
    /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  }
  return (
    <>
      {isConfirmationDeliveryModalOpen?.isOpen && (
        <ConfirmationModalWithContent
          isModalOpen={isConfirmationDeliveryModalOpen?.isOpen}
          closeModalHandler={() =>
            setIsConfirmationDeliveryModalOpen({ id: -1, isOpen: false, status: -1 })
          }
          onConfirmClickHandler={onConfirmDeliveryModalHandler}
          content={
            <CustomAlert
              type="warning"
              title={
                isConfirmationDeliveryModalOpen?.status === foodDeliveryStatus.delivered
                  ? "تحویل غذا"
                  : "عدم مراجعه"
              }
              description={
                isConfirmationDeliveryModalOpen?.status === foodDeliveryStatus.delivered
                  ? "آیا از تحویل غذا اطمینان دارید؟"
                  : "آیا از عدم مراجعه اطمینان دارید؟"
              }
              showIcon
              className="deliver-alert-modal"
            />
          }
          confirmBtnText={
            isConfirmationDeliveryModalOpen?.status === foodDeliveryStatus.delivered
              ? "تحویل غذا"
              : "عدم مراجعه"
          }
          isDangerous={
            isConfirmationDeliveryModalOpen?.status === foodDeliveryStatus.noShow
          }
          customClass="deliver-modal-container"
          showIcon={false}
        />
      )}

      <ToolBox
        rightSide={
          <Form
            className="food-order-delivery-toolbox-right-side-container"
            form={searchForm}
          >
            <Row gutter={[8, 8]}>
              <Col>
                <CustomDatePicker
                  name="currentDate"
                  disabled
                  form={searchForm}
                  hasFeedback={false}
                  hasNullInitiator={true}
                  hasVerticalLabel={false}
                  // value={dayjs()?.locale("fa")}
                />
              </Col>
              <Col>
                <CustomInput
                  label=""
                  className="national-code-input"
                  name="username"
                  prefix={<AiOutlineSearch className="search-icon" />}
                  onKeyDown={({ code }) => {
                    //currentTarget
                    if (code === "Enter" || code === "NumpadEnter") {
                      // getFilteredList(currentTarget?.value);
                      getFilteredList();
                    }
                  }}
                  placeholder="کد ملی یا کد اتباع"
                  hasVerticalLabel={false}
                  allowClear={
                    isFilteredMode && {
                      clearIcon: (
                        <AiOutlineClose
                          className="cross-icon"
                          onClick={getUnFilteredList}
                        />
                      ),
                    }
                  }
                  autoFocus
                  disabled={isUserNameDisabled}
                  // onClick={() => {
                  //   if (isUserNameDisabled) {
                  //     toast.warn(YOU_CAN_CLICK_ONLY_ONE_AT_A_TIME, {
                  //       toastId: YOU_CAN_CLICK_ONLY_ONE_AT_A_TIME,
                  //     });
                  //   }
                  // }}
                />
              </Col>
              <Col>
                <CustomInput
                  label=""
                  className="national-code-input"
                  name="studentNumber"
                  prefix={<AiOutlineFileSearch className="search-icon" />}
                  onKeyDown={({ code }) => {
                    //currentTarget
                    if (code === "Enter" || code === "NumpadEnter") {
                      // getFilteredList(currentTarget?.value);
                      getFilteredList();
                    }
                  }}
                  placeholder="شماره دانشجویی"
                  hasVerticalLabel={false}
                  allowClear={
                    isFilteredMode && {
                      clearIcon: (
                        <AiOutlineClose
                          className="cross-icon"
                          onClick={getUnFilteredList}
                        />
                      ),
                    }
                  }
                  autoFocus
                  disabled={isStudentNumberDisabled}
                  // onClick={() => {
                  //   if (isStudentNumberDisabled) {
                  //     toast.warn(YOU_CAN_CLICK_ONLY_ONE_AT_A_TIME, {
                  //       toastId: YOU_CAN_CLICK_ONLY_ONE_AT_A_TIME,
                  //     });
                  //   }
                  // }}
                />
              </Col>
              <Col>
                <CustomButton
                  type="primary"
                  loading={isUserPlanDataLoading}
                  onClick={getFilteredList}
                >
                  جستجو
                </CustomButton>
              </Col>
            </Row>
          </Form>
        }
        // leftSide={
        //   <SingleVerticalItem
        //     label=""
        //     value={new Date()?.toISOString()}
        //     isDate
        //     className="order-date-delivery"
        //     customDateFormat="YYYY / MM / DD"
        //   />
        // }
      />
      <CustomTable<DeliverBasketPlanDTO>
        dataSource={orderData}
        columns={MainFoodOrderDeliveryTableModel({ onClickDelivered })}
        loading={isDeliveringFoodDataLoading || isUserPlanDataLoading}
        pagination={paginationConfig}
        {...TABLE_PROPS(orderData?.length || 0)}
      />
    </>
  );
};

export default OrderDelivery;
