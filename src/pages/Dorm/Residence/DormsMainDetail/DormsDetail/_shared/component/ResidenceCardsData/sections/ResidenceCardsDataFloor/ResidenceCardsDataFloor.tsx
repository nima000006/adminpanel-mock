import { useEffect, useState } from "react";

import { Col, Row } from "antd";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import { makeSearchParams } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORM_MODIFY_FLOOR_PAGE_ROUTE } from "@infra/router/routes/dorm";
import { useLazyGetDormResidenceFloorListQuery } from "@infra/states/redux/Apis/dorm/residence/dormResidenceApi";

import {
  GetDormResidenceFloorListResponse,
  GetDormResidenceFloorListTypes,
} from "./@types/@residenceCardsDataFloor";
import DormFloorSingleCard from "../../../SingleCards/DormFloorSingleCard/DormFloorSingleCard";

const ResidenceCardsDataFloor = () => {
  const [floorList, setFloorList] = useState<GetDormResidenceFloorListTypes[]>([]);

  const { params: url } = useQueryParams();
  const navigate = useNavigate();

  //? ================================  Api Calls ================================
  const [getFloorList, { isFetching: isFloorListLoading }] =
    useLazyGetDormResidenceFloorListQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (url?.buildingId) {
      getFloorList({ buildingId_IN: +url?.buildingId, firstResult: 0, maxResults: 2000 }) //we should set 0 and 2000 to get data
        .unwrap()
        .then(getFloorListSuccess);
    }
  }, [url?.buildingId]);

  //* ================================ Util Functions ================================
  const getFloorListSuccess = (value: GetDormResidenceFloorListResponse) => {
    if (value?.status === 200) {
      setFloorList(value?.data);
    }
  };

  const createFloorHandler = () => {
    navigate({
      pathname: DORM_MODIFY_FLOOR_PAGE_ROUTE,
      search: makeSearchParams({ ...url }),
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <Div loading={isFloorListLoading} className="floor-section-container">
      <CustomDivider
        text="طبقات"
        extraContent={
          floorList?.length !== 0 && (
            <div className="action-count-container">
              <CustomTag># تعداد: {floorList?.length}</CustomTag>
              <CustomButton
                type="primary"
                icon={<AiOutlinePlus />}
                iconPlacement="end"
                onClick={createFloorHandler}
              >
                افزودن طبقه
              </CustomButton>
            </div>
          )
        }
      />
      {floorList?.length === 0 ? (
        <CustomEmpty
          description={
            url?.buildingId ? (
              <div className="text-btn-container">
                <p className="bold-text">هنوز طبقه‌ای در این ساختمان ایجاد نکرده‌اید!</p>
                <CustomButton
                  type="primary"
                  icon={<AiOutlinePlus />}
                  iconPlacement="end"
                  onClick={createFloorHandler}
                >
                  ایجاد طبقه
                </CustomButton>
              </div>
            ) : (
              <p className="dim-text">
                طبقه ای برای نمایش وجود ندارد! <br /> لطفاً ساختمان را مشخص بفرمایید.
              </p>
            )
          }
        />
      ) : (
        <Row gutter={[24, 16]}>
          {floorList?.map((item) => (
            <Col lg={6} md={8} sm={12} xs={24} key={item?.id}>
              <DormFloorSingleCard data={item} />
            </Col>
          ))}
        </Row>
      )}
    </Div>
  );
};

export default ResidenceCardsDataFloor;
