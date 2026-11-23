import { useEffect } from "react";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { useLazyGetContractTermsDetailQuery } from "@infra/states/redux/Apis/contracts/templateSettings/templateSettings";

import { TemplateSettingShowMoreDrawerContentProps } from "./@type/@templateSettingShowMoreDrawerContent";
import "./_templateSettingShowMoreDrawerContent.scss";

const TemplateSettingShowMoreDrawerContent = ({
  closeDrawerHandler,
  data,
  relatedTerm,
}: TemplateSettingShowMoreDrawerContentProps) => {
  //? ================================  Api Calls ================================
  const [getTermDetail, { isLoading: isTermDetailLoading, data: termData }] =
    useLazyGetContractTermsDetailQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (data?.id) {
      getTermDetail(data?.id);
    }
  }, []);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <CustomDrawerHeader
        title="جزییات قالب"
        closeDrawerHandler={closeDrawerHandler}
        // Todo[Atefeh]: uncomment when not need in future
        // leftSideContent={
        //   <>
        //     <CustomButton
        //       type="default"
        //       onClick={closeDrawerHandler}
        //       icon={<AiOutlineEdit color={"#1F1F1F"} />}
        //     >
        //       ویرایش
        //     </CustomButton>
        //     <CustomButton
        //       type="primary"
        //       onClick={submitChangeHandler}
        //       icon={<RxCopy color="#FFFFFF" />}
        //     >
        //       کپی قالب
        //     </CustomButton>
        //   </>
        // }
      />

      <Div loading={isTermDetailLoading} className="flex flex-col gap-10">
        <div className="contract-template-setting-show-more-drawer flex flex-col gap-4">
          <CustomDivider text="جزییات قالب" />
          <SingleVerticalWithCol
            span={24}
            label="بند مرتبط به قالب"
            value={relatedTerm?.label}
          />
          <SingleVerticalWithCol span={24} label="عنوان قالب" value={termData?.title} />
          <SingleVerticalWithCol
            span={24}
            value={termData?.clause}
            label="متن قالب پیش فرض"
          />
        </div>

        <div className="flex flex-col gap-4">
          <SingleVerticalWithCol
            span={24}
            label="ایجاد کننده"
            value={termData?.createdBy}
          />
          <SingleVerticalWithCol
            span={24}
            label="تاریخ ایجاد"
            value={termData?.createdDate}
            isDate
          />
          <SingleVerticalWithCol
            span={24}
            label="آخرین ویرایش کننده"
            value={termData?.modifiedBy}
          />
          <SingleVerticalWithCol
            span={24}
            label="تاریخ ویرایش"
            value={termData?.modifiedDate}
            isDate
          />
        </div>
      </Div>
    </div>
  );
};
export default TemplateSettingShowMoreDrawerContent;
