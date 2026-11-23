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
import { ALL_FOOD_RESERVATION_TABLE_RESULT_ROUTE } from "@infra/router/routes/food";
import { useGetMealAllQuery } from "@infra/states/redux/Apis/food/general/GeneralFoodApis";
import { useLazyGetAllRestaurantsQuery } from "@infra/states/redux/Apis/food/reservation/foodReservationApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import {
  FormDataType,
  GetAllRestaurantsResponse,
  RestaurantType,
} from "./@types/@reservationOrderSearch";
import "./_allReservationOrderSearch.scss";

const AllReservationOrderSearch = () => {
  const [restaurantData, setRestaurantData] = useState<RestaurantType[] | []>([]);

  const [form] = Form.useForm();
  const navigate = useNavigate();

  useTitle({ text: "سفارشات" });

  //? ================================  Api Calls ================================
  const [getAllRestaurants, { isFetching: isAllRestaurantDataLoading }] =
    useLazyGetAllRestaurantsQuery();

  const { data: mealData, isLoading: isMealDataLoading } = useGetMealAllQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getAllRestaurants({ isDeleted: false }).unwrap().then(getAllRestaurantsOnSuccess);
  }, []);

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

  const onFormSubmit = ({ self, date, meal }: FormDataType) => {
    navigate({
      pathname: ALL_FOOD_RESERVATION_TABLE_RESULT_ROUTE,
      search: makeSearchParams({
        self: self?.children,
        mealId: meal?.value,
        selfId: self?.value,
        meal: meal?.children,
        date,
      }),
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomCard className="all-reservation-order-search-container">
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

export default AllReservationOrderSearch;
