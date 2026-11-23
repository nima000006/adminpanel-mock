import { useEffect, useState } from "react";

import { FormInstance } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineFilter } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetLegalWalletBankAccountsListQuery } from "@infra/states/redux/Apis/wallet/wallets/walletsApi";
import { RequestBankAccountDataType } from "@pages/Wallet/Requests/BankAccount/BankAccountList/@types/@bankAccountList";
import { AllWalletDetailsMyWalletSearchFormType } from "@pages/Wallet/Wallets/WalletDetails/WalletAllWalletDetails/AllWalletDetailsWalletList/@types/@allWalletDetailsList";

import BankAccountDrawerContent from "../../drawer/AllWalletDetailsBankAccountDrawerContent/AllWalletDetailsBankAccountDrawerContent";
import AllWalletDetailsBankAccountTabTableModel from "../../models/AllWalletDetailsBankAccountTabTableModel/AllWalletDetailsBankAccountTabTableModel";

const AllWalletDetailsBankAccountTab = ({
  walletSearchForm,
}: {
  walletSearchForm: FormInstance<AllWalletDetailsMyWalletSearchFormType>;
}) => {
  const [bankAccountList, setBankAccountList] = useState<RequestBankAccountDataType[]>(
    []
  );

  const [BankAccountDrawerOpen, setBankAccountDrawerOpen] = useState({
    isOpen: false,
    id: -1,
  });

  const { params: url, setSearchParams } = useQueryParams();

  //? ================================  Api Calls ================================
  const [
    getBankAccountList,
    { data: BankAccountListData, isLoading: isBankAccountListLoading },
  ] = useLazyGetLegalWalletBankAccountsListQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    const formData = walletSearchForm.getFieldsValue();
    getBankAccountList({
      pageNumber: url?.page ? Number(url?.page) - 1 : 0,
      pageSize: url?.pageSize ? Number(url?.pageSize) : 8,
      branchId: formData?.branch?.code,
      samimService: formData?.service?.item?.name,
      businessId: formData?.business?.code,
    })
      .unwrap()
      .then((value) => {
        setBankAccountList(value?.content);
      });
  }, [url?.page, url?.pageSize, walletSearchForm]);

  //* ================================ Util Functions ================================
  const viewBtnHandler = (id: number) => {
    setBankAccountDrawerOpen({
      isOpen: true,
      id: id,
    });
  };

  // DRAWER HANDLER
  const closeBankAccountDrawer = () => {
    setBankAccountDrawerOpen({
      isOpen: false,
      id: -1,
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {BankAccountDrawerOpen?.isOpen && (
        <CustomDrawer
          onClose={closeBankAccountDrawer}
          open={BankAccountDrawerOpen?.isOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <BankAccountDrawerContent
              closeDrawerHandler={closeBankAccountDrawer}
              accountId={BankAccountDrawerOpen?.id}
            />
          }
        />
      )}

      <div className="withdraw-wallet-tab-container">
        <ToolBox
          rightSide={
            <CustomButton icon={<AiOutlineFilter />} disabled>
              فیلتر پیشرفته
            </CustomButton>
          }
          leftSide={
            <CustomButton icon={<IoIosArrowDown />} disabled iconPlacement="end">
              خروجی
            </CustomButton>
          }
        />
        <CustomTable<RequestBankAccountDataType>
          className="all-wallets-transaction-list-table-container"
          dataSource={bankAccountList}
          columns={AllWalletDetailsBankAccountTabTableModel({
            viewBtnHandler,
          })}
          loading={isBankAccountListLoading}
          pagination={manualPaginationConfig({
            total: BankAccountListData?.totalElements,
            onChange: (page, pageSize) => {
              setSearchParams({
                ...url,
                page: page?.toString(),
                pageSize: pageSize?.toString(),
              });
            },
            pageNumber: url?.page ? Number(url?.page) : 1,
            defaultPageSize: url?.pageSize ? Number(url?.pageSize) : 8,
          })}
          key={`table-${url?.pageSize || "8"} `}
          rowKey="id"
          draggableColumns
          draggableId={ExcelCodes.WALLET_ALL_WALLET_DETAILS_BANK_ACCOUNT_TAB_TABLE}
        />
      </div>
    </>
  );
};
export default AllWalletDetailsBankAccountTab;
