import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import paginationConfig from "../../../../infrastructure/helpers/TableHelpers/config/tableConfig";
import { ContactInfoModel } from "../../../../infrastructure/models/tableModels/RoomTableModel/RoomTimingStudentInfoModel/ContactInfoModel";
import { DormitoryRecordsModel } from "../../../../infrastructure/models/tableModels/RoomTableModel/RoomTimingStudentInfoModel/DormitoryRecordsModel";
import { FactorsModel } from "../../../../infrastructure/models/tableModels/RoomTableModel/RoomTimingStudentInfoModel/FactorsModel";
import { LeaveRecordsModel } from "../../../../infrastructure/models/tableModels/RoomTableModel/RoomTimingStudentInfoModel/LeaveRecordsModel";
import { StudentInfoModel } from "../../../../infrastructure/models/tableModels/RoomTableModel/RoomTimingStudentInfoModel/StudentInfoModel";
import { TicketsModel } from "../../../../infrastructure/models/tableModels/RoomTableModel/RoomTimingStudentInfoModel/TicketsModels";
import CustomInput from "../../../CustomInputs/CustomInput/CustomInput";
import CustomDivider from "../../../Renderers/CustomDivider/CustomDivider";
import "./_studentInfoTables.scss";

//StudentInfoTable component
type dataSourceTypeArray = {
  key: number;
  id: number;
  firstName: string;
  lastName: string;
  nationalCode: string;
  studentNumber: string;
  uniName: string;
  College: string;
  field: string;
  EntrySemester: string;
  statusLastSemester: string;
};

