import { useEffect } from "react";

import { Timeline } from "antd";

import { CustomButton } from "@components/CustomInputs";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import Div from "@components/Renderers/Div/Div";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetPreparationStepsResidenceDetailQuery } from "@infra/states/redux/Apis/dormitory/residence/residenceApi";

const PreparationStepsResidenceDrawerContent = ({
  closeDrawerHandler,
}: {
  closeDrawerHandler: () => void;
}) => {
  const { params: url } = useQueryParams();

  //? ================================ Api Calls ================================
  const [
    getPreparationStepsResidenceDetail,
    {
      data: getPreparationStepsResidenceDetailData,
      isFetching: isGetPreparationStepsResidenceDetailLoading,
    },
  ] = useLazyGetPreparationStepsResidenceDetailQuery();

  const structureReady = getPreparationStepsResidenceDetailData?.structureReady ?? false;
  const admissionPlanReady =
    getPreparationStepsResidenceDetailData?.admissionPlanReady ?? false;
  const isResidenceReady = structureReady && admissionPlanReady;

  //? ================================ Effects ================================
  useEffect(() => {
    getPreparationStepsResidenceDetailHandler();
  }, [url?.residenceId]);

  //* ================================ Util Functions ================================
  const getPreparationStepsResidenceDetailHandler = () => {
    if (!url?.residenceId) return;

    getPreparationStepsResidenceDetail({ uuid: url.residenceId });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ *
  return (
    <div>
      <CustomDrawerHeader
        title="مشاهده مراحل آماده سازی اقامتگاه"
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={<CustomButton onClick={closeDrawerHandler}>بستن</CustomButton>}
      />

      <Div loading={isGetPreparationStepsResidenceDetailLoading}>
        <div className="flex flex-col gap-10">
          <CustomAlert
            type={isResidenceReady ? "success" : "warning"}
            showIcon
            description={
              isResidenceReady
                ? "اقامتگاه آماده رزرو توسط کاربران می‌باشد."
                : "تا زمانی که همه موارد زیر در وضعیت سبز قرار نگیرند، اقامتگاه در اپلیکیشن قابل رزرو نخواهد بود."
            }
          />

          <Timeline
            mode="start"
            items={[
              {
                dot: (
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-[10px] ${structureReady ? "bg-green-1 text-green-500" : "bg-dustred-1 text-red-500"} text-[16px] font-bold`}
                  >
                    {structureReady ? "✓" : "1"}
                  </div>
                ),
                content: (
                  <div>
                    <div className="text-neutral-13 mb-2 font-bold">ساختار اقامتگاه</div>
                    <div className="text-neutral-8">
                      بدون ساختار اقامتگاه، ظرفیت قابل رزرو وجود ندارد.
                    </div>
                    <div className={structureReady ? "text-green-6" : "text-dustred-6"}>
                      {!structureReady
                        ? " حداقل یک ساختمان، طبقه، واحد اقامتی و تخت باید تعریف شود."
                        : " حداقل یک ساختمان، طبقه، واحد اقامتی و تخت تعریف شده است."}
                    </div>
                  </div>
                ),
              },
              {
                dot: (
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-[10px] ${admissionPlanReady ? "bg-green-1 text-green-500" : "bg-dustred-1 text-red-500"} text-[16px] font-bold`}
                  >
                    {admissionPlanReady ? "✓" : "2"}
                  </div>
                ),
                content: (
                  <div className="flex flex-col">
                    <div>
                      <div className="text-neutral-13 mb-2 font-bold">برنامه پذیرش</div>
                      <div className="text-neutral-8">
                        تعیین می‌کند چه کسانی، در چه بازه زمانی رزرو کنند.
                      </div>
                      <div
                        className={admissionPlanReady ? "text-green-6" : "text-dustred-6"}
                      >
                        {!admissionPlanReady
                          ? " حداقل یک برنامه پذیرش فعال باید تعریف شود."
                          : " حداقل یک برنامه پذیرش فعال تعریف شده است."}
                      </div>
                    </div>
                    <CustomButton color="default" type="link" className="ms-auto flex">
                      {admissionPlanReady
                        ? "مشاهده برنامه پذیرش‌های فعال"
                        : "ایجاد برنامه پذیرش"}
                    </CustomButton>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </Div>
    </div>
  );
};
export default PreparationStepsResidenceDrawerContent;
