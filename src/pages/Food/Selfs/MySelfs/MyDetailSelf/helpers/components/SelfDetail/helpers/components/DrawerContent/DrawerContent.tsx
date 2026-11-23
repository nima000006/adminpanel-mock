import { useCallback, useEffect, useState } from "react";

import { Form, UploadFile } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import { AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomMap from "@components/CustomInputs/CustomMap/CustomMap";
import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import { isImageFormatValid, isImageSizeValid } from "@infra/helpers/utils";
import { UPLOAD_FILE_GENERAL } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import {
  useFoodUploadFileMutation,
  useGetProvinceQuery,
  useLazyGetCityQuery,
} from "@infra/states/redux/Apis/food/general/GeneralFoodApis";
import { useUpdateMyRestaurantMutation } from "@infra/states/redux/Apis/food/self/selfApis";
import {
  FILE_TYPE_NOT_SUPPORTED,
  SIZE_EXCEED_ERROR,
} from "@infra/VARS/globalToasts/globalToasts";
import { UPDATE_SELF_SUCCESS_MSG } from "@pages/Food/Selfs/helpers/utils/selfUtils";
import {
  CityType,
  GetCityResponse,
} from "@pages/Food/Vendors/AllVendors/AllVendorList/helper/drawer/AllVendorListDrawerContent/@types/@allVendorListDrawerContent";

import {
  FormDataType,
  onUploadFileSuccess,
  SelfDetailDrawerContentProps,
  UpdateMyRestaurantResponse,
} from "./@types/@drawerContent";
import FoodMySelfDetailsDrawerInfo from "./helpers/components/FoodMySelfDetailsDrawerInfo/FoodMySelfDetailsDrawerInfo";
import FoodMySelfDetailsDrawerInfoContact from "./helpers/components/FoodMySelfDetailsDrawerInfoContact/FoodMySelfDetailsDrawerInfoContact";
import "./_drawerContent.scss";

const SelfDetailDrawerContent = ({
  closeDrawerHandler,
  isDrawerOpen,
  selfDetailData,
  getSelfData,
}: SelfDetailDrawerContentProps) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [logoList, setLogoList] = useState<UploadFile[]>([]);
  const [bannerFileList, setBannerFileList] = useState<UploadFile[]>([]);
  const [lat, setLat] = useState<number>(35.699739);
  const [lng, setLng] = useState<number>(51.338097);
  const [logoName, setLogoName] = useState("");
  const [coverName, setCoverName] = useState("");
  const [cityList, setCityList] = useState<CityType[]>([]);

  const [form] = Form.useForm<FormDataType>();
  //? ================================  Api Calls ================================
  const [uploadFile, { isLoading: isUploadFileLoading }] = useFoodUploadFileMutation();

  const { data: getProvinceListData, isFetching: getProvinceListLoading } =
    useGetProvinceQuery();

  const [getCityList, { isFetching: getCityListLoading }] = useLazyGetCityQuery();

  const [updateSelf, { isLoading: isUpdateSelfLoading }] =
    useUpdateMyRestaurantMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (isDrawerOpen && selfDetailData) {
      form.setFieldsValue({
        activeMode: selfDetailData?.active,
        selfTitle: selfDetailData?.title,
        capacity: selfDetailData?.capacity,
        gender: {
          key: selfDetailData?.genderType?.toString(),
          value: selfDetailData?.genderType?.toString(),
          title:
            selfDetailData?.genderType === 0
              ? "آقایان"
              : selfDetailData?.genderType === 1
                ? "بانوان"
                : "مختلط",
          code: selfDetailData?.genderType,
          item: {
            id: selfDetailData?.genderType,
            title:
              selfDetailData?.genderType === 0
                ? "آقایان"
                : selfDetailData?.genderType === 1
                  ? "بانوان"
                  : "مختلط",
          },
        },
        adminName: selfDetailData?.managerFirstName,
        adminFamily: selfDetailData?.managerLastName,
        adminPersonalityCode: selfDetailData?.managerUserName,
        adminPhoneNumber: selfDetailData?.phone,
        selfDescription: selfDetailData?.description,
        selfRules: selfDetailData?.rules,
        province: {
          key: selfDetailData?.provinceStateId?.toString(),
          value: selfDetailData?.provinceStateId?.toString(),
          title: selfDetailData?.provinceStateName,
          code: selfDetailData?.provinceStateId,
          item: {
            id: selfDetailData?.provinceStateId,
            title: selfDetailData?.provinceStateName,
          },
        },
        city: {
          key: selfDetailData?.provinceId?.toString(),
          value: selfDetailData?.provinceId?.toString(),
          title: selfDetailData?.provinceName,
          code: selfDetailData?.provinceId,
          item: {
            id: selfDetailData?.provinceId,
            title: selfDetailData?.provinceName,
          },
        },
        postalCode: Number(selfDetailData?.postalCode),
        firstPhoneNumber: selfDetailData?.restaurantPhone,
        address: selfDetailData?.address,
      });

      if (selfDetailData?.logoName) {
        setLogoList([
          {
            uid: selfDetailData?.logoName,
            name: selfDetailData?.logoName,
            status: "done",
            url: selfDetailData?.logoName,
          },
        ]);
      } else {
        setLogoList([]);
      }
      if (selfDetailData?.coverName) {
        setBannerFileList([
          {
            uid: selfDetailData?.coverName,
            name: selfDetailData?.coverName,
            status: "done",
            url: selfDetailData?.coverName,
          },
        ]);
      } else {
        setBannerFileList([]);
      }

      setLogoName(selfDetailData?.logoTitle ? selfDetailData?.logoTitle : "");
      setCoverName(selfDetailData?.coverTitle ? selfDetailData?.coverTitle : "");

      setLat(selfDetailData?.latitude);
      setLng(selfDetailData?.longitude);
      getCityListHandler(selfDetailData?.provinceStateId?.toString());
    }
  }, []);

  //* ================================ Util Functions ================================
  const getCityListSuccess = async (value: GetCityResponse) => {
    if (value?.status === 200) {
      setCityList(value?.data);
    } else {
      return toast.error((value?.data || value?.msg) as any, {
        toastId: (value?.data || value?.msg) as any,
      });
    }
  };

  const getCityListHandler = (id: string) => {
    getCityList({ stateId: id }).unwrap().then(getCityListSuccess);
  };

  const updateSelfOnSuccess = (value: UpdateMyRestaurantResponse) => {
    if (value?.status === 200) {
      toast.success(UPDATE_SELF_SUCCESS_MSG, { toastId: UPDATE_SELF_SUCCESS_MSG });
      closeUpdateModalHandler();
      closeDrawerHandler();
      getSelfData(value?.data?.toString());
    }
  };

  const updateSelfOnError = () => {
    closeUpdateModalHandler();
  };

  const updateSelfHandler = () => {
    form.submit();
    form.validateFields().then((value: FormDataType) => {
      if (selfDetailData?.id) {
        updateSelf({
          active: value?.activeMode,
          address: value?.address,
          capacity: value?.capacity,
          description: value?.selfDescription,
          genderType: value?.gender?.code,
          latitude: lat,
          longitude: lng,
          managerFirstName: value?.adminName,
          managerLastName: value?.adminFamily,
          managerUserName: value?.adminPersonalityCode,
          phone: value?.adminPhoneNumber,
          postalCode: value?.postalCode?.toString(),
          provinceId: value?.city?.code,
          restaurantPhone: value?.firstPhoneNumber,
          rules: value?.selfRules,
          title: value?.selfTitle,
          id: selfDetailData?.id,
          logoName: logoName ? logoName : null,
          coverName: coverName ? coverName : null,
        })
          .unwrap()
          .then(updateSelfOnSuccess)
          .catch(updateSelfOnError);
      }
    });
  };

  // Other functions
  const openUpdateModalHandler = useCallback(() => {
    setIsUpdateModalOpen(true);
  }, []);

  const closeUpdateModalHandler = useCallback(() => {
    setIsUpdateModalOpen(false);
  }, []);

  const openDeleteModalHandler = useCallback(() => {
    setIsDeleteModalOpen(true);
  }, []);

  const closeDeleteModalHandler = useCallback(() => {
    setIsDeleteModalOpen(false);
  }, []);

  // onUploadFileSuccess
  const onUploadFileSuccess = async ({ imageSetter, response }: onUploadFileSuccess) => {
    if (response?.status === 200) {
      imageSetter?.(response?.data);
    }
  };

  // onUploadFileChange
  const onUploadFileChange = (
    image: UploadChangeParam<UPLOAD_FILE_GENERAL>,
    imageSetter: React.Dispatch<React.SetStateAction<string>>,
    imageSetterList: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>
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
      .then((response) => onUploadFileSuccess({ response, imageSetter }))
      .catch(() => {
        imageSetterList([]);
        imageSetter("");
      });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isUpdateModalOpen && (
        <ConfirmationModalWithContent
          title="ثبت تغییرات"
          isModalOpen={isUpdateModalOpen}
          confirmBtnText="ثبت تغییرات"
          backBtnText="انصراف"
          closeModalHandler={closeUpdateModalHandler}
          onConfirmClickHandler={updateSelfHandler}
          isConfirmButtonLoading={isUpdateSelfLoading}
          content={
            <div className="self-detail-modal-container">
              <p className="desc">آیا از ثبت تغییرات اطمینان دارید؟</p>
            </div>
          }
          showIcon={false}
        />
      )}
      {isDeleteModalOpen && (
        <ConfirmationModalWithContent
          title="حذف"
          isModalOpen={isDeleteModalOpen}
          confirmBtnText="حذف"
          backBtnText="انصراف"
          closeModalHandler={closeDeleteModalHandler}
          onConfirmClickHandler={() => {}}
          isDangerous={true}
          content={
            <div className="self-detail-modal-container">
              <p className="desc">آیا از حذف این آیتم اطمینان دارید؟</p>
            </div>
          }
          showIcon={false}
        />
      )}
      <Form
        className="self-detail-drawer-content-container"
        form={form}
        initialValues={{
          active: true,
        }}
        defaultChecked={true}
      >
        <CustomDrawerHeader
          title="ویرایش سلف"
          closeDrawerHandler={closeDrawerHandler}
          leftSideContent={
            <div className="self-detail-drawer-action-btns-container">
              <CustomSwitch
                defaultChecked={selfDetailData?.active}
                checkedChildren="فعال"
                unCheckedChildren="غیرفعال"
                valuePropName="activeMode"
              />
              <CustomButton
                type="primary"
                danger
                onClick={openDeleteModalHandler}
                className="drawer-action-btn"
                disabled
              >
                حذف
              </CustomButton>
              <CustomButton onClick={closeDrawerHandler} className="drawer-action-btn">
                انصراف
              </CustomButton>
              <CustomButton
                type="primary"
                onClick={openUpdateModalHandler}
                className="drawer-action-btn"
              >
                ثبت
              </CustomButton>
            </div>
          }
        />
        <div className="my-selfs-detail-drawer-content-container">
          <div className="self-information-container">
            <div className="uploader-container">
              <CustomUploader
                fileList={logoList}
                setFileList={setLogoList}
                isReadOnly={false}
                uploaderText={
                  <div className="my-self-detail-upload-text-container">
                    <div className="upload-text">لوگو</div>
                    <div className="upload-logo">
                      <AiOutlinePlus />
                    </div>
                  </div>
                }
                hasUploaderIcon={false}
                maxCount={1}
                isDataLoading={isUploadFileLoading}
                isDisabled={logoList?.length >= 1}
                UploadSizeLimitConfig={{
                  isActive: true,
                  text: "حداکثر 1 مگابایت",
                  size: 1,
                }}
                validFileFormat={["image/png", "image/jpeg", "image/jpg"]}
                name="logo"
                imageSetter={setLogoName}
                onChange={(e: any) => onUploadFileChange(e, setLogoName, setLogoList)}
              />
              <CustomUploader
                fileList={bannerFileList}
                setFileList={setBannerFileList}
                uploaderText={
                  <div className="my-self-detail-upload-text-container">
                    <div className="upload-text">بنر</div>
                    <div className="upload-logo">
                      <AiOutlinePlus />
                    </div>
                  </div>
                }
                hasUploaderIcon={false}
                isReadOnly={false}
                maxCount={1}
                isDataLoading={isUploadFileLoading}
                isDisabled={bannerFileList?.length >= 1}
                UploadSizeLimitConfig={{
                  isActive: true,
                  text: "حداکثر 1 مگابایت",
                  size: 1,
                }}
                validFileFormat={["image/png", "image/jpeg", "image/jpg"]}
                name="cover"
                imageSetter={setCoverName}
                onChange={(e: any) =>
                  onUploadFileChange(e, setCoverName, setBannerFileList)
                }
              />
            </div>
            <FoodMySelfDetailsDrawerInfo form={form} />
          </div>
          <div className="contact-information-container">
            <CustomDivider text="اطلاعات تماس" />
            <FoodMySelfDetailsDrawerInfoContact
              form={form}
              getProvinceListData={getProvinceListData}
              getProvinceListLoading={getProvinceListLoading}
              getCityListHandler={getCityListHandler}
              cityList={cityList}
              getCityListLoading={getCityListLoading}
            />
            <CustomMap lat={lat} lng={lng} setLat={setLat} setLng={setLng} />
          </div>
        </div>
      </Form>
    </>
  );
};

export default SelfDetailDrawerContent;
