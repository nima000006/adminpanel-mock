import { useEffect } from "react";

import { Button, Form } from "antd";
import moment from "jalali-moment";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";

import CustomCard from "../../../../../components/CustomCard/CustomCard";
import CustomDatePicker from "../../../../../components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomInput from "../../../../../components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "../../../../../components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "../../../../../components/CustomInputs/CustomTextArea/CustomTextArea";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import { selectDefaultValueGenerator } from "../../../../../infrastructure/helpers/utils";
import { BasicInfoCreateOrEditSubmitType } from "../../../../../infrastructure/models/modules/committee/basicInfo/accusation/accusation";
import {
  COMMITTEE_ACCUSATION_AND_VIOLATIONS_PAGE_ROUTE,
  COMMITTEE_DETAILS_ACCUSATION_AND_VIOLATIONS_PAGE_ROUTE,
} from "../../../../../infrastructure/router/routes/committee";
import {
  useCreateOrEditViolationsMutation,
  useGetAllowedPunishmentTableQuery,
  useGetAllowedSupplementaryPunishmentTableQuery,
  useGetDetailsAccusationAndViolationsMutation,
  useGetListOfRegulationTableQuery,
  useGetListTableTypesViolationsQuery,
} from "../../../../../infrastructure/states/redux/Apis/committee/basicInfo/basicInfoApi";
import { REQUIRED_RULE } from "../../../../../infrastructure/validation/validationSchema";
import { GENERAL_SUBMIT_SUCCESS } from "../../../../../infrastructure/VARS/globalToasts/globalToasts";
import "./_newAccusationAndViolations.scss";

