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
import { useLazyGetAllVendorContractListQuery } from "@infra/states/redux/Apis/food/vendor/vendorApi";

import {
  ContractDtoList,
  GetAllVendorContractListResponse,
} from "./@types/@allVendorContracts";
import AllVendorContractsContent from "../../drawer/AllVendorContractDrawer/AllVendorContractDrawer";
import { AllVendorContractTableModel } from "../../models/AllVendorContractTablemodel/AllVendorContractTablemodel";
import "./_allVendorContracts.scss";

const AllVendorContractTabContent = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState({ isOpen: false, id: -1 });
  const [dataSource, setDataSource] = useState<ContractDtoList[] | []>([]);

  const {
    params: { id },
  } = useQueryParams();

  //? ================================  Api Calls ================================
  // get table list
  const [getTableList, { isFetching: getTableListLoading }] =
    useLazyGetAllVendorContractListQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getTableList({ vendorId: +id }).unwrap().then(onGetTableListSuccess);
    }
  }, [id]);

  //* ================================ Util Functions ================================
  const onGetTableListSuccess = async (value: GetAllVendorContractListResponse) => {
    if (value?.status === 200) {
      setDataSource(value?.data?.contractDtoList);
    } else {
      return toast.error((value?.data || value?.msg) as any, {
        toastId: (value?.data || value?.msg) as any,
      });
    }
  };

  const viewClickHandler = useCallback(
    (id: number) => {
      setIsDrawerOpen({ isOpen: true, id });
    },
    [id]
  );

  const closeDrawerHandler = useCallback(() => {
    setIsDrawerOpen({ isOpen: false, id: -1 });
  }, []);

  const columns = useMemo(
    () => AllVendorContractTableModel({ viewClickHandler: viewClickHandler }),
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
            <AllVendorContractsContent
              closeDrawerHandler={closeDrawerHandler}
              id={isDrawerOpen?.id}
            />
          }
        />
      )}
      <div className="all-vendors-contract-tab-container">
        <ToolBox
          rightSide={
            <CustomButton type="primary" icon={<AiOutlineFilter />} disabled>
              فیلتر پیشرفته
            </CustomButton>
          }
        />
        <CustomTable<ContractDtoList>
          dataSource={dataSource}
          columns={columns}
          pagination={paginationConfig}
          rowKey="id"
          loading={getTableListLoading}
          {...TABLE_PROPS(dataSource?.length)}
        />
      </div>
    </>
  );
};

export default AllVendorContractTabContent;
