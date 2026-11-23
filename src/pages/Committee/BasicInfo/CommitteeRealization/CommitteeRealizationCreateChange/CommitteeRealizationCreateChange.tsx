import { useEffect } from "react";

import { Button, Form } from "antd";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import { sendCommitteeRealizationResponse } from "./@types/@committeeRealizationCreateChange";
import CustomRadioGroup from "../../../../../components/CustomInputs/CustomRadioGroup/CustomRadioGroup";
import CustomSelect from "../../../../../components/CustomInputs/CustomSelect/CustomSelect";
import CustomDivider from "../../../../../components/Renderers/CustomDivider/CustomDivider";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import { dateGenerator } from "../../../../../infrastructure/helpers/utils";
import { BasicInfoCommitteeRealizationType } from "../../../../../infrastructure/models/modules/committee/basicInfo/committeeRealization/committeeRealization";
import { COMMITTEE_REALIZATION_PAGE_ROUTE } from "../../../../../infrastructure/router/routes/committee";
import {
  useLazyGetPrimaryCommitteePersonnelInfoQuery,
  useSendCommitteeRealizationMutation,
} from "../../../../../infrastructure/states/redux/Apis/committee/committees/committees";
import { CUSTOM_REQUIRED_RULE } from "../../../../../infrastructure/validation/validationSchema";
import { REALIZATION_COMMITTEE_ID } from "../../PrimaryCommittee/committeeDefenitionsId";
import "./_committeeRealizationCreateChange.scss";

const SEND_PERSONAL_INFO_SUCCESS_MSG = "افراد کمیته تفهیم با موفقیت تغییر یافت.";

const CommitteeRealizationCreateChange = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  useTitle({ text: "کمیته تفهیم" });

  //? ================================  Api Calls ================================
  const [
    getPersonalInfo,
    { data: personalInfoData, isLoading: isPersonalInfoDataLoading },
  ] = useLazyGetPrimaryCommitteePersonnelInfoQuery();

  const [sendPersonalInfo, { isLoading: isSendPersonalInfoDataLoading }] =
    useSendCommitteeRealizationMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getPersonalInfo({ maxResults: 100, firstResult: 0 });
  }, []);

  //* ================================ Util Functions ================================
  const sendPersonalInfoOnSuccess = async (value: sendCommitteeRealizationResponse) => {
    if (value?.status === 200) {
      form.setFieldsValue({
        universityBoss: "",
        studentVicePresident: "",
        departmentHead: "",
        system: "",
      });
      toast.success(SEND_PERSONAL_INFO_SUCCESS_MSG, {
        toastId: SEND_PERSONAL_INFO_SUCCESS_MSG,
      });
    }
  };

  const sendDataHandler = (data: BasicInfoCommitteeRealizationType) => {
    sendPersonalInfo({
      form: "ListSelectionMembersUnderstandingCommittee",
      id: "119e59924c174398b043b16087735228",
      _data_: {
        bossCollege: data?.universityBoss?.code,
        votingType: +data?.system,
        studentVicePresidentCollege: data?.studentVicePresident?.code,
        CommitteeId: REALIZATION_COMMITTEE_ID,
        headDepartment: data?.departmentHead?.code,
        createDate: dateGenerator(),
      },
    })
      .unwrap()
      .then(sendPersonalInfoOnSuccess);
  };

  const cancelHandler = () => {
    navigate({
      pathname: COMMITTEE_REALIZATION_PAGE_ROUTE,
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form
      className="committee-realization-create-change-page-container"
      onFinish={sendDataHandler}
      form={form}
    >
      <div className="committee-members-box-wrapper">
        <CustomDivider text="افراد کمیته" />
        <div className="committee-members-box">
          <CustomSelect
            name="universityBoss"
            label="رییس دانشکده"
            options={personalInfoData?.data}
            isLoading={isPersonalInfoDataLoading}
            form={form}
            rules={[CUSTOM_REQUIRED_RULE("فیلد ضروری می باشد.")]}
            placeholder="انتخاب کنید"
          />
          <CustomSelect
            name="studentVicePresident"
            label="معاون دانشجویی دانشکده"
            options={personalInfoData?.data}
            isLoading={isPersonalInfoDataLoading}
            form={form}
            rules={[CUSTOM_REQUIRED_RULE("فیلد ضروری می باشد.")]}
            placeholder="انتخاب کنید"
          />
          <CustomSelect
            name="departmentHead"
            label="مدیر گروه"
            options={personalInfoData?.data}
            isLoading={isPersonalInfoDataLoading}
            form={form}
            rules={[CUSTOM_REQUIRED_RULE("فیلد ضروری می باشد.")]}
            placeholder="انتخاب کنید"
          />
        </div>
      </div>
      <div className="voting-type-box-wrapper">
        <CustomDivider text="نوع رای گیری" />
        <CustomRadioGroup
          name="system"
          label=""
          options={[
            {
              label: "سیستمی",
              value: "2",
            },
            {
              label: "دستی",
              value: "1",
            },
          ]}
          rules={[CUSTOM_REQUIRED_RULE("فیلد ضروری می باشد.")]}
        />
      </div>
      <div className="btn-wrapper">
        <Button
          type="primary"
          className="btn"
          htmlType="submit"
          loading={isSendPersonalInfoDataLoading}
        >
          تایید
        </Button>

        <Button className="btn" onClick={cancelHandler}>
          لغو
        </Button>
      </div>
    </Form>
  );
};
export default CommitteeRealizationCreateChange;
