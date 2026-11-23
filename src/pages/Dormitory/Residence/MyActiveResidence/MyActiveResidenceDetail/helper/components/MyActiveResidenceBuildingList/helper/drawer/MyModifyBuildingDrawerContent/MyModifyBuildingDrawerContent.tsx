import { useEffect, useState } from "react";

import { Form, UploadFile } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import { toast } from "react-toastify";

import { CustomButton } from "@components/CustomInputs";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomSteps from "@components/Renderers/CustomSteps/CustomSteps";
import {
  isImageFormatValid,
  isImageSizeValid,
  selectDefaultValueGenerator,
  stepStatusCreator,
} from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { UPLOAD_FILE_GENERAL } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { useLazyGetQualityGradeListQuery } from "@infra/states/redux/Apis/dormitory/basicInfo/basicInfoApi";
import {
  useCreateMyBuildingMutation,
  useCreateMyBuildingSecondStepMutation,
  useEditMyBuildingFirstStepMutation,
  useEditMyBuildingSecondStepMutation,
  useLazyGetMyActiveResidenceBuildingDetailFacilitySegmentQuery,
  useLazyGetMyActiveResidenceBuildingDetailQuery,
  useLazyGetMyResidenceDataQuery,
  useMyResidenceUploadFileMutation,
} from "@infra/states/redux/Apis/dormitory/residence/residenceApi";
import {
  FILE_TYPE_NOT_SUPPORTED,
  SIZE_EXCEED_ERROR,
} from "@infra/VARS/globalToasts/globalToasts";
import { GetQualityGradeListContent } from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/@types/@myActiveResidenceDetailTypes";
import {
  CreateBuildingDrawerContentFormType,
  MyModifyBuildingDrawerContentProps,
} from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceBuildingList/@types/@myActiveResidenceBuildingListTypes";
import MyBuildingInfoStepContent from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceBuildingList/helper/components/MyBuildingInfoStepContent/MyBuildingInfoStepContent";
import MyFacilityStepContent from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceBuildingList/helper/components/MyFacilityStepContent/MyFacilityStepContent";
import { getMyActiveResidenceBuildingDetailResponse } from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceBuildingList/helper/components/MyViewBuildingInfoSegmentContent/@types/@myViewBuildingInfoSegmentContentTypes";
import { getMyActiveResidenceBuildingDetailFacilitySegmentResponse } from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceBuildingList/helper/components/MyViewFacilityBuildingSegmentContent/@types/@myViewFacilityBuildingSegmentContentTypes";
import { onUploadFileSuccess } from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceUnitList/helper/drawer/MyModifyUnitDrawerContent/@types/@myModifyUnitDrawerContentTypes";
import { GetMyResidenceDataResponse } from "@pages/Dormitory/Residence/MyResidence/MyResidenceDetail/@types/@myResidenceDetail";

