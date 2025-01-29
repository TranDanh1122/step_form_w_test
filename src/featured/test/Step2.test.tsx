import { describe, it, vi, expect } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Step2 from "../Step2";
describe("Step2 component", () => {
    const mockChange = vi.fn()
    const mockProps = (props = {}) => ({
        onChange: mockChange,
        data: {
            step2: {
                plan: "arcade",
                value: "90",
                duration: "yearly",

            }
        },
        error: "",
        ...props
    })
    describe("render", () => {
        it("render basic", () => {
            const props = mockProps()
            render(<Step2 {...props} />)
            expect(screen.getByText("arcade")).toBeInTheDocument()
            expect(screen.getByText("advantaged")).toBeInTheDocument()
            expect(screen.getByText("pro")).toBeInTheDocument()
            expect(screen.getByRole("toggle")).toBeInTheDocument()
        })
    })
    describe("action", () => {
        it("chose plan", () => {
            const props = mockProps()
            render(<Step2 {...props} />)
            mockChange.mockClear()
            fireEvent.click(screen.getByText("advantaged"))
            expect(mockChange).toHaveBeenCalledTimes(2)
            expect(mockChange).toBeCalledWith("advantaged", "plan")
            expect(mockChange).toBeCalledWith("120", "value")

        })
        it("toggle", () => {
            const props = mockProps()
            const { rerender } = render(<Step2 {...props} />)
            const toggle = screen.getByRole("toggle")
            mockChange.mockClear()
            fireEvent.change(toggle, { target: { value: "0" } })
            expect(mockChange).toHaveBeenCalledOnce()
            expect(mockChange).toBeCalledWith("monthly", "duration")
            mockChange.mockClear()
            rerender(<Step2 {...props} data={{ ...props.data, step2: { ...props.data.step2, duration: "monthly" } }} />)
            expect(mockChange).toHaveBeenCalledOnce()
            expect(mockChange).toBeCalledWith("9", "value")

        })
    })
})