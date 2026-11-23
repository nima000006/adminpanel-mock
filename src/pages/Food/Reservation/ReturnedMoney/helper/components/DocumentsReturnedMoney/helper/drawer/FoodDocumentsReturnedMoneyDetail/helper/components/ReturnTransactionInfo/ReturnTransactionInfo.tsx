import { Col, Form, Row } from "antd";

import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import { IconCalculator } from "@components/icons/icons";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import { dataPlaceHolder } from "@infra/helpers/utils";

import { ReturnTransactionInfoProps } from "./@types/@returnTransactionInfoType";

import "./_returnTransactionInfo.scss";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

const ReturnTransactionInfo = ({
  total,
  loading,
  form,
  returnTransactionFileImage,
  setReturnTransactionFileImage,
  data,
}: ReturnTransactionInfoProps) => {
  return (
    <Div className="food-return-transaction-info-container" loading={loading}>
      <div className="total-price-card-container">
        <IconCalculator viewBox="0 0 24 24" fill="#1890FF" />
        <span className="title">مجموع مبلغ قابل عودت</span>
        <span className="price-title">
          {dataPlaceHolder({ data: total?.toString(), isPrice: true })} تومان
        </span>
      </div>
      <Form form={form}>
        <CustomDivider text="اطلاعات تراکنش عودت" />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            xl={12}
            lg={12}
            label="شماره پیگیری تراکنش"
            value={data?.referenceNo?.toString()}
            // value={data?.trackNo?.toString()}
          />
          <SingleVerticalWithCol
            xl={12}
            lg={12}
            label="تاریخ"
            value={data?.createdDate}
            isDate
          />
          <SingleVerticalWithCol
            xl={12}
            lg={12}
            label="بانک عامل مبداء"
            value={data?.fromBankPersianName}
          />
          <SingleVerticalWithCol
            xl={12}
            lg={12}
            label="شماره شبا مبداء"
            value={data?.fromIBAN}
          />
          {returnTransactionFileImage?.length ? (
            <Col span={24}>
              <CustomUploader
                fileList={returnTransactionFileImage}
                setFileList={setReturnTransactionFileImage}
                isReadOnly={true}
                name="food"
                uploaderText="غذا"
                label="فایل فیش واریزی"
                hasVerticalLabel={true}
              />
            </Col>
          ) : (
            ""
          )}
        </Row>
      </Form>
    </Div>
  );
};
export default ReturnTransactionInfo;
