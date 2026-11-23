import { useMemo, useState } from "react";

import { Col, Form, Row } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { PiFunnelSimple } from "react-icons/pi";

import { CustomButton, CustomSearchBox, CustomSelect } from "@components/CustomInputs";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import CustomPagination from "@components/Renderers/CustomPagination/CustomPagination";
import { normalizeText } from "@infra/helpers/utils";
import { SelectNewResidenceBedBaseProps } from "@pages/Dormitory/UsersRequests/ReservationRequests/Moving/helper/components/SelectNewResidenceStep/helper/components/SelectNewResidenceBedBase/@types/@selectNewResidenceBedBaseTypes";
import ConfirmRequestBedReservationCard from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/ReservationOpeningRequestsDetail/ConfirmRequestReservation/helper/components/ConfirmRequestBedReservation/helper/components/ConfirmRequestBedReservationCard/ConfirmRequestBedReservationCard";
import { MOCK_CONFIRM_REQUEST_BEDS } from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/ReservationOpeningRequestsDetail/ConfirmRequestReservation/helper/components/ConfirmRequestBedReservation/helper/mock/mockConfirmRequestBeds";

const SelectNewResidenceBedBase = ({ form }: SelectNewResidenceBedBaseProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [selectedBedId, setSelectedBedId] = useState<number | null>(7);

  const building = Form.useWatch("building", form);
  const floor = Form.useWatch("floor", form);

  const MOCK_BUILDING_OPTIONS = [{ id: 1, title: "ساختمان اول" }];
  const MOCK_FLOOR_OPTIONS = [{ id: 1, title: "همکف" }];
  const MOCK_UNIT_OPTIONS = [{ id: 1, title: "002،مستر روم" }];

  //* ================================ Util Functions ================================
  const changeBuildingHandler = () => {
    form.setFieldsValue({ floor: undefined, unit: undefined });
  };

  const changeFloorHandler = () => {
    form.setFieldsValue({ unit: undefined });
  };

  const searchChangeHandler = (value: string) => {
    setSearchValue(value);
    setCurrentPage(1);
  };

  const pageChangeHandler = (page: number, size: number): void => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const selectBedHandler = (bedId: number) => {
    setSelectedBedId(bedId);
  };

  // filter
  const filteredBeds = useMemo(() => {
    const normalizedSearch = normalizeText(searchValue.trim().toLowerCase());

    if (!normalizedSearch) {
      return MOCK_CONFIRM_REQUEST_BEDS;
    }

    return MOCK_CONFIRM_REQUEST_BEDS.filter((bed) => {
      const searchableText = normalizeText(
        `${bed.bedCode} ${bed.bedTitle} ${bed.bedPosition ?? ""}`.toLowerCase()
      );

      return searchableText.includes(normalizedSearch);
    });
  }, [searchValue]);

  // paginate
  const paginatedBeds = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredBeds.slice(startIndex, startIndex + pageSize);
  }, [currentPage, filteredBeds, pageSize]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm text-[#262626]">
          <AiOutlineFilter size={16} />
          <span>فیلتر بر اساس موقعیت تخت</span>
        </div>

        <Form form={form}>
          <Row gutter={[8, 8]}>
            <Col xs={24} sm={12} md={8}>
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
            <Col xs={24} sm={12} md={8}>
              <CustomSelect
                name="floor"
                placeholder="طبقه"
                options={MOCK_FLOOR_OPTIONS}
                form={form}
                hasVerticalLabel={false}
                isLoading={false}
                disabled={!building}
                onChange={changeFloorHandler}
              />
            </Col>
            <Col xs={24} sm={12} md={8}>
              <CustomSelect
                name="unit"
                placeholder="اتاق"
                options={MOCK_UNIT_OPTIONS}
                form={form}
                hasVerticalLabel={false}
                isLoading={false}
                disabled={!floor}
              />
            </Col>
          </Row>
        </Form>
      </div>

      <div className="flex flex-col gap-6">
        <CustomDivider
          text={`تخت ها(${90})`}
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
          placeholder="جستجو کد یا نام تخت"
          onChange={searchChangeHandler}
          inputClassName="!rounded-xl !min-h-10"
        />

        {paginatedBeds.length ? (
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
            {paginatedBeds.map((item) => (
              <ConfirmRequestBedReservationCard
                key={item.id}
                bed={item}
                selected={selectedBedId === item.id}
                onSelect={selectBedHandler}
              />
            ))}
          </div>
        ) : (
          <CustomEmpty description="تختی با این مشخصات یافت نشد" />
        )}

        <div className="flex justify-end">
          <CustomPagination
            current={currentPage}
            total={filteredBeds.length}
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

export default SelectNewResidenceBedBase;
