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
  useCreateDormUserGroupTypesMutation,
  useLazyGetUserGroupQuery,
  useUpdateDormUserGroupTypesMutation,
} from "@infra/states/redux/Apis/dorm/base/dormBaseApi";
import {
  GeneralSelectResponse,
  GetUserGroupResponse,
} from "@pages/Dorm/Planning/Admission/AdmissionModify/@types/@admissionModify";

import {
  CreateDormUserGroupTypesResponse,
  UpdateDormUserGroupTypesResponse,
} from "./@types/@dormUserGroupTypes";
import {
  ACTIVE_SWITCH_MODAL_MESSAGE,
  INACTIVE_SWITCH_MODAL_MESSAGE,
} from "../helper/utils/DormBasicInfoDetailUtils";
import DormBasicInfoUserGroupTypesTableModel from "./helper/models/DormBasicInfoUserGroupTypes/DormBasicInfoUserGroupTypesTableModel";
import DormUserGroupTypeModalContent from "./helper/section/DormUserGroupTypeModalContent/DormUserGroupTypeModalContent";

import "./_dormUserGroupTypes.scss";

const DormUserGroupTypes = () => {
  const [userGroupTypeList, setIsUserGroupTypeList] = useState<GeneralSelectResponse[]>(
    []
  );

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

  const [modifyForm] = Form.useForm();

  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={DORM_BASIC_INFO_LIST_PAGE_ROUTE}>اطلاعات پایه اقامتگاه</Link>,
      },
      {
        title: "انواع گروه کاربری",
      },
    ],
  });

  //? ================================  Api Calls ================================
  //get table list
  const [getUserGroupTypes, { isFetching: isUserGroupTypesDataLoading }] =
    useLazyGetUserGroupQuery();

  // create
  const [createUserGroupTypes, { isLoading: isCreateUserGroupTypesLoading }] =
    useCreateDormUserGroupTypesMutation();

  // update
  const [updateUserGroupTypes, { isLoading: isUpdateUserGroupTypesLoading }] =
    useUpdateDormUserGroupTypesMutation();

  //? ================================ Effects ================================
  useEffect(() => getUserGroupTypesList(), []);

  //* ================================ Util Functions ================================
  // get list
  const getUserGroupTypesList = () => {
    getUserGroupTypes({ maxResults: 2000, firstResult: 0 })
      .unwrap()
      .then(userGroupTypesSuccess);
  };

  const userGroupTypesSuccess = (value: GetUserGroupResponse) => {
    if (value?.status === 200) {
      setIsUserGroupTypeList(value?.data);
    }
  };

  // modify handler
  const addUserGroupTypeHandler = () => {
    setIsModifyModalOpen({ isOpen: true, id: -1 });
  };

  const editUserGroupHandler = (value: GeneralSelectResponse) => {
    setIsModifyModalOpen({ isOpen: true, id: value?.id });
    modifyForm.setFieldsValue({
      userGroupTitle: value?.title,
    });
  };

  const closeModifyModalHandler = () => {
    setIsModifyModalOpen({ isOpen: false, id: -1 });
    modifyForm.resetFields();
  };

  const confirmModifyModalHandler = () => {
    modifyForm?.submit();
    modifyForm?.validateFields().then(() => {
      const { userGroupTitle } = modifyForm.getFieldsValue();
      if (isModifyModalOpen?.id === -1) {
        createUserGroupTypes({
          form: "UserGroup",
          data: {
            title: userGroupTitle,
            recordStatus: 1,
          },
        })
          .unwrap()
          .then(createUserGroupTypesSuccess);
      } else {
        updateUserGroupTypes({
          form: "UserGroup",
          id: "30bc5ceedca24261a0d07ddf8e657d8f",
          data: {
            title: userGroupTitle,
            id: isModifyModalOpen?.id,
          },
        })
          .unwrap()
          .then(updateUserGroupTypesSuccess);
      }
    });
  };

  // create success
  const createUserGroupTypesSuccess = async (value: CreateDormUserGroupTypesResponse) => {
    if (value?.status === 200) {
      modifyHandler();
    }
  };

  // update success
  const updateUserGroupTypesSuccess = async (value: UpdateDormUserGroupTypesResponse) => {
    if (value?.status === 200) {
      modifyHandler();
    }
  };

  const modifyHandler = () => {
    getUserGroupTypesList();
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
    updateUserGroupTypes({
      form: "UserGroup",
      id: "30bc5ceedca24261a0d07ddf8e657d8f",
      data: {
        recordStatus: recordStatus,
        id: isOpenSwitchModal?.id,
      },
    })
      .unwrap()
      .then(changeStatusSuccess);
  };

  const changeStatusSuccess = async (value: UpdateDormUserGroupTypesResponse) => {
    if (value?.status === 200) {
      getUserGroupTypesList();
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
            isModifyModalOpen?.id !== -1 ? "ویرایش گروه کاربری" : "افزودن گروه کاربری"
          }
          confirmBtnText={isModifyModalOpen?.id !== -1 ? "ثبت تغییرات" : "افزودن"}
          backBtnText="انصراف"
          isConfirmButtonLoading={
            isCreateUserGroupTypesLoading || isUpdateUserGroupTypesLoading
          }
          content={<DormUserGroupTypeModalContent form={modifyForm} />}
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
          isConfirmButtonLoading={isUpdateUserGroupTypesLoading}
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

      <div className="dorm-basic-info-user-group-type-container">
        <ToolBox
          leftSide={
            <CustomButton
              icon={<AiOutlinePlus />}
              iconPlacement="end"
              onClick={addUserGroupTypeHandler}
            >
              افزودن گروه کاربری
            </CustomButton>
          }
        />
        <CustomTable
          dataSource={userGroupTypeList}
          columns={DormBasicInfoUserGroupTypesTableModel({
            onEditClickHandler: editUserGroupHandler,
            switchHandler: openSwitchModalHandler,
          })}
          loading={isUserGroupTypesDataLoading}
          pagination={paginationConfig}
          className="dorm-user-group-table-container"
          {...TABLE_PROPS(userGroupTypeList?.length)}
        />
      </div>
    </>
  );
};

export default DormUserGroupTypes;
