import { Form } from "antd";
import { useNavigate } from "react-router";

import { CustomButton, CustomTextArea } from "@components/CustomInputs";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import { makeSearchParams } from "@infra/helpers/utils";
import { FINANCE_ACCOUNTING_OPERATION_PAGE_ROUTE } from "@infra/router/routes/finance";
import { useCreateSettlementMutation } from "@infra/states/redux/Apis/finance/financeApi";
import { MAX_LENGTH_RULE, REQUIRED_RULE } from "@infra/validation/validationSchema";
import { CreateSettlementRequest } from "@pages/Finance/Accountants/TurnOver/@type/@turnOver";

import { SettlementDocumentFilters } from "../AccountingOperationSettlementDocumentSelectBeneficiary/@types/@accountingOperationSettlementDocumentSelectBeneficiary";

const AccountingOperationSettlementDocumentDescription = ({
  filters,
  onNext,
  onBack,
}: {
  filters?: SettlementDocumentFilters;
  onNext?: () => void;
  onBack?: () => void;
}) => {
  const [form] = Form.useForm<{ description: string }>();
  const navigate = useNavigate();

  //? ================================  Api Calls ================================
  const [
    sendAccountingOperationPayable,
    { isLoading: sendAccountingOperationPayableLoading },
  ] = useCreateSettlementMutation();

  //* ================================ Util Functions ================================
  const handleFinish = async () => {
    const values = await form.validateFields();

    if (!filters) return;

    const body: CreateSettlementRequest = {
      description: values.description,
      toDate: filters.toDate + "Z", // API need date with Z at the end to consider it as UTC time
      samimService: filters.service,
      ...(!filters.allSelected
        ? {}
        : {
            businessIds: filters.businessIds ?? [],
            provinceIds: filters.provinceIds,
            cityIds: filters.cityIds,
          }),
      branchIds: filters.allSelected ? undefined : filters.branchIds,
    };

    await sendAccountingOperationPayable(body)
      .unwrap()
      .then(() =>
        navigate({
          search: makeSearchParams({
            tab: "2", // tab of payment queue
          }),
          pathname: FINANCE_ACCOUNTING_OPERATION_PAGE_ROUTE,
        })
      );
    if (onNext) onNext();
  };

  return (
    <Form
      className="flex h-full flex-col justify-between"
      form={form}
      onFinish={handleFinish}
    >
      <div>
        <CustomAlert
          showIcon
          type="info"
          title="راهنما"
          description="در این مرحله، برای تسویه با ذینفعان انتخاب‌شده در مرحله قبل، یک شرح سند مناسب وارد کنید."
        />
        <CustomTextArea
          className="mt-10!"
          label="شرح سند تسویه"
          name="description"
          rules={[REQUIRED_RULE, MAX_LENGTH_RULE(1024)]}
          placeholder="شرح سند تسویه را وارد کنید"
        />
      </div>
      <div className="flex justify-end gap-3">
        <CustomButton onClick={onBack}>بازگشت</CustomButton>
        <CustomButton
          type="primary"
          htmlType="submit"
          loading={sendAccountingOperationPayableLoading}
        >
          تایید و انتقال به صف پرداخت
        </CustomButton>
      </div>
    </Form>
  );
};

export default AccountingOperationSettlementDocumentDescription;
