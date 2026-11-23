import { useEffect } from "react";

import { Row } from "antd";

import CustomCard from "@components/CustomCard/CustomCard";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomInputNumber from "@components/CustomInputs/InputNumber/CustomInputNumber";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { useLazyGetAllPaidFactorDetailsOfRequestIdQuery } from "@infra/states/redux/Apis/roomApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import "./_revertDeliverModal.scss";

type RevertDeliverModalContentProps = {
  isOpen: boolean;
  id: number;
};

const RevertDeliverModalContent = ({ isOpen, id }: RevertDeliverModalContentProps) => {
  //? ================================  Api Calls ================================
  const [getAllPaidData, { data: paidData, isFetching: isPaidDataLoading }] =
    useLazyGetAllPaidFactorDetailsOfRequestIdQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (isOpen) {
      getAllPaidData(id);
    }
  }, [id]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="revert-room-container">
      <CustomCard loading={isPaidDataLoading}>
        <Row gutter={[16, 10]}>
          <SingleVerticalWithCol
            xl={12}
            lg={12}
            md={12}
            label="مبلغ پرداخت شده در اپلیکیشن (ریال)"
            value={paidData?.data?.totalAutomatedPaidAmount?.toString()}
            isPrice
          />

          <SingleVerticalWithCol
            xl={12}
            lg={12}
            md={12}
            label="بدهی (ریال)"
            value={paidData?.data?.totalNotPaidAmount?.toString()}
            isPrice
          />

          <SingleVerticalWithCol
            xl={12}
            lg={12}
            md={12}
            label="مبلغ پرداخت شده دستی (ریال)"
            value={paidData?.data?.totalManualPaidAmount?.toString()}
            isPrice
          />

          <SingleVerticalWithCol
            xl={12}
            lg={12}
            md={12}
            label="مبلغ کل (ریال)"
            value={paidData?.data?.totalAmount?.toString()}
            isPrice
          />
        </Row>
      </CustomCard>
      <CustomCard className="revert-content-container">
        <CustomInputNumber
          label="مبلغ فاکتور جدید(ریال)"
          placeholder="مبلغ فاکتور جدید"
          name="price"
          isPrice={true}
          rules={[REQUIRED_RULE]}
        />
        <CustomTextArea
          label="توضیحات"
          placeholder="توضیحات"
          name="description"
          rules={[REQUIRED_RULE]}
        />
      </CustomCard>
    </div>
  );
};

export default RevertDeliverModalContent;
