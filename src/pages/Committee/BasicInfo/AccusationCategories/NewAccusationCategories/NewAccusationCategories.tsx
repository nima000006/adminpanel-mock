import { useEffect } from "react";

import { Button, Form } from "antd";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";

import CustomCard from "../../../../../components/CustomCard/CustomCard";
import CustomInput from "../../../../../components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "../../../../../components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "../../../../../components/CustomInputs/CustomTextArea/CustomTextArea";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import { selectDefaultValueGenerator } from "../../../../../infrastructure/helpers/utils";
import { BasicInfoNewAccusationCategoriesSubmitType } from "../../../../../infrastructure/models/modules/committee/basicInfo/accusationCategories/accusationCategories";
import {
  COMMITTEE_ACCUSATION_CATEGORIES_PAGE_ROUTE,
  COMMITTEE_DETAILS_ACCUSATION_CATEGORIES_PAGE_ROUTE,
} from "../../../../../infrastructure/router/routes/committee";
import {
  useCreateOrEditAccusationCategoriesMutation,
  useGetAccusationDetailMutation,
  useGetListOfRegulationTableQuery,
} from "../../../../../infrastructure/states/redux/Apis/committee/basicInfo/basicInfoApi";
import { GENERAL_SUBMIT_SUCCESS } from "../../../../../infrastructure/VARS/globalToasts/globalToasts";
import "./_newAccusationCategories.scss";

const NewAccusationCategories = () => {
  const [searchParams] = useSearchParams();
  const { id, type } = Object.fromEntries([...searchParams]);

  const navigate = useNavigate();
  const [form] = Form.useForm();
  useTitle({ text: `${id ? "ویرایش" : "ایجاد"} ${"دسته بندی اتهامات / تخلفات جدید"} ` });

  //? ================================  Api Calls ================================
  const { data: listOfRegulations, isLoading: isListOfRegulationsLoading } =
    useGetListOfRegulationTableQuery(0);

  const [getAccusationDetail, { data: accusationDetailData, isLoading }] =
    useGetAccusationDetailMutation();

  const [createOrEditAccusation, { data: createData, isLoading: isCreateDataLoading }] =
    useCreateOrEditAccusationCategoriesMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getAccusationDetail({
        _data_: {
          id,
        },
      });
    }
  }, [id]);

  useEffect(() => {
    if (accusationDetailData?.status === 200) {
      form.setFieldsValue({
        title: accusationDetailData?.data?.title,
        desc: accusationDetailData?.data?.desc,
        regulations: selectDefaultValueGenerator(accusationDetailData?.data),
      });
    }
  }, [accusationDetailData?.status]);

  useEffect(() => {
    if (createData?.status === 200 && createData?.data?.id) {
      navigate(
        `${COMMITTEE_DETAILS_ACCUSATION_CATEGORIES_PAGE_ROUTE}?id=${createData?.data?.id}&type=${type}`
      );
      toast.success(GENERAL_SUBMIT_SUCCESS, { toastId: GENERAL_SUBMIT_SUCCESS });
    }
  }, [createData?.status]);

  //* ================================ Util Functions ================================
  const registerHandler = (values: BasicInfoNewAccusationCategoriesSubmitType) => {
    createOrEditAccusation({
      form: "ListTypesViolations",
      _data_: {
        title: values?.title,
        createDate: new Date()?.toISOString(),
        desc: values?.desc,
        // sourceId: 1,
        id: id ? +id : null,
        AssociationRegulation: values?.regulations?.item,
      },
    });
  };
  const cancelHandler = () => {
    if (id) {
      return navigate(
        `${COMMITTEE_DETAILS_ACCUSATION_CATEGORIES_PAGE_ROUTE}?id=${id}&type=${type}`
      );
    } else {
      return navigate(COMMITTEE_ACCUSATION_CATEGORIES_PAGE_ROUTE);
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="committee-new-rules-and-laws-page-container">
      <Form onFinish={registerHandler} form={form}>
        <CustomCard
          className="new-rules-and-laws-content"
          loading={isListOfRegulationsLoading || isLoading || isCreateDataLoading}
        >
          <div className="grid-cols-3">
            <CustomInput type="text" label="عنوان" name="title" placeholder="عنوان" />
            <CustomSelect
              name="regulations"
              label="آیین نامه"
              options={listOfRegulations?.data}
              form={form}
              placeholder="انتخاب کنید"
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

export default NewAccusationCategories;
