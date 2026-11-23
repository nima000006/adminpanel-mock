import { Dropdown, Space } from "antd";
import { AiOutlinePlus } from "react-icons/ai";
import { PiDotsThreeBold } from "react-icons/pi";

import { CustomButton } from "@components/CustomInputs";
import { AllContractsListContractsAddFoodMenuButtonProps } from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListContracts/helper/drawer/_shared/components/AllContractsListContractsAddFoodMenuButton/@types/@allContractsListContractsAddFoodMenuButton";

import type { MenuProps } from "antd";

const AllContractsListContractsAddFoodMenuButton = ({
  onAddMainFood,
  onAddSideDish,
  disabled = false,
}: AllContractsListContractsAddFoodMenuButtonProps) => {
  const menuItems: MenuProps["items"] = [
    {
      key: "add-main-food",
      icon: <AiOutlinePlus />,
      label: "افزودن غذا اصلی",
      onClick: onAddMainFood,
    },
    {
      type: "divider",
    },
    {
      key: "add-side-dish",
      icon: <AiOutlinePlus />,
      label: "افزودن مخلفات",
      onClick: onAddSideDish,
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Space.Compact>
      <CustomButton htmlType="button" icon={<AiOutlinePlus />} disabled={disabled}>
        افزودن غذا
      </CustomButton>
      <Dropdown
        menu={{ items: menuItems }}
        placement="bottomRight"
        trigger={["click"]}
        disabled={disabled}
      >
        <CustomButton htmlType="button" icon={<PiDotsThreeBold />} disabled={disabled}>
          {""}
        </CustomButton>
      </Dropdown>
    </Space.Compact>
  );
};

export default AllContractsListContractsAddFoodMenuButton;
