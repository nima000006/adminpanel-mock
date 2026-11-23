import { useState } from "react";

import { Button, Form, Modal, Tabs, TabsProps } from "antd";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import { RoomPaymentRulesTableModel } from "../../../../../infrastructure/models/tableModels/RoomTableModel/RoomPaymentRulesModel/RoomPaymentRulesTableModel";
import {
  NUMBER_RULE,
  REQUIRED_RULE,
} from "../../../../../infrastructure/validation/validationSchema";
import { PADDING_40 } from "../../../../../infrastructure/VARS/globalStyles/globalStyles";
import CustomCard from "../../../../CustomCard/CustomCard";
import CustomInput from "../../../../CustomInputs/CustomInput/CustomInput";
import CustomDivider from "../../../../Renderers/CustomDivider/CustomDivider";

import "./_roomPaymentRules.scss";

type TableData = {
  key: number;
  id: number;
  dayNumber: number;
  percentage: number;
};

const RoomPaymentRules = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [count, setCount] = useState(1);

  //* ================================ Util Functions ================================
  const onSubmitHandler = (e: { day: string; percentage: string }) => {
    setTableData((prev) => [
      ...prev,
      {
        key: count,
        id: count,
        dayNumber: +e.day,
        percentage: +e.percentage,
      },
    ]);
    setCount((prev) => prev + 1);
    setIsModalOpen(false);
  };

  //
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "ترمیک",
      children: (
        <div className="data-tab-container">
          {/* //Todo[atefeh]: should get edited if it's needed in the feature */}
          {/* <div>
           <CustomDivider   text=" رهن" />
            <div className="renting-data">
              <div className="renting-data-item">
                <Switch />
                <label htmlFor="price-input">مبلغ تومان :</label>
                <Input id="price-input" className="input-price" />
                <CustomRadioGroup
                  options={[
                    { label: "زودتر", value: "sooner" },
                    { label: "دیرتر", value: "later" },
                    { label: "مهزمان با رزرو", value: "sameTime" },
                  ]}
                />
              </div>
              <div className="renting-data-item">
                <label htmlFor="day-input">چند روز :</label>
                <Input id="day-input" className="input-day" />
                <Button type="primary">ثبت رهن</Button>
              </div>
            </div>
          </div> */}
          <div>
            <CustomDivider text=" تقسیط پرداخت" />
            <div className="installment-data">
              <Button
                type="primary"
                className="new-row-btn"
                onClick={() => setIsModalOpen(true)}
              >
                سطر جدید
              </Button>
              <CustomTable
                dataSource={tableData}
                columns={RoomPaymentRulesTableModel}
                {...TABLE_PROPS(tableData?.length)}
              />
            </div>
          </div>

          {isModalOpen && (
            <Modal
              title="اقساط"
              open={isModalOpen}
              onCancel={() => setIsModalOpen(false)}
              footer={null}
            >
              <Form
                onFinish={onSubmitHandler}
                className="installment-modal-body-container"
              >
                <div className="installment-modal-body">
                  <CustomInput
                    type="text"
                    name="day"
                    label="چند روز"
                    rules={[REQUIRED_RULE, NUMBER_RULE]}
                  />
                  <CustomInput
                    type="text"
                    name="percentage"
                    label="درصد"
                    rules={[REQUIRED_RULE, NUMBER_RULE]}
                  />
                </div>
                <div className="modal-btn-container">
                  <Button htmlType="submit" type="primary" className="modal-btn">
                    ایجاد قسط جدید
                  </Button>
                  <Button className="modal-btn" onClick={() => setIsModalOpen(false)}>
                    انصراف
                  </Button>
                </div>
              </Form>
            </Modal>
          )}
        </div>
      ),
    },
    {
      key: "2",
      label: "ماهانه",
      children: <></>,
    },
    {
      key: "3",
      label: "روزانه",
      children: <></>,
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomCard padding={PADDING_40} className="room-payment-rules-container">
      <div className="label">قوانین پرداخت</div>
      <div className="tabs-container">
        <Tabs defaultActiveKey="1" items={items} />
      </div>
    </CustomCard>
  );
};

export default RoomPaymentRules;
