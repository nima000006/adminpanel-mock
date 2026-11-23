import { useEffect, useState } from "react";

import { Button, Form } from "antd";
import { useNavigate, useSearchParams } from "react-router";

import {
  GetCentralCommitteeCreateChangeResponse,
  sendCentralCommitteeResponse,
} from "./@types/@centralCommitteeCreateChange";
import CustomCard from "../../../../../components/CustomCard/CustomCard";
import CustomRadioGroup from "../../../../../components/CustomInputs/CustomRadioGroup/CustomRadioGroup";
import CustomSelect from "../../../../../components/CustomInputs/CustomSelect/CustomSelect";
import SubmitButton from "../../../../../components/CustomInputs/SubmitButton/SubmitButton";
import CustomDivider from "../../../../../components/Renderers/CustomDivider/CustomDivider";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import { selectDefaultValueGenerator } from "../../../../../infrastructure/helpers/utils";
import { BasicInfoCentralCommitteeCreateChangeSubmitType } from "../../../../../infrastructure/models/modules/committee/basicInfo/centralCommittee/centralCommittee";
import { CENTRAL_COMMITTEE_PAGE_ROUTE } from "../../../../../infrastructure/router/routes/committee";
import {
  useGetCentralCommitteeCreateChangeMutation,
  useLazyGetPrimaryCommitteePersonnelInfoQuery,
  useSendCentralCommitteeMutation,
} from "../../../../../infrastructure/states/redux/Apis/committee/committees/committees";
import { CENTRAL_COMMITTEE_ID } from "../../PrimaryCommittee/committeeDefenitionsId";
import "./_centralCommitteeCreateChange.scss";

