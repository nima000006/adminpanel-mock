import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import { AdmissionStepsRuleCategoryKey } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsRulesContent/@types/@admissionStepsRulesContent";
import { AdmissionStepsRulesRegulationsProps } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsRulesContent/helper/components/AdmissionStepsRulesRegulations/@types/@admissionStepsRulesRegulations";
import AdmissionStepsRulesRegulationItems from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsRulesContent/helper/components/AdmissionStepsRulesRegulations/helper/components/AdmissionStepsRulesRegulationItems/AdmissionStepsRulesRegulationItems";

const RULE_SECTIONS: {
  key: AdmissionStepsRuleCategoryKey;
  title: string;
}[] = [
  { key: "FINANCIAL", title: "قوانین و مقررات مالی" },
  { key: "DISCIPLINARY", title: "قوانین و مقررات انضباطی" },
  { key: "GENERAL", title: "قوانین و مقررات عمومی" },
  { key: "CANCELLATION", title: "قوانین و مقررات کنسلی" },
  { key: "INSTALLMENT", title: "قوانین و مقررات اقساط" },
];

const AdmissionStepsRulesRegulations = ({
  form,
  data,
}: AdmissionStepsRulesRegulationsProps) => {
  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex flex-col gap-6">
      <CustomDivider text="قوانین و مقررات" />

      <CustomAlert
        type="info"
        showIcon
        title="در صورت نیاز، می‌توانید قوانین قابل نمایش به کاربران هنگام رزرو را از میان قوانین پیش‌فرض انتخاب کرده یا متن آن‌ها را ویرایش کنید."
      />

      {RULE_SECTIONS.map((item) => (
        <AdmissionStepsRulesRegulationItems
          item={item}
          key={item.key}
          form={form}
          data={data}
        />
      ))}
    </div>
  );
};

export default AdmissionStepsRulesRegulations;
