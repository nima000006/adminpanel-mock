import { Form, Switch } from "antd";

import CustomCard from "../../../../../components/CustomCard/CustomCard";
import CustomSelect from "../../../../../components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "../../../../../components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomDivider from "../../../../../components/Renderers/CustomDivider/CustomDivider";
import { PADDING_20 } from "../../../../../infrastructure/VARS/globalStyles/globalStyles";
import "./_caseReferralModalContent.scss";

const CaseReferralModalContent = () => {
  return (
    <div className="committee-case-referral-modal-container">
      <CustomCard padding={PADDING_20} className="referral-higher-unit-wrapper">
        <Form>
          <div className="divider-container">
            <div>
              <CustomDivider
                text="ارجاع به واحد بالاتر"
                extraContent={<Switch className="intensification-sentence-switch" />}
              />
            </div>
          </div>

          <div className="referral-higher-unit-content">
            <CustomSelect
              label="دلیل"
              name="reason"
              options={[]}
              placeholder="انتخاب کنید"
            />
            <CustomTextArea label="توضیحات" name="description" placeholder="توضیحات" />
          </div>
        </Form>
      </CustomCard>
      <CustomCard padding={PADDING_20}>
        <div className="divider-container">
          <div>
            <CustomDivider
              text="ارجاع به واحد پایین تر"
              extraContent={<Switch className="intensification-sentence-switch" />}
            />
          </div>
        </div>
      </CustomCard>
    </div>
  );
};
export default CaseReferralModalContent;
