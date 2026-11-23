import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import Div from "../Div";

// Mock کردن MainSpinner برای تست
vi.mock("../../../MainSpinner/MainSpinner", () => {
  return {
    default: ({ height, isSkeleton }: { height: string; isSkeleton: boolean }) => (
      <div data-testid="main-spinner" data-height={height} data-skeleton={isSkeleton} />
    ),
  };
});

describe("Div component", () => {
  it("renders children when loading is false", () => {
    render(
      <Div loading={false}>
        <p>Child Content</p>
      </Div>
    );
    expect(screen.getByText("Child Content")).toBeInTheDocument();
    expect(screen.queryByTestId("main-spinner")).toBeNull();
  });

  it("renders MainSpinner when loading is true", () => {
    render(
      <Div loading={true}>
        <p>Child Content</p>
      </Div>
    );
    const spinner = screen.getByTestId("main-spinner");
    expect(spinner).toBeInTheDocument();
    expect(screen.queryByText("Child Content")).toBeNull();
  });

  it("passes default customHeight and isSkeleton to MainSpinner", () => {
    render(
      <Div loading={true}>
        <p>Child Content</p>
      </Div>
    );
    const spinner = screen.getByTestId("main-spinner");
    expect(spinner).toHaveAttribute("data-height", "20vh");
    expect(spinner).toHaveAttribute("data-skeleton", "true");
  });

  it("passes custom customHeight and isSkeleton to MainSpinner", () => {
    render(
      <Div loading={true} customHeight="50vh" isSkeleton={false}>
        <p>Child Content</p>
      </Div>
    );
    const spinner = screen.getByTestId("main-spinner");
    expect(spinner).toHaveAttribute("data-height", "50vh");
    expect(spinner).toHaveAttribute("data-skeleton", "false");
  });

  it("renders with provided className", () => {
    render(
      <Div className="my-class" loading={false}>
        <p>Child Content</p>
      </Div>
    );
    const div = screen.getByText("Child Content").parentElement;
    expect(div).toHaveClass("my-class");
  });

  it("renders without className if not provided", () => {
    render(
      <Div loading={false}>
        <p>Child Content</p>
      </Div>
    );
    const div = screen.getByText("Child Content").parentElement;
    expect(div).not.toHaveAttribute("class", "undefined");
  });

  it("renders children even if children is null, undefined or empty string", () => {
    const { container: c1 } = render(<Div loading={false}>{null}</Div>);
    expect(c1.firstChild).toBeInTheDocument();

    const { container: c2 } = render(<Div loading={false}>{undefined}</Div>);
    expect(c2.firstChild).toBeInTheDocument();

    const { container: c3 } = render(<Div loading={false}>{""}</Div>);
    expect(c3.firstChild).toBeInTheDocument();
  });
});
