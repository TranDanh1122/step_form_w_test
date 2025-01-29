import { describe, vi, expect, it, beforeAll } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Toggle from "../Toggle";
describe("Toggle component", () => {
    beforeAll(() => {
        vi.clearAllMocks()
    })
    const mockChange = vi.fn()
    const mockProps = (props = {}) => ({
        duration: "monthly",
        onChange: mockChange,
        ...props
    })
    describe("render", () => {
        it("basic render", () => {
            const props = mockProps()
            render(<Toggle {...props} />)
            const toogle = screen.getByRole("toggle")
            const month = screen.getByText("Monthly")
            const year = screen.getByText("Yearly")
            expect(toogle).toBeInTheDocument()
            expect(month).toBeInTheDocument()
            expect(year).toBeInTheDocument()
            expect(month).toHaveClass("text-[var(--marine-blue)]")
            expect(year).toHaveClass("text-[var(--cool-gray)]")
        })
        it("yearly render", () => {
            const props = mockProps({ duration: "yearly" })
            render(<Toggle {...props} />)
            const toogle = screen.getByRole("toggle")
            const month = screen.getByText("Monthly")
            const year = screen.getByText("Yearly")
            expect(toogle).toBeInTheDocument()
            expect(month).toBeInTheDocument()
            expect(year).toBeInTheDocument()
            expect(year).toHaveClass("text-[var(--marine-blue)]")
            expect(month).toHaveClass("text-[var(--cool-gray)]")
        })
    })
    describe("action", () => {
        it("toogle", async () => {
            const props = mockProps()
            render(<Toggle {...props} />)
            const toogle = screen.getByRole("toggle")
            fireEvent.change(toogle , {target: {value: 1}})
            expect(mockChange).toBeCalledTimes(1)
            expect(mockChange).toBeCalledWith("yearly" , "duration")
        })
    })
})