import { useNavigate } from "react-router";

import useTitle from "../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import { makeSearchParams } from "../../../infrastructure/helpers/utils";
import { NOTIFICATION_UNIVERSITY_SELECTOR_PAGE_ROUTE } from "../../../infrastructure/router/routes/notification";
import "./_notificationProductSelector.scss";

const NotificationProductSelector = () => {
  const navigate = useNavigate();
  useTitle({ text: "انتخاب محصول مورد نظر برای ارسال اعلان" });

  const clickHandler = (id: number, label: string) => {
    navigate({
      pathname: NOTIFICATION_UNIVERSITY_SELECTOR_PAGE_ROUTE,
      search: makeSearchParams({ id, label }),
    });
  };
  const dataArray = [
    {
      id: 1,
      icon: "./images/product-consultant.svg",
      label: "مشاوره",
    },
    {
      id: 2,
      icon: "./images/student-card.svg",
      label: "کارت دانشجویی",
    },
    {
      id: 3,
      icon: "./images/uni-room.svg",
      label: "خوابگاه",
    },
    {
      id: 4,
      icon: "./images/uni-food.svg",
      label: "تغذیه",
    },
    {
      id: 5,
      icon: "./images/product-committee.svg",
      label: "کمیته",
    },
    {
      id: 6,
      icon: "./images/product-support.svg",
      label: "پشتیبانی",
    },
  ];
  return (
    <div className="main-notification-container">
      <p className="main-notif-text"> ارسال اعلان بر اساس محصول</p>
      <div className="product-box-wrapper">
        {dataArray?.map((item) => (
          <div
            className="product-box"
            onClick={() => clickHandler(item.id, item.label)}
            key={item?.id}
          >
            <img
              height="35px"
              width="35px"
              // alt={item.id.toString()}
              src={item.icon}
            />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default NotificationProductSelector;
