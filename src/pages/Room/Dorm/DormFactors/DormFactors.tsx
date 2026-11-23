import { useEffect, useState } from "react";

import { Form } from "antd";
import { useSearchParams } from "react-router";
import { toast } from "react-toastify";

import { CustomButton } from "@components/CustomInputs";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import { ExcelCodes } from "@infra/config/excel-codes";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { downloadListOfDormitoryFactorsInDormExcel } from "@infra/helpers/utils";

import {
  CancelDormitoryFactorResponse,
  CancelFactorModalType,
  DisableFactorModalType,
  DormFactorList,
  DormUpdateFactorResponse,
  GetDormFactorListResponse,
  UpdateDormFactorFormProps,
  UpdateFactorModalType,
} from "./@types/@dormFactors";
import DisableFactorModal from "./components/modal/DisableFactorModal/DisableFactorModal";
import UpdateFactorModalContent from "./components/modal/UpdateFactorModalContent/UpdateFactorModalContent";
import ConfirmationModalWithContent from "../../../../components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDivider from "../../../../components/Renderers/CustomDivider/CustomDivider";
import useTitle from "../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import paginationConfig from "../../../../infrastructure/helpers/TableHelpers/config/tableConfig";
import FactorListColumn, {
  RoomFactorRow,
} from "../../../../infrastructure/models/tableModels/RoomTableModel/FactorTableModel/FactorTableModel";
import {
  useCancelDormitoryFactorMutation,
  useFactorManualPaymentMutation,
  useGetDormFactorListMutation,
  useUpdateFactorMutation,
} from "../../../../infrastructure/states/redux/Apis/roomApi";
import {
  DOWNLOAD_LINK_ERROR,
  DOWNLOAD_LINK_SUCCESS,
  GENERAL_INPUTS_ERROR,
  GENERAL_UPDATE_SUCCESS_MSG,
} from "../../../../infrastructure/VARS/globalToasts/globalToasts";

