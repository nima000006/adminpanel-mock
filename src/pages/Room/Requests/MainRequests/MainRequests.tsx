import { useEffect, useState } from "react";

import { Form, Tabs } from "antd";
import { AiOutlinePlus } from "react-icons/ai";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { selectDefaultValueGenerator } from "@infra/helpers/utils";
import ManualRegisterStudentModalContent from "@pages/Dorm/Requests/helpers/components/ManualRegisterStudentModalContent/ManualRegisterStudentModalContent";
import { semestersOption } from "@pages/Room/_shared/lib/config";

import RoomActiveRequests from "../ActiveRequests/RoomActiveRequests";
import AllRequests from "../AllRequests/AllRequests";
import RoomConfirmedRequests from "../ConfirmedRequests/RoomConfirmedRequests";
import RoomDeliveredRequests from "../DeliveredRequests/DeliveredRequests";
import RoomPendingRequests from "../PendingRequests/RoomPendingRequests";
import RoomRejectedRequests from "../RejectedRequests/RoomRejectedRequests";
import RoomReturnedRequests from "../ReturnedRequests/ReturnedRequests";
import "./_RoomDormMainRequest.scss";

const RoomRequests = () => {
  const [isKeyUpdated, setIsKeyUpdated] = useState<1 | 2>(2);
  const [manualRegisterModal, setManualRegisterModal] = useState({
    isOpen: false,
  });
  const [semester, setSemester] = useState<
    "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8"
  >("8");

  const [form] = Form.useForm();

  const items = [
    {
      key: "1",
      label: "همه",
      children: <AllRequests semester={semester} />,
    },
    {
      key: "2",
      label: "درخواست فعال",
      children: <RoomActiveRequests semester={semester} />,
    },
    {
      key: "3",
      label: "در انتظار پرداخت",
      children: <RoomPendingRequests semester={semester} />,
    },
    {
      key: "4",
      label: "پرداخت شده",
      children: <RoomConfirmedRequests semester={semester} />,
    },
    {
      key: "5",
      label: "تحویل شده",
      children: <RoomDeliveredRequests semester={semester} />,
    },
    {
      key: "6",
      label: "رد شده",
      children: <RoomRejectedRequests semester={semester} />,
    },
    {
      key: "7",
      label: "عودت شده",
      children: <RoomReturnedRequests semester={semester} />,
    },
    // {
    //   key: "7",
    //   label: "جابه‌جایی",
    //   children: (
    //     <>
    //       <MovingRequests />
    //     </>
    //   ),
    // },
    // {
    //   key: "8",
    //   label: "انتقال",
    //   children: (
    //     <>
    //       <TransferRequests />
    //     </>
    //   ),
    // },
  ];

  //? ================================ Effects ================================
  useEffect(() => {
    form.setFieldsValue({ year: selectDefaultValueGenerator({ ...semestersOption[8] }) });
  }, []);

  //* ================================ Util Functions ================================
  const onManualRegisterButtonClick = () => {
    setManualRegisterModal({ isOpen: true });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      <ManualRegisterStudentModalContent
        manualRegisterModal={manualRegisterModal}
        setManualRegisterModal={setManualRegisterModal}
        setIsKeyUpdated={setIsKeyUpdated}
      />
      <Form className="register-btn-container" form={form}>
        <ToolBox
          leftSide={
            <div className="all-request-left-btn-actions">
              <CustomSelect
                options={semestersOption}
                name="year"
                form={form}
                placeholder="نیمسال تحصیلی را انتخاب فرمائید"
                onChange={(value: any) => setSemester(value)}
                className="main-request-semester-select"
                hasVerticalLabel={false}
              />
            </div>
          }
          rightSide={
            <CustomButton type="primary" onClick={onManualRegisterButtonClick}>
              ثبت نام دستی دانشجو
              <AiOutlinePlus className="add-dorm-btn-icon" />
            </CustomButton>
          }
        />
      </Form>

      <Tabs
        defaultActiveKey="1"
        items={items}
        // onChange={onChange}
        className="room-reqs-tab-container"
        destroyInactiveTabPane={true}
        key={isKeyUpdated}
      />
    </>
  );
};

export default RoomRequests;
