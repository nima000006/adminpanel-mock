import { useState } from "react";

import { Row } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import { PiCalendarBlankThin, PiPencilSimpleLine, PiUser } from "react-icons/pi";

import { CustomButton } from "@components/CustomInputs";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { convertDateToPersianTextDateWithoutHours } from "@infra/helpers/dateConvertor";
import ArchiveCompanionResidentsDrawerContent from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/_shared/components/ReservationRequestersInfo/helper/drawer/ArchiveCompanionResidentsDrawerContent/ArchiveCompanionResidentsDrawerContent";
import { CompanionResidentsDrawerContentProps } from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/_shared/components/ReservationRequestersInfo/helper/drawer/CompanionResidentsDrawerContent/@types/@CompanionResidentsDrawerContentTypes";
import EditCompanionResidentsDrawerContent from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/_shared/components/ReservationRequestersInfo/helper/drawer/EditCompanionResidentsDrawerContent/EditCompanionResidentsDrawerContent";

const mockData = [
  {
    id: 1,
    name: "نازنین کرمی",
    birthDate: "1402/01/01",
    nationalCode: "1234567890",
    fatherName: "نازنین کرمی",
    startResidenceDate: "1402/01/01",
  },
  {
    id: 2,
    name: " نرگس امامی",
    birthDate: "1402/01/01",
    nationalCode: "1234567890",
    fatherName: "نازنین کرمی",
    startResidenceDate: "1402/01/01",
    gender: "خانم",
  },
  {
    id: 3,
    name: "نازنین کرمی",
    birthDate: "1402/01/01",
    nationalCode: "1234567890",
    fatherName: "نازنین کرمی",
    startResidenceDate: "1402/01/01",
    gender: "خانم",
  },
  {
    id: 3,
    name: "نازنین کرمی",
    birthDate: "1402/01/01",
    nationalCode: "1234567890",
    fatherName: "نازنین کرمی",
    startResidenceDate: "1402/01/01",
    gender: "خانم",
  },
];

const CompanionResidentsDrawerContent = ({
  closeDrawerHandler,
}: CompanionResidentsDrawerContentProps) => {
  const [
    isArchiveCompanionResidentsDrawerOpen,
    setIsArchiveCompanionResidentsDrawerOpen,
  ] = useState({ isOpen: false, id: -1 });

  const [isEditCompanionResidentsDrawerOpen, setIsEditCompanionResidentsDrawerOpen] =
    useState({ isOpen: false, id: -1 });

  //* ================================ Util Functions ================================
  const archiveCompanionResidentsHandler = () => {
    setIsArchiveCompanionResidentsDrawerOpen({ isOpen: true, id: -1 });
  };
  const closeArchiveCompanionResidentsDrawerHandler = () => {
    setIsArchiveCompanionResidentsDrawerOpen({ isOpen: false, id: -1 });
  };

  const editCompanionResidentsHandler = () => {
    setIsEditCompanionResidentsDrawerOpen({ isOpen: true, id: -1 });
  };

  const closeEditCompanionResidentsDrawerHandler = () => {
    setIsEditCompanionResidentsDrawerOpen({ isOpen: false, id: -1 });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* دراور ارشیو ساکنین همراه */}
      {isArchiveCompanionResidentsDrawerOpen?.isOpen && (
        <CustomDrawer
          title=""
          onClose={closeArchiveCompanionResidentsDrawerHandler}
          open={isArchiveCompanionResidentsDrawerOpen?.isOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <ArchiveCompanionResidentsDrawerContent
              closeDrawerHandler={closeArchiveCompanionResidentsDrawerHandler}
            />
          }
        />
      )}

      {/* دراور ویرایش ساکنین همراه */}
      {isEditCompanionResidentsDrawerOpen?.isOpen && (
        <CustomDrawer
          title=""
          onClose={closeEditCompanionResidentsDrawerHandler}
          open={isEditCompanionResidentsDrawerOpen?.isOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <EditCompanionResidentsDrawerContent
              closeDrawerHandler={closeEditCompanionResidentsDrawerHandler}
            />
          }
        />
      )}
      <div>
        <CustomDrawerHeader
          title="ساکنین همراه"
          closeDrawerHandler={closeDrawerHandler}
          leftSideContent={
            <div className="flex gap-3">
              <CustomButton loading={false} onClick={archiveCompanionResidentsHandler}>
                آرشیو ساکنین همراه
              </CustomButton>
              <CustomButton
                type="primary"
                loading={false}
                icon={<PiPencilSimpleLine />}
                onClick={editCompanionResidentsHandler}
              >
                ویرایش
              </CustomButton>
            </div>
          }
        />
        <div className="flex flex-col gap-6">
          {mockData.map((item) => (
            <div key={item.id} className="flex flex-col gap-4">
              <CustomDivider
                text={
                  <div className="flex items-center gap-2">
                    <PiUser />
                    <span>{item?.name}</span>
                  </div>
                }
                extraContent={
                  <div className="flex items-center gap-2">
                    <PiCalendarBlankThin color="#262626" />
                    <span className="text-neutral-7">شروع اسکان</span>
                    <span>
                      {convertDateToPersianTextDateWithoutHours(
                        item?.startResidenceDate || ""
                      )}
                    </span>
                  </div>
                }
              />

              <Row gutter={[12, 12]}>
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
                  label="جنسیت"
                  value={item?.gender}
                />
              </Row>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CompanionResidentsDrawerContent;
