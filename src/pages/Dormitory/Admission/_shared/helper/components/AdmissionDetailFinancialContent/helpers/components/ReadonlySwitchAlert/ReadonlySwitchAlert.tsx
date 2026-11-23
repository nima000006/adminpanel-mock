import { AiFillInfoCircle } from "react-icons/ai";

import { CustomSwitch } from "@components/CustomInputs";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import { ReadonlySwitchAlertProps } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionDetailFinancialContent/helpers/components/ReadonlySwitchAlert/@types/@readonlySwitchAlert";

const ReadonlySwitchAlert = ({
  question,
  description,
  checked,
  valuePropName,
}: ReadonlySwitchAlertProps) => (
  <CustomAlert
    description={
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2">
          <AiFillInfoCircle className="text-primary-6 mt-0.5 shrink-0" size={16} />
          <div className="flex flex-col gap-2">
            <span className="text-neutral-11 text-sm font-medium">{question}</span>
            {description && (
              <span className="text-neutral-10 text-sm">{description}</span>
            )}
          </div>
        </div>
        <CustomSwitch
          valuePropName={valuePropName}
          checked={checked}
          checkedChildren="بله"
          unCheckedChildren="خیر"
          disabled
          noStyle
        />
      </div>
    }
  />
);

export default ReadonlySwitchAlert;
