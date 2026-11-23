import { Button, Result } from "antd";

import {
  NO_SUCH_PAGE,
  SCREEN_NOT_FOUND_OR_DELETED,
} from "../../infrastructure/VARS/globalToasts/globalToasts";
import "./_notFound.scss";

const NotFound = () => {
  return (
    <Result
      className="not-found-container"
      status="404"
      title={NO_SUCH_PAGE}
      subTitle={SCREEN_NOT_FOUND_OR_DELETED}
      extra={
        <Button
          type="primary"
          onClick={() => {
            window.location.replace("/");
          }}
          aria-label="بازگشت به صفحه نخست"
        >
          بازگشت به صفحه نخست
        </Button>
      }
    />
  );
};

export default NotFound;
