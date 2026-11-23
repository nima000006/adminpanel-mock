import { Col, Form, Row } from "antd";
import { PiFunnel } from "react-icons/pi";

import { CustomButton, CustomSelect } from "@components/CustomInputs";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { RESERVABLE_CAPACITY_TYPE } from "@pages/Dormitory/Admission/_shared/util";
import { CapacitiesFilterFormType } from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionStepsEditDetail/helper/components/AllAdmissionStepsEditDetailCapacitiesContent/@types/@allAdmissionStepsEditDetailCapacitiesContent";
import { AllAdmissionStepsEditDetailCapacitiesFiltersProps } from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionStepsEditDetail/helper/components/AllAdmissionStepsEditDetailCapacitiesContent/helper/components/AllAdmissionStepsEditDetailCapacitiesFilters/@types/@allAdmissionStepsEditDetailCapacitiesFilters";
import { hasActiveCapacitiesFilter } from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionStepsEditDetail/helper/components/AllAdmissionStepsEditDetailCapacitiesContent/helper/util";

const AllAdmissionStepsEditDetailCapacitiesFilters = ({
  mode,
  form,
  options,
}: AllAdmissionStepsEditDetailCapacitiesFiltersProps) => {
  const filterValues = Form.useWatch([], form) as CapacitiesFilterFormType | undefined;
  const hasFilter = hasActiveCapacitiesFilter(filterValues);
  const selectedBuildings = filterValues?.building ?? [];
  const isBuildingSelected = selectedBuildings.length > 0;
  const isBed = mode === RESERVABLE_CAPACITY_TYPE.bed;
  const isUnit = mode === RESERVABLE_CAPACITY_TYPE.unit;
  const isBuilding = mode === RESERVABLE_CAPACITY_TYPE.building;

  //* ================================ Util Functions ================================
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
      <Form form={form}>
        <Row gutter={[16, 16]}>
          <Col xl={6} lg={6} md={8} sm={12} xs={24}>
            <CustomSelect
              name="building"
              label="ساختمان"
              mode="multiple"
              form={form}
              maxTagCount="responsive"
              allowClear
              options={options.building}
              placeholder="انتخاب کنید"
              onChange={() => {
                form.setFieldsValue({ floor: undefined, unitTitle: undefined });
              }}
            />
          </Col>

          {(isBed || isUnit) && (
            <>
              <Col xl={6} lg={6} md={8} sm={12} xs={24}>
                <CustomSelect
                  name="floor"
                  label="طبقه"
                  mode="multiple"
                  form={form}
                  maxTagCount="responsive"
                  allowClear
                  options={options.floor ?? []}
                  placeholder="انتخاب کنید"
                  disabled={!isBuildingSelected}
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
                  options={options.unitTitle ?? []}
                  placeholder="انتخاب کنید"
                  disabled={!isBuildingSelected}
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
                  options={options.unitType ?? []}
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
                  options={options.qualityGrade}
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
                  options={options.bedCountInUnit ?? []}
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
                options={options.bedType ?? []}
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
                options={options.qualityGrade}
                placeholder="انتخاب کنید"
              />
            </Col>
          )}
        </Row>
      </Form>
    </div>
  );
};

export default AllAdmissionStepsEditDetailCapacitiesFilters;
