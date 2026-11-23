import { useState } from "react";

import CustomCard from "@components/CustomCard/CustomCard";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import ServiceManagerProvider from "@pages/Settings/FaqManagement/State/FaqManagementContext";

import ModifyFaqContent from "./helpers/Drawers/ModifyFaqContent/ModifyFaqContent";
import VisitFaqContent from "./helpers/Drawers/VisitFaqContent/VisitFaqContent";
import FaqTableInfo from "./helpers/FaqInfo/FaqsInfo";
import { appsInfo } from "./helpers/faqManagerUtil";
import FaqAppItems from "./helpers/ServiceAppItems/FaqAppItems";

import "./_faqManagement.scss";

const FaqManagement = () => {
  useTitle({ text: "مدیریت سوالات متداول" });

  const [isVisitFaqDrawerOpen, setIsVisitFaqDrawerOpen] = useState({
    isOpen: false,
    id: -1,
  });

  const [isModifyFaqDrawerOpen, setIsModifyFaqDrawerOpen] = useState(false);

  //* ================================ Util Functions ================================

  const onCloseVisitFaq = () => {
    setIsVisitFaqDrawerOpen({ isOpen: false, id: -1 });
  };
  const onCloseModifyFaq = () => {
    setIsModifyFaqDrawerOpen(false);
  };

  return (
    <ServiceManagerProvider>
      <CustomCard className="service-card-container">
        {/* ---------------------------------- Services List ---------------------------------- */}
        <CustomDivider text="سرویس ها" />
        <FaqAppItems items={appsInfo} />

        {/* ---------------------------------- Faq Table Info ---------------------------------- */}
        <FaqTableInfo
          setIsModifyFaqDrawerOpen={setIsModifyFaqDrawerOpen}
          setIsVisitFaqDrawerOpen={setIsVisitFaqDrawerOpen}
        />

        {/* ---------------------------------- DRAWERS ---------------------------------- */}
        {isModifyFaqDrawerOpen && (
          <CustomDrawer
            content={<ModifyFaqContent closeDrawerHandler={onCloseModifyFaq} />}
            onClose={onCloseModifyFaq}
            open={isModifyFaqDrawerOpen}
          />
        )}
        {isVisitFaqDrawerOpen?.isOpen && (
          <CustomDrawer
            content={
              <VisitFaqContent
                closeDrawerHandler={onCloseVisitFaq}
                id={isVisitFaqDrawerOpen?.id}
              />
            }
            onClose={onCloseVisitFaq}
            open={isVisitFaqDrawerOpen?.isOpen}
          />
        )}
      </CustomCard>
    </ServiceManagerProvider>
  );
};

export default FaqManagement;
