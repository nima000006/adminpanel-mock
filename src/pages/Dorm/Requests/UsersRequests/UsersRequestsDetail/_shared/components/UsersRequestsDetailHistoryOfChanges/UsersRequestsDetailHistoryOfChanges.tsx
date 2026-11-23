import { Steps } from "antd";

import SingleVerticalItem from "@components/Renderers/SingleVerticalItem/SingleVerticalItem";
import { dataPlaceHolder } from "@infra/helpers/utils";
import "./_usersRequestsDetailHistoryOfChanges.scss";

const UsersRequestsDetailHistoryOfChanges = () => {
  //? ================================ components ================================
  const stepItem = [
    {
      title: "سامان قنبری (کارشناس امور خوابگاه)",
      subTitle: (
        <div className="subtitle">
          <h4 className="subtitle-text">
            {dataPlaceHolder({
              data: "2024-10-22T08:00:41.977Z",
              isDate: true,
              customDateFormat: "HH:mm - YYYY/MM/DD",
            })}
          </h4>
          <h4 className="subtitle-text">رد درخواست</h4>
        </div>
      ),
      description: (
        <div className="description">
          <SingleVerticalItem
            label="توضیحات"
            value="درخواست به دلیل عدم تطابق رشته تحصیلی دانشجو رد شد."
          />
        </div>
      ),
    },
    {
      title: "سامان قنبری (کارشناس امور خوابگاه)",
      subTitle: (
        <div className="subtitle">
          <h4 className="subtitle-text">
            {dataPlaceHolder({
              data: "2024-10-22T08:00:41.977Z",
              isDate: true,
              customDateFormat: "HH:mm - YYYY/MM/DD",
            })}
          </h4>
          <h4 className="subtitle-text">مشاهده درخواست</h4>
        </div>
      ),
    },
    {
      title: "سامان قنبری (کارشناس امور خوابگاه)",
      subTitle: (
        <div className="subtitle">
          <h4 className="subtitle-text">
            {dataPlaceHolder({
              data: "2024-10-22T08:00:41.977Z",
              isDate: true,
              customDateFormat: "HH:mm - YYYY/MM/DD",
            })}
          </h4>
          <h4 className="subtitle-text">ایجاد درخواست</h4>
        </div>
      ),
    },
  ];
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <div className="users-requests-detail-history-of-change-container">
      <Steps orientation="vertical" size="small" current={3} items={stepItem} />
    </div>
  );
};

export default UsersRequestsDetailHistoryOfChanges;
