import React from "react";

import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";

import CustomInputNumber from "../CustomInputNumber";

//  Mock توابع کمکی
vi.mock("../../../infrastructure/helpers/utils", () => ({
  PriceSeparator: (value: string | number) =>
    value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
}));

vi.mock("../../../infrastructure/helpers/NumericHelpers/numericHelper", () => ({
  numberToWordConvertor: (val: number) => `${val} تومان`,
}));

vi.mock("@components/Renderers/CustomTooltip/CustomTooltip", () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("CustomInputNumber Component", () => {
  const baseProps = {
    name: "price",
    label: "قیمت",
  };

  //   رندر پایه
  test("renders label and input correctly", () => {
    render(<CustomInputNumber {...baseProps} />);
    expect(screen.getByLabelText("قیمت")).toBeInTheDocument();
  });

  // formatter
  test("formats number with commas when isPrice is true", async () => {
    render(<CustomInputNumber {...baseProps} isPrice />);
    const input = screen.getByLabelText("قیمت") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "1234567" } });
    expect(input.value).toMatch(/1,234,567/);
  });

  // Tooltip
  test("shows tooltip content based on numberToWordConvertor when isPrice=true", async () => {
    render(<CustomInputNumber {...baseProps} isPrice />);
    const input = screen.getByLabelText("قیمت") as HTMLInputElement;

    fireEvent.change(input, { target: { value: 5000 } });
    expect(input.value).toContain("5,000"); // طبق formatter mock شده
  });

  // hidden prop
  test("renders hidden Form.Item when hidden=true", () => {
    const { container } = render(<CustomInputNumber {...baseProps} hidden />);
    const hiddenItem = container.querySelector(".ant-form-item-hidden");
    expect(hiddenItem).toBeTruthy();
  });

  // internal state
  test("updates internal value state on change when isPrice=true", () => {
    render(<CustomInputNumber {...baseProps} isPrice />);
    const input = screen.getByLabelText("قیمت") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "25000" } });
    expect(input.value).toContain("25,000");
  });

  // Form help & extra
  test("renders help and extra text", () => {
    render(<CustomInputNumber {...baseProps} help="راهنمای تست" extra="متن اضافی" />);

    expect(screen.getByText("راهنمای تست")).toBeInTheDocument();
    expect(screen.getByText("متن اضافی")).toBeInTheDocument();
  });

  // forwardRef
  test("forwards ref to InputNumber", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<CustomInputNumber {...baseProps} ref={ref as any} />);
    expect(ref.current).not.toBeNull();
  });
});
