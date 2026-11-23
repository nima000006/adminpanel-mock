import React, { useState } from "react";

import { Col, Pagination, Row } from "antd";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { sortIncome } from "@pages/Finance/BusinessOwners/helpers/utils/utils";

import { ViewInfoLabelType } from "../../../FinanceBusinessOwnersGeneralInformation";

import "./_cardView.scss";

export type CardDataType = {
  id: number;
  business: string;
  province: string;
  city: string;
  branch: string;
  beneficiary: string;
  service: string;
  unsettledRevenue: { amount: number; percentage: number };
  settledRevenue: { amount: number; percentage: number };
  totalRevenue: number;
  title?: string;
};

const data = [
  {
    id: 1,
    business: "دانشگاه آزاد اسلامی",
    province: "تهران",
    city: "تهران",
    branch: "تهران مرکز",
    beneficiary: "دانشگاه ازاد تهران جنوب",
    service: "FOOD",
    unsettledRevenue: { amount: 88000000, percentage: 5 },
    settledRevenue: { amount: 55000, percentage: 7 },
    totalRevenue: 66000000,
  },
  {
    id: 2,
    business: "دانشگاه ازاد",
    province: "تهران",
    city: "تهران",
    branch: "تهران جنوب",
    beneficiary: "دانشگاه ازاد تهران جنوب",
    service: "INSURANCE",
    title: "شرکت فنی مهندسی صمیم رایانه",
    unsettledRevenue: { amount: 200000000, percentage: 5 },
    settledRevenue: { amount: 1000000, percentage: 7 },
    totalRevenue: 1050000000,
  },
  {
    id: 3,
    business: "دانشگاه ازاد",
    province: "تهران",
    city: "تهران",
    branch: "تهران جنوب",
    beneficiary: "دانشگاه ازاد تهران جنوب",
    service: "FOOD",
    title: "شرکت فنی مهندسی ماهان تابان",
    unsettledRevenue: { amount: 700000000, percentage: 5 },
    settledRevenue: { amount: 850000000, percentage: 7 },
    totalRevenue: 1050000000,
  },
  {
    id: 4,
    business: "دانشگاه ازاد",
    province: "تهران",
    city: "تهران",
    branch: "تهران جنوب",
    beneficiary: "دانشگاه ازاد تهران جنوب",
    service: "ROOM",
    title: "شرکت فنی مهندسی ماهان تابان",
    unsettledRevenue: { amount: 200000000, percentage: 5 },
    settledRevenue: { amount: 850000000, percentage: 7 },
    totalRevenue: 1050000000,
  },
];
const CardView = ({ viewInfoLabel }: { viewInfoLabel: ViewInfoLabelType }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { setSearchParams } = useQueryParams();
  const { params } = useQueryParams();

  const [filters, setFilters] = useState<{
    sort?: string;
  }>({
    sort: params.sort,
  });

  //* ================================ Util Functions ================================
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const sortedData = React.useMemo(() => {
    if (!filters.sort) return data;

    const copy = [...data];

    return copy.sort((a, b) => {
      switch (filters.sort) {
        case "1":
          return b.unsettledRevenue.amount - a.unsettledRevenue.amount;
        case "2":
          return a.unsettledRevenue.amount - b.unsettledRevenue.amount;
        case "3":
          return b.settledRevenue.amount - a.settledRevenue.amount;
        case "4":
          return a.settledRevenue.amount - b.settledRevenue.amount;
        case "5":
          return b.totalRevenue - a.totalRevenue;
        case "6":
          return a.totalRevenue - b.totalRevenue;
        default:
          return 0;
      }
    });
  }, [filters.sort]);

  const pageSize = 3;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = sortedData.slice(startIndex, startIndex + pageSize);

  const viewTransactionBtnHandler = () => {
    setSearchParams({ tab: "2" });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="financial-business-owner-card-container">
      <ToolBox
        leftSide={
          <CustomSelect
            name="viewInformation"
            label="مرتب سازی"
            options={sortIncome?.map((item) => ({
              id: item.id,
              title: item.title,
            }))}
            loading={false}
            onChange={(_, option) => {
              const sortValue = Array.isArray(option) ? option[0]?.value : option?.value;
              if (sortValue) {
                setFilters({ ...filters, sort: sortValue });
                setCurrentPage(1);
              }
            }}
          />
        }
      />

      <Row gutter={[16, 16]}>
        {paginatedData?.map((item: CardDataType) => {
          return (
            <Col lg={8} md={12} sm={24} xs={24} key={item.id}>
              <div className="card">
                {viewInfoLabel === "service" ? (
                  //nima[todo] remove comment when test with real data
                  // <CustomTag
                  //   className="service-tag"
                  //   color={
                  //     item?.service === "خوابگاه"
                  //       ? "purple"
                  //       : item?.service === "دکتر من"
                  //         ? "cyan"
                  //         : item?.service === "بیمه"
                  //           ? "green"
                  //           : item?.service === "تغذیه"
                  //             ? "lime"
                  //             : item?.service === "کارت هویت دیجیتال"
                  //               ? "blue"
                  //               : "default"
                  //   }
                  //   icon={
                  //     item?.service === "خوابگاه" ? (
                  //       <div className="icon-wrapper dorm-color">
                  //         <PiBuildingApartmentFill color="#FFFFFF" size={14} />
                  //       </div>
                  //     ) : item?.service === "دکتر من" ? (
                  //       <div className="icon-wrapper my-doctor-color">
                  //         <PiHeartbeat color="#FFFFFF" size={14} />
                  //       </div>
                  //     ) : item?.service === "بیمه" ? (
                  //       <div className="icon-wrapper insurance-color">
                  //         <PiUmbrellaFill color="#FFFFFF" size={14} />
                  //       </div>
                  //     ) : item?.service === "تغذیه" ? (
                  //       <div className="icon-wrapper food-color">
                  //         <PiForkKnifeFill color="#FFFFFF" size={14} />
                  //       </div>
                  //     ) : item?.service === "کارت هویت دیجیتال" ? (
                  //       <div className="icon-wrapper card-color">
                  //         <PiIdentificationCardLight color="#FFFFFF" size={14} />
                  //       </div>
                  //     ) : null
                  //   }
                  // >
                  //   {item?.service}
                  // </CustomTag>
                  <SamimServiceTag service={item?.service} />
                ) : (
                  <h2 className="card-title">
                    {" "}
                    {item[viewInfoLabel] || item.title || ""}
                  </h2>
                )}

                <div>
                  <div className="row">
                    <span className="text">درآمد تسویه نشده (تومان)</span>
                    <CustomTag className="tag" color="red">
                      {item.unsettledRevenue.percentage}٪
                    </CustomTag>
                  </div>
                  <p className="amount">
                    {dataPlaceHolder({
                      data: item.unsettledRevenue.amount?.toString(),
                      isPrice: true,
                    })}
                  </p>
                </div>

                <div>
                  <div className="row">
                    <span className="text">درآمد تسویه شده (تومان)</span>
                    <CustomTag className="tag" color="green">
                      {item.settledRevenue.percentage}٪
                    </CustomTag>
                  </div>
                  <p className="amount">
                    {dataPlaceHolder({
                      data: item.settledRevenue.amount?.toString(),
                      isPrice: true,
                    })}
                  </p>
                </div>

                <div>
                  <span className="text">درآمد کل (تومان)</span>

                  <p className="amount">
                    {dataPlaceHolder({
                      data: item.totalRevenue?.toString(),
                      isPrice: true,
                    })}
                  </p>
                </div>

                <div className="btn-wrapper">
                  <CustomButton type="link" onClick={viewTransactionBtnHandler}>
                    مشاهده تراکنش‌ها
                  </CustomButton>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
      <Pagination
        current={currentPage}
        total={data.length}
        pageSize={pageSize}
        onChange={handlePageChange}
        className="custom-pagination"
      />
    </div>
  );
};
export default CardView;
