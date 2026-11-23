import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { GetRoomAmenitiesSelectAndValueContent } from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceUnitList/@types/@activeResidenceUnitListType";
import { FACILITY_TYPE } from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/util";

const ViewFacilityUnitSegmentContentTableModel =
  (): CustomColumnType<GetRoomAmenitiesSelectAndValueContent>[] => [
    {
      title: "عنوان",
      dataIndex: "faTitle",
      key: "faTitle",
      width: 170,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "نوع امکانات",
      dataIndex: "amenityCategory",
      key: "amenityCategory",
      width: 150,
      render: (value: IdTitleName) => {
        const facilityType = FACILITY_TYPE[value?.name as keyof typeof FACILITY_TYPE];

        if (!facilityType) {
          return dataPlaceHolder({ data: value?.title || value?.name });
        }

        const Icon = facilityType.icon;
        return (
          <CustomTag className="flex w-fit gap-2" color={facilityType.color}>
            <Icon size={16} />
            {facilityType.label}
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
      render: (value: IdTitleName) =>
        dataPlaceHolder({ data: value?.title || value?.name }),
    },
    {
      title: "توضیحات",
      dataIndex: "faDescription",
      key: "faDescription",
      width: 400,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "ایجاد کننده",
      dataIndex: "createdBy",
      key: "createdBy",
      width: 150,
    },
    {
      title: "تاریخ ایجاد",
      dataIndex: "createdDate",
      key: "createdDate",
      width: 150,
      ...GetServerColumnSearchProps({
        dataIndex: "createdDate",
        label: "تاریخ ایجاد",
        type: "sort",
      }),
      render: (value: string) =>
        dataPlaceHolder({
          data: value,
          isDate: true,
          customDateFormat: "HH:mm, YYYY/MM/DD ",
        }),
    },
  ];
export default ViewFacilityUnitSegmentContentTableModel;
