import { useEffect, useState } from "react";

import { Descriptions } from "antd";
import { PiReceipt } from "react-icons/pi";
import { Link } from "react-router";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import { emptyString } from "@infra/config/global.vars";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { useLazyGetContractBeneficiaryDetailQuery } from "@infra/states/redux/Apis/contracts/listOfStakeholders/listOfStakeholders";

import { ContractStakeholdersDetailDrawerContentProps } from "./@types/@contractStakeholdersDetailDrawerContent";
import ContractStakeholdersDetailTable from "./helper/components/ContractStakeholdersDetailTable/ContractStakeholdersDetailTable";
import ContractStakeholdersDetailTimeLine from "./helper/components/ContractStakeholdersDetailTimeLine/ContractStakeholdersDetailTimeLine";

const ContractStakeholdersDetailDrawerContent = ({
  closeDrawerHandler,
  id,
}: ContractStakeholdersDetailDrawerContentProps) => {
  const [view, setView] = useState("0");

  //? ================================  Api Calls ================================
  const [
    getBeneficiaryDetail,
    { data: getBeneficiaryDetailData, isFetching: isGetBeneficiaryDetailLoading },
  ] = useLazyGetContractBeneficiaryDetailQuery();

  const data = getBeneficiaryDetailData
    ? [
        {
          status: getBeneficiaryDetailData.status?.title,
          startData: getBeneficiaryDetailData?.startDate,
          endDate: getBeneficiaryDetailData?.endDate,
          modifiedBy: getBeneficiaryDetailData.modifiedBy,
          modifiedDate: getBeneficiaryDetailData.modifiedDate,
        },
      ]
    : [];

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getBeneficiaryDetail({ id });
    }
  }, [id]);

  //* ================================ Util Functions ================================
  const contractInfo = [
    {
      key: "1",
      label: "قرارداد",
      children: dataPlaceHolder({ data: getBeneficiaryDetailData?.contractId }),
    },
    {
      key: "2",
      label: "تاریخ شروع قرارداد",
      children: dataPlaceHolder({
        data: getBeneficiaryDetailData?.startDate,
        isDate: true,
      }),
    },
    {
      key: "3",
      label: "تاریخ پایان قرارداد",
      children: dataPlaceHolder({
        data: getBeneficiaryDetailData?.endDate,
        isDate: true,
      }),
    },
    {
      key: "4",
      label: "آخرین تغییر وضعیت",
      children: dataPlaceHolder({
        data: getBeneficiaryDetailData?.modifiedDate,
        isDate: true,
      }),
    },
    {
      key: "5",
      label: "ویرایش کننده وضعیت",
      children: dataPlaceHolder({ data: getBeneficiaryDetailData?.modifiedBy }),
    },
    {
      key: "6",
      label: "قالب قرارداد",
      children: dataPlaceHolder({
        data: getBeneficiaryDetailData?.templateId.toString(),
      }),
    },
  ];

  const segmentItems = [
    {
      id: "1",
      children: <ContractStakeholdersDetailTable data={data} />,
    },
    {
      id: "2",
      children: <ContractStakeholdersDetailTimeLine data={getBeneficiaryDetailData} />,
    },
  ];

  return (
    <div>
      <CustomDrawerHeader
        title="جزئیات ذینفع متغیر"
        closeDrawerHandler={closeDrawerHandler}
      />
      <Div className="flex flex-col gap-10" loading={isGetBeneficiaryDetailLoading}>
        <div className="bg-neutral-2 flex flex-col items-center gap-2 rounded-lg p-8!">
          <span className="body-regular">
            {dataPlaceHolder({ data: getBeneficiaryDetailData?.categoryTitle })}
          </span>
          <h3 className="h3-medium">
            {dataPlaceHolder({ data: getBeneficiaryDetailData?.beneficiaryName })}
          </h3>
          <span className="body-regular">{emptyString}</span>
          <CustomTag color="green">
            {dataPlaceHolder({ data: getBeneficiaryDetailData?.status?.title })}
          </CustomTag>
          <div className="flex gap-2">
            <CustomTag>{emptyString}</CustomTag>
            <CustomTag>{`${dataPlaceHolder({ data: getBeneficiaryDetailData?.partitionCoefficient })}% سهم`}</CustomTag>
            <CustomTag>
              {dataPlaceHolder({
                data: getBeneficiaryDetailData?.beneficiaryRuleType?.title,
              })}
            </CustomTag>
            <CustomTag>{getBeneficiaryDetailData?.isMain ?? "-"}</CustomTag>
            <CustomTag>{emptyString}</CustomTag>
          </div>
        </div>
        <div>
          <CustomDivider
            text="جزئیات قرارداد ذینفع"
            extraContent={
              <Link className="text-primary-6! flex items-center gap-2" to="#">
                <PiReceipt />
                پروفایل کسب و کار
              </Link>
            }
          />
          <Descriptions
            className="body-regular"
            column={1}
            items={contractInfo}
            styles={{
              label: {
                fontWeight: "bold",
                textAlign: "right",
              },
            }}
          />
        </div>
        <div>
          <CustomDivider
            text="اطلاعات تغییر وضعیت"
            extraContent={
              <CustomSegmented
                options={[
                  { value: "0", label: "جدول" },
                  { value: "1", label: "خط زمانی" },
                ]}
                onChange={(value) => setView(value as "0" | "1")}
                value={view}
              />
            }
          />
          {segmentItems[+view]?.children}
        </div>
      </Div>
    </div>
  );
};

export default ContractStakeholdersDetailDrawerContent;
