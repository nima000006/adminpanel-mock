import { useEffect, useState } from "react";

import { Col, Form, Row } from "antd";

import { CustomSwitch } from "@components/CustomInputs";
import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomCheckboxGroup from "@components/CustomInputs/CustomCheckboxGroup/CustomCheckboxGroup";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import {
  useBasicInfoCreateTopicMutation,
  useEditTopicInfoMutation,
  useLazyGetAllSamimServiceQuery,
  useLazyGetPriorityQuery,
  useLazyGetTopicInfoQuery,
} from "@infra/states/redux/Apis/ticketing/ticketing/ticketingApis";
import {
  ARABIC_LETTERS_RULE,
  ENGLISH_LETTERS_ONLY_RULE,
  MAX_MIN_LENGTH_RULE,
  PERSIAN_LETTERS_RULE,
  REQUIRED_RULE,
} from "@infra/validation/validationSchema";
import { serviceOptions } from "@pages/Finance/Accountants/_shared/utils";
import {
  GetAllSamimServiceResponse,
  GetPriorityResponse,
} from "@pages/Ticketing/_shared/@ticketingTypes";

import {
  AddIssueSubjectDrawerContentProps,
  formValuesType,
  getTopicInfoResponse,
} from "./@types/@AddIssueSubjectDrawerContentProps";

import "./_modifyIssueSubjectDrawerContent.scss";

