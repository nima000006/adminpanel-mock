import { useState } from "react";

import { Checkbox, Col, Descriptions, DescriptionsProps, Row } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";

import { CustomSelect } from "@components/CustomInputs";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import DeactivationStaffsResidenceTableModel from "@pages/Dormitory/Staffs/_shared/components/DeactivationStaffsModalContent/helper/model/DeactivationStaffsResidenceTableModel/DeactivationStaffsResidenceTableModel";

const mockStaffInfo = {
  fullName: "علی رضایی",
  position: "کارشناس امور خوابگاه",
};

const mockResidenceList: any[] = [
  { id: 1, residenceName: "شهید بهشتی ۱" },
  { id: 2, residenceName: "شهید بهشتی ۲" },
  { id: 3, residenceName: "حضرت زهرا" },
];

const DeactivationStaffsModalContent = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const allRowKeys = mockResidenceList.map((item) => item.id);
  const isAllSelected =
    mockResidenceList.length > 0 && selectedRowKeys.length === mockResidenceList.length;
  const isIndeterminate =
    selectedRowKeys.length > 0 && selectedRowKeys.length < mockResidenceList.length;

  const staffInfoItems: DescriptionsProps["items"] = [
    {
      key: "fullName",
      label: "نام و نام خانوادگی",
      children: dataPlaceHolder({ data: mockStaffInfo.fullName }),
    },
    {
      key: "username",
      label: "سمت",
      children: (
        <span dir="ltr">{dataPlaceHolder({ data: mockStaffInfo.position })}</span>
      ),
    },
  ];

  //* ================================ Util Functions ================================
  const selectAllHandler = (event: CheckboxChangeEvent) => {
    if (event.target.checked) {
      setSelectedRowKeys(allRowKeys);
      return;
    }

    setSelectedRowKeys([]);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.Key[]) => {
      setSelectedRowKeys(keys);
    },
  };

  const columns = DeactivationStaffsResidenceTableModel();

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-4">
        <CustomDivider text="کاربر انتخاب شده" />

        <Descriptions
          column={1}
          colon={false}
          layout="horizontal"
          items={staffInfoItems}
          styles={{
            label: {
              color: "var(--neutral-8)",
              minWidth: 140,
              textAlign: "start",
            },
            content: {
              color: "var(--neutral-11)",
              fontWeight: 500,
              textAlign: "start",
            },
          }}
        />
      </div>

      <div className="flex flex-col gap-4">
        <CustomDivider
          text="دسترسی به اقامتگاه"
          extraContent={
            <Checkbox
              checked={isAllSelected}
              indeterminate={isIndeterminate}
              disabled={mockResidenceList.length === 0}
              onChange={selectAllHandler}
            >
              انتخاب همه
            </Checkbox>
          }
        />

        <CustomAlert
          type="info"
          title=""
          description="کدام یک از دسترسی‌‌ها غیر فعال شود؟"
          showIcon
        />

        <CustomTable
          dataSource={mockResidenceList}
          rowKey="id"
          columns={columns}
          pagination={paginationConfig}
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
        />
      </div>

      <Row>
        <Col span={24}>
          <CustomSelect
            name="service"
            label="دلیل غیر فعالسازی"
            rules={[REQUIRED_RULE]}
            options={[
              { title: "a", id: 1 },
              { title: "b", id: 2 },
            ]}
          />
        </Col>
      </Row>
    </div>
  );
};

export default DeactivationStaffsModalContent;
