import { useEffect, useState } from "react";

import { Form, UploadFile } from "antd";
import { PiBuildings, PiUserLight } from "react-icons/pi";
import { useNavigate } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";
import Div from "@components/Renderers/Div/Div";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { MODIFY_BUSINESS_LIST_PAGE_ROUTE } from "@infra/router/routes/organization";
import { useLazyGetTaxTypeQuery } from "@infra/states/redux/Apis/basicInformation/basicInformationApis";
import {
  useCreateBusinessGenuineStepMutation,
  useCreateBusinessLegalStepMutation,
  useLazyGetBusinessRequestInformationDetailsQuery,
} from "@infra/states/redux/Apis/business/business/businessApi";
import { BusinessRequestInformationDetailsResponse } from "@pages/Organization/_shared/@types/@organizationTypes";

import DescAndDocumentsSection from "../DescAndDocumentsSection/DescAndDocumentsSection";
import {
  CreateBusinessStepFormType,
  CreateBusinessStepProps,
} from "./@types/@createBusinessTypes";
import { CreateBusinessGenuineStepResponse } from "./components/BusinessInfoGenuine/@types/@businessInfoGenuineProps";
import BusinessInfoGenuine from "./components/BusinessInfoGenuine/BusinessInfoGenuine";
import { CreateBusinessLegalStepResponse } from "./components/BusinessInfoLegal/@types/@businessInfoLegalTypes";
import BusinessInfoLegal from "./components/BusinessInfoLegal/BusinessInfoLegal";
import { SegmentMode } from "../../../../utils/createBusinessUtils";
import "./_createBusinessStep.scss";

