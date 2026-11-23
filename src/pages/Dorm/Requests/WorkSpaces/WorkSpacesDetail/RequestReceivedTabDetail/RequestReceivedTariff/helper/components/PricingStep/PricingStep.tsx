import { useEffect, useState } from "react";

import { Col, Form, Row } from "antd";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetSchedulingTypeQuery,
  useLazyGetSemesterQuery,
} from "@infra/states/redux/Apis/dorm/base/dormBaseApi";
import {
  useLazyGetPricingStepCountQuery,
  useLazyGetPricingStepQuery,
  useSendCreateTariffMutation,
} from "@infra/states/redux/Apis/dorm/planning/tariff/dormTariffApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import {
  GENERAL_ERROR_MESSAGE,
  SUCCESS_EDIT_MESSAGE,
} from "@infra/VARS/globalToasts/globalToasts";
import { fetchDataIfNeeded } from "@pages/_shared/utils";
import {
  GetPricingStepData,
  GetPricingStepResponse,
  SendCreateTariffResponse,
} from "@pages/Dorm/Planning/Tariff/TariffDetail/helper/components/TariffSteps/PricingStep/@types/@pricingStep";

import { PricingStepProps } from "./@types/@pricingStep";
import WorkSpacesTariffPricingStepTableModel from "../../models/WorkSpacesTariffPricingStepTableModel/WorkSpacesTariffPricingStepTableModel";
import "./_pricingStep.scss";

