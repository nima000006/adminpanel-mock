import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";

export const nationality = {
  title: "ملیت",
  dataIndex: "nationality",
  key: "nationality",
  width: 100,
  render: (value: string) => {
    return (
      <CustomTag className="management-custom-tag">
        {dataPlaceHolder({ data: value })}
      </CustomTag>
    );
  },
};
