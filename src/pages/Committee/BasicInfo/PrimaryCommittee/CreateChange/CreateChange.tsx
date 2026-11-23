import { useEffect, useState } from "react";

import { Button, Form } from "antd";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";

import {
  GetPrimaryCommitteeCreateChangeResponse,
  sendPrimaryCommitteeResponse,
} from "./@types/@createChange";
import CustomCard from "../../../../../components/CustomCard/CustomCard";
import CustomRadioGroup from "../../../../../components/CustomInputs/CustomRadioGroup/CustomRadioGroup";
import CustomSelect from "../../../../../components/CustomInputs/CustomSelect/CustomSelect";
import SubmitButton from "../../../../../components/CustomInputs/SubmitButton/SubmitButton";
import CustomDivider from "../../../../../components/Renderers/CustomDivider/CustomDivider";
import Div from "../../../../../components/Renderers/Div/Div";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import { selectDefaultValueGenerator } from "../../../../../infrastructure/helpers/utils";
import { BasicInfoPrimaryCommitteeCreateChangeSubmitType } from "../../../../../infrastructure/models/modules/committee/basicInfo/primaryCommittee/primaryCommittee";
import { PRIMARY_COMMITTEE_PAGE_ROUTE } from "../../../../../infrastructure/router/routes/committee";
import {
  useGetPrimaryCommitteeCreateChangeMutation,
  useLazyGetPrimaryCommitteePersonnelInfoQuery,
  useSendPrimaryCommitteeMutation,
} from "../../../../../infrastructure/states/redux/Apis/committee/committees/committees";
import { PRIMARY_COMMITTEE_ID } from "../committeeDefenitionsId";
import "./_createChange.scss";

const CreateChange = () => {
  useTitle({ text: "کمیته بدوی" });
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();
  const { id, uniId } = Object.fromEntries([...searchParams]);
  const [radioValue, setRadioValue] = useState<number>();
  const navigate = useNavigate();
  const NO_ID_ERROR = "شناسه وجود ندارد";

  //? ================================  Api Calls ================================
  // get data from api for default CustomSelect filed.
  const [
    getPrimaryCommitteeCreateChange,
    { isLoading: isGetPrimaryCommitteeCreateChangeLoading },
  ] = useGetPrimaryCommitteeCreateChangeMutation();

  // get CustomSelect filed data for change.
  const [
    getPrimaryCommitteePersonalInfo,
    {
      data: getPrimaryCommitteePersonalInfoData,
      isLoading: isGetPrimaryCommitteePersonalInfoLoading,
    },
  ] = useLazyGetPrimaryCommitteePersonnelInfoQuery();

  // send primary committee api.
  const [sendPrimaryCommittee, { isLoading: IsSendPrimaryCommitteeLoading }] =
    useSendPrimaryCommitteeMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (!id) {
      toast.error(NO_ID_ERROR, { toastId: NO_ID_ERROR });
    }
  }, []);

  useEffect(() => {
    if (id) {
      getPrimaryCommitteeCreateChange({
        _data_: { id },
      })
        .unwrap()
        .then(onGetPrimaryCommitteeCreateChangeSuccess);
    }
  }, [id]);

  useEffect(() => {
    getPrimaryCommitteePersonalInfo({ maxResults: 100, firstResult: 0 });
  }, []);

  //* ================================ Util Functions ================================
  // set default value
  const onGetPrimaryCommitteeCreateChangeSuccess = (
    value: GetPrimaryCommitteeCreateChangeResponse
  ) => {
    setRadioValue(value?.data?.votingType);
    if (value?.status === 200) {
      form.setFieldsValue({
        chairman: selectDefaultValueGenerator(value?.data?.AssociationBosPersonnel),
        generalManager: selectDefaultValueGenerator(
          value?.data?.AssociationCulturalPersonnel
        ),
        legal: selectDefaultValueGenerator(value?.data?.AssociationLegalPersonnel),
        counseling: selectDefaultValueGenerator(
          value?.data?.AssociationAcademicPersonnel
        ),
        studentMember: selectDefaultValueGenerator(value?.data?.AssociationStudentInfo),
        secretary: selectDefaultValueGenerator(
          value?.data?.AssociationSectetaryPersonnel
        ),
      });
    }
  };

  // if request is success, navigate to primary page.
  const onSendPrimaryCommitteeSuccess = (values: sendPrimaryCommitteeResponse) => {
    if (values?.status === 200) {
      navigate({
        pathname: PRIMARY_COMMITTEE_PAGE_ROUTE,
      });
    }
  };

  // submit btn
  const onFormSubmit = (values: BasicInfoPrimaryCommitteeCreateChangeSubmitType) => {
    sendPrimaryCommittee({
      form: "ListSelectionMembersPreliminaryCommittee",
      id: "1b6878b3163b4d39a502fc203e53bf39",
      _data_: {
        createDate: new Date()?.toISOString(),
        CommitteeId: PRIMARY_COMMITTEE_ID,
        bosCommitte: values?.chairman?.code,
        culturalCommitte: values?.generalManager?.code,
        academicCommitte: values?.counseling?.code,
        legalCommitte: values?.legal?.code,
        studentCommitte: values?.studentMember?.code,
        secretaryCommitte: values?.secretary?.code,
        tenant_id: null,
        uniId: +uniId,
        votingType: values?.system ? values?.system : radioValue,
      },
    })
      .unwrap()
      .then(onSendPrimaryCommitteeSuccess);
  };

  const cancelHandler = () => {};

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomCard loading={IsSendPrimaryCommitteeLoading}>
      <Form
        className="primary-committee-create-change-container"
        form={form}
        onFinish={onFormSubmit}
      >
        <Div
          className="committee-members-box-wrapper"
          loading={
            isGetPrimaryCommitteeCreateChangeLoading ||
            isGetPrimaryCommitteePersonalInfoLoading
          }
        >
          <CustomDivider text="افراد کمیته" />
          <div className="committee-members-box">
            <CustomSelect
              name="chairman"
              form={form}
              label="معاونت دانشجویی (رییس کمیته)"
              options={getPrimaryCommitteePersonalInfoData?.data}
              placeholder="انتخاب کنید"
            />
            <CustomSelect
              name="generalManager"
              form={form}
              label="مدیر کل امور فرهنگی واحد"
              options={getPrimaryCommitteePersonalInfoData?.data}
              placeholder="انتخاب کنید"
            />
            <CustomSelect
              name="legal"
              form={form}
              label="عضو هیأت علمی گروه حقوق یا الهیات"
              options={getPrimaryCommitteePersonalInfoData?.data}
              placeholder="انتخاب کنید"
            />
            <CustomSelect
              name="counseling"
              form={form}
              label="عضو هیأت علمی واحد روانشناسی و مشاوره"
              options={getPrimaryCommitteePersonalInfoData?.data}
              placeholder="انتخاب کنید"
            />
            <CustomSelect
              name="studentMember"
              form={form}
              label="عضو دانشجویی"
              options={getPrimaryCommitteePersonalInfoData?.data}
              placeholder="انتخاب کنید"
            />
            <CustomSelect
              name="secretary"
              form={form}
              label="دبیر کمیته بدوی"
              options={getPrimaryCommitteePersonalInfoData?.data}
              placeholder="انتخاب کنید"
            />
          </div>
        </Div>
        <div className="voting-type-box-wrapper">
          <CustomDivider text="نوع رای گیری" />
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
export default CreateChange;
