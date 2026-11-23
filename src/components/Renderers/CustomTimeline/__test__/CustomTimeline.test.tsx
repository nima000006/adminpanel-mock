import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import CustomTimeline from "../CustomTimeline";

describe("CustomTimeline Component", () => {
  test("renders without crashing", () => {
    render(<CustomTimeline />);
    const timeline = screen.getByRole("list");
    expect(timeline).toBeInTheDocument();
  });

  test("has the correct custom class", () => {
    render(<CustomTimeline />);
    const timeline = screen.getByRole("list");
    expect(timeline).toHaveClass("custom-timeline-main-container");
  });

  test("renders items passed via props", () => {
    const items = [{ children: "مرحله اول" }, { children: "مرحله دوم" }];
    render(<CustomTimeline items={items} />);
    expect(screen.getByText("مرحله اول")).toBeInTheDocument();
    expect(screen.getByText("مرحله دوم")).toBeInTheDocument();
  });

  test("accepts and forwards extra props correctly", () => {
    // مثلا حالت pending در antd Timeline
    render(<CustomTimeline pending="در انتظار" />);
    expect(screen.getByText("در انتظار")).toBeInTheDocument();
  });

  test("has correct displayName for debugging", () => {
    expect(CustomTimeline.displayName).toBe("CustomTimeline");
  });
});
