import { dataPlaceHolder } from "@infra/helpers/utils";
import { StudentListByUsernameAndStudentNumberContentType } from "@pages/Dorm/Requests/helpers/components/ManualRegisterStudentModalContent/@types/@manualRegisterStudentModalContentTypes";

const ManualDormRegisterModel = [
  {
    title: "نام",
    dataIndex: "firstName",
    key: "firstName",
    width: 150,
    render: (_: unknown, record: StudentListByUsernameAndStudentNumberContentType) => (
      <>{dataPlaceHolder({ data: record?.userResponseDto?.firstName })}</>
    ),
  },
  {
    title: "نام خانوادگی",
    dataIndex: "lastName",
    key: "lastName",
    width: 250,
    render: (_: unknown, record: StudentListByUsernameAndStudentNumberContentType) => (
      <>{dataPlaceHolder({ data: record?.userResponseDto?.lastName })}</>
    ),
  },
  {
    title: "کدملی/اتباع",
    dataIndex: "nationalCode",
    key: "nationalCode",
    width: 120,
    render: (_: unknown, record: StudentListByUsernameAndStudentNumberContentType) => (
      <>{dataPlaceHolder({ data: record?.userResponseDto?.username })}</>
    ),
  },
  {
    title: "شماره دانشجویی",
    dataIndex: "studentNumber",
    key: "studentNumber",
    width: 200,
  },
  {
    title: "واحد دانشگاهی",
    dataIndex: "branchName",
    key: "branchName",
    width: 200,
  },
  {
    title: "شماره موبایل",
    dataIndex: "mobile",
    key: "mobile",
    width: 120,
    render: (_: unknown, record: StudentListByUsernameAndStudentNumberContentType) => (
      <>{dataPlaceHolder({ data: record?.userResponseDto?.mobileNumber })}</>
    ),
  },
  {
    title: "رشته",
    dataIndex: "studyFieldName",
    key: "studyFieldName",
    width: 250,
  },
  {
    title: "مقطع",
    dataIndex: "degreeName",
    key: "degreeName",
    width: 250,
  },
];

export default ManualDormRegisterModel;
