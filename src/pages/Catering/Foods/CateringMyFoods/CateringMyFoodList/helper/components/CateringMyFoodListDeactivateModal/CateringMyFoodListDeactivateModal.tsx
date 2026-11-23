import { useState } from "react";

import { Form } from "antd";

import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomModal from "@components/Renderers/CustomModal/CustomModal";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { useGetDeactiveReasonsQuery } from "@infra/states/redux/Apis/catering/selfs/selfsApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { selectNotFoundContent } from "@pages/_shared/utils";

import {
  CateringMyFoodListDeactivateModalFormType,
  CateringMyFoodListDeactivateModalProps,
} from "./@types/@cateringMyFoodListDeactivateModal";

const CateringMyFoodListDeactivateModal = ({
  open,
  record,
  confirmLoading,
  onCancel,
  onConfirm,
}: CateringMyFoodListDeactivateModalProps) => {
  const [form] = Form.useForm<CateringMyFoodListDeactivateModalFormType>();
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
    <CustomModal
      open={open}
      onCancel={cancelHandler}
      size="medium"
      title="غیر فعال سازی غذا"
      variant="form"
      confirmText="تایید و غیرفعال سازی"
      cancelText="انصراف"
      confirmDanger
      confirmLoading={confirmLoading}
      className="[&_.ant-modal-body]:px-0!"
      onConfirm={confirmHandler}
      destroyOnClose
    >
      <Form form={form} className="flex flex-col gap-5" layout="vertical">
        <div className="flex flex-col gap-1 text-sm text-(--app-text)">
          <p>از غیرفعال‌کردن این غذا مطمئن هستید؟</p>
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
    </CustomModal>
  );
};

export default CateringMyFoodListDeactivateModal;
