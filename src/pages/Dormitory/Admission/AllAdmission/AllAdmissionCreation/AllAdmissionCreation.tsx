import { useState } from "react";

import { Form, UploadFile } from "antd";
import { Link, useNavigate } from "react-router";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { getUploadFilePayload } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORMITORY_ALL_ADMISSION_LIST_PAGE_ROUTE } from "@infra/router/routes/dormitory";
import {
  useCreateAllAdmissionProgramInfoMutation,
  useCreateAllAdmissionRulesMutation,
  useCreateAllAdmissionSchedulingMutation,
} from "@infra/states/redux/Apis/dormitory/admission/admissionApi";
import { useDormitoryUploadFileWithTextMutation } from "@infra/states/redux/Apis/dormitory/basicInfo/basicInfoApi";
import AdmissionSteps from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionSteps/AdmissionSteps";
import AdmissionStepsCapacitiesContent from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsCapacitiesContent/AdmissionStepsCapacitiesContent";
import { AdmissionStepsFinancialFormType } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsFinancialContent/@types/@admissionStepsFinancialContent";
import AdmissionStepsFinancialContent from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsFinancialContent/AdmissionStepsFinancialContent";
import { AdmissionStepsProgramInfoFormType } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsProgramInfoContent/@types/@admissionStepsProgramInfoContent";
import AdmissionStepsProgramInfoContent from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsProgramInfoContent/AdmissionStepsProgramInfoContent";
import { AdmissionStepsRulesFormType } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsRulesContent/@types/@admissionStepsRulesContent";
import AdmissionStepsRulesContent from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsRulesContent/AdmissionStepsRulesContent";
import { RULE_SECTIONS } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsRulesContent/helper/util";
import { AdmissionStepsSchedulingFormType } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsSchedulingContent/@types/@admissionStepsSchedulingContent";
import AdmissionStepsSchedulingContent from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsSchedulingContent/AdmissionStepsSchedulingContent";
import { getEffectiveScheduleType } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsSchedulingContent/helper/util";
import { AdmissionStepsSettingsFormType } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsSettingsContent/@types/@admissionStepsSettingsContent";
import { SCHEDULE_TYPE, toCapacitiesMode } from "@pages/Dormitory/Admission/_shared/util";
import {
  CreateAllAdmissionProgramInfoRequest,
  CreateAllAdmissionRulesRequest,
  CreateAllAdmissionSchedulingRequest,
} from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionCreation/@types/@allAdmissionCreation";
import AllAdmissionCreationContractAllocationDrawer from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionCreation/helper/components/AllAdmissionCreationContractAllocationDrawer/AllAdmissionCreationContractAllocationDrawer";
import AllAdmissionCreationSettingsContent from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionCreation/helper/components/AllAdmissionCreationSettingsContent/AllAdmissionCreationSettingsContent";
import { dateCreator } from "@pages/Food/FoodSchedules/_shared/utils/foodScheduleUtils";

const PROGRAM_INFO_STEP = 0;
const SCHEDULING_STEP = 1;
const RULES_STEP = 2;
const CAPACITIES_STEP = 3;
const FINANCIAL_STEP = 4;
const SETTINGS_STEP = 5;

