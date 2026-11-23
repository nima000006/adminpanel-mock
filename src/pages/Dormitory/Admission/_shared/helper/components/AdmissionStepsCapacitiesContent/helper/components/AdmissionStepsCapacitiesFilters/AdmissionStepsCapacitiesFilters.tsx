import { Col, Form, Row } from "antd";
import { PiFunnel } from "react-icons/pi";

import { CustomButton, CustomSelect } from "@components/CustomInputs";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { useLazyGetQualityGradeListQuery } from "@infra/states/redux/Apis/dormitory/basicInfo/basicInfoApi";
import {
  useLazyGeActiveResidenceBuildingDropdownListQuery,
  useLazyGeActiveResidenceFloorDropdownListQuery,
  useLazyGeActiveResidenceUnitDropdownListQuery,
  useLazyGetBedTypeQuery,
  useLazyGetUnitTypeDropDownListQuery,
} from "@infra/states/redux/Apis/dormitory/residence/residenceApi";
import { AdmissionStepsCapacitiesFiltersProps } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsCapacitiesContent/helper/components/AdmissionStepsCapacitiesFilters/@types/@admissionStepsCapacitiesFilters";
import {
  hasActiveCapacitiesFilter,
  RESERVABLE_CAPACITY_TYPE,
} from "@pages/Dormitory/Admission/_shared/util";

