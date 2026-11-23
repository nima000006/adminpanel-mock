import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Button, Form } from "antd";
import { describe, test, expect, vi } from "vitest";

import CustomCascader from "../CustomCascader";

describe("CustomCascader", () => {
  const mockOptions = [
    {
      value: "1",
      label: "Option 1",
      children: [
        { value: "1-1", label: "Option 1-1" },
        { value: "1-2", label: "Option 1-2" },
      ],
    },
    {
      value: "2",
      label: "Option 2",
      children: [
        { value: "2-1", label: "Option 2-1" },
        { value: "2-2", label: "Option 2-2" },
      ],
    },
  ];

  // 1️⃣ Render with label and placeholder
  test("renders correctly with label and placeholder", () => {
    render(
      <CustomCascader
        name="test"
        label="Test Cascader"
        options={mockOptions}
        placeholder="انتخاب کنید"
      />
    );

    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();

    const label = screen.getByText("Test Cascader");
    expect(label).toBeInTheDocument();
  });

  // 2️⃣ Integration with Form and submit
  test("integrates with Form correctly", async () => {
    const onFinish = vi.fn();
    render(
      <Form onFinish={onFinish} initialValues={{ test: ["1", "1-1"] }}>
        <CustomCascader name="test" options={mockOptions} />
        <button type="submit">Submit</button>
      </Form>
    );

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(onFinish).toHaveBeenCalledWith({ test: ["1", "1-1"] });
    });
  });

  // 3️⃣ Validation with required rule
  test("shows required validation message", async () => {
    render(
      <Form>
        <CustomCascader
          name="test"
          options={mockOptions}
          rules={[{ required: true, message: "This field is required" }]}
        />
        <button type="submit">Submit</button>
      </Form>
    );

    fireEvent.click(screen.getByText("Submit"));

    const errors = await screen.findAllByText(/This field is required/i);
    expect(errors.length).toBeGreaterThan(0);
  });

  // 4️⃣ Validation based on dependencies
  test("validates based on dependencies correctly", async () => {
    const TestForm = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <CustomCascader
            label="Category"
            name="category"
            options={[
              { value: "1", label: "Option 1" },
              { value: "2", label: "Option 2" },
            ]}
          />
          <CustomCascader
            label="Subcategory"
            name="subcategory"
            dependencies={["category"]}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (getFieldValue("category") && !value) {
                    return Promise.reject(
                      new Error("Subcategory is required when category is selected")
                    );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
            options={[
              { value: "a", label: "Sub 1" },
              { value: "b", label: "Sub 2" },
            ]}
          />
          <Button
            onClick={() => {
              form.validateFields().catch(() => {});
            }}
          >
            Submit
          </Button>
        </Form>
      );
    };

    render(<TestForm />);

    // انتخاب category
    const category = screen.getByLabelText("Category");
    fireEvent.mouseDown(category);
    fireEvent.click(screen.getByText("Option 1"));

    // کلیک روی دکمه submit برای trigger validation
    fireEvent.click(screen.getByText("Submit"));

    // پیدا کردن پیام خطا

    const errorMessage = await screen.findByText(
      "Subcategory is required when category is selected"
    );

    expect(errorMessage).toBeInTheDocument();
  });

  // 5️⃣ onChange works
  test("calls onChange when value changes", async () => {
    const handleChange = vi.fn();

    render(<CustomCascader name="test" options={mockOptions} onChange={handleChange} />);

    const select = screen.getByRole("combobox");
    fireEvent.mouseDown(select);

    fireEvent.click(screen.getByText("Option 1"));
    fireEvent.click(screen.getByText("Option 1-1"));

    expect(handleChange).toHaveBeenCalledWith(["1", "1-1"], expect.anything());
  });

  // 6️⃣ Empty options
  test("renders empty options message", async () => {
    render(
      <CustomCascader
        name="test"
        options={[]}
        placeholder="انتخاب کنید"
        notFoundContent="هیچ داده‌ای یافت نشد"
      />
    );

    const select = screen.getByRole("combobox");
    fireEvent.mouseDown(select);

    await screen.findByText("هیچ داده‌ای یافت نشد");
  });

  // 7️⃣ Disabled state
  test("respects disabled prop", () => {
    render(<CustomCascader name="test" options={mockOptions} disabled />);

    // پیدا کردن wrapper اصلی Cascader
    const wrapper = document.querySelector(".ant-cascader");
    expect(wrapper).toBeInTheDocument();

    // بررسی کلاس صحیح در نسخه جدید AntD
    expect(wrapper).toHaveClass("ant-select-disabled");
  });

  // 8️⃣ Auto focus
  test("auto focuses when autoFocus is true", () => {
    render(<CustomCascader name="test" options={mockOptions} autoFocus />);

    const select = screen.getByRole("combobox");
    expect(select).toHaveFocus();
  });

  // 9️⃣ Unique IDs
  test("generates unique IDs when rendered in lists", () => {
    const items = ["item1", "item2", "item3"];
    render(
      <Form>
        {items.map((item) => (
          <CustomCascader key={item} name={item} options={mockOptions} />
        ))}
      </Form>
    );

    const selects = screen.getAllByRole("combobox");
    const ids = selects.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
