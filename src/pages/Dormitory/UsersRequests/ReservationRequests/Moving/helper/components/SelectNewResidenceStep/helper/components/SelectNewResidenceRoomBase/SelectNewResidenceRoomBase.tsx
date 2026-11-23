import { useMemo, useState } from "react";

import { Col, Form, Row } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { PiFunnelSimple } from "react-icons/pi";

import { CustomButton, CustomSearchBox, CustomSelect } from "@components/CustomInputs";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import CustomPagination from "@components/Renderers/CustomPagination/CustomPagination";
import { normalizeText } from "@infra/helpers/utils";
import { SelectNewResidenceRoomBaseProps } from "@pages/Dormitory/UsersRequests/ReservationRequests/Moving/helper/components/SelectNewResidenceStep/helper/components/SelectNewResidenceRoomBase/@types/@selectNewResidenceRoomBaseTypes";
import {
  MOCK_SELECT_NEW_RESIDENCE_ROOMS,
  MOCK_SELECT_NEW_RESIDENCE_ROOMS_TOTAL,
} from "@pages/Dormitory/UsersRequests/ReservationRequests/Moving/helper/components/SelectNewResidenceStep/helper/components/SelectNewResidenceRoomBase/helper/mock/mockSelectNewResidenceRooms";
import ConfirmRequestResidenceReservationCard from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/ReservationOpeningRequestsDetail/ConfirmRequestReservation/helper/components/ConfirmRequestResidenceReservation/helper/components/ConfirmRequestResidenceReservationCard/ConfirmRequestResidenceReservationCard";

const SelectNewResidenceRoomBase = ({ form }: SelectNewResidenceRoomBaseProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(1);

  const building = Form.useWatch("building", form);

  const MOCK_BUILDING_OPTIONS = [{ id: 1, title: "ساختمان اول" }];
  const MOCK_FLOOR_OPTIONS = [{ id: 1, title: "همکف" }];

  //* ================================ Util Functions ================================
  const changeBuildingHandler = () => {
    form.setFieldsValue({ floor: undefined });
  };

  const searchChangeHandler = (value: string) => {
    setSearchValue(value);
    setCurrentPage(1);
  };

  const pageChangeHandler = (page: number, size: number): void => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const selectRoomHandler = (roomId: number) => {
    setSelectedRoomId(roomId);
  };

  const filteredRooms = useMemo(() => {
    const normalizedSearch = normalizeText(searchValue.trim().toLowerCase());

    if (!normalizedSearch) {
      return MOCK_SELECT_NEW_RESIDENCE_ROOMS;
    }

    return MOCK_SELECT_NEW_RESIDENCE_ROOMS.filter((room) => {
      const searchableText = normalizeText(
        `${room.roomCode} ${room.roomTitle} ${room.roomType}`.toLowerCase()
      );

      return searchableText.includes(normalizedSearch);
    });
  }, [searchValue]);

  const paginatedRooms = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredRooms.slice(startIndex, startIndex + pageSize);
  }, [currentPage, filteredRooms, pageSize]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm text-[#262626]">
          <AiOutlineFilter size={16} />
          <span>فیلتر بر اساس موقعیت واحد اقامتی</span>
        </div>

        <Form form={form}>
          <Row gutter={[8, 8]}>
            <Col xs={24} sm={12} md={12}>
              <CustomSelect
                name="building"
                placeholder="ساختمان"
                options={MOCK_BUILDING_OPTIONS}
                form={form}
                hasVerticalLabel={false}
                isLoading={false}
                onChange={changeBuildingHandler}
              />
            </Col>
            <Col xs={24} sm={12} md={12}>
              <CustomSelect
                name="floor"
                placeholder="طبقه"
                options={MOCK_FLOOR_OPTIONS}
                form={form}
                hasVerticalLabel={false}
                isLoading={false}
                disabled={!building}
              />
            </Col>
          </Row>
        </Form>
      </div>

      <div className="flex flex-col gap-6">
        <CustomDivider
          text={`واحد های اقامتی(${MOCK_SELECT_NEW_RESIDENCE_ROOMS_TOTAL})`}
          extraContent={
            <div className="flex flex-wrap items-center gap-2">
              <CustomButton
                iconPlacement="start"
                loading={false}
                icon={<PiFunnelSimple />}
              >
                مرتب سازی قیمت
              </CustomButton>
              <CustomButton
                iconPlacement="start"
                loading={false}
                icon={<AiOutlineFilter />}
              >
                فیلتر پیشرفته
              </CustomButton>
            </div>
          }
        />

        <CustomSearchBox
          mode="client"
          hasUrlSync={false}
          placeholder="جستجو کد یا نام واحد اقامتی"
          onChange={searchChangeHandler}
          inputClassName="!rounded-xl !min-h-10"
        />

        {paginatedRooms.length ? (
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
            {paginatedRooms.map((item) => (
              <ConfirmRequestResidenceReservationCard
                key={item.id}
                residence={item}
                selected={selectedRoomId === item.id}
                onSelect={selectRoomHandler}
              />
            ))}
          </div>
        ) : (
          <CustomEmpty description="واحدی با این مشخصات یافت نشد" />
        )}

        <div className="flex justify-end">
          <CustomPagination
            current={currentPage}
            total={filteredRooms.length}
            pageSize={pageSize}
            onChange={pageChangeHandler}
            showSizeChanger
            showQuickJumper
            pageSizeOptions={["8", "10", "20", "50"]}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectNewResidenceRoomBase;
