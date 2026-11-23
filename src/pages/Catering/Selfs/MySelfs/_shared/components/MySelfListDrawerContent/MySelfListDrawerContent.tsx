import { useEffect, useState } from "react";

import { Form, Spin, UploadFile } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import { AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomMap from "@components/CustomInputs/CustomMap/CustomMap";
import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import Div from "@components/Renderers/Div/Div";
import {
  getUploadFilePayload,
  isImageFormatValid,
  isImageSizeValid,
  selectDefaultValueGenerator,
} from "@infra/helpers/utils";
import { useLazyGetBasicInfoProvinceAndCityQuery } from "@infra/states/redux/Apis/basicInformation/basicInformationApis";
import {
  useCateringUploadFileMutation,
  useCreateCateringMyRestaurantMutation,
  useGetDetailMySelfsQuery,
  useUpdateCateringMyRestaurantMutation,
} from "@infra/states/redux/Apis/catering/selfs/selfsApi";
import {
  FILE_TYPE_NOT_SUPPORTED,
  SIZE_EXCEED_ERROR,
} from "@infra/VARS/globalToasts/globalToasts";
import { IdTitle } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import {
  CATERING_GENDER_TYPES,
  CATERING_GENDER_TYPES_LABELS,
  CATERING_STATUS_TYPES,
} from "@pages/Catering/_shared/utils";

import {
  MySelfListDrawerContentFormType,
  MySelfListDrawerContentProps,
  MySelfListDrawerUploadFile,
  MySelfListOnUploadFileSuccess,
  UpdateCateringMyRestaurantRequest,
} from "./@types/@mySelfListDrawerContent";
import MySelfListDrawerContentInfo from "./helpers/components/MySelfListDrawerContentInfo/MySelfListDrawerContentInfo";
import MySelfListDrawerContentInfoContact from "./helpers/components/MySelfListDrawerContentInfoContact/MySelfListDrawerContentInfoContact";

import "./_mySelfListDrawerContent.scss";
import { getDetailMySelfsResponse } from "@pages/Catering/Selfs/MySelfs/MySelfDetail/helper/components/CateringMySelfsDetail/@types/@cateringMySelfsDetail";

const CREATE_NEW_RESTAURANT_SUCCESS_MSG = "سلف جدید با موفقیت ثبت شد.";
const UPDATE_RESTAURANT_SUCCESS_MSG = "سلف با موفقیت ویرایش شد.";

const GENDER_OPTIONS: IdTitle[] = [
  {
    id: CATERING_GENDER_TYPES.MALE,
    title: CATERING_GENDER_TYPES_LABELS[CATERING_GENDER_TYPES.MALE],
  },
  {
    id: CATERING_GENDER_TYPES.FEMALE,
    title: CATERING_GENDER_TYPES_LABELS[CATERING_GENDER_TYPES.FEMALE],
  },
  {
    id: CATERING_GENDER_TYPES.UNISEX,
    title: CATERING_GENDER_TYPES_LABELS[CATERING_GENDER_TYPES.UNISEX],
  },
];

const MySelfListDrawerContent = ({
  onCloseDrawer,
  getRestaurantData,
  mode,
  selfId,
}: MySelfListDrawerContentProps) => {
  const isEditMode = mode === "edit";

  const [showToUser, setShowToUser] = useState(true);

  const [logo, setLogo] = useState<UploadFile[]>([]);
  const [banner, setBanner] = useState<UploadFile[]>([]);
  const [logoName, setLogoName] = useState("");
  const [bannerName, setBannerName] = useState("");

  const [lat, setLat] = useState<number>(35.699739);
  const [lng, setLng] = useState<number>(51.338097);

  const [rerenderTrigger, setRerenderTrigger] = useState<number>(0);

  const [isProvinceSelected, setIsProvinceSelected] = useState(false);
  const [provinceList, setProvinceList] = useState<IdTitle[]>([]);
  const [cityList, setCityList] = useState<IdTitle[]>([]);

  const [form] = Form.useForm<MySelfListDrawerContentFormType>();

  //? ================================  Api Calls ================================
  const { data: selfDetail, isFetching: isSelfDetailLoading } = useGetDetailMySelfsQuery(
    { id: Number(selfId) },
    { skip: !isEditMode || !selfId, refetchOnMountOrArgChange: true }
  );

  const [createRestaurant, { isLoading: isCreateLoading }] =
    useCreateCateringMyRestaurantMutation();

  const [updateRestaurant, { isLoading: isUpdateLoading }] =
    useUpdateCateringMyRestaurantMutation();

  const [uploadFile, { isLoading: isUploadLoading }] = useCateringUploadFileMutation();

  const [
    getProvinceData,
    { isFetching: getProvinceListLoading, isSuccess: isProvinceSuccess },
  ] = useLazyGetBasicInfoProvinceAndCityQuery();

  const [getCityData, { isFetching: getCityListLoading }] =
    useLazyGetBasicInfoProvinceAndCityQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getProvinceHandler();
    setRerenderTrigger((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (isEditMode && selfDetail) {
      populateFormFromDetail(selfDetail);
    }
  }, [isEditMode, selfDetail]);

  //* ================================ Util Functions ================================
  const getProvinceHandler = () => {
    if (isProvinceSuccess) return;

    getProvinceData(103)
      .unwrap()
      .then((value) => {
        setProvinceList(
          value?.map((item) => ({
            id: item?.id,
            title: item?.name,
          })) ?? []
        );
      });
  };

  const getCityListHandler = (provinceId: number) => {
    getCityData(provinceId)
      .unwrap()
      .then((value) => {
        setCityList(
          value?.map((item) => ({
            id: item?.id,
            title: item?.name,
          })) ?? []
        );
      });
  };

  const resolveGenderTitle = (genderType: number) => {
    return CATERING_GENDER_TYPES_LABELS[genderType] ?? "";
  };

  const populateFormFromDetail = (data: getDetailMySelfsResponse) => {
    setShowToUser(data?.statusType?.id !== CATERING_STATUS_TYPES.ACTIVE_NOT_SHOW);

    setLat(data?.latitude ?? 35.699739);
    setLng(data?.longitude ?? 51.338097);

    setLogoName(data?.logoTitle || "");
    setBannerName(data?.coverTitle || "");

    if (data?.logoName) {
      setLogo([
        {
          uid: data.logoName,
          name: data.logoName,
          status: "done",
          url: data.logoName,
        },
      ]);
    }

    if (data?.coverName) {
      setBanner([
        {
          uid: data?.coverName,
          name: data?.coverName,
          status: "done",
          url: data?.coverName,
        },
      ]);
    }

    if (data?.provinceId) {
      setIsProvinceSelected(true);
      getCityListHandler(data.provinceId);
    }

    form.setFieldsValue({
      title: data?.title,
      capacity: data?.capacity?.toString(),
      gender: selectDefaultValueGenerator({
        id: data?.genderType,
        title: resolveGenderTitle(data?.genderType),
      }),
      selfManagerName: data?.managerFirstName,
      selfManagerLastName: data?.managerLastName,
      nationalCode: data?.managerUserName ?? undefined,
      phoneManager: data?.phone,
      desc: data?.description,
      rule: data?.rules,
      province: selectDefaultValueGenerator({
        id: data?.provinceId,
        title: data?.provinceName ?? undefined,
      }),
      city: selectDefaultValueGenerator({
        id: data?.cityId ?? undefined,
        title: data?.cityName ?? undefined,
      }),
      postalCode: data?.postalCode,
      phonOne: data?.restaurantPhone,
      phoneTwo: data?.restaurantPhone2 ?? undefined,
      address: data?.address,
    });

    setRerenderTrigger((prev) => prev + 1);
  };

  const onSubmitSuccess = (message: string) => {
    toast.success(message, { toastId: message });
    onCloseDrawer();
    getRestaurantData();
  };

  const onCreateCateringRestaurantSuccess = () => {
    onSubmitSuccess(CREATE_NEW_RESTAURANT_SUCCESS_MSG);
  };

  const onUpdateCateringRestaurantSuccess = () => {
    onSubmitSuccess(UPDATE_RESTAURANT_SUCCESS_MSG);
  };

  const onSubmitHandler = () => {
    form.validateFields().then((value: MySelfListDrawerContentFormType) => {
      const requestBody = {
        title: value.title,
        description: value.desc,
        rules: value.rule,
        genderType: value.gender.code,
        logoName: logoName ? logoName : null,
        coverName: bannerName ? bannerName : null,
        phone: value.phoneManager,
        restaurantPhone2: value.phoneTwo,
        managerUserName: value.nationalCode,
        managerFirstName: value.selfManagerName,
        managerLastName: value.selfManagerLastName,
        latitude: lat,
        longitude: lng,
        cityId: value.city.code,
        capacity: +value.capacity,
        restaurantPhone: value.phonOne,
        address: value.address,
        postalCode: value.postalCode,
        statusType: showToUser
          ? String(CATERING_STATUS_TYPES.ACTIVE_SHOW)
          : String(CATERING_STATUS_TYPES.ACTIVE_NOT_SHOW),
      };

      if (isEditMode) {
        if (!selfId) return;

        const request: UpdateCateringMyRestaurantRequest = {
          ...requestBody,
          id: selfId,
        };

        updateRestaurant(request).unwrap().then(onUpdateCateringRestaurantSuccess);
      } else {
        createRestaurant(requestBody).unwrap().then(onCreateCateringRestaurantSuccess);
      }
    });
  };

  const resolveUploadFilePayload = (file: MySelfListDrawerUploadFile) => {
    if (file instanceof Blob) {
      return file;
    }

    return getUploadFilePayload(file);
  };

  const onUploadFileSuccess = ({ setImage, response }: MySelfListOnUploadFileSuccess) => {
    if (!response) return;
    setImage(response);
  };

  const onUploadFileChange = (
    image: UploadChangeParam<MySelfListDrawerUploadFile>,
    setImage: React.Dispatch<React.SetStateAction<string>>,
    imageListSetter?: React.Dispatch<React.SetStateAction<UploadFile[]>>
  ) => {
    const fileToUpload = resolveUploadFilePayload(image.file);
    if (!fileToUpload) {
      return;
    }

    const formData = new FormData();
    formData.append("file", fileToUpload);

    const isFileFormatCorrect = isImageFormatValid({
      fileFormat: fileToUpload.type ?? "",
    });
    if (!isFileFormatCorrect) {
      return toast.error(FILE_TYPE_NOT_SUPPORTED, {
        toastId: FILE_TYPE_NOT_SUPPORTED,
      });
    }

    const isUploadable = isImageSizeValid({ fileSize: fileToUpload.size ?? 0 });
    if (!isUploadable) {
      return toast.error(SIZE_EXCEED_ERROR, {
        toastId: SIZE_EXCEED_ERROR,
      });
    }

    uploadFile(formData)
      .unwrap()
      .then((response) => onUploadFileSuccess({ response, setImage }))
      .catch(() => {
        imageListSetter?.([]);
        setImage("");
      });
  };

  const onDeleteLogo = () => {
    setLogo([]);
    setLogoName("");
  };

  const onDeleteCover = () => {
    setBanner([]);
    setBannerName("");
  };

  const showDetailLoading = isEditMode && isSelfDetailLoading;

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form className="my-self-list-drawer-content-container" form={form}>
      <CustomDrawerHeader
        title={isEditMode ? "ویرایش سلف" : "تعریف سلف جدید"}
        closeDrawerHandler={onCloseDrawer}
        leftSideContent={
          <div className="drawer-header-btn">
            <CustomSwitch
              unCheckedChildren="عدم نمایش به کاربر"
              checkedChildren="نمایش به کاربر"
              valuePropName="showToUser"
              checked={showToUser}
              defaultChecked={showToUser}
              onChange={(checked: boolean) => setShowToUser(checked)}
            />
            <CustomButton onClick={onCloseDrawer}>انصراف</CustomButton>
            <CustomButton
              type="primary"
              onClick={onSubmitHandler}
              loading={isCreateLoading || isUpdateLoading}
              disabled={showDetailLoading}
            >
              ثبت
            </CustomButton>
          </div>
        }
      />
      {showDetailLoading ? (
        <div className="drawer-detail-loading">
          <Spin />
        </div>
      ) : (
        <>
          <Div className="attach-row mb-20!">
            <CustomUploader
              fileList={logo}
              setFileList={setLogo}
              isReadOnly={false}
              onDeleteFile={onDeleteLogo}
              label="لوگو سلف"
              hasVerticalLabel={true}
              uploaderText={
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="upload-text">بارگذاری</div>
                  <div className="upload-logo">
                    <AiOutlinePlus />
                  </div>
                </div>
              }
              hasUploaderIcon={false}
              maxCount={1}
              isDataLoading={isUploadLoading}
              isDisabled={logo?.length >= 1}
              UploadSizeLimitConfig={{
                isActive: true,
                text: "حداکثر 1 مگابایت",
                size: 1,
              }}
              validFileFormat={["image/png", "image/jpeg", "image/jpg"]}
              name="logo"
              imageSetter={setLogoName}
              onChange={(e: UploadChangeParam<MySelfListDrawerUploadFile>) =>
                onUploadFileChange(e, setLogoName, setLogo)
              }
              rules={[
                () => ({
                  validator() {
                    if (logoName?.length < 1) {
                      return Promise.reject(new Error("لطفا لوگو سلف را انتخاب فرمائید"));
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            />
            <CustomUploader
              fileList={banner}
              setFileList={setBanner}
              label="بنر سلف"
              hasVerticalLabel={true}
              onDeleteFile={onDeleteCover}
              uploaderText={
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="upload-text">بارگذاری</div>
                  <div className="upload-logo">
                    <AiOutlinePlus />
                  </div>
                </div>
              }
              hasUploaderIcon={false}
              isReadOnly={false}
              maxCount={1}
              isDataLoading={isUploadLoading}
              isDisabled={banner?.length >= 1}
              UploadSizeLimitConfig={{
                isActive: true,
                text: "حداکثر 1 مگابایت",
                size: 1,
              }}
              validFileFormat={["image/png", "image/jpeg", "image/jpg"]}
              name="cover"
              imageSetter={setBannerName}
              onChange={(e: UploadChangeParam<MySelfListDrawerUploadFile>) =>
                onUploadFileChange(e, setBannerName, setBanner)
              }
              rules={[
                () => ({
                  validator() {
                    if (bannerName?.length < 1) {
                      return Promise.reject(new Error("لطفا بنر سلف را انتخاب فرمائید"));
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            />
          </Div>
          <MySelfListDrawerContentInfo
            form={form}
            genderOptions={GENDER_OPTIONS}
            isEditMode={isEditMode}
            unitDisplayValue={selfDetail?.ownerBranchCodeBranchName}
          />
          <div className="info-contact-divider">
            <CustomDivider text="اطلاعات تماس" />
          </div>
          <MySelfListDrawerContentInfoContact
            form={form}
            isProvinceSelected={isProvinceSelected}
            setIsProvinceSelected={setIsProvinceSelected}
            provinceList={provinceList}
            getCityListHandler={getCityListHandler}
            cityList={cityList}
            getCityListLoading={getCityListLoading}
            getProvinceListLoading={getProvinceListLoading}
          />
          <div className="map-label">موقعیت را روی نقشه مشخص کنید</div>
          <CustomMap
            className="map"
            lat={lat}
            lng={lng}
            setLat={setLat}
            setLng={setLng}
            triggerRerender={rerenderTrigger}
          />
        </>
      )}
    </Form>
  );
};
export default MySelfListDrawerContent;
