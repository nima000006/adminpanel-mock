import { useEffect } from "react";

import { Col, Form, Row } from "antd";

import { CustomInputNumber, CustomSingleCheckbox } from "@components/CustomInputs";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomModal from "@components/Renderers/CustomModal/CustomModal";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import {
  AdmissionStepsCapacitiesAddFormType,
  AdmissionStepsCapacitiesAddModalProps,
} from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsCapacitiesContent/@types/@admissionStepsCapacitiesContent";
import {
  getCapacitiesAddAlertMessage,
  getCapacitiesEditPriceAlertMessage,
  getCapacitiesTransferAlertMessage,
} from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsCapacitiesContent/helper/util";

const AdmissionStepsCapacitiesAddModal = ({
  open,
  intent = "add",
  target,
  context,
  onCancel,
  onConfirm,
}: AdmissionStepsCapacitiesAddModalProps) => {
  const [form] = Form.useForm<AdmissionStepsCapacitiesAddFormType>();
  const receiveDeposit = Form.useWatch("receiveDeposit", form);
  const isSingle = target?.kind === "single";
  const isEdit = intent === "edit";
  const isTransfer = intent === "transfer";
  const title = isTransfer
    ? isSingle
      ? "انتقال به این برنامه"
      : "انتقال گروهی"
    : isEdit
      ? isSingle
        ? "ویرایش قیمت"
        : "ویرایش گروهی قیمت"
      : isSingle
        ? "افزودن به برنامه"
        : "افزودن گروهی";

  const confirmText = isTransfer
    ? "تایید و انتقال"
    : isEdit
      ? "تایید و اعمال تغییرات"
      : "تایید و افزودن به برنامه";

  const transferAlert = isTransfer
    ? getCapacitiesTransferAlertMessage({
        mode: context.mode,
        target,
        hasFilter: isSingle ? false : context.hasFilter,
        filteredCount: isSingle ? 1 : context.filteredCount,
        scheduleType: context.scheduleType,
        programTitle: context.programTitle,
      })
    : null;

  const alertTitle = isTransfer
    ? transferAlert?.title
    : isEdit
      ? getCapacitiesEditPriceAlertMessage({
          mode: context.mode,
          target,
          hasFilter: isSingle ? false : context.hasFilter,
          filteredCount: isSingle ? 1 : context.filteredCount,
          scheduleType: context.scheduleType,
        })
      : getCapacitiesAddAlertMessage({
          mode: context.mode,
          target,
          hasFilter: isSingle ? false : context.hasFilter,
          filteredCount: isSingle ? 1 : context.filteredCount,
          scheduleType: context.scheduleType,
        });

  //? ================================ Effects ================================

  useEffect(() => {
    if (!open || !target) return;

    if (isEdit && target.kind === "single") {
      const record = target.record;

      form.setFieldsValue({
        price: record.price ?? null,
        receiveDeposit: record.depositAmount != null,
        deposit: record.depositAmount ?? null,
      });

      return;
    }

    form.setFieldsValue({
      price: null,
      receiveDeposit: false,
      deposit: null,
    });
  }, [form, isEdit, open, target]);

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

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <CustomModal
      open={open}
      onCancel={cancelHandler}
      title={title}
      size="medium"
      variant="form"
      confirmText={confirmText}
      cancelText="انصراف"
      onConfirm={confirmHandler}
      destroyOnClose
    >
      <Form form={form} className="flex flex-col gap-5" layout="vertical">
        <CustomAlert
          type={isEdit || isTransfer ? "warning" : "info"}
          showIcon
          className="border border-dashed! font-medium"
          title={alertTitle}
          description={transferAlert?.description}
        />

        <Row>
          <Col span={24}>
            <CustomInputNumber
              name="price"
              label="قیمت"
              isPrice
              suffix="ریال"
              placeholder="مثلا 100,000"
              rules={[REQUIRED_RULE]}
              min={0}
            />
          </Col>
        </Row>

        <div className="flex flex-col gap-2">
          <CustomSingleCheckbox
            name="receiveDeposit"
            label="دریافت ودیعه از کاربر"
            valuePropName="checked"
          />
          {receiveDeposit ? (
            <Row>
              <Col span={24}>
                <CustomInputNumber
                  name="deposit"
                  label="مبلغ ودیعه"
                  isPrice
                  suffix="ریال"
                  placeholder="مثلا 100,000"
                  rules={[REQUIRED_RULE]}
                  min={0}
                />
              </Col>
            </Row>
          ) : null}
        </div>
      </Form>
    </CustomModal>
  );
};

export default AdmissionStepsCapacitiesAddModal;