export default function AllAdmissionCreation() {
  const navigate = useNavigate();
  // const [currentStep, setCurrentStep] = useState(PROGRAM_INFO_STEP);
  const [currentStep, setCurrentStep] = useState(CAPACITIES_STEP);
  const [programInfo, setProgramInfo] =
    useState<AdmissionStepsProgramInfoFormType | null>(null);

  const [scheduling, setScheduling] = useState<AdmissionStepsSchedulingFormType | null>(
    null
  );
  const [isContractAllocationDrawerOpen, setIsContractAllocationDrawerOpen] =
    useState(false);

  const [rulesStepForm] = Form.useForm<AdmissionStepsRulesFormType>();
  const [documentFileLists, setDocumentFileLists] = useState<UploadFile[][]>([]);

  const { params, setSearchParams } = useQueryParams();

  useTitle({
    breadcrumbItems: [
      {
        title: "برنامه های پذیرش",
      },
      {
        title: (
          <Link to={DORMITORY_ALL_ADMISSION_LIST_PAGE_ROUTE}>برنامه های پذیرش همه</Link>
        ),
      },
      {
        title: "ایجاد برنامه پذیرش",
      },
    ],
  });

  //? ================================  Api Calls ================================
  const [
    createAllAdmissionProgramInfo,
    { isLoading: isCreateAllAdmissionProgramInfoLoading },
  ] = useCreateAllAdmissionProgramInfoMutation();

  const [
    createAllAdmissionScheduling,
    { isLoading: isCreateAllAdmissionSchedulingLoading },
  ] = useCreateAllAdmissionSchedulingMutation();

  const [createAllAdmissionRules, { isLoading: isCreateAllAdmissionRulesLoading }] =
    useCreateAllAdmissionRulesMutation();

  const [
    dormitoryUploadFileWithText,
    { isLoading: isDormitoryUploadFileWithTextLoading },
  ] = useDormitoryUploadFileWithTextMutation();

  //* ================================ Util Functions ================================
  const cancelHandler = () => {
    navigate(DORMITORY_ALL_ADMISSION_LIST_PAGE_ROUTE);
  };

  const saveDraftHandler = () => {
    // TODO: wire draft API when contract is available
  };

  // ================================ STEP 1 ================================
  const programInfoSubmitHandler = (values: AdmissionStepsProgramInfoFormType) => {
    const request: CreateAllAdmissionProgramInfoRequest = {
      ...(params?.id ? { uuid: params?.id } : {}), // edit mode
      faTitle: values.programTitle,
      businessId: Number(values.business?.code),
      branchId: Number(values.branch?.code),
      accommodationUuid: values.residence?.code.toString(),
      managementType: values.managementType?.value,
      saleUnitType: values.reservableCapacity,
      visible: values.checked,
    };

    createAllAdmissionProgramInfo(request)
      .unwrap()
      .then((uuid) => {
        setSearchParams({ ...params, id: uuid });
        setProgramInfo(values);
        setCurrentStep(SCHEDULING_STEP);
      });
  };

  const schedulingBackHandler = () => {
    setCurrentStep(PROGRAM_INFO_STEP);
  };

  const schedulingSubmitHandler = (values: AdmissionStepsSchedulingFormType) => {
    if (!params?.id) {
      return;
    }

    // min/max فقط برای ماهانه یا روزانه آزاد معنا دارند
    const canHaveStayLimits =
      values.scheduleType === "MONTHLY" ||
      getEffectiveScheduleType(values) === SCHEDULE_TYPE.dailyFree;

    const request: CreateAllAdmissionSchedulingRequest = {
      uuid: params.id,
      periodType: values.scheduleType ?? "",
      ...(values.term?.value ? { academicTermUuid: values.term.value } : {}),
      occupancyStartDate: dateCreator(
        values.stayDateRange?.[0] ?? "",
        values.stayTimeRange?.[0] ?? ""
      ),
      occupancyEndDate: dateCreator(
        values.stayDateRange?.[1] ?? "",
        values.stayTimeRange?.[1] ?? ""
      ),
      reservationStartAt: dateCreator(
        values.reserveDateRange?.[0] ?? "",
        values.reserveTimeRange?.[0] ?? ""
      ),
      reservationEndAt: dateCreator(
        values.reserveDateRange?.[1] ?? "",
        values.reserveTimeRange?.[1] ?? ""
      ),
      ...(values.reservePattern ? { bookingMode: values.reservePattern } : {}),
      ...(canHaveStayLimits && values.hasMinStayLimit
        ? { minStayPeriods: Number(values.minStayDuration ?? 0) }
        : {}),
      ...(canHaveStayLimits && values.hasMaxStayLimit
        ? { maxStayPeriods: Number(values.maxStayDuration ?? 0) }
        : {}),
      packageDays: Number(values.packageDuration ?? 0),
    };

    createAllAdmissionScheduling(request)
      .unwrap()
      .then(() => {
        setScheduling(values);
        setCurrentStep(RULES_STEP);
      });
  };

  const rulesBackHandler = () => {
    setCurrentStep(SCHEDULING_STEP);
  };

  const rulesSubmitHandler = async () => {
    if (!params?.id) {
      return;
    }

    const values: AdmissionStepsRulesFormType = rulesStepForm.getFieldsValue(true);

    const regulations = RULE_SECTIONS.reduce<
      CreateAllAdmissionRulesRequest["regulations"]
    >((acc, section) => {
      const sectionKey = section.key;
      const selectedRule = values[sectionKey];
      const templateUuid =
        selectedRule?.value ?? selectedRule?.item?.id?.toString() ?? "";

      if (!templateUuid) {
        return acc;
      }

      const faDescription =
        values[`${sectionKey}Description`] ?? selectedRule?.title ?? "";

      acc?.push({
        templateUuid,
        faDescription,
      });

      return acc;
    }, []);

    let forms: CreateAllAdmissionRulesRequest["forms"];

    if (values.requiresHandoverDocuments) {
      const handoverDocuments = values.handoverDocuments ?? [];

      forms = await Promise.all(
        handoverDocuments.map(async (document, index) => {
          const selectedFile = documentFileLists[index]?.[0];
          const fileToUpload = selectedFile ? getUploadFilePayload(selectedFile) : null;

          // فایل قبلی سرور originFileObj ندارد؛ همان uuid را برمی‌گردانیم
          if (!fileToUpload) {
            return {
              uuid: selectedFile?.status === "done" ? selectedFile.uid : "",
              title: document.title,
            };
          }

          const formData = new FormData();
          formData.append("file", fileToUpload as Blob);
          formData.append("fileName", document.title || selectedFile?.name || "");

          const uploadResponse = await dormitoryUploadFileWithText(formData).unwrap();

          return {
            uuid: uploadResponse.uuid,
            title: document.title,
          };
        })
      );
    }

    const request: CreateAllAdmissionRulesRequest = {
      uuid: params.id,
      gender: values.admissionGender?.item?.name ?? "",
      // آیا می‌خواهید نمایش این برنامه پذیرش را محدود کنید؟
      allowAllBranches: !values.hasShowRestrictions,
      ...(values.hasShowRestrictions
        ? {
            branchIds: values.branches?.map((branch) => branch.code),
          }
        : {}),
      // آیا میخواهید محدودیت های بیشتری برای شرایط پذیرش اعمال نمایید؟
      restrictEligibility: values.hasAdditionalRestrictions,
      ...(values.hasAdditionalRestrictions
        ? {
            ...(values?.hasAdditionalRestrictionsUserGroup?.item?.name
              ? {
                  userGroupTypes: [
                    values?.hasAdditionalRestrictionsUserGroup?.item?.name,
                  ],
                }
              : {}),
            citizenShip: values?.hasAdditionalRestrictionsNationality?.item?.name,
            academicDegrees: values?.hasAdditionalRestrictionsEducationLevels?.map(
              (degree) => degree.item?.name
            ),
            studyFieldIds: values.hasAdditionalRestrictionsMajors?.map(
              (item) => item.code
            ),
          }
        : {}),
      allowGuestInfo: values.requiresRelativesInfo ?? false, // بستگان
      ...(regulations?.length ? { regulations } : {}), // قوانین
      needUploadForms: values.requiresHandoverDocuments ?? false,
      ...(forms ? { forms } : {}),
    };

    createAllAdmissionRules(request)
      .unwrap()
      .then(() => {
        setCurrentStep(CAPACITIES_STEP);
      });
  };

  const capacitiesBackHandler = () => {
    setCurrentStep(RULES_STEP);
  };

  const capacitiesSubmitHandler = () => {
    setCurrentStep(FINANCIAL_STEP);
  };

  const financialBackHandler = () => {
    setCurrentStep(CAPACITIES_STEP);
  };

  const financialSubmitHandler = (_values: AdmissionStepsFinancialFormType) => {
    setCurrentStep(SETTINGS_STEP);
  };

  const settingsBackHandler = () => {
    setCurrentStep(FINANCIAL_STEP);
  };

  const settingsSubmitHandler = (_values: AdmissionStepsSettingsFormType) => {
    setIsContractAllocationDrawerOpen(true);
  };

  const closeContractAllocationDrawerHandler = () => {
    setIsContractAllocationDrawerOpen(false);
  };

  const confirmContractAllocationHandler = () => {
    setIsContractAllocationDrawerOpen(false);
    // TODO: wire submit + contract allocation API when contract is available
    navigate(DORMITORY_ALL_ADMISSION_LIST_PAGE_ROUTE);
  };

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex h-full flex-col gap-10">
      <AdmissionSteps current={currentStep} />

      {currentStep === PROGRAM_INFO_STEP ? (
        <AdmissionStepsProgramInfoContent
          onCancel={cancelHandler}
          onSaveDraft={saveDraftHandler}
          onSubmitAndContinue={programInfoSubmitHandler}
          from="all"
          isSubmitAndContinueLoading={isCreateAllAdmissionProgramInfoLoading}
        />
      ) : null}

      {currentStep === SCHEDULING_STEP ? (
        <AdmissionStepsSchedulingContent
          onBack={schedulingBackHandler}
          onSaveDraft={saveDraftHandler}
          onSubmitAndContinue={schedulingSubmitHandler}
          isSubmitAndContinueLoading={isCreateAllAdmissionSchedulingLoading}
        />
      ) : null}

      {currentStep === RULES_STEP ? (
        <AdmissionStepsRulesContent
          reservableCapacity={programInfo?.reservableCapacity}
          onBack={rulesBackHandler}
          onSaveDraft={saveDraftHandler}
          onSubmitAndContinue={rulesSubmitHandler}
          isSubmitAndContinueLoading={
            isCreateAllAdmissionRulesLoading || isDormitoryUploadFileWithTextLoading
          }
          form={rulesStepForm}
          documentFileLists={documentFileLists}
          setDocumentFileLists={setDocumentFileLists}
        />
      ) : null}

      {currentStep === CAPACITIES_STEP ? (
        <AdmissionStepsCapacitiesContent
          mode={toCapacitiesMode(programInfo?.reservableCapacity)}
          scheduleType={scheduling ? getEffectiveScheduleType(scheduling) : undefined}
          programTitle={programInfo?.programTitle}
          onBack={capacitiesBackHandler}
          onSaveDraft={saveDraftHandler}
          onSubmitAndContinue={capacitiesSubmitHandler}
        />
      ) : null}

      {currentStep === FINANCIAL_STEP ? (
        <AdmissionStepsFinancialContent
          scheduling={scheduling}
          onBack={financialBackHandler}
          onSaveDraft={saveDraftHandler}
          onSubmitAndContinue={financialSubmitHandler}
        />
      ) : null}

      {currentStep === SETTINGS_STEP ? (
        <AllAdmissionCreationSettingsContent
          scheduling={scheduling}
          programInfo={programInfo}
          onBack={settingsBackHandler}
          onSaveDraft={saveDraftHandler}
          onSubmitAndContinue={settingsSubmitHandler}
        />
      ) : null}

      {isContractAllocationDrawerOpen && (
        <AllAdmissionCreationContractAllocationDrawer
          open={isContractAllocationDrawerOpen}
          scheduling={scheduling}
          onClose={closeContractAllocationDrawerHandler}
          onConfirm={confirmContractAllocationHandler}
        />
      )}
    </div>
  );
}
