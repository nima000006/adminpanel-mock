import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { getActiveResidenceFloorDetailFacilitySegmentContent } from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceFloorList/helper/components/ViewFacilityFloorSegmentContent/@types/@viewFacilityFloorSegmentContentTypes";
import { FACILITY_TYPE } from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/util";

const ViewFacilityFloorSegmentContentTableModel =
  (): CustomColumnType<getActiveResidenceFloorDetailFacilitySegmentContent>[] => [
    {
      title: "عنوان",
      dataIndex: "title",
      key: "title",
      width: 170,
    },
    {
      title: "نوع امکانات",
      dataIndex: "amenityCategory",
      key: "amenityCategory",
      width: 150,
      render: (value: IdTitleName) => {
        const facilityType = FACILITY_TYPE[value?.name as keyof typeof FACILITY_TYPE];
        const Icon = facilityType.icon;
        return (
          <CustomTag className="flex w-fit gap-2" color={facilityType.color}>
            <Icon size={16} /> {facilityType.label}
          </CustomTag>
        );
      },
    },
    {
      title: "مقدار ",
      dataIndex: "quantity",
      key: "quantity",
      width: 120,
    },
    {
      title: "واحد اندازه‌گیری",
      dataIndex: "unitOfMeasure",
      key: "unitOfMeasure",
      width: 120,
      render: (value: IdTitleName) => {
        return dataPlaceHolder({ data: value?.title || value?.name });
      },
    },
    {
      title: "توضیحات",
      dataIndex: "description",
      key: "description",
      width: 400,
    },
  ];
export default ViewFacilityFloorSegmentContentTableModel;
