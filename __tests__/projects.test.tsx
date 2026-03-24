import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ProjectsPage from "@/app/projects/page";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => <div {...props}>{children}</div>,
    article: ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => <article {...props}>{children}</article>,
  },
  AnimatePresence: ({ children }: { children?: React.ReactNode }) => children,
}));

// Mock next/image
vi.mock("next/image", () => ({
  default: ({ src, alt, fill, className, sizes }: { src?: string; alt?: string; fill?: boolean; className?: string; sizes?: string }) => (
    <img src={src} alt={alt} className={className} data-fill={fill} data-sizes={sizes} />
  ),
}));

describe("Projects Page - US-013", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Page Header", () => {
    it("renders page title", () => {
      render(<ProjectsPage />);
      const title = screen.getByText("My Work");
      expect(title).toBeTruthy();
    });

    it("renders page description", () => {
      render(<ProjectsPage />);
      const description = screen.getByText(/Sektördeki deneyimim/i);
      expect(description).toBeTruthy();
    });
  });

  describe("Filter Bar", () => {
    it("renders all category filter buttons", () => {
      render(<ProjectsPage />);
      expect(screen.getByText("TÜMÜ")).toBeTruthy();
      expect(screen.getByText("WEB")).toBeTruthy();
      expect(screen.getByText("MOBİL")).toBeTruthy();
      expect(screen.getByText("AÇIK KAYNAK")).toBeTruthy();
      expect(screen.getByText("FREELANCE")).toBeTruthy();
    });

    it("has TÜMÜ as the default active filter", () => {
      render(<ProjectsPage />);
      const tumuButton = screen.getByRole("button", { name: /TÜMÜ/i });
      expect(tumuButton).toHaveClass("bg-primary");
    });

    it("changes active filter on click", () => {
      render(<ProjectsPage />);
      const webButton = screen.getByRole("button", { name: /WEB/i });
      fireEvent.click(webButton);
      expect(webButton).toHaveClass("bg-primary");
    });
  });

  describe("Search", () => {
    it("renders search input with placeholder", () => {
      render(<ProjectsPage />);
      const searchInput = screen.getByPlaceholderText(/Proje Ara.../i);
      expect(searchInput).toBeTruthy();
    });

    it("opens command palette on search focus", () => {
      render(<ProjectsPage />);
      const searchInput = screen.getByPlaceholderText(/Proje Ara.../i);
      fireEvent.focus(searchInput);
      expect(screen.getByText(/Sonuç bulunamadı/i)).toBeTruthy();
    });
  });

  describe("Project Cards", () => {
    it("renders project cards with correct structure", () => {
      render(<ProjectsPage />);
      expect(screen.getByText("Vesta Dashboard")).toBeTruthy();
      expect(screen.getByText(/Modern veri görselleştirme/i)).toBeTruthy();
    });

    it("renders tech stack pills on project cards", () => {
      render(<ProjectsPage />);
      expect(screen.getByText(/REACT/i)).toBeTruthy();
      expect(screen.getByText(/TAILWIND/i)).toBeTruthy();
    });

    it("renders Source link on project cards", () => {
      render(<ProjectsPage />);
      const sourceLinks = screen.getAllByText("Source");
      expect(sourceLinks.length).toBeGreaterThan(0);
    });

    it("renders Demo button when liveUrl exists", () => {
      render(<ProjectsPage />);
      const demoButtons = screen.getAllByText("Demo");
      expect(demoButtons.length).toBeGreaterThan(0);
    });
  });

  describe("Empty State", () => {
    it("shows empty state when no projects match filter", () => {
      render(<ProjectsPage />);
      const searchInput = screen.getByPlaceholderText(/Proje Ara.../i);
      fireEvent.change(searchInput, { target: { value: "xyznonexistent123" } });
      expect(screen.getByText(/Sonuç Bulunamadı/i)).toBeTruthy();
    });
  });

  describe("CTA Section", () => {
    it("renders CTA section with correct text", () => {
      render(<ProjectsPage />);
      expect(screen.getByText(/Bir projeniz mi var?/i)).toBeTruthy();
    });

    it("CTA button links to contact page", () => {
      render(<ProjectsPage />);
      const ctaLink = screen.getByRole("link", { name: /İletişime Geç/i });
      expect(ctaLink).toHaveAttribute("href", "/contact");
    });
  });
});
