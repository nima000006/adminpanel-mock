import { Breadcrumb, Button, Divider, Modal, Tabs, Radio, Form, Switch } from "antd";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import { RoomAllocationModalProps } from "./@types/@allocationModal";
import CustomCard from "../../../../components/CustomCard/CustomCard";
import CustomDatePicker from "../../../../components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomInput from "../../../../components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "../../../../components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "../../../../components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomDivider from "../../../../components/Renderers/CustomDivider/CustomDivider";
import paginationConfig from "../../../../infrastructure/helpers/TableHelpers/config/tableConfig";
import { AllocationRoomModalModel } from "../../../../infrastructure/models/tableModels/RoomTableModel/AllocationRoomList/AllocationRoomModalModel/AllocationRoomModalModel";
import { REQUIRED_RULE } from "../../../../infrastructure/validation/validationSchema";
import { PADDING_40 } from "../../../../infrastructure/VARS/globalStyles/globalStyles";
import "./_allocationModal.scss";

const breadCrumbItems = [
  {
    title: "خوابگاه شهید چمران - واحد ایرانشهر",
  },
  {
    title: "طبقه 1",
  },
  {
    title: "سوییت 141",
  },
  {
    title: "اتاق 141",
  },
];

const dataSource = [
  {
    key: 1,
    id: 1,
    name: "مریم",
    family: "جعفری",
    nationalCode: "0030256523",
    mobile: "09121234253",
  },
  {
    key: 2,
    id: 2,
    name: "مریم",
    family: "جعفری",
    nationalCode: "0030256523",
    mobile: "09121234253",
  },
  {
    key: 3,
    id: 3,
    name: "مریم",
    family: "جعفری",
    nationalCode: "0030256523",
    mobile: "09121234253",
  },
];

const UniUser = () => {
  return (
    <div className="uni-user-content-container">
      <CustomCard padding={PADDING_40}>
        <CustomDivider text="جستجو کاربر" />
        <CustomTable
          dataSource={dataSource}
          columns={AllocationRoomModalModel()}
          rowSelection={{
            type: "checkbox",
          }}
          pagination={paginationConfig}
          {...TABLE_PROPS(dataSource?.length)}
        />
      </CustomCard>
      <Form className="uni-user-reservation-form">
        <CustomCard padding={PADDING_40} className="reservation-item-container">
          <CustomDivider text="زمان رزرو" />
          <Radio.Group className="radio-buttons-container">
            <div className="reservation-item">
              <CustomDivider text={<Radio value="daily">روزانه</Radio>} />
            </div>
            <div className="reservation-item">
              <CustomDivider text={<Radio value="monthly">ماهانه</Radio>} />
            </div>
            <div className="reservation-item">
              <CustomDivider text={<Radio value="termic">ترمیک</Radio>} />
            </div>
          </Radio.Group>
          <div className="inputs-container">
            <CustomInput type="text" label="از" name="start" hasVerticalLabel={false} />
            <CustomInput type="text" label="تا" name="end" hasVerticalLabel={false} />
            <Button type="primary" className="register-btn">
              ثبت
            </Button>
          </div>
        </CustomCard>
        <CustomCard padding={PADDING_40} className="price-item-container">
          <div className="price-item">
            <CustomDivider text={<div>تخفیف</div>} />
            <div className="action-container">
              <Switch />
              <CustomInput
                type="text"
                label="درصد:"
                name="percent"
                hasVerticalLabel={false}
              />
              <Button type="primary" className="register-btn">
                ثبت
              </Button>
            </div>
          </div>
          <div className="price-item">
            <CustomDivider text={<div>قیمت مستقل</div>} />
            <div className="action-container">
              <Switch />
              <CustomInput
                type="text"
                label="قیمت:"
                name="price"
                hasVerticalLabel={false}
              />
              <Button type="primary" className="register-btn">
                ثبت
              </Button>
            </div>
          </div>
          <div className="price-item">
            <CustomDivider text={<div> رزرو دربست</div>} />
            <div>
              <Switch />
            </div>
          </div>
        </CustomCard>
        <div className="discount-container">
          <div className="discount-header">
            <Button danger className="discount-header-button">
              حذف کامل
            </Button>
            <h3 className="discount-header-title">
              این فاکتور مطابق قوانین تعدیل قیمت، مشمول 25% تخفیف میباشد.
            </h3>
          </div>
          <div className="discount-lists-container">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="list">
                <Button danger type="text" className="list-action-btn">
                  حذف
                </Button>
                <div className="list-body">
                  <div className="list-body-item">
                    <span className="title">مقدار</span>
                    <span className="desc">25%</span>
                  </div>
                  <div className="list-body-item">
                    <span className="title">علت</span>
                    <span className="desc">کارشناسی ارشد</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <CustomCard padding={PADDING_40} className="factor-container">
          <CustomDivider text="پیش فاکتور و پیامک" />
          <div className="factor-body">
            <CustomDatePicker
              label="تاریخ مراجعه"
              // className="date-picker"
              placeholder="انتخاب کنید"
              name="datePicker"
              rules={[REQUIRED_RULE]}
            />
            <CustomInput
              type="text"
              label="قیمت نهایی فاکتور"
              name="factor-price"
              placeholder="4"
              disabled={true}
            />
            <CustomTextArea
              showCount={true}
              maxLength={100}
              label="پیام ارسالی"
              name="send-message"
              placeholder="پیام ارسالی"
              disabled={true}
            />
          </div>
        </CustomCard>
      </Form>
    </div>
  );
};

