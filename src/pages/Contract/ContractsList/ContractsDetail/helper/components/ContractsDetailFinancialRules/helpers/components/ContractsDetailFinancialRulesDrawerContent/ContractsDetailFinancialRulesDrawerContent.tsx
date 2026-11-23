import { useEffect, useState } from "react";

import { Descriptions } from "antd";
import { PiUserLight } from "react-icons/pi";
import { Link } from "react-router";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetContractBeneficiaryDetailQuery } from "@infra/states/redux/Apis/contracts/listOfStakeholders/listOfStakeholders";
import { GetContractBeneficiaryDetailResponse } from "@pages/Contract/ListOfStakeholders/ListOfStakeholders/helper/drawers/ContractStakeholdersDetail/@types/@contractStakeholdersDetailDrawerContent";

import { ContractsDetailFinancialRulesDrawerContentProps } from "./@types/@ContractsDetailFinancialRulesDrawerContentProps";
import { BeneficiaryType } from "./helper/utils/beneficiaryTypeUtils";

const ContractsDetailFinancialRulesDrawerContent = ({
  closeDrawerHandler,
}: ContractsDetailFinancialRulesDrawerContentProps) => {
  const { params } = useQueryParams();
  const [detailData, setDetailData] = useState<GetContractBeneficiaryDetailResponse>();
  const items = [
    {
      label: "قرارداد",
      children:
        detailData?.contractId !== null && detailData?.contractId !== undefined ? (
          <Link className="text-primary-6! underline!" to="/">
            {dataPlaceHolder({ data: detailData?.contractId })}
          </Link>
        ) : (
          <span>{dataPlaceHolder({ data: detailData?.contractId })}</span>
        ),
    },
    {
      label: "تاریخ شروع قرارداد",
      children: (
        <p>
          {dataPlaceHolder({
            data: detailData?.startDate,
            isDate: true,
            customDateFormat: "YYYY-MM-DD ",
          })}
        </p>
      ),
    },
    {
      label: "تاریخ پایان قرارداد",
      children: (
        <p>
          {dataPlaceHolder({
            data: detailData?.endDate,
            isDate: true,
            customDateFormat: "YYYY-MM-DD ",
          })}
        </p>
      ),
    },
    {
      label: "قالب قرارداد",
      children: (
        <Link className="text-primary-6!" to="">
          {dataPlaceHolder({ data: detailData?.templateId?.toString() })}
        </Link>
      ),
    },
  ];
  //? ================================ Api call ================================

  const [
    GetContractsDetailRulesBeneficiariesDetail,
    { isFetching: isGetContractsDetailRulesBeneficiariesDetailLoading },
  ] = useLazyGetContractBeneficiaryDetailQuery();

  //? ================================ Effects ================================

  useEffect(() => {
    if (!params?.beneficiaryId) return;

    GetContractsDetailRulesBeneficiariesDetail({ id: +params?.beneficiaryId })
      .unwrap()
      .then(GetContractsDetailRulesBeneficiariesDetailSuccess);
  }, [params?.beneficiaryId]);

  // ================================ Util functions ================================

  const GetContractsDetailRulesBeneficiariesDetailSuccess = (
    res: GetContractBeneficiaryDetailResponse
  ) => {
    setDetailData(res);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={isGetContractsDetailRulesBeneficiariesDetailLoading}>
      <CustomDrawerHeader title="جزئیات ذینفع" closeDrawerHandler={closeDrawerHandler} />
      <div className="bg-neutral-2 m-10! flex flex-col items-center justify-center gap-2 rounded-md p-4!">
        <p>{dataPlaceHolder({ data: detailData?.categoryTitle })}</p>
        <h3 className="text-neutral-11 text-2xl">
          {dataPlaceHolder({ data: detailData?.beneficiaryName })}
        </h3>
        <p>{dataPlaceHolder({ data: detailData?.username })}</p>
        <div className="flex flex-wrap items-center justify-center gap-1">
          <CustomTag>
            {dataPlaceHolder({ data: detailData?.partitionCoefficient }) + "%"} سهم
          </CustomTag>
          <CustomTag>
            {dataPlaceHolder({ data: detailData?.beneficiaryRuleType?.title })}
          </CustomTag>
          {detailData?.isSupplier && <CustomTag>تامین کننده ی قرارداد</CustomTag>}
          {detailData?.beneficiaryRuleType?.id != null &&
            BeneficiaryType.REAL.includes(detailData?.beneficiaryRuleType?.id) && (
              <CustomTag>حقیقی</CustomTag>
            )}
          {detailData?.beneficiaryRuleType?.id != null &&
            BeneficiaryType.LEGAL.includes(detailData?.beneficiaryRuleType?.id) && (
              <CustomTag>حقوقی</CustomTag>
            )}
          {detailData?.beneficiaryRuleType?.id != null &&
            BeneficiaryType.GROUPING.includes(detailData?.beneficiaryRuleType?.id) && (
              <CustomTag>متغیر</CustomTag>
            )}
        </div>
      </div>
      <CustomDivider
        text="جزئیات قرارداد ذینفع"
        className="mt-10!"
        extraContent={
          <Link
            //todo [nima]: set proper link when user and business id got ready in api
            to={"/"}
            className="text-primary-6! mt-4! flex items-end justify-center gap-2"
          >
            <PiUserLight size={16} />
            {detailData?.beneficiaryRuleType?.id != null &&
              BeneficiaryType.REAL.includes(detailData?.beneficiaryRuleType?.id) && (
                <>پروفایل کاربر</>
              )}
            {detailData?.beneficiaryRuleType?.id != null &&
              BeneficiaryType.LEGAL.includes(detailData?.beneficiaryRuleType?.id) && (
                <>پروفایل کسب و کار</>
              )}
          </Link>
        }
      />
      <Descriptions
        className="body-regular"
        column={1}
        items={items}
        styles={{ label: { width: "160px" } }}
      />
    </Div>
  );
};

export default ContractsDetailFinancialRulesDrawerContent;
