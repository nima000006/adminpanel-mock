import { Col, Row } from "antd";

import CustomMap from "@components/CustomInputs/CustomMap/CustomMap";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import { ResidenceDetailsProps } from "./@types/residenceDetailTypes";
import PlacesAroundDormitoryTableModel from "../../models/PlacesAroundDormitoryTableModel/PlacesAroundDormitoryTableModel";
import "./_residenceDetail.scss";

const ResidenceDetails = ({
  lat,
  lng,
  setLng,
  setLat,
  loading,
  data,
}: ResidenceDetailsProps) => {
  return (
    <div className="work-spaces-residence-details-container">
      <CustomDivider text="جزئیات اقامتگاه" />
      <Div loading={loading}>
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol md={12} label="نام اقامتگاه" value={data?.title} />
          <SingleVerticalWithCol
            md={12}
            label="نوع اقامتگاه"
            value={data?.AssociationAccommodationType?.title}
          />
          <SingleVerticalWithCol
            md={12}
            label="شناسه اقامتگاه"
            value={data?.id?.toString()}
          />
          <SingleVerticalWithCol
            md={12}
            label="درجه کیفی"
            value={data?.AssociationQuality?.title}
          />
          <SingleVerticalWithCol
            md={12}
            label="ظرفیت اسمی (نفر)"
            value={data?.nominalCapacity?.toString()}
          />
          <SingleVerticalWithCol
            md={12}
            label="واحد"
            value={data?.AssociationBranch?.title}
          />
          <SingleVerticalWithCol
            md={12}
            label="جنسیت"
            value={data?.AssociationGender?.title}
          />
          <Col md={6} />
          <SingleVerticalWithCol
            md={12}
            label="استان"
            value={data?.AssociationRegion?.AssociationRegionType?.title}
          />
          <SingleVerticalWithCol
            md={12}
            label="شهر"
            value={data?.AssociationRegion?.title}
          />
          <SingleVerticalWithCol md={12} label="کد پستی" value={data?.zipCode} />
          <SingleVerticalWithCol md={12} label="شماره تلفن" value={data?.phoneNumber} />
          <SingleVerticalWithCol span={24} label="آدرس" value={data?.address} />
        </Row>
        <CustomMap
          lat={lat}
          lng={lng}
          setLat={setLat}
          setLng={setLng}
          isReadOnly={true}
        />
      </Div>
      <div>
        <CustomDivider text="اماکن اطراف خوابگاه" />
        <CustomTable
          dataSource={data?.AssociationPlacesAndDormitories}
          columns={PlacesAroundDormitoryTableModel()}
          loading={loading}
          pagination={paginationConfig}
          {...TABLE_PROPS(data?.AssociationPlacesAndDormitories?.length || 0)}
        />
      </div>
      <SingleVerticalWithCol
        span={24}
        label="توضیحات اقامتگاه"
        value={data?.description}
      />
    </div>
  );
};
export default ResidenceDetails;
