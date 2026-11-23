import { useCallback, useEffect, useMemo, useState } from "react";

import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineFilter } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetMyContractsBySelfIdQuery } from "@infra/states/redux/Apis/food/self/selfApis";
import { MyContractsListItem } from "@pages/Food/Contracts/MyContracts/MyContractsList/@types/@myContractsList";
import { GetMyContractsBySelfIdResponse } from "@pages/Food/FoodSchedules/MyFoodSchedules/MyFoodSchedulesList/helper/drawer/MySingleFoodScheduleListDrawerContent/@types/@mySingleFoodScheduleListDrawerContent";
import { SelfContractTableModel } from "@pages/Food/Selfs/helpers/models/SelfContractTableModel/SelfContractTableModel";

import ContractsContent from "./helpers/components/DrawerContent/ContractsContent";

import "./_contracts.scss";

const Contracts = () => {
  const [contractData, setContractData] = useState<MyContractsListItem[] | []>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState({ isOpen: false, id: -1 });

  const {
    params: { id },
  } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getAllContractsBySelfId, { isFetching: isAllContractsBySelfIdLoading }] =
    useLazyGetMyContractsBySelfIdQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getAllContractsBySelfId({ restaurantId: id })
        .unwrap()
        .then(getAllContractsBySelfIdOnSuccess);
    }
  }, [id]);

  //* ================================ Util Functions ================================
  const getAllContractsBySelfIdOnSuccess = useCallback(
    async (value: GetMyContractsBySelfIdResponse) => {
      if (value?.status === 200) {
        setContractData(value?.data?.contractDtoList);
      } else {
        return toast.error((value?.data || value?.msg) as any, {
          toastId: (value?.data || value?.msg) as any,
        });
      }
    },
    []
  );

  // Other functions
  const openDrawerHandler = useCallback((id: number) => {
    setIsDrawerOpen({ isOpen: true, id });
  }, []);

  const closeDrawerHandler = useCallback(() => {
    setIsDrawerOpen({ isOpen: false, id: -1 });
  }, []);

  const columns = useMemo(
    () => SelfContractTableModel({ viewClickHandler: openDrawerHandler }),
    []
  );

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isDrawerOpen && (
        <CustomDrawer
          title="جزئیات قرارداد"
          onClose={closeDrawerHandler}
          open={isDrawerOpen?.isOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <ContractsContent
              contractId={isDrawerOpen?.id}
              closeDrawerHandler={closeDrawerHandler}
            />
          }
        />
      )}
      <div className="self-contract-tab-container">
        <ToolBox
          rightSide={
            <CustomButton
              type="primary"
              icon={<AiOutlineFilter />}
              className="advance-filter-btn"
              disabled
            >
              فیلتر پیشرفته
            </CustomButton>
          }
        />
        <CustomTable<MyContractsListItem>
          dataSource={contractData}
          columns={columns}
          pagination={paginationConfig}
          rowKey="id"
          loading={isAllContractsBySelfIdLoading}
          className="self-contract-table-model-container"
          {...TABLE_PROPS(contractData?.length)}
        />
      </div>
    </>
  );
};

export default Contracts;
