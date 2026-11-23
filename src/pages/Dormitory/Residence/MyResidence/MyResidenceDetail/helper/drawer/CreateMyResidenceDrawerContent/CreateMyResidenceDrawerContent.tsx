import { useEffect, useState } from "react";

import { Form, UploadFile } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import { toast } from "react-toastify";

import { CustomButton } from "@components/CustomInputs";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomSteps from "@components/Renderers/CustomSteps/CustomSteps";
import {
  isImageFormatValid,
  isImageSizeValid,
  selectDefaultValueGenerator,
  stepStatusCreator,
} from "@infra/helpers/utils";
import { UPLOAD_FILE_GENERAL } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import {
  useEditMyResidenceFirstSegmentMutation,
  useEditMyResidenceSecondSegmentMutation,
  useMyResidenceUploadFileMutation,
} from "@infra/states/redux/Apis/dormitory/residence/residenceApi";
import {
  FILE_TYPE_NOT_SUPPORTED,
  SIZE_EXCEED_ERROR,
} from "@infra/VARS/globalToasts/globalToasts";
import { onUploadFileSuccess } from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceUnitList/helper/drawer/ModifyUnitDrawerContent/@types/@modifyUnitDrawerContentTypes";
import { CreateMyResidenceDrawerContentProps } from "@pages/Dormitory/Residence/MyResidence/MyResidenceDetail/helper/drawer/CreateMyResidenceDrawerContent/@types/@createMyResidenceDrawerContentProps";
import PlacesAroundResidenceStepContent from "@pages/Dormitory/Residence/MyResidence/MyResidenceDetail/helper/drawer/CreateMyResidenceDrawerContent/helper/components/PlacesAroundResidenceStepContent/PlacesAroundResidenceStepContent";
import { ResidenceInfoStepContentFormType } from "@pages/Dormitory/Residence/MyResidence/MyResidenceDetail/helper/drawer/CreateMyResidenceDrawerContent/helper/components/ResidenceInfoStepContent/@types/@residenceInfoStepContent";
import ResidenceInfoStepContent from "@pages/Dormitory/Residence/MyResidence/MyResidenceDetail/helper/drawer/CreateMyResidenceDrawerContent/helper/components/ResidenceInfoStepContent/ResidenceInfoStepContent";

const EDIT_VARIANTS = ["MyResidenceDetail"];