const AdmissionStepsCapacitiesFilters = ({
  form,
  admissionInfo,
}: AdmissionStepsCapacitiesFiltersProps) => {
  const filterValues = Form.useWatch([], form);

  const hasFilter = hasActiveCapacitiesFilter(filterValues);

  const isBuildingSelected = filterValues?.building?.code ? true : false;

  const isFloorSelected = filterValues?.floor?.code ? true : false;

  const isBed = admissionInfo?.saleUnitType?.name === RESERVABLE_CAPACITY_TYPE.bed;
  const isUnit = admissionInfo?.saleUnitType?.name === RESERVABLE_CAPACITY_TYPE.unit;
  const isBuilding =
    admissionInfo?.saleUnitType?.name === RESERVABLE_CAPACITY_TYPE.building;

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

  // unit type
  const [
    getUnitTypeDropDownList,
    { data: unitTypeDropDownListData, isFetching: isGetUnitTypeDropDownListLoading },
  ] = useLazyGetUnitTypeDropDownListQuery();

  // get quality grade list
  const [
    getQualityGradeList,
    { data: qualityGradeData, isFetching: isGetQualityGradeListLoading },
  ] = useLazyGetQualityGradeListQuery();

  // bed type
  const [getBedType, { data: bedTypeList, isFetching: isGetBedTypeLoading }] =
    useLazyGetBedTypeQuery();

  //* ================================ Util Functions ================================
  const buildingClickHandler = () => {
    if (!admissionInfo?.accommodationUuid) return;
    getBuildingDropdownList({
      uuid: admissionInfo?.accommodationUuid,
      params: {
        pageNumber: 0,
        pageSize: 100,
      },
    });
  };

  const buildingChangeHandler = (value: string) => {
    if (!value) return;
    getFloorDropdownList({
      uuid: value,
      params: {
        pageNumber: 0,
        pageSize: 100,
      },
    });

    form.setFieldsValue({ floor: undefined, unitTitle: undefined });
  };

  const unitChangeHandler = (value: string) => {
    if (!value) return;
    getUnitDropdownList({
      uuid: value,
      params: {
        pageNumber: 0,
        pageSize: 100,
      },
    });
    form.setFieldsValue({ unitTitle: undefined });
  };

  const unitTypeClickHandler = () => {
    getUnitTypeDropDownList();
  };

  const qualityGradeClickHandler = () => {
    if (admissionInfo?.managementType?.name) {
      getQualityGradeList({
        pageNumber: 0,
        pageSize: 100,
        accommodationType: admissionInfo?.managementType?.name,
      });
    }
  };

  const bedTypeClickHandler = () => {
    getBedType();
  };

  const clearFiltersHandler = () => {
    form.resetFields();
  };

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex flex-col gap-2">
      <ToolBox
        rightSide={
          <>
            <div className="text-neutral-10 flex items-center gap-2 text-sm">
              <PiFunnel size={16} />
              <span>فیلتر</span>
            </div>
            <CustomButton
              type="link"
              disabled={!hasFilter}
              onClick={clearFiltersHandler}
              className={!hasFilter ? "text-neutral-6!" : undefined}
            >
              پاک کردن فیلترها
            </CustomButton>
          </>
        }
      />
      <Row gutter={[16, 16]}>
        <Col xl={6} lg={6} md={8} sm={12} xs={24}>
          <CustomSelect
            name="building"
            label="ساختمان"
            form={form}
            maxTagCount="responsive"
            options={
              buildingDropdownList?.content?.map((item) => ({
                id: item.uuid,
                title: item.title,
              })) ?? []
            }
            placeholder="انتخاب کنید"
            onClick={buildingClickHandler}
            isLoading={isBuildingDropdownListLoading}
            onChange={(value) => buildingChangeHandler(value as string)}
          />
        </Col>

        {(isBed || isUnit) && (
          <>
            <Col xl={6} lg={6} md={8} sm={12} xs={24}>
              <CustomSelect
                name="floor"
                label="طبقه"
                form={form}
                maxTagCount="responsive"
                options={
                  floorDropdownList?.content?.map((item) => ({
                    id: item.uuid,
                    title: item.title,
                  })) ?? []
                }
                onChange={(value) => unitChangeHandler(value as string)}
                placeholder="انتخاب کنید"
                disabled={!isBuildingSelected}
                isLoading={isFloorDropdownListLoading}
              />
            </Col>
            <Col xl={6} lg={6} md={8} sm={12} xs={24}>
              <CustomSelect
                name="unitTitle"
                label="واحد اقامتی"
                mode="multiple"
                form={form}
                maxTagCount="responsive"
                allowClear
                options={
                  unitDropdownList?.content?.map((item) => ({
                    id: item.uuid,
                    title: item.title,
                  })) ?? []
                }
                isLoading={isUnitDropdownListLoading}
                placeholder="انتخاب کنید"
                disabled={!isBuildingSelected || !isFloorSelected}
              />
            </Col>
            <Col xl={6} lg={6} md={8} sm={12} xs={24}>
              <CustomSelect
                name="unitType"
                label="نوع واحد اقامتی"
                mode="multiple"
                form={form}
                maxTagCount="responsive"
                allowClear
                onClick={unitTypeClickHandler}
                options={unitTypeDropDownListData ?? []}
                isLoading={isGetUnitTypeDropDownListLoading}
                placeholder="انتخاب کنید"
              />
            </Col>
            <Col xl={6} lg={6} md={8} sm={12} xs={24}>
              <CustomSelect
                name="qualityGrade"
                label="درجه کیفی واحد اقامتی"
                mode="multiple"
                form={form}
                maxTagCount="responsive"
                allowClear
                onClick={qualityGradeClickHandler}
                options={
                  qualityGradeData?.content?.map((item) => ({
                    id: item.uuid,
                    title: item.title,
                  })) ?? []
                }
                isLoading={isGetQualityGradeListLoading}
                placeholder="انتخاب کنید"
              />
            </Col>
            <Col xl={6} lg={6} md={8} sm={12} xs={24}>
              <CustomSelect
                name="bedCountInUnit"
                label="تعداد تخت در واحد اقامتی"
                mode="multiple"
                form={form}
                maxTagCount="responsive"
                allowClear
                options={
                  Array.from({ length: 30 }, (_, index) => {
                    const bedCount = index + 1;
                    return { id: bedCount, title: String(bedCount) };
                  }) ?? []
                }
                placeholder="انتخاب کنید"
              />
            </Col>
          </>
        )}

        {isBed && (
          <Col xl={6} lg={6} md={8} sm={12} xs={24}>
            <CustomSelect
              name="bedType"
              label="نوع تخت"
              mode="multiple"
              form={form}
              maxTagCount="responsive"
              allowClear
              options={bedTypeList ?? []}
              onClick={bedTypeClickHandler}
              isLoading={isGetBedTypeLoading}
              placeholder="انتخاب کنید"
            />
          </Col>
        )}

        {isBuilding && (
          <Col xl={6} lg={6} md={8} sm={12} xs={24}>
            <CustomSelect
              name="qualityGrade"
              label="درجه کیفی ساختمان"
              mode="multiple"
              form={form}
              maxTagCount="responsive"
              allowClear
              options={
                qualityGradeData?.content?.map((item) => ({
                  id: item.uuid,
                  title: item.title,
                })) ?? []
              }
              onClick={qualityGradeClickHandler}
              placeholder="انتخاب کنید"
            />
          </Col>
        )}
      </Row>
    </div>
  );
};

export default AdmissionStepsCapacitiesFilters;
