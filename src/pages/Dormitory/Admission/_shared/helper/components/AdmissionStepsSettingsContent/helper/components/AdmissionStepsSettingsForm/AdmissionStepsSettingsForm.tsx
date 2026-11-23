import { useState } from "react";

import { Col, Form, Row } from "antd";
import { AiFillInfoCircle } from "react-icons/ai";

import { CustomSelect } from "@components/CustomInputs";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { AdmissionRenewalSourceItem } from "@pages/Dormitory/Admission/_shared/@types/@admissionDetail";
import {
  AdmissionStepsSettingsFinancialFormType,
  AdmissionStepsSettingsFormProps,
  AdmissionStepsSettingsFormType,
} from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsSettingsContent/@types/@admissionStepsSettingsContent";
import AdmissionStepsSettingsFinancialModal from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsSettingsContent/helper/components/AdmissionStepsSettingsFinancialModal/AdmissionStepsSettingsFinancialModal";
import AdmissionStepsSettingsRenewalCapacityDrawer from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsSettingsContent/helper/components/AdmissionStepsSettingsRenewalCapacityDrawer/AdmissionStepsSettingsRenewalCapacityDrawer";
import AdmissionStepsSettingsRenewalSourceTableModel from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsSettingsContent/helper/models/AdmissionStepsSettingsRenewalSource/AdmissionStepsSettingsRenewalSourceTableModel";
import {
  applyFinancialSettingsToSource,
  buildSettingsInitialValues,
  getRenewalDescription,
  getRenewalQuestion,
  getSelectedSourceProgramIds,
  isDailyOrMonthlySchedule,
  RENEWAL_SOURCE_CATALOG,
  SOURCE_PROGRAM_OPTIONS,
} from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsSettingsContent/helper/util";
import AdmissionSwitchAlert from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionSwitchAlert/AdmissionSwitchAlert";
import { RESERVABLE_CAPACITY_TYPE } from "@pages/Dormitory/Admission/_shared/util";

