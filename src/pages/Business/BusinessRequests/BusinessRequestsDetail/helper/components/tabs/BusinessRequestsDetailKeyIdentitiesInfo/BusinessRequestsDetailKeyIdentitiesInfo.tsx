import { Tabs, TabsProps } from "antd";

import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";

import BusinessRequestsDetailAdmin from "./helper/components/tabs/BusinessRequestsDetailAdmin/BusinessRequestsDetailAdmin";
import BusinessRequestsDetailSeniorManager from "./helper/components/tabs/BusinessRequestsDetailSeniorManager/BusinessRequestsDetailSeniorManager";
import "./_businessRequestsDetailKeyIdentitiesInfo.scss";

const BusinessRequestsDetailKeyIdentitiesInfo = () => {
  //? ================================ Components ================================
  const items: TabsProps["items"] = [
    {
      key: "0",
      label: "مدیر ارشد",
      children: <BusinessRequestsDetailSeniorManager />,
    },
    {
      key: "1",
      label: "ادمین کسب و کار",
      children: <BusinessRequestsDetailAdmin />,
    },
  ];
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="business-requests-detail-key-identity-container">
      <CustomAlert
        showIcon
        message={
          "لطفاً تمامی اطلاعات را به صورت کامل مطالعه نموده و از صحت اطلاعات تکمیل شده اطمینان حاصل فرمایید."
        }
        type={"info"}
        className="custom-alert"
      />
      <Tabs className="custom-tabs" items={items} destroyInactiveTabPane={true} />
    </div>
  );
};

export default BusinessRequestsDetailKeyIdentitiesInfo;
