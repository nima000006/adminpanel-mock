import { useEffect, useState } from "react";

import { Tabs } from "antd";
import { Link } from "react-router";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORM_ADMISSIONS_LIST_PAGE_ROUTE } from "@infra/router/routes/dorm";
import { useGetAdmissionDetailBaseInfoMutation } from "@infra/states/redux/Apis/dorm/planning/admission/admissionApi";

import AdmissionDetailInactiveBaseInfoTab from "./helpers/AdmissionDetailInactiveBaseInfoTab/AdmissionDetailInactiveBaseInfoTab";
import AdmissionDetailInactiveLevelsOfAction from "./helpers/AdmissionDetailInactiveLevelsOfAction/AdmissionDetailInactiveLevelsOfAction";
import AdmissionDetailInactiveTariff from "./helpers/AdmissionDetailInactiveTariff/AdmissionDetailInactiveTariff";
import { AdmissionDetailBaseInfo } from "../AdmissionDetailActive/helpers/AdmissionDetailActiveBaseInfoTab/@types/@admissionDetailActiveBaseInfoTab";
import "./_admissionDetailInactive.scss";

const AdmissionDetailInactive = () => {
  const { params } = useQueryParams<{ id: string; title: string }>();
  const { id, title } = params;

  const [dataSource, setDataSource] = useState<AdmissionDetailBaseInfo | null>(null);

  //? ================================  Api Calls ================================

  const [getAdmissionDetailBaseInfo, { isLoading: isAdmissionDetailBaseInfoLoading }] =
    useGetAdmissionDetailBaseInfoMutation();
  //? ================================ Effects ================================

  useEffect(() => {
    if (id) {
      getAdmissionDetailBaseInfo({ _data_: { id } })
        .unwrap()
        .then((res) => {
          if (res?.status === 200) {
            setDataSource(res?.data);
          }
        });
    }
  }, [id]);

  useTitle({
    breadcrumbItems: [
      { title: <Link to={DORM_ADMISSIONS_LIST_PAGE_ROUTE}>برنامه پذیرش‌ها</Link> },
      ...(title ? [{ title }] : []),
    ],
  });

  const tabs = [
    {
      label: "اطلاعات اولیه",
      children: (
        <AdmissionDetailInactiveBaseInfoTab
          dataSource={dataSource}
          loading={isAdmissionDetailBaseInfoLoading}
        />
      ),
      key: "1",
    },
    {
      label: "سطوح اعمال",
      children: (
        <AdmissionDetailInactiveLevelsOfAction
          deactivationDate={dataSource?.deactivationDate}
        />
      ),
      key: "2",
    },
    {
      label: "تعرفه",
      children: <AdmissionDetailInactiveTariff />,
      key: "3",
    },
    // {
    //   label: "تاریخچه تغییرات",
    //   children: (
    //     <AdmissionDetailInactiveChangeHistory
    //       deactivationDate={dataSource?.deactivationDate}
    //     />
    //   ),
    //   key: "4",
    // },
  ];

  return (
    <div>
      <Tabs
        items={tabs}
        className="admission-detail-active-page-tab-container"
        type="card"
      />
    </div>
  );
};

export default AdmissionDetailInactive;
