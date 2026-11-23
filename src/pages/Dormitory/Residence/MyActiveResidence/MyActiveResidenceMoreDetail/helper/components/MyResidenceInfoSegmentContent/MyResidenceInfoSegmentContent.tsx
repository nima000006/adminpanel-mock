import { useEffect } from "react";

import { Row } from "antd";

import { CustomMap, CustomUploader } from "@components/CustomInputs";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetMyResidenceDataQuery } from "@infra/states/redux/Apis/dormitory/residence/residenceApi";
import MyResidenceInfoSegmentPlacesTableModel from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceMoreDetail/helper/components/MyResidenceInfoSegmentContent/helper/model/MyResidenceInfoSegmentPlacesTableModel";
import { GetMyResidenceDataNearbyPlace } from "@pages/Dormitory/Residence/MyResidence/MyResidenceDetail/@types/@myResidenceDetail";

const MyResidenceInfoSegmentContent = () => {
  const { params: url } = useQueryParams();

  //? ================================ Api Calls ================================
  const [
    getMyResidenceMoreDetailInfoSegment,
    {
      data: getMyResidenceMoreDetailInfoSegmentData,
      isFetching: isGetMyResidenceMoreDetailInfoSegmentLoading,
    },
  ] = useLazyGetMyResidenceDataQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getMyResidenceMoreDetailInfoSegmentHandler();
  }, [url?.residenceId]);

  //* ================================ Util Functions ================================
  const getMyResidenceMoreDetailInfoSegmentHandler = () => {
    if (!url?.residenceId) return;

    getMyResidenceMoreDetailInfoSegment(url.residenceId);
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
    <Div loading={isGetMyResidenceMoreDetailInfoSegmentLoading}>
      <div className="flex flex-col gap-10">
        <div className="mt-10 flex flex-col">
          <p className="mb-1! font-medium">عکس اقامتگاه</p>
          <div className="flex gap-4">
            {getMyResidenceMoreDetailInfoSegmentData?.images?.length
              ? getMyResidenceMoreDetailInfoSegmentData.images.map((item) => (
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
              value={getMyResidenceMoreDetailInfoSegmentData?.accommodationType?.title}
            />
            <SingleVerticalWithCol
              label="درجه کیفی"
              value={getMyResidenceMoreDetailInfoSegmentData?.qualityGrade?.title}
            />
            <SingleVerticalWithCol
              label="ظرفیت اسمی"
              value={dataPlaceHolder({
                data: getMyResidenceMoreDetailInfoSegmentData?.nominalCapacity,
                isPrice: true,
              })}
              extraContent="نفر"
            />
            <SingleVerticalWithCol
              label="کسب و کار"
              value={getMyResidenceMoreDetailInfoSegmentData?.businessName}
            />
            <SingleVerticalWithCol
              label="شعبه / واحد"
              value={getMyResidenceMoreDetailInfoSegmentData?.branchName}
            />
            <SingleVerticalWithCol
              label="مساحت کل اقامتگاه"
              value={getMyResidenceMoreDetailInfoSegmentData?.areaSquareMeters?.toString()}
              isPrice
              extraContent="متر مربع"
            />
            <SingleVerticalWithCol
              label="مساحت فضای سبز "
              value={getMyResidenceMoreDetailInfoSegmentData?.greenSpaceAreaSquareMeters?.toString()}
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
              value={getMyResidenceMoreDetailInfoSegmentData?.zipCode}
            />
            <SingleVerticalWithCol
              label="شماره تلفن اقامتگاه"
              value={getMyResidenceMoreDetailInfoSegmentData?.phone}
            />
            <SingleVerticalWithCol
              label="استان"
              value={getMyResidenceMoreDetailInfoSegmentData?.provinceTitle}
            />
            <SingleVerticalWithCol
              label="شهر"
              value={getMyResidenceMoreDetailInfoSegmentData?.cityTitle}
            />
            <SingleVerticalWithCol
              span={24}
              label="آدرس"
              value={
                getMyResidenceMoreDetailInfoSegmentData?.faAddress ||
                getMyResidenceMoreDetailInfoSegmentData?.address
              }
            />
          </Row>
          {/* موقعیت جغرافیایی */}
          <div>
            <label>موقعیت جغرافیایی</label>
            <CustomMap
              isReadOnly={true}
              lat={getMyResidenceMoreDetailInfoSegmentData?.latitude ?? 35.699739}
              lng={getMyResidenceMoreDetailInfoSegmentData?.longitude ?? 51.338097}
              setLat={() => {}}
              setLng={() => {}}
            />
          </div>
        </div>

        {/*  اماکن اطراف اقامتگاه */}
        <div>
          <CustomDivider text="اماکن اطراف اقامتگاه" />
          <CustomTable<GetMyResidenceDataNearbyPlace>
            dataSource={getMyResidenceMoreDetailInfoSegmentData?.nearbyPlaces ?? []}
            rowKey="uuid"
            loading={false}
            columns={MyResidenceInfoSegmentPlacesTableModel()}
            pagination={false}
          />
        </div>
      </div>
    </Div>
  );
};
export default MyResidenceInfoSegmentContent;
