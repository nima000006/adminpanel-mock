import { useEffect, useState } from "react";

import { Col, Row } from "antd";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import { makeSearchParams } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORM_MODIFY_Building_PAGE_ROUTE } from "@infra/router/routes/dorm";
import { useLazyGetDormResidenceBuildingListQuery } from "@infra/states/redux/Apis/dorm/residence/dormResidenceApi";

import {
  GetDormResidenceBuildingListResponse,
  GetDormResidenceBuildingListTypes,
} from "./@types/@residenceCardsDataBuilding";
import DormBuildingSingleCard from "../../../SingleCards/DormBuildingSingleCard/DormBuildingSingleCard";

const ResidenceCardsDataBuilding = () => {
  const [buildingList, setBuildingList] = useState<GetDormResidenceBuildingListTypes[]>(
    []
  );

  const { params: url } = useQueryParams();
  const navigate = useNavigate();

  //? ================================  Api Calls ================================
  const [getBuildingList, { isFetching: isBuildingListLoading }] =
    useLazyGetDormResidenceBuildingListQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (url?.id) {
      getBuildingList({ dormitoryId_IN: +url?.id, firstResult: 0, maxResults: 2000 }) //we should set 0 and 2000 to get data
        .unwrap()
        .then(getBuildingListSuccess);
    }
  }, []);

  //* ================================ Util Functions ================================
  const getBuildingListSuccess = (value: GetDormResidenceBuildingListResponse) => {
    if (value?.status === 200) {
      setBuildingList(value?.data);
    }
  };
  const createBuildingHandler = () => {
    navigate({
      pathname: DORM_MODIFY_Building_PAGE_ROUTE,
      search: makeSearchParams({ ...url }),
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <Div loading={isBuildingListLoading} className="building-section-container">
      <CustomDivider
        text="ساختمان‌ها"
        extraContent={
          buildingList?.length !== 0 && (
            <div className="action-count-container">
              <CustomTag># تعداد: {buildingList?.length}</CustomTag>
              <CustomButton
                type="primary"
                icon={<AiOutlinePlus />}
                iconPlacement="end"
                onClick={createBuildingHandler}
                disabled={url?.statusBtn !== "2"}
              >
                افزودن ساختمان
              </CustomButton>
            </div>
          )
        }
      />
      {buildingList?.length === 0 ? (
        <CustomEmpty
          description={
            <div className="text-btn-container">
              <p className="bold-text">هنوز ساختمانی ایجاد نکرده‌اید!</p>
              <CustomButton
                type="primary"
                icon={<AiOutlinePlus />}
                iconPlacement="end"
                onClick={createBuildingHandler}
              >
                ایجاد ساختمان
              </CustomButton>
            </div>
          }
        />
      ) : (
        <Row gutter={[24, 16]}>
          {buildingList?.map((item) => (
            <Col lg={6} md={8} sm={12} xs={24} key={item?.id}>
              <DormBuildingSingleCard data={item} />
            </Col>
          ))}
        </Row>
      )}
    </Div>
  );
};

export default ResidenceCardsDataBuilding;
