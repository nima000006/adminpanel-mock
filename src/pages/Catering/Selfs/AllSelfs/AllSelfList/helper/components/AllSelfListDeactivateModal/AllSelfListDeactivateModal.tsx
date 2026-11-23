import { useState } from "react";

import { Form } from "antd";

import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomModal from "@components/Renderers/CustomModal/CustomModal";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { useGetDeactiveReasonsQuery } from "@infra/states/redux/Apis/catering/selfs/selfsApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { selectNotFoundContent } from "@pages/_shared/utils";

import {
  AllSelfListDeactivateModalFormType,
  AllSelfListDeactivateModalProps,
} from "./@types/@allSelfListDeactivateModal";

const AllSelfListDeactivateModal = ({
  open,
  record,
  confirmLoading,
  onCancel,
  onConfirm,
}: AllSelfListDeactivateModalProps) => {
  const [form] = Form.useForm<AllSelfListDeactivateModalFormType>();
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
      title="غیر فعال سازی سلف"
      variant="form"
      confirmText="تایید و غیرفعال سازی"
      cancelText="انصراف"
      confirmDanger
      confirmLoading={confirmLoading}
      onConfirm={confirmHandler}
      className="[&_.ant-modal-body]:px-0!"
      destroyOnClose
    >
      <Form form={form} className="flex flex-col gap-5" layout="vertical">
        <CustomAlert
          type="warning"
          showIcon
          className="border border-dashed! font-medium"
          title="توجه!"
          description={
            <>
              <p className="mb-0">
                با غیرفعال‌سازی سلف، برنامه‌های غذایی آن حذف نمی‌شوند.
              </p>
              <p className="mb-0">
                اگر برای هر یک از این برنامه‌ها سفارشی ثبت شده باشد و امکان ارائه آن وجود
                نداشته باشد، باید برنامه غذایی مربوطه را نیز غیرفعال کنید؛ در غیر این
                صورت، متعهد به تأمین آن خواهید بود.
              </p>
            </>
          }
        />

        <div className="flex flex-col gap-1 text-sm text-(--app-text)">
          <p>از غیرفعال‌کردن این سلف مطمئن هستید؟</p>
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

export default AllSelfListDeactivateModal;
