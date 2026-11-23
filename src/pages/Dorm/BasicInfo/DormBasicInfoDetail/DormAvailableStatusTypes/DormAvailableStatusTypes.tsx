import { useEffect, useState } from "react";

import { Form } from "antd";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { DORM_BASIC_INFO_LIST_PAGE_ROUTE } from "@infra/router/routes/dorm";
import {
  useCreateDormStatusEntityTypesMutation,
  useLazyGetStatusEntityTypeQuery,
  useUpdateDormStatusEntityTypesMutation,
} from "@infra/states/redux/Apis/dorm/base/dormBaseApi";

import {
  CreateDormStatusEntityTypesResponse,
  GetStatusEntityTypeResponse,
  StatusEntityTypeList,
  UpdateDormStatusEntityTypesResponse,
} from "./@types/@dormAvailableStatusTypes";
import {
  ACTIVE_SWITCH_MODAL_MESSAGE,
  INACTIVE_SWITCH_MODAL_MESSAGE,
} from "../helper/utils/DormBasicInfoDetailUtils";
import DormBasicInfoStatusEntityTypesTableModel from "./helper/models/DormBasicInfoStatusEntityTypes/DormBasicInfoStatusEntityTypesTableModel";
import DormAvailableStatusTypeModalContent from "./helper/section/DormAvailableStatusTypeModalContent/DormAvailableStatusTypeModalContent";
import "./_dormAvailableStatusTypes.scss";

const DormAvailableStatusTypes = () => {
  const [statusEntityTypeList, setStatusEntityTypeList] = useState<
    StatusEntityTypeList[]
  >([]);

  const [isModifyModalOpen, setIsModifyModalOpen] = useState({
    isOpen: false,
    id: -1,
  });

  const [isOpenSwitchModal, setIsOpenSwitchModal] = useState({
    isOpen: false,
    id: -1,
    isActive: false,
  });

  const [modifyForm] = Form.useForm<{ statusEntityTitle: string }>();

  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={DORM_BASIC_INFO_LIST_PAGE_ROUTE}>اطلاعات پایه اقامتگاه</Link>,
      },
      {
        title: "انواع وضعیت موجودیت",
      },
    ],
  });

  //? ================================  Api Calls ================================
  const [getStatusEntityTypes, { isFetching: isStatusEntityTypesDataLoading }] =
    useLazyGetStatusEntityTypeQuery();

  const [createStatusEntityTypes, { isLoading: isCreateStatusEntityTypesLoading }] =
    useCreateDormStatusEntityTypesMutation();

  const [updateStatusEntityTypes, { isLoading: isUpdateStatusEntityTypesLoading }] =
    useUpdateDormStatusEntityTypesMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getStatusEntityTypeList();
  }, []);

  //* ================================ Util Functions ================================
  // get list
  const getStatusEntityTypeList = () => {
    getStatusEntityTypes({ maxResults: 2000, firstResult: 0 })
      .unwrap()
      .then(getStatusEntityTypesSuccess);
  };

  const getStatusEntityTypesSuccess = async (value: GetStatusEntityTypeResponse) => {
    if (value?.status === 200) {
      setStatusEntityTypeList(value?.data);
    }
  };

  // create and update
  const addStatusEntityTypeHandler = () => {
    setIsModifyModalOpen({ isOpen: true, id: -1 });
  };

  const editStatusEntityTypeHandler = (value: StatusEntityTypeList) => {
    setIsModifyModalOpen({ isOpen: true, id: value?.id });
    modifyForm.setFieldsValue({
      statusEntityTitle: value?.title,
    });
  };

  const closeModifyModalHandler = () => {
    setIsModifyModalOpen({ isOpen: false, id: -1 });
    modifyForm.resetFields();
  };

  const confirmModifyModalHandler = () => {
    modifyForm?.submit();
    modifyForm?.validateFields().then(() => {
      const { statusEntityTitle } = modifyForm.getFieldsValue();

      if (isModifyModalOpen?.id === -1) {
        createStatusEntityTypes({
          form: "StatusEntityForm",
          data: {
            title: statusEntityTitle,
            recordStatus: 1,
          },
        })
          .unwrap()
          .then(createStatusEntityTypesSuccess);
      } else {
        updateStatusEntityTypes({
          form: "StatusEntityForm",
          id: "27b17724b9d34ba6a631d1a0086f2624",
          data: {
            title: statusEntityTitle,
            id: isModifyModalOpen?.id,
          },
        })
          .unwrap()
          .then(updateStatusEntityTypesSuccess);
      }
    });
  };

  const createStatusEntityTypesSuccess = async (
    value: CreateDormStatusEntityTypesResponse
  ) => {
    if (value?.status === 200) {
      modifyHandler();
    }
  };

  const updateStatusEntityTypesSuccess = async (
    value: UpdateDormStatusEntityTypesResponse
  ) => {
    if (value?.status === 200) {
      modifyHandler();
    }
  };

  const modifyHandler = () => {
    getStatusEntityTypeList();
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
    const isInactive = 3;
    const isActive = 1;
    const recordStatus = isOpenSwitchModal?.isActive ? isInactive : isActive;

    updateStatusEntityTypes({
      form: "StatusEntityForm",
      id: "27b17724b9d34ba6a631d1a0086f2624",
      data: {
        recordStatus: recordStatus,
        id: isOpenSwitchModal?.id,
      },
    })
      .unwrap()
      .then(changeStatusSuccess);
  };

  const changeStatusSuccess = async (value: UpdateDormStatusEntityTypesResponse) => {
    if (value?.status === 200) {
      getStatusEntityTypeList();
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
              ? "ویرایش  وضعیت موجودیت"
              : "افزودن وضعیت موجودیت"
          }
          confirmBtnText={isModifyModalOpen?.id !== -1 ? "ثبت تغییرات" : "افزودن"}
          backBtnText="انصراف"
          isConfirmButtonLoading={
            isCreateStatusEntityTypesLoading || isUpdateStatusEntityTypesLoading
          }
          content={<DormAvailableStatusTypeModalContent form={modifyForm} />}
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
          isConfirmButtonLoading={isUpdateStatusEntityTypesLoading}
          content={
            !isOpenSwitchModal?.isActive
              ? ACTIVE_SWITCH_MODAL_MESSAGE
              : INACTIVE_SWITCH_MODAL_MESSAGE
          }
          closeModalHandler={closeSwitchModalHandler}
          onConfirmClickHandler={confirmSwitchModalHandler}
          customClass="dorm-basic-info-switch-modal"
        />
      )}

      <div className="dorm-basic-info-available-status-type-container">
        <ToolBox
          leftSide={
            <CustomButton
              icon={<AiOutlinePlus />}
              iconPlacement="end"
              onClick={addStatusEntityTypeHandler}
            >
              افزودن وضعیت موجودیت
            </CustomButton>
          }
        />
        <CustomTable
          dataSource={statusEntityTypeList}
          columns={DormBasicInfoStatusEntityTypesTableModel({
            onEditClickHandler: editStatusEntityTypeHandler,
            switchHandler: openSwitchModalHandler,
          })}
          loading={isStatusEntityTypesDataLoading}
          className="dorm-status-entity-type-table-container"
          pagination={paginationConfig}
          {...TABLE_PROPS(statusEntityTypeList?.length)}
        />
      </div>
    </>
  );
};

export default DormAvailableStatusTypes;
