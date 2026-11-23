import { Button } from "antd";
import { AiOutlinePlus } from "react-icons/ai";

import "./_businessListTable.scss";

const BusinessListTable = () => {
  return (
    <div className="business-list-container">
      <div className="business-base-action-bar-container">
        <Button type="primary" icon={<AiOutlinePlus />}>
          ایجاد کسب و کار جدید
        </Button>
      </div>
    </div>
  );
};
export default BusinessListTable;
