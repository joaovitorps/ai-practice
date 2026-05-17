import { Component, type ReactNode, type ErrorInfo } from "react";
import { Button } from "@ui/button";

type WidgetBoundaryProps = { children: ReactNode; fallback?: ReactNode; "data-slot"?: string };
type WidgetBoundaryState = { hasError: boolean; error: Error | null };

export class WidgetBoundary extends Component<WidgetBoundaryProps, WidgetBoundaryState> {
  state: WidgetBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): WidgetBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[WidgetBoundary]", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div data-slot={this.props["data-slot"] ?? "widget-boundary"} className="rounded-md border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-medium text-red-800">Something went wrong</p>
          <p className="mt-1 text-sm text-red-600">{this.state.error?.message}</p>
          <Button variant="outline" size="sm" className="mt-2" onClick={() => this.setState({ hasError: false, error: null })}>Try again</Button>
        </div>
      );
    }
    return this.props.children;
  }
}