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
  useCreateDormFeedbackTypesMutation,
  useLazyGetDormFeedbackTypesQuery,
  useUpdateDormFeedbackTypesMutation,
} from "@infra/states/redux/Apis/dorm/base/dormBaseApi";

import {
  CreateDormFeedbackTypeResponse,
  DormFeedbackType,
  GetDormFeedbackTypesResponse,
  UpdateDormFeedbackTypesResponse,
} from "./@types/@dormFeedbackTypes";
import {
  ACTIVE_SWITCH_MODAL_MESSAGE,
  INACTIVE_SWITCH_MODAL_MESSAGE,
} from "../helper/utils/DormBasicInfoDetailUtils";
import DormBasicInfoFeedbackTypesTableModel from "./helper/models/DormBasicInfoFeedbackTypes/DormBasicInfoFeedbackTypesTableModel";
import DormFeedbackTypeModalContent from "./helper/section/DormFeedbackTypeModalContent/DormFeedbackTypeModalContent";
import "./_dormFeedbackTypes.scss";

const DormFeedbackTypes = () => {
  const [requestTypeList, setIsRequestTypeList] = useState<DormFeedbackType[]>([]);

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

  const [modifyForm] = Form.useForm<{ feedbackTitle: string }>();

  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={DORM_BASIC_INFO_LIST_PAGE_ROUTE}>اطلاعات پایه اقامتگاه</Link>,
      },
      {
        title: "انواع بازخورد",
      },
    ],
  });

  //? ================================  Api Calls ================================
  //get table list
  const [getFeedbackTypes, { isFetching: isGetFeedbackTypesDataLoading }] =
    useLazyGetDormFeedbackTypesQuery();

  // create
  const [createFeedbackTypes, { isLoading: isCreateFeedbackTypesLoading }] =
    useCreateDormFeedbackTypesMutation();

  // update
  const [updateFeedbackTypes, { isLoading: isUpdateFeedbackTypesLoading }] =
    useUpdateDormFeedbackTypesMutation();

  //? ================================ Effects ================================
  useEffect(() => getFeedbackTypesList(), []);

  //* ================================ Util Functions ================================
  // get list
  const getFeedbackTypesList = () => {
    getFeedbackTypes({ maxResults: 2000, firstResult: 0 })
      .unwrap()
      .then(getFeedbackTypesSuccess);
  };

  const getFeedbackTypesSuccess = (value: GetDormFeedbackTypesResponse) => {
    if (value?.status === 200) {
      setIsRequestTypeList(value?.data);
    }
  };

  // modify handler
  const addFeedbackTypeHandler = () => {
    setIsModifyModalOpen({ isOpen: true, id: -1 });
  };

  const editFeedbackTypesHandler = (value: DormFeedbackType) => {
    setIsModifyModalOpen({ isOpen: true, id: value?.id });
    modifyForm.setFieldsValue({
      feedbackTitle: value?.title,
    });
  };

  const closeModifyModalHandler = () => {
    setIsModifyModalOpen({ isOpen: false, id: -1 });
    modifyForm.resetFields();
  };

  const confirmModifyModalHandler = () => {
    modifyForm?.submit();
    modifyForm?.validateFields().then(() => {
      const { feedbackTitle } = modifyForm.getFieldsValue();
      if (isModifyModalOpen?.id === -1) {
        createFeedbackTypes({
          form: "FeedbackType",
          data: {
            title: feedbackTitle,
            recordStatus: 1,
          },
        })
          .unwrap()
          .then(createFeedbackTypesSuccess);
      } else {
        updateFeedbackTypes({
          form: "FeedbackType",
          id: "1aa774cef5304619b2e390fab91c2284",
          data: {
            title: feedbackTitle,
            id: isModifyModalOpen?.id,
          },
        })
          .unwrap()
          .then(updateFeedbackTypesSuccess);
      }
    });
  };

  // create success
  const createFeedbackTypesSuccess = async (value: CreateDormFeedbackTypeResponse) => {
    if (value?.status === 200) {
      modifyHandler();
    }
  };

  // update success
  const updateFeedbackTypesSuccess = async (value: UpdateDormFeedbackTypesResponse) => {
    if (value?.status === 200) {
      modifyHandler();
    }
  };

  const modifyHandler = () => {
    getFeedbackTypesList();
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
    updateFeedbackTypes({
      form: "FeedbackType",
      id: "1aa774cef5304619b2e390fab91c2284",
      data: {
        recordStatus: recordStatus,
        id: isOpenSwitchModal?.id,
      },
    })
      .unwrap()
      .then(changeStatusSuccess);
  };

  const changeStatusSuccess = async (value: UpdateDormFeedbackTypesResponse) => {
    if (value?.status === 200) {
      getFeedbackTypesList();
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
          title={isModifyModalOpen?.id !== -1 ? "ویرایش  بازخورد" : "افزودن بازخورد"}
          confirmBtnText={isModifyModalOpen?.id !== -1 ? "ثبت تغییرات" : "افزودن"}
          backBtnText="انصراف"
          isConfirmButtonLoading={
            isCreateFeedbackTypesLoading || isUpdateFeedbackTypesLoading
          }
          content={<DormFeedbackTypeModalContent form={modifyForm} />}
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
          isConfirmButtonLoading={isUpdateFeedbackTypesLoading}
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

      <div className="dorm-basic-info-feedback-type-container">
        <CustomTable
          dataSource={requestTypeList}
          columns={DormBasicInfoFeedbackTypesTableModel({
            onEditClickHandler: editFeedbackTypesHandler,
            switchHandler: openSwitchModalHandler,
          })}
          loading={isGetFeedbackTypesDataLoading}
          pagination={paginationConfig}
          className="dorm-feedback-table-container"
          {...TABLE_PROPS(requestTypeList?.length)}
        />
        <CustomButton
          icon={<AiOutlinePlus />}
          iconPlacement="end"
          disabled
          onClick={addFeedbackTypeHandler}
        >
          افزودن بازخورد
        </CustomButton>
      </div>
    </>
  );
};

export default DormFeedbackTypes;
