import { useEffect } from "react";

import { Form } from "antd";

import { CustomRangePicker } from "@components/CustomInputs";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import AdmissionRadioCard from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionRadioCard/AdmissionRadioCard";
import { AllAdmissionCreationContractTemplateStepProps } from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionCreation/@types/@allAdmissionCreation";
import { getContractServicesCountLabel } from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionCreation/helper/util";

const AllAdmissionCreationContractTemplateStep = ({
  templates,
  selectedTemplateId,
  stayDateRange,
  onSelectTemplate,
}: AllAdmissionCreationContractTemplateStepProps) => {
  const [form] = Form.useForm<{ templateId?: string; stayDateRange?: unknown }>();
  const templateId = Form.useWatch("templateId", form);

  //? ================================ Effects ================================
  useEffect(() => {
    form.setFieldsValue({
      templateId: selectedTemplateId,
      stayDateRange,
    });
  }, [form, selectedTemplateId, stayDateRange]);

  useEffect(() => {
    if (templateId == null || templateId === selectedTemplateId) {
      return;
    }

    onSelectTemplate(templateId);
  }, [onSelectTemplate, selectedTemplateId, templateId]);

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={form} className="flex w-full flex-col gap-10">
      <AdmissionRadioCard
        form={form}
        name="templateId"
        label="انتخاب قالب قرارداد"
        direction="vertical"
        rules={[REQUIRED_RULE]}
        options={templates.map((template) => ({
          value: template.id,
          title: template.title,
          description: getContractServicesCountLabel(template.servicesCount),
        }))}
      />

      <CustomRangePicker
        name="stayDateRange"
        label="تاریخ شروع و پایان قرارداد"
        form={form}
        disabled
        placeholder={["از تاریخ", "تا تاریخ"]}
      />
    </Form>
  );
};

export default AllAdmissionCreationContractTemplateStep;
