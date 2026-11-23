import { useEffect, useState } from "react";

import { Form, Row } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import { PiPencilSimpleLineDuotone, PiPlus } from "react-icons/pi";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

import { CustomButton } from "@components/CustomInputs";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useResponsive } from "@infra/hooks/useResponsive";
import { DORMITORY_ALL_RESIDENCE_LIST_PAGE_ROUTE } from "@infra/router/routes/dormitory";
import {
  useApprovalRequestCreateResidenceMutation,
  useLazyGetResidenceDataQuery,
  useRejectRequestCreateResidenceMutation,
  useReturnRequestCreateResidenceMutation,
} from "@infra/states/redux/Apis/dormitory/residence/residenceApi";
import {
  RESIDENCE_STATUS_CONFIG,
  RESIDENCE_TABS_TYPE,
} from "@pages/Dormitory/Residence/_shared/util";
import { GetResidenceDataResponse } from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceBuildingList/helper/drawer/ModifyBuildingDrawerContent/@types/@modifyBuildingDrawerContentTypes";
import { AllResidenceModalContentFormType } from "@pages/Dormitory/Residence/AllResidence/AllResidenceDetail/@types/@allResidenceDetail";
import AllResidenceDetailBaseInformation from "@pages/Dormitory/Residence/AllResidence/AllResidenceDetail/helper/components/AllResidenceDetailBaseInformation/AllResidenceDetailBaseInformation";
import AllResidenceDetailNearByResidencePlaces from "@pages/Dormitory/Residence/AllResidence/AllResidenceDetail/helper/components/AllResidenceDetailNearByResidencePlaces/AllResidenceDetailNearByResidencePlaces";
import AllResidenceModalContent from "@pages/Dormitory/Residence/AllResidence/AllResidenceDetail/helper/components/AllResidenceDetailNearByResidencePlaces/helper/components/AllResidenceModalContent/AllResidenceModalContent";
import AllResidenceDetailPlaceInformation from "@pages/Dormitory/Residence/AllResidence/AllResidenceDetail/helper/components/AllResidenceDetailPlaceInformation/AllResidenceDetailPlaceInformation";
import CreateResidenceDrawerContent from "@pages/Dormitory/Residence/AllResidence/AllResidenceDetail/helper/drawer/CreateResidenceDrawerContent/CreateResidenceDrawerContent";

