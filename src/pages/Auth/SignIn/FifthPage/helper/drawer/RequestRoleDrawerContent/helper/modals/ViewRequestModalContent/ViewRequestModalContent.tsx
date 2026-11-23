import { useEffect, useState } from "react";

import { Col, Row } from "antd";

import { CustomTextArea, CustomUploader } from "@components/CustomInputs";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { useLazyGetViewRequestQuery } from "@infra/states/redux/Apis/auth/signInApis";
import { GetViewRequestResponse } from "@pages/Auth/SignIn/FifthPage/helper/drawer/RequestRoleDrawerContent/helper/modals/ViewRequestModalContent/@types/@viewRequestModalContentTypes";
import { CONFIRMED, WAITING_REVIEW } from "@pages/Auth/SignIn/FifthPage/helper/utils";
import "./_viewRequestModalContent.scss";

const ViewRequestModalContent = ({ id }: { id: number }) => {
  const [data, setData] = useState<GetViewRequestResponse>();
  //? ================================  Api Calls ================================
  // estelam sajed modal
  const [getData, { isFetching: isGetDataLoading }] = useLazyGetViewRequestQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getData({ id: id })
      .unwrap()
      .then((res: GetViewRequestResponse) => {
        setData(res);
      });
  }, [id]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div
      loading={isGetDataLoading}
      className="auth-view-request-modal-content-container flex-col gap-6"
    >
      <div className="mb-6 flex justify-between">
        <span>{`${data?.id}#`}</span>
        <span>
          {dataPlaceHolder({
            data: data?.createdDate,
            isDate: true,
            customDateFormat: "HH:mm، YYYY-MM-DD",
          })}
        </span>
      </div>

      {data?.accessRequestsStatus?.id === WAITING_REVIEW ? (
        <CustomAlert
          type="warning"
          title="در انتظار بررسی!"
          description="درخواست شما برای بررسی به کارشناسان دانشجویار ارسال شده. لطفاً کمی صبور باشید."
          showIcon
        />
      ) : data?.accessRequestsStatus?.id === CONFIRMED ? (
        <CustomAlert
          type="success"
          title="تایید درخواست!"
          description="درخواست شما توسط کارشناس مربوطه تایید شد."
          showIcon
        />
      ) : (
        <CustomAlert
          type="error"
          title="رد درخواست!"
          description={dataPlaceHolder({ data: data?.rejectReasonDescription })}
          showIcon
        />
      )}

      <div>
        <CustomDivider text="فرم پر شده" />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            xl={12}
            lg={12}
            md={12}
            sm={24}
            label="شماره پرسنلی"
            value={data?.employeeCode}
          />
          <SingleVerticalWithCol
            xl={12}
            lg={12}
            md={12}
            sm={24}
            label="سازمان/ واحد محل فعالیت"
            value={data?.branchName}
          />
          <SingleVerticalWithCol
            xl={12}
            lg={12}
            md={12}
            sm={24}
            label="محل خدمت"
            value={data?.organizationTitle}
          />
          <SingleVerticalWithCol
            xl={12}
            lg={12}
            md={12}
            sm={24}
            label="سمت"
            value={data?.positionTitle}
          />

          <Col span={24}>
            <CustomTextArea label="توضیحات" value={data?.description} disabled />
          </Col>
        </Row>
      </div>

      <div className="upload-wrapper">
        <CustomDivider text="فایل‌های بارگذاری شده" />
        <Row gutter={[16, 16]}>
          {data?.files.map((item) => (
            <Col>
              <CustomUploader
                fileList={
                  item?.url
                    ? [
                        {
                          uid: String(item.id),
                          name: item.url,
                          url: item.url,
                          status: "done" as const,
                        },
                      ]
                    : []
                }
                setFileList={() => {}}
                isReadOnly
                hasUploaderIcon={false}
                classNameOuterDiv="!h-auto"
              />
            </Col>
          ))}
        </Row>
      </div>
    </Div>
  );
};
export default ViewRequestModalContent;
