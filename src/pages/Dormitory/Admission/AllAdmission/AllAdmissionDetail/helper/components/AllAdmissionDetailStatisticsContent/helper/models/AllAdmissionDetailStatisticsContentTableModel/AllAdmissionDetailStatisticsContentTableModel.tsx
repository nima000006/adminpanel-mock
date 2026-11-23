import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { GetAllAdmissionDetailStatisticsPriceContent } from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionDetail/helper/components/AllAdmissionDetailStatisticsContent/@types/@allAdmissionDetailStatisticsContent";

const AllAdmissionDetailStatisticsContentTableModel =
  (): CustomColumnType<GetAllAdmissionDetailStatisticsPriceContent>[] => [
    {
      title: "قیمت",
      dataIndex: "price",
      key: "price",
      ...GetServerColumnSearchProps({
        dataIndex: "price",
        label: "قیمت",
        type: "sort",
      }),
      render: (value: number) =>
        dataPlaceHolder({
          data: value,
          isPrice: true,
          currency: { isAvailable: true, type: "تومان" },
        }),
    },
    {
      title: "تعداد ظرفیت",
      dataIndex: "capacityCount",
      key: "capacityCount",
      render: (value: number) => dataPlaceHolder({ data: value }),
    },
  ];

export default AllAdmissionDetailStatisticsContentTableModel;
