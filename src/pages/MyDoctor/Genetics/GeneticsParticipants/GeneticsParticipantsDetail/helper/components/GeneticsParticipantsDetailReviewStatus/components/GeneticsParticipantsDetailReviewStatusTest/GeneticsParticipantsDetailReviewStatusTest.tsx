import { useState } from "react";

import { AiOutlineClose } from "react-icons/ai";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useMyDoctorSurveyDetailFourthTabQuery } from "@infra/states/redux/Apis/myDoctor/genetic/geneticApis";
import { myDoctorSurveyDetailFourthTabContentType } from "@pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsDetail/helper/components/GeneticsParticipantsDetailReviewStatus/@types/@geneticsParticipantsDetailReviewStatus";
import GeneticsParticipantsDetailReviewStatusEditDrawerContent from "@pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsDetail/helper/components/GeneticsParticipantsDetailReviewStatus/components/GeneticsParticipantsDetailReviewStatusTest/helper/components/GeneticsParticipantsDetailReviewStatusEditDrawerContent/GeneticsParticipantsDetailReviewStatusEditDrawerContent";
import GeneticsParticipantsDetailReviewStatusTestResultDetailDrawerContent from "@pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsDetail/helper/components/GeneticsParticipantsDetailReviewStatus/components/GeneticsParticipantsDetailReviewStatusTest/helper/components/GeneticsParticipantsDetailReviewStatusTestResultDetailDrawerContent/GeneticsParticipantsDetailReviewStatusTestResultDetailDrawerContent";
import GeneticsParticipantsDetailReviewStatusTestResultDrawerContent from "@pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsDetail/helper/components/GeneticsParticipantsDetailReviewStatus/components/GeneticsParticipantsDetailReviewStatusTest/helper/components/GeneticsParticipantsDetailReviewStatusTestResultDrawerContent/GeneticsParticipantsDetailReviewStatusTestResultDrawerContent";
import GeneticsParticipantsDetailReviewStatusTestViewDrawerContent from "@pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsDetail/helper/components/GeneticsParticipantsDetailReviewStatus/components/GeneticsParticipantsDetailReviewStatusTest/helper/components/GeneticsParticipantsDetailReviewStatusTestViewDrawerContent/GeneticsParticipantsDetailReviewStatusTestViewDrawerContent";
import GeneticsParticipantsDetailReviewStatusTestTableModel from "@pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsDetail/helper/components/GeneticsParticipantsDetailReviewStatus/components/GeneticsParticipantsDetailReviewStatusTest/helper/models/GeneticsParticipantsDetailReviewStatusTestTableModel/GeneticsParticipantsDetailReviewStatusTestTableModel";

