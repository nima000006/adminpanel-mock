import { useEffect, useState } from "react";

import { Form } from "antd";
import { useNavigate } from "react-router";

import MainSpinner from "@components/MainSpinner/MainSpinner";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";
import Div from "@components/Renderers/Div/Div";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { useResponsive } from "@infra/hooks/useResponsive";
import { LANDING_PAGE_ROUTE } from "@infra/router/routes/general";
import {
  getFromLocalStorage,
  setLocalStorage,
} from "@infra/services/UserTokenStorageManager/UserTokenStorageManager";

import MyTestActionStatusListTab from "./helper/components/MyTestActionStatusListTab/MyTestActionStatusListTab";
import MyTestFollowUpListTab from "./helper/components/MyTestFollowUpListTab/MyTestFollowUpListTab";
import { ConfidentialityAgreementFormType } from "../../_shared/modals/ConfidentialityAgreementModalContent/@types/@confidentialityAgreementModalContent";
import ConfidentialityAgreementModalContent from "../../_shared/modals/ConfidentialityAgreementModalContent/ConfidentialityAgreementModalContent";

import "./_testList.scss";

const TestsList = () => {
  const [view, setView] = useState("0");
  const { isMobile } = useResponsive();

  const [confidentialityModalOpen, setConfidentialityModalOpen] = useState<
    undefined | boolean
  >(undefined);

  const [form] = Form.useForm<ConfidentialityAgreementFormType>();

  const navigate = useNavigate();

  useTitle({
    breadcrumbItems: [
      {
        title: "دکتر من",
      },
      { title: "آزمون‌ها" },
    ],
  });

  const segmentItems = [
    {
      id: "0",
      children: <MyTestFollowUpListTab />,
    },
    {
      id: "1",
      children: <MyTestActionStatusListTab />,
    },
  ];

  //? ================================ Effects ================================
  useEffect(() => {
    const agreement = getFromLocalStorage("agreement");

    if (agreement) {
      setConfidentialityModalOpen(false);
    } else {
      setConfidentialityModalOpen(true);
    }
  }, []);

  //* ================================ Util Functions ================================
  const confirmClickHandler = () => {
    form.validateFields().then(() => {
      setLocalStorage("agreement", "true");
    });
    setConfidentialityModalOpen(false);
  };

  const closeModalHandler = () => {
    navigate({
      pathname: LANDING_PAGE_ROUTE,
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return confidentialityModalOpen === undefined ? (
    <MainSpinner />
  ) : (
    <Div>
      {confidentialityModalOpen && (
        <ConfirmationModalWithContent
          title="تعهدنامه محرمانگی و رعایت اصول اخلاقی و قانونی در دسترسی به اطلاعات سلامت روان دانشجویان"
          isModalOpen={confidentialityModalOpen}
          confirmBtnText="ورود به دکتر من"
          backBtnText="انصراف"
          onConfirmClickHandler={confirmClickHandler}
          closeModalHandler={closeModalHandler}
          width={650}
          showIcon={false}
          isFormSensitive
          form={form}
          content={<ConfidentialityAgreementModalContent form={form} />}
        />
      )}
      {!confidentialityModalOpen && (
        <div className="my-doctor-test-list-page-container">
          <CustomSegmented
            vertical={isMobile}
            options={[
              { value: "0", label: "بر اساس اولویت پیگیری" },
              { value: "1", label: "بر اساس وضعیت اقدام" },
            ]}
            className="test-list-segment"
            onChange={(value) => setView(value as "0" | "1")}
            value={view}
          />

          <div>{segmentItems[+view]?.children}</div>
        </div>
      )}
    </Div>
  );
};

export default TestsList;
