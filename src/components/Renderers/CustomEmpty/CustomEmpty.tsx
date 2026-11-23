import { Empty } from "antd";

import Div from "../Div/Div";
import "./_customEmpty.scss";

type CustomEmptyProps = {
  loading?: boolean;
  description?: React.ReactNode;
};

const CustomEmpty = ({ loading, description }: CustomEmptyProps) => {
  return (
    <Div loading={loading}>
      <Empty className="empty-container" description={description} />
    </Div>
  );
};

export default CustomEmpty;
