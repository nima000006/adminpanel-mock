import { useState } from "react";

import { Dropdown, Form, MenuProps } from "antd";
import { AiOutlineClose, AiOutlineFilter } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { PiFilePdf, PiFileXls } from "react-icons/pi";
import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { TICKETING_BASIC_INFO_LIST_PAGE_ROUTE } from "@infra/router/routes/ticketing";

import { AgentListType } from "./@types/@AgentListType";
import AddAgentDrawerContent from "./helper/components/AddAgentDrawerContent/AddAgentDrawerContent";
import EditAgentDrawerContent from "./helper/components/EditAgentDrawerContent/EditAgentDrawerContent";
import useAgentAdvanceFilter from "./helper/hooks/useAgentAdvanceFilter";
import AgentTableModel from "./helper/models/AgentTableModel/AgentTableModel";
import "./_agent.scss";

const dataSource: AgentListType[] = [
  {
    id: 1,
    name: "سینا",
    lastName: "سوجه",
    service: ["FOOD", "ROOM", "INSURANCE"],
    subjectIssue: [
      "مشکل در ثبت سفارش غذا",
      "مشکل در پرداخت آنلاین",
      "مشکلات مربوط به تحویل کارت دانشجویی",
    ],
    internationalCode: "1234567890",
    personalCode: "1234567890",
    mobilePhone: "09121234567",
    business: "دانشگاه آزاد",
    branch: "واحد تهران جنوب",
  },
  {
    id: 2,
    name: "سینا",
    lastName: "سوجه",
    service: [],
    subjectIssue: [
      "مشکل در ثبت سفارش غذا",
      "مشکل در پرداخت آنلاین",
      "مشکلات مربوط به تحویل کارت دانشجویی",
    ],
    internationalCode: "1234567890",
    personalCode: "1234567890",
    mobilePhone: "09121234567",
    business: "دانشگاه آزاد",
    branch: "واحد تهران جنوب",
  },
  {
    id: 3,
    name: "سینا",
    lastName: "سوجه",
    service: ["FOOD", "ROOM", "INSURANCE"],
    subjectIssue: [],
    internationalCode: "1234567890",
    personalCode: "1234567890",
    mobilePhone: "09121234567",
    business: "دانشگاه آزاد",
    branch: "واحد تهران جنوب",
  },
  {
    id: 4,
    name: "سینا",
    lastName: "سوجه",
    service: [],
    subjectIssue: [],
    internationalCode: "1234567890",
    personalCode: "1234567890",
    mobilePhone: "09121234567",
    business: "دانشگاه آزاد",
    branch: "واحد تهران جنوب",
  },
  {
    id: 5,
    name: "سینا",
    lastName: "سوجه",
    service: ["FOOD", "ROOM", "INSURANCE"],
    subjectIssue: [
      "مشکل در ثبت سفارش غذا",
      "مشکل در پرداخت آنلاین",
      "مشکلات مربوط به تحویل کارت دانشجویی",
    ],
    internationalCode: "1234567890",
    personalCode: "1234567890",
    mobilePhone: "09121234567",
    business: "دانشگاه آزاد",
    branch: "واحد تهران جنوب",
  },
  {
    id: 6,
    name: "سینا",
    lastName: "سوجه",
    service: ["FOOD", "ROOM", "INSURANCE"],
    subjectIssue: [
      "مشکل در ثبت سفارش غذا",
      "مشکل در پرداخت آنلاین",
      "مشکلات مربوط به تحویل کارت دانشجویی",
    ],
    internationalCode: "1234567890",
    personalCode: "1234567890",
    mobilePhone: "09121234567",
    business: "دانشگاه آزاد",
    branch: "واحد تهران جنوب",
  },
  {
    id: 7,
    name: "سینا",
    lastName: "سوجه",
    service: ["FOOD", "ROOM", "INSURANCE"],
    subjectIssue: [
      "مشکل در ثبت سفارش غذا",
      "مشکل در پرداخت آنلاین",
      "مشکلات مربوط به تحویل کارت دانشجویی",
    ],
    internationalCode: "1234567890",
    personalCode: "1234567890",
    mobilePhone: "09121234567",
    business: "دانشگاه آزاد",
    branch: "واحد تهران جنوب",
  },
  {
    id: 8,
    name: "سینا",
    lastName: "سوجه",
    service: ["FOOD", "ROOM", "INSURANCE"],
    subjectIssue: [
      "مشکل در ثبت سفارش غذا",
      "مشکل در پرداخت آنلاین",
      "مشکلات مربوط به تحویل کارت دانشجویی",
    ],
    internationalCode: "1234567890",
    personalCode: "1234567890",
    mobilePhone: "09121234567",
    business: "دانشگاه آزاد",
    branch: "واحد تهران جنوب",
  },
  {
    id: 9,
    name: "سینا",
    lastName: "سوجه",
    service: ["FOOD", "ROOM", "INSURANCE"],
    subjectIssue: [
      "مشکل در ثبت سفارش غذا",
      "مشکل در پرداخت آنلاین",
      "مشکلات مربوط به تحویل کارت دانشجویی",
    ],
    internationalCode: "1234567890",
    personalCode: "1234567890",
    mobilePhone: "09121234567",
    business: "دانشگاه آزاد",
    branch: "واحد تهران جنوب",
  },
];

