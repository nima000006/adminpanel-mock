import { useEffect, useState } from "react";

import { Col, Form, Row } from "antd";
import {
  // PiArrowLineDown,
  // PiArrowLineUpRightLight,
  // PiArrowsLeftRight,
  // PiWaveformLight,
  PiWallet,
} from "react-icons/pi";

// import { CiCalendar } from "react-icons/ci";
import Avatar from "@assets/images/Avatar.webp";
import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import Div from "@components/Renderers/Div/Div";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyAccountingGetAllBusinessQuery,
  useLazyAccountingGetBranchesQuery,
} from "@infra/states/redux/Apis/business/business/businessApi";
import {
  useLazyGetLegalWalletsDetailQuery,
  useLazyGetListOfWalletQuery,
} from "@infra/states/redux/Apis/wallet/wallets/walletsApi";
import { fetchDataIfNeeded, selectNotFoundContent } from "@pages/_shared/utils";
import {
  AccountingGetBranchResponse,
  BranchItem,
} from "@pages/Finance/Accountants/_shared/@types/@accountantsType";
import WalletDetailCards from "@pages/Wallet/Wallets/_shared/components/WalletDetailCards/WalletDetailCards";

import { WalletItem } from "./@types/@allWalletDetailsGetListOfWallet";
import { BusinessWalletDetailsMyWalletSearchFormType } from "./@types/@businessWalletInfo";
import { BusinessWalletInfoProps } from "./helpers/@types/@BusinessWalletInfoProps";
import { serviceIcons } from "./helpers/utils/serviceIcons";

