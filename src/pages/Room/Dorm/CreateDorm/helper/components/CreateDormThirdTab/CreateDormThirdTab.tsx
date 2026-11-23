import { useEffect, useState } from "react";

import { Form } from "antd";
import { useSearchParams } from "react-router";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { useLazyGetAllBranchesQuery } from "@infra/states/redux/Apis/business/business/businessApi";

import { CreateDormThirdTabProps, SelectType } from "./@types/@createDormThirdTab";
import CustomCard from "../../../../../../../components/CustomCard/CustomCard";
import CustomSelect from "../../../../../../../components/CustomInputs/CustomSelect/CustomSelect";
import { selectDefaultValueGenerator } from "../../../../../../../infrastructure/helpers/utils";
import { useCreateDormThirdTabMutation } from "../../../../../../../infrastructure/states/redux/Apis/roomApi";
import { CUSTOM_REQUIRED_RULE } from "../../../../../../../infrastructure/validation/validationSchema";
import {
  EDIT,
  NEW,
} from "../../../../../../../infrastructure/VARS/globalStrings/globalStrings";

import "./_createDormThirdTab.scss";

const CANNOT_REMOVE_MAIN_BRANCH = "واحد اصلی تخصیص نمیتواند حذف شود";

const CreateDormThirdTab = ({ form, isLoading, setCurrent }: CreateDormThirdTabProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { id, mode } = Object.fromEntries([...searchParams]);
  const [mainBranch, setMainBranch] = useState<SelectType>();

  const [getBranches, { data: branchesData, isLoading: isBranchesDataLoading }] =
    useLazyGetAllBranchesQuery();

  const [createThirdPart, { data: thirdPartData, isLoading: isThirdPartDataLoading }] =
    useCreateDormThirdTabMutation();

  useEffect(() => {
    getBranches();
  }, [id]);

  // for knowing the predefined branches when the component mount
  useEffect(() => {
    if (form?.getFieldValue("universities")?.value) {
      setMainBranch(form?.getFieldValue("universities"));
    }
  }, [form?.getFieldValue("universities")?.value]);

  useEffect(() => {
    if (thirdPartData?.status === 200) {
      setSearchParams({
        id,
        step: "4",
        mode: mode === EDIT ? EDIT : NEW,
      });
      setCurrent((prev) => prev + 1);
      toast.success("مرحله سوم با موفقیت ثبت شد");
      // toast.success(DORM_CREATE_SUCCESS, { toastId: DORM_CREATE_SUCCESS });
      // navigate({ pathname: DORM_DETAIL_PAGE_ROUTE, search: makeSearchParams({ id }) });
    }
  }, [thirdPartData?.status]);

  const onFormSubmit = (values: any) => {
    const formData = new FormData();
    if (!id) return;

    formData.append("DormitoryId", id);
    formData.append("MainBranchId", values?.universities?.code);
    if (Array.isArray(values?.branchIds)) {
      values?.branchIds?.map((item: any) => {
        return formData.append("BranchIds", item?.value);
      });
    } else if (values?.branchIds) {
      formData.append("BranchIds", values?.branchIds?.value);
    }

    createThirdPart(formData as any);
  };

  const onUniversityChange = (_: any, data: SelectType) => {
    setMainBranch(data);
    form?.resetFields(["branchIds"]);
    form?.setFieldsValue({
      branchIds: selectDefaultValueGenerator({ ...data?.item, disabled: true }),
    });
  };

  //onDeselectBranchUnits
  const onDeselectBranchUnits = (branchCode: string) => {
    if (mainBranch?.value === branchCode) {
      toast.warn(CANNOT_REMOVE_MAIN_BRANCH, { toastId: CANNOT_REMOVE_MAIN_BRANCH });
      form?.setFieldsValue({
        branchIds: [mainBranch, ...form.getFieldValue("branchIds")],
      });
    }
  };

  return (
    <Form form={form} className="dorm-third-tab-container" onFinish={onFormSubmit}>
      <CustomCard loading={isLoading} className="custom-selects-container">
        <CustomSelect
          name="universities"
          label="تخصیص واحد دانشگاهی"
          form={form}
          isLoading={isBranchesDataLoading}
          // @ts-expect-error:next-line
          onChange={onUniversityChange}
          options={branchesData ? branchesData : []}
          rules={[CUSTOM_REQUIRED_RULE("لطفا نام واحد دانشگاهی مورد نظر را وارد نمایید")]}
          placeholder="انتخاب کنید"
          maxTagCount={1}
        />
        <CustomSelect
          name="branchIds"
          label="واحد های خدمت دهنده"
          form={form}
          isLoading={isBranchesDataLoading}
          options={branchesData ? branchesData : []}
          rules={[CUSTOM_REQUIRED_RULE("لطفا نام واحد دانشگاهی مورد نظر را وارد نمایید")]}
          placeholder="انتخاب کنید"
          mode="multiple"
          onDeselect={onDeselectBranchUnits as any}
        />
      </CustomCard>
      <div className="btn-container">
        <CustomButton
          className="cancel-btn"
          onClick={() => {
            setSearchParams({
              id,
              step: "2",
              mode: EDIT,
            });
            setCurrent((prev) => prev - 1);
          }}
        >
          قبلی
        </CustomButton>
        {mode === EDIT ? (
          <CustomButton htmlType="submit" type="primary" loading={isThirdPartDataLoading}>
            ویرایش
          </CustomButton>
        ) : (
          <CustomButton htmlType="submit" type="primary" loading={isThirdPartDataLoading}>
            ایجاد
          </CustomButton>
        )}
      </div>
    </Form>
  );
};

export default CreateDormThirdTab;
