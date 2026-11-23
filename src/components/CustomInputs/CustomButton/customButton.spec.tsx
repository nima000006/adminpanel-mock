import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import CustomButton from "./CustomButton";

describe("CustomButton Component - Comprehensive Tests", () => {
  describe("Rendering", () => {
    test("renders CustomButton with children text correctly", () => {
      render(<CustomButton>Click me</CustomButton>);

      const buttonElement = screen.getByText("Click me");
      expect(buttonElement).toBeInTheDocument();
    });

    test("renders CustomButton with JSX children correctly", () => {
      render(
        <CustomButton>
          <span data-testid="icon">Icon</span>
          <span>Text</span>
        </CustomButton>
      );

      expect(screen.getByTestId("icon")).toBeInTheDocument();
      expect(screen.getByText("Text")).toBeInTheDocument();
    });

    test("renders CustomButton with empty children", () => {
      render(<CustomButton>{""}</CustomButton>);

      const buttonElement = screen.getByRole("button");
      expect(buttonElement).toBeInTheDocument();
    });

    test("renders as a button element by default", () => {
      render(<CustomButton>Click me</CustomButton>);

      const buttonElement = screen.getByRole("button");
      expect(buttonElement.tagName).toBe("BUTTON");
    });
  });

  describe("States", () => {
    test("applies enabled state when disabled prop is false", () => {
      render(<CustomButton disabled={false}>Click me</CustomButton>);

      const buttonElement = screen.getByRole("button");
      expect(buttonElement).toBeEnabled();
      expect(buttonElement).not.toHaveAttribute("disabled");
    });

    test("applies disabled state when disabled prop is true", () => {
      render(<CustomButton disabled>Click me</CustomButton>);

      const buttonElement = screen.getByRole("button");
      expect(buttonElement).toBeDisabled();
      expect(buttonElement).toHaveAttribute("disabled");
    });

    test("applies loading state when loading prop is true", () => {
      render(<CustomButton loading>Click me</CustomButton>);

      const buttonElement = screen.getByRole("button");
      expect(buttonElement).toHaveClass("ant-btn-loading");
    });

    test("shows loading icon when loading is true", () => {
      const { container } = render(<CustomButton loading>Click me</CustomButton>);

      const loadingIcon = container.querySelector(".ant-btn-loading-icon");
      expect(loadingIcon).toBeInTheDocument();
    });
  });

  describe("Types and Variants", () => {
    test("applies primary type correctly", () => {
      render(<CustomButton type="primary">Primary Button</CustomButton>);

      const buttonElement = screen.getByRole("button");
      expect(buttonElement).toHaveClass("ant-btn-primary");
    });

    test("applies default type when no type is specified", () => {
      render(<CustomButton>Default Button</CustomButton>);

      const buttonElement = screen.getByRole("button");
      expect(buttonElement).toHaveClass("ant-btn-default");
    });

    test("applies dashed type correctly", () => {
      render(<CustomButton type="dashed">Dashed Button</CustomButton>);

      const buttonElement = screen.getByRole("button");
      expect(buttonElement).toHaveClass("ant-btn-dashed");
    });

    test("applies text type correctly", () => {
      render(<CustomButton type="text">Text Button</CustomButton>);

      const buttonElement = screen.getByRole("button");
      expect(buttonElement).toHaveClass("ant-btn-text");
    });

    test("applies link type correctly", () => {
      render(<CustomButton type="link">Link Button</CustomButton>);

      const buttonElement = screen.getByRole("button");
      expect(buttonElement).toHaveClass("ant-btn-link");
    });

    test("applies danger variant correctly", () => {
      render(<CustomButton danger>Danger Button</CustomButton>);

      const buttonElement = screen.getByRole("button");
      expect(buttonElement).toHaveClass("ant-btn-dangerous");
    });

    test("applies danger with primary type correctly", () => {
      render(
        <CustomButton type="primary" danger>
          Danger Primary
        </CustomButton>
      );

      const buttonElement = screen.getByRole("button");
      expect(buttonElement).toHaveClass("ant-btn-primary");
      expect(buttonElement).toHaveClass("ant-btn-dangerous");
    });
  });

  describe("Sizes", () => {
    test("applies large size correctly", () => {
      render(<CustomButton size="large">Large Button</CustomButton>);

      const buttonElement = screen.getByRole("button");
      expect(buttonElement).toHaveClass("ant-btn-lg");
    });

    test("applies middle size correctly", () => {
      render(<CustomButton size="middle">Middle Button</CustomButton>);

      const buttonElement = screen.getByRole("button");
      expect(buttonElement).toHaveClass("ant-btn");
    });

    test("applies small size correctly", () => {
      render(<CustomButton size="small">Small Button</CustomButton>);

      const buttonElement = screen.getByRole("button");
      expect(buttonElement).toHaveClass("ant-btn-sm");
    });
  });

  describe("Custom Classes and Styling", () => {
    test("applies custom class when provided", () => {
      render(<CustomButton className="custom-class">Click me</CustomButton>);

      const buttonElement = screen.getByRole("button");
      expect(buttonElement).toHaveClass("custom-class");
    });

    test("applies warning class when isWarning is true", () => {
      render(<CustomButton isWarning>Click me</CustomButton>);

      const buttonElement = screen.getByRole("button");
      expect(buttonElement).toHaveClass("custom-button-warning-color");
    });

    test("applies default class when no className or isWarning is provided", () => {
      render(<CustomButton>Click me</CustomButton>);

      const buttonElement = screen.getByRole("button");
      expect(buttonElement).toHaveClass("custom-button-main-container");
    });

    test("applies multiple classes together", () => {
      render(
        <CustomButton className="custom-class" isWarning>
          Click me
        </CustomButton>
      );

      const buttonElement = screen.getByRole("button");
      expect(buttonElement).toHaveClass("custom-button-main-container");
      expect(buttonElement).toHaveClass("custom-class");
      expect(buttonElement).toHaveClass("custom-button-warning-color");
    });

    test("accepts inline style prop", () => {
      render(
        <CustomButton style={{ backgroundColor: "red", padding: "10px" }}>
          Styled Button
        </CustomButton>
      );

      const buttonElement = screen.getByRole("button");
      // Verify the button renders (style prop is accepted by CustomButton)
      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement).toHaveTextContent("Styled Button");
    });
  });

  describe("Event Handlers", () => {
    test("calls onClick when clicked", () => {
      const handleClick = vi.fn();
      render(<CustomButton onClick={handleClick}>Click me</CustomButton>);

      const buttonElement = screen.getByRole("button");
      fireEvent.click(buttonElement);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test("calls onClick multiple times when clicked multiple times", () => {
      const handleClick = vi.fn();
      render(<CustomButton onClick={handleClick}>Click me</CustomButton>);

      const buttonElement = screen.getByRole("button");
      fireEvent.click(buttonElement);
      fireEvent.click(buttonElement);
      fireEvent.click(buttonElement);

      expect(handleClick).toHaveBeenCalledTimes(3);
    });

    test("does not call onClick when disabled", () => {
      const handleClick = vi.fn();
      render(
        <CustomButton onClick={handleClick} disabled>
          Click me
        </CustomButton>
      );

      const buttonElement = screen.getByRole("button");
      fireEvent.click(buttonElement);

      expect(handleClick).not.toHaveBeenCalled();
    });

    test("calls onMouseEnter when mouse enters", () => {
      const handleMouseEnter = vi.fn();
      render(<CustomButton onMouseEnter={handleMouseEnter}>Hover me</CustomButton>);

      const buttonElement = screen.getByRole("button");
      fireEvent.mouseEnter(buttonElement);

      expect(handleMouseEnter).toHaveBeenCalledTimes(1);
    });

    test("calls onMouseLeave when mouse leaves", () => {
      const handleMouseLeave = vi.fn();
      render(<CustomButton onMouseLeave={handleMouseLeave}>Hover me</CustomButton>);

      const buttonElement = screen.getByRole("button");
      fireEvent.mouseLeave(buttonElement);

      expect(handleMouseLeave).toHaveBeenCalledTimes(1);
    });

    test("calls onFocus when focused", () => {
      const handleFocus = vi.fn();
      render(<CustomButton onFocus={handleFocus}>Focus me</CustomButton>);

      const buttonElement = screen.getByRole("button");
      fireEvent.focus(buttonElement);

      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    test("calls onBlur when blurred", () => {
      const handleBlur = vi.fn();
      render(<CustomButton onBlur={handleBlur}>Blur me</CustomButton>);

      const buttonElement = screen.getByRole("button");
      fireEvent.blur(buttonElement);

      expect(handleBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe("Shapes", () => {
    test("applies circle shape correctly", () => {
      render(<CustomButton shape="circle">C</CustomButton>);

      const buttonElement = screen.getByRole("button");
      expect(buttonElement).toHaveClass("ant-btn-circle");
    });

    test("applies round shape correctly", () => {
      render(<CustomButton shape="round">Round Button</CustomButton>);

      const buttonElement = screen.getByRole("button");
      expect(buttonElement).toHaveClass("ant-btn-round");
    });

    test("applies default shape when no shape is provided", () => {
      render(<CustomButton>Default Shape</CustomButton>);

      const buttonElement = screen.getByRole("button");
      expect(buttonElement).not.toHaveClass("ant-btn-circle");
      expect(buttonElement).not.toHaveClass("ant-btn-round");
    });
  });

  describe("Icons", () => {
    test("renders icon prop correctly", () => {
      const TestIcon = () => <span data-testid="test-icon">★</span>;
      render(<CustomButton icon={<TestIcon />}>With Icon</CustomButton>);

      expect(screen.getByTestId("test-icon")).toBeInTheDocument();
      expect(screen.getByText("With Icon")).toBeInTheDocument();
    });

    test("renders icon-only button correctly", () => {
      const TestIcon = () => <span data-testid="test-icon">★</span>;
      render(<CustomButton icon={<TestIcon />}>{""}</CustomButton>);

      expect(screen.getByTestId("test-icon")).toBeInTheDocument();
      const buttonElement = screen.getByRole("button");
      expect(buttonElement).toHaveClass("ant-btn-icon-only");
    });
  });

  describe("HTML Attributes", () => {
    test("applies htmlType submit correctly", () => {
      render(<CustomButton htmlType="submit">Submit</CustomButton>);

      const buttonElement = screen.getByRole("button");
      expect(buttonElement).toHaveAttribute("type", "submit");
    });

    test("applies htmlType reset correctly", () => {
      render(<CustomButton htmlType="reset">Reset</CustomButton>);

      const buttonElement = screen.getByRole("button");
      expect(buttonElement).toHaveAttribute("type", "reset");
    });

    test("applies htmlType button correctly (default)", () => {
      render(<CustomButton htmlType="button">Button</CustomButton>);

      const buttonElement = screen.getByRole("button");
      expect(buttonElement).toHaveAttribute("type", "button");
    });

    test("accepts and applies data attributes", () => {
      render(
        <CustomButton data-testid="custom-btn" data-custom="value">
          Data Attrs
        </CustomButton>
      );

      const buttonElement = screen.getByTestId("custom-btn");
      expect(buttonElement).toHaveAttribute("data-custom", "value");
    });

    test("accepts and applies aria attributes", () => {
      render(
        <CustomButton aria-label="Custom Button" aria-pressed="true">
          Accessible
        </CustomButton>
      );

      const buttonElement = screen.getByRole("button");
      expect(buttonElement).toHaveAttribute("aria-label", "Custom Button");
      expect(buttonElement).toHaveAttribute("aria-pressed", "true");
    });
  });

  describe("Ref Forwarding", () => {
    test("forwards ref correctly", () => {
      const ref = vi.fn();
      render(<CustomButton ref={ref}>Ref Button</CustomButton>);

      expect(ref).toHaveBeenCalled();
      expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLElement);
    });

    test("ref can be used to access DOM element", () => {
      let buttonRef: HTMLElement | null = null;
      const TestComponent = () => {
        return (
          <CustomButton
            ref={(el: HTMLElement | null) => {
              buttonRef = el;
            }}
          >
            Ref Test
          </CustomButton>
        );
      };

      render(<TestComponent />);

      expect(buttonRef).not.toBeNull();
      expect(buttonRef!.tagName).toBe("BUTTON");
    });
  });

  describe("Block Button", () => {
    test("applies block style correctly", () => {
      render(<CustomButton block>Block Button</CustomButton>);

      const buttonElement = screen.getByRole("button");
      expect(buttonElement).toHaveClass("ant-btn-block");
    });

    test("non-block button does not have block class", () => {
      render(<CustomButton>Normal Button</CustomButton>);

      const buttonElement = screen.getByRole("button");
      expect(buttonElement).not.toHaveClass("ant-btn-block");
    });
  });

  describe("Ghost Button", () => {
    test("applies ghost style correctly", () => {
      render(<CustomButton ghost>Ghost Button</CustomButton>);

      const buttonElement = screen.getByRole("button");
      expect(buttonElement).toHaveClass("ant-btn-background-ghost");
    });

    test("ghost with primary type", () => {
      render(
        <CustomButton type="primary" ghost>
          Ghost Primary
        </CustomButton>
      );

      const buttonElement = screen.getByRole("button");
      expect(buttonElement).toHaveClass("ant-btn-primary");
      expect(buttonElement).toHaveClass("ant-btn-background-ghost");
    });
  });

  describe("Edge Cases", () => {
    test("handles null children gracefully", () => {
      render(<CustomButton>{null}</CustomButton>);

      const buttonElement = screen.getByRole("button");
      expect(buttonElement).toBeInTheDocument();
    });

    test("handles undefined children gracefully", () => {
      render(<CustomButton>{undefined}</CustomButton>);

      const buttonElement = screen.getByRole("button");
      expect(buttonElement).toBeInTheDocument();
    });

    test("handles empty string className", () => {
      render(<CustomButton className="">Empty Class</CustomButton>);

      const buttonElement = screen.getByRole("button");
      expect(buttonElement).toHaveClass("custom-button-main-container");
    });

    test("handles multiple event handlers together", () => {
      const handleClick = vi.fn();
      const handleMouseEnter = vi.fn();
      const handleMouseLeave = vi.fn();

      render(
        <CustomButton
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Multi Event
        </CustomButton>
      );

      const buttonElement = screen.getByRole("button");
      fireEvent.click(buttonElement);
      fireEvent.mouseEnter(buttonElement);
      fireEvent.mouseLeave(buttonElement);

      expect(handleClick).toHaveBeenCalledTimes(1);
      expect(handleMouseEnter).toHaveBeenCalledTimes(1);
      expect(handleMouseLeave).toHaveBeenCalledTimes(1);
    });
  });

  describe("Warning Button Variant", () => {
    test("isWarning adds warning color class", () => {
      render(<CustomButton isWarning>Warning</CustomButton>);

      const buttonElement = screen.getByRole("button");
      expect(buttonElement).toHaveClass("custom-button-warning-color");
    });

    test("isWarning false does not add warning color class", () => {
      render(<CustomButton isWarning={false}>Not Warning</CustomButton>);

      const buttonElement = screen.getByRole("button");
      expect(buttonElement).not.toHaveClass("custom-button-warning-color");
    });

    test("isWarning with custom class", () => {
      render(
        <CustomButton isWarning className="my-class">
          Warning Custom
        </CustomButton>
      );

      const buttonElement = screen.getByRole("button");
      expect(buttonElement).toHaveClass("custom-button-warning-color");
      expect(buttonElement).toHaveClass("my-class");
    });

    test("isWarning with primary type", () => {
      render(
        <CustomButton type="primary" isWarning>
          Primary Warning
        </CustomButton>
      );

      const buttonElement = screen.getByRole("button");
      expect(buttonElement).toHaveClass("ant-btn-primary");
      expect(buttonElement).toHaveClass("custom-button-warning-color");
    });
  });
});
