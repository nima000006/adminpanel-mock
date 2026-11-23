import { useEffect, useState } from "react";

import { Form, UploadFile } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import { AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import Div from "@components/Renderers/Div/Div";
import { isImageFormatValid, isImageSizeValid } from "@infra/helpers/utils";
import { UPLOAD_FILE_GENERAL } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { useFoodUploadFileMutation } from "@infra/states/redux/Apis/food/general/GeneralFoodApis";
import { useCreateMyRestaurantMutation } from "@infra/states/redux/Apis/food/self/selfApis";
import {
  FILE_TYPE_NOT_SUPPORTED,
  SIZE_EXCEED_ERROR,
} from "@infra/VARS/globalToasts/globalToasts";

import {
  CreateMyRestaurantResponse,
  FormItems,
  MySelfListDrawerContentProps,
  onUploadFileSuccess,
} from "./@types/mySelfListDrawerContent";
import MySelfListDrawerContentInfo from "./components/MySelfListDrawerContentInfo/MySelfListDrawerContentInfo";
import MySelfListDrawerContentInfoContact from "./components/MySelfListDrawerContentInfoContact/MySelfListDrawerContentInfoContact";
import "./_mySelfListDrawerContent.scss";

const CREATE_NEW_RESTAURANT_SUCCESS_MSG = "سلف جدید با موفقیت ثبت شد.";

const MySelfListDrawerContent = ({
  onCloseDrawer,
  getRestaurantData,
}: MySelfListDrawerContentProps) => {
  const [isActive, setIsActive] = useState(true);
  const [logoList, setLogoList] = useState<UploadFile[]>([]);
  const [bannerFileList, setBannerFileList] = useState<UploadFile[]>([]);
  const [lat, setLat] = useState<number>(35.699739);
  const [lng, setLng] = useState<number>(51.338097);
  const [rerenderTrigger, setRerenderTrigger] = useState<number>(0);
  const [isProvinceSelected, setIsProvinceSelected] = useState(false);
  const [logoName, setLogoName] = useState("");
  const [coverName, setCoverName] = useState("");

  const [form] = Form.useForm<FormItems>();

  //? ================================  Api Calls ================================
  const [uploadFile, { isLoading: isUploadFileLoading }] = useFoodUploadFileMutation();

  const [createNewRestaurant, { isLoading: isCreateNewRestaurantLoading }] =
    useCreateMyRestaurantMutation();

  //? ================================ Effects ================================
  // Force a re-render of the CustomMap when the drawer opens
  useEffect(() => {
    setRerenderTrigger((prev) => prev + 1);
  }, [onCloseDrawer]);

  //* ================================ Util Functions ================================
  const createNewRestaurantOnError = () => {
    onCloseDrawer();
  };

  const createNewRestaurantOnSuccess = async (value: CreateMyRestaurantResponse) => {
    if (value?.status === 200) {
      toast.success(CREATE_NEW_RESTAURANT_SUCCESS_MSG, {
        toastId: CREATE_NEW_RESTAURANT_SUCCESS_MSG,
      });
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
      // //todo[saman]
      // branchIds: [value?.unit?.code],
      // ownerBranchCode: value?.unit?.code,
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
      restaurantPhone: value?.phoneOne,
      rules: value?.rule,
      title: value?.title,
      coverName: coverName ? coverName : null,
      logoName: logoName ? logoName : null,
    })
      .unwrap()
      .then(createNewRestaurantOnSuccess)
      .catch(createNewRestaurantOnError);
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
    image: UploadChangeParam<UPLOAD_FILE_GENERAL>,
    name: string,
    imageListSetter?: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>,
    imageNameSetter?: React.Dispatch<React.SetStateAction<string>>
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
      .then((response) => onUploadFileSuccess({ response, name }))
      .catch(() => {
        imageListSetter?.([]);
        imageNameSetter?.("");
      });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form
      className="food-my-self-list-drawer-content-container"
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
            <div className="my-self-upload-text-container">
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
          onChange={(e: any) => onUploadFileChange(e, "logo", setLogoList, setLogoName)}
        />
        <CustomUploader
          fileList={bannerFileList}
          setFileList={setBannerFileList}
          uploaderText={
            <div className="my-self-upload-text-container">
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
            onUploadFileChange(e, "cover", setBannerFileList, setCoverName)
          }
        />
      </Div>
      <MySelfListDrawerContentInfo form={form} />
      <MySelfListDrawerContentInfoContact
        form={form}
        setLat={setLat}
        lat={lat}
        setLng={setLng}
        lng={lng}
        rerenderTrigger={rerenderTrigger}
        isProvinceSelected={isProvinceSelected}
        setIsProvinceSelected={setIsProvinceSelected}
      />
    </Form>
  );
};

export default MySelfListDrawerContent;
