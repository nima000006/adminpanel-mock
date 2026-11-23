import { useEffect, useState } from "react";

import { Col, Form, Row } from "antd";
import { toast } from "react-toastify";

import {
  CustomButton,
  CustomCheckboxGroup,
  CustomInput,
  CustomInputNumber,
  CustomSelect,
  CustomTextArea,
} from "@components/CustomInputs";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomPagination from "@components/Renderers/CustomPagination/CustomPagination";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { selectDefaultValueGenerator } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetAmenityTemplateListQuery,
  useLazyGetQualityGradeListQuery,
} from "@infra/states/redux/Apis/dormitory/basicInfo/basicInfoApi";
import {
  useCreateFloorMutation,
  useEditFloorMutation,
  useLazyGetAmenityCategoryQuery,
  useLazyGetEditFloorQuery,
  useLazyGetFloorAmenitiesSelectAndValueQuery,
} from "@infra/states/redux/Apis/dormitory/residence/residenceApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import {
  GetAmenityCategoryResponse,
  GetAmenityTemplateListResponse,
  GetQualityGradeListContent,
} from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/@types/@activeResidenceDetailTypes";
import { ModifyFloorDrawerContentProps } from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceFloorList/@types/@activeResidenceFloorListTypes";
import {
  GetEditFloorResponse,
  GetFloorAmenitiesSelectAndValueResponse,
  ModifyFloorDrawerContentFormType,
} from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceFloorList/helper/drawer/ModifyFloorDrawerContent/@types/@modifyFloorDrawerContentTypes";
import {
  FACILITY_TYPE,
  FLOOR_NUMBER_OPTIONS,
} from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/util";