const PricingStep = ({
  setCurrentStep,
  setEditMode,
  BasicInfoData,
  pricingData,
  form,
  isSemester,
  setIsSemester,
}: PricingStepProps) => {
  const [dataSource, setDataSource] = useState<GetPricingStepData[]>([]);

  const { params: url, setSearchParams } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getPricingStep, { isFetching: getPricingStepLoading }] =
    useLazyGetPricingStepQuery();

  const [
    getPricingStepCount,
    { data: getPricingStepCountData, isFetching: getPricingStepCountLoading },
  ] = useLazyGetPricingStepCountQuery();

  //send data
  const [sendStepData, { isLoading: isSendStepLoading }] = useSendCreateTariffMutation();

  const [
    getSchedulingType,
    {
      data: schedulingTypeData,
      isFetching: isSchedulingTypeLoading,
      isSuccess: isSchedulingTypeSuccess,
    },
  ] = useLazyGetSchedulingTypeQuery();

  const [
    getSemesterTypes,
    { data: semesterData, isFetching: isSemesterLoading, isSuccess: isSemesterSuccess },
  ] = useLazyGetSemesterQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getPricingStep({
      firstResult: url?.page ? Number((+url.page - 1) * +url.pageSize) : 0,
      maxResults: url?.pageSize ? Number(url?.pageSize) : 8,
      priceListId_EQ: +url?.id,
    })
      .unwrap()
      .then(getPricingStepIsSuccess);
    getPricingStepCount({ priceListId_EQ: +url?.id });
  }, [url?.id, url?.pageSize, url?.page]);

  //* ================================ Util Functions ================================
  const getPricingStepIsSuccess = (value: GetPricingStepResponse) => {
    if (value?.status === 200) {
      setDataSource(value?.data);
      value?.data?.forEach((item) => {
        form.setFieldsValue({
          [`price-${item?.id}`]: item?.price,
        });
      });
    }
  };

  // btn handler
  const submitBtnHandler = async () => {
    const value = form.getFieldsValue(true);

    const priceList = [];
    for (const key in value) {
      if (key?.split("-")?.[0] === "price") {
        const id = +key?.split("-")?.[1];

        const matchedItem = dataSource.find((item) => item.id === id);

        if (matchedItem?.roomTypeId) {
          priceList.push({
            price: value[key]?.toString(),
            roomTypeId: matchedItem.roomTypeId,
          });
        }
      }
    }

    await form.validateFields();
    sendStepData({
      form: "CreatePriceList",
      data: {
        id: url?.id,
        title: value?.title,
        branchId: value?.uni?.code,
        dormitoryId: value?.dormitory?.code,
        currencyTypeId: value?.currency?.code,
        tax: value?.tax ? value?.tax : null,
        toll: value?.toll ? value?.toll : null,
        description: value?.description ? value?.description : null,
        appliedStartDate: value?.startDate,
        appliedStartTime: value?.startTime,
        appliedEndDate: value?.endDate,
        appliedEndTime: value?.endTime,
        AssociationRoomTypePrice: priceList,
        descRequest: value?.description,
        schedulingId: value?.timingType?.code,
        SemesterId: value?.semester?.code,
      },
    } as any)
      .unwrap()
      .then(sendStepDataSuccess)
      .catch(sendStepDataCatch);
  };

  //success send request
  const sendStepDataSuccess = async (value: SendCreateTariffResponse) => {
    if (value?.status === 204) {
      setEditMode(false);
      toast.success(SUCCESS_EDIT_MESSAGE, {
        toastId: SUCCESS_EDIT_MESSAGE,
      });
      setCurrentStep(0);
      BasicInfoData(url?.id);
      pricingData(url?.id);
    }
  };

  //catch send request
  const sendStepDataCatch = async (value: SendCreateTariffResponse) => {
    if (value?.status === 500) {
      toast.error(GENERAL_ERROR_MESSAGE);
    }
  };

  const backBtnHandler = () => {
    setCurrentStep(0);
  };

  const getSchedulingTypeHandler = () => {
    if (!isSchedulingTypeSuccess) {
      getSchedulingType({ maxResults: 2000, firstResult: 0, recordStatus_EQ: "1" });
    }
  };

  const scheduleTypeOnChange = (type: unknown) => {
    setIsSemester?.(type === "1");
  };

  const getSemesterHandler = () =>
    fetchDataIfNeeded(!isSemesterSuccess, () =>
      getSemesterTypes({
        maxResults: 2000,
        firstResult: 0,
        recordStatus_EQ: "1",
      })
    );

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={form} className="work-spaces-pricing-step-container">
      <Row gutter={[16, 16]}>
        <Col lg={6} md={12} sm={24} xs={24}>
          <CustomSelect
            name="timingType"
            label="نوع زمان‌بندی"
            options={schedulingTypeData?.data}
            placeholder="انتخاب کنید"
            form={form}
            loading={isSchedulingTypeLoading}
            onClick={getSchedulingTypeHandler}
            onChange={scheduleTypeOnChange}
            rules={[REQUIRED_RULE]}
          />
        </Col>
        {isSemester && (
          <Col lg={6} md={12} sm={24} xs={24}>
            <CustomSelect
              name="semester"
              label="نیم‌سال"
              options={semesterData?.data}
              placeholder="انتخاب کنید"
              form={form}
              loading={isSemesterLoading}
              onClick={getSemesterHandler}
              rules={[REQUIRED_RULE]}
            />
          </Col>
        )}
      </Row>
      <CustomTable
        dataSource={dataSource}
        rowKey="id"
        loading={getPricingStepLoading || getPricingStepCountLoading}
        columns={WorkSpacesTariffPricingStepTableModel()}
        pagination={manualPaginationConfig({
          total: getPricingStepCountData?.data,
          onChange: (page, pageSize) => {
            setSearchParams({
              ...url,
              page: page?.toString(),
              pageSize: pageSize?.toString(),
            });
          },
          pageNumber: url?.page ? Number(url?.page) : 1,
          defaultPageSize: url?.pageSize ? Number(url?.pageSize) : 8,
        })}
        key={`table-${url?.pageSize || "8"} `}
        {...TABLE_PROPS(dataSource?.length)}
      />
      <div className="btn-wrapper">
        <CustomButton
          type="primary"
          onClick={submitBtnHandler}
          loading={isSendStepLoading}
        >
          ثبت تغییرات
        </CustomButton>
        <CustomButton type="primary" ghost onClick={backBtnHandler}>
          بازگشت
        </CustomButton>
      </div>
    </Form>
  );
};
export default PricingStep;
