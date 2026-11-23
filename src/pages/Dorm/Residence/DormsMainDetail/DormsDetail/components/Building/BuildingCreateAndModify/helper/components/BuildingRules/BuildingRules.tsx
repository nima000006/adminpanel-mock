import { Col, Row } from "antd";

import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import {
  useLazyGetDormInstallmentsRulesTypesQuery,
  useLazyGetDormCancellingRulesTypesQuery,
  useLazyGetDormDisciplinaryRulesTypesQuery,
  useLazyGetDormFinanceRulesTypesQuery,
  useLazyGetDormGeneralRulesTypesQuery,
} from "@infra/states/redux/Apis/dorm/base/dormBaseApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import { BuildingRulesProps } from "./@types/@buildingRules";

const BuildingRules = ({ buildingForm }: BuildingRulesProps) => {
  //? ================================  Api Calls ================================
  const [
    getGeneralRulesTypes,
    {
      data: generalRulesData,
      isFetching: isGeneralRulesDataLoading,
      isSuccess: isGeneralRulesSuccess,
    },
  ] = useLazyGetDormGeneralRulesTypesQuery();

  const [
    getFinanceRulesTypes,
    {
      data: financeRulesData,
      isFetching: isFinanceRulesDataLoading,
      isSuccess: isFinanceRulesSuccess,
    },
  ] = useLazyGetDormFinanceRulesTypesQuery();

  const [
    getDisciplinaryRulesTypes,
    {
      data: disciplinaryRulesData,
      isFetching: isDisciplinaryRulesDataLoading,
      isSuccess: isDisciplinaryRulesSuccess,
    },
  ] = useLazyGetDormDisciplinaryRulesTypesQuery();

  const [
    getCancellingRulesTypes,
    {
      data: cancellingRulesData,
      isFetching: isCancellingRulesDataLoading,
      isSuccess: isCancellingRulesSuccess,
    },
  ] = useLazyGetDormCancellingRulesTypesQuery();

  const [
    getInstallmentsRulesTypes,
    {
      data: installmentsRulesData,
      isFetching: isInstallmentsRulesDataLoading,
      isSuccess: isInstallmentsRulesSuccess,
    },
  ] = useLazyGetDormInstallmentsRulesTypesQuery();

  //* ================================ Util Functions ================================
  // قوانین و مقررات عمومی
  const getGeneralRulesHandler = () => {
    if (!isGeneralRulesSuccess) {
      getGeneralRulesTypes({
        maxResults: 2000,
        firstResult: 0,
        recordStatus_EQ: "1",
        typeId_EQ: 1,
      });
    }
  };
  // قوانین و مقررات مالی
  const getFinanceRulesHandler = () => {
    if (!isFinanceRulesSuccess) {
      getFinanceRulesTypes({
        maxResults: 2000,
        firstResult: 0,
        recordStatus_EQ: "1",
        typeId_EQ: 2,
      });
    }
  };

  // قوانین و مقررات انضباطی
  const getDisciplinaryRulesHandler = () => {
    if (!isDisciplinaryRulesSuccess) {
      getDisciplinaryRulesTypes({
        maxResults: 2000,
        firstResult: 0,
        recordStatus_EQ: "1",
        typeId_EQ: 3,
      });
    }
  };

  //قوانین و مقررات کنسلی
  const getCancellingRulesHandler = () => {
    if (!isCancellingRulesSuccess) {
      getCancellingRulesTypes({
        maxResults: 2000,
        firstResult: 0,
        recordStatus_EQ: "1",
        typeId_EQ: 4,
      });
    }
  };

  //قوانین و مقررات اقساط
  const getInstallmentsRulesHandler = () => {
    if (!isInstallmentsRulesSuccess) {
      getInstallmentsRulesTypes({
        maxResults: 2000,
        firstResult: 0,
        recordStatus_EQ: "1",
        typeId_EQ: 6,
      });
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <div className="rules-info">
      <CustomDivider text="قوانین و مقررات" />
      <Row gutter={16}>
        <Col span={24}>
          <CustomSelect
            name="financeRules"
            label="قوانین و مقررات مالی"
            options={financeRulesData ? financeRulesData?.data : []}
            loading={isFinanceRulesDataLoading}
            onClick={getFinanceRulesHandler}
            placeholder="انتخاب کنید"
            form={buildingForm}
            mode="multiple"
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col span={24}>
          <CustomSelect
            name="disciplinaryRules"
            label="قوانین و مقررات انضباطی"
            options={disciplinaryRulesData ? disciplinaryRulesData?.data : []}
            loading={isDisciplinaryRulesDataLoading}
            onClick={getDisciplinaryRulesHandler}
            placeholder="انتخاب کنید"
            form={buildingForm}
            mode="multiple"
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col span={24}>
          <CustomSelect
            name="generalRules"
            label="قوانین و مقررات عمومی"
            options={generalRulesData ? generalRulesData?.data : []}
            loading={isGeneralRulesDataLoading}
            onClick={getGeneralRulesHandler}
            placeholder="انتخاب کنید"
            form={buildingForm}
            mode="multiple"
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col span={24}>
          <CustomSelect
            name="cancellingRules"
            label="قوانین و مقررات کنسلی"
            options={cancellingRulesData ? cancellingRulesData?.data : []}
            loading={isCancellingRulesDataLoading}
            onClick={getCancellingRulesHandler}
            placeholder="انتخاب کنید"
            form={buildingForm}
            mode="multiple"
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col span={24}>
          <CustomSelect
            name="installmentsRules"
            label="قوانین و مقررات اقساط"
            options={installmentsRulesData ? installmentsRulesData?.data : []}
            loading={isInstallmentsRulesDataLoading}
            onClick={getInstallmentsRulesHandler}
            placeholder="انتخاب کنید"
            form={buildingForm}
            mode="multiple"
            rules={[REQUIRED_RULE]}
          />
        </Col>
      </Row>
    </div>
  );
};

export default BuildingRules;
