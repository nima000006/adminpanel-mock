import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import { ExcelCodes } from "@infra/config/excel-codes";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useGetBasicInfoListQuery } from "@infra/states/redux/Apis/dormitory/basicInfo/basicInfoApi";
import { DormitoryBasicInfoType } from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoList/@types/@dormitoryBasicInfoList";
import DormitoryBasicInfoListTableModel from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoList/helper/models/DormitoryBasicInfoListTableModel/DormitoryBasicInfoListTableModel";

const DormitoryBasicInfoList = () => {
  useTitle({
    breadcrumbItems: [
      {
        title: "اطلاعات پایه",
      },
    ],
  });

  const { params: url } = useQueryParams();

  //? ================================  Api Calls ================================
  const { data: basicInfoList, isLoading: isLoadingBasicInfoList } =
    useGetBasicInfoListQuery();

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomTable<DormitoryBasicInfoType>
      dataSource={basicInfoList}
      loading={isLoadingBasicInfoList}
      columns={DormitoryBasicInfoListTableModel()}
      rowKey="id"
      draggableColumns
      draggableId={ExcelCodes.DORMITORY_BASIC_INFO_LIST}
      pagination={paginationConfig}
      key={`table-${url?.pageSize || "8"}`}
    />
  );
};

export default DormitoryBasicInfoList;
