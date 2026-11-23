import { useEffect, useState } from "react";

import { Col, Form, Row, UploadFile } from "antd";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { makeSearchParams, selectDefaultValueGenerator } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  DORM_LIST_DETAIL_PAGE_ROUTE,
  DORM_LIST_PAGE_ROUTE,
} from "@infra/router/routes/dorm";
import {
  useLazyGetDormQualityTypesQuery,
  useLazyGetDormRoomTypesQuery,
} from "@infra/states/redux/Apis/dorm/base/dormBaseApi";
import {
  useGetResidenceRoomInfoMutation,
  useLazyGetDormResidenceRoomListQuery,
  useResidenceCreateRoomMutation,
  useResidenceUpdateRoomMutation,
} from "@infra/states/redux/Apis/dorm/residence/dormResidenceApi";
import { NUMBER_RULE, REQUIRED_RULE } from "@infra/validation/validationSchema";

import {
  DormRoomListTypes,
  GetDormRoomTypesResponse,
  ResidenceCreateRoomResponse,
  ResidenceUpdateRoomResponse,
  RoomCreateFormType,
} from "./@types/@roomCreateAndModify";
import RoomUploadFile from "./helper/components/RoomUploadFile/RoomUploadFile";
import {
  GetDormResidenceRoomListResponse,
  GetDormResidenceRoomListTypes,
} from "../../../_shared/component/ResidenceCardsData/sections/ResidenceCardsDataRoom/@types/@residenceCardsDataRoom";
import { GetResidenceRoomInfoResponse } from "../../../_shared/component/SingleCards/DormRoomSingleCard/helper/drawers/RoomDetail/@types/@roomDetailDrawerContent";
import { dormRecordsStatus } from "../../../_shared/utils/DormMainDetailUtils";
import {
  DormQualityTypes,
  GetDormQualityTypesResponse,
} from "../../Building/BuildingCreateAndModify/@types/@buildingCreateAndModify";
import { standardBedCount } from "../utils/roomUtils";
import "./_roomCreateAndModify.scss";

const CREATE_ROOM_SUCCESS_MSG = "اتاق جدید با موفقیت ایجاد شد.";
const UPDATE_ROOM_SUCCESS_MSG = "تغییرات با موفقیت اعمال شد.";

const ROOM_TYPE = {
  independent: "1",
  suite: "2",
};

