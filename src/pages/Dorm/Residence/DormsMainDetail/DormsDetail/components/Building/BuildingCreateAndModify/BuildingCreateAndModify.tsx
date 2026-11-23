import { useEffect, useState } from "react";

import { Col, Form, Row } from "antd";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { AiOutlinePlus } from "react-icons/ai";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import {
  makeSearchParams,
  fileDirCreator,
  fileNameCreator,
  isImageFormatValid,
  isImageSizeValid,
  selectDefaultValueGenerator,
} from "@infra/helpers/utils";
import useBranchCode from "@infra/hooks/useBranchCode/useBranchCode";
import useQueryParams from "@infra/hooks/useQueryParams";
import { UPLOAD_FILE_GENERAL } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import {
  DORM_LIST_DETAIL_PAGE_ROUTE,
  DORM_LIST_PAGE_ROUTE,
} from "@infra/router/routes/dorm";
import { useLazyGetDormResidenceFacilityTypesQuery } from "@infra/states/redux/Apis/dorm/base/dormBaseApi";
import {
  DormCreateUploadFileResponse,
  useDormCreateUploadFileMutation,
  useDormUploadFileMutation,
} from "@infra/states/redux/Apis/dorm/basicInfo/dormBasicInfo";
import {
  useGetResidenceBuildingInfoMutation,
  useResidenceCreateBuildingMutation,
  useResidenceUpdateBuildingMutation,
} from "@infra/states/redux/Apis/dorm/residence/dormResidenceApi";
import {
  FILE_TYPE_NOT_SUPPORTED,
  SIZE_EXCEED_ERROR,
} from "@infra/VARS/globalToasts/globalToasts";

import {
  CreateBuildingFormTypes,
  DormFacilitiesType,
  ResidenceCreateBuildingResponse,
  ResidenceUpdateBuildingResponse,
  SelectType,
} from "./@types/@buildingCreateAndModify";
import BuildingInfo from "./helper/components/BuildingInfo/BuildingInfo";
import BuildingLocation from "./helper/components/BuildingLocation/BuildingLocation";
import BuildingRules from "./helper/components/BuildingRules/BuildingRules";
import DormResidenceFacilities, {
  allFacilitiesId,
} from "./helper/components/DormResidenceFacilities/DormResidenceFacilities";
import { GetResidenceBuildingInfoResponse } from "../../../_shared/component/SingleCards/DormBuildingSingleCard/helper/drawers/BuildingDetail/@types/@buildingDetailDrawerContent";
import { dormRecordsStatus } from "../../../_shared/utils/DormMainDetailUtils";
import {
  DormResidenceFacilityTypes,
  GetDormResidenceFacilityTypesResponse,
} from "./helper/components/DormResidenceFacilities/@types/@dormResidenceFacilities";
import "./_buildingCreateAndModify.scss";

const CREATE_BUILDING_SUCCESS_MSG = "ساختمان جدید با موفقیت ایجاد شد.";
const UPDATE_BUILDING_SUCCESS_MSG = "تغییرات با موفقیت اعمال شد.";
const BRANCH_CODE_ERROR_MSG = "شناسه واحد دانشگاهی صحیح نمی باشد.";

