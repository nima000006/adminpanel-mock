import { useEffect } from "react";

import { Form } from "antd";

import { CustomSelect } from "@components/CustomInputs";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomModal from "@components/Renderers/CustomModal/CustomModal";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import {
  AllAdmissionCreationBeneficiaryFormType,
  AllAdmissionCreationBeneficiaryModalProps,
} from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionCreation/@types/@allAdmissionCreation";
import {
  CONTRACT_BRANCH_OPTIONS_BY_BUSINESS,
  CONTRACT_BUSINESS_OPTIONS,
} from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionCreation/helper/util";

const AllAdmissionCreationBeneficiaryModal = ({
  open,
  mode,
  initialValues,
  onCancel,
  onConfirm,
}: AllAdmissionCreationBeneficiaryModalProps) => {
  const [form] = Form.useForm<AllAdmissionCreationBeneficiaryFormType>();
  const business = Form.useWatch("business", form);
  const businessId =
    business?.item?.id != null
      ? String(business.item.id)
      : business?.value != null
        ? String(business.value)
        : "";

  // define = first assign (title/CTA/info alert); edit = update existing beneficiary
  const isDefineMode = mode === "define";
  const branchOptions = CONTRACT_BRANCH_OPTIONS_BY_BUSINESS[businessId] ?? [];

  //? ================================ Effects ================================
  useEffect(() => {
    if (!open) {
      return;
    }

    form.setFieldsValue({
      business: initialValues?.business,
      branch: initialValues?.branch,
    });
  }, [form, initialValues, open]);

  //* ================================ Util Functions ================================
  const cancelHandler = () => {
    form.resetFields();
    onCancel();
  };

  const confirmHandler = async () => {
    const values = await form.validateFields();
    onConfirm(values);
    form.resetFields();
  };

  const businessChangeHandler = () => {
    form.setFieldValue("branch", undefined);
  };

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomModal
      open={open}
      onCancel={cancelHandler}
      title={isDefineMode ? "تعیین ذینفع" : "ویرایش ذینفع"}
      variant="form"
      confirmText={isDefineMode ? "ثبت و تایید" : "ثبت و اعمال تغییرات"}
      cancelText="انصراف"
      onConfirm={confirmHandler}
      // Drawer root is z-index 1149; keep modal above it.
      zIndex={1200}
      destroyOnClose
    >
      <Form form={form} className="flex flex-col gap-5" layout="vertical">
        {isDefineMode ? (
          <CustomAlert
            type="info"
            showIcon
            className="border border-dashed! font-medium"
            title="کسب و کار و شعبه / واحد ذینفع را مشخص نمایید."
          />
        ) : null}

        <CustomSelect
          name="business"
          label="کسب و کار ذینفع"
          form={form}
          options={CONTRACT_BUSINESS_OPTIONS}
          rules={[REQUIRED_RULE]}
          placeholder="انتخاب کنید"
          onChange={businessChangeHandler}
        />

        <CustomSelect
          name="branch"
          label="شعبه / واحد ذینفع"
          form={form}
          options={branchOptions}
          rules={[REQUIRED_RULE]}
          placeholder="انتخاب کنید"
          disabled={!businessId}
        />
      </Form>
    </CustomModal>
  );
};

export default AllAdmissionCreationBeneficiaryModal;
