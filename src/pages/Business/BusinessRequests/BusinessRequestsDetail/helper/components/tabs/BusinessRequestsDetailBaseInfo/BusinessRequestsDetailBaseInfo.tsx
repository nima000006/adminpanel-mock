import { useState } from "react";

import { Modal, Row, Form } from "antd";
import { AiOutlinePlus } from "react-icons/ai";
import { GrAttachment } from "react-icons/gr";
import { Link } from "react-router";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { ExcelCodes } from "@infra/config/excel-codes";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { NEUTRAL_07 } from "@infra/VARS/globalColors/globalColors";

import { BaseInfoItem } from "./@types/@baseInfoItem";
import BusinessRequestsTableBaseInfoBranchTypeModel from "./helper/models/BusinessRequestsTableBaseInfoBranchTypeModel";
import BusinessRequestsTableBaseInfoModel from "./helper/models/BusinessRequestsTableBaseInfoModel";
import BusinessRequestsTableBaseInfoPositionTypeModel from "./helper/models/BusinessRequestsTableBaseInfoPositionTypeModel";
import BusinessRequestsTableBaseInfoUnitTypeModel from "./helper/models/BusinessRequestsTableBaseInfoUnitTypeModel";
import emptyImage from "../../../../../../../../assets/images/empty-image.png";

import "./_businessRequestsDetailBaseInfo.scss";

