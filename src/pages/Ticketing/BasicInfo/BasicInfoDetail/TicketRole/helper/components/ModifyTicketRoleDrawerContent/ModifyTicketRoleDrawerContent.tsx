import { useEffect, useMemo, useState } from "react";

import { Col, Form, Row, TransferProps } from "antd";
import { TransferItem } from "antd/es/transfer";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTransfer from "@components/CustomInputs/CustomTransfer/CustomTransfer";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { useLazyGetRoleListQuery } from "@infra/states/redux/Apis/authApi";
import {
  useBasicInfoModifyRoleMutation,
  useLazyGetAllSamimServiceQuery,
  useLazyGetAllTopicBySamimServicesQuery,
  useLazyViewRoleListQuery,
} from "@infra/states/redux/Apis/ticketing/ticketing/ticketingApis";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import {
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";
import {
  GetAllSamimServiceResponse,
  GetAllTopicBySamimServicesResponse,
} from "@pages/Ticketing/_shared/@ticketingTypes";

import {
  getRoleListResponse,
  itemRenderer,
  modifyTicketRoleDrawerContentProps,
} from "./@types/@modifyTicketRoleDrawerContentTypes";

import "./_modifyTicketRoleDrawerContent..scss";

const ModifyTicketRoleDrawerContent = ({
  closeDrawer,
  refetchList,
  role,
}: modifyTicketRoleDrawerContentProps) => {
  const [targetKeys, setTargetKeys] = useState<TransferProps["targetKeys"]>();
  const [selectedKeys, setSelectedKeys] = useState<TransferProps["targetKeys"]>([]);
  const [roleList, setRoleList] = useState<getRoleListResponse>();
  const [services, setServices] = useState<GetAllSamimServiceResponse>();
  const [subjectIssues, setSubjectIssues] =
    useState<GetAllTopicBySamimServicesResponse>();
  const [subjectAllocatedIssues, setSubjectAllocatedIssues] =
    useState<GetAllTopicBySamimServicesResponse>();

  const [form] = Form.useForm();

  //? ================================ API ================================
  // role
  const [
    getRoleList,
    { isFetching: isGetRoleListLoading, isSuccess: isGetRoleListSuccess },
  ] = useLazyGetRoleListQuery();

  // service
  const [
    getAllSamimService,
    { isFetching: isGetAllSamimServiceLoading, isSuccess: isGetAllSamimServiceSuccess },
  ] = useLazyGetAllSamimServiceQuery();

  // issue subject list
  const [getIssueSubjectList, { isFetching: isGetIssueSubjectListLoading }] =
    useLazyGetAllTopicBySamimServicesQuery();

  // issue subject allocated list
  const [
    getIssueSubjectAllocatedList,
    { isFetching: isGetIssueSubjectAllocatedListLoading },
  ] = useLazyViewRoleListQuery();

  // modify and add role
  const [modifyRole, { isLoading: isModifyRoleLoading }] =
    useBasicInfoModifyRoleMutation();

  useEffect(() => {
    if (!role) {
      getRoleListHandler();
    }

    if (role) {
      getTopicsByRoleHandler(undefined, role);
    }
  }, [role]);

  //* ================================ Util Functions ================================
  //handler
  // role
  const getRoleListHandler = () => {
    if (!isGetRoleListSuccess) {
      getRoleList({ samimService: "TICKET" })
        .unwrap()
        .then((res: getRoleListResponse) => setRoleList(res));
    }
  };

  // services
  const getAllSamimServiceHandler = () => {
    if (!isGetAllSamimServiceSuccess) {
      getAllSamimService()
        .unwrap()
        .then((res) => setServices(res));
    }
  };

  // when service selected
  const getTopicsByServiceHandler = (value: unknown) => {
    const selectedValues = Array.isArray(value) ? value : [];

    setSubjectIssues([]);

    if (selectedValues?.length > 0) {
      getIssueSubjectList({
        serviceRequest: selectedValues?.map((value) => value?.item?.name)?.join(","),
      })
        .unwrap()
        .then((res) => setSubjectIssues(res));
    }
  };

  // when role selected
  const getTopicsByRoleHandler = (value?: SelectType<IdTitleName>, roleName?: string) => {
    const role = roleName ?? value?.item?.name;

    if (!role) return;

    getIssueSubjectAllocatedList(role)
      .unwrap()
      .then((res) => {
        setSubjectAllocatedIssues(res);

        // آیتم‌های تخصیص داده شده به نقش
        setTargetKeys(res?.map((item) => item.id));
      });
  };

  const modifyHandler = () => {
    if (role !== "") {
      modifyRole({
        role,
        topicIds: targetKeys?.join(",") ?? "",
      })
        .unwrap()
        .then(() => {
          closeDrawer();
          refetchList();
        });
    } else {
      modifyRole({
        role: form.getFieldValue("role")?.item?.name,
        topicIds: targetKeys?.join(",") ?? "",
      })
        .unwrap()
        .then(() => {
          closeDrawer();
          refetchList();
        });
    }
  };

  const onChange: TransferProps["onChange"] = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys);
  };
  const onSelectChange: TransferProps["onSelectChange"] = (
    sourceSelectedKeys,
    targetSelectedKeys
  ) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };
  const itemRenderer: itemRenderer = (item: TransferItem) => {
    return {
      key: item?.key || undefined,
      label: <>{item?.title}</> || <>نامشخص</>,
      value: item?.key?.toString() || "",
    };
  };

  const transferSourceCreator: (
    data?: GetAllTopicBySamimServicesResponse
  ) => TransferItem[] = (data?: GetAllTopicBySamimServicesResponse) => {
    if (!data) return [];
    return data?.map((item) => {
      return {
        key: item?.id,
        title: item?.title,
        description: item?.id?.toString(),
      };
    });
  };

  const mergedTransferData = useMemo(() => {
    const serviceItems = transferSourceCreator(subjectIssues);
    const roleItems = transferSourceCreator(subjectAllocatedIssues);

    const map = new Map();

    [...serviceItems, ...roleItems].forEach((item) => {
      map.set(item.key, item);
    });

    return [...map.values()];
  }, [subjectIssues, subjectAllocatedIssues]);
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <Form form={form} onFinish={modifyHandler}>
      <CustomDrawerHeader
        title={role !== "" ? "ویرایش موضوع مشکلات در نقش" : "افزودن موضوع مشکلات به نقش"}
        closeDrawerHandler={closeDrawer}
        leftSideContent={
          <div className="flex gap-3">
            <CustomButton onClick={closeDrawer}>انصراف</CustomButton>
            <CustomButton type="primary" htmlType="submit" loading={isModifyRoleLoading}>
              {role !== "" ? "اعمال تغییرات" : "ثبت و افزودن"}
            </CustomButton>
          </div>
        }
      />
      <Row gutter={[16, 16]}>
        <Col lg={12} md={8} sm={12} xs={24}>
          {role === "" ? (
            <CustomSelect
              className="mb-0!"
              form={form}
              rules={[REQUIRED_RULE]}
              loading={isGetRoleListLoading}
              label="نقش"
              name="role"
              options={roleList}
              placeholder="انتخاب کنید"
              onClick={getRoleListHandler}
              onChange={(_, value) =>
                getTopicsByRoleHandler(value as SelectType<IdTitleName>)
              }
              transformOptions={(options) =>
                options.map((item: { id: number; title: string; name?: string }) => ({
                  value: item.name, // به جای id
                  label: item.title,
                  key: item.id,
                  item,
                }))
              }
            />
          ) : (
            <SingleVerticalWithCol span={24} value={role} label="نقش ها" />
          )}
        </Col>
        <Col lg={12} md={8} sm={12} xs={24}>
          <CustomSelect
            className="mb-0!"
            form={form}
            rules={[REQUIRED_RULE]}
            loading={isGetAllSamimServiceLoading}
            label="سرویس‌ها"
            name="service"
            mode="multiple"
            options={services}
            placeholder="انتخاب کنید"
            onClick={getAllSamimServiceHandler}
            onChange={(_, value) => getTopicsByServiceHandler(value)}
          />
        </Col>
        <Col span={24}>
          <Div
            loading={
              isGetIssueSubjectListLoading || isGetIssueSubjectAllocatedListLoading
            }
          >
            <CustomTransfer
              className="add-super-agent-custom-transfer-container mt-5!"
              titles={["لیست موضوع مشکلات", "موضوع مشکلات تخصیص داده شده"]}
              onChange={onChange}
              targetKeys={targetKeys}
              selectedKeys={selectedKeys}
              onSelectChange={onSelectChange}
              dataSource={mergedTransferData}
              render={itemRenderer}
              pagination
              showSearch
            />
          </Div>
        </Col>
      </Row>
    </Form>
  );
};

export default ModifyTicketRoleDrawerContent;