const AdmissionStepsSettingsForm = ({
  scheduleType,
  reservableCapacity = RESERVABLE_CAPACITY_TYPE.bed,
  programTitle = "",
  renewalAllowedFrom = "",
  renewalAllowedTo = "",
  hasRenewal: initialHasRenewal = false,
  renewalSources: initialRenewalSources = [],
  formClassName = "flex flex-1 flex-col gap-10",
  onFinish,
  footer,
}: AdmissionStepsSettingsFormProps) => {
  const [form] = Form.useForm<AdmissionStepsSettingsFormType>();

  // کل برنامه‌های مبدأ قابل انتخاب نمایش داده می‌شوند؛ تنظیمات مالی ذخیره‌شده (در ویرایش) جایگزین ردیف همان برنامه می‌شود
  const [renewalSources, setRenewalSources] = useState<AdmissionRenewalSourceItem[]>(() =>
    RENEWAL_SOURCE_CATALOG.map(
      (source) => initialRenewalSources.find((item) => item.id === source.id) ?? source
    )
  );
  const [editingFinancialSource, setEditingFinancialSource] =
    useState<AdmissionRenewalSourceItem | null>(null);
  const [viewingRenewalSource, setViewingRenewalSource] =
    useState<AdmissionRenewalSourceItem | null>(null);

  const hasRenewal = Form.useWatch("hasRenewal", form);
  const sourcePrograms = Form.useWatch("sourcePrograms", form);

  const isDailyOrMonthly = isDailyOrMonthlySchedule(scheduleType);
  const showTermicRenewalDetails = !isDailyOrMonthly && !!hasRenewal;
  const selectedSourceIds = getSelectedSourceProgramIds(sourcePrograms);
  const visibleRenewalSources = renewalSources.filter((source) =>
    selectedSourceIds.includes(source.id)
  );

  //* ================================ Util Functions ================================
  const viewSourceProgramHandler = (_record: AdmissionRenewalSourceItem) => {
    // TODO: navigate to source admission program detail when route is ready
  };

  const viewRenewalSourceHandler = (record: AdmissionRenewalSourceItem) => {
    setViewingRenewalSource(record);
  };

  const closeRenewalCapacityDrawerHandler = () => {
    setViewingRenewalSource(null);
  };

  const openFinancialSettingsHandler = (record: AdmissionRenewalSourceItem) => {
    setEditingFinancialSource(record);
  };

  const closeFinancialSettingsHandler = () => {
    setEditingFinancialSource(null);
  };

  const confirmFinancialSettingsHandler = (
    values: AdmissionStepsSettingsFinancialFormType
  ) => {
    if (!editingFinancialSource) {
      return;
    }

    setRenewalSources((previous) =>
      previous.map((source) =>
        source.id === editingFinancialSource.id
          ? applyFinancialSettingsToSource(source, values)
          : source
      )
    );
    setEditingFinancialSource(null);
  };

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      <Form
        form={form}
        className={formClassName}
        initialValues={buildSettingsInitialValues({
          hasRenewal: initialHasRenewal,
          renewalSources: initialRenewalSources,
        })}
        onFinish={onFinish}
      >
        <div className="flex flex-col gap-4">
          <CustomDivider text="تنظیمات تمدید" />

          <AdmissionSwitchAlert
            question={getRenewalQuestion(isDailyOrMonthly)}
            description={getRenewalDescription(
              isDailyOrMonthly,
              renewalAllowedFrom,
              renewalAllowedTo
            )}
            valuePropName="hasRenewal"
            defaultChecked={initialHasRenewal}
          />

          {showTermicRenewalDetails ? (
            <div className="flex flex-col gap-4">
              <Row>
                <Col span={12}>
                  <CustomSelect
                    name="sourcePrograms"
                    label="برنامه پذیرش مبدأ"
                    form={form}
                    mode="multiple"
                    options={SOURCE_PROGRAM_OPTIONS}
                    rules={[REQUIRED_RULE]}
                    placeholder="انتخاب کنید"
                  />
                </Col>
              </Row>

              <CustomAlert
                description={
                  <div className="flex items-start gap-2">
                    <AiFillInfoCircle
                      className="text-primary-6 mt-0.5 shrink-0"
                      size={16}
                    />
                    <div className="flex flex-col gap-2">
                      <span className="text-neutral-11 text-base font-medium">
                        راهنما
                      </span>
                      <div className="text-neutral-10 text-sm">
                        <p>
                          <span className="font-medium">فاصله زمانی:</span> مدت زمانی بین
                          پایان بازه مجاز اسکان برنامه مبدأ و شروع بازه مجاز اسکان برنامه
                          جدید.
                        </p>
                        <p>
                          <span className="font-medium">ظرفیت مبدأ:</span> تعداد
                          ظرفیت‌هایی که در برنامه پذیرش قبلی تعریف شده‌اند.
                        </p>
                        <p>
                          <span className="font-medium">ظرفیت قابل تمدید:</span> تعداد
                          ظرفیت‌های برنامه مبدأ که در برنامه پذیرش جدید نیز امکان ثبت
                          درخواست تمدید توسط ساکن آن ظرفیت وجود دارد.
                        </p>
                      </div>
                    </div>
                  </div>
                }
              />

              <CustomAlert
                description={
                  <div className="flex items-start gap-2">
                    <AiFillInfoCircle
                      className="text-primary-6 mt-0.5 shrink-0"
                      size={16}
                    />
                    <div className="flex flex-col gap-2">
                      <span className="text-neutral-11 text-base font-medium">
                        ویرایش تنظیمات مالی
                      </span>
                      <span className="text-neutral-10 text-sm">
                        در صورتی که می‌خواهید از کاربران ساکن برنامه‌های پذیرش انتخابی
                        بابت فاصله زمانی هزینه انبارداری و یا سکونت مازاد دریافت نمایید بر
                        روی ویرایش تنظیمات مالی کلیک نمایید.
                      </span>
                    </div>
                  </div>
                }
              />

              <CustomTable
                dataSource={visibleRenewalSources}
                rowKey="id"
                columns={AdmissionStepsSettingsRenewalSourceTableModel({
                  onViewSourceProgram: viewSourceProgramHandler,
                  onView: viewRenewalSourceHandler,
                  onEditFinancialSettings: openFinancialSettingsHandler,
                })}
                pagination={false}
              />
            </div>
          ) : null}
        </div>

        {footer}
      </Form>

      <AdmissionStepsSettingsFinancialModal
        open={!!editingFinancialSource}
        record={editingFinancialSource}
        currentProgramTitle={programTitle}
        onCancel={closeFinancialSettingsHandler}
        onConfirm={confirmFinancialSettingsHandler}
      />

      <AdmissionStepsSettingsRenewalCapacityDrawer
        open={!!viewingRenewalSource}
        record={viewingRenewalSource}
        capacityType={reservableCapacity}
        onClose={closeRenewalCapacityDrawerHandler}
      />
    </>
  );
};

export default AdmissionStepsSettingsForm;
