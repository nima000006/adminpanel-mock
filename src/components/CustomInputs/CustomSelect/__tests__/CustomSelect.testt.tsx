import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Form } from "antd";
import { describe, test, expect, vi } from "vitest";

import CustomSelect from "../CustomSelect";

describe("CustomSelect", () => {
  const mockOptions = [
    { id: "1", title: "Option 1" },
    { id: "2", title: "Option 2" },
    { id: "3", title: "Option 3", disabled: true },
  ];

  // 1️⃣ Persian text normalization in search
  test("normalizes Persian text in search correctly", async () => {
    const options = [
      { id: "1", title: "کاربر" },
      { id: "2", title: "کارشناس" },
      { id: "3", title: "مدیر" },
    ];

    render(<CustomSelect name="test" options={options} />);

    const select = screen.getByRole("combobox");
    fireEvent.mouseDown(select);

    const searchInput = document.querySelector<HTMLInputElement>(".ant-select-input");
    if (!searchInput) throw new Error("Search input not found");

    fireEvent.change(searchInput, { target: { value: "کار" } });

    await waitFor(() => {
      expect(screen.getByText("کاربر")).toBeInTheDocument();
      expect(screen.getByText("کارشناس")).toBeInTheDocument();
      expect(screen.queryByText("مدیر")).not.toBeInTheDocument();
    });
  });

  // 2️⃣ Multi-select mode
  test("handles multi-select mode correctly", async () => {
    const onChange = vi.fn();
    render(
      <CustomSelect
        name="test"
        options={mockOptions}
        mode="multiple"
        onChange={onChange}
      />
    );

    const select = screen.getByRole("combobox");
    fireEvent.mouseDown(select);

    fireEvent.click(screen.getByText("Option 1"));
    fireEvent.click(screen.getByText("Option 2"));

    expect(onChange).toHaveBeenCalledWith(
      expect.arrayContaining(["1", "2"]),
      expect.any(Array)
    );
  });

  // 3️⃣ Disabled options
  test("respects disabled options", async () => {
    render(<CustomSelect name="test" options={mockOptions} />);

    const select = screen.getByRole("combobox");
    fireEvent.mouseDown(select);

    const disabledOption = screen.getByText("Option 3");
    expect(disabledOption.closest(".ant-select-item")).toHaveClass(
      "ant-select-item-option-disabled"
    );
  });

  // 4️⃣ Loading state
  test("shows loading state correctly", async () => {
    render(
      <CustomSelect
        name="test"
        options={[]}
        isLoading={true}
        notFoundContent="Loading..."
      />
    );

    const select = screen.getByRole("combobox");
    fireEvent.mouseDown(select);

    await screen.findByText("Loading...");
  });

  // 5️⃣ Empty state
  test("shows custom empty message", async () => {
    render(
      <CustomSelect name="test" options={[]} notFoundContent="هیچ داده‌ای موجود نیست" />
    );

    const select = screen.getByRole("combobox");
    fireEvent.mouseDown(select);

    await screen.findByText("هیچ داده‌ای موجود نیست");
  });

  // 6️⃣ Form integration
  test("integrates with Form correctly", async () => {
    const onFinish = vi.fn();
    render(
      <Form onFinish={onFinish} initialValues={{ test: "1" }}>
        <CustomSelect name="test" options={mockOptions} />
        <button type="submit">Submit</button>
      </Form>
    );

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(onFinish).toHaveBeenCalledWith({ test: "1" });
    });
  });

  // 7️⃣ Clear functionality
  test("handles clear action correctly", async () => {
    const formValues: Record<string, any> = {};
    const onChange = (val: any) => (formValues.test = val);

    render(
      <Form initialValues={{ test: "1" }}>
        <CustomSelect name="test" options={mockOptions} allowClear onChange={onChange} />
      </Form>
    );

    const select = screen.getByRole("combobox");
    fireEvent.mouseDown(select);

    const clearButton = document.querySelector<HTMLSpanElement>(".ant-select-clear");
    if (clearButton) {
      fireEvent.mouseDown(clearButton);
      expect(formValues.test).toBeUndefined();
    }
  });

  // 8️⃣ Accessibility
  test("maintains proper accessibility attributes", () => {
    render(
      <CustomSelect
        name="test"
        label="Test Select"
        options={mockOptions}
        validateStatus="error"
        help="This is an error"
      />
    );

    const formItem = screen.getByText("Test Select").closest(".ant-form-item");
    expect(formItem).toHaveClass("ant-form-item-has-error");
  });

  // 9️⃣ Unique IDs in lists
  test("generates unique IDs when rendered in lists", () => {
    const items = ["item1", "item2", "item3"];
    render(
      <Form>
        {items.map((item) => (
          <CustomSelect
            key={item}
            name={item}
            label={`Label ${item}`}
            options={mockOptions}
          />
        ))}
      </Form>
    );

    const selects = screen.getAllByRole("combobox");
    const ids = selects.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  // 🔟 Validation dependencies
  test("validates based on dependencies correctly", async () => {
    const TestForm = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <CustomSelect name="category" options={mockOptions} />
          <CustomSelect
            name="subcategory"
            options={mockOptions}
            dependencies={["category"]}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value && getFieldValue("category")) {
                    return Promise.reject(
                      new Error("Subcategory is required when category is selected")
                    );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          />
          <button type="submit">Submit</button>
        </Form>
      );
    };

    render(<TestForm />);

    const [categorySelect] = screen.getAllByRole("combobox");

    // انتخاب category
    fireEvent.mouseDown(categorySelect);
    fireEvent.click(screen.getByText("Option 1"));

    // Submit فرم برای trigger validation
    fireEvent.click(screen.getByText("Submit"));

    // بررسی پیام خطا با matcher فانکشن
    const errorElements = await screen.findAllByText((_, element) => {
      return Boolean(
        element?.textContent?.includes(
          "Subcategory is required when category is selected"
        )
      );
    });

    // حداقل یک عنصر پیدا شده باشد
    expect(errorElements.length).toBeGreaterThan(0);
  });

  // 1️⃣1️⃣ Auto focus
  test("auto focuses when autoFocus is enabled", () => {
    render(<CustomSelect name="test" options={mockOptions} autoFocus />);

    const select = screen.getByRole("combobox");
    expect(select).toHaveFocus();
  });
});
