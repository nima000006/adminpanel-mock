import { Form } from "antd";

import CustomSteps from "@components/Renderers/CustomSteps/CustomSteps";
import { stepStatusCreator } from "@infra/helpers/utils";

import { CreateAdminModalContentProps } from "./@types/@createAdminModalContent";
import AdminAssignRoleStep from "./helper/components/AdminAssignRoleStep/AdminAssignRoleStep";
import AdminDefinitionStep from "./helper/components/AdminDefinitionStep/AdminDefinitionStep";

import "./_createAdminModalContent.scss";

const CreateAdminModalContent = ({
  form,
  step,
  onPasswordRulesPassed,
  targetKeys,
  setTargetKeys,
}: CreateAdminModalContentProps) => {
  const stepsItem = [
    {
      id: "1",
      children: (
        <AdminDefinitionStep form={form} onPasswordRulesPassed={onPasswordRulesPassed} />
      ),
    },
    {
      id: "2",
      children: (
        <AdminAssignRoleStep
          form={form}
          targetKeys={targetKeys}
          setTargetKeys={setTargetKeys}
        />
      ),
    },
  ];

  return (
    <Form form={form} className="create-admin-modal-content-container">
      <CustomSteps
        type="navigation"
        current={step}
        className="stepper-container"
        items={[
          {
            status: stepStatusCreator(step, 0),
            title: "تعریف ادمین",
          },
          {
            status: stepStatusCreator(step, 1),
            title: "تخصیص نقش",
          },
        ]}
      />
      {stepsItem[step].children}
    </Form>
  );
};

export default CreateAdminModalContent;
