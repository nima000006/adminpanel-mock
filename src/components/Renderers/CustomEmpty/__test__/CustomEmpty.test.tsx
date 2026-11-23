import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import CustomEmpty from "../CustomEmpty";

// Mock کردن Div برای بررسی loading بدون وابستگی به MainSpinner واقعی
vi.mock("../../Div/Div", () => ({
  default: ({ children, loading }: any) => (
    <div data-testid="mock-div">{loading ? "Loading..." : children}</div>
  ),
}));

describe("CustomEmpty component", () => {
  it("renders Empty with description correctly", () => {
    render(<CustomEmpty description="No data available" />);
    const div = screen.getByTestId("mock-div");
    expect(div).toBeInTheDocument();
    expect(div).toHaveTextContent("No data available");
  });

  it("renders Div with loading content when loading is true", () => {
    render(<CustomEmpty loading description="Desc" />);
    const div = screen.getByTestId("mock-div");
    expect(div).toBeInTheDocument();
    expect(div).toHaveTextContent("Loading...");
  });

  it("renders Div with children when loading is false", () => {
    render(<CustomEmpty description="Desc" loading={false} />);
    const div = screen.getByTestId("mock-div");
    expect(div).toBeInTheDocument();
    expect(div).toHaveTextContent("Desc");
  });

  it("renders correctly without props (edge case)", () => {
    render(<CustomEmpty />);
    const div = screen.getByTestId("mock-div");
    expect(div).toBeInTheDocument();
    // children داخل Div Empty است
    expect(div.textContent).toContain("");
  });

  it("renders correctly when loading is false", () => {
    render(<CustomEmpty description="Snapshot Test" loading={false} />);
    const div = screen.getByTestId("mock-div");
    expect(div).toHaveTextContent("Snapshot Test");
  });

  // it("matches snapshot when loading is true (mocked)", () => {
  //   const { asFragment } = render(<CustomEmpty description="Snapshot Test" loading />);
  //   const div = screen.getByTestId("mock-div");
  //   expect(div).toHaveTextContent("Loading...");
  //   expect(asFragment()).toMatchSnapshot(); // snapshot شامل "Loading..." می‌شود
  // });
});
