import { Card, Timeline } from "antd";
import { PiFolder } from "react-icons/pi";
import { Link } from "react-router";

import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { convertDateToPersianTextDateWithTime } from "@infra/helpers/dateConvertor";
import { makeSearchParams } from "@infra/helpers/utils";
import { MANAGEMENT_MY_DETAIL_PAGE_ROUTE } from "@infra/router/routes/management";
import { NEUTRAL_07 } from "@infra/VARS/globalColors/globalColors";
import { HistoryTabProps } from "@pages/Ticketing/_shared/pages/TicketingDetail/_shared/helper/components/HistoryTab/@types/@historyTab";

const revisionDateText = (date: string) => {
  if (date) {
    return convertDateToPersianTextDateWithTime(date);
  } else {
    return "-";
  }
};

const CreateCard = ({ item }: any) => {
  return (
    <Card className="bg-neutral-2! gap-6 rounded-2xl border-none!">
      <p className="font-extrabold">
        تیکت توسط{" "}
        <span className="text-primary text-xs! font-bold!">
          {item?.userRevisionName ? (
            <Link
              to={{
                pathname: MANAGEMENT_MY_DETAIL_PAGE_ROUTE,
                search: makeSearchParams({
                  id: item?.userRevisionId,
                }),
              }}
            >
              {item?.userRevisionName}
            </Link>
          ) : (
            "-"
          )}
        </span>{" "}
        ثبت شد!
      </p>

      {/* DETAILS */}
      {item?.details && <p className="text-neutral-9 mt-2!">{item?.details}</p>}

      {/* DATE */}
      <p className="text-neutral-8 mt-2!">{revisionDateText(item.revisionDate)}</p>
    </Card>
  );
};

const ReferralCard = ({ item }: any) => {
  return (
    <Card className="bg-neutral-2! gap-6 rounded-2xl border-none!">
      <p className="font-extrabold">
        تیکت توسط{" "}
        <span className="text-primary text-xs! font-bold!">
          {item?.userRevisionName ? (
            <Link
              to={{
                pathname: MANAGEMENT_MY_DETAIL_PAGE_ROUTE,
                search: makeSearchParams({
                  id: item?.userRevisionId,
                }),
              }}
            >
              {item?.userRevisionName}
            </Link>
          ) : (
            "-"
          )}
        </span>{" "}
        ارجاع داده شد!
      </p>

      {/* SERVICE CHANGE */}
      {(item?.oldSamimService || item?.newSamimService) &&
        item?.oldSamimService?.id !== item?.newSamimService?.id && (
          <p className="mt-2!">
            تغییر سرویس از{" "}
            <span className="inline-block">
              {item?.oldSamimService ? (
                <SamimServiceTag service={item?.oldSamimService?.name} />
              ) : (
                "-"
              )}
            </span>{" "}
            به{" "}
            <span className="inline-block">
              {item?.newSamimService ? (
                <SamimServiceTag service={item?.newSamimService?.name} />
              ) : (
                "-"
              )}
            </span>
          </p>
        )}

      {/* TOPIC CHANGE */}
      {(item?.oldTopic || item?.newTopic) &&
        item?.oldTopic?.id !== item?.newTopic?.id && (
          <p className="mt-2!">
            تغییر موضوع مشکل از{" "}
            <span className="inline-block">
              {item?.oldTopic ? (
                <CustomTag variant="outlined" className="gap-2" icon={<PiFolder />}>
                  {item?.oldTopic?.title}
                </CustomTag>
              ) : (
                "-"
              )}
            </span>{" "}
            به{" "}
            <span className="inline-block">
              {item?.newTopic ? (
                <CustomTag variant="outlined" className="gap-2" icon={<PiFolder />}>
                  {item?.newTopic?.title}
                </CustomTag>
              ) : (
                "-"
              )}
            </span>
          </p>
        )}

      {/* DETAILS */}
      {item?.details && <p className="text-neutral-9 mt-2!">{item?.details}</p>}

      {/* DATE */}
      <p className="text-neutral-8 mt-2!">{revisionDateText(item.revisionDate)}</p>
    </Card>
  );
};

const AssignCard = ({ item }: any) => {
  return (
    <Card className="bg-neutral-2! gap-6 rounded-2xl border-none!">
      <p className="font-extrabold">
        تیکت به{" "}
        <span className="text-primary text-xs! font-bold!">
          {item?.newAssignBy?.title ? (
            <Link
              to={{
                pathname: MANAGEMENT_MY_DETAIL_PAGE_ROUTE,
                search: makeSearchParams({
                  id: item?.newAssignBy?.id,
                }),
              }}
            >
              {item?.newAssignBy?.title}
            </Link>
          ) : (
            "-"
          )}
        </span>{" "}
        اختصاص داده شد!
      </p>

      {/* DETAILS */}
      {item?.details && <p className="text-neutral-9 mt-2!">{item?.details}</p>}

      {/* DATE */}
      <p className="text-neutral-8 mt-2!">{revisionDateText(item.revisionDate)}</p>
    </Card>
  );
};

const ChangeStatusCard = ({ item }: any) => {
  return (
    <Card className="bg-neutral-2! gap-6 rounded-2xl border-none!">
      <p className="font-extrabold">
        تیکت توسط{" "}
        <span className="text-primary text-xs! font-bold!">
          {item?.userRevisionName ? (
            <Link
              to={{
                pathname: MANAGEMENT_MY_DETAIL_PAGE_ROUTE,
                search: makeSearchParams({
                  id: item?.userRevisionId,
                }),
              }}
            >
              {item?.userRevisionName}
            </Link>
          ) : (
            "-"
          )}
        </span>{" "}
        از وضعیت{" "}
        <span className="inline-block">
          {item?.newTopic ? (
            <CustomTag variant="outlined" className="gap-2" icon={<PiFolder />}>
              {item?.oldStatus?.title}
            </CustomTag>
          ) : (
            "-"
          )}
        </span>{" "}
        به وضعیت{" "}
        <span className="inline-block">
          {item?.newTopic ? (
            <CustomTag variant="outlined" className="gap-2" icon={<PiFolder />}>
              {item?.newStatus?.title}
            </CustomTag>
          ) : (
            "-"
          )}
        </span>{" "}
        تغییر وضعیت داد!
      </p>

      {/* DETAILS */}
      {item?.details && <p className="text-neutral-9 mt-2!">{item?.details}</p>}

      {/* DATE */}
      <p className="text-neutral-8 mt-2!">{revisionDateText(item.revisionDate)}</p>
    </Card>
  );
};

const HistoryTab = ({ data, loading }: HistoryTabProps) => {
  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={loading}>
      {!data || data?.length === 0 ? (
        <div className="m-20">
          <CustomEmpty description="تاریخچه ای برای نمایش وجود ندارد..." />
        </div>
      ) : (
        <Timeline
          mode="start"
          items={data?.map((item) => {
            return {
              color: NEUTRAL_07,

              content: item?.actionType?.map((innerItem) =>
                innerItem?.name === "CREATE_TICKET" ? (
                  <CreateCard item={item} />
                ) : innerItem?.name === "CHANGE_ORIGIN" ? (
                  <ReferralCard item={item} />
                ) : innerItem?.name === "CHANGE_ASSIGN_BY" && item?.newAssignBy ? (
                  <AssignCard item={item} />
                ) : innerItem?.name === "CHANGE_STATUS" ? (
                  <ChangeStatusCard item={item} />
                ) : (
                  <></>
                )
              ),
            };
          })}
        />
      )}
    </Div>
  );
};
export default HistoryTab;
