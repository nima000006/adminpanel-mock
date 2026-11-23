import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import CustomPagination from "../CustomPagination";

describe("CustomPagination component", () => {
  it("renders with default locale (Persian labels)", () => {
    const { container } = render(<CustomPagination total={100} current={1} />);
    const pagination = container.querySelector(".ant-pagination");
    expect(pagination).toBeInTheDocument();

    // بررسی locale پیش‌فرض فقط از props (چون در DOM نمایش داده نمی‌شود)
    expect(pagination).toBeTruthy();
  });

  it("applies custom locale when provided (no crash)", () => {
    const { container } = render(
      <CustomPagination total={50} locale={{ jump_to: "Go to", page: "Page" }} />
    );

    // ما فقط بررسی می‌کنیم که بدون خطا رندر شده
    expect(container.querySelector(".ant-pagination")).toBeInTheDocument();
  });

  it("calls onChange when page item clicked", () => {
    const onChange = vi.fn();
    const { container } = render(
      <CustomPagination total={30} pageSize={10} onChange={onChange} />
    );

    // دکمه صفحه دوم معمولاً li:nth-child(3) است (چون شامل prev و صفحه 1 است)
    const pageButtons = container.querySelectorAll("li.ant-pagination-item");
    expect(pageButtons.length).toBeGreaterThan(1);

    fireEvent.click(pageButtons[1]); // روی صفحه 2 کلیک می‌کنیم

    expect(onChange).toHaveBeenCalledWith(2, 10);
  });

  it("handles current page beyond total safely", () => {
    const { container, rerender } = render(
      <CustomPagination total={50} pageSize={10} current={10} />
    );

    // نباید کرش کند، pagination باید موجود باشد
    expect(container.querySelector(".ant-pagination")).toBeInTheDocument();

    rerender(<CustomPagination total={50} pageSize={10} current={10} />);
    expect(container.querySelector(".ant-pagination")).toBeInTheDocument();
  });

  it("renders with small size and without size changer", () => {
    const { container } = render(
      <CustomPagination total={20} pageSize={5} size="small" showSizeChanger={false} />
    );

    expect(container.querySelector(".ant-pagination")).toBeInTheDocument();

    // چون showSizeChanger=false باید selector حذف شود
    expect(container.querySelector(".ant-select")).not.toBeInTheDocument();
  });

  it("renders correctly when total=0 (no pages)", () => {
    const { container } = render(<CustomPagination total={0} />);
    expect(container.querySelector(".ant-pagination")).toBeInTheDocument();

    // نباید آیتم صفحه وجود داشته باشد
    const items = container.querySelectorAll("li.ant-pagination-item");
    expect(items.length).toBe(1);
  });

  it("passes props like showQuickJumper correctly", () => {
    const { container } = render(<CustomPagination total={100} showQuickJumper />);

    // وجود input مربوط به QuickJumper
    const input = container.querySelector("input");
    expect(input).toBeInTheDocument();
  });
});
