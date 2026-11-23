import { Form, FormInstance } from "antd";

import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import SubmitButton from "@components/CustomInputs/SubmitButton/SubmitButton";
import { CUSTOM_REQUIRED_RULE } from "@infra/validation/validationSchema";
import { GetAllBranchesResponse } from "@pages/_shared/@types/@generalTypes/@generalTypes";

import { NotificationAdvanceFilterType } from "../../../@types/@notificationSingle";
import "./_universityInfo.scss";

const UniversityInfo = ({
  form,
  advanceFilterHandler,
  universityData,
  isUniversityDataLoading,
  isUsersListLoading,
}: {
  form: FormInstance;
  advanceFilterHandler: (values: NotificationAdvanceFilterType) => void;
  universityData?: GetAllBranchesResponse;
  isUniversityDataLoading: boolean;
  isUsersListLoading: boolean;
}) => {
  return (
    <Form className="filter-form" onFinish={advanceFilterHandler} form={form}>
      <div className="select-container">
        <CustomSelect
          form={form}
          label="دانشگاه"
          name="university"
          rules={[CUSTOM_REQUIRED_RULE("لطفا دانشگاه مورد نظر را انتخاب کنید")]}
          options={universityData ? universityData : []}
          placeholder="انتخاب کنید"
          isLoading={isUniversityDataLoading}
          hasVerticalLabel={false}
        />
      </div>

      <SubmitButton
        type="primary"
        loading={isUsersListLoading}
        className="advance-filter-btn"
        label=" نمایش نتایج"
        form={form}
      />
    </Form>
  );
};

export default UniversityInfo;
