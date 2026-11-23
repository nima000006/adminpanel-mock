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
  useCreateDormRequestTypesMutation,
  useLazyGetRequestTypeQuery,
  useUpdateDormRequestTypesMutation,
} from "@infra/states/redux/Apis/dorm/base/dormBaseApi";

import {
  CreateDormRequestTypesResponse,
  DormRequestType,
  GetRequestTypeResponse,
  UpdateDormRequestTypesResponse,
} from "./@types/@dormRequestTypes";
import {
  ACTIVE_SWITCH_MODAL_MESSAGE,
  INACTIVE_SWITCH_MODAL_MESSAGE,
} from "../helper/utils/DormBasicInfoDetailUtils";
import DormBasicInfoRequestTypesTableModel from "./helper/models/DormBasicInfoRequestTypes/DormBasicInfoRequestTypesTableModel";
import DormRequestTypeModalContent from "./helper/section/DormRequestTypeModalContent/DormRequestTypeModalContent";
import "./_dormRequestTypes.scss";

const DormRequestTypes = () => {
  const [requestTypeList, setIsRequestTypeList] = useState<DormRequestType[]>([]);

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

  const [modifyForm] = Form.useForm<{ RequestTitle: string }>();

  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={DORM_BASIC_INFO_LIST_PAGE_ROUTE}>اطلاعات پایه اقامتگاه</Link>,
      },
      {
        title: "انواع درخواست",
      },
    ],
  });

  //? ================================  Api Calls ================================
  //get table list
  const [getRequestTypes, { isFetching: isRequestTypesDataLoading }] =
    useLazyGetRequestTypeQuery();

  // create
  const [createRequestTypes, { isLoading: isCreateRequestTypesLoading }] =
    useCreateDormRequestTypesMutation();

  // update
  const [updateRequestTypes, { isLoading: isUpdateRequestTypesLoading }] =
    useUpdateDormRequestTypesMutation();

  //? ================================ Effects ================================
  useEffect(() => getRequestTypesList(), []);

  //* ================================ Util Functions ================================
  // get list
  const getRequestTypesList = () => {
    getRequestTypes({ maxResults: 2000, firstResult: 0 })
      .unwrap()
      .then(getScheduleTypesSuccess);
  };

  const getScheduleTypesSuccess = (value: GetRequestTypeResponse) => {
    if (value?.status === 200) {
      setIsRequestTypeList(value?.data);
    }
  };

  // modify handler
  const addRequestTypeHandler = () => {
    setIsModifyModalOpen({ isOpen: true, id: -1 });
  };

  const editRequestTypesHandler = (value: DormRequestType) => {
    setIsModifyModalOpen({ isOpen: true, id: value?.id });
    modifyForm.setFieldsValue({
      RequestTitle: value?.title,
    });
  };

  const closeModifyModalHandler = () => {
    setIsModifyModalOpen({ isOpen: false, id: -1 });
    modifyForm.resetFields();
  };

  const confirmModifyModalHandler = () => {
    modifyForm?.submit();
    modifyForm?.validateFields().then(() => {
      const { RequestTitle } = modifyForm.getFieldsValue();
      if (isModifyModalOpen?.id === -1) {
        createRequestTypes({
          form: "RequestType",
          data: {
            title: RequestTitle,
            recordStatus: 1,
          },
        })
          .unwrap()
          .then(createRequestTypesSuccess);
      } else {
        updateRequestTypes({
          form: "RequestType",
          id: "9e64ea8889ae4f619a56d3bd61fbb3af",
          data: {
            title: RequestTitle,
            id: isModifyModalOpen?.id,
          },
        })
          .unwrap()
          .then(updateRequestTypesSuccess);
      }
    });
  };

  // create success
  const createRequestTypesSuccess = async (value: CreateDormRequestTypesResponse) => {
    if (value?.status === 200) {
      modifyHandler();
    }
  };

  // update success
  const updateRequestTypesSuccess = async (value: UpdateDormRequestTypesResponse) => {
    if (value?.status === 200) {
      modifyHandler();
    }
  };

  const modifyHandler = () => {
    getRequestTypesList();
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
    updateRequestTypes({
      form: "RequestType",
      id: "9e64ea8889ae4f619a56d3bd61fbb3af",
      data: {
        recordStatus: recordStatus,
        id: isOpenSwitchModal?.id,
      },
    })
      .unwrap()
      .then(changeStatusSuccess);
  };

  const changeStatusSuccess = async (value: UpdateDormRequestTypesResponse) => {
    if (value?.status === 200) {
      getRequestTypesList();
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
            isModifyModalOpen?.id !== -1 ? "ویرایش نوع درخواست" : "افزودن نوع درخواست"
          }
          confirmBtnText={isModifyModalOpen?.id !== -1 ? "ثبت تغییرات" : "افزودن"}
          backBtnText="انصراف"
          isConfirmButtonLoading={
            isCreateRequestTypesLoading || isUpdateRequestTypesLoading
          }
          content={<DormRequestTypeModalContent form={modifyForm} />}
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
          isConfirmButtonLoading={isUpdateRequestTypesLoading}
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

      <div className="dorm-basic-info-request-type-container">
        <CustomTable
          dataSource={requestTypeList}
          columns={DormBasicInfoRequestTypesTableModel({
            onEditClickHandler: editRequestTypesHandler,
            switchHandler: openSwitchModalHandler,
          })}
          loading={isRequestTypesDataLoading}
          pagination={paginationConfig}
          className="dorm-request-type-table-container"
          {...TABLE_PROPS(requestTypeList?.length)}
        />
        <CustomButton
          icon={<AiOutlinePlus />}
          iconPlacement="end"
          disabled
          onClick={addRequestTypeHandler}
        >
          افزودن نوع درخواست
        </CustomButton>
      </div>
    </>
  );
};

export default DormRequestTypes;
