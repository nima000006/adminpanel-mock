import { useEffect } from "react";

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
  TemplateSettingCopyDrawerContentProps,
  TemplateSettingCopyFormType,
} from "./@types/@templateSettingCopyDrawerContentType";

const TemplateSettingCopyDrawerContent = ({
  closeDrawerHandler,
  defaultData,
  relatedTerm,
  contractTermsTypeData,
  mainForm,
  getContractTermsData,
}: TemplateSettingCopyDrawerContentProps) => {
  const [copyForm] = Form.useForm<TemplateSettingCopyFormType>();

  //? ================================  Api Calls ================================
  const [
    createSystematicContractTerm,
    { isLoading: isCreateSystematicContractTermLoading },
  ] = useCreateSystematicContractTermMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    copyForm.setFieldsValue({
      title: defaultData?.title,
      description: defaultData?.clause,
      term: relatedTerm,
    });
  }, []);

  //* ================================ Util Functions ================================
  const changeTermHandler = () => {
    copyForm.setFieldsValue({
      title: undefined,
      description: undefined,
    });
  };

  const submitTemplateHandler = (value: TemplateSettingCopyFormType) => {
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
    <Form form={copyForm} onFinish={submitTemplateHandler}>
      <CustomDrawerHeader
        title="کپی قالب پیش فرض"
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
            form={copyForm}
            onChange={changeTermHandler}
          />
        </Col>
        <Col span={24}>
          <CustomInput
            label="عنوان جدید قالب"
            name="title"
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
export default TemplateSettingCopyDrawerContent;
