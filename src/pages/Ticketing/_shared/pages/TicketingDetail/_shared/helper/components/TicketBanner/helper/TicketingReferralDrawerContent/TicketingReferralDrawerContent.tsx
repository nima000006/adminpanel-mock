import { useState } from "react";

import { Col, Form, Row } from "antd";
import { useWatch } from "antd/es/form/Form";

import { CustomButton, CustomSelect, CustomTextArea } from "@components/CustomInputs";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import {
  useLazyGetAllSamimServiceQuery,
  useLazyGetAllTopicBySamimServicesQuery,
} from "@infra/states/redux/Apis/ticketing/ticketing/ticketingApis";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import {
  GetAllSamimServiceResponse,
  GetAllTopicBySamimServicesResponse,
} from "@pages/Ticketing/_shared/@ticketingTypes";
import {
  TicketingReferralDrawerContentFormValues,
  TicketingReferralDrawerContentProps,
} from "@pages/Ticketing/_shared/pages/TicketingDetail/_shared/helper/components/TicketBanner/helper/TicketingReferralDrawerContent/@types/@ticketingReferralDrawerContent";

const TicketingReferralDrawerContent = ({
  closeDrawerHandler,
  onFinish,
  isSubmitting,
}: TicketingReferralDrawerContentProps) => {
  const [form] = Form.useForm<TicketingReferralDrawerContentFormValues>();
  const [topics, setTopics] = useState<GetAllTopicBySamimServicesResponse>();
  const [services, setServices] = useState<GetAllSamimServiceResponse>();

  const selectedServices = useWatch("service", form);

  //? ================================  Api Calls ================================
  const [
    getAllTopicBySamimServices,
    { isFetching: isGetAllTopicBySamimServicesLoading },
  ] = useLazyGetAllTopicBySamimServicesQuery();

  const [
    getAllSamimService,
    { isFetching: isGetAllSamimServiceLoading, isSuccess: isGetAllSamimServiceSuccess },
  ] = useLazyGetAllSamimServiceQuery();

  //* ================================ Util Functions ================================

  const getAllSamimServiceHandler = () => {
    if (!isGetAllSamimServiceSuccess) {
      getAllSamimService()
        .unwrap()
        .then((res) => setServices(res));
    }
  };

  // when service selected
  const getTopicsByServiceHandler = (value: unknown) => {
    const selectedValues = Array.isArray(value) ? value : [];

    setTopics([]);
    form.setFieldsValue({ topic: undefined });

    if (selectedValues?.length > 0) {
      getAllTopicBySamimServices({
        serviceRequest: selectedValues?.map((value) => value?.item?.name)?.join(","),
      })
        .unwrap()
        .then((res) => setTopics(res));
    }
  };

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <div>
      <CustomDrawerHeader
        title="ارجاع تیکت"
        leftSideContent={
          <>
            <CustomButton onClick={closeDrawerHandler}>انصراف</CustomButton>
            <CustomButton
              type="primary"
              onClick={() => form.submit()}
              loading={isSubmitting}
            >
              ارجاع دادن
            </CustomButton>
          </>
        }
        closeDrawerHandler={closeDrawerHandler}
      />
      <Form form={form} onFinish={onFinish} layout="vertical">
        <CustomAlert
          title="راهنما"
          description="به منظور ارائه خدمات بهتر به کاربران، در صورتی که موضوع تیکت به تخصص بخش دیگری مرتبط باشد، خواهشمند است با تغییر موضوع و سرویس با ارسال آن به بخش مربوطه، در تسریع روند پاسخگویی همکاری فرمایید."
          showIcon
          type="info"
        />
        <Row className="mt-10">
          <Col span="24">
            <CustomSelect
              label="سرویس"
              name="service"
              mode="multiple"
              rules={[REQUIRED_RULE]}
              options={services}
              loading={isGetAllSamimServiceLoading}
              onClick={getAllSamimServiceHandler}
              onChange={(_, value) => getTopicsByServiceHandler(value)}
              allowClear
            />
          </Col>
          <Col span="24">
            <CustomSelect
              label="موضوع"
              name="topic"
              rules={[REQUIRED_RULE]}
              options={topics}
              loading={isGetAllTopicBySamimServicesLoading}
              disabled={selectedServices?.length > 0 ? false : true}
              allowClear
            />
          </Col>
          <Col span="24">
            <CustomTextArea
              label="توضیحات (ثبت به عنوان یادداشت)"
              name="description"
              placeholder="متن توضیحات را وارد نمایید. متن توضیحات به کارشناسان بعدی در قسمت یادداشت ها نمایش داده خواهد شد."
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default TicketingReferralDrawerContent;
