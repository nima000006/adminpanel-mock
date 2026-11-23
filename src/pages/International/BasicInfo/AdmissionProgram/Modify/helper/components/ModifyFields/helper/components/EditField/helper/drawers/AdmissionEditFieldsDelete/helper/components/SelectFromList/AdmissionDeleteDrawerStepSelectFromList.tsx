import { useMemo, useState } from "react";

import { Col, Row } from "antd";
import { Key } from "antd/es/table/interface";
import { PiMagnifyingGlass } from "react-icons/pi";

import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { InternationalAdmissionDetailFieldsInfoType } from "@pages/International/BasicInfo/AdmissionProgram/Detail/helper/components/DetailFields/@types/@admissionProgramDetailFields";
import AdmissionProgramDetailFieldsTableModel from "@pages/International/BasicInfo/AdmissionProgram/Detail/helper/components/DetailFields/helper/models/AdmissionProgramDetailFields/AdmissionProgramDetailFieldsTableModel";
import "./_admissionDeleteDrawerStepSelectFromList.scss";

const AdmissionDeleteDrawerStepSelectFromList = ({
  dataSource,
  setSelectedRow,
  selectedKeys,
}: {
  dataSource: InternationalAdmissionDetailFieldsInfoType[];
  setSelectedRow: React.Dispatch<
    React.SetStateAction<InternationalAdmissionDetailFieldsInfoType[]>
  >;
  selectedKeys: number[];
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[] | []>(selectedKeys);
  const [searchValue, setSearchValue] = useState<string>("");

  const rowSelection = {
    selectedRowKeys,
    onChange: (
      selectedRowKeys: Key[],
      selectedRows: InternationalAdmissionDetailFieldsInfoType[]
    ) => {
      setSelectedRowKeys(selectedRowKeys);
      setSelectedRow(selectedRows);
    },
  };
  //* ================================ Util Functions ================================

  const filteredData = useMemo(() => {
    if (!searchValue) return dataSource;

    const lowerSearch = searchValue.toLowerCase();

    return dataSource.filter(
      (item) =>
        item.fieldTitle.toLowerCase().includes(lowerSearch) ||
        item.studyGroupTitle.toLowerCase().includes(lowerSearch) ||
        item.degreeTitle.toLowerCase().includes(lowerSearch) ||
        item.branchTitle.toLowerCase().includes(lowerSearch)
    );
  }, [dataSource, searchValue]);

  return (
    <div className="admission-delete-drawer-step-select-from-list-container">
      <CustomAlert
        message="راهنما!"
        description="با انتخاب موارد از لیست، می‌توانید آن‌ها را حذف کنید."
        showIcon
        type="info"
      />
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <CustomInput
            name="search"
            placeholder="جستجو در لیست"
            suffix={<PiMagnifyingGlass />}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </Col>
      </Row>
      <CustomTable
        dataSource={filteredData}
        columns={AdmissionProgramDetailFieldsTableModel()}
        pagination={paginationConfig}
        rowSelection={{
          type: "checkbox",
          columnWidth: "30px",
          ...rowSelection,
        }}
        {...TABLE_PROPS(filteredData?.length)}
        rowKey="branchFieldId"
        className="international-admission-table"
      />
    </div>
  );
};

export default AdmissionDeleteDrawerStepSelectFromList;
