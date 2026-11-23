import { useState } from "react";

import { Form } from "antd";

import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { useGetDeactiveReasonsQuery } from "@infra/states/redux/Apis/catering/selfs/selfsApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { selectNotFoundContent } from "@pages/_shared/utils";

import {
  MyContractsListContractsDeactivateModalFormType,
  MyContractsListContractsDeactivateModalProps,
} from "./@types/@myContractsListContractsDeactivateModal";

const MyContractsListContractsDeactivateModal = ({
  open,
  record,
  confirmLoading,
  onCancel,
  onConfirm,
}: MyContractsListContractsDeactivateModalProps) => {
  const [form] = Form.useForm<MyContractsListContractsDeactivateModalFormType>();
  const [shouldFetchDeactiveReasons, setShouldFetchDeactiveReasons] = useState(false);

  //? ================================ Api Calls ================================
  const { data: deactiveReasonsData, isFetching: isGetDeactiveReasonsLoading } =
    useGetDeactiveReasonsQuery(undefined, {
      skip: !shouldFetchDeactiveReasons,
    });

  const deactivateReasonOptions =
    deactiveReasonsData?.map((item) => ({
      id: item.id,
      title: item.faTitle ?? item.title,
    })) ?? [];

  //* ================================ Util Functions ================================
  const getDeactiveReasonsHandler = () => {
    if (!shouldFetchDeactiveReasons) {
      setShouldFetchDeactiveReasons(true);
    }
  };

  const cancelHandler = () => {
    form.resetFields();
    setShouldFetchDeactiveReasons(false);
    onCancel();
  };

  const confirmHandler = () => {
    form.validateFields().then((values) => {
      onConfirm(values);
    });
  };

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <ConfirmationModalWithContent
      isModalOpen={open}
      title="غیر فعال سازی قرارداد"
      showIcon={false}
      closeModalHandler={cancelHandler}
      onConfirmClickHandler={confirmHandler}
      confirmBtnText="تایید و غیرفعال سازی"
      backBtnText="انصراف"
      isDangerous
      isConfirmButtonLoading={confirmLoading}
      content={
        <Form form={form} className="flex flex-col gap-5" layout="vertical">
          <div className="flex flex-col gap-1 text-sm text-(--app-text)">
            <p>از غیرفعال‌کردن این قرارداد مطمئن هستید؟</p>
            <p>{dataPlaceHolder({ data: record?.title })}</p>
          </div>

          <CustomSelect
            name="deActiveReason"
            label="علت غیر فعالسازی"
            placeholder="انتخاب کنید"
            options={deactivateReasonOptions}
            form={form}
            isLoading={isGetDeactiveReasonsLoading}
            onClick={getDeactiveReasonsHandler}
            notFoundContent={selectNotFoundContent}
            rules={[REQUIRED_RULE]}
          />
        </Form>
      }
    />
  );
};

export default MyContractsListContractsDeactivateModal;
