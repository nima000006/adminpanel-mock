import { Progress } from "antd";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { NEUTRAL_05 } from "@infra/VARS/globalColors/globalColors";
import { dataSourceType } from "@pages/Finance/BusinessOwners/helpers/components/FinanceBusinessOwnersGeneralInformation/@types/@financeBusinessOwnersGeneralInformation";
import {
  firstColumnDataIndexMap,
  firstColumnMap,
} from "@pages/Finance/BusinessOwners/helpers/utils/utils";

const FinanceBusinessOwnerTableModel = ({
  viewInfo,
  viewTransactionBtnHandler,
}: {
  viewInfo: number;
  viewTransactionBtnHandler: () => void;
}): CustomColumnType<dataSourceType>[] => {
  const firstColumnTitle = viewInfo ? firstColumnMap[viewInfo] : 1;
  const firstColumnDataIndex = viewInfo ? firstColumnDataIndexMap[viewInfo] : 1;

  return [
    ...(viewInfo === 1 ||
    viewInfo === 2 ||
    viewInfo === 3 ||
    viewInfo === 4 ||
    viewInfo === 5
      ? [
          {
            title: firstColumnTitle,
            dataIndex: firstColumnDataIndex,
            key: firstColumnDataIndex,
            width: 150,
          },
        ]
      : [
          {
            title: firstColumnTitle,
            dataIndex: firstColumnDataIndex,
            key: firstColumnDataIndex,
            width: 150,
            //todo[nima] when testing with real data, remove this coment
            // render: (value: string) => {
            //   return (
            //     <CustomTag
            //       className="service-tag"
            //       color={
            //         value === "خوابگاه"
            //           ? "purple"
            //           : value === "دکتر من"
            //             ? "cyan"
            //             : value === "بیمه"
            //               ? "green"
            //               : value === "تغذیه"
            //                 ? "lime"
            //                 : value === "کارت هویت دیجیتال"
            //                   ? "blue"
            //                   : "default"
            //       }
            //       icon={
            //         value === "خوابگاه" ? (
            //           <div className="icon-wrapper dorm-color">
            //             <PiBuildingApartmentFill color="#FFFFFF" size={14} />
            //           </div>
            //         ) : value === "دکتر من" ? (
            //           <div className="icon-wrapper my-doctor-color">
            //             <PiHeartbeat color="#FFFFFF" size={14} />
            //           </div>
            //         ) : value === "بیمه" ? (
            //           <div className="icon-wrapper insurance-color">
            //             <PiUmbrellaFill color="#FFFFFF" size={14} />
            //           </div>
            //         ) : value === "تغذیه" ? (
            //           <div className="icon-wrapper food-color">
            //             <PiForkKnifeFill color="#FFFFFF" size={14} />
            //           </div>
            //         ) : value === "کارت هویت دیجیتال" ? (
            //           <div className="icon-wrapper card-color">
            //             <PiIdentificationCardLight color="#FFFFFF" size={14} />
            //           </div>
            //         ) : null
            //       }
            //     >
            //       {value}
            //     </CustomTag>
            //   );
            // },
            render: (value: string) => <SamimServiceTag service={value} />,
          },
        ]),

    {
      title: "درآمد تسویه شده (تومان)",
      dataIndex: "clearedIncome",
      key: "clearedIncome",
      width: 170,
      render: (value: string) => {
        return <>{dataPlaceHolder({ data: value, isPrice: true })}</>;
      },
    },
    {
      title: "درآمد تسویه نشده (تومان)",
      dataIndex: "unsettledIncome",
      key: "unsettledIncome",
      width: 170,
      render: (value: string) => {
        return <>{dataPlaceHolder({ data: value, isPrice: true })}</>;
      },
    },
    {
      title: "درآمد (تومان)",
      dataIndex: "income",
      key: "income",
      width: 150,
      render: (value: string) => {
        return <>{dataPlaceHolder({ data: value, isPrice: true })}</>;
      },
    },
    {
      title: "درصد تسویه",
      dataIndex: "settledPercentage",
      key: "settledPercentage",
      width: 150,
      align: "center" as const,
      render: (value: number) => (
        <div className="custom-settled-revenue-container">
          {value}٪
          <Progress
            type="circle"
            trailColor={NEUTRAL_05}
            percent={value}
            strokeWidth={15}
            size={14}
          />
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      className: "tables-sticky-column-left",
      width: 108,
      render: (_: number) => (
        <div>
          <CustomButton onClick={viewTransactionBtnHandler} type="link">
            مشاهده تراکنش‌ها
          </CustomButton>
        </div>
      ),
    },
  ];
};
export default FinanceBusinessOwnerTableModel;
