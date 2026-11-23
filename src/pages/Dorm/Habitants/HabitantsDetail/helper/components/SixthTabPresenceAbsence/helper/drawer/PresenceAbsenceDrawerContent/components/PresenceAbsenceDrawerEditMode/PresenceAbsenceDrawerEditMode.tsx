import { Col, Row } from "antd";
import momentj from "jalali-moment";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";

import { PresenceAbsenceDrawerEditModePropsType } from "./@types/PresenceAbsenceDrawerEditModePropsType";

const PresenceAbsenceDrawerEditMode = ({
  form,
  onClose,
  onSubmit,
  data,
  type,
  isLoading,
  isFetching,
  cellDate,
  drawerLoading,
}: PresenceAbsenceDrawerEditModePropsType) => {
  return (
    <>
      <CustomDrawerHeader
        title="ثبت وضعیت"
        closeDrawerHandler={onClose}
        leftSideContent={
          <div className="body-regular flex gap-4">
            <CustomButton type="primary" loading={isLoading} onClick={onSubmit}>
              ثبت
            </CustomButton>
            <CustomButton className="drawer-action-btn" onClick={onClose}>
              انصراف
            </CustomButton>
          </div>
        }
      />
      <Div loading={drawerLoading} className="p-8!">
        <Row gutter={[16, 16]}>
          <Col lg={8} md={12} sm={12} xs={24}>
            <CustomSelect
              name="type"
              label="وضعیت حضور"
              form={form}
              options={type}
              placeholder="انتخاب کنید"
              rules={[{ required: true, message: "وضعیت حضور الزامی است" }]}
              isLoading={isFetching}
            />
          </Col>
          <Col lg={8} md={12} sm={12} xs={24}>
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              md={12}
              label="تاریخ"
              value={dataPlaceHolder({
                data: momentj.from(cellDate, "fa", "YYYY-MM-DD").format("YYYY-MM-DD"),
                isDate: true,
              })}
            />
          </Col>
          <Col span={24}>
            <CustomTextArea
              label="توضیحات"
              name="description"
              value={data?.description}
              placeholder="توضیحات"
              maxLength={100}
              showCount
            />
          </Col>
        </Row>
      </Div>
    </>
  );
};

export default PresenceAbsenceDrawerEditMode;
