import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Form } from "antd";
import { describe, test, expect, vi } from "vitest";

import CustomSelect from "../CustomSelect";

describe("CustomSelect", () => {
  const mockOptions = [
    { id: 1, title: "Option 1" },
    { id: 2, title: "Option 2" },
    { id: 3, title: "Option 3", disabled: true },
  ];

  //   const mockGroupedOptions = [
  //     {
  //       label: "Group 1",
  //       options: [
  //         { id: 1, title: "Option 1" },
  //         { id: 2, title: "Option 2" },
  //       ],
  //     },
  //     {
  //       label: "Group 2",
  //       options: [
  //         { id: 3, title: "Option 3" },
  //         { id: 4, title: "Option 4" },
  //       ],
  //     },
  //   ];

  // Edge Case: Search with Persian Text Normalization
  test("normalizes Persian text in search correctly", async () => {
    const options = [
      { id: 1, title: "کاربر" },
      { id: 2, title: "کارشناس" },
      { id: 3, title: "مدیر" },
    ];

    render(<CustomSelect name="test" options={options} />);

    const select = screen.getByRole("combobox");
    fireEvent.click(select);

    const searchInput = screen.getByRole("combobox");
    fireEvent.change(searchInput, { target: { value: "کار" } });

    await waitFor(() => {
      expect(screen.getByText("کاربر")).toBeInTheDocument();
      expect(screen.getByText("کارشناس")).toBeInTheDocument();
      expect(screen.queryByText("مدیر")).not.toBeInTheDocument();
    });
  });

  // Edge Case: Option Groups Support
  //   test("renders option groups correctly", () => {
  //     render(
  //       <CustomSelect name="test" options={mockGroupedOptions ?? []} hasGroups={true} />
  //     );

  //     const select = screen.getByRole("combobox");
  //     fireEvent.click(select);

  //     expect(screen.getByText("Group 1")).toBeInTheDocument();
  //     expect(screen.getByText("Group 2")).toBeInTheDocument();
  //   });

  // Edge Case: Multi-select Mode
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
    fireEvent.click(select);

    fireEvent.click(screen.getByText("Option 1"));
    fireEvent.click(screen.getByText("Option 2"));

    expect(onChange).toHaveBeenCalledWith(
      expect.arrayContaining(["1", "2"]),
      expect.any(Array)
    );
  });

  // Edge Case: Disabled Options
  test("respects disabled options", () => {
    render(<CustomSelect name="test" options={mockOptions} />);

    const select = screen.getByRole("combobox");
    fireEvent.click(select);

    const disabledOption = screen.getByText("Option 3");
    expect(disabledOption.closest(".ant-select-item")).toHaveClass(
      "ant-select-item-option-disabled"
    );
  });

  // Edge Case: Loading State
  test("shows loading state correctly", () => {
    render(<CustomSelect name="test" options={[]} loading={true} />);

    const select = screen.getByRole("combobox");
    expect(select).toHaveAttribute("aria-busy", "true");

    fireEvent.click(select);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  // Edge Case: Empty State
  test("shows custom empty message", () => {
    render(<CustomSelect name="test" options={[]} emptyText="هیچ داده‌ای موجود نیست" />);

    const select = screen.getByRole("combobox");
    fireEvent.click(select);

    expect(screen.getByText("هیچ داده‌ای موجود نیست")).toBeInTheDocument();
  });

  // Edge Case: Form Integration
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

  // Edge Case: Clear Functionality
  test("handles clear action correctly", async () => {
    const onChange = vi.fn();
    render(
      <Form initialValues={{ test: "1" }}>
        <CustomSelect
          name="test"
          options={mockOptions}
          allowClear={true}
          onChange={onChange}
        />
      </Form>
    );

    // Should show selected value
    expect(screen.getByDisplayValue("Option 1")).toBeInTheDocument();

    // Find and click clear button
    const clearButton = screen
      .getByRole("combobox")
      .parentElement?.querySelector(".ant-select-clear");
    if (clearButton) {
      fireEvent.click(clearButton);
      expect(onChange).toHaveBeenCalledWith(undefined, undefined);
    }
  });

  // Edge Case: Custom Filter Function
  test("uses custom filter function when provided", async () => {
    const customFilter = vi.fn().mockReturnValue(true);

    render(
      <CustomSelect name="test" options={mockOptions} filterOption={customFilter} />
    );

    const select = screen.getByRole("combobox");
    fireEvent.click(select);

    const searchInput = screen.getByRole("combobox");
    fireEvent.change(searchInput, { target: { value: "test" } });

    expect(customFilter).toHaveBeenCalled();
  });

  // Edge Case: Accessibility
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

    const select = screen.getByRole("combobox");
    expect(select).toHaveAttribute("aria-invalid", "true");
    expect(select).toHaveAttribute("aria-describedby");
    expect(select).toHaveAttribute("id");

    const label = screen.getByText("Test Select");
    expect(label).toHaveAttribute("for", select.id);
  });

  // Edge Case: ID Uniqueness in Lists
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
    const ids = selects.map((select) => select.id);

    // All IDs should be unique
    expect(new Set(ids).size).toBe(ids.length);
  });

  // Edge Case: Validation Dependencies
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
        </Form>
      );
    };

    render(<TestForm />);

    const selects = screen.getAllByRole("combobox");
    const categorySelect = selects[0];
    const subcategorySelect = selects[1];

    // Select category
    fireEvent.click(categorySelect);
    fireEvent.click(screen.getByText("Option 1"));

    // Trigger validation on subcategory
    fireEvent.blur(subcategorySelect);

    await screen.findByText("Subcategory is required when category is selected");
  });

  // Performance: No Unnecessary Re-renders
  test("does not re-render when sibling fields change", () => {
    const renderSpy = vi.fn();
    const TestSelect = (props: any) => {
      renderSpy();
      return <CustomSelect {...props} />;
    };

    render(
      <Form>
        <TestSelect name="field1" options={mockOptions} />
        <CustomSelect name="field2" options={mockOptions} />
      </Form>
    );

    renderSpy.mockClear();

    // Change field2, field1 should not re-render
    const selects = screen.getAllByRole("combobox");
    fireEvent.click(selects[1]);
    fireEvent.click(screen.getByText("Option 1"));

    expect(renderSpy).not.toHaveBeenCalled();
  });

  // Edge Case: Auto Focus
  test("auto focuses when autoFocus is enabled", () => {
    render(<CustomSelect name="test" options={mockOptions} autoFocus={true} />);

    const select = screen.getByRole("combobox");
    expect(select).toHaveFocus();
  });
});
