import { useEffect, useState } from "react";

import { Col, Form, Row } from "antd";

import {
  CustomCheckboxGroup,
  CustomInputNumber,
  CustomSelect,
  CustomTextArea,
} from "@components/CustomInputs";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomPagination from "@components/Renderers/CustomPagination/CustomPagination";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetAmenityTemplateListQuery } from "@infra/states/redux/Apis/dormitory/basicInfo/basicInfoApi";
import { useLazyGetAmenityCategoryQuery } from "@infra/states/redux/Apis/dormitory/residence/residenceApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import {
  GetAmenityCategoryResponse,
  GetAmenityTemplateListResponse,
} from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/@types/@myActiveResidenceDetailTypes";
import { MyFacilityStepContentProps } from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceBuildingList/helper/components/MyFacilityStepContent/@types/@myFacilityStepContentTypes";
import { FACILITY_TYPE } from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/MyUtil";

const MyFacilityStepContent = ({
  form,
  checkedPlaces,
  setCheckedPlaces,
}: MyFacilityStepContentProps) => {
  const { params: url, setSearchParams } = useQueryParams();
  const [amenityCategory, setAmenityCategory] = useState<IdTitleName[]>([]);
  const [amenityTemplate, setAmenityTemplate] =
    useState<GetAmenityTemplateListResponse>();

  const selectedAmenityFilter = Form.useWatch("amenityFilter", form);

  const currentPage = url?.amenityPage ? Number(url.amenityPage) : 1;
  const pageSize = url?.amenityPageSize ? Number(url.amenityPageSize) : 4;

  //? ================================  Api Calls ================================
  // amenity category
  const [getAmenityCategoryList, { isFetching: isGetAmenityCategoryListLoading }] =
    useLazyGetAmenityCategoryQuery();

  // amenity template
  const [getAmenityTemplateList, { isFetching: isGetAmenityTemplateListLoading }] =
    useLazyGetAmenityTemplateListQuery();

  //? ================================ Effects ================================
  // amenity template
  useEffect(() => {
    const selectedAmenityCategoryNames = (selectedAmenityFilter ?? [])
      .map((item: { value?: string }) => item?.value ?? item?.value)
      .filter(Boolean)
      .join(",");

    getAmenityTemplateList({
      pageNumber: url?.amenityPage ? Number(url.amenityPage) - 1 : 0,
      pageSize: url?.amenityPageSize ? Number(url.amenityPageSize) : 4,
      unitLevel: "BUILDING",
      ...(selectedAmenityCategoryNames && {
        amenityCategories: selectedAmenityCategoryNames,
      }),
    })
      .unwrap()
      .then((res: GetAmenityTemplateListResponse) => {
        setAmenityTemplate(res);
      });
  }, [selectedAmenityFilter, url?.amenityPage, url?.amenityPageSize]);

  // keep checkbox Form values in sync when template page changes
  useEffect(() => {
    if (!amenityTemplate?.content?.length || checkedPlaces.length === 0) return;

    const checkboxValues = amenityTemplate.content.reduce(
      (acc, item) => {
        if (checkedPlaces.includes(item.uuid)) {
          acc[item.uuid] = [item.uuid];
        }
        return acc;
      },
      {} as Record<string, string[]>
    );

    form?.setFieldsValue(checkboxValues);
  }, [amenityTemplate, checkedPlaces]);

  //* ================================ Util Functions ================================
  const getAmenityCategoryHandler = () => {
    getAmenityCategoryList()
      .unwrap()
      .then((res: GetAmenityCategoryResponse) => {
        setAmenityCategory(res);
      });
  };

  const amenityCategoryOptions =
    amenityCategory?.map((item: IdTitleName) => ({
      id: item?.name,
      title: item?.title,
    })) ?? [];

  const handlePageChange = (page: number, nextPageSize: number) => {
    setSearchParams({
      ...url,
      amenityPage: page?.toString(),
      amenityPageSize: (nextPageSize || 4).toString(),
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ *
  return (
    <div className="flex flex-col gap-4">
      {!url?.id ? (
        <CustomAlert
          showIcon
          title=""
          description="امکانات ساختمان را در صورت لزوم مشخص نمایید."
          type="info"
        />
      ) : null}
      <Row>
        <Col span={24}>
          <CustomSelect
            name="amenityFilter"
            label="فیلتر نوع امکانات"
            placeholder="انتخاب کنید"
            mode="multiple"
            options={amenityCategoryOptions}
            isLoading={isGetAmenityCategoryListLoading}
            onClick={getAmenityCategoryHandler}
            form={form}
          />
        </Col>
      </Row>

      {amenityTemplate?.content?.map((item) => {
        const facilityType =
          FACILITY_TYPE[item?.amenityCategory?.name as keyof typeof FACILITY_TYPE];
        const Icon = facilityType?.icon;
        const isChecked = checkedPlaces.includes(item?.uuid);

        return (
          <Div
            loading={isGetAmenityTemplateListLoading}
            key={item?.uuid}
            className={`bg-neutral-2 dormitory-facility-step-content-container rounded-lg p-4 ${isChecked ? "border border-[#1890FF]" : ""}`}
          >
            <CustomCheckboxGroup
              name={item?.uuid}
              label=""
              onChange={(e) => {
                const values = e.target.value as string[];
                const checked = values.includes(item?.uuid);

                setCheckedPlaces((prev) => {
                  if (checked) {
                    return prev.includes(item?.uuid) ? prev : [...prev, item?.uuid];
                  }

                  return prev.filter((value) => value !== item?.uuid);
                });
              }}
              options={[
                {
                  label: (
                    <div className="flex w-full items-center justify-between gap-2">
                      <div className="h5-regular font-bold">{item?.title}</div>

                      {facilityType && Icon ? (
                        <div className="mx-auto">
                          <CustomTag className="right-2" color={facilityType.color}>
                            <Icon size={16} />
                            {facilityType.label}
                          </CustomTag>
                        </div>
                      ) : null}
                    </div>
                  ),
                  value: item?.uuid,
                },
              ]}
            />
            {isChecked && (
              <div className="mb-4 flex flex-col gap-4">
                <CustomInputNumber
                  name={`quantity-${item?.uuid}`}
                  label="مقدار"
                  placeholder="وارد نمایید"
                  suffix="عدد"
                  min={1}
                  rules={[
                    REQUIRED_RULE,
                    {
                      type: "number",
                      min: 1,
                      message: "مقدار باید از صفر بیشتر باشد.",
                    },
                  ]}
                />

                <CustomTextArea
                  label="توضیحات"
                  name={`description-${item?.uuid}`}
                  placeholder="در صورت نیاز می‌توانید توضیحات لازم را وارد نمایید..."
                  showCount
                  maxLength={128}
                />
              </div>
            )}
          </Div>
        );
      })}

      <div className="mt-4 flex">
        <CustomPagination
          current={currentPage}
          total={amenityTemplate?.totalElements ?? 0}
          pageSize={pageSize}
          onChange={handlePageChange}
          showSizeChanger
          showQuickJumper
          pageSizeOptions={["4", "8", "10", "20", "50"]}
        />
      </div>
    </div>
  );
};
export default MyFacilityStepContent;
