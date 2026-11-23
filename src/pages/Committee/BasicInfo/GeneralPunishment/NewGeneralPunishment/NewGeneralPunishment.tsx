import { useEffect } from "react";

import { Button, Form } from "antd";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import CustomCard from "../../../../../components/CustomCard/CustomCard";
import CustomCheckboxGroup from "../../../../../components/CustomInputs/CustomCheckboxGroup/CustomCheckboxGroup";
import CustomDatePicker from "../../../../../components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomInput from "../../../../../components/CustomInputs/CustomInput/CustomInput";
import CustomTextArea from "../../../../../components/CustomInputs/CustomTextArea/CustomTextArea";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import { CheckBoxFormGenerator } from "../../../../../infrastructure/helpers/utils";
import { BasicInfoNewGeneralPunishmentSubmitType } from "../../../../../infrastructure/models/modules/committee/basicInfo/generalPunishment/generalPunishment";
import {
  COMMITTEE_GENERAL_PUNISHMENT_DETAILS_PAGE_ROUTE,
  COMMITTEE_GENERAL_PUNISHMENT_PAGE_ROUTE,
} from "../../../../../infrastructure/router/routes/committee";
import {
  useCreateOrEditGeneralPunishmentMutation,
  useLazyGetGeneralPunishmentDetailQuery,
} from "../../../../../infrastructure/states/redux/Apis/committee/basicInfo/basicInfoApi";
import { GENERAL_SUBMIT_SUCCESS } from "../../../../../infrastructure/VARS/globalToasts/globalToasts";
import "./_newGeneralPunishment.scss";

const NewGeneralPunishment = () => {
  const title = new URLSearchParams(location.search).get("title");
  const id = new URLSearchParams(location.search).get("id");
  const [form] = Form.useForm();
  const navigate = useNavigate();
  useTitle({ text: `${title}` });

  //? ================================  Api Calls ================================
  const [getGeneralPunishmentDetail, { data: generalPunishmentDetailData, isLoading }] =
    useLazyGetGeneralPunishmentDetailQuery();

  const [createOrEdit, { data: createData, isLoading: isCreateDataLoading }] =
    useCreateOrEditGeneralPunishmentMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getGeneralPunishmentDetail(id);
    }
  }, [id]);

  // set the form with data if id exists
  useEffect(() => {
    if (generalPunishmentDetailData?.status === 200) {
      form.setFieldsValue({
        title: generalPunishmentDetailData?.data[0]?.title,
        description: generalPunishmentDetailData?.data[0]?.description,
        createDate: generalPunishmentDetailData?.data[0]?.createDate,
        allowedCommittee: [
          CheckBoxFormGenerator(
            generalPunishmentDetailData?.data[0]?.selectableAppeal,
            "selectableAppeal"
          ),
          CheckBoxFormGenerator(
            generalPunishmentDetailData?.data[0]?.selectablePrimitive,
            "selectablePrimitive"
          ),
          CheckBoxFormGenerator(
            generalPunishmentDetailData?.data[0]?.selectableCentral,
            "selectableCentral"
          ),
        ],
      });
    }
  }, [generalPunishmentDetailData?.status]);

  // redirect user if create process was successful
  useEffect(() => {
    if (createData?.status === 200) {
      toast.success(GENERAL_SUBMIT_SUCCESS, { toastId: GENERAL_SUBMIT_SUCCESS });
      navigate(
        COMMITTEE_GENERAL_PUNISHMENT_DETAILS_PAGE_ROUTE +
          "?id=" +
          createData?.data?.id +
          "&title=" +
          title
      );
    }
  }, [createData?.status]);

  //* ================================ Util Functions ================================
  const registerHandler = (values: BasicInfoNewGeneralPunishmentSubmitType) => {
    createOrEdit({
      form: "ListDefinitionPunishments",
      _data_: {
        title: values?.title,
        description: values?.description,
        id: id ? +id : null,
        createDate: values?.createDate,
        selectableAppeal: values?.allowedCommittee?.includes("selectableAppeal"),
        selectablePrimitive: values?.allowedCommittee?.includes("selectablePrimitive"),
        selectableCentral: values?.allowedCommittee?.includes("selectableCentral"),
      },
    });
  };

  const cancelHandler = () => {
    if (id) {
      return navigate(
        COMMITTEE_GENERAL_PUNISHMENT_DETAILS_PAGE_ROUTE + "?id=" + id + "&title=" + title
      );
    } else {
      return navigate(COMMITTEE_GENERAL_PUNISHMENT_PAGE_ROUTE);
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="committee-new-general-punishment-page-container">
      <Form onFinish={registerHandler} form={form}>
        <CustomCard
          className="new-general-punishment-content"
          loading={isLoading || isCreateDataLoading}
        >
          <div className="grid-cols-3">
            <CustomInput type="text" label="عنوان" name="title" placeholder="عنوان" />
            <CustomCheckboxGroup
              checkboxClassName="check-box"
              containerClassName="check-box-container "
              name="allowedCommittee"
              label="کمیته های مجاز"
              options={[
                { label: "کمیته بدوی", value: "selectablePrimitive" },
                { label: "کمیته تجدید نظر", value: "selectableAppeal" },
                { label: "کمیته مرکزی", value: "selectableCentral" },
              ]}
              hasVerticalLabel={true}
            />
            <CustomDatePicker
              label="تاریخ ایجاد"
              // className="date-picker"
              placeholder="انتخاب کنید"
              name="createDate"
              // rules={[REQUIRED_RULE]}
              form={form}
              defaultValue={generalPunishmentDetailData?.data[0]?.createDate}
              key={generalPunishmentDetailData?.data[0]?.createDate}
            />
          </div>
          <CustomTextArea
            label="توضیحات"
            name="description"
            placeholder="توضیحات"
            className="text-area-container"
          />
        </CustomCard>
        <div className="btn-wrapper">
          <Button
            type="primary"
            className="btn"
            htmlType="submit"
            loading={isCreateDataLoading}
          >
            تایید
          </Button>
          <Button className="btn" onClick={cancelHandler}>
            لغو
          </Button>
        </div>
      </Form>
    </div>
  );
};
export default NewGeneralPunishment;
