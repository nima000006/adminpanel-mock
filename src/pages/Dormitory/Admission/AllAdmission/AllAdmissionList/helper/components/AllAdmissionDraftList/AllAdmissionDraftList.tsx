import { Dropdown, MenuProps } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

import { CustomButton } from "@components/CustomInputs";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import useQueryParams from "@infra/hooks/useQueryParams";
import { AllAdmissionDraftListItem } from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionList/helper/components/AllAdmissionDraftList/@types/@allAdmissionDraftList";
import AllAdmissionDraftListTableModel from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionList/helper/components/AllAdmissionDraftList/helper/model/AllAdmissionDraftListTableModel";

const exportMenu: MenuProps = {
  items: [
    {
      label: "خروجی Excel",
      key: "excel",
    },
    {
      label: "خروجی PDF",
      key: "pdf",
    },
  ],
};

const mockData: AllAdmissionDraftListItem[] = [
  {
    id: 1,
    programTitle: "برنامه پذیرش تابستان ۱۴۰۵",
    residence: "خوابگاه شهید بهشتی",
    business: "دانشگاه آزاد اسلامی",
    branch: "تهران جنوب",
    managementType: "خودگردان",
    creator: "مجید سیانکی",
    createDate: "2024-04-21T20:20:00",
  },
  {
    id: 2,
    programTitle: "برنامه پذیرش تابستان ۱۴۰۵",
    residence: "خوابگاه شهید بهشتی",
    business: "دانشگاه آزاد اسلامی",
    branch: "تهران جنوب",
    managementType: "خودگردان",
    creator: "نیلوفر صارمی",
    createDate: "2024-04-21T20:20:00",
  },
  {
    id: 3,
    programTitle: "برنامه پذیرش تابستان ۱۴۰۵",
    residence: "خوابگاه شهید بهشتی",
    business: "دانشگاه آزاد اسلامی",
    branch: "تهران جنوب",
    managementType: "خودگردان",
    creator: "نیلوفر صارمی",
    createDate: "2024-04-21T20:20:00",
  },
  {
    id: 4,
    programTitle: "برنامه پذیرش تابستان ۱۴۰۵",
    residence: "خوابگاه شهید بهشتی",
    business: "دانشگاه آزاد اسلامی",
    branch: "تهران جنوب",
    managementType: "خودگردان",
    creator: "مجید سیانکی",
    createDate: "2024-04-23T14:30:00",
  },
];

const AllAdmissionDraftList = () => {
  const { params: url } = useQueryParams();

  //* ================================ Util Functions ================================
  const continueAdmissionHandler = (_id: number) => {};

  const deleteAdmissionHandler = (_id: number) => {};

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex flex-col gap-4">
      <ToolBox
        rightSide={
          <div className="flex flex-wrap gap-3">
            <CustomButton icon={<AiOutlineFilter />} disabled>
              فیلتر پیشرفته
            </CustomButton>
          </div>
        }
        leftSide={
          <Dropdown menu={exportMenu} trigger={["click"]}>
            <CustomButton disabled icon={<IoIosArrowDown />} iconPlacement="end">
              خروجی
            </CustomButton>
          </Dropdown>
        }
      />

      <CustomTable<AllAdmissionDraftListItem>
        dataSource={mockData}
        loading={false}
        columns={AllAdmissionDraftListTableModel({
          onContinue: continueAdmissionHandler,
          onDelete: deleteAdmissionHandler,
        })}
        rowKey="id"
        draggableColumns
        draggableId={ExcelCodes.DORMITORY_ALL_ADMISSION_DRAFT_LIST_TABLE}
        pagination={paginationConfig}
        key={`table-${url?.pageSize || "8"}`}
      />
    </div>
  );
};

export default AllAdmissionDraftList;
