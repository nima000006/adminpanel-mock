import { useEffect } from "react";

import { Row } from "antd";

import { CustomMap, CustomUploader } from "@components/CustomInputs";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetResidenceDataQuery } from "@infra/states/redux/Apis/dormitory/residence/residenceApi";
import { GetResidenceDataNearbyPlace } from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceBuildingList/helper/drawer/ModifyBuildingDrawerContent/@types/@modifyBuildingDrawerContentTypes";
import ResidenceInfoSegmentPlacesTableModel from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceMoreDetail/helper/components/ResidenceInfoSegmentContent/helper/model/ResidenceInfoSegmentPlacesTableModel";

const ResidenceInfoSegmentContent = () => {
  const { params: url } = useQueryParams();

  //? ================================ Api Calls ================================
  const [
    getResidenceMoreDetailInfoSegment,
    {
      data: getResidenceMoreDetailInfoSegmentData,
      isFetching: isGetResidenceMoreDetailInfoSegmentLoading,
    },
  ] = useLazyGetResidenceDataQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getResidenceMoreDetailInfoSegmentHandler();
  }, [url?.residenceId]);

  //* ================================ Util Functions ================================
  const getResidenceMoreDetailInfoSegmentHandler = () => {
    if (!url?.residenceId) return;

    getResidenceMoreDetailInfoSegment(url.residenceId);
  };

  const renderDefaultUploader = () => (
    <CustomUploader
      fileList={[]}
      setFileList={() => {}}
      isReadOnly
      hasUploaderIcon={false}
      hasNullText
      uploaderText="عکس اقامتگاه"
    />
  );

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={isGetResidenceMoreDetailInfoSegmentLoading}>
      <div className="flex flex-col gap-10">
        <div className="mt-10 flex flex-col">
          <p className="mb-1! font-medium">عکس اقامتگاه</p>
          <div className="flex gap-4">
            {getResidenceMoreDetailInfoSegmentData?.images?.length
              ? getResidenceMoreDetailInfoSegmentData.images.map((item) => (
                  <CustomUploader
                    key={item?.uuid}
                    fileList={
                      item?.url
                        ? [
                            {
                              uid: item.url,
                              name: item.url,
                              url: item.url,
                              status: "done",
                            },
                          ]
                        : []
                    }
                    setFileList={() => {}}
                    isReadOnly
                    hasUploaderIcon={false}
                    hasNullText
                    uploaderText="عکس اقامتگاه"
                  />
                ))
              : [0, 1].map((item) => <div key={item}>{renderDefaultUploader()}</div>)}
          </div>
        </div>

        {/* اطلاعات پایه */}
        <div>
          <CustomDivider text="اطلاعات پایه" />
          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol
              label="نوع اقامتگاه"
              value={getResidenceMoreDetailInfoSegmentData?.accommodationType?.title}
            />
            <SingleVerticalWithCol
              label="درجه کیفی"
              value={getResidenceMoreDetailInfoSegmentData?.qualityGrade?.title}
            />
            <SingleVerticalWithCol
              label="ظرفیت اسمی"
              value={dataPlaceHolder({
                data: getResidenceMoreDetailInfoSegmentData?.nominalCapacity,
                isPrice: true,
              })}
              extraContent="نفر"
            />
            <SingleVerticalWithCol
              label="کسب و کار"
              value={getResidenceMoreDetailInfoSegmentData?.businessName}
            />
            <SingleVerticalWithCol
              label="شعبه / واحد"
              value={getResidenceMoreDetailInfoSegmentData?.branchName}
            />
            <SingleVerticalWithCol
              label="مساحت کل اقامتگاه"
              value={getResidenceMoreDetailInfoSegmentData?.areaSquareMeters?.toString()}
              isPrice
              extraContent="متر مربع"
            />
            <SingleVerticalWithCol
              label="مساحت فضای سبز "
              value={getResidenceMoreDetailInfoSegmentData?.greenSpaceAreaSquareMeters?.toString()}
              isPrice
              extraContent="متر مربع"
            />
          </Row>
        </div>

        {/* اطلاعات مکانی */}
        <div className="flex flex-col gap-4">
          <CustomDivider text="اطلاعات مکانی" />
          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol
              label="کد پستی"
              value={getResidenceMoreDetailInfoSegmentData?.zipCode}
            />
            <SingleVerticalWithCol
              label="شماره تلفن اقامتگاه"
              value={getResidenceMoreDetailInfoSegmentData?.phone}
            />
            <SingleVerticalWithCol
              label="استان"
              value={getResidenceMoreDetailInfoSegmentData?.provinceTitle}
            />
            <SingleVerticalWithCol
              label="شهر"
              value={getResidenceMoreDetailInfoSegmentData?.cityTitle}
            />
            <SingleVerticalWithCol
              span={24}
              label="آدرس"
              value={
                getResidenceMoreDetailInfoSegmentData?.faAddress ||
                getResidenceMoreDetailInfoSegmentData?.address
              }
            />
          </Row>
          {/* موقعیت جغرافیایی */}
          <div>
            <label>موقعیت جغرافیایی</label>
            <CustomMap
              isReadOnly={true}
              lat={getResidenceMoreDetailInfoSegmentData?.latitude ?? 35.699739}
              lng={getResidenceMoreDetailInfoSegmentData?.longitude ?? 51.338097}
              setLat={() => {}}
              setLng={() => {}}
            />
          </div>
        </div>

        {/*  اماکن اطراف اقامتگاه */}
        <div>
          <CustomDivider text="اماکن اطراف اقامتگاه" />
          <CustomTable<GetResidenceDataNearbyPlace>
            dataSource={getResidenceMoreDetailInfoSegmentData?.nearbyPlaces ?? []}
            rowKey="uuid"
            loading={false}
            columns={ResidenceInfoSegmentPlacesTableModel()}
            pagination={false}
          />
        </div>
      </div>
    </Div>
  );
};
export default ResidenceInfoSegmentContent;