const CreateMyResidenceDrawerContent = ({
  closeDrawerHandler,
  variant,
  dataSource,
  getResidenceDataHandler,
}: CreateMyResidenceDrawerContentProps) => {
  const isEditMode = EDIT_VARIANTS.includes(variant) && Boolean(dataSource?.uuid);

  const [current, setCurrent] = useState(0);
  const [checkedPlaces, setCheckedPlaces] = useState<string[]>([]);
  const [selectedNearbyPlaceUuids, setSelectedNearbyPlaceUuids] = useState<
    Record<string, string>
  >({});
  const [lat, setLat] = useState<number>(dataSource?.latitude ?? 35.699739);
  const [lng, setLng] = useState<number>(dataSource?.longitude ?? 51.338097);
  const [firstImageList, setFirstImageList] = useState<UploadFile[]>([]);
  const [uploadFileUuids, setUploadFileUuids] = useState<string[]>([]);

  const [form] = Form.useForm<ResidenceInfoStepContentFormType>();

  //? ================================  Api Calls ================================
  // upload file
  const [uploadFile, { isLoading: isUploadFileLoading }] =
    useMyResidenceUploadFileMutation();

  // edit residence first segment
  const [editResidenceFirstSegment, { isLoading: isEditResidenceFirstSegmentLoading }] =
    useEditMyResidenceFirstSegmentMutation();

  // edit residence second segment
  const [editResidenceSecondSegment, { isLoading: isEditResidenceSecondSegmentLoading }] =
    useEditMyResidenceSecondSegmentMutation();

  //? ================================ Effects ================================
  // edit mode — fill form from residence detail
  useEffect(() => {
    if (!isEditMode || !dataSource) return;

    if (dataSource?.latitude) setLat(dataSource.latitude);
    if (dataSource?.longitude) setLng(dataSource.longitude);

    if (dataSource?.images?.length) {
      setUploadFileUuids(dataSource.images.map((image) => image.uuid).filter(Boolean));
      setFirstImageList(
        dataSource.images.map((image) => ({
          uid: image.url,
          name: image.url,
          status: "done",
          url: image.url,
          response: { uuid: image.uuid },
        }))
      );
    }

    form?.setFieldsValue({
      residenceName: dataSource?.faTitle || dataSource?.title || "",
      ...(dataSource?.accommodationType && {
        residenceType: selectDefaultValueGenerator({
          id: dataSource.accommodationType.name || dataSource.accommodationType.id,
          title: dataSource.accommodationType.title,
        }),
      }),
      ...(dataSource?.qualityGrade && {
        quality: selectDefaultValueGenerator({
          id: dataSource.qualityGrade.uuid,
          title: dataSource.qualityGrade.title,
        }),
      }),
      capacity: dataSource?.nominalCapacity,
      area: dataSource?.areaSquareMeters,
      greenSpaceArea: dataSource?.greenSpaceAreaSquareMeters,
      ...(dataSource?.businessId && {
        business: selectDefaultValueGenerator({
          id: dataSource.businessId,
          title: dataSource.businessName,
        }),
      }),
      ...(dataSource?.branchId && {
        branch: selectDefaultValueGenerator({
          id: dataSource.branchId,
          title: dataSource.branchName,
        }),
      }),
      postalCode: dataSource?.zipCode ?? "",
      phoneNumber: dataSource?.phone ?? "",
      ...(dataSource?.provinceId && {
        province: selectDefaultValueGenerator({
          id: dataSource.provinceId,
          title: dataSource.provinceTitle,
        }),
      }),
      ...(dataSource?.cityId && {
        city: selectDefaultValueGenerator({
          id: dataSource.cityId,
          title: dataSource.cityTitle,
        }),
      }),
      address: dataSource?.faAddress || dataSource?.address || "",
    });
  }, [isEditMode, dataSource]);

  // ================================ Handlers ================================ //

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

  // submit step 2 — nearby places
  const submitNearbyPlacesStep = () => {
    const formValues = form.getFieldsValue(true) as ResidenceInfoStepContentFormType &
      Record<string, string>;

    // edit mode
    if (isEditMode && dataSource?.uuid) {
      const body = checkedPlaces.map((templateUuid) => {
        const entityUuid = selectedNearbyPlaceUuids[templateUuid];

        return {
          templateUuid,
          faDescription: String(formValues?.[`address-${templateUuid}`] ?? ""),
          ...(entityUuid &&
            entityUuid !== templateUuid && {
              uuid: entityUuid,
            }),
        };
      });

      editResidenceSecondSegment({
        uuid: dataSource.uuid,
        body,
      })
        .unwrap()
        .then(onEditResidenceSecondSegmentSuccess);
      return;
    }

    // create mode
  };

  // continue step handler
  const continueStepHandler = () => {
    // step 2 — nearby places
    if (current === 1) {
      const addressFields = checkedPlaces.map((uuid) => `address-${uuid}`);

      if (addressFields.length === 0) {
        submitNearbyPlacesStep();
        return;
      }

      form?.validateFields(addressFields).then(submitNearbyPlacesStep);
      return;
    }

    // step 1 — create / edit residence info
    form?.validateFields().then((values) => {
      // edit mode
      if (isEditMode && dataSource?.uuid) {
        const remainingUploadFileUuids = firstImageList
          .map((file) => (file.response as { uuid?: string } | undefined)?.uuid)
          .filter((uuid): uuid is string => Boolean(uuid));

        const body = {
          uploadFileUuids:
            remainingUploadFileUuids.length > 0
              ? remainingUploadFileUuids
              : uploadFileUuids,
          faTitle: values?.residenceName ?? "",
          accommodationType: String(
            values?.residenceType?.value ?? values?.residenceType ?? ""
          ),
          qualityGradeUuid: String(values?.quality?.value ?? values?.quality ?? ""),
          nominalCapacity: Number(values?.capacity),
          businessId: Number(
            values?.business?.value ?? values?.business?.code ?? values?.business ?? 0
          ),
          branchId: Number(
            values?.branch?.value ?? values?.branch?.code ?? values?.branch ?? 0
          ),
          areaSquareMeters: Number(values?.area ?? 0),
          greenSpaceAreaSquareMeters: values?.greenSpaceArea
            ? Number(values.greenSpaceArea)
            : undefined,
          zipCode: values?.postalCode ?? "",
          phone: values?.phoneNumber ?? "",
          provinceId: Number(
            values?.province?.value ?? values?.province?.code ?? values?.province ?? 0
          ),
          cityId: Number(values?.city?.value ?? values?.city?.code ?? values?.city ?? 0),
          faAddress: values?.address ?? "",
          latitude: lat,
          longitude: lng,
        };

        editResidenceFirstSegment({
          uuid: dataSource.uuid,
          body,
        })
          .unwrap()
          .then(onEditResidenceFirstSegmentSuccess);
        return;
      }

      // create mode
      setCurrent(1);
    });
  };

  // on edit residence first segment success
  const onEditResidenceFirstSegmentSuccess = () => {
    setCurrent(1);
    getResidenceDataHandler?.();
    toast.success("اطلاعات اقامتگاه با موفقیت ویرایش شد.", {
      toastId: "اطلاعات اقامتگاه با موفقیت ویرایش شد.",
    });
  };

  // on edit residence second segment success
  const onEditResidenceSecondSegmentSuccess = () => {
    getResidenceDataHandler?.();
    closeDrawerHandler();
    toast.success("اماکن اطراف اقامتگاه با موفقیت ویرایش شد.", {
      toastId: "اماکن اطراف اقامتگاه با موفقیت ویرایش شد.",
    });
  };

  const backStepHandler = () => {
    setCurrent(0);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */}
  return (
    <Form form={form}>
      <CustomDrawerHeader
        title={variant === "MyResidenceDetail" ? "اصلاح اطلاعات" : "ایجاد اقامتگاه"}
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <>
            <CustomButton onClick={current === 0 ? closeDrawerHandler : backStepHandler}>
              {current === 0 ? "انصراف" : "بازگشت"}
            </CustomButton>

            <CustomButton
              type="primary"
              onClick={continueStepHandler}
              loading={
                isEditResidenceFirstSegmentLoading ||
                isEditResidenceSecondSegmentLoading ||
                isUploadFileLoading
              }
            >
              {current === 0
                ? isEditMode
                  ? "ثبت تغییرات و ادامه"
                  : "ثبت و ادامه"
                : variant === "MyResidenceDetail"
                  ? "اعمال تغییرات و ارسال درخواست"
                  : "تایید و ارسال درخواست"}
            </CustomButton>
          </>
        }
      />

      <div className="flex flex-col gap-10">
        {isEditMode ? (
          <CustomAlert
            type="warning"
            showIcon
            title={dataSource?.returnReason?.title}
            description={dataSource?.returnDescription}
          />
        ) : null}

        <CustomSteps
          current={current}
          className="[&>div]:p-0!"
          items={[
            {
              status: stepStatusCreator(current, 0),
              title: "اطلاعات اقامتگاه",
            },
            {
              status: stepStatusCreator(current, 1),
              title: "اماکن اطراف اقامتگاه",
            },
          ]}
        />

        {current === 0 && (
          <ResidenceInfoStepContent
            form={form}
            lat={lat}
            lng={lng}
            setLat={setLat}
            setLng={setLng}
            firstImageList={firstImageList}
            setFirstImageList={setFirstImageList}
            isUploadFileLoading={isUploadFileLoading}
            onUploadFileChange={onUploadFileChange}
          />
        )}

        {current === 1 && (
          <PlacesAroundResidenceStepContent
            form={form}
            dataSource={isEditMode ? dataSource : undefined}
            checkedPlaces={checkedPlaces}
            setCheckedPlaces={setCheckedPlaces}
            setSelectedNearbyPlaceUuids={setSelectedNearbyPlaceUuids}
          />
        )}
      </div>
    </Form>
  );
};

export default CreateMyResidenceDrawerContent;