const NewAccusationAndViolations = () => {
  const [searchParams] = useSearchParams();
  const { id, type } = Object.fromEntries([...searchParams]);

  const navigate = useNavigate();
  useTitle({ text: id ? "ویرایش اتهام" : "ایجاد اتهام" });
  const [form] = Form.useForm();

  //? ================================  Api Calls ================================
  const { data: listOfAllowedPunishments, isLoading: isListOfAllowedPunishmentsLoading } =
    useGetAllowedPunishmentTableQuery(0);

  const {
    data: listOfAllowedSupplementaryPunishments,
    isLoading: isListOfAllowedSupplementaryPunishmentsLoading,
  } = useGetAllowedSupplementaryPunishmentTableQuery(0);

  const { data: listOfRegulations, isLoading: isListOfRegulationsLoading } =
    useGetListOfRegulationTableQuery(0);

  const { data: listTableTypesViolations, isLoading: isListTableTypesViolationsLoading } =
    useGetListTableTypesViolationsQuery(0);

  const [getData, { data: accusationData, isLoading: isAccusationDataLoading }] =
    useGetDetailsAccusationAndViolationsMutation();

  const [
    createOrEditViolations,
    { data: createViolationData, isLoading: isCreateViolationLoading },
  ] = useCreateOrEditViolationsMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getData({ _data_: { id: id?.toString() } });
    }
  }, [id]);

  useEffect(() => {
    if (createViolationData?.status === 200 && createViolationData?.data?.id) {
      navigate(
        COMMITTEE_DETAILS_ACCUSATION_AND_VIOLATIONS_PAGE_ROUTE +
          "?id=" +
          createViolationData?.data?.id
      );
      toast.success(GENERAL_SUBMIT_SUCCESS, { toastId: GENERAL_SUBMIT_SUCCESS });
    }
  }, [createViolationData?.status]);

  useEffect(() => {
    if (accusationData?.status === 200 && type === "edit") {
      form.setFieldsValue({
        title: accusationData?.data?.title,
        createDate: accusationData?.data?.createDate,
        desc: accusationData?.data?.desc,
        AssociationRegulations: selectDefaultValueGenerator(
          accusationData?.data?.AssociationRegulations
        ),
        AssociationInfractionType: selectDefaultValueGenerator(
          accusationData?.data?.AssociationInfractionType
        ),
        AssociationViolationPenalty: selectDefaultValueGenerator(
          accusationData?.data?.AssociationViolationPenalty
        ),
        AssociationAdditionalViolationPunishment: selectDefaultValueGenerator(
          accusationData?.data?.AssociationAdditionalViolationPunishment
        ),
      });
    }
  }, [accusationData?.status]);

  //* ================================ Util Functions ================================
  const registerHandler = (values: BasicInfoCreateOrEditSubmitType) => {
    createOrEditViolations({
      form: "RecordAndEditViolations",
      _data_: {
        title: values?.title,
        createDate: values?.createDate,
        desc: values?.desc,
        AssociationAdditionalViolationPunishment:
          values?.AssociationAdditionalViolationPunishment?.map((value) => value?.item),
        RegulId: values?.AssociationRegulations
          ? +values?.AssociationRegulations?.key
          : null,
        type: values?.AssociationInfractionType
          ? +values?.AssociationInfractionType?.key
          : null,
        id: id ? +id : null,
        AssociationViolationPenalty: values?.AssociationViolationPenalty?.map(
          (value) => value?.item
        ),
      },
    });
  };

  const cancelHandler = () => {
    if (id) {
      return navigate(
        `${COMMITTEE_DETAILS_ACCUSATION_AND_VIOLATIONS_PAGE_ROUTE}?id=${id}&type=${type}`
      );
    } else {
      return navigate(COMMITTEE_ACCUSATION_AND_VIOLATIONS_PAGE_ROUTE);
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="committee-new-accusation-violations-page-container">
      <Form onFinish={registerHandler} form={form}>
        <CustomCard
          className="new-accusation-violations-content"
          loading={isAccusationDataLoading || isCreateViolationLoading}
        >
          <div className="grid-cols-3">
            <CustomInput
              type="text"
              label="عنوان"
              name="title"
              placeholder="عنوان"
              rules={[REQUIRED_RULE]}
            />
            <CustomSelect
              name="AssociationRegulations"
              label="آیین نامه"
              isLoading={isListOfRegulationsLoading}
              form={form}
              options={listOfRegulations?.data}
              placeholder="انتخاب کنید"
            />
            <CustomSelect
              name="AssociationInfractionType"
              label="دسته بندی"
              isLoading={isListTableTypesViolationsLoading}
              form={form}
              options={listTableTypesViolations?.data}
              // defaultValue={
              //   accusationData?.data?.AssociationInfractionType
              // accusationData?.data?.AssociationInfractionType
              //   ? {
              //       label: accusationData?.data?.AssociationInfractionType?.title,
              //       value:
              //         accusationData?.data?.AssociationInfractionType?.id.toString(),
              //       key: accusationData?.data?.AssociationInfractionType?.id,
              //       code: accusationData?.data?.AssociationInfractionType?.id,
              //       children: accusationData?.data?.AssociationInfractionType?.title,
              //       item: accusationData?.data?.AssociationInfractionType,
              //     }
              //   : undefined
              // }
              placeholder="انتخاب کنید"
            />
            <CustomSelect
              name="AssociationViolationPenalty"
              label="تنبیهات مجاز"
              isLoading={isListOfAllowedPunishmentsLoading}
              mode="multiple"
              form={form}
              options={
                listOfAllowedPunishments?.data
                // listOfAllowedPunishments
                //   ? listOfAllowedPunishments?.data?.map((item) => ({
                //       label: item?.title,
                //       value: item?.id?.toString(),
                //       key: item?.id,
                //       item,
                //     }))
                //   : []
              }
              // defaultValue={
              //   accusationData?.data?.AssociationViolationPenalty
              // }
              placeholder="انتخاب کنید"
            />
            <CustomSelect
              name="AssociationAdditionalViolationPunishment"
              label="تنبیهات تکمیلی مجاز"
              mode="multiple"
              form={form}
              isLoading={isListOfAllowedSupplementaryPunishmentsLoading}
              options={listOfAllowedSupplementaryPunishments?.data}
              // defaultValue={
              //   accusationData?.data?.AssociationAdditionalViolationPunishment
              // }
              placeholder="انتخاب کنید"
            />
            <CustomDatePicker
              label="تاریخ ایجاد"
              placeholder="انتخاب کنید"
              name="createDate"
              form={form}
              customContainerClass="date-pick-extra-margin"
              defaultValue={
                accusationData?.data?.createDate
                  ? moment(accusationData?.data?.createDate).locale("fa")
                  : undefined
              }
              // value={moment(accusationData?.data?.createDate).locale("fa")}
              // rules={[REQUIRED_RULE]}
              // className="date-picker"
              // value={accusationData?.data?.createDate}
            />
          </div>
          <CustomTextArea label="توضیحات" name="desc" placeholder="توضیحات" />
        </CustomCard>
        <div className="btn-wrapper">
          <Button
            type="primary"
            className="btn"
            htmlType="submit"
            loading={isCreateViolationLoading}
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
export default NewAccusationAndViolations;
