import { useEffect, useState } from "react";

import { Col, Row } from "antd";
import { useSearchParams } from "react-router";

import CustomMap from "@components/CustomInputs/CustomMap/CustomMap";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { dormVisibilityStatusColor } from "@pages/Dorm/_shared/utils/DormUtils";

import {
  GetResidenceDetailInfoResponse,
  ResidenceDetailDrawerContentProps,
  ResidenceDetailInfoType,
} from "./@types/@residenceDetailDrawerContent";

import "./_residenceDetailDrawerContent.scss";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { useGetResidenceDetailInfoMutation } from "@infra/states/redux/Apis/dorm/residence/dormResidenceApi";

import ResidenceDetailAroundPlacesTableModel from "./helper/models/ResidenceDetailAroundPlaces/ResidenceDetailAroundPlacesTableModel";

const ResidenceDetailDrawerContent = ({
  onCloseDrawer,
}: ResidenceDetailDrawerContentProps) => {
  const [residenceData, setResidenceData] = useState<ResidenceDetailInfoType>();

  const [searchParams] = useSearchParams();
  const { id } = Object.fromEntries([...searchParams]);

  const [lat, setLat] = useState<number>(35.699739);
  const [lng, setLng] = useState<number>(51.338097);

  //? ================================  Api Calls =============================
  const [getResidenceData, { isLoading }] = useGetResidenceDetailInfoMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getResidenceData({
      body: {
        _data_: {
          id: id,
        },
      },
      params: {
        relation: "5f44b082bfb44d06a41bede67df07750", // we should set this for getting data
      },
    })
      .unwrap()
      .then(getResidenceDataSuccess);
  }, []);

  //* ================================ Util Functions ================================
  const getResidenceDataSuccess = (value: GetResidenceDetailInfoResponse) => {
    if (value?.status === 200) {
      setResidenceData(value?.data);
      setLat(value?.data?.latitude);
      setLng(value?.data?.longitude);
    }
  };

  return (
    <Div loading={isLoading}>
      <CustomDrawerHeader
        title="جزئیات اقامتگاه"
        closeDrawerHandler={onCloseDrawer}
        leftSideContent={
          residenceData?.AssociationRecordStatus?.id && (
            <CustomTag
              color={
                residenceData &&
                dormVisibilityStatusColor[residenceData?.AssociationRecordStatus?.id]
              }
            >
              {residenceData?.AssociationRecordStatus?.title}
            </CustomTag>
          )
        }
      />
      <div className="residence-detail-drawer-content-container">
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="نام اقامتگاه"
            value={residenceData?.title}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="نوع اقامتگاه"
            value={residenceData?.AssociationAccommodationType?.title}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="شناسه اقامتگاه"
            value={residenceData?.id?.toString()}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="درجه کیفی"
            value={residenceData?.AssociationQuality?.title}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="ظرفیت اسمی (نفر)"
            value={residenceData?.nominalCapacity?.toString()}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="جنسیت"
            value={residenceData?.AssociationGender?.title}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="واحد"
            value={residenceData?.AssociationBranch?.title}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="مساحت کل خوابگاه (متر مربع)"
            value={residenceData?.sizeOfDormitory?.toString()}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="مساحت فضای سبز (متر مربع)"
            value={residenceData?.sizeOfGreenSpace?.toString()}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="استان"
            value={residenceData?.AssociationRegion?.AssociationRegionType?.title}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="شهر"
            value={residenceData?.AssociationRegion?.title}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="کد پستی"
            value={residenceData?.zipCode}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="شماره تلفن"
            value={residenceData?.phoneNumber}
          />
          <SingleVerticalWithCol span={24} label="آدرس" value={residenceData?.address} />
          <Col span={24}>
            <CustomMap
              lat={lat}
              lng={lng}
              setLat={setLat}
              setLng={setLng}
              isReadOnly={true}
            />
          </Col>
        </Row>
        <div className="residence-around-place-info-container">
          <CustomDivider text="اماکن اطراف خوابگاه" />
          <CustomTable
            dataSource={residenceData?.AssociationPlacesAndDormitories || []}
            columns={ResidenceDetailAroundPlacesTableModel()}
            rowKey="id"
            pagination={false}
            {...TABLE_PROPS(residenceData?.AssociationPlacesAndDormitories?.length || 0)}
          />
        </div>
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            span={24}
            label="توضیحات اقامتگاه"
            value={residenceData?.description}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="زمان ثبت"
            value={`${dataPlaceHolder({ data: residenceData?.createDate, isDate: true })} , ${dataPlaceHolder({ data: residenceData?.createTime, isTime: true })}`}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="زمان آخرین ویرایش"
            value={`${dataPlaceHolder({ data: residenceData?.updateDate, isDate: true })} , ${dataPlaceHolder({ data: residenceData?.updateTime, isTime: true })}`}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="آخرین ویرایش‌کننده"
            value={`${residenceData?.AssociationEditUserStaffNew?.AssociationCustomerUser?.firstName ?? "-"} ${residenceData?.AssociationEditUserStaffNew?.AssociationCustomerUser?.lastName ?? ""} `}
          />
        </Row>
      </div>
    </Div>
  );
};

export default ResidenceDetailDrawerContent;
