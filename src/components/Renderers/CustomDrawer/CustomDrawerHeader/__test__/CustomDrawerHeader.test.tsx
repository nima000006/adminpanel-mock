import { render, fireEvent, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import CustomDrawerHeader from "../CustomDrawerHeader";

describe("CustomDrawerHeader component", () => {
  it("renders title when provided as string", () => {
    render(<CustomDrawerHeader closeDrawerHandler={vi.fn()} title="My Title" />);
    expect(screen.getByText("My Title")).toBeInTheDocument();
  });

  it("renders title when provided as ReactNode", () => {
    render(
      <CustomDrawerHeader
        closeDrawerHandler={vi.fn()}
        title={<span data-testid="custom-title">Custom Node</span>}
      />
    );
    expect(screen.getByTestId("custom-title")).toBeInTheDocument();
    expect(screen.getByText("Custom Node")).toBeInTheDocument();
  });

  it("renders leftSideContent when hasLeftSide=true", () => {
    render(
      <CustomDrawerHeader
        closeDrawerHandler={vi.fn()}
        hasLeftSide
        leftSideContent={<div data-testid="left-side">Left Content</div>}
      />
    );
    expect(screen.getByTestId("left-side")).toBeInTheDocument();
  });

  it("does not render leftSideContent when hasLeftSide=false", () => {
    render(
      <CustomDrawerHeader
        closeDrawerHandler={vi.fn()}
        hasLeftSide={false}
        leftSideContent={<div data-testid="left-side">Left Content</div>}
      />
    );
    expect(screen.queryByTestId("left-side")).not.toBeInTheDocument();
  });

  it("calls closeDrawerHandler when close icon is clicked", () => {
    const handleClose = vi.fn();
    render(<CustomDrawerHeader closeDrawerHandler={handleClose} />);

    // پیدا کردن container که click handler داره
    const closeIconContainer = document.querySelector(".close-icon-container");
    expect(closeIconContainer).toBeInTheDocument();

    if (closeIconContainer) fireEvent.click(closeIconContainer);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("applies sticky top class when isStickyTop=true (default)", () => {
    render(<CustomDrawerHeader closeDrawerHandler={vi.fn()} />);
    const header = document.querySelector(".header-drawer-container");
    expect(header).toHaveClass("drawer-header-sticky-top");
  });

  it("does not apply sticky top class when isStickyTop=false", () => {
    render(<CustomDrawerHeader closeDrawerHandler={vi.fn()} isStickyTop={false} />);
    const header = document.querySelector(".header-drawer-container");
    expect(header).not.toHaveClass("drawer-header-sticky-top");
  });

  it("renders correctly even without title or leftSideContent (edge case)", () => {
    render(<CustomDrawerHeader closeDrawerHandler={vi.fn()} hasLeftSide={false} />);
    const header = document.querySelector(".header-drawer-container");
    expect(header).toBeInTheDocument();
    expect(screen.queryByText(/./)).not.toBeInTheDocument(); // هیچ متنی نباید باشد
  });

  // it("matches snapshot", () => {
  //   const { asFragment } = render(
  //     <CustomDrawerHeader
  //       closeDrawerHandler={vi.fn()}
  //       title="Snapshot Title"
  //       leftSideContent={<div>Left</div>}
  //     />
  //   );
  //   expect(asFragment()).toMatchSnapshot();
  // });
});
