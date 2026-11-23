import { Steps } from "antd";

import SingleVerticalItem from "@components/Renderers/SingleVerticalItem/SingleVerticalItem";
import "./_tariffChangeHistory.scss";

const TariffChangeHistory = () => {
  const stepItem = [
    {
      title: "سامان قنبری (کارشناس امور خوابگاه)",
      subTitle: (
        <div className="work-spaces-change-history-tab-wrapper-sub-title">
          <h4>1402 / 02 / 02 - 14:30</h4>
          <h4>ویرایش تعرفه</h4>
        </div>
      ),
      description: (
        <div className="work-spaces-change-history-tab-wrapper-desc">
          <SingleVerticalItem
            label="توضیحات"
            value={"قیمت اتاق‌های دو تخته درجه دو مطابق بخش نامه جدید تغییر کرد"}
          />
        </div>
      ),
    },
    {
      title: "سامان قنبری (کارشناس امور خوابگاه)",
      subTitle: (
        <div className="work-spaces-change-history-tab-wrapper-sub-title">
          <h4>1402 / 02 / 02 - 14:30</h4>
          <h4>ویرایش تعرفه</h4>
        </div>
      ),
      description: (
        <div className="work-spaces-change-history-tab-wrapper-desc">
          <SingleVerticalItem
            label="توضیحات"
            value={"قیمت اتاق‌های دو تخته درجه دو مطابق بخش نامه جدید تغییر کرد"}
          />
        </div>
      ),
    },
    {
      title: "سامان قنبری (کارشناس امور خوابگاه)",
      subTitle: (
        <div className="work-spaces-change-history-tab-wrapper-sub-title">
          <h4>1402 / 02 / 02 - 14:30</h4>
          <h4>ویرایش تعرفه</h4>
        </div>
      ),
      description: (
        <div className="work-spaces-change-history-tab-wrapper-desc">
          <SingleVerticalItem
            label="توضیحات"
            value={"قیمت اتاق‌های دو تخته درجه دو مطابق بخش نامه جدید تغییر کرد"}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <Steps orientation="vertical" size="small" current={3} items={stepItem} />
    </div>
  );
};
export default TariffChangeHistory;
