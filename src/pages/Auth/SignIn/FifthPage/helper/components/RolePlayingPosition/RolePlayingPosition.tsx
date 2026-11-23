import { useEffect, useState } from "react";

import { Col, Row } from "antd";

import Div from "@components/Renderers/Div/Div";
import { emptyString } from "@infra/config/global.vars";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { useLazySignInGetAdminStaffQuery } from "@infra/states/redux/Apis/auth/signInApis";

import { ROLE_STATUS } from "../../../SignInFifthPage";
import RoleCard from "../RoleCard/RoleCard";

import "./_rolePlayingPosition.scss";

type RolePlayingPositionProps = {
  activeItem: number | null;
  setActiveItem: React.Dispatch<React.SetStateAction<number | null>>;
  status: number;
  isReEstelamSajedApiCall: boolean;
  isReEstelamSajedLoading: boolean;
  setIsReEstelamSajedApiCall: React.Dispatch<React.SetStateAction<boolean>>;
};

const RolePlayingPosition = ({
  activeItem,
  setActiveItem,
  status,
  isReEstelamSajedApiCall,
  isReEstelamSajedLoading,
  setIsReEstelamSajedApiCall,
}: RolePlayingPositionProps) => {
  const [isWaitingForRefresh, setIsWaitingForRefresh] = useState(false);

  // GET ADMIN STAFF LIST
  const [getAdminStaff, { isFetching: isGetAdminStaffLoading, data }] =
    useLazySignInGetAdminStaffQuery();

  //? ================================ Effects ================================
  // EFFECTS
  useEffect(() => {
    getAdminStaff({ status });
  }, [status]);

  useEffect(() => {
    if (!isReEstelamSajedApiCall) return;

    setIsWaitingForRefresh(true);

    const timer = setTimeout(async () => {
      await getAdminStaff({ status });
      setIsWaitingForRefresh(false);
      setIsReEstelamSajedApiCall(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [isReEstelamSajedApiCall, status]);

  //* ================================ Util Functions ================================

  const activeItemHandler = (id: number) => {
    if (status !== ROLE_STATUS.hasRole) return;
    setActiveItem(id);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div
      loading={isGetAdminStaffLoading || isReEstelamSajedLoading || isWaitingForRefresh}
    >
      <Row gutter={[16, 16]}>
        {data?.map((item) => {
          // content
          const content = (
            <div className="role-popOverContent">
              <div>
                <div className="title">نام واحد دانشگاهی</div>
                <div>{dataPlaceHolder({ data: item?.branchName })}</div>
              </div>
              <div>
                <div className="title">نام دانشکده / دپارتمان</div>
                <div>{emptyString}</div>
              </div>
            </div>
          );

          return (
            <Col
              lg={8}
              md={12}
              sm={24}
              xs={24}
              key={item.id}
              onClick={() => activeItemHandler(item?.id)}
              className="role-play-card-container"
            >
              <RoleCard
                value={item?.id}
                id={item?.id}
                recordStatusId={item?.recordStatus?.id}
                title={item?.employeeDetails?.[0]?.title ?? "-"}
                personalNumber={item?.employeeDetails?.[0]?.code ?? "-"}
                branchName={item?.branchName ?? "-"}
                isActive={activeItem === item?.id}
                popoverContent={content}
                segmentStatus={status}
                requestId={item?.requestId}
                getAdminStaff={getAdminStaff}
              />
            </Col>
          );
        })}
      </Row>
    </Div>
  );
};

export default RolePlayingPosition;
