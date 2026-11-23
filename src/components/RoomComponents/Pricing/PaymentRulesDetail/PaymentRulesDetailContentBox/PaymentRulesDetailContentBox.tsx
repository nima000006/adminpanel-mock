import { useState } from "react";

import { Button, Form, Modal, Switch } from "antd";
import { AiOutlinePlus } from "react-icons/ai";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import { PaymentRulesDetailContentBoxTableModel } from "../../../../../infrastructure/models/tableModels/RoomTableModel/RoomPaymentRules/PaymentRulesDetailContentBoxModel/PaymentRulesDetailContentBoxTableModel";
import {
  NUMBER_RULE,
  REQUIRED_RULE,
} from "../../../../../infrastructure/validation/validationSchema";
import { PADDING_40 } from "../../../../../infrastructure/VARS/globalStyles/globalStyles";
import CustomCard from "../../../../CustomCard/CustomCard";
import CustomInput from "../../../../CustomInputs/CustomInput/CustomInput";
import CustomRadioGroup from "../../../../CustomInputs/CustomRadioGroup/CustomRadioGroup";
import CustomDivider from "../../../../Renderers/CustomDivider/CustomDivider";

import "./_paymentRulesDetailContentBox.scss";

type InstallMentDataProps = {
  id: number;
  key: number;
  switchLabel: string;
  isActive: boolean;
};
const installmentData: InstallMentDataProps[] = [
  {
    id: 1,
    key: 1,
    switchLabel: "ساختمان ایرانشهر",
    isActive: false,
  },
  {
    id: 2,
    key: 2,
    switchLabel: "ساختمان هفت تیر",
    isActive: false,
  },
  {
    id: 3,
    key: 3,
    switchLabel: "ساختمان وردآورد",
    isActive: true,
  },
];

type TableData = {
  key: number;
  id: number;
  dayNumber: number;
  percentage: number;
};

const RoomInstallments = ({ data }: { data: InstallMentDataProps }) => {
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [count, setCount] = useState(1);
  const [isSubTermActive, setIsSubTermActive] = useState(data?.isActive);
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

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="room-installments-container">
      <div className="building-name">
        <Switch
          checkedChildren="مستقل"
          unCheckedChildren="وابسته"
          defaultChecked={isSubTermActive}
          onChange={(checked: boolean) => setIsSubTermActive(checked)}
        />
        <span className="building-text">{data?.switchLabel}</span>
      </div>

      {isSubTermActive && (
        <CustomCard
          padding={PADDING_40}
          className="payment-rules-detail-content-first-box"
        >
          <div className="stay-box-container">
            <span className="stay-text">رهن</span>
            <div className="stay-box-wrapper">
              <div className="first-part">
                <Switch defaultChecked />
                <CustomInput
                  type="text"
                  name="price"
                  placeholder="25"
                  label="مبلغ به تومان"
                  hasVerticalLabel={false}
                />
                <span className="separator">|</span>
              </div>
              <div className="second-part">
                <CustomRadioGroup
                  options={[
                    { label: "زودتر", value: 0 },
                    { label: "دیرتر", value: 1 },
                    { label: "همزمان با رزرو", value: 2 },
                  ]}
                />
              </div>
              <div className="third-part">
                <CustomInput
                  type="text"
                  name="day"
                  placeholder="25"
                  label="چند روز"
                  hasVerticalLabel={false}
                />
                <Button type="primary" className="stay-register-btn">
                  ثبت رهن
                </Button>
              </div>
            </div>
          </div>
          <div className="payment-installments-box-container">
            <span className="payment-installments-text">تقسیط پرداخت</span>
            <div className="payment-installments-box-wrapper">
              <Button
                className="installment-btn"
                type="primary"
                icon={<AiOutlinePlus />}
                onClick={showModal}
              >
                ایجاد اقساط پرداخت جدید
              </Button>
              <CustomTable
                dataSource={tableData}
                columns={PaymentRulesDetailContentBoxTableModel}
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
        </CustomCard>
      )}
    </div>
  );
};

const PaymentRulesDetailContentBox = () => {
  // const [tableData, setTableData] = useState<TableData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  // const [count, setCount] = useState(1);
  const onSubmitHandler = (/*e: { day: string; percentage: string }*/) => {
    // setTableData((prev) => [
    //   ...prev,
    //   {
    //     key: count,
    //     id: count,
    //     dayNumber: +e.day,
    //     percentage: +e.percentage,
    //   },
    // ]);
    // setCount((prev) => prev + 1);
    setIsModalOpen(false);
  };
  return (
    <div className="payment-rules-detail-content-box-container">
      <CustomCard padding={PADDING_40} className="payment-rules-detail-content-first-box">
        <div className="stay-box-container">
          <span className="stay-text">رهن</span>
          <div className="stay-box-wrapper">
            <div className="first-part">
              <Switch defaultChecked />
              <CustomInput
                type="text"
                name="nationalCode"
                placeholder="25"
                label="مبلغ به تومان"
                hasVerticalLabel={false}
              />
              <span className="separator">|</span>
            </div>
            <div className="second-part">
              <CustomRadioGroup
                options={[
                  { label: "زودتر", value: 0 },
                  { label: "دیرتر", value: 1 },
                  { label: "همزمان با رزرو", value: 2 },
                ]}
              />
            </div>
            <div className="third-part">
              <CustomInput
                type="text"
                name="nationalCode"
                placeholder="25"
                label="چند روز"
                hasVerticalLabel={false}
              />
              <Button type="primary" className="stay-register-btn">
                ثبت رهن
              </Button>
            </div>
          </div>
        </div>
        <div className="payment-installments-box-container">
          <span className="payment-installments-text">تقسیط پرداخت</span>
          <div className="payment-installments-box-wrapper">
            <Button
              className="installment-btn"
              type="primary"
              icon={<AiOutlinePlus />}
              onClick={showModal}
            >
              ایجاد اقساط پرداخت جدید
            </Button>
            <CustomTable
              dataSource={[]}
              columns={PaymentRulesDetailContentBoxTableModel}
              {...TABLE_PROPS(0)}
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
            <Form onFinish={onSubmitHandler} className="installment-modal-body-container">
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
      </CustomCard>
      <CustomCard className="payment-rules-detail-content-second-box">
        <div>
          <CustomDivider text="ساختمان های زیر مجموعه" />
        </div>
        {installmentData?.map((item) => (
          <RoomInstallments data={item} key={item?.id} />
        ))}
      </CustomCard>
    </div>
  );
};
export default PaymentRulesDetailContentBox;
