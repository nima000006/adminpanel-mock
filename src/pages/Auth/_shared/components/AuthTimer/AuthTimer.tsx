import { Statistic } from "antd";
import { PiHourglassSimpleMediumLight } from "react-icons/pi";

import { authTimerProps } from "./@types/@authTimer";
import "./_authTimer.scss";

const AuthTimer = ({ className, onFinish, deadline }: authTimerProps) => {
  return (
    <div className={`auth-countdown-timer ${className}`}>
      <Statistic.Timer
        value={deadline}
        onFinish={onFinish}
        format="mm:ss"
        type="countdown"
      />
      <PiHourglassSimpleMediumLight className="icon" />
    </div>
  );
};

export default AuthTimer;
