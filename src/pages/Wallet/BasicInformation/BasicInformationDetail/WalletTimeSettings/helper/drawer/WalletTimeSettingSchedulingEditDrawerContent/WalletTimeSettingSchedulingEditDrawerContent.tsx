import { useState } from "react";

import { Col, Form, Row } from "antd";
import dayjs from "dayjs";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomRadioGroup from "@components/CustomInputs/CustomRadioGroup/CustomRadioGroup";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import { noticesTypeData } from "@pages/Wallet/BasicInformation/BasicInformationDetail/_shared/utils";

import TimeRangePickerComponent from "./helper/component/TimeRangePickerComponent/TimeRangePickerComponent";
import "./_walletTimeSettingSchedulingEditDrawerContent.scss";

const mockData = [
  {
    id: 1,
    day: "شنبه ها",
    startTime: dayjs("12:08:23", "HH:mm:ss"),
    endTime: dayjs("12:08:23", "HH:mm:ss"),
  },
  {
    id: 2,
    day: "یکشنبه ها",
    startTime: dayjs("12:08:23", "HH:mm:ss"),
    endTime: dayjs("12:08:23", "HH:mm:ss"),
  },
  {
    id: 3,
    day: "دوشنبه ها",
    startTime: dayjs("12:08:23", "HH:mm:ss"),
    endTime: dayjs("12:08:23", "HH:mm:ss"),
  },
  {
    id: 4,
    day: "سه شنبه ها",
    startTime: dayjs("12:08:23", "HH:mm:ss"),
    endTime: dayjs("12:08:23", "HH:mm:ss"),
  },
  {
    id: 5,
    day: "چهارشنبه ها",
    startTime: dayjs("12:08:23", "HH:mm:ss"),
    endTime: dayjs("12:08:23", "HH:mm:ss"),
  },
  {
    id: 6,
    day: "پنج شنبه ها",
    startTime: dayjs("12:08:23", "HH:mm:ss"),
    endTime: dayjs("12:08:23", "HH:mm:ss"),
  },
  {
    id: 7,
    day: "جمعه ها",
    startTime: dayjs("12:08:23", "HH:mm:ss"),
    endTime: dayjs("12:08:23", "HH:mm:ss"),
  },
  {
    id: 8,
    day: "روزهای تعطیل",
    startTime: dayjs("12:08:23", "HH:mm:ss"),
    endTime: dayjs("12:08:23", "HH:mm:ss"),
  },
];

const WalletTimeSettingSchedulingEditDrawerContent = ({
  closeDrawerHandler,
}: {
  closeDrawerHandler: () => void;
}) => {
  const [selected, setSelected] = useState(1);
  const changeBtnHandler = () => {};

  return (
    <div className="wallet-time-setting-scheduling-edit-drawer-content-container">
      <CustomDrawerHeader
        title="ویرایش زمان‌بندی مجاز تراکنش‌ها"
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <div className="drawer-action-btns-wrapper">
            <CustomButton onClick={closeDrawerHandler} className="drawer-action-btn">
              انصراف
            </CustomButton>
            <CustomButton
              type="primary"
              onClick={changeBtnHandler}
              className="drawer-action-btn"
              htmlType="submit"
              //   loading={}
            >
              ثبت تغییرات
            </CustomButton>
          </div>
        }
      />
      <Form className="form-content">
        <Row gutter={[16, 16]}>
          {mockData?.map((item) => {
            return (
              <Col lg={12} md={12} sm={12} xs={12}>
                <TimeRangePickerComponent
                  id={item.id}
                  day={item.day}
                  startTime={item.startTime}
                  endTime={item.endTime}
                />
              </Col>
            );
          })}
        </Row>

        <CustomRadioGroup
          name="notificationSendingType"
          hasVerticalLabel={true}
          options={noticesTypeData?.data.map((item) => ({
            label: (
              <div className="custom-radio-content">
                <div className="radio-title">{item.title}</div>
                <div className="radio-desc">{item.desc}</div>
              </div>
            ),
            value: item.id,
          }))}
          // optionType="default"
          onChange={(e) => setSelected(e.target.value)}
          value={selected}
        />
      </Form>
    </div>
  );
};
export default WalletTimeSettingSchedulingEditDrawerContent;
