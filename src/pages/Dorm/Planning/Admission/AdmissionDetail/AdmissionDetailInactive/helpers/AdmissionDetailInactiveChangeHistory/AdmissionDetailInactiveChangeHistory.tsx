import { Steps } from "antd";

import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import SingleVerticalItem from "@components/Renderers/SingleVerticalItem/SingleVerticalItem";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { massageCreatorInactiveAlert } from "@pages/Dorm/Planning/Admission/utils/AdmissionUtils";
import "./_admissionDetailInactiveChangeHistory.scss";

const AdmissionDetailInactiveChangeHistory = ({
  deactivationDate,
}: {
  deactivationDate?: string;
}) => {
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
    <div className="admission-detail-inactive-change-history-container">
      {/* //Todo[Atefeh]: get date from API */}
      <CustomAlert
        message={massageCreatorInactiveAlert(
          dataPlaceHolder({
            data: deactivationDate,
            isDate: true,
          })
        )}
        type="error"
        showIcon
      />
      <Steps orientation="vertical" size="small" current={3} items={stepItem} />
    </div>
  );
};

export default AdmissionDetailInactiveChangeHistory;
