import { useEffect, useState } from "react";

import { Col, Form, Row } from "antd";
import { Key } from "antd/es/table/interface";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { makeSearchParams, selectDefaultValueGenerator } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  DORM_LIST_DETAIL_PAGE_ROUTE,
  DORM_LIST_PAGE_ROUTE,
} from "@infra/router/routes/dorm";
import {
  useLazyGetDormQualityTypesQuery,
  useLazyGetDormResidenceFacilityListQuery,
} from "@infra/states/redux/Apis/dorm/base/dormBaseApi";
import {
  useGetResidenceFloorInfoMutation,
  useResidenceCreateFloorMutation,
  useResidenceUpdateFloorMutation,
} from "@infra/states/redux/Apis/dorm/residence/dormResidenceApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import {
  createFloorFormType,
  ResidenceCreateFloorResponse,
  ResidenceUpdateFloorResponse,
} from "./@types/@floorCreateAndModify";
import { FloorCreateFacilityListTableModel } from "./helper/models/FloorCreateFacilityList/FloorCreateFacilityListTableModel";
import { GetResidenceFloorInfoResponse } from "../../../_shared/component/SingleCards/DormFloorSingleCard/helper/drawers/FloorDetail/@types/@floorDetailDrawerContent";
import { dormRecordsStatus } from "../../../_shared/utils/DormMainDetailUtils";
import {
  DormQualityTypes,
  GetDormQualityTypesResponse,
} from "../../Building/BuildingCreateAndModify/@types/@buildingCreateAndModify";
import {
  DormResidenceFacilityListTypes,
  GetDormResidenceFacilityListResponse,
} from "../../Building/BuildingCreateAndModify/helper/components/DormResidenceFacilities/@types/@dormResidenceFacilities";
import "./_floorCreateAndModify.scss";

const CREATE_FLOOR_MSG = "طبقه جدید با موفقیت ایجاد شد.";
const UPDATE_FLOOR_MSG = "تغییرات با موفقیت اعمال شد.";

const FLOOR_FACILITIES = 2;

