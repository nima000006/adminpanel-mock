import { useEffect, useState } from "react";

import { AiOutlineFilter, AiOutlinePlusCircle } from "react-icons/ai";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import Div from "@components/Renderers/Div/Div";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { useGetBranchActiveBannersMutation } from "@infra/states/redux/Apis/business/serviceManagementService/serviceManagementService";

import {
  BannerManageMentBranchType,
  BannerTableInfoProps,
  GetBannersActiveBranchesResponse,
} from "../../@types/@bannerManagement";
import { useBannerManagerContext } from "../../State/useBannerManagerContext";
import AppBannerTableModel from "../AppBannerTableModel/AppBannerTableModel";

import "./_bannersInfo.scss";

const BannerTableInfo = ({
  seIsEditBannerDrawerOpen,
  setIsVisitBannerDrawerOpen,
  selectedItems,
}: BannerTableInfoProps) => {
  const { state, setSelectedBranches } = useBannerManagerContext();
  const [dataSource, setDataSource] = useState<BannerManageMentBranchType[]>([]);

  //? ================================  Api Calls ================================
  const [getBannerActiveBranches, { isLoading: isActiveBrachDataLoading }] =
    useGetBranchActiveBannersMutation();

  // get Data
  const getData = async () => {
    if (
      state?.activeApps?.id > 0 &&
      selectedItems?.branch?.id !== null &&
      selectedItems?.staff?.id !== null
    ) {
      getBannerActiveBranches({
        serviceId: state?.activeApps?.id,
        bannerTypeId: selectedItems?.branch?.id,
        staffType: selectedItems?.staff?.id,
      })
        .unwrap()
        .then(onGetServiceSuccess);
    }
  };
  //? ================================ Effects ================================
  useEffect(() => {
    getData();
  }, [state?.activeApps, state?.isDataRefreshed, selectedItems]);

  //* ================================ Util Functions ================================
  //!
  const onGetServiceSuccess = async (res: GetBannersActiveBranchesResponse) => {
    setSelectedBranches(res);
    setDataSource(res);
  };

  //! onEditClickHandler
  const onEditClickHandler = (id: number) => {
    seIsEditBannerDrawerOpen({ isOpen: true, id });
  };

  const onVisitClickHandler = (id: number) => {
    setIsVisitBannerDrawerOpen({ isOpen: true, id });
  };
  const onCreateNewBannerClickHandler = () => {
    seIsEditBannerDrawerOpen({ isOpen: true, id: -1 });
  };

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={isActiveBrachDataLoading}>
      {state?.activeApps?.id > 0 &&
      selectedItems?.branch?.id !== null &&
      selectedItems?.staff?.id !== null ? (
        <>
          <CustomDivider text="لیست بنر ها" />
          <div className="main-banner-info-container">
            <ToolBox
              leftSide={
                <CustomButton
                  icon={<AiOutlinePlusCircle />}
                  iconPlacement="end"
                  type="primary"
                  onClick={onCreateNewBannerClickHandler}
                >
                  ایجاد بنر
                </CustomButton>
              }
              rightSide={
                <CustomButton
                  iconPlacement="end"
                  type="primary"
                  icon={<AiOutlineFilter />}
                >
                  فیلتر پیشرفته
                </CustomButton>
              }
            />
            <CustomTable
              rowKey="id"
              dataSource={dataSource}
              columns={AppBannerTableModel({ onEditClickHandler, onVisitClickHandler })}
              loading={isActiveBrachDataLoading}
              pagination={paginationConfig}
              {...TABLE_PROPS(dataSource?.length)}
            />
          </div>
        </>
      ) : (
        ""
      )}
    </Div>
  );
};

export default BannerTableInfo;