const BusinessRequestsDetailBaseInfo = () => {
  const [selectedRowKey, setSelectedRowKey] = useState<React.Key>(1);
  const [branchData, setBranchData] = useState<BaseInfoItem[]>([]);
  const [unitData, setUnitData] = useState<BaseInfoItem[]>([]);
  const [positionData, setPositionData] = useState<BaseInfoItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [branchForm] = Form.useForm<{ branchType?: string | undefined }>();
  const [unitForm] = Form.useForm<{ unitType?: string | undefined }>();
  const [positionForm] = Form.useForm<{ positionType?: string | undefined }>();

  const requestTableBaseData = [
    {
      id: 1,
      baseInfoType: "انواع شعب",
      count: branchData.length,
      status: "تعریف نشده",
    },
    {
      id: 2,
      baseInfoType: "انواع واحدهای سازمانی",
      count: unitData.length,
      status: "تعریف نشده",
    },
    {
      id: 3,
      baseInfoType: "انواع سمت‌های سازمانی",
      count: positionData.length,
      status: "تعریف نشده",
    },
  ];

  const selectedRow = requestTableBaseData.find((item) => item.id === selectedRowKey);

  const rowSelection = {
    type: "radio" as const,
    selectedRowKeys: selectedRowKey !== undefined ? [selectedRowKey] : [],
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedRowKey(selectedRowKeys[0]);
    },
  };

  //? ================================ components ================================
  const ModalFooter = ({ onCancel }: { onCancel: () => void }) => (
    <div className="btn-container">
      <CustomButton onClick={onCancel}>انصراف</CustomButton>
      <CustomButton htmlType="submit" type="primary">
        افزودن
      </CustomButton>
    </div>
  );

  const getCurrentTable = () => {
    switch (selectedRow?.baseInfoType) {
      case "انواع شعب":
        return (
          <>
            <CustomDivider className="custom-divider" text="انواع شعب" />
            <CustomTable
              draggableColumns
              draggableId={ExcelCodes.BUSINESS_BUSINESS_REQUESTS_DETAIL_BASE_INFO_TABLE_1}
              dataSource={branchData.map((item, index) => ({
                ...item,
                index: index + 1,
              }))}
              columns={BusinessRequestsTableBaseInfoBranchTypeModel()}
              rowKey="id"
              pagination={false}
              locale={{
                emptyText: (
                  <div className="empty-container">
                    <img src={emptyImage} alt="empty" className="empty-image" />
                    <p>لیست انواع شعبه خالی می‌باشد!</p>
                    <CustomButton
                      type="primary"
                      className="custom-button"
                      icon={<AiOutlinePlus />}
                      onClick={handleAdd}
                    >
                      افزودن نوع شعبه
                    </CustomButton>
                  </div>
                ),
              }}
              {...(branchData.length > 0 ? TABLE_PROPS(branchData.length) : {})}
            />

            {branchData.length ? (
              <div>
                <CustomButton
                  className="custom-button-add-row"
                  icon={<AiOutlinePlus />}
                  onClick={handleAdd}
                >
                  افزودن نوع شعبه
                </CustomButton>
              </div>
            ) : null}
          </>
        );
      case "انواع واحدهای سازمانی":
        return (
          <>
            <CustomDivider className="custom-divider" text="انواع واحدهای سازمانی" />
            <CustomTable
              draggableColumns
              draggableId={ExcelCodes.BUSINESS_BUSINESS_REQUESTS_DETAIL_BASE_INFO_TABLE_2}
              dataSource={unitData.map((item, index) => ({ ...item, index: index + 1 }))}
              columns={BusinessRequestsTableBaseInfoUnitTypeModel()}
              rowKey="id"
              pagination={false}
              locale={{
                emptyText: (
                  <div className="empty-container">
                    <img src={emptyImage} alt="empty" className="empty-image" />
                    <p>لیست انواع واحد خالی می‌باشد!</p>
                    <CustomButton
                      type="primary"
                      className="custom-button"
                      icon={<AiOutlinePlus />}
                      onClick={handleAdd}
                    >
                      افزودن نوع واحد
                    </CustomButton>
                  </div>
                ),
              }}
              {...(unitData.length > 0 ? TABLE_PROPS(unitData.length) : {})}
            />
            {unitData.length && (
              <div>
                <CustomButton
                  className="custom-button-add-row"
                  icon={<AiOutlinePlus />}
                  onClick={handleAdd}
                >
                  افزودن نوع سازمان
                </CustomButton>
              </div>
            )}
          </>
        );
      case "انواع سمت‌های سازمانی":
        return (
          <>
            <CustomDivider className="custom-divider" text="انواع سمت‌های سازمانی" />
            <CustomTable
              draggableColumns
              draggableId={ExcelCodes.BUSINESS_BUSINESS_REQUESTS_DETAIL_BASE_INFO_TABLE_3}
              dataSource={positionData.map((item, index) => ({
                ...item,
                index: index + 1,
              }))}
              columns={BusinessRequestsTableBaseInfoPositionTypeModel()}
              rowKey="id"
              pagination={false}
              locale={{
                emptyText: (
                  <div className="empty-container">
                    <img src={emptyImage} alt="empty" className="empty-image" />
                    <p>لیست انواع سمت خالی می‌باشد!</p>
                    <CustomButton
                      type="primary"
                      className="custom-button"
                      icon={<AiOutlinePlus />}
                      onClick={handleAdd}
                    >
                      افزودن نوع سمت
                    </CustomButton>
                  </div>
                ),
              }}
              {...(positionData.length > 0 ? TABLE_PROPS(positionData.length) : {})}
            />
            {positionData.length && (
              <div>
                <CustomButton
                  className="custom-button-add-row"
                  icon={<AiOutlinePlus />}
                  onClick={handleAdd}
                >
                  افزودن نوع سمت
                </CustomButton>
              </div>
            )}
          </>
        );
      default:
        return null;
    }
  };

  //* ================================ Util Functions ================================
  const handleAdd = () => {
    if (!selectedRow) {
      toast.error("لطفاً یکی از اطلاعات پایه را انتخاب نمایید.", {
        toastId: "لطفاً یکی از اطلاعات پایه را انتخاب نمایید.",
      });
      return;
    }

    switch (selectedRow.baseInfoType) {
      case "انواع شعب":
        branchForm.resetFields();
        break;
      case "انواع واحدهای سازمانی":
        unitForm.resetFields();
        break;
      case "انواع سمت‌های سازمانی":
        positionForm.resetFields();
        break;
    }

    setIsModalOpen(true);
  };

  const handleFormSubmit = (values: {
    branchType?: string;
    unitType?: string;
    positionType?: string;
  }) => {
    if (!selectedRow) return;
    const timestamp = Date.now();

    switch (selectedRow.baseInfoType) {
      case "انواع شعب": {
        const newBranch = {
          id: timestamp,
          title: values.branchType || "",
          status: "فعال",
        };
        setBranchData((prev) => [...prev, newBranch]);
        break;
      }

      case "انواع واحدهای سازمانی": {
        const newUnit = {
          id: timestamp,
          title: values.unitType || "",
          status: "فعال",
        };
        setUnitData((prev) => [...prev, newUnit]);
        break;
      }

      case "انواع سمت‌های سازمانی": {
        const newPosition = {
          id: timestamp,
          title: values.positionType || "",
          status: "فعال",
        };
        setPositionData((prev) => [...prev, newPosition]);
        break;
      }

      default:
        break;
    }

    setIsModalOpen(false);
    toast.success(`${selectedRow.baseInfoType} با موفقیت افزوده شد.`, {
      toastId: selectedRow.baseInfoType,
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <>
      {isModalOpen && selectedRow && (
        <Modal
          title={`افزودن ${selectedRow.baseInfoType}`}
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
          className="business-requests-detail-custom-modal"
        >
          {selectedRow.baseInfoType === "انواع شعب" && (
            <Form
              form={branchForm}
              onFinish={handleFormSubmit}
              className="business-requests-detail-form-container"
            >
              <CustomInput
                label="عنوان نوع شعبه"
                placeholder="عنوان نوع شعبه را اینجا وارد نمایید"
                name="branchType"
                rules={[REQUIRED_RULE]}
              />
              <ModalFooter onCancel={() => setIsModalOpen(false)} />
            </Form>
          )}

          {selectedRow.baseInfoType === "انواع واحدهای سازمانی" && (
            <Form
              form={unitForm}
              onFinish={handleFormSubmit}
              className="business-requests-detail-form-container"
            >
              <CustomInput
                label="عنوان نوع واحد"
                placeholder="عنوان نوع واحد را اینجا وارد نمایید"
                name="unitType"
                rules={[REQUIRED_RULE]}
              />
              <ModalFooter onCancel={() => setIsModalOpen(false)} />
            </Form>
          )}

          {selectedRow.baseInfoType === "انواع سمت‌های سازمانی" && (
            <Form
              form={positionForm}
              onFinish={handleFormSubmit}
              className="business-requests-detail-form-container"
            >
              <CustomInput
                label="عنوان نوع سمت"
                placeholder="عنوان نوع سمت را اینجا وارد نمایید"
                name="positionType"
                rules={[REQUIRED_RULE]}
              />
              <ModalFooter onCancel={() => setIsModalOpen(false)} />
            </Form>
          )}
        </Modal>
      )}

      <div className="business-requests-detail-base-container">
        <CustomAlert
          showIcon
          message="با توجه به فایل های بارگذاری شده زیر بایستی اطلاعات پایه را تعریف نمایید."
          type="info"
          className="custom-alert"
        />
        <CustomAlert
          showIcon
          message="لطفاً توجه فرمایید که تکمیل صحیح و جامع اطلاعات پایه، شرط اصلی و الزامی برای ایجاد تاپ چارت می‌باشد!"
          type="warning"
          className="custom-alert custom-alert-duplicate"
        />
        <div className="file-download-container">
          <span>فایل‌های بارگذاری شده:</span>
          <Row gutter={[8, 8]}>
            <SingleVerticalWithCol
              lg={6}
              md={8}
              xs={24}
              label=""
              value="انواع شعب.pdf"
              suffix={
                <Link to="-" target="_blank" rel="noopener noreferrer">
                  <span className="custom-suffix">دانلود</span>
                </Link>
              }
              prefix={<GrAttachment size={16} color={NEUTRAL_07} />}
              className="custom-statistic"
            />
            <SingleVerticalWithCol
              lg={6}
              md={8}
              xs={24}
              label=""
              value="انواع واحد.pdf"
              suffix={<span className="custom-suffix">دانلود</span>}
              prefix={<GrAttachment size={16} color={NEUTRAL_07} />}
              className="custom-statistic"
            />
            <SingleVerticalWithCol
              lg={6}
              md={8}
              xs={24}
              label=""
              value="انواع سمت.pdf"
              suffix={<span className="custom-suffix">دانلود</span>}
              prefix={<GrAttachment size={16} color={NEUTRAL_07} />}
              className="custom-statistic"
            />
          </Row>
        </div>
        <CustomDivider className="custom-divider" text="لیست اطلاعات پایه" />
        <CustomTable
          draggableColumns
          draggableId={ExcelCodes.BUSINESS_BUSINESS_REQUESTS_DETAIL_BASE_INFO_TABLE_4}
          dataSource={requestTableBaseData}
          columns={BusinessRequestsTableBaseInfoModel()}
          pagination={paginationConfig}
          rowKey="id"
          rowSelection={rowSelection}
          {...TABLE_PROPS(requestTableBaseData.length)}
        />
        {getCurrentTable()}
      </div>
    </>
  );
};

export default BusinessRequestsDetailBaseInfo;
