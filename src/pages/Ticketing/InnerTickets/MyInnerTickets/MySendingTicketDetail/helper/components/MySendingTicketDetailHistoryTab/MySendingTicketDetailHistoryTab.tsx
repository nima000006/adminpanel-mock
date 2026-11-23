import { Card, Timeline } from "antd";
import { PiFolder } from "react-icons/pi";

import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { convertDateToPersianTextDateWithTime } from "@infra/helpers/dateConvertor";
import { NEUTRAL_07 } from "@infra/VARS/globalColors/globalColors";

const MySendingTicketDetailHistoryTab = () => {
  return (
    <div>
      <Timeline
        mode="start"
        items={[
          {
            content: (
              <Card className="bg-neutral-2! gap-6 rounded-2xl border-none!">
                <p className="font-extrabold">
                  تیکت توسط{" "}
                  <span className="text-primary text-xs! font-bold!">مازیار فلاح </span>
                  بسته شد!
                </p>
                <p className="mt-2!">
                  {convertDateToPersianTextDateWithTime("2026-01-05T18:46:36.232995")}
                </p>
              </Card>
            ),
            color: "red",
          },
          {
            content: (
              <Card className="bg-neutral-2! gap-6 rounded-2xl border-none!">
                <p className="font-extrabold">
                  تیکت توسط{" "}
                  <span className="text-primary text-xs! font-bold!">مازیار فلاح </span>{" "}
                  اختصاص داده شد!
                </p>
                <p className="mt-2!">
                  {convertDateToPersianTextDateWithTime("2026-01-05T18:46:36.232995")}
                </p>
              </Card>
            ),
            color: NEUTRAL_07,
          },
          {
            content: (
              <Card className="bg-neutral-2! gap-6 rounded-2xl border-none!">
                <p className="font-extrabold">
                  تیکت توسط{" "}
                  <span className="text-primary text-xs! font-bold!">مازیار فلاح </span>{" "}
                  ارجاع داده شد!
                </p>
                <p className="mt-2!">
                  تغییر سرویس از{" "}
                  <span className="inline-block">
                    <SamimServiceTag service="FOOD" />
                  </span>{" "}
                  به{" "}
                  <span className="inline-block">
                    <SamimServiceTag service="STUDENT_CARD" />
                  </span>
                </p>
                <p className="mt-2!">
                  تغییر موضوع مشکل از{" "}
                  <span className="inline-block">
                    <CustomTag variant="outlined" className="gap-2" icon={<PiFolder />}>
                      مشکل ورود به سامانه
                    </CustomTag>
                  </span>{" "}
                  به{" "}
                  <span className="inline-block">
                    <CustomTag variant="outlined" className="gap-2" icon={<PiFolder />}>
                      مشکل در پرداخت آنلاین
                    </CustomTag>
                  </span>
                </p>
                <p className="mt-2!">
                  {convertDateToPersianTextDateWithTime("2026-01-05T18:46:36.232995")}
                </p>
              </Card>
            ),
            color: NEUTRAL_07,
          },
          {
            content: (
              <Card className="bg-neutral-2! gap-6 rounded-2xl border-none!">
                <p className="font-extrabold">
                  تیکت توسط{" "}
                  <span className="text-primary text-xs! font-bold!">مازیار فلاح </span>{" "}
                  اختصاص داده شد!
                </p>
                <p className="mt-2!">
                  {convertDateToPersianTextDateWithTime("2026-01-05T18:46:36.232995")}
                </p>
              </Card>
            ),
            color: NEUTRAL_07,
          },
          {
            content: (
              <Card className="bg-neutral-2! gap-6 rounded-2xl border-none!">
                <p className="font-extrabold">
                  تیکت توسط{" "}
                  <span className="text-primary text-xs! font-bold!">مازیار فلاح </span>
                  ثبت شد!
                </p>
                <p className="mt-2!">
                  {convertDateToPersianTextDateWithTime("2026-01-05T18:46:36.232995")}
                </p>
              </Card>
            ),
          },
        ]}
      ></Timeline>
    </div>
  );
};
export default MySendingTicketDetailHistoryTab;
