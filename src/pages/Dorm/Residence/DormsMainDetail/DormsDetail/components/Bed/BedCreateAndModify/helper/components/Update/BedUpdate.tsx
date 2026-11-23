import { useEffect, useState } from "react";

import { Col, Form, Row } from "antd";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { makeSearchParams, selectDefaultValueGenerator } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORM_LIST_DETAIL_PAGE_ROUTE } from "@infra/router/routes/dorm";
import { useLazyGetDormQualityTypesQuery } from "@infra/states/redux/Apis/dorm/base/dormBaseApi";
import {
  useGetResidenceBedInfoMutation,
  useResidenceUpdateBedMutation,
} from "@infra/states/redux/Apis/dorm/residence/dormResidenceApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { GetResidenceBedInfoResponse } from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/_shared/component/SingleCards/DormBedSingleCard/helper/drawers/BedDetail/@types/@bedDetailDrawerContent";
import { dormRecordsStatus } from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/_shared/utils/DormMainDetailUtils";
import {
  DormQualityTypes,
  GetDormQualityTypesResponse,
} from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/components/Building/BuildingCreateAndModify/@types/@buildingCreateAndModify";

import {
  BedCreateFormType,
  ResidenceUpdateBedResponse,
} from "../../../@types/@bedCreateAndModify";
import DormBedInfo from "../BedInfo/DormBedInfo";

import "../../../_bedCreateAndModify.scss";

const UPDATE_BED_SUCCESS_MSG = "تغییرات با موفقیت اعمال شد.";

const BedUpdate = () => {
  const [qualityList, setQualityList] = useState<DormQualityTypes[]>([]);

  const { params: url } = useQueryParams();
  const navigate = useNavigate();

  const [bedForm] = Form.useForm<BedCreateFormType>();

  //? ================================  Api Calls ================================
  const [getQualityTypes, { isFetching: isQualityDataLoading }] =
    useLazyGetDormQualityTypesQuery();

  const [getBedInfo, { data: bedData, isLoading: isBedInfoDataLoading }] =
    useGetResidenceBedInfoMutation();

  const [updateBed, { isLoading: isUpdateBedLoading }] = useResidenceUpdateBedMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getQualityTypes({
      maxResults: 2000,
      firstResult: 0,
      recordStatus_EQ: "1",
    })
      .unwrap()
      .then(getQualityTypesSuccess);

    if (url?.bedId) {
      getBedInfo({
        body: {
          _data_: {
            id: url?.bedId,
          },
        },
        params: { relation: "742f218d65624e139ab1e57f79b7854b" }, //we should set this to get data
      })
        .unwrap()
        .then(getBedInfoSuccess);
    }
  }, [url?.bedId]);

  //* ================================ Util Functions ================================
  // درجه کیفی
  const getQualityTypesSuccess = (value: GetDormQualityTypesResponse) => {
    if (value?.status === 200) {
      setQualityList(value?.data);
    }
  };

  const updateBedHandler = (value: BedCreateFormType) => {
    if (url?.id && url?.buildingId && url?.floorId && url?.roomId) {
      updateBed({
        form: "ViewBedDetails",
        id: "19f5755d39ad44be97b46e7b339aaa97",
        data: {
          title: value?.bottBedTitle,
          bedTypeId: bedData?.data?.AssociationCategoryBedType?.id
            ? bedData?.data?.AssociationCategoryBedType?.id
            : 0,
          recordStatus: value?.status?.code?.toString(),
          bedNumber: +value?.bottBedNumber,
          qualityId: value?.quality?.code,
          AssetTag: value?.bottPropertyNumber,
          description: value?.bottDescription,
          id: +url?.bedId,
        },
      })
        .unwrap()
        .then(updateBedSuccess);
    }
  };

  const navigateHandler = () => {
    delete url?.bedId;
    navigate({
      pathname: DORM_LIST_DETAIL_PAGE_ROUTE,
      search: makeSearchParams({ ...url }),
    });
  };

  const updateBedSuccess = async (value: ResidenceUpdateBedResponse) => {
    if (value?.status === 200) {
      delete url.bedId;

      toast.success(UPDATE_BED_SUCCESS_MSG, {
        toastId: UPDATE_BED_SUCCESS_MSG,
      });

      navigateHandler();
    }
  };

  const getBedInfoSuccess = (value: GetResidenceBedInfoResponse) => {
    if (value?.status === 200) {
      bedForm.setFieldsValue({
        bedType: selectDefaultValueGenerator(value?.data?.AssociationCategoryBedType),
        quality: selectDefaultValueGenerator(value?.data?.AssociationCategoryQuality),
        status: selectDefaultValueGenerator(value?.data?.AssociationCategoryRecordStatus),
        bottBedTitle: value?.data?.title,
        bottBedNumber: value?.data?.bedNumber?.toString(),
        bottPropertyNumber: value?.data?.AssetTag,
        bottDescription: value?.data?.description,
      });
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <Div loading={isBedInfoDataLoading}>
      <Form
        form={bedForm}
        className="bed-create-and-modify-page-container"
        onFinish={updateBedHandler}
        scrollToFirstError={{ block: "end", behavior: "smooth" }}
      >
        <div className="bed-info-container">
          <CustomDivider
            text="تخت"
            extraContent={
              <CustomSelect
                name="status"
                placeholder="انتخاب کنید"
                form={bedForm}
                options={dormRecordsStatus}
              />
            }
            extraContentClassName="status-container"
          />
          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol label="اقامتگاه" value={url?.title} />
            <SingleVerticalWithCol label="ساختمان" value={url?.buildingTitle} />
            <SingleVerticalWithCol label="طبقه" value={url?.floorTitle} />
            <SingleVerticalWithCol label="اتاق" value={url?.roomTitle} />
            <SingleVerticalWithCol
              label="نوع تخت"
              value={bedData?.data?.AssociationCategoryBedType?.title}
            />
            <Col lg={6} md={8} xs={12} sm={24}>
              <CustomSelect
                name="quality"
                label="درجه کیفی"
                placeholder="انتخاب کنید"
                form={bedForm}
                options={qualityList}
                loading={isQualityDataLoading}
                rules={[REQUIRED_RULE]}
              />
            </Col>
          </Row>

          <DormBedInfo
            title={
              bedData?.data?.AssociationCategoryBedType?.id === 1
                ? "اطلاعات تخت"
                : bedData?.data?.flatFloor === 1
                  ? "اطلاعات تخت پایین"
                  : "اطلاعات تخت بالا"
            }
            bedId={1}
          />
        </div>
        <div className="action-btns-container">
          <CustomButton onClick={navigateHandler}>انصراف</CustomButton>
          <CustomButton type="primary" htmlType="submit" loading={isUpdateBedLoading}>
            ثبت
          </CustomButton>
        </div>
      </Form>
    </Div>
  );
};

export default BedUpdate;
