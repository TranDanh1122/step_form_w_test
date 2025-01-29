import { describe, it, vi, expect } from "vitest";
import { render, fireEvent, screen, getByText } from "@testing-library/react";
import '@testing-library/jest-dom';
import Step from "../Step";
describe("Step Component", () => {
    const mockProps = (props = {}) => ({
        index: -1,
        title: "Test Step",
        selected: false,
        ...props
    })
    describe("render", () => {
        it("basic render", () => {
            const props = mockProps()
            render(<Step {...props} />)
            expect(screen.getByText("Test Step")).toBeInTheDocument()
        })
        it("current step", () => {
            const props = mockProps({ selected: true })
            render(<Step {...props} />)
            expect(screen.getByText("Test Step")).toBeInTheDocument()
            const index = screen.getByText(-1)
            expect(index).toBeInTheDocument()
            expect(index).toHaveClass("text-[var(--marine-blue)] border-[var(--marine-blue)] bg-[var(--light-blue)]")
        })
    })
})