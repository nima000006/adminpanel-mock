import { useState } from "react";

import { Col, Form, Row } from "antd";
import { PiCards, PiTable } from "react-icons/pi";
import { toast } from "react-toastify";

import CustomRangePicker from "@components/CustomInputs/CustomRangePicker/CustomRangePicker";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { useResponsive } from "@infra/hooks/useResponsive";
import {
  useLazyAccountingGetAllBusinessQuery,
  useLazyAccountingGetBranchesQuery,
} from "@infra/states/redux/Apis/business/business/businessApi";
import {
  useGetProvinceQuery,
  useLazyGetCityQuery,
} from "@infra/states/redux/Apis/food/general/GeneralFoodApis";
import { useLazyGetServicesListByBranchIdQuery } from "@infra/states/redux/Apis/wallet/wallets/walletsApi";
import { fetchDataIfNeeded, selectNotFoundContent } from "@pages/_shared/utils";
import {
  AccountingGetBranchResponse,
  BranchItem,
} from "@pages/Finance/Accountants/_shared/@types/@accountantsType";
import { FinanceBusinessOwnersGeneralInformationFormType } from "@pages/Finance/BusinessOwners/helpers/components/FinanceBusinessOwnersGeneralInformation/@types/cardData";
import {
  CityType,
  GetCityResponse,
} from "@pages/Food/Vendors/AllVendors/AllVendorList/helper/drawer/AllVendorListDrawerContent/@types/@allVendorListDrawerContent";

import CardView from "./helper/components/CardView/CardView";
import FinancialIncomeCard from "./helper/components/FinancialIncomeCard/FinancialIncomeCard";
import TableView from "./helper/components/TableView/TableView";
import EmptyFile from "../../../../../../assets/images/EmptyFile.png";

import "./_financeBusinessOwnersGeneralInformation.scss";

export type ViewInfoLabelType =
  | "business"
  | "province"
  | "city"
  | "branch"
  | "beneficiary"
  | "service";

