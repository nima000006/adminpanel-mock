import { useState } from "react";

import { Descriptions, DescriptionsProps, UploadFile } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import { PiUserCircle } from "react-icons/pi";
import { toast } from "react-toastify";

import { CustomButton, CustomUploader } from "@components/CustomInputs";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { emptyString } from "@infra/config/global.vars";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { ReservationRequestersInfoProps } from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/_shared/components/ReservationRequestersInfo/@types/@reservationRequestersInfoTypes";
import CompanionResidentsDrawerContent from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/_shared/components/ReservationRequestersInfo/helper/drawer/CompanionResidentsDrawerContent/CompanionResidentsDrawerContent";
import AddCompanionResidentsDrawerContent from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/_shared/drawer/AddCompanionResidentsDrawerContent/AddCompanionResidentsDrawerContent";
import ViewDeliveryDocumentsDrawerContent from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/_shared/drawer/ViewDeliveryDocumentsDrawerContent/ViewDeliveryDocumentsDrawerContent";
import { RESERVATION_USER_GROUP_TYPE } from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/_shared/util";

const ReservationRequestersInfo = ({
  hasBtn = false,
  firstBtnText,
  secondBtnText,
  hasSecondBtn = false,
}: ReservationRequestersInfoProps) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [isCompanionResidentsDrawerOpen, setIsCompanionResidentsDrawerOpen] = useState({
    isOpen: false,
    id: -1,
  });
  const [isViewDeliveryDocumentsDrawerOpen, setIsViewDeliveryDocumentsDrawerOpen] =
    useState({ isOpen: false, id: -1 });

  const [isAddCompanionResidentsDrawerOpen, setIsAddCompanionResidentsDrawerOpen] =
    useState(false);

  const isDocumentsFormCompleted = true; // TODO: replace with the actual logic // اگر کاربر فرم را پر نکرده باشد فالس در غیر این صورت تورو

  const DOCUMENTS_FORM_NOT_COMPLETED_MSG =
    "کاربر هنوز فرم مدارک تحویل را تکمیل نکرده است.";

  const itemsUserInfo: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "کد ملی / فراگیر ",
      children: emptyString,
    },
    {
      key: "2",
      label: "گروه کاربری",
      children: (
        <CustomTag color={RESERVATION_USER_GROUP_TYPE?.["student"]?.color}>
          {RESERVATION_USER_GROUP_TYPE?.["student"]?.label}
        </CustomTag>
      ),
    },
  ];

  const studentInfo: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "شماره دانشجویی / پرسنلی",
      children: emptyString,
    },
    {
      key: "2",
      label: "شعبه/واحد",
      children: emptyString,
    },
    {
      key: "3",
      label: "اطلاعات تحصیلی",
      children: emptyString,
    },
    {
      key: "4",
      label: "شماره تماس",
      children: emptyString,
    },
  ];

  const birthInfo: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "تاریخ تولد",
      children: emptyString,
    },
    {
      key: "2",
      label: "سال ورود",
      children: emptyString,
    },
    {
      key: "3",
      label: "جنسیت",
      children: emptyString,
    },
    {
      key: "4",
      label: "ملیت",
      children: emptyString,
    },
  ];

  //* ================================ Util Functions ================================
  const companionResidentsClickHandler = () => {
    if (secondBtnText === "مشاهده ساکنین همراه") {
      setIsCompanionResidentsDrawerOpen({ isOpen: true, id: 1 }); // TODO: replace with the actual id} // مشاهده
    } else {
      setIsAddCompanionResidentsDrawerOpen(true); // افزودن
    }
  };

  const closeCompanionResidentsDrawerHandler = () => {
    setIsCompanionResidentsDrawerOpen({ isOpen: false, id: -1 });
  };

  const viewDeliveryDocumentsClickHandler = () => {
    if (isDocumentsFormCompleted) {
      setIsViewDeliveryDocumentsDrawerOpen({ isOpen: true, id: 1 });
    } else {
      toast.error(DOCUMENTS_FORM_NOT_COMPLETED_MSG, {
        toastId: DOCUMENTS_FORM_NOT_COMPLETED_MSG,
      });
    }
  };

  const closeViewDeliveryDocumentsDrawerHandler = () => {
    setIsViewDeliveryDocumentsDrawerOpen({ isOpen: false, id: -1 });
  };

  const closeAddCompanionResidentsDrawerHandler = () => {
    setIsAddCompanionResidentsDrawerOpen(false);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <>
      {/* دراور مشاهده ساکنین همراه */}
      {isCompanionResidentsDrawerOpen?.isOpen && (
        <CustomDrawer
          title=""
          onClose={closeCompanionResidentsDrawerHandler}
          open={isCompanionResidentsDrawerOpen?.isOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <CompanionResidentsDrawerContent
              closeDrawerHandler={closeCompanionResidentsDrawerHandler}
            />
          }
        />
      )}

      {/* دراور افزودن ساکنین همراه */}
      {isAddCompanionResidentsDrawerOpen && (
        <CustomDrawer
          title=""
          onClose={closeAddCompanionResidentsDrawerHandler}
          open={isAddCompanionResidentsDrawerOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <AddCompanionResidentsDrawerContent
              closeDrawerHandler={closeAddCompanionResidentsDrawerHandler}
            />
          }
        />
      )}

      {/* دراور نمایش مدارک تحویل */}
      {isViewDeliveryDocumentsDrawerOpen?.isOpen && (
        <CustomDrawer
          title=""
          onClose={closeViewDeliveryDocumentsDrawerHandler}
          open={isViewDeliveryDocumentsDrawerOpen?.isOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <ViewDeliveryDocumentsDrawerContent
              closeDrawerHandler={closeViewDeliveryDocumentsDrawerHandler}
            />
          }
        />
      )}

      <div className="border-neutral-4 flex flex-col gap-4 rounded-md border p-4">
        <CustomDivider
          text={
            <span className="flex items-center gap-2">
              <PiUserCircle /> اطلاعات کاربر درخواست دهنده
            </span>
          }
          size="small"
          extraContent={
            hasBtn ? (
              <div className="flex gap-2">
                {hasSecondBtn && secondBtnText ? (
                  <CustomButton onClick={companionResidentsClickHandler}>
                    {secondBtnText}
                  </CustomButton>
                ) : null}
                {firstBtnText ? (
                  <CustomButton onClick={viewDeliveryDocumentsClickHandler}>
                    {firstBtnText}
                  </CustomButton>
                ) : null}
              </div>
            ) : null
          }
        />

        <div className="flex flex-col gap-4">
          <div className="flex w-full flex-wrap items-center gap-4 md:flex-nowrap">
            <div className="shrink-0">
              <CustomUploader
                fileList={fileList}
                setFileList={setFileList}
                isReadOnly
                hasUploaderIcon={false}
                hasNullText
                uploaderText="عکس پرسنلی"
              />
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <p className="text-neutral-12 h4-medium m-0 text-start">
                {dataPlaceHolder({ data: "محمد محمدی" })}
              </p>

              <Descriptions
                column={1}
                colon={false}
                className="[&_.ant-descriptions-item]:pb-0! [&_.ant-descriptions-row:last-child>td]:pb-0! [&_.ant-descriptions-row>td]:pb-2!"
                styles={{
                  label: {
                    color: "var(--neutral-7)",
                    width: 120,
                    textAlign: "start",
                  },
                  content: {
                    color: "var(--neutral-10)",
                    textAlign: "start",
                  },
                }}
                items={itemsUserInfo}
              />
            </div>
          </div>

          <div className="border-neutral-4 border" />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
            <Descriptions
              column={1}
              items={studentInfo}
              styles={{
                label: {
                  fontWeight: "medium",
                  textAlign: "right",
                  width: "180px",
                },
                content: {
                  textAlign: "left",
                },
              }}
            />
            <Descriptions
              column={1}
              items={birthInfo}
              styles={{
                label: {
                  fontWeight: "medium",
                  textAlign: "right",
                  width: "120px",
                },
                content: {
                  textAlign: "left",
                },
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ReservationRequestersInfo;
