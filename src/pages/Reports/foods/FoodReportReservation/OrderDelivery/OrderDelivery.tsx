import { useEffect, useState } from "react";

import { Col, Form, Row } from "antd";
import dayjs from "dayjs";
import { AiOutlineClose, AiOutlineFileSearch } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { makeSearchParams } from "@infra/helpers/utils";
import { useLazyGetBasketPlanByUsernameQuery } from "@infra/states/redux/Apis/food/reservation/foodReservationApi";

import {
  DeliverBasketPlanDTO,
  GetBasketPlanByUsernameResponse,
  OrderDeliverySearchFOrmType,
} from "./@types/@orderDelivery";
import MainFoodOrderDeliveryTableModel from "./helper/model/MainFoodOrderDelivery/MainFoodOrderDeliveryTableModel";
import "./_orderDelivery.scss";

const PLEASE_ENTER_NATIONAL_CODE_OR_STUDENT_NUMBER_MSG =
  "لطفا کد ملی یا شماره دانشجویی را به صورت صحیح وارد کنید";

const OrderDelivery = () => {
  const [searchForm] = Form.useForm<OrderDeliverySearchFOrmType>();
  const [orderData, setOrderData] = useState<DeliverBasketPlanDTO[]>();
  const [isUserNameDisabled, setIsUserNameDisabled] = useState(false);
  const [isStudentNumberDisabled, setIsStudentNumberDisabled] = useState(false);
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
      />
      <CustomTable
        dataSource={orderData}
        columns={MainFoodOrderDeliveryTableModel()}
        loading={isUserPlanDataLoading}
        pagination={paginationConfig}
        {...TABLE_PROPS(orderData?.length || 0)}
      />
    </>
  );
};

export default OrderDelivery;
