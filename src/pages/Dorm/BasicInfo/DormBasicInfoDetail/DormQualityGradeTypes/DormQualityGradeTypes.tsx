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
  useCreateDormQualityTypesMutation,
  useLazyGetDormQualityTypesQuery,
  useUpdateDormQualityTypesMutation,
} from "@infra/states/redux/Apis/dorm/base/dormBaseApi";
import {
  DormQualityTypes,
  GetDormQualityTypesResponse,
} from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/components/Building/BuildingCreateAndModify/@types/@buildingCreateAndModify";

import {
  CreateDormQualityTypesResponse,
  UpdateDormQualityTypesResponse,
} from "./@types/@dormQualityGradeTypes";
import {
  ACTIVE_SWITCH_MODAL_MESSAGE,
  INACTIVE_SWITCH_MODAL_MESSAGE,
} from "../helper/utils/DormBasicInfoDetailUtils";
import DormBasicInfoQualityTypesTableModel from "./helper/models/DormBasicInfoQualityTypes/DormBasicInfoQualityTypesTableModel";
import DormQualityGradeTypeModalContent from "./helper/section/DormQualityGradeTypeModalContent/DormQualityGradeTypeModalContent";

import "./_dormQualityGradeTypes.scss";

const DormQualityGradeTypes = () => {
  const [qualityTypeList, setQualityTypeList] = useState<DormQualityTypes[]>([]);

  const [isModifyModalOpen, setIsModifyModalOpen] = useState({
    isOpen: false,
    id: -1,
  });

  const [isOpenSwitchModal, setIsOpenSwitchModal] = useState({
    isOpen: false,
    id: -1,
    isActive: false,
  });

  const [modifyForm] = Form.useForm<{ qualityTitle: string }>();

  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={DORM_BASIC_INFO_LIST_PAGE_ROUTE}>اطلاعات پایه اقامتگاه</Link>,
      },
      {
        title: "انواع درجه کیفی",
      },
    ],
  });

  //? ================================  Api Calls ================================
  const [getQualityTypes, { isFetching: isQualityTypesDataLoading }] =
    useLazyGetDormQualityTypesQuery();

  const [createQualityTypes, { isLoading: isCreateQualityTypesLoading }] =
    useCreateDormQualityTypesMutation();

  const [updateQualityTypes, { isLoading: isUpdateQualityTypesLoading }] =
    useUpdateDormQualityTypesMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getQualityTypeList();
  }, []);

  //* ================================ Util Functions ================================
  //get list
  const getQualityTypeList = () => {
    getQualityTypes({
      maxResults: 2000,
      firstResult: 0,
    })
      .unwrap()
      .then(getQualityTypesSuccess);
  };

  const getQualityTypesSuccess = async (value: GetDormQualityTypesResponse) => {
    if (value?.status === 200) {
      setQualityTypeList(value?.data);
    }
  };

  // create and update
  const addQualityTypeHandler = () => {
    setIsModifyModalOpen({ isOpen: true, id: -1 });
  };

  const editQualityTypeHandler = (value: DormQualityTypes) => {
    setIsModifyModalOpen({ isOpen: true, id: value?.id });
    modifyForm.setFieldsValue({
      qualityTitle: value?.title,
    });
  };

  const closeModifyModalHandler = () => {
    setIsModifyModalOpen({ isOpen: false, id: -1 });
    modifyForm.resetFields();
  };

  const confirmModifyModalHandler = () => {
    modifyForm?.submit();
    modifyForm?.validateFields().then(() => {
      const { qualityTitle } = modifyForm.getFieldsValue();

      if (isModifyModalOpen?.id === -1) {
        createQualityTypes({
          form: "TypeAssignment",
          data: {
            title: qualityTitle,
            recordStatus: 1,
          },
        })
          .unwrap()
          .then(createQualityTypesSuccess);
      } else {
        updateQualityTypes({
          form: "Quality",
          id: "78af90b7fe5f485a8c1237be3bee300e",
          data: {
            title: qualityTitle,
            id: isModifyModalOpen?.id,
          },
        })
          .unwrap()
          .then(updateQualityTypesSuccess);
      }
    });
  };

  const createQualityTypesSuccess = async (value: CreateDormQualityTypesResponse) => {
    if (value?.status === 200) {
      modifyHandler();
    }
  };

  const updateQualityTypesSuccess = async (value: UpdateDormQualityTypesResponse) => {
    if (value?.status === 200) {
      modifyHandler();
    }
  };

  const modifyHandler = () => {
    getQualityTypeList();
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

    updateQualityTypes({
      form: "Quality",
      id: "78af90b7fe5f485a8c1237be3bee300e",
      data: {
        recordStatus: recordStatus,
        id: isOpenSwitchModal?.id,
      },
    })
      .unwrap()
      .then(changeStatusSuccess);
  };

  const changeStatusSuccess = async (value: UpdateDormQualityTypesResponse) => {
    if (value?.status === 200) {
      getQualityTypeList();
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
            isModifyModalOpen?.id !== -1 ? "ویرایش درجه کیفی تخت" : "افزودن درجه کیفی تخت"
          }
          confirmBtnText={isModifyModalOpen?.id !== -1 ? "ثبت تغییرات" : "افزودن"}
          backBtnText="انصراف"
          isConfirmButtonLoading={
            isCreateQualityTypesLoading || isUpdateQualityTypesLoading
          }
          content={<DormQualityGradeTypeModalContent form={modifyForm} />}
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
          isConfirmButtonLoading={isUpdateQualityTypesLoading}
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

      <div className="dorm-basic-info-quality-grade-type-container">
        <ToolBox
          leftSide={
            <CustomButton
              icon={<AiOutlinePlus />}
              iconPlacement="end"
              onClick={addQualityTypeHandler}
            >
              افزودن درجه کیفی
            </CustomButton>
          }
        />
        <CustomTable
          dataSource={qualityTypeList}
          columns={DormBasicInfoQualityTypesTableModel({
            onEditClickHandler: editQualityTypeHandler,
            switchHandler: openSwitchModalHandler,
          })}
          loading={isQualityTypesDataLoading}
          className="dorm-quality-type-table-container"
          pagination={paginationConfig}
          {...TABLE_PROPS(qualityTypeList?.length)}
        />
      </div>
    </>
  );
};

export default DormQualityGradeTypes;
