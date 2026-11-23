import { Button, Dropdown, Space } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

import { FONTSIZE_10 } from "@infra/VARS/globalStyles/globalStyles";

const DropDownChip = ({ menuProps, label }: any) => {
  const chipBtnStyle = {
    borderRadius: "20px",
    // label !== "نحوه ارسال"  &&  backgroundColor: "#f0f0f0" ,
    // border: "1px solid #7a7a7a",
  };
  return (
    <Dropdown menu={menuProps} trigger={["click"]}>
      <Button style={chipBtnStyle}>
        <Space style={{ color: "#7a7a7a" }}>
          {label === "0" && <AiOutlineClose style={{ fontSize: FONTSIZE_10 }} />}
          {label === "0" ? "دریافت پستی" : label === 1 ? "دریافت حضوری" : "نحوه ارسال"}
          {(label !== "0" || label !== "1") && <IoIosArrowDown />}
        </Space>
      </Button>
    </Dropdown>
  );
};

export default DropDownChip;
