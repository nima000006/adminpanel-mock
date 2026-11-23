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
import { DORM_MODIFY_ROOM_PAGE_ROUTE } from "@infra/router/routes/dorm";
import { useLazyGetDormResidenceRoomListQuery } from "@infra/states/redux/Apis/dorm/residence/dormResidenceApi";

import {
  GetDormResidenceRoomListResponse,
  GetDormResidenceRoomListTypes,
} from "./@types/@residenceCardsDataRoom";
import DormRoomSingleCard from "../../../SingleCards/DormRoomSingleCard/DormRoomSingleCard";

const ResidenceCardsDataRoom = () => {
  const [roomList, setRoomList] = useState<GetDormResidenceRoomListTypes[]>([]);

  const { params: url } = useQueryParams();
  const navigate = useNavigate();

  //? ================================  Api Calls ================================
  const [getRoomList, { isFetching: isRoomListLoading }] =
    useLazyGetDormResidenceRoomListQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (url?.floorId) {
      getRoomList({ floorId_IN: +url?.floorId, firstResult: 0, maxResults: 2000 }) //we should set 0 and 2000 to get data
        .unwrap()
        .then(getRoomListSuccess);
    }
  }, [url?.floorId]);

  useEffect(() => {
    setRoomList([]);
  }, [url?.buildingId]);

  //* ================================ Util Functions ================================
  const getRoomListSuccess = (value: GetDormResidenceRoomListResponse) => {
    if (value?.status === 200) {
      setRoomList(value?.data);
    }
  };

  const createRoomHandler = () => {
    navigate({
      pathname: DORM_MODIFY_ROOM_PAGE_ROUTE,
      search: makeSearchParams({ ...url }),
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <Div loading={isRoomListLoading} className="room-section-container">
      <CustomDivider
        text="اتاق‌ها"
        extraContent={
          roomList?.length !== 0 && (
            <div className="action-count-container">
              <CustomTag># تعداد: {roomList?.length}</CustomTag>
              <CustomButton
                type="primary"
                icon={<AiOutlinePlus />}
                iconPlacement="end"
                onClick={createRoomHandler}
              >
                افزودن اتاق
              </CustomButton>
            </div>
          )
        }
      />

      {roomList?.length === 0 ? (
        <CustomEmpty
          description={
            url?.floorId ? (
              <div className="text-btn-container">
                <p className="bold-text">
                  هنوز اتاقی در این طبقه از ساختمان ایجاد نکرده‌اید!
                </p>
                <CustomButton
                  type="primary"
                  icon={<AiOutlinePlus />}
                  iconPlacement="end"
                  onClick={createRoomHandler}
                >
                  ایجاد اتاق
                </CustomButton>
              </div>
            ) : (
              <p className="dim-text">
                اتاقی برای نمایش وجود ندارد! <br /> لطفاً ساختمان و طبقه را مشخص بفرمایید.
              </p>
            )
          }
        />
      ) : (
        <Row gutter={[24, 16]}>
          {roomList?.map((item) => (
            <Col lg={6} md={8} sm={12} xs={24} key={item?.id}>
              <DormRoomSingleCard data={item} />
            </Col>
          ))}
        </Row>
      )}
    </Div>
  );
};

export default ResidenceCardsDataRoom;
