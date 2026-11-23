import { useEffect, useState } from "react";

import { Form } from "antd";
import moment from "jalali-moment";
import { CiCalendar } from "react-icons/ci";

import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import { useLazyGetReasonChangeStatusQuery } from "@infra/states/redux/Apis/contracts/contractsTemplateList/contractsTemplateList";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import { DeActiveServiceModalContentProps } from "./@types/@deActiveServiceModalContentTypes";

const DeActiveServiceModalContent = ({ form }: DeActiveServiceModalContentProps) => {
  const [dateLabel, setDateLabel] = useState("");
  //? ================================ Api ================================
  const [getStatus, { data: statusData, isLoading: statusLoading }] =
    useLazyGetReasonChangeStatusQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getStatus();
    const shamsi = moment().locale("fa").format("YYYY/MM/DD");
    setDateLabel(shamsi);
  }, []);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={form} className="flex flex-col gap-4!">
      <CustomInput
        name="changeDate"
        type="text"
        label="تاریخ اعمال وضعیت"
        //rules={[REQUIRED_RULE]}
        prefix={<CiCalendar />}
        placeholder={dateLabel}
      />

      <CustomSelect
        name="reasonChange"
        className="m-0!"
        options={statusData ?? []}
        form={form}
        label="علت تغییر وضعیت"
        isLoading={statusLoading}
        rules={[REQUIRED_RULE]}
        placeholder="انتخاب کنید"
      />

      <CustomTextArea name="desc" label="توضیحات" placeholder="توضیحات را وارد کنید" />
    </Form>
  );
};
export default DeActiveServiceModalContent;
