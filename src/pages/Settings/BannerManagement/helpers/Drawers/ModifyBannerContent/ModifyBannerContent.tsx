import { useEffect, useState } from "react";

import { CheckboxChangeEvent, Col, Form, Row } from "antd";
import { RenderResult, TransferItem, TransferProps } from "antd/es/transfer";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";

import { CustomSingleCheckbox } from "@components/CustomInputs";
import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomTransfer from "@components/CustomInputs/CustomTransfer/CustomTransfer";
import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalItem from "@components/Renderers/SingleVerticalItem/SingleVerticalItem";
import { isImageFormatValid, isImageSizeValid } from "@infra/helpers/utils";
import {
  GENERAL_RESPONSE,
  UPLOAD_FILE_GENERAL,
} from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { useLazyGetAllBranchesQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import {
  useCreateBannerActiveBranchesMutation,
  useLazyGetActiveBannersDetailQuery,
  useUpdateBannerActiveBranchesMutation,
  useUploadFileToAdminMutation,
} from "@infra/states/redux/Apis/business/serviceManagementService/serviceManagementService";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import {
  FILE_TYPE_NOT_SUPPORTED,
  SIZE_EXCEED_ERROR,
} from "@infra/VARS/globalToasts/globalToasts";
import { GetAllBranchesResponse } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import {
  GetActiveBannersDetailResponse,
  ServiceManagementBannerSelectedItemsType,
} from "@pages/Settings/BannerManagement/@types/@bannerManagement";
import { useBannerManagerContext } from "@pages/Settings/BannerManagement/State/useBannerManagerContext";

import "./_modifyBannerContent.scss";

const SUCCESS_ADD_MSG = "واحد با موفقیت به لیست افزوده شد";
const SUCCESS_UPDATE_MSG = "واحد با موفقیت به روزرسانی شد";

type OnUploadFileSuccessType = {
  imageSetter: React.Dispatch<React.SetStateAction<string>>;
  response: GENERAL_RESPONSE<string>;
};

type ModifyBannerContentProps = {
  closeDrawerHandler: () => void;
  id: number;
  modifyDrawerCloseSignal: boolean;
  selectedItems: ServiceManagementBannerSelectedItemsType;
};

type ItemRenderer = (item: TransferItem) => RenderResult;

const ModifyBannerContent = ({
  closeDrawerHandler,
  id,
  modifyDrawerCloseSignal,
  selectedItems,
}: ModifyBannerContentProps) => {
  const [form] = Form.useForm();
  const [isActiveSwitch, setIsActiveSwitch] = useState(true);
  const { state, drawerUpdated } = useBannerManagerContext();
  const [targetKeys, setTargetKeys] = useState<TransferProps["targetKeys"]>();
  const [selectedKeys, setSelectedKeys] = useState<TransferProps["targetKeys"]>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [imageName, setImageName] = useState("");
  const [isAllBranchSelected, setIsAllBranchSelected] = useState(false);

  //? ================================  Api Calls ================================
  const [getAllBranches, { data: allBranchesData, isLoading: allBranchesDataLoading }] =
    useLazyGetAllBranchesQuery();

  const [getBranchActiveBanner, { isLoading: isActiveBannersDataLoading }] =
    useLazyGetActiveBannersDetailQuery();

  const [createService, { isLoading: isCreateServiceDataLoading }] =
    useCreateBannerActiveBranchesMutation();

  const [updateService, { isLoading: isUpdateServiceDataLoading }] =
    useUpdateBannerActiveBranchesMutation();

  const [uploadFile, { isLoading: isUploadFileLoading }] = useUploadFileToAdminMutation();

  //   const initialTargetKeys = state?.selectedBranches;

  //? ================================ Effects ================================

  useEffect(() => {
    resetDrawer();
  }, [modifyDrawerCloseSignal]);

  useEffect(() => {
    getAllBranches();
  }, []);

  // useEffect(() => {
  //   if (state?.selectedBranches) {
  //     setTargetKeys(state?.selectedBranches?.map((item) => item?.));
  //   }
  // }, [state?.selectedBranches]);

  useEffect(() => {
    if (id && id > 0) {
      getBranchActiveBanner(id?.toString()).unwrap().then(onGetBranchesSuccess);
    }
  }, [id]);

  //* ================================ Util Functions ================================

  const onGetBranchesSuccess = (res: GetActiveBannersDetailResponse) => {
    setImageName(res?.imageURLTitle);
    if (res?.imageURL) {
      setFileList([
        {
          uid: res?.imageURL,
          name: res?.imageURL,
          status: "done",
          url: res?.imageURL,
        },
      ]);
    }

    // set switch
    setIsActiveSwitch(res?.active);

    //! set transfer list pre defined targets
    setTargetKeys(res?.branches.map((item) => item));

    form.setFieldsValue({
      isBannerActive: res?.active,
      title: res?.title,
      imageLink: res?.imageLink,
      description: res?.description,
    });
  };
  const transferSourceCreator: (data?: GetAllBranchesResponse) => TransferItem[] = (
    data?: GetAllBranchesResponse
  ) => {
    if (!data) return [];
    return data?.map((item) => {
      return {
        key: item?.id,
        title: item?.title,
        description: item?.id?.toString(),
        // link,
      };
    });
  };

  //
  const onChange: TransferProps["onChange"] = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys);
  };

  const onSelectChange: TransferProps["onSelectChange"] = (
    sourceSelectedKeys,
    targetSelectedKeys
  ) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  //
  const itemRenderer: ItemRenderer = (item: TransferItem) => {
    return {
      key: item?.key || undefined,
      label: <>{item?.title}</> || <>نامشخص</>,
      value: item?.key?.toString() || "",
    };
  };

  // drawerCloseHandler
  const drawerCloseHandler = () => {
    closeDrawerHandler();
  };

  // onCreateServiceSuccess
  const onCreateServiceSuccess = async () => {
    toast.success(SUCCESS_ADD_MSG, { toastId: SUCCESS_ADD_MSG });
    drawerCloseHandler();
    drawerUpdated();
    resetDrawer();
  };

  const onUpdateServiceSuccess = async () => {
    toast.success(SUCCESS_UPDATE_MSG, { toastId: SUCCESS_UPDATE_MSG });
    drawerCloseHandler();
    drawerUpdated();
    resetDrawer();
  };

  // resetDrawer
  const resetDrawer = () => {
    setSelectedKeys([]);
    setTargetKeys([]);
    setFileList([]);
    form?.resetFields();
    setImageName("");
  };

  // onSubmit
  const onSubmit = () => {
    if (!isAllBranchSelected && targetKeys && targetKeys?.length < 1) {
      return toast.error("حداقل یک شعبه باید انتخاب شود");
    }
    form.validateFields().then((values) => {
      if (selectedItems?.branch?.id !== null && selectedItems?.staff?.id !== null) {
        if (id && id > 0) {
          //EDIT MODE
          updateService({
            serviceId: state?.activeApps?.id,
            branchIds: targetKeys as number[],
            active: isActiveSwitch,
            isAll: isAllBranchSelected,
            description: values?.description,
            imageLink: values?.imageLink,
            imageURL: imageName, // should get filled with proper info
            sectionId: selectedItems?.branch?.id,
            title: values?.title,
            id,
            staffTypeId: selectedItems?.staff?.id,
          })
            .unwrap()
            .then(onUpdateServiceSuccess);
        } else {
          // CREATE MODE
          createService({
            serviceId: state?.activeApps?.id,
            branchIds: targetKeys as number[],
            active: isActiveSwitch,
            description: values?.description,
            imageLink: values?.imageLink,
            imageURL: imageName, // should get filled with proper info
            sectionId: selectedItems?.branch?.id,
            title: values?.title,
            isAll: isAllBranchSelected,
            staffTypeId: selectedItems?.staff?.id,
          })
            .unwrap()
            .then(onCreateServiceSuccess);
        }
      }
    });
  };

  //!
  const onUploadFileSuccess = ({ imageSetter, response }: OnUploadFileSuccessType) => {
    if (response?.status === 200) {
      // setFileList([
      //   {
      //     uid: response.data, // use response data or unique ID
      //     name: response.data,
      //     status: "done",
      //     url: response.data, // Update with the correct URL after upload
      //   },
      // ]);
      imageSetter(response?.data);
    }
  };

  //! onUploadFileChange
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
        setImageName("");
      });
  };

  const selectAllBranchHandler = (value: CheckboxChangeEvent) => {
    setIsAllBranchSelected(value?.target?.checked);
  };

  return (
    <Form form={form}>
      {/* ---------------------------------- Header ---------------------------------- */}
      <CustomDrawerHeader
        hasLeftSide
        leftSideContent={
          <>
            <CustomSwitch
              valuePropName="isBannerActive"
              name="isBannerActive"
              checkedChildren="فعال"
              unCheckedChildren="غیر فعال"
              defaultValue={false}
              defaultChecked={false}
              checked={isActiveSwitch}
              onChange={(e: any) => setIsActiveSwitch(e)}
            />
            <CustomButton onClick={drawerCloseHandler}>انصراف</CustomButton>
            <CustomButton
              type="primary"
              loading={isCreateServiceDataLoading || isUpdateServiceDataLoading}
              onClick={onSubmit}
            >
              {id && id > 0 ? "ویرایش" : "ثبت"}
            </CustomButton>
          </>
        }
        title={id > 0 ? "ویرایش بنر" : "ایجاد بنر جدید"}
        closeDrawerHandler={drawerCloseHandler}
      />
      {/* ---------------------------------- Image Section ---------------------------------- */}
      <Div
        loading={isActiveBannersDataLoading}
        className="modify-banner-context-container"
      >
        <CustomDivider text="تصویر" />
        <CustomUploader
          fileList={fileList}
          setFileList={setFileList}
          isDataLoading={isUploadFileLoading}
          isReadOnly={false}
          className="banner-service-image-content-placeholder"
          uploaderText={
            <div className="">
              <div className="upload-text">لوگو</div>
              <div className="upload-logo">
                <AiOutlinePlus />
              </div>
            </div>
          }
          hasUploaderIcon={false}
          maxCount={1}
          isDisabled={fileList?.length >= 1}
          UploadSizeLimitConfig={{
            isActive: true,
            text: "حداکثر 2 مگابایت",
            size: 2,
          }}
          validFileFormat={["image/png", "image/jpeg", "image/jpg"]}
          imageSetter={setImageName}
          name="bannerImage"
          onChange={(e: any) => onUploadFileChange(e, setImageName, setFileList)}
          rules={[
            () => ({
              validator() {
                if (imageName?.length < 1) {
                  return Promise.reject(new Error("لطفا تصویر بنر را انتخاب کنید"));
                }

                return Promise.resolve();
              },
            }),
          ]}
        />
        {/* ---------------------------------- اطلاعات اولیه ---------------------------------- */}
        <CustomDivider text="اطلاعات اولیه" />
        <Row gutter={[16, 16]}>
          <Col lg={12} md={12} sm={12} xs={24}>
            <CustomInput
              label="عنوان"
              placeholder="عنوان"
              name="title"
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col lg={12} md={12} sm={12} xs={24}>
            <SingleVerticalItem
              value={selectedItems?.branch?.title ?? "-"}
              label="محل نمایش"
            />
          </Col>

          <Col span={24}>
            <CustomInput
              label="لینک بنر"
              placeholder="app.staging.example.com"
              name="imageLink"
              rules={[REQUIRED_RULE]}
            />
          </Col>

          <Col span={24}>
            <CustomTextArea label="توضیحات بنر" name="description" />
          </Col>
        </Row>

        {/* ---------------------------------- اعمال برای واحد های زیر---------------------------------- */}
        <Div loading={allBranchesDataLoading}>
          <CustomDivider text="اعمال برای واحد های زیر" />
          <div className="flex flex-col gap-4">
            <CustomSingleCheckbox
              name="acceptTerms"
              label="انتخاب تمام واحدها"
              valuePropName="checked"
              hasVerticalLabel
              onChange={selectAllBranchHandler}
            >
              تمام واحدها
            </CustomSingleCheckbox>
            <CustomTransfer
              onChange={onChange}
              targetKeys={targetKeys}
              selectedKeys={selectedKeys}
              onSelectChange={onSelectChange}
              titles={["تمام واحد ها", "واحد های انتخاب شده"]}
              dataSource={transferSourceCreator(allBranchesData)}
              render={itemRenderer}
              pagination
              showSearch
              disabled={isAllBranchSelected}
            />
          </div>
        </Div>
      </Div>
    </Form>
  );
};

export default ModifyBannerContent;
