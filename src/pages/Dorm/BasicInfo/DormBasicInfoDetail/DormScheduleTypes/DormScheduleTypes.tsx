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
  useCreateDormScheduleTypesMutation,
  useLazyGetSchedulingTypeQuery,
  useUpdateDormScheduleTypesMutation,
} from "@infra/states/redux/Apis/dorm/base/dormBaseApi";
import {
  DormSchedulingType,
  GetSchedulingTypeResponse,
} from "@pages/Dorm/Planning/Admission/AdmissionModify/@types/@admissionModify";

import {
  ACTIVE_SWITCH_MODAL_MESSAGE,
  INACTIVE_SWITCH_MODAL_MESSAGE,
} from "../helper/utils/DormBasicInfoDetailUtils";
import DormBasicInfoScheduleTypesTableModel from "./@helper/models/DormBasicInfoScheduleTypes/DormBasicInfoScheduleTypesTableModel";
import DormScheduleTypeModalContent from "./@helper/section/DormScheduleTypeModalContent/DormScheduleTypeModalContent";
import {
  CreateDormScheduleTypesResponse,
  UpdateDormScheduleTypesResponse,
} from "./@types/@dormScheduleTypes";
import "./_dormScheduleTypes.scss";

const DormScheduleTypes = () => {
  const [scheduleTypeList, setIsScheduleTypeList] = useState<DormSchedulingType[]>([]);

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

  const [modifyForm] = Form.useForm<{ scheduleTitle: string }>();

  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={DORM_BASIC_INFO_LIST_PAGE_ROUTE}>اطلاعات پایه اقامتگاه</Link>,
      },
      { title: "انواع زمان‌بندی" },
    ],
  });

  //? ================================  Api Calls ================================
  //get table list
  const [getScheduleTypes, { isFetching: isScheduleTypesDataLoading }] =
    useLazyGetSchedulingTypeQuery();

  // create
  const [createScheduleTypes, { isLoading: isCreateScheduleTypesLoading }] =
    useCreateDormScheduleTypesMutation();

  // update
  const [updateScheduleTypes, { isLoading: isUpdateScheduleTypesLoading }] =
    useUpdateDormScheduleTypesMutation();

  //? ================================ Effects ================================
  useEffect(() => getScheduleTypesList(), []);

  //* ================================ Util Functions ================================
  // get list
  const getScheduleTypesList = () => {
    getScheduleTypes({ maxResults: 2000, firstResult: 0 })
      .unwrap()
      .then(getScheduleTypesSuccess);
  };

  const getScheduleTypesSuccess = (value: GetSchedulingTypeResponse) => {
    if (value?.status === 200) {
      setIsScheduleTypeList(value?.data);
    }
  };

  // modify handler
  const addScheduleTypeHandler = () => {
    setIsModifyModalOpen({ isOpen: true, id: -1 });
  };

  const editScheduleTypeHandler = (value: DormSchedulingType) => {
    setIsModifyModalOpen({ isOpen: true, id: value?.id });
    modifyForm.setFieldsValue({
      scheduleTitle: value?.title,
    });
  };

  const closeModifyModalHandler = () => {
    setIsModifyModalOpen({ isOpen: false, id: -1 });
    modifyForm.resetFields();
  };

  const confirmModifyModalHandler = () => {
    modifyForm?.submit();
    modifyForm?.validateFields().then(() => {
      const { scheduleTitle } = modifyForm.getFieldsValue();
      if (isModifyModalOpen?.id === -1) {
        createScheduleTypes({
          form: "SchedulingType",
          data: {
            title: scheduleTitle,
            recordStatus: 1,
          },
        })
          .unwrap()
          .then(createStatusTypesSuccess);
      } else {
        updateScheduleTypes({
          form: "SchedulingType",
          id: "7abdabb3b62744b5a905fc7a319d3751",
          data: {
            title: scheduleTitle,
            id: isModifyModalOpen?.id,
          },
        })
          .unwrap()
          .then(updateStatusTypesSuccess);
      }
    });
  };

  // create success
  const createStatusTypesSuccess = async (value: CreateDormScheduleTypesResponse) => {
    if (value?.status === 200) {
      modifyHandler();
    }
  };

  // update success
  const updateStatusTypesSuccess = async (value: UpdateDormScheduleTypesResponse) => {
    if (value?.status === 200) {
      modifyHandler();
    }
  };

  const modifyHandler = () => {
    getScheduleTypesList();
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
    updateScheduleTypes({
      form: "SchedulingType",
      id: "7abdabb3b62744b5a905fc7a319d3751",
      data: {
        recordStatus: recordStatus,
        id: isOpenSwitchModal?.id,
      },
    })
      .unwrap()
      .then(changeStatusSuccess);
  };

  const changeStatusSuccess = async (value: UpdateDormScheduleTypesResponse) => {
    if (value?.status === 200) {
      getScheduleTypesList();
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
            isModifyModalOpen?.id !== -1 ? "ویرایش نوع زمانبندی" : "افزودن نوع زمانبندی"
          }
          confirmBtnText={isModifyModalOpen?.id !== -1 ? "ثبت تغییرات" : "افزودن"}
          backBtnText="انصراف"
          isConfirmButtonLoading={
            isCreateScheduleTypesLoading || isUpdateScheduleTypesLoading
          }
          content={<DormScheduleTypeModalContent form={modifyForm} />}
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
          isConfirmButtonLoading={isUpdateScheduleTypesLoading}
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

      <div className="dorm-basic-info-schedule-type-container">
        <CustomTable
          dataSource={scheduleTypeList}
          columns={DormBasicInfoScheduleTypesTableModel({
            onEditClickHandler: editScheduleTypeHandler,
            switchHandler: openSwitchModalHandler,
          })}
          loading={isScheduleTypesDataLoading}
          pagination={paginationConfig}
          className="dorm-schedule-type-table-container"
          {...TABLE_PROPS(scheduleTypeList?.length)}
        />
        <CustomButton
          icon={<AiOutlinePlus />}
          iconPlacement="end"
          disabled
          onClick={addScheduleTypeHandler}
        >
          افزودن نوع زمان بندی
        </CustomButton>
      </div>
    </>
  );
};

export default DormScheduleTypes;
