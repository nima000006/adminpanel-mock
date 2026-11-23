import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Form } from "antd";
import dayjs from "dayjs";
import { vi, describe, test, expect } from "vitest";

import CustomTimePicker from "../CustomTimePicker";

vi.mock("antd", async (importOriginal) => {
  const actual = (await importOriginal()) as any;
  return {
    ...actual,
    TimePicker: ({ placeholder, disabled, onChange, ...rest }: any) => (
      <input
        data-testid="mock-time-picker"
        placeholder={placeholder}
        disabled={disabled}
        onChange={() => onChange?.(dayjs("12:30", "HH:mm"), "12:30")}
        {...rest}
      />
    ),
  };
});

describe("CustomTimePicker Component", () => {
  test("renders without crashing", () => {
    render(
      <Form>
        <CustomTimePicker name="time" />
      </Form>
    );
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("renders label correctly", () => {
    render(
      <Form>
        <CustomTimePicker name="startTime" label="زمان شروع" />
      </Form>
    );
    expect(screen.getByText("زمان شروع")).toBeInTheDocument();
  });

  test("applies placeholder and disabled props", () => {
    render(
      <Form>
        <CustomTimePicker name="endTime" placeholder="ساعت پایان" disabled />
      </Form>
    );

    const input = screen.getByPlaceholderText("ساعت پایان");
    expect(input).toBeDisabled();
  });

  test("applies custom class and vertical label", () => {
    render(
      <Form>
        <CustomTimePicker name="time" label="ساعت" className="my-class" />
      </Form>
    );

    const wrapper = screen.getByText("ساعت").closest(".ant-form-item");
    expect(wrapper).toHaveClass("vertical-label");
    expect(wrapper).toHaveClass("my-class");
  });

  test("calls onChange when mocked TimePicker changes", async () => {
    const handleChange = vi.fn();

    render(
      <Form>
        <CustomTimePicker name="time" onChange={handleChange} />
      </Form>
    );

    const input = screen.getByTestId("mock-time-picker");
    await userEvent.type(input, "1"); // trigger change
    expect(handleChange).toHaveBeenCalledWith(dayjs("12:30", "HH:mm"), "12:30");
  });

  test("renders help text and applies initial value correctly", async () => {
    const formRef = { current: null as any };

    render(
      <Form initialValues={{ myTime: dayjs("13:45", "HH:mm") }} ref={formRef}>
        <CustomTimePicker name="myTime" label="ساعت" help="زمان مورد نظر را وارد کنید" />
      </Form>
    );

    expect(screen.getByText("زمان مورد نظر را وارد کنید")).toBeInTheDocument();

    // بررسی مقدار داخل فرم به جای input
    const formValues = formRef.current?.getFieldsValue();
    expect(dayjs(formValues?.myTime).format("HH:mm")).toBe("13:45");
  });

  test("does not render input when hidden is true", () => {
    render(
      <Form>
        <CustomTimePicker name="hiddenTime" label="ساعت مخفی" hidden />
      </Form>
    );

    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  test("has correct displayName", () => {
    expect(CustomTimePicker.displayName).toBe("CustomTimePicker");
  });
});
