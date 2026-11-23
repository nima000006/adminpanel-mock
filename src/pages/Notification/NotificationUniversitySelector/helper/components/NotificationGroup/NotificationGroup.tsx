import { useEffect, useState } from "react";

import { Button, Col, Form, RadioChangeEvent, Row, Switch } from "antd";
import { AiOutlineSend } from "react-icons/ai";
import { useSearchParams } from "react-router";

import { useLazyGetAllBranchesQuery } from "@infra/states/redux/Apis/business/business/businessApi";

import { ItemsProps } from "./@types/@notificationGroup";
import CustomCard from "../../../../../../components/CustomCard/CustomCard";
import CustomInput from "../../../../../../components/CustomInputs/CustomInput/CustomInput";
import CustomRadioGroup from "../../../../../../components/CustomInputs/CustomRadioGroup/CustomRadioGroup";
import CustomSelect from "../../../../../../components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "../../../../../../components/CustomInputs/CustomTextArea/CustomTextArea";
import SubmitButton from "../../../../../../components/CustomInputs/SubmitButton/SubmitButton";
import CustomDivider from "../../../../../../components/Renderers/CustomDivider/CustomDivider";
import { selectDefaultValueGenerator } from "../../../../../../infrastructure/helpers/utils";
import { SINGLE } from "../../../../../../infrastructure/models/notification";
import {
  CUSTOM_REQUIRED_RULE,
  REQUIRED_RULE,
} from "../../../../../../infrastructure/validation/validationSchema";

import "./_notificationGroup.scss";

