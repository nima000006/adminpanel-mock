import { Steps } from "antd";
import moment from "jalali-moment";
import "./_processFlow.scss";

const stepItem = {
  title: (
    <div className="step-item-container">
      <h3 className="step-title">دبیر</h3>
      <span className="step-subtitle">
        {moment(new Date()).locale("fa").format("HH:mm - YYYY/M/D")}
      </span>
      <div className="step-body">
        <span className="desc">باز کردن درخواست</span>
      </div>
    </div>
  ),
};

const ProcessFlow = () => {
  return (
    <div className="accusation-case-process-flow-tab-container">
      <Steps
        orientation="vertical"
        size="small"
        current={3}
        items={[stepItem, stepItem, stepItem]}
      />
    </div>
  );
};
export default ProcessFlow;
