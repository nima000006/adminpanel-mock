import { useEffect, useState } from "react";

import { Form, Tabs } from "antd";

import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { selectDefaultValueGenerator } from "@infra/helpers/utils";
import { semestersOption } from "@pages/Room/_shared/lib/config";

import ActiveDormReportRequests from "../ActiveDormReportRequests/ActiveDormReportRequests";
import AllDormReportRequests from "../AllDormReportRequests/AllDormReportRequests";
import DormReportConfirmedRequests from "../DormReportConfirmedRequests/DormReportConfirmedRequests";
import DormReportDeliveredRequests from "../DormReportDeliveredRequests/DormReportDeliveredRequests";
import DormReportPendingRequests from "../DormReportPendingRequests/DormReportPendingRequests";
import DormReportRejectedRequests from "../DormReportRejectedRequests/DormReportRejectedRequests";

import "./_RoomDormMainRequest.scss";

const MainDormReportRequests = () => {
  const [semester, setSemester] = useState<
    "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8"
  >("8");

  const [form] = Form.useForm();

  //? ================================ Initial Request ================================

  useEffect(() => {
    form.setFieldsValue({
      year: selectDefaultValueGenerator({ ...semestersOption[8] }),
    });
  }, []);
  //
  const items = [
    {
      key: "1",
      label: "همه",
      children: <AllDormReportRequests semester={semester} />,
    },
    {
      key: "2",
      label: "درخواست فعال",
      children: <ActiveDormReportRequests semester={semester} />,
    },
    {
      key: "3",
      label: "در انتظار پرداخت",
      children: <DormReportPendingRequests semester={semester} />,
    },
    {
      key: "4",
      label: "پرداخت شده",
      children: <DormReportConfirmedRequests semester={semester} />,
    },
    {
      key: "5",
      label: "تحویل شده",
      children: <DormReportDeliveredRequests semester={semester} />,
    },
    {
      key: "6",
      label: "رد شده",
      children: <DormReportRejectedRequests semester={semester} />,
    },
    // {
    //   key: "7",
    //   label: "جابه‌جایی",
    //   children: (
    //     <>
    //       <DormReportMovingRequests />
    //     </>
    //   ),
    // },
    // {
    //   key: "8",
    //   label: "انتقال",
    //   children: (
    //     <>
    //       <DormReportTransferRequests />
    //     </>
    //   ),
    // },
  ];
  return (
    <Form form={form}>
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
      />
      <Tabs
        defaultActiveKey="1"
        items={items}
        // onChange={onChange}
        className="room-reqs-tab-container"
        destroyInactiveTabPane={true}
      />
    </Form>
  );
};

export default MainDormReportRequests;
