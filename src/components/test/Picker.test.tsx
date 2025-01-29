import { describe, vi, it, expect, beforeEach } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Picker from "../Picker";
describe("Picker component", () => {
    const mockChange = vi.fn()
    const mockProps = (props = {}) => ({
        icon: "/src/assets/images/icon-pro.svg",
        name: "testPicker",
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
            render(<Picker {...props} />)
            expect(screen.getByText("testPicker")).toBeInTheDocument()
        })
        it("monthly render", () => {
            const props = mockProps()
            render(<Picker {...props} />)
            expect(screen.getByText("$monthValue/mo")).toBeInTheDocument()
        })
        it("yearly render", () => {
            const props = mockProps({ duration: "yearly" })
            render(<Picker {...props} />)
            expect(screen.getByText("$yearValue/yr")).toBeInTheDocument()
            expect(screen.getByText("2 months free")).toBeInTheDocument()
        })
        it("icon render", () => {
            const props = mockProps()
            render(<Picker {...props} />)
            expect(screen.getByRole("picker_icon")).toBeInTheDocument()
            expect(screen.getByRole("picker_icon")).toHaveAttribute("src", props.icon)
        })
        it("selected", () => {
            const props = mockProps({ selected: true })
            render(<Picker {...props} />)
            const picker = screen.getByRole("picker")
            expect(picker).toHaveClass("border-[var(--purplish-blue)] bg-[var(--alabaster)]")
        })
    })
    describe("action", () => {
        it("user select", async () => {
            const props = mockProps()
            render(<Picker {...props} />)
            const picker = screen.getByRole("picker")
            mockChange.mockClear()
            await fireEvent.click(picker)
            expect(mockChange).toHaveBeenCalledTimes(2)
            expect(mockChange).toHaveBeenCalledWith("testPicker", "plan")
            expect(mockChange).toHaveBeenCalledWith("monthValue", "value")
        })
        it("user select yearly", async () => {
            const props = mockProps({ duration: "yearly" })
            render(<Picker {...props} />)
            const picker = screen.getByRole("picker")
            mockChange.mockClear()
            await fireEvent.click(picker)
            expect(mockChange).toHaveBeenCalledTimes(2)
            expect(mockChange).toHaveBeenCalledWith("testPicker", "plan")
            expect(mockChange).toHaveBeenCalledWith("yearValue", "value")
        })
    })
})