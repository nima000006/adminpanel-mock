import { CustomButton } from "@components/CustomInputs";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { AdmissionRenewalSourceItem } from "@pages/Dormitory/Admission/_shared/@types/@admissionDetail";

const AdmissionStepsSettingsRenewalSourceTableModel = ({
  onViewSourceProgram,
  onView,
  onEditFinancialSettings,
}: {
  onViewSourceProgram: (record: AdmissionRenewalSourceItem) => void;
  onView: (record: AdmissionRenewalSourceItem) => void;
  onEditFinancialSettings: (record: AdmissionRenewalSourceItem) => void;
}): CustomColumnType<AdmissionRenewalSourceItem>[] => [
  {
    title: "برنامه پذیرش مبدأ",
    dataIndex: "sourceProgramTitle",
    key: "sourceProgramTitle",
    width: 220,
    render: (value: string, record: AdmissionRenewalSourceItem) => (
      <CustomButton type="link" onClick={() => onViewSourceProgram(record)}>
        {dataPlaceHolder({ data: value })}
      </CustomButton>
    ),
  },
  {
    title: "ظرفیت مبدأ",
    dataIndex: "sourceCapacity",
    key: "sourceCapacity",
    width: 130,
    render: (value: number) => dataPlaceHolder({ data: value }),
  },
  {
    title: "ظرفیت قابل تمدید در این برنامه",
    dataIndex: "renewableCapacity",
    key: "renewableCapacity",
    width: 220,
    render: (_: number, record: AdmissionRenewalSourceItem) =>
      dataPlaceHolder({
        data: `${record.renewableCapacity} (${record.renewablePercent}%)`,
      }),
  },
  {
    title: "فاصله زمانی",
    dataIndex: "timeInterval",
    key: "timeInterval",
    width: 160,
    render: (value: string) => (
      <CustomTag className="w-fit">{dataPlaceHolder({ data: value })}</CustomTag>
    ),
  },
  {
    title: "تنظیمات مالی",
    dataIndex: "financialSettingLabel",
    key: "financialSettingLabel",
    width: 220,
    render: (value: string) => dataPlaceHolder({ data: value }),
  },
  {
    title: "",
    key: "actions",
    width: 260,
    className: "tables-sticky-column-left",
    fixed: "right",
    render: (_: unknown, record: AdmissionRenewalSourceItem) => (
      <div className="flex gap-2">
        <CustomButton type="link" onClick={() => onView(record)}>
          مشاهده
        </CustomButton>
        <CustomButton type="link" onClick={() => onEditFinancialSettings(record)}>
          ویرایش تنظیمات مالی
        </CustomButton>
      </div>
    ),
  },
];

export default AdmissionStepsSettingsRenewalSourceTableModel;
