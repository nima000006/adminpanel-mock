import { useEffect, useState } from "react";

import { Col, FormInstance, Row, Tabs } from "antd";

import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import { useLazyGetMaritalStatusQuery } from "@infra/states/redux/Apis/dorm/requests/dormRequestsApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { ConfirmedRequestBedDeliverModalFormType } from "@pages/Dorm/Requests/UsersRequests/UsersRequestsList/helper/components/Confirmed/@types/@usersRequestsListConfirmed";

const MARITAL_STATUS = {
  single: 1,
  married: 2,
};

const Info = ({ name }: { name: string }) => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={12}>
        <CustomInput name={`${name}Name`} label="نام (اختیاری)" placeholder="نام" />
      </Col>
      <Col span={12}>
        <CustomInput
          name={`${name}Family`}
          label="نام خانوادگی (اختیاری)"
          placeholder="نام خانوادگی"
        />
      </Col>
      <Col span={12}>
        <CustomInput
          name={`${name}Phone`}
          label="شماره تماس (اختیاری)"
          placeholder="شماره تماس"
        />
      </Col>
      {name === "relative" && (
        <Col span={12}>
          <CustomInput
            name={`${name}Relative`}
            label=" نسبت (اختیاری)"
            placeholder="نسبت را وارد نمایید."
          />
        </Col>
      )}
    </Row>
  );
};

const AdmissionFormStep = ({
  form,
}: {
  form: FormInstance<ConfirmedRequestBedDeliverModalFormType>;
}) => {
  const [hasSpouse, setHasSpouse] = useState(false);

  //? ================================  Api Calls ================================
  const [getMaritalStatus, { data: maritalStatusData, isFetching: isMaritalStatus }] =
    useLazyGetMaritalStatusQuery();

  //? ================================ Effects ================================

  useEffect(() => {
    getMaritalStatus();
  }, []);

  //* ================================ Util Functions ================================
  const changeMaritalStatusHandler = (e: string) => {
    if (+e === MARITAL_STATUS.married) {
      setHasSpouse(true);
    } else {
      setHasSpouse(false);
    }
  };

  const tabItems = [
    {
      key: "1",
      label: "اطلاعات پدر",
      children: <Info name="father" />,
    },
    {
      key: "2",
      label: "اطلاعات مادر",
      children: <Info name="mother" />,
    },
    ...(hasSpouse
      ? [
          {
            key: "3",
            label: "اطلاعات همسر",
            children: <Info name="spouse" />,
          },
        ]
      : []),
    {
      key: "4",
      label: "اطلاعات بستگان",
      children: <Info name="relative" />,
    },
  ];

  return (
    <div className="admission-form-step">
      <CustomAlert
        message="توجه!"
        description="لطفاً حداقل یک شماره تماس را وارد نمایید در غیر این صورت نمی‌توانید روند تحویل اتاق را انجام دهید."
        closable
        type="warning"
      />
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <CustomSelect
            name="maritalStatus"
            label="وضعیت تأهل"
            placeholder="انتخاب کنید"
            form={form}
            options={maritalStatusData?.data ?? []}
            loading={isMaritalStatus}
            onChange={(e) => changeMaritalStatusHandler(e as string)}
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col span={12}>
          <CustomInput
            name="essentialPhoneNumber"
            label="شماره تماس ضروری"
            placeholder="شماره تماس ضروری"
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col span={24}>
          <CustomInput name="description" label="توضیحات" placeholder="توضیحات" />
        </Col>
      </Row>
      <Tabs
        defaultActiveKey={"1"}
        items={tabItems}
        className="bed-deliver-tab-container"
      />
    </div>
  );
};

export default AdmissionFormStep;
