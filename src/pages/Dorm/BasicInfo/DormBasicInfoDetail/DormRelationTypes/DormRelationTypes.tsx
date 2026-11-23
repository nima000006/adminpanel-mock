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
  useCreateDormRelationTypesMutation,
  useLazyGetRelationTypeQuery,
  useUpdateDormRelationTypesMutation,
} from "@infra/states/redux/Apis/dorm/base/dormBaseApi";

import {
  CreateDormRelationTypesResponse,
  GetRelationTypeResponse,
  RelationTypeData,
  UpdateDormRelationTypesResponse,
} from "./@types/@dormRelationTypes";
import {
  ACTIVE_SWITCH_MODAL_MESSAGE,
  INACTIVE_SWITCH_MODAL_MESSAGE,
} from "../helper/utils/DormBasicInfoDetailUtils";
import DormBasicInfoRelationTypesTableModel from "./helper/models/DormBasicInfoRelationTypes/DormBasicInfoRelationTypesTableModel";
import DormRelationTypeModalContent from "./helper/section/DormRelationTypeModalContent/DormRelationTypeModalContent";
import "./_dormRelationTypes.scss";

const DormRelationTypes = () => {
  const [relationTypesList, setIsRelationTypesList] = useState<RelationTypeData[]>([]);

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

  const [modifyForm] = Form.useForm<{ relationTypeTitle: string }>();

  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={DORM_BASIC_INFO_LIST_PAGE_ROUTE}>اطلاعات پایه اقامتگاه</Link>,
      },
      {
        title: "انواع نسبت",
      },
    ],
  });

  //? ================================  Api Calls ================================
  // get table list
  const [getRelationTypes, { isFetching: isRelationTypesLoading }] =
    useLazyGetRelationTypeQuery();

  // create
  const [createRelationTypes, { isLoading: isCreateRelationTypesLoading }] =
    useCreateDormRelationTypesMutation();

  // update
  const [updateRelationTypes, { isLoading: isUpdateRelationTypesLoading }] =
    useUpdateDormRelationTypesMutation();

  //? ================================ Effects ================================
  useEffect(() => getRelationTypesList(), []);

  //* ================================ Util Functions ================================
  // get list
  const getRelationTypesList = () => {
    getRelationTypes({ maxResults: 2000, firstResult: 0 })
      .unwrap()
      .then(getSpecialConditionsTypesSuccess);
  };

  const getSpecialConditionsTypesSuccess = (value: GetRelationTypeResponse) => {
    if (value?.status === 200) {
      setIsRelationTypesList(value?.data);
    }
  };

  // modify handler
  const addRelationTypeHandler = () => {
    setIsModifyModalOpen({ isOpen: true, id: -1 });
  };

  const editSpecialConditionsTypeHandler = (value: RelationTypeData) => {
    setIsModifyModalOpen({ isOpen: true, id: value?.id });
    modifyForm.setFieldsValue({
      relationTypeTitle: value?.title,
    });
  };

  const closeModifyModalHandler = () => {
    setIsModifyModalOpen({ isOpen: false, id: -1 });
    modifyForm.resetFields();
  };

  const confirmModifyModalHandler = () => {
    modifyForm?.submit();
    modifyForm?.validateFields().then(() => {
      const { relationTypeTitle } = modifyForm.getFieldsValue();
      if (isModifyModalOpen?.id === -1) {
        createRelationTypes({
          form: "Kinship",
          data: {
            title: relationTypeTitle,
            recordStatus: 1,
          },
        })
          .unwrap()
          .then(createRelationTypesSuccess);
      } else {
        updateRelationTypes({
          form: "Kinship",
          id: "8fc8af7f4a694cfa9553f98c8bfa3ee7",
          data: {
            title: relationTypeTitle,
            id: isModifyModalOpen?.id,
          },
        })
          .unwrap()
          .then(updateRelationTypesSuccess);
      }
    });
  };

  // create success
  const createRelationTypesSuccess = async (value: CreateDormRelationTypesResponse) => {
    if (value?.status === 200) {
      modifyHandler();
    }
  };

  //update success
  const updateRelationTypesSuccess = async (value: UpdateDormRelationTypesResponse) => {
    if (value?.status === 200) {
      modifyHandler();
    }
  };

  const modifyHandler = () => {
    getRelationTypesList();
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
    updateRelationTypes({
      form: "Kinship",
      id: "8fc8af7f4a694cfa9553f98c8bfa3ee7",
      data: {
        recordStatus: recordStatus,
        id: isOpenSwitchModal?.id,
      },
    })
      .unwrap()
      .then(changeStatusSuccess);
  };

  const changeStatusSuccess = async (value: UpdateDormRelationTypesResponse) => {
    if (value?.status === 200) {
      getRelationTypesList();
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
          title={isModifyModalOpen?.id !== -1 ? "ویرایش نسبت" : "افزودن نسبت"}
          confirmBtnText={isModifyModalOpen?.id !== -1 ? "ثبت تغییرات" : "افزودن"}
          backBtnText="انصراف"
          isConfirmButtonLoading={
            isCreateRelationTypesLoading || isUpdateRelationTypesLoading
          }
          content={<DormRelationTypeModalContent form={modifyForm} />}
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
          isConfirmButtonLoading={isUpdateRelationTypesLoading}
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

      <div className="dorm-basic-info-relation-type-container">
        <ToolBox
          leftSide={
            <CustomButton
              icon={<AiOutlinePlus />}
              iconPlacement="end"
              onClick={addRelationTypeHandler}
            >
              افزودن نسبت
            </CustomButton>
          }
        />
        <CustomTable
          dataSource={relationTypesList}
          columns={DormBasicInfoRelationTypesTableModel({
            onEditClickHandler: editSpecialConditionsTypeHandler,
            switchHandler: openSwitchModalHandler,
          })}
          loading={isRelationTypesLoading}
          pagination={paginationConfig}
          className="dorm-relation-table-container"
          {...TABLE_PROPS(relationTypesList?.length)}
        />
      </div>
    </>
  );
};

export default DormRelationTypes;
