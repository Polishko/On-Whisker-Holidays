import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import EmojiRenderer from "../../src/components/common/EmojiRenderer";
import { flagemojiToPNG } from "../../src/utils/emoji.js";

vi.mock("../../src/utils/emoji.js"); // Mock the emoji utility function

describe("EmojiRenderer component", () => {
  it("renders the correct flag image based on the emoji", () => {
    const mockEmoji = "🇺🇸";
    const mockSrc = "https://flagcdn.com/24x18/us.png";
    flagemojiToPNG.mockReturnValue(mockSrc);

    render(<EmojiRenderer emoji={mockEmoji} />);

    const imgElement = screen.getByAltText("flag");
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute("src", mockSrc);
  });

  it("handles an invalid emoji gracefully", () => {
    const mockEmoji = "❌";
    const mockSrc = "";
    flagemojiToPNG.mockReturnValue(mockSrc);

    render(<EmojiRenderer emoji={mockEmoji} />);

    const imgElement = screen.getByAltText("flag");
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute("src", mockSrc);
  });
});