export const StudentInfoTable = () => {
  const dataSource: dataSourceTypeArray[] = [
    {
      key: 1,
      id: 1,
      firstName: "سحر",
      lastName: "محمودی",
      nationalCode: "986233972",
      studentNumber: "986233972",
      uniName: "تهران جنوب",
      College: "مدیریت",
      field: "حسابداری",
      EntrySemester: "1399-2",
      statusLastSemester: "قبول",
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="room-student-info-container">
      <CustomDivider text=" اطلاعات دانشجو" />
      <CustomTable
        dataSource={dataSource}
        columns={StudentInfoModel}
        {...TABLE_PROPS(dataSource?.length)}
        // loading={historyPaymentsIsLoading}
        className="leave-request-table"
      />
    </div>
  );
};

//DormitoryRecordsTable component
type typeArrayDormitoryRecords = {
  key: number;
  id: number;
  dormitory: string;
  typeOfStay: string;
  startDate: string;
  endDate: string;
  price: number;
};

export const DormitoryRecordsTable = () => {
  const dataSource: typeArrayDormitoryRecords[] = [
    {
      key: 1,
      id: 1,
      dormitory: "نام خوابگاه",
      typeOfStay: "ماهانه",
      startDate: "2024-02-04",
      endDate: "2024-02-04",
      price: 200000,
    },
    {
      key: 2,
      id: 1,
      dormitory: "نام خوابگاه",
      typeOfStay: "ماهانه",
      startDate: "2024-02-04",
      endDate: "2024-02-04",
      price: 200000,
    },
    {
      key: 3,
      id: 1,
      dormitory: "نام خوابگاه",
      typeOfStay: "ماهانه",
      startDate: "2024-02-04",
      endDate: "2024-02-04",
      price: 200000,
    },
    {
      key: 4,
      id: 1,
      dormitory: "نام خوابگاه",
      typeOfStay: "ترمیک",
      startDate: "2024-02-04",
      endDate: "2024-02-04",
      price: 200000,
    },
  ];

  return (
    <div className="dormitory-records-container">
      <CustomDivider text=" سوابق خوابگاه" />
      <CustomTable
        dataSource={dataSource}
        columns={DormitoryRecordsModel()}
        pagination={paginationConfig}
        {...TABLE_PROPS(dataSource?.length)}
        // loading={historyPaymentsIsLoading}
        className="dormitory-records-table"
      />
    </div>
  );
};

// Factor component
type typeArrayFactor = {
  key: number;
  id: number;
  paymentType: string;
  price: number;
  dueDate: string;
  paymentDate: string;
  status: string;
  dormitory: string;
};

export const FactorTable = () => {
  const dataSource: typeArrayFactor[] = [
    {
      key: 1,
      id: 1,
      paymentType: "قسط 3",
      price: 200000,
      dueDate: "2024-02-04",
      paymentDate: "2024-02-04",
      status: "پرداخت شده",
      dormitory: "نام خوابگاه",
    },
    {
      key: 2,
      id: 1,
      paymentType: "قسط 3",
      price: 200000,
      dueDate: "2024-02-04",
      paymentDate: "2024-02-04",
      status: "پرداخت شده",
      dormitory: "نام خوابگاه",
    },
    {
      key: 3,
      id: 1,
      paymentType: "قسط 3",
      price: 200000,
      dueDate: "2024-02-04",
      paymentDate: "2024-02-04",
      status: "پرداخت شده",
      dormitory: "نام خوابگاه",
    },
    {
      key: 4,
      id: 1,
      paymentType: "قسط 3",
      price: 200000,
      dueDate: "2024-02-04",
      paymentDate: "2024-02-04",
      status: "پرداخت شده",
      dormitory: "نام خوابگاه",
    },
    {
      key: 5,
      id: 1,
      paymentType: "قسط 3",
      price: 200000,
      dueDate: "2024-02-04",
      paymentDate: "2024-02-04",
      status: "انتظار پرداخت",
      dormitory: "نام خوابگاه",
    },
  ];

  return (
    <div className="factor-container">
      <CustomDivider text=" فاکتورها" />
      <CustomTable
        dataSource={dataSource}
        columns={FactorsModel()}
        pagination={paginationConfig}
        {...TABLE_PROPS(dataSource?.length)}
        // loading={historyPaymentsIsLoading}
        className="factor-table"
      />
    </div>
  );
};

//Tickets component
type typeArrayTickets = {
  key: number;
  id: number;
  ticketNumber: string;
  title: string;
  status: string;
  serviceName: string;
  type: string;
  registerDate: string;
};

export const TicketsTable = () => {
  const dataSource: typeArrayTickets[] = [
    {
      key: 1,
      id: 1,
      ticketNumber: "2730175548",
      title: "غذای بد",
      status: "پاسخ داده شده",
      serviceName: "فود",
      type: "فنی",
      registerDate: "2024-02-04",
    },
    {
      key: 2,
      id: 1,
      ticketNumber: "2730175548",
      title: "غذای بد",
      status: "پاسخ داده شده",
      serviceName: "روم",
      type: "فنی",
      registerDate: "2024-02-04",
    },
    {
      key: 3,
      id: 1,
      ticketNumber: "2730175548",
      title: "غذای بد",
      status: "پاسخ داده شده",
      serviceName: "فود",
      type: "فنی",
      registerDate: "2024-02-04",
    },
    {
      key: 4,
      id: 1,
      ticketNumber: "2730175548",
      title: "غذای بد",
      status: "پاسخ داده شده",
      serviceName: "روم",
      type: "فنی",
      registerDate: "2024-02-04",
    },
  ];
  const viewClickHandler = () => {};
  return (
    <div className="student-info-ticket-container">
      <CustomDivider text=" تیکت ها" />
      <CustomTable
        dataSource={dataSource}
        columns={TicketsModel({ viewClickHandler }) as any}
        pagination={paginationConfig}
        {...TABLE_PROPS(dataSource?.length)}
        // loading={historyPaymentsIsLoading}
        className="student-info-ticket-table"
      />
    </div>
  );
};

// LeaveRecords component
type typeArrayLeaveRecords = {
  key: number;
  id: number;
  dormitory: string;
  startDate: string;
  endDate: string;
  Coordination: string;
};

export const LeaveRecordsTable = () => {
  const dataSource: typeArrayLeaveRecords[] = [
    {
      key: 1,
      id: 1,
      dormitory: "نام خوابگاه",
      startDate: "2024-02-04",
      endDate: "2024-02-04",
      Coordination: "پدر",
    },
    {
      key: 2,
      id: 1,
      dormitory: "نام خوابگاه",
      startDate: "2024-02-04",
      endDate: "2024-02-04",
      Coordination: "پدر",
    },
    {
      key: 3,
      id: 1,
      dormitory: "نام خوابگاه",
      startDate: "2024-02-04",
      endDate: "2024-02-04",
      Coordination: "پدر",
    },
    {
      key: 4,
      id: 1,
      dormitory: "نام خوابگاه",
      startDate: "2024-02-04",
      endDate: "2024-02-04",
      Coordination: "مادر",
    },
  ];

  return (
    <div className="leave-records-container">
      <CustomDivider text=" سوابق مرخصی" />
      <CustomTable
        dataSource={dataSource}
        columns={LeaveRecordsModel()}
        pagination={paginationConfig}
        {...TABLE_PROPS(dataSource?.length)}
        // loading={historyPaymentsIsLoading}
        className="leave-records-table"
      />
    </div>
  );
};

//ContactInfo component
type typeArrayContactInfo = {
  key: number;
  id: number;
  relationship: string;
  mobile: string;
};

export const ContactInfoTable = () => {
  const dataSource: typeArrayContactInfo[] = [
    {
      key: 1,
      id: 1,
      relationship: "پدر",
      mobile: "09127026457",
    },
    {
      key: 2,
      id: 1,
      relationship: "پدر",
      mobile: "09127026457",
    },
    {
      key: 3,
      id: 1,
      relationship: "مادر",
      mobile: "09127026457",
    },
  ];

  return (
    <div className="contact-info-container">
      <CustomDivider text="اطلاعات تماس" />
      <CustomTable
        dataSource={dataSource}
        columns={ContactInfoModel}
        pagination={paginationConfig}
        {...TABLE_PROPS(dataSource?.length)}
        // loading={historyPaymentsIsLoading}
        className="leave-request-table"
      />
    </div>
  );
};

//Desc component
export const SpecialDesc = () => {
  return (
    <div className="student-info-desc-container">
      <CustomDivider text=" توضیحات ویژه" />
      <CustomInput
        type="text"
        name="special-desc"
        placeholder="توضیحات ویژه"
        hasVerticalLabel={false}
      />
    </div>
  );
};
