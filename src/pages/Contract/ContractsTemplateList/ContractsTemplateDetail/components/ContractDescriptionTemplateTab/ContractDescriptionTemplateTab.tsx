import { useState } from "react";

import { Dropdown, MenuProps, Row, TabsProps } from "antd";
import { IoIosArrowDown } from "react-icons/io";
import { PiFilePdf, PiFileXls } from "react-icons/pi";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTabs from "@components/Renderers/CustomTabs/CustomTabs";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import useQueryParams from "@infra/hooks/useQueryParams";

import { ContractDescriptionTemplateTabProps } from "./@types/@contractDescriptionTemplateTabProps";
import ContractClauseDetails from "./helper/components/ContractClauseDetails/ContractClauseDetails";
import ContractsTemplateDetailAttachments from "./helper/components/ContractsTemplateDetailAttachments/ContractsTemplateDetailAttachments";
import ContractsTemplateDetailOtherClause from "./helper/components/ContractsTemplateDetailOtherClause/ContractsTemplateDetailOtherClause";

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

const ContractDescriptionTemplateTab = ({
  dataSource,
}: ContractDescriptionTemplateTabProps) => {
  const { params } = useQueryParams();
  const [activeTab, setActiveTab] = useState(params.subTab || "0");

  //? ================================ Components ================================
  const items: TabsProps["items"] = [
    {
      key: "0",
      label: "تعهدات",
      children: (
        <ContractClauseDetails
          title={dataSource?.commitments?.title}
          desc={dataSource?.commitments?.clause}
        />
      ),
    },
    {
      key: "1",
      label: "ضمانت نامه و تضمین ",
      children: (
        <ContractClauseDetails
          title={dataSource?.guarantees?.title}
          desc={dataSource?.guarantees?.clause}
        />
      ),
    },
    {
      key: "2",
      label: "جرائم وخسارات",
      children: (
        <ContractClauseDetails
          title={dataSource?.liquidatedDamages?.title}
          desc={dataSource?.liquidatedDamages?.clause}
        />
      ),
    },
    {
      key: "3",
      label: "حل اختلافات",
      children: (
        <ContractClauseDetails
          title={dataSource?.disputedResolution?.title}
          desc={dataSource?.disputedResolution?.clause}
        />
      ),
    },
    {
      key: "4",
      label: "شرایط پرداخت و تسویه حساب",
      children: (
        <ContractClauseDetails
          title={dataSource?.accountingSettlementConditions?.title}
          desc={dataSource?.accountingSettlementConditions?.clause}
        />
      ),
    },
    {
      key: "5",
      label: "شرایط فسخ ",
      children: (
        <ContractClauseDetails
          title={dataSource?.terminationConditions?.title}
          desc={dataSource?.terminationConditions?.clause}
        />
      ),
    },
    {
      key: "6",
      label: "سایر بند ها",
      children: <ContractsTemplateDetailOtherClause data={dataSource} />,
    },
    {
      key: "7",
      label: "فایل پیوست",
      children: <ContractsTemplateDetailAttachments data={dataSource} />,
    },
  ];

  // ================================ Utils function ================================

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex flex-col gap-10">
      <Row className="flex flex-col gap-6">
        <SingleVerticalWithCol
          span={24}
          label="عنوان قرارداد"
          value={dataSource?.title}
        />
        <SingleVerticalWithCol
          span={24}
          label="موضوع قرارداد "
          value={dataSource?.subject}
        />
      </Row>

      <div>
        <CustomDivider
          text={`بند های قراداد (${6})`} // we have 6 band of contract and that is static
          extraContent={
            <Dropdown menu={exportMenu} trigger={["click"]}>
              <CustomButton disabled>
                خروجی <IoIosArrowDown />
              </CustomButton>
            </Dropdown>
          }
        />

        <CustomTabs
          activeKey={activeTab}
          onChange={handleTabChange}
          items={items}
          destroyOnHidden={true}
        />
      </div>
    </div>
  );
};

export default ContractDescriptionTemplateTab;
