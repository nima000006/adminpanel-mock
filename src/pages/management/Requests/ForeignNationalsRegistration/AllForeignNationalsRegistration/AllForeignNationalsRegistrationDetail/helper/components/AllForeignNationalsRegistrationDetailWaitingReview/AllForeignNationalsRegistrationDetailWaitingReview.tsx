import { useState } from "react";

import { Form } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import { CustomButton } from "@components/CustomInputs";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import CustomTabs from "@components/Renderers/CustomTabs/CustomTabs";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import useQueryParams from "@infra/hooks/useQueryParams";
import { MANAGEMENT_REQUESTS_ALL_FOREIGN_NATIONALS_REGISTRATION_LIST_PAGE_ROUTE } from "@infra/router/routes/management";
import { useLazyUserInquiryStudentNumberQuery } from "@infra/states/redux/Apis/authApi";
import { useAcceptAllForeignRequestMutation } from "@infra/states/redux/Apis/management/requests/requestApi";
import { UserInquiryStudentNumberResponse } from "@infra/states/redux/Apis/models/authApi.model";
import { ESTELAM_SAJED_ACCEPT_SUCCESS_MESSAGE } from "@pages/management/Requests/EstelamSajed/_shared/utils/estelamSajedUtils";
import { ESTELAM_TYPE } from "@pages/management/Requests/ForeignNationalsRegistration/_shared/utils/ForeignNationalsRegistration";
import { AllForeignDetailResponse } from "@pages/management/Requests/ForeignNationalsRegistration/AllForeignNationalsRegistration/AllForeignNationalsRegistrationDetail/@types/@allForeignNationalsRegistrationDetailTypes";
import { ForeignRejectDrawerContentFormType } from "@pages/management/Requests/ForeignNationalsRegistration/AllForeignNationalsRegistration/AllForeignNationalsRegistrationDetail/helper/components/AllForeignNationalsRegistrationDetailWaitingReview/@types/@allForeignNationalsRegistrationDetailWaitingReviewTypes";
import EstelamInfo from "@pages/management/Requests/ForeignNationalsRegistration/AllForeignNationalsRegistration/AllForeignNationalsRegistrationDetail/helper/components/AllForeignNationalsRegistrationDetailWaitingReview/helper/components/EstelamInfo/EstelamInfo";
import ForeignRejectDrawerContent from "@pages/management/Requests/ForeignNationalsRegistration/AllForeignNationalsRegistration/AllForeignNationalsRegistrationDetail/helper/components/AllForeignNationalsRegistrationDetailWaitingReview/helper/drawer/ForeignRejectDrawerContent/ForeignRejectDrawerContent";

