import { useEffect, useState } from "react";

import { Row, UploadFile } from "antd";

import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { useLazyGetActiveBannersDetailQuery } from "@infra/states/redux/Apis/business/serviceManagementService/serviceManagementService";
import { GetActiveBannersDetailResponse } from "@pages/Settings/BannerManagement/@types/@bannerManagement";

import visitBannerTableColumn from "../../AppBannerTableModel/VisitBannerTableColumn";

type AddToListDrawerContentProps = {
  closeDrawerHandler: () => void;
  id: number;
};

const VisitBannerContent = ({ closeDrawerHandler, id }: AddToListDrawerContentProps) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  //? ================================  Api Calls ================================
  const [
    getBranchActiveBanner,
    { data: activeBannersData, isLoading: isActiveBannersDataLoading },
  ] = useLazyGetActiveBannersDetailQuery();

  //   const initialTargetKeys = state?.selectedBranches;

  //? ================================ Effects ================================
  useEffect(() => {
    if (id > 0) {
      getBranchActiveBanner(id?.toString()).unwrap().then(onGetBranchSuccess);
    }
  }, [id]);

  //* ================================ Util Functions ================================
  // drawerCloseHandler
  const drawerCloseHandler = () => {
    closeDrawerHandler();
  };

  const onGetBranchSuccess = (res: GetActiveBannersDetailResponse) => {
    if (res?.imageURL) {
      setFileList([
        {
          uid: res?.imageURL,
          name: res?.imageURL,
          status: "done",
          url: res?.imageURL,
        },
      ]);
    }
  };
  return (
    <Div loading={isActiveBannersDataLoading}>
      {/* ---------------------------------- Drawer Header ---------------------------------- */}
      <CustomDrawerHeader
        hasLeftSide
        leftSideContent={
          <CustomSwitch
            valuePropName="isBannerActive"
            checked={activeBannersData?.active}
            disabled
            checkedChildren="فعال"
            unCheckedChildren="غیر فعال"
          />
        }
        title="مشاهده بنر"
        closeDrawerHandler={drawerCloseHandler}
      />
      {/* ---------------------------------- Main Content ---------------------------------- */}
      {/* ---------------------------------- تصویر ---------------------------------- */}
      <CustomDivider text="تصویر" />
      <CustomUploader fileList={fileList} setFileList={setFileList} hasNullText />
      {/* ---------------------------------- اطلاعات اولیه ---------------------------------- */}
      <CustomDivider text="اطلاعات اولیه" />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol label="عنوان" value={activeBannersData?.title} />

        <SingleVerticalWithCol
          label="محل نمایش"
          value={activeBannersData?.sectionType?.faTitle}
        />

        <SingleVerticalWithCol label="لینک بنر" value={activeBannersData?.imageLink} />

        <SingleVerticalWithCol
          label="توضیحات بنر"
          value={activeBannersData?.description}
        />
      </Row>
      {/* ---------------------------------- اعمال شده برای واحد های زیر ---------------------------------- */}
      <CustomDivider text="اعمال شده برای واحد های زیر" />
      <CustomTable
        dataSource={activeBannersData?.branches?.map((item) => ({ branchCode: item }))}
        columns={visitBannerTableColumn}
        {...TABLE_PROPS(activeBannersData?.branches?.length || 0)}
      />
      {/* ---------------------------------- سوابق رکورد ---------------------------------- */}
      <CustomDivider text="سوابق رکورد" />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          label="تاریخ ایجاد"
          value={activeBannersData?.createdDate}
          isDate
        />

        <SingleVerticalWithCol
          label="تاریخ آخرین ویرایش"
          value={activeBannersData?.modifiedDate}
          isDate
        />

        <SingleVerticalWithCol
          label="ایجاد کننده"
          value={activeBannersData?.modifiedBy}
        />
      </Row>
    </Div>
  );
};

export default VisitBannerContent;
