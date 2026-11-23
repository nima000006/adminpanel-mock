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
import { useLazyGetAllContractsBySelfIdQuery } from "@infra/states/redux/Apis/food/self/selfApis";
import { AllContractsListItem } from "@pages/Food/Contracts/AllContracts/AllContractList/@types/@allContractList";
import { GetAllContractsBySelfIdResponse } from "@pages/Food/FoodSchedules/AllFoodSchedules/AllFoodScheduleList/helper/drawer/AllSingleFoodScheduleListDrawerContent/@types/@allSingleFoodScheduleListDrawerContent";
import { SelfContractTableModel } from "@pages/Food/Selfs/helpers/models/SelfContractTableModel/SelfContractTableModel";

import ContractsContent from "./helpers/components/DrawerContent/ContractsContent";

import "./_contracts.scss";

const AllSelfsContracts = () => {
  const [contractData, setContractData] = useState<AllContractsListItem[] | []>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState({ isOpen: false, id: -1 });

  const {
    params: { id },
  } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getAllContractsBySelfId, { isFetching: isAllContractsBySelfIdLoading }] =
    useLazyGetAllContractsBySelfIdQuery();

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
    async (value: GetAllContractsBySelfIdResponse) => {
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
      <div className="all-selfs-contract-tab-container">
        <ToolBox
          rightSide={
            <CustomButton
              type="primary"
              icon={<AiOutlineFilter />}
              className="advance-filter-btn"
            >
              فیلتر پیشرفته
            </CustomButton>
          }
        />
        <CustomTable
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

export default AllSelfsContracts;
