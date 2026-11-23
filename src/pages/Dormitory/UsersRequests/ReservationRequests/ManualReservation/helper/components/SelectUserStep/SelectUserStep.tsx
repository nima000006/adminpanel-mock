import { useEffect, useState } from "react";

import { Descriptions, Form, UploadFile } from "antd";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { PiUserCircle } from "react-icons/pi";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomRadioGroup from "@components/CustomInputs/CustomRadioGroup/CustomRadioGroup";
import CustomSearchBox from "@components/CustomInputs/CustomSearchBox/CustomSearchBox";
import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORMITORY_USER_REQUESTS_RESERVATION_REQUESTS_PAGE_ROUTE } from "@infra/router/routes/dormitory";
import { CUSTOM_REQUIRED_RULE } from "@infra/validation/validationSchema";

import {
  EmployeeRoleType,
  ManualReservationUserType,
  SelectUserFormType,
  StudentRoleType,
} from "./@types/@selectUserStep";
import { MANUAL_RESERVATION_MOCK_USERS } from "../../mock/manualReservationUsers";
import UserRoleCard from "./helper/components/UserRoleCard/UserRoleCard";
import { filterManualReservationUsersByNationalCode } from "./helper/utils";
import "./_selectUserStep.scss";

const USER_NOT_FOUND_MSG = "کاربری با این کد ملی/فراگیر یافت نشد.";
const SELECT_ROLE_REQUIRED_MSG = "لطفا یک گروه کاربری را انتخاب کنید.";

//? ================================ utils ================================

const getFirstSelectableRoleId = (users: ManualReservationUserType[]) => {
  for (const user of users) {
    if (user.studentRoles[0]?.id) {
      return user.studentRoles[0].id;
    }
    if (user.employeeRoles[0]?.id) {
      return user.employeeRoles[0].id;
    }
  }
  return undefined;
};

const buildStudentRoleOptions = (roles: StudentRoleType[]) =>
  roles.map((role) => ({
    value: role.id,
    label: <UserRoleCard role={role} variant="student" />,
  }));

const buildEmployeeRoleOptions = (roles: EmployeeRoleType[]) =>
  roles.map((role) => ({
    value: role.id,
    label: <UserRoleCard role={role} variant="employee" />,
  }));

