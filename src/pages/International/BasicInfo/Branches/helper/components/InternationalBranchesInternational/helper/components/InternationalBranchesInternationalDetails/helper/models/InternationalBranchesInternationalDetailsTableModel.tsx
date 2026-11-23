import {
  PiCpu,
  PiPencilRuler,
  PiStethoscope,
  PiUsersFour,
  PiPaintBrush,
  PiX,
} from "react-icons/pi";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";

import { InternationalBranchesInternationalDetailsTableModelPropsTypes } from "./@types/@internationalBranchesInternationalDetailsTableModelPropsTypes";
import { dataSourceInternationalDetailsTypes } from "../../@types/@dataSourceInternationalDetailsTypes";

const InternationalBranchesInternationalDetailsTableModel = ({
  onClickHandlerEdit,
  onClickHandlerAdd,
}: InternationalBranchesInternationalDetailsTableModelPropsTypes) => {
  return [
    {
      title: "نام رشته بین‌الملل",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "گروه رشته",
      dataIndex: "groupName",
      key: "groupName",
      render: (groupName: string) => {
        let label = "";
        let color = "";
        let icon = null;

        switch (groupName) {
          case "IT":
            label = "فناوری اطلاعات";
            color = "blue";
            icon = <PiCpu />;
            break;
          case "ET":
            label = "فنی مهندسی";
            color = "warning";
            icon = <PiPencilRuler />;
            break;
          case "HT":
            label = "بهداشت و درمان";
            color = "success";
            icon = <PiStethoscope />;

            break;
          case "HU":
            label = "علوم انسانی";
            color = "purple";
            icon = <PiUsersFour />;
            break;
          case "AR":
            label = "هنر";
            color = "geekblue";
            icon = <PiUsersFour />;

            break;
          case "BS":
            label = "علوم پایه";
            color = "cyan";
            icon = <PiPaintBrush />;
            break;
          default:
            label = "نامشخص";
            color = "gray";
            break;
        }

        return (
          <CustomTag className="w-fit gap-1" icon={icon} color={color}>
            {label}
          </CustomTag>
        );
      },
    },

    {
      title: "مقاطع تحصیلی",
      dataIndex: "degree",
      key: "degree",
      render: (degrees: string[]) => {
        if (!degrees || degrees.length === 0)
          return (
            <CustomTag color="red" icon={<PiX />} className="w-fit gap-1">
              تعریف نشده
            </CustomTag>
          );

        return (
          <div className="flex flex-wrap gap-2">
            {degrees.map((deg) => (
              <CustomTag className="w-fit" key={deg}>
                {deg}
              </CustomTag>
            ))}
          </div>
        );
      },
    },

    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      className: "tables-sticky-column-left",
      width: 70,
      render: (id: number, record: dataSourceInternationalDetailsTypes) => {
        return record?.degree?.length > 0 ? (
          <CustomButton type="link" onClick={() => onClickHandlerEdit(id)}>
            ویرایش مقطع
          </CustomButton>
        ) : (
          <CustomButton type="link" onClick={() => onClickHandlerAdd(id)}>
            افزودن مقطع
          </CustomButton>
        );
      },
    },
  ];
};
export default InternationalBranchesInternationalDetailsTableModel;