const MyModifyBuildingDrawerContent = ({
  closeDrawerHandler,
  getBuildingListHandler,
  id,
}: MyModifyBuildingDrawerContentProps) => {
  const { params: url, setSearchParams } = useQueryParams();
  const [current, setCurrent] = useState(0);
  const [firstImageList, setFirstImageList] = useState<UploadFile[]>([]);
  const [uploadFileUuids, setUploadFileUuids] = useState<string[]>([]);
  const [lat, setLat] = useState<number>(35.699739);
  const [lng, setLng] = useState<number>(51.338097);
  const [locationData, setLocationData] = useState<{
    provinceTitle?: string;
    cityTitle?: string;
  } | null>(null);
  const [checkedPlaces, setCheckedPlaces] = useState<string[]>([]);
  const [selectedAmenityUuids, setSelectedAmenityUuids] = useState<
    Record<string, string>
  >({});
  const [createdBuildingUuid, setCreatedBuildingUuid] = useState("");

  const [form] = Form.useForm<CreateBuildingDrawerContentFormType>();

  //? ================================  Api Calls ================================
  const [
    getQualityGradeList,
    { data: qualityGradeData, isFetching: isGetQualityGradeListLoading },
  ] = useLazyGetQualityGradeListQuery();

  // upload file
  const [uploadFile, { isLoading: isUploadFileLoading }] =
    useMyResidenceUploadFileMutation();

  // create building first step
  const [createMyBuilding, { isLoading: isCreateMyBuildingLoading }] =
    useCreateMyBuildingMutation();

  // create building second step
  const [createMyBuildingSecondStep, { isLoading: isCreateMyBuildingSecondStepLoading }] =
    useCreateMyBuildingSecondStepMutation();

  // edit building first step
  const [editMyBuildingFirstStep, { isLoading: isEditMyBuildingFirstStepLoading }] =
    useEditMyBuildingFirstStepMutation();

  // edit building second step
  const [editMyBuildingSecondStep, { isLoading: isEditMyBuildingSecondStepLoading }] =
    useEditMyBuildingSecondStepMutation();

  // get residence data (create mode defaults)
  const [getMyResidenceData, { isFetching: isGetMyResidenceDataLoading }] =
    useLazyGetMyResidenceDataQuery();

  // get building detail (edit mode)
  const [getMyActiveResidenceBuildingDetail, { isFetching: isGetBuildingDetailLoading }] =
    useLazyGetMyActiveResidenceBuildingDetailQuery();

  // get building amenities (edit mode)
  const [getBuildingFacilitySegment] =
    useLazyGetMyActiveResidenceBuildingDetailFacilitySegmentQuery();

  //? ================================ Effects ================================
  // quality grade
  useEffect(() => {
    getQualityGradeList({
      pageNumber: 0,
      pageSize: 100,
      accommodationType: url?.residenceType,
    });
  }, [url?.residenceType]);

  // residence data — create mode only
  useEffect(() => {
    if (id !== "-1" || !url?.residenceId) return;

    getMyResidenceData(url.residenceId)
      .unwrap()
      .then((response: GetMyResidenceDataResponse) => {
        setLocationData({
          provinceTitle: response?.provinceTitle,
          cityTitle: response?.cityTitle,
        });
        form.setFieldsValue({
          postalCode: response?.zipCode ?? "",
          phoneNumber: response?.phone ?? "",
          address: response?.faAddress || response?.address || "",
        });
        if (response?.latitude) setLat(response.latitude);
        if (response?.longitude) setLng(response.longitude);
      });
  }, [id, url?.residenceId]);

  // building detail — edit mode only
  useEffect(() => {
    if (id === "-1") return;

    getMyActiveResidenceBuildingDetail(id).unwrap().then(onGetBuildingDetailSuccess);
  }, [id]);

  // building amenities — edit mode only
  useEffect(() => {
    if (id === "-1") return;

    getBuildingFacilitySegment({
      uuid: id,
      params: {
        pageNumber: 0,
        pageSize: 100,
      },
    })
      .unwrap()
      .then(onGetBuildingAmenitiesSuccess);
  }, [id]);

  //* ================================ Util Functions ================================
  //  quality grade
  const getQualityHandler = () => {
    getQualityGradeList({
      pageNumber: 0,
      pageSize: 100,
      accommodationType: url?.residenceType,
    });
  };

  // quality options
  const qualityOptions =
    qualityGradeData?.content?.map((item: GetQualityGradeListContent) => ({
      id: item.uuid,
      title: item.title,
    })) ?? [];

  // success get building detail for edit mode
  const onGetBuildingDetailSuccess = (
    res: getMyActiveResidenceBuildingDetailResponse
  ) => {
    setLocationData({
      provinceTitle: res?.provinceTitle,
      cityTitle: res?.cityTitle,
    });

    form.setFieldsValue({
      buildingName: res?.title ?? "",
      ...(res?.qualityGrade && {
        quality: selectDefaultValueGenerator({
          id: res.qualityGrade.uuid,
          title: res.qualityGrade.title,
        }),
      }),
      area: res?.builtUpArea,
      greenSpaceArea: res?.livingArea,
      publicSpace: res?.commonArea,
      postalCode: res?.zipCode ?? "",
      phoneNumber: res?.phone ?? "",
      address: res?.address ?? "",
    });

    if (res?.latitude) setLat(res.latitude);
    if (res?.longitude) setLng(res.longitude);

    if (res?.images?.length) {
      setUploadFileUuids(res.images.map((image) => image.uuid).filter(Boolean));
      setFirstImageList(
        res.images.map((image) => ({
          uid: image.url,
          name: image.url,
          status: "done",
          url: image.url,
          response: { uuid: image.uuid },
        }))
      );
    }
  };

  // success get building amenities for edit mode
  const onGetBuildingAmenitiesSuccess = (
    res: getMyActiveResidenceBuildingDetailFacilitySegmentResponse
  ) => {
    const selectedTemplateUuids =
      res?.content?.map((item) => item.templateUuid).filter(Boolean) ?? [];

    setCheckedPlaces((prev) => [...new Set([...prev, ...selectedTemplateUuids])]);

    const amenityUuidMap =
      res?.content?.reduce(
        (acc, item) => {
          if (item?.templateUuid && item?.uuid) {
            acc[item.templateUuid] = item.uuid;
          }
          return acc;
        },
        {} as Record<string, string>
      ) ?? {};

    setSelectedAmenityUuids((prev) => ({ ...prev, ...amenityUuidMap }));

    const amenityFormValues = res?.content?.reduce(
      (acc, item) => {
        acc[item?.templateUuid] = [item?.templateUuid];
        acc[`quantity-${item?.templateUuid}`] = item?.quantity;
        acc[`description-${item?.templateUuid}`] = item?.description ?? "";
        return acc;
      },
      {} as Record<string, number | string | string[]>
    );

    form.setFieldsValue(amenityFormValues);
  };

  // upload file
  const onUploadFileSuccessHandler = ({ response }: onUploadFileSuccess) => {
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

  // upload file change
  const onUploadFileChange = (image: UploadChangeParam<UPLOAD_FILE_GENERAL>) => {
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
      .then((response) => onUploadFileSuccessHandler({ response }))
      .catch(() => {
        setFirstImageList([]);
        setUploadFileUuids([]);
      });
  };

  // back step handler
  const backStepHandler = () => {
    setCurrent(0);
  };

  // continue step handler
  const continueStepHandler = () => {
    // step 2 — create / edit building amenities
    if (current === 1) {
      form.validateFields().then(() => {
        const formValues = form.getFieldsValue(
          true
        ) as CreateBuildingDrawerContentFormType & Record<string, number | string>;

        const buildingUuid = id !== "-1" ? id : createdBuildingUuid;
        if (!buildingUuid) return;

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
          editMyBuildingSecondStep({
            uuid: buildingUuid,
            body: amenities,
          })
            .unwrap()
            .then(onEditBuildingSecondStepSuccess);
          return;
        }

        // create
        createMyBuildingSecondStep({
          uuid: buildingUuid,
          body: amenities.map(({ uuid: _amenityUuid, ...rest }) => rest),
        })
          .unwrap()
          .then(onCreateBuildingSecondStepSuccess);
      });
      return;
    }

    // step 1 — create / edit building
    form.validateFields().then((values) => {
      const remainingUploadFileUuids = firstImageList
        .map((file) => (file.response as { uuid?: string } | undefined)?.uuid)
        .filter((uuid): uuid is string => Boolean(uuid));

      const body = {
        uploadFileUuids:
          remainingUploadFileUuids.length > 0
            ? remainingUploadFileUuids
            : uploadFileUuids,
        faTitle: values?.buildingName ?? "",
        qualityGradeUuid: values?.quality?.value ?? "",
        builtUpArea: Number(values?.area ?? 0),
        livingArea: values?.greenSpaceArea ? Number(values.greenSpaceArea) : undefined,
        commonArea: values?.publicSpace ? Number(values.publicSpace) : 0,
        zipCode: values?.postalCode ?? "",
        phone: values?.phoneNumber ?? "",
        faAddress: values?.address ?? "",
        latitude: lat,
        longitude: lng,
      };

      // edit
      if (id !== "-1") {
        editMyBuildingFirstStep({
          uuid: id,
          body,
        })
          .unwrap()
          .then(onEditBuildingFirstStepSuccess);
        return;
      }

      // create
      if (!url?.residenceId) return;

      createMyBuilding({
        uuid: url.residenceId,
        body,
      })
        .unwrap()
        .then(onCreateBuildingSuccess);
    });
  };

  // reset amenity pagination so amenity-templates starts at pageNumber 0
  const goToFacilityStep = () => {
    const { amenityPage, amenityPageSize, ...rest } = url;
    setSearchParams(rest);
    setCurrent(1);
  };

  // on create building success
  const onCreateBuildingSuccess = (buildingUuid: string) => {
    setCreatedBuildingUuid(buildingUuid);
    goToFacilityStep();
    toast?.success("ساختمان با موفقیت ایجاد شد.", {
      toastId: "ساختمان با موفقیت ایجاد شد.",
    });
  };

  // on edit building first step success
  const onEditBuildingFirstStepSuccess = () => {
    goToFacilityStep();
    toast?.success("اطلاعات ساختمان با موفقیت ویرایش شد.", {
      toastId: "اطلاعات ساختمان با موفقیت ویرایش شد.",
    });
  };

  // on create building second step success
  const onCreateBuildingSecondStepSuccess = () => {
    closeDrawerHandler();
    getBuildingListHandler();
    toast?.success("امکانات ساختمان با موفقیت ثبت شد.", {
      toastId: "امکانات ساختمان با موفقیت ثبت شد.",
    });
  };

  // on edit building second step success
  const onEditBuildingSecondStepSuccess = () => {
    closeDrawerHandler();
    getBuildingListHandler();
    toast?.success("امکانات ساختمان با موفقیت ویرایش شد.", {
      toastId: "امکانات ساختمان با موفقیت ویرایش شد.",
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={form}>
      <CustomDrawerHeader
        title={id !== "-1" ? "ویرایش ساختمان" : "ایجاد ساختمان"}
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <>
            {!(id === "-1" && current === 1) && (
              <CustomButton
                onClick={current === 0 ? closeDrawerHandler : backStepHandler}
              >
                {current === 0 ? "انصراف" : "بازگشت"}
              </CustomButton>
            )}

            <CustomButton
              type="primary"
              onClick={continueStepHandler}
              loading={
                isCreateMyBuildingLoading ||
                isEditMyBuildingFirstStepLoading ||
                isCreateMyBuildingSecondStepLoading ||
                isEditMyBuildingSecondStepLoading
              }
            >
              {id === "-1" && current === 0
                ? "ثبت و ادامه"
                : id !== "-1" && current === 0
                  ? "ثبت تغییرات و ادامه"
                  : id !== "-1"
                    ? "ثبت و اعمال تغییرات"
                    : "ثبت و ایجاد ساختمان"}
            </CustomButton>
          </>
        }
      />

      <CustomSteps
        current={current}
        className="[&>div]:p-0!"
        items={[
          {
            status: stepStatusCreator(current, 0),
            title: "اطلاعات ساختمان",
          },
          {
            status: stepStatusCreator(current, 1),
            title: "امکانات",
          },
        ]}
      />

      {current === 0 && (
        <MyBuildingInfoStepContent
          form={form}
          firstImageList={firstImageList}
          setFirstImageList={setFirstImageList}
          lat={lat}
          lng={lng}
          setLat={setLat}
          setLng={setLng}
          qualityOptions={qualityOptions}
          isQualityLoading={isGetQualityGradeListLoading}
          getQualityHandler={getQualityHandler}
          isUploadFileLoading={isUploadFileLoading}
          onUploadFileChange={onUploadFileChange}
          loading={isGetMyResidenceDataLoading || isGetBuildingDetailLoading}
          data={locationData}
        />
      )}

      {current === 1 && (
        <MyFacilityStepContent
          form={form}
          checkedPlaces={checkedPlaces}
          setCheckedPlaces={setCheckedPlaces}
        />
      )}
    </Form>
  );
};
export default MyModifyBuildingDrawerContent;
