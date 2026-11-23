import { Col, Form, Row } from "antd";
import { AiOutlineFilter } from "react-icons/ai";

import { CustomSelect } from "@components/CustomInputs";
import {
  MANUAL_RESERVATION_MOCK_FILTER_BUILDINGS,
  MANUAL_RESERVATION_MOCK_FILTER_FLOORS,
  MANUAL_RESERVATION_MOCK_FILTER_UNITS,
} from "@pages/Dormitory/UsersRequests/ReservationRequests/ManualReservation/helper/mock/manualReservationAllocations";

import { AllocateLocationFilterProps } from "../../../@types/@allocateResidenceStep";

const AllocateLocationFilter = ({ allocationType }: AllocateLocationFilterProps) => {
  const form = Form.useFormInstance();
  const filterBuilding = Form.useWatch("filterBuilding", form);
  const filterFloor = Form.useWatch("filterFloor", form);

  const isBed = allocationType === "bed";
  const hasBuilding = Boolean(filterBuilding);
  const hasFloor = Boolean(filterFloor);

  //* ================================ Util Functions ================================

  const buildingChangeHandler = () => {
    form.setFieldsValue({
      filterFloor: undefined,
      filterUnit: undefined,
    });
  };

  const floorChangeHandler = () => {
    form.setFieldValue("filterUnit", undefined);
  };

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-center gap-2">
        <p className="text-neutral-10 body-regular m-0">
          {isBed ? "فیلتر بر اساس موقعیت تخت" : "فیلتر بر اساس موقعیت واحد اقامتی"}
        </p>
        <AiOutlineFilter size={16} className="text-neutral-10 shrink-0" />
      </div>

      <Row gutter={[8, 8]} className="w-full">
        <Col xs={24} sm={isBed ? 8 : 12}>
          <CustomSelect
            name="filterBuilding"
            form={form}
            options={MANUAL_RESERVATION_MOCK_FILTER_BUILDINGS}
            placeholder="ساختمان"
            hasVerticalLabel={false}
            allowClear
            className="mb-0!"
            size="middle"
            onChange={buildingChangeHandler}
          />
        </Col>

        <Col xs={24} sm={isBed ? 8 : 12}>
          <CustomSelect
            name="filterFloor"
            form={form}
            options={MANUAL_RESERVATION_MOCK_FILTER_FLOORS}
            placeholder="طبقه"
            hasVerticalLabel={false}
            disabled={!hasBuilding}
            allowClear
            className="mb-0!"
            size="middle"
            variant={hasBuilding ? "outlined" : "filled"}
            onChange={floorChangeHandler}
          />
        </Col>

        {isBed ? (
          <Col xs={24} sm={8}>
            <CustomSelect
              name="filterUnit"
              form={form}
              options={MANUAL_RESERVATION_MOCK_FILTER_UNITS}
              placeholder="واحد اقامتی"
              hasVerticalLabel={false}
              disabled={!hasFloor}
              allowClear
              className="mb-0!"
              size="middle"
              variant={hasFloor ? "outlined" : "filled"}
            />
          </Col>
        ) : null}
      </Row>
    </div>
  );
};

export default AllocateLocationFilter;
