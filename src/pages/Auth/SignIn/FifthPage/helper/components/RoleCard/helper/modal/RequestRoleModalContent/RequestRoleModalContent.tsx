import { useEffect, useState } from "react";

import { Form } from "antd";

import { CustomSelect } from "@components/CustomInputs";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import { emptyString } from "@infra/config/global.vars";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { useLazyGetRolesStaffListQuery } from "@infra/states/redux/Apis/auth/signInApis";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { ROLE_STATUS } from "@pages/Auth/SignIn/FifthPage/SignInFifthPage";

import { RequestRoleModalContentProps } from "./@types/@requestRoleModalContentProps";
import InfoBox from "../../components/InfoBox/InfoBox";

import "./_requestRoleModalContent.scss";

const RequestRoleModalContent = ({
  title,
  personalNumber,
  branchName,
  form,
  id,
  segmentStatus,
}: RequestRoleModalContentProps) => {
  const [staffOption, setStaffOption] = useState<{ title: string; id: number }[]>([]);

  //? ================================  Api Calls ================================
  const [getRolesStaffList, { isFetching: isGetRolesStaffListLoading }] =
    useLazyGetRolesStaffListQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (segmentStatus === ROLE_STATUS.noRole) return;
    getRolesStaffList({ id: id }).then((value) => {
      setStaffOption(
        value?.data?.map((item) => ({
          title: `شماره پرسنلی ${item.employeeCode}`,
          id: item.id,
        })) || []
      );
    });
  }, []);

  return (
    <Form form={form} className="request-role-modal">
      <CustomAlert
        showIcon
        title="راهنما"
        description="در صورتی که میخواهید سطح دسترسی بیشتر و یا کمتری داشته باشید می‌توانید درخواست خود را مطرح نمایید. کارشناسان ما در اسرع وقت به درخواست شما رسیدگی خواهند نمود."
        type="info"
        className="custom-alert"
      />
      <strong className="position">{dataPlaceHolder({ data: title })}</strong>
      <div className="flex justify-around">
        <InfoBox title={"شعبه / واحد"} value={branchName} />
        <InfoBox title={"دانشکده / دپارتمان"} value={emptyString} />
        <InfoBox title={"شماره پرسنلی"} value={personalNumber} />
      </div>
      {segmentStatus !== ROLE_STATUS.noRole && (
        <CustomSelect
          options={staffOption}
          label="کارمند"
          name="staff"
          placeholder="انتخاب کنید"
          rules={[REQUIRED_RULE]}
          form={form}
          isLoading={isGetRolesStaffListLoading}
        />
      )}
      <CustomTextArea
        name="description"
        placeholder="توضیحات را اینجا وارد نمایید."
        maxLength={1024}
        label="توضیحات"
        showCount
        rules={[REQUIRED_RULE]}
      />
    </Form>
  );
};
export default RequestRoleModalContent;
