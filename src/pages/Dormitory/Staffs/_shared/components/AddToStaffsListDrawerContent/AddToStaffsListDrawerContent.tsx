import { useEffect, useState } from "react";

import { Checkbox, Col, Form, Row } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { AiOutlineFilter } from "react-icons/ai";

import { CustomButton, CustomSelect } from "@components/CustomInputs";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import {
  AddToStaffsListDrawerContentFormType,
  AddToStaffsListDrawerContentProps,
} from "@pages/Dormitory/Staffs/_shared/components/AddToStaffsListDrawerContent/@types/@addToStaffsListDrawerContentTypes";
import AddToStaffsListTableModel from "@pages/Dormitory/Staffs/_shared/components/AddToStaffsListDrawerContent/helper/model/AddToStaffsListTableModel/AddToStaffsListTableModel";

const dataSource = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    position: "Manager",
    business: "Business 1",
    branch: "Branch 1",
    residenceName: "Residence 1",
    username: "1234567890",
    personnelCode: "1234567890",
    mobile: "1234567890",
  },
  {
    id: 2,
    firstName: "John",
    lastName: "Doe",
    position: "Manager",
    business: "Business 2",
    branch: "Branch 2",
    residenceName: "Residence 1",
    username: "1234567890",
    personnelCode: "1234567890",
    mobile: "1234567890",
  },
  {
    id: 3,
    firstName: "John",
    lastName: "Doe",
    position: "Manager",
    business: "Business 3",
    branch: "Branch 3",
    residenceName: "Residence 1",
    username: "1234567890",
    personnelCode: "1234567890",
    mobile: "1234567890",
  },
];

const AddToStaffsListDrawerContent = ({
  closeAddToStaffsListDrawerHandler,
  isAllStaffs = false,
}: AddToStaffsListDrawerContentProps) => {
  const [form] = Form.useForm<AddToStaffsListDrawerContentFormType>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const residence = Form.useWatch("residence", form);
  const business = Form.useWatch("business", form);
  const branch = Form.useWatch("branch", form);
  const hasResidence = Boolean(residence?.value ?? residence);
  const hasFilterValues = Boolean(business?.length || branch?.length);

  //? ================================ Effects ================================
  useEffect(() => {
    setSelectedRowKeys([]);
  }, [residence?.value]);

  //* ================================ Util Functions ================================
  const addToStaffsListHandler = () => {};

  const clearFiltersHandler = () => {
    form.setFieldsValue({
      business: undefined,
      branch: undefined,
    });
  };

  // row selection
  const allRowKeys = dataSource.map((item) => item.id);
  const isAllSelected =
    dataSource.length > 0 && selectedRowKeys.length === dataSource.length;
  const isIndeterminate =
    selectedRowKeys.length > 0 && selectedRowKeys.length < dataSource.length;

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

  const columns = AddToStaffsListTableModel(isAllStaffs);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <div>
      <CustomDrawerHeader
        title="افزودن کارمندان به لیست"
        closeDrawerHandler={closeAddToStaffsListDrawerHandler}
        leftSideContent={
          <>
            <CustomButton onClick={closeAddToStaffsListDrawerHandler}>
              انصراف
            </CustomButton>

            <CustomButton type="primary" onClick={addToStaffsListHandler} loading={false}>
              تایید و افزودن
            </CustomButton>
          </>
        }
      />

      <Form form={form} layout="vertical" className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <CustomAlert
            showIcon
            title="راهنما"
            description="اقامتگاهی را که می‌خواهید لیست کارمندان آن‌ها را مشخص کنید، انتخاب کنید."
            type="info"
          />

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <CustomSelect
                label="اقامتگاه"
                name="residence"
                options={[
                  { id: 1, title: "Residence 1" },
                  { id: 2, title: "Residence 2" },
                ]}
                form={form}
                placeholder="انتخاب کنید"
                isLoading={false}
                rules={[REQUIRED_RULE]}
              />
            </Col>
          </Row>
        </div>

        <div className="flex flex-col gap-4">
          <CustomDivider
            text={`لیست کارمندان قابل افزودن (${dataSource.length})`}
            extraContent={
              <div className="flex items-center gap-4">
                <span className="text-neutral-8 text-sm">
                  انتخاب شده‌ها:{" "}
                  <span className="text-neutral-12 font-medium">
                    {selectedRowKeys.length}
                  </span>
                </span>

                <Checkbox
                  checked={isAllSelected}
                  indeterminate={isIndeterminate}
                  disabled={dataSource.length === 0}
                  onChange={selectAllHandler}
                >
                  انتخاب همه
                </Checkbox>
              </div>
            }
          />

          {!hasResidence ? (
            <CustomEmpty description="برای نمایش لیست کارمندان قابل افزودن به اقامتگاه، اقامتگاه موردنظر را انتخاب کنید." />
          ) : (
            <>
              <CustomAlert
                showIcon
                title="راهنما"
                description="از لیست زیر کارمندانی که می‌خواهید به اقامتگاه انتخابی خود اضافه نمایید را انتخاب کنید."
                type="info"
              />

              <div className="flex flex-col gap-4">
                {isAllStaffs && (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <div className="text-neutral-10 flex items-center gap-2 text-sm">
                        <AiOutlineFilter size={16} />
                        <span>فیلتر</span>
                      </div>

                      <CustomButton
                        type="link"
                        className="px-0!"
                        disabled={!hasFilterValues}
                        onClick={clearFiltersHandler}
                      >
                        پاک کردن فیلترها
                      </CustomButton>
                    </div>

                    <Row gutter={[16, 16]}>
                      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <CustomSelect
                          label="کسب و کار"
                          name="business"
                          mode="multiple"
                          options={[
                            { id: 1, title: "Business 1" },
                            { id: 2, title: "Business 2" },
                          ]}
                          form={form}
                          placeholder="انتخاب کنید"
                          isLoading={false}
                        />
                      </Col>
                      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <CustomSelect
                          label="شعبه / واحد"
                          name="branch"
                          mode="multiple"
                          options={[
                            { id: 1, title: "Branch 1" },
                            { id: 2, title: "Branch 2" },
                          ]}
                          form={form}
                          placeholder="انتخاب کنید"
                          isLoading={false}
                        />
                      </Col>
                    </Row>
                  </div>
                )}
                <CustomTable
                  dataSource={dataSource}
                  rowKey="id"
                  columns={columns}
                  pagination={paginationConfig}
                  rowSelection={{
                    type: "checkbox",
                    ...rowSelection,
                  }}
                />
              </div>
            </>
          )}
        </div>
      </Form>
    </div>
  );
};

export default AddToStaffsListDrawerContent;
