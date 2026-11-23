import { useEffect, useState } from "react";

import { Form } from "antd";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { DORM_BASIC_INFO_LIST_PAGE_ROUTE } from "@infra/router/routes/dorm";
import {
  useCreateStatusTypesMutation,
  useLazyGetStatusTypesQuery,
  useUpdateDormStatusTypesMutation,
} from "@infra/states/redux/Apis/dorm/base/dormBaseApi";

import {
  CreateDormStatusTypesResponse,
  DormStatusTypes,
  GetDormStatusTypesResponse,
  UpdateDormStatusTypesResponse,
} from "./@types/@dormFormStatusTypes";
import {
  ACTIVE_SWITCH_MODAL_MESSAGE,
  INACTIVE_SWITCH_MODAL_MESSAGE,
} from "../helper/utils/DormBasicInfoDetailUtils";
import DormBasicInfoFormStatusTypesTableModel from "./helper/models/DormBasicInfoFormStatusTypes/DormBasicInfoFormStatusTypesTableModel";
import DormFormStatusTypeModalContent from "./helper/section/DormFormStatusTypeModalContent/DormFormStatusTypeModalContent";

import "./_dormFormStatusTypes.scss";

const DormFormStatusTypes = () => {
  const [formStatusList, setIsFormStatusList] = useState<DormStatusTypes[]>([]);

  const [isModifyModalOpen, setIsModifyModalOpen] = useState({
    isOpen: false,
    id: -1,
  });
  const [isOpenSwitchModal, setIsOpenSwitchModal] = useState({
    isOpen: false,
    id: -1,
    isActive: false,
  });

  const active = 1;
  const inActive = 3;

  const [modifyForm] = Form.useForm<{ statusTitle: string }>();

  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={DORM_BASIC_INFO_LIST_PAGE_ROUTE}>اطلاعات پایه اقامتگاه</Link>,
      },
      {
        title: "انواع وضعیت فرم",
      },
    ],
  });

  //? ================================  Api Calls ================================
  //get table list
  const [getStatusTypes, { isFetching: isStatusTypesDataLoading }] =
    useLazyGetStatusTypesQuery();

  // create
  const [createStatusTypes, { isLoading: isCreateStatusTypesLoading }] =
    useCreateStatusTypesMutation();

  // update
  const [updateStatusTypes, { isLoading: isUpdateStatusTypesLoading }] =
    useUpdateDormStatusTypesMutation();

  //? ================================ Effects ================================
  useEffect(() => getStatusTypesList(), []);

  //* ================================ Util Functions ================================
  // get list
  const getStatusTypesList = () => {
    getStatusTypes({ maxResults: 2000, firstResult: 0 })
      .unwrap()
      .then(getStatusTypesSuccess);
  };

  const getStatusTypesSuccess = (value: GetDormStatusTypesResponse) => {
    if (value?.status === 200) {
      setIsFormStatusList(value?.data);
    }
  };

  // modify handler
  const addStatusTypeHandler = () => {
    setIsModifyModalOpen({ isOpen: true, id: -1 });
  };

  const editStatusTypeHandler = (value: DormStatusTypes) => {
    setIsModifyModalOpen({ isOpen: true, id: value?.id });
    modifyForm.setFieldsValue({
      statusTitle: value?.title,
    });
  };

  const closeModifyModalHandler = () => {
    setIsModifyModalOpen({ isOpen: false, id: -1 });
    modifyForm.resetFields();
  };

  const confirmModifyModalHandler = () => {
    modifyForm?.submit();
    modifyForm?.validateFields().then(() => {
      const { statusTitle } = modifyForm.getFieldsValue();

      if (isModifyModalOpen?.id === -1) {
        createStatusTypes({
          form: "TypeAssignment",
          data: {
            title: statusTitle,
            recordStatus: 1,
          },
        })
          .unwrap()
          .then(createStatusTypesSuccess);
      } else {
        updateStatusTypes({
          form: "Status",
          id: "34158107112c4f08bc0cdb57770194a5",
          data: {
            title: statusTitle,
            id: isModifyModalOpen?.id,
          },
        })
          .unwrap()
          .then(updateStatusTypesSuccess);
      }
    });
  };

  // create success
  const createStatusTypesSuccess = async (value: CreateDormStatusTypesResponse) => {
    if (value?.status === 200) {
      modifyHandler();
    }
  };

  //update success
  const updateStatusTypesSuccess = async (value: UpdateDormStatusTypesResponse) => {
    if (value?.status === 200) {
      modifyHandler();
    }
  };

  const modifyHandler = () => {
    getStatusTypesList();
    closeModifyModalHandler();
    modifyForm.resetFields();
  };

  // active and inactive
  const openSwitchModalHandler = (id: number, status: boolean) => {
    setIsOpenSwitchModal({ isOpen: true, id, isActive: status });
  };

  const closeSwitchModalHandler = () => {
    setIsOpenSwitchModal({ isOpen: false, id: -1, isActive: false });
  };

  const confirmSwitchModalHandler = () => {
    const recordStatus = isOpenSwitchModal?.isActive ? inActive : active;

    updateStatusTypes({
      form: "Status",
      id: "34158107112c4f08bc0cdb57770194a5",
      data: {
        recordStatus: recordStatus,
        id: isOpenSwitchModal?.id,
      },
    })
      .unwrap()
      .then(changeStatusSuccess);
  };

  const changeStatusSuccess = async (value: UpdateDormStatusTypesResponse) => {
    if (value?.status === 200) {
      getStatusTypesList();
      closeSwitchModalHandler();
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* ADD AND EDIT MODAL   */}
      {isModifyModalOpen?.isOpen && (
        <ConfirmationModalWithContent
          isModalOpen={isModifyModalOpen?.isOpen}
          title={
            isModifyModalOpen?.id !== -1
              ? "ویرایش  نوع وضعیت فرم"
              : "افزودن نوع وضعیت فرم"
          }
          confirmBtnText={isModifyModalOpen?.id !== -1 ? "ثبت تغییرات" : "افزودن"}
          backBtnText="انصراف"
          isConfirmButtonLoading={
            isCreateStatusTypesLoading || isUpdateStatusTypesLoading
          }
          content={<DormFormStatusTypeModalContent form={modifyForm} />}
          closeModalHandler={closeModifyModalHandler}
          onConfirmClickHandler={confirmModifyModalHandler}
          showIcon={false}
        />
      )}
      {/* SWITCH INACTIVE MODAL */}
      {isOpenSwitchModal?.isOpen && (
        <ConfirmationModalWithContent
          isModalOpen={isOpenSwitchModal?.isOpen}
          title={!isOpenSwitchModal?.isActive ? "فعال کردن" : "غیر فعال کردن"}
          confirmBtnText={!isOpenSwitchModal?.isActive ? "فعال کن" : "غیر فعال "}
          backBtnText="انصراف"
          isDangerous={!isOpenSwitchModal?.isActive ? false : true}
          isConfirmButtonLoading={isUpdateStatusTypesLoading}
          content={
            !isOpenSwitchModal?.isActive
              ? ACTIVE_SWITCH_MODAL_MESSAGE
              : INACTIVE_SWITCH_MODAL_MESSAGE
          }
          closeModalHandler={closeSwitchModalHandler}
          onConfirmClickHandler={() => confirmSwitchModalHandler()}
          customClass="dorm-basic-info-switch-modal"
        />
      )}

      <div className="dorm-basic-info-form-status-type-container">
        <CustomTable
          dataSource={formStatusList}
          columns={DormBasicInfoFormStatusTypesTableModel({
            onEditClickHandler: editStatusTypeHandler,
            switchHandler: openSwitchModalHandler,
          })}
          loading={isStatusTypesDataLoading}
          pagination={paginationConfig}
          className="dorm-form-status-type-table-container"
          {...TABLE_PROPS(formStatusList?.length)}
        />
        <CustomButton
          icon={<AiOutlinePlus />}
          iconPlacement="end"
          disabled
          onClick={addStatusTypeHandler}
        >
          افزودن نوع وضعیت فرم
        </CustomButton>
      </div>
    </>
  );
};

export default DormFormStatusTypes;
