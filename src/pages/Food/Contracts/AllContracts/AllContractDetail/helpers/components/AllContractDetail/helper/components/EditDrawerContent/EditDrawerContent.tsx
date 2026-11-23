import { useEffect, useState } from "react";

import { Col, Form, Row, UploadFile } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import { AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import {
  isImageFormatValid,
  isImageSizeValid,
  selectDefaultValueGenerator,
} from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { UPLOAD_FILE_GENERAL } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import {
  useAdminContractUpdateMutation,
  useFoodUploadFileMutation,
} from "@infra/states/redux/Apis/food/general/GeneralFoodApis";
import { useLazyGetAllRestaurantsQuery } from "@infra/states/redux/Apis/food/reservation/foodReservationApi";
import { useLazyGetAllVendorListQuery } from "@infra/states/redux/Apis/food/vendor/vendorApi";
import {
  FILE_TYPE_NOT_SUPPORTED,
  SIZE_EXCEED_ERROR,
} from "@infra/VARS/globalToasts/globalToasts";
import { RestaurantType } from "@pages/Food/Reservation/AllReservation/AllReservationOrderSearch/@types/@reservationOrderSearch";
import { VendorAllType } from "@pages/Food/Vendors/AllVendors/AllVendorList/@types/@allVendorList";
import { onUploadFileSuccess } from "@pages/Food/Vendors/AllVendors/AllVendorList/helper/drawer/AllVendorListDrawerContent/@types/@allVendorListDrawerContent";

import EditDrawerContentInfo from "./helper/components/EditDrawerContentInfo/EditDrawerContentInfo";
import {
  AllContractEditDrawerContentProps,
  ContractEditFormType,
} from "../../../@types/@allContractDetailTab";
import "./_editDrawerContent.scss";

const CONTRACT_UPDATED_SUCCESS = "اطلاعات قرارداد با موفقیت ویرایش شد";
const EditDrawerContent = ({
  onCloseDrawer,
  isDrawerOpen,
  contractData,
  refreshData,
}: AllContractEditDrawerContentProps) => {
  const [isActive, setIsActive] = useState(true);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [form] = Form.useForm<ContractEditFormType>();
  const [restaurantData, setRestaurantData] = useState<RestaurantType[] | []>([]);
  const [vendorData, setVendorData] = useState<VendorAllType[] | []>([]);
  const { params, setSearchParams } = useQueryParams();

  const [firstFile, setFirstFile] = useState<UploadFile[]>([]);
  const [secondFile, setSecondFile] = useState<UploadFile[]>([]);
  const [thirdFile, setThirdFile] = useState<UploadFile[]>([]);
  const [fourthFile, setFourthFile] = useState<UploadFile[]>([]);

  const [firstFileName, setFirstFileName] = useState<string>("");
  const [secondFileName, setSecondFileName] = useState<string>("");
  const [ThirdFileName, setThirdFileName] = useState<string>("");
  const [fourthFileName, setFourthFileName] = useState<string>("");

  //? ================================  Api Calls ================================
  const [uploadFile, { isLoading: isUploadFileLoading }] = useFoodUploadFileMutation();

  const [updateContract, { isLoading: isUpdateContractLoading }] =
    useAdminContractUpdateMutation();

  const [getAllRestaurants, { isFetching: isAllRestaurantDataLoading }] =
    useLazyGetAllRestaurantsQuery();

  const [getAllVendorList, { isFetching: isAllVendorListListLoading }] =
    useLazyGetAllVendorListQuery();

  //? ================================ Effects ================================

  useEffect(() => {
    if (contractData && contractData?.id && isDrawerOpen) {
      setFirstFileName(contractData?.file1Title);
      setSecondFileName(contractData?.file2Title);
      setThirdFileName(contractData?.file3Title);
      setFourthFileName(contractData?.file4Title);
      setIsActive(contractData?.active);
      form.setFieldsValue({
        title: contractData?.title,

        vendor: selectDefaultValueGenerator({
          id: contractData?.vendorId,
          title: contractData?.vendorTitle,
        }),
        self: selectDefaultValueGenerator({
          id: contractData?.restaurantId,
          title: contractData?.restaurantTitle,
        }),
        contractNo: contractData?.contractUUID,
        vendorPercentage: contractData?.vendorPercentage,
        contractStartDate: contractData?.startedDate,
        contractEndDate: contractData?.endDate,
        description: contractData?.description,
        providerPercentage: contractData?.providerPercentage,
        restaurantPercentage: contractData?.restaurantPercentage,
      });

      // image setter
      // 1
      if (contractData?.file1) {
        setFirstFile([
          {
            uid: contractData?.file1,
            name: contractData?.file1,
            status: "done",
            url: contractData?.file1,
          },
        ]);
      } else {
        setFirstFile([]);
      }

      // 2
      if (contractData?.file2) {
        setSecondFile([
          {
            uid: contractData?.file2,
            name: contractData?.file2,
            status: "done",
            url: contractData?.file2,
          },
        ]);
      } else {
        setSecondFile([]);
      }

      // 3
      if (contractData?.file3) {
        setThirdFile([
          {
            uid: contractData?.file3,
            name: contractData?.file3,
            status: "done",
            url: contractData?.file3,
          },
        ]);
      } else {
        setThirdFile([]);
      }

      // 4
      if (contractData?.file4) {
        setFourthFile([
          {
            uid: contractData?.file4,
            name: contractData?.file4,
            status: "done",
            url: contractData?.file4,
          },
        ]);
      } else {
        setFourthFile([]);
      }
    }
  }, [contractData?.id, isDrawerOpen]);

  // API CALL FOR GETTING SELECT DATA
  useEffect(() => {
    getAllRestaurants({ isDeleted: false })
      .unwrap()
      .then((res) => {
        if (res?.status === 200) {
          setRestaurantData(res?.data);
        } else {
          return toast.error((res?.data || res?.msg) as any, {
            toastId: (res?.data || res?.msg) as any,
          });
        }
      });
    getAllVendorList({ isDeleted: false })
      .unwrap()
      .then((res) => {
        if (res?.status === 200) {
          setVendorData(res?.data);
        } else {
          return toast.error((res?.data || res?.msg) as any, {
            toastId: (res?.data || res?.msg) as any,
          });
        }
      });
  }, []);

  //* ================================ Util Functions ================================

  const openUpdateModalHandler = () => {
    form.validateFields().then(() => {
      setIsUpdateModalOpen(true);
    });
  };

  const closeUpdateModalHandler = () => {
    setIsUpdateModalOpen(false);
  };

  // onSubmitHandler
  const onSubmitHandler = () => {
    form.validateFields().then((values) => {
      if (contractData?.id) {
        updateContract({
          active: isActive,
          contractUUID: values?.contractNo,
          description: values?.description,
          endDate: values?.contractEndDate,
          startedDate: values?.contractStartDate,
          id: contractData?.id,
          providerPercentage: values?.providerPercentage,
          restaurantPercentage: values?.restaurantPercentage,
          title: values?.title,
          vendorPercentage: values?.vendorPercentage,

          file1: firstFileName ? firstFileName : null,
          file2: secondFileName ? secondFileName : null,
          file3: ThirdFileName ? ThirdFileName : null,
          file4: fourthFileName ? fourthFileName : null,
        })
          .unwrap()
          .then(() => {
            if (values?.title && values.title !== params?.title) {
              setSearchParams({ ...params, title: values.title });
            }
            setIsUpdateModalOpen(false);
            refreshData();
            form.resetFields();
            onCloseDrawer();
            toast.success(CONTRACT_UPDATED_SUCCESS, {
              toastId: CONTRACT_UPDATED_SUCCESS,
            });
          });
      }
    });
  };

  // onUploadFileSuccess;
  const onUploadFileSuccess = ({ imageSetter, response }: onUploadFileSuccess) => {
    if (response?.status === 200) {
      imageSetter(response?.data);
    }
  };

  // onUploadFileChange;
  const onUploadFileChange = (
    image: UploadChangeParam<UPLOAD_FILE_GENERAL>,
    imageSetter: React.Dispatch<React.SetStateAction<string>>,
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
      .then((response) => onUploadFileSuccess({ response, imageSetter }))
      .catch(() => {
        imageListSetter?.([]);
        imageSetter?.("");
      });
  };

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
          isConfirmButtonLoading={isUpdateContractLoading}
          content={
            <div className="contract-edit-confirm-modal">
              <p className="desc">آیا از ثبت تغییرات اطمینان دارید؟</p>
            </div>
          }
          showIcon={false}
        />
      )}
      <Form form={form} className="contract-custom-drawer-edit-container">
        <CustomDrawerHeader
          closeDrawerHandler={onCloseDrawer}
          title="ویرایش قرارداد"
          hasLeftSide
          leftSideContent={
            <div className="contract-all-drawer-header-btn">
              <CustomSwitch
                checkedChildren="فعال"
                unCheckedChildren="غیر فعال"
                valuePropName="activeMode"
                defaultChecked={isActive}
                onChange={() => setIsActive((prev) => !prev)}
                value={isActive}
              />
              <CustomButton className="drawer-action-btn" onClick={onCloseDrawer}>
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
        <EditDrawerContentInfo
          vendorData={vendorData}
          isAllVendorListListLoading={isAllVendorListListLoading}
          restaurantData={restaurantData}
          isAllRestaurantDataLoading={isAllRestaurantDataLoading}
          form={form}
        />
        <Row gutter={[16, 16]}>
          <Col>
            <CustomUploader
              fileList={firstFile}
              setFileList={setFirstFile}
              isReadOnly={false}
              maxCount={1}
              name="firstImage"
              isDisabled={firstFile?.length >= 1}
              uploaderText={
                <div className="edit-contract-all-images-container">
                  <div className="upload-text">فایل اول</div>
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
              imageSetter={setFirstFileName}
              onChange={(e: any) => onUploadFileChange(e, setFirstFileName, setFirstFile)}
            />
          </Col>
          <Col>
            <CustomUploader
              fileList={secondFile}
              setFileList={setSecondFile}
              isReadOnly={false}
              maxCount={1}
              name="secondImage"
              isDisabled={secondFile?.length >= 1}
              uploaderText={
                <div className="edit-contract-all-images-container">
                  <div className="upload-text">فایل دوم</div>
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
              imageSetter={setSecondFileName}
              onChange={(e: any) =>
                onUploadFileChange(e, setSecondFileName, setSecondFile)
              }
            />
          </Col>
          <Col>
            <CustomUploader
              fileList={thirdFile}
              setFileList={setThirdFile}
              isReadOnly={false}
              maxCount={1}
              name="thirdImage"
              isDisabled={thirdFile?.length >= 1}
              uploaderText={
                <div className="edit-contract-all-images-container">
                  <div className="upload-text">فایل سوم</div>
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
              imageSetter={setThirdFileName}
              onChange={(e: any) => onUploadFileChange(e, setThirdFileName, setThirdFile)}
            />
          </Col>
          <Col>
            <CustomUploader
              fileList={fourthFile}
              setFileList={setFourthFile}
              isReadOnly={false}
              maxCount={1}
              name="fourthImage"
              isDisabled={fourthFile?.length >= 1}
              uploaderText={
                <div className="edit-contract-all-images-container">
                  <div className="upload-text">فایل چهارم</div>
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
              imageSetter={setFourthFileName}
              onChange={(e: any) =>
                onUploadFileChange(e, setFourthFileName, setFourthFile)
              }
            />
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default EditDrawerContent;
