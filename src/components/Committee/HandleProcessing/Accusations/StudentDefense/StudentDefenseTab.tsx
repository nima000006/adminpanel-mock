import { memo, useEffect } from "react";

import { Button, Empty, Steps, Upload } from "antd";
import { AiOutlineUpload } from "react-icons/ai";

import { stepItemProp } from "./@types/@studentDefenseTab";
import { dataPlaceHolder } from "../../../../../infrastructure/helpers/utils";
import { useLazyGetStudentDefenseTabQuery } from "../../../../../infrastructure/states/redux/Apis/committee/handleProcessing/handleProcessing";
import Div from "../../../../Renderers/Div/Div";
import SingleVerticalItem from "../../../../Renderers/SingleVerticalItem/SingleVerticalItem";
import "./_studentDefenseTab.scss";

//stepItem
const stepItem = (item: stepItemProp) => {
  return {
    title: (
      <div className="step-item-container">
        <h3 className="step-title">{item?.label}</h3>
        <span className="step-subtitle">
          {dataPlaceHolder({ data: item?.date, isDate: true })}
        </span>
        <div className="step-body">
          <div className="around-box referral-section">
            <div className="title-container">
              <span className="step-subtitle">ارجاع: </span>
              <h3 className="step-title">
                {dataPlaceHolder({ data: item?.generalDate, isDate: true })}
              </h3>
            </div>
            <SingleVerticalItem label="توضیحات" value={item?.desc} />

            <div className="attachment-container">
              <h3 className="step-title">پیوست ها</h3>
              <Upload className="upload-container" listType="picture" multiple disabled>
                <Button icon={<AiOutlineUpload />} className="custom-btn" disabled>
                  بارگذاری تصاویر
                </Button>
              </Upload>
            </div>
          </div>
        </div>
      </div>
    ),
  };
};

// StudentDefenseTab
const StudentDefenseTab = memo(({ id }: { id: string }) => {
  //? ================================  Api Calls ================================
  const [getDefenseData, { data: defenseData, isFetching: isDefenseDataLoading }] =
    useLazyGetStudentDefenseTabQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getDefenseData({ id, maxResults: 1 });
    }
  }, [id]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div
      className="accusation-case-student-defense-tab-container"
      loading={isDefenseDataLoading}
    >
      {/* <div className="filter-container">
        <span className="title-text">فیلترها:</span>
        <div className="capsule-container">
          <div className="capsule">کمیته تفهیم</div>
          <div className="capsule">تفهیم دبیر</div>
          <div className="capsule">دفاعیه</div>
        </div>
      </div> */}
      {defenseData?.data?.length === 0 ? (
        <Empty className="empty" />
      ) : (
        <Steps
          orientation="vertical"
          size="small"
          current={defenseData?.data?.length ? defenseData?.data?.length - 1 : 0}
          items={defenseData?.data?.map((item) => stepItem(item))}
        />
      )}
    </Div>
  );
});

StudentDefenseTab.displayName = "StudentDefenseTab";
export default StudentDefenseTab;
