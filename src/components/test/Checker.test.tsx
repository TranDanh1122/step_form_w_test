import { describe, vi, it, expect, beforeEach } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Checker from "../Checker";
describe("Checker component", () => {
    const mockChange = vi.fn()
    const mockProps = (props = {}) => ({
        desc: "testDesc",
        name: "testChecker",
        monthValue: "monthValue",
        yearValue: "yearValue",
        selected: false,
        duration: "monthly",
        onChange: mockChange,
        ...props
    })
    beforeEach(() => {
        vi.clearAllMocks()
    })
    describe("render", () => {
        it("basic render", () => {
            const props = mockProps()
            render(<Checker {...props} />)
            expect(screen.getByText("testChecker")).toBeInTheDocument()
        })
        it("monthly render", () => {
            const props = mockProps()
            render(<Checker {...props} />)
            expect(screen.getByText("$monthValue/mo")).toBeInTheDocument()
        })
        it("yearly render", () => {
            const props = mockProps({ duration: "yearly" })
            render(<Checker {...props} />)
            expect(screen.getByText("$yearValue/yr")).toBeInTheDocument()
        })
        it("selected render", () => {
            const props = mockProps({ selected: true })
            render(<Checker {...props} />)
            const check = screen.getByRole("checker")
            const checkbox = screen.getByRole("checker_checkbox")
            expect(check).toHaveClass("border-[var(--purplish-blue)] bg-[var(--alabaster)]")
            expect(checkbox).toHaveAttribute("checked")
        })
    })
    describe("action", () => {
        it("user select", async () => {
            const props = mockProps()
            render(<Checker {...props} />)
            const check = screen.getByRole("checker")
            mockChange.mockClear()
            await fireEvent.click(check)
            expect(mockChange).toHaveBeenCalledOnce()
            expect(mockChange).toHaveBeenCalledWith({ name: props.name, value: props.monthValue }, "addOns")
        })
        it("user select yearly", async () => {
            const props = mockProps({ duration: "yearly" })
            render(<Checker {...props} />)
            const check = screen.getByRole("checker")
            mockChange.mockClear()
            await fireEvent.click(check)
            expect(mockChange).toHaveBeenCalledOnce()
            expect(mockChange).toHaveBeenCalledWith({ name: props.name, value: props.yearValue }, "addOns")
        })
    })
})