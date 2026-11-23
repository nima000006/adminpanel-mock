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
  useCreateDormPaymentMethodTypesMutation,
  useLazyGetPaymentMethodQuery,
  useUpdateDormPaymentMethodTypesMutation,
} from "@infra/states/redux/Apis/dorm/base/dormBaseApi";
import {
  GeneralSelectResponse,
  GetPaymentMethodResponse,
} from "@pages/Dorm/Planning/Admission/AdmissionModify/@types/@admissionModify";

import {
  CreateDormPaymentMethodTypesResponse,
  UpdateDormPaymentMethodTypesResponse,
} from "./@types/@dormPaymentMethodTypes";
import {
  ACTIVE_SWITCH_MODAL_MESSAGE,
  INACTIVE_SWITCH_MODAL_MESSAGE,
} from "../helper/utils/DormBasicInfoDetailUtils";
import DormBasicInfoPaymentMethodTypesTableModel from "./helper/models/DormBasicInfoPaymentMethodTypes/DormBasicInfoPaymentMethodTypesTableModel";
import DormPaymentMethodTypeModalContent from "./helper/section/DormPaymentMethodTypeModalContent/DormPaymentMethodTypeModalContent";
import "./_dormPaymentMethodTypes.scss";

const DormPaymentMethodTypes = () => {
  const [paymentMethodTypeList, setIsPaymentMethodTypeList] = useState<
    GeneralSelectResponse[]
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

  const [modifyForm] = Form.useForm<{ paymentMethodTitle: string }>();

  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={DORM_BASIC_INFO_LIST_PAGE_ROUTE}>اطلاعات پایه اقامتگاه</Link>,
      },
      { title: "انواع روش پرداخت" },
    ],
  });

  //? ================================  Api Calls ================================
  //get table list
  const [getPaymentMethodTypes, { isFetching: isPaymentMethodTypesDataLoading }] =
    useLazyGetPaymentMethodQuery();

  const [
    createDormPaymentMethodTypes,
    { isLoading: isCreateDormPaymentMethodTypesLoading },
  ] = useCreateDormPaymentMethodTypesMutation();

  const [
    updateDormPaymentMethodTypes,
    { isLoading: isUpdateDormPaymentMethodTypesLoading },
  ] = useUpdateDormPaymentMethodTypesMutation();

  //? ================================ Effects ================================
  useEffect(() => getPaymentMethodList(), []);

  //* ================================ Util Functions ================================
  // get list
  const getPaymentMethodList = () => {
    getPaymentMethodTypes({ maxResults: 2000, firstResult: 0 })
      .unwrap()
      .then(getPaymentMethodTypesSuccess);
  };

  const getPaymentMethodTypesSuccess = (value: GetPaymentMethodResponse) => {
    if (value?.status === 200) {
      setIsPaymentMethodTypeList(value?.data);
    }
  };

  // modify handler
  const addPaymentMethodTypeHandler = () => {
    setIsModifyModalOpen({ isOpen: true, id: -1 });
  };

  const editResidenceTypesHandler = (value: GeneralSelectResponse) => {
    setIsModifyModalOpen({ isOpen: true, id: value?.id });
    modifyForm.setFieldsValue({
      paymentMethodTitle: value?.title,
    });
  };

  const closeModifyModalHandler = () => {
    setIsModifyModalOpen({ isOpen: false, id: -1 });
    modifyForm.resetFields();
  };

  const confirmModifyModalHandler = () => {
    modifyForm?.submit();
    modifyForm?.validateFields().then(() => {
      const { paymentMethodTitle } = modifyForm.getFieldsValue();

      if (isModifyModalOpen?.id === -1) {
        createDormPaymentMethodTypes({
          form: "PaymentMethod",
          data: {
            title: paymentMethodTitle,
            recordStatus: 1,
          },
        })
          .unwrap()
          .then(createDormPaymentMethodTypesIsSuccess);
      } else {
        updateDormPaymentMethodTypes({
          form: "PaymentMethod",
          id: "881e5c554e124bbda50c279ca88966dc",
          data: {
            title: paymentMethodTitle,
            id: isModifyModalOpen?.id,
          },
        })
          .unwrap()
          .then(updateDormPaymentMethodTypesIsSuccess);
      }
    });
  };

  const createDormPaymentMethodTypesIsSuccess = async (
    value: CreateDormPaymentMethodTypesResponse
  ) => {
    if (value?.status === 200) {
      modifyHandler();
    }
  };

  const updateDormPaymentMethodTypesIsSuccess = async (
    value: UpdateDormPaymentMethodTypesResponse
  ) => {
    if (value?.status === 200) {
      modifyHandler();
    }
  };

  const modifyHandler = () => {
    getPaymentMethodList();
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

    updateDormPaymentMethodTypes({
      form: "PaymentMethod",
      id: "881e5c554e124bbda50c279ca88966dc",
      data: {
        recordStatus: recordStatus?.toString(),
        id: isOpenSwitchModal?.id,
      },
    })
      .unwrap()
      .then(changeStatusSuccess);
  };

  const changeStatusSuccess = async (value: UpdateDormPaymentMethodTypesResponse) => {
    if (value?.status === 200) {
      getPaymentMethodList();
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
          title={isModifyModalOpen?.id !== -1 ? "ویرایش روش پرداخت" : "افزودن روش پرداخت"}
          confirmBtnText={isModifyModalOpen?.id !== -1 ? "ثبت تغییرات" : "افزودن"}
          backBtnText="انصراف"
          isConfirmButtonLoading={
            isCreateDormPaymentMethodTypesLoading || isUpdateDormPaymentMethodTypesLoading
          }
          content={<DormPaymentMethodTypeModalContent form={modifyForm} />}
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
          isConfirmButtonLoading={isUpdateDormPaymentMethodTypesLoading}
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

      <div className="dorm-basic-info-payment-method-type-container">
        <ToolBox
          leftSide={
            <CustomButton
              icon={<AiOutlinePlus />}
              iconPlacement="end"
              onClick={addPaymentMethodTypeHandler}
            >
              افزودن روش پرداخت
            </CustomButton>
          }
        />
        <CustomTable
          dataSource={paymentMethodTypeList}
          columns={DormBasicInfoPaymentMethodTypesTableModel({
            onEditClickHandler: editResidenceTypesHandler,
            switchHandler: openSwitchModalHandler,
          })}
          loading={isPaymentMethodTypesDataLoading}
          pagination={paginationConfig}
          className="dorm-payment-method-table-container"
          {...TABLE_PROPS(paymentMethodTypeList?.length)}
        />
      </div>
    </>
  );
};

export default DormPaymentMethodTypes;
