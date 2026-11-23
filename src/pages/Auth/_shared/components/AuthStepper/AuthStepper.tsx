import { Steps } from "antd";
import "./_authStepper.scss";

const AuthStepper = ({
  currentStep,
  itemCount,
}: {
  currentStep: number;
  itemCount: number;
}) => {
  const stepItems = Array.from({ length: itemCount }, () => ({ title: "" }));

  return (
    <Steps
      current={currentStep}
      progressDot
      className="custom-step-container"
      responsive={false}
      items={stepItems}
    />
  );
};

export default AuthStepper;
