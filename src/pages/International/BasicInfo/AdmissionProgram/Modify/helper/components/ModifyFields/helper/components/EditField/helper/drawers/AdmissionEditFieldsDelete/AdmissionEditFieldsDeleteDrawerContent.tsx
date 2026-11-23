import { useState } from "react";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomSteps from "@components/Renderers/CustomSteps/CustomSteps";
import { stepStatusCreator } from "@infra/helpers/utils";
import { useResponsive } from "@infra/hooks/useResponsive";
import { InternationalAdmissionDetailFieldsInfoType } from "@pages/International/BasicInfo/AdmissionProgram/Detail/helper/components/DetailFields/@types/@admissionProgramDetailFields";

import { AdmissionEditFieldsDeleteDrawerContentProps } from "./@types/@admissionEditFieldsDeleteDrawerContent";
import AdmissionDeleteDrawerStepConfirmSelectedList from "./helper/components/ConfirmSelectedList/AdmissionDeleteDrawerStepConfirmSelectedList";
import AdmissionDeleteDrawerStepSelectFromList from "./helper/components/SelectFromList/AdmissionDeleteDrawerStepSelectFromList";

const AdmissionEditFieldsDeleteDrawerContent = ({
  closeDrawerHandler,
  dataSource,
  setDatasource,
}: AdmissionEditFieldsDeleteDrawerContentProps) => {
  const [current, setCurrent] = useState(0);

  const [selectedRow, setSelectedRow] = useState<
    InternationalAdmissionDetailFieldsInfoType[]
  >([]);

  const { isTablet } = useResponsive();

  //* ================================ Util Functions ================================
  const backBtnHandler = () => {
    setCurrent(0);
  };
  const nextBtnHandler = () => {
    setCurrent(1);
  };

  const deleteBtnHandler = () => {
    const result = [...dataSource].filter(
      (itemDataSource) =>
        !selectedRow.find(
          (itemSelectedRow) =>
            itemDataSource.branchFieldId === itemSelectedRow.branchFieldId
        )
    );

    setDatasource(result);
    closeDrawerHandler();
  };

  //* ================================ Steps ================================
  const stepsItem = [
    {
      id: "1",
      children: (
        <AdmissionDeleteDrawerStepSelectFromList
          dataSource={dataSource}
          setSelectedRow={setSelectedRow}
          selectedKeys={selectedRow?.map((item) => item.branchFieldId)}
        />
      ),
    },
    {
      id: "2",
      children: <AdmissionDeleteDrawerStepConfirmSelectedList dataSource={selectedRow} />,
    },
  ];
  return (
    <div className="admission-edit-fields-delete-drawer-container">
      <CustomDrawerHeader
        title="حذف از لیست"
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <>
            {current === 0 ? (
              <div className="action-btns-container">
                <CustomButton onClick={closeDrawerHandler}>انصراف</CustomButton>
                <CustomButton type="primary" onClick={nextBtnHandler}>
                  بعدی
                </CustomButton>
              </div>
            ) : (
              <div className="action-btns-container">
                <CustomButton onClick={backBtnHandler}>بازگشت</CustomButton>
                <CustomButton type="primary" onClick={deleteBtnHandler}>
                  تایید و حذف
                </CustomButton>
              </div>
            )}
          </>
        }
      />
      <CustomSteps
        type="default"
        orientation={isTablet ? "vertical" : "horizontal"}
        current={current}
        className="site-navigation-steps pr-0"
        items={[
          {
            status: stepStatusCreator(current, 0),
            title: "انتخاب از لیست",
          },
          {
            status: stepStatusCreator(current, 1),
            title: "تایید و حذف انتخاب شده‌ها",
          },
        ]}
      />
      {stepsItem[current].children}
    </div>
  );
};

export default AdmissionEditFieldsDeleteDrawerContent;
