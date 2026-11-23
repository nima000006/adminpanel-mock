import { useEffect, useState } from "react";

import { Form } from "antd";
import dayjs from "dayjs";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineFilter } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetMyLegalWalletTransactionListAdvanceFilterQuery } from "@infra/states/redux/Apis/wallet/wallets/walletsApi";
import { hasActiveKeyWallet } from "@pages/Wallet/_shared/hasActiveKeyWallet";

import { MyTransactionDataType } from "./@types/@myWalletDetailsTransactionSegmentTable";
import MyWalletTransactionSegmentTableModel from "../../models/MyWalletDetailsTransactionSegmentTableModel/MyWalletDetailsTransactionSegmentTableModel";
import MyWalletDetailsTransactionSegmentMoreDetailDrawerContent from "./helper/drawer/MyWalletDetailsTransactionSegmentMoreDetailDrawerContent/MyWalletDetailsTransactionSegmentMoreDetailDrawerContent";
import useMyWalletDetailsAdvanceFilter from "./helper/modal/advanceModal/MyWalletDetailsAdvanceFilter";

import "./_myWalletDetailsTransactionSegmentTable.scss";

const TABLE_DEPENDENCIES = ["uuid", "trackNo"];
const advanceFilterItems = ["dateDateStart", "dateDateEnd"];

const MyWalletDetailsTransactionSegmentTable = ({
  walletUuid,
}: {
  walletUuid: string | undefined;
}) => {
  const [dataSource, setDataSource] = useState<MyTransactionDataType[]>([]);

  const [userTransactionModalOpen, setUserTransactionModalOpen] = useState({
    isOpen: false,
    id: "",
  });

  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);
  const [badgeCount, setBadgeCount] = useState(0);

  const [form] = Form.useForm<{ date: [string, string] }>();
  const { filterItemsList } = useMyWalletDetailsAdvanceFilter();

  const { params: url, setSearchParams } = useQueryParams();

  //? ================================  Api Calls ================================
  const [
    getTransactionList,
    { data: transactionListData, isFetching: isTransactionListLoading },
  ] = useLazyGetMyLegalWalletTransactionListAdvanceFilterQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (walletUuid) {
      if (hasActiveKeyWallet(url, advanceFilterItems)) {
        // Format dates: from should be start of day (00:00:00), to should be end of day (23:59:59) or current time if today
        let formattedFrom: string | undefined;
        let formattedTo: string | undefined;

        if (url?.dateDateStart) {
          formattedFrom = dayjs(url.dateDateStart).startOf("day").utc().toISOString();
        }

        if (url?.dateDateEnd) {
          const now = dayjs();
          const endDate = dayjs(url.dateDateEnd);

          const isToday =
            endDate.year() === now.year() &&
            endDate.month() === now.month() &&
            endDate.date() === now.date();

          if (isToday) {
            // اگر تاریخ مربوط به امروز باشد تا همین لحظه سیستم
            formattedTo = now.utc().toISOString();
          } else {
            // تا پایان روز 23:59:59
            formattedTo = endDate.endOf("day").utc().toISOString();
          }
        }

        const filters = {
          ...(formattedFrom && { from: formattedFrom }),
          ...(formattedTo && { to: formattedTo }),
        };
        getTransactionList({
          pageNumber: url?.page ? Number(url?.page) - 1 : 0,
          pageSize: url?.pageSize ? Number(url?.pageSize) : 8,
          walletUuid: walletUuid,
          uuid: url?.uuid && url?.uuid,
          trackNo: url?.trackNo && url?.trackNo,
          ...filters,
        })
          .unwrap()
          .then((value) => {
            setDataSource(value?.content);
          });
      } else {
        getTransactionList({
          pageNumber: url?.page ? Number(url?.page) - 1 : 0,
          pageSize: url?.pageSize ? Number(url?.pageSize) : 8,
          walletUuid: walletUuid,
          uuid: url?.uuid && url?.uuid,
          trackNo: url?.trackNo && url?.trackNo,
        })
          .unwrap()
          .then((value) => {
            setDataSource(value?.content);
          });
      }
    }
  }, [
    url?.page,
    url?.pageSize,
    walletUuid,
    ...TABLE_DEPENDENCIES.map((item) => url?.[item]),
    ...advanceFilterItems.map((item) => url?.[item]),
  ]);

  //* ================================ Util Functions ================================
  const moreDetailTransactionBtnHandler = (uuid: string) => {
    setUserTransactionModalOpen({ isOpen: true, id: uuid });
  };
  const closeDrawer = () => {
    setUserTransactionModalOpen({ isOpen: false, id: "" });
  };
  const openAdvanceFilterHandler = () => {
    setAdvanceModalOpen(true);
  };

  const closeAdvanceFilterHandler = () => {
    setAdvanceModalOpen(false);
    form.resetFields();
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {userTransactionModalOpen?.isOpen && (
        <CustomDrawer
          onClose={closeDrawer}
          open={userTransactionModalOpen?.isOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <MyWalletDetailsTransactionSegmentMoreDetailDrawerContent
              closeDrawerHandler={closeDrawer}
              transactionUuid={userTransactionModalOpen.id}
            />
          }
        />
      )}
      {advanceModalOpen && (
        <AdvanceFilterModal
          isModalOpen={advanceModalOpen}
          closeModalHandler={closeAdvanceFilterHandler}
          filterItemsList={filterItemsList}
          form={form}
          badgeCounter={(amount) => setBadgeCount(amount)}
          defaultParams={url}
        />
      )}

      <div className="my-wallet-details-transaction-segment-table-container">
        <ToolBox
          rightSide={
            <CustomBadge count={badgeCount}>
              <CustomButton icon={<AiOutlineFilter />} onClick={openAdvanceFilterHandler}>
                فیلتر پیشرفته
              </CustomButton>
            </CustomBadge>
          }
          leftSide={
            <CustomButton icon={<IoIosArrowDown />} disabled iconPlacement="end">
              خروجی
            </CustomButton>
          }
        />
        <CustomTable<MyTransactionDataType>
          className="my-wallets-transaction-list-table-container"
          dataSource={dataSource}
          columns={MyWalletTransactionSegmentTableModel({
            moreDetailTransactionBtnHandler,
          })}
          loading={isTransactionListLoading}
          pagination={manualPaginationConfig({
            total: transactionListData?.totalElements,
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
          {...TABLE_PROPS(dataSource?.length ?? 0)}
          rowKey="id"
          draggableColumns
          draggableId={
            ExcelCodes.WALLET_MY_WALLET_DETAILS_TRANSACTION_SEGMENT_TABLE_TABLE
          }
        />
      </div>
    </>
  );
};
export default MyWalletDetailsTransactionSegmentTable;
