import CustomTag from "@components/Renderers/CustomTag/CustomTag";

export const nationality = {
  title: "ملیت",
  dataIndex: "nationality",
  key: "nationality",
  width: 100,
  render: (value: string) => {
    if (!value) return "-";
    return <CustomTag className="management-custom-tag">{value}</CustomTag>;
  },
};
