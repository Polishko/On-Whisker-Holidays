import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Message from "../../src/components/common/Message";
import styles from "../../src/components/common/Message.module.css";

describe("Message component", () => {
  it("applies correct class based on background prop", () => {
    const { rerender } = render(<Message message="Hi!" background="dark" />);
    const messageElement = screen.getByText("Hi!");

    // dark background
    expect(messageElement).toHaveClass(styles.message);
    expect(messageElement).toHaveClass(styles.lightFont);

    // other background
    rerender(<Message message="Hi!" background="light" />);
    expect(messageElement).toHaveClass(styles.darkFont);
  });

  it("renders emoji with role 'img' and correct aria-label", () => {
    render(<Message message="Hi!" background="dark" />);
    const emojiElement = screen.getByRole("img", { name: "wave" });
    expect(emojiElement).toBeInTheDocument();
  });

  it("renders correct message text", () => {
    const testMessage = "Hey! Trying message.";
    render(<Message message={testMessage} background="light" />);
    const messageElement = screen.getByText(testMessage);
    expect(messageElement).toBeInTheDocument();
  });
});
