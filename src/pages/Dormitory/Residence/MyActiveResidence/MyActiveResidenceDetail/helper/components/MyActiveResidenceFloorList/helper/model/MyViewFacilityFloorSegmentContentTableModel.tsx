import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { getMyActiveResidenceFloorDetailFacilitySegmentContent } from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceFloorList/helper/components/MyViewFacilityFloorSegmentContent/@types/@myViewFacilityFloorSegmentContentTypes";
import { FACILITY_TYPE } from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/MyUtil";

const MyViewFacilityFloorSegmentContentTableModel =
  (): CustomColumnType<getMyActiveResidenceFloorDetailFacilitySegmentContent>[] => [
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
export default MyViewFacilityFloorSegmentContentTableModel;
