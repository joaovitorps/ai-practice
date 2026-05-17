import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProfileEmptyState } from "@features/profile/empty-state";

describe("ProfileEmptyState", () => {
  it("renders empty state message", () => {
    render(<ProfileEmptyState />);
    expect(screen.getByText("No profile found")).toBeInTheDocument();
  });
});