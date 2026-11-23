import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder, PriceSeparator } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";

const MainFoodOrderDeliveryTableModel = () => {
  return [
    {
      title: "تاریخ برنامه غذایی",
      dataIndex: "reserveDate",
      key: "reserveDate",
      width: 150,
      render: (value?: string) => {
        if (value) {
          return dataPlaceHolder({ data: value, isDate: true });
        }
      },
    },
    {
      title: "تعداد سفارشات کل برنامه غذایی",
      dataIndex: "reservationsCount",
      key: "reservationsCount",
      width: 210,
    },
    {
      title: "کد ملی یا کد اتباع",
      dataIndex: "userName",
      key: "userName",
      width: 120,
    },
    {
      title: "واحد دانشگاهی",
      dataIndex: "branchName",
      key: "branchName",
      width: 150,
    },
    {
      title: "سلف",
      dataIndex: "restaurantTitle",
      key: "restaurantTitle",
      width: 150,
    },
    {
      title: "غذا",
      dataIndex: "productTitle",
      key: "productTitle",
      width: 150,
    },
    {
      title: "نوع",
      dataIndex: "requestType",
      key: "requestType",
      width: 130,
      render: (value: number) => {
        if (value === 0) {
          return <CustomTag color="green">یارانه‌ای</CustomTag>;
        } else if (value === 1) {
          return <CustomTag color="geekblue">اضافی</CustomTag>;
        } else if (value === 2) {
          return <CustomTag color="purple">روز فروش</CustomTag>;
        }
      },
    },
    {
      title: "تعداد سفارشات شخص",
      dataIndex: "quantity",
      key: "quantity",
      width: 150,
    },
    {
      title: "قیمت (ريال)",
      dataIndex: "basePrice",
      key: "basePrice",
      width: 130,
      render: (value: number) => {
        if (value) {
          return PriceSeparator(value?.toString());
        }
        return value;
      },
    },
    {
      title: "شروع تحویل",
      dataIndex: "fromDeliveryTime",
      key: "fromDeliveryTime",
      width: 130,
      render: (value: string) => {
        return dataPlaceHolder({ data: value, isDate: true, hasSpecialTime: true });
      },
    },
    {
      title: "پایان تحویل",
      dataIndex: "toDeliveryTime",
      key: "toDeliveryTime",
      width: 130,
      render: (value: string) => {
        return dataPlaceHolder({ data: value, isDate: true, hasSpecialTime: true });
      },
    },
    {
      title: "شماره سفارش",
      dataIndex: "id",
      key: "id",
      width: 130,
    },
    {
      title: "تعداد سفارشات انجام شده",
      dataIndex: "reservationsCount",
      key: "reservationsCount",
      width: 200,
    },
    {
      title: "",
      dataIndex: "delivered",
      key: "delivered",
      className: "tables-sticky-column-left",
      fixed: "right" as FixedType | undefined,
      width: 140,
      render: (value: string) => {
        if (!value) {
          return (
            <div className="checkout-container">
              <CustomButton disabled type="link">
                تحویل
              </CustomButton>
            </div>
          );
        }
        return (
          <div className="checkout-container">
            <CustomButton type="text" disabled>
              تحویل داده شد
            </CustomButton>
          </div>
        );
      },
    },
  ];
};

export default MainFoodOrderDeliveryTableModel;
