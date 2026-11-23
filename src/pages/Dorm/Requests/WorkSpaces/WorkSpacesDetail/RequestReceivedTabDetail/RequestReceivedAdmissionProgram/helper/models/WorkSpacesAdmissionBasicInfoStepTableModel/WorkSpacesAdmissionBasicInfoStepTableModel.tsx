import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomTimePicker from "@components/CustomInputs/CustomTimePicker/CustomTimePicker";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import { RequestSendingAdmissionFormData } from "../../../@types/@requestReceivedAdmissionProgram";

interface WorkSpacesTimingInfoTableData {
  stringId: string;
  isDisabled?: boolean;
}

const WorkSpacesAdmissionBasicInfoStepTableModel = (
  form: RequestSendingAdmissionFormData,
  schedule?: string
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
    render: (_: string, records: WorkSpacesTimingInfoTableData) => {
      const isApplied = records.stringId === "Applied";
      const isDisabled = schedule === "2" && isApplied;

      return (
        <CustomDatePicker
          placeholder="انتخاب کنید"
          name={`startDate${records?.stringId}`}
          rules={isDisabled || records.isDisabled ? [] : [REQUIRED_RULE]}
          form={form}
          hasVerticalLabel={false}
          disabled={isDisabled || records.isDisabled}
        />
      );
    },
  },
  {
    title: "ساعت شروع",
    dataIndex: "startTime",
    key: "startTime",
    width: 130,
    render: (_: string, records: WorkSpacesTimingInfoTableData) => {
      const isApplied = records.stringId === "Applied";
      const isDisabled = schedule === "2" && isApplied;
      const fieldName = `startTime${records?.stringId}`;

      if (isDisabled || records.isDisabled) {
        form.setFieldsValue({ [fieldName]: undefined });
      }

      return (
        <CustomTimePicker
          name={fieldName}
          placeholder="انتخاب کنید"
          rules={isDisabled || records.isDisabled ? [] : [REQUIRED_RULE]}
          hasVerticalLabel={false}
          disabled={isDisabled || records.isDisabled}
          value={isDisabled || records.isDisabled ? null : undefined}
        />
      );
    },
  },
  {
    title: "تاریخ پایان",
    dataIndex: "endDate",
    key: "endDate",
    width: 130,
    render: (_: string, records: WorkSpacesTimingInfoTableData) => {
      const isApplied = records.stringId === "Applied";
      const isDisabled = schedule === "2" && isApplied;

      return (
        <CustomDatePicker
          placeholder="انتخاب کنید"
          name={`endDate${records?.stringId}`}
          rules={isDisabled || records.isDisabled ? [] : [REQUIRED_RULE]}
          form={form}
          hasVerticalLabel={false}
          disabled={isDisabled || records.isDisabled}
        />
      );
    },
  },
  {
    title: "ساعت پایان",
    dataIndex: "endTime",
    key: "endTime",
    width: 130,
    render: (_: string, records: WorkSpacesTimingInfoTableData) => {
      const isApplied = records.stringId === "Applied";
      const isDisabled = schedule === "2" && isApplied;
      const fieldName = `endTime${records?.stringId}`;

      if (isDisabled || records.isDisabled) {
        form.setFieldsValue({ [fieldName]: undefined });
      }

      return (
        <CustomTimePicker
          name={fieldName}
          placeholder="انتخاب کنید"
          rules={isDisabled || records.isDisabled ? [] : [REQUIRED_RULE]}
          hasVerticalLabel={false}
          disabled={isDisabled || records.isDisabled}
          value={isDisabled || records.isDisabled ? null : undefined}
        />
      );
    },
  },
];

export default WorkSpacesAdmissionBasicInfoStepTableModel;
