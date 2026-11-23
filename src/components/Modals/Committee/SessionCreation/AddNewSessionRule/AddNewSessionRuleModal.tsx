import { useEffect, useState } from "react";

import { Button, Checkbox, Form, Modal } from "antd";
import { Key } from "antd/es/table/interface";
import { toast } from "react-toastify";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { AddNewAgendaResponse } from "@pages/Committee/Committees/Meetings/SessionCreation/helper/components/SessionRules/@types/@sessionRulesStep";

import {
  AddNewSessionRuleModalProps,
  FilterDataType,
} from "./@types/@addNewSessionRuleModal";
import manualPaginationConfig from "../../../../../infrastructure/helpers/TableHelpers/config/manualPagination";
import { SessionRulesStepModel } from "../../../../../infrastructure/models/tableModels/CommitteeTableModel/SessionCreation/SessionRulesStepModal/SessionRulesStepModel";
import {
  useAddNewAgendaMutation,
  useLazyGetCommitteeRealizationSessionDurationQuery,
  useLazyGetListOfSessionCreationAccusationsCountQuery,
  useLazyGetListOfSessionCreationAccusationsQuery,
  useLazyGetProviderListQuery,
} from "../../../../../infrastructure/states/redux/Apis/committee/committees/committees";
import { PADDING_20 } from "../../../../../infrastructure/VARS/globalStyles/globalStyles";
import CustomCard from "../../../../CustomCard/CustomCard";
import CustomInput from "../../../../CustomInputs/CustomInput/CustomInput";
import CustomSelect from "../../../../CustomInputs/CustomSelect/CustomSelect";
import CustomDivider from "../../../../Renderers/CustomDivider/CustomDivider";
import "./_addNewSessionRuleModal.scss";

// todo:[Atefeh]: uncomment when require in feature
// const breadCrumbItems = [
//   {
//     title: "جلسات کمیته بدوی",
//   },
//   {
//     title: "تاریخ 16 مهر",
//   },
//   {
//     title: "ساعت 15:30 الی 18:30",
//   },
// ];

const ADD_NEW_AGENDA_SUCCESS_MSG = "افزودن اتهام با موفقیت انجام شد.";

