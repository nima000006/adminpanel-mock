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
  useCreateDormPaymentTypesMutation,
  useLazyGetPaymentTypeQuery,
  useUpdateDormPaymentTypesMutation,
} from "@infra/states/redux/Apis/dorm/base/dormBaseApi";
import {
  GeneralSelectResponse,
  GetPaymentTypeResponse,
} from "@pages/Dorm/Planning/Admission/AdmissionModify/@types/@admissionModify";

import {
  CreateDormPaymentTypesResponse,
  UpdateDormPaymentTypesResponse,
} from "./@types/@dormPaymentTypes";
import {
  ACTIVE_SWITCH_MODAL_MESSAGE,
  INACTIVE_SWITCH_MODAL_MESSAGE,
} from "../helper/utils/DormBasicInfoDetailUtils";
import DormBasicInfoPaymentTypesTableModel from "./helper/models/DormBasicInfoPaymentTypes/DormBasicInfoPaymentTypesTableModel";
import DormPaymentTypeModalContent from "./helper/section/DormPaymentTypeModalContent/DormPaymentTypeModalContent";

import "./_dormPaymentTypes.scss";

const DormPaymentTypes = () => {
  const [paymentTypesList, setPaymentTypesList] = useState<GeneralSelectResponse[]>([]);

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

  const [modifyForm] = Form.useForm<{ PaymentTypeTitle: string }>();

  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={DORM_BASIC_INFO_LIST_PAGE_ROUTE}>اطلاعات پایه اقامتگاه</Link>,
      },
      {
        title: "انواع پرداخت",
      },
    ],
  });

  //? ================================  Api Calls ================================
  // get table list
  const [getPaymentTypes, { isFetching: isGetPaymentTypesLoading }] =
    useLazyGetPaymentTypeQuery();

  // create
  const [createPaymentTypes, { isLoading: isCreatePaymentTypesLoading }] =
    useCreateDormPaymentTypesMutation();

  // update
  const [updatePaymentTypes, { isLoading: isUpdatePaymentTypesLoading }] =
    useUpdateDormPaymentTypesMutation();

  //? ================================ Effects ================================
  useEffect(() => getPaymentTypesList(), []);

  //* ================================ Util Functions ================================
  // get list
  const getPaymentTypesList = () => {
    getPaymentTypes({ maxResults: 2000, firstResult: 0 })
      .unwrap()
      .then(getPaymentTypesSuccess);
  };

  const getPaymentTypesSuccess = (value: GetPaymentTypeResponse) => {
    if (value?.status === 200) {
      setPaymentTypesList(value?.data);
    }
  };

  // modify handler
  const addPaymentTypeHandler = () => {
    setIsModifyModalOpen({ isOpen: true, id: -1 });
  };

  const editSpecialConditionsTypeHandler = (value: GeneralSelectResponse) => {
    setIsModifyModalOpen({ isOpen: true, id: value?.id });

    modifyForm.setFieldsValue({
      PaymentTypeTitle: value?.title,
    });
  };

  const closeModifyModalHandler = () => {
    setIsModifyModalOpen({ isOpen: false, id: -1 });
    modifyForm.resetFields();
  };

  const confirmModifyModalHandler = () => {
    modifyForm?.submit();

    modifyForm?.validateFields().then(() => {
      const { PaymentTypeTitle } = modifyForm.getFieldsValue();
      if (isModifyModalOpen?.id === -1) {
        createPaymentTypes({
          form: "PaymentType",
          data: {
            title: PaymentTypeTitle,
            recordStatus: "1",
          },
        })
          .unwrap()
          .then(createPaymentTypeIsSuccess);
      } else {
        updatePaymentTypes({
          form: "PaymentType",
          id: "ae4548c1742f435a9deb69523b20ddc9",
          data: {
            title: PaymentTypeTitle,
            id: isModifyModalOpen?.id,
          },
        })
          .unwrap()
          .then(updatePaymentTypeIsSuccess);
      }
    });
  };

  // create success
  const createPaymentTypeIsSuccess = async (value: CreateDormPaymentTypesResponse) => {
    if (value?.status === 200) {
      modifyHandler();
    }
  };

  //update success
  const updatePaymentTypeIsSuccess = async (value: UpdateDormPaymentTypesResponse) => {
    if (value?.status === 200) {
      modifyHandler();
    }
  };

  const modifyHandler = () => {
    getPaymentTypesList();
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
    updatePaymentTypes({
      form: "PaymentType",
      id: "ae4548c1742f435a9deb69523b20ddc9",
      data: {
        recordStatus: recordStatus,
        id: isOpenSwitchModal?.id,
      },
    })
      .unwrap()
      .then(changeStatusSuccess);
  };

  const changeStatusSuccess = async (value: UpdateDormPaymentTypesResponse) => {
    if (value?.status === 200) {
      getPaymentTypesList();
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
          title={isModifyModalOpen?.id !== -1 ? "ویرایش نوع پرداخت" : "افزودن نوع پرداخت"}
          confirmBtnText={isModifyModalOpen?.id !== -1 ? "ثبت تغییرات" : "افزودن"}
          backBtnText="انصراف"
          isConfirmButtonLoading={
            isCreatePaymentTypesLoading || isUpdatePaymentTypesLoading
          }
          content={<DormPaymentTypeModalContent form={modifyForm} />}
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
          isConfirmButtonLoading={isUpdatePaymentTypesLoading}
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

      <div className="dorm-basic-info-payment-type-container">
        <CustomTable
          dataSource={paymentTypesList}
          columns={DormBasicInfoPaymentTypesTableModel({
            onEditClickHandler: editSpecialConditionsTypeHandler,
            switchHandler: openSwitchModalHandler,
          })}
          loading={isGetPaymentTypesLoading}
          pagination={paginationConfig}
          className="dorm-payment-table-container"
          {...TABLE_PROPS(paymentTypesList?.length)}
        />
        <CustomButton
          icon={<AiOutlinePlus />}
          iconPlacement="end"
          disabled
          onClick={addPaymentTypeHandler}
        >
          افزودن نوع پرداخت
        </CustomButton>
      </div>
    </>
  );
};

export default DormPaymentTypes;
