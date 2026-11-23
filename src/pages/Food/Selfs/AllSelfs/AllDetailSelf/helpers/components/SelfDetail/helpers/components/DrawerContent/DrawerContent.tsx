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
import { useUpdateAllRestaurantMutation } from "@infra/states/redux/Apis/food/self/selfApis";
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
  UpdateAllRestaurantResponse,
} from "./@types/@drawerContent";
import FoodAllSelfsDetailsDrawersInfo from "./helpers/components/FoodAllSelfsDetailsDrawersInfo/FoodAllSelfsDetailsDrawersInfo";
import FoodAllSelfsDetailsDrawersInfoContact from "./helpers/components/FoodAllSelfsDetailsDrawersInfoContact/FoodAllSelfsDetailsDrawersInfoContact";

import "./_drawerContent.scss";
import { useLazyGetAllBranchesQuery } from "@infra/states/redux/Apis/business/business/businessApi";

const SelfDetailDrawerContent = ({
  closeDrawerHandler,
  isDrawerOpen,
  selfDetailData,
  getSelfData,
}: SelfDetailDrawerContentProps) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [cityList, setCityList] = useState<CityType[]>([]);

  const [banner, setBanner] = useState<UploadFile[]>([]);
  const [logo, setLogo] = useState<UploadFile[]>([]);

  const [lat, setLat] = useState<number>(35.699739);
  const [lng, setLng] = useState<number>(51.338097);

  const [logoName, setLogoName] = useState("");
  const [coverName, setCoverName] = useState("");

  const [form] = Form.useForm<FormDataType>();

  //? ================================  Api Calls ================================
  const [uploadFile, { isLoading: isUploadFileLoading }] = useFoodUploadFileMutation();

  const [getAllUniversity, { data: universityData, isLoading: isUniversityDataLoading }] =
    useLazyGetAllBranchesQuery();

  const { data: getProvinceListData, isFetching: getProvinceListLoading } =
    useGetProvinceQuery();

  const [getCityList, { isFetching: getCityListLoading }] = useLazyGetCityQuery();

  const [updateSelf, { isLoading: isUpdateSelfLoading }] =
    useUpdateAllRestaurantMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getAllUniversity();
  }, []);

  useEffect(() => {
    if (isDrawerOpen && selfDetailData) {
      form.setFieldsValue({
        activeMode: selfDetailData?.active,
        selfTitle: selfDetailData?.title,
        uniName: {
          key: selfDetailData?.ownerBranchCodeBranchCode?.toString(),
          value: selfDetailData?.ownerBranchCodeBranchCode?.toString(),
          title: selfDetailData?.ownerBranchCodeBranchName,
          code: selfDetailData?.ownerBranchCodeBranchCode,
          item: {
            id: selfDetailData?.ownerBranchCodeBranchCode,
            title: selfDetailData?.ownerBranchCodeBranchName,
          },
        },
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
        setLogo([
          {
            uid: selfDetailData?.logoName,
            name: selfDetailData?.logoName,
            status: "done",
            url: selfDetailData?.logoName,
          },
        ]);
      }
      if (selfDetailData?.coverName) {
        setBanner([
          {
            uid: selfDetailData?.coverName,
            name: selfDetailData?.coverName,
            status: "done",
            url: selfDetailData?.coverName,
          },
        ]);
      }

      // set images for update
      setLogoName(selfDetailData?.logoTitle ? selfDetailData?.logoTitle : "");
      setCoverName(selfDetailData?.coverTitle ? selfDetailData?.coverTitle : "");
      getCityListHandler(selfDetailData?.provinceStateId?.toString());
      setLat(selfDetailData?.latitude);
      setLng(selfDetailData?.longitude);
    }
  }, []);

  //* ================================ Util Functions ================================
  const getCityListHandler = (id: string) => {
    getCityList({ stateId: id }).unwrap().then(getCityListSuccess);
  };

  const getCityListSuccess = async (value: GetCityResponse) => {
    if (value?.status === 200) {
      setCityList(value?.data);
    } else {
      return toast.error((value?.data || value?.msg) as any, {
        toastId: (value?.data || value?.msg) as any,
      });
    }
  };

  const updateSelfOnSuccess = async (value: UpdateAllRestaurantResponse) => {
    if (value?.status === 200) {
      toast.success(UPDATE_SELF_SUCCESS_MSG, { toastId: UPDATE_SELF_SUCCESS_MSG });
      closeUpdateModalHandler();
      closeDrawerHandler();
      getSelfData?.(value?.data?.toString());
    }
  };

  const updateSelfOnError = () => {
    closeUpdateModalHandler();
  };

  const updateSelfHandler = async () => {
    form.submit();
    form.validateFields().then(async (value: FormDataType) => {
      if (selfDetailData?.id) {
        await updateSelf({
          active: value?.activeMode,
          address: value?.address,
          branchIds: [value?.uniName?.code],
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
          ownerBranchCode: value?.uniName?.code,
          ownerBranchName: value?.uniName?.title,
          coverName: coverName ? coverName : null,
          logoName: logoName ? logoName : null,
        })
          .unwrap()
          .then(updateSelfOnSuccess)
          .catch(updateSelfOnError);
      }
    });
  };

  // Modal functions
  const openUpdateModalHandler = useCallback(() => {
    form.validateFields().then(() => setIsUpdateModalOpen(true));
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

  // upload file success
  const onUploadFileSuccess = ({ imageSetter, response }: onUploadFileSuccess) => {
    if (response?.status === 200) {
      imageSetter(response?.data);
    }
  };

  // upload file change
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
            <div className="all-selfs-detail-modal-container">
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
            <div className="all-selfs-detail-modal-container">
              <p className="desc">آیا از حذف این آیتم اطمینان دارید؟</p>
            </div>
          }
          showIcon={false}
        />
      )}
      <Form
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
            <div className="all-selfs-detail-drawer-action-btns-container">
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
        <div className="all-selfs-detail-drawer-content-container">
          <div className="self-information-container">
            <div className="uploader-container">
              <CustomUploader
                fileList={logo}
                setFileList={setLogo}
                isReadOnly={false}
                maxCount={1}
                name="logo"
                isDisabled={logo?.length >= 1}
                uploaderText={
                  <div className="all-self-detail-upload-text-container">
                    <div className="upload-text">لوگو</div>
                    <div className="upload-logo">
                      <AiOutlinePlus />
                    </div>
                  </div>
                }
                hasUploaderIcon={false}
                isDataLoading={isUploadFileLoading}
                UploadSizeLimitConfig={{
                  isActive: true,
                  text: "حداکثر 1 مگابایت",
                  size: 1,
                }}
                validFileFormat={["image/png", "image/jpeg", "image/jpg"]}
                imageSetter={setLogoName}
                onChange={(e: any) => onUploadFileChange(e, setLogoName, setLogo)}
              />
              <CustomUploader
                fileList={banner}
                setFileList={setBanner}
                isReadOnly={false}
                maxCount={1}
                name="banner"
                isDisabled={banner?.length >= 1}
                uploaderText={
                  <div className="all-self-detail-upload-text-container">
                    <div className="upload-text">بنر</div>
                    <div className="upload-logo">
                      <AiOutlinePlus />
                    </div>
                  </div>
                }
                hasUploaderIcon={false}
                isDataLoading={isUploadFileLoading}
                UploadSizeLimitConfig={{
                  isActive: true,
                  text: "حداکثر 1 مگابایت",
                  size: 1,
                }}
                validFileFormat={["image/png", "image/jpeg", "image/jpg"]}
                imageSetter={setCoverName}
                onChange={(e: any) => onUploadFileChange(e, setCoverName, setBanner)}
              />
            </div>
          </div>
          <div className="contact-information-container">
            <FoodAllSelfsDetailsDrawersInfo
              universityData={universityData}
              isUniversityDataLoading={isUniversityDataLoading}
              form={form}
            />
            <CustomDivider text="اطلاعات تماس" />
            <FoodAllSelfsDetailsDrawersInfoContact
              form={form}
              getProvinceListData={getProvinceListData}
              getProvinceListLoading={getProvinceListLoading}
              cityList={cityList}
              getCityListLoading={getCityListLoading}
              getCityListHandler={getCityListHandler}
            />
            <CustomMap lat={lat} lng={lng} setLat={setLat} setLng={setLng} />
          </div>
        </div>
      </Form>
    </>
  );
};

export default SelfDetailDrawerContent;
