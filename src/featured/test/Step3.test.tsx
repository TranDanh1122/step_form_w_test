import { describe, it, vi, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Step3 from "../Step3";
describe("Step3 component", () => {
    const mockChange = vi.fn()
    const mockProps = (props = {}) => ({
        onChange: mockChange,
        data: {
            step2: {
                plan: "arcade",
                value: "90",
                duration: "yearly",

            },
            step3: {
                addOns: [{ name: "Larger storage", value: "20" }]
            }
        },
        error: "",
        ...props
    })
    describe("render", () => {
        it("render basic", () => {
            const props = mockProps()
            render(<Step3 {...props} />)
            expect(screen.getByText("Online service")).toBeInTheDocument()
            expect(screen.getByText("Larger storage")).toBeInTheDocument()
            expect(screen.getByText("Customizable profile")).toBeInTheDocument()
        })
    })
    describe("action", () => {
        it("select addon", () => {
            const props = mockProps()
            render(<Step3 {...props} />)
            mockChange.mockClear()
            fireEvent.click(screen.getByText("Customizable profile"))
            expect(mockChange).toHaveBeenCalledOnce()
            expect(mockChange).toBeCalledWith({ name: "Customizable profile", value: "20" }, "addOns")
        })
    })
})