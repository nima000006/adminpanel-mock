import { useState } from "react";

import { Col, Row } from "antd";
import { AiOutlineClose, AiOutlineInfoCircle } from "react-icons/ai";
import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import useQueryParams from "@infra/hooks/useQueryParams";
import { statusMessages } from "@pages/Ticketing/SmartAnswers/SmartAnswersList/helper/utils/utils";

import TicketingMoreInfoDrawerContent from "../../drawer/TicketingMoreInfoDrawerContent/TicketingMoreInfoDrawerContent";
import "./_smartAnswerDetailInfoCard.scss";

const SmartAnswerDetailInfoCard = () => {
  const { params } = useQueryParams();
  const [moreInfoDrawerIsOpen, setMoreInfoDrawerIsOpen] = useState(false);
  const [evaluationAnswerModalIsOpen, setEvaluationAnswerModalIsOpen] = useState(false);
  //* ================================ Util Functions ================================

  const infoBtnHandler = () => {
    setMoreInfoDrawerIsOpen(true);
  };
  const moreInfoDrawerCloseHandler = () => {
    setMoreInfoDrawerIsOpen(false);
  };

  const modalBtnHandler = () => {
    setEvaluationAnswerModalIsOpen(true);
  };
  const closeEvaluationAnswerModalHandler = () => {
    setEvaluationAnswerModalIsOpen(false);
  };

  const usefulAnswerHandler = () => {};
  const uselessAnswerHandler = () => {};
  const cancelBtnHandler = () => {
    closeEvaluationAnswerModalHandler();
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* MORE INFO DRAWER */}
      {moreInfoDrawerIsOpen && (
        <CustomDrawer
          onClose={moreInfoDrawerCloseHandler}
          open={moreInfoDrawerIsOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <TicketingMoreInfoDrawerContent
              closeDrawerHandler={moreInfoDrawerCloseHandler}
            />
          }
        />
      )}

      {/* MODAL */}
      {evaluationAnswerModalIsOpen && (
        <ConfirmationModalWithContent
          title="ارزیابی درستی پاسخ‌ها"
          // backBtnText="انصراف"
          // confirmBtnText=""
          hasCustomActionBar
          customActionBar={
            <div className="flex gap-1 pr-5 pb-5 pl-5">
              <CustomButton
                type="primary"
                htmlType="submit"
                onClick={usefulAnswerHandler}
                // loading={}
              >
                پاسخ مفید بود
              </CustomButton>
              <CustomButton
                type="primary"
                htmlType="submit"
                onClick={uselessAnswerHandler}
                // color="red"
                // loading={}
                className="bg-dustred-6!"
              >
                پاسخ مفید نبود
              </CustomButton>
              <CustomButton
                type="default"
                htmlType="submit"
                onClick={cancelBtnHandler}
                // loading={}
              >
                انصراف
              </CustomButton>
            </div>
          }
          isModalOpen={evaluationAnswerModalIsOpen}
          hasNavigatorButton={false}
          // onConfirmClickHandler={confirmModalHandler}
          closeModalHandler={closeEvaluationAnswerModalHandler}
          // isConfirmButtonLoading={}
          content={
            <div className="body-regular">آیا پاسخ ارائه‌شده برای کاربر مفید بود؟</div>
          }
        />
      )}
      <div className="bg-neutral-2 smart-answer-detail-info-crd-container flex flex-col gap-4 rounded-2xl p-6">
        <div className="flex justify-between max-[700px]:flex-col max-[700px]:gap-4">
          <div className="flex gap-2 max-[470px]:flex-col">
            <SamimServiceTag service={params?.service} />
            <CustomTag
              color={
                statusMessages[+params?.status as keyof typeof statusMessages]?.color
              }
            >
              {statusMessages[+params?.status as keyof typeof statusMessages]?.text}
            </CustomTag>
          </div>

          <div className="flex gap-2 max-[490px]:flex-col">
            <CustomButton type="default" onClick={infoBtnHandler}>
              <AiOutlineInfoCircle /> اطلاعات
            </CustomButton>

            {/* اگر وضعیت در حالت حل نشده بود این دکمه نباید نمایش داده شود */}
            {+params?.status !== 2 ? (
              <CustomButton
                type="primary"
                onClick={modalBtnHandler}
                disabled={+params?.status === 4}
              >
                ارزیابی درستی پاسخ‌ها
              </CustomButton>
            ) : null}
          </div>
        </div>
        <Row gutter={[16, 16]}>
          <Col lg={8} md={12} sm={12} xs={24}>
            <div className="body-regular flex flex-col gap-2 text-center">
              <span className="text-neutral-8">تاریخ و زمان شروع مکالمه</span>
              <span className="text-neutral-12">۱۸ مهر ۱۴۰۴ , 10:10</span>
            </div>
          </Col>
          <Col lg={8} md={12} sm={12} xs={24}>
            <div className="body-regular flex flex-col gap-2 text-center">
              <span className="text-neutral-8">تاریخ و زمان پایان مکالمه</span>
              <span className="text-neutral-12">۱۸ مهر ۱۴۰۴ , 10:10</span>
            </div>
          </Col>
          <Col lg={8} md={12} sm={24} xs={24}>
            <div className="body-regular flex flex-col gap-2 text-center">
              <span className="text-neutral-8">کاربر</span>
              <div className="text-neutral-12">
                <Link to={" "} className="text-primary-6!">
                  {"شیرین نجفی"}
                </Link>{" "}
                {`(${12234567890})`}
              </div>
            </div>
          </Col>
        </Row>

        {+params?.status === 1 ? (
          <CustomAlert
            type="success"
            showIcon
            title=" کاربر با پاسخ هوش مصنوعی مشکلش را کامل حل کرده و اعلام رضایت کرده است."
          />
        ) : +params?.status === 2 ? (
          <CustomAlert
            type="error"
            showIcon
            title=" کاربر از پاسخ‌ها رضایت نداشته اما تیکت هم ایجاد نکرده."
          />
        ) : +params?.status === 3 ? (
          <CustomAlert
            type="warning"
            showIcon
            title=" کاربر از پاسخ‌ها راضی نشده و درخواست ثبت تیکت کرده."
          />
        ) : +params?.status === 4 ? (
          <CustomAlert
            className="custom-alert-color"
            showIcon
            title="  کاربر در حال گفتگو با هوش مصنوعی است یا مکالمه نیمه‌تمام مانده، بدون اینکه کاربر
          اعلام رضایت یا عدم رضایت کند."
          />
        ) : null}
      </div>
    </>
  );
};
export default SmartAnswerDetailInfoCard;
