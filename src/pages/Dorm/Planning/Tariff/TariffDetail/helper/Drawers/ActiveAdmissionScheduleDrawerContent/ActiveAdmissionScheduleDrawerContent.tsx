import { useEffect, useState } from "react";

import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import CustomTree from "@components/Renderers/CustomTree/CustomTree";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { CascaderNode } from "@infra/helpers/NetworkHelpers/commonTransformers/commonTransformers";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { useLazyGetDormitoryTreeViewByIdQuery } from "@infra/states/redux/Apis/dorm/base/dormBaseApi";
import { useGetAdmissionDrawerDetailBaseInfoMutation } from "@infra/states/redux/Apis/dorm/planning/tariff/dormTariffApi";
import {
  applicationLevelDataForAntdTree,
  dateTimeCombiner,
} from "@pages/Dorm/_shared/utils/DormUtils";
import { ApplicationTreeDataType } from "@pages/Dorm/Planning/Admission/AdmissionDetail/helpers/LevelsOfActionTree/@types/@admissionDetailLevelsOfActionTree";
import { admissionTableDataTransformer } from "@pages/Dorm/Planning/Tariff/_shared/utils/TariffUtils";

import {
  ActiveAdmissionScheduleDrawerPropsType,
  AdmissionDetailDrawer,
  GetAdmissionDrawerDetailBaseInfoResponse,
} from "./@types/@activeAdmissionScheduleDrawerContent";
import ActiveAdmissionScheduleDrawerTableModel from "../../model/ActiveAdmissionScheduleDrawerTableModel";
import AdmissionDrawerBasicInfoSection from "./components/AdmissionDrawerBasicInfoSection/AdmissionDrawerBasicInfoSection";
import "./_activeAdmissionScheduleDrawerContent.scss";

const ActiveAdmissionScheduleDrawerContent = ({
  closeDrawerHandler,
  id,
}: ActiveAdmissionScheduleDrawerPropsType) => {
  const [dataSource, setDataSource] = useState<AdmissionDetailDrawer | null>(null);
  const [treeData, setTreeData] = useState<ApplicationTreeDataType[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  //? ================================  Api Calls ================================
  const [
    getAdmissionDrawerDetail,
    { data: admissionDrawerDetail, isLoading: isAdmissionDrawerDetailLoading },
  ] = useGetAdmissionDrawerDetailBaseInfoMutation();

  const [getDormitoryTreeViewById, { isLoading: isTreeViewLoading }] =
    useLazyGetDormitoryTreeViewByIdQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getDetailData(id?.toString());
    }
  }, [id]);

  //* ================================ Util Functions ================================
  const getAdmissionDetailBaseInfoSuccess = async (
    values: GetAdmissionDrawerDetailBaseInfoResponse
  ) => {
    if (values?.status === 200) {
      setDataSource(values?.data);

      if (values?.data?.AssociationDormitory?.id) {
        getDormitoryTreeViewById({
          maxResults: 900,
          firstResult: 0,
          DormitoryId_EQ: values?.data?.AssociationDormitory?.id?.toString(),
        })
          .unwrap()
          .then((value: CascaderNode[]) => {
            const transformData: ApplicationTreeDataType[] =
              applicationLevelDataForAntdTree(value);

            if (
              values?.data?.AssociationDormitory?.id &&
              values?.data?.AssociationDormitory?.title
            ) {
              const applicationLevel = [
                {
                  title: values?.data?.AssociationDormitory?.title,
                  key: values?.data?.AssociationDormitory?.id?.toString(),
                  disabled: true,
                  children: transformData,
                  isLeaf: true,
                },
              ];
              setTreeData(applicationLevel);

              const treeKeys: string[] = [];

              transformData.forEach((building) => {
                building?.children?.forEach((floor) => {
                  floor?.children?.forEach((room) => {
                    const isRoomSelected = values?.data?.AssociationRoom?.map((item) =>
                      item?.id?.toString()
                    )?.find((id) => id === room?.key);

                    if (isRoomSelected) {
                      treeKeys.push(room?.key, floor?.key, building?.key);
                    }
                  });
                });
              });
              setSelectedKeys([
                values?.data?.AssociationDormitory?.id?.toString(),
                ...treeKeys,
              ]);
            }
          });
      }
    }
  };

  const getDetailData = (id: string) => {
    getAdmissionDrawerDetail({
      body: {
        _data_: {
          id: id,
        },
      },
      params: {
        relation: "83184a68c448431983520dd0af80b29c", // we should set this to get data
      },
    })
      .unwrap()
      .then(getAdmissionDetailBaseInfoSuccess);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div
      className="active-admission-schedule-drawer-container"
      loading={isAdmissionDrawerDetailLoading}
    >
      <CustomDrawerHeader
        title="جزئیات برنامه پذیرش"
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <CustomTag
            color={admissionDrawerDetail?.data?.recordStatus === 1 ? "green" : "red"}
          >
            {admissionDrawerDetail?.data?.recordStatus === 1 ? "فعال" : "غیرفعال"}
          </CustomTag>
        }
      />
      <CustomDivider text="اطلاعات اولیه" />
      <div>
        <AdmissionDrawerBasicInfoSection admissionDrawerDetail={admissionDrawerDetail} />

        <CustomDivider text="سطوح اعمال" className="apply-levels" />
        <Div loading={isTreeViewLoading}>
          <CustomTree
            checkable
            checkedKeys={selectedKeys}
            expandedKeys={selectedKeys}
            treeData={treeData}
            className="admission-detail-level-of-action-tree"
          />
        </Div>

        <CustomTable
          dataSource={admissionTableDataTransformer(dataSource)}
          columns={ActiveAdmissionScheduleDrawerTableModel}
          pagination={false}
          className="table w-full"
          rowKey="id"
          {...TABLE_PROPS(admissionTableDataTransformer(dataSource)?.length)}
        />
        <Row gutter={[16, 16]} className="submit-time-wrapper">
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="زمان ثبت"
            value={dateTimeCombiner(
              admissionDrawerDetail?.data?.createDate,
              admissionDrawerDetail?.data?.createTime
            )}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="ایجاد کننده"
            value={admissionDrawerDetail?.data?.createByUserId}
          />
        </Row>
      </div>
    </Div>
  );
};
export default ActiveAdmissionScheduleDrawerContent;
