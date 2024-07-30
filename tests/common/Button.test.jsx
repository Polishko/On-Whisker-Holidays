import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../../src/components/common/Button";
import styles from "../../src/components/common/Button.module.css";
import "@testing-library/jest-dom";

describe("Button component", () => {
  it("renders with the correct children", () => {
    render(<Button>Click me</Button>);
    const buttonElement = screen.getByText(/Click me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    const buttonElement = screen.getByText(/Click me/i);
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies the correct class names", () => {
    render(
      <Button type="primary" className="extra-class">
        Click me
      </Button>
    );
    const buttonElement = screen.getByText(/Click me/i);
    expect(buttonElement).toHaveClass(styles.btn);
    expect(buttonElement).toHaveClass(styles.primary);
    expect(buttonElement).toHaveClass("extra-class");
  });
});
