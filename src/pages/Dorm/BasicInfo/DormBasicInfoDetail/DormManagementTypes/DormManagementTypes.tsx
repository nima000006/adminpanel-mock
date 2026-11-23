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
  useCreateDormManagementTypesMutation,
  useLazyGetManagementTypeQuery,
  useUpdateDormManagementTypesMutation,
} from "@infra/states/redux/Apis/dorm/base/dormBaseApi";
import {
  DormManagementListTypes,
  GetManagementTypeResponse,
} from "@pages/Dorm/Planning/Admission/AdmissionModify/@types/@admissionModify";

import {
  CreateDormManagementTypesResponse,
  UpdateDormManagementTypesResponse,
} from "./@types/@dormManagementTypes";
import {
  ACTIVE_SWITCH_MODAL_MESSAGE,
  INACTIVE_SWITCH_MODAL_MESSAGE,
} from "../helper/utils/DormBasicInfoDetailUtils";
import DormBasicInfoManagementTypesTableModel from "./helper/models/DormBasicInfoManagementTypes/DormBasicInfoManagementTypesTableModel";
import DormManagementTypeModalContent from "./helper/section/DormManagementTypeModalContent/DormManagementTypeModalContent";

import "./_dormManagementTypes.scss";

const DormManagementTypes = () => {
  const [managementTypeList, setManagementTypeList] = useState<DormManagementListTypes[]>(
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

  const [modifyForm] = Form.useForm<{ managementTitle: string }>();

  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={DORM_BASIC_INFO_LIST_PAGE_ROUTE}>اطلاعات پایه اقامتگاه</Link>,
      },
      { title: "انواع مدیریت" },
    ],
  });
  //? ================================  Api Calls ================================
  const [getManagementTypes, { isFetching: isManagementTypesDataLoading }] =
    useLazyGetManagementTypeQuery();

  const [createManagementTypes, { isLoading: isCreateManagementTypesLoading }] =
    useCreateDormManagementTypesMutation();

  const [updateManagementTypes, { isLoading: isUpdateManagementTypesLoading }] =
    useUpdateDormManagementTypesMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getManagementTypeList();
  }, []);

  //* ================================ Util Functions ================================
  //get list
  const getManagementTypeList = () => {
    getManagementTypes({ maxResults: 2000, firstResult: 0 })
      .unwrap()
      .then(getManagementTypesSuccess);
  };

  const getManagementTypesSuccess = async (value: GetManagementTypeResponse) => {
    if (value?.status === 200) {
      setManagementTypeList(value?.data);
    }
  };

  // create and update
  const addManagementTypeHandler = () => {
    setIsModifyModalOpen({ isOpen: true, id: -1 });
  };

  const editManagementTypeHandler = (value: DormManagementListTypes) => {
    setIsModifyModalOpen({ isOpen: true, id: value?.id });
    modifyForm.setFieldsValue({
      managementTitle: value?.title,
    });
  };

  const closeModifyModalHandler = () => {
    setIsModifyModalOpen({ isOpen: false, id: -1 });
    modifyForm.resetFields();
  };

  const confirmModifyModalHandler = () => {
    modifyForm?.submit();
    modifyForm?.validateFields().then(() => {
      const { managementTitle } = modifyForm.getFieldsValue();

      if (isModifyModalOpen?.id === -1) {
        createManagementTypes({
          form: "ManagementType",
          data: {
            title: managementTitle,
            recordStatus: 1,
          },
        })
          .unwrap()
          .then(createManagementTypesSuccess);
      } else {
        updateManagementTypes({
          form: "ManagementType",
          id: "73f5330174f249d2b9828b8ec1252fa2",
          data: {
            title: managementTitle,
            id: isModifyModalOpen?.id,
          },
        })
          .unwrap()
          .then(updateManagementTypesSuccess);
      }
    });
  };

  const createManagementTypesSuccess = async (
    value: CreateDormManagementTypesResponse
  ) => {
    if (value?.status === 200) {
      modifyHandler();
    }
  };

  const updateManagementTypesSuccess = async (
    value: UpdateDormManagementTypesResponse
  ) => {
    if (value?.status === 200) {
      modifyHandler();
    }
  };

  const modifyHandler = () => {
    getManagementTypeList();
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
    const recordStatus = isOpenSwitchModal?.isActive ? "3" : "1";

    updateManagementTypes({
      form: "ManagementType",
      id: "73f5330174f249d2b9828b8ec1252fa2",
      data: {
        recordStatus: recordStatus,
        id: isOpenSwitchModal?.id,
      },
    })
      .unwrap()
      .then(changeStatusSuccess);
  };

  const changeStatusSuccess = async (value: UpdateDormManagementTypesResponse) => {
    if (value?.status === 200) {
      getManagementTypeList();
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
          title={isModifyModalOpen?.id !== -1 ? "ویرایش نوع مدیریت" : "افزودن نوع مدیریت"}
          confirmBtnText={isModifyModalOpen?.id !== -1 ? "ثبت تغییرات" : "افزودن"}
          backBtnText="انصراف"
          isConfirmButtonLoading={
            isCreateManagementTypesLoading || isUpdateManagementTypesLoading
          }
          content={<DormManagementTypeModalContent form={modifyForm} />}
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
          isConfirmButtonLoading={isUpdateManagementTypesLoading}
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

      <div className="dorm-basic-info-management-type-container">
        <CustomTable
          dataSource={managementTypeList}
          columns={DormBasicInfoManagementTypesTableModel({
            onEditClickHandler: editManagementTypeHandler,
            switchHandler: openSwitchModalHandler,
          })}
          loading={isManagementTypesDataLoading}
          className="dorm-management-type-table-container"
          pagination={paginationConfig}
          {...TABLE_PROPS(managementTypeList?.length)}
        />
        <CustomButton
          icon={<AiOutlinePlus />}
          iconPlacement="end"
          onClick={addManagementTypeHandler}
        >
          افزودن نوع مدیریت
        </CustomButton>
      </div>
    </>
  );
};

export default DormManagementTypes;
