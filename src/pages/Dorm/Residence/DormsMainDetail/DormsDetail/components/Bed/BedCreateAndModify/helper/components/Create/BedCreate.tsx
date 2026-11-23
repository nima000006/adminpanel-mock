import { useEffect, useState } from "react";

import { Col, Form, Row } from "antd";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { makeSearchParams } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORM_LIST_DETAIL_PAGE_ROUTE } from "@infra/router/routes/dorm";
import {
  useLazyGetDormBedTypesQuery,
  useLazyGetDormQualityTypesQuery,
} from "@infra/states/redux/Apis/dorm/base/dormBaseApi";
import { useResidenceCreateBedMutation } from "@infra/states/redux/Apis/dorm/residence/dormResidenceApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import {
  DormQualityTypes,
  GetDormQualityTypesResponse,
} from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/components/Building/BuildingCreateAndModify/@types/@buildingCreateAndModify";

import {
  BedCreateFormType,
  DormBedListTypes,
  GetDormBedTypesResponse,
  ResidenceCreateBedResponse,
} from "../../../@types/@bedCreateAndModify";
import { ONE_OR_TWO_BED_ALERT_MSG } from "../../../utils/BedCreateAndModifyUtils";
import DormBedInfo from "../BedInfo/DormBedInfo";

import "../../../_bedCreateAndModify.scss";

const CREATE_BED_SUCCESS_MSG = "تخت جدید با موفقیت ایجاد شد.";

const BedCreate = () => {
  const [qualityList, setQualityList] = useState<DormQualityTypes[]>([]);

  const [bedTypeList, setBedTypeList] = useState<DormBedListTypes[]>([]);

  // bed with ID = 1 means single floor bed, ID = 2 means double floor bed
  // if the list has more than 2 items, the UI should change
  const [bedType, setBedType] = useState<null | number>(null);

  const { params: url } = useQueryParams();
  const navigate = useNavigate();

  const [bedForm] = Form.useForm<BedCreateFormType>();

  //? ================================  Api Calls ================================
  const [getQualityTypes, { isFetching: isQualityDataLoading }] =
    useLazyGetDormQualityTypesQuery();

  const [getBedTypes, { isFetching: isBedDataLoading }] = useLazyGetDormBedTypesQuery();

  const [createBed, { isLoading: isCreateBedLoading }] = useResidenceCreateBedMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getBedTypes({
      maxResults: 2000,
      firstResult: 0,
      recordStatus_EQ: "1",
    })
      .unwrap()
      .then(getBedTypesSuccess);
    getQualityTypes({
      maxResults: 2000,
      firstResult: 0,
      recordStatus_EQ: "1",
    })
      .unwrap()
      .then(getQualityTypesSuccess);
  }, []);

  //* ================================ Util Functions ================================
  // نوع تخت
  const getBedTypesSuccess = (value: GetDormBedTypesResponse) => {
    if (value?.status === 200) {
      setBedTypeList(value?.data);
    }
  };
  const bedTypeHandler = (value: any) => setBedType(+value);

  // درجه کیفی
  const getQualityTypesSuccess = (value: GetDormQualityTypesResponse) => {
    if (value?.status === 200) {
      setQualityList(value?.data);
    }
  };

  const createBedHandler = (value: BedCreateFormType) => {
    if (bedType && url?.id && url?.buildingId && url?.floorId && url?.roomId) {
      if (+bedType === 1) {
        createBed({
          form: "CreateBed",
          data: {
            title: value?.bottBedTitle,
            bedTypeId: value?.bedType?.code?.toString(),
            description: value?.bottDescription,
            buildingid: url?.buildingId,
            bedNumber: value?.bottBedNumber,
            flatFloor: "1",
            qualityId: value?.quality?.code?.toString(),
            roomId: url?.roomId,
            dormitoryid: url?.id,
            AssetTag: value?.bottPropertyNumber,
            floorId: url?.floorId,
          },
        })
          .unwrap()
          .then(createBedSuccess);
      }
      if (+bedType === 2) {
        createBed({
          form: "CreateBed",
          data: {
            title: value?.bottBedTitle,
            bedTypeId: value?.bedType?.code?.toString(),
            description: value?.bottDescription,
            buildingid: url?.buildingId,
            bedNumber: value?.bottBedNumber,
            flatFloor: "1",
            qualityId: value?.quality?.code?.toString(),
            roomId: url?.roomId,
            dormitoryid: url?.id,
            AssetTag: value?.bottPropertyNumber,
            floorId: url?.floorId,
          },
        })
          .unwrap()
          .then((resValue: ResidenceCreateBedResponse) => {
            if (resValue?.status === 204) {
              createBed({
                form: "CreateBed",
                data: {
                  title: value?.topBedTitle,
                  bedTypeId: value?.bedType?.code?.toString(),
                  description: value?.topDescription,
                  buildingid: url?.buildingId,
                  bedNumber: value?.topBedNumber,
                  flatFloor: "2",
                  qualityId: value?.quality?.code?.toString(),
                  roomId: url?.roomId,
                  dormitoryid: url?.id,
                  AssetTag: value?.topPropertyNumber,
                  floorId: url?.floorId,
                },
              })
                .unwrap()
                .then(createBedSuccess);
            }
          });
      }
    }
  };

  const navigateHandler = () => {
    navigate({
      pathname: DORM_LIST_DETAIL_PAGE_ROUTE,
      search: makeSearchParams({ ...url }),
    });
  };

  const createBedSuccess = async (value: ResidenceCreateBedResponse) => {
    if (value?.status === 204) {
      toast.success(CREATE_BED_SUCCESS_MSG, {
        toastId: CREATE_BED_SUCCESS_MSG,
      });
      navigateHandler();
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <Form
      form={bedForm}
      className="bed-create-and-modify-page-container"
      onFinish={createBedHandler}
      scrollToFirstError={{ block: "end", behavior: "smooth" }}
    >
      <CustomAlert message={ONE_OR_TWO_BED_ALERT_MSG} type="info" showIcon closable />
      <div className="bed-info-container">
        <CustomDivider text="تخت" />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol label="اقامتگاه" value={url?.title} />
          <SingleVerticalWithCol label="ساختمان" value={url?.buildingTitle} />
          <SingleVerticalWithCol label="طبقه" value={url?.floorTitle} />
          <SingleVerticalWithCol label="اتاق" value={url?.roomTitle} />
          <Col lg={6} md={8} xs={12} sm={24}>
            <CustomSelect
              name="bedType"
              label="نوع تخت"
              placeholder="انتخاب کنید"
              form={bedForm}
              options={bedTypeList}
              loading={isBedDataLoading}
              onChange={bedTypeHandler}
              rules={[REQUIRED_RULE]}
            />
          </Col>

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

        {(bedType === 1 || bedType === 2) && (
          <DormBedInfo
            title={bedType === 1 ? "اطلاعات تخت" : "اطلاعات تخت پایین"}
            bedId={1}
          />
        )}

        {bedType === 2 && <DormBedInfo title="اطلاعات تخت بالا" bedId={2} />}
      </div>
      <div className="action-btns-container">
        <CustomButton onClick={navigateHandler}>انصراف</CustomButton>
        <CustomButton type="primary" htmlType="submit" loading={isCreateBedLoading}>
          ثبت
        </CustomButton>
      </div>
    </Form>
  );
};

export default BedCreate;
