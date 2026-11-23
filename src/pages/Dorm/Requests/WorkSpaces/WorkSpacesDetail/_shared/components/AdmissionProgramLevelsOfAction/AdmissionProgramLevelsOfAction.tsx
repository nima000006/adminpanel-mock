import { useState, useEffect } from "react";

import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTree from "@components/Renderers/CustomTree/CustomTree";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { CascaderNode } from "@infra/helpers/NetworkHelpers/commonTransformers/commonTransformers";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { useLazyGetDormitoryTreeViewByIdQuery } from "@infra/states/redux/Apis/dorm/base/dormBaseApi";
import { multiSelectGenerator } from "@pages/_shared/utils";
import { applicationLevelDataForAntdTree } from "@pages/Dorm/_shared/utils/DormUtils";
import { ApplicationTreeDataType } from "@pages/Dorm/Planning/Admission/AdmissionDetail/helpers/LevelsOfActionTree/@types/@admissionDetailLevelsOfActionTree";

import {
  AdmissionProgramLevelsOfActionProps,
  ApplicationLevelDataType,
} from "./@types/@admissionProgramLevelsOfAction";
import "./_admissionProgramLevelsOfAction.scss";

const AdmissionProgramLevelsOfAction = ({
  data,
  loading,
}: AdmissionProgramLevelsOfActionProps) => {
  const [applicationLevelData] = useState<ApplicationLevelDataType>({
    residenceId: data?.AssociationDormitory?.id ?? null,
    residenceTitle: data?.AssociationDormitory?.title ?? null,
    selectedIds: data?.AssociationRoom?.map((item) => item?.id?.toString()) ?? [],
  });

  const [treeData, setTreeData] = useState<ApplicationTreeDataType[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const [getDormitoryTreeViewById, { isLoading: isTreeViewLoading }] =
    useLazyGetDormitoryTreeViewByIdQuery();
  useEffect(() => {
    if (applicationLevelData?.residenceId) {
      getDormitoryTreeViewById({
        maxResults: 900,
        firstResult: 0,
        DormitoryId_EQ: applicationLevelData?.residenceId?.toString(),
      })
        .unwrap()
        .then((value: CascaderNode[]) => {
          const transformData: ApplicationTreeDataType[] =
            applicationLevelDataForAntdTree(value);

          if (applicationLevelData?.residenceId && applicationLevelData?.residenceTitle) {
            const applicationLevel = [
              {
                title: applicationLevelData?.residenceTitle,
                key: applicationLevelData?.residenceId?.toString(),
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
                  const isRoomSelected = applicationLevelData?.selectedIds?.find(
                    (id) => id === room?.key
                  );

                  if (isRoomSelected) {
                    treeKeys.push(room?.key, floor?.key, building?.key);
                  }
                });
              });
            });
            setSelectedKeys([applicationLevelData?.residenceId?.toString(), ...treeKeys]);
          }
        });
    }
  }, [
    applicationLevelData?.residenceId,
    applicationLevelData?.residenceTitle,
    applicationLevelData?.selectedIds,
    getDormitoryTreeViewById,
  ]);

  return (
    <div className="work-spaces-admission-program-level-of-action-container">
      <Div loading={loading}>
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            xl={12}
            lg={12}
            md={12}
            label="اقامتگاه"
            value={data?.AssociationDormitory?.title}
          />
          <SingleVerticalWithCol
            md={12}
            label="درصد تخفیف"
            value={data?.percentDiscount?.toString()}
          />
          <SingleVerticalWithCol
            md={12}
            label="تخفیف ثابت (ریال)"
            value={data?.fixedDiscount?.toString()}
          />
          <SingleVerticalWithCol
            md={12}
            label="تعداد اقساط"
            value={data?.installmentNumber?.toString()}
          />
          <SingleVerticalWithCol
            md={12}
            label="جریمه دیرکرد درصدی (%)"
            value={data?.latePercentagepenalty?.toString()}
          />
          <SingleVerticalWithCol
            md={12}
            label="جریمه دیرکرد ثابت (ریال)"
            value={data?.fixedLatePenalty?.toString()}
          />
          <SingleVerticalWithCol
            span={24}
            label="ارائه به واحدهای"
            value={dataPlaceHolder({
              data: data?.AssociationBranch,
              callBack: multiSelectGenerator,
            })}
          />
        </Row>
      </Div>{" "}
      <div className="admission-levels-action-tree-wrapper">
        <CustomDivider text="سطح اعمال" />
        <ToolBox />
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
    </div>
  );
};

export default AdmissionProgramLevelsOfAction;
