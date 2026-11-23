import { useCallback, useEffect } from "react";

import { Form } from "antd";

import { CustomButton } from "@components/CustomInputs";
import { CustomServerSearchSelectFetchParams } from "@components/CustomInputs/CustomServerSearchSelect/@types/@customServerSearchSelect";
import CustomServerSearchSelect from "@components/CustomInputs/CustomServerSearchSelect/CustomServerSearchSelect";
import { selectDefaultValueGenerator } from "@infra/helpers/utils";
import { useGetCateringSelfsListMutation } from "@infra/states/redux/Apis/catering/selfs/selfsApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

const CustomServerSearchSelectUsageExamples = () => {
  const [form] = Form.useForm();

  const [getCateringSelfsList] = useGetCateringSelfsListMutation();

  const fetchRestaurantOptions = useCallback(
    async ({ search, pageNo, pageSize }: CustomServerSearchSelectFetchParams) => {
      const response = await getCateringSelfsList({
        params: {
          pageSize,
          pageNumber: pageNo,
          sortBy: "createdDate",
          sortDirection: "ASC",
        },
        body: {
          ...(search ? { title: search } : {}),
        },
      }).unwrap();

      return {
        options: (response.content ?? []).map((item) => ({
          id: item.id,
          title: item.title,
        })),
        total: response.totalElements ?? 0,
        hasMore: !response.last,
      };
    },
    [getCateringSelfsList]
  );

  useEffect(() => {
    form.setFieldsValue({
      restaurant: selectDefaultValueGenerator([
        { id: 31, title: "2 تايتل خيلي جديد" },
        { id: 29, title: "تايتل خيلي جديد" },
      ]),
    });
  }, []);

  return (
    <Form form={form} className="p-4">
      <CustomServerSearchSelect
        label="رستوران"
        name="restaurant"
        form={form}
        placeholder="جستجوی رستوران"
        fetchOptions={fetchRestaurantOptions}
        pageSize={10}
        rules={[REQUIRED_RULE]}
        mode="multiple"
      />
      <CustomButton htmlType="submit">click</CustomButton>
    </Form>
  );
};

export default CustomServerSearchSelectUsageExamples;