const ModifyIssueSubjectDrawerContent = ({
  closeDrawer,
  refetchList,
  topicId,
}: AddIssueSubjectDrawerContentProps) => {
  const [services, setServices] = useState<GetAllSamimServiceResponse>();
  const [priority, setPriority] = useState<GetPriorityResponse>();
  const [topicInfo, setTopicInfo] = useState<getTopicInfoResponse>();

  const isEditMode = topicId !== undefined;

  const [isActive, setIsActive] = useState(true);

  const [form] = Form.useForm();

  const changeSwitchHandler = (checked: boolean) => {
    setIsActive(checked);
  };

  //? ================================ API ================================
  // services
  const [
    getAllSamimService,
    { isFetching: isGetAllSamimServiceLoading, isSuccess: isGetAllSamimServiceSuccess },
  ] = useLazyGetAllSamimServiceQuery();

  // priority
  const [
    getPriority,
    { isFetching: isGetPriorityLoading, isSuccess: isGetPrioritySuccess },
  ] = useLazyGetPriorityQuery();

  // add topic
  const [addTopic, { isLoading: isAddTopicLoading }] = useBasicInfoCreateTopicMutation();

  // get topic info
  const [getTopicInfo, { isFetching: isGetTopicInfoLoading }] =
    useLazyGetTopicInfoQuery();

  // edit topic
  const [editTopicInfo, { isLoading: isEditTopicInfoLoading }] =
    useEditTopicInfoMutation();

  //? ================================ Effects ================================

  useEffect(() => {
    if (topicId !== undefined) {
      getTopicInfo({ topicId })
        .unwrap()
        .then((res) => setTopicInfo(res));
    }
  }, [topicId, getTopicInfo]);

  useEffect(() => {
    if (!topicInfo) return;

    const selectedViews = [] as string[];
    if (topicInfo.viewStatus?.name === "ALL") {
      selectedViews.push("INTERNAL", "EXTERNAL");
    } else if (topicInfo.viewStatus?.name) {
      selectedViews.push(topicInfo.viewStatus.name);
    }

    setIsActive(topicInfo.active);
    form.setFieldsValue({
      priority: {
        label: topicInfo?.priority?.title,
        value: String(topicInfo?.priority?.id),
        key: topicInfo?.priority?.id,
        code: topicInfo?.priority?.id,
        children: topicInfo?.priority?.title,
        item: topicInfo?.priority,
      },
      description: topicInfo?.description,
      viewStatus: selectedViews,
      active: topicInfo?.active,
    });
  }, [form, getTopicInfo, topicInfo]);

  //* ================================ Util Functions ================================

  // services
  const getAllSamimServiceHandler = () => {
    if (!isGetAllSamimServiceSuccess) {
      getAllSamimService()
        .unwrap()
        .then((res) => setServices(res));
    }
  };

  // priority
  const getPriorityHandler = () => {
    if (!isGetPrioritySuccess) {
      getPriority()
        .unwrap()
        .then((res) => setPriority(res));
    }
  };

  const handleSubmit = (values: formValuesType) => {
    let viewStatus = "";
    const selectedViews = values?.viewStatus || [];

    if (selectedViews.includes("INTERNAL") && selectedViews.includes("EXTERNAL")) {
      viewStatus = "ALL";
    } else if (selectedViews.includes("INTERNAL")) {
      viewStatus = "INTERNAL";
    } else if (selectedViews.includes("EXTERNAL")) {
      viewStatus = "EXTERNAL";
    }

    if (isEditMode && topicId !== undefined) {
      editTopicInfo({
        params: { topicId },
        body: {
          ticketPriority: values?.priority?.item?.name,
          ...(values?.description && { faDescription: values?.description }),
          viewStatus,
          active: values?.active ?? isActive,
        },
      })
        .unwrap()
        .then(addTopicIsSuccess);
      return;
    }

    addTopic({
      body: {
        samimService: values?.service?.item?.name ?? "",
        faTitle: values?.faTitle ?? "",
        enTitle: values?.enTitle ?? "",
        arTitle: values?.arTitle ?? "",
        ticketPriority: values?.priority?.item?.name ?? "",
        ...(values?.description && { faDescription: values?.description }),
        viewStatus,
        active: values?.active ?? isActive,
      },
    })
      .unwrap()
      .then(addTopicIsSuccess);
  };

  // success
  const addTopicIsSuccess = () => {
    closeDrawer();
    refetchList();
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <Form form={form} onFinish={handleSubmit}>
      <CustomDrawerHeader
        title={isEditMode ? "ویرایش موضوع مشکلات" : "افزودن موضوع مشکلات"}
        closeDrawerHandler={closeDrawer}
        leftSideContent={
          <div className="flex gap-3">
            <CustomSwitch
              checked={isActive}
              defaultChecked={true}
              checkedChildren="قابل نمایش"
              unCheckedChildren="عدم نمایش"
              valuePropName="active"
              initialValue={topicInfo?.active ?? true}
              onChange={changeSwitchHandler}
            />
            <CustomButton onClick={closeDrawer}>انصراف</CustomButton>
            <CustomButton
              type="primary"
              htmlType="submit"
              loading={isEditMode ? isEditTopicInfoLoading : isAddTopicLoading}
            >
              {isEditMode ? "اعمال تغییرات" : "ثبت و افزودن"}
            </CustomButton>
          </div>
        }
      />
      <Row gutter={[16, 16]}>
        {!isEditMode ? (
          <>
            <Col span={24}>
              <CustomSelect
                className="mb-0!"
                form={form}
                rules={[REQUIRED_RULE]}
                label="سرویس"
                name="service"
                options={services}
                loading={isGetAllSamimServiceLoading}
                placeholder="انتخاب کنید"
                onClick={getAllSamimServiceHandler}
              />
            </Col>
            <Col span={24}>
              <CustomInput
                rules={[REQUIRED_RULE, MAX_MIN_LENGTH_RULE(2, 256), PERSIAN_LETTERS_RULE]}
                label="موضوع مشکل (فارسی)"
                name="faTitle"
                placeholder="موضوع مشکل را به فارسی وارد نمایید."
              />
            </Col>
            <Col span={24}>
              <CustomInput
                rules={[
                  REQUIRED_RULE,
                  MAX_MIN_LENGTH_RULE(2, 256),
                  ENGLISH_LETTERS_ONLY_RULE,
                ]}
                label="موضوع مشکل (انگلیسی) "
                name="enTitle"
                placeholder="Enter the problem subject in English"
              />
            </Col>
            <Col span={24}>
              <CustomInput
                rules={[REQUIRED_RULE, MAX_MIN_LENGTH_RULE(2, 256), ARABIC_LETTERS_RULE]}
                label="موضوع مشکل (عربی)"
                name="arTitle"
                placeholder="أدخل موضوع المشكلة باللغة العربية."
              />
            </Col>
          </>
        ) : (
          <Col span={24}>
            <Div loading={isGetTopicInfoLoading} className="flex flex-col gap-3">
              <SingleVerticalWithCol
                span={24}
                label="سرویس"
                value={
                  serviceOptions.find(
                    (service) => service.name === topicInfo?.samimService?.name
                  )?.title ?? "-"
                }
              />
              <SingleVerticalWithCol
                span={24}
                label="موضوع مشکل (فارسی)"
                value={topicInfo?.faTitle}
              />
              <SingleVerticalWithCol
                span={24}
                label="موضوع مشکل (انگلیسی)"
                value={topicInfo?.enTitle}
              />
              <SingleVerticalWithCol
                span={24}
                label="موضوع مشکل (عربی)"
                value={topicInfo?.arTitle}
              />
            </Div>
          </Col>
        )}

        <Col span={24}>
          <CustomSelect
            className="mb-0!"
            form={form}
            rules={[REQUIRED_RULE]}
            label="اولویت پیشفرض"
            name="priority"
            loading={isGetPriorityLoading}
            options={priority}
            placeholder="انتخاب کنید"
            onClick={getPriorityHandler}
          />
        </Col>
        <Col span={24}>
          <CustomTextArea
            label="توضیحات (اختیاری)"
            name="description"
            placeholder="توضیحات را وارد نمایید."
            rules={[MAX_MIN_LENGTH_RULE(8, 1024)]}
          />
        </Col>
        <Col span={24}>
          <CustomCheckboxGroup
            containerClassName="add-issue-subject-custom-checkbox-group-container"
            name="viewStatus"
            rules={[REQUIRED_RULE]}
            label="نمایش در"
            options={[
              { label: "تیکت داخلی (استفاده در پنل ادمین)", value: "INTERNAL" },
              { label: "تیکت کاربران ( استفاده در اپلیکیشن)", value: "EXTERNAL" },
            ]}
          />
        </Col>
      </Row>
    </Form>
  );
};

export default ModifyIssueSubjectDrawerContent;
