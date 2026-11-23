import { Col, Form, FormInstance, Row } from "antd";

import { CustomSelect, CustomTextArea } from "@components/CustomInputs";
import { useGetAllRequestContractRejectReasonsQuery } from "@infra/states/redux/Apis/catering/contracts/contractsApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { RequestsContractsListWaitedDrawerContentFormTypes } from "@pages/Catering/contracts/Requests/RequestsContractsList/helper/components/RequestsContractsListWaited/helper/components/_shared/components/RequestsContractsListWaitedModalContent/@types/@requestsContractsListWaitedModalContent";

function RequestsContractsListWaitedModalContent({
  form,
}: {
  form: FormInstance<RequestsContractsListWaitedDrawerContentFormTypes>;
}) {
  const {
    data: getAllRequestContractRejectReasonsData,
    isFetching: isGetAllRequestContractRejectReasonsLoading,
  } = useGetAllRequestContractRejectReasonsQuery();

  return (
    <Form form={form}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <CustomSelect
            form={form}
            options={getAllRequestContractRejectReasonsData ?? []}
            label="علت رد درخواست"
            name="reason"
            rules={[REQUIRED_RULE]}
            isLoading={isGetAllRequestContractRejectReasonsLoading}
          />
        </Col>
        <Col span={24}>
          <CustomTextArea label="توضیحات" name="description" />
        </Col>
      </Row>
    </Form>
  );
}

export default RequestsContractsListWaitedModalContent;
