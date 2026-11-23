import { useEffect } from "react";

import { Button, Form } from "antd";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";

import { CreateOrEditTimingInfoResponse, ValuesType } from "./@types/@newTimingInfo";
import CustomDatePicker from "../../../../../components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomInput from "../../../../../components/CustomInputs/CustomInput/CustomInput";
import CustomTextArea from "../../../../../components/CustomInputs/CustomTextArea/CustomTextArea";
import SubmitButton from "../../../../../components/CustomInputs/SubmitButton/SubmitButton";
import Div from "../../../../../components/Renderers/Div/Div";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import { makeSearchParams } from "../../../../../infrastructure/helpers/utils";
import {
  COMMITTEE_TIMING_INFO_LIST_PAGE_ROUTE,
  COMMITTEE_TIMING_INFO_TABS_PAGE_ROUTE,
} from "../../../../../infrastructure/router/routes/committee";
import {
  useCreateOrEditTimingInfoMutation,
  useLazyGetTimingInfoDetailQuery,
} from "../../../../../infrastructure/states/redux/Apis/committee/basicInfo/basicInfoApi";
import { REQUIRED_RULE } from "../../../../../infrastructure/validation/validationSchema";
import { GENERAL_SUBMIT_SUCCESS } from "../../../../../infrastructure/VARS/globalToasts/globalToasts";
import "./_newTimingInfo.scss";
import { GetTimingInfoDetailResponse } from "../TimingInfoTabs/helper/components/TimingInfo/@types/@timingInfo";

const NewTimingInfo = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const { id } = Object.fromEntries([...searchParams]);

  useTitle({ text: `${id ? "ویرایش" : "ایجاد"} ${"مدت زمانی"}` });

  //? ================================  Api Calls ================================
  const [
    getTimingInfoDetail,
    { data: timingInfoDetailData, isFetching: isTimingInfoDetailLoading },
  ] = useLazyGetTimingInfoDetailQuery();

  const [createOrEditTimingInfo, { data: createData, isLoading: isCreateTimingLoading }] =
    useCreateOrEditTimingInfoMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getTimingInfoDetail(id).unwrap().then(onSuccessTimingInfoDetailData);
    }
  }, [id]);

  useEffect(() => {
    if (timingInfoDetailData?.status === 200) {
      form.setFieldsValue({
        title: timingInfoDetailData?.data[0]?.title,
        time: timingInfoDetailData?.data[0]?.time,
        createDate: timingInfoDetailData?.data[0]?.createDate,
        desc: timingInfoDetailData?.data[0]?.desc,
      });
    }
  }, [timingInfoDetailData?.status]);

  //* ================================ Util Functions ================================
  const onSuccessTimingInfoDetailData = async (value?: GetTimingInfoDetailResponse) => {
    if (value?.status === 200 && createData?.data?.id) {
      toast.success(GENERAL_SUBMIT_SUCCESS, { toastId: GENERAL_SUBMIT_SUCCESS });
      navigate({
        pathname: COMMITTEE_TIMING_INFO_TABS_PAGE_ROUTE,
        search: makeSearchParams({ id }),
      });
    }
  };

  const onSuccessRegister = async (value: CreateOrEditTimingInfoResponse) => {
    if (value?.status === 200) {
      navigate({
        pathname: COMMITTEE_TIMING_INFO_LIST_PAGE_ROUTE,
      });
    }
  };

  const registerHandler = (values: ValuesType) => {
    createOrEditTimingInfo({
      form: "PeriodTime",
      _data_: {
        createDate: values?.createDate,
        desc: values?.desc,
        id: id ? +id : null,
        title: values?.title,
        time: values?.time,
      },
    })
      .unwrap()
      .then(onSuccessRegister);
  };

  const cancelHandler = () => {
    if (id) {
      return navigate({
        pathname: COMMITTEE_TIMING_INFO_TABS_PAGE_ROUTE,
        search: makeSearchParams({ id }),
      });
    } else {
      return navigate({
        pathname: COMMITTEE_TIMING_INFO_LIST_PAGE_ROUTE,
      });
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div
      className="committee-new-timing-info-page-container"
      loading={isTimingInfoDetailLoading || isCreateTimingLoading}
    >
      <Form onFinish={registerHandler} className="timing-info-form" form={form}>
        <div className="new-timing-info-content">
          <div className="inputs-container">
            <CustomInput
              type="text"
              label="عنوان"
              name="title"
              placeholder="عنوان"
              rules={[REQUIRED_RULE]}
            />
            <CustomInput type="text" label="مدت(دقیقه)" name="time" placeholder="عنوان" />
            <CustomDatePicker
              label="تاریخ ایجاد"
              placeholder="انتخاب کنید"
              name="createDate"
              isLoading={isTimingInfoDetailLoading || isCreateTimingLoading}
              form={form}
              defaultValue={timingInfoDetailData?.data[0]?.createDate}
              key={timingInfoDetailData?.data[0]?.createDate}
            />
          </div>
          <CustomTextArea label="توضیحات" name="desc" placeholder="توضیحات" />
        </div>
        <div className="btn-wrapper">
          <SubmitButton label="تایید" form={form} type="primary" />
          <Button className="btn" onClick={cancelHandler}>
            لغو
          </Button>
        </div>
      </Form>
    </Div>
  );
};
export default NewTimingInfo;
