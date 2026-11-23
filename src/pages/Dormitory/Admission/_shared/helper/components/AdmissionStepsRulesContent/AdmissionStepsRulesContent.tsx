import { SetStateAction, useEffect } from "react";

import { Form, UploadFile } from "antd";
import { AiOutlineArrowLeft } from "react-icons/ai";

import { CustomButton } from "@components/CustomInputs";
import Div from "@components/Renderers/Div/Div";
import { selectDefaultValueGenerator } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetAllAdmissionRulesQuery,
  useLazyGetMyAdmissionRulesQuery,
} from "@infra/states/redux/Apis/dormitory/admission/admissionApi";
import {
  AdmissionStepsRuleCategoryKey,
  AdmissionStepsRulesContentProps,
  AdmissionStepsRulesFormType,
} from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsRulesContent/@types/@admissionStepsRulesContent";
import { GetAllAdmissionRulesResponse } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsRulesContent/helper/components/AdmissionStepsRulesAdmissionConditions/@types/@admissionStepsRulesAdmissionConditions";
import AdmissionStepsRulesAdmissionConditions from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsRulesContent/helper/components/AdmissionStepsRulesAdmissionConditions/AdmissionStepsRulesAdmissionConditions";
import AdmissionStepsRulesHandoverConditions from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsRulesContent/helper/components/AdmissionStepsRulesHandoverConditions/AdmissionStepsRulesHandoverConditions";
import AdmissionStepsRulesRegulations from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsRulesContent/helper/components/AdmissionStepsRulesRegulations/AdmissionStepsRulesRegulations";
import {
  buildRulesAndRegulationsInitialValues,
  getRuleDescriptionFieldName,
} from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsRulesContent/helper/util";

