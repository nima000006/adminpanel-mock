import { useEffect } from "react";

import { Button, Form } from "antd";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";

import CustomDatePicker from "../../../../../components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomInput from "../../../../../components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "../../../../../components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "../../../../../components/CustomInputs/CustomTextArea/CustomTextArea";
import Div from "../../../../../components/Renderers/Div/Div";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import {
  makeSearchParams,
  selectDefaultValueGenerator,
} from "../../../../../infrastructure/helpers/utils";
import { BasicInfoNewAccusationDetailsSubmitType } from "../../../../../infrastructure/models/modules/committee/basicInfo/accusationDetail/accusationDetail";
import {
  COMMITTEE_ACCUSATION_AND_VIOLATIONS_DETAILS_INFO_PAGE_ROUTE,
  COMMITTEE_ACCUSATION_AND_VIOLATIONS_DETAILS_PAGE_ROUTE,
} from "../../../../../infrastructure/router/routes/committee";
import {
  useCreateOrEditRecordAndEditDetailsViolationsMutation,
  useGetAccusationAndViolationDetailMutation,
  useGetAllAccusationListQuery,
} from "../../../../../infrastructure/states/redux/Apis/committee/basicInfo/basicInfoApi";
import { GENERAL_SUBMIT_SUCCESS } from "../../../../../infrastructure/VARS/globalToasts/globalToasts";
import "./_newAccusationAndViolationsDetails.scss";

const NewAccusationAndViolationsDetails = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { id, type } = Object.fromEntries([...searchParams]);

  useTitle({ text: id ? "ویرایش اطلاعات جزئیات اتهام" : "ایجاد اطلاعات جزئیات اتهام" });

  //? ================================  Api Calls ================================
  const [getData, { data: accusationData, isLoading: isAccusationDataLoading }] =
    useGetAccusationAndViolationDetailMutation();

  //  create or edit request
  const [createOrEdit, { data: createData, isLoading: isCreateDataLoading }] =
    useCreateOrEditRecordAndEditDetailsViolationsMutation();

  const { data: getAllAccusationList, isLoading: isGetAllAccusationListLoading } =
    useGetAllAccusationListQuery(0);

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getData({ _data_: { id } });
    }
  }, [id]);

  // for setting data in form as soon as data is fetched
  useEffect(() => {
    if (accusationData?.status === 200 && type === "edit") {
      form.setFieldsValue({
        title: accusationData?.data?.title,
        createDate: accusationData?.data?.createDate,
        desc: accusationData?.data?.desc,
        AssociationViiolation: selectDefaultValueGenerator(
          accusationData?.data?.AssociationViiolation
        ),
      });
    }
  }, [accusationData?.status]);

  // redirect if create request is successful
  useEffect(() => {
    if (createData?.status === 200 && createData?.data?.id) {
      navigate({
        pathname: COMMITTEE_ACCUSATION_AND_VIOLATIONS_DETAILS_INFO_PAGE_ROUTE,
        search: makeSearchParams({
          id: createData?.data?.id,
        }),
      });
      toast.success(GENERAL_SUBMIT_SUCCESS, { toastId: GENERAL_SUBMIT_SUCCESS });
    }
  }, [createData?.status]);

  //* ================================ Util Functions ================================
  const registerHandler = (values: BasicInfoNewAccusationDetailsSubmitType) => {
    createOrEdit({
      form: "RecordAndEditDetailsViolations",
      _data_: {
        createDate: values?.createDate,
        desc: values?.desc,
        title: values?.title,
        id: id ? +id : null,
        AssociationViiolation: values?.AssociationViiolation,
        violationId: values?.AssociationViiolation?.code,
      },
    });
  };

  const cancelHandler = () => {
    if (id) {
      return navigate({
        pathname: COMMITTEE_ACCUSATION_AND_VIOLATIONS_DETAILS_INFO_PAGE_ROUTE,
        search: makeSearchParams({
          id,
          type,
        }),
      });
    } else {
      return navigate(COMMITTEE_ACCUSATION_AND_VIOLATIONS_DETAILS_PAGE_ROUTE);
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div
      className="committee-new-accusation-violations-details-page-container"
      loading={isAccusationDataLoading || isCreateDataLoading}
    >
      <Form onFinish={registerHandler} form={form}>
        <div className="new-accusation-violations-details-content">
          <div className="grid-cols-3">
            <CustomInput type="text" label="عنوان" name="title" placeholder="عنوان" />
            <CustomSelect
              name="AssociationViiolation"
              label="تخلف / اتهام مربوطه"
              options={getAllAccusationList?.data}
              form={form}
              placeholder="انتخاب کنید"
              // defaultValue={accusationData?.data?.AssociationViiolation}
              isLoading={isGetAllAccusationListLoading}
            />
            <CustomDatePicker
              label="تاریخ ایجاد"
              // className="date-picker"
              placeholder="انتخاب کنید"
              name="createDate"
              // rules={[REQUIRED_RULE]}
              form={form}
              customContainerClass="date-pick-extra-margin"
              defaultValue={
                accusationData?.data?.createDate
                // ? moment(accusationData?.data?.createDate).locale("fa")
                // : undefined
              }
            />
            <CustomTextArea
              label="توضیحات"
              name="desc"
              placeholder="توضیحات"
              className="text-area"
            />
          </div>
        </div>
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
    </Div>
  );
};
export default NewAccusationAndViolationsDetails;
