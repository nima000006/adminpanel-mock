import { useEffect } from "react";

import { Button, Form } from "antd";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import CustomCard from "../../../../../components/CustomCard/CustomCard";
import CustomDatePicker from "../../../../../components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomInput from "../../../../../components/CustomInputs/CustomInput/CustomInput";
import CustomTextArea from "../../../../../components/CustomInputs/CustomTextArea/CustomTextArea";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import { BasicInfoNewAggravationCauseSubmitType } from "../../../../../infrastructure/models/modules/committee/basicInfo/aggravationCause/aggravationCause";
import {
  COMMITTEE_AGGRAVATION_CAUSE_LIST_PAGE_ROUTE,
  COMMITTEE_AGGRAVATION_CAUSE_TABS_PAGE_ROUTE,
} from "../../../../../infrastructure/router/routes/committee";
import {
  useCreateOrEditAggravationCauseMutation,
  useLazyGetAggravationCauseDetailQuery,
} from "../../../../../infrastructure/states/redux/Apis/committee/basicInfo/basicInfoApi";
import { GENERAL_SUBMIT_SUCCESS } from "../../../../../infrastructure/VARS/globalToasts/globalToasts";
import "./_newAggravationCause.scss";

const NewAggravationCause = () => {
  const title = new URLSearchParams(location.search).get("title");
  const id = new URLSearchParams(location.search).get("id");
  const navigate = useNavigate();
  const [form] = Form.useForm();
  useTitle({ text: `${title}` });

  //? ================================  Api Calls ================================
  const [getAggravationCauseDetail, { data: aggravationCauseDetailData, isLoading }] =
    useLazyGetAggravationCauseDetailQuery();

  const [createOrEdit, { data: createData, isLoading: isCreateDataLoading }] =
    useCreateOrEditAggravationCauseMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getAggravationCauseDetail(id);
    }
  }, [id]);

  // set form fields with data if id exists
  useEffect(() => {
    if (aggravationCauseDetailData?.status === 200) {
      form.setFieldsValue({
        title: aggravationCauseDetailData?.data?.[0]?.title,
        createDate: aggravationCauseDetailData?.data?.[0]?.createDate,
        desc: aggravationCauseDetailData?.data?.[0]?.desc,
      });
    }
  }, [aggravationCauseDetailData?.status]);

  // redirect user if create process was successful
  useEffect(() => {
    if (createData?.status === 200) {
      toast.success(GENERAL_SUBMIT_SUCCESS, { toastId: GENERAL_SUBMIT_SUCCESS });
      navigate(
        COMMITTEE_AGGRAVATION_CAUSE_TABS_PAGE_ROUTE +
          "?id=" +
          createData?.data?.id +
          "&title=" +
          title
      );
    }
  }, [createData?.status]);

  //* ================================ Util Functions ================================
  const registerHandler = (values: BasicInfoNewAggravationCauseSubmitType) => {
    createOrEdit({
      form: "AggravatingFactors",
      _data_: {
        title: values?.title,
        createDate: values?.createDate,
        desc: values?.desc,
        id: id ? +id : null,
      },
    });
  };
  const cancelHandler = () => {
    if (id) {
      return navigate(
        COMMITTEE_AGGRAVATION_CAUSE_TABS_PAGE_ROUTE + "?id=" + id + "&title=" + title
      );
    } else {
      return navigate(COMMITTEE_AGGRAVATION_CAUSE_LIST_PAGE_ROUTE);
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="committee-new-aggravation-cause-container">
      <Form onFinish={registerHandler} form={form}>
        <CustomCard className="new-aggravation-cause-content" loading={isLoading}>
          <div className="inputs-wrapper">
            <CustomInput type="text" label="عنوان" name="title" placeholder="عنوان" />
            <CustomDatePicker
              label="تاریخ ایجاد"
              // className="date-picker"
              placeholder="انتخاب کنید"
              name="createDate"
              // rules={[REQUIRED_RULE]}
              form={form}
              defaultValue={aggravationCauseDetailData?.data?.[0]?.createDate}
              key={aggravationCauseDetailData?.data?.[0]?.createDate}
            />
          </div>
          <CustomTextArea label="توضیحات" name="desc" placeholder="توضیحات" />
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
export default NewAggravationCause;
