import { useEffect, useRef, useState } from "react";

import { Button, Col, Form, Row, UploadFile } from "antd";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";

import {
  AlreadyUploadedFileProps,
  AssociationRegulationsAttachedFile,
  GetRegulationAttachmentsResponse,
  UploadFileResponse,
  UploadFileType,
} from "./@types/@newRulesAndLaws";
import CustomCard from "../../../../../components/CustomCard/CustomCard";
import CustomInput from "../../../../../components/CustomInputs/CustomInput/CustomInput";
import CustomUploader from "../../../../../components/CustomInputs/CustomUploader/CustomUploader";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import {
  fileDirCreator,
  fileNameCreator,
} from "../../../../../infrastructure/helpers/utils";
import { BasicInfoNewRulesAndLawsSubmitType } from "../../../../../infrastructure/models/modules/committee/basicInfo/rulesAndLaws/rulesAndLaws";
import {
  COMMITTEE_REGULATIONS_PAGE_ROUTE,
  COMMITTEE_RULES_AND_LAWS_PAGE_ROUTE,
} from "../../../../../infrastructure/router/routes/committee";
import {
  useCreateRulesAndRegulationsMutation,
  useLazyGetRulesAndRegulationDetailQuery,
} from "../../../../../infrastructure/states/redux/Apis/committee/basicInfo/basicInfoApi";
import {
  useCommitteeUploadFilesMutation,
  useLazyGetRegulationAttachmentsQuery,
} from "../../../../../infrastructure/states/redux/Apis/committee/generalApis/generalApis";
import { CUSTOM_REQUIRED_RULE } from "../../../../../infrastructure/validation/validationSchema";
import { GENERAL_SUBMIT_SUCCESS } from "../../../../../infrastructure/VARS/globalToasts/globalToasts";
import "./_newRulesAndLaws.scss";

