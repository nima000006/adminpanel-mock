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
  useCreateDormPresenceAndAbsenceTypesMutation,
  useLazyGetDormPresenceAndAbsenceQuery,
  useUpdateDormPresenceAndAbsenceTypesMutation,
} from "@infra/states/redux/Apis/dorm/base/dormBaseApi";

import {
  CreateDormPresenceAndAbsenceTypeResponse,
  DormPresenceAndAbsence,
  GetDormPresenceAndAbsenceTypesResponse,
  UpdateDormPresenceAndAbsenceTypesResponse,
} from "./@types/@dormPresenceAndAbsenceTypes";
import {
  ACTIVE_SWITCH_MODAL_MESSAGE,
  INACTIVE_SWITCH_MODAL_MESSAGE,
} from "../helper/utils/DormBasicInfoDetailUtils";
import DormBasicInfoPresenceAndAbsenceTypesTableModel from "./helper/models/DormBasicInfoPresenceAndAbsenceTypes/DormBasicInfoPresenceAndAbsenceTypesTableModel";
import DormPresenceAndAbsenceTypeModalContent from "./helper/section/DormPresenceAndAbsenceTypeModalContent/DormPresenceAndAbsenceTypeModalContent";
import "./_dormPresenceAndAbsenceTypes.scss";

const DormPresenceAndAbsenceTypes = () => {
  const [presenceAndAbsenceTypeList, setIsPresenceAndAbsenceTypeList] = useState<
    DormPresenceAndAbsence[]
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

  const active = 1;
  const inActive = 3;

  const [modifyForm] = Form.useForm<{ presenceAndAbsenceTitle: string }>();

  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={DORM_BASIC_INFO_LIST_PAGE_ROUTE}>اطلاعات پایه اقامتگاه</Link>,
      },
      {
        title: "حالت‌های حضور و غیاب",
      },
    ],
  });

  //? ================================  Api Calls ================================
  //get table list
  const [
    getPresenceAndAbsenceTypes,
    { isFetching: isPresenceAndAbsenceTypesDataLoading },
  ] = useLazyGetDormPresenceAndAbsenceQuery();

  // create
  const [
    createPresenceAndAbsenceTypes,
    { isLoading: isCreatePresenceAndAbsenceTypesLoading },
  ] = useCreateDormPresenceAndAbsenceTypesMutation();

  // update
  const [
    updatePresenceAndAbsenceTypes,
    { isLoading: isUpdatePresenceAndAbsenceTypesLoading },
  ] = useUpdateDormPresenceAndAbsenceTypesMutation();

  //? ================================ Effects ================================
  useEffect(() => getPresenceAndAbsenceTypesList(), []);

  //* ================================ Util Functions ================================
  // get list
  const getPresenceAndAbsenceTypesList = () => {
    getPresenceAndAbsenceTypes({ maxResults: 2000, firstResult: 0 })
      .unwrap()
      .then(presenceAndAbsenceTypesSuccess);
  };

  const presenceAndAbsenceTypesSuccess = (
    value: GetDormPresenceAndAbsenceTypesResponse
  ) => {
    if (value?.status === 200) {
      setIsPresenceAndAbsenceTypeList(value?.data);
    }
  };

  // modify handler
  const addPresenceAndAbsenceTypeHandler = () => {
    setIsModifyModalOpen({ isOpen: true, id: -1 });
  };

  const editPresenceAndAbsenceHandler = (value: DormPresenceAndAbsence) => {
    setIsModifyModalOpen({ isOpen: true, id: value?.id });
    modifyForm.setFieldsValue({
      presenceAndAbsenceTitle: value?.title,
    });
  };

  const closeModifyModalHandler = () => {
    setIsModifyModalOpen({ isOpen: false, id: -1 });
    modifyForm.resetFields();
  };

  const confirmModifyModalHandler = () => {
    modifyForm?.submit();
    modifyForm?.validateFields().then(() => {
      const { presenceAndAbsenceTitle } = modifyForm.getFieldsValue();
      if (isModifyModalOpen?.id === -1) {
        createPresenceAndAbsenceTypes({
          form: "PresenceAbsenceList",
          data: {
            title: presenceAndAbsenceTitle,
            recordStatus: 1,
          },
        })
          .unwrap()
          .then(createPresenceAndAbsenceTypesSuccess);
      } else {
        updatePresenceAndAbsenceTypes({
          form: "PresenceAbsenceList",
          id: "fd60cd4ed8384ea39a4d7a750df464c0",
          data: {
            title: presenceAndAbsenceTitle,
            id: isModifyModalOpen?.id,
          },
        })
          .unwrap()
          .then(updatePresenceAndAbsenceTypesSuccess);
      }
    });
  };

  // create success
  const createPresenceAndAbsenceTypesSuccess = async (
    value: CreateDormPresenceAndAbsenceTypeResponse
  ) => {
    if (value?.status === 200) {
      modifyHandler();
    }
  };

  // update success
  const updatePresenceAndAbsenceTypesSuccess = async (
    value: UpdateDormPresenceAndAbsenceTypesResponse
  ) => {
    if (value?.status === 200) {
      modifyHandler();
    }
  };

  const modifyHandler = () => {
    getPresenceAndAbsenceTypesList();
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
    updatePresenceAndAbsenceTypes({
      form: "PresenceAbsenceList",
      id: "fd60cd4ed8384ea39a4d7a750df464c0",
      data: {
        recordStatus: recordStatus,
        id: isOpenSwitchModal?.id,
      },
    })
      .unwrap()
      .then(changeStatusSuccess);
  };

  const changeStatusSuccess = async (
    value: UpdateDormPresenceAndAbsenceTypesResponse
  ) => {
    if (value?.status === 200) {
      getPresenceAndAbsenceTypesList();
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
              ? "ویرایش حالت‌های حضور غیاب"
              : "افزودن حالت‌های حضور غیاب"
          }
          confirmBtnText={isModifyModalOpen?.id !== -1 ? "ثبت تغییرات" : "افزودن"}
          backBtnText="انصراف"
          isConfirmButtonLoading={
            isCreatePresenceAndAbsenceTypesLoading ||
            isUpdatePresenceAndAbsenceTypesLoading
          }
          content={<DormPresenceAndAbsenceTypeModalContent form={modifyForm} />}
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
          isConfirmButtonLoading={isUpdatePresenceAndAbsenceTypesLoading}
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

      <div className="dorm-basic-info-presence-absence-type-container">
        <ToolBox
          leftSide={
            <CustomButton
              icon={<AiOutlinePlus />}
              iconPlacement="end"
              onClick={addPresenceAndAbsenceTypeHandler}
            >
              افزودن حالت‌های حضور غیاب
            </CustomButton>
          }
        />
        <CustomTable
          dataSource={presenceAndAbsenceTypeList}
          columns={DormBasicInfoPresenceAndAbsenceTypesTableModel({
            onEditClickHandler: editPresenceAndAbsenceHandler,
            switchHandler: openSwitchModalHandler,
          })}
          loading={isPresenceAndAbsenceTypesDataLoading}
          pagination={paginationConfig}
          className="dorm-presence-absence-table-container"
          {...TABLE_PROPS(presenceAndAbsenceTypeList?.length)}
        />
      </div>
    </>
  );
};

export default DormPresenceAndAbsenceTypes;
