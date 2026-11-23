import { useEffect, useState } from "react";

import { Button, Form } from "antd";
import { useNavigate, useSearchParams } from "react-router";

import {
  GetCommitteeRevisionCreateChangeResponse,
  sendCommitteeRevisionResponse,
} from "./@types/@committeeRevisionCreateChange";
import CustomCard from "../../../../../components/CustomCard/CustomCard";
import CustomRadioGroup from "../../../../../components/CustomInputs/CustomRadioGroup/CustomRadioGroup";
import CustomSelect from "../../../../../components/CustomInputs/CustomSelect/CustomSelect";
import SubmitButton from "../../../../../components/CustomInputs/SubmitButton/SubmitButton";
import CustomDivider from "../../../../../components/Renderers/CustomDivider/CustomDivider";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import { selectDefaultValueGenerator } from "../../../../../infrastructure/helpers/utils";
import { BasicInfoCommitteeRevisionCreateChangeType } from "../../../../../infrastructure/models/modules/committee/basicInfo/committeeRevision/committeeRevision";
import { COMMITTEE_REVISION_PAGE_ROUTE } from "../../../../../infrastructure/router/routes/committee";
import {
  useGetCommitteeRevisionCreateChangeMutation,
  useLazyGetPrimaryCommitteePersonnelInfoQuery,
  useSendCommitteeRevisionMutation,
} from "../../../../../infrastructure/states/redux/Apis/committee/committees/committees";
import { REVISION_COMMITTEE_ID } from "../../PrimaryCommittee/committeeDefenitionsId";
import "./_committeeRevisionCreateChange.scss";

const CommitteeRevisionCreateChange = () => {
  useTitle({ text: "کمیته تجدید نظر" });
  const [searchParams] = useSearchParams();
  const { id, provinceId } = Object.fromEntries([...searchParams]);
  const [radioValue, setRadioValue] = useState<number>();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  //? ================================  Api Calls ================================
  // get personnel list.
  const [
    getCommitteeRevisionPersonalInfo,
    {
      data: getCommitteeRevisionPersonalInfoData,
      isLoading: isGetCommitteeRevisionPersonalInfoLoading,
    },
  ] = useLazyGetPrimaryCommitteePersonnelInfoQuery();

  // get data from api for default CustomSelect filed.
  const [
    getCommitteeRevisionCreateChange,
    { isLoading: isGetCommitteeRevisionCreateChangeLoading },
  ] = useGetCommitteeRevisionCreateChangeMutation();

  // send primary committee api.
  const [sendCommitteeRevision, { isLoading: IsSendCommitteeRevisionLoading }] =
    useSendCommitteeRevisionMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getCommitteeRevisionPersonalInfo({ maxResults: 100, firstResult: 0 });
  }, []);

  useEffect(() => {
    if (id) {
      getCommitteeRevisionCreateChange({ _data_: { id } })
        .unwrap()
        .then(onGetCommitteeRevisionCreateChangeSuccess);
    }
  }, [id]);

  //* ================================ Util Functions ================================
  const onGetCommitteeRevisionCreateChangeSuccess = async (
    value: GetCommitteeRevisionCreateChangeResponse
  ) => {
    setRadioValue(value?.data?.votingType);
    if (value?.status === 200) {
      form.setFieldsValue({
        secretary: selectDefaultValueGenerator(value?.data?.AssociationBossCommitte),
        studentCouncil: selectDefaultValueGenerator(
          value?.data?.AssociationPresidentStudentCouncil
        ),
        supremeLeader: selectDefaultValueGenerator(
          value?.data?.AssociationLeadershipBody
        ),
        lawGroup: selectDefaultValueGenerator(value?.data?.AssociationFacultyMember),
        studentMember: selectDefaultValueGenerator(
          value?.data?.AssociationStudentRepresentative
        ),
        committeeRevision: selectDefaultValueGenerator(
          value?.data?.AssociationSectetaryPersonnell
        ),
      });
    }
  };

  // if request is success, navigate to primary page.
  const onSendCommitteeRevisionSuccess = async (
    values: sendCommitteeRevisionResponse
  ) => {
    if (values?.status === 200) {
      navigate({
        pathname: COMMITTEE_REVISION_PAGE_ROUTE,
      });
    }
  };

  // register btn
  const onFormSubmit = (values: BasicInfoCommitteeRevisionCreateChangeType) => {
    sendCommitteeRevision({
      form: "ListSelectionMembersAppealsCommittee",
      id: "c7365a09fb30482e9c0125a157494968",
      _data_: {
        CommitteeId: REVISION_COMMITTEE_ID,
        bossCommitte: values?.secretary?.code,
        representativeFacultyMembers: values?.lawGroup?.code,
        provinceId: +provinceId,
        presidentStudentCouncil: values?.studentCouncil?.code,
        studentRepresentative: values?.studentMember?.code,
        secretaryCommitte: values?.committeeRevision?.code,
        responsibleLeadershipBody: values?.supremeLeader?.code,
        votingType: values?.system ? values?.system : radioValue,
        tenant_id: null,
        id: +id,
        createDate: new Date()?.toISOString(),
      },
    })
      .unwrap()
      .then(onSendCommitteeRevisionSuccess);
  };

  const cancelHandler = () => {};

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomCard
      loading={
        isGetCommitteeRevisionPersonalInfoLoading ||
        isGetCommitteeRevisionCreateChangeLoading ||
        IsSendCommitteeRevisionLoading
      }
    >
      <Form
        className="committee-revision-create-change-content-container"
        form={form}
        onFinish={onFormSubmit}
      >
        <div className="committee-members-box-wrapper">
          <CustomDivider text="افراد کمیته" />
          <div className="committee-members-box">
            <CustomSelect
              name="secretary"
              form={form}
              label="رییس دبیرخانه هیات امنا (رییس کمیته)"
              options={getCommitteeRevisionPersonalInfoData?.data}
              placeholder="انتخاب کنید"
            />
            <CustomSelect
              name="studentCouncil"
              form={form}
              label="رییس شورای دانشجویی و فرهنگی و ورزشی استان"
              options={getCommitteeRevisionPersonalInfoData?.data}
              placeholder="انتخاب کنید"
            />
            <CustomSelect
              name="supremeLeader"
              form={form}
              label="مسئول دفتر نهاد نمایندگی رهبری دانشگاه در استان"
              options={getCommitteeRevisionPersonalInfoData?.data}
              placeholder="انتخاب کنید"
            />
            <CustomSelect
              name="lawGroup"
              form={form}
              label="عضو هیات علمی گروه حقوق"
              options={getCommitteeRevisionPersonalInfoData?.data}
              placeholder="انتخاب کنید"
            />
            <CustomSelect
              name="studentMember"
              form={form}
              label="عضو دانشجویی"
              options={getCommitteeRevisionPersonalInfoData?.data}
              placeholder="انتخاب کنید"
            />
            <CustomSelect
              name="committeeRevision"
              form={form}
              label="کارشناس امور دانشجویی، فرهنگی، ورزشی و زنان فرهیخته استان (دبیر کمیته تجدید نظر)"
              options={getCommitteeRevisionPersonalInfoData?.data}
              placeholder="انتخاب کنید"
            />
          </div>
        </div>
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
export default CommitteeRevisionCreateChange;
