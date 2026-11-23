import { useEffect, useState } from "react";

import { Form } from "antd";
import { AiOutlinePlus } from "react-icons/ai";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import {
  useCreateDormSubsetRulesMutation,
  useLazyGetDormInstallmentsRulesTypesQuery,
  useUpdateDormSubsetRulesMutation,
} from "@infra/states/redux/Apis/dorm/base/dormBaseApi";
import {
  ACTIVE_SWITCH_MODAL_MESSAGE,
  INACTIVE_SWITCH_MODAL_MESSAGE,
} from "@pages/Dorm/BasicInfo/DormBasicInfoDetail/helper/utils/DormBasicInfoDetailUtils";
import {
  DormRulesTypes,
  GetDormRulesTypesResponse,
} from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/components/Building/BuildingCreateAndModify/@types/@buildingCreateAndModify";

import ModifySubsetsRulesAndRegulationModalContent from "../../../_shared/modals/ModifySubsetsRulesAndRegulationModalContent/ModifySubsetsRulesAndRegulationModalContent";
import DormBasicInfoSubsetsRulesTableModel from "../../../_shared/models/DormBasicInfoSubsetsRulesAndRegulations/DormBasicInfoSubsetsRulesTableModel";
import { subsetRulesTypes } from "../../../_shared/utils/subsetRulesUtils";
import {
  CreateDormSubsetRulesResponse,
  UpdateDormSubsetRulesResponse,
} from "../../@types/@dormSubsetRulesType";
import "./_installmentsRulesAndRegulation.scss";

const InstallmentsRulesAndRegulation = () => {
  const [dormSubsetRulesList, setDormSubsetRulesList] = useState<DormRulesTypes[]>([]);

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

  const [modifyForm] = Form.useForm<{ subsetRulesTitle: string }>();

  //? ================================  Api Calls ================================
  //get table list
  const [getSubsetRules, { isFetching: isGetSubsetRulesDataLoading }] =
    useLazyGetDormInstallmentsRulesTypesQuery();

  // create
  const [createSubsetRules, { isLoading: isCreateSubsetRulesLoading }] =
    useCreateDormSubsetRulesMutation();

  // update
  const [updateSubsetRules, { isLoading: isUpdateSubsetRulesLoading }] =
    useUpdateDormSubsetRulesMutation();

  //? ================================ Effects ================================
  useEffect(() => getSubsetRulesTypesList(), []);

  //* ================================ Util Functions ================================
  // get list
  const getSubsetRulesTypesList = () => {
    getSubsetRules({
      maxResults: 2000,
      firstResult: 0,
      typeId_EQ: 6,
    })
      .unwrap()
      .then(getSubsetRulesTypesSuccess);
  };

  const getSubsetRulesTypesSuccess = (value: GetDormRulesTypesResponse) => {
    if (value?.status === 200) {
      setDormSubsetRulesList(value?.data);
    }
  };

  // modify handler
  const addRulesTypeHandler = () => {
    setIsModifyModalOpen({ isOpen: true, id: -1 });
  };

  const editRulesTypesHandler = (value: DormRulesTypes) => {
    setIsModifyModalOpen({ isOpen: true, id: value?.id });
    modifyForm.setFieldsValue({
      subsetRulesTitle: value?.title,
    });
  };

  const closeModifyModalHandler = () => {
    setIsModifyModalOpen({ isOpen: false, id: -1 });
    modifyForm.resetFields();
  };

  const confirmModifyModalHandler = () => {
    modifyForm?.submit();
    modifyForm?.validateFields().then(() => {
      const { subsetRulesTitle } = modifyForm.getFieldsValue();
      if (isModifyModalOpen?.id === -1) {
        createSubsetRules({
          form: "SubsetRules",
          data: {
            title: subsetRulesTitle,
            typeId: subsetRulesTypes["installment"],
            recordStatus: 1, //Backend said to be 1 by default
          },
        })
          .unwrap()
          .then(createSubsetRulesSuccess);
      } else {
        updateSubsetRules({
          form: "SubsetRules",
          id: "ef98ed6496c845f8b2def2faa54ed425",
          data: {
            title: subsetRulesTitle,
            typeId: subsetRulesTypes["installment"],
            id: isModifyModalOpen?.id,
          },
        })
          .unwrap()
          .then(updateSubsetRulesSuccess);
      }
    });
  };

  // create success
  const createSubsetRulesSuccess = async (value: CreateDormSubsetRulesResponse) => {
    if (value?.status === 200) {
      modifyHandler();
    }
  };

  // update success
  const updateSubsetRulesSuccess = async (value: UpdateDormSubsetRulesResponse) => {
    if (value?.status === 200) {
      modifyHandler();
    }
  };

  const modifyHandler = () => {
    getSubsetRulesTypesList();
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
    updateSubsetRules({
      form: "SubsetRules",
      id: "ef98ed6496c845f8b2def2faa54ed425",
      data: {
        recordStatus: recordStatus,
        typeId: subsetRulesTypes["installment"],
        id: isOpenSwitchModal?.id,
      },
    })
      .unwrap()
      .then(changeStatusSuccess);
  };

  const changeStatusSuccess = async (value: UpdateDormSubsetRulesResponse) => {
    if (value?.status === 200) {
      getSubsetRulesTypesList();
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
              ? "ویرایش متن قوانین و مقررات"
              : "افزودن متن قوانین و مقررات"
          }
          confirmBtnText={isModifyModalOpen?.id !== -1 ? "ثبت تغییرات" : "افزودن"}
          backBtnText="انصراف"
          isConfirmButtonLoading={
            isCreateSubsetRulesLoading || isUpdateSubsetRulesLoading
          }
          content={<ModifySubsetsRulesAndRegulationModalContent form={modifyForm} />}
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
          isConfirmButtonLoading={isUpdateSubsetRulesLoading}
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

      <div className="dorm-basic-info-subsets-rules-installments-type-container">
        <ToolBox
          leftSide={
            <CustomButton
              icon={<AiOutlinePlus />}
              iconPlacement="end"
              onClick={addRulesTypeHandler}
            >
              افزودن قوانین و مقررات
            </CustomButton>
          }
        />
        <CustomTable
          dataSource={dormSubsetRulesList}
          columns={DormBasicInfoSubsetsRulesTableModel({
            onEditClickHandler: editRulesTypesHandler,
            switchHandler: openSwitchModalHandler,
          })}
          loading={isGetSubsetRulesDataLoading}
          pagination={paginationConfig}
          className="dorm-installment-rules-table-container"
          {...TABLE_PROPS(dormSubsetRulesList?.length)}
        />
      </div>
    </>
  );
};

export default InstallmentsRulesAndRegulation;