const CentralCommitteeCreateChange = () => {
  useTitle({ text: "کمیته مرکزی" });
  const [radioValue, setRadioValue] = useState<number>();
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();
  const { id } = Object.fromEntries([...searchParams]);
  const navigate = useNavigate();

  //? ================================  Api Calls ================================
  // get personnel list.
  const [
    getCentralCommitteePersonalInfo,
    {
      data: getCentralCommitteePersonalInfoData,
      isLoading: isGetCentralCommitteePersonalInfoLoading,
    },
  ] = useLazyGetPrimaryCommitteePersonnelInfoQuery();

  // get data from api for default CustomSelect filed.
  const [
    getCentralCommitteeCreateChange,
    { isLoading: isGetCentralCommitteeCreateChangeLoading },
  ] = useGetCentralCommitteeCreateChangeMutation();

  // send primary committee api.
  const [sendCentralCommittee, { isLoading: IsSendCentralCommitteeLoading }] =
    useSendCentralCommitteeMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getCentralCommitteePersonalInfo({ maxResults: 100, firstResult: 0 });
  }, []);

  useEffect(() => {
    if (id) {
      getCentralCommitteeCreateChange({ _data_: { id } })
        .unwrap()
        .then(onGetCentralCommitteeCreateChangeSuccess);
    }
  }, [id]);

  //* ================================ Util Functions ================================
  const onGetCentralCommitteeCreateChangeSuccess = async (
    value: GetCentralCommitteeCreateChangeResponse
  ) => {
    setRadioValue(value?.data?.votingType);
    if (value?.status === 200) {
      form.setFieldsValue({
        studentCouncil: selectDefaultValueGenerator(value?.data?.AssociationCulturalBoss),
        educationAssistant: selectDefaultValueGenerator(
          value?.data?.AssociationEducationAssistant
        ),
        researchAssistant: selectDefaultValueGenerator(
          value?.data?.AssociationResearchAssistant
        ),
        directorGeneralLegal: selectDefaultValueGenerator(
          value?.data?.AssociationDirectorGeneralLegal
        ),
        generalManagerSelection: selectDefaultValueGenerator(
          value?.data?.AssociationGeneralManagerSelection
        ),
        cleric: selectDefaultValueGenerator(value?.data?.AssociationCleric),
        headSamaOrganization: selectDefaultValueGenerator(
          value?.data?.AssociationHeadSamaOrganization
        ),
        directorGeneralStudent: selectDefaultValueGenerator(
          value?.data?.AssociationDirectorGeneralStudent
        ),
      });
    }
  };

  // if request is success, navigate to primary page.
  const onSendCentralCommitteeSuccess = async (values: sendCentralCommitteeResponse) => {
    if (values?.status === 200) {
      navigate({
        pathname: CENTRAL_COMMITTEE_PAGE_ROUTE,
      });
    }
  };

  // register btn
  const onFormSubmit = (values: BasicInfoCentralCommitteeCreateChangeSubmitType) => {
    sendCentralCommittee({
      form: "ListSelectionMembersCentralCommittee",
      id: "e3a090c5c77847f79868519812f5869e",
      _data_: {
        CommitteeId: CENTRAL_COMMITTEE_ID,
        studentCouncil: values?.studentCouncil?.code,
        directorGeneralLegal: values?.directorGeneralLegal?.code,
        headSamaOrganization: values?.headSamaOrganization?.code,
        educationalAssistant: values?.educationAssistant?.code,
        generalManagerSelection: values?.generalManagerSelection?.code,
        cleric: values?.cleric?.code,
        researchAssistant: values?.researchAssistant?.code,
        directorGeneralStudent: values?.directorGeneralStudent?.code,
        id: +id,
        createDate: new Date()?.toISOString(),
      },
    })
      .unwrap()
      .then(onSendCentralCommitteeSuccess);
  };

  const cancelHandler = () => {};

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomCard
      loading={
        isGetCentralCommitteePersonalInfoLoading ||
        isGetCentralCommitteeCreateChangeLoading ||
        IsSendCentralCommitteeLoading
      }
    >
      <Form
        className="central-committee-create-change-content-container"
        form={form}
        onFinish={onFormSubmit}
      >
        <div className="committee-members-box-wrapper">
          <CustomDivider text="افراد کمیته" />
          <div className="committee-members-box">
            <CustomSelect
              name="studentCouncil"
              form={form}
              label="معاون دانشجویی فرهنگی دانشگاه ( رییس کمیته)"
              options={getCentralCommitteePersonalInfoData?.data}
              placeholder="انتخاب کنید"
            />
            <CustomSelect
              name="educationAssistant"
              form={form}
              label="معاون آموزشی دانشگاه"
              options={getCentralCommitteePersonalInfoData?.data}
              placeholder="انتخاب کنید"
            />
            <CustomSelect
              name="researchAssistant"
              form={form}
              label="معاون پژوهشی دانشگاه"
              options={getCentralCommitteePersonalInfoData?.data}
              placeholder="انتخاب کنید"
            />
            <CustomSelect
              name="directorGeneralLegal"
              form={form}
              label="مدیر کل دفتر امور حقوقی"
              options={getCentralCommitteePersonalInfoData?.data}
              placeholder="انتخاب کنید"
            />
            <CustomSelect
              name="generalManagerSelection"
              form={form}
              label="مدیر کل دفتر گزینش"
              options={getCentralCommitteePersonalInfoData?.data}
              placeholder="انتخاب کنید"
            />
            <CustomSelect
              name="cleric"
              form={form}
              label="روحانی عضو کمیته"
              options={getCentralCommitteePersonalInfoData?.data}
              placeholder="انتخاب کنید"
            />
            <CustomSelect
              name="headSamaOrganization"
              form={form}
              label="رییس سازمان سما"
              options={getCentralCommitteePersonalInfoData?.data}
              placeholder="انتخاب کنید"
            />
            <CustomSelect
              name="directorGeneralStudent"
              form={form}
              label="مدیر کل امور دانشجویی دانشگاه (دبیر کمیته)"
              options={getCentralCommitteePersonalInfoData?.data}
              placeholder="انتخاب کنید"
            />
          </div>
        </div>
        <div className="voting-type-box-wrapper">
          <CustomDivider text=" نوع رای گیری" />
          <CustomRadioGroup
            name="system"
            label=""
            key={radioValue}
            defaultValue={radioValue}
            options={[
              {
                label: "سیستمی",
                value: 2,
              },
              {
                label: "دستی",
                value: 1,
              },
            ]}
          />
        </div>
        <div className="btn-wrapper">
          <SubmitButton type="primary" className="btn" label="تایید" form={form} />

          <Button className="btn" onClick={cancelHandler}>
            لغو
          </Button>
        </div>
      </Form>
    </CustomCard>
  );
};
export default CentralCommitteeCreateChange;
