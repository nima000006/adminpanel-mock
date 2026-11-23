import { useEffect } from "react";

import { Form } from "antd";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import SubmitButton from "@components/CustomInputs/SubmitButton/SubmitButton";
import { makeSearchParams } from "@infra/helpers/utils";
import { BUSINESS_USERS_LIST_PAGE_ROUTE } from "@infra/router/routes/business";
import { useLazyGetAllBranchesQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import { CUSTOM_REQUIRED_RULE } from "@infra/validation/validationSchema";

import { UNIVERSITY } from "../../pageModes/pageModes";
import { UniversitySearchType } from "../../SearchMode/@types/@searchMode";

const ID_OR_TITLE_IS_WRONG = "شناسه یا نام کاربری دانشگاه مورد نظر یافت نشد";

const UniversityInfo = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [getAllUniversity, { data: universityData, isLoading: isUniversityDataLoading }] =
    useLazyGetAllBranchesQuery();

  useEffect(() => {
    getAllUniversity();
  }, []);

  //! on submit
  //
  const advanceFilterHandler = (values: UniversitySearchType) => {
    if (values?.university?.value && values?.university?.label) {
      navigate({
        pathname: BUSINESS_USERS_LIST_PAGE_ROUTE,
        search: makeSearchParams({
          id: values?.university?.value,
          // name: values?.university?.label,
          key: UNIVERSITY,
        }),
      });
    } else {
      return toast.error(ID_OR_TITLE_IS_WRONG, { toastId: ID_OR_TITLE_IS_WRONG });
    }
  };

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
        />
      </div>

      <SubmitButton
        type="primary"
        loading={isUniversityDataLoading}
        className="advance-filter-btn"
        label=" نمایش نتایج"
        form={form}
      />
    </Form>
  );
};

export default UniversityInfo;
