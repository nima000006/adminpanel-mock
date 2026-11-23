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
  useCreateDormReservationTypesMutation,
  useLazyGetReservationTypeQuery,
  useUpdateDormReservationTypesMutation,
} from "@infra/states/redux/Apis/dorm/base/dormBaseApi";
import {
  DormReservationListTypes,
  GetReservationTypeResponse,
} from "@pages/Dorm/Planning/Admission/AdmissionModify/@types/@admissionModify";

import {
  CreateDormReservationTypesResponse,
  UpdateDormReservationTypesResponse,
} from "./@types/@dormReserveTypes";
import {
  ACTIVE_SWITCH_MODAL_MESSAGE,
  INACTIVE_SWITCH_MODAL_MESSAGE,
} from "../helper/utils/DormBasicInfoDetailUtils";
import DormBasicInfoReservationTypesTableModel from "./helper/models/DormBasicInfoReservationTypes/DormBasicInfoReservationTypesTableModel";
import DormReserveTypeModalContent from "./helper/section/DormReserveTypeModalContent/DormReserveTypeModalContent";

import "./_dormReserveTypes.scss";

const DormReserveTypes = () => {
  const [reservationTypeList, setReservationTypeList] = useState<
    DormReservationListTypes[]
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

  const [modifyForm] = Form.useForm<{ reservationTitle: string }>();

  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={DORM_BASIC_INFO_LIST_PAGE_ROUTE}>اطلاعات پایه اقامتگاه</Link>,
      },
      {
        title: "انواع رزرو",
      },
    ],
  });

  //? ================================  Api Calls ================================
  const [getReservationTypes, { isFetching: isReservationTypesDataLoading }] =
    useLazyGetReservationTypeQuery();

  const [createReservationTypes, { isLoading: isCreateReservationTypesLoading }] =
    useCreateDormReservationTypesMutation();

  const [updateReservationTypes, { isLoading: isUpdateReservationTypesLoading }] =
    useUpdateDormReservationTypesMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getReservationTypeList();
  }, []);

  //* ================================ Util Functions ================================
  //get list
  const getReservationTypeList = () => {
    getReservationTypes({ maxResults: 2000, firstResult: 0 })
      .unwrap()
      .then(getReservationTypesSuccess);
  };

  const getReservationTypesSuccess = async (value: GetReservationTypeResponse) => {
    if (value?.status === 200) {
      setReservationTypeList(value?.data);
    }
  };

  // create and update
  const addReservationTypeHandler = () => {
    setIsModifyModalOpen({ isOpen: true, id: -1 });
  };

  const editReservationTypeHandler = (value: DormReservationListTypes) => {
    setIsModifyModalOpen({ isOpen: true, id: value?.id });
    modifyForm.setFieldsValue({
      reservationTitle: value?.title,
    });
  };

  const closeModifyModalHandler = () => {
    setIsModifyModalOpen({ isOpen: false, id: -1 });
    modifyForm.resetFields();
  };

  const confirmModifyModalHandler = () => {
    modifyForm?.submit();
    modifyForm?.validateFields().then(() => {
      const { reservationTitle } = modifyForm.getFieldsValue();

      if (isModifyModalOpen?.id === -1) {
        createReservationTypes({
          form: "ReservationType",
          data: {
            title: reservationTitle,
            recordStatus: 1,
          },
        })
          .unwrap()
          .then(createReservationTypesSuccess);
      } else {
        updateReservationTypes({
          form: "ReservationType",
          id: "cf0792f4fdb54d10882b7ec97fbb523b",
          data: {
            title: reservationTitle,
            id: isModifyModalOpen?.id,
          },
        })
          .unwrap()
          .then(updateReservationTypesSuccess);
      }
    });
  };

  const createReservationTypesSuccess = async (
    value: CreateDormReservationTypesResponse
  ) => {
    if (value?.status === 200) {
      modifyHandler();
    }
  };

  const updateReservationTypesSuccess = async (
    value: UpdateDormReservationTypesResponse
  ) => {
    if (value?.status === 200) {
      modifyHandler();
    }
  };

  const modifyHandler = () => {
    getReservationTypeList();
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

    updateReservationTypes({
      form: "ReservationType",
      id: "cf0792f4fdb54d10882b7ec97fbb523b",
      data: {
        recordStatus: recordStatus,
        id: isOpenSwitchModal?.id,
      },
    })
      .unwrap()
      .then(changeStatusSuccess);
  };

  const changeStatusSuccess = async (value: UpdateDormReservationTypesResponse) => {
    if (value?.status === 200) {
      getReservationTypeList();
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
          title={isModifyModalOpen?.id !== -1 ? "ویرایش نوع رزرو" : "افزودن نوع رزرو"}
          confirmBtnText={isModifyModalOpen?.id !== -1 ? "ثبت تغییرات" : "افزودن"}
          backBtnText="انصراف"
          isConfirmButtonLoading={
            isCreateReservationTypesLoading || isUpdateReservationTypesLoading
          }
          content={<DormReserveTypeModalContent form={modifyForm} />}
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
          isConfirmButtonLoading={isUpdateReservationTypesLoading}
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

      <div className="dorm-basic-info-reserve-type-container">
        <CustomTable
          dataSource={reservationTypeList}
          columns={DormBasicInfoReservationTypesTableModel({
            onEditClickHandler: editReservationTypeHandler,
            switchHandler: openSwitchModalHandler,
          })}
          loading={isReservationTypesDataLoading}
          className="dorm-reservation-type-table-container"
          pagination={paginationConfig}
          {...TABLE_PROPS(reservationTypeList?.length)}
        />
        <CustomButton
          icon={<AiOutlinePlus />}
          iconPlacement="end"
          onClick={addReservationTypeHandler}
          disabled
        >
          افزودن نوع رزرو
        </CustomButton>
      </div>
    </>
  );
};

export default DormReserveTypes;
