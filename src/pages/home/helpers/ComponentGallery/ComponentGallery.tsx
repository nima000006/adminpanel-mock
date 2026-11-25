import { useState } from "react";

import { Col, Form, Row } from "antd";
import { BsEye } from "react-icons/bs";
import { PiCheckCircle, PiPencilLine, PiUser } from "react-icons/pi";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomDropdown from "@components/CustomInputs/CustomDropdown/CustomDropdown";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomRangePicker from "@components/CustomInputs/CustomRangePicker/CustomRangePicker";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomInputNumber from "@components/CustomInputs/InputNumber/CustomInputNumber";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import { CustomChart } from "@components/Renderers/CustomChart";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import DynamicFormRows from "@components/Renderers/CustomForm/CustomDynamicFormRows/CustomDynamicFormRows";
import CustomPagination from "@components/Renderers/CustomPagination/CustomPagination";
import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import IconTab from "@components/Renderers/IconTab/IconTab";
import MenuActionPopover from "@components/Renderers/MenuActionPopover/MenuActionPopover";
import { MultiViewCalendar } from "@components/Renderers/MultiViewCalendar";
import type { CalendarEvent } from "@components/Renderers/MultiViewCalendar";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

import "./_componentGallery.scss";

type PreviewCardProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  wide?: boolean;
};

const selectOptions = [
  { id: 1, title: "دانشگاه تهران" },
  { id: 2, title: "دانشگاه اصفهان" },
  { id: 3, title: "دانشگاه شیراز" },
];

const calendarEvents: CalendarEvent[] = [
  {
    id: "calendar-1",
    title: "جلسه بررسی درخواست‌ها",
    date: "2026-11-25",
    startTime: "09:00",
    endTime: "10:30",
    color: "#1677ff",
  },
  {
    id: "calendar-2",
    title: "ارائه گزارش مالی",
    date: "2026-11-25",
    startTime: "11:00",
    endTime: "12:00",
    color: "#52c41a",
  },
  {
    id: "calendar-3",
    title: "جلسه هفتگی تیم",
    startTime: "14:00",
    endTime: "15:00",
    recurring: {
      type: "weekly",
      dayOfWeek: 4,
      startDate: "2026-11-01",
      endDate: "2027-01-31",
    },
    color: "#fa8c16",
  },
];

const PreviewIcon = ({ fillColor }: { fillColor?: string }) => (
  <PiUser color={fillColor} size={28} />
);

const PreviewCard = ({
  title,
  description,
  children,
  wide = false,
}: PreviewCardProps) => (
  <section
    className={`component-preview-card ${wide ? "component-preview-card-wide" : ""}`}
  >
    <div className="component-preview-heading">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
    <div className="component-preview-content">{children}</div>
  </section>
);

