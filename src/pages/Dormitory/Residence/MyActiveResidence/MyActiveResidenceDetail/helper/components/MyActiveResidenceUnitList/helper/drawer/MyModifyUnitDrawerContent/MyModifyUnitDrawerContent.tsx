import { useEffect, useState } from "react";

import { Col, Form, Row, UploadFile } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import { AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";

import {
  CustomButton,
  CustomCheckboxGroup,
  CustomInput,
  CustomInputNumber,
  CustomSelect,
  CustomTextArea,
  CustomUploader,
} from "@components/CustomInputs";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomPagination from "@components/Renderers/CustomPagination/CustomPagination";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import {
  isImageFormatValid,
  isImageSizeValid,
  selectDefaultValueGenerator,
} from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { UPLOAD_FILE_GENERAL } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import {
  useLazyGetAmenityTemplateListQuery,
  useLazyGetQualityGradeListQuery,
} from "@infra/states/redux/Apis/dormitory/basicInfo/basicInfoApi";
import {
  useCreateMyRoomMutation,
  useEditMyUnitMutation,
  useLazyGetAmenityCategoryQuery,
  useLazyGetMyDetailUnitQuery,
  useLazyGetMyRoomAmenitiesSelectAndValueQuery,
  useLazyGetUnitTypeDropDownListQuery,
  useMyResidenceUploadFileMutation,
} from "@infra/states/redux/Apis/dormitory/residence/residenceApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import {
  FILE_TYPE_NOT_SUPPORTED,
  SIZE_EXCEED_ERROR,
} from "@infra/VARS/globalToasts/globalToasts";
import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import {
  GetAmenityCategoryResponse,
  GetAmenityTemplateListResponse,
  GetQualityGradeListContent,
} from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/@types/@myActiveResidenceDetailTypes";
import {
  GetDetailUnitResponse,
  GetRoomAmenitiesSelectAndValueContent,
  GetRoomAmenitiesSelectAndValueResponse,
  MyModifyUnitDrawerContentFormType,
  MyModifyUnitDrawerContentProps,
} from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceUnitList/@types/@myActiveResidenceUnitListType";
import {
  onUploadFileSuccess,
  RoomAmenitySelectItem,
} from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceUnitList/helper/drawer/MyModifyUnitDrawerContent/@types/@myModifyUnitDrawerContentTypes";
import { FACILITY_TYPE } from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/MyUtil";

