import { ColumnsType } from "antd/es/table";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import {
  IconBag,
  IconBook,
  IconBus,
  IconBusBrt,
  IconFilm,
  IconGrass,
  IconMetro,
  IconSoccerField,
  IconStore,
  IconTaxiCar,
  IconTree,
} from "@components/icons/icons";
import { basicInfoRecordStatus } from "@pages/Dorm/BasicInfo/_shared/utils/DormBasicInfoListUtils";
import { PlacesAroundDormitoryType } from "@pages/Dorm/Residence/DormCreateAndModify/@types/@dormCreateAndModify";

import { DormBasicInfoNearByPlacesTypeTableModelProps } from "./@types/@dormBasicInfoNearByPlacesTypeTableModel";
import {
  title,
  tableModelId,
} from "../../../../_shared/utils/dormBasicInfoDetailTableModels";

const DormBasicInfoNearByPlacesTypeTableModel = ({
  onEditClickHandler,
  switchHandler,
}: DormBasicInfoNearByPlacesTypeTableModelProps): ColumnsType<PlacesAroundDormitoryType> => {
  return [
    {
      title: "آیکن",
      dataIndex: "id",
      key: "id",
      width: 50,
      render: (value: number) => {
        return (
          <span>
            {value === 1 ? (
              <IconTree viewBox="0 0 24 24" strokeWidth={1.5} fill="#000" />
            ) : value === 2 ? (
              <IconGrass viewBox="0 0 24 24" strokeWidth={0.1} fill="#000" />
            ) : value === 3 ? (
              <IconTaxiCar viewBox="0 0 24 24" fill="#000" />
            ) : value === 4 ? (
              <IconMetro viewBox="0 0 24 24" fill="#000" />
            ) : value === 5 ? (
              <IconBusBrt viewBox="0 0 24 24" fill="#000" />
            ) : value === 6 ? (
              <IconBus viewBox="0 0 24 24" fill="#000" />
            ) : value === 7 ? (
              <IconBag viewBox="0 0 24 24" fill="#000" />
            ) : value === 8 ? (
              <IconStore viewBox="0 0 24 24" fill="#000" />
            ) : value === 9 ? (
              <IconFilm viewBox="0 0 24 24" fill="#000" />
            ) : value === 10 ? (
              <IconSoccerField viewBox="0 0 24 24" fill="#000" />
            ) : value === 11 ? (
              <IconBook viewBox="0 0 24 24" fill="#000" />
            ) : null}
          </span>
        );
      },
    },
    title,
    {
      title: "وضعیت",
      dataIndex: "recordStatus",
      key: "recordStatus",
      width: 100,
      align: "center",
      render: (
        status: keyof typeof basicInfoRecordStatus,
        record: PlacesAroundDormitoryType
      ) => {
        const isActive = basicInfoRecordStatus[status] === "فعال";
        return (
          <CustomSwitch
            checkedChildren="فعال"
            unCheckedChildren="غیرفعال"
            valuePropName="status"
            checked={isActive}
            onChange={() => switchHandler(record?.id, isActive)}
          />
        );
      },
    },
    {
      ...tableModelId,
      render: (_: number, record: PlacesAroundDormitoryType) => {
        return (
          <CustomButton type="link" onClick={() => onEditClickHandler(record)}>
            ویرایش
          </CustomButton>
        );
      },
    },
  ];
};

export default DormBasicInfoNearByPlacesTypeTableModel;
