import { useEffect } from "react";

import { Col, Row } from "antd";
import moment from "jalali-moment";
import { PiPencilLine, PiSealCheck } from "react-icons/pi";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { emptyString } from "@infra/config/global.vars";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { useLazyManagementMyStaffInfoIdentityInfoListsQuery } from "@infra/states/redux/Apis/management/usersList/usersListApi";

import { ManagementMyStaffInfoIdentityInfoListResponse } from "../ManagementMyDetailsInfoIdentityInfo/@types/@managementMyDetailsInfoIdentityInfo";
import "./_managementMyDetailsJobInfo.scss";

const ManagementMyDetailsJobInfo = ({ staffId }: { staffId: number | undefined }) => {
  //? ================================ API ================================
  const [getUsersCustomersInfo, { data, isLoading: isGetUsersCustomersInfoLoading }] =
    useLazyManagementMyStaffInfoIdentityInfoListsQuery();

  const userData: ManagementMyStaffInfoIdentityInfoListResponse | undefined = data;

  //? ================================ Effects ================================
  useEffect(() => {
    if (staffId) {
      getUsersCustomersInfo({ staffId });
    }
  }, [staffId, getUsersCustomersInfo]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <Div
      loading={isGetUsersCustomersInfoLoading}
      className="management-all-detail-job-container"
    >
      <CustomDivider text="اطلاعات شغلی" />

      {userData?.staff?.admin?.id ? (
        userData.staff.admin.employeeDtos.map((emp, idx) => (
          <Row gutter={[16, 16]} key={emp.id || idx}>
            <Col span={24}>
              <CustomDivider
                className="custom-divider"
                text={<span>{dataPlaceHolder({ data: emp?.positionTitle })}</span>}
                extraContent={
                  <div className="flex gap-2">
                    {idx === 0 && (
                      <CustomButton disabled icon={<PiPencilLine />}>
                        ویرایش
                      </CustomButton>
                    )}

                    <CustomButton disabled type="primary" icon={<PiSealCheck />}>
                      استعلام
                    </CustomButton>
                  </div>
                }
              />
            </Col>
            <SingleVerticalWithCol
              value={userData?.staff?.admin?.branchName}
              label="سازمان/ واحد محل فعالیت"
            />
            <SingleVerticalWithCol value={emp?.serviceName} label="محل خدمت" />
            <SingleVerticalWithCol value={emp?.positionTitle} label="سمت شغلی" />
            <SingleVerticalWithCol value={emp?.employCode} label="کد پرسنلی" />
            <SingleVerticalWithCol value={emptyString} label="نوع استخدام" />
            <SingleVerticalWithCol
              value={
                emp?.createLocalDateTime
                  ? moment(emp?.createLocalDateTime, "YYYY-MM-DDTHH:mm:ss").isValid()
                    ? moment(emp?.createLocalDateTime, "YYYY-MM-DDTHH:mm:ss").format(
                        "jYYYY/jMM/jDD HH:mm"
                      )
                    : "-"
                  : "-"
              }
              label="تاریخ آخرین استعلام"
            />
            <SingleVerticalWithCol
              value={
                emp.recordStatus === 1
                  ? "شاغل"
                  : emp.recordStatus === 0
                    ? "غیر شاغل"
                    : "-"
              }
              label="وضعیت اشتغال"
            />
          </Row>
        ))
      ) : (
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <CustomDivider
              className="custom-divider"
              text={
                <span>
                  {dataPlaceHolder({ data: userData?.staff?.employee?.positionTitle })}
                </span>
              }
              extraContent={
                <div className="flex gap-2">
                  <CustomButton disabled icon={<PiPencilLine />}>
                    ویرایش
                  </CustomButton>
                  <CustomButton disabled type="primary" icon={<PiSealCheck />}>
                    استعلام
                  </CustomButton>
                </div>
              }
            />
          </Col>

          <SingleVerticalWithCol
            value={userData?.staff?.employee?.organizationTitle}
            label="سازمان/ واحد محل فعالیت"
          />
          <SingleVerticalWithCol
            value={userData?.staff?.employee?.branchName}
            label="محل خدمت"
          />
          <SingleVerticalWithCol
            value={userData?.staff?.employee?.positionTitle}
            label="سمت شغلی"
          />
          <SingleVerticalWithCol
            value={userData?.staff?.employee?.employeeCode}
            label="کد پرسنلی"
          />
          <SingleVerticalWithCol value={emptyString} label="نوع استخدام" />
          <SingleVerticalWithCol
            value={
              userData?.staff?.employee?.createdDateTime
                ? moment(
                    userData?.staff?.employee?.createdDateTime,
                    "YYYY-MM-DDTHH:mm:ss"
                  ).isValid()
                  ? moment(
                      userData?.staff?.employee?.createdDateTime,
                      "YYYY-MM-DDTHH:mm:ss"
                    ).format("jYYYY/jMM/jDD HH:mm")
                  : "-"
                : "-"
            }
            label="تاریخ آخرین استعلام"
          />
          <SingleVerticalWithCol
            value={
              userData?.staff?.employee?.recordStatus === 1
                ? "شاغل"
                : userData?.staff?.employee?.recordStatus === 0
                  ? "غیر شاغل"
                  : "-"
            }
            label="وضعیت اشتغال"
          />
        </Row>
      )}
    </Div>
  );
};
export default ManagementMyDetailsJobInfo;
