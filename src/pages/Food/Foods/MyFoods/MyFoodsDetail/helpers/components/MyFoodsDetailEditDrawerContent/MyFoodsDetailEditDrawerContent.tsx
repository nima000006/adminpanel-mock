import { useCallback, useEffect, useState } from "react";

import { Col, Form, Row, UploadFile } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import { AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import { isImageFormatValid, isImageSizeValid } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { UPLOAD_FILE_GENERAL } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { useLazyGetMyContractsListQuery } from "@infra/states/redux/Apis/food/contract/contractApi";
import { useUpdateDetailMyFoodsMutation } from "@infra/states/redux/Apis/food/foods/foodApis";
import { useFoodUploadFileMutation } from "@infra/states/redux/Apis/food/general/GeneralFoodApis";
import {
  FILE_TYPE_NOT_SUPPORTED,
  SIZE_EXCEED_ERROR,
} from "@infra/VARS/globalToasts/globalToasts";
import { GetMyContractsListResponse } from "@pages/Food/Contracts/MyContracts/MyContractsList/@types/@myContractsList";
import { UPDATE_SELF_SUCCESS_MSG } from "@pages/Food/Selfs/helpers/utils/selfUtils";

import {
  FormDataAllFoodType,
  MyFoodsDetailEditDrawerContentProps,
  onUploadFileSuccess,
  UpdateDetailMyFoodsResponse,
} from "./@types/@myFoodsDetailEditDrawerContent";
import MyFoodsDetailEditDrawerContentInfo from "./components/MyFoodsDetailEditDrawerContentInfo";
import "./_myFoodsDetailEditDrawerContent.scss";

const MyFoodsDetailEditDrawerContent = ({
  onCloseDrawerHandler,
  getFoodData,
  foodData,
}: MyFoodsDetailEditDrawerContentProps) => {
  const [myContractsListData, setMyContractsListData] = useState<
    GetMyContractsListResponse | undefined
  >(undefined);

  const [mainImageList, setMainImageList] = useState<UploadFile[]>([]);
  const [secondImageList, setSecondImageList] = useState<UploadFile[]>([]);
  const [thirdImageList, setThirdImageList] = useState<UploadFile[]>([]);
  const [fourthImageList, setFourthImageList] = useState<UploadFile[]>([]);

  const [mainImageName, setMainImageName] = useState("");
  const [secondImageName, setSecondImageName] = useState("");
  const [thirdImageName, setThirdImageName] = useState("");
  const [fourthImageName, setFourthImageName] = useState("");

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const {
    params: { id },
  } = useQueryParams();
  const [form] = Form.useForm<FormDataAllFoodType>();

  //? ================================  Api Calls ================================
  const [uploadFile, { isLoading: isUploadFileLoading }] = useFoodUploadFileMutation();

  // get contract list for custom select
  const [getMyContractsList, { isFetching: isMyContractsListLoading }] =
    useLazyGetMyContractsListQuery();

  const [sendDrawerData, { isLoading: sendDataLoading }] =
    useUpdateDetailMyFoodsMutation();

  //? ================================ Effects ================================
  // request get contract(custom select)
  useEffect(() => {
    getMyContractsList({ pageNo: 0, pageSize: 10000 })
      .unwrap()
      .then(getMyContractsListSuccess);
  }, []);

  useEffect(() => {
    setFoodData();
  }, []);

  //* ================================ Util Functions ================================
  const getMyContractsListSuccess = async (res: GetMyContractsListResponse) => {
    if (res?.status === 200) {
      setMyContractsListData(res);
    } else {
      return toast.error((res?.data || res?.msg) as any, {
        toastId: (res?.data || res?.msg) as any,
      });
    }
  };

  const setFoodData = () => {
    const mainImage = foodData?.mainImage;
    const secondImage = foodData?.secondImage;
    const thirdImage = foodData?.thirdImage;
    const fourthImage = foodData?.fourthImage;
    if (mainImage) {
      setMainImageList([
        {
          uid: mainImage,
          name: mainImage,
          status: "done",
          url: mainImage,
        },
      ]);
    }
    if (secondImage) {
      setSecondImageList([
        {
          uid: secondImage,
          name: secondImage,
          status: "done",
          url: secondImage,
        },
      ]);
    }

    if (thirdImage) {
      setThirdImageList([
        {
          uid: thirdImage,
          name: thirdImage,
          status: "done",
          url: thirdImage,
        },
      ]);
    }

    if (fourthImage) {
      setFourthImageList([
        {
          uid: fourthImage,
          name: fourthImage,
          status: "done",
          url: fourthImage,
        },
      ]);
    }

    form.setFieldsValue({
      title: foodData?.title,
      contract: {
        code: foodData?.contractId,
        label: foodData?.contractTitle,
      },
      studentPrice: foodData?.studentalPrice?.toString(),
      maxPrice: foodData?.maxPrice?.toString(),
      minPrice: foodData?.minPrice?.toString(),
      desc: foodData?.description,
    });
    if (foodData) {
      setIsActive(foodData?.active);
      setMainImageName(foodData?.mainImageTitle);
      setSecondImageName(foodData?.secondImageTitle);
      setThirdImageName(foodData?.thirdImageTitle);
      setFourthImageName(foodData?.fourthImageTitle);
    }
  };

  // modal handler
  const closeUpdateModalHandler = useCallback(() => {
    setIsUpdateModalOpen(false);
  }, []);

  const closeDeleteModalHandler = useCallback(() => {
    setIsDeleteModalOpen(false);
  }, []);

  const onSubmitHandler = () => {
    form.submit();
    form.validateFields().then((value: FormDataAllFoodType) => {
      sendDrawerData({
        active: isActive,
        title: value?.title,
        contractId: value?.contract?.code,
        description: value?.desc,
        studentalPrice: value?.studentPrice,
        maxPrice: value?.maxPrice,
        minPrice: value?.minPrice,
        id: +id,
        mainImage: mainImageName ? mainImageName : null,
        secondImage: secondImageName ? secondImageName : null,
        thirdImage: thirdImageName ? thirdImageName : null,
        fourthImage: fourthImageName ? fourthImageName : null,
      })
        .unwrap()
        .then(onEditAllDetailFoodsSuccess)
        .catch(onEditAllDetailFoodsError);
    });
  };

  // success
  const onEditAllDetailFoodsSuccess = async (value: UpdateDetailMyFoodsResponse) => {
    if (value?.status === 200) {
      setIsUpdateModalOpen(false);
      onCloseDrawerHandler();
      form.resetFields();
      getFoodData?.();
      toast.success(UPDATE_SELF_SUCCESS_MSG, {
        toastId: UPDATE_SELF_SUCCESS_MSG,
      });
    } else {
      return toast.error((value?.data || value?.msg) as any, {
        toastId: (value?.data || value?.msg) as any,
      });
    }
  };

  // fail
  const onEditAllDetailFoodsError = () => {
    setIsUpdateModalOpen(false);
  };

  // drawer handler
  const openDeleteModalHandler = useCallback(() => {
    setIsDeleteModalOpen(true);
  }, []);

  const onOpenRegisterModalHandler = useCallback(() => {
    setIsUpdateModalOpen(true);
  }, []);

  // onUploadFileSuccess
  const onUploadFileSuccess = ({ setImage, response }: onUploadFileSuccess) => {
    if (response?.status === 200) {
      setImage(response?.data);
    }
  };

  // onUploadFileChange
  const onUploadFileChange = (
    image: UploadChangeParam<UPLOAD_FILE_GENERAL>,
    setImage: React.Dispatch<React.SetStateAction<string>>,
    imageListSetter?: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>
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
      .then((response) => onUploadFileSuccess({ response, setImage }))
      .catch(() => {
        setImage("");
        imageListSetter?.([]);
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
          onConfirmClickHandler={onSubmitHandler}
          isConfirmButtonLoading={sendDataLoading}
          content={
            <div className="my-foods-detail-modal">
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
            <div className="my-foods-detail-modal">
              <p className="desc">آیا از حذف این آیتم اطمینان دارید؟</p>
            </div>
          }
          showIcon={false}
        />
      )}

      <Form className="my-foods-detail-edit-drawer-content-container" form={form}>
        <CustomDrawerHeader
          title="ویرایش غذا"
          closeDrawerHandler={onCloseDrawerHandler}
          leftSideContent={
            <div className="drawer-header-btn">
              <CustomSwitch
                defaultChecked={foodData?.active}
                key={foodData?.active?.toString()}
                checkedChildren="فعال"
                unCheckedChildren="غیر فعال"
                valuePropName="activeMode"
                disabled
                onChange={() => setIsActive((prev) => !prev)}
              />
              <CustomButton
                type="primary"
                danger
                className="drawer-action-btn"
                onClick={openDeleteModalHandler}
                disabled
              >
                حذف
              </CustomButton>
              <CustomButton className="drawer-action-btn" onClick={onCloseDrawerHandler}>
                انصراف
              </CustomButton>
              <CustomButton
                type="primary"
                onClick={onOpenRegisterModalHandler}
                className="drawer-action-btn"
              >
                ثبت
              </CustomButton>
            </div>
          }
        />
        <div className="attach-row">
          <Row gutter={[16, 16]} className="banner-rate-container">
            {/* ---------------------------------- MAIN IMAGE ---------------------------------- */}
            <Col>
              <CustomUploader
                fileList={mainImageList}
                setFileList={setMainImageList}
                isReadOnly={false}
                uploaderText={
                  <div className="my-food-detail-list-upload-text-container">
                    <div className="upload-text-main">تصویر اصلی</div>
                    <div className="upload-logo-main">
                      <AiOutlinePlus />
                    </div>
                  </div>
                }
                hasUploaderIcon={false}
                maxCount={1}
                isDataLoading={isUploadFileLoading}
                isDisabled={mainImageList?.length >= 1}
                UploadSizeLimitConfig={{
                  isActive: true,
                  text: "حداکثر 1 مگابایت",
                  size: 1,
                }}
                validFileFormat={["image/png", "image/jpeg", "image/jpg"]}
                name="mainImage"
                imageSetter={setMainImageName}
                onChange={(e: any) =>
                  onUploadFileChange(e, setMainImageName, setMainImageList)
                }
                rules={[
                  () => ({
                    validator() {
                      if (mainImageName?.length < 1) {
                        return Promise.reject(
                          new Error("لطفا عکس اصلی غذا را انتخاب فرمائید")
                        );
                      }

                      return Promise.resolve();
                    },
                  }),
                ]}
              />
            </Col>

            {/* ---------------------------------- SECOND IMAGE ---------------------------------- */}
            <Col>
              <CustomUploader
                fileList={secondImageList}
                setFileList={setSecondImageList}
                isReadOnly={false}
                uploaderText={
                  <div className="my-food-detail-list-upload-text-container">
                    <div className="upload-text-second">تصویر دوم</div>
                    <div className="upload-logo-second">
                      <AiOutlinePlus />
                    </div>
                  </div>
                }
                hasUploaderIcon={false}
                maxCount={1}
                isDataLoading={isUploadFileLoading}
                isDisabled={secondImageList?.length >= 1}
                UploadSizeLimitConfig={{
                  isActive: true,
                  text: "حداکثر 1 مگابایت",
                  size: 1,
                }}
                validFileFormat={["image/png", "image/jpeg", "image/jpg"]}
                name="secondImage"
                imageSetter={setSecondImageName}
                onChange={(e: any) =>
                  onUploadFileChange(e, setSecondImageName, setSecondImageList)
                }
              />
            </Col>

            {/* ---------------------------------- THIRD IMAGE ---------------------------------- */}
            <Col>
              <CustomUploader
                fileList={thirdImageList}
                setFileList={setThirdImageList}
                isReadOnly={false}
                uploaderText={
                  <div className="my-food-detail-list-upload-text-container">
                    <div className="upload-text-second">تصویر سوم</div>
                    <div className="upload-logo-second">
                      <AiOutlinePlus />
                    </div>
                  </div>
                }
                hasUploaderIcon={false}
                maxCount={1}
                isDataLoading={isUploadFileLoading}
                isDisabled={thirdImageList?.length >= 1}
                UploadSizeLimitConfig={{
                  isActive: true,
                  text: "حداکثر 1 مگابایت",
                  size: 1,
                }}
                validFileFormat={["image/png", "image/jpeg", "image/jpg"]}
                name="thirdImage"
                imageSetter={setThirdImageName}
                onChange={(e: any) =>
                  onUploadFileChange(e, setThirdImageName, setThirdImageList)
                }
              />
            </Col>

            {/* ---------------------------------- FOURTH IMAGE ---------------------------------- */}
            <Col>
              <CustomUploader
                fileList={fourthImageList}
                setFileList={setFourthImageList}
                isReadOnly={false}
                uploaderText={
                  <div className="my-food-detail-list-upload-text-container">
                    <div className="upload-text-second">تصویر چهارم</div>
                    <div className="upload-logo-second">
                      <AiOutlinePlus />
                    </div>
                  </div>
                }
                hasUploaderIcon={false}
                maxCount={1}
                isDataLoading={isUploadFileLoading}
                isDisabled={fourthImageList?.length >= 1}
                UploadSizeLimitConfig={{
                  isActive: true,
                  text: "حداکثر 1 مگابایت",
                  size: 1,
                }}
                validFileFormat={["image/png", "image/jpeg", "image/jpg"]}
                name="fourthImage"
                imageSetter={setFourthImageName}
                onChange={(e: any) =>
                  onUploadFileChange(e, setFourthImageName, setFourthImageList)
                }
              />
            </Col>
          </Row>
        </div>
        <MyFoodsDetailEditDrawerContentInfo
          myContractsListData={myContractsListData}
          form={form}
          isMyContractsListLoading={isMyContractsListLoading}
        />
      </Form>
    </>
  );
};
export default MyFoodsDetailEditDrawerContent;
