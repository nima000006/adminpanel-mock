import { useEffect, useState } from "react";

import { Col, Form, Row } from "antd";

import CustomCard from "@components/CustomCard/CustomCard";
import { CustomSelect } from "@components/CustomInputs";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import {
  useLazyGetBasicInfoBranchServiceQuery,
  useLazyGetBasicInfoStaffTypeQuery,
} from "@infra/states/redux/Apis/business/serviceManagementService/serviceManagementService";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import {
  IdTitle,
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { ServiceManagementSelectedItemsType } from "@pages/Settings/ServiceManagement/@types/@servicesManagement";

import AddToListDrawerContent from "./helpers/Drawers/AddToListDrawerContent/AddToListDrawerContent";
import UpdateToListDrawerContent from "./helpers/Drawers/UpdateToListDrawerContent/UpdateToListDrawerContent";
import ServiceAppItems from "./helpers/ServiceAppItems/ServiceAppItems";
import { appsInfo } from "./helpers/serviceManagerUtil";
import ServicesInfo from "./helpers/ServicesInfo/ServicesInfo";
import ServiceManagerProvider from "./State/ServiceMangerContext";

import "./_serviceManagement.scss";

const ServiceManagement = () => {
  useTitle({ text: "مدیریت برنامه‌ها" });

  const [isRenewListDrawerOpen, setIsRenewListDrawerOpen] = useState(false);
  const [isAddToListDrawerOpen, setIsAddToListDrawerOpen] = useState(false);

  const [basicInfoStaffType, setBasicInfoStaffType] = useState<IdTitle[]>([]);
  const [basicInfoBranchService, setBasicInfoBranchService] = useState<IdTitle[]>([]);

  const [selectedItems, setSelectedItems] = useState<ServiceManagementSelectedItemsType>({
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
    useLazyGetBasicInfoBranchServiceQuery();

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

  return (
    <ServiceManagerProvider>
      <CustomCard className="service-card-container">
        <CustomDivider text="نمایش برنامه‌ها در اپلیکیشن" />
        <ServiceAppItems items={appsInfo} />

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
                label="نوع بخش"
                form={form}
                placeholder="نوع بخش"
                isLoading={isBasicInfoBranchServiceLoading}
                options={basicInfoBranchService}
                rules={[REQUIRED_RULE]}
                onChange={(_, e) => branchChangeHandler(e as SelectType<IdTitleName>)}
              />
            </Col>
          </Row>
        </Form>

        <ServicesInfo
          setIsRenewListDrawerOpen={setIsRenewListDrawerOpen}
          setIsAddToListDrawerOpen={setIsAddToListDrawerOpen}
          selectedItems={selectedItems}
        />
        {isRenewListDrawerOpen && (
          <CustomDrawer
            content={
              <UpdateToListDrawerContent
                closeDrawerHandler={() => setIsRenewListDrawerOpen(false)}
                selectedItems={selectedItems}
              />
            }
            onClose={() => setIsRenewListDrawerOpen(false)}
            open={isRenewListDrawerOpen}
          />
        )}
        {isAddToListDrawerOpen && (
          <CustomDrawer
            content={
              <AddToListDrawerContent
                closeDrawerHandler={() => setIsAddToListDrawerOpen(false)}
                selectedItems={selectedItems}
              />
            }
            onClose={() => setIsAddToListDrawerOpen(false)}
            open={isAddToListDrawerOpen}
          />
        )}
      </CustomCard>
    </ServiceManagerProvider>
  );
};

export default ServiceManagement;
