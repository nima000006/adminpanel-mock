import { useEffect, useState } from "react";

import { FormInstance } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetLegalMyWalletBankAccountsListQuery } from "@infra/states/redux/Apis/wallet/wallets/walletsApi";
import { MyWalletDetailsMyWalletSearchFormType } from "@pages/Wallet/Wallets/WalletDetails/WalletMyWalletDetails/MyWalletDetailsWalletList/@types/@myWalletDetailsList";

import { MyWalletDetailsWalletBankAccountsDataType } from "../../../../../drawer/MyWalletDetailsYourAccountDrawerContent/@types/@myWalletDetailsyourAccountDrawerContent";
import BankAccountDrawerContent from "../../drawer/MyWalletDetailsBankAccountDrawerContent/MyWalletDetailsBankAccountDrawerContent";
import MyWalletDetailsBankAccountTabTableModel from "../../models/MyWalletDetailsBankAccountTabTableModel/MyWalletDetailsBankAccountTabTableModel";

const MyWalletDetailsBankAccountTab = ({
  walletSearchForm,
}: {
  walletSearchForm: FormInstance<MyWalletDetailsMyWalletSearchFormType>;
}) => {
  const [bankAccountList, setBankAccountList] = useState<
    MyWalletDetailsWalletBankAccountsDataType[]
  >([]);

  const [BankAccountDrawerOpen, setBankAccountDrawerOpen] = useState({
    isOpen: false,
    id: -1,
  });

  const { params: url, setSearchParams } = useQueryParams();

  //? ================================  Api Calls ================================
  const [
    getBankAccountList,
    { data: BankAccountListData, isLoading: isBankAccountListLoading },
  ] = useLazyGetLegalMyWalletBankAccountsListQuery();

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
        setBankAccountList(value?.content as any);
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
            <CustomButton icon={<IoIosArrowDown />} iconPlacement="end" disabled>
              خروجی
            </CustomButton>
          }
        />
        <CustomTable<MyWalletDetailsWalletBankAccountsDataType>
          className="my-wallets-transaction-list-table-container"
          dataSource={bankAccountList}
          columns={MyWalletDetailsBankAccountTabTableModel({
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
          {...TABLE_PROPS(bankAccountList?.length ?? 0)}
          rowKey="id"
          draggableColumns
          draggableId={ExcelCodes.WALLET_MY_WALLET_DETAILS_BANK_ACCOUNT_TAB_TABLE}
        />
      </div>
    </>
  );
};
export default MyWalletDetailsBankAccountTab;
