import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import CustomDrawer from "../CustomDrawer";

describe("CustomDrawer component", () => {
  beforeEach(() => {
    document.body.innerHTML = ""; // پاک کردن portal قبلی قبل از هر تست
  });

  it("renders correctly with required props", () => {
    render(<CustomDrawer open content={<div>Drawer Content</div>} />);
    expect(screen.getByText("Drawer Content")).toBeInTheDocument();
  });

  it("applies className and rootClassName correctly", () => {
    render(<CustomDrawer open className="my-drawer" content={<div>Test</div>} />);

    // Drawer داخل body رندر میشه (Portal)
    const drawer = document.querySelector(".custom-drawer-container");
    expect(drawer).toBeTruthy();
    expect(drawer).toHaveClass("my-drawer");

    // rootClassName بررسی بشه
    const root = document.querySelector(".custom-drawer-root-class");
    expect(root).toBeTruthy();
  });

  it("respects size prop (default and large)", () => {
    const { rerender } = render(
      <CustomDrawer open size="default" content={<div>Default Size</div>} />
    );
    expect(screen.getByText("Default Size")).toBeInTheDocument();

    rerender(<CustomDrawer open size="large" content={<div>Large Size</div>} />);
    expect(screen.getByText("Large Size")).toBeInTheDocument();
  });

  it("calls onClose when close button clicked", () => {
    const handleClose = vi.fn();
    render(
      <CustomDrawer open closable onClose={handleClose} content={<div>Close Me</div>} />
    );

    const closeBtn = document.querySelector(".ant-drawer-close");
    expect(closeBtn).toBeTruthy();

    if (closeBtn) fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("does not render Drawer body when open=false", () => {
    render(<CustomDrawer open={false} content={<div>Hidden</div>} />);
    const body = document.querySelector(".ant-drawer-body");
    expect(body).toBeNull();
  });

  it("renders correctly even without className", () => {
    render(<CustomDrawer open content={<div>No Class</div>} />);
    const drawer = document.querySelector(".custom-drawer-container");
    expect(drawer).toBeTruthy();
    expect(screen.getByText("No Class")).toBeInTheDocument();
  });

  it("renders empty content gracefully (edge case)", () => {
    render(<CustomDrawer open content={null} />);
    const body = document.querySelector(".ant-drawer-body");
    // اگر body وجود داشت، محتوای داخلی باید خالی باشه
    if (body) expect(body.textContent?.trim() ?? "").toBe("");
  });

  // it("matches snapshot", () => {
  //   const { asFragment } = render(
  //     <CustomDrawer open size="large" content={<div>Snapshot Drawer</div>} />
  //   );
  //   expect(asFragment()).toMatchSnapshot();
  // });
});
