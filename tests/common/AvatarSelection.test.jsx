import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import AvatarSelection from "../../src/components/common/AvatarSelection";
import styles from "../../src/components/common/AvatarSelection.module.css"; // Correct import for styles

describe("AvatarSelection component", () => {
  const avatars = [
    { id: "avatar1", src: "/path/to/avatar1.png" },
    { id: "avatar2", src: "/path/to/avatar2.png" },
    { id: "avatar3", src: "/path/to/avatar3.png" },
  ];

  it("selects the correct avatar", () => {
    // Correct function structure
    render(
      <AvatarSelection
        avatars={avatars}
        selectedAvatar={avatars[1].id}
        handleAvatarChange={() => {}}
      />
    );

    // Check if the selected radio input is checked
    const selectedInput = screen.getByDisplayValue(avatars[1].id);
    expect(selectedInput).toBeChecked();

    // Check if the correct avatar has the selected class
    avatars.forEach((avatar) => {
      const imgElement = screen.getByAltText(avatar.id);
      if (avatar.id === avatars[1].id) {
        expect(imgElement).toHaveClass(styles.selected);
      } else {
        expect(imgElement).not.toHaveClass(styles.selected);
      }
    });
  });

  it("calls handleAvatarChange when an avatar is selected", () => {
    const handleAvatarChange = vi.fn();

    render(
      <AvatarSelection
        avatars={avatars}
        selectedAvatar={avatars[0].id}
        handleAvatarChange={handleAvatarChange}
      />
    );

    const avatarToSelect = screen.getByDisplayValue(avatars[2].id);
    fireEvent.click(avatarToSelect);

    expect(handleAvatarChange).toHaveBeenCalledTimes(1);
    expect(handleAvatarChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: avatars[2].id,
        }),
      })
    );
  });
});
