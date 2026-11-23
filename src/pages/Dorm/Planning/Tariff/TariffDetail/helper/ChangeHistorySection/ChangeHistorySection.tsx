import { Steps } from "antd";

import SingleVerticalItem from "@components/Renderers/SingleVerticalItem/SingleVerticalItem";
import "./_changeHistorySection.scss";

const ChangeHistorySection = () => {
  const stepItem = [
    {
      title: "سامان قنبری (کارشناس امور خوابگاه)",
      subTitle: (
        <div className="dorm-change-history-tab-wrapper-sub-title">
          <h4>1402 / 02 / 02 - 14:30</h4>
          <h4>ویرایش تعرفه</h4>
        </div>
      ),
      description: (
        <div className="dorm-change-history-tab-wrapper-desc">
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
        <div className="dorm-change-history-tab-wrapper-sub-title">
          <h4>1402 / 02 / 02 - 14:30</h4>
          <h4>ویرایش تعرفه</h4>
        </div>
      ),
      description: (
        <div className="dorm-change-history-tab-wrapper-desc">
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
        <div className="dorm-change-history-tab-wrapper-sub-title">
          <h4>1402 / 02 / 02 - 14:30</h4>
          <h4>ویرایش تعرفه</h4>
        </div>
      ),
      description: (
        <div className="dorm-change-history-tab-wrapper-desc">
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
export default ChangeHistorySection;
