import { Tabs, TabsProps } from "antd";

import AllStudentRequests from "./helper/components/AllStudentRequests/AllStudentRequests";
import DeliveredFinalRequests from "./helper/components/DeliveredFinalRequests/DeliveredFinalRequests";
import DeliveredToPostRequests from "./helper/components/DeliveredToPostRequests/DeliveredToPostRequests";
import DeliveredToStudentRequests from "./helper/components/DeliveredToStudentRequests/DeliveredToStudentRequests";
import LostRequests from "./helper/components/LostRequests/LostRequests";
import PacketGettingReadyRequests from "./helper/components/PacketGettingReadyRequests/PacketGettingReadyRequests";
import PrintSuccessRequests from "./helper/components/PrintSuccessRequests/PrintSuccessRequests";
import ReadyToDeliverRequests from "./helper/components/ReadyToDeliverRequests/ReadyToDeliverRequests";
import ReadyToPostRequests from "./helper/components/ReadyToPostRequests/ReadyToPostRequests";
import ReadyToPrintRequests from "./helper/components/ReadyToPrintRequests/ReadyToPrintRequests";
import ReturnedRequests from "./helper/components/ReturnedRequests/ReturnedRequests";
import useTitle from "../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import {
  ALL,
  DELIVERED_FINAL,
  DELIVERED_TO_POST,
  DELIVERED_TO_STUDENT,
  LOST,
  PACKET_GETTING_READY,
  PRINT_SUCCESS,
  READY_TO_DELIVER,
  READY_TO_POST,
  READY_TO_PRINT,
  RETURNED,
} from "../../infrastructure/models/studentStatus";
import "./_studentHome.scss";

const StudentHome = () => {
  useTitle({ text: "لیست درخواست‌های کارت دانشجویی" });

  // const [currentTab, setCurrentTab] = useState<StudentTableTypes>(ALL);
  // const { resetTableSelectorHookStates } = UseTableSelector({ tableType: currentTab });

  // const onTabsChange = (tabName: StudentTableTypes) => {
  //   setCurrentTab(tabName);
  //   resetTableSelectorHookStates();
  // };

  const items: TabsProps["items"] = [
    {
      key: ALL,
      label: <div className="tabs-label">همه</div>,
      children: (
        <div className="table-container">
          <AllStudentRequests />
        </div>
      ),
    },
    {
      key: READY_TO_PRINT,
      label: <div className="tabs-label">آماده چاپ</div>,
      children: (
        <div className="table-container">
          <ReadyToPrintRequests />
        </div>
      ),
    },
    {
      key: PRINT_SUCCESS,
      label: <div className="tabs-label">چاپ موفق</div>,
      children: (
        <div className="table-container">
          <PrintSuccessRequests />
        </div>
      ),
    },
    {
      key: READY_TO_DELIVER,
      label: <div className="tabs-label">آماده تحویل</div>,
      children: (
        <div className="table-container">
          <ReadyToDeliverRequests />
        </div>
      ),
    },
    {
      key: DELIVERED_TO_STUDENT,
      label: <div className="tabs-label">تحویل به دانشجو</div>,
      children: (
        <div className="table-container">
          <DeliveredToStudentRequests />
        </div>
      ),
    },
    {
      key: PACKET_GETTING_READY,
      label: <div className="tabs-label">آماده سازی پاکت</div>,
      children: (
        <div className="table-container">
          <PacketGettingReadyRequests />
        </div>
      ),
    },
    {
      key: READY_TO_POST,
      label: <div className="tabs-label">آماده ارسال به پست</div>,
      children: (
        <div className="table-container">
          <ReadyToPostRequests />
        </div>
      ),
    },
    {
      key: DELIVERED_TO_POST,
      label: <div className="tabs-label">تحویل شده به پست</div>,
      children: (
        <div className="table-container">
          <DeliveredToPostRequests />
        </div>
      ),
    },
    {
      key: DELIVERED_FINAL,
      label: <div className="tabs-label">تایید نهایی تحویل</div>,
      children: (
        <div className="table-container">
          <DeliveredFinalRequests />
        </div>
      ),
    },
    {
      key: RETURNED,
      label: <div className="tabs-label">عودت شده</div>,
      children: (
        <div className="table-container">
          <ReturnedRequests />
        </div>
      ),
    },
    {
      key: LOST,
      label: <div className="tabs-label">مفقود شده</div>,
      children: (
        <div className="table-container">
          <LostRequests />
        </div>
      ),
    },
  ];
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="home-main-container">
      <div className="student-top-bar-container">
        <div className="tabs-container">
          <Tabs
            defaultActiveKey={ALL}
            items={items}
            // onChange={(e) => onTabsChange(e as StudentTableTypes)}
            dir="rtl"
            destroyOnHidden
          />
        </div>
      </div>

      {/* <div className="search-boxes-container">
          <Search placeholder="جستجو" onSearch={onSearch} enterButton size="large" />
          <Button type="primary" icon={<AiOutlineFilter />} size="large">
            فیلتر پیشرفته
          </Button>
        </div> */}
      {/* <div className="chips-container">
          <>
            <Dropdown menu={typeOfSendingMenuProps} trigger={["click"]}>
              <Button
                style={{
                  borderRadius: "20px",
                  border:
                    typeOfSendingLabel === "0" || typeOfSendingLabel === "1"
                      ? "1px solid #0500FF"
                      : "",
                  backgroundColor:
                    typeOfSendingLabel === "0" || typeOfSendingLabel === "1"
                      ? "#D7E7FF"
                      : "",
                }}
              >
                <Space style={{ color: "#7a7a7a" }}>
                  {(typeOfSendingLabel === "0" || typeOfSendingLabel === "1") && (
                    <AiOutlineClose
                      style={{ fontSize: "10px", color: BLUE_01 }}
                      onClick={() => {
                        setTypeOfSendingLabel("");
                      }}
                    />
                  )}
                  <div
                    style={{
                      color:
                        typeOfSendingLabel === "0" || typeOfSendingLabel === "1"
                          ? "#0B59CF"
                          : "",
                    }}
                  >
                    {typeOfSendingLabel === "0"
                      ? "دریافت پستی"
                      : typeOfSendingLabel === "1"
                      ? "دریافت حضوری"
                      : "نحوه ارسال"}
                  </div>

                  {typeOfSendingLabel !== "0" && typeOfSendingLabel !== "1" && (
                    <IoIosArrowDown />
                  )}
                </Space>
              </Button>
            </Dropdown>
          </>
        </div> */}
    </div>
  );
};

export default StudentHome;
