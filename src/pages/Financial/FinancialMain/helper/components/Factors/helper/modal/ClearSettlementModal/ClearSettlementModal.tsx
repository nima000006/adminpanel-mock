import { useEffect } from "react";

import { Button, Form, Modal, Row } from "antd";
import { toast } from "react-toastify";

import CustomCard from "@components/CustomCard/CustomCard";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import {
  useGetFactorDetailMutation,
  usePostFactorDescMutation,
} from "@infra/states/redux/Apis/financialApi";
import { NUMBER_RULE, REQUIRED_RULE } from "@infra/validation/validationSchema";
import { SETTLEMENT_CLEAR_SUCCESS } from "@infra/VARS/globalToasts/globalToasts";

import {
  ClearSettlementModalProps,
  GetFactorDescResponse,
} from "./@types/@clearSettlementModal";
import "./_clearSettlementModal.scss";

const ClearSettlementModal = ({
  setSettlementModal,
  settlementModal,
  setIsSettlementUpdated,
  ids,
}: ClearSettlementModalProps) => {
  const [form] = Form.useForm();
  const NOT_VALID_TYPE = "ثبت نشده";

  //? ================================  Api Calls ================================
  const [getFactorDetail, { data }] = useGetFactorDetailMutation();

  // usePostFactorDesc hook
  const [postFactorDesc, { isLoading: isFactPostPaymnetLoading }] =
    usePostFactorDescMutation();

  //* ================================ Util Functions ================================
  // if (isGetFactorDetailError) {
  //   toast.error(GENERAL_ERROR_MESSAGE, {
  //     toastId: GENERAL_ERROR_MESSAGE,
  //   });
  // }

  const onPostFactorDescSuccess = async (values: GetFactorDescResponse) => {
    if (values?.status === 200) {
      setSettlementModal({ isOpen: false, data: [] });
      toast.success(SETTLEMENT_CLEAR_SUCCESS, { toastId: SETTLEMENT_CLEAR_SUCCESS });
      setIsSettlementUpdated((prev) => !prev);
      form?.resetFields();
    }
  };

  const settleBtnHandler = (e: { desc: string; documentNo: number }) => {
    postFactorDesc({ desc: e.desc, documentNo: e.documentNo, ids })
      .unwrap()
      .then(onPostFactorDescSuccess);
  };

  //? ================================ Effects ================================
  useEffect(() => {
    if (settlementModal?.isOpen) {
      getFactorDetail({ ids });
    }
  }, [settlementModal?.isOpen]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {settlementModal?.isOpen && (
        <Modal
          title="تسویه"
          open={settlementModal?.isOpen}
          onCancel={() => setSettlementModal({ isOpen: false, data: [] })}
          footer={null}
          className="factor-settlement-container"
          width={1000}
          confirmLoading={isFactPostPaymnetLoading}
        >
          <Form
            className="main-finance-set-container"
            onFinish={settleBtnHandler}
            form={form}
          >
            <CustomCard className="data-info-container">
              <Row gutter={[16, 16]}>
                <SingleVerticalWithCol
                  label="تعداد فاکتور"
                  value={data?.data.countFactorNo.toString() ?? NOT_VALID_TYPE}
                  hasCountUpEffect
                />
                <SingleVerticalWithCol
                  label="مبلغ کل"
                  value={data?.data.sumAmount.toString() ?? NOT_VALID_TYPE}
                  isPrice
                />
                <SingleVerticalWithCol
                  label="سهم دانشگاه"
                  value={data?.data.sumUniversityReceive.toString() ?? NOT_VALID_TYPE}
                  isPrice
                />
              </Row>
            </CustomCard>
            <CustomCard className="inputs-container">
              <CustomTextArea
                label="توضیحات"
                placeholder="توضیحات"
                name="desc"
                rules={[REQUIRED_RULE]}
                hasVerticalLabel={false}
              />
              <CustomInput
                label="شماره سند حسابداری"
                placeholder="4815416511135400"
                type="text"
                name="documentNo"
                rules={[REQUIRED_RULE, NUMBER_RULE]}
                maxLength={10}
              />
            </CustomCard>
            <div className="action-container">
              <Button type="primary" htmlType="submit">
                تسویه
              </Button>
              <Button onClick={() => setSettlementModal({ isOpen: false, data: [] })}>
                برگشت
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default ClearSettlementModal;
