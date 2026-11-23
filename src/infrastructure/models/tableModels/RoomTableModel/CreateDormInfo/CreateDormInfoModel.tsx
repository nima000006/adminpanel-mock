import { Button } from "antd";
export const CreateDormInfoModel = ({ createNewRecord, RemoveRecord }: any) => [
  {
    title: "#",
    dataIndex: "id",
    key: "id",
    width: "10%",
    editable: true,
    searchable: true,
  },
  {
    title: "تعداد ساختمان",
    dataIndex: "dormCount",
    key: "dormCount",
    width: "30%",
    editable: true,
  },
  {
    title: "تعداد طبقات ساختمان‌ها",
    dataIndex: "floorCount",
    key: "floorCount",
    width: "30%",
    editable: true,
  },
  {
    title: "",
    dataIndex: "action",
    key: "action",
    width: "12%",
    render: (_: string, records: any) => {
      return (
        <div className="create-structure-info-btn-container">
          <Button
            className="create-structure-info-btn"
            type={records.isNew ? "primary" : "link"}
            size="small"
            onClick={
              records.isNew
                ? () => createNewRecord(records)
                : () => RemoveRecord(records?.id)
            }
          >
            {records.isNew ? "ایجاد" : "حذف"}
          </Button>
        </div>
      );
    },
  },
];
