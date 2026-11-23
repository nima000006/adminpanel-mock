import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import "./_activePeriodReadOnly.scss";

const ActivePeriodReadOnly = () => {
  return (
    <div className="active-period-container">
      <CustomDivider text={"دوره فعالیت"} />
      <Row className="custom-statistic-container">
        <SingleVerticalWithCol
          lg={6}
          md={12}
          label="شروع از"
          value={"1380-02-02"}
          suffix={<span className="custom-suffix">_</span>}
          className="custom-statistic"
        />
        <SingleVerticalWithCol
          lg={6}
          md={12}
          label="پایان در"
          value={"1405-05-05"}
          className="custom-statistic"
        />
      </Row>
    </div>
  );
};
export default ActivePeriodReadOnly;
