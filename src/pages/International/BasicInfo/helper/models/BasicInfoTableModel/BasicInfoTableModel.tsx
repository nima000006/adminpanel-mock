import {
  PiGraduationCap,
  PiQuestionMark,
  PiPuzzlePiece,
  PiGitBranch,
  PiUser,
  PiCheck,
  PiX,
} from "react-icons/pi";
import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import {
  INTERNATIONAL_BASIC_INFO_ADMISSION_PROGRAM_ROUTE,
  INTERNATIONAL_BASIC_INFO_BRANCHES_ROUTE,
  INTERNATIONAL_BASIC_INFO_GROUPING_ROUTE,
  INTERNATIONAL_BASIC_INFO_PERSONS_ROUTE,
  INTERNATIONAL_BASIC_INFO_REASONS_ROUTE,
} from "@infra/router/routes/international";
import { BaseInfoDataSourceType } from "@pages/International/BasicInfo/@types/@baseInfoDataSourceType";

const BasicInfoTableModel = () => {
  return [
    {
      title: "نوع اطلاعات پایه",
      dataIndex: "title",
      key: "title",
      width: 360,
      render: (text: string, records: BaseInfoDataSourceType) => {
        let color = "geekblue";
        let icon = null;
        let label = "";
        switch (records.id) {
          case 1: //گروه رشته ها
            icon = <PiGraduationCap />;
            label = "گروه رشته‌ها";
            break;
          case 2: // انواع دلیل
            icon = <PiQuestionMark />;
            label = "انواع دلایل";
            break;
          case 3: // برنامه پذیرش
            icon = <PiPuzzlePiece />;
            label = "برنامه پذیرش";
            break;
          case 4: //واحد های دانشگاهی
            icon = <PiGitBranch />;
            label = "واحد دانشگاهی";
            break;
          case 5: //افراد
            icon = <PiUser />;
            label = "افراد";
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
      title: "وضعیت",
      dataIndex: "status",
      key: "status",
      width: 130,
      render: (text: string, records: BaseInfoDataSourceType) => {
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
      title: "تعداد رکورد‌ها",
      dataIndex: "records",
      key: "records",
      width: 150,
    },
    {
      title: "آخرین ویرایش کننده",
      dataIndex: "lastedPersonUpdate",
      key: "lastedPersonUpdate",
      width: 180,
    },
    {
      title: "تاریخ آخرین ویرایش",
      dataIndex: "lastUpdate",
      key: "lastUpdate",
      width: 180,
      render: (value: string) =>
        dataPlaceHolder({
          data: value,
          isDate: true,
          customDateFormat: "HH:mm, YYYY/MM/DD",
        }),
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      className: "tables-sticky-column-left",
      width: 70,
      render: (_: unknown, record: BaseInfoDataSourceType) => {
        let link = "";

        switch (record.id) {
          case 1: //گروه رشته ها
            link = INTERNATIONAL_BASIC_INFO_GROUPING_ROUTE;
            break;
          case 2: // انواع دلیل
            link = INTERNATIONAL_BASIC_INFO_REASONS_ROUTE;
            break;
          case 3: // برنامه پذیرش
            link = INTERNATIONAL_BASIC_INFO_ADMISSION_PROGRAM_ROUTE;
            break;
          case 4: //واحد های دانشگاهی
            link = INTERNATIONAL_BASIC_INFO_BRANCHES_ROUTE;
            break;
          case 5: //افراد
            link = INTERNATIONAL_BASIC_INFO_PERSONS_ROUTE;
            break;
          default:
            link = "#";
        }

        return (
          <CustomButton type="link">
            <Link to={link}>مشاهده</Link>
          </CustomButton>
        );
      },
    },
  ];
};
export default BasicInfoTableModel;
