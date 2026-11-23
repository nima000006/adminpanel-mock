import { Steps } from "antd";

import SingleVerticalItem from "@components/Renderers/SingleVerticalItem/SingleVerticalItem";
import "./_admissionDetailRejectedChangeHistory.scss";

const AdmissionDetailRejectedChangeHistory = () => {
  const stepItem = [
    {
      title: "سامان قنبری (کارشناس امور خوابگاه)",
      subTitle: (
        <div className="subtitle">
          <h4 className="subtitle-text">1402 / 02 / 02 - 14:30</h4>
          <h4 className="subtitle-text">ویرایش تأیید برنامه پذیرش</h4>
        </div>
      ),
      description: (
        <div className="description">
          <SingleVerticalItem label="توضیحات" value="تعرفه‌های اعمال شده تغییر کردند." />
        </div>
      ),
    },
    {
      title: "سامان قنبری (کارشناس امور خوابگاه)",
      subTitle: (
        <div className="subtitle">
          <h4 className="subtitle-text">1402 / 02 / 02 - 14:30</h4>
          <h4 className="subtitle-text">ویرایش تأیید برنامه پذیرش</h4>
        </div>
      ),
      description: (
        <div className="description">
          <SingleVerticalItem label="توضیحات" value="تعرفه‌های اعمال شده تغییر کردند." />
        </div>
      ),
    },
    {
      title: "سامان قنبری (کارشناس امور خوابگاه)",
      subTitle: (
        <div className="subtitle">
          <h4 className="subtitle-text">1402 / 02 / 02 - 14:30</h4>
          <h4 className="subtitle-text">ویرایش تأیید برنامه پذیرش</h4>
        </div>
      ),
      description: (
        <div className="description">
          <SingleVerticalItem label="توضیحات" value="تعرفه‌های اعمال شده تغییر کردند." />
        </div>
      ),
    },
  ];

  return (
    <div className="admission-detail-rejected-change-history-container">
      <Steps orientation="vertical" size="small" current={3} items={stepItem} />
    </div>
  );
};

export default AdmissionDetailRejectedChangeHistory;
