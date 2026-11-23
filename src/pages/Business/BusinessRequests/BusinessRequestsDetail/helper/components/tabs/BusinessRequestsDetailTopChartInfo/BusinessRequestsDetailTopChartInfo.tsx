import { useState } from "react";

import { Row } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { GrAttachment } from "react-icons/gr";
import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { ExcelCodes } from "@infra/config/excel-codes";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useGetGeneralBusinessTopChartDetailsQuery } from "@infra/states/redux/Apis/business/businessRequest/businessRequest";
import { NEUTRAL_07 } from "@infra/VARS/globalColors/globalColors";

import { TopChartUnit } from "./@types/@topChartUnit ";
import BusinessRequestsDetailTopChartInfoDrawer from "./helper/components/BusinessRequestsDetailTopChartInfoDrawer/BusinessRequestsDetailTopChartInfoDrawer";
import BusinessRequestsTableBaseInfoTopChartTableModel from "./helper/models/BusinessRequestsTableBaseInfoTopChartTableModel";
import emptyImage from "../../../../../../../../assets/images/empty-image.png";

import "./_businessRequestsDetailTopChartInfo.scss";

const BusinessRequestsDetailTopChartInfo = () => {
  const [tableData, setTableData] = useState<TopChartUnit[]>([]);
  const [openDrawer, setOpenDrawer] = useState<{
    isOpen: boolean;
    id: number;
    parentUnitName?: string;
  }>({ isOpen: false, id: -1 });

  const {
    params: { businessTempHistoryId },
  } = useQueryParams();
  //? ================================  Api ================================
  const {
    data: GetGeneralBusinessTopChartDetails,
    isLoading: IsGetGeneralBusinessTopChartDetailsLoading,
  } = useGetGeneralBusinessTopChartDetailsQuery({
    businessTempHistoryId: +businessTempHistoryId,
  });
  //* ================================ Util Functions ================================
  const handleAdd = () => {
    setOpenDrawer({ isOpen: true, id: Date.now() }); // use timestamp as key
  };
  const closeDrawerHandler = () => {
    setOpenDrawer({ isOpen: false, id: -1 });
  };
  const handleAddChild = (record: TopChartUnit) => {
    setOpenDrawer({
      isOpen: true,
      id: Date.now(),
      parentUnitName: record.parentUnit,
    });
  };
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <>
      {openDrawer?.isOpen && (
        <CustomDrawer
          open={openDrawer?.isOpen}
          onClose={closeDrawerHandler}
          closeIcon={<AiOutlineClose />}
          content={
            <BusinessRequestsDetailTopChartInfoDrawer
              closeDrawer={closeDrawerHandler}
              id={openDrawer?.id}
              onAdd={(newRow) => {
                setTableData((prev) => [...prev, newRow]);
                closeDrawerHandler();
              }}
              parentUnitName={openDrawer?.parentUnitName}
            />
          }
        />
      )}
      <div className="business-requests-detail-top-chart-container">
        <div className="file-download-container">
          <span>فایل‌های تاپ چارت بارگذاری شده:</span>
          <Div loading={IsGetGeneralBusinessTopChartDetailsLoading}>
            <Row gutter={[8, 8]}>
              <SingleVerticalWithCol
                lg={6}
                md={24}
                label=""
                value="تاپ چارت نسخه فارسی .pdf"
                suffix={
                  GetGeneralBusinessTopChartDetails ? (
                    <Link
                      to={GetGeneralBusinessTopChartDetails?.positionMandatoryFileUrl}
                    >
                      <span className="custom-suffix">دانلود</span>
                    </Link>
                  ) : (
                    "-"
                  )
                }
                prefix={<GrAttachment size={16} color={NEUTRAL_07} />}
                className="custom-statistic"
              />
              <SingleVerticalWithCol
                lg={6}
                md={24}
                label=""
                value={"تاپ چارت نسخه انگلیسی .pdf"}
                suffix={
                  GetGeneralBusinessTopChartDetails ? (
                    <Link to={GetGeneralBusinessTopChartDetails?.branchSecondaryFileUrl}>
                      <span className="custom-suffix">دانلود</span>
                    </Link>
                  ) : (
                    "-"
                  )
                }
                prefix={<GrAttachment size={16} color={NEUTRAL_07} />}
                className="custom-statistic"
              />
            </Row>
          </Div>
        </div>
        <CustomDivider
          className="custom-divider"
          text={"لیست واحدهای سازمانی تاپ چارت"}
        />
        <CustomTable
          draggableColumns
          draggableId={ExcelCodes.BUSINESS_BUSINESS_REQUESTS_DETAIL_TOP_CHART_INFO_TABLE}
          dataSource={tableData}
          columns={BusinessRequestsTableBaseInfoTopChartTableModel(handleAddChild)}
          rowKey="id"
          pagination={false}
          className="business-requests-detail-top-chart-table-container"
          locale={{
            emptyText: (
              <div className="empty-container">
                <img src={emptyImage} alt="empty" className="empty-image" />
                <p>لیست انواع شعبه خالی می‌باشد!</p>
                <CustomButton
                  type="primary"
                  className="custom-button"
                  icon={<AiOutlinePlus />}
                  onClick={() => handleAdd()}
                >
                  افزودن نوع شعبه
                </CustomButton>
              </div>
            ),
          }}
          {...(tableData.length > 0 ? TABLE_PROPS(tableData.length) : {})}
        />
        {tableData.length ? (
          <CustomButton
            type="default"
            className="custom-button-add-row"
            icon={<AiOutlinePlus />}
            onClick={() => handleAdd()}
          >
            افزودن نوع شعبه
          </CustomButton>
        ) : null}
      </div>
    </>
  );
};
export default BusinessRequestsDetailTopChartInfo;
