import { AiOutlineFilter } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { PaymentOnAccountListDataType } from "@pages/Finance/Requests/PaymentOnAccount/PaymentOnAccountList/@types/@paymentOnAccountList";

import { PaymentOnAccountConfirmListProps } from "./@types/@paymentOnAccountConfirmListType";
import PaymentOnAccountConfirmListTableModel from "./helper/model/PaymentOnAccountConfirmListTableModel/PaymentOnAccountConfirmListTableModel";
import "./_paymentOnAccountConfirmList.scss";
const PaymentOnAccountConfirmList = ({ data }: PaymentOnAccountConfirmListProps) => {
  //* ================================ Util Functions ================================
  const openAdvanceFilter = () => {};

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="finance-payment-on-account-confirm-list-container">
      <CustomDivider text="لیست درخواست‌های عودت وجه" />
      <ToolBox
        rightSide={
          <CustomBadge count={""}>
            <CustomButton disabled onClick={openAdvanceFilter} icon={<AiOutlineFilter />}>
              فیلتر پیشرفته
            </CustomButton>
          </CustomBadge>
        }
        leftSide={
          <CustomButton icon={<IoIosArrowDown />} iconPlacement="end" disabled>
            خروجی
          </CustomButton>
        }
      />
      <CustomTable<PaymentOnAccountListDataType>
        dataSource={data}
        columns={PaymentOnAccountConfirmListTableModel()}
        // loading={}
        pagination={paginationConfig}
        {...TABLE_PROPS(data.length ?? 0)}
        rowKey="id"
      />
    </div>
  );
};
export default PaymentOnAccountConfirmList;
