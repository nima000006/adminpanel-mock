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
import { useLazyGetMyContractFoodsQuery } from "@infra/states/redux/Apis/food/contract/contractApi";
import { THIS_FEATURE_IS_NOT_AVAILABLE_NOW } from "@infra/VARS/globalToasts/globalToasts";
import MyContractDetailFoodListTableModel from "@pages/Food/Contracts/MyContracts/MyContractDetail/helpers/models/MyContractDetailFoodListTableModel/MyContractDetailFoodListTableModel";

import { ContractsFoodDataType, GetMyContractFoodsResponse } from "./@types/@foodsTab";
import MyContractCreateFoodDrawerContent from "./components/DrawerContent/CreateFood/MyContractCreateFoodDrawerContent";
import MyContractFoodDetailDrawerContent from "./components/DrawerContent/FoodDetail/MyContractFoodDetailDrawerContent";

import "./_myFoodsTab.scss";

const MyFoodsTab = () => {
  const [data, setData] = useState<ContractsFoodDataType[] | []>([]);
  const [isCreateFoodDrawerOpen, setIsCreateFoodDrawerOpen] = useState(false);
  const [isFoodDetailDrawerOpen, setIsFoodDetailDrawerOpen] = useState({
    isOpen: false,
    id: -1,
  });
  const {
    params: { contractId },
  } = useQueryParams<{ contractId: string }>();

  //? ================================  Api Calls ================================
  const [getContractFoods, { isFetching: isContractFoodsLoading }] =
    useLazyGetMyContractFoodsQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (contractId) {
      getData();
    }
  }, [contractId]);

  //* ================================ Util Functions ================================
  const getContractFoodsOnSuccess = async (value: GetMyContractFoodsResponse) => {
    if (value?.status === 200) {
      setData(value?.data);
    } else {
      return toast.error((value?.data || value?.msg) as any, {
        toastId: (value?.data || value?.msg) as any,
      });
    }
  };

  const getData = () => {
    getContractFoods({ contractId }).unwrap().then(getContractFoodsOnSuccess);
  };

  // Opening Food detail
  const viewClickHandler = (id: number) => {
    setIsFoodDetailDrawerOpen({ isOpen: true, id });
  };
  const closeFoodDetailDrawerHandler = () => {
    setIsFoodDetailDrawerOpen({ isOpen: false, id: -1 });
  };

  // Creating new food drawer
  const openCreateDrawerHandler = () => {
    setIsCreateFoodDrawerOpen(true);
  };
  const closeCreateDrawerHandler = () => {
    setIsCreateFoodDrawerOpen(false);
  };

  const advanceFilterHandler = () => {
    toast.warn(THIS_FEATURE_IS_NOT_AVAILABLE_NOW, {
      toastId: THIS_FEATURE_IS_NOT_AVAILABLE_NOW,
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isCreateFoodDrawerOpen && (
        <CustomDrawer
          onClose={closeCreateDrawerHandler}
          open={isCreateFoodDrawerOpen}
          className="my-contracts-detail-page-drawer"
          closeIcon={<AiOutlineClose />}
          content={
            <MyContractCreateFoodDrawerContent
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
          className="my-contracts-detail-page-drawer"
          closeIcon={<AiOutlineClose />}
          content={
            <MyContractFoodDetailDrawerContent
              id={isFoodDetailDrawerOpen?.id}
              closeDrawerHandler={closeFoodDetailDrawerHandler}
            />
          }
        />
      )}
      <div className="my-contracts-foods-tab-container">
        <div className="btn-wrapper">
          <CustomButton
            type="primary"
            icon={<AiOutlineFilter />}
            className="btn-text"
            onClick={advanceFilterHandler}
          >
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
          columns={MyContractDetailFoodListTableModel({
            viewClickHandler,
          })}
          pagination={paginationConfig}
          className="my-contracts-detail-food-list-table"
          {...TABLE_PROPS(data?.length)}
        />
      </div>
    </>
  );
};

export default MyFoodsTab;
