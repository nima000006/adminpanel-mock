import { useEffect, useState } from "react";

import { Form, Tabs, UploadFile } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { MODIFY_BUSINESS_LIST_PAGE_ROUTE } from "@infra/router/routes/organization";
import {
  useCreateIdentityInBusinessMutation,
  useLazyGetBusinessRequestOwnerInfoDetailsQuery,
} from "@infra/states/redux/Apis/business/business/businessApi";
import { GetBusinessRequestOwnerInfoResponse } from "@pages/Organization/_shared/@types/@organizationTypes";

import {
  IdentitiesStepFormType,
  IdentitiesStepProps,
} from "./@types/@identitiesStepType";
import CreateBusinessAdminTab from "./helper/components/CreateBusinessAdminTab/CreateBusinessAdminTab";
import CreateSeniorManagerTab from "./helper/components/CreateSeniorManagerTab/CreateSeniorManagerTab";
import { CUSTOM_BUSINESS_REQUEST_SUCCESS_MSG } from "../../../../utils/createBusinessUtils";
import "./_identitiesStep.scss";

const IdentitiesStep = ({
  prevStep,
  onUploadFileChange,
  loading,
}: IdentitiesStepProps) => {
  const navigate = useNavigate();
  const [form] = Form.useForm<IdentitiesStepFormType>();

  const [personalImage, setPersonalImage] = useState(""); //عکس پرسنلی (3*4)
  const [adminPersonalImage, setAdminPersonalImage] = useState(""); //عکس پرسنلی (3*4)
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [activeTab, setActiveTab] = useState("1");

  const [personalImageList, setPersonalImageList] = useState<UploadFile[]>([]);

  const {
    params: { businessTempId, id },
  } = useQueryParams();

  //? ================================  Api Calls ================================
  // send upload document
  const [sendIdentityData, { isLoading: sendIdentityDataLoading }] =
    useCreateIdentityInBusinessMutation();

  // get data for edit mode
  const [getEditModeData, { isFetching: isGetDataLoading }] =
    useLazyGetBusinessRequestOwnerInfoDetailsQuery();

  useEffect(() => {
    if (id && businessTempId) {
      getEditModeData({ businessTempHistoryId: +businessTempId })
        .unwrap()
        .then(GetEditModeDataIsSuccess);
    }
  }, [id]);

  //* ================================ Util Functions ================================
  //handler
  const returnHandler = () => {
    prevStep();
  };

  const modalCloseHandler = () => {
    setIsOpenModal(false);
  };

  const submitHandler = () => {
    setIsOpenModal(true);
  };

  const modalConfirmHandler = () => {
    form.submit();
    form.validateFields().then((value: IdentitiesStepFormType) => {
      sendIdentityData({
        businessClerkOwnerUsername: value?.nationalCode,
        businessClerkOwnerRegionId: value?.city?.code,
        businessClerkOwnerPersonalityCode: value?.personalCode,
        businessClerkOwnerMobileNumber: value?.mobile,
        businessClerkOwnerPhoneNumber: value?.activityPhone,
        businessClerkOwnerEmail: value?.email,
        // businessClerkOwnerStudyFieldId: value?.field?.code, // api not ready
        // businessClerkOwnerDegreeId: value?.grade?.code,
        businessClerkOwnerZipCode: value?.postalCode,
        businessClerkOwnerAddress: value?.address,
        businessClerkOwnerMandatoryFileId: +personalImage,
        businessClerkAdminUsername: value?.adminNationalCode,
        businessClerkAdminRegionId: value?.adminCity?.code,
        businessClerkAdminPersonalityCode: value?.adminPersonalCode,
        businessClerkAdminMobileNumber: value?.adminMobile,
        businessClerkAdminPhoneNumber: value?.adminActivityPhone,
        businessClerkAdminEmail: value?.adminEmail,
        // businessClerkAdminStudyFieldId: value?.adminField?.code,
        // businessClerkAdminDegreeId: value?.adminGrade?.code,
        businessClerkAdminZipCode: value?.adminPostalCode,
        businessClerkAdminAddress: value?.adminAddress,
        businessClerkAdminMandatoryFileId: +adminPersonalImage,
        businessTempId: +businessTempId,
      })
        .unwrap()
        .then(sendIdentityDataIsSuccess);
    });
  };

  // success
  const sendIdentityDataIsSuccess = () => {
    navigate(MODIFY_BUSINESS_LIST_PAGE_ROUTE);
    toast.success(CUSTOM_BUSINESS_REQUEST_SUCCESS_MSG("1"), {
      toastId: CUSTOM_BUSINESS_REQUEST_SUCCESS_MSG("1"),
    }); //  به جای 1 باید شماره درخواست پاس داده شود.
    setIsOpenModal(false);
  };

  // set data edit mode
  const GetEditModeDataIsSuccess = (value: GetBusinessRequestOwnerInfoResponse) => {
    form.setFieldsValue({
      firstName: value?.firstName,
      lastName: value?.lastName,
      // genderType:selectDefaultValueGenerator(value?.gender) باید  id  بدهد
      fatherName: value?.fatherName,
      birthdate: dataPlaceHolder({ data: value?.birthDate, isDate: true }),
      nationality: value?.nationality?.toString(),
      nationalCode: value?.nationalCode,
      personalCode: value?.personalityCode,
      mobile: value?.mobileNumber,
      email: value?.email,
      activityPhone: value?.phoneNumber,
      // province: selectDefaultValueGenerator(value?.province),
      // city: selectDefaultValueGenerator(value?.city),
      postalCode: value?.zipCode,
      address: value?.address,
      rangePicker: [dayjs(value.activityStartDate), dayjs(value.activityEndDate)],
    });
    if (value?.personalPhoto) {
      setPersonalImageList([
        {
          uid: "-1",
          name: "personal-photo.jpg",
          status: "done",
          url: value.personalPhoto, // لینک عکس از بک
        },
      ]);
      setPersonalImage(value.personalPhoto); // اگر لازم داری آدرس رو جداگانه نگه داری
    }
  };

  const tabsItems = [
    {
      label: "مدیر ارشد",
      children: (
        <CreateSeniorManagerTab
          form={form}
          onUploadFileChange={onUploadFileChange}
          loading={loading}
          isGetDataLoading={isGetDataLoading}
          setPersonalImage={setPersonalImage}
          personalImageList={personalImageList}
          setPersonalImageList={setPersonalImageList}
        />
      ),

      key: "1",
    },
    {
      label: "ادمین کسب و کار",
      children: (
        <CreateBusinessAdminTab
          form={form}
          onUploadFileChange={onUploadFileChange}
          loading={loading}
          setAdminPersonalImage={setAdminPersonalImage}
        />
      ),

      key: "2",
    },
  ];

  const handleTabChange = async (key: string) => {
    if (key === "2") {
      try {
        await form.validateFields([
          "nationalCode",
          "city",
          "personalCode",
          "mobile",
          "email",
          "personalCode",
          "address",
          "personalImage",
        ]);
        setActiveTab("2");
      } catch (_) {
        toast.error("لطفاً ابتدا اطلاعات مدیر ارشد را کامل وارد کنید.");
      }
    } else {
      setActiveTab("1");
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isOpenModal && (
        <ConfirmationModalWithContent
          title="ثبت "
          isModalOpen={isOpenModal}
          closeModalHandler={modalCloseHandler}
          onConfirmClickHandler={modalConfirmHandler}
          content={
            <p className="modal-text">آیا از ثبت نهایی کسب و کار اطمینان دارید؟</p>
          }
          backBtnText="بازگشت"
          confirmBtnText="ثبت نهایی"
          showIcon={false}
        />
      )}

      <div className="business-identities-step">
        <CustomAlert
          type="info"
          showIcon
          description="برای نهایی کردن فرایند ایجاد کسب و کار، لطفاً اطلاعات مدیر ارشد و ادمین کسب و کار را در فرم زیر وارد نمایید."
          className="alert"
        />
        <Tabs
          items={tabsItems}
          activeKey={activeTab}
          onChange={handleTabChange}
          className="business-identities-tab-items"
        />

        <div className="btn-wrapper">
          <CustomButton type="default" onClick={returnHandler}>
            برگشت
          </CustomButton>
          <CustomButton
            type="primary"
            onClick={submitHandler}
            loading={sendIdentityDataLoading}
            disabled={activeTab !== "2"}
          >
            ثبت نهایی
          </CustomButton>
        </div>
      </div>
    </>
  );
};
export default IdentitiesStep;
