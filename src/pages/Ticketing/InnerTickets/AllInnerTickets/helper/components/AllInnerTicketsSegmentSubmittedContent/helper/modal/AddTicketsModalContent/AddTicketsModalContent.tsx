import { useEffect, useState } from "react";

import { Col, Form, Modal, Row } from "antd";

import { CustomButton, CustomInput } from "@components/CustomInputs";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import {
  useLazyGetActiveBusinessListQuery,
  useLazyGetBranchListByProvinceCityBusinessQuery,
} from "@infra/states/redux/Apis/business/businessRequest/businessRequest";
import {
  useAddInnerTicketMutation,
  useLazyGetAllSamimServiceQuery,
  useLazyGetAttachTicketQuery,
  useLazyGetInnerTopicBySamimServicesQuery,
  useLazyGetTicketingAgentsListByTopicIdAndBranchIdQuery,
} from "@infra/states/redux/Apis/ticketing/ticketing/ticketingApis";
import { MAX_MIN_LENGTH_RULE, REQUIRED_RULE } from "@infra/validation/validationSchema";
import { GetInnerTopicBySamimServicesResponse } from "@pages/Ticketing/InnerTickets/_shared/@innerTicketsTypes";
import {
  AddInnerTicketFormType,
  AddTicketsModalContentProps,
  GetAttachTicketResponse,
  InnerTicketSelectType,
} from "@pages/Ticketing/InnerTickets/AllInnerTickets/helper/components/AllInnerTicketsSegmentSubmittedContent/helper/modal/AddTicketsModalContent/@types/@addTicketsModalContentTypes";