const AddNewSessionRuleModal = ({
  isModalOpen,
  setAddNewSessionRuleModal,
}: AddNewSessionRuleModalProps) => {
  const [accusationListForm] = Form.useForm();
  const [newAccusationForm] = Form.useForm();
  const [accusationId, setAccusationId] = useState(-1);

  //? ================================  Api Calls ================================
  const [
    getListOfSessionCreationAccusations,
    {
      data: listOfSessionCreationAccusations,
      isLoading: isListOfSessionCreationAccusationsLoading,
    },
  ] = useLazyGetListOfSessionCreationAccusationsQuery();

  const [getTotalCount, { data: totalCount, isLoading: isTotalCountLoading }] =
    useLazyGetListOfSessionCreationAccusationsCountQuery();

  const [getProviderList, { data: providerList, isLoading: isProviderListLoading }] =
    useLazyGetProviderListQuery();

  const [
    getSessionDuration,
    { data: sessionDurationData, isLoading: isSessionDurationLoading },
  ] = useLazyGetCommitteeRealizationSessionDurationQuery();

  const [addNewAgenda, { isLoading: isAddNewAgendaLoading }] = useAddNewAgendaMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (isModalOpen?.isOpen) {
      getListOfSessionCreationAccusations({
        firstResult: 0,
        maxResults: 8,
      });
      getTotalCount({});
      getProviderList();
      getSessionDuration({ firstResult: 0, maxResults: 50 });
    }
  }, [isModalOpen?.isOpen]);

  //* ================================ Util Functions ================================
  const closeModalHandler = () => setAddNewSessionRuleModal({ isOpen: false, id: -1 });

  const rowSelection = {
    onChange: (_: Key[], selectedRows: { id: number }[]) => {
      if (selectedRows[0]?.id) {
        setAccusationId(selectedRows[0].id);
      }
    },
  };

  // filter table form
  const addNewSessionAccusationHandler = (event: FilterDataType) => {
    getListOfSessionCreationAccusations({
      firstResult: 0,
      maxResults: 8,
      name: event.name,
      family: event.family,
      nationalCode: event.nationalCode,
      studentNumber: event.studentNumber,
      mobile: event.mobile,
      id: event.id,
    });
    getTotalCount({
      name: event.name,
      family: event.family,
      nationalCode: event.nationalCode,
      studentNumber: event.studentNumber,
      mobile: event.mobile,
      id: event.id,
    });
  };

  const addNewAgendaOnSuccess = async (value: AddNewAgendaResponse) => {
    if (value?.status === 200) {
      closeModalHandler();
      toast.success(ADD_NEW_AGENDA_SUCCESS_MSG, {
        toastId: ADD_NEW_AGENDA_SUCCESS_MSG,
      });
    }
  };

  // register form
  const registerNewAccusationForm = () => {
    const { period, provider } = newAccusationForm.getFieldsValue();
    addNewAgenda({
      form: "AddNewAgenda",
      id: "2854cc10bd8749e582dc48871aee3fa9",
      _data_: {
        meeting: isModalOpen?.id,
        primaryProvider: provider?.children,
        reviewPeriod: period?.children,
        id: accusationId,
      },
    })
      .unwrap()
      .then(addNewAgendaOnSuccess);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isModalOpen?.isOpen && (
        <Modal
          title="افزودن اتهام"
          open={isModalOpen?.isOpen}
          onCancel={closeModalHandler}
          footer={null}
          width={500}
          className="committee-session-creation-add-new-session-rule-modal-container"
        >
          <div className="modal-body-container">
            {/* // todo:[Atefeh]: uncomment when require in feature */}
            {/* <div className="bread-crumb-container">
          <CustomCard padding={PADDING_20}>
            <Breadcrumb items={breadCrumbItems} className="bread-crumb" />
          </CustomCard>
        </div> */}
            <CustomCard padding={PADDING_20} className="table-container">
              <div className="border-round-box">
                <CustomDivider text="جستجو اتهام" />
                <Form
                  onFinish={addNewSessionAccusationHandler}
                  form={accusationListForm}
                  className="grid-cols-4"
                >
                  <CustomInput
                    type="text"
                    label="نام متهم"
                    name="name"
                    placeholder="نام"
                  />
                  <CustomInput
                    type="text"
                    label="نام خانوادگی متهم"
                    name="family"
                    placeholder="نام خانوادگی"
                  />
                  <CustomInput
                    type="text"
                    label="شماره ملی متهم"
                    name="nationalCode"
                    placeholder="شماره ملی"
                  />
                  <CustomInput
                    type="text"
                    label="شماره دانشجویی/پرسنلی"
                    name="studentNumber"
                    placeholder="شماره دانشجویی"
                  />
                  <CustomInput
                    type="text"
                    label="شماره تماس"
                    name="mobile"
                    placeholder="شماره تماس"
                  />
                  <CustomInput
                    type="text"
                    label="شماره اتهام"
                    name="id"
                    placeholder="شماره اتهام"
                  />
                  <div>
                    <Button type="primary" className="custom-btn" htmlType="submit">
                      جستجو
                    </Button>
                  </div>
                </Form>
              </div>
              <CustomTable
                rowSelection={{
                  type: "radio",
                  ...rowSelection,
                }}
                dataSource={listOfSessionCreationAccusations?.data}
                loading={isListOfSessionCreationAccusationsLoading || isTotalCountLoading}
                columns={SessionRulesStepModel({
                  from: "addNewSessionRule",
                })}
                pagination={manualPaginationConfig({
                  total: totalCount?.data,
                  onChange: (page, pageSize) => {
                    getListOfSessionCreationAccusations({
                      firstResult: (page - 1) * pageSize,
                      maxResults: pageSize,
                      name: accusationListForm?.getFieldsValue()?.name,
                      family: accusationListForm?.getFieldsValue()?.family,
                      nationalCode: accusationListForm?.getFieldsValue()?.nationalCode,
                      studentNumber: accusationListForm?.getFieldsValue()?.studentNumber,
                      mobile: accusationListForm?.getFieldsValue()?.mobile,
                      id: accusationListForm?.getFieldsValue()?.id,
                    });
                  },
                })}
                rowKey="id"
                {...TABLE_PROPS(listOfSessionCreationAccusations?.data?.length || 0)}
                className="session-rules-step-modal-container"
              />
            </CustomCard>
            <CustomCard padding={PADDING_20}>
              <CustomDivider text="اطلاعات تکمیلی" />
              <Form className="grid-cols-4" form={newAccusationForm}>
                <CustomSelect
                  name="period"
                  label="زمان لازم (دقیقه)"
                  isLoading={isSessionDurationLoading}
                  options={sessionDurationData?.data?.map(
                    (item: { time: string; id: number }) => {
                      return {
                        title: item?.time,
                        id: item?.id,
                      };
                    }
                  )}
                  form={newAccusationForm}
                  placeholder="انتخاب کنید"
                />
                <CustomSelect
                  name="provider"
                  label="ارائه دهنده"
                  isLoading={isProviderListLoading}
                  options={providerList?.data}
                  form={newAccusationForm}
                  placeholder="انتخاب کنید"
                />
              </Form>
            </CustomCard>
          </div>
          <div className="modal-footer">
            <div className="submit-buttons-container">
              <Button
                type="primary"
                className="custom-btn"
                htmlType="submit"
                onClick={registerNewAccusationForm}
                loading={isAddNewAgendaLoading}
              >
                افزودن
              </Button>
              <Button className="custom-btn" onClick={closeModalHandler}>
                بازگشت
              </Button>
            </div>
            <Checkbox className="checkbox-text" disabled>
              افزودن دستور جلسه دیگر بعد از ثبت
            </Checkbox>
          </div>
        </Modal>
      )}
    </>
  );
};

export default AddNewSessionRuleModal;
