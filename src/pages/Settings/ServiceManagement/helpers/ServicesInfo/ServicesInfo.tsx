import { useEffect, useState } from "react";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import Div from "@components/Renderers/Div/Div";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { useGetBranchActiveServicesMutation } from "@infra/states/redux/Apis/business/serviceManagementService/serviceManagementService";

import {
  GetBranchActiveServicesResponse,
  ServiceManagementSelectedItemsType,
} from "../../@types/@servicesManagement";
import { useServiceManagerContext } from "../../State/useServiceManagerContext";
import AppServicesTableModel from "../AppServicesTableModel/AppServicesTableModel";

import "./_serviceInfo.scss";

type ServicesInfoProps = {
  setIsRenewListDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddToListDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedItems: ServiceManagementSelectedItemsType;
};

const ServicesInfo = ({
  setIsRenewListDrawerOpen,
  setIsAddToListDrawerOpen,
  selectedItems,
}: ServicesInfoProps) => {
  const { state, setSelectedBranches } = useServiceManagerContext();

  const [dataSource, setDataSource] = useState<GetBranchActiveServicesResponse | null>(
    null
  );

  //? ================================  Api Calls ================================
  const [getServiceActiveBranches, { isLoading: isActiveBrachDataLoading }] =
    useGetBranchActiveServicesMutation();

  // get Data
  const getData = async () => {
    if (
      state?.activeApps?.id > 0 &&
      selectedItems?.branch?.id !== null &&
      selectedItems?.staff?.id !== null
    ) {
      getServiceActiveBranches({
        serviceId: state?.activeApps?.id,
        branchServiceType: selectedItems?.branch?.id,
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

  //!
  const onGetServiceSuccess = async (res: GetBranchActiveServicesResponse) => {
    setSelectedBranches(res?.branchServiceDtoList);
    setDataSource(res);
  };

  return (
    <Div loading={isActiveBrachDataLoading}>
      {state?.activeApps?.id > 0 &&
      selectedItems?.branch?.id !== null &&
      selectedItems?.staff?.id !== null ? (
        <>
          <div className="service-info-btn-container">
            <CustomButton type="primary" onClick={() => setIsAddToListDrawerOpen(true)}>
              افزودن به لیست
            </CustomButton>
            <CustomButton
              type="primary"
              ghost
              onClick={() => setIsRenewListDrawerOpen(true)}
            >
              بازنویسی لیست
            </CustomButton>
          </div>

          {dataSource?.isAll ? (
            <div className="my-12! flex justify-center">
              <p className="max-w-96 rounded-xl border border-dashed border-gray-300 p-4! text-center text-lg">
                این سرویس برای{" "}
                <span className="font-bold">{selectedItems?.staff?.title}</span> و بخش{" "}
                <span className="font-bold">{selectedItems?.branch?.title}</span> برای همه
                ی واحد ها فعال می باشد.
              </p>
            </div>
          ) : (
            <CustomTable
              rowKey="id"
              dataSource={dataSource?.branchServiceDtoList}
              columns={AppServicesTableModel}
              loading={isActiveBrachDataLoading}
              pagination={paginationConfig}
              {...TABLE_PROPS(dataSource?.branchServiceDtoList?.length || 0)}
            />
          )}
        </>
      ) : (
        ""
      )}
    </Div>
  );
};

export default ServicesInfo;
