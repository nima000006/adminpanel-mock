import { useEffect, useState } from "react";

import { Col, Form, Row } from "antd";
import { AiOutlineMinusCircle, AiOutlinePlus } from "react-icons/ai";

import { CustomInput, CustomUploader } from "@components/CustomInputs";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import DynamicFormRows from "@components/Renderers/CustomForm/CustomDynamicFormRows/CustomDynamicFormRows";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { AdmissionStepsRulesHandoverConditionsProps } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsRulesContent/helper/components/AdmissionStepsRulesHandoverConditions/@types/@admissionStepsRulesHandoverConditions";
import AdmissionSwitchAlert from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionSwitchAlert/AdmissionSwitchAlert";

const AdmissionStepsRulesHandoverConditions = ({
  form,
  documentFileLists,
  onUpdateDocumentFileList,
  onRemoveHandoverDocument,
  onRequiresHandoverDocumentsChange,
  defaultRequiresHandoverDocuments = false,
  initialHandoverDocuments = [],
  isDocumentUploaderReadOnly = true,
  data,
}: AdmissionStepsRulesHandoverConditionsProps) => {
  const requiresHandoverDocuments = Form.useWatch("requiresHandoverDocuments", form);

  const [requiresRelativesInfo, setRequiresRelativesInfo] = useState(false);

  //? ================================ Effects ================================
  useEffect(() => {
    if (data) {
      setRequiresRelativesInfo(data?.allowGuestInfo);
    }
  }, [data]);

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      <CustomDivider text="شرایط تحویل اقامتگاه" />

      <div className="flex flex-col gap-4">
        <AdmissionSwitchAlert
          question="آیا هنگام تحویل اقامتگاه، دریافت مدارک یا مستندات خاصی از کاربر الزامی است؟"
          description="در صورت فعال بودن این گزینه، کاربر برای تحویل اقامتگاه باید مدارک مشخص‌شده را ارائه کند. این مدارک در سامانه دریافت و بارگذاری می‌شوند. لطفا در بارگذاری نمونه فایل‌ها دقت لازم رو داشته باشید و فایل‌های شفاف و اسکن شده را بارگذاری نمایید."
          valuePropName="requiresHandoverDocuments"
          defaultChecked={defaultRequiresHandoverDocuments}
          onChange={onRequiresHandoverDocumentsChange}
        />

        {requiresHandoverDocuments ? (
          <DynamicFormRows
            name="handoverDocuments"
            form={form}
            minRows={1}
            maxRows={5}
            addButtonText="افزودن فرم"
            initialValue={initialHandoverDocuments.map((document) => ({
              title: document.title,
            }))}
          >
            {(field, remove, canRemove) => (
              <Row key={field.key} gutter={[16, 16]} align="top">
                <Col xl={6} lg={6} md={8} sm={12} xs={24}>
                  <CustomInput
                    name={[field.name, "title"]}
                    label="عنوان فرم"
                    rules={[REQUIRED_RULE]}
                    placeholder="عنوان فرم را وارد کنید"
                  />
                </Col>

                <Col xl={6} lg={6} md={8} sm={12} xs={24} className="h-48 md:h-40">
                  <CustomUploader
                    fileList={documentFileLists[field.name] ?? []}
                    setFileList={(value) => onUpdateDocumentFileList(field.name, value)}
                    isReadOnly={isDocumentUploaderReadOnly}
                    hasUploaderIcon={false}
                    hasNullText={false}
                    name={`handoverDocument-${field.name}`}
                    label="نمونه فرم"
                    hasVerticalLabel={true}
                    maxCount={1}
                    isDisabled={(documentFileLists[field.name] ?? []).length >= 1}
                    uploaderText={
                      <div className="flex items-center justify-center gap-2 py-6">
                        <div>بارگذاری</div>
                        <div className="font-bold">
                          <AiOutlinePlus />
                        </div>
                      </div>
                    }
                  />
                </Col>

                {canRemove ? (
                  <Col className="flex items-center pt-7">
                    <AiOutlineMinusCircle
                      className="cursor-pointer text-red-500"
                      size={20}
                      onClick={() => onRemoveHandoverDocument(field.name, remove)}
                    />
                  </Col>
                ) : null}
              </Row>
            )}
          </DynamicFormRows>
        ) : null}

        <AdmissionSwitchAlert
          question="آیا در زمان تحویل اقامتگاه به اطلاعات بستگان کاربر نیاز دارید؟"
          description="در صورت فعال بودن این گزینه، هنگام تحویل اقامتگاه اطلاعات بستگان کاربر شامل کد ملی / فراگیر، تاریخ تولد، نسبت و شماره تماس دریافت خواهد شد."
          valuePropName="requiresRelativesInfo"
          defaultChecked={requiresRelativesInfo}
          value={requiresRelativesInfo}
          onChange={(checked) => setRequiresRelativesInfo(checked)}
        />
      </div>
    </>
  );
};

export default AdmissionStepsRulesHandoverConditions;
