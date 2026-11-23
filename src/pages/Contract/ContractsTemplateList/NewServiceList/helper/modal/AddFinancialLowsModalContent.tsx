import { useState } from "react";

import { Form, FormInstance } from "antd";

import CustomRadioGroup from "@components/CustomInputs/CustomRadioGroup/CustomRadioGroup";

const AddFinancialLowsModalContent = ({ form }: { form: FormInstance<any> }) => {
  const [selected, setSelected] = useState(1);
  const redioData = [
    {
      id: 1,
      title: "ذینفع حقوقی",
      desc: "کاربر حقوقی مشخص از لیست صاحبین کسب و کار ",
    },
    {
      id: 2,
      title: "ذینفع حقیقی",
      desc: "کاربر حقیقی مشخص از لیست همه گروه های کاربری ",
    },
    {
      id: 3,
      title: "قالب ذینفع حقوقی",
      desc: "حساب های کاربری نوع حقوقی از لیست صاحبین کسب و کار",
    },
    {
      id: 4,
      title: "قالب ذینفع حقیقی",
      desc: "حساب های کاربری نوع حقیقی از لیست همه گروه های کاربری",
    },
    {
      id: 5,
      title: "قالب ذینفع گروهی",
      desc: "انتخاب گروهی از لیست همه کاربران",
    },
  ];

  return (
    <div className="body-regular flex flex-col gap-4">
      <p className="text-neutral-12">نوع ذینفع قانون مالی خود را انتخاب کنید.</p>
      <Form form={form}>
        <CustomRadioGroup
          className="w-full"
          name="notificationSendingType"
          hasVerticalLabel={true}
          options={redioData?.map((item) => ({
            label: (
              <div className="border-b-neutral-4 flex w-full flex-col gap-2 border-b p-4!">
                <div className="text-neutral-10">{item?.title}</div>
                <div className="text-neutral-7">{item?.desc}</div>
              </div>
            ),
            value: item?.id,
          }))}
          optionType="default"
          onChange={(e) => setSelected(e.target.value)}
          value={selected}
        />
      </Form>
    </div>
  );
};
export default AddFinancialLowsModalContent;