const ModifyFloorDrawerContent = ({
  getFloorListHandler,
  closeDrawerHandler,
  id,
  building,
}: ModifyFloorDrawerContentProps) => {
  const { params: url, setSearchParams } = useQueryParams();
  const [checkedPlaces, setCheckedPlaces] = useState<string[]>([]);
  const [selectedAmenityUuids, setSelectedAmenityUuids] = useState<
    Record<string, string>
  >({});
  const [amenityCategory, setAmenityCategory] = useState<IdTitleName[]>([]);
  const [amenityTemplate, setAmenityTemplate] =
    useState<GetAmenityTemplateListResponse>();
  const [viewEditFloor, setViewEditFloor] = useState<GetEditFloorResponse>();

  const [form] = Form.useForm<ModifyFloorDrawerContentFormType>();

  const selectedAmenityFilter = Form.useWatch("amenityFilter", form);

  const currentPage = url?.amenityPage ? Number(url.amenityPage) : 1;
  const pageSize = url?.amenityPageSize ? Number(url.amenityPageSize) : 4;

  //? ================================  Api Calls ================================
  // quality grade
  const [
    getQualityGradeList,
    { data: qualityGradeData, isFetching: isGetQualityGradeListLoading },
  ] = useLazyGetQualityGradeListQuery();

  // amenity category
  const [getAmenityCategoryList, { isFetching: isGetAmenityCategoryListLoading }] =
    useLazyGetAmenityCategoryQuery();

  // amenity template
  const [getAmenityTemplateList, { isFetching: isGetAmenityTemplateListLoading }] =
    useLazyGetAmenityTemplateListQuery();

  // get floor amenities select and value
  const [getFloorAmenitiesSelectAndValue] = useLazyGetFloorAmenitiesSelectAndValueQuery();

  // create floor
  const [createFloor, { isLoading: isCreateFloorLoading }] = useCreateFloorMutation();

  // edit floor
  const [editFloor, { isLoading: isEditFloorLoading }] = useEditFloorMutation();

  // get view edit floor
  const [getEditFloor] = useLazyGetEditFloorQuery();

  //? ================================ Effects ================================
  // GRADE
  useEffect(() => {
    getQualityGradeList({
      pageNumber: 0,
      pageSize: 100,
      accommodationType: url?.residenceType,
    });
  }, [url?.residenceType]);

  // VIEW EDIT FLOOR
  useEffect(() => {
    if (id !== "-1") {
      getEditFloor(id)
        .unwrap()
        .then((res: GetEditFloorResponse) => {
          setViewEditFloor(res);
          form.setFieldsValue({
            floorTitle: res?.title ?? "",
            ...(res?.qualityGrade && {
              quality: selectDefaultValueGenerator({
                id: res?.qualityGrade?.uuid,
                title: res?.qualityGrade?.title,
              }),
            }),
          });
        });
    }
  }, []);

  // floor amenities select and value (edit mode)
  useEffect(() => {
    if (id === "-1") return;

    getFloorAmenitiesSelectAndValue({
      uuid: id,
      params: {
        pageNumber: url?.amenityPage ? Number(url.amenityPage) - 1 : 0,
        pageSize: url?.amenityPageSize ? Number(url.amenityPageSize) : 4,
      },
    })
      .unwrap()
      .then((res: GetFloorAmenitiesSelectAndValueResponse) => {
        onGetFloorAmenitiesSelectAndValueSuccess(res);
      });
  }, [id, url?.amenityPage, url?.amenityPageSize]);

  // amenity template
  useEffect(() => {
    const selectedAmenityCategoryNames = (selectedAmenityFilter ?? [])
      .map((item) => item?.value ?? item?.value)
      .filter(Boolean)
      .join(",");

    getAmenityTemplateList({
      pageNumber: url?.amenityPage ? Number(url.amenityPage) - 1 : 0,
      pageSize: url?.amenityPageSize ? Number(url.amenityPageSize) : 4,
      unitLevel: "FLOOR",
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
  // category handler
  const getAmenityCategoryHandler = () => {
    getAmenityCategoryList()
      .unwrap()
      .then((res: GetAmenityCategoryResponse) => {
        setAmenityCategory(res);
      });
  };

  // add and edit handler
  const modifyHandler = () => {
    form?.validateFields().then((values) => {
      const formValues = values as ModifyFloorDrawerContentFormType &
        Record<string, number | string>;

      const amenities = checkedPlaces.map((templateUuid) => ({
        templateUuid,
        quantity: Number(formValues?.[`quantity-${templateUuid}`] ?? 0),
        faDescription: String(formValues?.[`description-${templateUuid}`] ?? ""),
        ...(selectedAmenityUuids[templateUuid] && {
          uuid: selectedAmenityUuids[templateUuid],
        }),
      }));

      // edit
      if (id !== "-1") {
        editFloor({
          uuid: id,
          body: {
            faTitle: values?.floorTitle ?? "",
            qualityGradeUuid: values?.quality?.value ?? "",
            amenities,
          },
        })
          .unwrap()
          .then(onModifyFloorSuccess);
        return;
      }

      // add
      createFloor({
        uuid: building?.value ?? "",
        body: {
          floorNumber: Number(values?.floor?.value ?? ""),
          faTitle: values?.floorTitle ?? "",
          qualityGradeUuid: values?.quality?.value ?? "",
          amenities: amenities.map(({ uuid: _amenityUuid, ...rest }) => rest),
        },
      })
        .unwrap()
        .then(onModifyFloorSuccess);
    });
  };

  // success add / edit
  const onModifyFloorSuccess = async () => {
    closeDrawerHandler();
    getFloorListHandler();
    if (id === "-1") {
      toast?.success("طبقه با موفقیت ایجاد شد.", {
        toastId: "طبقه با موفقیت ایجاد شد.",
      });
    } else {
      toast?.success("طبقه با موفقیت ویرایش شد.", {
        toastId: "طبقه با موفقیت ویرایش شد.",
      });
    }
  };

  // success get floor amenities select and value for edit mode
  const onGetFloorAmenitiesSelectAndValueSuccess = (
    res: GetFloorAmenitiesSelectAndValueResponse
  ) => {
    const selectedTemplateUuids =
      res?.content?.map((item) => item.templateUuid).filter(Boolean) ?? [];

    setCheckedPlaces((prev) => [...new Set([...prev, ...selectedTemplateUuids])]);

    const amenityUuidMap =
      res?.content?.reduce(
        (acc, item) => {
          if (item?.templateUuid && item?.uuid) {
            acc[item?.templateUuid] = item?.uuid;
          }
          return acc;
        },
        {} as Record<string, string>
      ) ?? {};

    setSelectedAmenityUuids((prev) => ({ ...prev, ...amenityUuidMap }));

    const amenityFormValues = res?.content?.reduce(
      (acc, item) => {
        // Checkbox.Group value must be an array of selected option values
        acc[item?.templateUuid] = [item?.templateUuid];
        acc[`quantity-${item?.templateUuid}`] = item?.quantity;
        acc[`description-${item?.templateUuid}`] = item?.description ?? "";
        return acc;
      },
      {} as Record<string, number | string | string[]>
    );

    form.setFieldsValue(amenityFormValues);
  };

  // quality
  const qualityOptions =
    qualityGradeData?.content?.map((item: GetQualityGradeListContent) => ({
      id: item.uuid,
      title: item.title,
    })) ?? [];

  // category
  const amenityCategoryOptions =
    amenityCategory?.map((item: IdTitleName) => ({
      id: item?.name,
      title: item?.title,
    })) ?? [];

  // page change
  const handlePageChange = (page: number, nextPageSize: number) => {
    setSearchParams({
      ...url,
      amenityPage: page?.toString(),
      amenityPageSize: (nextPageSize || 4).toString(),
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={form}>
      <CustomDrawerHeader
        title={id !== "-1" ? "ویرایش طبقه" : "ایجاد طبقه"}
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <>
            <CustomButton onClick={closeDrawerHandler}>انصراف</CustomButton>

            <CustomButton
              type="primary"
              onClick={modifyHandler}
              loading={isCreateFloorLoading || isEditFloorLoading}
            >
              {id !== "-1" ? "ثبت و اعمال تغییرات" : "ثبت و ایجاد طبقه"}
            </CustomButton>
          </>
        }
      />

      <div>
        {id === "-1" ? " ایجاد طبقه برای اقامتگاه" : "ویرایش طبقه برای اقامتگاه"}{" "}
        <span className="text-neutral-13 font-bold">{url?.residenceTitle}</span> در
        ساختمان <span className="text-neutral-13 font-bold">{building?.title}</span>
      </div>

      {/* اطلاعات پایه */}
      <div className="flex flex-col gap-4">
        <CustomDivider text="اطلاعات پایه" />

        <Row gutter={[16, 16]}>
          {id === "-1" ? (
            <Col lg={12} md={12} sm={12} xs={24}>
              <CustomSelect
                name="floor"
                label="طبقه"
                placeholder="انتخاب کنید"
                options={FLOOR_NUMBER_OPTIONS}
                loading={false}
                rules={[REQUIRED_RULE]}
                form={form}
              />
            </Col>
          ) : (
            <SingleVerticalWithCol
              md={12}
              lg={12}
              xl={12}
              label="طبقه"
              value={viewEditFloor?.floorNumber?.toString() ?? ""}
            />
          )}
          <Col lg={12} md={12} sm={12} xs={24}>
            <CustomInput
              name="floorTitle"
              label="عنوان طبقه"
              placeholder="این عنوان فقط در پنل ادمین قابل نمایش خواهد بود."
            />
          </Col>
          {/* طبق درخواست اقای صادقی به جای بولین برای هندل کردن این قسمت اگر لیست خالی بود
          این مورد را نشان دهیم */}

          {qualityGradeData?.content !== null &&
          qualityGradeData?.content?.length === 0 ? (
            <SingleVerticalWithCol
              md={12}
              lg={12}
              xl={12}
              label="درجه کیفی"
              value="فاقد درجه کیفی"
            />
          ) : (
            <Col lg={12} md={12} sm={12} xs={24}>
              <CustomSelect
                name="quality"
                label="درجه کیفی"
                placeholder="انتخاب کنید"
                options={qualityOptions}
                isLoading={isGetQualityGradeListLoading}
                rules={[REQUIRED_RULE]}
                form={form}
              />
            </Col>
          )}
        </Row>
      </div>

      <div className="flex flex-col gap-4">
        <CustomDivider text="امکانات طبقه" />
        <CustomAlert
          showIcon
          title=""
          description="امکانات طبقه را در صورت لزوم مشخص نمایید."
          type="info"
        />

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
    </Form>
  );
};
export default ModifyFloorDrawerContent;
