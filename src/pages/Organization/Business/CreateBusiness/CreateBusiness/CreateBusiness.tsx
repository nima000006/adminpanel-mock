import { useState } from "react";

import { Steps } from "antd";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { Link } from "react-router";
import { toast } from "react-toastify";

import CustomCard from "@components/CustomCard/CustomCard";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { isImageFormatValid, isImageSizeValid } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { UPLOAD_FILE_GENERAL } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { MODIFY_BUSINESS_LIST_PAGE_ROUTE } from "@infra/router/routes/organization";
import { useBusinessUploadFileMutation } from "@infra/states/redux/Apis/business/business/businessApi";
import {
  FILE_TYPE_NOT_SUPPORTED,
  SIZE_EXCEED_ERROR,
} from "@infra/VARS/globalToasts/globalToasts";

import CreateBranchStep from "./helper/components/CreateBranchStep/CreateBranchStep";
import CreateBusinessStep from "./helper/components/CreateBusinessStep/CreateBusinessStep";
import { BusinessOnUploadFileSuccess } from "./helper/components/DescAndDocumentsSection/@types/@descAndDocumentsSection";
import IdentitiesStep from "./helper/components/IdentitiesStep/IdentitiesStep";
import UploadDocumentsStep from "./helper/components/UploadDocumentsStep/UploadDocumentsStep";
import "./_createBusiness.scss";

const CreateBusiness = () => {
  const {
    params: { step },
  } = useQueryParams();

  const [currentStep, setCurrentStep] = useState(step ? Number(step) : 0);

  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={MODIFY_BUSINESS_LIST_PAGE_ROUTE}>کسب و کار</Link>,
      },
      {
        title: "ایجاد کسب و کار",
      },
    ],
  });

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  //? ================================  Api Calls ================================
  // get id upload file
  const [uploadFile, { isLoading: isUploadFileLoading }] =
    useBusinessUploadFileMutation();

  //* ================================ Util Functions ================================
  // onUploadFileSuccess
  const onUploadFileSuccess = ({ setImage, response }: BusinessOnUploadFileSuccess) => {
    setImage(response?.fileId?.toString());
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
        imageListSetter?.([]);
        // setImage("");
      });
  };

  const stepComponents = [
    <CreateBusinessStep nextStep={nextStep} />,
    <CreateBranchStep nextStep={nextStep} prevStep={prevStep} />,
    <UploadDocumentsStep nextStep={nextStep} prevStep={prevStep} />,
    <IdentitiesStep
      prevStep={prevStep}
      onUploadFileChange={onUploadFileChange}
      loading={isUploadFileLoading}
    />,
  ];

  return (
    <CustomCard className="create-business-container">
      <Steps
        className="ant-steps-horizontal"
        current={currentStep}
        items={[
          {
            title: "ایجاد کسب و کار",
            description: "پر کردن فرم کسب و کار",
          },
          {
            title: "ایجاد شعبه",
            description: "پر کردن فرم اطلاعات شعبه مرکزی",
          },
          {
            title: "بارگذاری اسناد",
            description: "بارگذاری اسناد مورد نیاز",
          },
          {
            title: "هویت‌ها",
            description: "معرفی مدیر ارشد و ادمین کسب و کار",
          },
        ]}
        size="small"
        // orientation="horizontal"
      />
      <div className="step-content">{stepComponents[currentStep]}</div>
    </CustomCard>
  );
};
export default CreateBusiness;
