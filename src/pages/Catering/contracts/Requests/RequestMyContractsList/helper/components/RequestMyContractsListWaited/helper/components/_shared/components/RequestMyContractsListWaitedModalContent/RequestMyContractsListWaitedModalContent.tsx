import { Col, Form, FormInstance, Row } from "antd";

import { CustomSelect } from "@components/CustomInputs";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { RequestMyContractsListWaitedDrawerContentFormTypes } from "@pages/Catering/contracts/Requests/RequestMyContractsList/helper/components/RequestMyContractsListWaited/helper/components/_shared/components/RequestMyContractsListWaitedModalContent/@types/@requestMyContractsListWaitedModalContent";

function RequestMyContractsListWaitedModalContent({
  form,
}: {
  form: FormInstance<RequestMyContractsListWaitedDrawerContentFormTypes>;
}) {
  return (
    <Form form={form}>
      <Row>
        <Col span={24}>
          <CustomSelect
            options={[]}
            label="علت رد درخواست"
            name="reason"
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <SingleVerticalWithCol span={24} value="-" label="توضیحات" />
      </Row>
    </Form>
  );
}

export default RequestMyContractsListWaitedModalContent;
