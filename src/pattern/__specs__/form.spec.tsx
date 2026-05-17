import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PatternForm } from "@pattern/form";

describe("PatternForm", () => {
  it("renders a form element", () => {
    render(<PatternForm onSubmit={() => {}}><div>Form content</div></PatternForm>);
    expect(screen.getByText("Form content")).toBeInTheDocument();
  });
});