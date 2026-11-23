import { useEffect, useState } from "react";

import { Col, Form, Row } from "antd";
import { useWatch } from "antd/es/form/Form";

import CustomCard from "@components/CustomCard/CustomCard";
import {
  CustomButton,
  CustomInput,
  CustomMap,
  CustomSelect,
  CustomSwitch,
  CustomTextArea,
} from "@components/CustomInputs";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import Div from "@components/Renderers/Div/Div";
import { selectDefaultValueGenerator } from "@infra/helpers/utils";
import { useLazyGetBasicInfoProvinceAndCityQuery } from "@infra/states/redux/Apis/basicInformation/basicInformationApis";
import {
  useLazyGetDetailLabsQuery,
  useLazyGetTestGeneticQuery,
  useMyDoctorLabsCreateMutation,
  useMyDoctorLabsDeActiveMutation,
  useMyDoctorLabsUpdateMutation,
  useMyDoctorSurveyAllQuery,
} from "@infra/states/redux/Apis/myDoctor/genetic/geneticApis";
import {
  MAX_LENGTH_RULE,
  MIN_LENGTH_RULE,
  NUMBER_RULE,
  REQUIRED_RULE,
} from "@infra/validation/validationSchema";
import {
  GetDetailLabsResponse,
  GetTestGeneticResponse,
  LabsModifyDrawerContentProps,
  ModifyLabsFormType,
} from "@pages/MyDoctor/Genetics/Labs/LabsList/helper/drawer/LabsModifyDrawerContent/@types/@labsModifyDrawerContent";

