import { useEffect, useState } from "react";

import { Dropdown, MenuProps, Row, Tabs, TabsProps } from "antd";
import { IoIosArrowDown } from "react-icons/io";
import { PiFilePdf, PiFileXls } from "react-icons/pi";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetContractsDetailDescriptionQuery } from "@infra/states/redux/Apis/contracts/contractsDetail/contractsDetail";

import { GetContractsDetailDescriptionResponse } from "./@types/@getContractsDetailDescriptionTypes";
import ContractsDetailAttachments from "./helpers/components/ContractsDetailAttachments/ContractsDetailAttachments";
import ContractsDetailOtherBonds from "./helpers/components/ContractsDetailOtherBonds/ContractsDetailOtherBonds";
import ContractsDetailTabContent from "./helpers/components/ContractsDetailTabContent/ContractsDetailTabContent";
import "./_contractsDetailDescription.scss";

const ContractsDetailDescription = () => {
  const [descData, setDescData] = useState<GetContractsDetailDescriptionResponse>();
  const { params } = useQueryParams();
  const [activeTab, setActiveTab] = useState("commitments");

  //? ================================ Api call ================================
  const [
    ContractsDetailDescription,
    { isFetching: isContractsDetailDescriptionLoading },
  ] = useLazyGetContractsDetailDescriptionQuery();

  //? ================================ Effects  ================================

  useEffect(() => {
    if (params?.id) {
      ContractsDetailDescription({ id: +params?.id })
        .unwrap()
        .then(ContractsDetailDescriptionSuccess);
    }
  }, [params?.id]);

  useEffect(() => {
    // اگر دیتا وجود ندارد، تب را روی "۶" (سایر بندها) بگذار
    if (!descData) {
      setActiveTab("6");
    }
  }, [descData]);

  //? ================================ Helper to map API data to Tabs ================================
  const mapApiDataToTabs = (): TabsProps["items"] => {
    if (!descData) return [];

    const mappingConfig = [
      { key: "commitments", label: "تعهدات", title: "تعهدات" },
      { key: "guarantees", label: "ضمانت نامه و تضامین", title: "ضمانت نامه و تضامین" },
      { key: "liquidatedDamages", label: "جرایم و خسارات", title: "جرایم و خسارات" },
      { key: "disputedResolution", label: "حل اختلافات", title: "حل اختلافات" },
      {
        key: "accountingSettlementConditions",
        label: "شرایط پرداخت و تسویه حساب",
        title: "شرایط پرداخت و تسویه حساب",
      },
      { key: "terminationConditions", label: "شرایط فسخ", title: "شرایط فسخ" },
    ];

    return mappingConfig.map((config) => {
      const dataItem =
        descData[config.key as keyof GetContractsDetailDescriptionResponse];

      const contentText =
        dataItem && typeof dataItem === "object" && "clause" in dataItem
          ? dataItem.clause
          : "متن‌بندی برای این بخش ثبت نشده است.";

      return {
        key: config.key,
        label: config.label,
        children: (
          <ContractsDetailTabContent
            title={dataPlaceHolder({ data: config.title })}
            content={dataPlaceHolder({ data: contentText })}
          />
        ),
      };
    });
  };
  // ================================ Util function  ================================

  const ContractsDetailDescriptionSuccess = (
    res: GetContractsDetailDescriptionResponse
  ) => {
    setDescData(res);
    setActiveTab("commitments");
  };

  //? ================================ Components ================================
  const items: TabsProps["items"] = [
    ...(mapApiDataToTabs() || []),
    {
      key: "6",
      label: "سایر بند ها",
      children: <ContractsDetailOtherBonds data={descData?.other || []} />,
    },
    {
      key: "7",
      label: "فایل پیوست",
      children: <ContractsDetailAttachments data={descData?.files || []} />,
    },
  ];

  const exportMenu: MenuProps = {
    items: [
      {
        label: (
          <span className="flex items-center gap-2">
            <PiFilePdf />
            خروجی PDF
          </span>
        ),
        key: "pdf",
      },
      {
        label: (
          <span className="flex items-center gap-2">
            <PiFileXls />
            خروجی Excel
          </span>
        ),
        key: "excel",
      },
    ],
  };

  // ================================ Utils function ================================

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div
      loading={isContractsDetailDescriptionLoading}
      className="contracts-detail-description-container"
    >
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol span={24} label="عنوان قرارداد" value={descData?.title} />
        <SingleVerticalWithCol
          span={24}
          label="موضوع قرارداد "
          value={descData?.subject}
        />
      </Row>
      <CustomDivider
        text={`بند های قراداد (${6})`} //api has 6 rule band
        className="my-10!"
        extraContent={
          // todo[nima] enable when api got ready
          <Dropdown menu={exportMenu} disabled trigger={["click"]}>
            <CustomButton>
              خروجی <IoIosArrowDown />
            </CustomButton>
          </Dropdown>
        }
      />
      <div className="tabs-container">
        <Tabs
          activeKey={activeTab}
          onChange={handleTabChange}
          items={items}
          destroyOnHidden={true}
        />
      </div>
    </Div>
  );
};

export default ContractsDetailDescription;
