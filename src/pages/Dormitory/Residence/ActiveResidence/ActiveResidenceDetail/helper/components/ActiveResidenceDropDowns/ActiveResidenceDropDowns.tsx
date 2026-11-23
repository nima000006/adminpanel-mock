import { Col, Form, Row } from "antd";

import { CustomSelect } from "@components/CustomInputs";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGeActiveResidenceBuildingDropdownListQuery,
  useLazyGeActiveResidenceFloorDropdownListQuery,
  useLazyGeActiveResidenceUnitDropdownListQuery,
} from "@infra/states/redux/Apis/dormitory/residence/residenceApi";
import { ActiveResidenceDropDownsProps } from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceDropDowns/@types/@activeResidenceDropDownsTypes";
import { RESIDENCE_ACTIVE_DETAIL_TABS_TYPE } from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/util";

const ActiveResidenceDropDowns = ({ form }: ActiveResidenceDropDownsProps) => {
  const { params: url } = useQueryParams();

  const building = Form.useWatch("building", form);
  const floor = Form.useWatch("floor", form);

  //? ================================  Api Calls ================================
  // building dropdown list
  const [
    getBuildingDropdownList,
    { data: buildingDropdownList, isFetching: isBuildingDropdownListLoading },
  ] = useLazyGeActiveResidenceBuildingDropdownListQuery();

  // floor dropdown list
  const [
    getFloorDropdownList,
    { data: floorDropdownList, isFetching: isFloorDropdownListLoading },
  ] = useLazyGeActiveResidenceFloorDropdownListQuery();

  // unit dropdown list
  const [
    getUnitDropdownList,
    { data: unitDropdownList, isFetching: isUnitDropdownListLoading },
  ] = useLazyGeActiveResidenceUnitDropdownListQuery();

  //* ================================ Util Functions ================================
  const showBuilding =
    url?.status === RESIDENCE_ACTIVE_DETAIL_TABS_TYPE.floor ||
    url?.status === RESIDENCE_ACTIVE_DETAIL_TABS_TYPE.unit ||
    url?.status === RESIDENCE_ACTIVE_DETAIL_TABS_TYPE.bed;

  const showFloor =
    url?.status === RESIDENCE_ACTIVE_DETAIL_TABS_TYPE.unit ||
    url?.status === RESIDENCE_ACTIVE_DETAIL_TABS_TYPE.bed;

  const showUnit = url?.status === RESIDENCE_ACTIVE_DETAIL_TABS_TYPE.bed;

  const buildingOptions =
    buildingDropdownList?.content?.map((item) => ({
      id: item.uuid,
      title: item.title,
    })) ?? [];

  const floorOptions =
    floorDropdownList?.content?.map((item) => ({
      id: item.uuid,
      title: item.title,
    })) ?? [];

  const unitOptions =
    unitDropdownList?.content?.map((item) => ({
      id: item.uuid,
      title: item.title,
    })) ?? [];

  const dropdownListParams = {
    pageNumber: 0,
    pageSize: 100,
  };

  const buildingClickHandler = () => {
    if (!url?.residenceId) return;
    getBuildingDropdownList({
      uuid: url.residenceId,
      params: dropdownListParams,
    });
  };

  const floorClickHandler = () => {
    if (!building?.value) return;
    getFloorDropdownList({
      uuid: building.value,
      params: dropdownListParams,
    });
  };

  const unitClickHandler = () => {
    if (!floor?.value) return;
    getUnitDropdownList({
      uuid: floor.value,
      params: dropdownListParams,
    });
  };

  const buildingChangeHandler = () => {
    form.setFieldsValue({ floor: undefined, unit: undefined });
  };

  const floorChangeHandler = () => {
    form.setFieldsValue({ unit: undefined });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={form}>
      <Row gutter={[16, 16]}>
        {showBuilding ? (
          <Col lg={6} md={6} sm={12} xs={24}>
            <CustomSelect
              name="building"
              label="ساختمان"
              placeholder="انتخاب کنید"
              options={buildingOptions}
              isLoading={isBuildingDropdownListLoading}
              form={form}
              onClick={buildingClickHandler}
              onChange={buildingChangeHandler}
            />
          </Col>
        ) : null}

        {showFloor ? (
          <Col lg={6} md={6} sm={12} xs={24}>
            <CustomSelect
              name="floor"
              label="طبقه"
              placeholder="انتخاب کنید"
              options={floorOptions}
              isLoading={isFloorDropdownListLoading}
              form={form}
              disabled={!building}
              onClick={floorClickHandler}
              onChange={floorChangeHandler}
            />
          </Col>
        ) : null}

        {showUnit ? (
          <Col lg={6} md={6} sm={12} xs={24}>
            <CustomSelect
              name="unit"
              label="واحد اقامتی"
              placeholder="انتخاب کنید"
              options={unitOptions}
              isLoading={isUnitDropdownListLoading}
              form={form}
              disabled={!floor}
              onClick={unitClickHandler}
            />
          </Col>
        ) : null}
      </Row>
    </Form>
  );
};

export default ActiveResidenceDropDowns;
