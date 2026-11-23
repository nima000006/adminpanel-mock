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
  useCreateSpecialConditionsTypesMutation,
  useLazyGetSpecialStatusQuery,
  useUpdateSpecialConditionsTypesMutation,
} from "@infra/states/redux/Apis/dorm/base/dormBaseApi";
import {
  GetSpecialStatusResponse,
  SpecialStatusTypes,
} from "@pages/Dorm/Planning/Admission/AdmissionModify/@types/@admissionModify";

import {
  CreateDormSpecialConditionsTypesResponse,
  UpdateDormSpecialConditionsTypesResponse,
} from "./@types/@dormSpecialConditionsTypes";
import {
  ACTIVE_SWITCH_MODAL_MESSAGE,
  INACTIVE_SWITCH_MODAL_MESSAGE,
} from "../helper/utils/DormBasicInfoDetailUtils";
import DormBasicInfoSpecialConditionsTypesTableModel from "./helper/models/DormBasicInfoSpecialConditionsTypes/DormBasicInfoSpecialConditionsTypesTableModel";
import DormSpecialConditionsTypeModalContent from "./helper/section/DormSpecialConditionsTypeModalContent/DormSpecialConditionsTypeModalContent";

import "./_dormSpecialConditionsTypes.scss";

const DormSpecialConditionsTypes = () => {
  const [specialConditionsList, setIsSpecialConditionsList] = useState<
    SpecialStatusTypes[]
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

  const [modifyForm] = Form.useForm<{ specialConditionsTitle: string }>();

  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={DORM_BASIC_INFO_LIST_PAGE_ROUTE}>اطلاعات پایه اقامتگاه</Link>,
      },
      {
        title: "انواع شرایط خاص",
      },
    ],
  });

  //? ================================  Api Calls ================================
  // get table list
  const [getSpecialConditionsTypes, { isFetching: isSpecialConditionsTypesDataLoading }] =
    useLazyGetSpecialStatusQuery();

  // create
  const [
    createSpecialConditionsTypes,
    { isLoading: isCreateSpecialConditionsTypesLoading },
  ] = useCreateSpecialConditionsTypesMutation();

  // update
  const [
    updateSpecialConditionsTypes,
    { isLoading: isUpdateSpecialConditionsTypesLoading },
  ] = useUpdateSpecialConditionsTypesMutation();

  //? ================================ Effects ================================
  useEffect(() => getSpecialConditionsList(), []);

  //* ================================ Util Functions ================================
  // get list
  const getSpecialConditionsList = () => {
    getSpecialConditionsTypes({ maxResults: 2000, firstResult: 0 })
      .unwrap()
      .then(getSpecialConditionsTypesSuccess);
  };

  const getSpecialConditionsTypesSuccess = (value: GetSpecialStatusResponse) => {
    if (value?.status === 200) {
      setIsSpecialConditionsList(value?.data);
    }
  };

  // modify handler
  const addSpecialConditionsTypeHandler = () => {
    setIsModifyModalOpen({ isOpen: true, id: -1 });
  };

  const editSpecialConditionsTypeHandler = (value: SpecialStatusTypes) => {
    setIsModifyModalOpen({ isOpen: true, id: value?.id });
    modifyForm.setFieldsValue({
      specialConditionsTitle: value?.title,
    });
  };

  const closeModifyModalHandler = () => {
    setIsModifyModalOpen({ isOpen: false, id: -1 });
    modifyForm.resetFields();
  };

  const confirmModifyModalHandler = () => {
    modifyForm?.submit();
    modifyForm?.validateFields().then(() => {
      const { specialConditionsTitle } = modifyForm.getFieldsValue();
      if (isModifyModalOpen?.id === -1) {
        createSpecialConditionsTypes({
          form: "SpecialStatus",
          data: {
            title: specialConditionsTitle,
            recordStatus: 1,
          },
        })
          .unwrap()
          .then(createSpecialConditionsTypesSuccess);
      } else {
        updateSpecialConditionsTypes({
          form: "SpecialStatus",
          id: "e791ccc088864511a6fc741f963473a6",
          data: {
            title: specialConditionsTitle,
            id: isModifyModalOpen?.id,
          },
        })
          .unwrap()
          .then(updateSpecialConditionsTypesSuccess);
      }
    });
  };
  // create success
  const createSpecialConditionsTypesSuccess = async (
    value: CreateDormSpecialConditionsTypesResponse
  ) => {
    if (value?.status === 200) {
      modifyHandler();
    }
  };

  //update success
  const updateSpecialConditionsTypesSuccess = async (
    value: UpdateDormSpecialConditionsTypesResponse
  ) => {
    if (value?.status === 200) {
      modifyHandler();
    }
  };

  const modifyHandler = () => {
    getSpecialConditionsList();
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
    updateSpecialConditionsTypes({
      form: "SpecialStatus",
      id: "e791ccc088864511a6fc741f963473a6",
      data: {
        recordStatus: recordStatus,
        id: isOpenSwitchModal?.id,
      },
    })
      .unwrap()
      .then(changeStatusSuccess);
  };

  const changeStatusSuccess = async (value: UpdateDormSpecialConditionsTypesResponse) => {
    if (value?.status === 200) {
      getSpecialConditionsList();
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
          title={isModifyModalOpen?.id !== -1 ? "ویرایش شرایط خاص" : "افزودن شرایط خاص"}
          confirmBtnText={isModifyModalOpen?.id !== -1 ? "ثبت تغییرات" : "افزودن"}
          backBtnText="انصراف"
          isConfirmButtonLoading={
            isCreateSpecialConditionsTypesLoading || isUpdateSpecialConditionsTypesLoading
          }
          content={<DormSpecialConditionsTypeModalContent form={modifyForm} />}
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
          isConfirmButtonLoading={isUpdateSpecialConditionsTypesLoading}
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

      <div className="dorm-basic-info-special-conditions-type-container">
        <ToolBox
          leftSide={
            <CustomButton
              icon={<AiOutlinePlus />}
              iconPlacement="end"
              onClick={addSpecialConditionsTypeHandler}
            >
              افزودن شرایط خاص
            </CustomButton>
          }
        />
        <CustomTable
          dataSource={specialConditionsList}
          columns={DormBasicInfoSpecialConditionsTypesTableModel({
            onEditClickHandler: editSpecialConditionsTypeHandler,
            switchHandler: openSwitchModalHandler,
          })}
          loading={isSpecialConditionsTypesDataLoading}
          pagination={paginationConfig}
          className="dorm-special-condition-table-container"
          {...TABLE_PROPS(specialConditionsList?.length)}
        />
      </div>
    </>
  );
};

export default DormSpecialConditionsTypes;
