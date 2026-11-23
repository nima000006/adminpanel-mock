import { useState } from "react";

import { Col, Form, Row } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORM_TARIFFS_LIST_PAGE_ROUTE } from "@infra/router/routes/dorm";
import {
  useLazyGetSchedulingTypeQuery,
  useLazyGetSemesterQuery,
} from "@infra/states/redux/Apis/dorm/base/dormBaseApi";
import {
  useLazyGetCreatePricingStepQuery,
  useSendCreateTariffMutation,
} from "@infra/states/redux/Apis/dorm/planning/tariff/dormTariffApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { GENERAL_REQUEST_SUCCESS } from "@infra/VARS/globalToasts/globalToasts";
import { fetchDataIfNeeded } from "@pages/_shared/utils";

import { GetCreatePricingStep, SendCreateTariffResponse } from "./@types/@pricingStep";
import TablePricingCreate from "./TablePricingCreate/TablePricingCreate";
import TablePricingView from "./TablePricingView/TablePricingView";
import InactiveCreateTariffModalContent from "../../../modals/InactiveCreateTariffModalContent/InactiveCreateTariffModalContent";
import { PricingStepPropsType } from "../BasicInfoStep/@types/@basicInfoStepPropsType";
import "./_pricingStep.scss";

const customTimeCreator = (time: dayjs.ConfigType) => {
  return dayjs(time).format("HH:mm:ss.000");
};

const PricingStep = ({
  type,
  setCurrentStep,
  form,
  isReject,
  lastDormId,
}: PricingStepPropsType) => {
  const [openSubmitModal, setIsOpenSubmitModal] = useState({
    isOpen: false,
    id: -1,
  });

  const [isSemester, setIsSemester] = useState<boolean>(false);

  const [createDataSource, setCreateDataSource] = useState<GetCreatePricingStep[]>([]);

  const { params: url } = useQueryParams();
  const navigate = useNavigate();

  const dormId = form.getFieldsValue(true);

  //? ================================  Api Calls ================================
  //send data
  const [sendStepData, { isLoading: isSendStepFormLoading }] =
    useSendCreateTariffMutation();

  //get create pricing step
  const [getCreatePricingStep, { isFetching: getCreatePricingStepLoading }] =
    useLazyGetCreatePricingStepQuery();

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

  //* ================================ Util Functions ================================
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

  // btn handler
  const submitBtnHandler = () => {
    form.submit();
    form.validateFields().then(() => {
      setIsOpenSubmitModal({
        isOpen: true,
        id: -1,
      });
    });
  };
  const backBtnHandler = () => {
    setCurrentStep(0);
  };

  // modal handler
  const closeModalHandler = () => {
    setIsOpenSubmitModal({
      isOpen: false,
      id: -1,
    });
    form.setFieldsValue({ description: "" });
  };

  const submitModalHandler = () => {
    form.submit();
    form.validateFields().then(() => {
      const value = form.getFieldsValue(true);

      const priceList = [];
      for (const key in value) {
        if (key?.split("-")?.[0] === "price") {
          priceList.push({
            price: value[key]?.toString(),
            roomTypeId: +key?.split("-")?.[1],
          });
        }
      }
      sendStepData({
        form: "CreatePriceList",
        data: {
          ...(isReject && { id: url?.id }),
          title: value?.title,
          branchId: value?.uni?.code,
          dormitoryId: value?.dormitory?.code,
          currencyTypeId: value?.currency?.code,
          tax: value?.tax ? value?.tax : null,
          toll: value?.toll ? value?.toll : null,
          description: value?.desc ? value?.desc : null,
          appliedStartDate: value?.startDate,
          ...(value?.startTime
            ? { appliedStartTime: customTimeCreator(value?.startTime) }
            : {}),
          appliedEndDate: value?.endDate,
          ...(value?.endTime
            ? { appliedEndTime: customTimeCreator(value?.endTime) }
            : {}),
          AssociationRoomTypePrice: priceList,
          descRequest: value?.description,
          schedulingId: value?.timingType?.code,
          SemesterId: value?.semester?.code,
        },
      })
        .unwrap()
        .then(sendStepDataSuccess)
        .catch(sendStepDataCatch);
    });
  };

  //success
  const sendStepDataSuccess = async (value: SendCreateTariffResponse) => {
    if (value?.status === 204) {
      setIsOpenSubmitModal({ isOpen: false, id: -1 });
      navigate(DORM_TARIFFS_LIST_PAGE_ROUTE);
      toast.success(GENERAL_REQUEST_SUCCESS, { toastId: GENERAL_REQUEST_SUCCESS });
      form.setFieldsValue({ description: "" });
    }
  };

  //catch
  const sendStepDataCatch = async (value: SendCreateTariffResponse) => {
    if (value?.status === 500) {
      setIsOpenSubmitModal({ isOpen: false, id: -1 });
      navigate(DORM_TARIFFS_LIST_PAGE_ROUTE);
      form.setFieldsValue({ description: "" });
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {openSubmitModal && (
        <ConfirmationModalWithContent
          title="ایجاد تعرفه"
          isModalOpen={openSubmitModal?.isOpen}
          isConfirmButtonLoading={isSendStepFormLoading}
          confirmBtnText="ثبت درخواست"
          customClass="dorm-pricing-step-modal-container"
          backBtnText="انصراف"
          closeModalHandler={closeModalHandler}
          onConfirmClickHandler={submitModalHandler}
          content={<InactiveCreateTariffModalContent form={form} />}
        />
      )}
      <div className="dorm-pricing-step-container">
        <Form form={form}>
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
          {url?.id ? (
            <TablePricingView
              type={type}
              form={form}
              loading={getCreatePricingStepLoading}
              onGetCreatePricingStep={getCreatePricingStep}
              createDataSource={createDataSource}
              setCreateDataSource={setCreateDataSource}
              lastDormId={lastDormId}
            />
          ) : (
            <TablePricingCreate
              form={form}
              loading={getCreatePricingStepLoading}
              onGetCreatePricingStep={getCreatePricingStep}
              dormId={dormId}
              createDataSource={createDataSource}
              setCreateDataSource={setCreateDataSource}
            />
          )}
          <div className="tariff-copy-btn-wrapper">
            <CustomButton type="primary" onClick={submitBtnHandler}>
              ثبت
            </CustomButton>
            <CustomButton type="primary" ghost onClick={backBtnHandler}>
              بازگشت
            </CustomButton>
          </div>
        </Form>
      </div>
    </>
  );
};
export default PricingStep;
