import { useEffect, useState } from "react";

import { Col, Form, Modal, Row } from "antd";

import { CustomButton, CustomSelect } from "@components/CustomInputs";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetActiveBusinessListQuery,
  useLazyGetBranchListByProvinceCityBusinessQuery,
} from "@infra/states/redux/Apis/business/businessRequest/businessRequest";
import {
  useLazyGetTicketingAgentsListByTopicIdAndBranchIdQuery,
  useTicketingAllAssignToMeMutation,
  useTicketingAllAssignToOtherMutation,
} from "@infra/states/redux/Apis/ticketing/ticketing/ticketingApis";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { AssignSuperAgentTicketModalProps } from "@pages/Ticketing/SuperAgent/SuperAgentList/helper/components/SuperAgentNotAssignedList/helper/modals/AssignSuperAgentTicket/@types/@assignSuperAgentTicketModal";

import "./_assignSuperAgentTicketModal.scss";

const AssignSuperAgentTicketModal = ({
  isModalOpen,
  closeModalHandler,
  form,
  topicId,
  ticketId,
  getListHandler,
  getBannerHandler,
  pageDataLength,
  from,
}: AssignSuperAgentTicketModalProps) => {
  const [selectBusiness, setSelectBusiness] = useState<number | null>(null);
  const [selectBranch, setSelectBranch] = useState<number | null>(null);

  const { params, setSearchParams } = useQueryParams();

  //? ================================  Api Calls ================================
  // business
  const [
    getActiveBusinessData,
    {
      data: businessData,
      isLoading: isActiveBusinessDataLoading,
      isSuccess: isActiveBusinessSuccess,
    },
  ] = useLazyGetActiveBusinessListQuery();

  // branches
  const [getBranchesData, { data: branchesData, isLoading: isBranchesDataLoading }] =
    useLazyGetBranchListByProvinceCityBusinessQuery();

  // agents
  const [getAgentsList, { data: agentsList, isFetching: isAgentsListLoading }] =
    useLazyGetTicketingAgentsListByTopicIdAndBranchIdQuery();

  // assign to other
  const [assignToOther, { isLoading: isAssignToOtherLoading }] =
    useTicketingAllAssignToOtherMutation();

  // assign to me
  const [assignToMe, { isLoading: isAssignToMeLoading }] =
    useTicketingAllAssignToMeMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getBusinessHandler();
  });

  //* ================================ Util Functions ================================
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

  const branchChangeHandler = (id: number) => {
    setSelectBranch(id);
    getAgentsList({ branchIds: id, topicIds: topicId });
    form.setFieldsValue({ userAssignTo: undefined });
  };

  const assignToOtherClickHandler = () => {
    form.validateFields().then(() => {
      if (form?.getFieldsValue()?.userAssignTo?.code) {
        assignToOther({
          ticketId: ticketId,
          userId: form?.getFieldsValue()?.userAssignTo?.code?.toString(),
        })
          .unwrap()
          .then(() => closeModalHandlerWithGetDataAgain());
      }
    });
  };

  const assignToMeHandler = () => {
    assignToMe(ticketId)
      .unwrap()
      .then(() => closeModalHandlerWithGetDataAgain());
  };

  const closeModalHandlerWithGetDataAgain = () => {
    closeModalHandler();

    if (from !== "ticketDetail") {
      // if the last item of the page assigned to other, go to the previous page
      // if the page is one, we don't need to go to the previous page, because it will be empty and we will have no data to show
      if (pageDataLength === 1 && params?.page && Number(params?.page) > 1) {
        setSearchParams({ ...params, page: String(Number(params.page) - 1) });
        getListHandler?.(String(Number(params.page) - 1));
      } else {
        getListHandler?.();
      }
    }
    getBannerHandler();
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ ▲▲▲ ▲ ▲ */
  return (
    <Modal
      title="تخصیص تیکت!"
      open={isModalOpen}
      onCancel={closeModalHandler}
      footer={null}
      width={500}
      className="assign-super-agent-ticket-modal-container"
      centered={true}
    >
      <Form form={form} className="modal-body-container flex flex-col gap-6">
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <CustomSelect
              className="mb-0!"
              name="business"
              placeholder="انتخاب کنید"
              loading={isActiveBusinessDataLoading}
              options={businessData ? businessData : []}
              label="کسب و کار"
              form={form}
              rules={[REQUIRED_RULE]}
              onChange={(id) => businessChangeHandler(id as number)}
            />
          </Col>
          <Col span={24}>
            <CustomSelect
              className="mb-0!"
              name="branch"
              placeholder="انتخاب کنید"
              options={branchesData ? branchesData : []}
              loading={isBranchesDataLoading}
              label="شعبه / واحد"
              form={form}
              rules={[REQUIRED_RULE]}
              onChange={(id) => branchChangeHandler(id as number)}
              disabled={!selectBusiness}
            />
          </Col>
          <Col span={24}>
            <CustomSelect
              className="mb-0!"
              name="userAssignTo"
              placeholder="انتخاب کنید"
              options={
                agentsList
                  ? agentsList.map((agent) => ({ id: agent.id, title: agent.name }))
                  : []
              }
              label="تخصیص به"
              rules={[REQUIRED_RULE]}
              form={form}
              loading={isAgentsListLoading}
              disabled={!selectBranch || !selectBusiness}
            />
          </Col>
        </Row>
        <div className="flex justify-between">
          <div>
            <CustomButton onClick={closeModalHandler}>انصراف</CustomButton>
          </div>
          <div className="flex gap-4">
            <CustomButton onClick={assignToMeHandler} loading={isAssignToMeLoading}>
              تخصیص به خود
            </CustomButton>
            <CustomButton
              type="primary"
              onClick={assignToOtherClickHandler}
              loading={isAssignToOtherLoading}
            >
              تخصیص به دیگری
            </CustomButton>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default AssignSuperAgentTicketModal;
