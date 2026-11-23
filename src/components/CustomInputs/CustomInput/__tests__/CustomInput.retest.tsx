import { render, screen, fireEvent } from "@testing-library/react";
import { Form } from "antd";
import { describe, test, expect, vi } from "vitest";

import CustomInput from "../CustomInput";

describe("CustomInput", () => {
  // Edge Case: Farsi Number Normalization
  test("normalizes Farsi numbers to English when enabled", async () => {
    const onFinish = vi.fn();
    render(
      <Form onFinish={onFinish}>
        <CustomInput name="test" normalizeFarsiNumbers={true} />
        <button type="submit">Submit</button>
      </Form>
    );

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "۱۲۳۴۵" } });
    fireEvent.click(screen.getByText("Submit"));

    await expect(onFinish).toHaveBeenCalledWith({ test: "12345" });
  });

  // Edge Case: MaxLength Enforcement
  test("enforces maxLength constraint", () => {
    render(<CustomInput name="test" maxLength={5} />);

    const input = screen.getByRole("textbox") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "123456789" } });

    expect(input.value).toHaveLength(5);
  });

  // Edge Case: Validation Dependencies
  test("validates based on dependencies correctly", async () => {
    const TestForm = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <CustomInput name="password" type="password" />
          <CustomInput
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match"));
                },
              }),
            ]}
          />
        </Form>
      );
    };

    render(<TestForm />);

    const inputs = screen.getAllByRole("textbox");
    const passwordInput = inputs[0] as HTMLInputElement;
    const confirmInput = inputs[1] as HTMLInputElement;

    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmInput, { target: { value: "different" } });
    fireEvent.blur(confirmInput);

    await screen.findByText("Passwords do not match");
  });

  // Edge Case: Accessibility
  test("maintains proper accessibility attributes", () => {
    render(
      <CustomInput
        name="test"
        label="Test Input"
        validateStatus="error"
        help="This is an error"
      />
    );

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-describedby");
    expect(input).toHaveAttribute("id");

    const label = screen.getByText("Test Input");
    expect(label).toHaveAttribute("for", input.id);
  });

  // Edge Case: ID Uniqueness in Lists
  test("generates unique IDs when rendered in lists", () => {
    const items = ["item1", "item2", "item3"];
    render(
      <Form>
        {items.map((item) => (
          <CustomInput key={item} name={item} label={`Label ${item}`} />
        ))}
      </Form>
    );

    const inputs = screen.getAllByRole("textbox");
    const ids = inputs.map((input) => input.id);

    // All IDs should be unique
    expect(new Set(ids).size).toBe(ids.length);
  });

  // Edge Case: InputMode Auto-Detection
  test("sets correct inputMode for different types", () => {
    const { rerender } = render(<CustomInput name="test" type="number" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("inputMode", "numeric");

    rerender(<CustomInput name="test" type="email" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("inputMode", "email");

    rerender(<CustomInput name="test" type="text" />);
    expect(screen.getByRole("textbox")).not.toHaveAttribute("inputMode");
  });

  // Edge Case: Trimming Behavior
  test("handles whitespace-only input correctly", async () => {
    const onFinish = vi.fn();
    render(
      <Form onFinish={onFinish}>
        <CustomInput
          name="test"
          rules={[{ required: true, whitespace: true, message: "Required" }]}
        />
        <button type="submit">Submit</button>
      </Form>
    );

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "   " } });
    fireEvent.click(screen.getByText("Submit"));

    await screen.findByText("Required");
    expect(onFinish).not.toHaveBeenCalled();
  });

  // Performance: No Unnecessary Re-renders
  test("does not re-render when sibling fields change", () => {
    const renderSpy = vi.fn();
    const TestInput = (props: any) => {
      renderSpy();
      return <CustomInput {...props} />;
    };

    render(
      <Form>
        <TestInput name="field1" />
        <CustomInput name="field2" />
      </Form>
    );

    renderSpy.mockClear();

    // Change field2, field1 should not re-render
    fireEvent.change(screen.getAllByRole("textbox")[1], {
      target: { value: "new value" },
    });

    expect(renderSpy).not.toHaveBeenCalled();
  });
});
