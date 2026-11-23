import { Row } from "antd";
import { PiArrowLeft, PiCalendarBlankThin, PiUser } from "react-icons/pi";

import { CustomButton } from "@components/CustomInputs";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { convertDateToPersianTextDateWithoutHours } from "@infra/helpers/dateConvertor";
import { ArchiveCompanionResidentsDrawerContentProps } from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/_shared/components/ReservationRequestersInfo/helper/drawer/ArchiveCompanionResidentsDrawerContent/@types/@archiveCompanionResidentsDrawerContentTypes";

const mockData = [
  {
    id: 1,
    name: "نازنین کرمی",
    birthDate: "1402/01/01",
    nationalCode: "1234567890",
    fatherName: "نازنین کرمی",
    startResidenceDate: "1402/01/01",
    deleteDate: "1402/01/01",
  },
  {
    id: 2,
    name: " نرگس امامی",
    birthDate: "1402/01/01",
    nationalCode: "1234567890",
    fatherName: "نازنین کرمی",
    startResidenceDate: "1402/01/01",
    gender: "خانم",
    deleteDate: "1402/01/01",
  },
  {
    id: 3,
    name: "نازنین کرمی",
    birthDate: "1402/01/01",
    nationalCode: "1234567890",
    fatherName: "نازنین کرمی",
    startResidenceDate: "1402/01/01",
    gender: "خانم",
    deleteDate: "1402/01/01",
  },
  {
    id: 4,
    name: "نازنین کرمی",
    birthDate: "1402/01/01",
    nationalCode: "1234567890",
    fatherName: "نازنین کرمی",
    startResidenceDate: "1402/01/01",
    gender: "خانم",
    deleteDate: "1402/01/01",
  },
];

const ArchiveCompanionResidentsDrawerContent = ({
  closeDrawerHandler,
}: ArchiveCompanionResidentsDrawerContentProps) => {
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <CustomDrawerHeader
        title="آرشیو ساکنین همراه"
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <CustomButton
            loading={false}
            icon={<PiArrowLeft />}
            iconPlacement="start"
            onClick={closeDrawerHandler}
          >
            بازگشت به ساکنین همراه
          </CustomButton>
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
              <SingleVerticalWithCol
                xl={12}
                lg={12}
                md={12}
                sm={24}
                label="تاریخ حذف "
                value={item?.deleteDate}
              />
            </Row>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArchiveCompanionResidentsDrawerContent;
