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
  useCreateDormRoomTypesMutation,
  useLazyGetDormRoomTypesQuery,
  useUpdateDormRoomTypesMutation,
} from "@infra/states/redux/Apis/dorm/base/dormBaseApi";
import {
  DormRoomListTypes,
  GetDormRoomTypesResponse,
} from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/components/Room/RoomCreateAndModify/@types/@roomCreateAndModify";

import {
  CreateDormRoomTypesResponse,
  UpdateDormRoomTypesResponse,
} from "./@types/@dormRoomTypes";
import {
  ACTIVE_SWITCH_MODAL_MESSAGE,
  INACTIVE_SWITCH_MODAL_MESSAGE,
} from "../helper/utils/DormBasicInfoDetailUtils";
import DormBasicInfoRoomTypesTableModel from "./helper/models/DormBasicInfoRoomTypes/DormBasicInfoRoomTypesTableModel";
import DormRoomTypeModalContent from "./helper/section/DormRoomTypeModalContent/DormRoomTypeModalContent";
import "./_dormRoomTypes.scss";

const DormRoomTypes = () => {
  const [roomTypeList, setRoomTypeList] = useState<DormRoomListTypes[]>([]);

  const [isModifyModalOpen, setIsModifyModalOpen] = useState({
    isOpen: false,
    id: -1,
  });

  const [isOpenSwitchModal, setIsOpenSwitchModal] = useState({
    isOpen: false,
    id: -1,
    isActive: false,
  });

  const [modifyForm] = Form.useForm<{ roomTitle: string }>();

  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={DORM_BASIC_INFO_LIST_PAGE_ROUTE}>اطلاعات پایه اقامتگاه</Link>,
      },
      {
        title: "انواع اتاق",
      },
    ],
  });

  //? ================================  Api Calls ================================
  const [getRoomTypes, { isFetching: isRoomTypesDataLoading }] =
    useLazyGetDormRoomTypesQuery();

  const [createRoomTypes, { isLoading: isCreateRoomTypesLoading }] =
    useCreateDormRoomTypesMutation();

  const [updateRoomTypes, { isLoading: isUpdateRoomTypesLoading }] =
    useUpdateDormRoomTypesMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getRoomTypeList();
  }, []);

  //* ================================ Util Functions ================================
  //get list
  const getRoomTypeList = () => {
    getRoomTypes({
      maxResults: 2000,
      firstResult: 0,
    })
      .unwrap()
      .then(getRoomTypesSuccess);
  };

  const getRoomTypesSuccess = async (value: GetDormRoomTypesResponse) => {
    if (value?.status === 200) {
      setRoomTypeList(value?.data);
    }
  };

  // create and update
  const addRoomTypeHandler = () => {
    setIsModifyModalOpen({ isOpen: true, id: -1 });
  };

  const editRoomTypeHandler = (value: DormRoomListTypes) => {
    setIsModifyModalOpen({ isOpen: true, id: value?.id });
    modifyForm.setFieldsValue({
      roomTitle: value?.title,
    });
  };

  const closeModifyModalHandler = () => {
    setIsModifyModalOpen({ isOpen: false, id: -1 });
    modifyForm.resetFields();
  };

  const confirmModifyModalHandler = () => {
    modifyForm?.submit();
    modifyForm?.validateFields().then(() => {
      const { roomTitle } = modifyForm.getFieldsValue();

      if (isModifyModalOpen?.id === -1) {
        createRoomTypes({
          form: "TypeAssignment",
          data: {
            title: roomTitle,
            recordStatus: 1,
          },
        })
          .unwrap()
          .then(createRoomTypesSuccess);
      } else {
        updateRoomTypes({
          form: "RoomType",
          id: "b5c04f54f4a34e009049ee1ceaa7019a",
          data: {
            title: roomTitle,
            id: isModifyModalOpen?.id,
          },
        })
          .unwrap()
          .then(updateRoomTypesSuccess);
      }
    });
  };

  const createRoomTypesSuccess = async (value: CreateDormRoomTypesResponse) => {
    if (value?.status === 200) {
      modifyHandler();
    }
  };

  const updateRoomTypesSuccess = async (value: UpdateDormRoomTypesResponse) => {
    if (value?.status === 200) {
      modifyHandler();
    }
  };

  const modifyHandler = () => {
    getRoomTypeList();
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

    updateRoomTypes({
      form: "RoomType",
      id: "b5c04f54f4a34e009049ee1ceaa7019a",
      data: {
        recordStatus: recordStatus,
        id: isOpenSwitchModal?.id,
      },
    })
      .unwrap()
      .then(changeStatusSuccess);
  };

  const changeStatusSuccess = async (value: UpdateDormRoomTypesResponse) => {
    if (value?.status === 200) {
      getRoomTypeList();
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
          title={isModifyModalOpen?.id !== -1 ? "ویرایش نوع اتاق" : "افزودن نوع اتاق"}
          confirmBtnText={isModifyModalOpen?.id !== -1 ? "ثبت تغییرات" : "افزودن"}
          backBtnText="انصراف"
          isConfirmButtonLoading={isCreateRoomTypesLoading || isUpdateRoomTypesLoading}
          content={<DormRoomTypeModalContent form={modifyForm} />}
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
          isConfirmButtonLoading={isUpdateRoomTypesLoading}
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

      <div className="dorm-basic-info-room-type-container">
        <CustomTable
          dataSource={roomTypeList}
          columns={DormBasicInfoRoomTypesTableModel({
            onEditClickHandler: editRoomTypeHandler,
            switchHandler: openSwitchModalHandler,
          })}
          loading={isRoomTypesDataLoading}
          className="dorm-room-type-table-container"
          pagination={paginationConfig}
          {...TABLE_PROPS(roomTypeList?.length)}
        />
        <CustomButton
          icon={<AiOutlinePlus />}
          iconPlacement="end"
          disabled
          onClick={addRoomTypeHandler}
        >
          افزودن نوع اتاق
        </CustomButton>
      </div>
    </>
  );
};

export default DormRoomTypes;
