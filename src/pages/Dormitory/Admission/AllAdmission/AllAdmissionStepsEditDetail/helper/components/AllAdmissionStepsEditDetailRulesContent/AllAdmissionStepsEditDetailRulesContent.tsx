import { SetStateAction, useState } from "react";

import { Form, FormInstance, UploadFile } from "antd";
import { useNavigate } from "react-router";

import { CustomButton } from "@components/CustomInputs";
import { makeSearchParams } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORMITORY_ALL_ADMISSION_PROGRAM_DETAIL_PAGE_ROUTE } from "@infra/router/routes/dormitory";
import { AdmissionStepsRulesFormType } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsRulesContent/@types/@admissionStepsRulesContent";
import AdmissionStepsRulesHandoverConditions from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsRulesContent/helper/components/AdmissionStepsRulesHandoverConditions/AdmissionStepsRulesHandoverConditions";
import AdmissionStepsRulesRegulations from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsRulesContent/helper/components/AdmissionStepsRulesRegulations/AdmissionStepsRulesRegulations";
import { MY_ADMISSION_DETAIL_TABS } from "@pages/Dormitory/Admission/_shared/util";
import { AllAdmissionStepsEditDetailRulesFormType } from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionStepsEditDetail/helper/components/AllAdmissionStepsEditDetailRulesContent/@types/@allAdmissionStepsEditDetailRulesContent";
import AllAdmissionStepsEditDetailRulesAdmissionConditions from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionStepsEditDetail/helper/components/AllAdmissionStepsEditDetailRulesContent/helper/components/AllAdmissionStepsEditDetailRulesAdmissionConditions/AllAdmissionStepsEditDetailRulesAdmissionConditions";
import {
  buildRulesAndRegulationsInitialValues,
  hasInitialAdditionalRestrictions,
  resolveAdmissionGender,
  rulesContentData,
  toFileList,
} from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionStepsEditDetail/helper/components/AllAdmissionStepsEditDetailRulesContent/helper/util";

const data = rulesContentData;

const AllAdmissionStepsEditDetailRulesContent = () => {
  const navigate = useNavigate();
  const { params: url } = useQueryParams();
  const [form] = Form.useForm<AllAdmissionStepsEditDetailRulesFormType>();
  const [documentFileLists, setDocumentFileLists] = useState<UploadFile[][]>(() =>
    data.handoverDocuments.map((document) => toFileList(document.sampleFileId))
  );

  //* ================================ Util Functions ================================
  const cancelEditHandler = () => {
    navigate({
      pathname: DORMITORY_ALL_ADMISSION_PROGRAM_DETAIL_PAGE_ROUTE,
      search: makeSearchParams({
        id: url?.id ?? data.id,
        tab: MY_ADMISSION_DETAIL_TABS.rules,
      }),
    });
  };

  const submitHandler = (_values: AllAdmissionStepsEditDetailRulesFormType) => {
    // TODO: wire submit API when contract is available
  };

  const updateDocumentFileList = (index: number, value: SetStateAction<UploadFile[]>) => {
    setDocumentFileLists((prev) => {
      const next = [...prev];
      const current = next[index] ?? [];
      next[index] = typeof value === "function" ? value(current) : value;
      return next;
    });
  };

  const removeHandoverDocumentHandler = (index: number, remove: () => void) => {
    setDocumentFileLists((prev) =>
      prev.filter((_, fileListIndex) => fileListIndex !== index)
    );
    remove();
  };

  const requiresHandoverDocumentsChangeHandler = (checked: boolean) => {
    if (checked) return;

    form.setFieldsValue({ handoverDocuments: undefined });
    setDocumentFileLists([]);
  };

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form
      form={form}
      className="flex flex-1 flex-col gap-6"
      initialValues={{
        admissionGender: resolveAdmissionGender(data.admissionGender),
        agreementBranches: data.agreementBranches,
        agreementBusiness: [data.agreementBusiness],
        hasAdditionalRestrictions: hasInitialAdditionalRestrictions,
        userGroup: data.userGroup ? [data.userGroup] : [],
        nationality: data.nationality ?? undefined,
        educationLevels: data.educationLevels,
        majors: data.majors,
        requiresHandoverDocuments: data.requiresHandoverDocuments,
        handoverDocuments: data.handoverDocuments.map((document) => ({
          title: document.title,
        })),
        requiresRelativesInfo: data.requiresRelativesInfo,
        ...buildRulesAndRegulationsInitialValues(),
      }}
      onFinish={submitHandler}
    >
      <AllAdmissionStepsEditDetailRulesAdmissionConditions form={form} />

      <AdmissionStepsRulesHandoverConditions
        form={form}
        documentFileLists={documentFileLists}
        onUpdateDocumentFileList={updateDocumentFileList}
        onRemoveHandoverDocument={removeHandoverDocumentHandler}
        onRequiresHandoverDocumentsChange={requiresHandoverDocumentsChangeHandler}
        defaultRequiresHandoverDocuments={rulesContentData.requiresHandoverDocuments}
        initialHandoverDocuments={rulesContentData.handoverDocuments.map((document) => ({
          title: document.title,
        }))}
        isDocumentUploaderReadOnly={true}
        data={undefined}
      />

      <AdmissionStepsRulesRegulations
        form={form as unknown as FormInstance<AdmissionStepsRulesFormType>}
        data={undefined}
      />

      <div className="mt-auto flex items-center justify-end gap-4 self-end">
        <CustomButton onClick={cancelEditHandler}>انصراف از ویرایش</CustomButton>
        <CustomButton type="primary" htmlType="submit">
          ثبت و اعمال تغییرات
        </CustomButton>
      </div>
    </Form>
  );
};

export default AllAdmissionStepsEditDetailRulesContent;