const DormFactors = () => {
  const [searchParams] = useSearchParams();
  const [dataSource, setDataSource] = useState<DormFactorList[]>([]);
  const { id, name } = Object.fromEntries([...searchParams]);
  const [updateFactorForm] = Form.useForm();
  const [disableFactorForm] = Form.useForm<{
    description: string;
    isCancelled: [boolean | void];
  }>();

  const [updateFactorModal, setUpdateFactorModal] = useState<UpdateFactorModalType>({
    isOpen: false,
    info: {},
  });
  const [disableFactorModal, setDisableFactorModal] = useState<DisableFactorModalType>({
    isOpen: false,
    info: {},
  });

  const [cancelFactorModal, setCancelFactorModal] = useState<CancelFactorModalType>({
    isOpen: false,
    info: {},
  });

  const [total, setTotal] = useState<number>(updateFactorModal?.info?.amount ?? 0);

  const [isDownloadLinkLoading, setIsDownloadLinkLoading] = useState(false);

  useTitle({ text: name ?? "" });

  //? ================================  Api Calls ================================
  const [getDormList, { isLoading: isDormListLoading }] = useGetDormFactorListMutation();

  const [updateFactor, { isLoading: isUpdateFactorLoading }] = useUpdateFactorMutation();

  const [factorManualPayment, { isLoading: isFactorManualPaymentLoading }] =
    useFactorManualPaymentMutation();

  const [cancelFactor, { isLoading: isCancelFactorLoading }] =
    useCancelDormitoryFactorMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getDormData();
    }
  }, [id]);

  //* ================================ Util Functions ================================
  const getDormData = () => {
    getDormList({ dormitoryId: +id }).unwrap().then(onGetDormListSuccess);
  };

  // other functions
  const onGetDormListSuccess = async (info: GetDormFactorListResponse) => {
    if (info?.status === 200) {
      setDataSource(info?.data);
    }
  };

  // onUpdateFactorClickHandler
  const onUpdateFactorClickHandler = (data: RoomFactorRow) => {
    setUpdateFactorModal({ isOpen: true, info: data });
  };

  // onDisableFactorClickHandler
  const onDisableFactorClickHandler = (data: RoomFactorRow) => {
    setDisableFactorModal({ isOpen: true, info: data });
  };

  // onConfirmDisableModal
  const onConfirmDisableModal = async () => {
    await disableFactorForm.submit();
    const values = await disableFactorForm?.validateFields();
    if (disableFactorModal?.info?.id) {
      const isCancelled = values?.isCancelled?.[0] ?? false;

      factorManualPayment({
        description: values?.description ?? "",
        factorId: disableFactorModal?.info?.id,
        adminUsername: "",
        isCancelled: isCancelled,
      })
        .unwrap()
        .then((response) => {
          if (response?.status === 200) {
            disableFactorForm?.resetFields();
            setDisableFactorModal({ isOpen: false, info: {} });
            toast.success(GENERAL_UPDATE_SUCCESS_MSG, {
              toastId: GENERAL_UPDATE_SUCCESS_MSG,
            });
            getDormData();
          }
        });
    }
  };

  const onUpdateFactorSuccess = async (info: DormUpdateFactorResponse) => {
    if (info?.status === 200) {
      updateFactorForm?.resetFields();
      setUpdateFactorModal({ isOpen: false, info: {} });
      toast.success(GENERAL_UPDATE_SUCCESS_MSG, { toastId: GENERAL_UPDATE_SUCCESS_MSG });
      getDormData();
      closeUpdateFactorModalHandler();
    }
  };

  const onFactorUpdateConfirm = () => {
    updateFactorForm.submit();
    updateFactorForm?.validateFields().then((values: UpdateDormFactorFormProps) => {
      if (
        updateFactorModal?.info?.id &&
        (values?.description || values?.debit || values?.credit || values?.discount)
      ) {
        updateFactor({
          description: values?.description ?? "",
          debtAmount: values?.debit ?? 0,
          discount: values?.discount ?? 0,
          receivableAmount: values?.credit ?? 0,
          factorId: updateFactorModal?.info?.id,
        })
          .unwrap()
          .then(onUpdateFactorSuccess);
      } else {
        toast.error(GENERAL_INPUTS_ERROR, { toastId: GENERAL_INPUTS_ERROR });
      }
    });
  };

  const closeUpdateFactorModalHandler = () => {
    setUpdateFactorModal({ isOpen: false, info: {} });
    updateFactorForm.resetFields();
    setTotal(0);
  };

  //* ================================ Util Functions ================================
  // onGetExcelFileBtn
  const onGetExcelFileBtn = async () => {
    if (id) {
      try {
        setIsDownloadLinkLoading(true);
        const downloadLink = await downloadListOfDormitoryFactorsInDormExcel(id);
        if (downloadLink?.length) {
          toast.success(DOWNLOAD_LINK_SUCCESS, { toastId: DOWNLOAD_LINK_SUCCESS });
        } else {
          toast.error(DOWNLOAD_LINK_ERROR, { toastId: DOWNLOAD_LINK_ERROR });
        }
      } catch (_) {
        toast.error(DOWNLOAD_LINK_ERROR, { toastId: DOWNLOAD_LINK_ERROR });
      } finally {
        setIsDownloadLinkLoading(false);
      }
    }
  };

  const onCancelFactorClickHandler = (data: RoomFactorRow) => {
    setCancelFactorModal({ isOpen: true, info: data });
  };

  const onCancelFactorModal = () => {
    if (cancelFactorModal?.info?.id) {
      cancelFactor({
        adminUsername: "",
        description: "",
        factorId: cancelFactorModal?.info?.id,
      })
        .unwrap()
        .then(onCancelFactorSuccess);
    }
  };

  const onCancelFactorSuccess = async (info: CancelDormitoryFactorResponse) => {
    if (info?.status === 200) {
      setCancelFactorModal({ isOpen: false, info: {} });
      toast.success(GENERAL_UPDATE_SUCCESS_MSG, { toastId: GENERAL_UPDATE_SUCCESS_MSG });
      getDormData();
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* مودال غیر فعال سازی */}
      {disableFactorModal?.isOpen && (
        <ConfirmationModalWithContent
          content={
            <Form form={disableFactorForm}>
              <DisableFactorModal
                info={disableFactorModal?.info}
                // form={disableFactorForm}
              />
            </Form>
          }
          showIcon={false}
          title="توضیحات"
          backBtnText="انصراف"
          confirmBtnText="تایید"
          closeModalHandler={() => setDisableFactorModal({ isOpen: false, info: {} })}
          onConfirmClickHandler={onConfirmDisableModal}
          isModalOpen={disableFactorModal?.isOpen}
          isConfirmButtonLoading={isFactorManualPaymentLoading}
          width={1000}
        />
      )}
      {/* مودال بروزرسانی فاکتور */}
      {updateFactorModal?.isOpen && (
        <ConfirmationModalWithContent
          content={
            <Form form={updateFactorForm}>
              <UpdateFactorModalContent
                info={updateFactorModal?.info}
                form={updateFactorForm}
                total={total}
                setTotal={setTotal}
              />
            </Form>
          }
          showIcon={false}
          isModalOpen={updateFactorModal?.isOpen}
          closeModalHandler={closeUpdateFactorModalHandler}
          onConfirmClickHandler={onFactorUpdateConfirm}
          title="به‌روزرسانی فاکتور"
          confirmBtnText="ثبت نهایی فاکتور"
          backBtnText="برگشت"
          width={1000}
          isConfirmButtonLoading={isUpdateFactorLoading}
        />
      )}

      {/* مودال ابطال فاکتور */}
      {cancelFactorModal?.isOpen && (
        <ConfirmationModalWithContent
          content={<p>آیا از ابطال فاکتور اطمینان دارید؟</p>}
          showIcon={false}
          title="ابطال فاکتور"
          backBtnText="انصراف"
          confirmBtnText="تایید"
          closeModalHandler={() => setCancelFactorModal({ isOpen: false, info: {} })}
          onConfirmClickHandler={onCancelFactorModal}
          isModalOpen={cancelFactorModal?.isOpen}
          isConfirmButtonLoading={isCancelFactorLoading}
        />
      )}

      <CustomDivider
        text="لیست فاکتور ها"
        extraContent={
          <CustomButton
            onClick={onGetExcelFileBtn}
            loading={isDownloadLinkLoading}
            className="custom-dorm-request-excel-btn"
          >
            دانلود فایل اکسل
          </CustomButton>
        }
      />
      <div className="list-table-container">
        <CustomTable
          dataSource={dataSource}
          loading={isDormListLoading}
          columns={FactorListColumn({
            onUpdateFactorClickHandler: onUpdateFactorClickHandler,
            onDisableFactorClickHandler: onDisableFactorClickHandler,
            onCancelFactorClickHandler: onCancelFactorClickHandler,
          })}
          pagination={paginationConfig}
          {...TABLE_PROPS(dataSource?.length)}
          draggableColumns
          draggableId={ExcelCodes.ROOM_DORM_FACTORS_TABLE}
        />
      </div>
    </>
  );
};

export default DormFactors;
