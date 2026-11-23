import { useEffect, useState } from "react";

import { Form } from "antd";
import { Link } from "react-router";

import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { DORM_BASIC_INFO_LIST_PAGE_ROUTE } from "@infra/router/routes/dorm";
import {
  useCreateDormNearByPlacesTypesMutation,
  useUpdateDormNearByPlacesTypesMutation,
} from "@infra/states/redux/Apis/dorm/base/dormBaseApi";
import { useLazyGetPlacesAroundDormitoryQuery } from "@infra/states/redux/Apis/dorm/residence/dormResidenceApi";
import {
  GetPlacesAroundDormitoryResponse,
  PlacesAroundDormitoryType,
} from "@pages/Dorm/Residence/DormCreateAndModify/@types/@dormCreateAndModify";

import {
  CreateDormNearByPlacesTypeResponse,
  UpdateDormNearByPlacesTypesResponse,
} from "./@types/@dormNearByPlacesTypes";
import {
  ACTIVE_SWITCH_MODAL_MESSAGE,
  INACTIVE_SWITCH_MODAL_MESSAGE,
} from "../helper/utils/DormBasicInfoDetailUtils";
import DormBasicInfoNearByPlacesTypeTableModel from "./helper/models/DormBasicInfoNearByPlacesTypes/DormBasicInfoNearByPlacesTypeTableModel";
import DormNearByPlacesTypeModalContent from "./helper/section/DormNearByPlacesTypeModalContent/DormNearByPlacesTypeModalContent";

import "./_dormNearByPlacesTypes.scss";

const DormNearByPlacesTypes = () => {
  const [nearByPlacesTypeList, setIsNearByPlacesTypeList] = useState<
    PlacesAroundDormitoryType[]
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

  const [modifyForm] = Form.useForm<{ placeTitle: string }>();

  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={DORM_BASIC_INFO_LIST_PAGE_ROUTE}>اطلاعات پایه اقامتگاه</Link>,
      },
      {
        title: "انواع اماکن اطراف خوابگاه",
      },
    ],
  });

  //? ================================  Api Calls ================================
  //get table list
  const [getNearByPlacesTypes, { isFetching: isNearByPlacesTypesDataLoading }] =
    useLazyGetPlacesAroundDormitoryQuery();

  // create
  const [createNearByPlacesTypes, { isLoading: isCreateNearByPlacesTypesLoading }] =
    useCreateDormNearByPlacesTypesMutation();

  // update
  const [updateNearByPlacesTypes, { isLoading: isUpdateNearByPlacesTypesLoading }] =
    useUpdateDormNearByPlacesTypesMutation();

  //? ================================ Effects ================================
  useEffect(() => getNearByPlacesTypesList(), []);

  //* ================================ Util Functions ================================
  // get list
  const getNearByPlacesTypesList = () => {
    getNearByPlacesTypes({
      //we should set 0 and 2000 as a default and recordStatus_EQ :1 if showInActiveData: true
      firstResult: 0,
      maxResults: 2000,
      recordStatus_EQ: 1,
      showInActiveData: true,
    })
      .unwrap()
      .then(getNearByPlacesTypesSuccess);
  };

  const getNearByPlacesTypesSuccess = (value: GetPlacesAroundDormitoryResponse) => {
    if (value?.status === 200) {
      setIsNearByPlacesTypeList(value?.data);
    }
  };

  // modify handler
  const editNearByPlacesTypesHandler = (value: PlacesAroundDormitoryType) => {
    setIsModifyModalOpen({ isOpen: true, id: value?.id });
    modifyForm.setFieldsValue({
      placeTitle: value?.title,
    });
  };

  const closeModifyModalHandler = () => {
    setIsModifyModalOpen({ isOpen: false, id: -1 });
  };

  const confirmModifyModalHandler = () => {
    modifyForm?.submit();
    modifyForm?.validateFields().then(() => {
      const { placeTitle } = modifyForm.getFieldsValue();
      if (isModifyModalOpen?.id === -1) {
        createNearByPlacesTypes({
          form: "PlacesAroundDormitory",
          data: {
            title: placeTitle,
            recordStatus: 1,
          },
        })
          .unwrap()
          .then(createNearByPlacesTypesSuccess);
      } else {
        updateNearByPlacesTypes({
          form: "PlacesAroundDormitory",
          id: "dc566d78f8304a14a11ffcb52d05d4e7",
          data: {
            title: placeTitle,
            id: isModifyModalOpen?.id,
          },
        })
          .unwrap()
          .then(updateNearByPlacesTypesSuccess);
      }
    });
  };

  // create success
  const createNearByPlacesTypesSuccess = async (
    value: CreateDormNearByPlacesTypeResponse
  ) => {
    if (value?.status === 200) {
      modifyHandler();
    }
  };

  // update success
  const updateNearByPlacesTypesSuccess = async (
    value: UpdateDormNearByPlacesTypesResponse
  ) => {
    if (value?.status === 200) {
      modifyHandler();
    }
  };

  const modifyHandler = () => {
    getNearByPlacesTypesList();
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
    updateNearByPlacesTypes({
      form: "PlacesAroundDormitory",
      id: "dc566d78f8304a14a11ffcb52d05d4e7",
      data: {
        recordStatus: recordStatus,
        id: isOpenSwitchModal?.id,
      },
    })
      .unwrap()
      .then(changeStatusSuccess);
  };
  const changeStatusSuccess = async (value: UpdateDormNearByPlacesTypesResponse) => {
    if (value?.status === 200) {
      getNearByPlacesTypesList();
      closeSwitchModalHandler();
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/*  EDIT MODAL  */}
      {isModifyModalOpen?.isOpen && (
        <ConfirmationModalWithContent
          isModalOpen={isModifyModalOpen?.isOpen}
          title="ویرایش عنوان اماکن اطراف خوابگاه"
          confirmBtnText="ثبت تغییرات"
          backBtnText="انصراف"
          isConfirmButtonLoading={
            isCreateNearByPlacesTypesLoading || isUpdateNearByPlacesTypesLoading
          }
          content={<DormNearByPlacesTypeModalContent form={modifyForm} />}
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
          isConfirmButtonLoading={isUpdateNearByPlacesTypesLoading}
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

      <div className="dorm-basic-info-near-place-type-container">
        <CustomTable
          dataSource={nearByPlacesTypeList}
          columns={DormBasicInfoNearByPlacesTypeTableModel({
            onEditClickHandler: editNearByPlacesTypesHandler,
            switchHandler: openSwitchModalHandler,
          })}
          loading={isNearByPlacesTypesDataLoading}
          pagination={paginationConfig}
          className="dorm-near-places-table-container"
          {...TABLE_PROPS(nearByPlacesTypeList?.length)}
        />
      </div>
    </>
  );
};

export default DormNearByPlacesTypes;