const NewRulesAndLaws = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();
  const { id } = Object.fromEntries([...searchParams]);
  const [alreadyUploaded, setAlreadyUploaded] = useState<AlreadyUploadedFileProps>({
    count: 0,
    data: [],
  });
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [fileResponseList] = useState<UploadFileType[]>([]); //setFileResponseList

  useTitle({ text: id ? "ویرایش آیین نامه و مقررات" : "آیین نامه و مقررات جدید" });

  const fileResRef = useRef<UploadFile[]>([]);
  // const UPLOAD_SUCCESS = "فایل با موفقیت آپلود شد";
  // const UPLOAD_FAIL = "آپلود فایل با خطا مواجه شد";

  //? ================================  Api Calls ================================
  const [createRulesAndRegulation, { data: createData, isLoading: isCreateLoading }] =
    useCreateRulesAndRegulationsMutation();

  const [
    getRulesAndRegulationDetail,
    { data: rulesAndRegulationDetailData, isFetching: isRulesAndRegulationDetailLoading },
  ] = useLazyGetRulesAndRegulationDetailQuery();

  const [getAttachments, { isFetching: isGetAttachmentsDataLoading }] =
    useLazyGetRegulationAttachmentsQuery();

  const [uploadFile, { isLoading: isUploadFileLoading }] =
    useCommitteeUploadFilesMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getRulesAndRegulationDetail(id);
      getAttachments(id).unwrap().then(onGetAttachmentsSuccess);
    }
  }, [id]);

  useEffect(() => {
    if (rulesAndRegulationDetailData?.status === 200) {
      form.setFieldsValue({
        title: rulesAndRegulationDetailData?.data[0]?.title,
        number: rulesAndRegulationDetailData?.data[0]?.number,
      });
    }
  }, [rulesAndRegulationDetailData?.status]);

  useEffect(() => {
    if (createData?.status === 200) {
      toast.success(GENERAL_SUBMIT_SUCCESS, { toastId: GENERAL_SUBMIT_SUCCESS });
      navigate(`${COMMITTEE_REGULATIONS_PAGE_ROUTE}?id=${createData?.data?.id}`);
    }
  }, [createData?.status]);

  //* ================================ Util Functions ================================
  const onGetAttachmentsSuccess = (value: GetRegulationAttachmentsResponse) => {
    if (value?.status === 200) {
      setAlreadyUploaded({ count: value?.data?.length, data: value?.data });
      setFileList(
        value?.data?.map((item) => ({
          uid: item?.uid,
          name: item?.originalName,
          status: "done",
          url: `${import.meta.env.VITE_URL_COMMITTEE}/download/${item?.url}`,
          extension: item?.extension,
          relativeUrl: item?.relativeUrl,
          size: item?.size,
        }))
      );
    }
  };

  // registerFormHandler
  const registerFormHandler = () => {
    if (alreadyUploaded?.count) {
      fileResRef.current = [
        ...fileResRef.current,
        ...alreadyUploaded.data.map((item) => {
          const newObject = {
            relativeUrl: item?.relativeUrl,
            name: item?.name,
            uid: item?.uid,
            originalName: item?.originalName,
            extension: item?.extension,
            size: item?.size,
            fileType: item?.fileType,
          };

          return {
            ...newObject,
            relativeUrl: item?.relativeUrl.includes(".")
              ? item.relativeUrl
              : `${item.relativeUrl}.${item.extension}`,
            name: item?.uid.includes(".") ? item?.uid : `${item?.uid}.${item.extension}`,
            uid: item?.uid,
            // serverUrl: "/engine-rest",
            // url: "/engine-rest/api/engine/engine/default/download/02532c7772739f3b6aa2af00b4ad83b5/2024-03/5/67034de6f4a8b667d84003086b80934b.jpeg",
            // deleteUrl:
            //   "/engine-rest/api/engine/engine/default/upload?path=02532c7772739f3b6aa2af00b4ad83b5/2024-03/5/67034de6f4a8b667d84003086b80934b.jpeg",
          };
        }),
      ];
    }
    form.submit();
    form.validateFields().then((values: BasicInfoNewRulesAndLawsSubmitType) => {
      createRulesAndRegulation({
        form: "Regulations",
        _data_: {
          attach: fileResponseList.length > 0,
          date: new Date().toISOString(),
          title: values.title,
          number: values.number,
          id: id ? +id : null,
          lastModifiedDate: new Date().toISOString(),
          AssociationRegulationsAttached: fileResRef.current.map((item) => {
            return {
              UploadFiles: {
                _: [{ data: item }],
              },
            };
          }) as AssociationRegulationsAttachedFile[] | null | undefined,
        },
      });
    });
  };

  //
  const onUploadFileSuccess = (value: UploadFileResponse) => {
    const updatedFileResponseList = [...fileResRef.current, value.data];
    fileResRef.current = updatedFileResponseList;
    // if (alreadyUploaded?.count) {

    if (updatedFileResponseList.length === fileList.length - alreadyUploaded?.count) {
      registerFormHandler();
      // }
    }
  };

  const registerHandler = () => {
    //alreadyUploaded?.count &&
    // اگر فایل جدیدی اضافه شده بود

    if (alreadyUploaded?.count < fileList?.length) {
      fileList.map((file, index) => {
        if (!(file as any)?.relativeUrl) {
          const formData = new FormData();
          formData.append("file", file as any);
          formData.append("dir", fileDirCreator());
          formData.append(
            "name",
            fileNameCreator() + `.${fileList[index]?.name?.split(".")[1]}`
          );

          uploadFile(formData as any)
            .unwrap()
            .then((value) => onUploadFileSuccess(value));
          // index + 1
          return;
        } else {
          return;
          // registerFormHandler();
        }
      });
    } else {
      // در صورتی که فایلی اضافه نشده بود
      registerFormHandler();
    }
  };

  const cancelHandler = () => {
    if (id) {
      return navigate(COMMITTEE_REGULATIONS_PAGE_ROUTE + "?id=" + id);
    } else {
      return navigate(COMMITTEE_RULES_AND_LAWS_PAGE_ROUTE);
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form
      onFinish={registerHandler}
      form={form}
      className="committee-new-rules-and-laws-page-container"
    >
      <CustomCard loading={isRulesAndRegulationDetailLoading || isCreateLoading}>
        <Row gutter={12}>
          <Col span={12}>
            <CustomInput
              type="text"
              label="عنوان"
              name="title"
              placeholder="عنوان"
              rules={[CUSTOM_REQUIRED_RULE("لطفا عنوان را وارد کنید")]}
            />
          </Col>
          <Col span={12}>
            <CustomInput
              type="text"
              label="شماره "
              name="number"
              placeholder="شماره "
              rules={[CUSTOM_REQUIRED_RULE("لطفا شماره را وارد کنید")]}
            />
          </Col>
          <Col span={24}>
            <CustomUploader
              label="پیوست ها"
              fileList={fileList}
              setFileList={setFileList}
              isReadOnly={false}
              isUploadFileLoading={isUploadFileLoading}
              isDataLoading={isGetAttachmentsDataLoading}
              setAlreadyUploaded={
                setAlreadyUploaded as React.Dispatch<
                  React.SetStateAction<AlreadyUploadedFileProps>
                >
              }
              alreadyUploaded={alreadyUploaded}
              // disabled={
              //   (fileList?.reduce((prevValue, currentValue) => {
              //     if (currentValue?.size) {
              //       return prevValue + currentValue?.size;
              //     }
              //     return 0;
              //   }, 0) as number) > 8
              // }
              UploadSizeLimitConfig={{
                size: 8,
                text: "مجموع حجم فایل ها کمتر از هشت مگابایت باشد",
                isActive: true,
                sizeUnit: "MB",
              }}
              hasVerticalLabel={true}
            />
          </Col>
        </Row>

        {/* <CustomInput
            type="text"
            label="عنوان"
            name="title"
            placeholder="عنوان"
            rules={[CUSTOM_REQUIRED_RULE("لطفا عنوان را وارد کنید")]}
          />

          <CustomInput
            type="text"
            label="شماره "
            name="number"
            placeholder="شماره "
            rules={[CUSTOM_REQUIRED_RULE("لطفا شماره را وارد کنید")]}
          />
          <CustomUploader
            label="پیوست ها"
            fileList={fileList}
            setFileList={setFileList}
            isReadOnly={false}
            isUploadFileLoading={isUploadFileLoading}
            isDataLoading={isGetAttachmentsDataLoading}
            setAlreadyUploaded={setAlreadyUploaded as any}
            alreadyUploaded={alreadyUploaded}
            // disabled={
            //   (fileList?.reduce((prevValue, currentValue) => {
            //     if (currentValue?.size) {
            //       return prevValue + currentValue?.size;
            //     }
            //     return 0;
            //   }, 0) as number) > 8
            // }
            UploadSizeLimitConfig={{
              size: 8,
              text: "مجموع حجم فایل ها کمتر از هشت مگابایت باشد",
              isActive: true,
              sizeUnit: "MB",
            }}
          /> */}

        {/* <div className="attachment-container"> */}

        {/* </div> */}
      </CustomCard>
      <div className="btn-wrapper">
        <Button
          type="primary"
          className="btn"
          htmlType="submit"
          loading={isCreateLoading}
          disabled={
            (fileList?.reduce((prevValue, currentValue) => {
              if (currentValue?.size) {
                return prevValue + currentValue?.size;
              }
              return 0;
            }, 0) as number) >
            8 * 1024 * 1024
          }
        >
          تایید
        </Button>
        <Button className="btn" onClick={cancelHandler}>
          لغو
        </Button>
      </div>
    </Form>
  );
};
export default NewRulesAndLaws;