const AdmissionStepsRulesContent = ({
  from = "all",
  form,
  documentFileLists,
  setDocumentFileLists,
  isSubmitAndContinueLoading,
  onBack,
  onSaveDraft,
  onSubmitAndContinue,
}: AdmissionStepsRulesContentProps) => {
  const { params } = useQueryParams();
  //? ================================  Api Calls ================================
  const [
    getAllAdmissionRules,
    { data: allAdmissionRulesData, isFetching: isGetAllAdmissionRulesLoading },
  ] = useLazyGetAllAdmissionRulesQuery();

  const [
    getMyAdmissionRules,
    { data: myAdmissionRulesData, isFetching: isGetMyAdmissionRulesLoading },
  ] = useLazyGetMyAdmissionRulesQuery();

  const admissionRulesData = from === "my" ? myAdmissionRulesData : allAdmissionRulesData;
  const isGetAdmissionRulesLoading =
    from === "my" ? isGetMyAdmissionRulesLoading : isGetAllAdmissionRulesLoading;

  //? ================================ Effects ================================
  useEffect(() => {
    if (!params?.id) {
      return;
    }

    const getAdmissionRules = from === "my" ? getMyAdmissionRules : getAllAdmissionRules;

    getAdmissionRules(params.id)
      .unwrap()
      .then((rulesData) => {
        fillAdmissionRulesForm(rulesData);
      });
  }, [params?.id]);

  //* ================================ Util Functions ================================
  const fillAdmissionRulesForm = (rulesData: GetAllAdmissionRulesResponse) => {
    form.setFieldsValue({
      admissionGender: selectDefaultValueGenerator(rulesData.gender),
      // switch 1
      // آیا می‌خواهید نمایش این برنامه پذیرش را محدود کنید؟
      hasShowRestrictions: !rulesData.allowAllBranches,
      ...(!rulesData.allowAllBranches
        ? {
            businessTypes: selectDefaultValueGenerator(
              rulesData.allowBusinesses?.map((item) => ({
                id: item?.businessId,
                title: item?.title,
              }))
            ),
            branches: selectDefaultValueGenerator(
              rulesData.allowBranches?.map((item) => ({
                id: item?.branchId,
                title: item?.title,
                uuid: item?.uuid,
              }))
            ),
          }
        : {}),
      // switch 2
      //آیا میخواهید محدودیت های بیشتری برای شرایط پذیرش اعمال نمایید؟
      hasAdditionalRestrictions: rulesData.restrictEligibility,
      ...(rulesData.restrictEligibility
        ? {
            hasAdditionalRestrictionsUserGroup: selectDefaultValueGenerator(
              rulesData.userGroupTypes?.map((item) => item)[0]
            ),
            hasAdditionalRestrictionsNationality: selectDefaultValueGenerator(
              rulesData.allowCitizenShip
            ),
            hasAdditionalRestrictionsEducationLevels: selectDefaultValueGenerator(
              rulesData.academicDegrees?.map((item) => item)
            ),
            hasAdditionalRestrictionsMajors: selectDefaultValueGenerator(
              rulesData.studyFields?.map((item) => ({
                id: item.studyFieldId,
                title: item.title,
              }))
            ),
          }
        : {}),
      // switch 3
      // آیا هنگام تحویل اقامتگاه، دریافت مدارک یا مستندات خاصی از کاربر الزامی است؟
      requiresHandoverDocuments: rulesData.needUploadForms,
      ...(rulesData.needUploadForms
        ? {
            handoverDocuments: (rulesData.forms ?? []).map((formItem) => ({
              title: formItem.title,
            })),
          }
        : { handoverDocuments: undefined }),
      // switch 4
      //آیا در زمان تحویل اقامتگاه به اطلاعات بستگان کاربر نیاز دارید؟
      requiresRelativesInfo: rulesData.allowGuestInfo,
      // regulations
      ...((rulesData.regulations ?? []).reduce<Record<string, unknown>>(
        (acc, regulation) => {
          const kindName = regulation.kind?.name as
            AdmissionStepsRuleCategoryKey | undefined;

          if (!kindName) {
            return acc;
          }

          acc[kindName] = selectDefaultValueGenerator({
            id: regulation.templateUuid,
            title: regulation.title,
          });
          acc[getRuleDescriptionFieldName(kindName)] = regulation.description;

          return acc;
        },
        {}
      ) as Partial<AdmissionStepsRulesFormType>),
    });

    if (rulesData.needUploadForms) {
      setDocumentFileLists(
        (rulesData.forms ?? []).map((formItem) => [
          {
            uid: formItem.uuid,
            name: formItem.url,
            status: "done",
            url: formItem.url,
          },
        ])
      );
    } else {
      setDocumentFileLists([]);
    }
  };

  //* ================================ Util Functions ================================
  // ترتیب documentFileLists باید با ایندکس Form.List مدارک یکی بماند؛ هر ایندکس، فایل‌های همان ردیف مدرک است
  const updateDocumentFileList = (index: number, value: SetStateAction<UploadFile[]>) => {
    setDocumentFileLists((prev) => {
      const next = [...prev];
      const current = next[index] ?? [];
      next[index] = typeof value === "function" ? value(current) : value;
      return next;
    });
  };

  // هنگام حذف ردیف مدرک، فایل‌های همان ایندکس هم حذف می‌شوند تا ردیف‌های بعدی جابه‌جا نشوند
  const removeHandoverDocumentHandler = (index: number, remove: () => void) => {
    setDocumentFileLists((prev) =>
      prev.filter((_, fileListIndex) => fileListIndex !== index)
    );
    remove();
  };

  const requiresHandoverDocumentsChangeHandler = (checked: boolean) => {
    if (checked) return;

    form.resetFields(["handoverDocuments"]);
    setDocumentFileLists([]);
  };

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={isGetAdmissionRulesLoading}>
      <Form
        form={form}
        className="flex flex-1 flex-col gap-6"
        initialValues={{
          hasAdditionalRestrictions: false,
          requiresHandoverDocuments: false,
          requiresRelativesInfo: false,
          ...buildRulesAndRegulationsInitialValues(),
        }}
        onFinish={(values) => {
          onSubmitAndContinue(values);
        }}
      >
        <AdmissionStepsRulesAdmissionConditions form={form} data={admissionRulesData} />

        <AdmissionStepsRulesHandoverConditions
          form={form}
          documentFileLists={documentFileLists}
          onUpdateDocumentFileList={updateDocumentFileList}
          onRemoveHandoverDocument={removeHandoverDocumentHandler}
          onRequiresHandoverDocumentsChange={requiresHandoverDocumentsChangeHandler}
          defaultRequiresHandoverDocuments={admissionRulesData?.needUploadForms}
          initialHandoverDocuments={(admissionRulesData?.forms ?? []).map((formItem) => ({
            title: formItem.title,
          }))}
          data={admissionRulesData}
          isDocumentUploaderReadOnly={false}
        />

        <AdmissionStepsRulesRegulations form={form} data={admissionRulesData} />

        <div className="mt-auto flex items-center justify-end gap-4 self-end">
          <CustomButton htmlType="button" onClick={onBack}>
            بازگشت
          </CustomButton>
          <CustomButton htmlType="button" onClick={onSaveDraft}>
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
    </Div>
  );
};

export default AdmissionStepsRulesContent;
