import { useEffect, useState } from "react";

import { Form, Steps } from "antd";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalItem from "@components/Renderers/SingleVerticalItem/SingleVerticalItem";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetDormReceiveNotificationQuery,
  useSendDormNotificationMutation,
} from "@infra/states/redux/Apis/dorm/habitants/dormHabitantsApi";
import { dateTimeCombiner } from "@pages/Dorm/_shared/utils/DormUtils";

import {
  DormReceiveNotification,
  GetDormReceiveNotificationResponse,
} from "./@types/@seventhTabNotifications";
import { HabitantNotificationFormType } from "./modals/NotificationsModalContent/@types/@notificationsModalContent";
import NotificationsModalContent from "./modals/NotificationsModalContent/NotificationsModalContent";
import "./_seventhTabNotifications.scss";

const ALERT_SUCCESS_MSG = "اعلان مورد نظر با موفقیت برای کاربر ارسال شد.";

// stepItem
const stepItem = (item: DormReceiveNotification) => {
  return {
    title: item?.lastModifieUser,
    subTitle: (
      <div className="subtitle">
        <h4 className="body-regular text-neutral-14">
          {dateTimeCombiner(item?.createDate, item?.createTime)}
        </h4>
        <h4 className="body-regular text-neutral-14">ارسال اعلان</h4>
      </div>
    ),
    description: (
      <div className="border-neutral-6 mt-3 rounded-[10px] border p-6!">
        <SingleVerticalItem label="متن اعلان" value={item?.delayMessagePattern} />
      </div>
    ),
  };
};

// main component
const SeventhTabNotifications = () => {
  const [isModalOpen, setIsModalOpen] = useState({ isOpen: false, id: -1 });
  const [stepData, setStepData] = useState<DormReceiveNotification[]>();

  const { params } = useQueryParams();

  const [form] = Form.useForm<HabitantNotificationFormType>();

  //? ================================  Api Calls ================================
  const [getDormReceiveNotification, { isFetching: isDormReceiveNotificationFetching }] =
    useLazyGetDormReceiveNotificationQuery();

  // send notification
  const [sendDormNotification, { isLoading: SendDormNotificationIsLoading }] =
    useSendDormNotificationMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    receiveNotification();
  }, [params?.userNationalCod]);

  //* ================================ Util Functions ================================

  const receiveNotification = () => {
    getDormReceiveNotification({
      maxResults: 2000,
      firstResult: 0,
      userNationalcode_EQ: params?.userNationalCode,
    })
      .unwrap()
      .then(getDormReceiveNotificationIsSuccess);
  };

  // success
  const getDormReceiveNotificationIsSuccess = (
    value: GetDormReceiveNotificationResponse
  ) => {
    if (value?.status === 200) {
      setStepData(value?.data);
    }
  };

  //* ================================ Util Functions ================================
  const openModalBtnHandler = (id: number) => {
    form.setFieldsValue({ description: "" });
    setIsModalOpen({ isOpen: true, id: id });
  };

  const closeModalHandler = () => {
    setIsModalOpen({ isOpen: false, id: -1 });
  };

  const confirmModalHandler = () => {
    form
      .validateFields()
      .then((values) => {
        return sendDormNotification({
          form: "SendNotification",
          data: {
            delayMessagePattern: values?.description,
            userNationalcode: params?.userNationalCode,
          },
        }).unwrap();
      })
      .then(() => {
        form.resetFields();
        setIsModalOpen({ isOpen: false, id: -1 });
        receiveNotification();
        toast.success(ALERT_SUCCESS_MSG, { toastId: ALERT_SUCCESS_MSG });
      });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="seventh-tab-notifications-container">
      {isModalOpen?.isOpen && (
        <ConfirmationModalWithContent
          isModalOpen={isModalOpen?.isOpen}
          title="ارسال اعلان به کاربر"
          confirmBtnText="ارسال"
          backBtnText="انصراف"
          isConfirmButtonLoading={SendDormNotificationIsLoading}
          content={<NotificationsModalContent form={form} />}
          closeModalHandler={closeModalHandler}
          onConfirmClickHandler={confirmModalHandler}
        />
      )}

      <CustomDivider
        text="تاریخچه اعلان‌ها"
        extraContent={
          <CustomButton
            className="text-primary-5! border-primary-4!"
            type="default"
            onClick={() => openModalBtnHandler(isModalOpen?.id)}
          >
            ارسال اعلان به کاربر
          </CustomButton>
        }
      />
      <Div
        className="seventh-tab-notifications-wrapper"
        loading={isDormReceiveNotificationFetching}
      >
        <Steps
          orientation="vertical"
          size="small"
          current={stepData?.length ? stepData?.length : 0}
          items={stepData?.map((item) => stepItem(item))}
        />
      </Div>
    </div>
  );
};
export default SeventhTabNotifications;