const CreateBusinessStep = ({ nextStep }: CreateBusinessStepProps) => {
  const [mainImageName, setMainImageName] = useState("");
  const [secondImageName, setSecondImageName] = useState("");
  const [thirdImageName, setThirdImageName] = useState("");
  const [fourthImageName, setFourthImageName] = useState("");
  const [fifthImageName, setFifthImageName] = useState("");

  const [mainImageList, setMainImageList] = useState<UploadFile[]>([]);
  const [secondImageList, setSecondImageList] = useState<UploadFile[]>([]);
  const [thirdImageList, setThirdImageList] = useState<UploadFile[]>([]);
  const [fourthImageList, setFourthImageList] = useState<UploadFile[]>([]);
  const [fifthImageList, setFifthImageList] = useState<UploadFile[]>([]);

  const [view, setView] = useState("2");
  const [form] = Form.useForm<CreateBusinessStepFormType>();
  const navigate = useNavigate();
  const { params: url, setSearchParams } = useQueryParams();

  //? ================================  Api Calls ================================
  // tax type
  const [getTaxTypes, { data: taxTypeData, isLoading: taxTypeDataIsLoading }] =
    useLazyGetTaxTypeQuery();

  // send genuine data
  const [
    sendCreateBusinessGenuineData,
    { isLoading: sendCreateBusinessGenuineDataLoading },
  ] = useCreateBusinessGenuineStepMutation();

  // send legal data
  const [sendCreateBusinessLegalData, { isLoading: sendCreateBusinessLegalDataLoading }] =
    useCreateBusinessLegalStepMutation();

  // get data for edit mode
  const [getEditModeData, { isFetching: isGetListDataLoading }] =
    useLazyGetBusinessRequestInformationDetailsQuery();

  useEffect(() => {
    getTaxTypes(null);
  }, []);

  useEffect(() => {
    if (url?.id) {
      getEditModeData({ businessTempHistoryId: +url?.id })
        .unwrap()
        .then(GetEditModeDataIsSuccess);
    }
  }, [url?.id]);

  //* ================================ Util Functions ================================
  // sending genuine info
  const submitGenuineCreateBusinessHandler = () => {
    form.submit();
    form.validateFields().then((value: CreateBusinessStepFormType) => {
      sendCreateBusinessGenuineData({
        taxTypeId: value?.genuineTaxType?.code,
        economicNumberNatural: value?.genuineIbanCode,
        taxTrackingNumberNatural: value?.genuineTaxTracking,
        licenceNumber: value?.licenseCode,
        title: value?.businessGenuineName,
        tradeTitle: value?.genuineBrandName,
        description: value?.description,
        mandatoryFileId: mainImageName ? mainImageName : null, // بعدا که api درست شد این نباید نال باشه
        secondFileId: secondImageName ? secondImageName : null,
        thirdFileId: thirdImageName ? thirdImageName : null,
        fourthFileId: fourthImageName ? fourthImageName : null,
        fifthFileId: fifthImageName ? fifthImageName : null,
      })
        .unwrap()
        .then(sendCreateBusinessGenuineDataIsSuccess);
    });
    nextStep(); // این خط هم بعدا باید حذف بشه
  };

  // success
  const sendCreateBusinessGenuineDataIsSuccess = (
    value: CreateBusinessGenuineStepResponse
  ) => {
    setSearchParams({
      businessTempId: value.businessTempId?.toString(),
    });
    nextStep();
  };

  // sending legal info
  const submitLegalCreateBusinessHandler = () => {
    form.submit();
    form.validateFields().then((value: CreateBusinessStepFormType) => {
      sendCreateBusinessLegalData({
        taxTypeId: value?.legalTaxType?.code,
        legalPersonalityGroupTypeId: value?.personalityGroupType?.code,
        nationalCodeLegal: value?.nationalId,
        economicNumberLegal: value?.ibanCodeLegal,
        taxTrackingNumberLegal: value?.taxTrackingCode,
        businessTitle: value?.businessLegalName,
        tradeTitle: value?.legalBrandName,
        businessDescription: value?.description,
        mandatoryFileId: mainImageName,
        secondFileId: secondImageName ? secondImageName : null,
        thirdFileId: thirdImageName ? thirdImageName : null,
        fourthFileId: fourthImageName ? fourthImageName : null,
        fifthFileId: fifthImageName ? fifthImageName : null,
      })
        .unwrap()
        .then(sendCreateBusinessLegalDataIsSuccess);
    });
  };

  // success
  const sendCreateBusinessLegalDataIsSuccess = (
    value: CreateBusinessLegalStepResponse
  ) => {
    setSearchParams({
      businessTempId: value.businessTempId?.toString(),
    });
    nextStep();
  };

  // set data for edit mode
  const GetEditModeDataIsSuccess = (value: BusinessRequestInformationDetailsResponse) => {
    form.setFieldsValue({
      businessLegalName: value?.businessTitle,
      // personalityGroupType: selectDefaultValueGenerator(
      //   value?.legalPersonalityGroupTypeId
      // ), //  باید id  بدهد
      registerId: value?.businessTempId?.toString(),
      nationalId: value?.nationalCodeLegal,
      ibanCodeLegal: value?.economicNumberLegal,
      taxTrackingCode: value?.taxTrackingNumberLegal,
      // legalTaxType: selectDefaultValueGenerator(value?.taxType), //  باید  id  بدهد
      legalBrandName: value?.tradeTitle,
      birthdate: dataPlaceHolder({
        data: value?.personalInformation?.birthDate,
        isDate: true,
      }),
      // mobile:value?.  از سمت بک کلید ندارد
      businessGenuineName: value?.businessTitle,
      genuineIbanCode: value?.economicNumberNatural,
      genuineTaxTracking: value?.taxTrackingNumberNatural,
      // genuineTaxType:selectDefaultValueGenerator(value?.taxType),//  باید  id  بدهد
      licenseCode: value?.licenceNumber,
      genuineBrandName: value?.tradeTitle,
      description: value?.businessTempTitle,
    });
    if (value?.filesUrl) {
      Object.entries(value.filesUrl).forEach(([key, url]) => {
        const fileObj: UploadFile[] = [
          {
            uid: key,
            name: key,
            status: "done" as const,
            url,
          },
        ];

        switch (key) {
          case "mainImage":
            setMainImageName(url);
            setMainImageList(fileObj);
            break;
          case "secondImage":
            setSecondImageName(url);
            setSecondImageList(fileObj);
            break;
          case "thirdImage":
            setThirdImageName(url);
            setThirdImageList(fileObj);
            break;
          case "fourthImage":
            setFourthImageName(url);
            setFourthImageList(fileObj);
            break;
          case "fifthImage":
            setFifthImageName(url);
            setFifthImageList(fileObj);
            break;
          default:
            break;
        }
      });
    }
  };

  // back handler
  const cancelCreateBusinessHandler = () => {
    navigate(MODIFY_BUSINESS_LIST_PAGE_ROUTE);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div className="create-business-step" loading={isGetListDataLoading}>
      <div>
        <CustomSegmented
          options={[
            {
              value: "2",
              label: "حقوقی",
              icon: <PiBuildings />,
            },
            {
              value: "1",
              label: "حقیقی",
              icon: <PiUserLight />,
              disabled: false,
            },
          ]}
          className="segmented-container"
          onChange={(value) => setView(value as "2" | "1")}
          value={view}
        />
      </div>

      {view === SegmentMode.legal ? (
        <BusinessInfoLegal
          form={form}
          taxTypeData={taxTypeData}
          loading={taxTypeDataIsLoading}
        />
      ) : (
        <BusinessInfoGenuine
          form={form}
          taxTypeData={taxTypeData}
          loading={taxTypeDataIsLoading}
        />
      )}
      <DescAndDocumentsSection
        view={view}
        form={form}
        setMainImageName={setMainImageName}
        setSecondImageName={setSecondImageName}
        setThirdImageName={setThirdImageName}
        setFourthImageName={setFourthImageName}
        setFifthImageName={setFifthImageName}
        mainImageList={mainImageList}
        setMainImageList={setMainImageList}
        secondImageList={secondImageList}
        setSecondImageList={setSecondImageList}
        thirdImageList={thirdImageList}
        setThirdImageList={setThirdImageList}
        fourthImageList={fourthImageList}
        setFourthImageList={setFourthImageList}
        fifthImageList={fifthImageList}
        setFifthImageList={setFifthImageList}
      />

      <div className="btn-wrapper">
        <CustomButton type="primary" ghost onClick={cancelCreateBusinessHandler}>
          انصراف
        </CustomButton>

        {/* sending genuine or legal information */}
        {view === SegmentMode.legal ? (
          <CustomButton
            type="primary"
            onClick={submitLegalCreateBusinessHandler}
            loading={sendCreateBusinessLegalDataLoading}
          >
            ثبت و ادامه
          </CustomButton>
        ) : (
          <CustomButton
            type="primary"
            onClick={submitGenuineCreateBusinessHandler}
            loading={sendCreateBusinessGenuineDataLoading}
          >
            ثبت و ادامه
          </CustomButton>
        )}
      </div>
    </Div>
  );
};
export default CreateBusinessStep;
