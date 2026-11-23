import { Form, FormInstance } from "antd";

import { CustomSelect, CustomTextArea } from "@components/CustomInputs";
import { useLazyReasonsRejectAndReturnRequestsQuery } from "@infra/states/redux/Apis/dormitory/basicInfo/basicInfoApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { AllResidenceModalContentFormType } from "@pages/Dormitory/Residence/AllResidence/AllResidenceDetail/@types/@allResidenceDetail";

const AllResidenceModalContent = ({
  form,
  type,
}: {
  form: FormInstance<AllResidenceModalContentFormType>;
  type?: string;
}) => {
  const isReturn = type === "return";

  //? ================================  Api Calls ================================
  const [
    reasonsRejectAndReturnRequests,
    { data: reasonsData, isFetching: isReasonsRejectAndReturnRequestsLoading },
  ] = useLazyReasonsRejectAndReturnRequestsQuery();

  //* ================================ Util Functions ================================
  const reasonsHandler = () => {
    reasonsRejectAndReturnRequests({
      kind: isReturn ? "RETURN" : "REJECT",
      module: "ACCOMMODATION",
      pageNumber: 0,
      pageSize: 100,
    });
  };

  const reasonOptions =
    reasonsData?.content?.map((item) => ({
      id: item.uuid,
      title: item.title,
    })) ?? [];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={form}>
      <CustomSelect
        name="refuseReason"
        label={isReturn ? "دلیل عودت" : "دلیل رد"}
        options={reasonOptions}
        loading={isReasonsRejectAndReturnRequestsLoading}
        rules={[REQUIRED_RULE]}
        form={form}
        onClick={reasonsHandler}
      />
      <CustomTextArea
        name="description"
        placeholder={
          isReturn ? "دلیل عودت را انتخاب نمایید." : "دلیل رد را انتخاب نمایید."
        }
        label="توضیحات"
        rules={[REQUIRED_RULE]}
      />
    </Form>
  );
};

export default AllResidenceModalContent;