const RoomCreateAndModify = () => {
  const [qualityList, setQualityList] = useState<DormQualityTypes[]>([]);
  const [roomTypeList, setRoomTypeList] = useState<DormRoomListTypes[]>([]);
  const [roomList, setRoomList] = useState<GetDormResidenceRoomListTypes[]>([]);
  const [parentRoomDisabled, setParentRoomDisabled] = useState(false);

  const [firstImageList, setFirstImageList] = useState<UploadFile[]>([]);
  const [secondImageList, setSecondImageList] = useState<UploadFile[]>([]);
  const [thirdImageList, setThirdImageList] = useState<UploadFile[]>([]);
  const [fourthImageList, setFourthImageList] = useState<UploadFile[]>([]);

  const [firstImageName, setFirstImageName] = useState("");
  const [secondImageName, setSecondImageName] = useState("");
  const [thirdImageName, setThirdImageName] = useState("");
  const [fourthImageName, setFourthImageName] = useState("");

  const { params: url } = useQueryParams();
  const navigate = useNavigate();

  const [roomForm] = Form.useForm<RoomCreateFormType>();

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
        title: url?.roomId ? "ویرایش اتاق" : "ایجاد اتاق",
      },
    ],
  });

  //? ================================  Api Calls ================================
  const [
    getQualityTypes,
    { isFetching: isQualityDataLoading, isSuccess: isQualitySuccess },
  ] = useLazyGetDormQualityTypesQuery();

  const [getRoomTypes, { isFetching: isRoomTypesDataLoading, isSuccess: isRoomSuccess }] =
    useLazyGetDormRoomTypesQuery();

  const [getRoomList, { isFetching: isRoomListLoading }] =
    useLazyGetDormResidenceRoomListQuery();

  const [getRoomData, { isLoading: isGetRoomDataLoading }] =
    useGetResidenceRoomInfoMutation();

  const [createRoom, { isLoading: isCreateRoomLoading }] =
    useResidenceCreateRoomMutation();

  const [updateRoom, { isLoading: isUpdateRoomLoading }] =
    useResidenceUpdateRoomMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (url?.roomId) {
      getRoomData({
        body: {
          _data_: {
            id: url?.roomId,
          },
        },
        params: {
          relation: "e137dbff61d049dea81ef1bc30047c1b", // we should set this to get data
        },
      })
        .unwrap()
        .then(getRoomDataSuccess);
    }
  }, [url?.roomId]);

  //* ================================ Util Functions ================================
  // درجه کیفی
  const getQualityHandler = () => {
    if (!isQualitySuccess) {
      getQualityTypes({
        maxResults: 2000,
        firstResult: 0,
        recordStatus_EQ: "1",
      })
        .unwrap()
        .then(getQualityTypesSuccess);
    }
  };
  const getQualityTypesSuccess = async (value: GetDormQualityTypesResponse) => {
    if (value?.status === 200) {
      setQualityList(value?.data);
    }
  };

  // نوع اتاق
  const getRoomTypeHandler = () => {
    if (!isRoomSuccess) {
      getRoomTypes({
        maxResults: 2000,
        firstResult: 0,
        recordStatus_EQ: "1",
      })
        .unwrap()
        .then(getRoomTypesSuccess);
    }
  };
  const getRoomTypesSuccess = async (value: GetDormRoomTypesResponse) => {
    if (value?.status === 200) {
      setRoomTypeList(value?.data);
    }
  };
  const changeRoomTypeHandler = (value: any) => {
    // "1" is independent room
    if (value === ROOM_TYPE.independent) {
      setParentRoomDisabled(true);
      roomForm.setFieldsValue({
        parentRoom: undefined,
      });
    } else {
      setParentRoomDisabled(false);
    }
  };

  // اتاق والد
  const parentRoomHandler = () => {
    if (url?.floorId) {
      getRoomList({ floorId_IN: +url.floorId, firstResult: 0, maxResults: 2000 }) //we should set 0 and 2000 to get data
        .unwrap()
        .then(getRoomListSuccess);
    }
  };
  const getRoomListSuccess = async (value: GetDormResidenceRoomListResponse) => {
    if (value?.status === 200) {
      setRoomList(value?.data);
    }
  };

  // on editing mode
  const getRoomDataSuccess = async (value: GetResidenceRoomInfoResponse) => {
    if (value?.status === 200) {
      if (value?.data?.AssociationFileRoom?.[0]) {
        if (value?.data?.AssociationFileRoom?.[0]?.UploadFiles) {
          setFirstImageList([value?.data?.AssociationFileRoom?.[0]?.UploadFiles]);
          setFirstImageName(
            value?.data?.AssociationFileRoom?.[0]?.UploadFiles?.id?.toString()
          );
        }
      }
      if (value?.data?.AssociationFileRoom?.[1]) {
        if (value?.data?.AssociationFileRoom?.[1]?.UploadFiles) {
          setSecondImageList([value?.data?.AssociationFileRoom?.[1]?.UploadFiles]);
          setSecondImageName(
            value?.data?.AssociationFileRoom?.[1]?.UploadFiles?.id?.toString()
          );
        }
      }
      if (value?.data?.AssociationFileRoom?.[2]) {
        if (value?.data?.AssociationFileRoom?.[2]?.UploadFiles) {
          setThirdImageList([value?.data?.AssociationFileRoom?.[2]?.UploadFiles]);
          setThirdImageName(
            value?.data?.AssociationFileRoom?.[2]?.UploadFiles?.id?.toString()
          );
        }
      }
      if (value?.data?.AssociationFileRoom?.[3]) {
        if (value?.data?.AssociationFileRoom?.[3]?.UploadFiles) {
          setFourthImageList([value?.data?.AssociationFileRoom?.[3]?.UploadFiles]);
          setFourthImageName(
            value?.data?.AssociationFileRoom?.[3]?.UploadFiles?.id?.toString()
          );
        }
      }

      roomForm.setFieldsValue({
        roomTitle: value?.data?.title,
        quality: selectDefaultValueGenerator(value?.data?.AssociationQuality),
        area: value?.data?.area?.toString(),
        numberStandardBedInRoom: selectDefaultValueGenerator({
          title: value?.data?.numberStandardBedInRoom?.toString(),
          id: value?.data?.numberStandardBedInRoom,
        }),
        roomType: selectDefaultValueGenerator(value?.data?.AssociationRoomType),
        parentRoom: selectDefaultValueGenerator(value?.data?.AssociationRoom),
        description: value?.data?.description,
        status: selectDefaultValueGenerator(value?.data?.AssociationRecordStatus),
      });
      if (value?.data?.AssociationRoomType?.id === +ROOM_TYPE.independent) {
        // independent room
        setParentRoomDisabled(true);
      }
    }
  };

  const createRoomHandler = (value: RoomCreateFormType) => {
    if (url?.buildingGenderId) {
      const fileIds = [firstImageName, secondImageName, thirdImageName, fourthImageName];

      const AssociationFileRooms = fileIds
        .filter(Boolean)
        .map((id) => ({ uploadFileId: id }));
      if (!url?.roomId) {
        // CREATE PHASE
        createRoom({
          form: "CreateRoom",
          data: {
            title: value?.roomTitle,
            qualityId: value?.quality?.code?.toString(),
            floorId: url?.floorId,
            roomTypeId: value?.roomType?.code?.toString(),
            area: value?.area,
            genderId: url?.buildingGenderId,
            parentId:
              value?.roomType?.code?.toString() === "1"
                ? null
                : value?.parentRoom?.code?.toString(), // "1" is independence room
            numberStandardBedInRoom:
              value?.roomType?.code?.toString() === ROOM_TYPE.independent
                ? value?.numberStandardBedInRoom?.code?.toString()
                : "10" + value?.numberStandardBedInRoom?.code?.toString(), // با صحبت با تیم بک اند، برای اینکه بتوانند در قیمت دهی اتاق های مستقل و وابسته تمایز قائل شوند عدد 10 به اول تعداد استاندارد تخت اضافه گردید
            description: value?.description,
            AssociationFileRoom: AssociationFileRooms,
          },
        })
          .unwrap()
          .then(createRoomSuccess);
      } else {
        // EDIT PHASE
        updateRoom({
          form: "ViewDetailsOfRoom",
          id: "f97278c53e50446bad348f7f92a47abe",
          data: {
            title: value?.roomTitle,
            roomTypeId: value?.roomType?.code,
            qualityId: value?.quality?.code,
            parentId: +value?.roomType?.code === 1 ? null : value?.parentRoom?.code,
            area: +value?.area,
            description: value?.description,
            numberStandardBedInRoom:
              value?.roomType?.code?.toString() === ROOM_TYPE.independent
                ? value?.numberStandardBedInRoom?.code?.toString()
                : "10" + value?.numberStandardBedInRoom?.code?.toString(),
            recordStatus: value?.status?.code?.toString(),
            AssociationFileRoom: AssociationFileRooms,
            id: +url?.roomId,
          },
        })
          .unwrap()
          .then(updateRoomSuccess);
      }
    }
  };

  const navigateHandler = () => {
    delete url?.roomId;
    navigate({
      pathname: DORM_LIST_DETAIL_PAGE_ROUTE,
      search: makeSearchParams({ ...url }),
    });
  };

  const createRoomSuccess = (value: ResidenceCreateRoomResponse) => {
    if (value?.status === 204) {
      toast.success(CREATE_ROOM_SUCCESS_MSG, {
        toastId: CREATE_ROOM_SUCCESS_MSG,
      });
      navigateHandler();
    }
  };

  const updateRoomSuccess = (value: ResidenceUpdateRoomResponse) => {
    if (value?.status === 200) {
      delete url.roomId;

      toast.success(UPDATE_ROOM_SUCCESS_MSG, {
        toastId: UPDATE_ROOM_SUCCESS_MSG,
      });
      navigateHandler();
    }
  };

  //! onUploadFileChange
  // const onUploadFileChange = (
  //   image: UploadChangeParam<UPLOAD_FILE_GENERAL>,
  //   setImage: React.Dispatch<React.SetStateAction<string>>,
  //   imageListSetter?: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>
  // ) => {
  //   if (!branchCode) {
  //     return toast.error(BRANCH_CODE_ERROR_MSG, { toastId: BRANCH_CODE_ERROR_MSG });
  //   }

  //   const formData = new FormData();
  //   formData.append("dir", fileDirCreator());
  //   formData.append("name", fileNameCreator() + `.${image?.file?.name?.split(".")[1]}`);
  //   formData.append("file", image?.file as any);
  //   const isFileFormatCorrect = isImageFormatValid({ fileFormat: image?.file?.type });
  //   if (!isFileFormatCorrect) {
  //     return toast.error(FILE_TYPE_NOT_SUPPORTED, {
  //       toastId: FILE_TYPE_NOT_SUPPORTED,
  //     });
  //   }

  //   const isUploadable = isImageSizeValid({ fileSize: image?.file?.size });
  //   if (!isUploadable) {
  //     return toast.error(SIZE_EXCEED_ERROR, {
  //       toastId: SIZE_EXCEED_ERROR,
  //     });
  //   }

  //   uploadFile(formData)
  //     .unwrap()
  //     .then((response) => {
  //       createUploadFile({
  //         table: "UploadFile",
  //         data: {
  //           ...response,
  //           baseUrl: import.meta.env.VITE_API_BPMS_UPLOAD_URL,
  //           tenant_id: branchCode?.toString(),
  //         },
  //       })
  //         .unwrap()
  //         .then((res) => {
  //           onUploadFileSuccess({ response: res, setImage });
  //         });
  //     })
  //     // .then((response) => onUploadFileSuccess({ response, setImage }))
  //     .catch(() => {
  //       console.error("error");
  //       imageListSetter?.([]);
  //       setImage("");
  //     });
  // };
  //! ON UPLOAD SUCCESS
  // const onUploadFileSuccess = ({
  //   setImage,
  //   response,
  // }: {
  //   setImage: React.Dispatch<React.SetStateAction<string>>;
  //   response: DormCreateUploadFileResponse;
  // }) => {
  //   setImage(response?.id?.toString());
  // };

  return (
    <Div loading={url?.roomId ? isGetRoomDataLoading : false}>
      <Form
        form={roomForm}
        className="room-create-and-modify-page-container"
        onFinish={createRoomHandler}
        scrollToFirstError={{ block: "end", behavior: "smooth" }}
      >
        <CustomDivider
          text="اتاق"
          extraContent={
            url?.roomId && (
              <CustomSelect
                name="status"
                placeholder="انتخاب کنید"
                form={roomForm}
                options={dormRecordsStatus}
              />
            )
          }
          extraContentClassName="status-container"
        />
        <RoomUploadFile
          firstImageList={firstImageList}
          secondImageList={secondImageList}
          thirdImageList={thirdImageList}
          fourthImageList={fourthImageList}
          setFirstImageList={setFirstImageList}
          setSecondImageList={setSecondImageList}
          setThirdImageList={setThirdImageList}
          setFourthImageList={setFourthImageList}
          setFirstImageName={setFirstImageName}
          setSecondImageName={setSecondImageName}
          setThirdImageName={setThirdImageName}
          setFourthImageName={setFourthImageName}
        />

        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol label="اقامتگاه" value={url?.title} />
          <SingleVerticalWithCol label="ساختمان" value={url?.buildingTitle} />
          <SingleVerticalWithCol label="طبقه" value={url?.floorTitle} />
          <SingleVerticalWithCol label="جنسیت" value={url?.buildingGenderTitle} />
          <Col lg={6} md={8} xs={12} sm={24}>
            <CustomInput
              label="عنوان اتاق"
              name="roomTitle"
              placeholder="عنوان اتاق"
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col lg={6} md={8} xs={12} sm={24}>
            <CustomSelect
              name="quality"
              label="درجه کیفی"
              placeholder="انتخاب کنید"
              form={roomForm}
              options={qualityList}
              loading={isQualityDataLoading}
              onClick={getQualityHandler}
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col lg={6} md={8} xs={12} sm={24}>
            <CustomInput
              label="مساحت (متر مربع)"
              name="area"
              placeholder="مساحت"
              rules={[REQUIRED_RULE, NUMBER_RULE]}
            />
          </Col>
          <Col lg={6} md={8} xs={12} sm={24}>
            <CustomSelect
              name="numberStandardBedInRoom"
              label="تعداد استاندارد تخت در اتاق"
              placeholder="انتخاب کنید"
              form={roomForm}
              options={standardBedCount}
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col lg={6} md={8} xs={12} sm={24}>
            <CustomSelect
              name="roomType"
              label="نوع اتاق"
              placeholder="انتخاب کنید"
              form={roomForm}
              options={roomTypeList}
              loading={isRoomTypesDataLoading}
              onClick={getRoomTypeHandler}
              onChange={changeRoomTypeHandler}
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col lg={6} md={8} xs={12} sm={24}>
            <CustomSelect
              name="parentRoom"
              label="اتاق والد"
              placeholder="انتخاب کنید"
              form={roomForm}
              options={roomList}
              loading={isRoomListLoading}
              onClick={parentRoomHandler}
              disabled={parentRoomDisabled}
              rules={!parentRoomDisabled ? [REQUIRED_RULE] : []}
            />
          </Col>
          <Col span={24}>
            <CustomTextArea
              label="توضیحات اتاق"
              name="description"
              placeholder="توضیحات اتاق"
              maxLength={100}
              showCount
            />
          </Col>
        </Row>
        <div className="action-btns-container">
          <CustomButton onClick={navigateHandler}>انصراف</CustomButton>
          <CustomButton
            type="primary"
            htmlType="submit"
            loading={isCreateRoomLoading || isUpdateRoomLoading}
          >
            ثبت
          </CustomButton>
        </div>
      </Form>
    </Div>
  );
};

export default RoomCreateAndModify;
