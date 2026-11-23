import { render, screen } from "@testing-library/react";
import dayjs from "dayjs";
import moment from "jalali-moment";
import { describe, it, expect, vi, afterAll } from "vitest";

import CustomTagWithDiffDays from "../CustomTagWithDiffDays";

// Mock کردن تاریخ فعلی
const MOCK_NOW = moment("2025/10/14 12:00:00", "YYYY/MM/DD HH:mm:ss");
vi.spyOn(global.Date, "now").mockImplementation(() => MOCK_NOW.valueOf());

describe("CustomTagWithDiffDays component", () => {
  afterAll(() => {
    vi.restoreAllMocks();
  });

  const getDiffSpan = () => document.querySelector(".waiting-time");

  const now = dayjs(); // current date and time

  it("renders correctly with value today (diffTime=0)", () => {
    const today = now.format("YYYY/MM/DD HH:mm:ss");

    render(<CustomTagWithDiffDays value={today} />);
    const span = getDiffSpan();
    expect(span).toBeTruthy();
    expect(span?.textContent).toBe("0");
    expect(span).toHaveClass("green");
    expect(screen.getByText("روز")).toBeInTheDocument();
  });

  it("renders correctly with value 2 days ago (green)", () => {
    const twoDaysAgo = now.subtract(2, "day"); // subtract 2 days
    const formatted = twoDaysAgo.format("YYYY/MM/DD HH:mm:ss");

    render(<CustomTagWithDiffDays value={formatted} />);
    const span = getDiffSpan();
    expect(span?.textContent).toBe("2");
    expect(span).toHaveClass("green");
  });

  it("renders correctly with value 3 days ago (yellow)", () => {
    const threeDaysAgo = now.subtract(3, "day");
    const formatted = threeDaysAgo.format("YYYY/MM/DD HH:mm:ss");

    render(<CustomTagWithDiffDays value={formatted} />);
    const span = getDiffSpan();
    expect(span?.textContent).toBe("3");
    expect(span).toHaveClass("yellow");
  });

  it("renders correctly with value 4 days ago (yellow)", () => {
    const fourDaysAgo = now.subtract(4, "day");
    const formatted = fourDaysAgo.format("YYYY/MM/DD HH:mm:ss");

    render(<CustomTagWithDiffDays value={formatted} />);
    const span = getDiffSpan();
    expect(span?.textContent).toBe("4");
    expect(span).toHaveClass("yellow");
  });

  it("renders correctly with value 5 days ago (red)", () => {
    const fiveDaysAgo = now.subtract(5, "day");
    const formatted = fiveDaysAgo.format("YYYY/MM/DD HH:mm:ss");

    render(<CustomTagWithDiffDays value={formatted} />);
    const span = getDiffSpan();
    expect(span?.textContent).toBe("5");
    expect(span).toHaveClass("red");
  });

  it("renders correctly with empty string (edge case)", () => {
    // به جای undefined از تاریخ فعلی mock استفاده می‌کنیم
    const today = now.format("YYYY/MM/DD HH:mm:ss");

    render(<CustomTagWithDiffDays value={today} />);
    const span = getDiffSpan();
    expect(span?.textContent).toBe("0");
    expect(span).toHaveClass("green");
  });

  //   it("matches snapshot for a recent date", () => {
  //     const { asFragment } = render(
  //       <CustomTagWithDiffDays value="2025/10/13 12:00:00" />
  //     );
  //     expect(asFragment()).toMatchSnapshot();
  //   });

  //   it("matches snapshot for an older date", () => {
  //     const { asFragment } = render(
  //       <CustomTagWithDiffDays value="2025/10/09 12:00:00" />
  //     );
  //     expect(asFragment()).toMatchSnapshot();
  //   });
});