const GeneticsParticipantsDetailReviewStatusTest = () => {
  const [isResultDrawer, setIsResultDrawer] = useState({
    isOpen: false,
    testId: "",
    code: "",
    requestTestId: "",
  });

  const [isResultDetailDrawer, setIsResultDetailDrawer] = useState({
    isOpen: false,
    requestTestId: "",
  });

  const [isViewDrawer, setIsViewDrawer] = useState({
    isOpen: false,
    createdDate: "",
    testTitle: "",
    requestTestId: "",
    testId: "",
  });

  const [isEditDrawer, setIsEditDrawer] = useState({
    isOpen: false,
    centerId: "",
    createdDate: "",
    statusId: "",
  });

  const { params } = useQueryParams();

  //? ================================  Api Calls ================================
  const { data, isLoading: isGetDataOfFourthTabLoading } =
    useMyDoctorSurveyDetailFourthTabQuery(
      {
        params: {
          page: 0,
          size: 100,
        },
        body: {
          surveyId: Number(params?.surveyId),
          surveyCycleId: Number(params?.id),
          testTypeIds: [1], // 1: تست
        },
      },
      { skip: !params?.id || !params?.surveyId }
    );

  //* ================================ Util Functions ================================

  const openResultDrawer = (record: myDoctorSurveyDetailFourthTabContentType) => {
    setIsResultDrawer({
      isOpen: true,
      testId: record?.testId?.toString(),
      code: record?.testStatus?.code?.toString(),
      requestTestId: record?.id?.toString(),
    });
  };

  const closeResultDrawer = () => {
    setIsResultDrawer({
      isOpen: false,
      testId: "",
      code: "",
      requestTestId: "",
    });
  };

  const openViewDrawer = (record: myDoctorSurveyDetailFourthTabContentType) => {
    setIsViewDrawer({
      isOpen: true,
      testTitle: record?.testTitle,
      createdDate: record?.createdDate,
      requestTestId: record?.id?.toString(),
      testId: record?.testId?.toString(),
    });
  };

  /**
   * فقط Drawer را می‌بندیم.
   * اطلاعات داخل state مخصوصاً testId پاک نمی‌شوند.
   */
  const closeViewDrawer = () => {
    setIsViewDrawer((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  const openResultDrawerFromView = (requestTestId: string) => {
    closeViewDrawer();

    setIsResultDetailDrawer({
      isOpen: true,
      requestTestId,
    });
  };

  const closeResultDetailDrawer = () => {
    setIsResultDetailDrawer({
      isOpen: false,
      requestTestId: "",
    });
  };

  /**
   * testId را از isViewDrawer می‌گیریم.
   * حتی اگر ViewDrawer بسته شده باشد، testId همچنان داخل state باقی مانده است.
   */
  const openEditDrawer = (
    centerId: string,
    appointmentDate: string,
    statusId: string
  ) => {
    setIsEditDrawer({
      isOpen: true,
      centerId,
      createdDate: appointmentDate,
      statusId,
    });

    setIsViewDrawer((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  const closeEditDrawer = () => {
    setIsEditDrawer({
      isOpen: false,
      centerId: "",
      createdDate: "",
      statusId: "",
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲

  return (
    <>
      {/* ویرایش */}
      {isEditDrawer?.isOpen && (
        <CustomDrawer
          onClose={closeEditDrawer}
          open={isEditDrawer?.isOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <GeneticsParticipantsDetailReviewStatusEditDrawerContent
              closeDrawerHandler={closeEditDrawer}
              centerId={isEditDrawer?.centerId}
              createdDate={isEditDrawer?.createdDate}
              testId={isViewDrawer?.testId}
              requestTestId={isViewDrawer?.requestTestId}
              statusId={isEditDrawer?.statusId}
            />
          }
        />
      )}
      {/* جزییات نتیجه تست */}
      {isResultDetailDrawer?.isOpen && (
        <CustomDrawer
          onClose={closeResultDetailDrawer}
          open={isResultDetailDrawer?.isOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <GeneticsParticipantsDetailReviewStatusTestResultDetailDrawerContent
              closeDrawerHandler={closeResultDetailDrawer}
              requestTestId={isResultDetailDrawer?.requestTestId}
            />
          }
        />
      )}
      {/* مشاهده */}
      {isViewDrawer?.isOpen && (
        <CustomDrawer
          onClose={closeViewDrawer}
          open={isViewDrawer?.isOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <GeneticsParticipantsDetailReviewStatusTestViewDrawerContent
              closeDrawerHandler={closeViewDrawer}
              openEditDrawer={openEditDrawer}
              testTitle={isViewDrawer?.testTitle}
              createdDate={isViewDrawer?.createdDate}
              requestTestId={isViewDrawer?.requestTestId}
              openResultDrawer={openResultDrawerFromView}
            />
          }
        />
      )}
      {/* ثبت نتیجه */}
      {isResultDrawer?.isOpen && (
        <CustomDrawer
          onClose={closeResultDrawer}
          open={isResultDrawer?.isOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <GeneticsParticipantsDetailReviewStatusTestResultDrawerContent
              closeDrawerHandler={closeResultDrawer}
              testId={isResultDrawer?.testId}
              code={isResultDrawer?.code}
              requestTestId={isResultDrawer?.requestTestId}
            />
          }
        />
      )}

      <CustomDivider text="تست های درخواست شده" />

      <CustomTable<myDoctorSurveyDetailFourthTabContentType>
        className="mt-4"
        dataSource={data?.content?.map((item) => {
          const firstName = item?.surveyCycleModifiedByFirstName?.trim() || "";
          const lastName = item?.surveyCycleModifiedByLastName?.trim() || "";
          const fullName =
            firstName || lastName ? `${firstName || "-"} ${lastName || "-"}` : "-";

          return {
            ...item,
            surveyCycleModifiedByFullName: fullName,
          };
        })}
        columns={GeneticsParticipantsDetailReviewStatusTestTableModel({
          openResultDrawer,
          openViewDrawer,
          openResultDrawerFromView,
        })}
        rowKey="id"
        loading={isGetDataOfFourthTabLoading}
        draggableColumns
        // draggableId={
        //   ExcelCodes.MY_DOCTOR_GENETICS_PARTICIPANTS_DETAIL_REQUEST_STATUS_TESTS
        // }
        pagination={paginationConfig}
      />
    </>
  );
};

export default GeneticsParticipantsDetailReviewStatusTest;