const NotificationGroup = ({ setActiveKey, setIsTableShow }: ItemsProps) => {
  const [messageRadioOption, setMessageRadioOption] = useState<"1" | "2" | "3">("1");
  const [isOpenFirstSwitch, setIsOpenFirstSwitch] = useState(false);
  const [isOpenSecondSwitch, setIsOpenSecondSwitch] = useState(false);
  const [isOpenThirdSwitch, setIsOpenThirdSwitch] = useState(false);
  const [searchParams] = useSearchParams();
  const { id, label } = Object.fromEntries([...searchParams]);

  const [contentForm] = Form.useForm();
  const [getAllUniversity, { data: universityData, isLoading: isUniversityDataLoading }] =
    useLazyGetAllBranchesQuery();

  useEffect(() => {
    getAllUniversity();
  }, []);

  useEffect(() => {
    contentForm.setFieldsValue({
      product: selectDefaultValueGenerator({ id: +id, title: label }),
    });
  }, [id, label]);

  const sendNotificationHandler = () => {};
  // const handleChangeUni = (_: string[], options: any) => {
  //   setUniName(options);
  // };

  //! change switch
  const handelFirstSwitch = (checked: boolean) => {
    setIsOpenFirstSwitch(checked);
  };
  const handelSecondSwitch = (checked: boolean) => {
    setIsOpenSecondSwitch(checked);
  };
  const handelThirdSwitch = (checked: boolean) => {
    setIsOpenThirdSwitch(checked);
  };
  //! on radio message change
  const onMessageRadioOptionChange = (e: RadioChangeEvent) => {
    setMessageRadioOption(e.target.value);
  };
  return (
    <Form
      className="notification-group-container"
      onFinish={sendNotificationHandler}
      form={contentForm}
    >
      <CustomDivider
        text="جستجو کاربر"
        extraContent={
          <Button
            type="primary"
            size="small"
            className="return-to-search-btn"
            onClick={() => {
              setActiveKey(SINGLE);
              setIsTableShow(false);
            }}
          >
            برگشت به جستجو
          </Button>
        }
      />
      <CustomCard>
        <>
          <Row gutter={[12, 12]}>
            <Col span={12}>
              <CustomSelect
                form={contentForm}
                label="دانشگاه"
                name="university"
                rules={[CUSTOM_REQUIRED_RULE("لطفا دانشگاه مورد نظر را انتخاب کنید")]}
                options={universityData ? universityData : []}
                placeholder="انتخاب کنید"
                isLoading={isUniversityDataLoading}
                hasVerticalLabel={false}
              />
            </Col>
            <Col span={12}>
              <CustomSelect
                options={[]}
                placeholder="انتخاب کنید"
                disabled={true}
                // rules={[REQUIRED_RULE]}
                label="مقطع"
                name="level"
                hasVerticalLabel={false}
              />
            </Col>
            <Col span={12}>
              <CustomSelect
                options={[]}
                placeholder="انتخاب کنید"
                disabled={true}
                // rules={[REQUIRED_RULE]}
                label="رشته"
                name="field"
                hasVerticalLabel={false}
              />
            </Col>
            <Col span={12}>
              <CustomSelect
                options={[]}
                placeholder="انتخاب کنید"
                disabled={true}
                // rules={[REQUIRED_RULE]}
                label="سال ورود"
                name="entranceYear"
                hasVerticalLabel={false}
              />
            </Col>
            {/* <Col span={6}>
              <Button type="primary" htmlType="submit" className="filter-submit-btn">
                اعمال فیلتر
              </Button>
            </Col> */}
          </Row>
        </>
      </CustomCard>
      {/* content */}

      <div className="content-form">
        <CustomCard className="message-container">
          <Row gutter={[12, 12]}>
            <Col span={12}>
              <CustomSelect
                name="product"
                label="محصول"
                options={[]}
                placeholder="انتخاب کنید"
                defaultValue={label}
                disabled={true}
                form={contentForm}
              />
            </Col>
            <Col span={12}>
              <CustomInput
                type="text"
                label="عنوان اعلان"
                name="title"
                placeholder="عنوان اعلان"
              />
            </Col>
            <Col span={24}>
              <CustomTextArea
                showCount={true}
                // maxLength={100}
                label="پیام ارسالی"
                name="message"
                placeholder="پیام ارسالی"
              />
            </Col>
            <Col span={24}>
              <CustomRadioGroup
                label="نوع"
                name="messageRadio"
                rules={[REQUIRED_RULE]}
                options={[
                  {
                    label: "پیامک",
                    value: "1",
                  },
                  {
                    label: "ایمیل",
                    value: "2",
                  },
                  {
                    label: "اعلان",
                    value: "3",
                  },
                ]}
                value={messageRadioOption}
                onChange={onMessageRadioOptionChange}
                hasVerticalLabel={true}
              />
            </Col>
          </Row>
        </CustomCard>
        {/* مقدار اول */}
        <CustomCard>
          <CustomDivider
            text="مقدار اول"
            extraContent={
              <div className="switch-container">
                <Switch onChange={handelFirstSwitch} />
              </div>
            }
          />
          {isOpenFirstSwitch ? (
            <>
              <CustomInput
                type="text"
                label="عنوان کد"
                name="codeTitleFirst"
                placeholder="عنوان"
              />
              <CustomInput type="text" label="کد" name="codeFirst" placeholder="کد" />
            </>
          ) : null}
        </CustomCard>
        {/*مقدار دوم */}
        <CustomCard>
          <div>
            <CustomDivider
              text="مقدار دوم"
              extraContent={
                <div className="switch-container">
                  <Switch onChange={handelSecondSwitch} />
                </div>
              }
            />
          </div>
          {isOpenSecondSwitch ? (
            <>
              <CustomInput
                type="text"
                label="عنوان کد"
                name="codeTitleSecond"
                placeholder="عنوان"
              />
              <CustomInput type="text" label="کد" name="codeSecond" placeholder="کد" />
            </>
          ) : null}
        </CustomCard>
        {/* مقدار سوم */}
        <CustomCard>
          <CustomDivider
            text="مقدار سوم"
            extraContent={
              <div className="switch-container">
                <Switch onChange={handelThirdSwitch} />
              </div>
            }
          />
          {isOpenThirdSwitch ? (
            <>
              <CustomInput
                type="text"
                label="عنوان کد"
                name="codeTitleThird"
                placeholder="عنوان"
              />
              <CustomInput type="text" label="کد" name="codeThird" placeholder="کد" />
            </>
          ) : null}
        </CustomCard>
        <div>
          <SubmitButton
            form={contentForm}
            label="ارسال اعلان"
            type="primary"
            icon={<AiOutlineSend />}
          />
        </div>
      </div>
    </Form>
  );
};
export default NotificationGroup;