const FloorCreateAndModify = () => {
  const [facilityList, setFacilityList] = useState<DormResidenceFacilityListTypes[]>([]);
  const [qualityList, setQualityList] = useState<DormQualityTypes[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[] | []>([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const { params: url } = useQueryParams();
  const navigate = useNavigate();

  const [floorForm] = Form.useForm<createFloorFormType>();

  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={DORM_LIST_PAGE_ROUTE}>اقامتگاه ها</Link>,
      },
      ...(url?.title
        ? [
            {
              title: url?.title,
            },
          ]
        : []),
      {
        title: url?.floorId ? "ویرایش طبقه" : "ایجاد طبقه",
      },
    ],
  });

  //? ================================  Api Calls ================================
  const [getFacilityList, { isFetching: isFacilityListLoading }] =
    useLazyGetDormResidenceFacilityListQuery();

  const [getQualityTypes, { isFetching: isQualityDataLoading }] =
    useLazyGetDormQualityTypesQuery();

  const [getFloorInfo, { isLoading: isFloorDataLoading }] =
    useGetResidenceFloorInfoMutation();

  const [createFloor, { isLoading: isCreateFloorLoading }] =
    useResidenceCreateFloorMutation();

  const [updateFloor, { isLoading: isUpdateFloorLoading }] =
    useResidenceUpdateFloorMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getFacilityList({ maxResults: 2000, firstResult: 0, IsOptional_EQ: FLOOR_FACILITIES })
      .unwrap()
      .then(getFacilityListSuccess);
    getQualityTypes({
      maxResults: 2000,
      firstResult: 0,
      recordStatus_EQ: "1",
    })
      .unwrap()
      .then(getQualityTypesSuccess);
    if (url?.floorId) {
      getFloorInfo({
        body: {
          _data_: {
            id: url?.floorId,
          },
        },
        params: { relation: "4bb8112a0b2a4d489c9d57eece638768" }, //we should set this to get data
      })
        .unwrap()
        .then(getFloorInfoSuccess);
    }
  }, [url?.floorId]);

  //* ================================ Util Functions ================================
  const getFacilityListSuccess = (value: GetDormResidenceFacilityListResponse) => {
    if (value?.status === 200) {
      setFacilityList(value?.data);
    }
  };

  const getQualityTypesSuccess = (value: GetDormQualityTypesResponse) => {
    if (value?.status === 200) {
      setQualityList(value?.data);
    }
  };

  const openUpdateModalHandler = () => {
    setIsUpdateModalOpen(true);
  };
  const closeUpdateModalHandler = () => {
    setIsUpdateModalOpen(false);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: Key[]) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  // on editing mode
  const getFloorInfoSuccess = (value: GetResidenceFloorInfoResponse) => {
    if (value?.status === 200) {
      floorForm.setFieldsValue({
        floorName: value?.data?.title,
        quality: selectDefaultValueGenerator(value?.data?.AssociationQuality),
        description: value?.data?.description,
        status: selectDefaultValueGenerator(value?.data?.AssociationActiveStatus),
      });
      setSelectedRowKeys(value?.data?.AssociationFacilityFloor?.map((item) => item?.id));
    }
  };

  const createFloorHandler = (value: createFloorFormType) => {
    if (url?.buildingId) {
      if (!url?.floorId) {
        //CREATE PHASE
        createFloor({
          form: "CreateFloor",
          data: {
            title: value?.floorName,
            description: value?.description,
            AssociationFacility: selectedRowKeys?.map((item) => ({
              facilityId: item?.toString(),
            })),
            qualityId: value?.quality?.code?.toString(),
            buildingId: url?.buildingId,
            genderId: url?.buildingGenderId,
          },
        })
          .unwrap()
          .then(createFloorSuccess);
      } else {
        // UPDATE PHASE
        openUpdateModalHandler();
      }
    }
  };

  const updateFloorHandler = () => {
    const value = floorForm.getFieldsValue();

    updateFloor({
      form: "EditDetailsOfFloor1",
      id: "08cb9bad1f04459fb6934e31924b191b",
      data: {
        title: value?.floorName,
        description: value?.description,
        AssociationFacility: selectedRowKeys?.map((item) => ({
          facilityId: item?.toString(),
        })),
        qualityId: value?.quality?.code?.toString(),
        buildingId: url?.buildingId,
        genderId: url?.buildingGenderId,
        recordStatus: value?.status?.code?.toString(),
        id: +url?.floorId,
      },
    })
      .unwrap()
      .then(updateFloorSuccess);
  };

  const navigateHandler = () => {
    delete url?.floorId;
    navigate({
      pathname: DORM_LIST_DETAIL_PAGE_ROUTE,
      search: makeSearchParams({ ...url }),
    });
  };

  const createFloorSuccess = (value: ResidenceCreateFloorResponse) => {
    if (value?.status === 204) {
      toast.success(CREATE_FLOOR_MSG, { toastId: CREATE_FLOOR_MSG });
      navigateHandler();
    }
  };

  const updateFloorSuccess = (value: ResidenceUpdateFloorResponse) => {
    if (value?.status === 200) {
      delete url.floorId;
      toast.success(UPDATE_FLOOR_MSG, { toastId: UPDATE_FLOOR_MSG });
      navigateHandler();
    }
  };

  return (
    <>
      <ConfirmationModalWithContent
        title="ثبت تغییرات"
        isModalOpen={isUpdateModalOpen}
        confirmBtnText="بله ثبت کن"
        backBtnText="انصراف"
        closeModalHandler={closeUpdateModalHandler}
        onConfirmClickHandler={updateFloorHandler}
        isConfirmButtonLoading={isUpdateFloorLoading}
        content={
          <div className="update-floor-confirmation-modal-container">
            <p className="desc">آیا از ثبت تغییرات اطمینان دارید؟</p>
          </div>
        }
        showIcon={false}
      />
      <Div loading={url?.floorId ? isFloorDataLoading : false}>
        <Form
          onFinish={createFloorHandler}
          form={floorForm}
          className="floor-create-and-modify-page-container"
          scrollToFirstError={{ block: "end", behavior: "smooth" }}
        >
          <CustomDivider
            text="طبقه"
            extraContent={
              url?.floorId && (
                <CustomSelect
                  name="status"
                  placeholder="انتخاب کنید"
                  form={floorForm}
                  options={dormRecordsStatus}
                />
              )
            }
            extraContentClassName="status-container"
          />
          <div>
            <CustomDivider text="اطلاعات طبقه" />
            <Row gutter={[16, 16]}>
              <SingleVerticalWithCol label="اقامتگاه" value={url?.title} />
              <SingleVerticalWithCol label="ساختمان" value={url?.buildingTitle} />
              <SingleVerticalWithCol label="جنسیت" value={url?.buildingGenderTitle} />
              <Col lg={6} md={8} xs={12} sm={24}>
                <CustomInput
                  label="نام طبقه"
                  name="floorName"
                  placeholder="نام طبقه"
                  rules={[REQUIRED_RULE]}
                />
              </Col>
              <Col lg={6} md={8} xs={12} sm={24}>
                <CustomSelect
                  label="درجه کیفی"
                  name="quality"
                  placeholder="انتخاب کنید"
                  options={qualityList}
                  loading={isQualityDataLoading}
                  form={floorForm}
                  rules={[REQUIRED_RULE]}
                />
              </Col>
              <Col span={24}>
                <CustomTextArea
                  label="توضیحات طبقه"
                  name="description"
                  placeholder="توضیحات طبقه"
                  maxLength={100}
                  showCount
                />
              </Col>
            </Row>
          </div>
          <div>
            <CustomDivider text="امکانات" />
            <CustomTable
              dataSource={facilityList}
              columns={FloorCreateFacilityListTableModel()}
              rowKey="id"
              loading={isFacilityListLoading}
              pagination={paginationConfig}
              rowSelection={{
                type: "checkbox",
                columnWidth: "15px",
                ...rowSelection,
              }}
              {...TABLE_PROPS(facilityList?.length)}
              className="create-floor-list-table"
            />
          </div>
          <div className="action-btns-container">
            <CustomButton onClick={navigateHandler}>انصراف</CustomButton>
            <CustomButton type="primary" htmlType="submit" loading={isCreateFloorLoading}>
              ثبت
            </CustomButton>
          </div>
        </Form>
      </Div>
    </>
  );
};

export default FloorCreateAndModify;
