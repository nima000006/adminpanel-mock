import { Row, Timeline } from "antd";

import { CustomButton } from "@components/CustomInputs";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { useMyDoctorSurveyDetailFourthTabHistoryQuery } from "@infra/states/redux/Apis/myDoctor/genetic/geneticApis";
import { testStatusConfig } from "@pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsDetail/helper/components/GeneticsParticipantsDetailReviewStatus/components/_shared/utils";
import { GeneticsParticipantsDetailReviewStatusTestViewDrawerContentProps } from "@pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsDetail/helper/components/GeneticsParticipantsDetailReviewStatus/components/GeneticsParticipantsDetailReviewStatusTest/helper/components/GeneticsParticipantsDetailReviewStatusTestViewDrawerContent/@types/@geneticsParticipantsDetailReviewStatusTestViewDrawerContent";

const GeneticsParticipantsDetailReviewStatusTestViewDrawerContent = ({
  closeDrawerHandler,
  openEditDrawer,
  testTitle,
  createdDate,
  requestTestId,
  openResultDrawer,
}: GeneticsParticipantsDetailReviewStatusTestViewDrawerContentProps) => {
  //? ================================ API Calls ================================

  const { data: historyData, isFetching: isHistoryDataLoading } =
    useMyDoctorSurveyDetailFourthTabHistoryQuery(
      {
        testRequestId: Number(requestTestId),
      },
      {
        skip: !requestTestId,
      }
    );

  //? ================================ Timeline ================================

  const timelineSteps = [...(historyData ?? [])]
    .sort((a, b) => Number(b.id) - Number(a.id))
    .map((item, index) => {
      const statusTypeId = item?.testStatusDto?.code; //status is checked with code

      const statusConfig =
        testStatusConfig[
          item?.testStatusDto?.statusEmergencyTypeId as keyof typeof testStatusConfig
        ]; // just color is checked with statusEmergencyTypeId

      const isCurrentStatus = index === 0;

      const files = Array.isArray(item?.files) ? item.files : [];

      return {
        color: statusConfig?.color,

        children: (
          <div className="flex flex-col gap-2">
            {/* Status style in view drawer */}
            <div className="flex gap-2">
              <CustomTag
                className="w-fit"
                color={statusConfig?.color === "yellow" ? "orange" : statusConfig?.color}
              >
                {item?.testStatusDto?.title}
              </CustomTag>

              {isCurrentStatus && <span>وضعیت فعلی</span>}
            </div>

            {/* Created Date */}
            <div className="flex gap-5">
              <span className="text-neutral-8">تاریخ ثبت وضعیت</span>

              <span className="text-neutral-11">
                {dataPlaceHolder({
                  data: item?.createdDate,
                  customDateFormat: "HH:mm, YYYY/MM/DD",
                  isDate: true,
                })}
              </span>
            </div>

            {/* Responsible Person */}
            <div className="flex gap-5">
              <span className="text-neutral-8">مسئول رسیدگی</span>

              <span className="text-neutral-11">
                {dataPlaceHolder({
                  data: item?.createdByFirstName + " " + item?.createdByLastName,
                })}
              </span>
            </div>

            {/* Test Result Files if status is 3 (نتیجه تست ارسال شد) */}
            {item?.testStatusDto?.code === 3 && (
              <>
                <div className="flex gap-5">
                  <span className="text-neutral-8">فایل‌های آپلود شده</span>

                  <div className="flex gap-1">
                    {files.slice(0, 2).map((_, index) => (
                      <CustomTag key={`file-${index}`} className="w-fit">
                        غربالگری بخش {index + 1}
                      </CustomTag>
                    ))}

                    {files.length > 2 && (
                      <CustomTag className="w-fit">+{files.length - 2}</CustomTag>
                    )}
                  </div>
                </div>

                <CustomButton
                  className="w-60"
                  onClick={() => openResultDrawer(requestTestId)}
                >
                  جزییات نتیجه تست
                </CustomButton>
              </>
            )}

            {/* Status 2 (در انتظار نتیجه تست) */}
            {statusTypeId === 2 && (
              <div className="flex gap-5">
                <span className="text-neutral-8">تاریخ مراجعه کاربر</span>

                <span className="text-neutral-11">
                  {dataPlaceHolder({ data: item?.attendedDate, isDate: true })}
                </span>
              </div>
            )}

            {/* Status 1 (در انتظار مراجعه) */}
            {statusTypeId === 1 && (
              <>
                <div className="flex gap-5">
                  <span className="text-neutral-8">آزمایشگاه منتخب</span>

                  <span className="text-neutral-11">
                    {dataPlaceHolder({
                      data: item?.centerTitle,
                    })}
                  </span>
                </div>

                <div className="flex gap-5">
                  <span className="text-neutral-8">تاریخ پیشنهادی مراجعه</span>

                  <span className="text-neutral-11">
                    {dataPlaceHolder({
                      data: item?.appointmentDate,
                      isDate: true,
                    })}
                  </span>
                </div>
                <div className="flex gap-5">
                  <span className="text-neutral-8">ساعت پیشنهادی مراجعه</span>

                  <span className="text-neutral-11">
                    {dataPlaceHolder({
                      data: item?.appointmentDate,
                      isDate: true,
                      customDateFormat: "HH:mm",
                    })}
                  </span>
                </div>
              </>
            )}

            {/* Edit */}
            {isCurrentStatus && Number(item?.testStatusDto?.code) === 1 && (
              <div className="mt-2">
                <CustomButton
                  className="w-60"
                  onClick={() =>
                    openEditDrawer(
                      item?.centerId?.toString(),
                      item?.appointmentDate,
                      item?.testStatusDto?.id?.toString()
                    )
                  }
                >
                  ویرایش
                </CustomButton>
              </div>
            )}
          </div>
        ),
      };
    });

  //? ================================ Main TSX ================================

  return (
    <div>
      <CustomDrawerHeader
        closeDrawerHandler={closeDrawerHandler}
        title="جزییات درخواست"
      />

      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol value={testTitle} label="تست" xl={12} lg={12} md={12} />

        <SingleVerticalWithCol
          value={createdDate}
          isDate
          label="تاریخ آخرین خرید"
          xl={12}
          lg={12}
          md={12}
        />
      </Row>

      <Div loading={isHistoryDataLoading}>
        <Timeline mode="start" items={timelineSteps} />
      </Div>
    </div>
  );
};

export default GeneticsParticipantsDetailReviewStatusTestViewDrawerContent;
