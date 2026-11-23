import { useEffect } from "react";

import { Form, Row } from "antd";

import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetInfoServiceQuery } from "@infra/states/redux/Apis/contracts/contractsTemplateList/contractsTemplateList";
import { serviceOptions } from "@pages/Finance/Accountants/_shared/utils";

import { AddServiceModalContentProps } from "./@types/@addServiceModalContentTypes";

const AddServiceModalContent = ({ form, data }: AddServiceModalContentProps) => {
  const { params } = useQueryParams();

  //? ================================ Api ================================
  const [getInfoService, { data: infoServiceData, isLoading: infoServiceLoading }] =
    useLazyGetInfoServiceQuery();

  // //? ================================ Effects ================================
  useEffect(() => {
    getInfoService(+params?.id);
  }, []);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={form}>
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          label="اکوسیستم"
          value={data?.ecosystem?.title}
        />
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          label="سرویس قالب قرارداد"
          value={
            serviceOptions.find((service) => service?.value === data?.samimService?.name)
              ?.title
          }
        />
      </Row>
      <Row gutter={[16, 16]}>
        <CustomSelect
          label="خدمات"
          name="services"
          isLoading={infoServiceLoading}
          options={infoServiceData ?? []}
          form={form}
        />
      </Row>
    </Form>
  );
};
export default AddServiceModalContent;
