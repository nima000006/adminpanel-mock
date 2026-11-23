import { useEffect, useState } from "react";

import { CheckboxChangeEvent } from "antd";
import { RenderResult, TransferItem, TransferProps } from "antd/es/transfer";
import { toast } from "react-toastify";

import { CustomSingleCheckbox } from "@components/CustomInputs";
import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomTransfer from "@components/CustomInputs/CustomTransfer/CustomTransfer";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import Div from "@components/Renderers/Div/Div";
import { useLazyGetAllBranchesQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import { useCreateServiceActiveBranchesMutation } from "@infra/states/redux/Apis/business/serviceManagementService/serviceManagementService";
import { GetAllBranchesResponse } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { ServiceManagementSelectedItemsType } from "@pages/Settings/ServiceManagement/@types/@servicesManagement";
import { useServiceManagerContext } from "@pages/Settings/ServiceManagement/State/useServiceManagerContext";

type AddToListDrawerContentProps = {
  closeDrawerHandler: () => void;
  selectedItems: ServiceManagementSelectedItemsType;
};

type ItemRenderer = (item: TransferItem) => RenderResult;

const SUCCESS_ADD_MSG = "واحد با موفقیت به لیست افزوده شد";

const AddToListDrawerContent = ({
  closeDrawerHandler,
  selectedItems,
}: AddToListDrawerContentProps) => {
  const { state, drawerUpdated } = useServiceManagerContext();
  const [targetKeys, setTargetKeys] = useState<TransferProps["targetKeys"]>();
  const [selectedKeys, setSelectedKeys] = useState<TransferProps["targetKeys"]>([]);
  const [isAllBranchSelected, setIsAllBranchSelected] = useState(false);

  //? ================================  Api Calls ================================
  const [getAllBranches, { data: allBranchesData, isLoading: allBranchesDataLoading }] =
    useLazyGetAllBranchesQuery();

  const [createService, { isLoading: isCreateServiceDataLoading }] =
    useCreateServiceActiveBranchesMutation();

  //   const initialTargetKeys = state?.selectedBranches;

  //? ================================ Effects ================================
  useEffect(() => {
    getAllBranches();
  }, []);

  useEffect(() => {
    if (state?.selectedBranches) {
      setTargetKeys(state?.selectedBranches?.map((item) => item?.branchId));
    }
  }, [state?.selectedBranches]);

  //* ================================ Util Functions ================================
  const selectAllBranchHandler = (value: CheckboxChangeEvent) => {
    setIsAllBranchSelected(value?.target?.checked);
  };

  const transferSourceCreator: (data?: GetAllBranchesResponse) => TransferItem[] = (
    data?: GetAllBranchesResponse
  ) => {
    if (!data) return [];
    return data?.map((item) => {
      return {
        key: item?.id,
        title: item?.title,
        description: item?.id?.toString(),
      };
    });
  };

  //
  const onChange: TransferProps["onChange"] = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys);
  };

  const onSelectChange: TransferProps["onSelectChange"] = (
    sourceSelectedKeys,
    targetSelectedKeys
  ) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  //
  const itemRenderer: ItemRenderer = (item: TransferItem) => {
    return {
      key: item?.key || undefined,
      label: <>{item?.title}</> || <>نامشخص</>,
      value: item?.key?.toString() || "",
    };
  };

  // drawerCloseHandler
  const drawerCloseHandler = () => {
    setSelectedKeys([]);
    setTargetKeys([]);
    closeDrawerHandler();
  };

  // onCreateServiceSuccess
  const onCreateServiceSuccess = async () => {
    toast.success(SUCCESS_ADD_MSG, { toastId: SUCCESS_ADD_MSG });
    drawerCloseHandler();
    drawerUpdated();
  };

  // onSubmit
  const onSubmit = () => {
    if (selectedItems?.branch?.id !== null && selectedItems?.staff?.id !== null) {
      createService({
        serviceId: state?.activeApps?.id,
        branches: targetKeys as number[],
        branchServiceType: selectedItems?.branch?.id,
        staffType: selectedItems?.staff?.id,
        isAll: isAllBranchSelected,
      })
        .unwrap()
        .then(onCreateServiceSuccess);
    }
  };

  return (
    <Div loading={allBranchesDataLoading}>
      <CustomDrawerHeader
        hasLeftSide
        leftSideContent={
          <>
            <CustomButton onClick={drawerCloseHandler}>انصراف</CustomButton>
            <CustomButton
              type="primary"
              loading={isCreateServiceDataLoading}
              onClick={onSubmit}
            >
              ثبت
            </CustomButton>
          </>
        }
        title="افزودن به لیست"
        closeDrawerHandler={drawerCloseHandler}
      />
      <CustomSingleCheckbox
        name="acceptTerms"
        label="انتخاب تمام واحدها"
        valuePropName="checked"
        hasVerticalLabel
        onChange={selectAllBranchHandler}
      >
        تمام واحدها
      </CustomSingleCheckbox>

      <CustomTransfer
        onChange={onChange}
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        onSelectChange={onSelectChange}
        titles={["تمام واحد ها", "واحد های انتخاب شده"]}
        dataSource={transferSourceCreator(allBranchesData)}
        render={itemRenderer}
        pagination
        showSearch
        disabled={isAllBranchSelected}
      />
    </Div>
  );
};

export default AddToListDrawerContent;
