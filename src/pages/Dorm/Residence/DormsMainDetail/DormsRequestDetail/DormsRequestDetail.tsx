import { useEffect, useState } from "react";

import { Form } from "antd";
import { Link } from "react-router";

import CustomCard from "@components/CustomCard/CustomCard";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { selectDefaultValueGenerator } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORM_LIST_PAGE_ROUTE } from "@infra/router/routes/dorm";
import { useLazyGetWorkSpaceDormSendingDetailQuery } from "@infra/states/redux/Apis/dorm/requests/dormRequestsApi";
import { useGetResidenceDetailInfoMutation } from "@infra/states/redux/Apis/dorm/residence/dormResidenceApi";
import { PADDING_40 } from "@infra/VARS/globalStyles/globalStyles";
import ResidenceDetails from "@pages/Dorm/Requests/WorkSpaces/WorkSpacesDetail/_shared/components/ResidenceDetails/ResidenceDetails";
import {
  GetWorkSpaceDormListResponse,
  WorkSpaceDormListType,
} from "@pages/Dorm/Requests/WorkSpaces/WorkSpacesList/helper/components/WorkSpacesDormList/helper/@types/@workSpaceDormListType";

import { StatusMode } from "../utils/dormMainDetail";
import RequestAlert from "./helper/components/RequestAlert/RequestAlert";
import RequestDetails from "./helper/components/RequestDetails/RequestDetails";
import RequesterInfo from "./helper/components/RequesterInfo/RequesterInfo";
import { ResidenceFormFields } from "./helper/components/residenceReturnedDetail/@types/@residenceReturnedDetail";
import ResidenceReturnedDetail from "./helper/components/residenceReturnedDetail/ResidenceReturnedDetail";
import {
  GetResidenceDetailInfoResponse,
  ResidenceDetailInfoType,
} from "../DormsDetail/_shared/component/DividerExtraContent/helper/drawers/ResidenceDetailDrawerContent/@types/@residenceDetailDrawerContent";
import "./_dormsRequestDetail.scss";

const DormsRequestDetail = () => {
  const [status, setStatus] = useState<number>(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<WorkSpaceDormListType[]>([]);
  const [residenceData, setResidenceData] = useState<ResidenceDetailInfoType>();
  const [lat, setLat] = useState<number>(35.699739);
  const [lng, setLng] = useState<number>(51.338097);
  const [formResidence] = Form.useForm<ResidenceFormFields>();
  const {
    params: { id, statusId },
  } = useQueryParams();

  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={DORM_LIST_PAGE_ROUTE}>اقامتگاه ها</Link>,
      },
      ...(id
        ? [
            {
              title: `درخواست شماره ${id}`,
            },
          ]
        : []),
    ],
  });

  //? ================================  Api Calls ================================
  const [getDormDetail, { isFetching: isDormDetailLoading }] =
    useLazyGetWorkSpaceDormSendingDetailQuery();

  const [getResidenceData, { isLoading: isResidenceDataLoading }] =
    useGetResidenceDetailInfoMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getDormDetail(id).unwrap().then(getDormDetailIsSuccess);

      // residence detail
      getData();
    }
  }, [id]);

  //* ================================ Util Functions ================================
  const getData = () => {
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
  };

  //success
  const getDormDetailIsSuccess = (values: GetWorkSpaceDormListResponse) => {
    if (values?.status === 200) {
      setDataSource(values?.data);
      setStatus(values?.data[0]?.statusId);
    }
  };

  const getResidenceDataSuccess = async (value: GetResidenceDetailInfoResponse) => {
    if (value?.status === 200) {
      setResidenceData(value?.data);

      const placesDesc = value?.data?.AssociationPlacesAndDormitories?.map((item) => ({
        [`description${item?.AssociationCategoryPlaces?.id}`]: item?.description,
      }));

      formResidence.setFieldsValue({
        residenceName: value?.data?.title,
        residenceType: selectDefaultValueGenerator(
          value?.data?.AssociationAccommodationType
        ),
        quality: selectDefaultValueGenerator(value?.data?.AssociationQuality),
        capacity: value?.data?.nominalCapacity,
        branch: selectDefaultValueGenerator(value?.data?.AssociationBranch),
        gender: selectDefaultValueGenerator(value?.data?.AssociationGender),
        province: selectDefaultValueGenerator(
          value?.data?.AssociationRegion?.AssociationRegionType
        ),
        city: selectDefaultValueGenerator(value?.data?.AssociationRegion),
        postalCode: value?.data?.zipCode,
        phone: value?.data?.phoneNumber,
        address: value?.data?.address,
        description: value?.data?.description,
        area: value?.data?.sizeOfDormitory,
        greenSpaceArea: value?.data?.sizeOfGreenSpace,
        status: selectDefaultValueGenerator(value?.data?.AssociationRecordStatus),
        ...placesDesc.reduce((acc, obj) => ({ ...acc, ...obj }), {}),
      });

      setSelectedRowKeys(
        value?.data?.AssociationPlacesAndDormitories?.map(
          (item) => item?.AssociationCategoryPlaces?.id
        ) || []
      );

      setLat(value?.data?.latitude);
      setLng(value?.data?.longitude);
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="residence-request-detail-container">
      <CustomCard
        padding={PADDING_40}
        loading={isDormDetailLoading}
        className="request-received-dormitory-wrapper"
      >
        <RequestAlert status={status} />
        <RequestDetails data={dataSource} />
        <RequesterInfo data={dataSource} />
      </CustomCard>

      <CustomCard padding={PADDING_40}>
        {+statusId === StatusMode?.returned ? (
          <ResidenceReturnedDetail
            form={formResidence}
            setLat={setLat}
            lat={lat}
            setLng={setLng}
            lng={lng}
            loading={isResidenceDataLoading}
            selectedRowKeys={selectedRowKeys}
            setSelectedRowKeys={setSelectedRowKeys}
            residenceData={residenceData}
            getData={getData}
          />
        ) : (
          <ResidenceDetails
            setLat={setLat}
            lat={lat}
            setLng={setLng}
            lng={lng}
            loading={isResidenceDataLoading}
            data={residenceData}
          />
        )}
      </CustomCard>
    </div>
  );
};
export default DormsRequestDetail;