const BusinessWalletInfo = ({
  onWalletSelect,
  onWalletsEmpty,
}: BusinessWalletInfoProps) => {
  const { params } = useQueryParams();
  const [branchData, setBranchData] = useState<BranchItem[]>([]);
  const [renderWallets, setRenderWallets] = useState<WalletItem[]>([]);
  const [selectedWalletUuid, setSelectedWalletUuid] = useState<string | undefined>(
    params.id
  );

  const [walletSearchForm] = Form.useForm<BusinessWalletDetailsMyWalletSearchFormType>();
  const selectedBranch = Form.useWatch("branch", walletSearchForm);
  const branchSelected = !!selectedBranch;

  //? ================================  Api Calls ================================
  const [
    triggerBusinessQuery,
    { data: businessApiData, isFetching: businessLoading, isSuccess: isBusinessSuccess },
  ] = useLazyAccountingGetAllBusinessQuery();

  const [triggerBranchQuery, { isFetching: branchLoading, isSuccess: isBranchSuccess }] =
    useLazyAccountingGetBranchesQuery();

  const [
    getBusinessWalletDetail,
    { data: businessData, isFetching: isGetBusinessDataLoading },
  ] = useLazyGetLegalWalletsDetailQuery();
  const [getListOfWalletWalletDetail, { isFetching: isGetListOfWalletLoading }] =
    useLazyGetListOfWalletQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (selectedWalletUuid) {
      getBusinessWalletDetail({ uuid: selectedWalletUuid });
      onWalletSelect?.(selectedWalletUuid);
    }
  }, [selectedWalletUuid]);

  useEffect(() => {
    // فقط بار اول یا وقتی businessData تغییر می‌کنه و هنوز renderWallets خالیه
    if (!branchSelected && !renderWallets.length && businessData?.wallets?.length) {
      setRenderWallets(businessData.wallets);
    }
  }, [businessData, branchSelected, renderWallets.length]);

  useEffect(() => {
    if (renderWallets.length === 0) {
      onWalletsEmpty?.();
    }
  }, [renderWallets]);
  //* ================================ Util Functions ================================
  const applyWalletsList = (wallets: WalletItem[]) => {
    setRenderWallets(wallets);

    if (!wallets.length) {
      setSelectedWalletUuid(undefined);
      onWalletsEmpty?.();
      return;
    }

    const nextUuid = wallets[0].uuid;

    // Same uuid would not re-trigger the selectedWalletUuid effect — notify parent explicitly
    if (nextUuid === selectedWalletUuid) {
      onWalletSelect?.(nextUuid);
      return;
    }

    setSelectedWalletUuid(nextUuid);
  };

  const getBusinessHandler = () =>
    fetchDataIfNeeded(!isBusinessSuccess, triggerBusinessQuery);

  const onBusinessChangeHandler = (businessId: number) => {
    if (businessId) {
      triggerBranchQuery({ businessId: Number(businessId) })
        .unwrap()
        .then((value: AccountingGetBranchResponse) => setBranchData(value?.content));
    }

    walletSearchForm.setFieldsValue({
      branch: undefined,
      service: undefined,
    });
  };

  const onChangeBranchIdHandler = (branchId: number | string) => {
    const id = Number(branchId);

    if (!id) return;

    walletSearchForm.setFieldsValue({
      service: undefined,
    });

    getListOfWalletWalletDetail({ branchId: id })
      .unwrap()
      .then((value) => {
        applyWalletsList(value?.wallets ?? []);
      });
  };
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="business-wallet-info-container">
      <Form form={walletSearchForm}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={12} lg={8} xl={6}>
            <CustomSelect
              label="کسب و کار"
              name="business"
              options={businessApiData?.content || []}
              loading={businessLoading}
              placeholder="انتخاب کنید"
              onChange={(id) => onBusinessChangeHandler(id as number)}
              onClick={getBusinessHandler}
              form={walletSearchForm}
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={8} xl={6}>
            <CustomSelect
              label="شعبه / واحد"
              name="branch"
              options={branchData}
              placeholder="انتخاب کنید"
              loading={branchLoading}
              onChange={(id) => onChangeBranchIdHandler(id as number)}
              notFoundContent={isBranchSuccess ? selectNotFoundContent : undefined}
              disabled={walletSearchForm.getFieldsValue()?.business ? false : true}
              form={walletSearchForm}
            />
          </Col>
        </Row>
      </Form>

      <Div loading={isGetBusinessDataLoading} className="business-info-wrapper">
        {renderWallets.length <= 0 ? (
          // 👇 نمایش وقتی هیچ کیف پولی نیست
          <CustomEmpty />
        ) : (
          <>
            <div className="business-info-container">
              <img src={Avatar} alt="user-image" className="user-img" />
              <div className="text-profile-button-container">
                <div className="text-container">
                  <span className="business-name">
                    {dataPlaceHolder({ data: businessData?.branchName })}
                  </span>
                  <div className="text-item-container">
                    <span className="title">نام کسب و کار</span>
                    <span className="value">
                      {dataPlaceHolder({ data: businessData?.businessName })}
                    </span>
                  </div>
                  <div className="text-item-container">
                    <span className="title">کد شعبه</span>
                    <span className="value">
                      {dataPlaceHolder({ data: businessData?.branchId })}
                    </span>
                  </div>
                  <div className="text-item-container">
                    <span className="title">استان</span>
                    <span className="value">
                      {dataPlaceHolder({ data: businessData?.province })}
                    </span>
                  </div>
                  <div className="text-item-container">
                    <span className="title">شهر</span>
                    <span className="value">
                      {dataPlaceHolder({ data: businessData?.city })}
                    </span>
                  </div>
                </div>
                <CustomButton disabled>پروفایل شعبه</CustomButton>
              </div>
            </div>

            <Div
              loading={
                branchSelected ? isGetListOfWalletLoading : isGetBusinessDataLoading
              }
            >
              <Row gutter={[16, 16]}>
                {renderWallets.map((item) => {
                  const matchedService = serviceIcons.find(
                    (s) => s.value === item.service
                  );
                  const isSelected = item.uuid === selectedWalletUuid;

                  return (
                    <Col lg={6} md={8} xs={12} key={item.uuid}>
                      <WalletDetailCards
                        className="custom-wallet-details-cards"
                        title={
                          matchedService?.title
                            ? `کیف پول ${matchedService.title}`
                            : item?.service
                              ? `کیف پول ${item.service}`
                              : "سیستمی"
                        }
                        price={
                          dataPlaceHolder({
                            data: item.balance?.totalAmount?.toString() || "0",
                            isPrice: true,
                            isRial: true,
                          }) || "0"
                        }
                        icon={
                          <img
                            src={matchedService?.icon || "/images/superApp.svg"}
                            alt={matchedService?.title || item.service || "کیف پول"}
                            width={20}
                            height={20}
                          />
                        }
                        selected={isSelected}
                        onClick={() => setSelectedWalletUuid(item.uuid)}
                      />
                    </Col>
                  );
                })}
              </Row>
            </Div>

            <Row gutter={[16, 16]} className="wallet-info-container">
              <Col span={24} className="wallet-id-container">
                <div className="wallet-id-items">
                  <span>شناسه کیف پول</span>
                  <span className="wallet-id">
                    {dataPlaceHolder({ data: businessData?.walletUuid })}
                  </span>
                </div>
              </Col>
              <Col span={6}>
                <WalletDetailCards
                  title="موجودی فعلی"
                  price={
                    businessData?.money?.totalAmount
                      ? dataPlaceHolder({
                          data: businessData?.money?.totalAmount?.toString(),
                          isPrice: true,
                          isRial: true,
                        }) || "0"
                      : "0"
                  }
                  icon={<PiWallet color="#262626" size={16} />}
                />
              </Col>
            </Row>
          </>
        )}
      </Div>
    </div>
  );
};

export default BusinessWalletInfo;
