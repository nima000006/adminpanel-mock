import { useEffect, useState } from "react";

import { Col, Form, Row } from "antd";
import dayjs from "dayjs";
import { toast } from "react-toastify";

import {
  CustomButton,
  CustomDatePicker,
  CustomSelect,
  CustomTimePicker,
} from "@components/CustomInputs";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import {
  useLazyMyDoctorLabsListAdvanceFilterQuery,
  useMyDoctorSurveyDetailFourthTabChangeStatusMutation,
} from "@infra/states/redux/Apis/myDoctor/genetic/geneticApis";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { myDoctorSurveyDetailFourthTabChangeStatusRequest } from "@pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsDetail/helper/components/GeneticsParticipantsDetailReviewStatus/components/GeneticsParticipantsDetailReviewStatusConsultation/helper/component/GeneticsParticipantsDetailReviewStatusConsultationDrawerContent/@types/@geneticsParticipantsDetailReviewStatusConsultationDrawerContent";
import {
  GeneticsParticipantsDetailReviewStatusEditDrawerContentFormType,
  GeneticsParticipantsDetailReviewStatusEditDrawerContentProps,
} from "@pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsDetail/helper/components/GeneticsParticipantsDetailReviewStatus/components/GeneticsParticipantsDetailReviewStatusTest/helper/components/GeneticsParticipantsDetailReviewStatusEditDrawerContent/@types/@geneticsParticipantsDetailReviewStatusEditDrawerContent";
import { myDoctorLabsListAdvanceFilterResponse } from "@pages/MyDoctor/Genetics/Labs/LabsList/@types/@labsList";

const EDIT_SUCCESS = "تغییرات با موفقیت ثبت شد";

const GeneticsParticipantsDetailReviewStatusEditDrawerContent = ({
  closeDrawerHandler,
  centerId,
  createdDate,
  testId,
  requestTestId,
  statusId,
}: GeneticsParticipantsDetailReviewStatusEditDrawerContentProps) => {
  const [form] =
    Form.useForm<GeneticsParticipantsDetailReviewStatusEditDrawerContentFormType>();

  const [centerOptions, setCenterOption] =
    useState<myDoctorLabsListAdvanceFilterResponse>();
  //? ================================  Api Calls ================================

  const [resultSubmit, { isLoading: isResultSubmitLoading }] =
    useMyDoctorSurveyDetailFourthTabChangeStatusMutation();

  const [centersHandler, { isLoading: isCentersLoading }] =
    useLazyMyDoctorLabsListAdvanceFilterQuery();

  //? ================================ Effects ================================
  // labs api
  useEffect(() => {
    centersHandler({
      params: { page: 0, size: 100 },
      body: {
        testIds: [Number(testId)],
      },
    })
      .unwrap()
      .then((res) => {
        setCenterOption(res);

        const selectedLab = res.content?.find((item) => item.id?.toString() === centerId);
        const createdAt = dayjs(createdDate);

        form.setFieldsValue({
          lab: selectedLab
            ? {
                ...selectedLab,
                label: selectedLab.title,
                value: selectedLab.id?.toString(),
                key: selectedLab.id,
                code: selectedLab.id,
                item: selectedLab,
              }
            : undefined,
          suggestionDate: createdAt,
          suggestionTime: createdAt,
        });
      });
  }, [centerId, createdDate, form, testId]);
  //* ================================ Util Functions ================================
  //labs options
  const labsOptions =
    centerOptions?.content?.map((item) => ({
      id: item?.id,
      title: item?.title,
    })) ?? [];

  const onSubmitHandler = (
    values: GeneticsParticipantsDetailReviewStatusEditDrawerContentFormType
  ) => {
    const date = dayjs(values.suggestionDate);
    const time = dayjs(values.suggestionTime);

    const request: myDoctorSurveyDetailFourthTabChangeStatusRequest = {
      statusId: Number(statusId),
      centerId: Number(values?.lab?.code),
      testRequestId: Number(requestTestId),
      appointmentDate: date
        .hour(time.hour())
        .minute(time.minute())
        .second(0)
        .millisecond(0)
        .toISOString(),
    };

    resultSubmit(request)
      .unwrap()
      .then(() => {
        toast.success(EDIT_SUCCESS, {
          toastId: EDIT_SUCCESS,
        });
        closeDrawerHandler();
      });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={form} onFinish={onSubmitHandler}>
      <CustomDrawerHeader
        title="ویرایش"
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <>
            <CustomButton danger onClick={closeDrawerHandler}>
              انصراف
            </CustomButton>
            <CustomButton
              type="primary"
              htmlType="submit"
              loading={isResultSubmitLoading}
            >
              ثبت تغییرات
            </CustomButton>
          </>
        }
      />
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <CustomSelect
            className="mb-0!"
            options={labsOptions}
            label="آزمایشگاه"
            name="lab"
            rules={[REQUIRED_RULE]}
            form={form}
            loading={isCentersLoading}
          />
        </Col>
        <Col span={24}>
          <CustomDatePicker
            rules={[REQUIRED_RULE]}
            label="تاریخ پیشنهادی مراجعه"
            name="suggestionDate"
          />
        </Col>
        <Col span={24}>
          <CustomTimePicker
            className="[&>div_.ant-form-item-control]:w-full"
            rules={[REQUIRED_RULE]}
            label="ساعت پیشنهادی مراجعه"
            name="suggestionTime"
          />
        </Col>
      </Row>
      <div>
        <CustomAlert
          className="mt-5!"
          showIcon
          title="ارسال پیامک"
          description="پس از تغییر وضعیت به درانتظار مراجعه، اطلاعات کامل آزمایشگاه شامل آدرس، تاریخ و ساعت مراجعه برای کاربر ارسال می‌شود."
        />
      </div>
    </Form>
  );
};

export default GeneticsParticipantsDetailReviewStatusEditDrawerContent;
