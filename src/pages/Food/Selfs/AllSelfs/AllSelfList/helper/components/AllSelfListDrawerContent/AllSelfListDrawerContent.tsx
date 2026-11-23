import { useEffect, useState } from "react";

import { Form, UploadFile } from "antd";
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
import { useLazyGetAllBranchesQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import {
  useFoodUploadFileMutation,
  useGetProvinceQuery,
  useLazyGetCityQuery,
} from "@infra/states/redux/Apis/food/general/GeneralFoodApis";
import { useCreateAllRestaurantMutation } from "@infra/states/redux/Apis/food/self/selfApis";
import {
  CityType,
  GetCityResponse,
} from "@pages/Food/Vendors/AllVendors/AllVendorList/helper/drawer/AllVendorListDrawerContent/@types/@allVendorListDrawerContent";

import {
  AllSelfListDrawerContentProps,
  CreateAllRestaurantResponse,
  FormItems,
  onUploadFileSuccess,
} from "./@types/@allSelfListDrawerContent";
import AllSelfListDrawerContentInfo from "./helpers/components/AllSelfListDrawerContentInfo/AllSelfListDrawerContentInfo";
import AllSelfListDrawerContentInfoContact from "./helpers/components/AllSelfListDrawerContentInfoContact/AllSelfListDrawerContentInfoContact";

import "./_allSelfListDrawerContent.scss";

const CREATE_NEW_RESTAURANT_SUCCESS_MSG = "سلف جدید با موفقیت ثبت شد.";

const AllSelfListDrawerContent = ({
  onCloseDrawer,
  getRestaurantData,
  isModalClosed,
}: AllSelfListDrawerContentProps) => {
  const [isActive, setIsActive] = useState(true);
  const [logoList, setLogoList] = useState<UploadFile[]>([]);
  const [bannerFileList, setBannerFileList] = useState<UploadFile[]>([]);
  const [lat, setLat] = useState<number>(35.699739);
  const [lng, setLng] = useState<number>(51.338097);
  const [rerenderTrigger, setRerenderTrigger] = useState<number>(0);
  const [isProvinceSelected, setIsProvinceSelected] = useState(false);
  const [logoName, setLogoName] = useState("");
  const [coverName, setCoverName] = useState("");

  const [cityList, setCityList] = useState<CityType[]>([]);

  const [form] = Form.useForm<FormItems>();

  //? ================================  Api Calls ================================
  const [uploadFile, { isLoading: isUploadFileLoading }] = useFoodUploadFileMutation();

  const [getAllUniversity, { data: universityData, isLoading: isUniversityDataLoading }] =
    useLazyGetAllBranchesQuery();

  const { data: getProvinceListData, isLoading: getProvinceListLoading } =
    useGetProvinceQuery();

  const [getCityList, { isFetching: getCityListLoading }] = useLazyGetCityQuery();

  const [createNewRestaurant, { isLoading: isCreateNewRestaurantLoading }] =
    useCreateAllRestaurantMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getAllUniversity();
  }, []);

  useEffect(() => {
    if (isModalClosed) {
      resetModal();
    }
  }, [isModalClosed]);

  // Force a re-render of the CustomMap when the drawer opens
  useEffect(() => {
    setRerenderTrigger((prev) => prev + 1);
  }, [onCloseDrawer]);

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

  const getCityListHandler = (event: unknown) => {
    getCityList({ stateId: event as string })
      .unwrap()
      .then(getCityListSuccess);
  };

  // resetModal
  const resetModal = () => {
    setBannerFileList([]);
    setLogoList([]);
    setLogoName("");
    setCoverName("");
  };

  const createNewRestaurantOnSuccess = async (value: CreateAllRestaurantResponse) => {
    if (value?.status === 200) {
      toast.success(CREATE_NEW_RESTAURANT_SUCCESS_MSG, {
        toastId: CREATE_NEW_RESTAURANT_SUCCESS_MSG,
      });
      resetModal();
      onCloseDrawer();
      getRestaurantData();
    } else {
      return toast.error((value?.data || value?.msg) as any, {
        toastId: (value?.data || value?.msg) as any,
      });
    }
  };

  const createNewRestaurantHandler = (value: FormItems) => {
    createNewRestaurant({
      active: isActive,
      address: value?.address,
      branchIds: [value?.unit?.code],
      ownerBranchCode: value?.unit?.code,
      capacity: +value?.capacity,
      description: value?.desc,
      genderType: value?.gender?.code,
      latitude: lat,
      longitude: lng,
      managerFirstName: value?.selfManagerName,
      managerLastName: value?.selfManagerLastName,
      managerUserName: value?.nationalCode,
      phone: value?.phoneManager,
      postalCode: value?.postalCode,
      provinceId: value?.city?.code,
      restaurantPhone: value?.phonOne,
      rules: value?.rule,
      title: value?.title,
      coverName: coverName ? coverName : null,
      logoName: logoName ? logoName : null,
    })
      .unwrap()
      .then(createNewRestaurantOnSuccess);
  };

  // onUploadFileSuccess
  const onUploadFileSuccess = ({ name, response }: onUploadFileSuccess) => {
    if (response?.status === 200) {
      if (name === "logo") {
        setLogoName(response?.data);
      }
      if (name === "cover") {
        setCoverName(response?.data);
      }
    }
  };

  // onUploadFileChange
  const onUploadFileChange = (
    image: UploadChangeParam<any>,
    name: string,
    imageListSetter?: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>,
    imageNameSetter?: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const formData = new FormData();
    formData.append("file", image?.file as any);

    uploadFile(formData)
      .unwrap()
      .then((response) => onUploadFileSuccess({ response, name }))
      .catch(() => {
        imageListSetter?.([]);
        imageNameSetter?.("");
      });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form
      className="food-all-self-list-drawer-content-container"
      form={form}
      onFinish={createNewRestaurantHandler}
    >
      <CustomDrawerHeader
        title="تعریف سلف جدید"
        closeDrawerHandler={onCloseDrawer}
        leftSideContent={
          <div className="drawer-header-btn">
            <CustomSwitch
              checkedChildren="فعال"
              unCheckedChildren="غیر فعال"
              valuePropName="active"
              defaultChecked={isActive}
              onChange={() => setIsActive((prev) => !prev)}
            />
            <CustomButton onClick={onCloseDrawer}>انصراف</CustomButton>
            <CustomButton
              type="primary"
              htmlType="submit"
              loading={isCreateNewRestaurantLoading}
            >
              ثبت
            </CustomButton>
          </div>
        }
      />
      <Div className="attach-row">
        <CustomUploader
          fileList={logoList}
          setFileList={setLogoList}
          isReadOnly={false}
          uploaderText={
            <div className="all-self-upload-text-container">
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
          onChange={(e) => onUploadFileChange(e, "logo", setLogoList, setLogoName)}
        />
        <CustomUploader
          fileList={bannerFileList}
          setFileList={setBannerFileList}
          uploaderText={
            <div className="all-self-upload-text-container">
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
          onChange={(e) =>
            onUploadFileChange(e, "cover", setBannerFileList, setCoverName)
          }
        />
      </Div>
      <AllSelfListDrawerContentInfo
        universityData={universityData}
        isUniversityDataLoading={isUniversityDataLoading}
        form={form}
      />
      <div className="info-contact-divider">
        <CustomDivider text="اطلاعات تماس" />
      </div>
      <AllSelfListDrawerContentInfoContact
        form={form}
        isProvinceSelected={isProvinceSelected}
        setIsProvinceSelected={setIsProvinceSelected}
        getProvinceListData={getProvinceListData}
        getCityListHandler={getCityListHandler}
        cityList={cityList}
        getCityListLoading={getCityListLoading}
        getProvinceListLoading={getProvinceListLoading}
      />
      <CustomMap
        className="map"
        lat={lat}
        lng={lng}
        setLat={setLat}
        setLng={setLng}
        triggerRerender={rerenderTrigger}
      />
    </Form>
  );
};
export default AllSelfListDrawerContent;
