import { useEffect, useState } from "react";

import { Form, Row } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import { PiPlus } from "react-icons/pi";
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
import { DORMITORY_MY_RESIDENCE_LIST_PAGE_ROUTE } from "@infra/router/routes/dormitory";
import {
  useCancelMyResidenceRequestMutation,
  useLazyGetMyResidenceDataQuery,
} from "@infra/states/redux/Apis/dormitory/residence/residenceApi";
import {
  RESIDENCE_STATUS_CONFIG,
  RESIDENCE_TABS_TYPE,
} from "@pages/Dormitory/Residence/_shared/util";
import { GetMyResidenceDataResponse } from "@pages/Dormitory/Residence/MyResidence/MyResidenceDetail/@types/@myResidenceDetail";
import MyResidenceDetailBaseInformation from "@pages/Dormitory/Residence/MyResidence/MyResidenceDetail/helper/components/MyResidenceDetailBaseInformation/MyResidenceDetailBaseInformation";
import MyResidenceDetailNearByResidencePlaces from "@pages/Dormitory/Residence/MyResidence/MyResidenceDetail/helper/components/MyResidenceDetailNearByResidencePlaces/MyResidenceDetailNearByResidencePlaces";
import MyResidenceDetailPlaceInformation from "@pages/Dormitory/Residence/MyResidence/MyResidenceDetail/helper/components/MyResidenceDetailPlaceInformation/MyResidenceDetailPlaceInformation";
import CreateMyResidenceDrawerContent from "@pages/Dormitory/Residence/MyResidence/MyResidenceDetail/helper/drawer/CreateMyResidenceDrawerContent/CreateMyResidenceDrawerContent";
import { CancelMyResidenceRequestContentFormType } from "@pages/Dormitory/Residence/MyResidence/MyResidenceDetail/helper/modal/@types/@cancelMyResidenceRequestContentTypes";
import CancelMyResidenceRequestContent from "@pages/Dormitory/Residence/MyResidence/MyResidenceDetail/helper/modal/CancelMyResidenceRequestContent/CancelMyResidenceRequestContent";

