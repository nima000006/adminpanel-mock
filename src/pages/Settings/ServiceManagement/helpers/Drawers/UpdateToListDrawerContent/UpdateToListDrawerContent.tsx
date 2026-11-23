import { useEffect, useState } from "react";

import { CheckboxChangeEvent, TransferProps } from "antd";
import { RenderResult, TransferItem } from "antd/es/transfer";
import { toast } from "react-toastify";

import { CustomSingleCheckbox } from "@components/CustomInputs";
import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomTransfer from "@components/CustomInputs/CustomTransfer/CustomTransfer";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import Div from "@components/Renderers/Div/Div";
import { useLazyGetAllBranchesQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import { useUpdateServiceActiveBranchesMutation } from "@infra/states/redux/Apis/business/serviceManagementService/serviceManagementService";
import { GetAllBranchesResponse } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { ServiceManagementSelectedItemsType } from "@pages/Settings/ServiceManagement/@types/@servicesManagement";
import { useServiceManagerContext } from "@pages/Settings/ServiceManagement/State/useServiceManagerContext";

type AddToListDrawerContentProps = {
  closeDrawerHandler: () => void;
  selectedItems: ServiceManagementSelectedItemsType;
};

const SUCCESS_UPDATE_MSG = "برنامه با موفقیت به روزرسانی شد";

const UpdateToListDrawerContent = ({
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

  const [updateService, { isLoading: isUpdateServiceDataLoading }] =
    useUpdateServiceActiveBranchesMutation();

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
  const itemRenderer: (item: TransferItem) => RenderResult = (item: TransferItem) => {
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
  const onUpdateServiceSuccess = async () => {
    toast.success(SUCCESS_UPDATE_MSG, { toastId: SUCCESS_UPDATE_MSG });
    drawerCloseHandler();
    drawerUpdated();
  };

  // onSubmit
  const onSubmit = () => {
    if (selectedItems?.branch?.id !== null && selectedItems?.staff?.id !== null) {
      updateService({
        serviceId: state?.activeApps?.id,
        branches: targetKeys as number[],
        branchServiceType: selectedItems?.branch?.id,
        staffType: selectedItems?.staff?.id,
        isAll: isAllBranchSelected,
      })
        .unwrap()
        .then(onUpdateServiceSuccess);
    }
  };

  // renderFooter
  const renderFooter: TransferProps["footer"] = (_, info) => {
    if (info?.direction === "left") {
      return (
        <CustomButton
          size="small"
          type="primary"
          ghost
          style={{
            display: "flex",
            margin: 8,
            marginInlineStart: "auto",
          }}
          onClick={() => setTargetKeys([])}
        >
          خالی کردن لیست
        </CustomButton>
      );
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
              loading={isUpdateServiceDataLoading}
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
        // key={(item) => item?.key}
        onChange={onChange}
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        onSelectChange={onSelectChange}
        titles={["تمام واحد ها", "واحد های انتخاب شده"]}
        dataSource={transferSourceCreator(allBranchesData)}
        render={itemRenderer}
        pagination
        showSearch
        footer={renderFooter}
        disabled={isAllBranchSelected}
      />
    </Div>
  );
};

export default UpdateToListDrawerContent;
