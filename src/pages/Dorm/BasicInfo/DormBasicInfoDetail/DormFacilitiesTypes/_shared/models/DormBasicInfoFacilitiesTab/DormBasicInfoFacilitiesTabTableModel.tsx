import BuildingIcon from "@assets/icons/Dorm/BuildingIcon";
import FloorIcon from "@assets/icons/Dorm/FloorIcon";
import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { basicInfoRecordStatus } from "@pages/Dorm/BasicInfo/_shared/utils/DormBasicInfoListUtils";
import { DormResidenceFacilityListTypes } from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/components/Building/BuildingCreateAndModify/helper/components/DormResidenceFacilities/@types/@dormResidenceFacilities";

import { DormBasicInfoFacilitiesTabTableModelProps } from "./@types/@dormBasicInfoFacilitiesTabTableModel";
import {
  recordStatus,
  tableModelId,
} from "../../../../_shared/utils/dormBasicInfoDetailTableModels";

const DormBasicInfoFacilitiesTabTableModel = ({
  onEditClickHandler,
  switchHandler,
}: DormBasicInfoFacilitiesTabTableModelProps) => {
  return [
    {
      title: "عنوان",
      dataIndex: "title",
      key: "title",
      width: 500,
      searchable: true,
    },
    {
      title: "قابل دسترس",
      dataIndex: "IsOptional",
      key: "IsOptional",
      width: 200,
      render: (value: number) => {
        return (
          <div className="availability-container">
            <CustomTag className="icon-container" color="blue">
              <BuildingIcon fillColor="#096DD9" size="16" />
              <span>ساختمان</span>
            </CustomTag>
            {value === 2 && (
              <CustomTag className="icon-container" color="green">
                <FloorIcon fillColor="#389e0d" size="16" />
                <span>طبقه</span>
              </CustomTag>
            )}
          </div>
        );
      },
    },
    {
      title: "واحد اندازه‌گیری",
      dataIndex: "unit",
      key: "unit",
      width: 125,
    },
    {
      ...recordStatus,
      render: (
        status: keyof typeof basicInfoRecordStatus,
        record: DormResidenceFacilityListTypes
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
      className: "tables-sticky-column-left",
      render: (_: number, record: DormResidenceFacilityListTypes) => {
        return (
          <CustomButton type="link" onClick={() => onEditClickHandler(record)}>
            ویرایش
          </CustomButton>
        );
      },
    },
  ];
};

export default DormBasicInfoFacilitiesTabTableModel;