const IndependentUser = () => {
  return (
    <div className="independent-user-container">
      <Form className="independent-user-reservation-form">
        <CustomCard padding={PADDING_40} className="user-information">
          <CustomDivider text="اطلاعات کاربر" />
          <div className="inputs-container">
            <CustomInput
              type="text"
              label="شماره موبایل"
              name="mobile-number"
              placeholder="شماره موبایل"
            />
            <CustomInput
              type="text"
              label="کد ملی"
              name="national-number"
              placeholder="کد ملی"
            />
            <CustomSelect label="جنسیت" name="gender" options={[]} placeholder="پسر" />
          </div>
        </CustomCard>
        <CustomCard padding={PADDING_40} className="reservation-item-container">
          <CustomDivider text="زمان رزرو" />
          <Radio.Group className="radio-buttons-container">
            <div className="reservation-item">
              <Divider className="divider">
                <Radio value="daily">روزانه</Radio>
              </Divider>
            </div>
            <div className="reservation-item">
              <Divider className="divider">
                <Radio value="monthly">ماهانه</Radio>
              </Divider>
            </div>
            <div className="reservation-item">
              <Divider className="divider">
                <Radio value="termic">ترمیک</Radio>
              </Divider>
            </div>
          </Radio.Group>
          <div className="inputs-container">
            <CustomInput type="text" label="از" name="start" hasVerticalLabel={false} />
            <CustomInput type="text" label="تا" name="end" hasVerticalLabel={false} />
            <Button type="primary" className="register-btn">
              ثبت
            </Button>
          </div>
        </CustomCard>
        <CustomCard padding={PADDING_40} className="price-item-container">
          <div className="price-item">
            <Divider className="divider">
              <div>تخفیف</div>
            </Divider>
            <div className="action-container">
              <Switch />
              <CustomInput
                type="text"
                label="درصد:"
                name="percent"
                hasVerticalLabel={false}
              />
              <Button type="primary" className="register-btn">
                ثبت
              </Button>
            </div>
          </div>
          <div className="price-item">
            <Divider className="divider">
              <div>قیمت مستقل</div>
            </Divider>
            <div className="action-container">
              <Switch />
              <CustomInput
                type="text"
                label="قیمت:"
                name="price"
                hasVerticalLabel={false}
              />
              <Button type="primary" className="register-btn">
                ثبت
              </Button>
            </div>
          </div>
          <div className="price-item">
            <Divider className="divider">
              <div> رزرو دربست</div>
            </Divider>
            <div>
              <Switch />
            </div>
          </div>
        </CustomCard>
      </Form>
    </div>
  );
};

const tabItems = [
  {
    key: "uni-user",
    label: <div className="allocation-modal-tabs-label">کاربر یونی</div>,
    children: <UniUser />,
  },
  {
    key: "independent-user",
    label: <div className="allocation-modal-tabs-label">کاربر مستقل </div>,
    children: <IndependentUser />,
  },
];

const RoomAllocationModal = ({ isOpen, onCancel }: RoomAllocationModalProps) => {
  return (
    <>
      {isOpen && (
        <Modal
          title="تخصیص اتاق"
          open={isOpen}
          onCancel={onCancel}
          footer={null}
          className="room-allocation-modal-container"
          //   centered={true}
          bodyStyle={{ overflowY: "auto" }}
        >
          <div className="room-allocation-modal-content">
            <Breadcrumb items={breadCrumbItems} className="bread-crumb" />
            <Tabs items={tabItems} className="tabs-container" />
            <div className="room-allocation-action-container">
              <Button type="primary">رزرو و ارسال پیام</Button>
              <Button onClick={onCancel}>انصراف</Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default RoomAllocationModal;
