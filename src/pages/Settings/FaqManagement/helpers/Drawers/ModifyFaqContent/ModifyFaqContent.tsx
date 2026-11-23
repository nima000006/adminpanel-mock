import { Col, Form, Row } from "antd";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import { useCreateFaqMutation } from "@infra/states/redux/Apis/business/serviceManagementService/serviceManagementService";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { useFaqManagerContext } from "@pages/Settings/FaqManagement/State/useFaqManagerContext";
import "./_modifyFaqContent.scss";

type ModifyFaqContentProps = {
  closeDrawerHandler: () => void;
};

const ModifyFaqContent = ({ closeDrawerHandler }: ModifyFaqContentProps) => {
  const [form] = Form.useForm();
  const { state, drawerUpdated } = useFaqManagerContext();

  //? ================================  Api Calls ================================
  const [createService, { isLoading: isCreateServiceDataLoading }] =
    useCreateFaqMutation();

  //* ================================ Util Functions ================================

  // drawerCloseHandler
  const drawerCloseHandler = () => {
    closeDrawerHandler();
  };

  // onCreateServiceSuccess
  const onCreateServiceSuccess = async () => {
    drawerCloseHandler();
    drawerUpdated();
    resetDrawer();
  };

  // resetDrawer
  const resetDrawer = () => {
    form?.resetFields();
  };

  // onSubmit
  const onSubmit = () => {
    form.validateFields().then((values) => {
      createService({
        faQuestion: values?.faQuestion,
        faAnswer: values?.faAnswer,
        enQuestion: values?.enQuestion,
        enAnswer: values?.enAnswer,
        arQuestion: values?.arQuestion,
        arAnswer: values?.arAnswer,
        orderId: values?.orderId,
        serviceId: state?.activeApps?.id,
      })
        .unwrap()
        .then(onCreateServiceSuccess);
    });
  };

  return (
    <Form form={form}>
      {/* ---------------------------------- Header ---------------------------------- */}
      <CustomDrawerHeader
        hasLeftSide
        leftSideContent={
          <>
            <CustomButton onClick={drawerCloseHandler}>انصراف</CustomButton>
            <CustomButton
              type="primary"
              loading={isCreateServiceDataLoading}
              onClick={onSubmit}
            >
              ثبت
            </CustomButton>
          </>
        }
        title="ایجاد سوال جدید"
        closeDrawerHandler={drawerCloseHandler}
      />

      {/* ---------------------------------- Content ---------------------------------- */}
      <div className="modify-faq-context-container">
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <CustomInput
              label="شماره"
              placeholder="شماره ترتیب "
              name="orderId"
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col lg={12} md={12} sm={12} xs={24}>
            <CustomInput
              label="عنوان فارسی سوال"
              placeholder="عنوان فارسی سوال"
              name="faQuestion"
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col lg={12} md={12} sm={12} xs={24}>
            <CustomInput
              label="عنوان فارسی جواب"
              placeholder="عنوان فارسی جواب"
              name="faAnswer"
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col lg={12} md={12} sm={12} xs={24}>
            <CustomInput
              label="عنوان انگلیسی سوال"
              placeholder="عنوان انگلیسی سوال"
              name="enQuestion"
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col lg={12} md={12} sm={12} xs={24}>
            <CustomInput
              label="عنوان انگلیسی جواب"
              placeholder="عنوان انگلیسی جواب"
              name="enAnswer"
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col lg={12} md={12} sm={12} xs={24}>
            <CustomInput
              label="عنوان عربی سوال"
              placeholder="عنوان عربی سوال"
              name="arQuestion"
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col lg={12} md={12} sm={12} xs={24}>
            <CustomInput
              label="عنوان عربی جواب"
              placeholder="عنوان عربی جواب"
              name="arAnswer"
              rules={[REQUIRED_RULE]}
            />
          </Col>
        </Row>
      </div>
    </Form>
  );
};

export default ModifyFaqContent;
