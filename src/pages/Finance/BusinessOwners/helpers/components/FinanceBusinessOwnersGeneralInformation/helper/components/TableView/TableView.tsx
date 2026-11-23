import { Dropdown, MenuProps } from "antd";
import { IoIosArrowDown } from "react-icons/io";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import { dataSourceType } from "@pages/Finance/BusinessOwners/helpers/components/FinanceBusinessOwnersGeneralInformation/@types/@financeBusinessOwnersGeneralInformation";

import FinanceBusinessOwnerTableModel from "./helper/model/FinanceBusinessOwnerTableModel";

import "./_tableView.scss";

const dataSource: dataSourceType[] = [
  {
    id: 1,
    business: "دانشگاه ازاد",
    province: "تهران",
    city: "تهران",
    branch: "تهران جنوب",
    beneficiary: "دانشگاه ازاد تهران جنوب",
    service: "خوابگاه",
    clearedIncome: 1000000,
    unsettledIncome: 200000,
    income: 100000,
    settledPercentage: 80,
  },
  {
    id: 1,
    business: "دانشگاه ازاد",
    province: "تهران",
    city: "تهران",
    branch: "تهران جنوب",
    beneficiary: "دانشگاه ازاد تهران جنوب",
    service: "دکتر من",
    clearedIncome: 1000000,
    unsettledIncome: 200000,
    income: 100000,
    settledPercentage: 30,
  },
  {
    id: 1,
    business: "دانشگاه ازاد",
    province: "تهران",
    city: "تهران",
    branch: "تهران جنوب",
    beneficiary: "دانشگاه ازاد تهران جنوب",
    service: "بیمه",
    clearedIncome: 1000000,
    unsettledIncome: 200000,
    income: 100000,
    settledPercentage: 50,
  },
  {
    id: 1,
    business: "دانشگاه ازاد",
    province: "تهران",
    city: "تهران",
    branch: "تهران جنوب",
    beneficiary: "دانشگاه ازاد تهران جنوب",
    service: "تغذیه",
    clearedIncome: 1000000,
    unsettledIncome: 200000,
    income: 100000,
    settledPercentage: 100,
  },
  {
    id: 1,
    business: "دانشگاه ازاد",
    province: "تهران",
    city: "تهران",
    branch: "تهران جنوب",
    beneficiary: "دانشگاه ازاد تهران جنوب",
    service: "کارت هویت دیجیتال",
    clearedIncome: 1000000,
    unsettledIncome: 200000,
    income: 100000,
    settledPercentage: 10,
  },
];

const exportMenu: MenuProps = {
  items: [
    {
      label: "خروجی Excel",
      key: "excel",
    },
    {
      label: "خروجی PDF",
      key: "pdf",
    },
  ],
};
const TableView = ({ viewInfo }: { viewInfo: number }) => {
  const { setSearchParams } = useQueryParams();
  // const [dataSource, setDataSource] = useState([]);

  const viewTransactionBtnHandler = () => {
    setSearchParams({ tab: "2" });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="financial-business-owner-view-table-container">
      <ToolBox
        leftSide={
          <Dropdown menu={exportMenu} trigger={["click"]}>
            <CustomButton>
              خروجی <IoIosArrowDown />
            </CustomButton>
          </Dropdown>
        }
      />
      <CustomTable<dataSourceType>
        dataSource={dataSource ?? []}
        rowKey="id"
        columns={FinanceBusinessOwnerTableModel({
          viewInfo: viewInfo,
          viewTransactionBtnHandler: viewTransactionBtnHandler,
        })}
        pagination={paginationConfig}
        {...TABLE_PROPS(dataSource?.length)}
        className="financial-business-owner-table-container"
      />
    </div>
  );
};
export default TableView;
