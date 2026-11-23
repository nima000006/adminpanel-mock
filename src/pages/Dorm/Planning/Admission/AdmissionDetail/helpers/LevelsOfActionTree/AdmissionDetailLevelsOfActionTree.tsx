import { useEffect, useState } from "react";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTree from "@components/Renderers/CustomTree/CustomTree";
import Div from "@components/Renderers/Div/Div";
import { CascaderNode } from "@infra/helpers/NetworkHelpers/commonTransformers/commonTransformers";
import { useLazyGetDormitoryTreeViewByIdQuery } from "@infra/states/redux/Apis/dorm/base/dormBaseApi";
import { applicationLevelDataForAntdTree } from "@pages/Dorm/_shared/utils/DormUtils";

import { ApplicationTreeDataType } from "./@types/@admissionDetailLevelsOfActionTree";
import { ApplicationLevelDataType } from "../../AdmissionDetailActive/helpers/AdmissionDetailActiveLevelsOfAction/@types/@admissionDetailActiveLevelsOfAction";
import "./_admissionDetailLevelsOfActionTree.scss";

const AdmissionDetailLevelsOfActionTree = ({
  applicationLevelData,
}: {
  applicationLevelData: ApplicationLevelDataType;
}) => {
  const [treeData, setTreeData] = useState<ApplicationTreeDataType[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  //? ================================  Api Calls ================================
  const [getDormitoryTreeViewById, { isLoading: isTreeViewLoading }] =
    useLazyGetDormitoryTreeViewByIdQuery();

  //? ================================ Effects ================================
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
  }, [applicationLevelData?.residenceId]);

  return (
    <div className="admission-detail-level-of-action-container">
      <CustomDivider text="سطح اعمال" />
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
  );
};

export default AdmissionDetailLevelsOfActionTree;
