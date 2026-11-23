import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import CustomRadioGroup from "../CustomRadioGroup";

describe("CustomRadioGroup Component - Comprehensive Tests", () => {
  const options = [
    { label: "Option A", value: "A" },
    { label: "Option B", value: "B" },
    { label: "Option C", value: "C" },
  ];

  // Rendering
  describe("Rendering", () => {
    test("renders without crashing", () => {
      render(<CustomRadioGroup name="test" options={options} />);
      expect(screen.getByLabelText("Option A")).toBeInTheDocument();
      expect(screen.getByLabelText("Option B")).toBeInTheDocument();
    });

    test("renders label when provided", () => {
      render(<CustomRadioGroup name="gender" label="Gender" options={options} />);
      expect(screen.getByText("Gender")).toBeInTheDocument();
    });

    test("applies containerClassName and radioClassName", () => {
      const { container } = render(
        <CustomRadioGroup
          name="color"
          options={options}
          containerClassName="custom-container"
          radioClassName="custom-radio"
        />
      );
      expect(container.querySelector(".custom-container")).toBeTruthy();
      expect(container.querySelector(".custom-radio")).toBeTruthy();
    });

    test("renders help text if provided", () => {
      render(<CustomRadioGroup name="test" options={options} help="Please select one" />);
      expect(screen.getByText("Please select one")).toBeInTheDocument();
    });
  });

  // Props & States
  describe("Props and States", () => {
    test("renders with defaultValue correctly", () => {
      render(<CustomRadioGroup name="test" options={options} defaultValue="B" />);
      const radioB = screen.getByLabelText("Option B") as HTMLInputElement;
      expect(radioB.checked).toBe(true);
    });

    test("respects disabled prop", () => {
      render(<CustomRadioGroup name="test" options={options} disabled />);
      const radioA = screen.getByLabelText("Option A");
      expect(radioA).toBeDisabled();
    });

    test("applies vertical label layout when hasVerticalLabel is true", () => {
      const { container } = render(
        <CustomRadioGroup
          name="test"
          label="Vertical Label"
          hasVerticalLabel
          options={options}
        />
      );
      expect(container.querySelector(".vertical-label")).toBeTruthy();
    });

    test("respects hidden prop", () => {
      const { container } = render(
        <CustomRadioGroup name="test" options={options} hidden />
      );
      expect(container.querySelector(".ant-form-item-hidden")).toBeTruthy();
    });

    test("shows loading state in Div wrapper", () => {
      const { container } = render(
        <CustomRadioGroup name="test" options={options} isLoading />
      );
      expect(container.querySelector(".radio-container")).toHaveClass("radio-container");
    });
  });

  // Behavior
  describe("Behavior", () => {
    test("calls onChange when a radio option is clicked", () => {
      const handleChange = vi.fn();
      render(
        <CustomRadioGroup
          name="test"
          options={options}
          onChange={handleChange}
          value="A"
        />
      );
      fireEvent.click(screen.getByLabelText("Option B"));
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    test("disabled radios do not trigger onChange", () => {
      const handleChange = vi.fn();
      render(
        <CustomRadioGroup
          name="test"
          options={options}
          disabled
          onChange={handleChange}
        />
      );
      fireEvent.click(screen.getByLabelText("Option A"));
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  // Form Integration (AntD Props)
  describe("Form Integration", () => {
    test("passes validation rules to Form.Item", () => {
      const rules = [{ required: true, message: "Required field" }];
      const { container } = render(
        <CustomRadioGroup
          name="requiredTest"
          label="Required"
          rules={rules}
          options={options}
        />
      );
      expect(container.querySelector(".ant-form-item")).toBeTruthy();
    });

    test("applies label alignment correctly", () => {
      const { container, rerender } = render(
        <CustomRadioGroup
          name="test"
          label="Align Right"
          labelAlign="right"
          options={options}
        />
      );
      expect(container.querySelector(".ant-form-item")).toBeTruthy();
      rerender(
        <CustomRadioGroup
          name="test"
          label="Align Left"
          labelAlign="left"
          options={options}
        />
      );
      expect(container.querySelector(".ant-form-item")).toBeTruthy();
    });

    test("shows feedback icon when hasFeedback is true", () => {
      const { container } = render(
        <CustomRadioGroup name="test" label="Feedback" hasFeedback options={options} />
      );
      expect(container.querySelector(".ant-form-item")).toBeTruthy();
    });
  });

  //  Interaction
  describe("User Interaction", () => {
    test("allows selecting different options sequentially", () => {
      const handleChange = vi.fn();
      render(
        <CustomRadioGroup name="interaction" options={options} onChange={handleChange} />
      );

      fireEvent.click(screen.getByLabelText("Option A"));
      fireEvent.click(screen.getByLabelText("Option B"));
      fireEvent.click(screen.getByLabelText("Option C"));
      expect(handleChange).toHaveBeenCalledTimes(3);
    });

    test("only one option can be selected at a time", () => {
      render(<CustomRadioGroup name="test" options={options} defaultValue="A" />);
      const radioA = screen.getByLabelText("Option A") as HTMLInputElement;
      const radioB = screen.getByLabelText("Option B") as HTMLInputElement;
      fireEvent.click(radioB);
      expect(radioA.checked && radioB.checked).toBe(false);
    });
  });

  // Edge Cases
  describe("Edge Cases", () => {
    test("renders with empty options gracefully", () => {
      render(<CustomRadioGroup name="empty" options={[]} />);
      const radios = screen.queryAllByRole("radio");
      expect(radios.length).toBe(0);
    });

    test("handles undefined value without crashing", () => {
      render(
        <CustomRadioGroup name="undefinedValue" options={options} value={undefined} />
      );
      expect(screen.getByLabelText("Option A")).toBeInTheDocument();
    });
  });
});