const AllResidenceDetail = () => {
  useTitle({
    breadcrumbItems: [
      {
        title: "اقامتگاه‌ها",
      },
      {
        title: <Link to={DORMITORY_ALL_RESIDENCE_LIST_PAGE_ROUTE}>همه اقامتگاه‌ها</Link>,
      },
      {
        title: "مشاهده درخواست",
      },
    ],
  });

  const navigate = useNavigate();
  const { params: url } = useQueryParams();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [view, setView] = useState("0");
  const [isOpenConfirmRequestModal, setIsOpenConfirmRequestModal] = useState(false);
  const [isOpenRefuseRequestModal, setIsOpenRefuseRequestModal] = useState(false);
  const [isOpenReturnRequestModal, setIsOpenReturnRequestModal] = useState(false);

  const [dataSource, setDataSource] = useState<GetResidenceDataResponse>();

  const { isMobile } = useResponsive();
  const { params } = useQueryParams();

  const [refuseReturnForm] = Form.useForm<AllResidenceModalContentFormType>();

  const status = params?.status;

  const currentStatus = status
    ? RESIDENCE_STATUS_CONFIG[status as keyof typeof RESIDENCE_STATUS_CONFIG]
    : undefined;

  const isWaiting = status === RESIDENCE_TABS_TYPE.waiting;
  const isReturned = status === RESIDENCE_TABS_TYPE.returned;
  const isRejected = status === RESIDENCE_TABS_TYPE.rejected;
  const isCancelled = status === RESIDENCE_TABS_TYPE.cancelled;

  //? ================================  Api Calls ================================
  // detail
  const [getResidenceData, { isFetching: isGetResidenceDataLoading }] =
    useLazyGetResidenceDataQuery();

  // confirm
  const [
    approvalRequestCreateResidence,
    { isLoading: isApprovalRequestCreateResidenceLoading },
  ] = useApprovalRequestCreateResidenceMutation();

  // reject
  const [
    rejectRequestCreateResidence,
    { isLoading: isRejectRequestCreateResidenceLoading },
  ] = useRejectRequestCreateResidenceMutation();

  // return
  const [
    returnRequestCreateResidence,
    { isLoading: isReturnRequestCreateResidenceLoading },
  ] = useReturnRequestCreateResidenceMutation();

  //* ================================ Util Functions ================================
  // get residence detail
  const getResidenceDataHandler = () => {
    if (!url?.id) return;

    getResidenceData(url.id)
      .unwrap()
      .then((res: GetResidenceDataResponse) => {
        setDataSource(res);
      });
  };

  //? ================================ Effects ================================
  useEffect(() => {
    getResidenceDataHandler();
  }, [url?.id]);

  //? ================================ components ================================
  const optionType = [
    {
      value: "0",
      label: "اطلاعات پایه",
      children: <AllResidenceDetailBaseInformation dataSource={dataSource} />,
    },
    {
      value: "1",
      label: "اطلاعات مکانی",
      children: <AllResidenceDetailPlaceInformation dataSource={dataSource} />,
    },
    {
      value: "2",
      label: "اماکن اطراف اقامتگاه",
      children: <AllResidenceDetailNearByResidencePlaces dataSource={dataSource} />,
    },
  ];

  // Drawer Handlers
  const closeDrawerHandler = () => {
    setIsDrawerOpen(false);
  };

  const openDrawerHandler = () => {
    setIsDrawerOpen(true);
  };

  // Confirm Request
  const closeConfirmRequestModalHandler = () => {
    setIsOpenConfirmRequestModal(false);
  };

  const confirmRequestHandler = () => {
    setIsOpenConfirmRequestModal(true);
  };

  const onConfirmRequestClickHandler = () => {
    if (!url?.id) return;

    approvalRequestCreateResidence(url.id)
      .unwrap()
      .then(() => {
        closeConfirmRequestModalHandler();
        toast.success("درخواست با موفقیت تایید شد.", {
          toastId: "درخواست با موفقیت تایید شد.",
        });
        navigate({ pathname: DORMITORY_ALL_RESIDENCE_LIST_PAGE_ROUTE });
      });
  };

  // Reject Request
  const closeRefuseRequestModalHandler = () => {
    setIsOpenRefuseRequestModal(false);
    refuseReturnForm?.resetFields();
  };

  const refuseRequestHandler = () => {
    setIsOpenRefuseRequestModal(true);
  };

  const onRefuseRequestClickHandler = async () => {
    if (!url?.id) return;

    const values = await refuseReturnForm?.validateFields();

    await rejectRequestCreateResidence({
      uuid: url.id,
      body: {
        reasonUuid: values?.refuseReason?.value ?? "",
        faDescription: values?.description ?? "",
      },
    })
      .unwrap()
      .then(() => {
        closeRefuseRequestModalHandler();
        toast.success("درخواست با موفقیت رد شد.", {
          toastId: "درخواست با موفقیت رد شد.",
        });
        navigate({ pathname: DORMITORY_ALL_RESIDENCE_LIST_PAGE_ROUTE });
      });
  };

  // Return Request
  const returnRequestHandler = () => {
    setIsOpenReturnRequestModal(true);
  };

  const closeReturnRequestModalHandler = () => {
    setIsOpenReturnRequestModal(false);
    refuseReturnForm?.resetFields();
  };

  const onReturnRequestClickHandler = async () => {
    if (!url?.id) return;

    const values = await refuseReturnForm?.validateFields();

    await returnRequestCreateResidence({
      uuid: url.id,
      body: {
        reasonUuid: values?.refuseReason?.value ?? "",
        faDescription: values?.description ?? "",
      },
    })
      .unwrap()
      .then(() => {
        closeReturnRequestModalHandler();
        toast.success("درخواست با موفقیت عودت داده شد.", {
          toastId: "درخواست با موفقیت عودت داده شد.",
        });
        navigate({ pathname: DORMITORY_ALL_RESIDENCE_LIST_PAGE_ROUTE });
      });
  };

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* ================================ Edit Drawer ================================ */}
      {/* Keep drawer outside Div so refetch loading does not remount step state */}
      {isDrawerOpen && (
        <CustomDrawer
          onClose={closeDrawerHandler}
          open={isDrawerOpen}
          closeIcon={<AiOutlineClose />}
          title="اصلاح اطلاعات"
          content={
            <CreateResidenceDrawerContent
              variant="AllResidenceDetail"
              closeDrawerHandler={closeDrawerHandler}
              dataSource={dataSource}
              getResidenceDataHandler={getResidenceDataHandler}
            />
          }
        />
      )}

      <Div loading={isGetResidenceDataLoading && !isDrawerOpen}>
        {/* ================================ Confirm Request Modal ================================ */}
        {isOpenConfirmRequestModal && (
          <ConfirmationModalWithContent
            title="تایید درخواست ایجاد اقامتگاه"
            isModalOpen={isOpenConfirmRequestModal}
            confirmBtnText="تایید نهایی"
            backBtnText="انصراف"
            closeModalHandler={closeConfirmRequestModalHandler}
            content={`با تایید این درخواست، اقامتگاه ${dataSource?.title} در سامانه ایجاد خواهد شد.`}
            onConfirmClickHandler={onConfirmRequestClickHandler}
            isConfirmButtonLoading={isApprovalRequestCreateResidenceLoading}
            showIcon
          />
        )}

        {/* ================================ Refuse Request Modal ================================ */}
        {isOpenRefuseRequestModal && (
          <ConfirmationModalWithContent
            title="رد درخواست ایجاد اقامتگاه"
            isModalOpen={isOpenRefuseRequestModal}
            isDangerous
            confirmBtnText="رد درخواست"
            backBtnText="انصراف"
            closeModalHandler={closeRefuseRequestModalHandler}
            content={<AllResidenceModalContent form={refuseReturnForm} />}
            onConfirmClickHandler={onRefuseRequestClickHandler}
            isConfirmButtonLoading={isRejectRequestCreateResidenceLoading}
            showIcon={false}
          />
        )}

        {/* ================================ Return Request Modal ================================ */}
        {isOpenReturnRequestModal && (
          <ConfirmationModalWithContent
            title="عودت درخواست ایجاد اقامتگاه"
            isModalOpen={isOpenReturnRequestModal}
            confirmBtnText="عودت درخواست"
            backBtnText="انصراف"
            closeModalHandler={closeReturnRequestModalHandler}
            content={<AllResidenceModalContent type="return" form={refuseReturnForm} />}
            onConfirmClickHandler={onReturnRequestClickHandler}
            isConfirmButtonLoading={isReturnRequestCreateResidenceLoading}
            showIcon={false}
            hasCustomActionBar
            customClass="[&_button[type='submit']]:bg-orange-400!"
          />
        )}

        {/* ================================ Waiting Alerts ================================ */}
        {/* در انتظار بررسی مجدد */}
        {isWaiting && dataSource?.returnDate !== null && (
          <>
            <CustomAlert
              type="warning"
              showIcon
              className="border border-dashed! font-medium"
              title={`این درخواست در تاریخ ${dataPlaceHolder({ data: dataSource?.returnDate, isDate: true })} عودت شده بود و در انتظار بررسی مجدد می باشد.`}
            />

            <CustomAlert
              className="mt-5! border border-dashed! font-medium"
              type="warning"
              showIcon
              title={dataSource?.returnReason?.title}
              description={dataSource?.returnDescription}
            />
          </>
        )}

        {/* ================================ Returned Alerts ================================ */}
        {/* عودت */}
        {isReturned && (
          <>
            <CustomAlert
              type="warning"
              showIcon
              className="border border-dashed! font-medium"
              title={`این درخواست در تاریخ ${dataPlaceHolder({ data: dataSource?.returnDate, isDate: true })} عودت شده است.`}
            />

            <CustomAlert
              className="mt-5! border border-dashed! font-medium"
              type="warning"
              showIcon
              title={dataSource?.returnReason?.title}
              description={dataSource?.returnDescription}
            />
          </>
        )}

        {/* ================================ Rejected Alerts ================================ */}
        {/* رد */}
        {isRejected && (
          <>
            <CustomAlert
              type="error"
              showIcon
              className="border border-dashed! font-medium"
              title={`این درخواست در تاریخ ${dataPlaceHolder({ data: dataSource?.rejectDate, isDate: true })} رد شده است.`}
            />

            <CustomAlert
              className="mt-5! border border-dashed! font-medium"
              type="error"
              showIcon
              title={dataSource?.rejectReason?.title}
              description={dataSource?.rejectDescription}
            />
          </>
        )}

        {/* ================================ Cancelled Alert ================================ */}

        {isCancelled && (
          <CustomAlert
            type="warning"
            showIcon
            className="border border-dashed! font-medium"
            title={`این درخواست در تاریخ ${dataPlaceHolder({ data: dataSource?.cancelDate, isDate: true })} توسط ${dataSource?.cancelledBy} لغو شده است.`}
          />
        )}

        {/* ================================ Request Information ================================ */}
        <CustomDivider
          text="اطلاعات درخواست"
          extraContent={
            <div className="flex gap-2">
              <CustomTag icon={<PiPlus />} color="green">
                {dataSource?.requestKind?.title}
              </CustomTag>

              <CustomTag color={currentStatus?.color}>{currentStatus?.title}</CustomTag>
            </div>
          }
        />

        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            label="شماره درخواست"
            value={dataSource?.requestNumber}
            lg={8}
            md={12}
          />

          <SingleVerticalWithCol
            label="تاریخ ایجاد درخواست"
            value={dataSource?.createdDate}
            isDate
            customDateFormat="HH:mm، YYYY-MM-DD"
            lg={8}
            md={12}
          />

          <SingleVerticalWithCol
            label="مسئول پیگیری (آخرین اقدام کننده)"
            value={dataSource?.lastActor}
            lg={8}
            md={12}
          />

          <SingleVerticalWithCol
            label="آخرین اقدام"
            value={dataSource?.lastActionDate}
            isDate
            customDateFormat="HH:mm، YYYY-MM-DD"
            lg={8}
            md={12}
          />
        </Row>

        {/* ================================ Applicant Information ================================ */}

        <CustomDivider text="اطلاعات درخواست دهنده" />

        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            label="نام"
            value={dataSource?.applicantFirstName}
            lg={8}
            md={12}
          />

          <SingleVerticalWithCol
            label="نام خانوادگی"
            value={dataSource?.applicantLastName}
            lg={8}
            md={12}
          />

          <SingleVerticalWithCol
            label="کد ملی / فراگیر"
            value={dataSource?.applicantNationalCode}
            lg={8}
            md={12}
          />

          <SingleVerticalWithCol
            label="شماره همراه"
            value={dataSource?.applicantMobile}
            lg={8}
            md={12}
          />
        </Row>

        {/* ================================ Residence Information ================================ */}

        <CustomDivider
          text="اطلاعات اقامتگاه"
          extraContent={
            isWaiting ? (
              <CustomButton
                icon={<PiPencilSimpleLineDuotone />}
                onClick={openDrawerHandler}
              >
                ویرایش
              </CustomButton>
            ) : null
          }
        />

        <CustomSegmented
          options={optionType}
          onChange={(value) => setView(value as "0" | "1" | "2")}
          vertical={isMobile}
          value={view}
          size="large"
          block
          className="mb-10!"
        />

        <div>{optionType[+view]?.children}</div>

        {/* ================================ Actions ================================ */}

        {isWaiting && (
          <div className="mt-10 flex justify-end">
            <div className="flex gap-3">
              <CustomButton
                onClick={returnRequestHandler}
                className="border-orange-6! [&>span]:text-orange-6!"
              >
                عودت درخواست
              </CustomButton>

              <CustomButton danger onClick={refuseRequestHandler}>
                رد درخواست
              </CustomButton>

              <CustomButton type="primary" onClick={confirmRequestHandler}>
                تایید درخواست
              </CustomButton>
            </div>
          </div>
        )}
      </Div>
    </>
  );
};

export default AllResidenceDetail;