const exportMenu: MenuProps = {
  items: [
    {
      label: (
        <span className="flex items-center gap-2">
          <PiFileXls />
          خروجی Excel
        </span>
      ),
      key: "excel",
    },
    {
      label: (
        <span className="flex items-center gap-2">
          <PiFilePdf />
          خروجی PDF
        </span>
      ),
      key: "pdf",
    },
  ],
};

const Agent = () => {
  useTitle({
    breadcrumbItems: [
      { title: <Link to={TICKETING_BASIC_INFO_LIST_PAGE_ROUTE}>کارشناسان</Link> },
      {
        title: "اطلاعات پایه",
      },
    ],
  });

  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);
  const [addAgentDrawer, setAddAgentDrawer] = useState(false);
  const [editAgentDrawer, setEditAgentDrawer] = useState(false);
  const { params, setSearchParams } = useQueryParams();

  const [badgeCount, setBadgeCount] = useState(() => {
    return params?.badger ?? 0;
  });

  const [form] = Form.useForm();
  const { filterItemsList } = useAgentAdvanceFilter();

  //* ================================ Util Functions ================================
  const editAgentHandler = (id: number) => {
    setSearchParams({ ...params, editAgentId: id.toString() });
    setEditAgentDrawer(true);
  };

  const editRecord = dataSource.find(
    (item) => item.id.toString() === params?.editAgentId
  );

  const closeEditAgentDrawer = () => {
    const { editAgentId, ...restParams } = params;
    setSearchParams(restParams);
    setEditAgentDrawer(false);
  };

  const closeAddAgentDrawer = () => {
    const { addAgentId, ...restParams } = params;
    setSearchParams(restParams);
    setAddAgentDrawer(false);
  };

  const openAddAgentDrawer = (id: number) => {
    setSearchParams({ ...params, addAgentId: id.toString() });
    setAddAgentDrawer(true);
  };

  const openAdvanceFilter = () => setIsAdvanceModalOpen(true);
  const closeAdvanceFilter = () => {
    setIsAdvanceModalOpen(false);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <>
      {isAdvanceModalOpen && (
        <AdvanceFilterModal
          isModalOpen={isAdvanceModalOpen}
          closeModalHandler={closeAdvanceFilter}
          filterItemsList={filterItemsList}
          badgeCounter={(amount) => setBadgeCount(amount.toString())}
          defaultParams={params}
          form={form}
        />
      )}
      {addAgentDrawer && (
        <CustomDrawer
          content={<AddAgentDrawerContent closeDrawer={closeAddAgentDrawer} />}
          open={addAgentDrawer}
          closeIcon={<AiOutlineClose />}
          onClose={closeAddAgentDrawer}
        />
      )}
      {editAgentDrawer && (
        <CustomDrawer
          content={
            <EditAgentDrawerContent
              closeDrawer={closeEditAgentDrawer}
              record={editRecord!}
            />
          }
          open={editAgentDrawer}
          closeIcon={<AiOutlineClose />}
          onClose={closeEditAgentDrawer}
        />
      )}
      <div className="ticketing-agent-container">
        <ToolBox
          className="mb-4"
          rightSide={
            <CustomBadge count={badgeCount}>
              <CustomButton icon={<AiOutlineFilter />} onClick={openAdvanceFilter}>
                فیلتر پیشرفته
              </CustomButton>
            </CustomBadge>
          }
          leftSide={
            <Dropdown menu={exportMenu} trigger={["click"]}>
              <CustomButton disabled>
                خروجی <IoIosArrowDown />
              </CustomButton>
            </Dropdown>
          }
        />
        <CustomTable<AgentListType>
          dataSource={dataSource}
          rowKey="id"
          columns={AgentTableModel({
            onEditClick: editAgentHandler,
            onAddClick: openAddAgentDrawer,
          })}
          key={`table-${dataSource?.length || "8"} `}
        />
      </div>
    </>
  );
};

export default Agent;
