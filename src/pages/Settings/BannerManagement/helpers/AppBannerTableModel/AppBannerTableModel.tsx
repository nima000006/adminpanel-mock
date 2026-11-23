import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import CustomTooltip from "@components/Renderers/CustomTooltip/CustomTooltip";
import { LimitText } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";

import { AppBannerTableModelProps } from "../../@types/@bannerManagement";

const AppBannerTableModel = ({
  onVisitClickHandler,
  onEditClickHandler,
}: AppBannerTableModelProps) => {
  return [
    {
      title: "شناسه",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "عنوان",
      dataIndex: "title",
      key: "title",
      width: 180,
    },
    {
      title: "وضعیت نمایش",
      dataIndex: "active",
      key: "active",
      width: 130,
      render: (value: boolean) => {
        if (value) {
          return <CustomTag color="success">فعال قابل نمایش</CustomTag>;
        } else {
          return <CustomTag color="red">غیر فعال</CustomTag>;
        }
      },
    },
    {
      title: "نمایش در",
      dataIndex: "serviceId",
      key: "serviceId",
      width: 130,
      render: (value: boolean) => {
        if (value) {
          return <CustomTag color="orange">صفحه فرعی</CustomTag>;
        } else {
          return <CustomTag color="blue">صفحه اصلی</CustomTag>;
        }
      },
    },
    {
      title: "لینک",
      dataIndex: "imageLink",
      key: "imageLink",
      width: 150,
      render: (value: string) => {
        return <CustomTooltip title={value}>{LimitText(value, 12)}</CustomTooltip>;
      },
    },
    {
      title: "توضیحات",
      dataIndex: "description",
      key: "description",
      width: 150,
      render: (value: string) => {
        return <CustomTooltip title={value}>{LimitText(value, 12)}</CustomTooltip>;
      },
    },
    {
      title: "نمایش برای همه",
      dataIndex: "all",
      key: "all",
      width: 150,
      render: (value: boolean) => {
        return <>{value ? "بله" : "خیر"} </>;
      },
    },
    // {
    //   title: "تاریخ ایجاد",
    //   dataIndex: "branchBranchName",
    //   key: "branchBranchName",
    //   width: 130,
    //   render: (value: string) => {
    //     return dataPlaceHolder({ data: value, isDate: true });
    //   },
    // },
    // {
    //   title: "تاریخ آخرین ویرایش",
    //   dataIndex: "branchBranchName",
    //   key: "branchBranchName",
    //   width: 130,
    //   render: (value: string) => {
    //     return dataPlaceHolder({ data: value, isDate: true });
    //   },
    // },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      className: "tables-sticky-column-left",
      width: 170,
      render: (value: number) => {
        return (
          <div className="table-btns-container">
            <CustomButton type="link" onClick={() => onVisitClickHandler(value)}>
              مشاهده
            </CustomButton>
            <CustomButton type="link" onClick={() => onEditClickHandler(value)}>
              ویرایش
            </CustomButton>
          </div>
        );
      },
    },
  ];
};

export default AppBannerTableModel;
