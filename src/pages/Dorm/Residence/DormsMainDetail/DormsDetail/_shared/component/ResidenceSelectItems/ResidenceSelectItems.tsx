import { useEffect, useState } from "react";

import { Col, Form, Row } from "antd";

import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import { selectDefaultValueGenerator } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetDormResidenceBuildingListQuery,
  useLazyGetDormResidenceFloorListQuery,
  useLazyGetDormResidenceRoomListQuery,
} from "@infra/states/redux/Apis/dorm/residence/dormResidenceApi";

import { ResidenceSelectItemsFormType } from "./@types/@residenceSelectItems";
import { CARD_TYPE } from "../../utils/DormMainDetailUtils";
import {
  GetDormResidenceBuildingListResponse,
  GetDormResidenceBuildingListTypes,
} from "../ResidenceCardsData/sections/ResidenceCardsDataBuilding/@types/@residenceCardsDataBuilding";
import {
  GetDormResidenceFloorListResponse,
  GetDormResidenceFloorListTypes,
} from "../ResidenceCardsData/sections/ResidenceCardsDataFloor/@types/@residenceCardsDataFloor";
import {
  GetDormResidenceRoomListResponse,
  GetDormResidenceRoomListTypes,
} from "../ResidenceCardsData/sections/ResidenceCardsDataRoom/@types/@residenceCardsDataRoom";

const ResidenceSelectItems = () => {
  const [buildingList, setBuildingList] = useState<GetDormResidenceBuildingListTypes[]>(
    []
  );
  const [floorList, setFloorList] = useState<GetDormResidenceFloorListTypes[]>([]);

  const [roomList, setRoomList] = useState<GetDormResidenceRoomListTypes[]>([]);

  const [form] = Form.useForm<ResidenceSelectItemsFormType>();
  const { params: url, setSearchParams } = useQueryParams();

  const isFloor = url?.mode === CARD_TYPE?.floor;
  const isRoom = url?.mode === CARD_TYPE?.room;
  const isBed = url?.mode === CARD_TYPE?.bed;

  //? ================================  Api Calls ================================
  const [getBuildingList, { isFetching: isBuildingListLoading }] =
    useLazyGetDormResidenceBuildingListQuery();

  const [getFloorList, { isFetching: isFloorListLoading }] =
    useLazyGetDormResidenceFloorListQuery();

  const [getRoomList, { isFetching: isRoomListLoading }] =
    useLazyGetDormResidenceRoomListQuery();

  //? ================================ Effects ================================
  //floor tab
  useEffect(() => {
    if (url?.id) {
      getBuildingList({ dormitoryId_IN: +url?.id, firstResult: 0, maxResults: 2000 }) // we should set 0 and 2000 to get data
        .unwrap()
        .then(getBuildingListSuccess);
    }
    if (url?.buildingId && url?.buildingTitle) {
      form?.setFieldsValue({
        building: selectDefaultValueGenerator({
          id: +url.buildingId,
          title: url.buildingTitle,
        }),
      });
      getFloorList({ buildingId_IN: +url.buildingId, firstResult: 0, maxResults: 2000 }) //we should set 0 and 2000 to get data
        .unwrap()
        .then(getFloorListSuccess);
    } else {
      form.resetFields();
    }
  }, [url?.buildingId, url?.buildingTitle]);

  // room tab
  useEffect(() => {
    if (url?.floorId && url?.floorTitle) {
      form?.setFieldsValue({
        floor: selectDefaultValueGenerator({
          id: +url.floorId,
          title: url.floorTitle,
        }),
      });
      getRoomList({ floorId_IN: +url.floorId, firstResult: 0, maxResults: 2000 }) //we should set 0 and 2000 to get data
        .unwrap()
        .then(getRoomListSuccess);
    } else {
      form.resetFields(["floor", "room"]);
    }
  }, [url?.floorId, url?.floorTitle]);

  // bed tab
  useEffect(() => {
    if (url?.roomId && url?.roomTitle) {
      form?.setFieldsValue({
        room: selectDefaultValueGenerator({
          id: +url.roomId,
          title: url.roomTitle,
        }),
      });
    } else {
      form.resetFields(["room"]);
    }
  }, [url?.roomId, url?.roomTitle]);

  //* ================================ Util Functions ================================
  const getBuildingListSuccess = (value: GetDormResidenceBuildingListResponse) => {
    if (value?.status === 200) {
      setBuildingList(value?.data);
    }
  };

  const getFloorListSuccess = (value: GetDormResidenceFloorListResponse) => {
    if (value?.status === 200) {
      setFloorList(value?.data);
    }
  };

  const getRoomListSuccess = (value: GetDormResidenceRoomListResponse) => {
    if (value?.status === 200) {
      setRoomList(value?.data);
    }
  };

  const buildingIdHandler = (value: any) => {
    form?.resetFields(["room", "floor"]);
    // delete floor, room urls
    if (url?.floorId) {
      delete url.floorId;
      delete url?.floorTitle;
    }
    if (url?.roomId) {
      delete url.roomId;
      delete url.roomTitle;
    }

    const { building } = form.getFieldsValue();

    setSearchParams({
      ...url,
      buildingId: value?.toString(),
      buildingTitle: building?.title,
      buildingGenderId: building?.item?.genderId?.toString(),
      buildingGenderTitle: building?.item?.AssociationGender_title,
    });
    setRoomList([]);
  };

  const floorIdHandler = (value: any) => {
    form?.resetFields(["room"]);
    // delete room urls
    if (url?.roomId) {
      delete url.roomId;
    }

    if (url?.roomTitle) {
      delete url.roomTitle;
    }

    const { floor } = form.getFieldsValue();
    setSearchParams({ ...url, floorId: value?.toString(), floorTitle: floor?.title });
  };

  const roomIdHandler = (value: any) => {
    const { room } = form.getFieldsValue();
    setSearchParams({ ...url, roomId: value?.toString(), roomTitle: room?.title });
  };

  return (
    <Form form={form}>
      <Row gutter={[16, 16]}>
        {(isFloor || isRoom || isBed) && (
          <Col lg={6} md={8} sm={12} xs={24}>
            <CustomSelect
              options={buildingList}
              label="ساختمان"
              placeholder="انتخاب کنید"
              name="building"
              onChange={buildingIdHandler}
              form={form}
              loading={isBuildingListLoading}
            />
          </Col>
        )}
        {(isRoom || isBed) && (
          <Col lg={6} md={8} sm={12} xs={24}>
            <CustomSelect
              options={floorList}
              label="طبقه"
              placeholder="انتخاب کنید"
              name="floor"
              form={form}
              onChange={floorIdHandler}
              loading={isFloorListLoading}
            />
          </Col>
        )}
        {isBed && (
          <Col lg={6} md={8} sm={12} xs={24}>
            <CustomSelect
              options={roomList}
              label="اتاق"
              placeholder="انتخاب کنید"
              name="room"
              form={form}
              onChange={roomIdHandler}
              loading={isRoomListLoading}
            />
          </Col>
        )}
      </Row>
    </Form>
  );
};

export default ResidenceSelectItems;