const LabsModifyDrawerContent = ({
  closeDrawerHandler,
  modifyData,
  fetchLabsList,
}: LabsModifyDrawerContentProps) => {
  const [provinceData, setProvinceData] = useState<{ id: number; title: string }[]>([]);
  const [cityData, setCityData] = useState<{ id: number; title: string }[]>([]);
  const [testData, setTestData] = useState<{ id: number; title: string }[]>([]);
  const [selectedSurveyId, setSelectedSurveyId] = useState<number>(0);
  const [lat, setLat] = useState<number>(35.69947719509053);
  const [lng, setLng] = useState<number>(51.336965560913086);
  const [isActive, setIsActive] = useState(false);
  const [deactivateModal, setDeactivateModal] = useState({
    isOpen: false,
    id: -1,
  });

  const [form] = Form.useForm<ModifyLabsFormType>();

  const selectedProvince = useWatch("province", form);

  //? ================================  Api Calls ================================
  // create labs
  const [createLabs, { isLoading: isCreateLabsLoading }] =
    useMyDoctorLabsCreateMutation();

  // update labs
  const [updateLabs, { isLoading: isUpdateLabsLoading }] =
    useMyDoctorLabsUpdateMutation();

  // get detail
  const [getDetail, { isFetching: isDetailLoading }] = useLazyGetDetailLabsQuery();

  // deactive
  const [deactivateLabs, { isLoading: isDeactivateLabsLoading }] =
    useMyDoctorLabsDeActiveMutation();

  // get province (separate hook instance from city — same pattern as LocationInfoSection)
  const [
    getProvinceData,
    { isFetching: isProvinceDataLoading, isSuccess: isProvinceSuccess },
  ] = useLazyGetBasicInfoProvinceAndCityQuery();

  // get city
  const [getCityData, { isFetching: isCityDataLoading }] =
    useLazyGetBasicInfoProvinceAndCityQuery();

  // get survey
  const { data, isFetching: isGetAllSurveyLoading } = useMyDoctorSurveyAllQuery(
    //send default 0 and 100 for this api
    {
      page: 0,
      size: 100,
    }
  );

  // get test
  const [getTest, { isFetching: isTestLoading }] = useLazyGetTestGeneticQuery();

  //? ================================ Effects ================================
  // province
  useEffect(() => {
    if (modifyData?.isOpen) {
      getProvinceHandler();
    }
  }, [modifyData?.isOpen]);

  // city — load options when province is selected (create + edit)
  // also depends on provinceData so edit mode can resolve provinceId by title
  useEffect(() => {
    const provinceId = resolveProvinceId(selectedProvince, provinceData);

    if (!provinceId) {
      if (!selectedProvince) {
        setCityData([]);
      }
      return;
    }

    fetchCitiesByProvinceId(provinceId);
  }, [selectedProvince, provinceData]);

  // get test
  useEffect(() => {
    if (!selectedSurveyId) {
      setTestData([]);
      return;
    }

    getTest({
      surveyId: selectedSurveyId.toString(),
    })
      .unwrap()
      .then((value: GetTestGeneticResponse) => {
        setTestData(
          value?.content?.map((item) => ({
            id: item?.id,
            title: item?.title,
          })) ?? []
        );
      });
  }, [selectedSurveyId]);

  // get detail
  useEffect(() => {
    if (modifyData?.id >= 1) {
      getDetail(modifyData?.id?.toString()).unwrap().then(isGetDetailSuccess);
    }
  }, [modifyData?.id]);

  //* ================================ Util Functions ================================
  const resolveProvinceId = (
    province: ModifyLabsFormType["province"] | undefined,
    provinces: { id: number; title: string }[]
  ): number | undefined => {
    const rawId = province?.code ?? province?.value;
    if (rawId != null && rawId !== "") {
      return Number(rawId);
    }

    const title = province?.label ?? province?.title;
    if (!title || !provinces?.length) return undefined;

    return provinces.find((item) => item.title === title)?.id;
  };

  const fetchCitiesByProvinceId = (provinceId: string | number) => {
    getCityData(Number(provinceId))
      .unwrap()
      .then((value) => {
        const cityList = value?.map((item) => ({
          id: item?.id,
          title: item?.name,
        }));

        setCityData(cityList ?? []);
      });
  };

  // province
  const getProvinceHandler = () => {
    if (!isProvinceSuccess) {
      getProvinceData(103) // 103 Iran code
        .unwrap()
        .then((value) => {
          const provinceList = value?.map((item) => {
            return {
              id: item?.id,
              title: item?.name,
            };
          });

          setProvinceData(provinceList ?? []);
        });
    }
  };

  // when province selected
  const onProvinceChangeHandler = (value: number | undefined) => {
    // با تغییر استان، شهر قبلی پاک شود
    form.setFieldsValue({
      city: undefined,
    });

    // اگر استان انتخاب نشده بود
    if (value == null) {
      setCityData([]);
    }
  };

  // survey
  const surveyOptions =
    data?.content?.map((item) => ({
      id: item?.id,
      title: item?.title,
    })) ?? [];

  const onChangeSurveyHandler = (id: number) => {
    if (!id) {
      setSelectedSurveyId(0);
      setTestData([]);
      form.setFieldsValue({
        survey: undefined,
        test: undefined,
      });
      return;
    }

    setSelectedSurveyId(id);
    form.setFieldsValue({
      test: undefined,
    });
  };

  // modify
  const handleSubmit = (values: ModifyLabsFormType) => {
    // create
    if (modifyData?.id <= -1) {
      createLabs({
        title: values?.labName,
        cityId: values?.city?.code,
        address: values?.address,
        employeeName: values?.employeeName,
        employeePhone: values?.employeePhone,
        phone: values?.phone,
        latitude: lat,
        longitude: lng,
        tests: values?.test?.map((item) => item?.code) ?? [],
      })
        .unwrap()
        .then(() => {
          closeDrawerHandler();
          fetchLabsList();
        });
    }

    // edit
    if (modifyData?.id >= 1) {
      updateLabs({
        id: modifyData?.id,
        title: values?.labName,
        cityId: values?.city?.code,
        address: values?.address,
        employeeName: values?.employeeName,
        employeePhone: values?.employeePhone,
        phone: values?.phone,
        latitude: lat,
        longitude: lng,
        tests: values?.test?.map((item) => item?.code) ?? [],
        recordStatus: isActive ? 1 : 2,
      })
        .unwrap()
        .then(() => {
          closeDrawerHandler();
          fetchLabsList();
        });
    }
  };

  // success
  const isGetDetailSuccess = (res: GetDetailLabsResponse) => {
    const firstTest = res?.testDto?.[0];

    // resolve province id from list when detail omits provinceId but has title
    const resolvedProvinceId =
      res?.provinceId ??
      provinceData.find((item) => item.title === res?.provinceTitle)?.id;

    form.setFieldsValue({
      labName: res?.title,
      province: selectDefaultValueGenerator({
        title: res?.provinceTitle,
        id: resolvedProvinceId,
      }),
      city: selectDefaultValueGenerator({
        title: res?.cityTitle,
        id: res?.cityId,
      }),
      address: res?.address,
      employeeName: res?.employee,
      employeePhone: res?.employeePhone,
      phone: res?.phone,
      survey: firstTest
        ? selectDefaultValueGenerator({
            title: firstTest?.surveyTitle,
            id: firstTest?.surveyId,
          })
        : undefined,
      test: selectDefaultValueGenerator(
        res?.testDto?.map((item) => ({
          ...item,
          title: `${item.title} (${item?.surveyTitle})`,
          id: item?.id,
        }))
      ),
    });

    // seed current city so the select isn't empty while options load
    if (res?.cityId && res?.cityTitle) {
      setCityData([{ id: res.cityId, title: res.cityTitle }]);
    }

    if (resolvedProvinceId) {
      fetchCitiesByProvinceId(resolvedProvinceId);
    }

    if (firstTest?.surveyId) {
      setSelectedSurveyId(firstTest.surveyId);
    }

    setLat(res?.latitude);
    setLng(res?.longitude);

    setIsActive(res?.recordStatus === 1);
  };

  // handlers
  const closeDeactivateModal = () => {
    setDeactivateModal({
      isOpen: false,
      id: -1,
    });
  };

  const confirmDeactivateHandler = () => {
    deactivateLabs({ id: modifyData?.id?.toString() ?? "" })
      .unwrap()
      .then(() => {
        setIsActive(false);
        closeDeactivateModal();
        fetchLabsList();
      });
  };

  const changeSwitchHandler = (checked: boolean) => {
    if (checked) {
      setIsActive(true);
    } else {
      setDeactivateModal({
        isOpen: true,
        id: modifyData?.id,
      });
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={form} onFinish={handleSubmit}>
      {/* SWITCH MODAL */}
      {deactivateModal?.isOpen && (
        <ConfirmationModalWithContent
          title="غیر فعال کردن "
          isModalOpen={deactivateModal?.isOpen}
          confirmBtnText="تایید و غیر فعال کردن"
          isDangerous={true}
          backBtnText="انصراف"
          closeModalHandler={closeDeactivateModal}
          onConfirmClickHandler={confirmDeactivateHandler}
          content="از غیر فعال کردن این آزمایشگاه اطمینان دارید؟"
          width={400}
          isConfirmButtonLoading={isDeactivateLabsLoading}
          showIcon={true}
        />
      )}

      <CustomDrawerHeader
        title={modifyData?.id >= 1 ? "ویرایش آزمایشگاه" : "افزودن آزمایشگاه"}
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <div className="flex gap-3">
            {modifyData?.id >= 1 ? (
              <CustomSwitch
                checked={isActive}
                checkedChildren="فعال"
                unCheckedChildren="غیرفعال"
                valuePropName="activeMode"
                onChange={changeSwitchHandler}
              />
            ) : null}
            <CustomButton onClick={closeDrawerHandler}>انصراف</CustomButton>
            <CustomButton
              type="primary"
              htmlType="submit"
              loading={isCreateLabsLoading || isUpdateLabsLoading}
            >
              {modifyData?.id >= 1 ? "تایید و ثبت تغییرات" : "تایید و ایجاد"}
            </CustomButton>
          </div>
        }
      />
      <Div loading={isDetailLoading}>
        <Row gutter={[16, 16]}>
          <Col lg={12} md={12} xs={24}>
            <CustomInput
              name="labName"
              label="نام آزمایشگاه"
              placeholder="نام آزمایشگاه‌ را وارد نمایید"
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <CustomSelect
              name="province"
              label="استان"
              options={provinceData}
              className="mb-0!"
              placeholder="انتخاب کنید"
              rules={[REQUIRED_RULE]}
              form={form}
              isLoading={isProvinceDataLoading}
              onChange={(id) => onProvinceChangeHandler(id as number)}
            />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <CustomSelect
              name="city"
              className="mb-0!"
              label="شهر"
              options={cityData}
              placeholder="انتخاب کنید"
              rules={[REQUIRED_RULE]}
              form={form}
              isLoading={isCityDataLoading}
              disabled={selectedProvince == null}
            />
          </Col>
          <Col lg={24} md={24} xs={24}>
            <CustomTextArea
              name="address"
              label="آدرس"
              placeholder="آدرس آزمایشگاه را به صورت کامل وارد نمایید"
              rules={[REQUIRED_RULE, MIN_LENGTH_RULE(3), MAX_LENGTH_RULE(500)]}
            />
          </Col>
          <CustomCard className="map-container" loading={false}>
            <CustomDivider orientationMargin="0" text="موقعیت مکانی" />
            <CustomMap lat={lat} lng={lng} setLat={setLat} setLng={setLng} />
          </CustomCard>

          <Col lg={12} md={12} xs={24}>
            <CustomInput
              name="employeeName"
              placeholder="نام مسئول‌ را وارد نمایید"
              label="نام مسئول"
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col lg={12} md={12} xs={24}>
            <CustomInput
              name="employeePhone"
              label="شماره تماس مسئول آزمایشگاه"
              placeholder="شماره تماس مسئول آزمایشگاه‌ را وارد نمایید"
              rules={[
                REQUIRED_RULE,
                NUMBER_RULE,
                MIN_LENGTH_RULE(11),
                MAX_LENGTH_RULE(11),
              ]}
            />
          </Col>
          <Col lg={12} md={12} xs={24}>
            <CustomInput
              name="phone"
              label="شماره تماس آزمایشگاه"
              placeholder="شماره تماس آزمایشگاه را وارد نمایید"
              rules={[
                REQUIRED_RULE,
                NUMBER_RULE,
                MIN_LENGTH_RULE(11),
                MAX_LENGTH_RULE(11),
              ]}
            />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <CustomSelect
              name="survey"
              label="لیست پرسشنامه"
              className="mb-0!"
              options={surveyOptions}
              placeholder="انتخاب کنید"
              rules={[REQUIRED_RULE]}
              form={form}
              allowClear
              onChange={(id) => onChangeSurveyHandler(id as number)}
              loading={isGetAllSurveyLoading}
            />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <CustomSelect
              name="test"
              label="تست‌های قابل ارائه"
              options={testData}
              placeholder="انتخاب کنید"
              rules={[REQUIRED_RULE]}
              form={form}
              mode="multiple"
              isLoading={isTestLoading}
              disabled={modifyData?.id >= 1 ? false : !selectedSurveyId}
            />
          </Col>
        </Row>
      </Div>
    </Form>
  );
};
export default LabsModifyDrawerContent;
