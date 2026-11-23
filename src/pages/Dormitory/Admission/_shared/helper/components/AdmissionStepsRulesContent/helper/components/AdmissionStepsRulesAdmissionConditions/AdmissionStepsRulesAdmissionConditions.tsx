import { useEffect, useState } from "react";

import { Col, Form, Row } from "antd";

import { CustomSelect } from "@components/CustomInputs";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import { useLazyGetBasicInformationStudyFieldsQuery } from "@infra/states/redux/Apis/basicInformation/basicInformationApis";
import { useLazyGetBranchByBusinessQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import { useLazyGetActiveBusinessListQuery } from "@infra/states/redux/Apis/business/businessRequest/businessRequest";
import {
  useLazyDormitoryCitizenListQuery,
  useLazyDormitoryDegreeListQuery,
  useLazyDormitoryGenderListQuery,
  useLazyDormitoryUserGroupListQuery,
} from "@infra/states/redux/Apis/dormitory/basicInfo/basicInfoApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { IdTitle } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { AdmissionStepsRulesAdmissionConditionsProps } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsRulesContent/helper/components/AdmissionStepsRulesAdmissionConditions/@types/@admissionStepsRulesAdmissionConditions";
import AdmissionSwitchAlert from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionSwitchAlert/AdmissionSwitchAlert";

const AdmissionStepsRulesAdmissionConditions = ({
  form,
  data,
}: AdmissionStepsRulesAdmissionConditionsProps) => {
  const [hasShowRestrictions, setHasShowRestrictions] = useState(false);
  const [hasAdditionalRestrictions, setHasAdditionalRestrictions] = useState(false);

  const [branchData, setBranchData] = useState<IdTitle[]>([]);

  const hasAdditionalRestrictionsUserGroup = Form.useWatch(
    "hasAdditionalRestrictionsUserGroup",
    form
  );

  const isAdditionalRestrictionsStudent =
    hasAdditionalRestrictionsUserGroup?.item?.name === "STUDENT";

  //? ================================  Api Calls ================================
  const [
    dormitoryGenderList,
    { data: dormitoryGenderListData, isFetching: isDormitoryGenderListLoading },
  ] = useLazyDormitoryGenderListQuery();

  const [
    dormitoryUserGroupList,
    {
      data: dormitoryUserGroupListData,
      isFetching: isDormitoryUserGroupListLoading,
      isSuccess: isDormitoryUserGroupListSuccess,
    },
  ] = useLazyDormitoryUserGroupListQuery();

  const [
    dormitoryDegreeList,
    {
      data: dormitoryDegreeListData,
      isFetching: isDormitoryDegreeListLoading,
      isSuccess: isDormitoryDegreeListSuccess,
    },
  ] = useLazyDormitoryDegreeListQuery();

  const [
    dormitoryCitizenList,
    {
      data: dormitoryCitizenListData,
      isFetching: isDormitoryCitizenListLoading,
      isSuccess: isDormitoryCitizenListSuccess,
    },
  ] = useLazyDormitoryCitizenListQuery();

  const [
    getBasicInformationStudyFields,
    {
      data: getBasicInformationStudyFieldsData,
      isFetching: isGetBasicInformationStudyFieldsLoading,
      isSuccess: isGetBasicInformationStudyFieldsSuccess,
    },
  ] = useLazyGetBasicInformationStudyFieldsQuery();

  // business
  const [getBusinessData, { data: businessData, isLoading: businessLoading }] =
    useLazyGetActiveBusinessListQuery();

  // branches
  const [getBranchesData, { isLoading: isBranchesDataLoading }] =
    useLazyGetBranchByBusinessQuery();

  //? ================================ Effects ================================

  useEffect(() => {
    if (!data) {
      return;
    }

    setHasShowRestrictions(!data?.allowAllBranches);
    setHasAdditionalRestrictions(data?.restrictEligibility);
  }, [data]);

  useEffect(() => {
    dormitoryGenderList();
  }, []);

  // business list
  useEffect(() => {
    if (!hasShowRestrictions) {
      return;
    }

    getBusinessData();
  }, [hasShowRestrictions]);

  // user group and citizen list
  useEffect(() => {
    if (!hasAdditionalRestrictions) {
      return;
    }

    if (!isDormitoryUserGroupListSuccess) {
      dormitoryUserGroupList();
    }

    if (!isDormitoryCitizenListSuccess) {
      dormitoryCitizenList();
    }
  }, [
    hasAdditionalRestrictions,
    isDormitoryUserGroupListSuccess,
    isDormitoryCitizenListSuccess,
  ]);

  // study fields and degree list
  useEffect(() => {
    if (!isAdditionalRestrictionsStudent) {
      return;
    }

    if (!isDormitoryDegreeListSuccess) {
      dormitoryDegreeList();
    }

    if (!isGetBasicInformationStudyFieldsSuccess) {
      getBasicInformationStudyFields();
    }
  }, [
    isAdditionalRestrictionsStudent,
    isDormitoryDegreeListSuccess,
    isGetBasicInformationStudyFieldsSuccess,
  ]);

  //* ================================ Util Functions ================================
  // when business selected
  const onBusinessChangeHandler = (value: string[]) => {
    form.setFieldsValue({ branches: undefined });

    if (value) {
      setBranchData([]);
      getBranchesData({
        businessIds: value?.join(","),
      })
        .unwrap()
        .then((value) => setBranchData(value));
    }
  };

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex flex-col gap-4">
      <CustomDivider text="شرایط پذیرش" />

      <Row gutter={[16, 16]}>
        <Col xl={8} lg={8} md={12} sm={12} xs={24}>
          <CustomSelect
            name="admissionGender"
            label="جنسیت پذیرش"
            form={form}
            options={dormitoryGenderListData ? dormitoryGenderListData : []}
            rules={[REQUIRED_RULE]}
            placeholder="انتخاب کنید"
            loading={isDormitoryGenderListLoading}
          />
        </Col>
      </Row>

      <AdmissionSwitchAlert
        question="آیا می‌خواهید نمایش این برنامه پذیرش را محدود کنید؟"
        description="با فعال‌کردن این گزینه، فقط کاربران کسب‌وکارها، شعبه‌ها یا واحدهای انتخاب‌شده می‌توانند از این برنامه پذیرش استفاده کنند."
        valuePropName="hasShowRestrictions"
        defaultChecked={hasShowRestrictions}
        value={hasShowRestrictions}
        onChange={(checked) => setHasShowRestrictions(checked)}
      />

      {hasShowRestrictions ? (
        <Row gutter={[16, 16]}>
          <Col xl={8} lg={8} md={12} sm={12} xs={24}>
            <CustomSelect
              name="businessTypes"
              label="کسب و کار (تفاهمی)"
              form={form}
              mode="multiple"
              options={businessData ? businessData : []}
              rules={[REQUIRED_RULE]}
              onChange={(value) => onBusinessChangeHandler(value as string[])}
              placeholder="انتخاب کنید"
              loading={businessLoading}
            />
          </Col>

          <Col xl={8} lg={8} md={12} sm={12} xs={24}>
            <CustomSelect
              name="branches"
              label="شعبه / واحد کاربر (تفاهمی)"
              form={form}
              mode="multiple"
              options={branchData}
              rules={[REQUIRED_RULE]}
              placeholder="انتخاب کنید"
              loading={isBranchesDataLoading}
            />
          </Col>
        </Row>
      ) : null}
      <AdmissionSwitchAlert
        question="آیا میخواهید محدودیت های بیشتری برای شرایط پذیرش اعمال نمایید؟"
        description="با فعال کردن این گزینه، فقط کاربران انتخاب‌شده و واجد شرایط می‌توانند ظرفیت‌های این برنامه پذیرش را رزرو کنند."
        valuePropName="hasAdditionalRestrictions"
        defaultChecked={hasAdditionalRestrictions}
        value={hasAdditionalRestrictions}
        onChange={(checked) => setHasAdditionalRestrictions(checked)}
      />

      {hasAdditionalRestrictions ? (
        <>
          <Row gutter={[16, 16]}>
            <Col xl={8} lg={8} md={12} sm={12} xs={24}>
              <CustomSelect
                name="hasAdditionalRestrictionsUserGroup"
                label="گروه کاربری"
                form={form}
                options={dormitoryUserGroupListData ?? []}
                rules={[REQUIRED_RULE]}
                placeholder="انتخاب کنید"
                loading={isDormitoryUserGroupListLoading}
              />
            </Col>

            <Col xl={8} lg={8} md={12} sm={12} xs={24}>
              <CustomSelect
                name="hasAdditionalRestrictionsNationality"
                label="ملیت"
                form={form}
                options={dormitoryCitizenListData ?? []}
                placeholder="انتخاب کنید"
                loading={isDormitoryCitizenListLoading}
              />
            </Col>
          </Row>

          {isAdditionalRestrictionsStudent ? (
            <>
              <CustomSelect
                name="hasAdditionalRestrictionsEducationLevels"
                label="مقطع تحصیلی"
                form={form}
                mode="multiple"
                options={dormitoryDegreeListData ?? []}
                placeholder="انتخاب کنید"
                loading={isDormitoryDegreeListLoading}
              />

              <CustomSelect
                name="hasAdditionalRestrictionsMajors"
                label="رشته تحصیلی"
                form={form}
                mode="multiple"
                options={getBasicInformationStudyFieldsData ?? []}
                placeholder="انتخاب کنید"
                loading={isGetBasicInformationStudyFieldsLoading}
              />
            </>
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export default AdmissionStepsRulesAdmissionConditions;
