import { useEffect, useState } from "react";

import { useNavigate } from "react-router";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import { ExcelCodes } from "@infra/config/excel-codes";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { makeSearchParams } from "@infra/helpers/utils";
import { CATERING_BASE_INFO_DETAILS_PAGE_ROUTE } from "@infra/router/routes/catering";
import { useGetBasicInfoCategoryCountMutation } from "@infra/states/redux/Apis/catering/basicInfo/basicInfoApi";
import { CATERING_STATUS_TYPES_MAIN_LIST } from "@pages/Catering/_shared/utils";
import {
  BasicInfoCategoryCount,
  getBasicInfoCategoryCountResponse,
} from "@pages/Catering/BasicInfo/CateringBasicInfoLists/@types/@CateringBasicInfoLists";
import CateringBasicInfoListsTableModel from "@pages/Catering/BasicInfo/CateringBasicInfoLists/helper/models/CateringBasicInfoListsTableModel/CateringBasicInfoListsTableModel";

const CateringBasicInfoLists = () => {
  const [dataSource, setDataSource] = useState<BasicInfoCategoryCount[]>([]);
  useTitle({ text: "اطلاعات پایه" });
  const navigate = useNavigate();

  //? ================================  Api Calls ================================
  const [getBasicInfoCategoryCount, { isLoading: isGetBasicInfoCategoryCountLoading }] =
    useGetBasicInfoCategoryCountMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getBasicInfoCategoryCount({
      taxStuffId: 0,
      statusType: CATERING_STATUS_TYPES_MAIN_LIST,
    }) // we need to know how set dynamicly this params, 0, 1 for main lists
      .unwrap()
      .then((res: getBasicInfoCategoryCountResponse) => {
        setDataSource(res);
      });
  }, []);

  //* ================================ Util Functions ================================

  const handleView = (record: BasicInfoCategoryCount) => {
    navigate({
      pathname: CATERING_BASE_INFO_DETAILS_PAGE_ROUTE,
      search: makeSearchParams({
        productCategoryId: record?.productCategoryId?.toString(),
        productCategoryTitle: record?.productCategoryTitle,
      }),
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <CustomTable<BasicInfoCategoryCount>
      dataSource={dataSource}
      loading={isGetBasicInfoCategoryCountLoading}
      columns={CateringBasicInfoListsTableModel(handleView)}
      rowKey="productCategoryId"
      pagination={false}
      draggableColumns
      draggableId={ExcelCodes.FOOD_BASIC_INFO_LISTS_TABLE}
    />
  );
};

export default CateringBasicInfoLists;
