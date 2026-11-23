import { useEffect, useState } from "react";

import { Row } from "antd";

import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { useGetResidenceBedInfoMutation } from "@infra/states/redux/Apis/dorm/residence/dormResidenceApi";
import { dateTimeCombiner } from "@pages/Dorm/_shared/utils/DormUtils";

import {
  BedDetailDrawerContentProps,
  GetResidenceBedInfoResponse,
} from "./@types/@bedDetailDrawerContent";
import "./_bedDetailDrawerContent.scss";

const BedDetailDrawerContent = ({
  closeDrawerHandler,
  id,
}: BedDetailDrawerContentProps) => {
  const [isDoubleBed, setIsDoubleBed] = useState<boolean | null>(null);

  //? ================================  Api Calls ================================
  const [getBedInfo, { data: bedData, isLoading: isBedDataLoading }] =
    useGetResidenceBedInfoMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getBedInfo({
      body: {
        _data_: {
          id: id?.toString(),
        },
      },
      params: { relation: "742f218d65624e139ab1e57f79b7854b" }, //we should set this to get data
    })
      .unwrap()
      .then(getBedInfoSuccess);
  }, []);

  //* ================================ Util Functions ================================
  const getBedInfoSuccess = (value: GetResidenceBedInfoResponse) => {
    if (value?.status === 200) {
      if (value?.data?.AssociationCategoryBedType?.id === 2) {
        setIsDoubleBed(true);
      } else {
        setIsDoubleBed(false);
      }
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <Div
      loading={isBedDataLoading}
      className="dorm-residence-bed-detail-drawer-container"
    >
      <CustomDrawerHeader
        title="جزئیات تخت"
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <CustomTag
            color={
              bedData?.data?.AssociationCategoryRecordStatus?.id === 1
                ? "green"
                : bedData?.data?.AssociationCategoryRecordStatus?.id === 2
                  ? "gold"
                  : "red"
            }
          >
            {bedData?.data?.AssociationCategoryRecordStatus?.title}
          </CustomTag>
        }
      />
      <div className="drawer-body">
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="اقامتگاه"
            value={bedData?.data?.AssociationCategoryDormitory?.title}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="ساختمان"
            value={bedData?.data?.AssociationCategoryBuliding?.title}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="طبقه"
            value={bedData?.data?.AssociationCategoryFloor?.title}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="اتاق"
            value={bedData?.data?.AssociationCategorRoom?.title}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="عنوان تخت"
            value={bedData?.data?.title}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="شماره تخت"
            value={bedData?.data?.bedNumber?.toString()}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="شماره اموال"
            value={bedData?.data?.AssetTag}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="تعداد طبقه"
            value={bedData?.data?.AssociationCategoryBedType?.title}
          />
          {isDoubleBed && bedData?.data?.flatFloor && (
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="طبقه تخت"
              value={bedData?.data?.flatFloor === 1 ? "طبقه پایین" : "طبقه بالا"}
            />
          )}
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="درجه کیفی"
            value={bedData?.data?.AssociationCategoryQuality?.title}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="نوع تخت"
            value={bedData?.data?.isExtraBed === 1 ? "اصلی" : "اضافه"}
          />
          <SingleVerticalWithCol
            span={24}
            label="توضیحات تخت"
            value={bedData?.data?.description}
          />
        </Row>
        <Row gutter={[16, 16]} className="date-container">
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="زمان ثبت"
            value={dateTimeCombiner(bedData?.data?.createDate, bedData?.data?.createTime)}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="زمان آخرین ویرایش"
            value={dateTimeCombiner(bedData?.data?.updeteDate, bedData?.data?.updeteTime)}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="آخرین ویرایش‌کننده"
            value={`${bedData?.data?.AssociationEditUserStaffNew?.AssociationCustomerUser?.firstName ?? "-"} ${bedData?.data?.AssociationEditUserStaffNew?.AssociationCustomerUser?.lastName ?? ""}`}
          />
        </Row>
      </div>
    </Div>
  );
};

export default BedDetailDrawerContent;