const AllForeignNationalsRegistrationDetailWaitingReview = ({
  data,
}: {
  data: AllForeignDetailResponse | null;
}) => {
  const { params: url, setSearchParams } = useQueryParams();

  const [isClickEstelam, setIsClickEstelam] = useState(false);
  const [isConfirmedModalOpen, setIsConfirmedModalOpen] = useState(false);
  const [isRejectDrawerOpen, setIsRejectDrawerOpen] = useState(false);

  const [estelamData, setEstelamData] = useState<UserInquiryStudentNumberResponse | null>(
    null
  );

  const [rejectForm] = Form.useForm<ForeignRejectDrawerContentFormType>();

  const navigate = useNavigate();

  const activeKey = url?.tab || "1";

  //? ================================  Api Calls ================================

  // accept modal
  const [acceptAllForeignRequest, { isLoading: isAcceptAllForeignRequestLoading }] =
    useAcceptAllForeignRequestMutation();

  // student by student code
  const [getUsersByStudentNumber, { isFetching: isGetAllUsersByStudentNumberLoading }] =
    useLazyUserInquiryStudentNumberQuery();

  //* ================================ Util Functions ================================
  const estelamAmoozeshyarHandler = () => {
    if (data?.studentNumber) {
      getUsersByStudentNumber({ studentNumber: data?.studentNumber })
        .unwrap()
        .then((value) => {
          setIsClickEstelam(true);
          setEstelamData(value);
        });
    }
  };

  // Accept
  const openConfirmedModalHandler = () => setIsConfirmedModalOpen(true);
  const closeConfirmedModalHandler = () => setIsConfirmedModalOpen(false);

  const acceptRequestHandler = () => {
    if (url?.id) {
      acceptAllForeignRequest(url?.id)
        .unwrap()
        .then(() => {
          closeConfirmedModalHandler();
          toast.success(ESTELAM_SAJED_ACCEPT_SUCCESS_MESSAGE, {
            toastId: ESTELAM_SAJED_ACCEPT_SUCCESS_MESSAGE,
          });

          navigate({
            pathname:
              MANAGEMENT_REQUESTS_ALL_FOREIGN_NATIONALS_REGISTRATION_LIST_PAGE_ROUTE,
          });
        });
    }
  };

  //Reject
  const openRejectDrawerHandler = () => setIsRejectDrawerOpen(true);

  const closeRejectDrawerHandler = () => {
    setIsRejectDrawerOpen(false);
    rejectForm?.resetFields();
  };

  // ItemTabs
  const tabItems = [
    {
      label: "اطلاعات هویتی",
      children: <EstelamInfo tab={ESTELAM_TYPE.IDENTITY_INFO} data={estelamData} />,
      key: ESTELAM_TYPE.IDENTITY_INFO,
    },
    {
      label: "اطلاعات تحصیلی",
      children: <EstelamInfo tab={ESTELAM_TYPE.EDUCATIONAL_INFO} data={estelamData} />,
      key: ESTELAM_TYPE.EDUCATIONAL_INFO,
    },
    {
      label: "اطلاعات تماسی",
      children: <EstelamInfo tab={ESTELAM_TYPE.CONTACT_INFO} data={estelamData} />,
      key: ESTELAM_TYPE.CONTACT_INFO,
    },
    {
      label: "عملکرد تحصیلی",
      children: (
        <EstelamInfo tab={ESTELAM_TYPE.ACADEMIC_PERFORMANCE} data={estelamData} />
      ),
      key: ESTELAM_TYPE.ACADEMIC_PERFORMANCE,
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* ACCEPT MODAL */}
      {isConfirmedModalOpen && (
        <ConfirmationModalWithContent
          isModalOpen={isConfirmedModalOpen}
          closeModalHandler={closeConfirmedModalHandler}
          onConfirmClickHandler={acceptRequestHandler}
          isConfirmButtonLoading={isAcceptAllForeignRequestLoading}
          confirmBtnText="تایید درخواست"
          backBtnText="انصراف"
          title="آیا از تأیید درخواست اطمینان کافی دارید؟"
          content={
            <p className="">
              در صورت تأیید این درخواست، ثبت نام کاربر در سامانه انجام می‌شود
            </p>
          }
        />
      )}

      {/* REJECT DRAWER */}
      {isRejectDrawerOpen && (
        <CustomDrawer
          onClose={closeRejectDrawerHandler}
          open={isRejectDrawerOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <ForeignRejectDrawerContent
              closeDrawerHandler={closeRejectDrawerHandler}
              form={rejectForm}
            />
          }
        />
      )}
      <div className="mt-10">
        <CustomDivider
          text="استعلام آموزشیار"
          extraContent={
            <CustomTag
              color={"default"}
              onClick={estelamAmoozeshyarHandler}
              className="cursor-pointer"
            >
              استعلام آموزشیار
            </CustomTag>
          }
        />
        <Div loading={isGetAllUsersByStudentNumberLoading}>
          {!isClickEstelam ? (
            <CustomEmpty description="برای رد یا تأیید درخواست، روی «استعلام آموزشیار» کلیک کنید." />
          ) : (
            <CustomTabs
              items={tabItems}
              onChange={(e) => {
                setSearchParams({ ...url, tab: e });
              }}
              activeKey={activeKey}
              type="line"
            />
          )}
        </Div>
        <div className="mt-10 flex justify-end gap-2">
          <CustomButton
            type="primary"
            danger
            onClick={openRejectDrawerHandler}
            disabled={!isClickEstelam}
          >
            رد درخواست
          </CustomButton>
          <CustomButton
            type="primary"
            onClick={openConfirmedModalHandler}
            disabled={!isClickEstelam}
          >
            تایید درخواست
          </CustomButton>
        </div>
      </div>
    </>
  );
};
export default AllForeignNationalsRegistrationDetailWaitingReview;
