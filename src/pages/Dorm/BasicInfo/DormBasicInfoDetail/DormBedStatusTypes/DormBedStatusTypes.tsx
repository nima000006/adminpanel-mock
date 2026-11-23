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
  useCreateDormBedStatusTypesMutation,
  useLazyGetBedStatusTypeQuery,
  useUpdateDormBedStatusTypesMutation,
} from "@infra/states/redux/Apis/dorm/base/dormBaseApi";

import {
  BedStatusTypeList,
  CreateDormBedStatusTypesResponse,
  GetBedStatusTypeResponse,
  UpdateDormBedStatusTypesResponse,
} from "./@types/@dormBedStatusTypes";
import {
  ACTIVE_SWITCH_MODAL_MESSAGE,
  INACTIVE_SWITCH_MODAL_MESSAGE,
} from "../helper/utils/DormBasicInfoDetailUtils";
import DormBasicInfoBedStatusTypesTableModel from "./helper/models/DormBasicInfoBedStatusTypes/DormBasicInfoBedStatusTypesTableModel";
import DormBedStatusTypeModalContent from "./helper/section/DormBedStatusTypeModalContent/DormBedStatusTypeModalContent";

import "./_dormBedStatusTypes.scss";

const DormBedStatusTypes = () => {
  const [bedStatusTypeList, setBedStatusTypeList] = useState<BedStatusTypeList[]>([]);

  const [isModifyModalOpen, setIsModifyModalOpen] = useState({
    isOpen: false,
    id: -1,
  });

  const [isOpenSwitchModal, setIsOpenSwitchModal] = useState({
    isOpen: false,
    id: -1,
    isActive: false,
  });

  const [modifyForm] = Form.useForm<{ bedStatusTitle: string }>();

  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={DORM_BASIC_INFO_LIST_PAGE_ROUTE}>اطلاعات پایه اقامتگاه</Link>,
      },
      {
        title: "انواع وضعیت اشغال تخت",
      },
    ],
  });
  //? ================================  Api Calls ================================
  const [getBedStatusTypes, { isFetching: isBedStatusTypesDataLoading }] =
    useLazyGetBedStatusTypeQuery();

  const [createBedStatusTypes, { isLoading: isCreateBedStatusTypesLoading }] =
    useCreateDormBedStatusTypesMutation();

  const [updateBedStatusTypes, { isLoading: isUpdateBedStatusTypesLoading }] =
    useUpdateDormBedStatusTypesMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getBedStatusTypeList();
  }, []);

  //* ================================ Util Functions ================================
  // get list
  const getBedStatusTypeList = () => {
    getBedStatusTypes({ maxResults: 2000, firstResult: 0 })
      .unwrap()
      .then(getBedStatusTypesSuccess);
  };

  const getBedStatusTypesSuccess = async (value: GetBedStatusTypeResponse) => {
    if (value?.status === 200) {
      setBedStatusTypeList(value?.data);
    }
  };

  // create and update
  const addBedStatusTypeHandler = () => {
    setIsModifyModalOpen({ isOpen: true, id: -1 });
  };

  const editBedStatusTypeHandler = (value: BedStatusTypeList) => {
    setIsModifyModalOpen({ isOpen: true, id: value?.id });
    modifyForm.setFieldsValue({
      bedStatusTitle: value?.title,
    });
  };

  const closeModifyModalHandler = () => {
    setIsModifyModalOpen({ isOpen: false, id: -1 });
    modifyForm.resetFields();
  };

  const confirmModifyModalHandler = () => {
    modifyForm?.submit();
    modifyForm?.validateFields().then(() => {
      const { bedStatusTitle } = modifyForm.getFieldsValue();

      if (isModifyModalOpen?.id === -1) {
        createBedStatusTypes({
          form: "TypeAssignment",
          data: {
            title: bedStatusTitle,
            recordStatus: 1,
          },
        })
          .unwrap()
          .then(createBedStatusTypesSuccess);
      } else {
        updateBedStatusTypes({
          form: "BedState",
          id: "fe957cfa4f1f47c3bd01b732991214de",
          data: {
            title: bedStatusTitle,
            id: isModifyModalOpen?.id,
          },
        })
          .unwrap()
          .then(updateBedStatusTypesSuccess);
      }
    });
  };

  const createBedStatusTypesSuccess = async (value: CreateDormBedStatusTypesResponse) => {
    if (value?.status === 200) {
      modifyHandler();
    }
  };

  const updateBedStatusTypesSuccess = async (value: UpdateDormBedStatusTypesResponse) => {
    if (value?.status === 200) {
      modifyHandler();
    }
  };

  const modifyHandler = () => {
    getBedStatusTypeList();
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

    updateBedStatusTypes({
      form: "BedState",
      id: "fe957cfa4f1f47c3bd01b732991214de",
      data: {
        recordStatus: recordStatus,
        id: isOpenSwitchModal?.id,
      },
    })
      .unwrap()
      .then(changeStatusSuccess);
  };

  const changeStatusSuccess = async (value: UpdateDormBedStatusTypesResponse) => {
    if (value?.status === 200) {
      getBedStatusTypeList();
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
              ? "ویرایش  نوع وضعیت تخت"
              : "افزودن نوع وضعیت تخت"
          }
          confirmBtnText={isModifyModalOpen?.id !== -1 ? "ثبت تغییرات" : "افزودن"}
          backBtnText="انصراف"
          isConfirmButtonLoading={
            isCreateBedStatusTypesLoading || isUpdateBedStatusTypesLoading
          }
          content={<DormBedStatusTypeModalContent form={modifyForm} />}
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
          isConfirmButtonLoading={isUpdateBedStatusTypesLoading}
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

      <div className="dorm-basic-info-bed-status-type-container">
        <CustomTable
          dataSource={bedStatusTypeList}
          columns={DormBasicInfoBedStatusTypesTableModel({
            onEditClickHandler: editBedStatusTypeHandler,
            switchHandler: openSwitchModalHandler,
          })}
          loading={isBedStatusTypesDataLoading}
          className="dorm-bed-status-type-table-container"
          pagination={paginationConfig}
          {...TABLE_PROPS(bedStatusTypeList?.length)}
        />
        <CustomButton
          icon={<AiOutlinePlus />}
          iconPlacement="end"
          disabled
          onClick={addBedStatusTypeHandler}
        >
          افزودن نوع وضعیت اشغال تخت
        </CustomButton>
      </div>
    </>
  );
};

export default DormBedStatusTypes;
