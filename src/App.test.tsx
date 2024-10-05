import { describe, expect, it } from "vitest";
import { render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("vitest is running", () => {
    it("a test", async () => {
        render(<App />);
        const element = screen.getByTestId("test-app")
        await userEvent.click(element);
        await waitFor(() => {
            expect(element).toBeInTheDocument()
        });
    });
});
