import React from "react";
import { render } from "@testing-library/react";
import ErrorBoundary from "../ErrorBoundary";

function ProblematicComponent() {
    throw new Error("Test error");
}

describe("ErrorBoundary Component", () => {
    test("renders children when no error occurs", () => {
        const { getByText } = render(
            <ErrorBoundary>
                <h1>Everything is fine</h1>
            </ErrorBoundary>
        );

        expect(getByText("Everything is fine")).toBeInTheDocument();
    });

    test("renders fallback UI when an error occurs", () => {
        const { getByText } = render(
            <ErrorBoundary>
                <ProblematicComponent />
            </ErrorBoundary>
        );

        expect(getByText("Something went wrong.")).toBeInTheDocument();
    });
});
