import React, { useState } from "react";

import { Row } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import { GrAttachment } from "react-icons/gr";
import { PiPencilSimpleLine, PiUser } from "react-icons/pi";

import { CustomButton } from "@components/CustomInputs";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { NEUTRAL_07 } from "@infra/VARS/globalColors/globalColors";
import EditDeliveryDocumentsDrawerContent from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/_shared/drawer/EditDeliveryDocumentsDrawerContent/EditDeliveryDocumentsDrawerContent";
import { ViewDeliveryDocumentsDrawerContentProps } from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/_shared/drawer/ViewDeliveryDocumentsDrawerContent/@types/@viewDeliveryDocumentsDrawerContentTypes";
import "./_viewDeliveryDocumentsDrawerContent.scss";

const mockData = [
  {
    id: 1,
    name: "نازنین",
    lastName: "کرمی",
    phoneNumber: "09123456789",
    fatherName: "نازنین کرمی",
    birthDate: "1402/01/01",
    nationalCode: "1234567890",
    relation: "برادر",
  },
  {
    id: 2,
    name: "نازنین",
    lastName: "کرمی",
    phoneNumber: "09123456789",
    fatherName: "نازنین کرمی",
    birthDate: "1402/01/01",
    nationalCode: "1234567890",
    relation: "برادر",
  },
  {
    id: 3,
    name: "نازنین",
    lastName: "کرمی",
    phoneNumber: "09123456789",
    fatherName: "نازنین کرمی",
    birthDate: "1402/01/01",
    nationalCode: "1234567890",
    relation: "برادر",
  },
];

const mockFiles = [
  {
    id: 1,
    name: "فایل  تستی ",
    url: "https://www.google.com",
  },
  {
    id: 2,
    name: "فایل  تستی ",
    url: "https://www.google.com",
  },
];

const ViewDeliveryDocumentsDrawerContent = ({
  closeDrawerHandler,
}: ViewDeliveryDocumentsDrawerContentProps) => {
  const [isEditDeliveryDocumentsDrawerOpen, setIsEditDeliveryDocumentsDrawerOpen] =
    useState({ isOpen: false, id: -1 });

  //* ================================ Util Functions ================================
  const editHandler = () => {
    setIsEditDeliveryDocumentsDrawerOpen({ isOpen: true, id: 1 });
  };

  const closeEditDeliveryDocumentsDrawerHandler = () => {
    setIsEditDeliveryDocumentsDrawerOpen({ isOpen: false, id: -1 });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* دراور ویرایش مدارک تحویل */}
      {isEditDeliveryDocumentsDrawerOpen?.isOpen && (
        <CustomDrawer
          title=""
          onClose={closeEditDeliveryDocumentsDrawerHandler}
          open={isEditDeliveryDocumentsDrawerOpen?.isOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <EditDeliveryDocumentsDrawerContent
              closeDrawerHandler={closeEditDeliveryDocumentsDrawerHandler}
            />
          }
        />
      )}

      <div className="view-delivery-documents-drawer-container">
        <CustomDrawerHeader
          title="نمایش مدارک تحویل"
          closeDrawerHandler={closeDrawerHandler}
          leftSideContent={
            <CustomButton
              type="primary"
              loading={false}
              icon={<PiPencilSimpleLine />}
              onClick={editHandler}
            >
              ویرایش
            </CustomButton>
          }
        />

        <div className="flex flex-col gap-10">
          <div>
            <CustomDivider text="فرم های تحویل" />

            <Div loading={false}>
              <Row gutter={[16, 16]}>
                {mockFiles?.length ? (
                  mockFiles?.map((file, index) => (
                    <React.Fragment key={`${file}-${index}`}>
                      <SingleVerticalWithCol
                        span={24}
                        label={`${file?.name} ${index + 1}`}
                        value={`${file?.name} ${index + 1}`}
                        prefix={<GrAttachment size={16} color={NEUTRAL_07} />}
                        suffix={
                          <a href={file?.url} target="_blank" rel="noopener noreferrer">
                            <span className="body-regular">دانلود</span>
                          </a>
                        }
                        className="text-primary-6! flex overflow-hidden!"
                        valueClassName="truncate"
                      />
                    </React.Fragment>
                  ))
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <CustomEmpty description="فایلی برای نمایش وجود ندارد" />
                  </div>
                )}
              </Row>
            </Div>
          </div>

          <div>
            <CustomDivider text="اطلاعات تکمیلی" />
            <Row gutter={[12, 12]}>
              <SingleVerticalWithCol
                xl={12}
                lg={12}
                md={12}
                sm={24}
                label="وضعیت تأهل"
                value={"مجرد"}
              />
              <SingleVerticalWithCol
                xl={12}
                lg={12}
                md={12}
                sm={24}
                label="تلفن ثابت منزل"
                value={"0217415487"}
              />
            </Row>
          </div>

          {mockData.map((item) => (
            <div key={item.id}>
              <CustomDivider
                text={
                  <div className="flex items-center gap-2">
                    <PiUser />
                    <span>{item?.relation}</span>
                  </div>
                }
              />

              <Row gutter={[12, 12]}>
                <SingleVerticalWithCol
                  xl={12}
                  lg={12}
                  md={12}
                  sm={24}
                  label="نام"
                  value={item?.name}
                />
                <SingleVerticalWithCol
                  xl={12}
                  lg={12}
                  md={12}
                  sm={24}
                  label="نام خانوادگی"
                  value={item?.lastName}
                />
                <SingleVerticalWithCol
                  xl={12}
                  lg={12}
                  md={12}
                  sm={24}
                  label="شماره تماس"
                  value={item?.phoneNumber}
                />
                <SingleVerticalWithCol
                  xl={12}
                  lg={12}
                  md={12}
                  sm={24}
                  label="نام پدر"
                  value={item?.fatherName}
                />
                <SingleVerticalWithCol
                  xl={12}
                  lg={12}
                  md={12}
                  sm={24}
                  label="تاریخ تولد"
                  value={item?.birthDate}
                />
                <SingleVerticalWithCol
                  xl={12}
                  lg={12}
                  md={12}
                  sm={24}
                  label="کد ملی/فراگیر"
                  value={item?.nationalCode}
                />
              </Row>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ViewDeliveryDocumentsDrawerContent;