const AddTicketsModalContent = ({
  closeModal,
  refetchList,
  isModalOpen,
  refreshCount,
}: AddTicketsModalContentProps) => {
  const [services, setServices] = useState<string | null>(null);
  const [selectBusiness, setSelectBusiness] = useState<number | null>(null);
  const [selectBranch, setSelectBranch] = useState<number | null>(null);
  const [topicData, setTopicData] = useState<
    GetInnerTopicBySamimServicesResponse | undefined
  >();
  const [attachTicket, setAttachTicket] = useState<GetAttachTicketResponse>();

  const [form] = Form.useForm();

  //? ================================  Api Calls ================================
  // services
  const [
    getAllSamimService,
    {
      data: serviceData,
      isFetching: isGetAllSamimServiceLoading,
      isSuccess: isGetAllSamimServiceSuccess,
    },
  ] = useLazyGetAllSamimServiceQuery();

  //topic
  const [
    getAllTopicBySamimServices,
    { isFetching: isGetAllTopicBySamimServicesLoading },
  ] = useLazyGetInnerTopicBySamimServicesQuery();

  // business
  const [
    getActiveBusinessData,
    {
      data: businessData,
      isFetching: isActiveBusinessDataLoading,
      isSuccess: isActiveBusinessSuccess,
    },
  ] = useLazyGetActiveBusinessListQuery();

  // branches
  const [getBranchesData, { data: branchesData, isFetching: isBranchesDataLoading }] =
    useLazyGetBranchListByProvinceCityBusinessQuery();

  // agents
  const [getAgentsList, { data: agentsList, isFetching: isAgentsListLoading }] =
    useLazyGetTicketingAgentsListByTopicIdAndBranchIdQuery();

  // attach ticket
  const [
    getAttachTicket,
    { isFetching: isAttachTicketDataLoading, isSuccess: isAttachTicketDataSuccess },
  ] = useLazyGetAttachTicketQuery();

  // add new ticket
  const [addTicket, { isLoading: isAddTicketLoading }] = useAddInnerTicketMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getServiceHandler();
    getBusinessHandler();
  });

  //* ================================ Util Functions ================================

  // services
  const getServiceHandler = () => {
    if (!isGetAllSamimServiceSuccess) {
      getAllSamimService();
    }
  };

  const changeServiceHandler = (value: InnerTicketSelectType) => {
    if (!value) setServices(null);
    if (value?.item?.name) {
      setServices(value?.item?.name);
      getAllTopicBySamimServices({
        serviceRequest: value?.item?.name ?? "",
      })
        .unwrap()
        .then((res) => {
          setTopicData(res);
        });
    }

    form.setFieldsValue({ problemSubject: undefined });
  };

  // business
  const getBusinessHandler = () => {
    if (!isActiveBusinessSuccess) {
      getActiveBusinessData();
    }
  };

  const businessChangeHandler = (id: number) => {
    setSelectBusiness(id);

    getBranchesData({
      businessIds: id?.toString(),
    });

    form.setFieldsValue({ branch: undefined, userAssignTo: undefined });
    setSelectBranch(null);
  };

  // branch
  const branchChangeHandler = (id: number) => {
    setSelectBranch(id);
    getAgentsList({ branchIds: id, topicIds: 2 });
    form.setFieldsValue({ userAssignTo: undefined });
  };

  // attach ticket
  const attachTicketHandler = () => {
    if (!isAttachTicketDataSuccess) {
      getAttachTicket()
        .unwrap()
        .then((res: GetAttachTicketResponse) => {
          setAttachTicket(res);
        });
    }
  };

  // add new ticket
  const handleSubmit = () => {
    form.validateFields().then((values: AddInnerTicketFormType) => {
      addTicket({
        body: {
          topicId: values?.problemSubject?.item?.id,
          assignUserKeycloakId: values?.userAssignTo?.item?.id?.toString(),
          relatedTicketId: values?.ticketNumber?.code?.toString(),
          title: values?.faTitle,
          description: values?.desc,
          branchAssignRequest: values?.branch?.item?.id,
        },
      })
        .unwrap()
        .then(addTicketIsSuccess);
    });
  };

  // success
  const addTicketIsSuccess = () => {
    closeModal();
    refetchList();
    refreshCount?.();
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Modal
      title="ثبت تیکت"
      open={isModalOpen}
      onCancel={closeModal}
      footer={
        <>
          <CustomButton type="default" onClick={closeModal}>
            انصراف
          </CustomButton>
          <CustomButton
            type="primary"
            loading={isAddTicketLoading}
            onClick={handleSubmit}
          >
            ثبت تیکت
          </CustomButton>
        </>
      }
      width={500}
      className="committee-referral-report-modal-container"
    >
      <Form form={form}>
        <div>
          <Row gutter={[16, 16]}>
            <Col lg={12} md={12} sm={24} xs={24}>
              <CustomSelect
                name="service"
                placeholder="انتخاب کنید"
                options={serviceData ? serviceData : []}
                label="سرویس تیکت"
                form={form}
                rules={[REQUIRED_RULE]}
                loading={isGetAllSamimServiceLoading}
                onChange={(_, value) =>
                  changeServiceHandler(value as InnerTicketSelectType)
                }
                allowClear
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <CustomSelect
                name="problemSubject"
                placeholder="انتخاب کنید"
                label="موضوع مشکل"
                options={
                  topicData
                    ? topicData.map((item) => ({ id: item?.id, title: item?.title }))
                    : []
                }
                loading={isGetAllTopicBySamimServicesLoading}
                form={form}
                rules={[REQUIRED_RULE]}
                disabled={!services}
                allowClear
              />
            </Col>
            <Col span={24}>
              <CustomInput
                rules={[REQUIRED_RULE, MAX_MIN_LENGTH_RULE(2, 64)]}
                label="عنوان مشکل "
                name="faTitle"
                placeholder="موضوع مشکل را به فارسی وارد نمایید."
                allowClear
              />
            </Col>
            <Col span={24}>
              <CustomTextArea
                rules={[REQUIRED_RULE, MAX_MIN_LENGTH_RULE(8, 1024)]}
                label="توضیحات مشکل"
                name="desc"
                placeholder="مشکل خود را توضیح دهید."
                allowClear
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <CustomSelect
                name="business"
                placeholder="انتخاب کنید"
                loading={isActiveBusinessDataLoading}
                options={businessData ? businessData : []}
                label="کسب و کار"
                form={form}
                rules={[REQUIRED_RULE]}
                onChange={(id) => businessChangeHandler(id as number)}
                allowClear
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <CustomSelect
                name="branch"
                placeholder="انتخاب کنید"
                options={branchesData ? branchesData : []}
                loading={isBranchesDataLoading}
                label="شعبه / واحد"
                form={form}
                rules={[REQUIRED_RULE]}
                onChange={(id) => branchChangeHandler(id as number)}
                disabled={!selectBusiness}
                allowClear
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <CustomSelect
                label="کارشناس (تخصیص مستقیم)"
                name="userAssignTo"
                placeholder="انتخاب کنید"
                options={
                  agentsList
                    ? agentsList.map((agent) => ({ id: agent?.id, title: agent?.name }))
                    : []
                }
                form={form}
                loading={isAgentsListLoading}
                disabled={!selectBranch || !selectBusiness}
                allowClear
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <CustomSelect
                label="ضمیمه کردن تیکت (شماره تیکت)"
                name="ticketNumber"
                isLoading={isAttachTicketDataLoading}
                form={form}
                options={
                  attachTicket
                    ? attachTicket.map((item) => ({
                        id: item.uuid,
                        title: item.ticketTitle,
                      }))
                    : []
                }
                onClick={attachTicketHandler}
                allowClear
              />
            </Col>
          </Row>
        </div>
      </Form>
    </Modal>
  );
};

export default AddTicketsModalContent;
