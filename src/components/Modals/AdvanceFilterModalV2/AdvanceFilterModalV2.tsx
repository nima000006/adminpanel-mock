import { Form, Modal, Row } from "antd";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";

import { AdvanceFilterModalV2Props, FormDataValue } from "./@types/@advanceFilterModalV2";
import FilterItemRenderer from "./helpers/FilterItemRenderer";
import "./_advanceFilterModalV2.scss";

const AdvanceFilterModalV2 = <T extends Record<string, any>>({
  title = "فیلتر پیشرفته",
  width = 800,
  filterItems,
  advanceFilter,
}: AdvanceFilterModalV2Props<T>) => {
  const { isOpen, closeModal, form, resetFilters, submitFilters } = advanceFilter;

  return (
    <Modal
      title={title}
      open={isOpen}
      onCancel={closeModal}
      footer={null}
      width={width}
      className="advance-filter-modal-v2-container"
    >
      <Form
        form={form}
        onFinish={(formData: Record<string, FormDataValue>) => submitFilters(formData)}
      >
        <Row gutter={[16, 16]} className="modal-body-container">
          {filterItems.map((item) => (
            <FilterItemRenderer key={String(item.name)} data={item} form={form} />
          ))}
        </Row>
        <div className="action-btns-container">
          <CustomButton onClick={resetFilters}>پاک کردن فیلترها</CustomButton>
          <div className="left-btns">
            <CustomButton onClick={closeModal}>انصراف</CustomButton>
            <CustomButton type="primary" htmlType="submit">
              اعمال
            </CustomButton>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default AdvanceFilterModalV2;
