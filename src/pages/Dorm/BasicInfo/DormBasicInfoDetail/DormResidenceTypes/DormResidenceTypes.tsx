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
  useCreateDormResidenceTypesMutation,
  useUpdateDormResidenceTypesMutation,
} from "@infra/states/redux/Apis/dorm/base/dormBaseApi";
import { useLazyGetResidenceTypeQuery } from "@infra/states/redux/Apis/dorm/residence/dormResidenceApi";
import {
  GetResidenceTypeResponse,
  ResidenceType,
} from "@pages/Dorm/Residence/DormCreateAndModify/@types/@dormCreateAndModify";

import {
  CreateDormResidenceTypeResponse,
  UpdateDormResidenceTypesResponse,
} from "./@types/@dormResidenceTypes";
import {
  ACTIVE_SWITCH_MODAL_MESSAGE,
  INACTIVE_SWITCH_MODAL_MESSAGE,
} from "../helper/utils/DormBasicInfoDetailUtils";
import DormBasicInfoResidenceTypesTableModel from "./helper/models/DormBasicInfoResidenceTypes/DormBasicInfoResidenceTypesTableModel";
import DormResidenceTypeModalContent from "./helper/section/DormResidenceTypeModalContent/DormResidenceTypeModalContent";
import "./_dormResidenceTypes.scss";

const DormResidenceTypes = () => {
  const [residenceTypeList, setIsResidenceTypeList] = useState<ResidenceType[]>([]);

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

  const [modifyForm] = Form.useForm<{ residenceTitle: string }>();

  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={DORM_BASIC_INFO_LIST_PAGE_ROUTE}>اطلاعات پایه اقامتگاه</Link>,
      },
      {
        title: "انواع اقامتگاه",
      },
    ],
  });

  //? ================================  Api Calls ================================
  //get table list
  const [getResidenceTypes, { isFetching: isResidenceTypesDataLoading }] =
    useLazyGetResidenceTypeQuery();

  // create
  const [createResidenceTypes, { isLoading: isCreateResidenceTypesLoading }] =
    useCreateDormResidenceTypesMutation();

  // update
  const [updateResidenceTypes, { isLoading: isUpdateResidenceTypesLoading }] =
    useUpdateDormResidenceTypesMutation();

  //? ================================ Effects ================================
  useEffect(() => getResidenceTypesList(), []);

  //* ================================ Util Functions ================================
  // get list
  const getResidenceTypesList = () => {
    getResidenceTypes({
      //we should set 0 and 2000 as a default and recordStatus_EQ :1 if showInActiveData: true
      firstResult: 0,
      maxResults: 2000,
      showInActiveData: true,
      recordStatus_EQ: 1,
    })
      .unwrap()
      .then(getResidenceTypesSuccess);
  };

  const getResidenceTypesSuccess = (value: GetResidenceTypeResponse) => {
    if (value?.status === 200) {
      setIsResidenceTypeList(value?.data);
    }
  };

  // modify handler
  const addResidenceTypeHandler = () => {
    setIsModifyModalOpen({ isOpen: true, id: -1 });
  };

  const editResidenceTypesHandler = (value: ResidenceType) => {
    setIsModifyModalOpen({ isOpen: true, id: value?.id });
    modifyForm.setFieldsValue({
      residenceTitle: value?.title,
    });
  };

  const closeModifyModalHandler = () => {
    setIsModifyModalOpen({ isOpen: false, id: -1 });
    modifyForm.resetFields();
  };

  const confirmModifyModalHandler = () => {
    modifyForm?.submit();
    modifyForm?.validateFields().then(() => {
      const { residenceTitle } = modifyForm.getFieldsValue();
      if (isModifyModalOpen?.id === -1) {
        createResidenceTypes({
          form: "TypeAssignment",
          data: {
            title: residenceTitle,
            recordStatus: 1,
          },
        })
          .unwrap()
          .then(createResidenceTypesSuccess);
      } else {
        updateResidenceTypes({
          form: "AccommodationType",
          id: "180754945a6c443e8e61d446f62dba4f",
          data: {
            title: residenceTitle,
            id: isModifyModalOpen?.id,
          },
        })
          .unwrap()
          .then(updateResidenceTypesSuccess);
      }
    });
  };
  // create success
  const createResidenceTypesSuccess = async (value: CreateDormResidenceTypeResponse) => {
    if (value?.status === 200) {
      modifyHandler();
    }
  };

  // update success
  const updateResidenceTypesSuccess = async (value: UpdateDormResidenceTypesResponse) => {
    if (value?.status === 200) {
      modifyHandler();
    }
  };

  const modifyHandler = () => {
    getResidenceTypesList();
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
    updateResidenceTypes({
      form: "AccommodationType",
      id: "180754945a6c443e8e61d446f62dba4f",
      data: {
        recordStatus: recordStatus,
        id: isOpenSwitchModal?.id,
      },
    })
      .unwrap()
      .then(changeStatusSuccess);
  };

  const changeStatusSuccess = async (value: UpdateDormResidenceTypesResponse) => {
    if (value?.status === 200) {
      getResidenceTypesList();
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
            isModifyModalOpen?.id !== -1 ? "ویرایش  نوع اقامتگاه" : "افزودن نوع اقامتگاه"
          }
          confirmBtnText={isModifyModalOpen?.id !== -1 ? "ثبت تغییرات" : "افزودن"}
          backBtnText="انصراف"
          isConfirmButtonLoading={
            isCreateResidenceTypesLoading || isUpdateResidenceTypesLoading
          }
          content={<DormResidenceTypeModalContent form={modifyForm} />}
          closeModalHandler={closeModifyModalHandler}
          onConfirmClickHandler={confirmModifyModalHandler}
          showIcon={false}
        />
      )}

      {/* VIEW MODAL   */}
      {/* {isViewModalOpen?.isOpen && (
        <ConfirmationModalWithContent
          isModalOpen={isViewModalOpen?.isOpen}
          title={"مشاهده شعب"}
          content={<DormResidenceTypeViewModalContent />}
          closeModalHandler={closeViewModalHandler}
          // isConfirmButtonLoading={}
          showIcon={false}
          hasNavigatorButton={false}
        />
      )} */}

      {/* SWITCH INACTIVE MODAL */}
      {isOpenSwitchModal?.isOpen && (
        <ConfirmationModalWithContent
          isModalOpen={isOpenSwitchModal?.isOpen}
          title={!isOpenSwitchModal?.isActive ? "فعال کردن" : "غیر فعال کردن"}
          confirmBtnText={!isOpenSwitchModal?.isActive ? "فعال کن" : "غیر فعال "}
          backBtnText="انصراف"
          isDangerous={!isOpenSwitchModal?.isActive ? false : true}
          isConfirmButtonLoading={isUpdateResidenceTypesLoading}
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

      <div className="dorm-basic-info-residence-type-container">
        <ToolBox
          leftSide={
            <CustomButton
              icon={<AiOutlinePlus />}
              iconPlacement="end"
              onClick={addResidenceTypeHandler}
            >
              افزودن نوع اقامتگاه
            </CustomButton>
          }
        />
        <CustomTable
          dataSource={residenceTypeList}
          columns={DormBasicInfoResidenceTypesTableModel({
            onEditClickHandler: editResidenceTypesHandler,
            switchHandler: openSwitchModalHandler,
            // onViewClickHandler: onViewClickHandler,
          })}
          loading={isResidenceTypesDataLoading}
          pagination={paginationConfig}
          className="dorm-residence-table-container"
          {...TABLE_PROPS(residenceTypeList?.length)}
        />
      </div>
    </>
  );
};

export default DormResidenceTypes;
