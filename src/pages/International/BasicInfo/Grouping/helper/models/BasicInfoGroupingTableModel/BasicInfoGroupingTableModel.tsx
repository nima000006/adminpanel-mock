import {
  PiCpu,
  PiPaintBrush,
  PiPencilRuler,
  PiStethoscope,
  PiFlask,
  PiUsersFour,
  PiCheck,
  PiX,
} from "react-icons/pi";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";

import { BasicInfoGroupingTableModelProps } from "./@types/@basicInfoGroupingTableModelProps";
import { BaseInfoGroupingDataSourceType } from "../../../@types/@baseInfoGroupingDataSourceType";

const BasicInfoGroupingTableModel = ({
  drawerHandler,
}: BasicInfoGroupingTableModelProps) => {
  return [
    {
      title: "",
      dataIndex: "id",
      key: "id",
      width: 60,
      render: (_: unknown, record: BaseInfoGroupingDataSourceType) => {
        let icon = <></>;

        switch (record.id) {
          case 1: //فناوری اطلاعات
            icon = <PiCpu />;
            break;
          case 2: //هنر
            icon = <PiPaintBrush />;
            break;
          case 3: //فنی مهندسی
            icon = <PiPencilRuler />;
            break;
          case 4: //بهداشت و درمان
            icon = <PiStethoscope />;
            break;
          case 5: //علوم پایه
            icon = <PiFlask />;
            break;
          case 6: //علوم انسانی
            icon = <PiUsersFour />;
            break;
          default:
            icon = <>-</>;
        }

        return <div className="custom-icon">{icon}</div>;
      },
    },

    {
      title: "عنوان فارسی",
      dataIndex: "persianTitle",
      key: "persianTitle",
      width: 230,
    },
    {
      title: "عنوان انگلیسی",
      dataIndex: "englishTitle",
      key: "englishTitle",
      width: 230,
    },
    {
      title: "وضعیت",
      dataIndex: "status",
      key: "status",
      width: 130,
      render: (text: string, records: BaseInfoGroupingDataSourceType) => {
        let color = "";
        let icon = null;
        let label = "";
        switch (records.status) {
          case "DEFINED": //تعریف شده
            icon = <PiCheck />;
            label = "تعریف شده";
            color = "success";
            break;
          case "UNDEFINED": //تعریف شده
            icon = <PiX />;
            label = "تعریف نشده";
            color = "error";
            break;
          default:
            color = "default";
            label = text;
        }
        return (
          <CustomTag className="custom-tag" color={color} icon={icon}>
            {label}
          </CustomTag>
        );
      },
    },
    {
      title: "کد گروه",
      dataIndex: "codeGroup",
      key: "codeGroup",
      width: 115,
    },
    {
      title: "تعداد رشته‌های زیرمجموعه",
      dataIndex: "numberOfSubCategory",
      key: "numberOfSubCategory",
      width: 220,
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      className: "tables-sticky-column-left",
      width: 70,
      render: (_: unknown, records: BaseInfoGroupingDataSourceType) => {
        return (
          <CustomButton type="link" onClick={() => drawerHandler(records.status)}>
            زیرمجموعه‌ها
          </CustomButton>
        );
      },
    },
  ];
};
export default BasicInfoGroupingTableModel;
