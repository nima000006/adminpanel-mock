import { useEffect } from "react";

import { Button, Form } from "antd";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import { BasicInfoNewSupplementaryPunishmentSubmitType } from "./@types/@newSupplementaryPunishment";
import CustomCard from "../../../../../components/CustomCard/CustomCard";
import CustomDatePicker from "../../../../../components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomInput from "../../../../../components/CustomInputs/CustomInput/CustomInput";
import CustomTextArea from "../../../../../components/CustomInputs/CustomTextArea/CustomTextArea";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import {
  COMMITTEE_SUPPLEMENTARY_PUNISHMENT_LIST_PAGE_ROUTE,
  COMMITTEE_SUPPLEMENTARY_PUNISHMENT_TABS_PAGE_ROUTE,
} from "../../../../../infrastructure/router/routes/committee";
import {
  useCreateOrEditSupplementaryPunishmentMutation,
  useLazyGetReportAdditionalPunishmentDetailQuery,
} from "../../../../../infrastructure/states/redux/Apis/committee/basicInfo/basicInfoApi";
import { GENERAL_SUBMIT_SUCCESS } from "../../../../../infrastructure/VARS/globalToasts/globalToasts";
import "./_newSupplementaryPunishment.scss";

const NewSupplementaryPunishment = () => {
  const title = new URLSearchParams(location.search).get("title");
  const id = new URLSearchParams(location.search).get("id");
  const [form] = Form.useForm();
  const navigate = useNavigate();
  useTitle({ text: `${title}` });

  //? ================================  Api Calls ================================
  const [
    getReportAdditionalPunishmentDetail,
    { data: reportAdditionalPunishmentDetailData, isLoading },
  ] = useLazyGetReportAdditionalPunishmentDetailQuery();

  const [
    createOrEditAdditionalPunishments,
    { data: createData, isLoading: isCreateDataLoading },
  ] = useCreateOrEditSupplementaryPunishmentMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getReportAdditionalPunishmentDetail(id);
    }
  }, [id]);

  // set the form with values
  useEffect(() => {
    if (reportAdditionalPunishmentDetailData?.status === 200) {
      form.setFieldsValue({
        title: reportAdditionalPunishmentDetailData?.data?.[0]?.title,
        createDate: reportAdditionalPunishmentDetailData?.data?.[0]?.createDate,
        desc: reportAdditionalPunishmentDetailData?.data?.[0]?.desc,
      });
    }
  }, [reportAdditionalPunishmentDetailData?.status]);

  useEffect(() => {
    if (createData?.status === 200) {
      toast.success(GENERAL_SUBMIT_SUCCESS, { toastId: GENERAL_SUBMIT_SUCCESS });
      navigate(
        `${COMMITTEE_SUPPLEMENTARY_PUNISHMENT_TABS_PAGE_ROUTE}?id=${createData?.data?.id}&title=${title}`
      );
    }
  }, [createData?.status]);

  //* ================================ Util Functions ================================
  const registerHandler = (values: BasicInfoNewSupplementaryPunishmentSubmitType) => {
    createOrEditAdditionalPunishments({
      form: "AdditionalPunishments",
      _data_: {
        createDate: values?.createDate,
        desc: values?.desc,
        title: values?.title,
        id: id ? +id : null,
      },
    });
  };
  const cancelHandler = () => {
    if (id) {
      return navigate(
        COMMITTEE_SUPPLEMENTARY_PUNISHMENT_TABS_PAGE_ROUTE +
          "?id=" +
          id +
          "&title=" +
          title
      );
    } else {
      return navigate(COMMITTEE_SUPPLEMENTARY_PUNISHMENT_LIST_PAGE_ROUTE);
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="committee-new-supplementary-punishment-page-container">
      <Form onFinish={registerHandler} form={form}>
        <CustomCard
          className="new-supplementary-punishment-content"
          loading={isLoading || isCreateDataLoading}
        >
          <div className="grid-cols-3">
            <CustomInput type="text" label="عنوان" name="title" placeholder="عنوان" />
            <CustomDatePicker
              label="تاریخ جلسه"
              // className="date-picker"
              placeholder="انتخاب کنید"
              name="createDate"
              isLoading={isLoading || isCreateDataLoading}
              form={form}
              // rules={[REQUIRED_RULE]}
              defaultValue={reportAdditionalPunishmentDetailData?.data?.[0]?.createDate}
              key={reportAdditionalPunishmentDetailData?.data?.[0]?.createDate}
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
export default NewSupplementaryPunishment;
