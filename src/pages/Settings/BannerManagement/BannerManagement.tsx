import { useEffect, useState } from "react";

import { Col, Form, Row } from "antd";

import CustomCard from "@components/CustomCard/CustomCard";
import { CustomSelect } from "@components/CustomInputs";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import {
  useLazyGetBasicInfoBannerBranchServiceQuery,
  useLazyGetBasicInfoStaffTypeQuery,
} from "@infra/states/redux/Apis/business/serviceManagementService/serviceManagementService";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import {
  IdTitle,
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { ServiceManagementBannerSelectedItemsType } from "@pages/Settings/BannerManagement/@types/@bannerManagement";

import BannerTableInfo from "./helpers/BannerInfo/BannersInfo";
import { appsInfo } from "./helpers/bannerManagerUtil";
import ModifyBannerContent from "./helpers/Drawers/ModifyBannerContent/ModifyBannerContent";
import VisitBannerContent from "./helpers/Drawers/VisitBannerContent/VisitBannerContent";
import BannerAppItems from "./helpers/ServiceAppItems/BannerAppItems";
import ServiceManagerProvider from "./State/BannerManagementContext";

import "./_bannerManagement.scss";

const BannerManagement = () => {
  useTitle({ text: "مدیریت بنرها" });
  const [modifyDrawerCloseSignal, setModifyDrawerCloseSignal] = useState(false);
  const [isVisitBannerDrawerOpen, setIsVisitBannerDrawerOpen] = useState({
    isOpen: false,
    id: -1,
  });
  const [isEditBannerDrawerOpen, seIsEditBannerDrawerOpen] = useState({
    isOpen: false,
    id: -1,
  });

  const [basicInfoStaffType, setBasicInfoStaffType] = useState<IdTitle[]>([]);
  const [basicInfoBranchService, setBasicInfoBranchService] = useState<IdTitle[]>([]);

  const [selectedItems, setSelectedItems] =
    useState<ServiceManagementBannerSelectedItemsType>({
      staff: {
        id: null,
        title: null,
      },
      branch: {
        id: null,
        title: null,
      },
    });

  const [form] = Form.useForm();

  //? ================================  Api Calls ================================
  //  staff
  const [getBasicInfoStaffType, { isLoading: isBasicInfoStaffTypeLoading }] =
    useLazyGetBasicInfoStaffTypeQuery();

  // branch
  const [getBasicInfoBranchService, { isLoading: isBasicInfoBranchServiceLoading }] =
    useLazyGetBasicInfoBannerBranchServiceQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    // staff
    getBasicInfoStaffType()
      .unwrap()
      .then((value) => {
        if (value) {
          setBasicInfoStaffType(
            value?.map((item) => ({ id: item?.id, title: item?.faTitle }))
          );
        }
      });

    // branch
    getBasicInfoBranchService()
      .unwrap()
      .then((value) => {
        if (value) {
          setBasicInfoBranchService(
            value?.map((item) => ({ id: item?.id, title: item?.faTitle }))
          );
        }
      });
  }, []);

  //* ================================ Util Functions ================================
  const staffChangeHandler = (value: SelectType<IdTitleName>) => {
    setSelectedItems((prev) => ({
      ...prev,
      staff: {
        id: value?.code,
        title: value?.label,
      },
    }));
  };

  const branchChangeHandler = (value: SelectType<IdTitleName>) => {
    setSelectedItems((prev) => ({
      ...prev,
      branch: {
        id: value?.code,
        title: value?.label,
      },
    }));
  };

  const onCloseVisitBanner = () => {
    setIsVisitBannerDrawerOpen({ isOpen: false, id: -1 });
  };
  const onCloseModifyBanner = () => {
    setModifyDrawerCloseSignal((prev) => !prev);
    seIsEditBannerDrawerOpen({ isOpen: false, id: -1 });
  };

  return (
    <ServiceManagerProvider>
      <CustomCard className="service-card-container">
        {/* ---------------------------------- Services List ---------------------------------- */}
        <CustomDivider text="سرویس ها" />
        <BannerAppItems items={appsInfo} />

        <Form className="my-12!">
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <CustomSelect
                name="staff"
                label="نوع کاربر"
                form={form}
                placeholder="نوع کاربر"
                isLoading={isBasicInfoStaffTypeLoading}
                options={basicInfoStaffType}
                rules={[REQUIRED_RULE]}
                onChange={(_, e) => staffChangeHandler(e as SelectType<IdTitleName>)}
              />
            </Col>
            <Col span={12}>
              <CustomSelect
                name="branches"
                label="قسمت"
                form={form}
                placeholder="قسمت"
                isLoading={isBasicInfoBranchServiceLoading}
                options={basicInfoBranchService}
                rules={[REQUIRED_RULE]}
                onChange={(_, e) => branchChangeHandler(e as SelectType<IdTitleName>)}
              />
            </Col>
          </Row>
        </Form>

        {/* ---------------------------------- Banner Table Info ---------------------------------- */}

        <BannerTableInfo
          seIsEditBannerDrawerOpen={seIsEditBannerDrawerOpen}
          setIsVisitBannerDrawerOpen={setIsVisitBannerDrawerOpen}
          selectedItems={selectedItems}
        />
        {/* ---------------------------------- DRAWERS ---------------------------------- */}
        {isEditBannerDrawerOpen?.isOpen && (
          <CustomDrawer
            content={
              <ModifyBannerContent
                closeDrawerHandler={onCloseModifyBanner}
                id={isEditBannerDrawerOpen?.id}
                modifyDrawerCloseSignal={modifyDrawerCloseSignal}
                selectedItems={selectedItems}
              />
            }
            onClose={onCloseModifyBanner}
            open={isEditBannerDrawerOpen?.isOpen}
          />
        )}
        {isVisitBannerDrawerOpen?.isOpen && (
          <CustomDrawer
            content={
              <VisitBannerContent
                closeDrawerHandler={onCloseVisitBanner}
                id={isVisitBannerDrawerOpen?.id}
              />
            }
            onClose={onCloseVisitBanner}
            open={isVisitBannerDrawerOpen?.isOpen}
          />
        )}
      </CustomCard>
    </ServiceManagerProvider>
  );
};

export default BannerManagement;
