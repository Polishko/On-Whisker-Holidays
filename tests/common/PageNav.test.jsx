import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import "@testing-library/jest-dom";

import { useAuth } from "../../src/components/contexts/AuthContext";

import PageNav from "../../src/components/common/PageNav";

vi.mock("../../src/components/contexts/AuthContext"); // hook needs to be mocked

describe("PageNav component", () => {
  const renderWithRouter = (path, user = null) => {
    // Mock the return value of useAuth based on the user parameter
    useAuth.mockReturnValue({ user });

    render(
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="*" element={<PageNav />} />
        </Routes>
      </MemoryRouter>
    );
  };

  it("renders Home link when on a different page", () => {
    renderWithRouter("/hotels");
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("does not render Home link when on Home page", () => {
    renderWithRouter("/");
    expect(screen.queryByText("Home")).not.toBeInTheDocument();
  });

  it("renders Login link when user not authenticated", () => {
    renderWithRouter("/hotels");
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("does not render Login link when user authenticated", () => {
    renderWithRouter("/hotels", { name: "Mock User" }); // placeholder mock user data
    expect(screen.queryByText("Login")).not.toBeInTheDocument();
  });

  it("applies the correct styles according to path", () => {
    renderWithRouter("/");
    const logo = screen.getByRole("img");
    expect(logo).toHaveAttribute("src", "/Logo5-Оrange-01.png");
  });
});
