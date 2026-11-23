import { useState } from "react";

import { Dropdown } from "antd";
import { AiOutlineClose, AiOutlineFilter } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomRangePicker from "@components/CustomInputs/CustomRangePicker/CustomRangePicker";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import { exportMenu } from "../../../utils/transactionUtils";
import OnAccountTransactionDetailDrawerContent from "./helper/drawer/OnAccountTransactionDetailDrawerContent/OnAccountTransactionDetailDrawerContent";
import TransactionsOnAccountStepListTableModel from "./helper/models/TransactionsOnAccountStepListTableModel/TransactionsOnAccountStepListTableModel";
import "./_onAccountStep.scss";
const OnAccountStep = ({ dataSource }: { dataSource: [] }) => {
  const [openDetailDrawer, setIsOpenDetailDrawer] = useState<{
    isOpen: boolean;
    id: number;
  }>({ isOpen: false, id: -1 });

  // btn handler
  const viewBtnHandler = (id: number) => {
    setIsOpenDetailDrawer({ isOpen: true, id });
  };

  // drawer handler
  const closeDrawerHandler = () => {
    setIsOpenDetailDrawer({ isOpen: false, id: -1 });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {openDetailDrawer?.isOpen && (
        <CustomDrawer
          open={openDetailDrawer?.isOpen}
          onClose={closeDrawerHandler}
          closeIcon={<AiOutlineClose />}
          content={
            <OnAccountTransactionDetailDrawerContent
              closeDrawer={closeDrawerHandler}
              data={dataSource}
              id={openDetailDrawer?.id}
            />
          }
        />
      )}

      <div className="financial-transaction-on-account-step-container">
        <ToolBox
          className="custom-toolbox"
          rightSide={
            <CustomButton icon={<AiOutlineFilter />} size="middle">
              فیلتر پیشرفته
              {/* {filters.length > 0 && <Badge className="badge-container" count={[]} />} */}
            </CustomButton>
          }
          centerSide={<CustomRangePicker name="date" picker="date" />}
          leftSide={
            <Dropdown menu={exportMenu} trigger={["click"]}>
              <CustomButton>
                خروجی <IoIosArrowDown />
              </CustomButton>
            </Dropdown>
          }
        />

        <CustomTable<[]>
          dataSource={dataSource}
          columns={TransactionsOnAccountStepListTableModel({
            viewBtnHandler: viewBtnHandler,
          })}
          pagination={paginationConfig}
          {...TABLE_PROPS(dataSource?.length)}
          className="financial-transaction-on-account-step-Table"
        />
      </div>
    </>
  );
};
export default OnAccountStep;
