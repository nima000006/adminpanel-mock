import { useCallback, useEffect, useState } from "react";

import { Col, Form, Row } from "antd";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import CustomCard from "@components/CustomCard/CustomCard";
import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { makeSearchParams } from "@infra/helpers/utils";
import { REPORT_FOOD_MY_RESERVATION_PAGE_ROUTE } from "@infra/router/routes/reports";
import { useGetMealAllQuery } from "@infra/states/redux/Apis/food/general/GeneralFoodApis";
import { useLazyGetMyRestaurantsQuery } from "@infra/states/redux/Apis/food/reservation/foodReservationApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import {
  FormDataType,
  GetMyRestaurantsResponse,
  MyRestaurantType,
} from "./@types/@myReservationOrderSearch";
import "./_myReservationOrderSearch.scss";

const MyReservationOrderSearch = () => {
  const [restaurantData, setRestaurantData] = useState<MyRestaurantType[] | []>([]);

  const [form] = Form.useForm();
  const navigate = useNavigate();

  useTitle({ text: "سفارش های من" });

  //? ================================  Api Calls ================================
  const [getMyRestaurants, { isFetching: isAllRestaurantDataLoading }] =
    useLazyGetMyRestaurantsQuery();

  const { data: mealData, isLoading: isMealDataLoading } = useGetMealAllQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getMyRestaurants().unwrap().then(getMyRestaurantsOnSuccess);
  }, []);

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

  const onFormSubmit = ({ self, date, meal }: FormDataType) => {
    navigate({
      pathname: REPORT_FOOD_MY_RESERVATION_PAGE_ROUTE,
      search: makeSearchParams({
        self: self?.title,
        mealId: meal?.value,
        selfId: self?.value,
        meal: meal?.title,
        date,
      }),
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomCard className="my-reservation-order-search-container">
      <Form onFinish={onFormSubmit} form={form}>
        <Row gutter={[16, 12]} className="row-container">
          <Col md={8} xs={24}>
            <CustomDatePicker
              label="تاریخ"
              name="date"
              form={form}
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col md={8} xs={24}>
            <CustomSelect
              options={restaurantData.map((item) => {
                return {
                  id: item?.id,
                  title: item?.title,
                };
              })}
              loading={isAllRestaurantDataLoading}
              name="self"
              label="سلف"
              form={form}
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col md={8} xs={24}>
            <CustomSelect
              options={mealData?.data?.map((item) => {
                return {
                  id: item.id,
                  title: item.name,
                };
              })}
              loading={isMealDataLoading}
              name="meal"
              label="وعده"
              form={form}
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col md={8} xs={8} push={8} className="btn-container">
            <Row>
              <CustomButton
                type="primary"
                className="search-btn-container"
                htmlType="submit"
              >
                جستجو
              </CustomButton>
            </Row>
          </Col>
        </Row>
      </Form>
    </CustomCard>
  );
};

export default MyReservationOrderSearch;
