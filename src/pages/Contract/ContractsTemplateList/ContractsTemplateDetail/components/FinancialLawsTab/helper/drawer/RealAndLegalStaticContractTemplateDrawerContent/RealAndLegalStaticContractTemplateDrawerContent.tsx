import { PiBriefcase, PiUser } from "react-icons/pi";
import { Link } from "react-router";

import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { emptyString } from "@infra/config/global.vars";
import { dataPlaceHolder } from "@infra/helpers/utils";

import { RealAndLegalStaticContractTemplateDrawerContentProps } from "./@types/@realAndLegalStaticContractTemplateDrawerContentType";
import { kindOffBeneficiary } from "../../utils/financialLawTabUtils";

const RealAndLegalStaticContractTemplateDrawerContent = ({
  closeDrawerHandler,
  data,
  title,
}: RealAndLegalStaticContractTemplateDrawerContentProps) => {
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <CustomDrawerHeader
        title="جزئیات ذینفع ثابت قالب قرارداد"
        closeDrawerHandler={closeDrawerHandler}
      />

      <div className="bg-neutral-2 m-10! flex flex-col items-center justify-center gap-2 rounded-md p-4!">
        <p>{`خدمت  ${dataPlaceHolder({ data: title })}`}</p>
        <h3 className="text-neutral-11 text-2xl">
          {dataPlaceHolder({ data: data?.beneficiaryName })}
        </h3>
        {/* کلید کدملی */}
        <p>{dataPlaceHolder({ data: data?.username })}</p>
        <div className="flex flex-wrap items-center justify-center gap-1">
          <CustomTag>{`${dataPlaceHolder({ data: data?.percentage })}%`} سهم</CustomTag>

          {data?.beneficiaryRuleType === "LEGAL_DETERMINED" ? (
            <CustomTag>{dataPlaceHolder({ data: data.branchType })}</CustomTag>
          ) : (
            <CustomTag>{emptyString}</CustomTag>
          )}
          {data?.beneficiaryRuleType === "LEGAL_DETERMINED" && (
            <CustomTag>{emptyString}</CustomTag>
          )}
          <CustomTag>
            {
              kindOffBeneficiary[
                data?.beneficiaryRuleType as keyof typeof kindOffBeneficiary
              ]
            }
          </CustomTag>
        </div>
        {data?.beneficiaryRuleType === "PERSONAL_DETERMINED" ? (
          <Link
            to={""}
            className="text-primary-6! flex cursor-pointer items-center gap-1"
          >
            <PiUser size={16} /> نمایش پروفایل کاربر
          </Link>
        ) : data?.beneficiaryRuleType === "LEGAL_DETERMINED" ? (
          <Link
            to={""}
            className="text-primary-6! flex cursor-pointer items-center gap-1"
          >
            <PiBriefcase size={16} /> نمایش پروفایل کسب و کار
          </Link>
        ) : null}
      </div>
    </div>
  );
};
export default RealAndLegalStaticContractTemplateDrawerContent;
