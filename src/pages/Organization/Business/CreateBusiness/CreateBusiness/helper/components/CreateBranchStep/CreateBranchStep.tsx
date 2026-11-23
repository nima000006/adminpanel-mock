import { useEffect, useState } from "react";

import { Form } from "antd";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomMap from "@components/CustomInputs/CustomMap/CustomMap";
import Div from "@components/Renderers/Div/Div";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useCreateBranchInBusinessMutation,
  useLazyGetBranchBusinessRequestInformationDetailsQuery,
} from "@infra/states/redux/Apis/business/business/businessApi";
import { BranchBusinessRequestInformationDetailsResponse } from "@pages/Organization/_shared/@types/@organizationTypes";
import LocationInfoSection from "@pages/Organization/_shared/components/LocationInfoSection/LocationInfoSection";
import OtherDescription from "@pages/Organization/_shared/components/OtherDescription/OtherDescription";

import {
  BranchFormType,
  CreateBranchInBusinessResponse,
  CreateBranchStepProps,
} from "./@types/@createBranchStepTypes";
import BranchInfoSection from "./components/BranchInfoSection/BranchInfoSection";
import CallInfoSection from "./components/CallInfoSection/CallInfoSection";
import "./_createBranchStep.scss";

const CreateBranchStep = ({ nextStep, prevStep }: CreateBranchStepProps) => {
  const [form] = Form.useForm();
  const [lat, setLat] = useState<number>(35.699739);
  const [lng, setLng] = useState<number>(51.338097);
  const {
    params: { businessTempId, id },
    setSearchParams,
  } = useQueryParams();

  //? ================================  Api Calls ================================
  // send branch data
  const [sendCreateBranchData, { isLoading: sendCreateBranchDataLoading }] =
    useCreateBranchInBusinessMutation();

  // get data for edit mode
  const [getEditModeData, { isFetching: isGetDataLoading }] =
    useLazyGetBranchBusinessRequestInformationDetailsQuery();

  useEffect(() => {
    if (id) {
      getEditModeData({ businessTempHistoryId: +businessTempId })
        .unwrap()
        .then(GetEditModeDataIsSuccess);
    }
  }, [id]);

  //* ================================ Util Functions ============================
  //handler
  const backHandler = () => {
    prevStep();
  };
  const submitHandler = () => {
    form.submit();
    form.validateFields().then((value: BranchFormType) => {
      sendCreateBranchData({
        branchTitle: value?.branchTitle,
        businessTempId: +businessTempId,
        code: value?.branchCode,
        branchMobileNumber: value?.mobile,
        branchEmail: value?.email,
        branchPhoneNumber: value?.branchPhone,
        regionId: value?.city?.code,
        branchZipCode: value?.postalCode,
        branchAddress: value?.address,
        branchLatitude: lat,
        branchLongitude: lng,
        branchDescription: value?.description,
      })
        .unwrap()
        .then(sendCreateBranchDataIsSuccess);
    });
    nextStep(); // این بعد از اتمام کار حذف بشه
  };

  //success
  const sendCreateBranchDataIsSuccess = (value: CreateBranchInBusinessResponse) => {
    setSearchParams({
      businessTempId: value.businessTempId?.toString(),
    });
    nextStep();
  };

  // set data for edit mode
  const GetEditModeDataIsSuccess = (
    value: BranchBusinessRequestInformationDetailsResponse
  ) => {
    form.setFieldsValue({
      branchTitle: value?.branchTitle,
      branchCode: value?.branchCode,
      // branchType:selectDefaultValueGenerator(value?.branchType)// باید id داده شود
      mobile: value?.branchMobileNumber,
      email: value?.branchEmail,
      branchPhone: value?.branchPhoneNumber,
      province: value?.province,
      city: value?.city,
      postalCode: value?.branchZipCode,
      address: value?.branchAddress,
      description: value?.branchDescription,
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div className="business-create-branch-step-container" loading={isGetDataLoading}>
      <BranchInfoSection form={form} />
      <CallInfoSection form={form} />
      <div>
        <LocationInfoSection form={form} />
        <CustomMap lat={lat} lng={lng} setLat={setLat} setLng={setLng} />
      </div>
      <OtherDescription form={form} />
      <div className="btn-wrapper">
        <CustomButton type="primary" ghost onClick={backHandler}>
          برگشت
        </CustomButton>
        <CustomButton
          type="primary"
          onClick={submitHandler}
          loading={sendCreateBranchDataLoading}
        >
          ثبت و ادامه
        </CustomButton>
      </div>
    </Div>
  );
};
export default CreateBranchStep;
