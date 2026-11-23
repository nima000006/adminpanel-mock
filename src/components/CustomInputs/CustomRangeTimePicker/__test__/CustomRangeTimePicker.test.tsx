import { render, screen, fireEvent } from "@testing-library/react";
import dayjs from "dayjs";
import { vi, describe, test, expect } from "vitest";

import CustomRangeTimePicker from "../CustomRangeTimePicker";

vi.mock("antd", async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, any>;

  return {
    ...actual,
    TimePicker: {
      RangePicker: ({ onChange, placeholder, defaultValue, disabled, name, id }: any) => {
        return (
          <input
            data-testid="mock-range-time-picker"
            placeholder={placeholder ? placeholder.join(" - ") : ""}
            defaultValue={
              defaultValue
                ? defaultValue.map((d: any) => d.format("HH:mm")).join(" - ")
                : ""
            }
            disabled={disabled}
            name={name}
            id={id}
            onChange={() => {
              if (onChange) onChange(["start", "end"], ["10:00", "12:00"]);
            }}
          />
        );
      },
    },
    Form: {
      Item: ({ children, label, help }: any) => (
        <div data-testid="form-item">
          {label && <label>{label}</label>}
          {children}
          {help && <div>{help}</div>}
        </div>
      ),
    },
  };
});

describe("CustomRangeTimePicker Component", () => {
  test("renders with label and help text", () => {
    render(
      <CustomRangeTimePicker
        name="myTimeRange"
        label="ساعت کار"
        help="زمان شروع و پایان را انتخاب کنید"
        valuePropName="timeRange"
        defaultValue={undefined}
        extra={<span>extra</span>}
      />
    );

    expect(screen.getByText("ساعت کار")).toBeInTheDocument();
    expect(screen.getByText("زمان شروع و پایان را انتخاب کنید")).toBeInTheDocument();
    expect(screen.getByTestId("mock-range-time-picker")).toBeInTheDocument();
  });

  test("applies placeholder prop correctly", () => {
    render(
      <CustomRangeTimePicker
        name="timeRange"
        placeholder={["از", "تا"]}
        valuePropName="timeRange"
        defaultValue={undefined}
        extra={<span>extra</span>}
      />
    );

    expect(screen.getByPlaceholderText("از - تا")).toBeInTheDocument();
  });

  test("calls onChange when time changes", () => {
    const handleChange = vi.fn();
    render(
      <CustomRangeTimePicker
        name="timeRange"
        onChange={handleChange}
        valuePropName="timeRange"
        defaultValue={undefined}
        extra={<span>extra</span>}
      />
    );

    const input = screen.getByTestId("mock-range-time-picker");

    // تریگر تغییر
    fireEvent.change(input, { target: { value: "10:00 - 12:00" } });

    expect(handleChange).toHaveBeenCalledWith(["start", "end"], ["10:00", "12:00"]);
  });
  test("renders defaultValue correctly", () => {
    const defaultValue = [dayjs("10:00", "HH:mm"), dayjs("12:00", "HH:mm")];
    render(
      <CustomRangeTimePicker
        name="timeRange"
        valuePropName="timeRange"
        defaultValue={defaultValue}
        extra={<span>extra</span>}
      />
    );

    expect(screen.getByDisplayValue("10:00 - 12:00")).toBeInTheDocument();
  });

  test("applies disabled prop", () => {
    render(
      <CustomRangeTimePicker
        name="timeRange"
        valuePropName="timeRange"
        disabled
        defaultValue={undefined}
        extra={<span>extra</span>}
      />
    );
    const input = screen.getByTestId("mock-range-time-picker");
    expect(input).toBeDisabled();
  });

  test("renders loading state via custom container", () => {
    render(
      <CustomRangeTimePicker
        name="timeRange"
        valuePropName="timeRange"
        isLoading
        defaultValue={undefined}
        customContainerClass="my-custom-container"
        extra={<span>extra</span>}
      />
    );

    const container = document.querySelector(
      ".range-time-pick-container.my-custom-container"
    );
    expect(container).toBeInTheDocument();
  });
});
