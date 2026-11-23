import { Col, Form, Row } from "antd";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import { selectDefaultValueGenerator } from "@infra/helpers/utils";
import { useCreateSystematicContractTermMutation } from "@infra/states/redux/Apis/contracts/templateSettings/templateSettings";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import {
  TemplateSettingAddDrawerContentProps,
  TemplateSettingAddFormType,
} from "./@types/@templateSettingAddDrawerContentTypes";

const TemplateSettingAddDrawerContent = ({
  closeDrawerHandler,
  contractTermsTypeData,
  mainForm,
  getContractTermsData,
}: TemplateSettingAddDrawerContentProps) => {
  const [addForm] = Form.useForm<TemplateSettingAddFormType>();

  //? ================================  Api Calls ================================
  const [
    createSystematicContractTerm,
    { isLoading: isCreateSystematicContractTermLoading },
  ] = useCreateSystematicContractTermMutation();

  //* ================================ Util Functions ================================
  const changeTermHandler = () => {
    addForm.setFieldsValue({
      title: undefined,
      description: undefined,
    });
  };

  const submitTemplateHandler = (value: TemplateSettingAddFormType) => {
    const requestBody = {
      type: value?.term?.item?.name,
      clause: value?.description,
      faTitle: value?.title,
    };

    createSystematicContractTerm(requestBody)
      .unwrap()
      .then(() => {
        getContractTermsData(value?.term?.item?.name);

        mainForm.setFieldsValue({
          rules: selectDefaultValueGenerator(value?.term),
        });

        closeDrawerHandler();
      });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={addForm} onFinish={submitTemplateHandler}>
      <CustomDrawerHeader
        title="افزودن قالب پیش فرض"
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <>
            <CustomButton danger type="default" onClick={closeDrawerHandler}>
              انصراف
            </CustomButton>
            <CustomButton
              type="primary"
              htmlType="submit"
              loading={isCreateSystematicContractTermLoading}
            >
              ثبت قالب
            </CustomButton>
          </>
        }
      />
      <Row gutter={[16, 16]} className="flex items-center">
        <Col span={24}>
          <CustomSelect
            name="term"
            options={contractTermsTypeData}
            label="بند مرتبط به قالب"
            rules={[REQUIRED_RULE]}
            onChange={changeTermHandler}
            form={addForm}
          />
        </Col>
        <Col span={24}>
          <CustomInput
            name="title"
            label="عنوان قالب"
            placeholder="عنوان قالب"
            rules={[REQUIRED_RULE]}
          />
        </Col>
      </Row>
      <CustomTextArea
        label="متن قالب پیش فرض"
        name="description"
        placeholder="توضیحات"
        rules={[REQUIRED_RULE]}
      />
    </Form>
  );
};
export default TemplateSettingAddDrawerContent;
