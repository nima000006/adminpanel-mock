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
  useCreateDormRuleAndPrincipleTypesMutation,
  useLazyGetRuleAndPrincipleTypeQuery,
  useUpdateDormRuleAndPrincipleTypesMutation,
} from "@infra/states/redux/Apis/dorm/base/dormBaseApi";

import {
  CreateDormRuleAndPrincipleTypesResponse,
  GetRuleAndPrincipleTypeResponse,
  RuleAndPrincipleTypeList,
  UpdateDormRuleAndPrincipleTypesResponse,
} from "./@types/@dormRulesAndRegulationsTypes";
import {
  ACTIVE_SWITCH_MODAL_MESSAGE,
  INACTIVE_SWITCH_MODAL_MESSAGE,
} from "../helper/utils/DormBasicInfoDetailUtils";
import DormBasicInfoRuleAndPrincipleTypesTableModel from "./helper/models/DormBasicInfoRuleAndPrincipleTypes/DormBasicInfoRuleAndPrincipleTypesTableModel";
import DormRulesAndRegulationTypeModalContent from "./helper/section/DormRulesAndRegulationTypeModalContent/DormRulesAndRegulationTypeModalContent";
import "./_dormRulesAndRegulationsTypes.scss";

const DormRulesAndRegulationsTypes = () => {
  const [rulesAndRegulationsTypeList, setRulesAndRegulationsTypeList] = useState<
    RuleAndPrincipleTypeList[]
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

  const [modifyForm] = Form.useForm<{ rulesAndRegulationTitle: string }>();

  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={DORM_BASIC_INFO_LIST_PAGE_ROUTE}>اطلاعات پایه اقامتگاه</Link>,
      },
      {
        title: "انواع قوانین و مقررات",
      },
    ],
  });

  //? ================================  Api Calls ================================
  const [getRuleAndPrincipleTypes, { isFetching: isRuleAndPrincipleTypesDataLoading }] =
    useLazyGetRuleAndPrincipleTypeQuery();

  const [
    createRuleAndPrincipleTypes,
    { isLoading: isCreateRuleAndPrincipleTypesLoading },
  ] = useCreateDormRuleAndPrincipleTypesMutation();

  const [
    updateRuleAndPrincipleTypes,
    { isLoading: isUpdateRuleAndPrincipleTypesLoading },
  ] = useUpdateDormRuleAndPrincipleTypesMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getRuleAndPrincipleTypeList();
  }, []);

  //* ================================ Util Functions ================================
  // get list
  const getRuleAndPrincipleTypeList = () => {
    getRuleAndPrincipleTypes({ maxResults: 2000, firstResult: 0 })
      .unwrap()
      .then(getRuleAndPrincipleTypesSuccess);
  };

  const getRuleAndPrincipleTypesSuccess = async (
    value: GetRuleAndPrincipleTypeResponse
  ) => {
    if (value?.status === 200) {
      setRulesAndRegulationsTypeList(value?.data);
    }
  };

  // create and update
  const addRuleAndPrincipleTypeHandler = () => {
    setIsModifyModalOpen({ isOpen: true, id: -1 });
  };

  const editRuleAndPrincipleTypeHandler = (value: RuleAndPrincipleTypeList) => {
    setIsModifyModalOpen({ isOpen: true, id: value?.id });
    modifyForm.setFieldsValue({
      rulesAndRegulationTitle: value?.title,
    });
  };

  const closeModifyModalHandler = () => {
    setIsModifyModalOpen({ isOpen: false, id: -1 });
    modifyForm.resetFields();
  };

  const confirmModifyModalHandler = () => {
    modifyForm?.submit();
    modifyForm?.validateFields().then(() => {
      const { rulesAndRegulationTitle } = modifyForm.getFieldsValue();

      if (isModifyModalOpen?.id === -1) {
        createRuleAndPrincipleTypes({
          form: "RuleAndPrincipleType",
          data: {
            title: rulesAndRegulationTitle,
            recordStatus: 1,
          },
        })
          .unwrap()
          .then(createRuleAndPrincipleTypesSuccess);
      } else {
        updateRuleAndPrincipleTypes({
          form: "RuleAndPrincipleType",
          id: "d8cc8f6322d34656874c88811a481e2b",
          data: {
            title: rulesAndRegulationTitle,
            id: isModifyModalOpen?.id,
          },
        })
          .unwrap()
          .then(updateRuleAndPrincipleTypesSuccess);
      }
    });
  };

  const createRuleAndPrincipleTypesSuccess = async (
    value: CreateDormRuleAndPrincipleTypesResponse
  ) => {
    if (value?.status === 200) {
      modifyHandler();
    }
  };

  const updateRuleAndPrincipleTypesSuccess = async (
    value: UpdateDormRuleAndPrincipleTypesResponse
  ) => {
    if (value?.status === 200) {
      modifyHandler();
    }
  };

  const modifyHandler = () => {
    getRuleAndPrincipleTypeList();
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

    updateRuleAndPrincipleTypes({
      form: "RuleAndPrincipleType",
      id: "d8cc8f6322d34656874c88811a481e2b",
      data: {
        recordStatus: recordStatus,
        id: isOpenSwitchModal?.id,
      },
    })
      .unwrap()
      .then(changeStatusSuccess);
  };

  const changeStatusSuccess = async (value: UpdateDormRuleAndPrincipleTypesResponse) => {
    if (value?.status === 200) {
      getRuleAndPrincipleTypeList();
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
              ? "ویرایش نوع قوانین و مقررات"
              : "افزودن نوع قوانین و مقررات"
          }
          confirmBtnText={isModifyModalOpen?.id !== -1 ? "ثبت تغییرات" : "افزودن"}
          backBtnText="انصراف"
          isConfirmButtonLoading={
            isCreateRuleAndPrincipleTypesLoading || isUpdateRuleAndPrincipleTypesLoading
          }
          content={<DormRulesAndRegulationTypeModalContent form={modifyForm} />}
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
          isConfirmButtonLoading={isUpdateRuleAndPrincipleTypesLoading}
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

      <div className="dorm-basic-info-rules-regulations-type-container">
        <CustomTable
          dataSource={rulesAndRegulationsTypeList}
          columns={DormBasicInfoRuleAndPrincipleTypesTableModel({
            onEditClickHandler: editRuleAndPrincipleTypeHandler,
            switchHandler: openSwitchModalHandler,
          })}
          loading={isRuleAndPrincipleTypesDataLoading}
          className="dorm-rules-regulations-type-table"
          pagination={paginationConfig}
          {...TABLE_PROPS(rulesAndRegulationsTypeList?.length)}
        />
        <CustomButton
          icon={<AiOutlinePlus />}
          iconPlacement="end"
          disabled
          onClick={addRuleAndPrincipleTypeHandler}
        >
          افزودن نوع قوانین و مقررات
        </CustomButton>
      </div>
    </>
  );
};

export default DormRulesAndRegulationsTypes;
