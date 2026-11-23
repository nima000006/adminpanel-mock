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
import { dataPlaceHolder } from "@infra/helpers/utils";
import { useLazyGetDormitoryTreeViewByIdQuery } from "@infra/states/redux/Apis/dorm/base/dormBaseApi";
import { useGetAdmissionDrawerDetailBaseInfoMutation } from "@infra/states/redux/Apis/dorm/planning/tariff/dormTariffApi";
import { multiSelectGenerator } from "@pages/_shared/utils";
import {
  applicationLevelDataForAntdTree,
  dateTimeCombiner,
  dormVisibilityStatusColor,
} from "@pages/Dorm/_shared/utils/DormUtils";
import { ApplicationTreeDataType } from "@pages/Dorm/Planning/Admission/AdmissionDetail/helpers/LevelsOfActionTree/@types/@admissionDetailLevelsOfActionTree";
import { admissionTableDataTransformer } from "@pages/Dorm/Planning/Tariff/_shared/utils/TariffUtils";
import {
  AdmissionDetailDrawer,
  GetAdmissionDrawerDetailBaseInfoResponse,
} from "@pages/Dorm/Planning/Tariff/TariffDetail/helper/Drawers/ActiveAdmissionScheduleDrawerContent/@types/@activeAdmissionScheduleDrawerContent";

import { UsersRequestsDetailAdmissionDetailDrawerContentProps } from "./@types/@usersRequestsDetailAdmissionDetailDrawerContent";
import UsersRequestsDetailAdmissionDrawerTableModel from "./helper/drawers/UsersRequestsDetailAdmissionDrawerTableModel/UsersRequestsDetailAdmissionDrawerTableModel";
import "./_usersRequestsDetailAdmissionDetailDrawerContent.scss";

const UsersRequestsDetailAdmissionDetailDrawerContent = ({
  closeDrawerHandler,
  id,
  admissionTariffData,
}: UsersRequestsDetailAdmissionDetailDrawerContentProps) => {
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

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <Div loading={isAdmissionDrawerDetailLoading}>
      <CustomDrawerHeader
        title="جزئیات برنامه پذیرش"
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <CustomTag
            color={
              dormVisibilityStatusColor[admissionDrawerDetail?.data?.recordStatus || 0]
            }
          >
            {admissionDrawerDetail?.data?.recordStatus ? "فعال" : "غیرفعال"}
          </CustomTag>
        }
      />
      <div className="users-requests-detail-admission-drawer-content-container">
        <div>
          <CustomDivider text="اطلاعات اولیه" />
          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol
              span={12}
              label="عنوان"
              value={admissionDrawerDetail?.data?.title}
            />
            <SingleVerticalWithCol
              span={12}
              label="عنوان نمایشی"
              value={admissionTariffData?.showTitle}
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="شناسه برنامه پذیرش"
              value={admissionDrawerDetail?.data?.id?.toString()}
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="واحد دانشگاهی"
              value={admissionDrawerDetail?.data?.AssociationCategoryBranch?.title}
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="اقامتگاه"
              value={admissionDrawerDetail?.data?.AssociationDormitory?.title}
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="نوع مدیریت"
              value={
                admissionDrawerDetail?.data?.AssociationCategoryManagementType?.title
              }
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="نوع زمان‌بندی"
              value={
                admissionDrawerDetail?.data?.AssociationCategorySchedulingType?.title
              }
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="نوع رزرو"
              value={
                admissionDrawerDetail?.data?.AssociationCategoryReservationType?.title
              }
            />
            <SingleVerticalWithCol
              span={24}
              label="نیمسال"
              value={
                admissionTariffData?.AssociationCategoryDeliverPlan?.AssociationSemester
                  ?.title
              }
            />
            <SingleVerticalWithCol
              span={24}
              label="ارائه به واحدهای"
              value={dataPlaceHolder({
                data: admissionDrawerDetail?.data?.AssociationBranch,
                callBack: multiSelectGenerator,
              })}
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="نوع پرداخت"
              value={dataPlaceHolder({
                data: admissionDrawerDetail?.data?.AssociationPaymentType,
                callBack: multiSelectGenerator,
              })}
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="تعداد اقساط"
              value={admissionDrawerDetail?.data?.installmentNumber?.toString()}
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="جریمه دیرکرد درصدی (%)"
              value={admissionDrawerDetail?.data?.latePercentagepenalty?.toString()}
              isPrice
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="جریمه دیرکرد ثابت (ریال)"
              value={admissionDrawerDetail?.data?.fixedLatePenalty?.toString()}
              isPrice
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="شیوه پرداخت"
              value={dataPlaceHolder({
                data: admissionDrawerDetail?.data?.AssociationPaymetMethod,
                callBack: multiSelectGenerator,
              })}
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="امکان درخواست برای دیگری"
              value={admissionDrawerDetail?.data?.isRequestForAnother?.toString()}
            />
            <SingleVerticalWithCol
              span={24}
              label="گروه کاربری"
              value={dataPlaceHolder({
                data: admissionDrawerDetail?.data?.AssociationUserGroup,
                callBack: multiSelectGenerator,
              })}
            />
            <SingleVerticalWithCol
              span={24}
              label="مقطع تحصیلی"
              value={dataPlaceHolder({
                data: admissionDrawerDetail?.data?.AssociationGrade,
                callBack: multiSelectGenerator,
              })}
            />
            <SingleVerticalWithCol
              span={24}
              label="ملیت"
              value={dataPlaceHolder({
                data: admissionDrawerDetail?.data?.AssociationNationality,
                callBack: multiSelectGenerator,
              })}
            />
            <SingleVerticalWithCol
              span={24}
              label="شرایط خاص"
              value={dataPlaceHolder({
                data: admissionDrawerDetail?.data?.AssociationSpecialStatus,
                callBack: multiSelectGenerator,
              })}
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="امکان بدهی"
              value={admissionDrawerDetail?.data?.canDebt === 1 ? "بله" : "خیر"}
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="سقف بدهی (ریال)"
              value={admissionDrawerDetail?.data?.maxDebt?.toString()}
              isPrice
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="حداکثر تعداد اقساط جهت بدهی"
              value={admissionDrawerDetail?.data?.maxNumberInstallmentForDebt?.toString()}
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="درصد تخفیف"
              value={admissionDrawerDetail?.data?.percentDiscount?.toString()}
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="تخفیف ثابت (ریال)"
              value={admissionDrawerDetail?.data?.fixedDiscount?.toString()}
              isPrice
            />
            <SingleVerticalWithCol
              span={24}
              label="توضیحات"
              value={admissionDrawerDetail?.data?.description}
            />
          </Row>
        </div>

        <div>
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
        </div>
        <CustomTable
          dataSource={admissionTableDataTransformer(dataSource)}
          columns={UsersRequestsDetailAdmissionDrawerTableModel()}
          pagination={false}
          {...TABLE_PROPS(admissionTableDataTransformer(dataSource)?.length)}
          rowKey="id"
          className="table"
        />
        <Row gutter={[16, 16]}>
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

export default UsersRequestsDetailAdmissionDetailDrawerContent;
