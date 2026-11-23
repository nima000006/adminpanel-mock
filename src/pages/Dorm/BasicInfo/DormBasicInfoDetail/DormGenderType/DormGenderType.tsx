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
  useCreateDormGenderTypesMutation,
  useLazyGetDormGenderTypesQuery,
  useUpdateDormGenderTypesMutation,
} from "@infra/states/redux/Apis/dorm/base/dormBaseApi";
import {
  DormGenderListTypes,
  GetDormGenderTypesResponse,
} from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/components/Building/BuildingCreateAndModify/@types/@buildingCreateAndModify";

import {
  CreateDormGenderTypesResponse,
  UpdateDormGenderTypesResponse,
} from "./@types/@dormGenderTypes";
import {
  ACTIVE_SWITCH_MODAL_MESSAGE,
  INACTIVE_SWITCH_MODAL_MESSAGE,
} from "../helper/utils/DormBasicInfoDetailUtils";
import DormBasicInfoGenderTypesTableModel from "./helper/models/DormBasicInfoGenderTypes/DormBasicInfoGenderTypesTableModel";
import DormGenderTypeModalContent from "./helper/section/DormGenderTypeModalContent/DormGenderTypeModalContent";
import "./_dormGenderType.scss";

const DormGenderType = () => {
  const [genderTypeList, setGenderTypeList] = useState<DormGenderListTypes[]>([]);

  const [isModifyModalOpen, setIsModifyModalOpen] = useState({
    isOpen: false,
    id: -1,
  });

  const [isOpenSwitchModal, setIsOpenSwitchModal] = useState({
    isOpen: false,
    id: -1,
    isActive: false,
  });

  const [modifyForm] = Form.useForm<{ genderTitle: string }>();

  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={DORM_BASIC_INFO_LIST_PAGE_ROUTE}>اطلاعات پایه اقامتگاه</Link>,
      },
      {
        title: "انواع جنسیت خوابگاه",
      },
    ],
  });

  //? ================================  Api Calls ================================
  const [getGenderTypes, { isFetching: isGenderTypesDataLoading }] =
    useLazyGetDormGenderTypesQuery();

  const [createGenderTypes, { isLoading: isCreateGenderTypesLoading }] =
    useCreateDormGenderTypesMutation();

  const [updateGenderTypes, { isLoading: isUpdateGenderTypesLoading }] =
    useUpdateDormGenderTypesMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getGenderTypeList();
  }, []);

  //* ================================ Util Functions ================================
  //get list
  const getGenderTypeList = () => {
    getGenderTypes({
      maxResults: 2000,
      firstResult: 0,
    })
      .unwrap()
      .then(getGenderTypesSuccess);
  };

  const getGenderTypesSuccess = async (value: GetDormGenderTypesResponse) => {
    if (value?.status === 200) {
      setGenderTypeList(value?.data);
    }
  };

  // create and update
  const addGenderTypeHandler = () => {
    setIsModifyModalOpen({ isOpen: true, id: -1 });
  };

  const editGenderTypeHandler = (value: DormGenderListTypes) => {
    setIsModifyModalOpen({ isOpen: true, id: value?.id });
    modifyForm.setFieldsValue({
      genderTitle: value?.title,
    });
  };

  const closeModifyModalHandler = () => {
    setIsModifyModalOpen({ isOpen: false, id: -1 });
    modifyForm.resetFields();
  };

  const confirmModifyModalHandler = () => {
    modifyForm?.submit();
    modifyForm?.validateFields().then(() => {
      const { genderTitle } = modifyForm.getFieldsValue();

      if (isModifyModalOpen?.id === -1) {
        createGenderTypes({
          form: "TypeAssignment",
          data: {
            title: genderTitle,
            recordStatus: 1,
          },
        })
          .unwrap()
          .then(createGenderTypesSuccess);
      } else {
        updateGenderTypes({
          form: "Gender",
          id: "257320b489ce4607bc77bafd4e12d6b3",
          data: {
            title: genderTitle,
            id: isModifyModalOpen?.id,
          },
        })
          .unwrap()
          .then(updateGenderTypesSuccess);
      }
    });
  };

  const createGenderTypesSuccess = async (value: CreateDormGenderTypesResponse) => {
    if (value?.status === 200) {
      modifyHandler();
    }
  };

  const updateGenderTypesSuccess = async (value: UpdateDormGenderTypesResponse) => {
    if (value?.status === 200) {
      modifyHandler();
    }
  };

  const modifyHandler = () => {
    getGenderTypeList();
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

    updateGenderTypes({
      form: "Gender",
      id: "257320b489ce4607bc77bafd4e12d6b3",
      data: {
        recordStatus: recordStatus,
        id: isOpenSwitchModal?.id,
      },
    })
      .unwrap()
      .then(changeStatusSuccess);
  };

  const changeStatusSuccess = async (value: UpdateDormGenderTypesResponse) => {
    if (value?.status === 200) {
      getGenderTypeList();
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
          title={isModifyModalOpen?.id !== -1 ? "ویرایش نوع جنسیت" : "افزودن نوع جنسیت"}
          confirmBtnText={isModifyModalOpen?.id !== -1 ? "ثبت تغییرات" : "افزودن"}
          backBtnText="انصراف"
          isConfirmButtonLoading={
            isCreateGenderTypesLoading || isUpdateGenderTypesLoading
          }
          content={<DormGenderTypeModalContent form={modifyForm} />}
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
          isConfirmButtonLoading={isUpdateGenderTypesLoading}
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

      <div className="dorm-basic-info-gender-type-container">
        <CustomTable
          dataSource={genderTypeList}
          columns={DormBasicInfoGenderTypesTableModel({
            onEditClickHandler: editGenderTypeHandler,
            switchHandler: openSwitchModalHandler,
          })}
          loading={isGenderTypesDataLoading}
          className="dorm-gender-type-table-container"
          pagination={paginationConfig}
          {...TABLE_PROPS(genderTypeList?.length)}
        />
        <CustomButton
          icon={<AiOutlinePlus />}
          iconPlacement="end"
          disabled
          onClick={addGenderTypeHandler}
        >
          افزودن نوع جنسیت خوابگاه
        </CustomButton>
      </div>
    </>
  );
};

export default DormGenderType;
