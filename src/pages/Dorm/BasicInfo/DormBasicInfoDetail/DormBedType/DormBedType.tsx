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
  useCreateDormBedTypesMutation,
  useLazyGetDormBedTypesQuery,
  useUpdateDormBedTypesMutation,
} from "@infra/states/redux/Apis/dorm/base/dormBaseApi";
import {
  DormBedListTypes,
  GetDormBedTypesResponse,
} from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/components/Bed/BedCreateAndModify/@types/@bedCreateAndModify";

import {
  CreateDormBedTypesResponse,
  UpdateDormBedTypesResponse,
} from "./@types/@dormBedTypes";
import {
  ACTIVE_SWITCH_MODAL_MESSAGE,
  INACTIVE_SWITCH_MODAL_MESSAGE,
} from "../helper/utils/DormBasicInfoDetailUtils";
import DormBasicInfoBedTypesTableModel from "./helper/models/DormBasicInfoBedTypes/DormBasicInfoBedTypesTableModel";
import DormBedTypeModalContent from "./helper/section/DormBedTypeModalContent/DormBedTypeModalContent";

import "./_dormBedType.scss";

const DormBedType = () => {
  const [bedTypeList, setBedTypeList] = useState<DormBedListTypes[]>([]);

  const [isModifyModalOpen, setIsModifyModalOpen] = useState({
    isOpen: false,
    id: -1,
  });

  const [isOpenSwitchModal, setIsOpenSwitchModal] = useState({
    isOpen: false,
    id: -1,
    isActive: false,
  });

  const [modifyForm] = Form.useForm<{ bedTitle: string }>();

  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={DORM_BASIC_INFO_LIST_PAGE_ROUTE}>اطلاعات پایه اقامتگاه</Link>,
      },
      {
        title: "انواع تخت",
      },
    ],
  });

  //? ================================  Api Calls ================================
  const [getBedTypes, { isFetching: isBedTypesDataLoading }] =
    useLazyGetDormBedTypesQuery();

  const [createBedTypes, { isLoading: isCreateBedTypesLoading }] =
    useCreateDormBedTypesMutation();

  const [updateBedTypes, { isLoading: isUpdateBedTypesLoading }] =
    useUpdateDormBedTypesMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getBedTypeList();
  }, []);

  //* ================================ Util Functions ================================
  // get list
  const getBedTypeList = () => {
    getBedTypes({
      maxResults: 2000,
      firstResult: 0,
    })
      .unwrap()
      .then(getBedTypesSuccess);
  };

  const getBedTypesSuccess = async (value: GetDormBedTypesResponse) => {
    if (value?.status === 200) {
      setBedTypeList(value?.data);
    }
  };

  // create and update
  const addBedTypeHandler = () => {
    setIsModifyModalOpen({ isOpen: true, id: -1 });
  };

  const editBedTypeHandler = (value: DormBedListTypes) => {
    setIsModifyModalOpen({ isOpen: true, id: value?.id });
    modifyForm.setFieldsValue({
      bedTitle: value?.title,
    });
  };

  const closeModifyModalHandler = () => {
    setIsModifyModalOpen({ isOpen: false, id: -1 });
    modifyForm.resetFields();
  };

  const confirmModifyModalHandler = () => {
    modifyForm?.submit();
    modifyForm?.validateFields().then(() => {
      const { bedTitle } = modifyForm.getFieldsValue();

      if (isModifyModalOpen?.id === -1) {
        createBedTypes({
          form: "TypeAssignment",
          data: {
            title: bedTitle,
            recordStatus: 1,
          },
        })
          .unwrap()
          .then(createBedTypesSuccess);
      } else {
        updateBedTypes({
          form: "BedType",
          id: "8d82d16ff3914062a017c959f6bd58ab",
          data: {
            title: bedTitle,
            id: isModifyModalOpen?.id,
          },
        })
          .unwrap()
          .then(updateBedTypesSuccess);
      }
    });
  };

  const createBedTypesSuccess = async (value: CreateDormBedTypesResponse) => {
    if (value?.status === 200) {
      modifyHandler();
    }
  };

  const updateBedTypesSuccess = async (value: UpdateDormBedTypesResponse) => {
    if (value?.status === 200) {
      modifyHandler();
    }
  };

  const modifyHandler = () => {
    getBedTypeList();
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
    const recordStatus = isOpenSwitchModal?.isActive ? 3 : 1;

    updateBedTypes({
      form: "BedType",
      id: "8d82d16ff3914062a017c959f6bd58ab",
      data: {
        recordStatus: recordStatus,
        id: isOpenSwitchModal?.id,
      },
    })
      .unwrap()
      .then(changeStatusSuccess);
  };

  const changeStatusSuccess = async (value: UpdateDormBedTypesResponse) => {
    if (value?.status === 200) {
      getBedTypeList();
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
          title={isModifyModalOpen?.id !== -1 ? "ویرایش نوع تخت" : "افزودن نوع تخت"}
          confirmBtnText={isModifyModalOpen?.id !== -1 ? "ثبت تغییرات" : "افزودن"}
          backBtnText="انصراف"
          isConfirmButtonLoading={isCreateBedTypesLoading || isUpdateBedTypesLoading}
          content={<DormBedTypeModalContent form={modifyForm} />}
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
          isConfirmButtonLoading={isUpdateBedTypesLoading}
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

      <div className="dorm-basic-info-bed-type-container">
        <CustomTable
          dataSource={bedTypeList}
          columns={DormBasicInfoBedTypesTableModel({
            onEditClickHandler: editBedTypeHandler,
            switchHandler: openSwitchModalHandler,
          })}
          loading={isBedTypesDataLoading}
          className="dorm-bed-type-table-container"
          pagination={paginationConfig}
          {...TABLE_PROPS(bedTypeList?.length)}
        />
        <CustomButton
          icon={<AiOutlinePlus />}
          iconPlacement="end"
          disabled
          onClick={addBedTypeHandler}
        >
          افزودن نوع تخت
        </CustomButton>
      </div>
    </>
  );
};

export default DormBedType;
