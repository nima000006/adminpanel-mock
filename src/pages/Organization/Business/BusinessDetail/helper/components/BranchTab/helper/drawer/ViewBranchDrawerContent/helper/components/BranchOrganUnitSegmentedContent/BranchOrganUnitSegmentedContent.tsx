import { useState } from "react";

import { TransferProps } from "antd";
import { RenderResult, TransferItem } from "antd/es/transfer";

import CustomTransfer from "@components/CustomInputs/CustomTransfer/CustomTransfer";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { BranchOrganUnitSegmentedContentDataType } from "@pages/Organization/Business/BusinessDetail/helper/components/BranchTab/helper/drawer/ViewBranchDrawerContent/helper/components/BranchOrganUnitSegmentedContent/@types/@branchOrganUnitSegmentedContent";

import BranchOrganUnitSegmentedTableModel from "../../models/BranchOrganUnitSegmentedTableModel";
import "./_branchOrganUnitSegmentedContent.scss";

const mockData: BranchOrganUnitSegmentedContentDataType[] = [
  {
    unitTitle: "صمیم",
    unitType: "موسس",
    branch: "شعبه استان اذربایجان غربی",
    parentUnit: "هیات امناء",
  },
];

type ItemRenderer = (item: TransferItem) => RenderResult;

type DataSourceType = {
  id: number;
  title: string;
};

const dataSource = [
  { id: 1, title: "مدیر کل سیستم" },
  { id: 2, title: "2مدیر کل سیستم" },
  { id: 3, title: "3مدیر کل سیستم" },
  { id: 4, title: "4مدیر کل سیستم" },
];

const BranchOrganUnitSegmentedContent = () => {
  const [targetKeys, setTargetKeys] = useState<TransferProps["targetKeys"]>();
  const [selectedKeys, setSelectedKeys] = useState<TransferProps["targetKeys"]>([]);

  const onChange: TransferProps["onChange"] = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys);
  };

  const onSelectChange: TransferProps["onSelectChange"] = (
    sourceSelectedKeys,
    targetSelectedKeys
  ) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  const itemRenderer: ItemRenderer = (item: TransferItem) => {
    return {
      key: item?.key || undefined,
      label: <>{item?.title}</> || <>نامشخص</>,
      value: item?.key?.toString() || "",
    };
  };

  const transferSourceCreator: (data?: DataSourceType[]) => TransferItem[] = (
    data?: DataSourceType[]
  ) => {
    if (!data) return [];
    return data?.map((item) => {
      return {
        key: item?.id,
        title: item?.title,
        description: item?.id?.toString(),
      };
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="organ-unit-segmented-content-container">
      <div>
        <CustomDivider text={"لیست واحدهای زیر مجموعه"} />
        <CustomTable<BranchOrganUnitSegmentedContentDataType>
          dataSource={mockData}
          columns={BranchOrganUnitSegmentedTableModel()}
          pagination={paginationConfig}
          {...TABLE_PROPS(mockData?.length)}
          // loading={}
        />
      </div>
      <div>
        <CustomDivider text={"نوع واحدهای قابل دسترس در شعبه"} />
        <CustomTransfer
          onChange={onChange}
          targetKeys={targetKeys}
          selectedKeys={selectedKeys}
          onSelectChange={onSelectChange}
          titles={["لیست انواع واحدها", "لیست در دسترس‌ها"]}
          dataSource={transferSourceCreator(dataSource)}
          render={itemRenderer}
          pagination
          showSearch
        />
      </div>
    </div>
  );
};
export default BranchOrganUnitSegmentedContent;
