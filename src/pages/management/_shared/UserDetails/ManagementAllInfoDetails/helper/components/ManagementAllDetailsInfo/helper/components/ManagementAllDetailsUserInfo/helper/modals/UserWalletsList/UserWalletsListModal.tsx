import { useEffect } from "react";

import { Empty, Modal } from "antd";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router";

import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import { dataPlaceHolder, makeSearchParams } from "@infra/helpers/utils";
import { WALLET_ALL_WALLETS_DETAIL_PAGE_ROUTE } from "@infra/router/routes/wallet";
import { useLazyGetPersonalWalletsListByAdvanceFilterQuery } from "@infra/states/redux/Apis/wallet/wallets/walletsApi";
import { WALLET_TYPE } from "@pages/Wallet/Wallets/_shared/utils/walletUtils";
import {
  WALLET_STATUS_COLOR,
  WALLET_STATUS_TEXT,
} from "@pages/Wallet/Wallets/AllWallets/_shared/utils/walletUtils";

import { UserWalletsListModalProps } from "./@types/@userWalletsListModal";

const UserWalletsListModal = ({
  walletModalOpen,
  closeWalletModalHandler,
  nationalCode,
}: UserWalletsListModalProps) => {
  //? ================================  Api Calls ================================
  const [advanceFilter, { isLoading: isAdvanceFilterLoading, data: walletData }] =
    useLazyGetPersonalWalletsListByAdvanceFilterQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (walletModalOpen && nationalCode) {
      advanceFilter({
        pageNumber: 0,
        pageSize: 50, // CTO
        username: nationalCode,
      });
    }
  }, [walletModalOpen]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Modal
      title="لیست کیف پول های کاربر"
      centered
      open={walletModalOpen}
      onCancel={closeWalletModalHandler}
      footer={null}
      className="management-all-details-user-wallet-modal-container"
    >
      <Div loading={isAdvanceFilterLoading} className="flex flex-col gap-4">
        {walletData?.content?.length ? (
          walletData?.content?.map?.((wallet) => (
            <Link
              to={{
                pathname: WALLET_ALL_WALLETS_DETAIL_PAGE_ROUTE,
                search: makeSearchParams({
                  id: wallet?.uuid,
                  from: WALLET_TYPE.staffUser,
                }),
              }}
            >
              <div className="group bg-neutral-3 border-neutral-3 hover:border-primary-4 flex w-full items-center justify-between rounded-lg border p-4 hover:cursor-pointer">
                <div className="flex flex-col gap-2">
                  <CustomTag
                    className="w-fit"
                    color={WALLET_STATUS_COLOR[wallet?.walletStatus?.walletStatusId]}
                  >
                    {WALLET_STATUS_TEXT[wallet?.walletStatus?.walletStatusId]}
                  </CustomTag>
                  <span>{wallet?.uuid}</span>
                  <span>
                    {dataPlaceHolder({
                      data: wallet?.balance?.totalAmount?.toString(),
                      isRial: true,
                      isPrice: true,
                    })}{" "}
                    تومان
                  </span>
                </div>
                <div className="border-neutral-5 group-hover:border-primary-4 cursor-pointer rounded-sm border bg-white! p-[1.5px]">
                  <BsArrowLeft className="group-hover:text-primary-4 text-[#1e1e1e]" />
                </div>
              </div>
            </Link>
          ))
        ) : (
          <Empty />
        )}
      </Div>
    </Modal>
  );
};

export default UserWalletsListModal;
