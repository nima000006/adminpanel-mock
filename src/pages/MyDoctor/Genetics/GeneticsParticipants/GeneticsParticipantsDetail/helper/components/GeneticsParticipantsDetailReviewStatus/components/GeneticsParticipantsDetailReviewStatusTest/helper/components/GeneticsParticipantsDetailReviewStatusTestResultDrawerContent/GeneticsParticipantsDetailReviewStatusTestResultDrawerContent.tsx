import { useState } from "react";

import { Col, Form, Row, UploadFile } from "antd";
import dayjs from "dayjs";
import { AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";

import {
  CustomButton,
  CustomDatePicker,
  CustomInput,
  CustomSelect,
  CustomTimePicker,
  CustomUploader,
} from "@components/CustomInputs";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import { getUploadFilePayload } from "@infra/helpers/utils";
import {
  useMyDoctorLabsListAdvanceFilterQuery,
  useMyDoctorSurveyDetailFourthTabChangeStatusMutation,
  useMyDoctorSurveyDetailFourthTabTestStatusCodeQuery,
} from "@infra/states/redux/Apis/myDoctor/genetic/geneticApis";
import { useMyDoctorSurveyDetailFourthTabUploadFileMutation } from "@infra/states/redux/Apis/myDoctor/test/testApis";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { TEST_RESULT_VALID_FILE_FORMATS } from "@pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsDetail/helper/components/GeneticsParticipantsDetailReviewStatus/components/_shared/utils";
import { myDoctorSurveyDetailFourthTabChangeStatusRequest } from "@pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsDetail/helper/components/GeneticsParticipantsDetailReviewStatus/components/GeneticsParticipantsDetailReviewStatusConsultation/helper/component/GeneticsParticipantsDetailReviewStatusConsultationDrawerContent/@types/@geneticsParticipantsDetailReviewStatusConsultationDrawerContent";
import {
  GeneticsParticipantsDetailReviewStatusTestResultDrawerContentFormType,
  GeneticsParticipantsDetailReviewStatusTestResultDrawerContentProps,
} from "@pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsDetail/helper/components/GeneticsParticipantsDetailReviewStatus/components/GeneticsParticipantsDetailReviewStatusTest/helper/components/GeneticsParticipantsDetailReviewStatusTestResultDrawerContent/@types/@geneticsParticipantsDetailReviewStatusTestResultDrawerContent";

const TEST_RESULT_SUCCESS = "نتیجه تست با موفقیت ثبت شد";
const TEST_UPLOAD_FILE_WARN = "لطفاً ابتدا فایل را بارگذاری کنید.";
const TEST_RESULT_MAX_FILE_COUNT = 10;
// Status step that requires selecting a lab center (در انتظار مراجعه).
const TEST_STATUS_CODE_AWAITING_VISIT = 1;
// Status step that requires an attendance/test date (در انتظار نتیجه تست).
const TEST_STATUS_CODE_AWAITING_RESULT = 2;
// Status step that requires uploading result files (نتیجه ارسال شد).
const TEST_STATUS_CODE_RESULT_SENT = 3;

const GeneticsParticipantsDetailReviewStatusTestResultDrawerContent = ({
  closeDrawerHandler,
  testId,
  code,
  requestTestId,
}: GeneticsParticipantsDetailReviewStatusTestResultDrawerContentProps) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [shouldFetchLabs, setShouldFetchLabs] = useState(false);

  const [form] =
    Form.useForm<GeneticsParticipantsDetailReviewStatusTestResultDrawerContentFormType>();

  /* todo[nima] remove when api will be ready */

  // const hasFile = fileList.length > 0;

  //? ================================ Api Calls ================================

  const [resultSubmit, { isLoading: isResultSubmitLoading }] =
    useMyDoctorSurveyDetailFourthTabChangeStatusMutation();

  const { data: dataStatus, isFetching: isDataStatusLoading } =
    useMyDoctorSurveyDetailFourthTabTestStatusCodeQuery(
      {
        testId: Number(testId),
        code: Number(code) + 1, //  according to logic
      },
      { skip: !testId }
    );

  const { data: centerOptions, isFetching: isCentersLoading } =
    useMyDoctorLabsListAdvanceFilterQuery(
      {
        params: { page: 0, size: 100 },
        body: {
          testIds: [Number(testId)],
        },
      },
      {
        skip:
          !shouldFetchLabs ||
          !testId ||
          dataStatus?.code !== TEST_STATUS_CODE_AWAITING_VISIT,
      }
    );

  const [filesHandler] = useMyDoctorSurveyDetailFourthTabUploadFileMutation();

  //* ================================ Util Functions ================================
  //labs options
  const labsOptions =
    centerOptions?.content?.map((item) => ({
      id: item?.id,
      title: item?.title,
    })) ?? [];

  const handleLabsSelectOpenChange = (open: boolean) => {
    if (open) {
      setShouldFetchLabs(true);
    }
  };

  //? ================================ Submit ================================

  const submitHandler = async (
    values: GeneticsParticipantsDetailReviewStatusTestResultDrawerContentFormType
  ) => {
    if (dataStatus?.code === undefined) {
      return;
    }

    try {
      const request: myDoctorSurveyDetailFourthTabChangeStatusRequest = {
        statusId: dataStatus.id,
        centerId: Number(values?.center?.code),
        testRequestId: Number(requestTestId),
      };

      // CODE 0 → STATUS 1
      if (dataStatus.code === TEST_STATUS_CODE_AWAITING_VISIT) {
        const date = dayjs(values.suggestionDate);
        const time = dayjs(values.suggestionTime);

        request.appointmentDate = date
          .hour(time.hour())
          .minute(time.minute())
          .second(0)
          .millisecond(0)
          .toISOString();
      }

      // CODE 1 → STATUS 2
      if (dataStatus.code === TEST_STATUS_CODE_AWAITING_RESULT) {
        request.attendanceDate = dayjs(values.testDate).toISOString();
      }

      // CODE 2 → STATUS 3
      if (dataStatus.code === TEST_STATUS_CODE_RESULT_SENT) {
        if (!fileList.length) {
          toast.warn(TEST_UPLOAD_FILE_WARN, {
            toastId: TEST_UPLOAD_FILE_WARN,
          });
          return;
        }

        // آپلود فایل‌ها و گرفتن response به صورت string
        const uploadedFiles = await Promise.all(
          fileList.map(async (selectedFile) => {
            const fileToUpload = getUploadFilePayload(selectedFile);

            if (!fileToUpload) {
              throw new Error(`فایل ${selectedFile.name} معتبر نیست.`);
            }

            const formData = new FormData();

            formData.append("file", fileToUpload, selectedFile.name);

            // response API: string
            const fileUrl = await filesHandler({
              file: formData,
            }).unwrap();

            return fileUrl;
          })
        );

        // response ها مستقیماً داخل files
        request.files = uploadedFiles;

        request.description = values.fileName;
      }

      await resultSubmit(request).unwrap();

      toast.success(TEST_RESULT_SUCCESS, {
        toastId: TEST_RESULT_SUCCESS,
      });

      closeDrawerHandler();
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  //? ================================ Loading ================================

  if (isDataStatusLoading) {
    return null;
  }

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={form} onFinish={submitHandler}>
      <CustomDrawerHeader
        closeDrawerHandler={closeDrawerHandler}
        title={
          dataStatus?.code === TEST_STATUS_CODE_AWAITING_VISIT
            ? "تغییر وضعیت به در انتظار مراجعه"
            : dataStatus?.code === TEST_STATUS_CODE_AWAITING_RESULT
              ? "تغییر وضعیت به در انتظار نتیجه تست"
              : dataStatus?.code === TEST_STATUS_CODE_RESULT_SENT
                ? "تغییر وضعیت به نتیجه ارسال شد"
                : ""
        }
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
              ثبت و تایید وضعیت
            </CustomButton>
          </>
        }
      />

      {/* CODE 0 → STATUS 1 تغییر وضعیت به در انتظار مراجعه */}

      {dataStatus?.code === TEST_STATUS_CODE_AWAITING_VISIT && (
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <CustomSelect
              label="آزمایشگاه"
              placeholder="آزمایشگاه منتخب"
              className="mb-0!"
              name="center"
              rules={[REQUIRED_RULE]}
              options={labsOptions}
              form={form}
              isLoading={isCentersLoading}
              onOpenChange={handleLabsSelectOpenChange}
            />
          </Col>

          <Col span={24}>
            <CustomDatePicker
              rules={[REQUIRED_RULE]}
              label="تاریخ پیشنهادی مراجعه"
              placeholder="تاریخ"
              name="suggestionDate"
            />
          </Col>
          <Col span={24} className="mb-10!">
            <CustomTimePicker
              className="[&>div_.ant-form-item-control]:w-full"
              rules={[REQUIRED_RULE]}
              label="ساعت پیشنهادی مراجعه"
              placeholder="ساعت"
              name="suggestionTime"
            />
          </Col>
          <Col span={24} className="mt-4">
            <CustomAlert
              showIcon
              title="ارسال پیامک"
              description="پس از تغییر وضعیت به در انتظار مراجعه، اطلاعات کامل آزمایشگاه شامل آدرس، تاریخ و ساعت مراجعه برای کاربر ارسال می‌شود."
              type="info"
            />
          </Col>
        </Row>
      )}

      {/* CODE 1 → STATUS 2 تغییر وضعیت به در انتظار نتیجه تست */}

      {dataStatus?.code === TEST_STATUS_CODE_AWAITING_RESULT && (
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <CustomDatePicker
              label="تاریخ انجام تست"
              placeholder="تاریخ مراجعه کاربر برای انجام تست و نمونه برداری را وارد کنید."
              rules={[REQUIRED_RULE]}
              name="testDate"
            />
          </Col>
        </Row>
      )}

      {/* CODE 2 → STATUS 3 ارسال نتیجه */}

      {dataStatus?.code === TEST_STATUS_CODE_RESULT_SENT && (
        <>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <CustomInput
                name="fileName"
                label="عنوان فایل"
                placeholder="عنوان فایل را وارد نمایید."
                help="این عنوان به‌همراه نتیجه تست به کاربر نمایش داده می‌شود."
                rules={[REQUIRED_RULE]}
              />
            </Col>

            <Col span={24} className="flex">
              <CustomUploader
                label="بارگذاری فایل"
                name="file"
                rules={[REQUIRED_RULE]}
                fileList={fileList}
                setFileList={setFileList}
                multiple={true}
                validFileFormat={[...TEST_RESULT_VALID_FILE_FORMATS]}
                maxCount={TEST_RESULT_MAX_FILE_COUNT}
                isDisabled={fileList.length >= TEST_RESULT_MAX_FILE_COUNT}
                classNameOuterDiv="w-full"
                className="[&_.ant-upload-select]:min-w-22.5! [&_.custom-upload-btn]:min-w-22.5! [&_.download-btn-container]:min-w-22.5! [&_.pdf-holder]:min-w-22.5! [&_.pdf-uploaded-container]:min-w-22.5!"
                uploaderText={
                  <div className="flex items-center justify-center gap-2">
                    <div className="generic-template-upload-logo">
                      <AiOutlinePlus />
                    </div>

                    <div className="">بارگذاری</div>
                  </div>
                }
                hasUploaderIcon={false}
                isReadOnly={false}
              />
            </Col>

            {/* todo[nima] remove when api will be ready */}
            {/* <Col span={24} className="mt-30">
              <CustomButton
                className="w-full"
                type="primary"
                htmlType="button"
                loading={isFileLoading}
                onClick={uploadFilesHandler}
              >
                ثبت فایل
              </CustomButton>
            </Col> */}

            <Col span={24}>
              <CustomAlert
                title="ارسال پیامک"
                description="پس از تغییر وضعیت به «نتیجه ارسال شد»، پیامکی جهت اطلاع‌رسانی برای کاربر ارسال می‌شود."
                showIcon
              />
            </Col>
          </Row>

          {/* todo[nima] remove when api will be ready */}
          {/* فقط در صورت وجود فایل نمایش بده */}

          {/* <CustomDivider text="فایل های آپلود شده" />

          {hasFile ? (
            <Row gutter={[16, 16]}>
              <Col span={24} className="flex! items-end!">
                <SingleVerticalWithCol
                  xl={21}
                  lg={21}
                  md={20}
                  sm={20}
                  xs={19}
                  label="فایل نتیجه تست"
                  value={fileList[0]?.name ?? ""}
                  prefix={<GrAttachment size={16} color={NEUTRAL_07} />}
                  suffix={
                    fileList[0]?.url ? (
                      <Link
                        to={fileList[0].url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="body-regular">دانلود</span>
                      </Link>
                    ) : (
                      <span className="body-regular">دانلود</span>
                    )
                  }
                  className="text-primary-6! flex overflow-hidden!"
                  valueClassName="truncate"
                />

                <Col lg={3} md={4} sm={4} xs={5} className="flex! items-center! gap-1!">
                  <CustomButton
                    danger
                    className="flex h-6! w-6! items-center justify-center rounded-sm! p-0!"
                    onClick={() => setFileList([])}
                  >
                    <PiTrashSimple />
                  </CustomButton>
                </Col>
              </Col>
            </Row>
          ) : (
            <CustomEmpty description="هنوز فایلی بارگذاری نشده است." />
          )} */}
        </>
      )}
    </Form>
  );
};

export default GeneticsParticipantsDetailReviewStatusTestResultDrawerContent;