//? ================================ Main Component ================================
const SelectUserStep = () => {
  const [form] = Form.useForm<SelectUserFormType>();
  const navigate = useNavigate();
  const { params, setSearchParams } = useQueryParams();
  const [displayedUsers, setDisplayedUsers] = useState<ManualReservationUserType[]>(
    MANUAL_RESERVATION_MOCK_USERS
  );
  const [avatarFileList] = useState<UploadFile[]>([]);
  const selectedRoleId = Form.useWatch("selectedRoleId", form);

  //? ================================ Effects ================================

  useEffect(() => {
    form.setFieldValue(
      "selectedRoleId",
      getFirstSelectableRoleId(MANUAL_RESERVATION_MOCK_USERS)
    );
  }, []);

  //* ================================ Util Functions ================================

  const cancelClickHandler = () => {
    navigate(DORMITORY_USER_REQUESTS_RESERVATION_REQUESTS_PAGE_ROUTE);
  };

  const applyDisplayedUsers = (users: ManualReservationUserType[]) => {
    setDisplayedUsers(users);
    form.setFieldValue("selectedRoleId", getFirstSelectableRoleId(users));
  };

  const searchClickHandler = (searchValue?: string) => {
    const nationalCode = String(
      searchValue ?? form.getFieldValue("nationalCode") ?? ""
    ).trim();

    if (!nationalCode) {
      applyDisplayedUsers(MANUAL_RESERVATION_MOCK_USERS);
      return;
    }

    const filteredUsers = filterManualReservationUsersByNationalCode(
      MANUAL_RESERVATION_MOCK_USERS,
      nationalCode
    );

    if (filteredUsers.length === 0) {
      applyDisplayedUsers([]);
      return;
    }

    applyDisplayedUsers(filteredUsers);
  };

  const roleChangeHandler = (roleId: string) => {
    form.setFieldValue("selectedRoleId", roleId);
  };

  const submitClickHandler = async () => {
    if (displayedUsers.length === 0) {
      toast.error(USER_NOT_FOUND_MSG, { toastId: USER_NOT_FOUND_MSG });
      return;
    }

    const { selectedRoleId: roleId } = await form.validateFields(["selectedRoleId"]);
    const selectedUser = displayedUsers.find(
      (user) =>
        user.studentRoles.some((role) => role.id === roleId) ||
        user.employeeRoles.some((role) => role.id === roleId)
    );
    const {
      residenceName: _residenceName,
      allocationSummary: _allocationSummary,
      payableAmount: _payableAmount,
      ...restParams
    } = params;

    setSearchParams({
      ...restParams,
      step: "2",
      ...(selectedUser?.fullName ? { userName: selectedUser.fullName } : {}),
    });
  };

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={form} layout="vertical" onFinish={submitClickHandler}>
      <Div className="flex flex-col gap-6">
        <p className="h5-medium text-right">ابتدا کاربر را جستجو و انتخاب نمایید.</p>

        <div className="w-full max-w-[70%]">
          <CustomSearchBox<SelectUserFormType>
            urlKey="nationalCode"
            mode="client"
            placeholder="جستجوی کدملی/فراگیر"
            form={form}
            hasUrlSync={false}
            className="mb-0"
            onChange={searchClickHandler}
            onPressEnter={() => searchClickHandler()}
          />
        </div>

        <CustomInput
          name="selectedRoleId"
          rules={[CUSTOM_REQUIRED_RULE(SELECT_ROLE_REQUIRED_MSG)]}
          className="mb-0!"
          hidden
        />

        {displayedUsers.length === 0 ? (
          <div className="flex w-full max-w-[70%] items-center gap-2">
            <p className="text-neutral-11 h5-medium m-0">
              کاربری با این کد ملی یافت نشد.
            </p>
            <CustomButton
              type="link"
              disabled
              className="text-neutral-6! body-regular h-8 max-h-8 min-h-8 px-0"
            >
              ثبت نام کاربر
            </CustomButton>
          </div>
        ) : (
          displayedUsers.map((user) => (
            <div
              key={user.id}
              className="border-neutral-4 bg-neutral-1 flex w-full max-w-[70%] flex-col gap-4 rounded-lg border p-4"
            >
              <CustomDivider
                text={
                  <span className="inline-flex items-center gap-2">
                    <PiUserCircle size={20} className="text-neutral-10" />
                    اطلاعات کاربر
                  </span>
                }
              />

              <div className="flex w-full flex-wrap items-center gap-4 md:flex-nowrap">
                <div className="shrink-0">
                  <CustomUploader
                    fileList={avatarFileList}
                    setFileList={() => {}}
                    isReadOnly
                    hasUploaderIcon={false}
                    hasNullText
                    uploaderText="عکس پرسنلی"
                  />
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <p className="text-neutral-12 h4-medium m-0 text-start">
                    {dataPlaceHolder({ data: user.fullName })}
                  </p>

                  <Descriptions
                    column={1}
                    colon={false}
                    className="[&_.ant-descriptions-item]:pb-0! [&_.ant-descriptions-row:last-child>td]:pb-0! [&_.ant-descriptions-row>td]:pb-2!"
                    styles={{
                      label: {
                        color: "var(--neutral-7)",
                        width: 120,
                        textAlign: "start",
                      },
                      content: {
                        color: "var(--neutral-10)",
                        textAlign: "start",
                      },
                    }}
                    items={[
                      {
                        key: "phone",
                        label: "شماره تماس",
                        children: (
                          <span dir="ltr">
                            {dataPlaceHolder({
                              data: user.phoneNumber,
                            })}
                          </span>
                        ),
                      },
                      {
                        key: "birthDate",
                        label: "تاریخ تولد",
                        children: dataPlaceHolder({
                          data: user.birthDate,
                          isDate: true,
                          customDateFormat: "YYYY/MM/DD",
                        }),
                      },
                      {
                        key: "nationalCode",
                        label: "کد ملی / فراگیر",
                        children: (
                          <span className="text-neutral-12 body-medium">
                            {dataPlaceHolder({ data: user.nationalCode })}
                          </span>
                        ),
                      },
                    ]}
                  />
                </div>
              </div>

              {user.studentRoles.length > 0 && (
                <div className="flex w-full flex-col gap-4">
                  <CustomDivider text="گروه کاربری دانشجو" />
                  <CustomRadioGroup
                    value={selectedRoleId}
                    onChange={(e) => roleChangeHandler(e.target.value)}
                    options={buildStudentRoleOptions(user.studentRoles)}
                    containerClassName="select-user-role-radio w-full [&_.ant-form-item]:mb-0 [&_.ant-form-item-control]:w-full! [&_.ant-radio-group]:w-full"
                    radioClassName="w-full"
                    className="mb-0!"
                  />
                </div>
              )}

              {user.employeeRoles.length > 0 && (
                <div className="flex w-full flex-col gap-4">
                  <CustomDivider text="گروه کاربری کارمند" />
                  <CustomRadioGroup
                    value={selectedRoleId}
                    onChange={(e) => roleChangeHandler(e.target.value)}
                    options={buildEmployeeRoleOptions(user.employeeRoles)}
                    containerClassName="select-user-role-radio w-full [&_.ant-form-item]:mb-0 [&_.ant-form-item-control]:w-full! [&_.ant-radio-group]:w-full"
                    radioClassName="w-full"
                    className="mb-0!"
                  />
                </div>
              )}
            </div>
          ))
        )}

        <div className="flex items-center justify-end gap-4">
          <CustomButton onClick={cancelClickHandler}>انصراف</CustomButton>
          <CustomButton
            type="primary"
            htmlType="submit"
            icon={<AiOutlineArrowLeft />}
            iconPlacement="end"
          >
            ثبت و ادامه
          </CustomButton>
        </div>
      </Div>
    </Form>
  );
};

export default SelectUserStep;
