import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import { ExcelCodes } from "@infra/config/excel-codes";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import useQueryParams from "@infra/hooks/useQueryParams";
import { MyAdmissionDraftListItem } from "@pages/Dormitory/Admission/MyAdmission/MyAdmissionList/helper/components/MyAdmissionDraftList/@types/@myAdmissionDraftList";
import MyAdmissionDraftListTableModel from "@pages/Dormitory/Admission/MyAdmission/MyAdmissionList/helper/components/MyAdmissionDraftList/helper/model/MyAdmissionDraftListTableModel";

const mockData: MyAdmissionDraftListItem[] = [
  {
    id: 1,
    programTitle: "برنامه پذیرش تابستان ۱۴۰۵",
    residence: "خوابگاه شهید بهشتی",
    branch: "تهران جنوب",
    managementType: "خودگردان",
    creator: "مجید سیانکی",
    createDate: "2024-04-21T20:20:00",
  },
  {
    id: 2,
    programTitle: "برنامه پذیرش تابستان ۱۴۰۵",
    residence: "خوابگاه شهید بهشتی",
    branch: "تهران جنوب",
    managementType: "خودگردان",
    creator: "نیلوفر صارمی",
    createDate: "2024-04-21T20:20:00",
  },
  {
    id: 3,
    programTitle: "برنامه پذیرش تابستان ۱۴۰۵",
    residence: "خوابگاه شهید بهشتی",
    branch: "تهران جنوب",
    managementType: "خودگردان",
    creator: "نیلوفر صارمی",
    createDate: "2024-04-21T20:20:00",
  },
  {
    id: 4,
    programTitle: "برنامه پذیرش تابستان ۱۴۰۵",
    residence: "خوابگاه شهید بهشتی",
    branch: "تهران جنوب",
    managementType: "خودگردان",
    creator: "مجید سیانکی",
    createDate: "2024-04-21T20:20:00",
  },
  {
    id: 5,
    programTitle: "برنامه پذیرش تابستان ۱۴۰۵",
    residence: "خوابگاه شهید بهشتی",
    branch: "تهران جنوب",
    managementType: "خودگردان",
    creator: "مجید سیانکی",
    createDate: "2024-04-21T20:20:00",
  },
  {
    id: 6,
    programTitle: "برنامه پذیرش تابستان ۱۴۰۵",
    residence: "خوابگاه شهید بهشتی",
    branch: "تهران جنوب",
    managementType: "خودگردان",
    creator: "مجید سیانکی",
    createDate: "2024-04-21T20:20:00",
  },
  {
    id: 7,
    programTitle: "برنامه پذیرش تابستان ۱۴۰۵",
    residence: "خوابگاه شهید بهشتی",
    branch: "تهران جنوب",
    managementType: "خودگردان",
    creator: "مجید سیانکی",
    createDate: "2024-04-21T20:20:00",
  },
  {
    id: 8,
    programTitle: "برنامه پذیرش تابستان ۱۴۰۵",
    residence: "خوابگاه شهید بهشتی",
    branch: "تهران جنوب",
    managementType: "خودگردان",
    creator: "مجید سیانکی",
    createDate: "2024-04-21T20:20:00",
  },
  {
    id: 9,
    programTitle: "برنامه پذیرش تابستان ۱۴۰۵",
    residence: "خوابگاه شهید بهشتی",
    branch: "تهران جنوب",
    managementType: "خودگردان",
    creator: "مجید سیانکی",
    createDate: "2024-04-21T20:20:00",
  },
  {
    id: 10,
    programTitle: "برنامه پذیرش تابستان ۱۴۰۵",
    residence: "خوابگاه شهید بهشتی",
    branch: "تهران جنوب",
    managementType: "خودگردان",
    creator: "مجید سیانکی",
    createDate: "2024-04-21T20:20:00",
  },
];

const MyAdmissionDraftList = () => {
  const { params: url } = useQueryParams();

  //* ================================ Util Functions ================================
  const continueAdmissionHandler = (_id: number) => {};

  const deleteAdmissionHandler = (_id: number) => {};

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex flex-col gap-4">
      <CustomTable<MyAdmissionDraftListItem>
        dataSource={mockData}
        loading={false}
        columns={MyAdmissionDraftListTableModel({
          onContinue: continueAdmissionHandler,
          onDelete: deleteAdmissionHandler,
        })}
        rowKey="id"
        draggableColumns
        draggableId={ExcelCodes.DORMITORY_MY_ADMISSION_DRAFT_LIST_TABLE}
        pagination={paginationConfig}
        key={`table-${url?.pageSize || "8"}`}
      />
    </div>
  );
};

export default MyAdmissionDraftList;
