import { useEffect, useState } from "react";

import { Col, Row } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import { PiCopy } from "react-icons/pi";

import CustomCard from "@components/CustomCard/CustomCard";
import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import Div from "@components/Renderers/Div/Div";
import { useMyBankAccountPersonalAdvanceFilterMutation } from "@infra/states/redux/Apis/wallet/wallets/walletsApi";
import { WALLET_ACTIVE_STATUS } from "@pages/Wallet/Wallets/AllWallets/_shared/utils/walletUtils";
import "./_managementMyDetailsBankInfo.scss";
import { BankAccountPersonal } from "@pages/Wallet/Wallets/AllWallets/AllWalletsDetail/helper/components/BusinessWalletInfo/@types/@businessWalletInfo";

const ManagementMyDetailsBankInfo = ({ username }: { username?: string }) => {
  const [bankAccountList, setBankAccountList] = useState<BankAccountPersonal[]>([]);

  //? ================================  Api Calls ================================
  const [getBankAccountList, { isLoading: isBankAccountListLoading }] =
    useMyBankAccountPersonalAdvanceFilterMutation();

  useEffect(() => {
    if (username) {
      getBankAccountList({
        pageNumber: 0,
        pageSize: 1000,
        username: username,
      })
        .unwrap()
        .then((value) => {
          setBankAccountList(value);
        });
    }
  }, [username]);

  return (
    <Div
      loading={isBankAccountListLoading}
      className="management-my-detail-bank-info-container"
    >
      <CustomDivider text="اطلاعات حسابهای بانکی" />
      <Row gutter={[16, 16]}>
        {bankAccountList?.length === 0 ? (
          <Col lg={24} md={24} sm={24} xs={24}>
            <CustomEmpty />
          </Col>
        ) : (
          bankAccountList?.map((data) => (
            <Col lg={6} md={12} sm={24} xs={24}>
              <CustomCard className="custom-card">
                <div className="card-header">
                  {/* //Todo[Atefeh]: uncomment when api got ready */}
                  {/* <img src={sampleBankIcon} /> */}
                  <span>{data?.bankName ? data?.bankName : "-"}</span>
                </div>
                <div className="card-number">{data?.cardNumber}</div>
                {/* //Todo[Atefeh]: uncomment when api got ready */}
                {/* <div className="card-info-number">
            <Paragraph
              className="custom-paragraph"
              copyable={{
                icon: (
                  <span>
                    <PiCopy />
                  </span>
                ),
              }}
            >
              5964 2238 19
            </Paragraph>
          </div> */}
                <div className="card-info-number">
                  <Paragraph
                    className="custom-paragraph"
                    copyable={{
                      icon: (
                        <span>
                          <PiCopy />
                        </span>
                      ),
                    }}
                  >
                    {data?.iban}
                  </Paragraph>
                </div>
                <div>
                  <CustomSwitch
                    checkedChildren="فعال"
                    unCheckedChildren="غیرفعال"
                    valuePropName="status"
                    value={WALLET_ACTIVE_STATUS[data?.status]}
                    disabled
                  />
                </div>
              </CustomCard>
            </Col>
          ))
        )}
      </Row>
    </Div>
  );
};
export default ManagementMyDetailsBankInfo;
