import { useEffect } from "react";

import { Col, FormInstance, Row } from "antd";
import {
  AiOutlineSearch,
  AiOutlineSignature,
  AiOutlineTable,
  AiOutlineTrademarkCircle,
} from "react-icons/ai";
import { useSearchParams } from "react-router";

import CustomCard from "@components/CustomCard/CustomCard";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomRangePicker from "@components/CustomInputs/CustomRangePicker/CustomRangePicker";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import { useLazyGetAllBranchesQuery } from "@infra/states/redux/Apis/business/business/businessApi";

const paymentStatusOptions = [
  {
    id: 1,
    title: "پرداخت شده",
  },
  {
    id: 2,
    title: "تسویه شده",
  },
];

const FinancialAdvancedFilter = ({
  form,
  type,
}: {
  form: FormInstance<any>;
  type: number;
}) => {
  const [searchParams] = useSearchParams();
  const {
    beneficiaryBranchCode = null,
    branchCode = null,
    nationalNumber = null,
    referenceNumber = null,
    serviceName = null,
    trackingNumber = null,
    from,
    to,
    paymentStatus,
  } = Object.fromEntries([...searchParams]);

  const [getAllUniversity, { data: universityData, isLoading: isUniversityDataLoading }] =
    useLazyGetAllBranchesQuery();

  useEffect(() => {
    getAllUniversity();
  }, []);

  // set init values into inputs if data exists
  useEffect(() => {
    // console.log(paymentStatus);
    // console.log({ paymentStatusOptions });
    // console.log({
    //   m: selectDefaultValueGenerator({
    //     id: 1, //+paymentStatus,
    //     title: "saman", //paymentStatusOptions.find((item) => item?.id === +paymentStatus)?.title,
    //   }),
    // });

    // console.log({
    //   paymentStatus: paymentStatusOptions.filter((item) => item?.id === +paymentStatus)
    //     ?.title,
    // });

    // console.log({
    //   a: selectDefaultValueGenerator({
    //     id: +paymentStatus,
    //     title: paymentStatusOptions.find((item) => item?.id === +paymentStatus)?.title,
    //   }),
    // });
    if (!paymentStatus) {
      form.resetFields(["paymentStatus"]);
    }

    form.setFieldsValue({
      beneficiaryBranchCode,
      branchCode,
      nationalNumber,
      referenceNumber,
      serviceName,
      trackingNumber,
      date: from && to ? [from, to] : null,
      // ...(paymentStatus
      //   ? {
      //       paymentStatus: selectDefaultValueGenerator({
      //         id: 1, //+paymentStatus,
      //         title: "saman", //paymentStatusOptions.find((item) => item?.id === +paymentStatus)?.title,
      //       }),
      //     }
      //   : { paymentStatus: undefined }),
    });
  }, [
    beneficiaryBranchCode,
    branchCode,
    nationalNumber,
    referenceNumber,
    serviceName,
    trackingNumber,
    paymentStatus,
    from,
    to,
  ]);

  return (
    <CustomCard>
      {/* <Form onFinish={onAdvanceFilterSubmit} form={form}> */}
      <Row gutter={[16, 16]}>
        <Col md={12}>
          <CustomInput
            type="text"
            label="جستجو بر اساس کد ملی"
            name="nationalNumber"
            placeholder="عبارت"
            suffix={<AiOutlineSearch />}
          />
        </Col>
        <Col md={12}>
          <CustomInput
            type="text"
            label="جستجو بر اساس REF"
            name="referenceNumber"
            placeholder="عبارت"
            suffix={<AiOutlineSignature />}
          />
        </Col>
        <Col md={12}>
          <CustomInput
            type="text"
            label="جستجو بر اساس کد پیگیری"
            name="trackingNumber"
            placeholder="عبارت"
            suffix={<AiOutlineTrademarkCircle />}
          />
        </Col>
        <Col md={12}>
          <CustomInput
            type="text"
            label="جستجو بر اساس نام سرویس"
            name="serviceName"
            placeholder="عبارت"
            suffix={<AiOutlineTable />}
          />
        </Col>
        <Col md={12}>
          <CustomSelect
            label="واحد ذی‌نفع"
            name="beneficiaryBranchCode"
            placeholder="انتخاب کنید"
            allowClear
            loading={isUniversityDataLoading}
            options={universityData ? universityData : []}
          />
        </Col>
        <Col md={12}>
          <CustomSelect
            allowClear
            options={universityData ? universityData : []}
            label="واحد دانشجو"
            loading={isUniversityDataLoading}
            name="branchCode"
            placeholder="انتخاب کنید"
          />
        </Col>
        <Col md={12} style={{ marginTop: "-20px" }}>
          <CustomRangePicker label="بازه زمانی" name="date" form={form} />
        </Col>
        {type === 0 && (
          <Col md={12} style={{ marginTop: "-20px" }}>
            <CustomSelect
              options={paymentStatusOptions}
              label="وضعیت پرداخت"
              name="paymentStatus"
            />
          </Col>
        )}
      </Row>
    </CustomCard>
  );
};

export default FinancialAdvancedFilter;
