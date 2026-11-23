import { FormInstance } from "antd";

import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomTimePicker from "@components/CustomInputs/CustomTimePicker/CustomTimePicker";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { AdmissionModifyFormData } from "@pages/Dorm/Planning/Admission/AdmissionModify/@types/@admissionModify";
import { AdmissionModifyTimingInfoTableData } from "@pages/Dorm/Planning/Admission/AdmissionModify/helpers/AdmissionModifyBasicInfoStep/@types/@admissionModifyBasicInfoStep";

const AdmissionDetailEditableTimingInfoTableModel = (
  form: FormInstance<AdmissionModifyFormData>
) => [
  {
    title: "عنوان زمان‌بندی",
    dataIndex: "title",
    key: "title",
    width: 130,
  },
  {
    title: "تاریخ شروع",
    dataIndex: "startDate",
    key: "startDate",
    width: 130,
    render: (_: string, records: AdmissionModifyTimingInfoTableData) => {
      const isExtension = records.stringId === "Extension";
      return (
        <CustomDatePicker
          placeholder="انتخاب کنید"
          name={`startDate${records?.stringId}`}
          rules={isExtension || records.isDisabled ? [] : [REQUIRED_RULE]}
          form={form}
          // picker="month"
          hasVerticalLabel={false}
          format={{
            type: "mask",
            format: "YYYY-MM-DD",
          }}
          value={isExtension ? null : undefined}
          disabled={records.isDisabled}
        />
      );
    },
  },
  {
    title: "ساعت شروع",
    dataIndex: "startTime",
    key: "startTime",
    width: 130,
    render: (_: string, records: AdmissionModifyTimingInfoTableData) => {
      const isExtension = records.stringId === "Extension";
      const fieldName = `startTime${records?.stringId}`;

      if (records.isDisabled) {
        form.setFieldsValue({ [fieldName]: undefined });
      }

      return (
        <CustomTimePicker
          name={fieldName}
          placeholder="انتخاب کنید"
          rules={isExtension || records.isDisabled ? [] : [REQUIRED_RULE]}
          hasVerticalLabel={false}
          disabled={records.isDisabled}
          value={records.isDisabled ? null : undefined}
        />
      );
    },
  },
  {
    title: "تاریخ پایان",
    dataIndex: "endDate",
    key: "endDate",
    width: 130,
    render: (_: string, records: AdmissionModifyTimingInfoTableData) => {
      const isExtension = records.stringId === "Extension";
      return (
        <CustomDatePicker
          placeholder="انتخاب کنید"
          name={`endDate${records?.stringId}`}
          rules={isExtension || records.isDisabled ? [] : [REQUIRED_RULE]}
          form={form}
          // picker="month"
          hasVerticalLabel={false}
          format={{
            type: "mask",
            format: "YYYY-MM-DD",
          }}
          value={isExtension ? null : undefined}
          disabled={records.isDisabled}
        />
      );
    },
  },
  {
    title: "ساعت پایان",
    dataIndex: "endTime",
    key: "endTime",
    width: 130,
    render: (_: string, records: AdmissionModifyTimingInfoTableData) => {
      const isExtension = records.stringId === "Extension";
      const fieldName = `endTime${records?.stringId}`;

      if (records.isDisabled) {
        form.setFieldsValue({ [fieldName]: undefined });
      }

      return (
        <CustomTimePicker
          name={fieldName}
          placeholder="انتخاب کنید"
          rules={isExtension || records.isDisabled ? [] : [REQUIRED_RULE]}
          hasVerticalLabel={false}
          disabled={records.isDisabled}
          value={records.isDisabled ? null : undefined}
        />
      );
    },
  },
];
export default AdmissionDetailEditableTimingInfoTableModel;
