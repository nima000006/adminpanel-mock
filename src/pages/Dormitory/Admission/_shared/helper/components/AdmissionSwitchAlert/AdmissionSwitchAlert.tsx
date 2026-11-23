import { AiFillInfoCircle } from "react-icons/ai";

import { CustomSwitch } from "@components/CustomInputs";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import { AdmissionSwitchAlertProps } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionSwitchAlert/@types/@admissionSwitchAlert";

const AdmissionSwitchAlert = ({
  question,
  description,
  valuePropName,
  defaultChecked,
  value,
  onChange,
}: AdmissionSwitchAlertProps) => (
  <CustomAlert
    description={
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2">
          <AiFillInfoCircle className="text-primary-6 mt-0.5 shrink-0" size={16} />
          <div className="flex flex-col gap-2">
            <span className="text-neutral-11 text-base font-medium">{question}</span>
            {description ? (
              <span className="text-neutral-10 text-sm">{description}</span>
            ) : null}
          </div>
        </div>
        <CustomSwitch
          valuePropName={valuePropName}
          defaultChecked={defaultChecked}
          {...(value !== undefined ? { value, checked: value } : {})}
          checkedChildren="بله"
          unCheckedChildren="خیر"
          noStyle
          onChange={onChange}
        />
      </div>
    }
  />
);

export default AdmissionSwitchAlert;
