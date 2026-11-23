import { Col, Form, Row } from "antd";
import { toast } from "react-toastify";

import { CustomButton, CustomSelect, CustomTextArea } from "@components/CustomInputs";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useMyDoctorSurveyDetailFourthTabChangeStatusMutation,
  useMyDoctorSurveyDetailFourthTabTestStatusQuery,
} from "@infra/states/redux/Apis/myDoctor/genetic/geneticApis";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import {
  GeneticsParticipantsDetailReviewStatusConsultationDrawerContentFormType,
  GeneticsParticipantsDetailReviewStatusConsultationDrawerContentProps,
} from "@pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsDetail/helper/components/GeneticsParticipantsDetailReviewStatus/components/GeneticsParticipantsDetailReviewStatusConsultation/helper/component/GeneticsParticipantsDetailReviewStatusConsultationDrawerContent/@types/@geneticsParticipantsDetailReviewStatusConsultationDrawerContent";

const TEST_RESULT_SUCCESS = "نتیجه مشاوره با موفقیت ثبت شد";

const GeneticsParticipantsDetailReviewStatusConsultationDrawerContent = ({
  closeDrawerHandler,
  testId,
  currentStatusId,
}: GeneticsParticipantsDetailReviewStatusConsultationDrawerContentProps) => {
  const [form] =
    Form.useForm<GeneticsParticipantsDetailReviewStatusConsultationDrawerContentFormType>();

  const { params } = useQueryParams();

  //? ================================  Api Calls ================================
  const [resultSubmit, { isLoading: isResultSubmitLoading }] =
    useMyDoctorSurveyDetailFourthTabChangeStatusMutation();

  const { data: Results, isLoading: isGetResultsLoading } =
    useMyDoctorSurveyDetailFourthTabTestStatusQuery(
      { testId: Number(testId) },
      { skip: !testId }
    );

  const filteredResults = Results?.filter((option) => option.id !== currentStatusId);

  //* ================================ Util Functions ================================
  const onSubmitHandler = (
    values: GeneticsParticipantsDetailReviewStatusConsultationDrawerContentFormType
  ) => {
    resultSubmit({
      description: values.description,
      statusId: Number(values?.result?.code),
      testRequestId: Number(params?.requestTestId),
    })
      .unwrap()
      .then(() => {
        toast.success(TEST_RESULT_SUCCESS, {
          toastId: TEST_RESULT_SUCCESS,
        });
        closeDrawerHandler();
      });
  };
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={form} onFinish={onSubmitHandler}>
      <CustomDrawerHeader
        closeDrawerHandler={closeDrawerHandler}
        title="ثبت نتیجه مشاوره"
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
              ثبت و تایید نتیجه
            </CustomButton>
          </>
        }
      />
      <Row gutter={[16, 16]}>
        <Col xl={24} lg={24} md={24} xs={24}>
          <CustomSelect
            label="نتیجه مشاوره"
            options={filteredResults}
            loading={isGetResultsLoading}
            name="result"
            rules={[REQUIRED_RULE]}
            form={form}
          />
        </Col>
        <Col xl={24} lg={24} md={24} xs={24}>
          <CustomTextArea name="description" label="توضیحات" placeholder="متن کاربر" />
        </Col>
      </Row>
    </Form>
  );
};
export default GeneticsParticipantsDetailReviewStatusConsultationDrawerContent;
