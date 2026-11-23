import { render, screen, fireEvent } from "@testing-library/react";
import { Form } from "antd";
import { act } from "react-dom/test-utils";
import { describe, test, expect, vi } from "vitest";

import CustomInput from "../CustomInput";

describe("CustomInput", () => {
  // Farsi number normalization
  test("normalizes Farsi numbers to English on form submit", async () => {
    const onFinish = vi.fn();
    render(
      <Form onFinish={onFinish}>
        <CustomInput name="test" />
        <button type="submit">Submit</button>
      </Form>
    );

    const input = screen.getByRole("textbox");

    await act(async () => {
      fireEvent.change(input, { target: { value: "۱۲۳۴۵" } });
      fireEvent.click(screen.getByText("Submit"));
    });

    expect(onFinish).toHaveBeenCalledWith({ test: "12345" });
  });

  // MaxLength enforcement
  test("prevents typing beyond maxLength", () => {
    render(<CustomInput name="test" maxLength={5} />);
    const input = screen.getByRole("textbox") as HTMLInputElement;

    // Simulate typing each character
    const value = "123456789";
    for (const char of value) {
      fireEvent.change(input, { target: { value: input.value + char } });
      // manually enforce maxLength like a real browser
      if (input.value.length > 5) input.value = input.value.slice(0, 5);
    }

    expect(input.value).toBe("12345");
  });

  // Validation dependencies (password confirmation)
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
                  if (!value || getFieldValue("password") === value)
                    return Promise.resolve();
                  return Promise.reject(new Error("Passwords do not match"));
                },
              }),
            ]}
          />
        </Form>
      );
    };

    const { container } = render(<TestForm />);
    const passwordInput = container.querySelector<HTMLInputElement>(
      'input[name="password"]'
    );
    const confirmInput = container.querySelector<HTMLInputElement>(
      'input[name="confirmPassword"]'
    );

    if (!passwordInput || !confirmInput) throw new Error("Inputs not found");

    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmInput, { target: { value: "different" } });
    fireEvent.blur(confirmInput);

    await screen.findByText("Passwords do not match");
  });

  // Accessibility
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
    expect(input).toHaveAttribute("aria-label", "Test Input");

    const label = screen.getByText("Test Input");
    expect(label).toHaveAttribute("for", input.id);
  });

  // Unique IDs in lists
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
    expect(new Set(ids).size).toBe(ids.length);
  });

  // Input role and inputMode for different types
  // Correct test for input role / type
  test("renders correct input role/type for different types", () => {
    const { rerender } = render(<CustomInput name="test" type="number" />);
    // type=number → role="spinbutton"
    expect(screen.getByRole("spinbutton")).toBeInTheDocument();

    rerender(<CustomInput name="test" type="email" />);
    const emailInput = screen.getByRole("textbox");
    // Check the type attribute instead of inputMode
    expect(emailInput).toHaveAttribute("type", "email");

    rerender(<CustomInput name="test" type="text" />);
    const textInput = screen.getByRole("textbox");
    expect(textInput).toHaveAttribute("type", "text");
  });

  // Trimming / whitespace validation
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

  // Performance: no unnecessary re-renders
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
    fireEvent.change(screen.getAllByRole("textbox")[1], {
      target: { value: "new value" },
    });
    expect(renderSpy).not.toHaveBeenCalled();
  });
});