const MyModifyUnitDrawerContent = ({
  getUnitListHandler,
  closeDrawerHandler,
  id,
  floor,
  buildingTitle,
}: MyModifyUnitDrawerContentProps) => {
  const { params: url, setSearchParams } = useQueryParams();
  const [checkedPlaces, setCheckedPlaces] = useState<string[]>([]);
  const [selectedAmenityUuids, setSelectedAmenityUuids] = useState<
    Record<string, string>
  >({});
  const [roomAmenitiesSelectValue, setRoomAmenitiesSelectValue] = useState<
    GetRoomAmenitiesSelectAndValueContent[]
  >([]);
  const [amenityCategory, setAmenityCategory] = useState<IdTitleName[]>([]);
  const [amenityTemplate, setAmenityTemplate] =
    useState<GetAmenityTemplateListResponse>();
  const [viewDetailUnit, setViewDetailUnit] = useState<GetDetailUnitResponse>();
  const [form] = Form.useForm<MyModifyUnitDrawerContentFormType>();

  const selectedAmenityFilter = Form.useWatch("amenityFilter", form);

  const [firstImageList, setFirstImageList] = useState<UploadFile[]>([]);
  const [uploadFileUuids, setUploadFileUuids] = useState<string[]>([]);

  const currentPage = url?.amenityPage ? Number(url.amenityPage) : 1;
  const pageSize = url?.amenityPageSize ? Number(url.amenityPageSize) : 4;

  //? ================================  Api Calls ================================
  // quality grade
  const [
    getQualityGradeList,
    { data: qualityGradeData, isFetching: isGetQualityGradeListLoading },
  ] = useLazyGetQualityGradeListQuery();

  // unit type
  const [
    getUnitTypeDropDownList,
    { data: unitTypeDropDownListData, isFetching: isGetUnitTypeDropDownListLoading },
  ] = useLazyGetUnitTypeDropDownListQuery();

  // amenity category
  const [getAmenityCategoryList, { isFetching: isGetAmenityCategoryListLoading }] =
    useLazyGetAmenityCategoryQuery();

  // amenity template
  const [getAmenityTemplateList, { isFetching: isGetAmenityTemplateListLoading }] =
    useLazyGetAmenityTemplateListQuery();

  // room amenities select and value
  const [getMyRoomAmenitiesSelectAndValue] =
    useLazyGetMyRoomAmenitiesSelectAndValueQuery();

  // upload file
  const [uploadFile, { isLoading: isUploadFileLoading }] =
    useMyResidenceUploadFileMutation();

  // create room
  const [createMyRoom, { isLoading: isCreateMyRoomLoading }] = useCreateMyRoomMutation();

  // edit unit
  const [editMyUnit, { isLoading: isEditMyUnitLoading }] = useEditMyUnitMutation();

  // get detail unit
  const [getMyDetailUnit] = useLazyGetMyDetailUnitQuery();

  //? ================================ Effects ================================
  // quality grade
  useEffect(() => {
    getQualityGradeList({
      pageNumber: 0,
      pageSize: 100,
      accommodationType: url?.residenceType,
    });
  }, [url?.residenceType]);

  // unit type
  useEffect(() => {
    getUnitTypeDropDownList();
  }, []);

  // VIEW EDIT ROOM
  useEffect(() => {
    if (id !== "-1") {
      getMyDetailUnit(id)
        .unwrap()
        .then((res: GetDetailUnitResponse) => {
          setViewDetailUnit(res);
          form?.setFieldsValue({
            unitTitle: res?.faTitle ?? "",
            capacity: res?.capacity,
            area: res?.areaSquareMeters,
            desc: res?.faDescription ?? "",
            quality: selectDefaultValueGenerator({
              id: res.qualityGrade.uuid,
              title: res.qualityGrade.title,
            }),
            ...(res?.roomType && {
              unitType: selectDefaultValueGenerator({
                id: res?.roomType?.name,
                title: res?.roomType?.title,
              }),
            }),
          });
          if (res?.images?.length) {
            setUploadFileUuids(res.images.map((image) => image.uuid).filter(Boolean));
            setFirstImageList(
              res.images.map((image) => ({
                uid: image.url,
                name: image.url,
                status: "done" as const,
                url: image.url,
                response: { uuid: image.uuid },
              }))
            );
          }
        });
    }
  }, []);

  // room amenities select and value (edit mode)
  useEffect(() => {
    if (id === "-1") return;

    getMyRoomAmenitiesSelectAndValue({
      uuid: id,
      params: {
        pageNumber: url?.amenityPage ? Number(url.amenityPage) - 1 : 0,
        pageSize: url?.amenityPageSize ? Number(url.amenityPageSize) : 4,
      },
    })
      .unwrap()
      .then((res: GetRoomAmenitiesSelectAndValueResponse) => {
        setRoomAmenitiesSelectValue(res?.content ?? []);
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
      unitLevel: "ROOM",
      ...(selectedAmenityCategoryNames && {
        amenityCategories: selectedAmenityCategoryNames,
      }),
    })
      .unwrap()
      .then((res: GetAmenityTemplateListResponse) => {
        setAmenityTemplate(res);
      });
  }, [selectedAmenityFilter, url?.amenityPage, url?.amenityPageSize]);

  // apply selected room amenities onto template checkboxes (same handwriting as floor)
  useEffect(() => {
    if (!roomAmenitiesSelectValue.length) return;
    onGetRoomAmenitiesSelectAndValueSuccess(roomAmenitiesSelectValue);
  }, [roomAmenitiesSelectValue, amenityTemplate]);

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

  // success get room amenities select and value for edit mode
  const onGetRoomAmenitiesSelectAndValueSuccess = (
    content: GetRoomAmenitiesSelectAndValueContent[]
  ) => {
    const titleToTemplateUuid = new Map(
      (amenityTemplate?.content ?? []).map((item) => [item.title, item.uuid])
    );

    const resolvedAmenities = content
      .map((item) => {
        const roomItem = item as RoomAmenitySelectItem;
        // like floor: prefer templateUuid; room API type uses faTitle for fallback match
        const templateUuid =
          roomItem.templateUuid ||
          titleToTemplateUuid.get(roomItem.faTitle) ||
          titleToTemplateUuid.get(roomItem.title ?? "");

        if (!templateUuid) return null;

        return { templateUuid, item: roomItem };
      })
      .filter(
        (item): item is { templateUuid: string; item: RoomAmenitySelectItem } =>
          item !== null
      );

    if (!resolvedAmenities.length) return;

    const selectedTemplateUuids = resolvedAmenities.map(
      ({ templateUuid }) => templateUuid
    );

    setCheckedPlaces((prev) => [...new Set([...prev, ...selectedTemplateUuids])]);

    const amenityUuidMap = resolvedAmenities.reduce(
      (acc, { templateUuid, item }) => {
        if (templateUuid && item?.uuid && templateUuid !== item.uuid) {
          acc[templateUuid] = item.uuid;
        }
        return acc;
      },
      {} as Record<string, string>
    );

    setSelectedAmenityUuids((prev) => ({ ...prev, ...amenityUuidMap }));

    const amenityFormValues = resolvedAmenities.reduce(
      (acc, { templateUuid, item }) => {
        // Checkbox.Group value must be an array of selected option values
        acc[templateUuid] = [templateUuid];
        acc[`quantity-${templateUuid}`] = item?.quantity;
        acc[`description-${templateUuid}`] =
          item?.description ?? item?.faDescription ?? "";
        return acc;
      },
      {} as Record<string, number | string | string[]>
    );

    form.setFieldsValue(amenityFormValues);
  };

  // onUploadFileSuccess
  const onUploadFileSuccess = ({ response }: onUploadFileSuccess) => {
    if (!response?.uuid) return;

    setUploadFileUuids((prev) => [...prev, response.uuid]);
    setFirstImageList((prev) => {
      if (!prev.length) return prev;
      const next = [...prev];
      const lastIndex = next.length - 1;
      next[lastIndex] = {
        ...next[lastIndex],
        status: "done",
        response: { uuid: response.uuid },
      };
      return next;
    });
  };

  // onUploadFileChange
  const onUploadFileChange = (
    image: UploadChangeParam<UPLOAD_FILE_GENERAL>,
    imageListSetter?: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>,
    imageUuidsSetter?: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const formData = new FormData();
    formData.append("file", image?.file as any);

    const isFileFormatCorrect = isImageFormatValid({ fileFormat: image?.file?.type });
    if (!isFileFormatCorrect) {
      return toast.error(FILE_TYPE_NOT_SUPPORTED, {
        toastId: FILE_TYPE_NOT_SUPPORTED,
      });
    }

    const isUploadable = isImageSizeValid({ fileSize: image?.file?.size });
    if (!isUploadable) {
      return toast.error(SIZE_EXCEED_ERROR, {
        toastId: SIZE_EXCEED_ERROR,
      });
    }
    uploadFile(formData)
      .unwrap()
      .then((response) => onUploadFileSuccess({ response }))
      .catch(() => {
        imageListSetter?.([]);
        imageUuidsSetter?.([]);
      });
  };

  const modifyHandler = () => {
    form.validateFields().then((values) => {
      const formValues = values as MyModifyUnitDrawerContentFormType &
        Record<string, number | string>;

      const amenities = checkedPlaces.map((templateUuid) => ({
        templateUuid,
        quantity: Number(formValues?.[`quantity-${templateUuid}`] ?? 0),
        faDescription: String(formValues?.[`description-${templateUuid}`] ?? ""),
        ...(selectedAmenityUuids[templateUuid] && {
          uuid: selectedAmenityUuids[templateUuid],
        }),
      }));

      // edit — only send uuids of images still in the uploader (deleted ones excluded)
      if (id !== "-1") {
        const remainingUploadFileUuids = firstImageList
          .map((file) => (file.response as { uuid?: string } | undefined)?.uuid)
          .filter((uuid): uuid is string => Boolean(uuid));

        editMyUnit({
          uuid: id,
          body: {
            uploadFileUuids: remainingUploadFileUuids,
            faTitle: values?.unitTitle ?? "",
            roomType: values?.unitType?.value ?? "",
            qualityGradeUuid: values?.quality?.value ?? "",
            capacity: Number(values?.capacity ?? 0),
            areaSquareMeters: values?.area ? Number(values.area) : undefined,
            faDescription: values?.desc ?? "",
            amenities,
          },
        })
          .unwrap()
          .then(onModifyUnitSuccess);
        return;
      }

      // add
      if (!floor?.item?.id) return;

      createMyRoom({
        uuid: floor?.value ?? "",
        body: {
          uploadFileUuids,
          faTitle: values?.unitTitle ?? "",
          roomType: values?.unitType?.value ?? "",
          qualityGradeUuid: values?.quality?.value ?? "",
          capacity: Number(values?.capacity ?? 0),
          areaSquareMeters: values?.area ? Number(values.area) : undefined,
          faDescription: values?.desc ?? "",
          amenities: amenities.map(({ uuid: _amenityUuid, ...rest }) => rest),
        },
      })
        .unwrap()
        .then(onModifyUnitSuccess);
    });
  };

  // success add / edit
  const onModifyUnitSuccess = () => {
    closeDrawerHandler();
    getUnitListHandler();
    if (id === "-1") {
      toast?.success("واحد اقامتی با موفقیت ایجاد شد.", {
        toastId: "واحد اقامتی با موفقیت ایجاد شد.",
      });
    } else {
      toast?.success("واحد اقامتی با موفقیت ویرایش شد.", {
        toastId: "واحد اقامتی با موفقیت ویرایش شد.",
      });
    }
  };

  // quality
  const qualityOptions =
    qualityGradeData?.content?.map((item: GetQualityGradeListContent) => ({
      id: item.uuid,
      title: item.title,
    })) ?? [];

  // unit type
  const unitTypeOptions =
    unitTypeDropDownListData?.map((item: IdTitleName) => ({
      id: item.name,
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
        title={id === "-1" ? "ایجاد واحد اقامتی" : "ویرایش واحد اقامتی"}
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <>
            <CustomButton onClick={closeDrawerHandler}>انصراف</CustomButton>

            <CustomButton
              type="primary"
              onClick={modifyHandler}
              loading={isCreateMyRoomLoading || isEditMyUnitLoading}
            >
              {id === "-1" ? "ثبت و ایجاد واحد اقامتی" : "ثبت و اعمال تغییرات"}
            </CustomButton>
          </>
        }
      />

      <div>
        {id === "-1"
          ? "ایجاد واحد اقامتی برای اقامتگاه"
          : "ویرایش واحد اقامتی برای اقامتگاه"}{" "}
        <span className="text-neutral-13 font-bold">{url?.residenceTitle}</span> در
        ساختمان <span className="text-neutral-13 font-bold">{buildingTitle}</span> در طبقه{" "}
        <span className="text-neutral-13 font-bold">{floor?.title}</span>
      </div>

      {/* IMAGE UPLOADER */}
      <div className="attach-container">
        <CustomUploader
          fileList={firstImageList}
          setFileList={setFirstImageList}
          isDisabled={firstImageList.length >= 3}
          isReadOnly={false}
          multiple={true}
          maxCount={3}
          classNameOuterDiv="residence-upload-no-delete"
          uploaderText={
            <div className="image-attachment-container">
              <div className="upload-logo-main">
                <AiOutlinePlus />
              </div>

              <div className="upload-text-main">بارگذاری</div>
            </div>
          }
          hasUploaderIcon={false}
          isDataLoading={isUploadFileLoading}
          UploadSizeLimitConfig={{
            isActive: true,
            text: "حداکثر 5 مگابایت",
            size: 5,
            sizeUnit: "MB",
          }}
          validFileFormat={["image/png", "image/jpeg", "image/jpg"]}
          name="imageUploader"
          hasVerticalLabel={true}
          label="عکس واحد اقامتی / واحد"
          onChange={(e: any) =>
            onUploadFileChange(e, setFirstImageList, setUploadFileUuids)
          }
        />
      </div>

      {/* اطلاعات پایه */}
      <div className="flex flex-col gap-4">
        <CustomDivider text="اطلاعات پایه" />

        <Row gutter={[16, 16]}>
          {id !== "-1" ? (
            <SingleVerticalWithCol
              md={12}
              lg={12}
              xl={12}
              label="کد واحد اقامتی"
              value={viewDetailUnit?.roomNumber ?? ""}
            />
          ) : null}

          <Col lg={12} md={12} sm={12} xs={24}>
            <CustomInput
              name="unitTitle"
              label="عنوان واحد اقامتی"
              rules={[REQUIRED_RULE]}
            />
          </Col>

          <Col lg={12} md={12} sm={12} xs={24}>
            <CustomSelect
              name="unitType"
              label="نوع واحد اقامتی"
              placeholder="انتخاب کنید"
              options={unitTypeOptions}
              isLoading={isGetUnitTypeDropDownListLoading}
              rules={[REQUIRED_RULE]}
              form={form}
            />
          </Col>
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
                //  onClick={getQualityHandler}
                rules={[REQUIRED_RULE]}
                form={form}
              />
            </Col>
          )}

          <Col lg={12} md={12} sm={12} xs={24}>
            <CustomInput
              name="capacity"
              label="ظرفیت استاندارد واحد اقامتی"
              placeholder="مثلا 10 نفر"
              rules={[REQUIRED_RULE]}
            />
            <span className="text-neutral-7">
              اگر تعداد تخت‌های واحد اقامتی از ظرفیت تعیین‌شده بیشتر باشد، تخت‌های مازاد
              به‌عنوان ظرفیت اضافه واحد اقامتی در نظر گرفته می‌شوند.
            </span>
          </Col>

          <Col lg={12} md={12} sm={12} xs={24}>
            <CustomInputNumber
              name="area"
              label="مساحت"
              placeholder="به عنوان مثال 10 متر مربع"
              suffix="متر مربع"
            />
          </Col>

          <Col span={24}>
            <CustomTextArea
              label="توضیحات"
              name="desc"
              placeholder="در صورت نیاز می‌توانید توضیحات لازم را وارد نمایید..."
              maxLength={256}
              showCount
            />
          </Col>
        </Row>
      </div>

      <div className="flex flex-col gap-4">
        <CustomDivider text="امکانات واحد اقامتی" />
        <CustomAlert
          showIcon
          title=""
          description="امکانات واحد اقامتی را در صورت لزوم مشخص نمایید."
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
                      // اگر قبلاً وجود دارد، دوباره اضافه نکن
                      return prev.includes(item?.uuid) ? prev : [...prev, item?.uuid];
                    }

                    // اگر تیک برداشته شد، فقط همین آیتم را حذف کن
                    return prev.filter((value) => value !== item?.uuid);
                  });
                }}
                options={[
                  {
                    label: (
                      <div className="flex w-full items-center justify-between gap-2">
                        <div className="h5-regular font-bold">{item?.title}</div>

                        <div className="mx-auto">
                          <CustomTag className="right-2" color={facilityType.color}>
                            <Icon size={16} />
                            {facilityType.label}
                          </CustomTag>
                        </div>
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
            pageSizeOptions={["8", "10", "20", "50", "100"]}
          />
        </div>
      </div>
    </Form>
  );
};
export default MyModifyUnitDrawerContent;