const MyResidenceDetail = () => {
  useTitle({
    breadcrumbItems: [
      {
        title: "اقامتگاه‌ها",
      },
      {
        title: <Link to={DORMITORY_MY_RESIDENCE_LIST_PAGE_ROUTE}>اقامتگاه‌های من</Link>,
      },
      {
        title: "مشاهده درخواست",
      },
    ],
  });

  const { params: url } = useQueryParams();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [view, setView] = useState("0");
  const [isOpenConfirmationModal, setIsOpenConfirmationModal] = useState(false);
  const [dataSource, setDataSource] = useState<GetMyResidenceDataResponse>();
  const [form] = Form.useForm<CancelMyResidenceRequestContentFormType>();

  const { isMobile } = useResponsive();
  const { params } = useQueryParams();

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
  const [getMyResidenceData, { isFetching: isGetMyResidenceDataLoading }] =
    useLazyGetMyResidenceDataQuery();

  // cancel request
  const [cancelMyResidenceRequest, { isLoading: isCancelMyResidenceRequestLoading }] =
    useCancelMyResidenceRequestMutation();

  //* ================================ Util Functions ================================
  const getMyResidenceDataHandler = () => {
    if (!url?.id) return;

    getMyResidenceData(url.id)
      .unwrap()
      .then((res: GetMyResidenceDataResponse) => {
        setDataSource(res);
      });
  };

  //? ================================ Effects ================================
  useEffect(() => {
    getMyResidenceDataHandler();
  }, [url?.id]);

  //* ================================ components ================================
  const optionType = [
    {
      value: "0",
      label: "اطلاعات پایه",
      children: <MyResidenceDetailBaseInformation dataSource={dataSource} />,
    },
    {
      value: "1",
      label: "اطلاعات مکانی",
      children: <MyResidenceDetailPlaceInformation dataSource={dataSource} />,
    },
    {
      value: "2",
      label: "اماکن اطراف اقامتگاه",
      children: <MyResidenceDetailNearByResidencePlaces dataSource={dataSource} />,
    },
  ];

  // Cancel Request
  const openCancelModalHandler = () => {
    setIsOpenConfirmationModal(true);
  };

  const confirmCancelModalHandler = async () => {
    if (!url?.id) return;

    const values = await form.validateFields();

    cancelMyResidenceRequest({
      uuid: url.id,
      body: {
        faDescription: values?.description ?? "",
      },
    })
      .unwrap()
      .then(() => {
        closeCancelModalHandler();
        toast.success("درخواست با موفقیت لغو شد.", {
          toastId: "درخواست با موفقیت لغو شد.",
        });
        navigate({ pathname: DORMITORY_MY_RESIDENCE_LIST_PAGE_ROUTE });
      });
  };

  const closeCancelModalHandler = () => {
    setIsOpenConfirmationModal(false);
    form.resetFields();
  };

  // Drawer
  const closeDrawerHandler = () => {
    setIsDrawerOpen(false);
  };

  const openDrawerHandler = () => {
    setIsDrawerOpen(true);
  };

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* ================================ Edit Drawer ================================ */}
      {isDrawerOpen && (
        <CustomDrawer
          onClose={closeDrawerHandler}
          open={isDrawerOpen}
          closeIcon={<AiOutlineClose />}
          title="اصلاح اطلاعات"
          content={
            <CreateMyResidenceDrawerContent
              variant="MyResidenceDetail"
              closeDrawerHandler={closeDrawerHandler}
              dataSource={dataSource}
              getResidenceDataHandler={getMyResidenceDataHandler}
            />
          }
        />
      )}

      <Div loading={isGetMyResidenceDataLoading && !isDrawerOpen}>
        {/* ================================ Cancel Request Modal ================================ */}
        {isOpenConfirmationModal && (
          <ConfirmationModalWithContent
            title="لغو درخواست ایجاد اقامتگاه"
            isModalOpen={isOpenConfirmationModal}
            confirmBtnText="لغو درخواست"
            isDangerous
            backBtnText="انصراف"
            closeModalHandler={closeCancelModalHandler}
            onConfirmClickHandler={confirmCancelModalHandler}
            isConfirmButtonLoading={isCancelMyResidenceRequestLoading}
            content={<CancelMyResidenceRequestContent form={form} />}

            showIcon
          />
        )}

        {/* ================================ Waiting Status ================================ */}
        {isWaiting && dataSource?.returnDate !== null && (
          <>
            <CustomAlert
              type="warning"
              showIcon
              className="border border-dashed! font-medium"
              title={`این درخواست در تاریخ ${dataPlaceHolder({ data: dataSource?.returnDate, isDate: true })} عودت شده بود و در انتظار بررسی مجدد می باشد.`}
            />

            <CustomAlert
              className="mt-5!"
              type="warning"
              showIcon
              title={dataSource?.returnReason?.title}
              description={dataSource?.returnDescription}
            />
          </>
        )}

        {/* ================================ Returned Status ================================ */}
        {isReturned && (
          <>
            <CustomAlert
              type="warning"
              showIcon
              className="border border-dashed! font-medium"
              title={`این درخواست در تاریخ ${dataPlaceHolder({ data: dataSource?.returnDate, isDate: true })} عودت شده است.`}
            />

            <CustomAlert
              className="mt-5!"
              type="warning"
              showIcon
              title={dataSource?.returnReason?.title}
              description={dataSource?.returnDescription}
            />
          </>
        )}

        {/* ================================ Rejected Status ================================ */}
        {isRejected && (
          <>
            <CustomAlert
              type="error"
              showIcon
              className="border border-dashed! font-medium"
              title={`این درخواست در تاریخ ${dataPlaceHolder({ data: dataSource?.rejectDate, isDate: true })} رد شده است.`}
            />

            <CustomAlert
              className="mt-5!"
              type="error"
              showIcon
              title={dataSource?.rejectReason?.title}
              description={dataSource?.rejectDescription}
            />
          </>
        )}

        {/* ================================ Cancelled Status ================================ */}
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
            label="آخرین اقدام"
            value={dataSource?.lastActionDate}
            isDate
            customDateFormat="HH:mm، YYYY-MM-DD"
            lg={8}
            md={12}
          />
        </Row>

        {/* ================================ Residence Information ================================ */}
        <CustomDivider text="اطلاعات اقامتگاه" />

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
        {!isRejected && !isCancelled && (
          <div className="mt-10 flex justify-end">
            <div className="flex gap-3">
              <CustomButton danger onClick={openCancelModalHandler}>
                لغو درخواست
              </CustomButton>

              {isReturned && (
                <CustomButton type="primary" onClick={openDrawerHandler}>
                  اصلاح اطلاعات
                </CustomButton>
              )}
            </div>
          </div>
        )}
      </Div>
    </>
  );
};

export default MyResidenceDetail;
