import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from "@/components/header";
import * as nextNavigation from "next/navigation";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}));

describe("Header Component", () => {
  const mockUsePathname = nextNavigation.usePathname as ReturnType<
    typeof vi.fn
  >;

  beforeEach(() => {
    mockUsePathname.mockReset();
  });

  it("renders the logo text", () => {
    mockUsePathname.mockReturnValue("/");
    render(<Header />);
    expect(screen.getByText("KINETIC_CONSOLE")).toBeDefined();
  });

  it("renders desktop nav links", () => {
    mockUsePathname.mockReturnValue("/");
    render(<Header />);
    expect(screen.getByText("PROJECTS")).toBeDefined();
    expect(screen.getByText("STACK")).toBeDefined();
    expect(screen.getByText("ARCHIVE")).toBeDefined();
    expect(screen.getByText("CONTACT")).toBeDefined();
  });

  it("renders social links", () => {
    mockUsePathname.mockReturnValue("/");
    render(<Header />);
    const githubLinks = screen.getAllByText("GITHUB");
    expect(githubLinks.length).toBeGreaterThan(0);
  });

  it("shows active state for current route", () => {
    mockUsePathname.mockReturnValue("/");
    render(<Header />);
    const projectsLink = screen.getByText("PROJECTS");
    const projectsParent = projectsLink.closest("a");
    expect(projectsParent?.className).toContain("text-primary");
  });

  it("renders mobile hamburger button", () => {
    mockUsePathname.mockReturnValue("/");
    render(<Header />);
    const hamburgerButton = screen.getByRole("button", { name: /open menu/i });
    expect(hamburgerButton).toBeDefined();
  });

  it("opens mobile menu when hamburger is clicked", () => {
    mockUsePathname.mockReturnValue("/");
    render(<Header />);
    const hamburgerButton = screen.getByRole("button", { name: /open menu/i });

    fireEvent.click(hamburgerButton);

    const mobileNav = document.querySelector("[class*='fixed inset-0']");
    expect(mobileNav).toBeTruthy();
  });

  it("renders mobile menu with vertical nav links when open", () => {
    mockUsePathname.mockReturnValue("/");
    render(<Header />);
    const hamburgerButton = screen.getByRole("button", { name: /open menu/i });

    fireEvent.click(hamburgerButton);

    expect(screen.getByText("PROJECTS")).toBeDefined();
    expect(screen.getByText("STACK")).toBeDefined();
    expect(screen.getByText("ARCHIVE")).toBeDefined();
    expect(screen.getByText("CONTACT")).toBeDefined();
  });

  it("closes mobile menu when close button is clicked", () => {
    mockUsePathname.mockReturnValue("/");
    render(<Header />);
    const hamburgerButton = screen.getByRole("button", { name: /open menu/i });

    fireEvent.click(hamburgerButton);

    const closeButton = screen.getByRole("button", { name: /close menu/i });
    fireEvent.click(closeButton);

    const mobileNav = document.querySelector("[class*='fixed inset-0']");
    expect(mobileNav).toBeFalsy();
  });

  it("has correct hover animation class on nav links", () => {
    mockUsePathname.mockReturnValue("/");
    render(<Header />);
    const stackLink = screen.getByText("STACK");
    const stackParent = stackLink.closest("a");
    expect(stackParent?.className).toContain("group");
  });
});