const BuildingCreateAndModify = () => {
  const [activeCity, setActiveCity] = useState(true);
  const [lat, setLat] = useState<number>(35.699739);
  const [lng, setLng] = useState<number>(51.338097);

  const [facilitiesData, setFacilitiesData] = useState<DormFacilitiesType[]>([]);
  const [facilityList, setFacilityList] = useState<DormResidenceFacilityTypes[] | []>([]);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const [firstImageList, setFirstImageList] = useState<UploadFile[]>([]);
  const [secondImageList, setSecondImageList] = useState<UploadFile[]>([]);
  const [thirdImageList, setThirdImageList] = useState<UploadFile[]>([]);
  const [fourthImageList, setFourthImageList] = useState<UploadFile[]>([]);

  const [firstImageName, setFirstImageName] = useState("");
  const [secondImageName, setSecondImageName] = useState("");
  const [thirdImageName, setThirdImageName] = useState("");
  const [fourthImageName, setFourthImageName] = useState("");

  const { params: url } = useQueryParams();
  const navigate = useNavigate();

  const [buildingForm] = Form.useForm<CreateBuildingFormTypes>();

  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={DORM_LIST_PAGE_ROUTE}>اقامتگاه ها</Link>,
      },
      ...(url?.title
        ? [
            {
              title: url?.title,
            },
          ]
        : []),
      {
        title: url?.buildingId ? "ویرایش ساختمان" : "ایجاد ساختمان",
      },
    ],
  });

  const { branchCode } = useBranchCode();

  //? ================================  Api Calls ================================

  const [getFacilityTypeData, { data: facilityTypeData }] =
    useLazyGetDormResidenceFacilityTypesQuery();

  const [createBuilding, { isLoading: isCreateBuildingLoading }] =
    useResidenceCreateBuildingMutation();

  const [getBuildingInfo, { isLoading: isBuildingDataLoading }] =
    useGetResidenceBuildingInfoMutation();

  const [updateBuilding, { isLoading: isUpdateBuildingLoading }] =
    useResidenceUpdateBuildingMutation();

  // UPLOAD FILE
  const [uploadFile, { isLoading: isUploadFileLoading }] = useDormUploadFileMutation();
  const [createUploadFile, { isLoading: isCreateUploadFileLoading }] =
    useDormCreateUploadFileMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (url?.buildingId) {
      getBuildingInfo({
        body: {
          _data_: {
            id: url?.buildingId,
          },
        },
        params: {
          relation: "1f58e476ee3d45b0be6b100b0caa73ae", //we should set this to get data
        },
      })
        .unwrap()
        .then(getBuildingInfoSuccess);
    }

    getFacilityTypeData({
      maxResults: 2000,
      firstResult: 0,
    })
      .unwrap()
      .then(getFacilityTypeDataSuccess);
  }, []);

  //* ================================ Util Functions ================================
  const getFacilityTypeDataSuccess = (value: GetDormResidenceFacilityTypesResponse) => {
    if (value?.status === 200) {
      //add all item, becaus it is not handle in api
      setFacilityList(() => [
        {
          recordStatus: +allFacilitiesId,
          title: "همه",
          id: +allFacilitiesId,
        },
        ...(value?.data || []),
      ]);
    }
  };

  const openUpdateModalHandler = () => {
    setIsUpdateModalOpen(true);
  };
  const closeUpdateModalHandler = () => {
    setIsUpdateModalOpen(false);
  };

  const facilitiesCreator = () => {
    const facilitiesList = facilitiesData?.map((item) => {
      return {
        facilityId: item?.title?.id?.toString(),
        unit: item?.unit,
        amount: item?.amount,
      };
    });

    return facilitiesList;
  };

  const rulesCreator = () => {
    const value = buildingForm.getFieldsValue();

    // contract rules
    const rules: { RuleAndPrincipleId: string }[] = [];

    value?.financeRules?.forEach((item: SelectType) =>
      rules.push({ RuleAndPrincipleId: item?.code?.toString() })
    );
    value?.disciplinaryRules?.forEach((item: SelectType) =>
      rules.push({ RuleAndPrincipleId: item?.code?.toString() })
    );
    value?.generalRules?.forEach((item: SelectType) =>
      rules.push({ RuleAndPrincipleId: item?.code?.toString() })
    );
    value?.cancellingRules?.forEach((item: SelectType) =>
      rules.push({ RuleAndPrincipleId: item?.code?.toString() })
    );
    value?.installmentsRules?.forEach((item: SelectType) =>
      rules.push({ RuleAndPrincipleId: item?.code?.toString() })
    );

    return rules;
  };

  const createBuildingHandler = (value: CreateBuildingFormTypes) => {
    const fileIds = [firstImageName, secondImageName, thirdImageName, fourthImageName];

    const AssociationFileBuilding = fileIds
      .filter(Boolean)
      .map((id) => ({ uploadFileId: id }));

    rulesCreator();
    if (!url?.buildingId) {
      createBuilding({
        form: "CreateBuilding",
        data: {
          title: value?.buildingname,
          genderId: value?.gender?.code?.toString(),
          qualityId: value?.quality?.code?.toString(),
          sizeOfBuilding: value?.buildingArea,
          description: value?.buildingDesc,
          regionId: value?.city?.code?.toString(),
          zipCode: value?.postalCode,
          phoneNumber: value?.phoneNumber,
          address: value?.address,
          longitude: lng?.toString(),
          latitude: lat?.toString(),
          dormitoryId: url?.id,
          AssociationRuleAndPrinciple: rulesCreator(),
          AssociationScopeOfUseOfFacility: facilitiesCreator(),
          AssociationfileBuilding: AssociationFileBuilding,
        },
      })
        .unwrap()
        .then(createBuildingSuccess);
    } else {
      openUpdateModalHandler();
    }
  };

  const updateBuildingHandler = () => {
    const value = buildingForm.getFieldsValue();
    const fileIds = [firstImageName, secondImageName, thirdImageName, fourthImageName];

    const AssociationFileBuilding = fileIds
      .filter(Boolean)
      .map((id) => ({ uploadFileId: id }));

    updateBuilding({
      form: "ViewDetailsOfBuilding",
      id: "052c8d9c6fd64922b4b0675b2ad4e0eb",
      data: {
        title: value?.buildingname,
        regionId: value?.city?.code,
        longitude: lng,
        recordStatus: value?.status?.code,
        genderId: value?.gender?.code,
        zipCode: value?.postalCode,
        latitude: lat,
        qualityId: value?.quality?.code,
        sizeOfBuilding: value?.buildingArea,
        phoneNumber: value?.phoneNumber,
        dormitoryId: +url?.id,
        description: value?.buildingDesc,
        address: value?.address,
        AssociationRuleAndPrinciple: rulesCreator(),
        AssociationScopeOfUseOfFacility: facilitiesCreator(),
        AssociationfileBuilding: AssociationFileBuilding,
        id: +url?.buildingId,
      },
    })
      .unwrap()
      .then(updateBuildingSuccess);
  };

  const getBuildingInfoSuccess = async (value: GetResidenceBuildingInfoResponse) => {
    if (value?.status === 200) {
      if (value?.data?.AssociationfileBuilding?.[0]) {
        if (value?.data?.AssociationfileBuilding?.[0]?.UploadFiles) {
          setFirstImageList([value?.data?.AssociationfileBuilding?.[0]?.UploadFiles]);
          setFirstImageName(
            value?.data?.AssociationfileBuilding?.[0]?.UploadFiles?.id?.toString()
          );
        }
      }
      if (value?.data?.AssociationfileBuilding?.[1]) {
        if (value?.data?.AssociationfileBuilding?.[1]?.UploadFiles) {
          setSecondImageList([value?.data?.AssociationfileBuilding?.[1]?.UploadFiles]);
          setSecondImageName(
            value?.data?.AssociationfileBuilding?.[1]?.UploadFiles?.id?.toString()
          );
        }
      }
      if (value?.data?.AssociationfileBuilding?.[2]) {
        if (value?.data?.AssociationfileBuilding?.[2]?.UploadFiles) {
          setThirdImageList([value?.data?.AssociationfileBuilding?.[2]?.UploadFiles]);
          setThirdImageName(
            value?.data?.AssociationfileBuilding?.[2]?.UploadFiles?.id?.toString()
          );
        }
      }
      if (value?.data?.AssociationfileBuilding?.[3]) {
        if (value?.data?.AssociationfileBuilding?.[3]?.UploadFiles) {
          setFourthImageList([value?.data?.AssociationfileBuilding?.[3]?.UploadFiles]);
          setFourthImageName(
            value?.data?.AssociationfileBuilding?.[3]?.UploadFiles?.id?.toString()
          );
        }
      }

      buildingForm.setFieldsValue({
        buildingname: value?.data?.title,
        gender: selectDefaultValueGenerator(value?.data?.AssociationGender),
        quality: selectDefaultValueGenerator(value?.data?.AssociationQuality),
        buildingArea: value?.data?.sizeOfBuilding,
        buildingDesc: value?.data?.description,
        province: selectDefaultValueGenerator(
          value?.data?.AssociationRegion?.AssociationRegionType
        ),
        city: selectDefaultValueGenerator(value?.data?.AssociationRegion),
        postalCode: value?.data?.zipCode,
        phoneNumber: value?.data?.phoneNumber,
        address: value?.data?.address,
        status: selectDefaultValueGenerator(value?.data?.AssociationActiveStatus),
        financeRules: selectDefaultValueGenerator(
          value?.data?.AssociationGeneralBuilding?.filter((item) => item?.typeId === 2) // مالی
        ),
        disciplinaryRules: selectDefaultValueGenerator(
          value?.data?.AssociationGeneralBuilding?.filter((item) => item?.typeId === 3) // انضباطی
        ),
        generalRules: selectDefaultValueGenerator(
          value?.data?.AssociationGeneralBuilding?.filter((item) => item?.typeId === 1) // عمومی
        ),
        cancellingRules: selectDefaultValueGenerator(
          value?.data?.AssociationGeneralBuilding?.filter((item) => item?.typeId === 4) // کنسلی
        ),
        installmentsRules: selectDefaultValueGenerator(
          value?.data?.AssociationGeneralBuilding?.filter((item) => item?.typeId === 6) // اقساطی
        ),
      });

      setActiveCity(false);

      setLat(value?.data?.latitude);
      setLng(value?.data?.longitude);

      /* if "AssociationScopeOfUseOfFacility" key is not in api
       when add facilities in edit mode, the add facility modal doesn't work properly */
      if (value?.data?.AssociationScopeOfUseOfFacility) {
        setFacilitiesData(
          value?.data?.AssociationScopeOfUseOfFacility?.map((item) => {
            return {
              title: {
                title: item?.AssociationCategoryFacility?.title,
                id: item?.AssociationCategoryFacility?.id,
              },
              type: {
                title:
                  item?.AssociationCategoryFacility?.AssociationCategoryFacilityType
                    ?.title,
                id: item?.AssociationCategoryFacility?.AssociationCategoryFacilityType
                  ?.id,
              },
              unit: item?.unit,
              amount: item?.amount?.toString(),
              id: item?.id?.toString(),
            };
          })
        );
      } else {
        setFacilitiesData([]);
      }
    }
  };

  const navigateHandler = () => {
    navigate({
      pathname: DORM_LIST_DETAIL_PAGE_ROUTE,
      search: makeSearchParams({
        id: url?.id,
        title: url?.title,
        mode: url?.mode,
        type: url?.type,
        capacity: url?.capacity,
        statusTitle: url?.statusTitle,
        statusId: url?.statusId,
        statusBtn: url?.statusBtn,
        genderId: url?.genderId,
        genderTitle: url?.genderTitle,
        qualityTitle: url?.qualityTitle,
      }),
    });
  };

  const createBuildingSuccess = async (value: ResidenceCreateBuildingResponse) => {
    if (value?.status === 204) {
      toast.success(CREATE_BUILDING_SUCCESS_MSG, {
        toastId: CREATE_BUILDING_SUCCESS_MSG,
      });
      navigateHandler();
    }
  };

  const updateBuildingSuccess = async (value: ResidenceUpdateBuildingResponse) => {
    if (value?.status === 200) {
      toast.success(UPDATE_BUILDING_SUCCESS_MSG, {
        toastId: UPDATE_BUILDING_SUCCESS_MSG,
      });
      navigateHandler();
    }
  };

  // onUploadFileChange
  const onUploadFileChange = (
    image: UploadChangeParam<UPLOAD_FILE_GENERAL>,
    setImage: React.Dispatch<React.SetStateAction<string>>,
    imageListSetter?: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>
  ) => {
    if (!branchCode) {
      return toast.error(BRANCH_CODE_ERROR_MSG, { toastId: BRANCH_CODE_ERROR_MSG });
    }

    const formData = new FormData();
    formData.append("dir", fileDirCreator());
    formData.append("name", fileNameCreator() + `.${image?.file?.name?.split(".")[1]}`);
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
      .then((response) => {
        createUploadFile({
          table: "UploadFile",
          data: {
            ...response,
            baseUrl: import.meta.env.VITE_API_BPMS_UPLOAD_URL,
            tenant_id: branchCode?.toString(),
          },
        })
          .unwrap()
          .then((res) => {
            onUploadFileSuccess({ response: res, setImage });
          });
      })
      // .then((response) => onUploadFileSuccess({ response, setImage }))
      .catch(() => {
        console.error("error");
        imageListSetter?.([]);
        setImage("");
      });
  };
  // ON UPLOAD SUCCESS
  const onUploadFileSuccess = ({
    setImage,
    response,
  }: {
    setImage: React.Dispatch<React.SetStateAction<string>>;
    response: DormCreateUploadFileResponse;
  }) => {
    setImage(response?.id?.toString());
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <>
      <ConfirmationModalWithContent
        title="ثبت تغییرات"
        isModalOpen={isUpdateModalOpen}
        confirmBtnText="بله ثبت کن"
        backBtnText="انصراف"
        closeModalHandler={closeUpdateModalHandler}
        onConfirmClickHandler={updateBuildingHandler}
        isConfirmButtonLoading={isUpdateBuildingLoading}
        content={
          <div className="update-building-confirmation-modal-container">
            <p className="desc">آیا از ثبت تغییرات اطمینان دارید؟</p>
          </div>
        }
        showIcon={false}
      />
      <Div loading={url?.buildingId ? isBuildingDataLoading : false}>
        <Form
          className="building-create-and-modify-page-container"
          form={buildingForm}
          onFinish={createBuildingHandler}
          scrollToFirstError={{ block: "end", behavior: "smooth" }}
        >
          <div className="building-info">
            <CustomDivider
              text="ساختمان"
              extraContent={
                url?.buildingId && (
                  <CustomSelect
                    name="status"
                    placeholder="انتخاب کنید"
                    form={buildingForm}
                    options={dormRecordsStatus}
                  />
                )
              }
              extraContentClassName="status-container"
            />
            <Row gutter={[16, 16]}>
              <Col>
                <CustomUploader
                  fileList={firstImageList}
                  setFileList={setFirstImageList}
                  isReadOnly={false}
                  uploaderText={
                    <div className="building-image-attachment-container">
                      <div className="upload-logo-main">
                        <AiOutlinePlus />
                      </div>
                      <div className="upload-text-main">تصویر اول (حداکثر 2 مگابایت)</div>
                    </div>
                  }
                  hasUploaderIcon={false}
                  maxCount={1}
                  // isDataLoading={isUploadFileLoading}
                  // isDisabled={mainImageList?.length >= 1}
                  UploadSizeLimitConfig={{
                    isActive: true,
                    text: "حداکثر 2 مگابایت",
                    size: 2,
                  }}
                  validFileFormat={["image/png", "image/jpeg", "image/jpg"]}
                  name="firstImage"
                  imageGetterSource="dorm"
                  isDataLoading={isUploadFileLoading || isCreateUploadFileLoading}
                  isDisabled={firstImageList?.length >= 1}
                  imageSetter={setFirstImageName}
                  onChange={(e: any) =>
                    onUploadFileChange(e, setFirstImageName, setFirstImageList)
                  }
                />
              </Col>
              <Col>
                <CustomUploader
                  fileList={secondImageList}
                  setFileList={setSecondImageList}
                  isReadOnly={false}
                  uploaderText={
                    <div className="building-image-attachment-container">
                      <div className="upload-logo-main">
                        <AiOutlinePlus />
                      </div>
                      <div className="upload-text-main">تصویر دوم (حداکثر 2 مگابایت)</div>
                    </div>
                  }
                  hasUploaderIcon={false}
                  maxCount={1}
                  // isDataLoading={isUploadFileLoading}
                  // isDisabled={mainImageList?.length >= 1}
                  UploadSizeLimitConfig={{
                    isActive: true,
                    text: "حداکثر 1 مگابایت",
                    size: 1,
                  }}
                  validFileFormat={["image/png", "image/jpeg", "image/jpg"]}
                  name="secondImage"
                  imageGetterSource="dorm"
                  isDataLoading={isUploadFileLoading || isCreateUploadFileLoading}
                  isDisabled={secondImageList?.length >= 1}
                  imageSetter={setSecondImageName}
                  onChange={(e: any) =>
                    onUploadFileChange(e, setSecondImageName, setSecondImageList)
                  }
                />
              </Col>
              <Col>
                <CustomUploader
                  fileList={thirdImageList}
                  setFileList={setThirdImageList}
                  isReadOnly={false}
                  uploaderText={
                    <div className="building-image-attachment-container">
                      <div className="upload-logo-main">
                        <AiOutlinePlus />
                      </div>
                      <div className="upload-text-main">تصویر سوم (حداکثر 2 مگابایت)</div>
                    </div>
                  }
                  hasUploaderIcon={false}
                  maxCount={1}
                  // isDataLoading={isUploadFileLoading}
                  // isDisabled={mainImageList?.length >= 1}
                  UploadSizeLimitConfig={{
                    isActive: true,
                    text: "حداکثر 1 مگابایت",
                    size: 1,
                  }}
                  validFileFormat={["image/png", "image/jpeg", "image/jpg"]}
                  name="thirdImage"
                  imageGetterSource="dorm"
                  isDataLoading={isUploadFileLoading || isCreateUploadFileLoading}
                  isDisabled={thirdImageList?.length >= 1}
                  imageSetter={setThirdImageName}
                  onChange={(e: any) =>
                    onUploadFileChange(e, setThirdImageName, setThirdImageList)
                  }
                />
              </Col>
              <Col>
                <CustomUploader
                  fileList={fourthImageList}
                  setFileList={setFourthImageList}
                  isReadOnly={false}
                  uploaderText={
                    <div className="building-image-attachment-container">
                      <div className="upload-logo-main">
                        <AiOutlinePlus />
                      </div>
                      <div className="upload-text-main">
                        تصویر چهارم (حداکثر 2 مگابایت)
                      </div>
                    </div>
                  }
                  hasUploaderIcon={false}
                  maxCount={1}
                  // isDataLoading={isUploadFileLoading}
                  // isDisabled={mainImageList?.length >= 1}
                  UploadSizeLimitConfig={{
                    isActive: true,
                    text: "حداکثر 1 مگابایت",
                    size: 1,
                  }}
                  validFileFormat={["image/png", "image/jpeg", "image/jpg"]}
                  name="fourthImage"
                  imageGetterSource="dorm"
                  isDataLoading={isUploadFileLoading || isCreateUploadFileLoading}
                  isDisabled={fourthImageList?.length >= 1}
                  imageSetter={setFourthImageName}
                  onChange={(e: any) =>
                    onUploadFileChange(e, setFourthImageName, setFourthImageList)
                  }
                />
              </Col>
            </Row>

            <CustomDivider text="اطلاعات ساختمان" />
            <BuildingInfo residenceTitle={url?.title} buildingForm={buildingForm} />
          </div>

          <BuildingLocation
            buildingForm={buildingForm}
            activeCity={activeCity}
            setActiveCity={setActiveCity}
            mapData={{ lat, setLat, lng, setLng }}
          />
          <BuildingRules buildingForm={buildingForm} />

          <DormResidenceFacilities
            facilitiesData={facilitiesData}
            setFacilitiesData={setFacilitiesData}
            facilityList={facilityList}
            facilityTypeData={facilityTypeData?.data}
          />
          <div className="action-btns-container">
            <CustomButton onClick={navigateHandler}>انصراف</CustomButton>
            <CustomButton
              type="primary"
              htmlType="submit"
              loading={isCreateBuildingLoading}
            >
              ثبت
            </CustomButton>
          </div>
        </Form>
      </Div>
    </>
  );
};

export default BuildingCreateAndModify;
