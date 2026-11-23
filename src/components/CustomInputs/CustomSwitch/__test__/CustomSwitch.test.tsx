import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Form } from "antd";
import { vi, describe, test, expect } from "vitest";

import CustomSwitch from "../CustomSwitch";

vi.mock("antd", async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, any>;
  return {
    ...actual,
    Switch: ({ checked, disabled, loading, onChange, onClick, id, ...rest }: any) => (
      <input
        type="checkbox"
        data-testid="mock-switch"
        id={id}
        checked={checked}
        disabled={disabled}
        aria-busy={loading}
        onClick={(e) => {
          onClick?.(e);
          onChange?.(!checked);
        }}
        {...rest}
      />
    ),
  };
});

describe("CustomSwitch Component", () => {
  test("renders correctly with default props", () => {
    render(<CustomSwitch valuePropName="testSwitch" />);
    const switchInput = screen.getByTestId("mock-switch");
    expect(switchInput).toBeInTheDocument();
    expect(switchInput).not.toBeDisabled();
  });

  test("applies custom className properly", () => {
    render(<CustomSwitch valuePropName="mySwitch" className="extra-class" />);
    const wrapper = document.querySelector(".custom-switch-container");
    expect(wrapper).toHaveClass("custom-switch-container");
    expect(wrapper).toHaveClass("extra-class");
  });

  test("renders disabled, loading, and defaultChecked props", () => {
    render(<CustomSwitch valuePropName="mySwitch" disabled loading defaultChecked />);
    const switchInput = screen.getByTestId("mock-switch");
    expect(switchInput).toBeDisabled();
    expect(switchInput).toHaveAttribute("aria-busy", "true");
    expect(switchInput).toBeChecked();
  });

  test("calls onChange when toggled", async () => {
    const handleChange = vi.fn();
    render(<CustomSwitch valuePropName="toggle" onChange={handleChange} />);
    const switchInput = screen.getByTestId("mock-switch");

    await userEvent.click(switchInput);
    expect(handleChange).toHaveBeenCalledWith(true);

    await userEvent.click(switchInput);
    expect(handleChange).toHaveBeenCalledWith(false);
  });

  test("calls onClick when clicked", async () => {
    const handleClick = vi.fn();
    render(<CustomSwitch valuePropName="clicker" onClick={handleClick} />);
    const switchInput = screen.getByTestId("mock-switch");

    await userEvent.click(switchInput);
    expect(handleClick).toHaveBeenCalled();
  });

  test("renders inside Form.Item with label and help", () => {
    render(
      <Form>
        <CustomSwitch valuePropName="switch1" label="فعال" help="راهنمای سوییچ" />
      </Form>
    );
    expect(screen.getByText("فعال")).toBeInTheDocument();
    expect(screen.getByText("راهنمای سوییچ")).toBeInTheDocument();
  });

  test("has correct displayName", () => {
    expect(CustomSwitch.displayName).toBe("CustomSwitch");
  });
});
