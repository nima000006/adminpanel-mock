import { useEffect, useState } from "react";

import { AiOutlineFilter } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetContractFoodsQuery } from "@infra/states/redux/Apis/food/contract/contractApi";
import AllContractDetailFoodListTableModel from "@pages/Food/Contracts/AllContracts/AllContractDetail/helpers/models/AllContractDetailFoodListTableModel/AllContractDetailFoodListTableModel";

import { ContractsFoodDataType, GetContractFoodsResponse } from "./@types/@foodsTab";
import AllContractCreateFoodDrawerContent from "./components/DrawerContent/CreateFood/AllContractCreateFoodDrawerContent";
import AllContractFoodDetailDrawerContent from "./components/DrawerContent/FoodDetail/AllContractFoodDetailDrawerContent";
import "./_foodsTab.scss";

const FoodsTab = () => {
  const [data, setData] = useState<ContractsFoodDataType[] | []>([]);
  const [isCreateFoodDrawerOpen, setIsCreateFoodDrawerOpen] = useState(false);
  const [isFoodDetailDrawerOpen, setIsFoodDetailDrawerOpen] = useState({
    isOpen: false,
    id: -1,
  });
  const {
    params: { contractId },
  } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getContractFoods, { isFetching: isContractFoodsLoading }] =
    useLazyGetContractFoodsQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (contractId) {
      getData();
    }
  }, [contractId]);

  //* ================================ Util Functions ================================
  const getContractFoodsOnSuccess = async (value: GetContractFoodsResponse) => {
    if (value?.status === 200) {
      setData(value?.data);
    } else {
      return toast.error((value?.data || value?.msg) as any, {
        toastId: (value?.data || value?.msg) as any,
      });
    }
  };

  // get init data
  const getData = () => {
    getContractFoods({ contractId }).unwrap().then(getContractFoodsOnSuccess);
  };

  // Food detail
  const viewClickHandler = (id: number) => {
    setIsFoodDetailDrawerOpen({ isOpen: true, id });
  };
  const closeFoodDetailDrawerHandler = () => {
    setIsFoodDetailDrawerOpen({ isOpen: false, id: -1 });
  };

  // Create new food
  const openCreateDrawerHandler = () => {
    setIsCreateFoodDrawerOpen(true);
  };
  const closeCreateDrawerHandler = () => {
    setIsCreateFoodDrawerOpen(false);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isCreateFoodDrawerOpen && (
        <CustomDrawer
          onClose={closeCreateDrawerHandler}
          open={isCreateFoodDrawerOpen}
          className="all-contracts-detail-page-drawer"
          closeIcon={<AiOutlineClose />}
          content={
            <AllContractCreateFoodDrawerContent
              closeDrawerHandler={closeCreateDrawerHandler}
              getData={getData}
            />
          }
        />
      )}
      {isFoodDetailDrawerOpen?.isOpen && (
        <CustomDrawer
          onClose={closeFoodDetailDrawerHandler}
          open={isFoodDetailDrawerOpen?.isOpen}
          className="all-contracts-detail-page-drawer"
          closeIcon={<AiOutlineClose />}
          content={
            <AllContractFoodDetailDrawerContent
              id={isFoodDetailDrawerOpen?.id}
              closeDrawerHandler={closeFoodDetailDrawerHandler}
            />
          }
        />
      )}
      <div className="all-contracts-foods-tab-container">
        <div className="btn-wrapper">
          <CustomButton type="primary" icon={<AiOutlineFilter />} className="btn-text">
            فیلتر پیشرفته
          </CustomButton>
          <CustomButton
            type="primary"
            className="btn-text"
            onClick={openCreateDrawerHandler}
          >
            تعریف غذا
          </CustomButton>
        </div>
        <CustomTable<ContractsFoodDataType>
          dataSource={data}
          rowKey="id"
          loading={isContractFoodsLoading}
          columns={AllContractDetailFoodListTableModel({
            viewClickHandler,
          })}
          pagination={paginationConfig}
          className="all-contracts-detail-food-list-table"
          {...TABLE_PROPS(data?.length)}
        />
      </div>
    </>
  );
};

export default FoodsTab;
