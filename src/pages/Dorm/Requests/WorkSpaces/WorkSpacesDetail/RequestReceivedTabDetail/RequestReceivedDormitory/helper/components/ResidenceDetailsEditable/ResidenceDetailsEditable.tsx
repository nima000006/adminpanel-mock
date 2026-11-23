import { useEffect, useState } from "react";

import { Col, Form, Row } from "antd";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomMap from "@components/CustomInputs/CustomMap/CustomMap";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import Div from "@components/Renderers/Div/Div";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { selectDefaultValueGenerator } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetPlacesAroundDormitoryQuery,
  useResidenceUpdateResidenceMutation,
} from "@infra/states/redux/Apis/dorm/residence/dormResidenceApi";
import { SUCCESS_EDIT_MESSAGE } from "@infra/VARS/globalToasts/globalToasts";
import {
  PlacesAroundDormitoryType,
  ResidenceUpdateResidenceResponse,
} from "@pages/Dorm/Residence/DormCreateAndModify/@types/@dormCreateAndModify";

import { ResidenceDetailsEditableProps } from "./helper/@types/@residenceDetailsEditable";
import ResidenceDetailsEditableInfo from "./helper/components/ResidenceDetailsEditableInfo/ResidenceDetailsEditableInfo";
import ResidenceDetailsEditableTableModel from "./helper/models/ResidenceDetailsEditableTableModel/ResidenceDetailsEditableTableModel";

import "./_residenceDetailsEditable.scss";

const ResidenceDetailsEditable = ({
  lat,
  lng,
  setLng,
  setLat,
  form,
  loading,
  selectedRowKeys,
  setSelectedRowKeys,
  residenceData,
  setEditMode,
  getData,
}: ResidenceDetailsEditableProps) => {
  const [placeData, setPlaceData] = useState<PlacesAroundDormitoryType[]>([]);
  const {
    params: { id },
  } = useQueryParams();
  //? ================================  Api Calls ================================
  const [updateResidence, { isLoading: isUpdateResidenceLoading }] =
    useResidenceUpdateResidenceMutation();
  const [getPlacesAroundDormitory, { isFetching: isPlacesAroundDormitoryLoading }] =
    useLazyGetPlacesAroundDormitoryQuery();
  //? ================================ Effects ================================
  useEffect(() => {
    // residence detail
    if (id) {
      getData();
      form.setFieldsValue({
        residenceName: residenceData?.title,
        residenceType: selectDefaultValueGenerator({
          id: residenceData?.AssociationAccommodationType?.id,
          title: residenceData?.AssociationAccommodationType?.title,
        }),
        quality: selectDefaultValueGenerator({
          id: residenceData?.AssociationQuality?.id,
          title: residenceData?.AssociationQuality?.title,
        }),
        capacity: residenceData?.nominalCapacity,
        branch: selectDefaultValueGenerator({
          id: residenceData?.AssociationBranch?.id,
          title: residenceData?.AssociationBranch?.title,
        }),
        gender: selectDefaultValueGenerator({
          id: residenceData?.AssociationGender?.id,
          title: residenceData?.AssociationGender?.title,
        }),
        area: residenceData?.sizeOfDormitory,
        greenSpaceArea: residenceData?.sizeOfGreenSpace,
        province: selectDefaultValueGenerator({
          id: residenceData?.AssociationRegion?.AssociationRegionType?.id,
          title: residenceData?.AssociationRegion?.AssociationRegionType?.title,
        }),
        city: selectDefaultValueGenerator({
          id: residenceData?.AssociationRegion?.id,
          title: residenceData?.AssociationRegion?.title,
        }),
        postalCode: residenceData?.zipCode,
        phone: residenceData?.phoneNumber,
        address: residenceData?.address,
        description: residenceData?.description,
      });
    }
  }, [id]);

  //* ================================ Util Functions ================================
  const exitEditableModeHandler = () => {
    setEditMode(false);
  };

  // update
  const updateResidenceHandler = () => {
    const places = selectedRowKeys?.map((item) => ({
      description: form.getFieldsValue(true)?.[`description${item}`],
      placesId: item,
    }));

    form.submit();
    form.validateFields().then((value) => {
      if (residenceData?.id) {
        updateResidence({
          form: "ViewDetailsOfHostel",
          id: "96b76ab15cf64391b7bb70d5141773af",
          data: {
            title: value?.residenceName,
            branchId: value?.branch?.code,
            phoneNumber: value?.phone,
            description: value?.description,
            accommodationTypeId: value?.residenceType?.code,
            genderId: value?.gender?.code,
            sizeOfDormitory: value?.area,
            sizeOfGreenSpace: value?.greenSpaceArea,
            address: value?.address,
            qualityId: value?.quality?.code,
            regionId: value?.city?.code,
            latitude: lat,
            longitude: lng,
            nominalCapacity: value?.capacity,
            zipCode: value?.postalCode,
            AssociationPlacesAndDormitories: places,
            recordStatus: value?.status?.code,
            id: residenceData?.id,
          },
        })
          .unwrap()
          .then(updateResidenceSuccess);
      }
    });
  };

  const updateResidenceSuccess = async (value: ResidenceUpdateResidenceResponse) => {
    if (value?.status === 200) {
      setEditMode(false);
      toast.success(SUCCESS_EDIT_MESSAGE, { toastId: SUCCESS_EDIT_MESSAGE });
      getData();
      form.resetFields();
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={loading} className="residence-details-editable-container">
      <CustomDivider text="اقامتگاه" />
      <Form form={form}>
        <ResidenceDetailsEditableInfo
          getPlacesAroundDormitory={getPlacesAroundDormitory}
          setPlaceData={setPlaceData}
          form={form}
        />
        <CustomMap lat={lat} lng={lng} setLat={setLat} setLng={setLng} />

        <div>
          <CustomDivider text="اماکن اطراف خوابگاه" />
          <CustomTable
            dataSource={placeData}
            columns={ResidenceDetailsEditableTableModel()}
            loading={isPlacesAroundDormitoryLoading}
            rowSelection={{
              selectedRowKeys,
              onChange: (selectedKeys) => setSelectedRowKeys(selectedKeys),
            }}
            rowKey="id"
            pagination={paginationConfig}
            {...TABLE_PROPS(placeData?.length)}
          />
        </div>
        <Row>
          <Col span={24}>
            <CustomTextArea
              label="توضیحات اقامتگاه"
              name="description"
              placeholder="توضیحات"
              maxLength={100}
              showCount
            />
          </Col>
        </Row>
      </Form>
      <div className="btn-container">
        <CustomButton
          type="primary"
          onClick={updateResidenceHandler}
          loading={isUpdateResidenceLoading}
        >
          ثبت تغییرات
        </CustomButton>
        <CustomButton type="primary" ghost onClick={exitEditableModeHandler}>
          خروج از حالت ویرایش
        </CustomButton>
      </div>
    </Div>
  );
};
export default ResidenceDetailsEditable;
