import { Result } from "antd";

import {
  CHECK_INTERNET_CONNECTION_ERROR,
  NO_INTERNET_CONNECTION_ERROR,
} from "../../../infrastructure/VARS/globalToasts/globalToasts";
import "./_noInternet.scss";

const NoInternet = () => {
  return (
    <Result
      className="no-internet-container"
      status="500"
      title={NO_INTERNET_CONNECTION_ERROR}
      subTitle={CHECK_INTERNET_CONNECTION_ERROR}
    />
  );
};

export default NoInternet;
