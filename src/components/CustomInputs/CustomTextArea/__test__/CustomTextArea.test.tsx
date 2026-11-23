import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";

import CustomTextArea from "../CustomTextArea";

const baseProps = {
  name: "test",
  label: "Test Label",
  placeholder: "Enter text",
};

describe("CustomTextArea Component", () => {
  // Rendering
  describe("Rendering", () => {
    test("renders without crashing", () => {
      render(<CustomTextArea {...baseProps} />);
      expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
    });

    test("renders label when provided", () => {
      render(<CustomTextArea name="bio" label="Biography" />);
      expect(screen.getByText("Biography")).toBeInTheDocument();
    });

    test("renders placeholder correctly", () => {
      render(<CustomTextArea name="comment" placeholder="Enter your comment" />);
      expect(screen.getByPlaceholderText("Enter your comment")).toBeInTheDocument();
    });
  });

  // Disabled state
  describe("Disabled State", () => {
    test("renders disabled state correctly", () => {
      render(<CustomTextArea name="feedback" disabled />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toBeDisabled();
    });

    test("renders enabled state by default", () => {
      render(<CustomTextArea name="enabled" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toBeEnabled();
    });
  });

  // Class and Layout
  describe("Styling & Layout", () => {
    test("applies vertical label class by default", () => {
      const { container } = render(<CustomTextArea {...baseProps} />);
      expect(container.querySelector(".vertical-label")).toBeTruthy();
    });

    test("applies custom className when provided", () => {
      const { container } = render(
        <CustomTextArea {...baseProps} className="my-class" />
      );
      expect(container.querySelector(".my-class")).toBeTruthy();
    });
  });

  // Typing & Interaction
  describe("User Interaction", () => {
    test("handles typing correctly", async () => {
      render(<CustomTextArea {...baseProps} />);
      const textarea = screen.getByLabelText("Test Label") as HTMLTextAreaElement;

      await fireEvent.change(textarea, { target: { value: "Hello world" } });
      expect(textarea.value).toBe("Hello world");
    });

    test("calls onChange handler when text changes", async () => {
      const handleChange = vi.fn();
      render(<CustomTextArea {...baseProps} onChange={handleChange} />);

      const textarea = screen.getByRole("textbox");
      await fireEvent.change(textarea, { target: { value: "Testing..." } });
      expect(handleChange).toHaveBeenCalledTimes(1);
    });
  });

  //  Props
  describe("Props & Behavior", () => {
    test("applies maxLength correctly", () => {
      render(<CustomTextArea name="short" label="Short" maxLength={50} />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute("maxlength", "50");
    });

    test("renders help text when provided", () => {
      render(<CustomTextArea name="info" help="Please fill this field" />);
      expect(screen.getByText("Please fill this field")).toBeInTheDocument();
    });

    test("passes autoSize prop correctly", () => {
      render(<CustomTextArea name="resize" label="Resizable" autoSize />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toBeInTheDocument();
    });

    test("renders hidden Form.Item correctly when hidden=true", () => {
      render(<CustomTextArea name="hiddenField" label="Hidden" hidden />);

      const label = screen.getByText("Hidden");
      const textAreas = screen.getAllByRole("textbox", { hidden: true });
      const textarea = textAreas[textAreas.length - 1];

      expect(label).toBeInTheDocument();
      expect(textarea).toBeInTheDocument();
      expect(label).not.toBeVisible();
      expect(textarea).not.toBeVisible();
    });

    test("accepts additional props without error", () => {
      render(
        <CustomTextArea
          name="extra"
          label="Extra"
          data-testid="custom-textarea"
          id="custom-id"
        />
      );
      const textarea = screen.getByTestId("custom-textarea");
      expect(textarea).toHaveAttribute("id", "custom-id");
    });
  });
});
