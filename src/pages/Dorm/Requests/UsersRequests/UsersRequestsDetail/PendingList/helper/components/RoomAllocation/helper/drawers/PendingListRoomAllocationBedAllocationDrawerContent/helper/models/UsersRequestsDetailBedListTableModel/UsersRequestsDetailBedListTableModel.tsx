import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { entryYearSemesterGenerator } from "@pages/Dorm/_shared/utils/DormUtils";
import { GetDormRequestBedList } from "@pages/Dorm/Requests/UsersRequests/UsersRequestsDetail/@types/@usersRequestsDetail";

const UsersRequestsDetailBedListTableModel = () => {
  return [
    {
      title: "عنوان تخت",
      dataIndex: "bedTitle",
      key: "bedTitle",
      width: 130,
      searchable: true,
    },
    {
      title: "شماره تخت",
      dataIndex: "bedNumber",
      key: "bedNumber",
      width: 130,
      searchable: true,
    },
    {
      title: "نوع تخت",
      dataIndex: "bedTypeTitle",
      key: "bedTypeTitle",
      width: 130,
    },
    {
      title: "وضعیت",
      dataIndex: "bedStateTitle",
      key: "bedStateTitle",
      width: 130,
      render: (value: string, records: GetDormRequestBedList) => {
        return (
          <CustomTag color={`${records?.bedStateId === 1 ? "green" : "red"}`}>
            {value}
          </CustomTag>
        );
      },
    },
    {
      title: "نام",
      dataIndex: "customerFirstname",
      key: "customerFirstname",
      width: 130,
    },
    {
      title: "نام‌خانوادگی",
      dataIndex: "customerLastname",
      key: "customerLastname",
      width: 130,
    },
    {
      title: "واحد دانشگاهی",
      dataIndex: "customerBranchName",
      key: "customerBranchName",
      width: 130,
    },
    {
      title: "مقطع تحصیلی",
      dataIndex: "customerLevelName",
      key: "customerLevelName",
      width: 130,
    },
    {
      title: "رشته تحصیلی",
      dataIndex: "customerFieldName",
      key: "customerFieldName",
      width: 130,
    },
    {
      title: "سال ورود",
      dataIndex: "customerEncode",
      key: "customerEncode",
      width: 130,
      render: (value: string) => {
        return <>{entryYearSemesterGenerator(value)?.entryYear}</>;
      },
    },
    {
      title: "ترم",
      dataIndex: "customerEncode",
      key: "customerEncode",
      width: 130,
      render: (value: string) => {
        return <>{entryYearSemesterGenerator(value)?.entrySemester}</>;
      },
    },
  ];
};

export default UsersRequestsDetailBedListTableModel;
