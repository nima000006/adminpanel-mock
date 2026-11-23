import { useEffect } from "react";

import { Modal } from "antd";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import { useMyStudentListByAdvanceFilterMutation } from "@infra/states/redux/Apis/management/usersList/usersListApi";
import { OtherStudentNumberListModalProps } from "@pages/management/Requests/EstelamAmozeshyar/MyEstelamAmozeshyar/MyEstelamAmozeshyarDetail/helper/components/EstelamAmozeshyarDetailInfo/helper/Modals/OtherStudentNumberListModal/@types/@otherStudentNumberListModal";
import OtherStudentNumberTableModel from "@pages/management/Requests/EstelamAmozeshyar/MyEstelamAmozeshyar/MyEstelamAmozeshyarDetail/helper/components/EstelamAmozeshyarDetailInfo/helper/Modals/OtherStudentNumberListModal/helper/Models/OtherStudentNumber/OtherStudentNumberTableModel";
import { ManagementUserWithStudentInfo } from "@pages/management/StudentList/MyStudentList/@types/@managementMyStudentsListTypes";

const OtherStudentNumberListModal = ({
  open,
  close,
  nationalCode,
}: OtherStudentNumberListModalProps) => {
  //? ================================  Api Calls ================================
  const [advanceFilter, { data, isLoading: isAdvanceFilterLoading }] =
    useMyStudentListByAdvanceFilterMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (open) {
      advanceFilter({
        pageNumber: 0,
        pageSize: 100,
        username: nationalCode,
      });
    }
  }, [nationalCode]);

  return (
    <Modal
      title="لیست شماره‌های دانشجویی دیگر"
      centered
      open={open}
      onCancel={close}
      width={700}
      footer={null}
    >
      <CustomTable<ManagementUserWithStudentInfo>
        className="management-student-list-table-container"
        dataSource={data?.content || []}
        columns={OtherStudentNumberTableModel()}
        loading={isAdvanceFilterLoading}
        pagination={paginationConfig}
        rowKey="userStaffId"
      />
    </Modal>
  );
};

export default OtherStudentNumberListModal;
