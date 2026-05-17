import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ItemsEmptyState } from "@features/items/empty-state";

describe("ItemsEmptyState", () => {
  it("renders empty state message", () => {
    render(<ItemsEmptyState />);
    expect(screen.getByText("No items yet")).toBeInTheDocument();
  });
});