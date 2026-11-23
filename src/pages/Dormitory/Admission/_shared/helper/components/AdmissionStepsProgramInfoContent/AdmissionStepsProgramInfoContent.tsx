import { useEffect, useState } from "react";

import { Col, Form, Row } from "antd";
import { AiOutlineArrowLeft } from "react-icons/ai";

import {
  CustomButton,
  CustomInput,
  CustomSelect,
  CustomSwitch,
} from "@components/CustomInputs";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { selectDefaultValueGenerator } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useAuth } from "@infra/services/AuthProvider/helper/useAuth";
import { useLazyGetBranchByBusinessQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import { useLazyGetActiveBusinessListQuery } from "@infra/states/redux/Apis/business/businessRequest/businessRequest";
import {
  useLazyGetAllAdmissionProgramInfoQuery,
  useLazyGetDormitoryManagementTypesQuery,
  useLazyGetMyAdmissionProgramInfoQuery,
} from "@infra/states/redux/Apis/dormitory/admission/admissionApi";
import {
  useLazyAllResidenceListSearchQuery,
  useLazyMyResidenceListSearchQuery,
} from "@infra/states/redux/Apis/dormitory/residence/residenceApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { IdTitle } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import AdmissionRadioCard from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionRadioCard/AdmissionRadioCard";
import {
  AdmissionStepsProgramInfoContentProps,
  AdmissionStepsProgramInfoFormType,
  GetAllAdmissionProgramInfoResponse,
} from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsProgramInfoContent/@types/@admissionStepsProgramInfoContent";
import {
  RESERVABLE_CAPACITY_LIST,
  RESERVABLE_CAPACITY_TYPE,
} from "@pages/Dormitory/Admission/_shared/util";
import { AllResidenceListSearchRequest } from "@pages/Dormitory/Residence/AllResidence/AllResidenceList/helper/components/AllResidenceWaitingList/@types/@allResidenceWaitingList";
import { MyResidenceListSearchRequest } from "@pages/Dormitory/Residence/MyResidence/MyResidenceList/helper/components/MyResidenceWaitingList/@types/@myResidenceWaitingList";

const AdmissionStepsProgramInfoContent = ({
  from,
  isSubmitAndContinueLoading,
  onCancel,
  onSaveDraft,
  onSubmitAndContinue,
}: AdmissionStepsProgramInfoContentProps) => {
  const [branchData, setBranchData] = useState<IdTitle[]>([]);
  // - اگر true باشد یعنی به برنامه ظرفیت وصل شده است و قابلیت تغییر ندارد.
  const [isSaleUnitLocked, setIsSaleUnitLocked] = useState(false);
  const [myBusinessTitle, setMyBusinessTitle] = useState<string>();

  const [form] = Form.useForm<AdmissionStepsProgramInfoFormType>();

  const { user } = useAuth();

  const { params } = useQueryParams();

  const selectedBranch = Form.useWatch("branch", form);
  const isResidenceDisabled = isSaleUnitLocked || (from === "my" && !selectedBranch);

  //? ================================  Api Calls ================================
  // business
  const [getBusinessData, { data: businessData, isLoading: businessLoading }] =
    useLazyGetActiveBusinessListQuery();

  // branches
  const [getBranchesData, { isLoading: isBranchesDataLoading }] =
    useLazyGetBranchByBusinessQuery();

  // all residences
  const [
    allResidenceListSearch,
    { data: allResidenceListSearchData, isFetching: isAllResidenceListSearchLoading },
  ] = useLazyAllResidenceListSearchQuery();

  // my residences
  const [
    myResidenceListSearch,
    { data: myResidenceListSearchData, isFetching: isMyResidenceListSearchLoading },
  ] = useLazyMyResidenceListSearchQuery();

  // management types
  const [
    getDormitoryManagementTypes,
    {
      data: getDormitoryManagementTypesData,
      isFetching: isGetDormitoryManagementTypesLoading,
    },
  ] = useLazyGetDormitoryManagementTypesQuery();

  // all admission program info
  const [
    getAllAdmissionProgramInfo,
    { isFetching: isGetAllAdmissionProgramInfoLoading },
  ] = useLazyGetAllAdmissionProgramInfoQuery();

  // my admission program info
  const [getMyAdmissionProgramInfo, { isFetching: isGetMyAdmissionProgramInfoLoading }] =
    useLazyGetMyAdmissionProgramInfoQuery();

  const isGetAdmissionProgramInfoLoading =
    from === "my"
      ? isGetMyAdmissionProgramInfoLoading
      : isGetAllAdmissionProgramInfoLoading;

  const isResidenceListSearchLoading =
    from === "my" ? isMyResidenceListSearchLoading : isAllResidenceListSearchLoading;

  const residenceListSearchData =
    from === "my" ? myResidenceListSearchData : allResidenceListSearchData;

  //? ================================ Effects ================================

  useEffect(() => {
    getDormitoryManagementTypes();

    if (from === "all") {
      getBusinessData();
    }

    if (from !== "all" && user?.staff?.admin?.branchId) {
      form.setFieldsValue({
        business: selectDefaultValueGenerator({
          id: user?.staff?.admin?.branchId,
          title: user?.staff?.admin?.branchName,
        }),
      });

      getBranchesData({
        businessIds: [user?.staff?.admin?.branchId],
      })
        .unwrap()
        .then((value) => setBranchData(value));
    }

    if (params?.id) {
      const getAdmissionProgramInfo =
        from === "my" ? getMyAdmissionProgramInfo : getAllAdmissionProgramInfo;

      getAdmissionProgramInfo(params.id)
        .unwrap()
        .then((programInfoData) => {
          fillProgramInfoForm(programInfoData);
        });
    }
  }, []);

  //* ================================ Util Functions ================================
  const searchResidences = (request: AllResidenceListSearchRequest) => {
    if (from === "my") {
      myResidenceListSearch(request as MyResidenceListSearchRequest);
      return;
    }

    allResidenceListSearch(request);
  };

  const fillProgramInfoForm = (programInfoData: GetAllAdmissionProgramInfoResponse) => {
    setIsSaleUnitLocked(programInfoData.saleUnitLocked);
    setMyBusinessTitle(programInfoData.businessTitle);

    getBranchesData({
      businessIds: [programInfoData?.businessId],
    })
      .unwrap()
      .then((value) => setBranchData(value));

    searchResidences({
      statuses: ["ACTIVE"],
      pageNumber: 0,
      pageSize: 100,
      businessIds: [programInfoData?.businessId],
      branchIds: [programInfoData?.branchId],
    });

    form.setFieldsValue({
      programTitle: programInfoData.faTitle,
      business: selectDefaultValueGenerator({
        id: programInfoData?.businessId,
        title: programInfoData?.businessTitle,
      }),
      branch: selectDefaultValueGenerator({
        id: programInfoData?.branchId,
        title: programInfoData?.branchTitle,
      }),
      residence: selectDefaultValueGenerator({
        id: programInfoData?.accommodationUuid,
        title: programInfoData?.accommodationTitle,
      }),
      managementType: selectDefaultValueGenerator({
        id: programInfoData?.managementType?.id,
        title: programInfoData?.managementType?.title,
        name: programInfoData?.managementType?.name,
      }),
      reservableCapacity: programInfoData?.saleUnitType?.name,
      checked: programInfoData.visible,
    });
  };

  // when business selected
  const onBusinessChangeHandler = (value: unknown) => {
    form.setFieldsValue({ branch: undefined });

    if (value) {
      setBranchData([]);
      getBranchesData({
        businessIds: [Number(value)],
      })
        .unwrap()
        .then((value) => setBranchData(value));
    }
  };

  // when branch selected
  const onBranchChangeHandler = (value: string) => {
    form.setFieldsValue({ residence: undefined });

    const request: AllResidenceListSearchRequest = {
      statuses: ["ACTIVE"],
      pageNumber: 0,
      pageSize: 100,

      businessIds: [
        from !== "all" && user?.staff?.admin?.branchId
          ? user?.staff?.admin?.branchId
          : Number(form.getFieldValue("business")?.code),
      ],
      branchIds: [Number(value)],
    };

    searchResidences(request);
  };

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form
      form={form}
      className="flex flex-1 flex-col gap-6"
      initialValues={{
        checked: true,
        reservableCapacity: RESERVABLE_CAPACITY_TYPE.bed,
      }}
      onFinish={onSubmitAndContinue}
    >
      <Row gutter={[16, 16]}>
        <Col xl={6} lg={6} md={8} sm={12} xs={24}>
          <CustomInput
            name="programTitle"
            label="عنوان برنامه پذیرش"
            placeholder="مثلا پذیرش پاییز ۱۴۰۵"
            rules={[REQUIRED_RULE]}
          />
        </Col>
        {from === "all" ? (
          <Col xl={6} lg={6} md={8} sm={12} xs={24}>
            <CustomSelect
              name="business"
              label="کسب و کار"
              form={form}
              options={businessData ? businessData : []}
              rules={[REQUIRED_RULE]}
              onChange={onBusinessChangeHandler}
              placeholder="انتخاب کنید"
              loading={businessLoading || isGetAdmissionProgramInfoLoading}
            />
          </Col>
        ) : (
          <SingleVerticalWithCol label="کسب و کار" value={myBusinessTitle} />
        )}
        <Col xl={6} lg={6} md={8} sm={12} xs={24}>
          <CustomSelect
            name="branch"
            label="شعبه / واحد"
            form={form}
            options={branchData}
            rules={[REQUIRED_RULE]}
            onChange={(value) => onBranchChangeHandler(value as string)}
            placeholder="انتخاب کنید"
            loading={isBranchesDataLoading || isGetAdmissionProgramInfoLoading}
          />
        </Col>

        <Col xl={6} lg={6} md={8} sm={12} xs={24}>
          <CustomSelect
            name="residence"
            label="اقامتگاه"
            form={form}
            options={residenceListSearchData?.content?.map((item) => ({
              id: item.uuid,
              title: item.faTitle,
            }))}
            rules={[REQUIRED_RULE]}
            placeholder="انتخاب کنید"
            loading={isResidenceListSearchLoading || isGetAdmissionProgramInfoLoading}
            disabled={isResidenceDisabled}
          />
        </Col>

        <Col xl={6} lg={6} md={8} sm={12} xs={24}>
          <CustomSelect
            name="managementType"
            label="نوع مدیریت"
            form={form}
            options={getDormitoryManagementTypesData ?? []}
            rules={[REQUIRED_RULE]}
            placeholder="انتخاب کنید"
            loading={
              isGetDormitoryManagementTypesLoading || isGetAdmissionProgramInfoLoading
            }
          />
        </Col>
      </Row>

      <AdmissionRadioCard
        form={form}
        name="reservableCapacity"
        label="ظرفیت قابل رزرو در این برنامه پذیرش"
        tooltip="ظرفیت قابل رزرو در این برنامه پذیرش"
        rules={[REQUIRED_RULE]}
        options={RESERVABLE_CAPACITY_LIST?.map((item) => ({
          value: item.name,
          title: item.title,
        }))}
        disabled={isSaleUnitLocked}
      />

      <CustomSwitch
        className="[&>div]:flex! [&>div]:flex-col! [&>div]:items-start! [&>div]:gap-1!"
        label="وضعیت نمایش به کاربران"
        name="checked"
        valuePropName="checked"
        checkedChildren="قابل نمایش"
        unCheckedChildren="غیر قابل نمایش"
        tooltip="وضعیت نمایش به کاربران"
        rules={[REQUIRED_RULE]}
        defaultValue={true}
      />

      <div className="mt-auto flex items-center justify-end gap-4 self-end">
        <CustomButton onClick={onCancel}>انصراف</CustomButton>
        <CustomButton onClick={onSaveDraft} disabled>
          ثبت پیش‌نویس
        </CustomButton>
        <CustomButton
          type="primary"
          htmlType="submit"
          icon={<AiOutlineArrowLeft />}
          iconPlacement="end"
          loading={isSubmitAndContinueLoading}
        >
          ثبت و ادامه
        </CustomButton>
      </div>
    </Form>
  );
};

export default AdmissionStepsProgramInfoContent;
