import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

import Logo from "../../src/components/common/Logo";
import styles from "../../src/components/common/Logo.module.css";

describe("Logo component", () => {
  it("links to homepage", () => {
    render(
      <BrowserRouter>
        <Logo />
      </BrowserRouter>
    );
    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute("href", "/");
  });

  it("renders orange texted logo when background 'dark'", () => {
    render(
      <BrowserRouter>
        <Logo background="dark" />
      </BrowserRouter>
    );
    const imgElement = screen.getByRole("img");
    expect(imgElement).toHaveAttribute("src", "/Logo5-Оrange-01.png");
  });

  it("renders default logo when background not 'dark'", () => {
    render(
      <BrowserRouter>
        <Logo background="light" />
      </BrowserRouter>
    );
    const imgElement = screen.getByRole("img");
    expect(imgElement).toHaveAttribute("src", "/Logo5-01.png");
  });

  it("renders with correct alt text", () => {
    render(
      <BrowserRouter>
        <Logo />
      </BrowserRouter>
    );
    const imgElement = screen.getByAltText("OnWhiskerHolidays logo");
    expect(imgElement).toBeInTheDocument();
  });

  it("applies correct class name the image", () => {
    render(
      <BrowserRouter>
        <Logo />
      </BrowserRouter>
    );
    const imgElement = screen.getByRole("img");
    expect(imgElement).toHaveClass(styles.logo);
  });
});