const selectListMockData: { id: number; title: string; key: ViewInfoLabelType }[] = [
  { id: 1, title: "درآمد کسب و کار", key: "business" },
  { id: 2, title: "درآمد استان", key: "province" },
  { id: 3, title: "درآمد شهر", key: "city" },
  { id: 4, title: "درآمد شعبه / واحد", key: "branch" },
  { id: 5, title: "درآمد ذینفع", key: "beneficiary" },
  { id: 6, title: "درآمد سرویس", key: "service" },
];
const FinanceBusinessOwnersGeneralInformation = () => {
  const [cityList, setCityList] = useState<CityType[]>([]);
  const [activeCity, setActiveCity] = useState(true);
  const [branchData, setBranchData] = useState<BranchItem[]>([]);
  const [formValidate, setIsFormValidate] = useState(false);
  const [view, setView] = useState<"table" | "card">("card");
  const [viewInfo, setViewInfo] = useState<number>(1);
  const [viewInfoLabel, setViewInfoLabel] = useState<ViewInfoLabelType>("business");

  const [form] = Form.useForm<FinanceBusinessOwnersGeneralInformationFormType>();
  const { isMobile } = useResponsive();

  //? ================================  Api Calls ================================
  // get business list
  const [
    triggerBusinessQuery,
    { data: businessApiData, isFetching: businessLoading, isSuccess: isBusinessSuccess },
  ] = useLazyAccountingGetAllBusinessQuery();

  // get province list from api
  const { data: getProvinceListData, isFetching: getProvinceListLoading } =
    useGetProvinceQuery();

  // get city list
  const [getCityList, { isFetching: getCityListLoading }] = useLazyGetCityQuery();

  // get branch list
  const [triggerBranchQuery, { isFetching: branchLoading, isSuccess: isBranchSuccess }] =
    useLazyAccountingGetBranchesQuery();

  // get service list
  const [getServicesList, { data: servicesData, isFetching: isServicesLoading }] =
    useLazyGetServicesListByBranchIdQuery();
  //* ================================ Util Functions ================================
  const getBusinessHandler = () =>
    fetchDataIfNeeded(!isBusinessSuccess, triggerBusinessQuery);

  const onBusinessChangeHandler = (businessId: number) => {
    if (businessId) {
      triggerBranchQuery({ businessId })
        .unwrap()
        .then((value: AccountingGetBranchResponse) => setBranchData(value?.content));
    }

    form.setFieldsValue({
      branch: undefined,
      service: undefined,
    });
  };

  const getCityListSuccess = async (value: GetCityResponse) => {
    if (value?.status === 200) {
      setCityList(value?.data);
    } else {
      return toast.error((value?.data || value?.msg) as any, {
        toastId: (value?.data || value?.msg) as any,
      });
    }
  };

  const onProvinceChangeHandler = (event: unknown) => {
    getCityList({ stateId: event as string })
      .unwrap()
      .then(getCityListSuccess);
    setActiveCity(false);
    form.setFieldsValue({ city: undefined });
  };

  const onChangeBranchIdHandler = (branchId: number) => {
    if (branchId) {
      getServicesList({ branchId });

      form.setFieldsValue({
        service: undefined,
      });
    }
  };

  const viewInformationChangeHandler = (value: number) => {
    const numericValue = Number(value);

    setViewInfo(numericValue);

    const selected = selectListMockData.find((item) => item.id === numericValue);

    setViewInfoLabel(selected?.key || "business");
  };

  // for validate form
  form.submit();
  form.validateFields().then(() => {
    setIsFormValidate(true);
  });

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <div className="finance-business-owners-general-information-container">
      <Form form={form}>
        <ToolBox
          className="toolBox"
          centerSide={
            <CustomRangePicker
              className="custom-range-picker"
              name="dateOfJoin"
              picker="date"
              label="سال مالی (بازه تاریخ)"
            />
          }
        />
        <Row gutter={[16, 16]}>
          <Col lg={8} md={12} sm={24} xs={24}>
            <CustomSelect
              name="business"
              label="کسب و کار"
              form={form}
              isLoading={isBusinessSuccess}
              placeholder="کسب و کار را انتخاب کنید"
              options={businessApiData?.content || []}
              loading={businessLoading}
              onClick={getBusinessHandler}
              onChange={(id) => onBusinessChangeHandler(id as number)}
            />
          </Col>
          <Col lg={8} md={12} sm={24} xs={24}>
            <CustomSelect
              name="province"
              label="استان"
              options={getProvinceListData?.data ? getProvinceListData?.data : []}
              placeholder="انتخاب کنید"
              form={form}
              isLoading={getProvinceListLoading}
              onChange={onProvinceChangeHandler}
            />
          </Col>
          <Col lg={8} md={12} sm={24} xs={24}>
            <CustomSelect
              name="city"
              label="شهر"
              options={cityList}
              placeholder="انتخاب کنید"
              form={form}
              isLoading={getCityListLoading}
              disabled={activeCity}
            />
          </Col>
          <Col lg={8} md={12} sm={24} xs={24}>
            <CustomSelect
              label="شعبه / واحد"
              name="branch"
              options={branchData}
              placeholder="انتخاب کنید"
              loading={branchLoading}
              notFoundContent={isBranchSuccess ? selectNotFoundContent : undefined}
              onChange={(id) => onChangeBranchIdHandler(id as number)}
              disabled={form.getFieldsValue()?.business ? false : true}
              form={form}
            />
          </Col>
          <Col lg={8} md={12} sm={24} xs={24}>
            <CustomSelect
              label="سرویس"
              name="service"
              options={servicesData ? servicesData : []}
              loading={isServicesLoading}
              // onChange={serviceChangeHandler}
              placeholder="انتخاب کنید"
              disabled={
                !form.getFieldsValue()?.business || !form.getFieldsValue()?.branch
                  ? true
                  : false
              }
              form={form}
            />
          </Col>
          <Col lg={8} md={12} sm={24} xs={24}>
            <CustomSelect
              label="ذینفع"
              name="beneficiary"
              options={[
                { id: 1, title: "همه" },
                { id: 2, title: "تهران مرکز" },
              ]}
              placeholder="انتخاب کنید"
              loading={false}
              mode="multiple"
            />
          </Col>
        </Row>
      </Form>
      {!formValidate ? (
        <div className="img-wrapper">
          <img src={EmptyFile} alt="empty" />
          <p>
            لطفاً تمامی مقادیر در فیلترهای بالا را انتخاب کنید تا گزارش مربوط به درآمد
            فیلتر انتخابی خود را مشاهده نمایید.
          </p>
        </div>
      ) : (
        <div className="sub-content">
          <Row gutter={[16, 16]} className="finance-general-information-info-container">
            <Col xs={24} sm={12} md={12} lg={8}>
              <FinancialIncomeCard title="درآمد کل (تومان)" amount={1000000000} />
            </Col>
            <Col xs={24} sm={12} md={12} lg={8}>
              <FinancialIncomeCard
                title="درآمد تسویه شده (تومان)"
                amount={9900000000}
                percentage={99}
                color="green"
              />
            </Col>
            <Col xs={24} sm={12} md={12} lg={8}>
              <FinancialIncomeCard
                title="درآمد تسویه نشده (تومان)"
                amount={1000000000}
                percentage={1}
                color="red"
              />
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col lg={8} md={12} sm={24} xs={24}>
              <CustomSelect
                name="viewInformation"
                label="نمایش اطلاعات بر اساس"
                options={selectListMockData}
                placeholder="انتخاب کنید"
                loading={false}
                defaultValue="کسب و کارها"
                onChange={(value) => viewInformationChangeHandler(value as number)}
              />
            </Col>
          </Row>

          <CustomDivider text="نمودارها" />
          <div className="segment-container">
            <CustomSegmented
              vertical={isMobile}
              size="large"
              options={[
                {
                  value: "cars",
                  label: "نمایش کارتی",
                  icon: <PiCards />,
                },
                {
                  value: "table",
                  label: " نمایش جدولی",
                  // disabled: false,
                  icon: <PiTable />,
                },
              ]}
              onChange={(value) => setView(value as "table" | "card")}
            />
            {view === "table" ? (
              <TableView viewInfo={viewInfo} />
            ) : (
              <CardView viewInfoLabel={viewInfoLabel} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default FinanceBusinessOwnersGeneralInformation;
