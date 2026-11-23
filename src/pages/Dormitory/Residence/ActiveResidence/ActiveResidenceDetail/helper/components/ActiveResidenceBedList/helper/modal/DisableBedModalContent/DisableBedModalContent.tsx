import { Col, Form, Row } from "antd";

import { CustomSelect } from "@components/CustomInputs";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetBasicInfoDeactivationReasonsQuery } from "@infra/states/redux/Apis/dormitory/basicInfo/basicInfoApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { BED_TYPE } from "@pages/Dormitory/Residence/ActiveResidence/_shared/util";
import { DisableBedModalContentProps } from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceBedList/helper/modal/DisableBedModalContent/@types/@disableBedModalContentTypes";

const DisableBedModalContent = ({
  disableBed,
  data,
  form,
}: DisableBedModalContentProps) => {
  const bedType = BED_TYPE[data?.bedType?.name as keyof typeof BED_TYPE];
  const Icon = bedType?.icon;

  const { params: url } = useQueryParams();

  //? ================================  Api Calls ================================
  // reason
  const [
    getDeactivationReasons,
    { data: deactivationReasonsData, isFetching: isDeactivationReasonsLoading },
  ] = useLazyGetBasicInfoDeactivationReasonsQuery();

  //* ================================ Util Functions ================================
  const deactivationReasonsHandler = () => {
    getDeactivationReasons({
      pageNumber: url?.page ? Number(url.page) - 1 : 0,
      pageSize: url?.pageSize ? Number(url.pageSize) : 8,
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="mt-5! flex flex-col gap-5">
      {disableBed ? (
        <CustomAlert
          type="warning"
          title="توجه!"
          description="با غیرفعال کردن یکی از طبقات تخت «دوطبقه» یا «سه‌طبقه»، فقط همان طبقه غیرفعال می‌شود و سایر طبقات آن همچنان فعال خواهند بود. همچنین تخت غیرفعال‌شده از برنامه‌های پذیرش مرتبط حذف می‌شود."
          showIcon
        />
      ) : (
        <CustomAlert
          type="warning"
          title="غیر فعالسازی امکان پذیر نمی‌باشد."
          description="به‌دلیل وجود ساکن در این تخت و یا درخواست باز، در حال حاضر امکان غیرفعال‌سازی وجود ندارد. این تخت زمانی قابل غیرفعال‌سازی خواهد بود که هیچ ساکن و یا درخواست بازی وجود نداشته باشد."
          showIcon
        />
      )}

      <div>
        <CustomDivider
          text="تخت انتخاب شده"
          extraContent={
            <div className="flex gap-2">
              {bedType ? (
                <CustomTag className="flex w-fit gap-1" color={bedType.color}>
                  <Icon size={16} />
                  {bedType.label}
                </CustomTag>
              ) : null}

              <CustomTag
                className="w-fit"
                color={data?.occupancy?.title === "بدون ساکن" ? "default" : "green"}
              >
                {data?.occupancy?.title}
              </CustomTag>
            </div>
          }
        />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            md={12}
            xl={12}
            lg={12}
            label="کد تخت"
            value={dataPlaceHolder({
              data: data?.bedNumber ?? undefined,
            })}
          />
          <SingleVerticalWithCol
            md={12}
            xl={12}
            lg={12}
            label="عنوان تخت"
            value={dataPlaceHolder({
              data: data?.title ?? undefined,
            })}
          />
          <SingleVerticalWithCol
            md={12}
            xl={12}
            lg={12}
            label="موقعیت تخت"
            value={dataPlaceHolder({
              data: data?.bedPosition?.title ?? undefined,
            })}
          />
        </Row>
      </div>
      {disableBed ? (
        <Form form={form} className="flex flex-col gap-5">
          <Row>
            <Col span={24}>
              <CustomSelect
                name="reason"
                label="دلیل غیر فعالسازی"
                placeholder="انتخاب کنید"
                options={deactivationReasonsData?.content?.map((item) => ({
                  id: item.uuid,
                  title: item.title,
                }))}
                loading={isDeactivationReasonsLoading}
                rules={[REQUIRED_RULE]}
                onClick={deactivationReasonsHandler}
                form={form}
              />
            </Col>
          </Row>
        </Form>
      ) : null}
    </div>
  );
};
export default DisableBedModalContent;
