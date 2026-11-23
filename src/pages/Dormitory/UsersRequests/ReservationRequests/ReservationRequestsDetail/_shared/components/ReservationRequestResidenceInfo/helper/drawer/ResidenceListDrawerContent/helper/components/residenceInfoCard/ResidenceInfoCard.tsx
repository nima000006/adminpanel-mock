import { useState } from "react";

import { Descriptions, DescriptionsProps, Progress, UploadFile } from "antd";
import { PiArrowLeft } from "react-icons/pi";

import { CustomButton, CustomUploader } from "@components/CustomInputs";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { ResidenceInfoCardProps } from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/_shared/components/ReservationRequestResidenceInfo/helper/drawer/ResidenceListDrawerContent/helper/components/residenceInfoCard/@types/@residenceInfoCardTypes";
import {
  RESERVATION_USER_GROUP_TYPE,
  reservationAcceptanceProgramMap,
} from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/_shared/util";
import { ReservationInResidenceProgressStatus } from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/ReservationInResidenceRequestsDetail/helper/components/ReservationInResidenceRequestProgressBar/@types/@reservationInResidenceRequestProgressBarTypes";

const PROGRESS_STATUS_CONFIG: Record<
  ReservationInResidenceProgressStatus,
  { strokeColor: string }
> = {
  inResidence: { strokeColor: "#2B91FF" },
  overdue: { strokeColor: "#FF4D4F" },
  dueToday: { strokeColor: "#FFA940" },
};

const ResidenceInfoCard = ({ item, onMoreClick }: ResidenceInfoCardProps) => {
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);

  const userGroupConfig =
    RESERVATION_USER_GROUP_TYPE[
      item.userGroup as keyof typeof RESERVATION_USER_GROUP_TYPE
    ];
  const acceptanceProgramConfig =
    reservationAcceptanceProgramMap[
      item.acceptanceProgramType as keyof typeof reservationAcceptanceProgramMap
    ];
  const progressConfig =
    PROGRESS_STATUS_CONFIG[item.progressStatus as keyof typeof PROGRESS_STATUS_CONFIG];
  const isStudent = item.userGroup === "student";

  const profileItems: DescriptionsProps["items"] = [
    {
      key: "nationalCode",
      label: "کد ملی / فراگیر",
      children: <span dir="ltr">{dataPlaceHolder({ data: item.nationalCode })}</span>,
    },
    {
      key: "userGroup",
      label: "گروه کاربری",
      children: (
        <CustomTag color={userGroupConfig.color} className="m-0!">
          {userGroupConfig.label}
        </CustomTag>
      ),
    },
  ];

  const detailItems: DescriptionsProps["items"] = [
    {
      key: "personnelCode",
      label: "شماره دانشجویی / پرسنلی",
      children: dataPlaceHolder({ data: item.personnelCode }),
    },
    {
      key: "branchUnit",
      label: "شعبه/واحد",
      children: dataPlaceHolder({ data: item.branchUnit }),
    },
    {
      key: "extraInfo",
      label: isStudent ? "اطلاعات تحصیلی" : "اطلاعات کارمندی",
      children: isStudent ? (
        <div className="flex flex-wrap items-center justify-end gap-2">
          <span className="text-neutral-12">
            {dataPlaceHolder({ data: item.extraInfoPrimary })}
          </span>
          <span className="border-neutral-4 self-stretch border-l" />
          <span className="text-neutral-12">
            {dataPlaceHolder({ data: item.extraInfoSecondary })}
          </span>
        </div>
      ) : (
        dataPlaceHolder({ data: item.extraInfoPrimary })
      ),
    },
    {
      key: "phone",
      label: "شماره تماس",
      children: <span dir="ltr">{dataPlaceHolder({ data: item.phone })}</span>,
    },
  ];

  const footerItems: DescriptionsProps["items"] = [
    {
      key: "admissionProgram",
      label: "برنامه پذیرش",
      children: (
        <div className="flex flex-wrap items-center justify-end gap-2">
          <span className="text-neutral-11 text-base leading-6">
            {dataPlaceHolder({ data: item.admissionProgram })}
          </span>
          <CustomTag color={acceptanceProgramConfig.color} className="w-fit">
            {acceptanceProgramConfig.label}
          </CustomTag>
        </div>
      ),
    },
    {
      key: "entryDate",
      label: "تاریخ ورود",
      children: (
        <span className="text-neutral-11 text-base leading-6">
          {dataPlaceHolder({ data: item.entryDate })}
        </span>
      ),
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex w-full flex-col gap-4">
      {/* پروفایل */}
      <div className="flex w-full flex-wrap items-start justify-between gap-2.5">
        <div className="flex items-center gap-4">
          <CustomUploader
            fileList={fileList}
            setFileList={setFileList}
            hasNullText={true}
            classNameOuterDiv="custom-upload-packet"
          />

          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <p className="text-neutral-12 h4-medium m-0 text-start">
              {dataPlaceHolder({ data: item.fullName })}
            </p>

            <Descriptions
              column={1}
              colon={false}
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
              items={profileItems}
            />
          </div>
        </div>

        <CustomButton
          type="link"
          className="max-h-6 min-h-6 p-0 text-xs"
          icon={<PiArrowLeft size={12} />}
          iconPlacement="start"
          onClick={onMoreClick}
        >
          بیشتر
        </CustomButton>
      </div>

      <div className="border-neutral-4 border" />

      {/* جزئیات */}
      <Descriptions
        column={1}
        colon={false}
        styles={{
          label: {
            color: "var(--neutral-7)",
            textAlign: "start",
            width: 180,
          },
          content: {
            color: "var(--neutral-10)",
            textAlign: "end",
          },
        }}
        items={detailItems}
      />

      {/* روزشمار اقامت */}
      <div className="flex w-full items-center gap-2">
        <Progress
          className="m-0! min-w-0 flex-1"
          percent={item.progressPercent}
          strokeColor={progressConfig.strokeColor}
          strokeWidth={4}
          showInfo={false}
        />
        <span className="text-neutral-10 shrink-0 text-sm whitespace-nowrap">
          {item.remainingText}
        </span>
      </div>

      {/* برنامه پذیرش و تاریخ ورود */}
      <Descriptions
        column={{ xs: 1, sm: 2 }}
        colon={false}
        layout="vertical"
        styles={{
          label: {
            color: "var(--neutral-7)",
            textAlign: "start",
          },
          content: {
            color: "var(--neutral-11)",
            textAlign: "start",
          },
        }}
        items={footerItems}
      />
    </div>
  );
};

export default ResidenceInfoCard;
