import { useEffect, useState } from "react";

import { Descriptions, DescriptionsProps } from "antd";
import { PiUserLight } from "react-icons/pi";
import { Link } from "react-router";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { useLazyGetContractBeneficiaryDetailQuery } from "@infra/states/redux/Apis/contracts/listOfStakeholders/listOfStakeholders";
import { BeneficiaryType } from "@pages/Contract/AddNewContractTemplate/helper/components/ContractsTemplateFinanceCondition/helper/components/AddFinancialRuleDrawerContent/utils/enums";
import { GetContractBeneficiaryDetailResponse } from "@pages/Contract/ListOfStakeholders/ListOfStakeholders/helper/drawers/ContractStakeholdersDetail/@types/@contractStakeholdersDetailDrawerContent";

import { RealVariableDrawerContentProps } from "./@realVariableDrawerContentType/@realVariableDrawerContentType";

const RealVariableDrawerContent = ({
  closeDrawerHandler,
  id,
}: RealVariableDrawerContentProps) => {
  const [detailData, setDetailData] = useState<GetContractBeneficiaryDetailResponse>();

  //? ================================ Api call ================================
  const [
    GetContractsDetailRulesBeneficiariesDetail,
    { isFetching: isGetContractsDetailRulesBeneficiariesDetailLoading },
  ] = useLazyGetContractBeneficiaryDetailQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (!id) return;

    GetContractsDetailRulesBeneficiariesDetail({ id: id })
      .unwrap()
      .then(GetContractsDetailRulesBeneficiariesDetailSuccess);
  }, [id]);

  // ================================ Util functions ================================

  const GetContractsDetailRulesBeneficiariesDetailSuccess = (
    res: GetContractBeneficiaryDetailResponse
  ) => {
    setDetailData(res);
  };

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "قرارداد",
      children: (
        <p className="text-primary-6">
          {dataPlaceHolder({ data: detailData?.contractId })}
        </p>
      ),
    },
    {
      key: "2",
      label: "تاریخ شروع قرارداد",
      children: <p>{dataPlaceHolder({ data: detailData?.startDate, isDate: true })}</p>,
    },
    {
      key: "3",
      label: "تاریخ پایان قرارداد",
      children: <p>{dataPlaceHolder({ data: detailData?.endDate, isDate: true })}</p>,
    },
    {
      key: "4",
      label: "آخرین تغییر وضعیت",
      children: (
        <p>
          {dataPlaceHolder({
            data: detailData?.modifiedDate,
            isDate: true,
          })}
        </p>
      ),
    },
    {
      key: "5",
      label: "ویرایش کننده وضعیت",
      children: dataPlaceHolder({ data: detailData?.modifiedBy }),
    },
    {
      key: "6",
      label: "قالب قرارداد",
      children: (
        <p className="text-primary-6">
          {dataPlaceHolder({ data: detailData?.templateId })}
        </p>
      ),
    },
    {
      key: "7",
      label: "علت غیرفعالسازی",
      children: (
        <p className="text-primary-6">
          {dataPlaceHolder({ data: detailData?.deactivationReason })}
        </p>
      ),
    },
  ];

  // Todo[Atefeh]:Uncomment when api got ready
  // const segmentItems = [
  //   {
  //     id: "1",
  //     children: <ChangeStatusInfoSegmentTable data={mockData} />,
  //   },
  //   {
  //     id: "2",
  //     children: <ChangeStatusInfoSegmentTimeLine data={mockData} />,
  //   },
  // ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <CustomDrawerHeader
        title="جزئیات ذینفع متغیر"
        closeDrawerHandler={closeDrawerHandler}
      />

      <Div
        loading={isGetContractsDetailRulesBeneficiariesDetailLoading}
        className="flex flex-col gap-10"
      >
        {/* BOX */}
        <div className="bg-neutral-2 m-10! flex flex-col items-center justify-center gap-2 rounded-md p-4!">
          <p>خدمت {dataPlaceHolder({ data: detailData?.categoryTitle })}</p>

          <h3 className="text-neutral-11 text-2xl">
            {dataPlaceHolder({ data: detailData?.beneficiaryName })}
          </h3>

          <p>{detailData?.username}</p>
          <CustomTag color={detailData?.status?.name === "ACTIVE" ? "green" : "red"}>
            {dataPlaceHolder({ data: detailData?.status?.title })}
          </CustomTag>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <CustomTag> قالب ذینفع {detailData?.templateId} </CustomTag>
            <CustomTag>
              {" "}
              سهم {`${dataPlaceHolder({ data: detailData?.partitionCoefficient })}%`}
            </CustomTag>
            {detailData?.beneficiaryRuleType?.name ===
            BeneficiaryType.LEGAL_UNDETERMINED ? (
              <CustomTag>
                {dataPlaceHolder({ data: detailData?.branchType?.title })}
              </CustomTag>
            ) : null}
            <CustomTag>{"تامین کننده قرارداد"}</CustomTag>

            {detailData?.beneficiaryRuleType?.name ===
            BeneficiaryType.LEGAL_UNDETERMINED ? (
              <CustomTag>حقوقی</CustomTag>
            ) : (
              <CustomTag>حقیقی</CustomTag>
            )}
          </div>
        </div>

        {/* CONTRACT DETAIL INFO */}
        <div>
          <CustomDivider
            text="جزئیات قرارداد ذینفع"
            extraContent={
              <Link
                to={{
                  pathname: "",
                  // search: makeSearchParams({
                  //   id: transactionDetail?.userId,
                  // }),
                }}
                className="text-primary-6! flex items-center gap-2"
              >
                <PiUserLight size={16} /> پروفایل کاربر
              </Link>
            }
          />
          <Descriptions
            className="all-transaction-detail-user-descriptions body-regular"
            column={1}
            items={items}
            styles={{
              label: {
                fontWeight: "bold",
                textAlign: "right",
                width: "180px",
              },
            }}
          />
        </div>

        {/* Todo[Atefeh]:Uncomment when api got ready */}
        {/* CHANGE STATUS INFO */}
        {/* <div>
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
        </div> */}
      </Div>
    </div>
  );
};
export default RealVariableDrawerContent;
