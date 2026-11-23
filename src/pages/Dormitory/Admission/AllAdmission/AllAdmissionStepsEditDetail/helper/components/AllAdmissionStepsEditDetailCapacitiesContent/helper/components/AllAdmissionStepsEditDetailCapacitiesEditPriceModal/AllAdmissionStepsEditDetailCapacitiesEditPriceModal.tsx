import { useEffect } from "react";

import { Col, Form, Row } from "antd";

import { CustomInputNumber, CustomSingleCheckbox } from "@components/CustomInputs";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomModal from "@components/Renderers/CustomModal/CustomModal";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import {
  CapacitiesEditPriceFormType,
  CapacitiesEditPriceModalProps,
} from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionStepsEditDetail/helper/components/AllAdmissionStepsEditDetailCapacitiesContent/@types/@allAdmissionStepsEditDetailCapacitiesContent";
import { getEditPriceAlertMessage } from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionStepsEditDetail/helper/components/AllAdmissionStepsEditDetailCapacitiesContent/helper/util";

const AllAdmissionStepsEditDetailCapacitiesEditPriceModal = ({
  open,
  target,
  context,
  onCancel,
  onConfirm,
}: CapacitiesEditPriceModalProps) => {
  const [form] = Form.useForm<CapacitiesEditPriceFormType>();
  const receiveDeposit = Form.useWatch("receiveDeposit", form);
  const isSingle = target?.kind === "single";
  const title = isSingle ? "ویرایش قیمت" : "ویرایش گروهی قیمت";

  //? ================================ Effects ================================
  useEffect(() => {
    if (!open || !target) return;

    // when select from table
    if (target.kind === "single") {
      const record = target.record;
      form.setFieldsValue({
        price: record.price ?? null,
        receiveDeposit: record.deposit != null,
        deposit: record.deposit ?? null,
      });
      return;
    }
    // when select from group
    form.setFieldsValue({
      price: null,
      receiveDeposit: false,
      deposit: null,
    });
  }, [form, open, target]);

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
      confirmText="تایید و اعمال تغییرات"
      cancelText="انصراف"
      onConfirm={confirmHandler}
      destroyOnClose
    >
      <Form form={form} className="flex flex-col gap-5" layout="vertical">
        <CustomAlert
          type="warning"
          showIcon
          className="border border-dashed! font-medium"
          title={getEditPriceAlertMessage({
            mode: context.mode,
            target,
            hasFilter: isSingle ? false : context.hasFilter,
            filteredCount: isSingle ? 1 : context.filteredCount,
            scheduleType: context.scheduleType,
          })}
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

export default AllAdmissionStepsEditDetailCapacitiesEditPriceModal;
