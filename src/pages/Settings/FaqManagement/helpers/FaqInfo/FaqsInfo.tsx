import { useEffect, useState } from "react";

import { AiOutlineFilter, AiOutlinePlusCircle } from "react-icons/ai";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import Div from "@components/Renderers/Div/Div";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import {
  useDeleteFaqMutation,
  useLazyGetFaqListQuery,
} from "@infra/states/redux/Apis/business/serviceManagementService/serviceManagementService";

import {
  FaqRecordType,
  FaqTableInfoProps,
  GetFaqListResponse,
} from "../../@types/@faqManagement";
import { useFaqManagerContext } from "../../State/useFaqManagerContext";
import AppFaqTableModel from "../AppFaqTableModel/AppFaqTableModel";

import "./_faqsInfo.scss";

const FaqTableInfo = ({
  setIsVisitFaqDrawerOpen,
  setIsModifyFaqDrawerOpen,
}: FaqTableInfoProps) => {
  const { state, drawerUpdated } = useFaqManagerContext();

  const [dataSource, setDataSource] = useState<FaqRecordType[]>([]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState({
    isOpen: false,
    id: -1,
  });

  //? ================================  Api Calls ================================
  const [getFaqActiveBranches, { isFetching: isActiveBrachDataLoading }] =
    useLazyGetFaqListQuery();

  const [deleteFaq, { isLoading: isDeleteFaqLoading }] = useDeleteFaqMutation();

  //  get Data
  const getData = async () => {
    if (state?.activeApps?.id > 0) {
      getFaqActiveBranches({
        serviceId: state?.activeApps?.id,
      })
        .unwrap()
        .then(onGetServiceSuccess);
    }
  };
  //? ================================ Effects ================================
  useEffect(() => {
    getData();
  }, [state?.activeApps, state?.isDataRefreshed]);

  //* ================================ Util Functions ================================
  const onGetServiceSuccess = async (res: GetFaqListResponse) => {
    setDataSource(res);
  };

  //Delete
  const openDeleteModalHandler = (id: number) => {
    setIsDeleteModalOpen({ isOpen: true, id });
  };

  const closeDeleteModalHandler = () => {
    setIsDeleteModalOpen({ isOpen: false, id: -1 });
  };

  const deleteFaqHandler = () => {
    if (isDeleteModalOpen.id > 0) {
      deleteFaq(isDeleteModalOpen.id)
        .unwrap()
        .then(() => {
          closeDeleteModalHandler();
          drawerUpdated();
        });
    }
  };

  // Detail
  const onVisitClickHandler = (id: number) => {
    setIsVisitFaqDrawerOpen({ isOpen: true, id });
  };

  // Create
  const onCreateNewFaqClickHandler = () => {
    setIsModifyFaqDrawerOpen(true);
  };

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={isActiveBrachDataLoading}>
      {state?.activeApps?.id > 0 ? (
        <>
          {isDeleteModalOpen?.isOpen && (
            <ConfirmationModalWithContent
              title="حذف سوال"
              isModalOpen={isDeleteModalOpen?.isOpen}
              confirmBtnText="حذف"
              closeModalHandler={closeDeleteModalHandler}
              onConfirmClickHandler={deleteFaqHandler}
              htmlType="submit"
              isDangerous
              content={<p>آیا از حذف سوال اطمینان دارید؟</p>}
              isConfirmButtonLoading={isDeleteFaqLoading}
            />
          )}

          <CustomDivider text="لیست سوال ها" />
          <div className="main-faq-info-container">
            <ToolBox
              leftSide={
                <CustomButton
                  icon={<AiOutlinePlusCircle />}
                  iconPlacement="end"
                  type="primary"
                  onClick={onCreateNewFaqClickHandler}
                >
                  ایجاد سوال
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
            <CustomTable<FaqRecordType>
              rowKey="id"
              dataSource={dataSource}
              columns={AppFaqTableModel({
                onDeleteClickHandler: openDeleteModalHandler,
                onVisitClickHandler,
              })}
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

export default FaqTableInfo;
