import { useState } from "react";

import { Row } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import { FaCaretLeft } from "react-icons/fa";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { admissionTabTimingCreator } from "@pages/Dorm/Habitants/HabitantsDetail/helper/utils/HabitantDetailUtils";
import ActiveAdmissionScheduleDrawerContent from "@pages/Dorm/Planning/Tariff/TariffDetail/helper/Drawers/ActiveAdmissionScheduleDrawerContent/ActiveAdmissionScheduleDrawerContent";

import { HabitantAdmissionTabData } from "../../../@types/@fourthTabAdmissionProgram";
import GeneralInfoAdmissionProgramTableModel from "../../models/GeneralInfoAdmissionProgramTableModel/GeneralInfoAdmissionProgramTableModel";

const callbackSpecialStatus = (
  data: {
    id: number;
    title: string;
  }[]
) => {
  if (data?.length === 0) return "-";
  return data?.map(
    (item, index) =>
      item?.title && (
        <span key={index}>
          {item?.title} {index !== data?.length - 1 && "- "}
        </span>
      )
  );
};

const GeneralInfoAdmissionProgram = ({
  data,
}: {
  data: HabitantAdmissionTabData | null;
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState({ isOpen: false, id: -1 });

  //* ================================ Util Functions ==============================
  const admissionProgramExtraDetailHandler = () => {
    setIsDrawerOpen({ isOpen: true, id: -1 });
  };

  const closeDrawerHandler = () => {
    setIsDrawerOpen({ isOpen: false, id: -1 });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* admission program drawer */}
      {isDrawerOpen?.isOpen && (
        <CustomDrawer
          onClose={closeDrawerHandler}
          open={isDrawerOpen?.isOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <ActiveAdmissionScheduleDrawerContent
              closeDrawerHandler={closeDrawerHandler}
              id={data?.AssociationCategoryDeliverPlan?.id}
            />
          }
        />
      )}

      <div>
        <CustomDivider
          text="اطلاعات کلی برنامه پذیرش"
          extraContent={
            <div className="flex items-center gap-2 max-[500px]:flex-col">
              <div>
                <CustomTag
                  color={
                    data?.AssociationCategoryDeliverPlan?.AssociationRecordStatus?.id ===
                    1
                      ? "green"
                      : "red"
                  }
                >
                  {data?.AssociationCategoryDeliverPlan?.AssociationRecordStatus?.title}
                </CustomTag>
              </div>
              <CustomButton
                className="text-primary-6! border-0! shadow-none!"
                onClick={admissionProgramExtraDetailHandler}
              >
                جزئیات بیشتر
                <FaCaretLeft />
              </CustomButton>
            </div>
          }
        />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            xl={12}
            lg={12}
            md={24}
            sm={24}
            label="عنوان"
            value={data?.AssociationCategoryDeliverPlan?.title}
          />
          <SingleVerticalWithCol
            lg={6}
            md={12}
            sm={24}
            label="شناسه برنامه پذیرش"
            value={data?.AssociationCategoryDeliverPlan?.id?.toString()}
          />
          <SingleVerticalWithCol
            lg={6}
            md={12}
            sm={24}
            label="نوع زمانبندی"
            value={
              data?.AssociationCategoryDeliverPlan?.AssociationCategorySchedulingType
                ?.title
            }
          />
          <SingleVerticalWithCol
            xl={12}
            lg={12}
            md={24}
            sm={24}
            label="شرایط خاص"
            value={dataPlaceHolder({
              data: data?.AssociationCategoryDeliverPlan
                ?.AssociationDeliverPlanSpecialStatus,
              callBack: callbackSpecialStatus,
            })}
          />
        </Row>
        <div className="mt-10!">
          <CustomTable
            dataSource={admissionTabTimingCreator(data) || []}
            rowKey="id"
            columns={GeneralInfoAdmissionProgramTableModel}
            pagination={false}
            {...TABLE_PROPS(admissionTabTimingCreator(data)?.length)}
          />
        </div>
      </div>
    </>
  );
};
export default GeneralInfoAdmissionProgram;
