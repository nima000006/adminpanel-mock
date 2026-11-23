import { useEffect } from "react";

import CustomSteps from "@components/Renderers/CustomSteps/CustomSteps";
import Div from "@components/Renderers/Div/Div";
import { selectDefaultValueGenerator, stepStatusCreator } from "@infra/helpers/utils";
import { useLazyGetViewRequestQuery } from "@infra/states/redux/Apis/auth/signInApis";
import { SubmitRequestModalContentProps } from "@pages/Auth/SignIn/FifthPage/helper/drawer/RequestRoleDrawerContent/helper/modals/SubmitRequestModalContent/@types/@submitRequestModalContentTypes";
import CompleteFormStep from "@pages/Auth/SignIn/FifthPage/helper/drawer/RequestRoleDrawerContent/helper/modals/SubmitRequestModalContent/helper/steps/CompleteFormStep/CompleteFormStep";
import UploadDocStep from "@pages/Auth/SignIn/FifthPage/helper/drawer/RequestRoleDrawerContent/helper/modals/SubmitRequestModalContent/helper/steps/UploadDocStep/UploadDocStep";
import { GetViewRequestResponse } from "@pages/Auth/SignIn/FifthPage/helper/drawer/RequestRoleDrawerContent/helper/modals/ViewRequestModalContent/@types/@viewRequestModalContentTypes";
import "./_submitRequestModalContent.scss";

const SubmitRequestModalContent = ({
  form,
  step,
  setFirstImageName,
  setSecondImageName,
  firstImageList,
  setFirstImageList,
  secondImageList,
  setSecondImageList,
  firstStepId,
  submitSecondStepForm,
  id,
  firstImageName,
  secondImageName,
}: SubmitRequestModalContentProps) => {
  //? ================================  Api Calls ================================
  // estelam sajed modal
  const [getData, { isFetching: isGetDataLoading }] = useLazyGetViewRequestQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id > 0) {
      getData({ id: id })
        .unwrap()
        .then((res: GetViewRequestResponse) => {
          form.setFieldsValue({
            branch: selectDefaultValueGenerator({
              id: res.branchId,
              title: res.branchName,
            }),
            personalCode: res?.employeeCode,
            location: res?.organizationTitle,
            position: res?.positionTitle,
            description: res?.description,
          });
          if (res?.files?.[0]) {
            setFirstImageList([
              {
                uid: res?.files?.[0]?.url,
                name: res?.files?.[0]?.url,
                status: "done",
                url: res?.files?.[0]?.url,
              },
            ]);
            setFirstImageName(res?.files?.[0]?.id?.toString());
          }
          if (res?.files?.[1]) {
            setSecondImageList([
              {
                uid: res?.files?.[1]?.url,
                name: res?.files?.[1]?.url,
                status: "done",
                url: res?.files?.[1]?.url,
              },
            ]);
            setSecondImageName(res?.files?.[1]?.id?.toString());
          }
        });
    }
  }, [id]);

  //* ================================ Util Functions ================================
  const stepsItem = [
    {
      id: "1",
      children: <CompleteFormStep form={form} />,
    },
    {
      id: "2",
      children: (
        <UploadDocStep
          setFirstImageName={setFirstImageName}
          setSecondImageName={setSecondImageName}
          firstImageList={firstImageList}
          setFirstImageList={setFirstImageList}
          secondImageList={secondImageList}
          setSecondImageList={setSecondImageList}
          firstStepId={firstStepId}
          submitSecondStepForm={submitSecondStepForm}
          firstImageName={firstImageName}
          secondImageName={secondImageName}
        />
      ),
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="auth-submit-request-modal-container">
      <CustomSteps
        type="navigation"
        current={step}
        items={[
          {
            status: stepStatusCreator(step, 0),
            title: "تکمیل فرم",
          },
          {
            status: stepStatusCreator(step, 1),
            title: "بارگذاری مدارک",
          },
        ]}
      />
      <Div loading={id > 0 ? isGetDataLoading : false}>{stepsItem[step].children}</Div>
    </div>
  );
};
export default SubmitRequestModalContent;