const ComponentGallery = () => {
  const [form] = Form.useForm();
  const [buttonMessage, setButtonMessage] = useState("برای آزمایش، یک دکمه را بزنید.");
  const [selectedSegment, setSelectedSegment] = useState<string | number>("active");
  const [activeTab, setActiveTab] = useState("profile");
  const [currentPage, setCurrentPage] = useState(1);
  const [actionMessage, setActionMessage] = useState("هنوز عملیاتی انتخاب نشده است.");
  const [formValues, setFormValues] = useState<Record<string, unknown>>(
    form.getFieldsValue()
  );

  const dropdownItems = {
    items: [
      {
        key: "excel",
        label: "خروجی اکسل",
        onClick: () => setActionMessage("خروجی اکسل با داده آزمایشی آماده شد."),
      },
      {
        key: "pdf",
        label: "خروجی PDF",
        onClick: () => setActionMessage("خروجی PDF با داده آزمایشی آماده شد."),
      },
    ],
  };

  const actionItems = [
    {
      id: 1,
      Icon: BsEye,
      title: "مشاهده",
      onclick: () => setActionMessage("رکورد آزمایشی مشاهده شد."),
    },
    {
      id: 2,
      Icon: PiPencilLine,
      title: "ویرایش",
      onclick: () => setActionMessage("رکورد آزمایشی وارد حالت ویرایش شد."),
    },
  ];

  return (
    <section className="component-gallery" aria-labelledby="component-gallery-title">
      <div className="component-gallery-header">
        <div>
          <h2 id="component-gallery-title">پیش‌نمایش اجزای مشترک</h2>
          <p>
            همه اجزای مستندشده در مسیر docs/components با داده آزمایشی و رفتار قابل اجرا
          </p>
        </div>
        <CustomTag color="processing">۲۴ پیش‌نمایش تعاملی</CustomTag>
      </div>

      <Form
        form={form}
        layout="vertical"
        initialValues={{
          fullName: "علی محمدی",
          studentNumber: 14051234,
          university: 1,
          description: "این متن برای آزمایش فرم و جریان داده ثبت شده است.",
          meetingDate: "2026-11-24",
          dateRange: ["2026-11-24", "2026-12-01"],
          dynamicRows: [
            { title: "بررسی درخواست", university: 1 },
            { title: "تایید نهایی", university: 2 },
          ],
        }}
        onValuesChange={(_, values) => setFormValues(values)}
      >
        <CustomDivider text="ورودی‌ها و عملیات" />
        <div className="component-preview-grid">
          <PreviewCard
            title="CustomButton"
            description="حالت‌های اصلی، خط‌چین، هشدار و غیرفعال"
          >
            <div className="component-preview-row">
              <CustomButton
                type="primary"
                onClick={() => setButtonMessage("عملیات اصلی با موفقیت اجرا شد.")}
              >
                عملیات اصلی
              </CustomButton>
              <CustomButton
                type="dashed"
                onClick={() => setButtonMessage("عملیات خط‌چین اجرا شد.")}
              >
                خط‌چین
              </CustomButton>
              <CustomButton
                isWarning
                onClick={() => setButtonMessage("عملیات هشدار اجرا شد.")}
              >
                هشدار
              </CustomButton>
              <CustomButton disabled>غیرفعال</CustomButton>
            </div>
            <span className="component-preview-feedback">{buttonMessage}</span>
          </PreviewCard>

          <PreviewCard
            title="CustomDropdown"
            description="منوی خروجی با دو جریان آزمایشی"
          >
            <CustomDropdown items={dropdownItems} trigger={["click"]}>
              <CustomButton type="dashed">انتخاب نوع خروجی</CustomButton>
            </CustomDropdown>
            <span className="component-preview-feedback">{actionMessage}</span>
          </PreviewCard>

          <PreviewCard title="CustomInput" description="ورودی متنی متصل به فرم">
            <CustomInput
              name="fullName"
              label="نام و نام خانوادگی"
              placeholder="نام را وارد کنید"
            />
          </PreviewCard>

          <PreviewCard title="CustomInputNumber" description="ورودی عددی با داده اولیه">
            <CustomInputNumber
              name="studentNumber"
              label="شماره دانشجویی"
              placeholder="شماره را وارد کنید"
              min={1}
            />
          </PreviewCard>

          <PreviewCard title="CustomSelect" description="گزینه‌های آزمایشی قابل جستجو">
            <CustomSelect
              name="university"
              label="دانشگاه"
              options={selectOptions}
              form={form}
              placeholder="انتخاب کنید"
            />
          </PreviewCard>

          <PreviewCard title="CustomTextArea" description="متن چندخطی با شمارنده">
            <CustomTextArea
              name="description"
              label="توضیحات"
              placeholder="توضیحات را وارد کنید"
              showCount
              maxLength={200}
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </PreviewCard>

          <PreviewCard title="CustomDatePicker" description="انتخاب تاریخ متصل به فرم">
            <CustomDatePicker
              name="meetingDate"
              label="تاریخ جلسه"
              placeholder="تاریخ را انتخاب کنید"
              className="component-preview-field"
            />
          </PreviewCard>

          <PreviewCard title="CustomRangePicker" description="بازه تاریخ با مقدار اولیه">
            <CustomRangePicker
              name="dateRange"
              label="بازه گزارش"
              placeholder={["از تاریخ", "تا تاریخ"]}
              className="component-preview-field"
            />
          </PreviewCard>

          <PreviewCard
            title="CustomDynamicFormRows"
            description="فرم پویا با امکان افزودن و حذف ردیف و مشاهده زنده خروجی"
            wide
          >
            <DynamicFormRows
              name="dynamicRows"
              form={form}
              minRows={1}
              maxRows={5}
              addButtonText="افزودن مرحله جدید"
            >
              {(field, remove, canRemove) => (
                <Row key={field.key} gutter={[12, 8]} align="middle">
                  <Col xs={24} md={10}>
                    <CustomInput
                      name={[field.name, "title"]}
                      label="عنوان مرحله"
                      placeholder="عنوان را وارد کنید"
                    />
                  </Col>
                  <Col xs={24} md={10}>
                    <CustomSelect
                      name={[field.name, "university"]}
                      label="دانشگاه"
                      options={selectOptions}
                      form={form}
                      placeholder="انتخاب کنید"
                    />
                  </Col>
                  <Col xs={24} md={4} className="component-dynamic-row-action">
                    <CustomButton danger disabled={!canRemove} onClick={remove}>
                      حذف ردیف
                    </CustomButton>
                  </Col>
                </Row>
              )}
            </DynamicFormRows>
          </PreviewCard>
        </div>

        <div className="component-mock-state" aria-live="polite">
          <strong>وضعیت زنده فرم آزمایشی</strong>
          <code>{JSON.stringify(formValues, null, 2)}</code>
        </div>
      </Form>

      <CustomDivider text="تقویم، فرم پویا و نمودارها" />
      <div className="component-preview-grid">
        <PreviewCard
          title="MultiViewCalendar"
          description="تقویم شمسی روزانه، هفتگی و ماهانه با رویدادهای آزمایشی قابل انتخاب"
          wide
        >
          <div className="component-calendar-preview">
            <MultiViewCalendar
              events={calendarEvents}
              initialView="weekly"
              initialDate={new Date(2026, 10, 25)}
              dayStartHour={7}
              onEventClick={(event) =>
                setActionMessage(`رویداد «${event.title ?? "بدون عنوان"}» انتخاب شد.`)
              }
              onDateClick={(date) =>
                setActionMessage(`تاریخ ${date.toLocaleDateString("fa-IR")} انتخاب شد.`)
              }
              onTimeSlotSelect={(_, startHour, endHour) =>
                setActionMessage(`بازه ساعت ${startHour} تا ${endHour} انتخاب شد.`)
              }
            />
          </div>
          <span className="component-preview-feedback">{actionMessage}</span>
        </PreviewCard>

        <PreviewCard
          title="CustomChart / Bar"
          description="نمودار ستونی درخواست‌های ماهانه"
        >
          <CustomChart
            type="bar"
            data={{
              series: [{ data: [24, 38, 31, 46, 52], label: "درخواست‌ها" }],
              xAxis: [
                {
                  data: ["تیر", "مرداد", "شهریور", "مهر", "آبان"],
                  scaleType: "band",
                },
              ],
            }}
            config={{ height: 280, grid: { horizontal: true } }}
          />
        </PreviewCard>

        <PreviewCard title="CustomChart / Line" description="روند رضایت کاربران">
          <CustomChart
            type="line"
            data={{
              series: [{ data: [71, 76, 74, 82, 88], label: "رضایت" }],
              xAxis: [{ data: [1, 2, 3, 4, 5] }],
            }}
            config={{ height: 280, grid: { horizontal: true }, colors: ["#52c41a"] }}
          />
        </PreviewCard>

        <PreviewCard title="CustomChart / Pie" description="توزیع وضعیت درخواست‌ها" wide>
          <CustomChart
            type="pie"
            data={{
              series: [
                {
                  data: [
                    { id: 0, value: 48, label: "تایید شده" },
                    { id: 1, value: 32, label: "در انتظار" },
                    { id: 2, value: 20, label: "رد شده" },
                  ],
                },
              ],
            }}
            config={{ height: 300, colors: ["#52c41a", "#faad14", "#ff4d4f"] }}
          />
        </PreviewCard>
      </div>

      <CustomDivider text="نمایشگرها و بازخوردها" />
      <div className="component-preview-grid">
        <PreviewCard title="CustomAlert" description="چهار وضعیت بازخورد سامانه" wide>
          <div className="component-alert-list">
            <CustomAlert type="success" showIcon message="عملیات با موفقیت انجام شد." />
            <CustomAlert
              type="info"
              showIcon
              message="اطلاعات آزمایشی نمایش داده می‌شود."
            />
            <CustomAlert type="warning" showIcon message="این یک هشدار آزمایشی است." />
            <CustomAlert
              type="error"
              showIcon
              message="نمونه وضعیت خطا بدون توقف جریان."
            />
          </div>
        </PreviewCard>

        <PreviewCard title="CustomBadge" description="نشان تعداد روی عملیات">
          <CustomBadge count={5}>
            <CustomButton type="dashed">درخواست‌های جدید</CustomButton>
          </CustomBadge>
        </PreviewCard>

        <PreviewCard title="CustomDivider" description="جداکننده عنوان‌دار">
          <CustomDivider text="اطلاعات تکمیلی" dashed />
        </PreviewCard>

        <PreviewCard title="CustomEmpty" description="وضعیت بدون داده">
          <CustomEmpty description="داده آزمایشی دیگری وجود ندارد." />
        </PreviewCard>

        <PreviewCard title="CustomPagination" description="صفحه‌بندی تعاملی">
          <CustomPagination
            current={currentPage}
            total={50}
            pageSize={10}
            onChange={setCurrentPage}
            showSizeChanger={false}
          />
          <span className="component-preview-feedback">صفحه {currentPage}</span>
        </PreviewCard>

        <PreviewCard title="CustomSegmented" description="تغییر وضعیت نمایش">
          <CustomSegmented
            block
            value={selectedSegment}
            options={[
              { label: "فعال", value: "active" },
              { label: "آرشیو", value: "archive" },
            ]}
            onChange={setSelectedSegment}
          />
          <span className="component-preview-feedback">
            وضعیت: {selectedSegment === "active" ? "فعال" : "آرشیو"}
          </span>
        </PreviewCard>

        <PreviewCard title="CustomTag" description="برچسب‌های وضعیت">
          <div className="component-preview-row">
            <CustomTag color="success">فعال</CustomTag>
            <CustomTag color="warning">در انتظار</CustomTag>
            <CustomTag color="error">رد شده</CustomTag>
          </div>
        </PreviewCard>

        <PreviewCard title="IconTab" description="تب آیکون‌دار تعاملی">
          <div className="component-icon-tabs">
            <IconTab
              Icon={PreviewIcon}
              title="پروفایل"
              active={activeTab === "profile"}
              clickHandler={() => setActiveTab("profile")}
            />
            <IconTab
              Icon={PreviewIcon}
              title="سوابق"
              active={activeTab === "history"}
              clickHandler={() => setActiveTab("history")}
            />
          </div>
        </PreviewCard>

        <PreviewCard title="MenuActionPopover" description="عملیات رکورد آزمایشی">
          <MenuActionPopover contentItems={actionItems} />
          <span className="component-preview-feedback">{actionMessage}</span>
        </PreviewCard>

        <PreviewCard title="SamimServiceTag" description="سرویس‌های شناخته‌شده سامانه">
          <div className="component-preview-row">
            <SamimServiceTag service="ROOM" />
            <SamimServiceTag service="FOOD" />
            <SamimServiceTag service="WALLET" />
          </div>
        </PreviewCard>

        <PreviewCard
          title="SingleVerticalWithCol"
          description="اطلاعات کلیدی در شبکه واکنش‌گرا"
          wide
        >
          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol
              label="نام کاربر"
              value="علی محمدی"
              icon={<PiUser />}
            />
            <SingleVerticalWithCol
              label="تعداد درخواست"
              value={24}
              icon={<PiCheckCircle />}
            />
            <SingleVerticalWithCol
              label="مبلغ اعتبار"
              value={1250000}
              isPrice
              symbol="ریال"
            />
            <SingleVerticalWithCol label="آخرین به‌روزرسانی" value="۱۴۰۵/۰۹/۰۳" />
          </Row>
        </PreviewCard>
      </div>
    </section>
  );
};

export default ComponentGallery;
