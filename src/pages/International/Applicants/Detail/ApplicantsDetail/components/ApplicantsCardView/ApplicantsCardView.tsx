import { AiOutlineArrowLeft, AiOutlineClose } from "react-icons/ai";
import { PiFilePlusDuotone, PiHourglassSimpleHigh } from "react-icons/pi";
import { Link } from "react-router";

import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { makeSearchParams } from "@infra/helpers/utils";
import { INTERNATIONAL_APPLICANTS_REQUEST_DETAIL_ROUTE } from "@infra/router/routes/international";

import { APPLICANTS_IDS } from "../../../utils/applicantsDetailUtils";
import "./@applicantsCardView.scss";
const ApplicantsCardView = ({ item }: { item: any }) => {
  const requestType = item?.requestType;

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="applicants-card-view-container border-neutral-6 bg-neutral-2 flex flex-col gap-4 rounded-[6px] border-[1px] border-dashed p-2! font-[DanaFaNum] max-[490px]:flex-wrap">
      <div className="flex justify-between max-[500px]:flex-col">
        <PiFilePlusDuotone className="text-primary-7" size={17} />
        <CustomTag
          className="flex gap-1"
          color={
            requestType === APPLICANTS_IDS?.reject
              ? "red"
              : requestType === APPLICANTS_IDS?.waitingReChecking
                ? "orange"
                : "default"
          }
          icon={
            requestType === APPLICANTS_IDS?.reject ? (
              <AiOutlineClose />
            ) : requestType === APPLICANTS_IDS?.waitingReChecking ||
              requestType === APPLICANTS_IDS?.pending ? (
              <PiHourglassSimpleHigh />
            ) : null
          }
        >
          {requestType === APPLICANTS_IDS?.reject
            ? "رد شده"
            : requestType === APPLICANTS_IDS?.waitingReChecking
              ? " در انتظار بررسی مجدد"
              : requestType === APPLICANTS_IDS?.pending
                ? "در انتظار بررسی"
                : "-"}
        </CustomTag>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between max-[500px]:flex-col">
          <span className="text-neutral-7">شماره درخواست:</span>
          <span className="text-neutral-12">{item?.requestNumber}</span>
        </div>
        <div className="flex justify-between max-[500px]:flex-col">
          <span className="text-neutral-7">مرحله درخواست:</span>
          <CustomTag color="blue">{item?.requestLevel}</CustomTag>
        </div>
        <div className="flex justify-between max-[500px]:flex-col">
          <span className="text-neutral-7">مقطع درخواستی:</span>
          <CustomTag color="default">{item?.requestDegree}</CustomTag>
        </div>
        <div className="flex justify-between max-[500px]:flex-col">
          <span className="text-neutral-7">رشته درخواستی:</span>
          <span className="text-neutral-12">{item?.requestField}</span>
        </div>
        <div className="flex justify-between max-[500px]:flex-col">
          <span className="text-neutral-7">واحد درخواستی:</span>
          <span className="text-neutral-12">{item?.requestUnit}</span>
        </div>
      </div>
      <div className="border-neutral-5 flex w-fit cursor-pointer justify-end self-end rounded-[6px] border-[1px] p-1!">
        <Link
          to={{
            pathname: INTERNATIONAL_APPLICANTS_REQUEST_DETAIL_ROUTE,
            search: makeSearchParams({
              id: item?.id,
              status: item?.requestType,
            }),
          }}
          className="text-link"
        >
          <AiOutlineArrowLeft className="text-neutral-12 p-[5px]" />
        </Link>
      </div>
    </div>
  );
};
export default ApplicantsCardView;
