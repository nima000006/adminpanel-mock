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
  useCreateDormAssignmentTypesMutation,
  useLazyGetAssignmentTypeQuery,
  useUpdateDormAssignmentTypesMutation,
} from "@infra/states/redux/Apis/dorm/base/dormBaseApi";

import {
  AssignmentListType,
  CreateDormAssignmentTypesResponse,
  GetAssignmentTypeResponse,
  UpdateDormAssignmentTypesResponse,
} from "./@types/@dormAssignmentTypes";
import {
  ACTIVE_SWITCH_MODAL_MESSAGE,
  INACTIVE_SWITCH_MODAL_MESSAGE,
} from "../helper/utils/DormBasicInfoDetailUtils";
import DormBasicInfoAssignmentTypesTableModel from "./helper/models/DormBasicInfoAssignmentTypes/DormBasicInfoAssignmentTypesTableModel";
import DormAssignmentTypeModalContent from "./helper/section/DormAssignmentTypeModalContent/DormAssignmentTypeModalContent";
import "./_dormAssignmentTypes.scss";

const DormAssignmentTypes = () => {
  const [assignmentTypeList, setAssignmentTypeList] = useState<AssignmentListType[]>([]);

  const [isModifyModalOpen, setIsModifyModalOpen] = useState({
    isOpen: false,
    id: -1,
  });

  const [isOpenSwitchModal, setIsOpenSwitchModal] = useState({
    isOpen: false,
    id: -1,
    isActive: false,
  });

  const [modifyForm] = Form.useForm<{ assignmentTitle: string }>();

  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={DORM_BASIC_INFO_LIST_PAGE_ROUTE}>اطلاعات پایه اقامتگاه</Link>,
      },
      {
        title: "انواع واگذاری",
      },
    ],
  });
  //? ================================  Api Calls ================================
  const [getAssignmentTypes, { isFetching: isAssignmentTypesDataLoading }] =
    useLazyGetAssignmentTypeQuery();

  const [createAssignmentTypes, { isLoading: isCreateAssignmentTypesLoading }] =
    useCreateDormAssignmentTypesMutation();

  const [updateAssignmentTypes, { isLoading: isUpdateAssignmentTypesLoading }] =
    useUpdateDormAssignmentTypesMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getAssignmentTypeList();
  }, []);

  //* ================================ Util Functions ================================
  // get list
  const getAssignmentTypeList = () => {
    getAssignmentTypes({ maxResults: 2000, firstResult: 0 })
      .unwrap()
      .then(getAssignmentTypesSuccess);
  };

  const getAssignmentTypesSuccess = async (value: GetAssignmentTypeResponse) => {
    if (value?.status === 200) {
      setAssignmentTypeList(value?.data);
    }
  };

  // create and update
  const addAssignmentTypeHandler = () => {
    setIsModifyModalOpen({ isOpen: true, id: -1 });
  };

  const editAssignmentTypeHandler = (value: AssignmentListType) => {
    setIsModifyModalOpen({ isOpen: true, id: value?.id });
    modifyForm.setFieldsValue({
      assignmentTitle: value?.title,
    });
  };

  const closeModifyModalHandler = () => {
    setIsModifyModalOpen({ isOpen: false, id: -1 });
    modifyForm.resetFields();
  };

  const confirmModifyModalHandler = () => {
    modifyForm?.submit();
    modifyForm?.validateFields().then(() => {
      const { assignmentTitle } = modifyForm.getFieldsValue();

      if (isModifyModalOpen?.id === -1) {
        createAssignmentTypes({
          form: "TypeAssignment",
          data: {
            title: assignmentTitle,
            recordStatus: 1,
          },
        })
          .unwrap()
          .then(createAssignmentTypesSuccess);
      } else {
        updateAssignmentTypes({
          form: "TypeAssignment",
          id: "b2d1d025983d445484e5797e533d64ef",
          data: {
            title: assignmentTitle,
            id: isModifyModalOpen?.id,
          },
        })
          .unwrap()
          .then(updateAssignmentTypesSuccess);
      }
    });
  };

  const createAssignmentTypesSuccess = async (
    value: CreateDormAssignmentTypesResponse
  ) => {
    if (value?.status === 200) {
      modifyHandler();
    }
  };

  const updateAssignmentTypesSuccess = async (
    value: UpdateDormAssignmentTypesResponse
  ) => {
    if (value?.status === 200) {
      modifyHandler();
    }
  };

  const modifyHandler = () => {
    getAssignmentTypeList();
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

    updateAssignmentTypes({
      form: "TypeAssignment",
      id: "b2d1d025983d445484e5797e533d64ef",
      data: {
        recordStatus: recordStatus,
        id: isOpenSwitchModal?.id,
      },
    })
      .unwrap()
      .then(changeStatusSuccess);
  };

  const changeStatusSuccess = async (value: UpdateDormAssignmentTypesResponse) => {
    if (value?.status === 200) {
      getAssignmentTypeList();
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
            isModifyModalOpen?.id !== -1 ? "ویرایش نوع واگذاری" : "افزودن نوع واگذاری"
          }
          confirmBtnText={isModifyModalOpen?.id !== -1 ? "ثبت تغییرات" : "افزودن"}
          backBtnText="انصراف"
          isConfirmButtonLoading={
            isCreateAssignmentTypesLoading || isUpdateAssignmentTypesLoading
          }
          content={<DormAssignmentTypeModalContent form={modifyForm} />}
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
          isConfirmButtonLoading={isUpdateAssignmentTypesLoading}
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

      <div className="dorm-basic-info-assignment-type-container">
        <ToolBox
          leftSide={
            <CustomButton
              icon={<AiOutlinePlus />}
              iconPlacement="end"
              onClick={addAssignmentTypeHandler}
            >
              افزودن نوع واگذاری
            </CustomButton>
          }
        />
        <CustomTable
          dataSource={assignmentTypeList}
          columns={DormBasicInfoAssignmentTypesTableModel({
            onEditClickHandler: editAssignmentTypeHandler,
            switchHandler: openSwitchModalHandler,
          })}
          loading={isAssignmentTypesDataLoading}
          className="dorm-assignment-type-table-container"
          pagination={paginationConfig}
          {...TABLE_PROPS(assignmentTypeList?.length)}
        />
      </div>
    </>
  );
};

export default DormAssignmentTypes;
