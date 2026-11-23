import { Col, Form, Row } from "antd";
import { AiOutlineExclamationCircle } from "react-icons/ai";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import "./_businessRequestsDetailTopChartInfoDrawer.scss";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";

import { useEffect } from "react";

const BusinessRequestsDetailTopChartInfoDrawer = ({
  closeDrawer,
  id,
  onAdd,
  parentUnitName,
}: {
  closeDrawer: () => void;
  id?: number;
  onAdd: (row: any) => void;
  parentUnitName?: string;
}) => {
  const [form] = Form.useForm();
  const mapOptions = (data: { id: number; title: string }[]) =>
    data.map((item) => ({
      id: item.id,
      title: item.title,
      label: item.title,
      value: String(item.id),
    }));

  const BRANCH_OPTIONS = mapOptions([{ id: 1, title: "شعبه مرکزی" }]);
  const UNIT_TYPE_OPTIONS = mapOptions([{ id: 1, title: "موسس" }]);
  const UNIT_TITLE_OPTIONS = mapOptions([{ id: 1, title: "هیات امناء" }]);
  const UNIT_PARENT_OPTIONS = mapOptions([{ id: 1, title: "عنوان کسب و کار" }]);
  //? ================================ Effects  ================================

  useEffect(() => {
    form.setFieldsValue({ branch: BRANCH_OPTIONS[0].value });
  }, []);
  useEffect(() => {
    if (parentUnitName) {
      form.setFieldsValue({
        unitParent: UNIT_PARENT_OPTIONS.find((o) => o.label === parentUnitName)?.value,
      });
    }
  }, [parentUnitName]);
  //? ================================ Util functions  ================================
  const getTitleByValue = (
    options: { value: string; label: string }[],
    value: string
  ) => {
    return options.find((opt) => opt.value === value)?.label || "-";
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="business-requests-top-chart-drawer-container">
      <Form
        form={form}
        className="business-requests-top-chart-drawer-form-container"
        onFinish={(values) => {
          const mockRow = {
            key: id,
            id,
            unitName: getTitleByValue(UNIT_TITLE_OPTIONS, values.unitTitle),
            unitType: getTitleByValue(UNIT_TYPE_OPTIONS, values.unitType),
            parentUnit: getTitleByValue(UNIT_PARENT_OPTIONS, values.unitParent),
            branch: getTitleByValue(BRANCH_OPTIONS, values.branch),
            createDate: "1403/04/22",
            lastEditDate: "1403/04/23",
            createdBy: "مدیر سیستم",
            description: values.description || "-",
          };
          onAdd(mockRow);
        }}
      >
        <CustomDrawerHeader
          title="ایجاد واحد جدید"
          closeDrawerHandler={closeDrawer}
          leftSideContent={
            <div className="btn-container">
              <CustomButton onClick={closeDrawer} className="drawer-action-btn">
                انصراف
              </CustomButton>
              <CustomButton
                type="primary"
                className="drawer-action-btn"
                htmlType="submit"
              >
                ثبت واحد
              </CustomButton>
            </div>
          }
        />
        <div className="business-requests-top-chart-drawer-content-container">
          <CustomDivider text="اطلاعات واحد سازمانی تاپ چارت" />
          <Row gutter={[16, 16]}>
            <Col lg={12} md={12}>
              <CustomSelect
                options={BRANCH_OPTIONS}
                name="branch"
                label="شعبه"
                disabled
                rules={[REQUIRED_RULE]}
              />
            </Col>
            <Col lg={12} md={12}>
              <CustomSelect
                options={UNIT_PARENT_OPTIONS}
                name="unitParent"
                label="والد واحد"
                rules={[REQUIRED_RULE]}
                tooltip={{
                  title: <>مقدار والد را مشخص کنید</>,
                  icon: <AiOutlineExclamationCircle />,
                }}
                disabled={!!parentUnitName}
              />
            </Col>
            <Col lg={12} md={12}>
              <CustomSelect
                options={UNIT_TYPE_OPTIONS}
                name="unitType"
                label="نوع واحد"
                rules={[REQUIRED_RULE]}
              />
            </Col>
            <Col lg={12} md={12}>
              <CustomSelect
                options={UNIT_TITLE_OPTIONS}
                name="unitTitle"
                label="عنوان واحد"
                rules={[REQUIRED_RULE]}
              />
            </Col>
            <Col lg={245} md={24}>
              <CustomTextArea
                tooltip={{
                  icon: <span>(اختیاری)</span>,
                }}
                label="توضیحات"
                name="description"
                placeholder="توضیحات خود را وارد نمایید"
              />
            </Col>
          </Row>
        </div>
      </Form>
    </div>
  );
};

export default BusinessRequestsDetailTopChartInfoDrawer;
