import { useState } from "react";

import { Form, UploadFile } from "antd";
import { Link, useNavigate } from "react-router";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { getUploadFilePayload } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORMITORY_MY_ADMISSION_LIST_PAGE_ROUTE } from "@infra/router/routes/dormitory";
import {
  useCreateMyAdmissionProgramInfoMutation,
  useCreateMyAdmissionRulesMutation,
  useCreateMyAdmissionSchedulingMutation,
} from "@infra/states/redux/Apis/dormitory/admission/admissionApi";
import { useMyDormitoryUploadFileWithTextMutation } from "@infra/states/redux/Apis/dormitory/basicInfo/basicInfoApi";
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
import AdmissionStepsSettingsContent from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsSettingsContent/AdmissionStepsSettingsContent";
import { SCHEDULE_TYPE, toCapacitiesMode } from "@pages/Dormitory/Admission/_shared/util";
import {
  CreateMyAdmissionProgramInfoRequest,
  CreateMyAdmissionRulesRequest,
  CreateMyAdmissionSchedulingRequest,
} from "@pages/Dormitory/Admission/MyAdmission/MyAdmissionCreation/@types/@myAdmissionCreation";
import { dateCreator } from "@pages/Food/FoodSchedules/_shared/utils/foodScheduleUtils";

const PROGRAM_INFO_STEP = 0;
const SCHEDULING_STEP = 1;
const RULES_STEP = 2;
const CAPACITIES_STEP = 3;
const FINANCIAL_STEP = 4;
const SETTINGS_STEP = 5;

export default function MyAdmissionCreation() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(PROGRAM_INFO_STEP);
  const [programInfo, setProgramInfo] =
    useState<AdmissionStepsProgramInfoFormType | null>(null);
  const [scheduling, setScheduling] = useState<AdmissionStepsSchedulingFormType | null>(
    null
  );
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
          <Link to={DORMITORY_MY_ADMISSION_LIST_PAGE_ROUTE}>برنامه های پذیرش من</Link>
        ),
      },
      {
        title: "ایجاد برنامه پذیرش",
      },
    ],
  });

  //? ================================  Api Calls ================================
  // ارسال استپ اطلاعات برنامه
  const [
    createMyAdmissionProgramInfo,
    { isLoading: isCreateMyAdmissionProgramInfoLoading },
  ] = useCreateMyAdmissionProgramInfoMutation();

  // ارسال استپ زمانبندی
  const [
    createMyAdmissionScheduling,
    { isLoading: isCreateMyAdmissionSchedulingLoading },
  ] = useCreateMyAdmissionSchedulingMutation();

  // ارسال استپ قوانین پذیرش
  const [createMyAdmissionRules, { isLoading: isCreateMyAdmissionRulesLoading }] =
    useCreateMyAdmissionRulesMutation();

  // ارسال فایل های ضمیمه
  const [
    myDormitoryUploadFileWithText,
    { isLoading: isMyDormitoryUploadFileWithTextLoading },
  ] = useMyDormitoryUploadFileWithTextMutation();

  //* ================================ Util Functions ================================
  const cancelHandler = () => {
    navigate(DORMITORY_MY_ADMISSION_LIST_PAGE_ROUTE);
  };

  const saveDraftHandler = () => {
    // TODO: wire draft API when contract is available
  };

  // ================================ STEP 1 ================================
  const programInfoSubmitHandler = (values: AdmissionStepsProgramInfoFormType) => {
    const request: CreateMyAdmissionProgramInfoRequest = {
      ...(params?.id ? { uuid: params?.id } : {}), // edit mode
      faTitle: values.programTitle,
      businessId: Number(values.business?.code),
      branchId: Number(values.branch?.code),
      accommodationUuid: values.residence?.code.toString(),
      managementType: values.managementType?.value,
      saleUnitType: values.reservableCapacity,
      visible: values.checked,
    };

    createMyAdmissionProgramInfo(request)
      .unwrap()
      .then((uuid) => {
        setSearchParams({ ...params, id: uuid });
        setProgramInfo(values);
        setCurrentStep(SCHEDULING_STEP);
      });
  };

  // ================================ STEP 2 ================================
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

    const request: CreateMyAdmissionSchedulingRequest = {
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

    createMyAdmissionScheduling(request)
      .unwrap()
      .then(() => {
        setScheduling(values);
        setCurrentStep(RULES_STEP);
      });
  };

  // ================================ STEP 3 ================================
  const rulesBackHandler = () => {
    setCurrentStep(SCHEDULING_STEP);
  };

  const rulesSubmitHandler = async () => {
    if (!params?.id) {
      return;
    }

    const values: AdmissionStepsRulesFormType = rulesStepForm.getFieldsValue(true);

    const regulations = RULE_SECTIONS.reduce<
      CreateMyAdmissionRulesRequest["regulations"]
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

    let forms: CreateMyAdmissionRulesRequest["forms"];

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

          const uploadResponse = await myDormitoryUploadFileWithText(formData).unwrap();

          return {
            uuid: uploadResponse.uuid,
            title: document.title,
          };
        })
      );
    }

    const request: CreateMyAdmissionRulesRequest = {
      uuid: params.id,
      gender: values.admissionGender?.item?.name ?? "",
      // آیا می‌خواهید نمایش این برنامه پذیرش را محدود کنید؟
      allowAllBranches: values.hasShowRestrictions,
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

    createMyAdmissionRules(request)
      .unwrap()
      .then(() => {
        setCurrentStep(CAPACITIES_STEP);
      });
  };

  // ================================ STEP 4 ================================
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
    // TODO: wire submit API when contract is available
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
          from="my"
          isSubmitAndContinueLoading={isCreateMyAdmissionProgramInfoLoading}
        />
      ) : null}

      {currentStep === SCHEDULING_STEP ? (
        <AdmissionStepsSchedulingContent
          from="my"
          onBack={schedulingBackHandler}
          onSaveDraft={saveDraftHandler}
          onSubmitAndContinue={schedulingSubmitHandler}
          isSubmitAndContinueLoading={isCreateMyAdmissionSchedulingLoading}
        />
      ) : null}

      {currentStep === RULES_STEP ? (
        <AdmissionStepsRulesContent
          from="my"
          form={rulesStepForm}
          documentFileLists={documentFileLists}
          setDocumentFileLists={setDocumentFileLists}
          reservableCapacity={programInfo?.reservableCapacity}
          onBack={rulesBackHandler}
          onSaveDraft={saveDraftHandler}
          onSubmitAndContinue={rulesSubmitHandler}
          isSubmitAndContinueLoading={
            isCreateMyAdmissionRulesLoading || isMyDormitoryUploadFileWithTextLoading
          }
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
        <AdmissionStepsSettingsContent
          scheduling={scheduling}
          programInfo={{
            programTitle: programInfo?.programTitle,
            reservableCapacity: programInfo?.reservableCapacity,
          }}
          onBack={settingsBackHandler}
          onSaveDraft={saveDraftHandler}
          onSubmitAndContinue={settingsSubmitHandler}
        />
      ) : null}
    </div>
  );
}
